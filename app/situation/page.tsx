"use client";

import { useRouter } from "next/navigation";
import { ChoiceButton } from "@/components/choice-button";
import { StepIndicator } from "@/components/step-indicator";
import { Button } from "@/components/ui/button";
import { useNavigatorStore } from "@/lib/store";
import { Urgency } from "@/lib/types";

const URGENCY_OPTIONS: { key: Urgency; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "this-week", label: "This week" },
  { key: "cheapest", label: "Whenever is cheapest" },
];

export default function SituationPage() {
  const router = useRouter();
  const patient = useNavigatorStore((s) => s.patient);
  const setSituation = useNavigatorStore((s) => s.setSituation);

  const canContinue =
    patient.enrolledCommercialPlan !== null && patient.currentlyTaking !== null && patient.urgency !== null;

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-6 py-12">
      <StepIndicator current={4} />
      <h1 className="mb-1 text-2xl font-bold tracking-tight">A few last questions</h1>
      <p className="mb-8 text-muted-foreground">Almost there — this shapes your recommendation.</p>

      <div className="flex flex-col gap-8">
        <div>
          <p className="mb-3 font-medium">Are you enrolled in a commercial insurance plan?</p>
          <div className="grid grid-cols-2 gap-3">
            <ChoiceButton
              selected={patient.enrolledCommercialPlan === true}
              onClick={() => setSituation({ enrolledCommercialPlan: true })}
              className="text-center"
            >
              Yes
            </ChoiceButton>
            <ChoiceButton
              selected={patient.enrolledCommercialPlan === false}
              onClick={() => setSituation({ enrolledCommercialPlan: false })}
              className="text-center"
            >
              No
            </ChoiceButton>
          </div>
        </div>

        <div>
          <p className="mb-3 font-medium">Are you currently taking this medication?</p>
          <div className="grid grid-cols-2 gap-3">
            <ChoiceButton
              selected={patient.currentlyTaking === true}
              onClick={() => setSituation({ currentlyTaking: true })}
              className="text-center"
            >
              Yes
            </ChoiceButton>
            <ChoiceButton
              selected={patient.currentlyTaking === false}
              onClick={() => setSituation({ currentlyTaking: false })}
              className="text-center"
            >
              No
            </ChoiceButton>
          </div>
        </div>

        <div>
          <p className="mb-3 font-medium">How soon do you need it?</p>
          <div className="flex flex-col gap-3">
            {URGENCY_OPTIONS.map((opt) => (
              <ChoiceButton
                key={opt.key}
                selected={patient.urgency === opt.key}
                onClick={() => setSituation({ urgency: opt.key })}
              >
                {opt.label}
              </ChoiceButton>
            ))}
          </div>
        </div>
      </div>

      <Button size="lg" className="mt-8" disabled={!canContinue} onClick={() => router.push("/results")}>
        See my options
      </Button>
    </div>
  );
}
