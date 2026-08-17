export type InsuranceStatus = "commercial" | "not-sure" | "none";

export type FillAttempt = "none" | "quoted" | "denied";

export type Urgency = "today" | "this-week" | "cheapest";

export type PreferenceKey = "cost" | "speed" | "effort";

export type Drug = {
  name: string;
  dose: string;
  quantity: string;
  manufacturer: string;
  retailCost: number;
};

export type Patient = {
  insuranceStatus: InsuranceStatus | null;
  insuranceCompany: string | null;
  plan: string | null;
  previousFillAttempt: FillAttempt;
  quotedPrice: number | null;
  denialReason: string | null;
  enrolledCommercialPlan: boolean | null;
  currentlyTaking: boolean | null;
  urgency: Urgency | null;
};

export type AccessOptionId = "copay" | "insurance" | "pap";

export type AttributeLabel = "lowest-effort" | "lowest-cost" | "balanced";

export type AccessOption = {
  id: AccessOptionId;
  name: string;
  attributeLabel: AttributeLabel;
  estimatedCost: number;
  timeToFill: string;
  effort: "low" | "medium" | "high";
  deductibleImpact: boolean;
  probabilityOfSuccess: number;
  pros: string[];
  cons: string[];
};

export type ScoredOption = AccessOption & {
  score: number;
  isRecommended: boolean;
};

export type Recommendation = {
  option: ScoredOption;
  rationale: string;
  tradeoff: string;
};
