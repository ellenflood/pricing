# Prescription in Progress
### Problem Statement & Solution Description
HBS Founder Lab · August 2026

---

## The Problem

When a doctor prescribes a specialty medication — a biologic for rheumatoid arthritis, a treatment for Crohn's, a psoriasis drug — the prescription is only the beginning. What follows is an invisible, fragmented process that can take days or weeks, involves five or more separate parties, and gives the patient almost no information about what is happening or what it will cost.

**The patient's experience today:**

She leaves the doctor's office with a prescription. Her insurer requires prior authorization — a pre-approval process that her doctor's office must initiate. This takes anywhere from two days to six weeks. During that time, she hears nothing. She calls the doctor's office: "We submitted it." She calls the pharmacy: "We're waiting on authorization." She calls her insurance company and waits on hold. Nobody has a complete picture. Nobody proactively updates her.

When the PA finally clears, she goes to the pharmacy and is quoted $650. She didn't know a manufacturer copay card exists that would bring her cost to $25. She walks out. The prescription is never filled.

This is not an edge case. Prior authorization is the top healthcare challenge for arthritis patients, cited consistently above cost, formulary changes, and step therapy. 48% of specialty medication patients spend more than five hours a month managing health coverage. First-fill abandonment rates for specialty drugs run 20–30%. Studies suggest 30–70% of prescriptions flow outside of manufacturer support programs entirely — meaning patients who could have been helped weren't, and nobody knows why.

**The two problems in one sentence:**

Patients don't know what's happening with their prescription, and they don't know what it's going to cost until it's too late to do anything about it.

---

## Why This Hasn't Been Solved

Hubs — the manufacturer-sponsored infrastructure that handles PA, copay enrollment, and specialty pharmacy routing — exist for the drugs they support. But they work for the manufacturer, not the patient. They tell the patient "here's how to get Drug X." They don't tell the patient "here are all your options and here's what each one will cost."

The financial navigator at the doctor's office knows more, but she's managing 30–50 patients simultaneously across multiple drugs and programs, using spreadsheets and phone calls. She has no unified view of who needs attention today, which foundation funds are open, or which patient walked out of a pharmacy three weeks ago and never came back.

The patient has no view at all.

---

## The Solution

**Prescription in Progress** is a shared access timeline connecting the financial navigator's workflow to the patient's phone.

The navigator works in a purpose-built command center: a prioritized worklist showing every patient whose prescription isn't yet successfully in their hands, with the blocker identified, the pathways compared, and the next best action specified. Not just "here are your options" — but "submit the PA first, then enroll in the copay card once it clears, then route to CVS Specialty. Expected patient cost: $25."

The patient sees the same case, translated into plain language, in real time:

> **Your medication**
> Prior authorization submitted Monday at 2:14pm.
> Your care team is waiting for your insurance company.
> Nothing is required from you right now.
> **Estimated cost after approval: $25**
> We'll notify you when something changes.

When the PA clears, the patient is notified. When the copay card is enrolled, the patient is notified. When the prescription ships, the patient is notified. Nobody has to call anybody.

**This is not a hub.** The product is upstream of the hub — it tells the navigator which call to make, which program to use, and what to do in what order. The hub executes. The product decides and communicates.

**This is not TailorMed.** TailorMed is a financial assistance matching platform sold to hospital revenue cycle teams. Its value proposition is recovering uncompensated care for health systems. Prescription in Progress is a decision and communication layer sold to specialty practices, with a patient-facing experience tied to the navigator's actual workflow.

---

## Who This Is For

**Primary user (navigator):** The financial navigator or patient access coordinator at a specialty rheumatology, GI, dermatology, or oncology practice. She manages 30–100 active cases. She currently uses a combination of spreadsheets, manufacturer portals, foundation websites she checks manually each morning, and phone calls. Her job is to get patients onto therapy. Her tools are not built for that job.

**Secondary user (patient):** A commercially insured patient prescribed a high-cost specialty medication. She is not being asked to navigate anything — she is being kept informed while the navigator does the work.

**Economic buyer:** The specialty practice, paying per navigator seat. Secondary monetization: pharma manufacturers, who have a direct economic interest in first-fill conversion and currently have no visibility into why prescriptions fall out before the hub ever sees them.

---

## What the Demo Shows

Two panels. One product.

**Panel 1 — Navigator view:**
A single patient case: prescription received, benefits verified, PA required and submitted, copay card eligible pending approval. The navigator sees the full pathway comparison (insurance at $650, copay card at $25, PAP at $0 but 2 weeks), the recommended sequence, and the next action. A fund monitor strip at the top shows real-time foundation fund status for her patient population — the one thing she currently has to check manually across six websites every morning.

**Panel 2 — Patient view:**
The same case, on a phone. A clean status timeline showing exactly where things stand, in plain language. Estimated cost front and center. "Nothing required from you right now." A notification that fires when the PA approves.

The demo makes one argument: the navigator does the work once, in a tool built for her workflow, and the patient sees it in real time without calling anyone.

---

## The Wedge

Start with specialty rheumatology practices. They prescribe the highest volume of biologics outside of oncology. The financial navigator role is established but underserved by existing tools. The drugs are expensive enough that copay card and PAP access are almost always relevant. And the PA burden is acute — PPO patients wait an average of 37–41 days for biologic approval.

The foundation fund monitor is the immediate hook. It's the most clearly absent feature in the existing landscape, it creates daily habit, and it's something every navigator understands the value of immediately without a sales pitch.

---

*Prescription in Progress · HBS Founder Lab · August 2026*
