"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";

interface FeatureItemProps {
  image: StaticImageData;
  description: string;
}

export default function HowItWorksItem({
  image,
  description,
}: FeatureItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card className="border-border/80 bg-card/80 flex h-full flex-col overflow-hidden shadow-sm backdrop-blur-sm">
        <CardContent className="relative aspect-[4/3] w-full p-0">
          <Image
            src={image}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </CardContent>
        <CardFooter className="flex flex-col items-start border-t border-border/60 px-5 py-4">
          <CardDescription className="text-foreground/90 text-center text-sm leading-relaxed md:text-left">
            {description}
          </CardDescription>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
