# PRD: Prescription Access Navigator — Mockup Demo Website

## What We're Building

A pharma-sponsored consumer web app that helps patients figure out the cheapest, lowest-friction way to start a medication they've already been prescribed. It compares access pathways (insurance, manufacturer copay programs, patient assistance programs), shows tradeoffs, makes a recommendation, and hands the patient off to the right next step.

The demo is a vibe-coded prototype using mocked data. It does not connect to real insurance, claims, or pharmacy infrastructure. It proves the *decision experience* is compelling.

---

## Problem

A patient walks out of a doctor's office with a prescription for a high-cost branded medication. They have no idea:

- What it will cost at the pharmacy
- Whether insurance will cover it or require prior authorization
- Whether manufacturer assistance exists
- Whether copay assistance counts toward their deductible
- Where they can fill it
- What they should do first

The patient separately has to interact with their provider, insurance company, PBM, pharmacy, manufacturer, and potentially a hub or specialty pharmacy — none of which gives them a complete picture. Prescriptions fall out of the funnel not just because of insurance denial, but because of confusion, sticker shock, and inaction.

Pharma invests heavily in hubs, copay programs, and patient support — but these programs go underutilized because patients don't know they exist or how to access them.

---

## Target User (Demo)

A commercially insured patient who has just received a prescription for a high-cost branded specialty medication. They know what they were prescribed. They haven't filled it yet, or they tried and hit a problem.

The demo is built around one fictional specialty drug with realistic characteristics:
- Retail/insurance cost: ~$500–$850/fill
- Manufacturer copay card: reduces cost to $25
- Prior authorization typically required
- Specialty pharmacy required

This makes every feature of the product easy to demonstrate.

---

## Buyer (for the pitch)

Pharmaceutical manufacturer. They sponsor the experience for their medication. The value proposition: increase first-fill conversion by helping eligible patients identify and navigate the best access pathway. Secondary value: understand where and why prescriptions are falling out of the funnel.

---

## What the Demo Is NOT

- Not a discount card
- Not a medication database
- Not a clinical recommendation engine
- Not a hub
- Not a generic drug shopper
- Not a real data integration

The demo proves one thing: **will a patient understand and value a personalized comparison of ways to start a prescription?**

---

## User Flow (7 Screens)

### Screen 1 — Landing

**Headline:** Your prescription shouldn't come with a guessing game.

**Subheadline:** See your options for getting your medication and find the best path to your first fill.

**CTA:** [Get started]

**Supporting copy:** Takes about 2 minutes.

---

### Screen 2 — Prescription Entry

**Header:** What were you prescribed?

Fields:
- Medication name (text input or typeahead — pre-populate with the demo drug)
- Dose
- Quantity

For the demo: pre-fill with the fictional drug and allow the user to proceed directly. Add a [Scan prescription] button as a UI element (non-functional in demo).

---

### Screen 3 — Insurance

**Header:** How are you planning to pay?

Options:
- Commercial insurance (most common)
- I'm not sure
- No insurance

If "Commercial insurance":
- Insurance company (search/dropdown — use 5–6 fictional insurers)
- Plan name (dropdown — populate with realistic fictional plan names)

---

### Screen 4 — Pharmacy Experience

**Header:** Have you tried to fill it yet?

This screen is critical — it grounds the product in the actual patient situation and captures structured fallout data.

Options (large tap targets, emoji-anchored):

🟢 **Not yet** — I'll help you figure out the best path before you go.

🟡 **Yes — I was told a price** — What were you quoted? [$____]

🔴 **Yes — insurance denied it** — What did they say?
- Prior authorization required
- Not covered
- Step therapy required
- Quantity limit
- Other / I'm not sure

---

### Screen 5 — Patient Situation

**Header:** A few more questions to find your best option.

Questions (keep short):
- Are you enrolled in a commercial health plan? (Yes / No / Not sure)
- Are you currently taking this medication? (Yes / No)
- How soon do you need your first dose?
  - Today
  - This week
  - Whenever is cheapest

Optional (V1 can skip): How much of your deductible have you already met?

---

### Screen 6 — Results

**Header:** Here are your options

**Subheader:** We found 3 ways you may be able to start your prescription.

**Recommendation banner (above the cards):**

> ⭐ We recommend the Manufacturer Copay Program
>
> It's expected to reduce your first-fill cost from $650 → $25, and you appear eligible.
>
> Tradeoff: Copay assistance may not count toward your deductible.
>
> Time: ~2–3 days
>
> [Start enrollment]  [See all options ↓]

**Option cards:**

| | Option 1 | Option 2 | Option 3 |
|---|---|---|---|
| Label | ⭐ Recommended | Lowest effort | Lowest potential cost |
| Name | Manufacturer Copay Program | Use your insurance | Patient Assistance Program |
| Estimated cost | $25 | $650 | $0 |
| Time to fill | 2–3 days | Today | 1–2 weeks |
| Pros | Lowest OOP, simple enrollment | No enrollment, counts toward deductible, fill today | Potentially $0 OOP |
| Cons | May not count toward deductible, requires enrollment | High OOP | Eligibility requirements, application required, slower |
| CTA | [Get started] | [Use insurance] | [Check eligibility] |

**Preference toggle (optional but powerful for demo):**

What matters most to you?
- 💰 Lowest cost
- ⚡ Fastest access
- 📋 Least hassle

Selecting a preference should re-rank the cards and update the recommendation rationale in real time.

---

### Screen 7 — Routing / Confirmation

When the patient taps a CTA on the results screen, show a handoff screen:

**Manufacturer Copay Program:**
> You're being connected to [Drug Name]'s enrollment program.
> 
> You'll need: Your insurance card, prescription information.
> 
> Estimated time: 5–10 minutes.
> 
> [Continue to enrollment →]

**Use insurance:**
> Take this to your pharmacy. Show them your insurance card.
> 
> Your estimated cost: $650. You can always come back to explore other options.
> 
> [Find a pharmacy near me]

**Patient Assistance Program:**
> Let's check your eligibility.
> 
> [Begin application →]

---

## Data Model (Mocked)

```ts
type Drug = {
  name: string;
  dose: string;
  quantity: string;
  manufacturer: string;
  retailCost: number;
};

type Patient = {
  insurance: string;
  plan: string;
  deductibleRemaining: number;
  oopRemaining: number;
  urgency: 'today' | 'this-week' | 'cheapest';
  previousFillAttempt: 'none' | 'quoted' | 'denied';
  quotedPrice?: number;
  denialReason?: string;
};

type AccessOption = {
  id: string;
  name: string;
  label: 'recommended' | 'lowest-effort' | 'lowest-cost';
  estimatedCost: number;
  timeToFill: string;
  effort: 'low' | 'medium' | 'high';
  deductibleImpact: boolean;
  eligibilityRequirements: string[];
  pros: string[];
  cons: string[];
  actionUrl: string;
  score: number;
};

type Recommendation = {
  option: AccessOption;
  rationale: string;
  tradeoff: string;
};
```

---

## Scoring Logic

Simple weighted score — don't over-engineer for V1.

```ts
score =
  costWeight * normalizedCost
  + speedWeight * normalizedTime
  + effortWeight * normalizedEffort
  + deductibleWeight * deductibleImpact
  + certaintyWeight * probabilityOfSuccess
```

Weights shift based on the patient's stated preference (lowest cost / fastest / least hassle). The preference toggle on the results screen updates weights and re-ranks in real time. This is a powerful demo moment — it shows that "best" depends on the patient's situation.

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS + shadcn/ui components
- **State:** React state or Zustand for multi-step form
- **Data:** Mocked JSON / hardcoded — no real API calls
- **Deployment:** Vercel

No database, no auth, no real integrations needed for the demo.

---

## Pages / Routes

```
/                     Landing page
/rx                   Step 2: Prescription entry
/insurance            Step 3: Insurance
/pharmacy             Step 4: Pharmacy experience
/situation            Step 5: Patient questions
/results              Step 6: Pathway comparison + recommendation
/next/[option]        Screen 7: Routing/confirmation per option
```

Use Next.js App Router. Persist multi-step form state in a lightweight client context or URL params.

---

## What the Demo Must Prove

1. A patient can complete the full flow in under 2 minutes
2. The recommendation feels personalized and trustworthy (not generic)
3. The tradeoffs are explained in plain language, not jargon
4. Changing the preference (cost / speed / effort) visibly re-ranks options
5. The handoff feels like a real product, not a link dump

---

## What to Exclude from V1

- Real drug database
- Real insurance integrations
- Real claims or pharmacy integrations
- Therapeutic alternatives or clinical recommendations
- Medication adherence features
- Generic drug shopping
- Actual patient data
- Authentication

---

## Future Vision (context, not scope)

**Point-of-prescribing:** Patient receives the results screen before they ever go to the pharmacy, triggered when the e-prescription is sent.

**Point-of-pharmacy intervention:** Claim rejects at the pharmacy → patient is routed to the right intervention in real time.

**Pharma dashboard:** Manufacturers see where prescriptions are falling out of the funnel (affordability, PA, pharmacy access, patient uncertainty) and which interventions recover patients.

**The data flywheel:** Patient-reported fallout reasons (too expensive, insurance denied it, didn't know what to do) capture the 30–70% of prescription abandonment that happens *outside* hub and claims data — the gap no existing vendor currently owns.

---

## Success Criteria for the Demo

A viewer who sees this demo should walk away thinking:

> "I understand exactly what this product does, I can see why a patient would use it, and I can see why a pharma company would pay for it."
