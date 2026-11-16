import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString();

  // Exactly 15 Top Priority Pages (Core High-Impression Trackers + Essential E-E-A-T Trust Pages)
  const top15Routes: MetadataRoute.Sitemap = [
    // 1. High-Volume Core IPO Trackers & Tools (9 Pages)
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

    // 2. Full E-E-A-T Trust, Legal & Transparency Pages (6 Pages)
    {
      url: `${SITE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/editorial-policy`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/disclaimer`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  /* 
   * NOTE: Other individual IPO detail pages, individual news, and articles 
   * are kept hidden from sitemap for now as per current focus strategy.
   */

  return top15Routes;
}
