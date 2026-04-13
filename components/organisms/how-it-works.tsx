import HowItWorksItem from "../molecules/how-items";
import expense from "@/assets/how-expense.png";
import note from "@/assets/how-note.png";
import budget from "@/assets/how-budget.png";
import reminder from "@/assets/how-reminder.png";
import notification from "@/assets/how-notification.png";
import summary from "@/assets/how-summary.png";

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24"
    >
      <div className="mb-12 max-w-2xl">
        <p className="text-primary mb-3 text-xs font-medium uppercase tracking-[0.35em]">
          Flow
        </p>
        <h2 className="font-display text-foreground text-3xl tracking-tight md:text-4xl">
          How it works
        </h2>
        <p className="text-muted-foreground mt-3 text-base leading-relaxed">
          From first budget to your next reminder—six crisp steps.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        <HowItWorksItem
          image={budget}
          description="Register your monthly budget and define how much you plan to spend."
        />
        <HowItWorksItem
          image={expense}
          description="Log daily expenses in seconds as they happen."
        />
        <HowItWorksItem
          image={note}
          description="Attach notes to expenses or save reminders for important things."
        />
        <HowItWorksItem
          image={reminder}
          description="Choose a date and time for reminders that matter to you."
        />
        <HowItWorksItem
          image={notification}
          description="Receive notifications exactly when your reminder is due."
        />
        <HowItWorksItem
          image={summary}
          description="View clear summaries that show where your money and time go."
        />
      </div>
    </section>
  );
}
