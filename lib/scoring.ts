import { AccessOption, Patient, PreferenceKey, Recommendation, ScoredOption } from "./types";

type Weights = {
  cost: number;
  speed: number;
  effort: number;
  deductible: number;
  certainty: number;
};

// Once the patient explicitly says what matters most, that dimension should
// dominate the ranking so the recommendation clearly flips.
const EXPLICIT_PRESETS: Record<PreferenceKey, Weights> = {
  cost: { cost: 0.8, speed: 0.05, effort: 0.05, deductible: 0.05, certainty: 0.05 },
  speed: { cost: 0.05, speed: 0.8, effort: 0.05, deductible: 0.05, certainty: 0.05 },
  effort: { cost: 0.05, speed: 0.05, effort: 0.8, deductible: 0.05, certainty: 0.05 },
};

// Before the patient has told us what matters most, lean on a balanced
// weighting (lightly shaded by their stated urgency) so the first
// recommendation still feels sensible rather than arbitrary.
const BALANCED_PRESETS: Record<NonNullable<Patient["urgency"]>, Weights> = {
  today: { cost: 0.3, speed: 0.45, effort: 0.15, deductible: 0.05, certainty: 0.05 },
  "this-week": { cost: 0.4, speed: 0.3, effort: 0.2, deductible: 0.05, certainty: 0.05 },
  cheapest: { cost: 0.55, speed: 0.2, effort: 0.15, deductible: 0.05, certainty: 0.05 },
};

const TIME_TO_DAYS: Record<string, number> = {
  Today: 0,
  "2-3 days": 2.5,
  "1-2 weeks": 10,
};

const EFFORT_TO_SCORE: Record<AccessOption["effort"], number> = {
  low: 0,
  medium: 0.5,
  high: 1,
};

/**
 * Ranks a raw metric (lower is better) into evenly-spaced scores from 1
 * (best) to 0 (worst). Used once a preference is explicit, so a dominant
 * weight reliably flips the winner even when the raw gaps between options
 * are small (e.g. $0 vs $25).
 */
function rankScores(values: number[]): number[] {
  const n = values.length;
  const order = values.map((_, i) => i).sort((a, b) => values[a] - values[b]);
  const scores = new Array(n);
  order.forEach((originalIndex, rank) => {
    scores[originalIndex] = n === 1 ? 1 : 1 - rank / (n - 1);
  });
  return scores;
}

function scoreWithRank(options: AccessOption[], weights: Weights): ScoredOption[] {
  const costScores = rankScores(options.map((o) => o.estimatedCost));
  const timeScores = rankScores(options.map((o) => TIME_TO_DAYS[o.timeToFill] ?? 0));
  const effortScores = rankScores(options.map((o) => EFFORT_TO_SCORE[o.effort]));

  return options.map((option, i) => {
    const deductibleScore = option.deductibleImpact ? 1 : 0.6;
    const score =
      weights.cost * costScores[i] +
      weights.speed * timeScores[i] +
      weights.effort * effortScores[i] +
      weights.deductible * deductibleScore +
      weights.certainty * option.probabilityOfSuccess;
    return { ...option, score, isRecommended: false };
  });
}

function scoreWithContinuous(options: AccessOption[], weights: Weights): ScoredOption[] {
  const maxCost = Math.max(...options.map((o) => o.estimatedCost), 1);
  const maxDays = Math.max(...options.map((o) => TIME_TO_DAYS[o.timeToFill] ?? 0), 1);

  return options.map((option) => {
    const normalizedCost = 1 - option.estimatedCost / maxCost;
    const normalizedTime = 1 - (TIME_TO_DAYS[option.timeToFill] ?? 0) / maxDays;
    const normalizedEffort = 1 - EFFORT_TO_SCORE[option.effort];
    const deductibleScore = option.deductibleImpact ? 1 : 0.6;

    const score =
      weights.cost * normalizedCost +
      weights.speed * normalizedTime +
      weights.effort * normalizedEffort +
      weights.deductible * deductibleScore +
      weights.certainty * option.probabilityOfSuccess;
    return { ...option, score, isRecommended: false };
  });
}

export function scoreOptions(
  options: AccessOption[],
  preference: PreferenceKey | null,
  urgency: Patient["urgency"],
): ScoredOption[] {
  const scored = preference
    ? scoreWithRank(options, EXPLICIT_PRESETS[preference])
    : scoreWithContinuous(options, BALANCED_PRESETS[urgency ?? "this-week"]);

  scored.sort((a, b) => b.score - a.score);
  if (scored.length > 0) scored[0].isRecommended = true;

  return scored;
}

const PREFERENCE_COPY: Record<PreferenceKey, string> = {
  cost: "lowest cost",
  speed: "fastest access",
  effort: "least hassle",
};

const URGENCY_COPY: Record<NonNullable<Patient["urgency"]>, string> = {
  today: "getting started today",
  "this-week": "your timeline this week",
  cheapest: "keeping costs down",
};

export function buildRecommendation(
  scoredOptions: ScoredOption[],
  preference: PreferenceKey | null,
  urgency: Patient["urgency"],
  drugCost: number,
): Recommendation {
  const top = scoredOptions[0];
  const matchLabel = preference ? PREFERENCE_COPY[preference] : URGENCY_COPY[urgency ?? "this-week"];

  let rationale = "";
  let tradeoff = "";

  if (top.id === "copay") {
    rationale = `This is expected to reduce your first-fill cost from $${drugCost} → $${top.estimatedCost}, matching ${matchLabel}.`;
    tradeoff = top.deductibleImpact
      ? `Time: ${top.timeToFill}`
      : `May not count toward your deductible  ·  Time: ${top.timeToFill}`;
  } else if (top.id === "insurance") {
    rationale = `You can fill this today using your existing insurance for $${top.estimatedCost} — the best match for ${matchLabel}.`;
    tradeoff = `Higher out-of-pocket cost  ·  Time: ${top.timeToFill}`;
  } else {
    rationale = `Based on your situation, the Patient Assistance Program could bring your cost to $${top.estimatedCost}, matching ${matchLabel}.`;
    tradeoff = `Requires an eligibility application  ·  Time: ${top.timeToFill}`;
  }

  return { option: top, rationale, tradeoff };
}
