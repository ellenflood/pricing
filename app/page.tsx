import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { DEMO_DRUG } from "@/lib/data";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-16 dark:bg-black">
      <div className="flex w-full max-w-md flex-col items-center gap-8 text-center">
        <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          A program sponsored by {DEMO_DRUG.manufacturer}
        </p>
        <h1 className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
          Your prescription shouldn&apos;t come with a guessing game.
        </h1>
        <p className="text-base text-muted-foreground">
          Compare your options, see the tradeoffs, and get to the pharmacy counter with a plan.
        </p>
        <Link href="/rx" className={buttonVariants({ size: "lg", className: "w-full sm:w-auto" })}>
          Get started
        </Link>
        <p className="text-sm text-muted-foreground">Takes about 2 minutes.</p>
      </div>
    </div>
  );
}
