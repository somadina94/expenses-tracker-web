import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://planary.app";

const paths = [
  "",
  "/sign-in",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
  "/privacy-policy",
  "/terms-and-conditions",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return paths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
