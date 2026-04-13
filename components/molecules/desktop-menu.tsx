"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { LightDarkToggle } from "../ui/light-dark-toggle";
import { useAppSelector, AuthState, RootState } from "@/store";
import { PlanaryLogo } from "../atoms/planary-logo";
import { motion } from "framer-motion";
import { LayoutGrid, LogIn, Sparkles } from "lucide-react";

export default function DesktopMenu({ className }: { className?: string }) {
  const { isLoggedIn } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;

  const linkClass =
    "text-muted-foreground hover:text-foreground flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] transition-colors";

  return (
    <motion.nav
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "sticky top-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-xl",
        className
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 md:px-6">
        <Link href="/" className="shrink-0">
          <PlanaryLogo />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/#features" className={linkClass}>
            <LayoutGrid className="size-3.5 opacity-70" />
            Features
          </Link>
          <Link href="/#how-it-works" className={linkClass}>
            <Sparkles className="size-3.5 opacity-70" />
            How it works
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <LightDarkToggle />
          {!isLoggedIn && (
            <Link
              href="/sign-in"
              className="border-border bg-card text-foreground hover:bg-accent/10 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors"
            >
              <LogIn className="size-4 opacity-80" />
              Sign in
            </Link>
          )}
          {isLoggedIn && (
            <Link
              href="/dashboard"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center rounded-full px-4 py-2 text-sm font-medium shadow-sm transition-colors"
            >
              Dashboard
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
