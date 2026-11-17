import { Metadata } from "next";
import { getIpoGmpList } from "@/lib/gmp-service";
import { GmpClient } from "@/components/gmp/GmpClient";
import { gmpFaqs } from "@/lib/gmp-faqs";
import { SITE_URL } from "@/lib/seo";

export const revalidate = 10; // Revalidate every 60 seconds for live GMP freshness

export const metadata: Metadata = {
  title: "IPO GMP Today – Live Grey Market Premium (BSE & NSE)",
  description:
    "Check live IPO GMP today, grey market premium rates, and estimated listing prices for all Mainboard & SME IPOs on BSE and NSE with expected listing gains.",
  alternates: {
    canonical: `${SITE_URL}/ipo-gmp`,
  },
  keywords: [
    "IPO GMP",
    "IPO GMP Today",
    "grey market",
    "gray market",
    "ipo grey market",
    "grey market ipo",
    "grey market premium",
    "ipo grey market premium today",
    "gmp today",
    "live grey market premium",
    "ipo grey market premium",
    "current ipo gmp",
    "latest ipo gmp",
    "recent ipo gmp",
    "ipo gmp status",
    "gmp today live",
    "ipo gmp rate today",
    "ipo grey market price",
    "ipo gmp table",
    "nse grey market premium",
    "SME IPO GMP Today",
    "Kostak Rate Today",
    "Subject to Sauda Rate",
  ],
  openGraph: {
    title: "IPO GMP Today – Live Grey Market Premium (BSE & NSE)",
    description:
      "Check live IPO GMP today, grey market premium rates, and estimated listing prices for all Mainboard & SME IPOs on BSE and NSE with expected listing gains.",
    url: `${SITE_URL}/ipo-gmp`,
    type: "website",
    locale: "en_IN",
    siteName: "ipo-premium",
  },
  twitter: {
    card: "summary_large_image",
    title: "IPO GMP Today – Live Grey Market Premium (BSE & NSE)",
    description:
      "Check live IPO GMP today, grey market premium rates, and estimated listing prices for all Mainboard & SME IPOs on BSE and NSE.",
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
        name: "IPO GMP Today",
        item: `${SITE_URL}/ipo-gmp`,
      },
    ],
  };

  // 2. ItemList Schema (Top 25 IPOs)
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Live IPO Grey Market Premium (GMP) Rates",
    numberOfItems: Math.min(items.length, 25),
    itemListElement: items.slice(0, 25).map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${item.name} (${item.symbol}) - GMP: ₹${item.gmp}`,
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
    name: "IPO GMP Today – Live Grey Market Premium (BSE & NSE)",
    url: `${SITE_URL}/ipo-gmp`,
    description:
      "Check IPO GMP today for all Mainboard & SME IPOs on BSE and NSE. View live Grey Market Premium, estimated listing price, expected gain %, and current IPO GMP trends on one page.",
    inLanguage: "en-IN",
    isPartOf: {
      "@type": "WebSite",
      name: "ipo-premium",
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
