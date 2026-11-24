import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getAllIpos } from "@/lib/ipo-service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString();

  // 1. Core High-Priority Pages (Crawl Priority 1.0 - 0.85)
  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: currentDate,
      changeFrequency: "hourly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/ipo-gmp`,
      lastModified: currentDate,
      changeFrequency: "always",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/ipo/live`,
      lastModified: currentDate,
      changeFrequency: "always",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/ipo/upcoming`,
      lastModified: currentDate,
      changeFrequency: "hourly",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/subscription`,
      lastModified: currentDate,
      changeFrequency: "always",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/allotment`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/news`,
      lastModified: currentDate,
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/articles`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/lot-calculator`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/ipo/listed`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.85,
    },

    // Trust & Policies (E-E-A-T)
    {
      url: `${SITE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/editorial-policy`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/disclaimer`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // 2. Fetch and dynamically add all Live and Upcoming IPO detail pages
  let dynamicIpoRoutes: MetadataRoute.Sitemap = [];
  try {
    const allIpos = await getAllIpos();

    // Filter strictly for Open (Live) and Upcoming IPOs
    const activeIpos = allIpos.filter((ipo) => {
      const st = (ipo.status || "").toLowerCase();
      return st === "open" || st === "upcoming" || st === "close today" || st === "closing today";
    });

    dynamicIpoRoutes = activeIpos.map((ipo) => {
      const isLive = (ipo.status || "").toLowerCase() === "open";
      return {
        url: `${SITE_URL}/ipo/${ipo.slug}/${ipo.symbol}`,
        lastModified: currentDate,
        changeFrequency: isLive ? "always" : "hourly",
        priority: isLive ? 0.95 : 0.9,
      };
    });
  } catch (error) {
    console.error("Failed to build dynamic IPO routes for sitemap:", error);
  }

  // Combine core routes with dynamic Live & Upcoming IPO pages
  return [...coreRoutes, ...dynamicIpoRoutes];
}
