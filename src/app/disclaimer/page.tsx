import { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { AlertTriangle, ShieldAlert, Scale, HelpCircle, Mail, ExternalLink } from "lucide-react";
import Link from "next/link";

export const revalidate = 10;

export const metadata: Metadata = {
  title: "Investment Risk & Regulatory Disclaimer",
  description:
    "Statutory disclaimer: ipo-premium.com is an educational platform and not a SEBI-registered advisor. Equity investments carry market risks.",
  alternates: {
    canonical: `${SITE_URL}/disclaimer`,
  },
  keywords: [
    "Investment Risk Disclaimer",
    "Non-SEBI Advisory Notice",
    "Equity Market Risk",
    "Educational Use Only",
  ],
  openGraph: {
    title: "Investment Risk & Regulatory Disclaimer",
    description:
      "Statutory disclaimer: ipo-premium.com is an educational platform and not a SEBI-registered advisor. Equity investments carry market risks.",
    url: `${SITE_URL}/disclaimer`,
    type: "website",
  },
};

export default function DisclaimerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Statutory & Financial Risk Disclaimer | ipo-premium.com",
    url: `${SITE_URL}/disclaimer`,
    description:
      "Comprehensive statutory and SEBI risk disclaimer for ipo-premium.com visitors and investors.",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      email: "support@ipo-premium.com",
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dn/10 border border-dn/20 text-xs font-semibold text-dn mb-3">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Statutory Risk Warning</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-tx tracking-tightest mb-3">
            Statutory & Investment Disclaimer
          </h1>
          <p className="text-xs sm:text-sm text-mut">
            Please read this comprehensive disclaimer carefully before using any tools or reading data on ipo-premium.com.
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-tx/85 leading-relaxed">
          {/* Primary Warning Box */}
          <Card variant="default" className="p-6 border-dn/30 bg-dn/5 space-y-3">
            <div className="flex items-center gap-2.5 text-dn font-bold text-sm sm:text-base">
              <ShieldAlert className="w-5 h-5 shrink-0" />
              <span>1. Grey Market Premium (GMP) Statutory Notice & SEBI Advisory</span>
            </div>
            <p className="text-tx/90 leading-relaxed">
              The <strong>Grey Market Premium (GMP)</strong> published on <strong>ipo-premium.com</strong> represents unofficial, unregulated, over-the-counter (OTC) forward rate indications circulated among informal trading circles. 
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-mut">
              <li>
                <strong>Not Recognized by Regulators:</strong> Grey market trading is <strong>neither recognized nor approved</strong> by the Securities and Exchange Board of India (SEBI), Reserve Bank of India (RBI), Bombay Stock Exchange (BSE), or National Stock Exchange of India (NSE).
              </li>
              <li>
                <strong>Speculative Nature:</strong> Quoted premiums do not guarantee actual listing day opening prices. External equity volatility, global macros, anchor investor sentiment, and listing day order book dynamics can cause shares to list at a steep discount to their pre-listing GMP.
              </li>
              <li>
                <strong>No Trading Facility:</strong> ipo-premium.com does NOT conduct, broker, facilitate, or profit from grey market transactions, Kostak rates, or Subject-to-Sauda deals.
              </li>
            </ul>
            <div className="pt-2">
              <a
                href="https://docipo.ipotrending.com/uploads/otherdocument/1795585231037.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline bg-accent/10 px-3 py-1.5 rounded-lg border border-accent/20"
              >
                <span>Download &amp; Read Official SEBI Advisory Document (PDF)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </Card>

          {/* Section 2: Non-SEBI Registration */}
          <Card variant="default" className="p-6 border-line space-y-3">
            <h2 className="font-heading font-bold text-base sm:text-lg text-tx flex items-center gap-2">
              <Scale className="w-4 h-4 text-accent" />
              2. Non-Advisory & Non-SEBI Registered Entity
            </h2>
            <p className="text-mut">
              <strong>ipo-premium.com is an independent digital analytics and educational publisher.</strong> We are:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-mut">
              <li>NOT a SEBI-registered Investment Advisor (RIA)</li>
              <li>NOT a SEBI-registered Research Analyst (RA)</li>
              <li>NOT a registered Stock Broker, Sub-Broker, or Merchant Banker</li>
              <li>NOT a Portfolio Management Service (PMS)</li>
            </ul>
            <p className="text-mut pt-1">
              No content published on this website should be construed as an invitation, solicitation, recommendation, or endorsement to apply for, buy, sell, or hold any financial security.
            </p>
          </Card>

          {/* Section 3: Red Herring Prospectus (RHP) Primacy */}
          <Card variant="default" className="p-6 border-line space-y-3">
            <h2 className="font-heading font-bold text-base sm:text-lg text-tx flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-accent" />
              3. Primacy of the Red Herring Prospectus (RHP)
            </h2>
            <p className="text-mut">
              Prior to submitting an application for any IPO through ASBA (Application Supported by Blocked Amount) or UPI, investors must carefully inspect the <strong>Draft Red Herring Prospectus (DRHP)</strong> and <strong>final Red Herring Prospectus (RHP)</strong> filed by the issuer company with SEBI and the stock exchanges.
            </p>
            <p className="text-mut">
              Particular focus should be given to <em>Risk Factors</em>, financial balance sheets, promoter track record, litigation, and intended use of Net Issue Proceeds.
            </p>
          </Card>

          {/* Section 4: General Market Risk */}
          <Card variant="default" className="p-6 border-line space-y-3">
            <h2 className="font-heading font-bold text-base sm:text-lg text-tx">
              4. General Market Risks & Capital Loss Warning
            </h2>
            <p className="text-mut">
              Equity investments and IPO bidding involve substantial risk of capital loss. Share prices may fluctuate significantly below the issue price. Past performance, previous SME or Mainboard listing records, or historical grey market trends are not guarantees of future returns. Investors should consult a qualified and registered financial advisor before committing funds.
            </p>
          </Card>

          {/* Section 5: Support & Inquiries */}
          <Card variant="default" className="p-6 border-line space-y-3 bg-card2/60">
            <h2 className="font-heading font-bold text-base sm:text-lg text-tx flex items-center gap-2">
              <Mail className="w-4 h-4 text-accent" />
              5. Questions or Disclaimer Inquiries
            </h2>
            <p className="text-mut">
              If you have any questions regarding these statutory disclosures, please contact:
            </p>
            <p className="text-xs font-mono font-semibold text-accent">
              Official Email:{" "}
              <a href="mailto:support@ipo-premium.com" className="underline">
                support@ipo-premium.com
              </a>
            </p>
          </Card>
        </div>
      </div>
    </>
  );
}
