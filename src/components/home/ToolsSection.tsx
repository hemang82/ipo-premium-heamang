import Link from "next/link";
import { Calculator, Flame, Newspaper, ArrowRight } from "lucide-react";

export function ToolsSection() {
  const tools = [
    {
      title: "IPO Profit & Lot Calculator",
      desc: "Calculate required investment outlay, minimum lot size, bidding limits, and estimated listing gain projections.",
      href: "/tools/lot-calculator",
      cta: "Open Calculator",
      icon: Calculator,
      color: "text-amber-500",
      bg: "bg-amber-500/10 border-amber-500/20",
    },
    {
      title: "Live IPO Market Tracker",
      desc: "Track real-time indicative market indicators, price band ranges, and expected listing projections updated daily.",
      href: "/ipo-gmp",
      cta: "Check Market Rates",
      icon: Flame,
      color: "text-orange-500",
      bg: "bg-orange-500/10 border-orange-500/20",
    },
    {
      title: "IPO News & DRHP Filings",
      desc: "Stay updated with SEBI approval filings, price band announcements, company draft prospectuses, and listing morning alerts.",
      href: "/news",
      cta: "Explore Market News",
      icon: Newspaper,
      color: "text-accent",
      bg: "bg-accent/10 border-accent/20",
    },
  ];

  return (
    <section className="my-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-line pb-3">
        <div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-tx tracking-tightest">
            Essential IPO Tools &amp; Intelligence
          </h2>
          <p className="text-xs sm:text-sm text-mut mt-1">
            Free investor calculators, valuation analytics, and SEBI filing trackers.
          </p>
        </div>
        <span className="text-xs font-semibold text-accent flex items-center gap-1.5 shrink-0">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          100% Free Investor Utilities
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.title}
              className="group rounded-3xl bg-card border border-line p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-accent/40 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className={`w-11 h-11 rounded-2xl ${tool.bg} border flex items-center justify-center ${tool.color} mb-4 group-hover:scale-105 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-base sm:text-lg text-tx group-hover:text-accent transition-colors leading-snug mb-2">
                  {tool.title}
                </h3>
                <p className="text-xs sm:text-sm text-mut leading-relaxed">
                  {tool.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-line/60">
                <Link
                  href={tool.href}
                  className="inline-flex items-center justify-between w-full text-xs font-bold text-tx group-hover:text-accent transition-colors"
                >
                  <span>{tool.cta}</span>
                  <div className="w-7 h-7 rounded-full bg-card2 group-hover:bg-accent group-hover:text-white flex items-center justify-center transition-all">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
