"use client";

import { useRouter } from "next/navigation";
import { ScanLine } from "lucide-react";
import { StepIndicator } from "@/components/step-indicator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigatorStore } from "@/lib/store";

export default function PrescriptionEntryPage() {
  const router = useRouter();
  const drug = useNavigatorStore((s) => s.drug);
  const setDrug = useNavigatorStore((s) => s.setDrug);

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-6 py-12">
      <StepIndicator current={1} />
      <h1 className="mb-1 text-2xl font-bold tracking-tight">What were you prescribed?</h1>
      <p className="mb-8 text-muted-foreground">
        We&apos;ve pre-filled this from your prescription. Double-check it looks right.
      </p>

      <button
        type="button"
        className="mb-6 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border py-3 text-sm font-medium text-muted-foreground"
        disabled
      >
        <ScanLine className="size-4" />
        Scan prescription
      </button>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="med-name">Medication name</Label>
          <Input id="med-name" value={drug.name} onChange={(e) => setDrug({ name: e.target.value })} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="dose">Dose</Label>
            <Input id="dose" value={drug.dose} onChange={(e) => setDrug({ dose: e.target.value })} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              value={drug.quantity}
              onChange={(e) => setDrug({ quantity: e.target.value })}
            />
          </div>
        </div>
      </div>

      <Button size="lg" className="mt-8" onClick={() => router.push("/insurance")}>
        Continue
      </Button>
    </div>
  );
}
