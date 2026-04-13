"use client";

import Image from "next/image";
import heroImage from "@/assets/hero.png";
import Link from "next/link";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { IoLogoApple } from "react-icons/io";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.08 * i,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,var(--color-accent)/0.12,transparent)]" />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-12 px-4 py-16 md:flex-row md:items-center md:justify-between md:gap-16 md:px-6 md:py-24">
        <motion.div
          className="w-full max-w-xl space-y-8 md:order-2"
          initial="hidden"
          animate="show"
        >
          <motion.p
            custom={0}
            variants={fade}
            className="text-primary font-medium text-xs uppercase tracking-[0.35em]"
          >
            Planary
          </motion.p>
          <motion.h1
            custom={1}
            variants={fade}
            className="font-display text-foreground text-4xl leading-[1.1] tracking-tight md:text-5xl lg:text-6xl"
          >
            Plan smarter.
            <br />
            <span className="text-primary">Spend better.</span>
          </motion.h1>
          <motion.p
            custom={2}
            variants={fade}
            className="text-muted-foreground max-w-md text-lg leading-relaxed"
          >
            Expenses, monthly budgets, notes, and timed reminders—with push
            notifications when it matters.
          </motion.p>
          <motion.div
            custom={3}
            variants={fade}
            className="flex flex-wrap items-center gap-3"
          >
            <Link
              href="/sign-up"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold shadow-md transition-colors"
            >
              Start free
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/#how-it-works"
              className="text-muted-foreground hover:text-foreground inline-flex items-center rounded-full px-4 py-3 text-sm font-medium transition-colors"
            >
              See how it works
            </Link>
          </motion.div>
          <motion.div
            custom={4}
            variants={fade}
            className="flex flex-wrap gap-3 pt-2"
          >
            <Link
              href="#"
              className="border-border bg-card/80 hover:border-primary/30 inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm shadow-sm backdrop-blur-sm transition-colors"
            >
              <IoLogoApple className="size-8" aria-hidden />
              <span className="flex flex-col leading-tight">
                <span className="text-muted-foreground text-[10px] uppercase tracking-wide">
                  Download on the
                </span>
                <span className="font-semibold">App Store</span>
              </span>
            </Link>
            <Link
              href="https://play.google.com/store/apps/details?id=com.jahbyte.extrack"
              className="border-border bg-card/80 hover:border-primary/30 inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm shadow-sm backdrop-blur-sm transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IoLogoGooglePlaystore className="size-8" aria-hidden />
              <span className="flex flex-col leading-tight">
                <span className="text-muted-foreground text-[10px] uppercase tracking-wide">
                  Get it on
                </span>
                <span className="font-semibold">Google Play</span>
              </span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative w-full max-w-md md:order-1"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="from-primary/20 pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-tr to-transparent blur-2xl" />
          <Image
            src={heroImage}
            alt="Planary — futuristic finance dashboard visualization"
            width={480}
            height={600}
            priority
            className="border-border/60 relative rounded-2xl border shadow-2xl"
            sizes="(max-width: 768px) 100vw, 480px"
          />
        </motion.div>
      </div>
    </section>
  );
}
