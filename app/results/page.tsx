"use client";

import { useMemo } from "react";
import { OptionCard } from "@/components/option-card";
import { PreferenceToggle } from "@/components/preference-toggle";
import { RecommendationBanner } from "@/components/recommendation-banner";
import { buildAccessOptions } from "@/lib/data";
import { buildRecommendation, scoreOptions } from "@/lib/scoring";
import { useNavigatorStore } from "@/lib/store";

export default function ResultsPage() {
  const drug = useNavigatorStore((s) => s.drug);
  const patient = useNavigatorStore((s) => s.patient);
  const preference = useNavigatorStore((s) => s.preference);
  const setPreference = useNavigatorStore((s) => s.setPreference);

  const scoredOptions = useMemo(() => {
    const options = buildAccessOptions(patient, drug);
    return scoreOptions(options, preference, patient.urgency);
  }, [patient, drug, preference]);

  const recommendation = useMemo(
    () => buildRecommendation(scoredOptions, preference, patient.urgency, drug.retailCost),
    [scoredOptions, preference, patient.urgency, drug.retailCost],
  );

  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
      <p className="mb-1 text-sm text-muted-foreground">
        {drug.name} {drug.dose} · {drug.quantity}
      </p>
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Here&apos;s what we found</h1>

      <RecommendationBanner recommendation={recommendation} />

      <div id="all-options" className="mt-10 mb-6">
        <PreferenceToggle value={preference} onChange={setPreference} />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {scoredOptions.map((option) => (
          <OptionCard key={option.id} option={option} />
        ))}
      </div>
    </div>
  );
}
