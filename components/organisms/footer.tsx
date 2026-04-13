import Link from "next/link";
import { PlanaryLogo } from "../atoms/planary-logo";
import { Github, Mail } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/terms-and-conditions", label: "Terms" },
  { href: "/privacy-policy", label: "Privacy" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border/80 bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-4">
            <PlanaryLogo />
            <p className="text-muted-foreground text-sm leading-relaxed">
              A calm command center for budgets, spending, notes, and
              reminders—crafted for clarity and control.
            </p>
          </div>
          <nav
            className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm"
            aria-label="Footer"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-muted-foreground hover:text-foreground font-medium transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="border-border/60 mt-12 flex flex-col gap-4 border-t pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-muted-foreground text-xs tracking-wide">
            © {new Date().getFullYear()} Jahbyte Technologies · Williams
            Onuaguluchi
          </p>
          <div className="text-muted-foreground flex items-center gap-4 text-xs">
            <span className="inline-flex items-center gap-1.5">
              <Mail className="size-3.5" aria-hidden />
              <span>Support via app</span>
            </span>
            <span className="inline-flex items-center gap-1.5 opacity-60">
              <Github className="size-3.5" aria-hidden />
              <span>Built with care</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
