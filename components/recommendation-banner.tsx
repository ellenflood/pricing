import Link from "next/link";
import { Star } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Recommendation } from "@/lib/types";

const ACTION_TEXT: Record<Recommendation["option"]["id"], string> = {
  copay: "Start enrollment",
  insurance: "Use insurance",
  pap: "Check eligibility",
};

export function RecommendationBanner({ recommendation }: { recommendation: Recommendation }) {
  const { option, rationale, tradeoff } = recommendation;

  return (
    <div className="rounded-2xl border-2 border-foreground bg-card p-6 shadow-sm sm:p-8">
      <div className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-foreground">
        <Star className="size-4 fill-current" />
        Recommended for you
      </div>
      <h2 className="mb-2 text-2xl font-bold">{option.name}</h2>
      <p className="mb-3 max-w-2xl text-base text-muted-foreground">{rationale}</p>
      <p className="mb-5 text-sm text-muted-foreground">{tradeoff}</p>
      <div className="flex flex-wrap items-center gap-4">
        <Link href={`/next/${option.id}`} className={buttonVariants({ size: "lg" })}>
          {ACTION_TEXT[option.id]}
        </Link>
        <a href="#all-options" className="text-sm font-medium underline underline-offset-4">
          See all options ↓
        </a>
      </div>
    </div>
  );
}
