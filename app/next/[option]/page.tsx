"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ClipboardCheck, Pill } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useNavigatorStore } from "@/lib/store";
import { AccessOptionId } from "@/lib/types";

const CONTENT: Record<
  AccessOptionId,
  { title: string; icon: typeof Pill; steps: string[]; ctaLabel: string }
> = {
  copay: {
    title: "Enroll in the copay program",
    icon: ClipboardCheck,
    steps: [
      "Create your copay card account (about 2 minutes).",
      "Confirm your commercial insurance details.",
      "Get your copay card instantly — show it at any pharmacy.",
    ],
    ctaLabel: "Continue to enrollment",
  },
  insurance: {
    title: "Fill using your insurance",
    icon: Pill,
    steps: [
      "This medication requires a specialty pharmacy — we'll route your prescription there.",
      "Your plan may require prior authorization; your doctor's office can submit this.",
      "Bring your insurance card to the pharmacy counter.",
    ],
    ctaLabel: "Find a specialty pharmacy",
  },
  pap: {
    title: "Check patient assistance eligibility",
    icon: CheckCircle2,
    steps: [
      "Answer a few questions about your income and insurance status.",
      "Upload proof of income if requested.",
      "Get a decision by email within 1-2 weeks.",
    ],
    ctaLabel: "Start eligibility check",
  },
};

export default function RoutingPage({ params }: { params: Promise<{ option: string }> }) {
  const { option } = use(params);
  const drug = useNavigatorStore((s) => s.drug);

  if (!(option in CONTENT)) {
    notFound();
  }

  const { title, icon: Icon, steps, ctaLabel } = CONTENT[option as AccessOptionId];

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-6 py-12">
      <Card>
        <CardHeader className="items-center text-center">
          <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-foreground text-background">
            <Icon className="size-6" />
          </div>
          <h1 className="text-xl font-bold">{title}</h1>
          <p className="text-sm text-muted-foreground">
            For {drug.name} {drug.dose}
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <ol className="flex flex-col gap-3 text-sm">
            {steps.map((step, i) => (
              <li key={step} className="flex items-start gap-3">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <button
            type="button"
            disabled
            className={buttonVariants({ size: "lg", className: "w-full opacity-70" })}
          >
            {ctaLabel}
          </button>
          <p className="text-center text-xs text-muted-foreground">
            This is a prototype — real enrollment isn&apos;t connected yet.
          </p>
          <Link href="/results" className="text-center text-sm font-medium underline underline-offset-4">
            Back to my options
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
