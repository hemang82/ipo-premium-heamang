import { Metadata } from "next";
import { getIpoGmpList } from "@/lib/gmp-service";
import { GmpClient } from "@/components/gmp/GmpClient";
import { gmpFaqs } from "@/lib/gmp-faqs";
import { SITE_URL } from "@/lib/seo";

export const revalidate = 10; // Revalidate every 60 seconds for live GMP freshness

export const metadata: Metadata = {
  title: "Live IPO Market & Estimated Listing Tracker – BSE & NSE Mainboard & SME",
  description:
    "Track live IPO market indicators, price bands, issue dates, and estimated listing prices for all Indian Mainboard and SME public issues on BSE and NSE.",
  alternates: {
    canonical: `${SITE_URL}/ipo-gmp`,
  },
  keywords: [
    "IPO Market Today",
    "Live IPO Market",
    "IPO Listing Estimates",
    "Expected Listing Price",
    "Mainboard IPO Market",
    "SME IPO Market Today",
    "IPO Estimated Gain Calculator",
    "BSE NSE IPO Tracker",
    "Upcoming IPO Market Estimates",
    "IPO Price Band and Lot Size",
  ],
  openGraph: {
    title: "Live IPO Market – BSE & NSE",
    description:
      "Track live IPO market indicators, price bands, issue dates, and estimated listing prices for all Mainboard & SME IPOs on BSE and NSE.",
    url: `${SITE_URL}/ipo-gmp`,
    type: "website",
    locale: "en_IN",
    siteName: "IPO Market",
  },
  twitter: {
    card: "summary_large_image",
    title: "Live IPO Market – BSE & NSE",
    description:
      "Track live IPO market indicators, price bands, and estimated listing prices for all Mainboard & SME IPOs on BSE and NSE.",
  },
};

export default async function IpoGmpPage() {
  const { items, updatedAt } = await getIpoGmpList();

  // 1. BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "IPO Market Tracker",
        item: `${SITE_URL}/ipo-gmp`,
      },
    ],
  };

  // 2. ItemList Schema (Top 25 IPOs)
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Live IPO Market & Price Estimates",
    numberOfItems: Math.min(items.length, 25),
    itemListElement: items.slice(0, 25).map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${item.name} (${item.symbol}) - Issue Price: ₹${item.cutoffPrice || 'TBA'}`,
      url: `${SITE_URL}/ipo/${item.slug}/${item.symbol}`,
    })),
  };

  // 3. FAQPage Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: gmpFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // 4. WebPage Schema
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Live IPO Market & Estimated Listing Tracker (BSE & NSE)",
    url: `${SITE_URL}/ipo-gmp`,
    description:
      "Check live IPO market indicators, price bands, cut-off rates, and estimated listing prices for all Mainboard & SME IPOs in India.",
    inLanguage: "en-IN",
    isPartOf: {
      "@type": "WebSite",
      name: "IPO Market",
      url: SITE_URL,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      xpath: ["/html/head/title", "/html/head/meta[@name='description']/@content"],
    },
    dateModified: new Date().toISOString(),
  };

  return (
    <>
      {/* Structured JSON-LD Schemas in Head */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      {/* Main Container */}
      <main className="min-h-screen bg-bg py-8 sm:py-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <GmpClient initialItems={items} updatedAt={updatedAt} />
        </div>
      </main>
    </>
  );
}
