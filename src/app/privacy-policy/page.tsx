import { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { ShieldCheck, Lock, Eye, FileText, Mail, Server } from "lucide-react";
import Link from "next/link";

export const revalidate = 10;

export const metadata: Metadata = {
  title: "Privacy & Cookie Policy",
  description:
    "Our commitment to privacy under the DPDP Act 2023. We do not store sensitive financial credentials, Demat details, or banking passwords.",
  alternates: {
    canonical: `${SITE_URL}/privacy-policy`,
  },
  keywords: [
    "Privacy Policy",
    "DPDP Act 2023 Compliance",
    "Cookie Policy",
    "Data Security",
  ],
  openGraph: {
    title: "Privacy & Cookie Policy",
    description:
      "Our commitment to privacy under the DPDP Act 2023. We do not store sensitive financial credentials, Demat details, or banking passwords.",
    url: `${SITE_URL}/privacy-policy`,
    type: "website",
  },
};

export default function PrivacyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy | ipo-premium.com",
    url: `${SITE_URL}/privacy-policy`,
    description:
      "Comprehensive Privacy and Cookie statement for ipo-premium.com governing data security and DPDP compliance.",
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
            <Lock className="w-3.5 h-3.5" />
            <span>DPDP Act 2023 & GDPR Compliant</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-tx tracking-tightest mb-3">
            Privacy & Cookie Policy
          </h1>
          <p className="text-xs sm:text-sm text-mut">
            Effective Date: January 1, 2025 • Last Updated: Today • Version 2.1
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-tx/85 leading-relaxed">
          {/* Section 1: Overview */}
          <Card variant="default" className="p-6 border-line space-y-3">
            <h2 className="font-heading font-bold text-base sm:text-lg text-tx flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-accent" />
              1. Our Privacy Commitment
            </h2>
            <p className="text-mut">
              At <strong>ipo-premium.com</strong>, we are deeply committed to respecting and protecting the privacy of our visitors. This policy outlines how information is gathered, managed, and safeguarded in accordance with the <em>Digital Personal Data Protection Act, 2023 (DPDP Act)</em> and international best practices.
            </p>
          </Card>

          {/* Section 2: What We Never Collect */}
          <Card variant="default" className="p-6 border-line space-y-3 bg-card2/40">
            <h2 className="font-heading font-bold text-base sm:text-lg text-tx flex items-center gap-2 text-accent">
              <Eye className="w-4 h-4 text-accent" />
              2. Sensitive Financial Data We NEVER Collect
            </h2>
            <p className="text-mut">
              Unlike stock brokers or investment portals, <strong>ipo-premium.com is strictly an educational and data publishing website.</strong> We do not conduct transactions. Under no circumstances do we collect, view, or store:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-mut">
              <li>Permanent Account Number (PAN) details</li>
              <li>Bank account, UPI, credit, or debit card information</li>
              <li>Demat Account numbers, Depository Participant (DP) IDs, or Client IDs</li>
              <li>Broker trading passwords, PINs, or One-Time Passwords (OTPs)</li>
            </ul>
          </Card>

          {/* Section 3: Information We Collect */}
          <Card variant="default" className="p-6 border-line space-y-3">
            <h2 className="font-heading font-bold text-base sm:text-lg text-tx flex items-center gap-2">
              <Server className="w-4 h-4 text-accent" />
              3. Non-Personally Identifiable Information & Telemetry
            </h2>
            <p className="text-mut">
              When you browse our platform, standard non-identifying telemetry data may be recorded automatically by our web servers and Google Tag Manager (GTM):
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-mut">
              <li>
                <strong>Device & Browser Information:</strong> Browser type, operating system version, screen resolution, and preferred language.
              </li>
              <li>
                <strong>Page Usage Telemetry:</strong> Pages visited, duration spent reading IPO reviews, referrers, and timestamps.
              </li>
              <li>
                <strong>IP Address:</strong> Truncated/anonymized IP addresses used solely for geo-regional network routing and DDoS security defenses through Cloudflare.
              </li>
            </ul>
          </Card>

          {/* Section 4: Cookies Policy */}
          <Card variant="default" className="p-6 border-line space-y-3">
            <h2 className="font-heading font-bold text-base sm:text-lg text-tx flex items-center gap-2">
              <FileText className="w-4 h-4 text-accent" />
              4. Cookies & Local Storage
            </h2>
            <p className="text-mut">
              We maintain a minimal cookie footprint. Our application utilizes:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-mut">
              <li>
                <strong>Essential Local Storage:</strong> To store your preferred user interface configuration (such as Theme preferences) so your preferences persist between visits without flashing.
              </li>
              <li>
                <strong>Performance & Security Cookies:</strong> Deployed via Cloudflare to mitigate automated bot scraping, manage server caching, and ensure 99.9% uptime.
              </li>
            </ul>
            <p className="text-mut pt-1">
              You can disable cookies at any time through your browser settings without affecting your ability to view live GMP numbers and subscription data.
            </p>
          </Card>

          {/* Section 5: Third-Party External Links */}
          <Card variant="default" className="p-6 border-line space-y-3">
            <h2 className="font-heading font-bold text-base sm:text-lg text-tx">
              5. Outbound Links to Registrars & Exchanges
            </h2>
            <p className="text-mut">
              Our website provides external hyperlinks to official IPO registrars (e.g., Link Intime, KFintech, Bigshare Services) and exchange portals (BSE India, NSE India, SEBI). Please note that once you navigate to an external registrar to check allotment status, you are subject to their respective privacy terms. We encourage you to review their terms before entering any application numbers.
            </p>
          </Card>

          {/* Section 6: Grievance Officer & Contact */}
          <Card variant="default" className="p-6 border-line space-y-3 bg-card2/60">
            <h2 className="font-heading font-bold text-base sm:text-lg text-tx flex items-center gap-2">
              <Mail className="w-4 h-4 text-accent" />
              6. Data Grievance Redressal & Inquiries
            </h2>
            <p className="text-mut">
              In accordance with the <em>Information Technology Act, 2000</em> and DPDP guidelines, if you have questions regarding this Privacy Policy, wish to exercise your rights of data access or erasure, please contact our designated grievance desk:
            </p>
            <div className="p-4 rounded-xl bg-card border border-line text-xs font-mono space-y-1 mt-2">
              <div className="text-tx font-bold">Privacy & Grievance Desk:</div>
              <div>ipo-premium Digital Media Operations</div>
              <div className="text-accent font-semibold">
                Official Email:{" "}
                <a href="mailto:support@ipo-premium.com" className="underline">
                  support@ipo-premium.com
                </a>
              </div>
              <div className="text-mut">Response Turnaround: Within 48 business hours</div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
