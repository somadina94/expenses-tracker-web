import Hero from "../organisms/hero";
import Features from "../organisms/features";
import HowItWorks from "../organisms/how-it-works";

export default function HomePage() {
  return (
    <div className="text-foreground">
      <Hero />
      <Features />
      <HowItWorks />
    </div>
  );
}
