"use client";

import Hero from "../organisms/hero";
import Features from "../organisms/features";
import HowItWorks from "../organisms/how-it-works";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <motion.div
      className="text-foreground min-h-svh"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Hero />
      <Features />
      <HowItWorks />
    </motion.div>
  );
}
