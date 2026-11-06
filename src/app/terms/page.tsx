import { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms and Conditions of Service",
  description:
    "Terms of service, statutory guidelines, and conditions of website use for ipo-premium.com.",
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
  openGraph: {
    title: "Terms and Conditions of Service",
    description: "Terms and conditions of website use for ipo-premium.com.",
    url: `${SITE_URL}/terms`,
    type: "website",
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-tx tracking-tightest mb-3">
          Terms & Conditions
        </h1>
        <p className="text-xs sm:text-sm text-mut">
          Last updated: January 2025 • Effective immediately for all visitors
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-tx/85 leading-relaxed">
        <Card variant="default" className="p-6 border-line space-y-3">
          <h2 className="font-heading font-bold text-base text-tx">1. Acceptance of Terms</h2>
          <p className="text-mut">
            By accessing and browsing <strong>ipo-premium.com</strong>, you acknowledge that you have read, understood, and agreed to be legally bound by these Terms and Conditions and our Statutory Disclaimer. If you do not agree, you must discontinue use immediately.
          </p>
        </Card>

        <Card variant="default" className="p-6 border-line space-y-3">
          <h2 className="font-heading font-bold text-base text-tx">2. Informational & Educational Scope Only</h2>
          <p className="text-mut">
            The content provided on this website—including Grey Market Premium (GMP) quotes, lot size calculators, subscription rates, and IPO analyses—is compiled strictly for educational and journalistic reporting. 
          </p>
          <p className="text-mut font-semibold text-accent">
            ipo-premium.com is NOT a SEBI-registered Research Analyst (RA), Investment Advisor (RIA), or Broker. Nothing on this website constitutes financial advisory or a solicitation to buy or sell securities.
          </p>
        </Card>

        <Card variant="default" className="p-6 border-line space-y-3">
          <h2 className="font-heading font-bold text-base text-tx">3. Nature of Grey Market Premiums (GMP)</h2>
          <p className="text-mut">
            Grey Market transactions are informal, unregulated contracts conducted outside regulated stock exchanges. Rates can be extremely volatile and change without notice due to market news or dealer liquidity. We do not guarantee the realization of any expected listing gain.
          </p>
        </Card>

        <Card variant="default" className="p-6 border-line space-y-3">
          <h2 className="font-heading font-bold text-base text-tx">4. Intellectual Property & Fair Use</h2>
          <p className="text-mut">
            All code, proprietary layout, content formatting, and computational tools on ipo-premium.com are protected by applicable intellectual property rights. Scraping, unauthorized reproduction, or framing of our live data feeds for commercial resale without prior written approval is prohibited.
          </p>
        </Card>

        <Card variant="default" className="p-6 border-line space-y-3">
          <h2 className="font-heading font-bold text-base text-tx">5. Limitation of Liability</h2>
          <p className="text-mut">
            To the maximum extent permitted by applicable Indian laws, ipo-premium.com and its operators shall not be liable for any direct, indirect, incidental, or consequential financial losses arising out of your reliance on information published on this website.
          </p>
        </Card>
      </div>
    </div>
  );
}
