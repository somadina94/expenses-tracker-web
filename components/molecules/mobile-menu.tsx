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
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/Logo-web.jpg";
import { LightDarkToggle } from "../ui/light-dark-toggle";

export default function MobileMenu({ className }: { className?: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLoggedIn } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;
  return (
    <nav
      className={cn(
        "flex justify-between bg-primary rounded-0 px-2 py-4 items-center z-40 sticky top-0 left-0 right-0",
        className
      )}
    >
      <div className="flex justify-between items-center">
        <Link
          href="/"
          className="text-[24px] font-bold md:text-2xl p-0 rounded-full"
        >
          <div className="w-28 h-14 relative">
            <Image
              src={logo}
              alt="logo"
              fill
              className="rounded-full border-4"
            />
          </div>
        </Link>
        <LightDarkToggle className="ml-12" />
      </div>
      <Drawer
        direction="right"
        open={mobileMenuOpen}
        onOpenChange={(open) => setMobileMenuOpen(open)}
        onClose={() => setMobileMenuOpen(false)}
      >
        <DrawerTitle></DrawerTitle>
        <DrawerTrigger>
          <MenuIcon className="text-white" />
        </DrawerTrigger>
        <DrawerContent className="flex flex-col items-center py-12 space-y-12 bg-background">
          <Link
            href="#features"
            className="font-medium text-[16px] px-12 py-4 border-b border-t w-full"
          >
            FEATURES
          </Link>
          <Link
            href="#how-it-works"
            className="font-medium text-[16px] px-12 py-4 border-b border-t w-full"
          >
            HOW IT WORKS
          </Link>
          {!isLoggedIn && (
            <Link
              href="/sign-in"
              className="font-medium text-[16px] px-12 py-4 border-b border-t w-full"
            >
              SIGN IN
            </Link>
          )}
          {isLoggedIn && (
            <Link
              href="/dashboard"
              className="font-medium text-[16px] px-12 py-4 border-b border-t w-full"
            >
              MY ACCOUNT
            </Link>
          )}
        </DrawerContent>
      </Drawer>
    </nav>
  );
}
