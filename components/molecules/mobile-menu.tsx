"use client";

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useState } from "react";
import { RootState, AuthState, useAppSelector } from "@/store";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { LayoutGrid, MenuIcon, Sparkles } from "lucide-react";
import { LightDarkToggle } from "../ui/light-dark-toggle";
import { PlanaryLogo } from "../atoms/planary-logo";

export default function MobileMenu({ className }: { className?: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLoggedIn } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;

  const close = () => setMobileMenuOpen(false);

  return (
    <nav
      className={cn(
        "border-border/60 bg-background/80 sticky top-0 z-50 flex items-center justify-between border-b px-4 py-3 backdrop-blur-xl",
        className
      )}
    >
      <Link href="/" onClick={close}>
        <PlanaryLogo />
      </Link>
      <div className="flex items-center gap-3">
        <LightDarkToggle />
        <Drawer
          direction="right"
          open={mobileMenuOpen}
          onOpenChange={setMobileMenuOpen}
        >
          <DrawerTrigger
            className="text-foreground hover:bg-accent/10 rounded-md p-2"
            aria-label="Open menu"
          >
            <MenuIcon className="size-6" />
          </DrawerTrigger>
          <DrawerContent className="bg-background flex flex-col gap-0 px-0 py-8">
            <DrawerTitle className="sr-only">Main menu</DrawerTitle>
            <Link
              href="/#features"
              onClick={close}
              className="border-border/60 hover:bg-muted/50 flex items-center gap-3 border-b px-6 py-4 text-sm font-medium"
            >
              <LayoutGrid className="size-4 opacity-70" />
              Features
            </Link>
            <Link
              href="/#how-it-works"
              onClick={close}
              className="border-border/60 hover:bg-muted/50 flex items-center gap-3 border-b px-6 py-4 text-sm font-medium"
            >
              <Sparkles className="size-4 opacity-70" />
              How it works
            </Link>
            {!isLoggedIn && (
              <Link
                href="/sign-in"
                onClick={close}
                className="border-border/60 hover:bg-muted/50 px-6 py-4 text-sm font-medium"
              >
                Sign in
              </Link>
            )}
            {isLoggedIn && (
              <Link
                href="/dashboard"
                onClick={close}
                className="border-border/60 hover:bg-muted/50 px-6 py-4 text-sm font-medium"
              >
                Dashboard
              </Link>
            )}
          </DrawerContent>
        </Drawer>
      </div>
    </nav>
  );
}
