import { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Us & Tracking Methodology | ipo-premium",
  description:
    "Learn about ipo-premium.com, our editorial standards, and our reliable methodology for tracking Grey Market Premiums (GMP) and IPO subscriptions.",
  alternates: {
    canonical: `${SITE_URL}/about/`,
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-tx tracking-tightest mb-4">
        About ipo-premium.com
      </h1>
      <p className="font-heading text-lg font-semibold text-accent mb-6">
        Know the premium before you apply
      </p>

      <div className="space-y-6 text-sm text-tx/90 leading-relaxed">
        <p>
          <strong>ipo-premium.com</strong> is a specialized financial data tracker engineered for retail and institutional primary market participants in India. Our mission is to provide accurate, transparent, and ultra-fast intelligence on initial public offerings (IPOs).
        </p>

        <Card variant="default" className="p-5 border-line space-y-3">
          <h2 className="font-heading font-bold text-base text-tx">
            Our Data Methodology
          </h2>
          <p className="text-xs text-mut leading-relaxed">
            1. <strong>GMP Gathering:</strong> We aggregate off-market rates from major trading desks across Mumbai, Gujarat, and Rajasthan to calculate the volume-weighted median premium.
          </p>
          <p className="text-xs text-mut leading-relaxed">
            2. <strong>Live Subscription Data:</strong> Direct exchange feeds from BSE India and NSE India are monitored every 15 minutes during active bidding hours (10:00 AM – 5:00 PM IST).
          </p>
          <p className="text-xs text-mut leading-relaxed">
            3. <strong>Verified Dates:</strong> Timelines and registrar assignments are cross-referenced with SEBI Red Herring Prospectus (RHP) filings.
          </p>
        </Card>
      </div>
    </div>
  );
}
