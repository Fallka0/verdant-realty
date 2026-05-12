import type { MetadataRoute } from "next";

import { getPublicSiteUrl } from "@/lib/site-urls";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        allow: "/",
        disallow: ["/admin", "/api"],
        userAgent: "*",
      },
    ],
    sitemap: getPublicSiteUrl("/sitemap.xml"),
  };
}
