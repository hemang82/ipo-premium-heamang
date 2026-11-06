import { Metadata } from "next";
import { Ipo } from "./types";
import { formatINR, formatPercent, gmpPercent, estimatedListingPrice, formatSubscription } from "./format";

export const SITE_URL = "https://ipo-premium.com";
export const SITE_NAME = "ipo-premium";
export const SITE_TAGLINE = "Live IPO GMP, Subscription & Allotment Tracker";

export function getBaseMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${SITE_NAME} | Live IPO GMP, Subscription & Allotment Tracker`,
      template: `%s | ${SITE_NAME}`,
    },
    description:
      "Track live Grey Market Premium (GMP) for Indian IPOs today, subscription figures (QIB, NII, Retail), issue price band, listing dates and allotment status.",
    keywords: [
      "IPO GMP Today",
      "Grey Market Premium",
      "Live IPO Subscription Status",
      "IPO Allotment Status",
      "Current IPO GMP",
      "Mainboard IPO",
      "SME IPO GMP",
      "IPO Listing Gain Calculator",
      "BSE NSE IPO Tracker",
    ],
    authors: [{ name: "ipo-premium Team" }],
    creator: "ipo-premium.com",
    publisher: "ipo-premium.com",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: SITE_URL,
      siteName: SITE_NAME,
      title: `${SITE_NAME} | Live IPO GMP & Subscription Tracker`,
      description:
        "Know the premium before you apply. Accurate live Grey Market Premium (GMP), subscription and allotment tracker for Indian Mainboard & SME IPOs.",
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE_NAME} | Live IPO GMP Tracker`,
      description:
        "Check today's live IPO GMP, subscription status and listing gain estimates for all Indian IPOs.",
    },
  };
}

/**
 * High-CTR Dynamic Metadata Generator per IPO
 * Title Strategy: "{Name} IPO GMP ₹{gmp} ({+pct}%), Subscribed {sub}x"
 * Meta Description: Uses Company about summary + issue price + key allotment details
 */
export function getIpoMetadata(ipo: Ipo): Metadata {
  const pct = gmpPercent(ipo);
  const subTotal = ipo.subscription?.total || 0;
  const canonicalUrl = `${SITE_URL}/ipo/${ipo.slug}/${ipo.symbol}/`;

  // 1. High-CTR Dynamic Page Title
  const title = `${ipo.name} IPO GMP ₹${ipo.gmp} (${formatPercent(pct)}), Subscribed ${formatSubscription(subTotal)}`;

  // 2. High-converting Meta Description with Company info
  const aboutSnippet = ipo.description
    ? ipo.description.trim().slice(0, 160)
    : `${ipo.name} is a leading public issue listed on ${ipo.board}.`;
    
  const description = `${aboutSnippet} Check live GMP ₹${ipo.gmp} (${formatPercent(pct)} listing gain), price band ${ipo.priceBand}, lot size ${ipo.lotSize}, subscription status (${formatSubscription(subTotal)}), and key allotment dates.`;

  return {
    title,
    description,
    keywords: [
      `${ipo.name} IPO GMP Today`,
      `${ipo.name} Grey Market Premium`,
      `${ipo.name} IPO Review`,
      `${ipo.name} IPO Allotment Status`,
      `${ipo.name} Subscription Status`,
      `${ipo.name} Price Band`,
      `${ipo.symbol} IPO Listing Date`,
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: SITE_TAGLINE,
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
