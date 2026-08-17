import { cn } from "@/lib/utils";

const STEPS = ["Prescription", "Insurance", "Pharmacy", "Situation"];

export function StepIndicator({ current }: { current: number }) {
  return (
    <div className="mb-8 flex items-center gap-2">
      {STEPS.map((label, i) => {
        const stepNum = i + 1;
        const isDone = stepNum < current;
        const isCurrent = stepNum === current;
        return (
          <div key={label} className="flex flex-1 items-center gap-2">
            <div
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                isDone || isCurrent ? "bg-foreground" : "bg-muted",
              )}
            />
          </div>
        );
      })}
      <span className="ml-2 shrink-0 text-xs text-muted-foreground">
        Step {current} of {STEPS.length}
      </span>
    </div>
  );
}
