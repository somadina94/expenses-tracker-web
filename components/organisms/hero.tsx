import Image from "next/image";
import hero_image from "@/assets/hero.jpg";
import Link from "next/link";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { IoLogoApple } from "react-icons/io";

export default function Hero() {
  return (
    <section className="max-w-325 mx-auto mt-24 md:mt-12 flex flex-col md:flex-row justify-start md:justify-between items-center mb-12 border-b pb-12 px-4 gap-6">
      <div className=" w-full flex justify-center md:justify-start">
        <Image
          src={hero_image}
          alt="hero-image"
          width={400}
          height={500}
          className="rounded-md"
        />
      </div>
      <div className="w-full">
        <div className="space-y-8">
          <h1 className="text-5xl">
            Plan smarter. Spend better. Stay on track.
          </h1>
          <h2 className="italic text-2xl">
            Expenses management, notes and reminders — all in one place
          </h2>
        </div>
        <div className="flex gap-4 items-center mt-32">
          <Link
            href="/"
            className="flex items-center gap-2 border px-5 py-1 rounded-full bg-background border-gray-500"
          >
            <IoLogoApple className="w-8 h-8" />
            <div className="flex flex-col">
              <span className="text-[10px]">Download on the</span>
              <span className="font-bold text-[14px]">App Store</span>
            </div>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 border px-5 py-1 rounded-full bg-background border-gray-500"
          >
            <IoLogoGooglePlaystore className="w-8 h-8" />
            <div className="flex flex-col">
              <span className="text-[10px]">Download on the</span>
              <span className="font-semibold text-[14px]">Play Store</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
