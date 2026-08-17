import { cn } from "@/lib/utils";

export function ChoiceButton({
  selected,
  onClick,
  children,
  className,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full rounded-xl border-2 px-5 py-4 text-left text-base font-medium transition-colors",
        selected
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-card hover:border-foreground/40",
        className,
      )}
    >
      {children}
    </button>
  );
}
