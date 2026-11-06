import { Metadata } from "next";
import { getHomePageIpoList, transformApiIpo } from "@/lib/ipo-service";
import { IpoListClient } from "@/components/ipo/IpoListClient";
import { SITE_URL } from "@/lib/seo";
import { getBreadcrumbSchema } from "@/lib/seo";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "Live IPO 2024–25 – Open IPOs with GMP, Subscription & Allotment",
  description:
    "Track all currently open (live) IPOs in India with live GMP, subscription status (QIB, NII, Retail), price band, lot size, allotment date, and expected listing gain on BSE and NSE.",
  alternates: { canonical: `${SITE_URL}/ipo/live` },
  keywords: [
    "Live IPO",
    "Open IPO Today",
    "Current IPO GMP",
    "Live IPO Subscription",
    "IPO Open Today India",
    "Mainboard IPO 2025",
    "SME IPO Open Today",
    "BSE NSE Live IPO",
    "IPO Allotment Date",
  ],
  openGraph: {
    title: "Live IPO 2024–25 – Open IPOs with GMP & Subscription Status",
    description:
      "Check all live & open IPOs today on BSE and NSE with real-time GMP, subscription figures, price band, lot size and allotment dates.",
    url: `${SITE_URL}/ipo/live`,
    type: "website",
    locale: "en_IN",
    siteName: "ipo-premium",
  },
  twitter: {
    card: "summary_large_image",
    title: "Live IPO 2024–25 – Open IPOs with GMP & Subscription Status",
    description:
      "Track all currently open IPOs with live GMP, subscription status and estimated listing gain.",
  },
};

const PAGE_SIZE = 15;

export default async function LiveIpoPage() {
  // Server-side initial fetch
  const res = await getHomePageIpoList({ category: "live", page: 1, pageSize: PAGE_SIZE });
  const rawResults: any[] = res?.data?.results || [];
  const totalCount: number = res?.data?.count ?? rawResults.length;
  const initialItems = rawResults.map((raw: any) => transformApiIpo(raw, "live"));

  // JSON-LD Schemas
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Live IPO", url: `${SITE_URL}/ipo/live` },
  ]);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Currently Live & Open IPOs in India",
    numberOfItems: Math.min(initialItems.length, 25),
    itemListElement: initialItems.slice(0, 25).map((ipo, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${ipo.name} IPO – GMP ₹${ipo.gmp}, Price Band ${ipo.priceBand}`,
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
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Live Bidding
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-mut bg-card2 border border-line">
                    {totalCount} IPOs Open
                  </span>
                </div>
                <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-tx tracking-tight">
                  Live IPO Today – Open IPOs with GMP & Subscription
                </h1>
                <p className="text-sm sm:text-base text-mut leading-relaxed">
                  All currently open (live) IPOs on BSE and NSE. Track live Grey Market Premium (GMP),
                  subscription status, price band, lot size, allotment date and expected listing gain.
                </p>
              </div>
            </div>
          </div>

          {/* Client — filters + list/card + pagination */}
          <IpoListClient
            category="live"
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
