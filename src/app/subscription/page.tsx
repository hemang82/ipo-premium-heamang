import { Metadata } from "next";
import { getLiveSubscriptionList, checkIsMarketHours } from "@/lib/subscription-service";
import { SubscriptionClient } from "@/components/subscription/SubscriptionClient";
import { subscriptionFaqs } from "@/lib/subscription-faqs";
import { SITE_URL } from "@/lib/seo";

export const revalidate = 30; // ISR revalidate every 30 seconds for live subscription tracking

export const metadata: Metadata = {
  title: "IPO Subscription Status Live 2026 | QIB, NII & Retail (BSE & NSE)",
  description:
    "Track Live IPO Subscription Status for 2026 in real-time across QIB, NII (HNI), and Retail categories. Updated BSE & NSE oversubscription rates for Mainboard & SME IPOs.",
  alternates: {
    canonical: `${SITE_URL}/subscription`,
  },
  keywords: [
    "live ipo subscription status",
    "ipo subscription status today",
    "qib nii retail subscription",
    "bse nse ipo bidding",
    "ipo oversubscription rates",
    "sme ipo subscription",
    "live bidding demand 2026",
  ],
  openGraph: {
    title: "IPO Subscription Status Live 2026 | QIB, NII & Retail (BSE & NSE)",
    description:
      "Track Live IPO Subscription Status for 2026 in real-time across QIB, NII (HNI), and Retail categories. Updated BSE & NSE oversubscription rates for Mainboard & SME IPOs.",
    url: `${SITE_URL}/subscription`,
    type: "website",
    locale: "en_IN",
    siteName: "ipo-premium",
  },
  twitter: {
    card: "summary_large_image",
    title: "IPO Subscription Status Live 2026 | QIB, NII & Retail (BSE & NSE)",
    description:
      "Track live IPO oversubscription figures across QIB, NII (HNI), and Retail categories on BSE & NSE.",
  },
};

export default async function SubscriptionPage() {
  const { mainboard, sme, updatedAt } = await getLiveSubscriptionList();
  const isMarketHours = checkIsMarketHours();

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
        name: "Live IPO Subscription Status",
        item: `${SITE_URL}/subscription`,
      },
    ],
  };

  // 2. FAQPage Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: subscriptionFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      {/* Structured JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Main Page Layout */}
      <main className="min-h-screen bg-bg py-8 sm:py-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <SubscriptionClient
            initialMainboard={mainboard}
            initialSme={sme}
            initialUpdatedAt={updatedAt}
            initialIsMarketHours={isMarketHours}
          />
        </div>
      </main>
    </>
  );
}
