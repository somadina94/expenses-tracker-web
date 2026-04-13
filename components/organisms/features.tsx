import FeatureItem from "../molecules/feature-item";
import expense from "@/assets/expense.jpg";
import notes from "@/assets/notes.jpg";
import budget from "@/assets/budget.jpg";

export default function Features() {
  return (
    <section
      id="features"
      className="border-border/60 border-b bg-muted/20"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <div className="mb-12 max-w-2xl">
          <p className="text-primary mb-3 text-xs font-medium uppercase tracking-[0.35em]">
            Capabilities
          </p>
          <h2 className="font-display text-foreground text-3xl tracking-tight md:text-4xl">
            Everything you need to stay ahead
          </h2>
          <p className="text-muted-foreground mt-3 text-base leading-relaxed">
            Budgets, spending, and memory—woven together so decisions feel
            obvious, not overwhelming.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <FeatureItem
            image={budget}
            title="Budgets"
            description="Set monthly limits and see how reality compares—so you adjust before the month slips away."
          />
          <FeatureItem
            image={expense}
            title="Expenses"
            description="Capture purchases as they happen. Your history becomes a map of where money actually goes."
          />
          <FeatureItem
            image={notes}
            title="Notes & reminders"
            description="Pair ideas with deadlines. Push notifications fire when it is time to act."
          />
        </div>
      </div>
    </section>
  );
}
