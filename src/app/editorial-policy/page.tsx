import { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { SITE_URL } from "@/lib/seo";
import { ShieldCheck, RefreshCw, Database, Layers, CheckCircle2, AlertTriangle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Editorial Policy & GMP Data Collection Methodology",
  description:
    "Learn how ipo-premium.com sources, verifies, and updates IPO Grey Market Premiums (GMP), live BSE/NSE subscription numbers, and allotment timelines.",
  alternates: {
    canonical: `${SITE_URL}/editorial-policy`,
  },
  openGraph: {
    title: "Editorial Policy & GMP Data Collection Methodology",
    description: "Detailed transparency methodology regarding our IPO GMP data sources, broker verification, and update frequency.",
    url: `${SITE_URL}/editorial-policy`,
    type: "article",
  },
};

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold text-accent mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Transparency & Fact-Checking Standards</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-tx tracking-tightest mb-3">
          Editorial Standards & Data Methodology
        </h1>
        <p className="text-sm sm:text-base text-mut leading-relaxed">
          How ipo-premium.com collects, normalizes, verifies, and publishes primary market data, live Grey Market Premiums, and exchange subscription figures.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: GMP Collection */}
        <Card variant="default" className="p-6 sm:p-8 border-line space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-xl text-tx">
                1. How Grey Market Premium (GMP) Data is Collected
              </h2>
              <span className="text-xs text-mut font-mono">Aggregated from multiple OTC trading circles</span>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-tx/85 leading-relaxed">
            <p>
              The Grey Market for Indian IPOs is an over-the-counter (OTC) dealer-driven informal network. Because there is no centralized exchange for grey market transactions, collecting reliable rates requires a rigorous multi-source validation process:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-mut">
              <li>
                <strong>Multi-City Dealer Cross-Referencing:</strong> We monitor dealer bids and quotes across key financial centers including Mumbai, Ahmedabad, Surat, Jaipur, and Rajkot.
              </li>
              <li>
                <strong>Outlier Elimination:</strong> Single-party bids, unverified messaging rumors, and non-actionable quotes are discarded. We calculate a volume-weighted median rate.
              </li>
              <li>
                <strong>Kostak & Subject to Sauda Verification:</strong> Whenever available, we verify corresponding Kostak rates and Subject to Sauda agreements to ensure quoted GMPs correspond to real bid demand.
              </li>
              <li>
                <strong>Update Cadence:</strong> Rates are updated periodically throughout active market trading hours (10:00 AM – 6:00 PM IST) and refreshed when significant market movements occur.
              </li>
            </ul>
          </div>
        </Card>

        {/* Section 2: Subscription Data */}
        <Card variant="default" className="p-6 sm:p-8 border-line space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-up/10 border border-up/20 flex items-center justify-center text-up">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-xl text-tx">
                2. Live Subscription Data Sources & Frequency
              </h2>
              <span className="text-xs text-mut font-mono">Official BSE and NSE Bidding Feeds</span>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-tx/85 leading-relaxed">
            <p>
              Unlike GMP, subscription status is an official statutory metric. All subscription figures displayed on our platform are synced directly from official stock exchange bidding portals:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-mut">
              <li>
                <strong>Direct Exchange Feeds:</strong> Data is synchronized directly from the Bombay Stock Exchange (BSE) and National Stock Exchange of India (NSE).
              </li>
              <li>
                <strong>Frequency:</strong> During active IPO bidding days, numbers are fetched every 15–30 minutes between 10:00 AM and 5:00 PM IST, with final consolidated numbers posted by 6:30 PM IST.
              </li>
              <li>
                <strong>Segment Segregation:</strong> We separately report QIB (Qualified Institutional Buyers), NII/HNI (split by sHNI ₹2L–₹10L and bHNI &gt;₹10L where available), and Retail categories.
              </li>
            </ul>
          </div>
        </Card>

        {/* Section 3: Allotment Information */}
        <Card variant="default" className="p-6 sm:p-8 border-line space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-xl text-tx">
                3. Registrar Assignments & Allotment Verification
              </h2>
              <span className="text-xs text-mut font-mono">SEBI RHP Filings & Official Registrar Links</span>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-tx/85 leading-relaxed">
            <p>
              Allotment dates, registrar names, and official query portals are verified against the Draft Red Herring Prospectus (DRHP) and final Red Herring Prospectus (RHP) filed with the Securities and Exchange Board of India (SEBI).
            </p>
            <p className="text-mut">
              We provide direct, non-affiliated navigation links to authorized registrars (Link Intime, KFin Technologies, Bigshare Services, Skyline, Maashitla, and Purva Sharegistry) to ensure investors check allocation safely without third-party credential interception.
            </p>
          </div>
        </Card>

        {/* Section 4: Corrections & Editorial Neutrality */}
        <Card variant="default" className="p-6 sm:p-8 border-line space-y-4 bg-card2/50">
          <h2 className="font-heading font-bold text-lg text-tx">
            4. Corrections Policy & Editorial Independence
          </h2>
          <p className="text-xs sm:text-sm text-mut leading-relaxed">
            Our editorial desk operates with strict financial independence. We do not accept sponsored compensation to inflate or manipulate Grey Market Premiums. If a factual inaccuracy or dated figure is discovered, corrections are applied promptly with an updated timestamp.
          </p>
          <p className="text-xs text-accent font-semibold">
            To submit a data correction or inquiry, please contact:{" "}
            <Link href="/contact" className="underline hover:text-accent/80">
              editorial@ipo-premium.com
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
