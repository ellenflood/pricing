import Link from "next/link";
import { Check, Star, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ScoredOption } from "@/lib/types";

const ATTRIBUTE_TEXT: Record<ScoredOption["attributeLabel"], string> = {
  "lowest-effort": "Lowest effort",
  "lowest-cost": "Lowest potential cost",
  balanced: "Balanced pick",
};

const ACTION_TEXT: Record<ScoredOption["id"], string> = {
  copay: "Get started",
  insurance: "Use insurance",
  pap: "Check eligibility",
};

export function OptionCard({ option }: { option: ScoredOption }) {
  return (
    <Card
      className={cn(
        "flex flex-col transition-shadow",
        option.isRecommended && "border-foreground shadow-md",
      )}
    >
      <CardHeader className="gap-1">
        <Badge variant={option.isRecommended ? "default" : "secondary"} className="w-fit gap-1">
          {option.isRecommended ? (
            <>
              <Star className="size-3" /> Recommended
            </>
          ) : (
            ATTRIBUTE_TEXT[option.attributeLabel]
          )}
        </Badge>
        <h3 className="text-lg font-semibold">{option.name}</h3>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <div>
          <p className="text-2xl font-bold">
            {option.estimatedCost === 0 ? "$0" : `$${option.estimatedCost}`}{" "}
            <span className="text-sm font-normal text-muted-foreground">est.</span>
          </p>
          <p className="text-sm text-muted-foreground">Ready in {option.timeToFill.toLowerCase()}</p>
        </div>
        <ul className="flex flex-1 flex-col gap-1.5 text-sm">
          {option.pros.map((pro) => (
            <li key={pro} className="flex items-start gap-1.5">
              <Check className="mt-0.5 size-3.5 shrink-0 text-emerald-600" />
              <span>{pro}</span>
            </li>
          ))}
          {option.cons.map((con) => (
            <li key={con} className="flex items-start gap-1.5 text-muted-foreground">
              <X className="mt-0.5 size-3.5 shrink-0" />
              <span>{con}</span>
            </li>
          ))}
        </ul>
        <Link
          href={`/next/${option.id}`}
          className={buttonVariants({
            className: "w-full",
            variant: option.isRecommended ? "default" : "outline",
          })}
        >
          {ACTION_TEXT[option.id]}
        </Link>
      </CardContent>
    </Card>
  );
}
