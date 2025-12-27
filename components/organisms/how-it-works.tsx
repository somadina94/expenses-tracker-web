import HowItWorksItem from "../molecules/how-items";
import expense from "@/assets/how-expense.png";
import note from "@/assets/how-note.png";
import budget from "@/assets/how-budget.png";
import reminder from "@/assets/how-reminder.png";
import notification from "@/assets/how-notification.png";
import summary from "@/assets/how-summary.png";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="max-w-325 mx-auto mb-12 pb-12 px-4">
      <h2 className="text-3xl mb-6">HOW IT WORKS</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-center justify-items-stretch">
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
