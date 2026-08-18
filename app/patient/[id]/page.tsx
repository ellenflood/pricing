import { notFound } from "next/navigation";
import { Check, MessageSquareText } from "lucide-react";
import { patients, type Stage } from "@/lib/data";
import { cn } from "@/lib/utils";

function StageRow({ stage, isLast }: { stage: Stage; isLast: boolean }) {
  return (
    <li className="relative flex gap-4 pb-7 last:pb-0">
      {!isLast && (
        <span
          className={cn(
            "absolute left-[11px] top-6 h-full w-px",
            stage.status === "pending" ? "bg-gray-200" : "bg-emerald-200",
          )}
        />
      )}
      <span
        className={cn(
          "relative z-10 mt-0.5 flex size-[23px] shrink-0 items-center justify-center rounded-full border-2",
          stage.status === "complete" && "border-emerald-600 bg-emerald-600 text-white",
          stage.status === "active" && "border-sky-600 bg-white",
          stage.status === "pending" && "border-gray-300 bg-white",
        )}
      >
        {stage.status === "complete" && <Check className="size-3.5" strokeWidth={3} />}
        {stage.status === "active" && (
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-500 opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-sky-600" />
          </span>
        )}
      </span>
      <div className="flex-1 pt-0.5">
        <p
          className={cn(
            "text-sm font-medium",
            stage.status === "pending" ? "text-gray-400" : "text-[#16202B]",
            stage.status === "active" && "font-semibold",
          )}
        >
          {stage.label}
          {stage.timestamp && (
            <span className="ml-2 font-mono text-xs font-normal text-gray-400">{stage.timestamp}</span>
          )}
        </p>
        {stage.note && (
          <p className={cn("mt-0.5 text-xs", stage.status === "pending" ? "text-gray-400" : "text-gray-500")}>
            {stage.note}
          </p>
        )}
      </div>
    </li>
  );
}

export default async function PatientStatusPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const patient = patients.find((p) => p.id === id);

  if (!patient) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100 px-5 py-4">
        <p className="font-heading text-sm font-semibold tracking-tight text-[#16202B]">
          Prescription in Progress
        </p>
        <p className="text-xs text-gray-500">Northside Rheumatology</p>
      </header>

      <main className="mx-auto flex max-w-md flex-col gap-6 px-5 py-8">
        <div>
          <p className="text-sm font-medium text-gray-500">{patient.patientDrugLabel}</p>
          <h1 className="mt-1 text-2xl leading-snug font-bold text-[#16202B]">
            {patient.patientStatusHeadline}
          </h1>
        </div>

        <p className="text-[15px] leading-relaxed text-gray-600">{patient.patientStatusDetail}</p>

        <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-sky-50 p-5">
          <p className="text-xs font-medium tracking-wide text-emerald-800 uppercase">Estimated cost</p>
          <p className="mt-1 text-3xl font-bold text-[#16202B]">{patient.patientCostEstimate}</p>
          <p className="mt-1 text-xs text-gray-500">Next update: {patient.patientNextUpdate}</p>
        </div>

        {patient.patientRequiredAction && (
          <div className="flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4">
            <MessageSquareText className="mt-0.5 size-4 shrink-0 text-amber-700" />
            <p className="text-sm text-amber-900">{patient.patientRequiredAction}</p>
          </div>
        )}

        <div>
          <p className="mb-4 text-xs font-medium tracking-wide text-gray-400 uppercase">Status timeline</p>
          <ol>
            {patient.stages.map((stage, i) => (
              <StageRow stage={stage} isLast={i === patient.stages.length - 1} key={stage.label} />
            ))}
          </ol>
        </div>

        <footer className="mt-4 border-t border-gray-100 pt-4 text-xs text-gray-400">
          <p>Questions? Call Northside Rheumatology: (617) 555-0182</p>
          <p className="mt-1">Last updated: Mon Aug 17, 8:42am</p>
        </footer>
      </main>
    </div>
  );
}
