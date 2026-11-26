import Link from "next/link";
import { Ipo } from "@/lib/types";
import { TrendingUp, Building2, Search, ArrowRight } from "lucide-react";

interface TrendingKeywordsDirectoryProps {
  ipos?: Ipo[];
}

export function TrendingKeywordsDirectory({ ipos = [] }: TrendingKeywordsDirectoryProps) {
  // Live, Upcoming and Listed Category Links strictly synced with site terminology
  const categoryLinks = [
    { label: "Live IPOs (Mainboard & SME)", href: "/ipo/live" },
    { label: "Upcoming IPOs Calendar", href: "/ipo/upcoming" },
    { label: "Listed IPOs & Historical Gains", href: "/ipo/listed" },
    { label: "Live IPO Market Tracker", href: "/ipo-gmp" },
    { label: "Live IPO Subscription Status", href: "/subscription" },
    { label: "Closing Today IPO Alerts", href: "/ipo/live?status=Close+Today" },
  ];

  const registrarLinks = [
    { label: "Link Intime Allotment Status", href: "/allotment/link-intime" },
    { label: "KFintech IPO Status (Servers 1-5)", href: "/allotment/kfintech" },
    { label: "Bigshare Services SME Allotment", href: "/allotment/bigshare" },
    { label: "BSE India Application Check", href: "/allotment/bse-india" },
    { label: "Skyline Financial Allotment", href: "/allotment/skyline" },
    { label: "Check Allotment by PAN Online", href: "/allotment" },
  ];

  const guideLinks = [
    { label: "Understanding IPO Price Bands", href: "/articles/what-is-ipo-gmp-grey-market-premium" },
    { label: "How to Check Allotment Fast", href: "/articles/how-to-check-ipo-allotment-status-fast" },
    { label: "Pre-Listing Valuation Metrics", href: "/articles/kostak-rate-vs-subject-to-sauda-differences" },
    { label: "BSE SME vs NSE Emerge Lot Rules", href: "/articles/bse-sme-vs-nse-emerge-lot-size-rules" },
    { label: "QIB NII Retail Subscription Meaning", href: "/articles/understanding-qib-nii-retail-subscription-data" },
    { label: "IPO Lot Size & Profit Calculator", href: "/tools/lot-calculator" },
  ];

  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="bg-card border border-line rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs space-y-6">
        
        {/* Header */}
        <div className="border-b border-line pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-tx tracking-tight">
              Popular IPO Searches &amp; Quick Directory
            </h3>
            <p className="text-xs sm:text-sm text-mut mt-0.5">
              Direct access to Live IPOs, Upcoming IPOs, Listed IPOs, registrars, and return calculators.
            </p>
          </div>
          <span className="text-xs font-semibold text-accent flex items-center gap-1 shrink-0">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Live Search Directory
          </span>
        </div>

        {/* 3-Column Keyword Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          
          {/* Column 1: Live, Upcoming & Listed Categories */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-tx font-heading font-bold text-sm border-b border-line/60 pb-2">
              <div className="w-6 h-6 rounded-md bg-accent/10 flex items-center justify-center text-accent shrink-0">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
              <span>Live, Upcoming &amp; Listed IPOs</span>
            </div>
            <ul className="space-y-2">
              {categoryLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group flex items-center justify-between text-xs text-mut hover:text-accent font-medium transition-colors py-1"
                  >
                    <span className="truncate pr-2 group-hover:underline">{item.label}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-accent shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Registrars */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-tx font-heading font-bold text-sm border-b border-line/60 pb-2">
              <div className="w-6 h-6 rounded-md bg-accent/10 flex items-center justify-center text-accent shrink-0">
                <Building2 className="w-3.5 h-3.5" />
              </div>
              <span>Official Registrar Checkers</span>
            </div>
            <ul className="space-y-2">
              {registrarLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group flex items-center justify-between text-xs text-mut hover:text-accent font-medium transition-colors py-1"
                  >
                    <span className="truncate pr-2 group-hover:underline">{item.label}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-accent shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Guides & Tools */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-tx font-heading font-bold text-sm border-b border-line/60 pb-2">
              <div className="w-6 h-6 rounded-md bg-accent/10 flex items-center justify-center text-accent shrink-0">
                <Search className="w-3.5 h-3.5" />
              </div>
              <span>IPO Guides &amp; Financial Tools</span>
            </div>
            <ul className="space-y-2">
              {guideLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group flex items-center justify-between text-xs text-mut hover:text-accent font-medium transition-colors py-1"
                  >
                    <span className="truncate pr-2 group-hover:underline">{item.label}</span>
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-accent shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}
