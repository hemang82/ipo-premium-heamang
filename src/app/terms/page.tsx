import { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { FileText, ShieldAlert, Scale, Ban, AlertCircle, Mail } from "lucide-react";
import Link from "next/link";

export const revalidate = 10;

export const metadata: Metadata = {
  title: "Terms and Conditions of Service",
  description:
    "Terms and conditions governing the use of ipo-premium.com, including non-advisory disclosures, intellectual property, and acceptable use.",
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
  keywords: [
    "Terms of Service",
    "Terms and Conditions",
    "Website Usage Rules",
    "Non-Advisory Agreement",
  ],
  openGraph: {
    title: "Terms and Conditions of Service",
    description:
      "Terms and conditions governing the use of ipo-premium.com, including non-advisory disclosures, intellectual property, and acceptable use.",
    url: `${SITE_URL}/terms`,
    type: "website",
  },
};

export default function TermsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms and Conditions of Service | ipo-premium.com",
    url: `${SITE_URL}/terms`,
    description: "Official Terms and Conditions governing use of ipo-premium.com.",
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold text-accent mb-3">
            <FileText className="w-3.5 h-3.5" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-tx tracking-tightest mb-3">
            Terms & Conditions of Service
          </h1>
          <p className="text-xs sm:text-sm text-mut">
            Last updated: January 2025 • Effective immediately for all visitors and subscribers
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-tx/85 leading-relaxed">
          {/* Section 1: Acceptance */}
          <Card variant="default" className="p-6 border-line space-y-3">
            <h2 className="font-heading font-bold text-base sm:text-lg text-tx flex items-center gap-2">
              <Scale className="w-4 h-4 text-accent" />
              1. Acceptance of Terms
            </h2>
            <p className="text-mut">
              By visiting, accessing, indexing, or utilizing <strong>ipo-premium.com</strong> (the &quot;Platform&quot;), you acknowledge that you have read, understood, and agreed to be legally bound by these Terms and Conditions, our Privacy Policy, and our Statutory Disclaimer. If you do not consent to any part of these terms, your sole remedy is to immediately cease use of the Platform.
            </p>
          </Card>

          {/* Section 2: Non-Advisory Nature */}
          <Card variant="default" className="p-6 border-line space-y-3 bg-card2/40">
            <h2 className="font-heading font-bold text-base sm:text-lg text-tx flex items-center gap-2 text-accent">
              <ShieldAlert className="w-4 h-4 text-accent" />
              2. Strictly Informational & Non-Advisory Scope
            </h2>
            <p className="text-mut">
              The Platform provides financial journalism, primary market research, lot calculators, and aggregated Grey Market Premium (GMP) data. 
            </p>
            <p className="text-tx font-semibold">
              ipo-premium.com is NOT a SEBI-registered Research Analyst (RA), Investment Advisor (RIA), Stock Broker, or Portfolio Manager under the Securities and Exchange Board of India (SEBI) regulations.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-mut">
              <li>Nothing published on this website constitutes financial, legal, taxation, or investment advice.</li>
              <li>Estimated listing gains and GMP percentages are speculative indicators and should never replace personal due diligence.</li>
              <li>Always review the official Red Herring Prospectus (RHP) filed with SEBI before applying for any public issue.</li>
            </ul>
          </Card>

          {/* Section 3: Nature of Grey Market Data */}
          <Card variant="default" className="p-6 border-line space-y-3">
            <h2 className="font-heading font-bold text-base sm:text-lg text-tx flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-accent" />
              3. Nature of Grey Market Premiums (GMP)
            </h2>
            <p className="text-mut">
              Grey Market trading is an informal, non-statutory forward contract market functioning outside recognized stock exchanges (BSE & NSE). Rates are inherently volatile and driven by liquidity and market rumors. ipo-premium.com does not broker, execute, or facilitate OTC transactions, and shall not be held responsible for actual listing day price divergence.
            </p>
          </Card>

          {/* Section 4: Scraping & Fair Use */}
          <Card variant="default" className="p-6 border-line space-y-3">
            <h2 className="font-heading font-bold text-base sm:text-lg text-tx flex items-center gap-2">
              <Ban className="w-4 h-4 text-accent" />
              4. Proprietary Rights & Prohibited Activities
            </h2>
            <p className="text-mut">
              All branding, algorithms, computational tools, UI layout designs, and original research compilations are the intellectual property of ipo-premium.com. You agree not to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-mut">
              <li>Conduct automated scraping, harvesting, or bulk API extraction without written consent.</li>
              <li>Frame, mirror, or repackage our live data tables for commercial resale.</li>
              <li>Use the Platform for any unlawful purpose or to distribute unsolicited investment tips.</li>
            </ul>
          </Card>

          {/* Section 5: Limitation of Liability */}
          <Card variant="default" className="p-6 border-line space-y-3">
            <h2 className="font-heading font-bold text-base sm:text-lg text-tx">
              5. Limitation of Liability
            </h2>
            <p className="text-mut">
              To the fullest extent permitted by Indian law, ipo-premium.com, its owners, authors, and associates shall not be liable for any direct, indirect, consequential, punitive, or special damages (including investment losses, loss of profits, or capital erosion) resulting from the use or inability to use the Platform&apos;s data.
            </p>
          </Card>

          {/* Section 6: Contact & Inquiries */}
          <Card variant="default" className="p-6 border-line space-y-3 bg-card2/60">
            <h2 className="font-heading font-bold text-base sm:text-lg text-tx flex items-center gap-2">
              <Mail className="w-4 h-4 text-accent" />
              6. Legal Inquiries & Contact
            </h2>
            <p className="text-mut">
              For legal notices, terms clarification, or copyright inquiries, please write to our legal desk:
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
