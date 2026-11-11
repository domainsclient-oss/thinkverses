import type { MetadataRoute } from "next";
import { site, article } from "@/lib/content";
import { articleSlug, serviceRegions, services, solutionPath } from "@/lib/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/digital-twin`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/robotics-solutions`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/use-cases`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/industries`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/about`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${site.url}/articles/${articleSlug}`, lastModified: article.date, priority: 0.7 },
    ...services.flatMap((s) =>
      serviceRegions[s.key].map((r) => ({ url: `${site.url}${solutionPath(s.key, r)}`, priority: 0.6 })),
    ),
  ];
}
