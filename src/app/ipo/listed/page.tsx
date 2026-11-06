import { Metadata } from "next";
import { getHomePageIpoList, transformApiIpo } from "@/lib/ipo-service";
import { IpoListClient } from "@/components/ipo/IpoListClient";
import { SITE_URL, getBreadcrumbSchema } from "@/lib/seo";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Listed IPO 2024–25 – Recently Listed IPOs with Listing Day Gain & GMP",
  description:
    "Track all recently listed IPOs in India 2024–25 with listing price, listing day gain/loss, GMP, subscription figures, price band, lot size on BSE and NSE.",
  alternates: { canonical: `${SITE_URL}/ipo/listed` },
  keywords: [
    "Listed IPO 2025",
    "Recently Listed IPO",
    "IPO Listing Gain",
    "IPO Listed Price",
    "New Listed IPO Today",
    "BSE NSE Listed IPO",
    "IPO Listing Performance",
    "Mainboard IPO Listed",
    "SME IPO Listed",
  ],
  openGraph: {
    title: "Listed IPO 2024–25 – Listing Day Gain & Performance",
    description:
      "Complete list of recently listed IPOs in India with listing price, listing gain, GMP, subscription figures and performance on BSE and NSE.",
    url: `${SITE_URL}/ipo/listed`,
    type: "website",
    locale: "en_IN",
    siteName: "ipo-premium",
  },
  twitter: {
    card: "summary_large_image",
    title: "Listed IPO 2024–25 – Listing Day Gain & Performance",
    description:
      "Track recently listed IPOs with listing price, listing gain and GMP on BSE and NSE.",
  },
};

const PAGE_SIZE = 15;

export default async function ListedIpoPage() {
  const res = await getHomePageIpoList({ category: "listed", page: 1, pageSize: PAGE_SIZE });
  const rawResults: any[] = res?.data?.results || [];
  const totalCount: number = res?.data?.count ?? rawResults.length;
  const initialItems = rawResults.map((raw: any) => transformApiIpo(raw, "listed"));

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Listed IPO", url: `${SITE_URL}/ipo/listed` },
  ]);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Recently Listed IPOs in India 2024–25",
    numberOfItems: Math.min(initialItems.length, 25),
    itemListElement: initialItems.slice(0, 25).map((ipo, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${ipo.name} IPO – Listed on ${ipo.listingDate || "BSE/NSE"}`,
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
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-up/10 text-up border border-up/20">
                    <span className="w-2 h-2 rounded-full bg-up" />
                    Listed on Exchange
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-mut bg-card2 border border-line">
                    {totalCount} IPOs Listed
                  </span>
                </div>
                <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-tx tracking-tight">
                  Listed IPO 2024–25 – Listing Performance & GMP
                </h1>
                <p className="text-sm sm:text-base text-mut leading-relaxed">
                  Complete list of recently listed IPOs on BSE and NSE. Track listing day gain, GMP,
                  subscription figures, price band, lot size and overall listing performance.
                </p>
              </div>
            </div>
          </div>

          {/* Client — filters + list/card + pagination */}
          <IpoListClient
            category="listed"
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
