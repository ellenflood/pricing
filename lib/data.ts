import { AccessOption, Drug, Patient } from "./types";

export const DEMO_DRUG: Drug = {
  name: "Zenvara",
  dose: "150mg",
  quantity: "30-day supply",
  manufacturer: "Meridian Therapeutics",
  retailCost: 650,
};

export const INSURANCE_COMPANIES = [
  "Cornerstone Health Plan",
  "Summit Health Partners",
  "BrightPath Insurance",
  "Willowbrook Assurance",
  "Pioneer Health Alliance",
  "Harborview Mutual",
];

export const INSURANCE_PLANS = [
  "PPO Choice 500",
  "HMO Essential",
  "Gold Select PPO",
  "Silver Value HMO",
  "EPO Advantage",
  "High Deductible Health Plan",
];

export const DENIAL_REASONS = [
  "Prior authorization required",
  "Not on formulary",
  "Step therapy required",
  "Quantity limit exceeded",
];

export const DEFAULT_PATIENT: Patient = {
  insuranceStatus: "commercial",
  insuranceCompany: INSURANCE_COMPANIES[0],
  plan: INSURANCE_PLANS[0],
  previousFillAttempt: "none",
  quotedPrice: null,
  denialReason: null,
  enrolledCommercialPlan: true,
  currentlyTaking: false,
  urgency: "cheapest",
};

export function buildAccessOptions(patient: Patient, drug: Drug): AccessOption[] {
  const eligibleForCopay =
    patient.insuranceStatus === "commercial" && patient.enrolledCommercialPlan !== false;

  const insuranceCost = patient.previousFillAttempt === "quoted" && patient.quotedPrice
    ? patient.quotedPrice
    : drug.retailCost;

  const insuranceLikelyBlocked = patient.previousFillAttempt === "denied";

  const copay: AccessOption = {
    id: "copay",
    name: "Manufacturer Copay Program",
    attributeLabel: "balanced",
    estimatedCost: 25,
    timeToFill: "2-3 days",
    effort: "medium",
    deductibleImpact: false,
    probabilityOfSuccess: eligibleForCopay ? 0.95 : 0.55,
    pros: ["Lowest out-of-pocket cost", "Simple enrollment"],
    cons: ["May not count toward deductible", "Requires enrollment step"],
  };

  const insurance: AccessOption = {
    id: "insurance",
    name: "Use your insurance",
    attributeLabel: "lowest-effort",
    estimatedCost: insuranceCost,
    timeToFill: "Today",
    effort: "low",
    deductibleImpact: true,
    probabilityOfSuccess: insuranceLikelyBlocked ? 0.3 : 0.85,
    pros: ["No enrollment", "Counts toward deductible", "Fill today"],
    cons: ["High out-of-pocket cost", ...(insuranceLikelyBlocked ? ["Previously denied by your plan"] : [])],
  };

  const pap: AccessOption = {
    id: "pap",
    name: "Patient Assistance Program",
    attributeLabel: "lowest-cost",
    estimatedCost: 0,
    timeToFill: "1-2 weeks",
    effort: "high",
    deductibleImpact: false,
    probabilityOfSuccess: 0.7,
    pros: ["Potentially $0 out of pocket"],
    cons: ["Eligibility requirements", "Application required", "Slower to start"],
  };

  return [copay, insurance, pap];
}
