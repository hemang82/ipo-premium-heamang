import { Metadata } from "next";
import Link from "next/link";
import { getAllIpos } from "@/lib/ipo-service";
import { AdvancedLotCalculator } from "@/components/calculator/AdvancedLotCalculator";
import { SITE_URL, getBreadcrumbSchema, getFaqSchema } from "@/lib/seo";
import {
  Calculator,
  Building2,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Banknote,
  FileText,
  DollarSign,
  Percent,
} from "lucide-react";

export const revalidate = 180; // ISR 3 minutes

export const metadata: Metadata = {
  title: "IPO Lot Size & Profit Calculator – Retail, sHNI & bHNI Returns",
  description:
    "Free IPO Lot Size & Profit Calculator for Indian stock market IPOs. Calculate required application capital, share quantities, retail cutoff, and estimated listing profits based on live GMP.",
  alternates: {
    canonical: `${SITE_URL}/tools/lot-calculator`,
  },
  keywords: [
    "IPO Lot Size Calculator",
    "IPO Profit Calculator",
    "IPO Listing Gain Calculator",
    "Retail vs HNI Lot Calculator",
    "sHNI bHNI IPO Lots",
    "IPO Application Capital",
    "GMP Gain Calculator 2025",
  ],
  openGraph: {
    title: "IPO Lot Size & Profit Calculator – Retail, sHNI & bHNI Returns",
    description:
      "Calculate required capital, maximum retail lots, and expected listing returns based on current live Grey Market Premium (GMP).",
    url: `${SITE_URL}/tools/lot-calculator`,
    type: "website",
    locale: "en_IN",
    siteName: "ipo-premium",
  },
};

const CALCULATOR_FAQS = [
  {
    question: "How is the minimum IPO lot size calculated for retail investors?",
    answer:
      "SEBI mandates that the minimum investment for a retail investor must be within the range of ₹14,000 to ₹15,000. The lot size is calculated by dividing ₹15,000 by the upper price band and rounding to the nearest standard multiple. For example, if the upper band is ₹600, the lot size will be 25 shares (25 × ₹600 = ₹15,000).",
  },
  {
    question: "What is the maximum number of lots a retail investor can apply for?",
    answer:
      "Under the Retail Individual Investor (RII) category, the maximum total application amount cannot exceed ₹2,00,000. To find the maximum lots, divide ₹2,00,000 by the cost per lot and round down to the nearest whole integer. For example, if 1 lot costs ₹14,800, the retail maximum is 13 lots (13 × ₹14,800 = ₹1,92,400).",
  },
  {
    question: "What is the difference between sHNI and bHNI application lots?",
    answer:
      "Non-Institutional Investors (NII) are categorized into Small HNI (sHNI) and Big HNI (bHNI). The minimum application for sHNI is just above ₹2,00,000 up to ₹10,00,000 (at least 14 lots if 1 lot is ~₹14,500). Big HNI (bHNI) requires an application amount exceeding ₹10,00,000 (usually 67+ lots).",
  },
  {
    question: "Does applying for more lots in the retail category increase allotment probability?",
    answer:
      "No! If an IPO is oversubscribed in the retail category, SEBI mandates a computer-randomized lottery where each unique valid PAN gets an equal chance to win exactly 1 lot. Applying for 1 lot has the exact same probability of winning as applying for 13 lots.",
  },
  {
    question: "How are IPO listing gains taxed in India under Budget 2024?",
    answer:
      "If you sell your allotted IPO shares on listing day or within 12 months, the profit is treated as Short-Term Capital Gains (STCG) and taxed at 20% (Section 111A). If held for more than 12 months, gains above ₹1.25 lakh per financial year are taxed as Long-Term Capital Gains (LTCG) at 12.5% (Section 112A).",
  },
];

export default async function LotCalculatorPage() {
  const ipos = await getAllIpos();

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Tools", url: `${SITE_URL}/tools/lot-calculator` },
    { name: "IPO Lot Calculator", url: `${SITE_URL}/tools/lot-calculator` },
  ]);

  const faqSchema = getFaqSchema(CALCULATOR_FAQS);

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

          {/* ── 1. Hero Header Section ── */}
          <div className="bg-card border border-line rounded-3xl p-6 sm:p-8 md:p-10 shadow-xs relative overflow-hidden">
            <div className="max-w-3xl space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20">
                  <Calculator className="w-3.5 h-3.5" />
                  Financial Decision Tool
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-mut bg-card2 border border-line">
                  Retail, sHNI &amp; bHNI Calculator
                </span>
              </div>

              <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-tx tracking-tightest leading-tight">
                IPO Lot Size &amp; Profit Calculator
              </h1>

              <p className="text-sm sm:text-base text-mut leading-relaxed">
                Calculate required application capital, share quantities, retail cutoff limits, and estimated
                listing returns based on live Grey Market Premium (GMP). Select any active IPO or enter
                custom issue parameters.
              </p>
            </div>
          </div>

          {/* ── 2. Interactive Calculator Component ── */}
          <AdvancedLotCalculator ipos={ipos} />

          {/* ── 3. Formulas & Calculation Methodology ── */}
          <section className="bg-card border border-line rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h2 className="font-heading font-extrabold text-xl text-tx tracking-tight flex items-center gap-2">
                <FileText className="w-5 h-5 text-accent" />
                Mathematical Formulas &amp; Calculation Methodology
              </h2>
              <p className="text-xs text-mut mt-1">
                How our calculator determines required capital, profit expectations, and category ceilings.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-mut leading-relaxed">
              <div className="p-5 rounded-2xl bg-card2/50 border border-line space-y-2.5">
                <div className="flex items-center gap-2 text-tx font-heading font-bold text-sm">
                  <Banknote className="w-4 h-4 text-accent" />
                  Total Application Capital
                </div>
                <div className="p-2.5 rounded-xl bg-card border border-line font-mono text-tx font-bold text-xs">
                  Capital = Lots × Lot Size × Issue Price
                </div>
                <p>
                  Calculates the exact amount blocked in your savings bank account via ASBA UPI. For retail,
                  this must not exceed ₹2,00,000.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card2/50 border border-line space-y-2.5">
                <div className="flex items-center gap-2 text-tx font-heading font-bold text-sm">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  Estimated Listing Gain
                </div>
                <div className="p-2.5 rounded-xl bg-card border border-line font-mono text-tx font-bold text-xs">
                  Gain = (Lots × Lot Size) × Live GMP (₹)
                </div>
                <p>
                  Multiplies total allotted shares by the current unofficial Grey Market Premium quote to project
                  gross listing morning profits.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-card2/50 border border-line space-y-2.5">
                <div className="flex items-center gap-2 text-tx font-heading font-bold text-sm">
                  <Percent className="w-4 h-4 text-accent" />
                  Expected Return on Investment
                </div>
                <div className="p-2.5 rounded-xl bg-card border border-line font-mono text-tx font-bold text-xs">
                  ROI (%) = (GMP ÷ Issue Price) × 100
                </div>
                <p>
                  Measures the percentage return on your invested capital, allowing direct comparison with
                  other active IPOs and market opportunities.
                </p>
              </div>
            </div>
          </section>

          {/* ── 4. Retail vs HNI Category Guide ── */}
          <section className="bg-card border border-line rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
            <div>
              <h2 className="font-heading font-extrabold text-lg sm:text-xl text-tx tracking-tight flex items-center gap-2">
                <Building2 className="w-5 h-5 text-accent" />
                Category Guidelines: Retail vs Small HNI vs Big HNI
              </h2>
              <p className="text-xs text-mut mt-1">
                SEBI categorizes public issue applicants into distinct quotas with different financial thresholds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-5 rounded-2xl bg-card2/60 border border-line space-y-2">
                <span className="font-mono text-accent font-bold text-[11px] uppercase tracking-wider">
                  Category 1: RII
                </span>
                <h3 className="font-heading font-bold text-base text-tx">Retail Individual Investors</h3>
                <p className="text-mut leading-relaxed">
                  Maximum application up to ₹2,00,000. Governed by a computer lottery system in oversubscribed issues.
                  Every winner gets exactly 1 lot.
                </p>
                <div className="pt-2 border-t border-line/40 text-[11px] font-semibold text-tx/90">
                  Best for: Individual retail investors seeking single-lot allocation.
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-card2/60 border border-line space-y-2">
                <span className="font-mono text-accent font-bold text-[11px] uppercase tracking-wider">
                  Category 2: sHNI
                </span>
                <h3 className="font-heading font-bold text-base text-tx">Small HNI (₹2L – ₹10L)</h3>
                <p className="text-mut leading-relaxed">
                  Application amount strictly between ₹2,00,001 and ₹10,00,000. Receives one-third of the total NII quota.
                  Lottery system applies for minimum lot allocation.
                </p>
                <div className="pt-2 border-t border-line/40 text-[11px] font-semibold text-tx/90">
                  Best for: Moderate capital investors seeking higher allocation tiers.
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-card2/60 border border-line space-y-2">
                <span className="font-mono text-accent font-bold text-[11px] uppercase tracking-wider">
                  Category 3: bHNI
                </span>
                <h3 className="font-heading font-bold text-base text-tx">Big HNI (&gt; ₹10L)</h3>
                <p className="text-mut leading-relaxed">
                  Application amount strictly above ₹10,00,000. Receives two-thirds of the total NII quota.
                  Proportionate allotment applies above the base allotment.
                </p>
                <div className="pt-2 border-t border-line/40 text-[11px] font-semibold text-tx/90">
                  Best for: High-net-worth investors and family offices.
                </div>
              </div>
            </div>
          </section>

          {/* ── 5. Frequently Asked Questions (FAQs) ── */}
          <section className="bg-card border border-line rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <div>
              <h2 className="font-heading font-extrabold text-lg sm:text-xl text-tx tracking-tight flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-accent" />
                IPO Calculator &amp; Returns FAQs
              </h2>
              <p className="text-xs text-mut mt-1">
                Frequently asked questions regarding share lot sizes, listing gains, and taxation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CALCULATOR_FAQS.map((faq, i) => (
                <div key={i} className="p-5 rounded-2xl bg-card2/50 border border-line space-y-2">
                  <h3 className="font-heading font-bold text-sm text-tx">{faq.question}</h3>
                  <p className="text-xs text-mut leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── 6. Bottom Navigation CTA Banner ── */}
          <div className="p-6 sm:p-8 rounded-3xl bg-accent/8 border border-accent/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-heading font-bold text-base sm:text-lg text-tx">
                Want to check your IPO share allotment?
              </p>
              <p className="text-xs text-mut mt-1">
                Verify allotment status with direct links to Link Intime, KFintech, Bigshare, BSE &amp; NSE.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/allotment"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-all shadow-xs"
              >
                Check Allotment
                <ShieldCheck className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/faq"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-card border border-line text-tx hover:border-accent hover:text-accent transition-all"
              >
                Read FAQs
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
