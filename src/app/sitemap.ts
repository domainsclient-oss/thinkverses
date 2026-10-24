import type { MetadataRoute } from "next";
import { site, article } from "@/lib/content";
import { articleSlug, serviceRegions, services, solutionPath } from "@/lib/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/articles/${articleSlug}`, lastModified: article.date, priority: 0.7 },
    ...services.flatMap((s) =>
      serviceRegions[s.key].map((r) => ({ url: `${site.url}${solutionPath(s.key, r)}`, priority: 0.6 })),
    ),
  ];
}
