export type Fund = {
  id: string;
  name: string;
  diagnosis: string;
  status: "open" | "waitlist" | "closed";
  statusNote: string;
  alertOn: boolean;
};

export const funds: Fund[] = [
  {
    id: "pan",
    name: "PAN Foundation",
    diagnosis: "Rheumatoid arthritis",
    status: "open",
    statusNote: "opened 2h ago",
    alertOn: false,
  },
  {
    id: "healthwell",
    name: "HealthWell Foundation",
    diagnosis: "Psoriatic arthritis",
    status: "closed",
    statusNote: "",
    alertOn: false,
  },
  {
    id: "taf",
    name: "The Assistance Fund",
    diagnosis: "Ankylosing spondylitis",
    status: "waitlist",
    statusNote: "since 11 Aug",
    alertOn: false,
  },
  {
    id: "gooddays",
    name: "Good Days",
    diagnosis: "Lupus",
    status: "closed",
    statusNote: "",
    alertOn: true,
  },
  {
    id: "paf",
    name: "Patient Advocate Foundation",
    diagnosis: "Crohn's disease",
    status: "open",
    statusNote: "since 4 Aug",
    alertOn: false,
  },
];

export type Stage = {
  label: string;
  status: "complete" | "active" | "pending";
  timestamp?: string;
  note?: string;
};

export type AccessOption = {
  name: string;
  estimatedCost: string;
  timeToFill: string;
  isBest: boolean;
  pros: string[];
  cons: string[];
  info?: string[];
};

export type Patient = {
  id: string;
  name: string;
  mrn: string;
  diagnosis: string;
  drug: string;
  drugDose: string;
  flag: "hot" | "warm" | "ok";
  blockerBold: string;
  blockerDetail: string;
  blockerOrder: "bold-first" | "plain-first";
  pathLabel: string;
  pathCost: string;
  pathPillStyle: "copay" | "pap" | "ins" | "fund" | "none";
  costSubLabel?: string;
  clockLabel: string;
  clockUrgency: "hot" | "warm" | "neutral";
  clockSub: string;
  ctaLabel: string;
  ctaStyle: "solid" | "ghost";
  detailNote: string;
  options: AccessOption[];
  recommendedSequence: string;
  actions: { label: string; style: "solid" | "ghost" }[];
  // Patient-facing timeline
  patientDrugLabel: string;
  patientStatusHeadline: string;
  patientStatusDetail: string;
  patientCostEstimate: string;
  patientNextUpdate: string;
  patientRequiredAction: string | null;
  stages: Stage[];
};

export const patients: Patient[] = [
  {
    id: "okafor",
    name: "D. Okafor",
    mrn: "4471",
    diagnosis: "RA",
    drug: "Velmarix",
    drugDose: "40mg · 2 pens/mo",
    flag: "hot",
    blockerBold: "Copay card expires Friday.",
    blockerDetail: "Re-enrollment not started.",
    blockerOrder: "bold-first",
    pathLabel: "COPAY",
    pathCost: "$25",
    pathPillStyle: "copay",
    clockLabel: "4d left",
    clockUrgency: "hot",
    clockSub: "Rx 22 Jul",
    ctaLabel: "Re-enroll",
    ctaStyle: "solid",
    detailNote: "Pathway comparison · deductible $1,140 remaining · patient prefers lowest cost",
    options: [
      {
        name: "Manufacturer copay",
        estimatedCost: "$25",
        timeToFill: "2–3 days · re-enrollment form",
        isBest: true,
        pros: ["Eligible — commercial plan confirmed", "Same card, annual renewal only"],
        cons: ["Doesn't touch deductible"],
        info: ["Annual cap $13,000 · $4,200 used"],
      },
      {
        name: "PAN Foundation grant",
        estimatedCost: "$0",
        timeToFill: "1–2 weeks · income verification",
        isBest: false,
        pros: ["RA fund opened 2h ago", "Counts toward deductible"],
        cons: ["Won't land before Friday"],
        info: ["Household income doc needed"],
      },
      {
        name: "Insurance only",
        estimatedCost: "$610",
        timeToFill: "Same day · no paperwork",
        isBest: false,
        pros: ["PA already approved thru Jan", "Applies to deductible"],
        cons: ["Patient declined this in June"],
      },
    ],
    recommendedSequence:
      "Re-enroll the copay card today to protect Friday's fill, and start the PAN application in parallel — the RA fund just opened and closed twice this summer. If the grant lands, switch at the next fill and recover the deductible credit.",
    actions: [
      { label: "Open re-enrollment", style: "solid" },
      { label: "Start PAN application", style: "ghost" },
      { label: "Copy note to chart", style: "ghost" },
    ],
    patientDrugLabel: "Velmarix 40mg",
    patientStatusHeadline: "Your copay card needs to be renewed",
    patientStatusDetail:
      "Your care team is working on renewing your manufacturer copay card before Friday's fill. Nothing is required from you right now.",
    patientCostEstimate: "$25",
    patientNextUpdate: "Thu Aug 21",
    patientRequiredAction: null,
    stages: [
      { label: "Rx received", status: "complete" },
      { label: "Benefits verified", status: "complete" },
      { label: "Copay card active", status: "complete", note: "Expires Friday — renewal in progress" },
      { label: "Renewal complete", status: "pending" },
    ],
  },
  {
    id: "vance",
    name: "R. Vance",
    mrn: "3388",
    diagnosis: "PsA",
    drug: "Obrelza",
    drugDose: "150mg · monthly",
    flag: "hot",
    blockerBold: "PA denied 15 Aug",
    blockerDetail: "step therapy not documented.",
    blockerOrder: "bold-first",
    pathLabel: "APPEAL",
    pathCost: "$780",
    pathPillStyle: "ins",
    clockLabel: "Appeal in 11d",
    clockUrgency: "hot",
    clockSub: "Denied 15 Aug",
    ctaLabel: "Draft appeal",
    ctaStyle: "solid",
    detailNote: "Pathway comparison · appeal window closes 28 Aug",
    options: [
      {
        name: "Appeal with chart pull",
        estimatedCost: "$25",
        timeToFill: "7–14 days · letter + records",
        isBest: true,
        pros: ["Two prior DMARD trials are in the chart", "Restores copay card eligibility"],
        cons: ["Patient waits on therapy"],
      },
      {
        name: "Bridge program",
        estimatedCost: "$0",
        timeToFill: "2 days · manufacturer form",
        isBest: false,
        pros: ["Covers up to 90 days during appeal", "Patient starts this week"],
        cons: [],
        info: ["Requires documented denial — have it"],
      },
      {
        name: "HealthWell grant",
        estimatedCost: "—",
        timeToFill: "Unavailable",
        isBest: false,
        pros: [],
        cons: ["PsA fund closed since 3 Aug"],
        info: ["Alert set — you'll be notified"],
      },
    ],
    recommendedSequence:
      "Start the bridge program today so the patient isn't waiting, then file the appeal with the DMARD history from the 4/12 and 11/03 notes. Bridge covers 90 days — longer than the appeal typically takes.",
    actions: [
      { label: "Start bridge enrollment", style: "solid" },
      { label: "Draft appeal letter", style: "ghost" },
      { label: "Copy note to chart", style: "ghost" },
    ],
    patientDrugLabel: "Obrelza 150mg",
    patientStatusHeadline: "Your insurance denied the request — we're appealing",
    patientStatusDetail:
      "Your insurance company denied coverage on Aug 15. Your care team is preparing an appeal and has enrolled you in a bridge program so you can start therapy this week at no cost while the appeal is pending.",
    patientCostEstimate: "$0 during appeal",
    patientNextUpdate: "Aug 28 (appeal deadline)",
    patientRequiredAction: null,
    stages: [
      { label: "Rx received", status: "complete" },
      { label: "Benefits verified", status: "complete" },
      { label: "PA submitted", status: "complete" },
      { label: "PA denied", status: "complete", timestamp: "Aug 15", note: "Step therapy not documented" },
      { label: "Bridge program enrolled", status: "complete" },
      { label: "Appeal in progress", status: "active" },
    ],
  },
  {
    id: "whitfield",
    name: "J. Whitfield",
    mrn: "5102",
    diagnosis: "AS",
    drug: "Tenvaris",
    drugDose: "200mg · q8wk",
    flag: "warm",
    blockerBold: "no response from plan.",
    blockerDetail: "PA submitted 12 Aug —",
    blockerOrder: "plain-first",
    pathLabel: "COPAY",
    pathCost: "$25",
    pathPillStyle: "copay",
    clockLabel: "Day 5",
    clockUrgency: "warm",
    clockSub: "SLA 72h",
    ctaLabel: "Follow up",
    ctaStyle: "ghost",
    detailNote: "Plan is past its 72-hour turnaround commitment",
    options: [],
    recommendedSequence:
      "Call the plan's provider line and cite the missed SLA — this plan has averaged 6.2 days on your last 14 submissions. Copay card is already active, so the fill goes through at $25 the moment the PA clears.",
    actions: [
      { label: "Log follow-up call", style: "solid" },
      { label: "Copy note to chart", style: "ghost" },
    ],
    patientDrugLabel: "Tenvaris 200mg",
    patientStatusHeadline: "Waiting for your insurance company",
    patientStatusDetail:
      "Your care team submitted a prior authorization request on Aug 12. Your insurance company has not yet responded. Your care team is following up today.",
    patientCostEstimate: "$25 after approval",
    patientNextUpdate: "Today — your care team is following up",
    patientRequiredAction: null,
    stages: [
      { label: "Rx received", status: "complete" },
      { label: "Benefits verified", status: "complete" },
      { label: "PA submitted", status: "complete", timestamp: "Aug 12" },
      { label: "Waiting for insurance decision", status: "active", note: "Day 5 — follow-up in progress" },
      { label: "Copay card enrollment", status: "pending" },
      { label: "Pharmacy routing", status: "pending" },
    ],
  },
  {
    id: "restrepo",
    name: "A. Restrepo",
    mrn: "2914",
    diagnosis: "Lupus",
    drug: "Kavistan",
    drugDose: "300mg · monthly",
    flag: "warm",
    blockerBold: "Medicare Part D",
    blockerDetail: "copay card not permitted.",
    blockerOrder: "bold-first",
    pathLabel: "PAP",
    pathCost: "$0",
    pathPillStyle: "pap",
    clockLabel: "Day 3",
    clockUrgency: "warm",
    clockSub: "Rx 14 Aug",
    ctaLabel: "Check PAP",
    ctaStyle: "solid",
    detailNote: "Federal beneficiary — manufacturer copay assistance is excluded",
    options: [
      {
        name: "Manufacturer PAP",
        estimatedCost: "$0",
        timeToFill: "1–2 weeks · income + Part D denial",
        isBest: true,
        pros: ["Income at 240% FPL — under the 400% cap", "Permitted for Part D patients"],
        cons: ["Needs proof of Part D cost share"],
      },
      {
        name: "Good Days grant",
        estimatedCost: "—",
        timeToFill: "Unavailable",
        isBest: false,
        pros: [],
        cons: ["Lupus fund closed since 28 Jul"],
        info: ["Alert set — you'll be notified"],
      },
      {
        name: "Part D only",
        estimatedCost: "$412",
        timeToFill: "Same day · no paperwork",
        isBest: false,
        pros: ["Counts toward the $2,000 annual cap"],
        cons: ["Above what patient said she can pay"],
      },
    ],
    recommendedSequence:
      "Copay card is blocked by federal rules, not by eligibility — don't offer it. PAP is the path. Pull her Part D cost-share statement from the portal and submit today; approvals on this program have averaged 9 days.",
    actions: [
      { label: "Start PAP application", style: "solid" },
      { label: "Copy note to chart", style: "ghost" },
    ],
    patientDrugLabel: "Kavistan 300mg",
    patientStatusHeadline: "Applying for a patient assistance program",
    patientStatusDetail:
      "Because you have Medicare, manufacturer copay cards aren't available to you. Your care team is applying for the manufacturer's patient assistance program, which can provide the medication at no cost.",
    patientCostEstimate: "$0 (if approved)",
    patientNextUpdate: "Aug 26 (estimated)",
    patientRequiredAction: "Your care team needs your Part D cost-share statement. They'll be in touch.",
    stages: [
      { label: "Rx received", status: "complete" },
      { label: "Benefits verified", status: "complete", note: "Medicare Part D — copay card not permitted" },
      { label: "PAP application in progress", status: "active" },
      { label: "Awaiting approval", status: "pending" },
    ],
  },
  {
    id: "bergquist",
    name: "S. Bergquist",
    mrn: "6620",
    diagnosis: "Crohn's",
    drug: "Rilzuvex",
    drugDose: "90mg · q8wk",
    flag: "ok",
    blockerBold: "Enrollment form unsigned.",
    blockerDetail: "PA approved.",
    blockerOrder: "plain-first",
    pathLabel: "PAF GRANT",
    pathCost: "$0",
    pathPillStyle: "fund",
    clockLabel: "Day 2",
    clockUrgency: "neutral",
    clockSub: "Rx 15 Aug",
    ctaLabel: "Send to sign",
    ctaStyle: "solid",
    detailNote: "Everything cleared — one signature outstanding",
    options: [],
    recommendedSequence:
      "PAF Crohn's fund is open and he qualifies. Text the form for e-signature — fund has been open 13 days, and the median open window for this fund is 21 days. Worth closing this week.",
    actions: [
      { label: "Text form for signature", style: "solid" },
      { label: "Copy note to chart", style: "ghost" },
    ],
    patientDrugLabel: "Rilzuvex 90mg",
    patientStatusHeadline: "One signature needed from you",
    patientStatusDetail:
      "Everything is approved and ready. Your care team has found a grant that will cover your medication at no cost. They just need your signature on the enrollment form.",
    patientCostEstimate: "$0",
    patientNextUpdate: "As soon as you sign",
    patientRequiredAction: "Check your texts — your care team sent a form for your signature.",
    stages: [
      { label: "Rx received", status: "complete" },
      { label: "Benefits verified", status: "complete" },
      { label: "PA approved", status: "complete" },
      { label: "Grant identified", status: "complete", note: "PAF Crohn's fund — open" },
      { label: "Enrollment form sent — awaiting signature", status: "active" },
    ],
  },
  {
    id: "truong",
    name: "L. Truong",
    mrn: "1907",
    diagnosis: "RA",
    drug: "Velmarix",
    drugDose: "40mg · 2 pens/mo",
    flag: "hot",
    blockerBold: "Quoted $650 at pharmacy, walked out.",
    blockerDetail: "Never filled.",
    blockerOrder: "bold-first",
    pathLabel: "COPAY",
    pathCost: "$25",
    pathPillStyle: "copay",
    clockLabel: "19d unfilled",
    clockUrgency: "hot",
    clockSub: "Rx 29 Jul",
    ctaLabel: "Call patient",
    ctaStyle: "solid",
    detailNote: "Abandoned at the counter — recoverable",
    options: [],
    recommendedSequence:
      "She never learned the copay card existed. One call and an enrollment link takes her from $650 to $25. This is the highest-value 10 minutes on today's board — and the reason to flag sticker-shock abandonment as its own status.",
    actions: [
      { label: "Call and enroll", style: "solid" },
      { label: "Text enrollment link", style: "ghost" },
    ],
    patientDrugLabel: "Velmarix 40mg",
    patientStatusHeadline: "There's a program that could reduce your cost to $25",
    patientStatusDetail:
      "When you went to the pharmacy, you may not have known about the manufacturer's copay program. Your care team is reaching out to enroll you. There's nothing you need to do right now.",
    patientCostEstimate: "$25 (vs. $650 at pharmacy)",
    patientNextUpdate: "Your care team will call today",
    patientRequiredAction: null,
    stages: [
      { label: "Rx received", status: "complete" },
      { label: "Pharmacy visit — quoted $650", status: "complete", note: "Patient did not fill · Aug 8" },
      { label: "Copay program identified", status: "active", note: "Care team reaching out to enroll" },
      { label: "Enrollment pending", status: "pending" },
    ],
  },
  {
    id: "adeyemi",
    name: "M. Adeyemi",
    mrn: "7745",
    diagnosis: "PsA",
    drug: "Obrelza",
    drugDose: "150mg · monthly",
    flag: "ok",
    blockerBold: "Benefits not yet verified.",
    blockerDetail: "New Rx.",
    blockerOrder: "plain-first",
    pathLabel: "",
    pathCost: "—",
    pathPillStyle: "none",
    costSubLabel: "pending BV",
    clockLabel: "Day 1",
    clockUrgency: "neutral",
    clockSub: "Rx 16 Aug",
    ctaLabel: "Run benefits",
    ctaStyle: "ghost",
    detailNote: "Nothing to decide until benefits come back",
    options: [],
    recommendedSequence:
      "Run the benefit check first — plan and deductible status determine whether copay card or grant is the better path. Board will re-rank automatically once results post.",
    actions: [{ label: "Run benefit check", style: "solid" }],
    patientDrugLabel: "Obrelza 150mg",
    patientStatusHeadline: "Your care team is checking your coverage",
    patientStatusDetail:
      "Your care team received your prescription and is verifying your insurance benefits. This usually takes 1–2 business days. We'll update you as soon as we know more.",
    patientCostEstimate: "Checking...",
    patientNextUpdate: "Aug 19",
    patientRequiredAction: null,
    stages: [
      { label: "Rx received", status: "complete" },
      { label: "Benefits verification in progress", status: "active" },
      { label: "PA check", status: "pending" },
      { label: "Cost and pathway", status: "pending" },
    ],
  },
];
