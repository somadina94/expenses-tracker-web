"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";

interface FeatureItemProps {
  image: StaticImageData;
  title: string;
  description: string;
}

export default function FeatureItem({
  image,
  title,
  description,
}: FeatureItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card className="border-border/80 bg-card/80 h-full overflow-hidden shadow-sm backdrop-blur-sm">
        <CardContent className="p-0">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={image}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2 px-6 py-5">
          <CardTitle className="font-display text-xl">{title}</CardTitle>
          <CardDescription className="text-base leading-relaxed">
            {description}
          </CardDescription>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
