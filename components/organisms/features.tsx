import FeatureItem from "../molecules/feature-item";
import expense from "@/assets/expense.jpg";
import notes from "@/assets/notes.jpg";
import budget from "@/assets/budget.jpg";

export default function Features() {
  return (
    <section
      id="features"
      className="max-w-325 mx-auto mb-12 pb-12 border-b px-4"
    >
      <h2 className="text-3xl mb-6">FEATURES</h2>
      <div className="flex justify-between items-center flex-col lg:flex-row gap-6">
        <FeatureItem
          image={budget}
          title="Budgets"
          description="Add a budget every month and be able to see at the end of the month how your expenses compares with your budget and make better decisions"
        />
        <FeatureItem
          image={expense}
          title="Expenses"
          description="Add expense anytime you spend money, to keep track of your spending and be able to look back later and see where you can make better decisions"
        />
        <FeatureItem
          image={notes}
          title="Notes & Reminders"
          description="Add notes and set reminders to the notes that sends you a push notification whenever the chosen time reaches"
        />
      </div>
    </section>
  );
}
