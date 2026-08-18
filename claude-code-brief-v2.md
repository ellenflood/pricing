# Build Brief: Prescription in Progress — Demo
For Claude Code · Next.js + Vercel · August 2026

---

## What This Is

A demo for a product called **Prescription in Progress** — a shared access timeline that connects a financial navigator's workflow to the patient's phone. The navigator manages a caseload of patients whose specialty prescriptions aren't yet filled. The patient sees their own case in real time, in plain language, without calling anyone.

This is a demo, not a real app. No backend, no database, no auth, no real integrations. Its job: make the product experience feel real and compelling in a 10-minute live walkthrough.

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **Fonts:** IBM Plex Mono + IBM Plex Sans + Archivo — load from Google Fonts via `next/font`
- **State:** React useState only. No Zustand, no external state library.
- **Data:** Single hardcoded fixture file at `lib/data.ts`. No API calls, no database.
- **Deployment:** Vercel. Must pass `next build` cleanly before deploying.

---

## Routes

Two routes. That's it.

| Route | What it shows |
|---|---|
| `/` | Navigator view — worklist + fund monitor |
| `/patient/[id]` | Patient view — status timeline for one patient |

No other routes. No settings page, no auth, no patient list page beyond the worklist.

---

## Design Reference

A full HTML mockup (`navigator-worklist.html`) is included alongside this brief. Use it as the visual source of truth for the navigator view. **Do not redesign it — replicate it faithfully.** Key design decisions to preserve:

- Dark `#1B2733` fund monitor strip at the top
- IBM Plex Mono for all numbers, statuses, codes, timestamps
- Left border color encodes urgency: `#A62F2B` red = hot, `#9A6208` amber = warm, `#1B6B51` green = ok
- Rows expand/collapse on click to show pathway comparison and recommended sequence
- Filter tabs (All / Expiring / Awaiting PA / Ready to enroll) filter rows in place
- Action buttons show a shadcn Toast: "This would open [X] in the full product"

The patient view is new — design it to feel like a mobile status page, not a dashboard. Think: clean white background, large status indicator, plain language, one thing per screen section. It should feel like a well-designed notification expanded into a page.

---

## Data Fixture (`lib/data.ts`)

All data hardcoded here. Export two arrays: `funds` and `patients`.

### Funds (fund monitor strip)

```ts
type Fund = {
  id: string;
  name: string;
  diagnosis: string;
  status: 'open' | 'waitlist' | 'closed';
  statusNote: string;
  alertOn: boolean;
};

const funds: Fund[] = [
  { id: 'pan', name: 'PAN Foundation', diagnosis: 'Rheumatoid arthritis', status: 'open', statusNote: 'opened 2h ago', alertOn: false },
  { id: 'healthwell', name: 'HealthWell Foundation', diagnosis: 'Psoriatic arthritis', status: 'closed', statusNote: '', alertOn: false },
  { id: 'taf', name: 'The Assistance Fund', diagnosis: 'Ankylosing spondylitis', status: 'waitlist', statusNote: 'since 11 Aug', alertOn: false },
  { id: 'gooddays', name: 'Good Days', diagnosis: 'Lupus', status: 'closed', statusNote: '', alertOn: true },
  { id: 'paf', name: 'Patient Advocate Foundation', diagnosis: "Crohn's disease", status: 'open', statusNote: 'since 4 Aug', alertOn: false },
];
```

### Patients (worklist rows)

```ts
type Stage = {
  label: string;
  status: 'complete' | 'active' | 'pending';
  timestamp?: string;
  note?: string;
};

type AccessOption = {
  name: string;
  estimatedCost: string;
  timeToFill: string;
  isBest: boolean;
  pros: string[];
  cons: string[];
};

type Patient = {
  id: string;
  name: string;
  mrn: string;
  diagnosis: string;
  drug: string;
  drugDose: string;
  flag: 'hot' | 'warm' | 'ok';
  blockerBold: string;
  blockerDetail: string;
  pathLabel: string;
  pathCost: string;
  pathPillStyle: 'copay' | 'pap' | 'ins' | 'fund';
  clockLabel: string;
  clockUrgency: 'hot' | 'warm' | 'neutral';
  clockSub: string;
  ctaLabel: string;
  options: AccessOption[];
  recommendedSequence: string;
  actions: { label: string; style: 'solid' | 'ghost' }[];
  // Patient-facing timeline
  patientDrugLabel: string;
  patientStatusHeadline: string;
  patientStatusDetail: string;
  patientCostEstimate: string;
  patientNextUpdate: string;
  patientRequiredAction: string | null; // null = nothing required
  stages: Stage[];
};
```

Use exactly these 7 patients. Transcribe their data faithfully from the HTML mockup for the navigator fields. Add patient-facing fields as follows:

**Patient 1 — D. Okafor (id: "okafor")**
- patientDrugLabel: "Velmarix 40mg"
- patientStatusHeadline: "Your copay card needs to be renewed"
- patientStatusDetail: "Your care team is working on renewing your manufacturer copay card before Friday's fill. Nothing is required from you right now."
- patientCostEstimate: "$25"
- patientNextUpdate: "Thu Aug 21"
- patientRequiredAction: null
- stages: Rx received ✓, Benefits verified ✓, Copay card active ✓ (note: "Expires Friday — renewal in progress"), Renewal complete (pending)

**Patient 2 — R. Vance (id: "vance")**
- patientDrugLabel: "Obrelza 150mg"
- patientStatusHeadline: "Your insurance denied the request — we're appealing"
- patientStatusDetail: "Your insurance company denied coverage on Aug 15. Your care team is preparing an appeal and has enrolled you in a bridge program so you can start therapy this week at no cost while the appeal is pending."
- patientCostEstimate: "$0 during appeal"
- patientNextUpdate: "Aug 28 (appeal deadline)"
- patientRequiredAction: null
- stages: Rx received ✓, Benefits verified ✓, PA submitted ✓, PA denied Aug 15 (note: "Step therapy not documented"), Bridge program enrolled ✓, Appeal in progress (active)

**Patient 3 — J. Whitfield (id: "whitfield")**
- patientDrugLabel: "Tenvaris 200mg"
- patientStatusHeadline: "Waiting for your insurance company"
- patientStatusDetail: "Your care team submitted a prior authorization request on Aug 12. Your insurance company has not yet responded. Your care team is following up today."
- patientCostEstimate: "$25 after approval"
- patientNextUpdate: "Today — your care team is following up"
- patientRequiredAction: null
- stages: Rx received ✓, Benefits verified ✓, PA submitted Aug 12 ✓, Waiting for insurance decision (active, note: "Day 5 — follow-up in progress"), Copay card enrollment (pending), Pharmacy routing (pending)

**Patient 4 — A. Restrepo (id: "restrepo")**
- patientDrugLabel: "Kavistan 300mg"
- patientStatusHeadline: "Applying for a patient assistance program"
- patientStatusDetail: "Because you have Medicare, manufacturer copay cards aren't available to you. Your care team is applying for the manufacturer's patient assistance program, which can provide the medication at no cost."
- patientCostEstimate: "$0 (if approved)"
- patientNextUpdate: "Aug 26 (estimated)"
- patientRequiredAction: "Your care team needs your Part D cost-share statement. They'll be in touch."
- stages: Rx received ✓, Benefits verified ✓ (note: "Medicare Part D — copay card not permitted"), PAP application in progress (active), Awaiting approval (pending)

**Patient 5 — S. Bergquist (id: "bergquist")**
- patientDrugLabel: "Rilzuvex 90mg"
- patientStatusHeadline: "One signature needed from you"
- patientStatusDetail: "Everything is approved and ready. Your care team has found a grant that will cover your medication at no cost. They just need your signature on the enrollment form."
- patientCostEstimate: "$0"
- patientNextUpdate: "As soon as you sign"
- patientRequiredAction: "Check your texts — your care team sent a form for your signature."
- stages: Rx received ✓, Benefits verified ✓, PA approved ✓, Grant identified ✓ (note: "PAF Crohn's fund — open"), Enrollment form sent — awaiting signature (active)

**Patient 6 — L. Truong (id: "truong")**
- patientDrugLabel: "Velmarix 40mg"
- patientStatusHeadline: "There's a program that could reduce your cost to $25"
- patientStatusDetail: "When you went to the pharmacy, you may not have known about the manufacturer's copay program. Your care team is reaching out to enroll you. There's nothing you need to do right now."
- patientCostEstimate: "$25 (vs. $650 at pharmacy)"
- patientNextUpdate: "Your care team will call today"
- patientRequiredAction: null
- stages: Rx received ✓, Pharmacy visit — quoted $650 (note: "Patient did not fill · Aug 8"), Copay program identified (active, note: "Care team reaching out to enroll"), Enrollment pending (pending)

**Patient 7 — M. Adeyemi (id: "adeyemi")**
- patientDrugLabel: "Obrelza 150mg"
- patientStatusHeadline: "Your care team is checking your coverage"
- patientStatusDetail: "Your care team received your prescription and is verifying your insurance benefits. This usually takes 1–2 business days. We'll update you as soon as we know more."
- patientCostEstimate: "Checking..."
- patientNextUpdate: "Aug 19"
- patientRequiredAction: null
- stages: Rx received ✓, Benefits verification in progress (active), PA check (pending), Cost and pathway (pending)

---

## Navigator View (`/`) — Behavior

Replicate the HTML mockup exactly. See `navigator-worklist.html` for the full visual spec.

**Interactions:**
- Row expand/collapse: click anywhere on row header. Row 1 (Okafor) starts open.
- One row open at a time — opening a new row closes the previous one.
- Filter tabs: All / Expiring / Awaiting PA / Ready to enroll — filter by `flag` value (hot / warm / ok). Patient count in heading updates.
- Bell toggles on fund monitor: toggle `alertOn`, update button label.
- All action buttons show a shadcn Toast: `"[Button label] — this would open the relevant portal or form in the full product."`
- Each row has a "View patient status →" link that navigates to `/patient/[id]`. Place it subtly at the bottom of the expanded detail panel, below the action buttons.

---

## Patient View (`/patient/[id]`) — New Screen

This is the patient-facing experience. Design it fresh — do not reuse the navigator's dark/monospace aesthetic. This should feel like a well-designed mobile status page.

**Layout (top to bottom):**

1. **Header bar** — "Prescription in Progress" wordmark, small. Practice name: "Northside Rheumatology." No navigation.

2. **Drug name** — Large, clear. e.g. "Velmarix 40mg"

3. **Status headline** — Large, prominent. e.g. "Waiting for your insurance company." This is the first thing the patient reads.

4. **Status detail** — 2–3 sentences in plain language. No jargon. No "formulary." No "PBM." No "prior authorization" without explanation.

5. **Estimated cost panel** — Visually distinct. Shows estimated cost prominently. e.g. "$25 after approval." If unknown, show "Checking..."

6. **Required action (if any)** — Amber/yellow callout box. Only shown if `patientRequiredAction` is not null. e.g. "Check your texts — your care team sent a form for your signature." If null, show nothing here.

7. **Stage timeline** — Vertical stepper. Each stage shows: icon (checkmark for complete, spinner/dot for active, empty circle for pending), label, optional timestamp, optional note. Completed stages are muted. Active stage is highlighted. Pending stages are light gray.

8. **Footer** — "Questions? Call Northside Rheumatology: (617) 555-0182" and "Last updated: Mon Aug 17, 8:42am"

**Design direction:** White background. Clean sans-serif body (IBM Plex Sans). Use color sparingly — green for complete stages, a single accent color for the active stage. The cost estimate panel can use a light blue or green background to make it feel positive/reassuring. No dark backgrounds, no monospace for body text. Should feel calm and trustworthy, like a good banking app's transaction status screen.

**No back button or navigation to the worklist.** The patient view is a standalone URL they receive via text or email. They shouldn't be able to navigate to other patients.

---

## What Success Looks Like

A viewer watching this demo should understand within 5 minutes:

1. The navigator has a tool that tells her who needs attention today and what to do — not just a list of programs
2. The patient sees what's happening in plain language without calling anyone
3. The estimated cost is front and center for both — no surprises at the pharmacy
4. The fund monitor at the top of the navigator view is something that doesn't exist anywhere else

---

## Checklist Before Deploying

- [ ] `next build` passes with no errors
- [ ] Fonts load on Vercel
- [ ] No environment variables required
- [ ] `/patient/okafor` and `/patient/whitfield` and `/patient/bergquist` all render correctly (these are the most likely to be demoed)
- [ ] Toast notifications work on action button clicks
- [ ] Row expand/collapse works, one open at a time
- [ ] Filter tabs update row visibility and count
- [ ] "View patient status →" links navigate correctly
- [ ] Patient view looks good on mobile viewport (~390px wide) — this is what an investor imagines a patient seeing on their phone

---

## Do Not Build

- Authentication of any kind
- A real database or API
- More than two routes
- A patient list or patient search
- Settings, preferences, or profile pages
- More than 7 patients or 5 funds
- Anything not described in this brief
