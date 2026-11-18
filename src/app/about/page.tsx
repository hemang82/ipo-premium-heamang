import { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import {
  ShieldCheck,
  TrendingUp,
  Target,
  Database,
  Award,
  Users,
  CheckCircle2,
  Mail,
  Scale,
  Sparkles,
  Search,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

export const revalidate = 10;

export const metadata: Metadata = {
  title: "About Us & Data Tracking Methodology",
  description:
    "Learn how ipo-premium.com aggregates, verifies, and publishes primary market data, OTC Grey Market Premiums, and exchange subscription metrics.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  keywords: [
    "About ipo-premium",
    "IPO Research Desk India",
    "GMP Tracking Methodology",
    "Primary Market Analytics",
    "Unbiased IPO Intelligence",
  ],
  openGraph: {
    title: "About Us & Data Tracking Methodology",
    description:
      "Learn how ipo-premium.com aggregates, verifies, and publishes primary market data, OTC Grey Market Premiums, and exchange subscription metrics.",
    url: `${SITE_URL}/about`,
    type: "website",
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About ipo-premium.com",
    url: `${SITE_URL}/about`,
    description:
      "Authoritative independent research and tracking desk for Indian initial public offerings (IPOs), real-time Grey Market Premiums (GMP), and exchange subscription telemetry.",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
      email: "support@ipo-premium.com",
      foundingDate: "2024",
      sameAs: [
        "https://twitter.com/ipo_premium",
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Header Badge & Title */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold text-accent mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Independent Primary Market Research</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-tx tracking-tightest mb-3">
            About ipo-premium.com
          </h1>
          <p className="font-heading text-base sm:text-lg text-accent font-semibold mb-3">
            Know the premium before you apply.
          </p>
          <p className="text-sm sm:text-base text-mut leading-relaxed">
            Engineered to empower retail, High-Net-Worth (HNI), and institutional market participants across India with fast, transparent, and fact-verified IPO intelligence.
          </p>
        </div>

        {/* Core Mission Banner */}
        <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-card2 via-card to-card2 border border-line shadow-sm space-y-4">
          <div className="flex items-center gap-3 text-accent font-semibold text-sm">
            <Target className="w-5 h-5 shrink-0" />
            <span>Our Founding Objective</span>
          </div>
          <p className="text-sm sm:text-base text-tx/90 leading-relaxed">
            The Indian primary equity market is among the most dynamic globally, with hundreds of Mainboard and SME public issues launching annually. Yet, retail participants historically faced fragmented data, unverified social media rumors regarding Grey Market Premiums (GMP), and delayed subscription telemetry.
          </p>
          <p className="text-xs sm:text-sm text-mut leading-relaxed">
            <strong>ipo-premium.com</strong> was founded to solve this information asymmetry. We aggregate, sanitize, and verify raw primary market data into a clean, lightning-fast dashboard that provides actionable clarity without emotional speculation or paid promotional bias.
          </p>
        </div>

        {/* Key Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card variant="default" className="p-6 border-line flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-tx mb-2">Multi-Source Verification</h3>
              <p className="text-xs text-mut leading-relaxed">
                We cross-check Grey Market bids across OTC dealer desks in Mumbai, Gujarat, and Rajasthan, filtering out false rumors with volume-weighted metrics.
              </p>
            </div>
            <div className="pt-4 border-t border-line/40 mt-4 text-[11px] font-mono text-accent">
              Real-time Triangulation
            </div>
          </Card>

          <Card variant="default" className="p-6 border-line flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-up/10 border border-up/20 flex items-center justify-center text-up mb-4">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-tx mb-2">Live Exchange Telemetry</h3>
              <p className="text-xs text-mut leading-relaxed">
                Direct synchronization with official BSE India and NSE India bidding portals during market hours, giving true institutional vs retail demand breakdowns.
              </p>
            </div>
            <div className="pt-4 border-t border-line/40 mt-4 text-[11px] font-mono text-up">
              Official Bidding Feeds
            </div>
          </Card>

          <Card variant="default" className="p-6 border-line flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-tx mb-2">Zero Conflict of Interest</h3>
              <p className="text-xs text-mut leading-relaxed">
                We accept no paid sponsorship from IPO promoters, book running lead managers (BRLMs), or brokers to artificially pump or inflate premiums.
              </p>
            </div>
            <div className="pt-4 border-t border-line/40 mt-4 text-[11px] font-mono text-accent">
              100% Unbiased Publishing
            </div>
          </Card>
        </div>

        {/* Detailed Data Methodology Section */}
        <div className="space-y-6 mb-12">
          <h2 className="font-heading font-bold text-2xl text-tx tracking-tight">
            Our 3-Tiered Tracking Methodology
          </h2>

          <Card variant="default" className="p-6 sm:p-7 border-line space-y-3">
            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-lg bg-accent/10 text-accent font-bold text-sm flex items-center justify-center shrink-0">
                1
              </span>
              <div>
                <h3 className="font-heading font-bold text-base text-tx mb-1">
                  Grey Market Premium (GMP) Aggregation
                </h3>
                <p className="text-xs sm:text-sm text-mut leading-relaxed">
                  Grey market operations in India are informal, over-the-counter forward agreements. Rather than relying on single unverified WhatsApp or Telegram channels, our desk surveys established market makers across key regional trading hubs (Mumbai Nariman Point/BKC, Ahmedabad, Rajkot, Surat, and Jaipur). We discard single-party outlier quotes and calculate the trimmed median to report genuine liquidity.
                </p>
              </div>
            </div>
          </Card>

          <Card variant="default" className="p-6 sm:p-7 border-line space-y-3">
            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-lg bg-accent/10 text-accent font-bold text-sm flex items-center justify-center shrink-0">
                2
              </span>
              <div>
                <h3 className="font-heading font-bold text-base text-tx mb-1">
                  BSE & NSE Live Subscription Feeds
                </h3>
                <p className="text-xs sm:text-sm text-mut leading-relaxed">
                  During active public issue bidding days (Day 1 to Day 3), subscription data is refreshed dynamically every 15 to 30 minutes from Bombay Stock Exchange and National Stock Exchange servers. We clearly segregate Qualified Institutional Buyers (QIB), Non-Institutional Bidders (HNI/NII - subdivided by Small HNI and Big HNI), and Retail Individual Investors (RII).
                </p>
              </div>
            </div>
          </Card>

          <Card variant="default" className="p-6 sm:p-7 border-line space-y-3">
            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-lg bg-accent/10 text-accent font-bold text-sm flex items-center justify-center shrink-0">
                3
              </span>
              <div>
                <h3 className="font-heading font-bold text-base text-tx mb-1">
                  SEBI Prospectus & Registrar Cross-Verification
                </h3>
                <p className="text-xs sm:text-sm text-mut leading-relaxed">
                  Issue price bands, face value, lot sizes, anchor investor lock-ins, and key timeline dates (Allotment, Refund, Demat credit, and Listing) are strictly authenticated against the formal Draft Red Herring Prospectus (DRHP) and final Red Herring Prospectus (RHP) filed with the Securities and Exchange Board of India (SEBI). Allotment portal links navigate directly to authorized registrars (Link Intime, KFintech, Bigshare, etc.).
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Editorial Independence & SEBI Disclaimer */}
        <div className="p-6 sm:p-8 rounded-2xl bg-card border border-line space-y-4 mb-12">
          <div className="flex items-center gap-2.5 text-tx font-heading font-bold text-lg">
            <Award className="w-5 h-5 text-accent" />
            <span>Editorial Standards & Non-Advisory Declaration</span>
          </div>
          <p className="text-xs sm:text-sm text-mut leading-relaxed">
            <strong>ipo-premium.com</strong> is a financial news and analytical data publisher. We are <strong>not</strong> a SEBI-registered Investment Advisory (RIA), Research Analyst (RA), or Portfolio Management Service (PMS).
          </p>
          <ul className="text-xs text-mut space-y-1.5 list-disc pl-5">
            <li>We do NOT sell stock tips or buy/sell recommendations.</li>
            <li>We NEVER solicit money or handle investor funds for IPO applications.</li>
            <li>All content, GMP rates, and estimated listing profits are strictly for educational and informational research.</li>
          </ul>
        </div>

        {/* Official Contact & Feedback Card */}
        <Card variant="default" className="p-6 sm:p-8 border-line">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-heading font-bold text-lg text-tx mb-1">
                Have Data Corrections or Editorial Inquiries?
              </h3>
              <p className="text-xs sm:text-sm text-mut">
                Our research desk promptly investigates data discrepancies, DRHP updates, and user suggestions.
              </p>
            </div>
            <a
              href="mailto:support@ipo-premium.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-[#2A130B] font-semibold text-xs hover:bg-accent/90 transition-colors shrink-0"
            >
              <Mail className="w-4 h-4" />
              <span>support@ipo-premium.com</span>
            </a>
          </div>
        </Card>
      </div>
    </>
  );
}
