import type { Metadata } from "next";
import DesktopMenu from "@/components/molecules/desktop-menu";
import MobileMenu from "@/components/molecules/mobile-menu";
import Footer from "@/components/organisms/footer";

export const metadata: Metadata = {
  title: "Plan smarter. Spend better.",
  description:
    "Planary brings budgets, expense logging, notes, and timed reminders into one calm, focused workspace—with push notifications when it matters.",
  openGraph: {
    title: "Planary — Personal finance, simplified",
    description:
      "Budgets, expenses, notes, and reminders in one refined workspace.",
  },
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DesktopMenu className="hidden md:block" />
      <MobileMenu className="md:hidden" />
      {children}
      <Footer />
    </>
  );
}
