"use client";

import { useRouter } from "next/navigation";
import { ChoiceButton } from "@/components/choice-button";
import { StepIndicator } from "@/components/step-indicator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DENIAL_REASONS } from "@/lib/data";
import { useNavigatorStore } from "@/lib/store";
import { FillAttempt } from "@/lib/types";

const ATTEMPT_OPTIONS: { key: FillAttempt; label: string }[] = [
  { key: "none", label: "Not yet" },
  { key: "quoted", label: "I was quoted a price" },
  { key: "denied", label: "My insurance denied it" },
];

export default function PharmacyExperiencePage() {
  const router = useRouter();
  const patient = useNavigatorStore((s) => s.patient);
  const setFillAttempt = useNavigatorStore((s) => s.setFillAttempt);

  const attempt = patient.previousFillAttempt;
  const canContinue =
    attempt !== "quoted" || (patient.quotedPrice !== null && patient.quotedPrice! > 0);

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-6 py-12">
      <StepIndicator current={3} />
      <h1 className="mb-1 text-2xl font-bold tracking-tight">Have you tried to fill it yet?</h1>
      <p className="mb-8 text-muted-foreground">
        This helps us understand where you are in the process.
      </p>

      <div className="flex flex-col gap-3">
        {ATTEMPT_OPTIONS.map((opt) => (
          <ChoiceButton
            key={opt.key}
            selected={attempt === opt.key}
            onClick={() => setFillAttempt(opt.key)}
          >
            {opt.label}
          </ChoiceButton>
        ))}
      </div>

      {attempt === "quoted" && (
        <div className="mt-6 flex flex-col gap-1.5">
          <Label htmlFor="quoted-price">What price were you quoted?</Label>
          <Input
            id="quoted-price"
            type="number"
            min={0}
            placeholder="$650"
            value={patient.quotedPrice ?? ""}
            onChange={(e) => setFillAttempt("quoted", e.target.value ? Number(e.target.value) : null)}
          />
        </div>
      )}

      {attempt === "denied" && (
        <div className="mt-6 flex flex-col gap-1.5">
          <Label>What reason did they give?</Label>
          <Select
            value={patient.denialReason ?? undefined}
            onValueChange={(v) => setFillAttempt("denied", null, v)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a reason" />
            </SelectTrigger>
            <SelectContent>
              {DENIAL_REASONS.map((reason) => (
                <SelectItem key={reason} value={reason}>
                  {reason}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <Button size="lg" className="mt-8" disabled={!canContinue} onClick={() => router.push("/situation")}>
        Continue
      </Button>
    </div>
  );
}
