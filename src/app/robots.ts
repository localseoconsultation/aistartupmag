import type { MetadataRoute } from "next";
import { defaultSEO } from "@/constant/seo";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = defaultSEO.SITE_URL;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}