"use client";

import { cn } from "@/lib/utils";
import { PreferenceKey } from "@/lib/types";

const OPTIONS: { key: PreferenceKey; emoji: string; label: string }[] = [
  { key: "cost", emoji: "💰", label: "Lowest cost" },
  { key: "speed", emoji: "⚡", label: "Fastest access" },
  { key: "effort", emoji: "📋", label: "Least hassle" },
];

export function PreferenceToggle({
  value,
  onChange,
}: {
  value: PreferenceKey | null;
  onChange: (value: PreferenceKey) => void;
}) {
  return (
    <div>
      <p className="mb-3 text-sm font-medium text-muted-foreground">What matters most to you?</p>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {OPTIONS.map((opt) => (
          <button
            key={opt.key}
            type="button"
            onClick={() => onChange(opt.key)}
            className={cn(
              "flex items-center justify-center gap-2 rounded-lg border-2 px-4 py-3 text-sm font-medium transition-colors",
              value === opt.key
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-card hover:border-foreground/40",
            )}
          >
            <span>{opt.emoji}</span>
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
