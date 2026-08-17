"use client";

import { useRouter } from "next/navigation";
import { ChoiceButton } from "@/components/choice-button";
import { StepIndicator } from "@/components/step-indicator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { INSURANCE_COMPANIES, INSURANCE_PLANS } from "@/lib/data";
import { useNavigatorStore } from "@/lib/store";
import { InsuranceStatus } from "@/lib/types";

const STATUS_OPTIONS: { key: InsuranceStatus; label: string }[] = [
  { key: "commercial", label: "Commercial insurance" },
  { key: "not-sure", label: "Not sure" },
  { key: "none", label: "No insurance" },
];

export default function InsurancePage() {
  const router = useRouter();
  const patient = useNavigatorStore((s) => s.patient);
  const setInsurance = useNavigatorStore((s) => s.setInsurance);

  const status = patient.insuranceStatus;
  const canContinue = status !== "commercial" || (patient.insuranceCompany && patient.plan);

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-6 py-12">
      <StepIndicator current={2} />
      <h1 className="mb-1 text-2xl font-bold tracking-tight">Do you have insurance?</h1>
      <p className="mb-8 text-muted-foreground">This helps us find what you&apos;re eligible for.</p>

      <div className="flex flex-col gap-3">
        {STATUS_OPTIONS.map((opt) => (
          <ChoiceButton
            key={opt.key}
            selected={status === opt.key}
            onClick={() =>
              setInsurance(
                opt.key,
                opt.key === "commercial" ? (patient.insuranceCompany ?? INSURANCE_COMPANIES[0]) : null,
                opt.key === "commercial" ? (patient.plan ?? INSURANCE_PLANS[0]) : null,
              )
            }
          >
            {opt.label}
          </ChoiceButton>
        ))}
      </div>

      {status === "commercial" && (
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label>Insurance company</Label>
            <Select
              value={patient.insuranceCompany ?? undefined}
              onValueChange={(v) => setInsurance("commercial", v, patient.plan)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a company" />
              </SelectTrigger>
              <SelectContent>
                {INSURANCE_COMPANIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Plan</Label>
            <Select
              value={patient.plan ?? undefined}
              onValueChange={(v) => setInsurance("commercial", patient.insuranceCompany, v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a plan" />
              </SelectTrigger>
              <SelectContent>
                {INSURANCE_PLANS.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <Button size="lg" className="mt-8" disabled={!canContinue} onClick={() => router.push("/pharmacy")}>
        Continue
      </Button>
    </div>
  );
}
