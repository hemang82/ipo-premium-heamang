import { Metadata } from "next";
import Link from "next/link";
import { getAllIpos } from "@/lib/ipo-service";
import { AllotmentTracker } from "@/components/allotment/AllotmentTracker";
import { SITE_URL, getBreadcrumbSchema, getFaqSchema } from "@/lib/seo";
import {
  ShieldCheck,
  ExternalLink,
  CheckCircle2,
  Building2,
  FileText,
  CreditCard,
  HelpCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Banknote,
  Smartphone,
  Check,
  Sparkles,
} from "lucide-react";

export const revalidate = 120; // Refresh data every 2 minutes

export const metadata: Metadata = {
  title: "Check IPO Allotment Status Online – Live & Upcoming IPOs Allotment Dates",
  description:
    "Check live & upcoming IPO allotment status online with direct links to Link Intime, KFintech, Bigshare, BSE & NSE. View allotment date calendar, PAN verification guide, and refund timeline.",
  alternates: {
    canonical: `${SITE_URL}/allotment`,
  },
  keywords: [
    "IPO Allotment Status",
    "Check IPO Allotment Online",
    "Link Intime IPO Allotment",
    "KFintech IPO Status",
    "Bigshare IPO Allotment",
    "BSE IPO Allotment Check",
    "NSE IPO Allotment Status",
    "IPO Allotment Date 2025",
    "Live IPO Allotment",
    "Upcoming IPO Allotment",
    "IPO Refund Date UPI",
  ],
  openGraph: {
    title: "Check IPO Allotment Status Online – Live & Upcoming IPOs Allotment Dates",
    description:
      "Verify share allocation for all live, upcoming, and recently closed IPOs with direct registrar links (Link Intime, KFintech, Bigshare, BSE, NSE).",
    url: `${SITE_URL}/allotment`,
    type: "website",
    locale: "en_IN",
    siteName: "ipo-premium",
  },
  twitter: {
    card: "summary_large_image",
    title: "Check IPO Allotment Status Online – Live & Upcoming IPOs",
    description:
      "Track live & upcoming IPO allotment dates and verify your share allocation online with direct registrar links.",
  },
};

interface Registrar {
  name: string;
  badge: string;
  tagline: string;
  description: string;
  url: string;
  popularIssues: string;
  highlight?: boolean;
}

const REGISTRARS: Registrar[] = [
  {
    name: "Link Intime India",
    badge: "Most Popular",
    tagline: "Leading Registrar for Mega Mainboard IPOs",
    description:
      "Official registrar for India's largest public issues including Tata Tech, IREDA, Bajaj Housing Finance, and premier mainline companies.",
    url: "https://in.mpms.mufg.com/Initial_Offer/public-issues.html",
    popularIssues: "Mainboard & Anchor",
    highlight: true,
  },
  {
    name: "KFin Technologies",
    badge: "Official Portal",
    tagline: "Tech-Enabled Registrar for Leading IPOs",
    description:
      "Direct portal with server options (Server 1 to 5) for high-traffic allotments like LIC, Swiggy, and premier industrial public offerings.",
    url: "https://kosmic.kfintech.com/ipostatus/",
    popularIssues: "Mainboard & SME",
    highlight: true,
  },
  {
    name: "Bigshare Services",
    badge: "SME Specialist",
    tagline: "Primary Registrar for BSE SME & NSE Emerge",
    description:
      "Specialized in small and medium enterprise public issues with fast search by Application Number, Demat DP ID or PAN.",
    url: "https://ipo.bigshareonline.com/IPO_Status.html",
    popularIssues: "BSE SME & Emerge",
    highlight: false,
  },
  {
    name: "BSE India Official",
    badge: "Stock Exchange",
    tagline: "Direct Bombay Stock Exchange Portal",
    description:
      "Official exchange verification portal. Select 'Equity', pick the company name from dropdown, and enter your PAN or Application Number.",
    url: "https://www.bseindia.com/investors/appli_check.aspx",
    popularIssues: "All BSE Listed IPOs",
    highlight: true,
  },
  {
    name: "NSE India Portal",
    badge: "Exchange Verification",
    tagline: "National Stock Exchange Bid Verification",
    description:
      "Check electronic bidding status and application allotment verification directly through NSE India's registered investor portal.",
    url: "https://www.nseindia.com/invest/check-trades-bids-verify-ipo-bids",
    popularIssues: "All NSE Listed IPOs",
    highlight: false,
  },
  {
    name: "Maashitla Securities",
    badge: "Growing SME RTA",
    tagline: "Registrar for Emerging SME Issues",
    description:
      "Official allotment status checker for emerging SME IPOs and regional companies listed on NSE Emerge and BSE SME platforms.",
    url: "https://maashitla.com/allotment-status/public-issues",
    popularIssues: "SME Issues",
    highlight: false,
  },
  {
    name: "Skyline Financial",
    badge: "Verified RTA",
    tagline: "SEBI Registered SME Registrar & RTA",
    description:
      "Check allotment status and share allocation records for select manufacturing, technology, and service sector SME public offerings.",
    url: "https://www.skylinerta.com/ipo.php",
    popularIssues: "SME IPOs",
    highlight: false,
  },
  {
    name: "Purva Sharegistry",
    badge: "Established RTA",
    tagline: "Category-1 SEBI Registered RTA Portal",
    description:
      "Investor service portal to verify share allocation, Demat transfer, and non-allotment refund status for managed public issues.",
    url: "https://www.purvashare.com/investor-service/ipo-query",
    popularIssues: "SME & Rights Issues",
    highlight: false,
  },
];

const VERIFICATION_METHODS = [
  {
    num: "01",
    title: "PAN Card Number",
    badge: "Fastest & Most Reliable",
    desc: "Simply enter your 10-digit PAN number. This is universally supported across Link Intime, KFintech, Bigshare, and BSE India.",
    tips: "Ensure you enter the PAN of the primary applicant who authorized the UPI ASBA mandate.",
    icon: CreditCard,
  },
  {
    num: "02",
    title: "Application Number / ASBA",
    badge: "Broker Reference",
    desc: "Enter your unique IPO application number or ASBA bid reference found in your broker order history (Zerodha, Groww, AngelOne, Upstox).",
    tips: "Keep your application slip or broker confirmation email handy.",
    icon: FileText,
  },
  {
    num: "03",
    title: "Demat DP Client ID",
    badge: "CDSL / NSDL Direct",
    desc: "Use your 16-digit Demat ID. For CDSL, it is a 16-digit numeric string; for NSDL, it begins with 'IN' followed by 14 digits.",
    tips: "Useful if registrar servers are slow on PAN queries.",
    icon: Building2,
  },
  {
    num: "04",
    title: "Bank Debit SMS & Mandates",
    badge: "Instant Confirmation",
    desc: "Check your bank's transaction alerts. A debit SMS confirms allotment, while an unblocking SMS/notification confirms non-allotment.",
    tips: "Bank debit usually arrives several hours before registrar websites update.",
    icon: Smartphone,
  },
];

const TIMELINE_STEPS = [
  {
    day: "Day T",
    title: "Issue Closes",
    desc: "Retail & HNI bidding concludes at 5:00 PM IST on stock exchange portals.",
    badge: "Bidding Ends",
  },
  {
    day: "Day T+1",
    title: "Basis of Allotment",
    desc: "Registrar reconciles valid bids, conducts computerized lottery, and uploads results.",
    badge: "Allotment Date",
  },
  {
    day: "Day T+2",
    title: "Demat Credit & Refund",
    desc: "Allotted shares credited to Demat accounts; UPI blocked funds released by banks.",
    badge: "Share Transfer",
  },
  {
    day: "Day T+3",
    title: "Exchange Listing",
    desc: "Official trading commences on BSE & NSE at 10:00 AM IST with pre-open from 9:00 AM.",
    badge: "Trading Live",
  },
];

const ALLOTMENT_FAQS = [
  {
    question: "When is IPO allotment usually finalized and made public online?",
    answer:
      "Under SEBI's current T+3 listing framework, IPO allotment is finalized on the business day immediately following the issue close date (T+1). Registrars typically complete bid reconciliation and upload results between 8:00 PM and midnight on the allotment date.",
  },
  {
    question: "How is the basis of allotment determined when an IPO is heavily oversubscribed?",
    answer:
      "For the Retail Individual Investor (RII) category, SEBI mandates that every successful applicant gets at least one minimum lot. If demand exceeds the total available lots, allocation is determined strictly via a computer-randomized lottery algorithm without any human discretion. In HNI/NII categories, allocation follows proportionate distribution.",
  },
  {
    question: "What should I do if my bank funds remain blocked after the allotment date?",
    answer:
      "Most bank UPI mandates are revoked within 24 to 48 hours of allotment finalization. If your mandate is still showing 'Blocked' after Day T+2, you can contact your bank customer support with your UPI Mandate URN, or email the registrar's investor grievances desk with your application details.",
  },
  {
    question: "When are allotted shares credited to my Demat account?",
    answer:
      "Allotted shares are credited directly to your CDSL or NSDL Demat account by the end of Day T+2 (one business day before listing morning). You will receive an SMS and email notification from your depository confirming the credit.",
  },
  {
    question: "Can I submit multiple applications using the same PAN number to increase my chances?",
    answer:
      "No! Multiple applications with the same PAN number under the same category are automatically flagged and rejected by the registrar's verification software. To increase family allocation chances, each adult family member must apply through their own separate Demat account and unique PAN number.",
  },
  {
    question: "Why do registrar websites sometimes show 'Server Busy' or crash on allotment night?",
    answer:
      "When popular mega IPOs announce allotment, millions of retail applicants visit registrar servers at the exact same moment. If a portal slows down, try alternate server mirrors (e.g., KFintech Server 1 to 5) or check directly on the BSE India website which handles high traffic smoothly.",
  },
];

export default async function AllotmentPage() {
  const allIpos = await getAllIpos();

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "IPO Allotment Status", url: `${SITE_URL}/allotment` },
  ]);

  const faqSchema = getFaqSchema(ALLOTMENT_FAQS);

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

          {/* ── 1. Hero Header Section: High-Trust Institutional Design ── */}
          <div className="bg-card border border-line rounded-3xl p-6 sm:p-8 md:p-10 shadow-xs relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

              {/* Left Column: Title, Subtitle, and Trust Counters */}
              <div className="max-w-2xl space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Official Verification Hub
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-mut bg-card2 border border-line">
                    SEBI T+3 Framework
                  </span>
                </div>

                <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-tx tracking-tightest leading-tight">
                  Check IPO Allotment Status Online
                </h1>

                <p className="text-sm sm:text-base text-mut leading-relaxed">
                  Verify your share allocation status across all major registrars (Link Intime, KFintech,
                  Bigshare) and stock exchanges (BSE &amp; NSE). Fast, official, and direct verification
                  using your PAN, Application Number, or Demat DP ID.
                </p>

                {/* Quick Trust Stats Bar */}
                <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-line/60 text-xs">
                  <div>
                    <span className="font-heading font-black text-accent text-base block font-mono">8+ RTAs</span>
                    <span className="text-mut text-[11px]">Direct Portals</span>
                  </div>
                  <div>
                    <span className="font-heading font-black text-tx text-base block font-mono">Day T+1</span>
                    <span className="text-mut text-[11px]">Allotment Basis</span>
                  </div>
                  <div>
                    <span className="font-heading font-black text-tx text-base block font-mono">Day T+2</span>
                    <span className="text-mut text-[11px]">Demat Credit</span>
                  </div>
                  <div>
                    <span className="font-heading font-black text-emerald-500 text-base block font-mono">100% Free</span>
                    <span className="text-mut text-[11px]">Official Links</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Premium Direct Query Action Card */}
              <div className="lg:w-[320px] bg-card2/70 border border-line rounded-2xl p-5 space-y-3.5 shrink-0 shadow-inner">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-accent uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Instant Query
                  </span>
                  <span className="text-[10px] font-mono text-mut px-1.5 py-0.5 rounded bg-card border border-line">
                    Live
                  </span>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-base text-tx">
                    Allotment Status Checker
                  </h3>
                  <p className="text-xs text-mut mt-1 leading-relaxed">
                    Instantly query your allocation status across recent Mainboard and SME public issues.
                  </p>
                </div>

                <a
                  href="https://ipo-trend.com/ipo-allotment-status"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-accent text-accent-foreground hover:bg-accent/90 transition-all shadow-xs hover:scale-[1.02] active:scale-[0.98]"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Check Allotment
                  <ExternalLink className="w-4 h-4 opacity-80" />
                </a>

                <p className="text-[11px] text-mut/70 text-center">
                  Protected by official SEBI RTA data encryption.
                </p>
              </div>

            </div>
          </div>

          {/* ── 2. Live & Upcoming IPO Allotment Tracker (Paginated + Modern) ── */}
          <section className="space-y-4">
            <div>
              <h2 className="font-heading font-black text-xl sm:text-2xl text-tx tracking-tight flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                Live &amp; Upcoming IPO Allotment Dates
              </h2>
              <p className="text-xs sm:text-sm text-mut mt-0.5">
                Track allotment dates, designated registrars, and direct query links for all active Mainboard and SME public issues.
              </p>
            </div>

            {/* Interactive Allotment Tracker with Pagination & Dual View */}
            <AllotmentTracker ipos={allIpos} />
          </section>

          {/* ── 3. Official Registrar Portals: Synchronized 4-Column Grid ── */}
          <section className="space-y-4">
            <div>
              <h2 className="font-heading font-black text-xl sm:text-2xl text-tx tracking-tight">
                Official Registrar &amp; Stock Exchange Portals
              </h2>
              <p className="text-xs sm:text-sm text-mut mt-0.5">
                Click on the designated registrar below to open their official verified allotment query portal directly.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {REGISTRARS.map((reg) => (
                <div
                  key={reg.name}
                  className={`h-full flex flex-col justify-between rounded-3xl bg-card border p-5 shadow-xs hover:shadow-md hover:border-accent/60 transition-all ${
                    reg.highlight ? "border-accent/40" : "border-line"
                  }`}
                >
                  <div className="space-y-2.5">
                    {/* Header: Title + Synced Solid Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-heading font-bold text-sm sm:text-base text-tx truncate">
                        {reg.name}
                      </h3>
                      <span className="inline-flex items-center justify-center h-[21px] px-2.5 rounded-md text-[11px] font-semibold bg-accent text-accent-foreground shadow-xs leading-none whitespace-nowrap shrink-0 text-center">
                        {reg.badge}
                      </span>
                    </div>

                    {/* Tagline & Description with Uniform Heights */}
                    <p className="text-xs font-semibold text-tx/85 truncate">{reg.tagline}</p>
                    <p className="text-xs text-mut leading-relaxed line-clamp-3 min-h-[50px]">
                      {reg.description}
                    </p>
                  </div>

                  {/* Footer Row: Baseline Aligned */}
                  <div className="mt-4 pt-3.5 border-t border-line/60 flex items-center justify-between gap-2 shrink-0">
                    <span className="text-[11px] text-mut font-medium truncate max-w-[120px]">
                      {reg.popularIssues}
                    </span>
                    <a
                      href={reg.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-all shrink-0 shadow-xs active:scale-95"
                    >
                      Open Portal
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 4. 4 Easy Ways to Verify Allotment (Enhanced Cards) ── */}
          <section className="bg-card border border-line rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
            <div>
              <h2 className="font-heading font-extrabold text-lg sm:text-xl text-tx tracking-tight flex items-center gap-2">
                <FileText className="w-5 h-5 text-accent" />
                4 Easy Ways to Verify Your Share Allotment
              </h2>
              <p className="text-xs sm:text-sm text-mut mt-1">
                You can verify whether shares have been allocated to you through multiple official channels:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {VERIFICATION_METHODS.map((m) => {
                const Icon = m.icon;
                return (
                  <div
                    key={m.num}
                    className="p-5 rounded-2xl bg-card2/50 border border-line space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-xs text-accent px-2 py-0.5 rounded-md bg-accent/10 border border-accent/20">
                          {m.num}
                        </span>
                        <Icon className="w-4 h-4 text-mut" />
                      </div>

                      <h3 className="font-heading font-bold text-sm sm:text-base text-tx">
                        {m.title}
                      </h3>

                      <p className="text-xs text-mut leading-relaxed">{m.desc}</p>
                    </div>

                    <div className="pt-2 border-t border-line/40 text-[11px] text-tx/80 font-medium">
                      💡 {m.tips}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── 5. Standard SEBI T+3 IPO Timeline Explained (Connected Stepper) ── */}
          <section className="bg-card border border-line rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
            <div>
              <h2 className="font-heading font-extrabold text-lg sm:text-xl text-tx tracking-tight flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                Standard SEBI T+3 IPO Timeline Explained
              </h2>
              <p className="text-xs text-mut mt-1">
                India follows a strict 3-working-day timeline from issue close to stock exchange listing.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {TIMELINE_STEPS.map((step, idx) => (
                <div
                  key={step.day}
                  className="p-5 rounded-2xl bg-card2/60 border border-line space-y-2.5 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-black text-sm text-accent">
                      {step.day}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-card border border-line text-mut">
                      {step.badge}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-base text-tx">
                    {step.title}
                  </h3>

                  <p className="text-xs text-mut leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── 6. Comprehensive Educational Content: Rules & Guidelines ── */}
          <section className="bg-card border border-line rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h2 className="font-heading font-extrabold text-xl text-tx tracking-tight">
                Essential Rules &amp; Guidelines for IPO Allotment
              </h2>
              <p className="text-xs text-mut mt-1">
                Understanding retail lottery algorithms, HNI quota distribution, and common application rejections.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-mut leading-relaxed">
              <div className="p-5 rounded-2xl bg-card2/40 border border-line space-y-2.5">
                <div className="flex items-center gap-2 text-tx font-heading font-bold text-sm">
                  <Banknote className="w-4 h-4 text-accent" />
                  Retail Allocation Rules
                </div>
                <p>
                  In the Retail Individual Investor (RII) category (bids up to ₹2,00,000), allocation is
                  governed strictly by the SEBI minimum lot rule. If the issue is oversubscribed, no applicant
                  gets more than 1 lot, and winners are selected strictly via a computer-randomized lottery algorithm.
                </p>
                <div className="pt-2 border-t border-line/40 text-[11px] font-semibold text-accent">
                  ✓ Every applicant has an equal probability in the lottery.
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-card2/40 border border-line space-y-2.5">
                <div className="flex items-center gap-2 text-tx font-heading font-bold text-sm">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  HNI / NII Allocation Rules
                </div>
                <p>
                  Non-Institutional Investors (NII) are bifurcated into Small HNI (sHNI: ₹2 Lakh to ₹10 Lakh)
                  and Big HNI (bHNI: above ₹10 Lakh). When oversubscribed, each category follows its own
                  draw mechanism where minimum lot is allocated first, followed by proportionate allocation.
                </p>
                <div className="pt-2 border-t border-line/40 text-[11px] font-semibold text-accent">
                  ✓ High subscription = higher application amount required for 1 lot.
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-card2/40 border border-line space-y-2.5">
                <div className="flex items-center gap-2 text-tx font-heading font-bold text-sm">
                  <AlertCircle className="w-4 h-4 text-accent" />
                  Why Was My Application Rejected?
                </div>
                <p>
                  Common rejection reasons include: multiple bids under the same PAN, mismatched Demat account
                  name vs bank account name (third-party UPI payments), submitting UPI mandate authorization
                  after 5:00 PM cutoff, or bidding below the cutoff price.
                </p>
                <div className="pt-2 border-t border-line/40 text-[11px] font-semibold text-red-500">
                  ✗ Never apply with the same PAN from different brokers!
                </div>
              </div>
            </div>
          </section>

          {/* ── 7. Frequently Asked Questions (FAQs) ── */}
          <section className="bg-card border border-line rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <div>
              <h2 className="font-heading font-extrabold text-lg sm:text-xl text-tx tracking-tight flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-accent" />
                Frequently Asked Questions (FAQs)
              </h2>
              <p className="text-xs text-mut mt-1">
                Everything you need to know about IPO allotment, UPI mandate unblocking, and Demat credit.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ALLOTMENT_FAQS.map((faq, i) => (
                <div key={i} className="p-5 rounded-2xl bg-card2/50 border border-line space-y-2">
                  <h3 className="font-heading font-bold text-sm text-tx">{faq.question}</h3>
                  <p className="text-xs text-mut leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── 8. Bottom Navigation CTA Banner ── */}
          <div className="p-6 sm:p-8 rounded-3xl bg-accent/8 border border-accent/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-heading font-bold text-base sm:text-lg text-tx">
                Want to check live premiums before you apply?
              </p>
              <p className="text-xs text-mut mt-1">
                Track live Grey Market Premium (GMP) and subscription demand updated real-time across BSE &amp; NSE.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/ipo-gmp"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-all shadow-xs"
              >
                View Live GMP
                <TrendingUp className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/tools/lot-calculator"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-card border border-line text-tx hover:border-accent hover:text-accent transition-all"
              >
                Lot Calculator
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
