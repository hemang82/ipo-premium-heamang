import { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import {
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

export const revalidate = 10;

export const metadata: Metadata = {
  title: "Contact Us & Support Desk",
  description:
    "Get in touch with ipo-premium.com for data corrections, general inquiries, and investor support. We respond within 24 to 48 business hours.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  keywords: [
    "Contact ipo-premium",
    "IPO Data Correction",
    "Investor Inquiries",
    "IPO Feedback",
  ],
  openGraph: {
    title: "Contact Us & Support Desk",
    description:
      "Get in touch with ipo-premium.com for data corrections, general inquiries, and investor support. We respond within 24 to 48 business hours.",
    url: `${SITE_URL}/contact`,
    type: "website",
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact ipo-premium.com",
    url: `${SITE_URL}/contact`,
    description:
      "Official contact and support desk for ipo-premium.com. Submit data corrections, inquiries, and investor feedback.",
    mainEntity: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
      email: "support@ipo-premium.com",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@ipo-premium.com",
        availableLanguage: ["English", "Hindi", "Gujarati"],
      },
    },
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
            <Mail className="w-3.5 h-3.5" />
            <span>Dedicated Support & Editorial Desk</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-tx tracking-tightest mb-3">
            Contact Our Team
          </h1>
          <p className="text-sm sm:text-base text-mut leading-relaxed">
            Have a question, feedback on our live Grey Market Premium data, or noticed a data discrepancy on an ongoing IPO? We are here to assist you.
          </p>
        </div>

        {/* Primary Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Email Support Card */}
          <Card variant="default" className="p-6 border-line flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-tx mb-1">
                Central Support Desk
              </h3>
              <p className="text-xs text-mut leading-relaxed mb-3">
                For general questions, website feedback, bug reports, and editorial data updates.
              </p>
            </div>
            <a
              href="mailto:support@ipo-premium.com"
              className="text-xs font-mono font-semibold text-accent break-all hover:underline"
            >
              support@ipo-premium.com
            </a>
          </Card>

          {/* Editorial & Corrections */}
          <Card variant="default" className="p-6 border-line flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-up/10 border border-up/20 flex items-center justify-center text-up mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-tx mb-1">
                Data & Corrections
              </h3>
              <p className="text-xs text-mut leading-relaxed mb-3">
                To report DRHP timeline updates, GMP pricing quotes, or registrar assignment notes.
              </p>
            </div>
            <a
              href="mailto:support@ipo-premium.com?subject=Data%20Correction%20Inquiry"
              className="text-xs font-mono font-semibold text-accent break-all hover:underline"
            >
              support@ipo-premium.com
            </a>
          </Card>

          {/* Operating Hours */}
          <Card variant="default" className="p-6 border-line flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-tx mb-1">
                Response Times
              </h3>
              <p className="text-xs text-mut leading-relaxed mb-3">
                Active during Indian Stock Market trading hours (Monday to Friday).
              </p>
            </div>
            <div className="text-xs font-mono text-tx font-medium space-y-0.5">
              <div>9:00 AM – 6:00 PM IST</div>
              <div className="text-[11px] text-mut">Turnaround: 24–48 Business Hours</div>
            </div>
          </Card>
        </div>

        {/* Grievance & Office Details */}
        <div className="space-y-6 mb-12">
          <Card variant="default" className="p-6 sm:p-8 border-line space-y-4">
            <h2 className="font-heading font-bold text-xl text-tx">
              Office & Editorial Operations
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-tx/80 leading-relaxed">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>
                  <strong>Digital Desk Location:</strong> ipo-premium.com Media Operations, Mumbai / Ahmedabad, India.
                </span>
              </p>
              <p className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>
                  <strong>Official Contact Channel:</strong> All communication, inquiries, and legal notices should be directed in writing to{" "}
                  <a
                    href="mailto:support@ipo-premium.com"
                    className="text-accent font-semibold underline"
                  >
                    support@ipo-premium.com
                  </a>
                  .
                </span>
              </p>
            </div>
          </Card>

          {/* Consumer & Fraud Prevention Warning */}
          <div className="p-5 sm:p-6 rounded-2xl bg-card2 border border-line text-xs text-mut leading-relaxed space-y-2">
            <div className="flex items-center gap-2 text-tx font-semibold text-xs sm:text-sm">
              <AlertCircle className="w-4 h-4 text-accent" />
              <span>Consumer Safety & Anti-Fraud Notice</span>
            </div>
            <p>
              <strong>ipo-premium.com never asks for payment, Demat login credentials, bank account numbers, or OTPs.</strong> We do not manage funds, offer guaranteed allotment schemes, or operate private investment schemes. If someone contacts you claiming to represent ipo-premium and requests money, report them immediately to{" "}
              <a href="mailto:support@ipo-premium.com" className="text-accent underline">
                support@ipo-premium.com
              </a>{" "}
              and the Cyber Crime Portal of India.
            </p>
          </div>
        </div>

        {/* Helpful Shortcuts */}
        <div className="text-center pt-6 border-t border-line">
          <p className="text-xs text-mut mb-3">Looking for quick answers to common questions?</p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <Link
              href="/faq"
              className="px-4 py-2 rounded-xl bg-card border border-line hover:border-accent text-tx transition-colors font-medium"
            >
              Browse IPO FAQs
            </Link>
            <Link
              href="/editorial-policy"
              className="px-4 py-2 rounded-xl bg-card border border-line hover:border-accent text-tx transition-colors font-medium"
            >
              Read Editorial Policy
            </Link>
            <Link
              href="/disclaimer"
              className="px-4 py-2 rounded-xl bg-card border border-line hover:border-accent text-tx transition-colors font-medium"
            >
              Review SEBI Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
