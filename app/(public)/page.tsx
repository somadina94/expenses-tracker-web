import { Metadata } from "next";
import HomePage from "@/components/templates/homepage";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://planary.app";

export const metadata: Metadata = {
  title: "Plan smarter. Spend better.",
  description:
    "Planary is your personal finance workspace: monthly budgets, fast expense logging, notes with reminders, and push notifications—so you always know where you stand.",
  alternates: { canonical: siteUrl },
  openGraph: {
    url: siteUrl,
    title: "Planary — Budgets, expenses & reminders",
    description:
      "A refined app for budgets, spending, notes, and timed reminders with push notifications.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Planary",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web, iOS, Android",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Personal finance app for budgets, expenses, notes, reminders, and notifications.",
  url: siteUrl,
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePage />
    </>
  );
}
