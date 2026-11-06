import { Metadata } from "next";
import { FaqClient } from "@/components/faq/FaqClient";
import { ALL_FAQS } from "@/components/faq/faqData";
import { SITE_URL, getBreadcrumbSchema, getFaqSchema } from "@/lib/seo";
import { HelpCircle, BookOpen, Sparkles, ShieldCheck } from "lucide-react";

// Pure static generation - Zero API calls, instant static serving
export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: "IPO FAQs – Complete Investor Guide on GMP, Allotment, Bidding & Rules",
  description:
    "Comprehensive answers to all your Indian stock market IPO questions: Grey Market Premium (GMP) legality, retail lottery allotment system, UPI mandate refunds, and SEBI regulations.",
  alternates: {
    canonical: `${SITE_URL}/faq`,
  },
  keywords: [
    "IPO FAQs",
    "IPO Questions and Answers",
    "How IPO Allotment Works",
    "What is IPO GMP",
    "IPO UPI Mandate Refund",
    "SEBI IPO Rules 2025",
    "Retail vs HNI Quota",
    "IPO Listing Gain Tax",
  ],
  openGraph: {
    title: "IPO FAQs – Complete Investor Guide on GMP, Allotment & Bidding",
    description:
      "Expert answers to Indian IPO questions: live GMP accuracy, allotment lottery process, ASBA bidding, and tax rules.",
    url: `${SITE_URL}/faq`,
    type: "website",
    locale: "en_IN",
    siteName: "ipo-premium",
  },
};

export default function FaqPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "FAQs", url: `${SITE_URL}/faq` },
  ]);

  const faqSchema = getFaqSchema(
    ALL_FAQS.map((f) => ({
      question: f.question,
      answer: f.answer,
    }))
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-bg py-8 sm:py-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          {/* ── Hero Section ── */}
          <div className="bg-card border border-line rounded-3xl p-6 sm:p-8 md:p-10 shadow-xs relative overflow-hidden">
            <div className="max-w-3xl space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20">
                  <BookOpen className="w-3.5 h-3.5" />
                  Knowledge Hub
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-mut bg-card2 border border-line">
                  SEBI ICDR Compliant
                </span>
              </div>

              <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-tx tracking-tightest leading-tight">
                Frequently Asked Questions (FAQs)
              </h1>

              <p className="text-sm sm:text-base text-mut leading-relaxed">
                Clear, verified, and expert answers to every question about Indian IPOs: Grey Market
                Premium (GMP) dynamics, retail computerized lottery allotment, UPI mandate unblocking,
                and SEBI listing rules.
              </p>
            </div>
          </div>

          {/* ── Interactive FAQ Knowledge Hub Component ── */}
          <FaqClient />

        </div>
      </main>
    </>
  );
}
