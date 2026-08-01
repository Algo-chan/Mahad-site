import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://mahadaltowheed.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: Array<{
    path: string;
    changeFrequency:
      | "always"
      | "hourly"
      | "daily"
      | "weekly"
      | "monthly"
      | "yearly"
      | "never";
    priority: number;
  }> = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/about", changeFrequency: "monthly", priority: 0.8 },
    { path: "/academics", changeFrequency: "monthly", priority: 0.8 },
    { path: "/religious", changeFrequency: "monthly", priority: 0.8 },
    { path: "/admissions", changeFrequency: "monthly", priority: 0.8 },
    { path: "/gallery", changeFrequency: "monthly", priority: 0.6 },
    { path: "/news", changeFrequency: "weekly", priority: 0.8 },
    { path: "/impact", changeFrequency: "monthly", priority: 0.7 },
    { path: "/donate", changeFrequency: "monthly", priority: 0.7 },
    { path: "/partners", changeFrequency: "monthly", priority: 0.7 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
  ];

  return pages.map(({ path, changeFrequency, priority }) => ({
    url: `${BASE_URL}${path === "/" ? "/" : `${path}/`}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
