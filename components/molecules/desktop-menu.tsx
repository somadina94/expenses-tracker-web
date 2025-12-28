"use client";

import { cn } from "@/lib/utils";
import { Menubar, MenubarMenu, MenubarTrigger } from "../ui/menubar";
import Link from "next/link";
import logo from "@/assets/Logo-web.jpg";
import Image from "next/image";
import { LightDarkToggle } from "../ui/light-dark-toggle";
import { useAppSelector, AuthState, RootState } from "@/store";

export default function DesktopMenu({ className }: { className?: string }) {
  const { isLoggedIn } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;

  return (
    <nav
      className={cn(
        "flex items-center justify-between sticky top-0 left-0 right-0 z-40",
        className
      )}
    >
      <Menubar className="mx-auto max-w-400 w-full h-19 rounded-none border-0 flex items-center justify-between bg-primary p-2">
        <MenubarMenu>
          <MenubarTrigger
            asChild
            className="text-[24px] font-bold md:text-2xl p-0 rounded-full"
          >
            <Link href="/">
              <div className="w-28 h-14 relative">
                <Image
                  src={logo}
                  alt="logo"
                  fill
                  className="rounded-full border-4"
                />
              </div>
            </Link>
          </MenubarTrigger>
          <LightDarkToggle />
          <MenubarTrigger asChild className="text-sm text-white">
            <Link href="#features">FEATURES</Link>
          </MenubarTrigger>
          <MenubarTrigger asChild className="text-sm text-white">
            <Link href="#how-it-works">HOW IT WORKS</Link>
          </MenubarTrigger>
          {!isLoggedIn && (
            <MenubarTrigger asChild className="text-sm text-white">
              <Link href="/sign-in">SIGN IN</Link>
            </MenubarTrigger>
          )}
          {isLoggedIn && (
            <MenubarTrigger asChild className="text-sm text-white">
              <Link href="/dashboard">MY ACCOUNT</Link>
            </MenubarTrigger>
          )}
        </MenubarMenu>
      </Menubar>
    </nav>
  );
}
