import { Metadata } from "next";
import { getHomePageIpoList, transformApiIpo } from "@/lib/ipo-service";
import { IpoListClient } from "@/components/ipo/IpoListClient";
import { SITE_URL, getBreadcrumbSchema } from "@/lib/seo";

export const revalidate = 180;

export const metadata: Metadata = {
  title: "Upcoming IPO 2024–25 – All Upcoming IPOs with Dates, GMP & Allotment",
  description:
    "Complete list of all upcoming IPOs in India for 2024–25 with open date, close date, price band, lot size, GMP forecast, subscription status and allotment date on BSE and NSE.",
  alternates: { canonical: `${SITE_URL}/ipo/upcoming` },
  keywords: [
    "Upcoming IPO",
    "Upcoming IPO 2025",
    "New IPO This Week",
    "Upcoming Mainboard IPO",
    "SME Upcoming IPO",
    "IPO Opening This Month",
    "IPO Date 2025",
    "Upcoming BSE NSE IPO",
    "IPO Open Date",
  ],
  openGraph: {
    title: "Upcoming IPO 2024–25 – Dates, GMP & Allotment",
    description:
      "Track all upcoming IPOs in India 2024–25 with open/close dates, price band, lot size, GMP forecast and allotment dates.",
    url: `${SITE_URL}/ipo/upcoming`,
    type: "website",
    locale: "en_IN",
    siteName: "ipo-premium",
  },
  twitter: {
    card: "summary_large_image",
    title: "Upcoming IPO 2024–25 – Dates, GMP & Allotment",
    description:
      "Track all upcoming IPOs in India with open/close dates, GMP forecast and allotment dates.",
  },
};

const PAGE_SIZE = 15;

export default async function UpcomingIpoPage() {
  const res = await getHomePageIpoList({ category: "upcoming", page: 1, pageSize: PAGE_SIZE });
  const rawResults: any[] = res?.data?.results || [];
  const totalCount: number = res?.data?.count ?? rawResults.length;
  const initialItems = rawResults.map((raw: any) => transformApiIpo(raw, "upcoming"));

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Upcoming IPO", url: `${SITE_URL}/ipo/upcoming` },
  ]);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Upcoming IPOs in India 2024–25",
    numberOfItems: Math.min(initialItems.length, 25),
    itemListElement: initialItems.slice(0, 25).map((ipo, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${ipo.name} IPO – Price Band ${ipo.priceBand}, Opens ${ipo.openDate || "TBA"}`,
      url: `${SITE_URL}/ipo/${ipo.slug}/${ipo.symbol}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <main className="min-h-screen bg-bg py-8 sm:py-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

          {/* Page Header */}
          <div className="bg-card border border-line rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="max-w-2xl space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    Coming Soon
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-mut bg-card2 border border-line">
                    {totalCount} IPOs Upcoming
                  </span>
                </div>
                <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-tx tracking-tight">
                  Upcoming IPO 2024–25 – All IPOs with Dates & GMP
                </h1>
                <p className="text-sm sm:text-base text-mut leading-relaxed">
                  Complete upcoming IPO calendar for BSE and NSE. View open date, close date, price band,
                  lot size, expected GMP, and allotment date for all upcoming Mainboard and SME IPOs.
                </p>
              </div>
            </div>
          </div>

          {/* Client — filters + list/card + pagination */}
          <IpoListClient
            category="upcoming"
            initialItems={initialItems}
            initialTotal={totalCount}
            initialPage={1}
            pageSize={PAGE_SIZE}
            initialIpoType="all"
          />

        </div>
      </main>
    </>
  );
}
