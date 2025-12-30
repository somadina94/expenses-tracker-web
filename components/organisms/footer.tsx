import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-4 max-w-400 mx-auto border-t py-6 bg-primary flex flex-col md:flex-row gap-12 justify-between">
      <nav className="flex flex-col gap-2 text-white">
        <Link href="/">HOME</Link>
        <Link href="#features">FEATURES</Link>
        <Link href="#how-it-works">HOW IT WORKS</Link>
        <Link href="/">TERMS & CONDITIONS</Link>
        <Link href="/">PRIVACY POLCIY</Link>
      </nav>
      <div className="flex flex-col justify-end">
        <p className="text-neutral-50">MADE BY</p>
        <span className="font-bold italic text-white">
          JAHBYTE TECHNOLOGIES(WILLIAMS ONUAGULUCHI)
        </span>
      </div>
    </footer>
  );
}
