import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Sora } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/context/app-providers";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://planary.app";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f6fb" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0e1a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Planary — Personal finance, budgets, expenses & smart reminders",
    template: "%s | Planary",
  },
  description:
    "Planary helps you set monthly budgets, log expenses in seconds, capture notes with reminders, and get timely push notifications—so you always know where your money and attention go.",
  applicationName: "Planary",
  authors: [{ name: "Jahbyte Technologies", url: siteUrl }],
  creator: "Jahbyte Technologies",
  keywords: [
    "personal finance",
    "budget app",
    "expense tracker",
    "spending tracker",
    "notes",
    "reminders",
    "push notifications",
    "Planary",
  ],
  category: "finance",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Planary",
    title: "Planary — Plan smarter. Spend better.",
    description:
      "Budgets, expenses, notes, and reminders in one refined workspace—built for clarity and calm control.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Planary — Personal finance, simplified",
    description:
      "Track spending, set budgets, and never miss a reminder. A calmer way to manage money.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${sora.variable} ${instrumentSerif.variable} font-sans antialiased`}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
