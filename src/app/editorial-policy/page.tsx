import { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import {
  ShieldCheck,
  RefreshCw,
  Database,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Scale,
  FileCheck2,
  Mail,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";

export const revalidate = 10;

export const metadata: Metadata = {
  title: "Editorial Policy & GMP Methodology",
  description:
    "Our editorial standards for primary market reporting, multi-dealer OTC GMP triangulation, data fact-checking, and correction protocols.",
  alternates: {
    canonical: `${SITE_URL}/editorial-policy`,
  },
  keywords: [
    "IPO Editorial Standards",
    "Fact Checking Policy",
    "GMP Data Collection Methodology",
    "OTC Dealer Verification",
    "Primary Market Research",
  ],
  openGraph: {
    title: "Editorial Policy & GMP Methodology",
    description:
      "Our editorial standards for primary market reporting, multi-dealer OTC GMP triangulation, data fact-checking, and correction protocols.",
    url: `${SITE_URL}/editorial-policy`,
    type: "article",
  },
};

export default function EditorialPolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Editorial Policy & Data Collection Methodology",
    description:
      "Comprehensive guidelines and verification framework governing primary market data collection, Grey Market Premium triangulation, and editorial objectivity at ipo-premium.com.",
    url: `${SITE_URL}/editorial-policy`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
      email: "support@ipo-premium.com",
    },
    author: {
      "@type": "Organization",
      name: "ipo-premium Research Desk",
    },
    dateModified: new Date().toISOString(),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold text-accent mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Fact-Checking & Quality Assurance</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-tx tracking-tightest mb-3">
            Editorial Standards & Data Methodology
          </h1>
          <p className="text-sm sm:text-base text-mut leading-relaxed">
            How ipo-premium.com aggregates, verifies, sanitizes, and publishes Indian primary market data, live Grey Market Premiums (GMP), and official exchange subscription metrics.
          </p>
        </div>

        <div className="space-y-8">
          {/* Section 1: GMP Collection Methodology */}
          <Card variant="default" className="p-6 sm:p-8 border-line space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-heading font-bold text-xl text-tx">
                  1. Grey Market Premium (GMP) Verification Framework
                </h2>
                <span className="text-xs text-mut font-mono">
                  Multi-City OTC Dealer Triangulation
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-tx/85 leading-relaxed">
              <p>
                In the Indian equity ecosystem, the Grey Market is an unofficial, dealer-to-dealer over-the-counter (OTC) forward trading market. Because no statutory exchange monitors these private quotes, published figures across social channels are frequently distorted by market rumors. Our research desk enforces a four-step normalization protocol:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-mut">
                <li>
                  <strong>Regional Dealer Surveillance:</strong> We survey verified primary market makers across major Indian trading epicenters, including Mumbai (BKC & Fort), Ahmedabad, Rajkot, Surat, and Jaipur.
                </li>
                <li>
                  <strong>Outlier & Noise Filtering:</strong> Single-party quotes, speculative message forwards, and bids lacking matching ask volume are excluded. We calculate a volume-weighted trimmed median rather than an arithmetic mean.
                </li>
                <li>
                  <strong>Kostak & Subject-to-Sauda Cross-Check:</strong> We evaluate accompanying Kostak rates (the price paid for an IPO application irrespective of allotment) and Subject-to-Sauda contracts (profit guaranteed upon confirmed allotment) to validate real institutional demand.
                </li>
                <li>
                  <strong>Update Timing:</strong> Quotes are checked continuously during active Indian stock market trading hours (10:00 AM – 6:00 PM IST) and refreshed whenever market index volatility (Nifty 50, BSE Sensex) creates meaningful shifts in demand.
                </li>
              </ul>
            </div>
          </Card>

          {/* Section 2: Live Subscription Telemetry */}
          <Card variant="default" className="p-6 sm:p-8 border-line space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-up/10 border border-up/20 flex items-center justify-center text-up">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-heading font-bold text-xl text-tx">
                  2. Live Exchange Subscription Telemetry
                </h2>
                <span className="text-xs text-mut font-mono">
                  Official BSE India & NSE India Feeds
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-tx/85 leading-relaxed">
              <p>
                Subscription figures shown on our platform are statutory, audited figures sourced directly from official stock exchange bidding telemetry:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-mut">
                <li>
                  <strong>Direct Ingestion:</strong> Cumulative bidding counts are fetched directly from the Bombay Stock Exchange (BSE) and National Stock Exchange of India (NSE) servers.
                </li>
                <li>
                  <strong>Frequency of Sync:</strong> Every 15 to 30 minutes between 10:00 AM and 5:00 PM IST during live subscription windows (Day 1, Day 2, and Day 3). Final post-closing consolidated figures are refreshed by 6:30 PM IST after exchange reconciliations.
                </li>
                <li>
                  <strong>Category Granularity:</strong> We separate Qualified Institutional Buyers (QIB - excluding anchor quota), Non-Institutional Investors (NII/HNI, sub-segmented into Small HNI ₹2L–₹10L and Big HNI &gt;₹10L where published), and Retail Individual Investors (RII).
                </li>
              </ul>
            </div>
          </Card>

          {/* Section 3: SEBI Filings & Registrar Verification */}
          <Card variant="default" className="p-6 sm:p-8 border-line space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-heading font-bold text-xl text-tx">
                  3. Prospectus Verification & Safe Allotment Navigation
                </h2>
                <span className="text-xs text-mut font-mono">
                  DRHP, RHP & Registrar Portals
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-tx/85 leading-relaxed">
              <p>
                Every key parameter displayed on ipo-premium.com—including company background, promoter holdings, face value, price band, issue size, lot size, anchor allotment details, and T+3 settlement timelines—is validated against the official Draft Red Herring Prospectus (DRHP) and final Red Herring Prospectus (RHP) filed with SEBI.
              </p>
              <p className="text-mut">
                For allotment queries, we only provide direct, un-redirected links to authorized registrars (such as Link Intime, KFintech, Bigshare Services, Skyline, Maashitla, and Purva Sharegistry). We never capture or store investor PAN, Application Number, or DP ID.
              </p>
            </div>
          </Card>

          {/* Section 4: Corrections & Grievance Mechanism */}
          <Card variant="default" className="p-6 sm:p-8 border-line space-y-4 bg-card2/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-heading font-bold text-xl text-tx">
                  4. Correction Policy & Editorial Independence
                </h2>
                <span className="text-xs text-mut font-mono">
                  Prompt Correction & Complete Transparency
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-tx/85 leading-relaxed">
              <p>
                Our editorial staff operates under complete commercial independence. We do not participate in IPO marketing campaigns, paid promotional PR placements, or affiliate commission arrangements that could influence our commentary or GMP quotes.
              </p>
              <p className="text-mut">
                If you detect a factual error, date modification, or pricing typographical error on any IPO card, our desk welcomes prompt notification. Errors are reviewed and amended within 24 hours of notification with a transparent revision record.
              </p>
              <div className="pt-2">
                <p className="text-xs font-semibold text-tx">
                  To report an editorial correction or submit market feedback:
                </p>
                <a
                  href="mailto:support@ipo-premium.com?subject=Editorial%20Correction%20Request"
                  className="text-xs font-mono font-semibold text-accent hover:underline inline-flex items-center gap-1.5 mt-1"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>support@ipo-premium.com</span>
                </a>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
