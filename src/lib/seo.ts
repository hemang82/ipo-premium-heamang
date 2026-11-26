import { Metadata } from "next";
import { Ipo } from "./types";
import { formatINR, formatPercent, gmpPercent, estimatedListingPrice, formatSubscription } from "./format";

export const SITE_URL = "https://ipo-premium.com";
export const SITE_NAME = "IPO Premium";
export const SITE_TAGLINE = "Official Live IPO GMP, Allotment Status & Subscription Desk";

export function getBaseMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: "IPO Premium – Live IPO GMP Today & Allotment Status",
      template: `%s | ${SITE_NAME}`,
    },
    description:
      "Official IPO Premium tracker: Live IPO GMP today, real-time BSE & NSE subscription rates, direct registrar allotment status (Link Intime, KFintech), and expected listing gains.",
    keywords: [
      "IPO Premium",
      "ipopremium",
      "IPO Premium GMP",
      "IPO Allotment Status",
      "IPO Premium Allotment",
      "Grey Market Premium",
      "Live IPO Subscription Status",
      "Link Intime IPO Status",
      "KFintech IPO Status",
      "Mainboard IPO Market",
      "SME IPO Market",
      "BSE SME IPO",
      "NSE Emerge IPO",
    ],
    authors: [{ name: "ipo-premium Team" }],
    creator: "ipo-premium.com",
    publisher: "ipo-premium.com",
    alternates: {
      canonical: `${SITE_URL}/`,
    },
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
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "32x32" },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      shortcut: "/favicon.ico",
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
  };
}

/**
 * Helper to strip redundant legal suffixes from company names for Google SERP titles
 * e.g., "Shree Siddhivinayak Greentech Industries Limited" -> "Shree Siddhivinayak Greentech"
 */
function getConciseCompanyName(name: string): string {
  if (!name) return "";
  let clean = name
    .replace(/\s+Limited\b/gi, "")
    .replace(/\s+Ltd\.?\b/gi, "")
    .replace(/\s+Industries\b/gi, "")
    .replace(/\s+India\b/gi, "")
    .trim();
  
  // If still longer than 32 characters, truncate at word boundary
  if (clean.length > 32) {
    const cut = clean.slice(0, 32);
    clean = cut.slice(0, cut.lastIndexOf(" ")).trim();
  }
  return clean || name;
}

/**
 * High-CTR Dynamic Metadata Generator per IPO
 * Title Strategy: Guaranteed <= 60 characters for zero Google SERP truncation
 * Short names: "{Name} IPO GMP Today & Allotment Status"
 * Long names: "{ConciseName} IPO GMP Today & Allotment"
 */
export function getIpoMetadata(ipo: Ipo): Metadata {
  const pct = gmpPercent(ipo);
  const subTotal = ipo.subscription?.total || 0;
  const canonicalUrl = `${SITE_URL}/ipo/${ipo.slug}/${ipo.symbol}`;

  // Smart dynamic title strictly bounded under 60 characters
  let title = `${ipo.name} IPO GMP Today & Allotment Status`;
  if (title.length > 60) {
    const shortName = getConciseCompanyName(ipo.name);
    title = `${shortName} IPO GMP Today & Allotment`;
    // Extra safety: if still over 60, concise format
    if (title.length > 60) {
      title = `${shortName.slice(0, 32)} IPO GMP & Allotment`;
    }
  }

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

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_TAGLINE,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: "IPO Premium",
    alternateName: [
      "IPO Premium Official",
      "IPO Premium India",
      "ipopremium.com",
      "ipopremium",
      "ipo premium",
    ],
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    description: SITE_TAGLINE,
    sameAs: [
      "https://twitter.com/ipopremium",
    ],
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

export function getArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: article.url,
    datePublished: article.datePublished || new Date().toISOString(),
    dateModified: article.dateModified || new Date().toISOString(),
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
  };
}
