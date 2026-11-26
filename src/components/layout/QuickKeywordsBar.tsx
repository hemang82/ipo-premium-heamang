"use client";

import Link from "next/link";
import {
  Sparkles,
  TrendingUp,
  Flame,
  CheckCircle2,
  Calendar,
  Building2,
  Landmark,
  Scale,
  Calculator,
  Layers,
  BookOpen,
  HelpCircle,
} from "lucide-react";

interface QuickLinkItem {
  label: string;
  href: string;
  icon: any;
  variant?: "accent" | "green" | "default";
  badge?: string;
}

const QUICK_SEO_LINKS: QuickLinkItem[] = [
  {
    label: "What is IPO?",
    href: "/articles/what-is-ipo-gmp-grey-market-premium",
    icon: BookOpen,
    variant: "default",
  },
  {
    label: "IPO Allotment Status",
    href: "/allotment",
    icon: Sparkles,
    variant: "accent",
    badge: "Live",
  },
  {
    label: "Live IPO Tracker",
    href: "/ipo-gmp",
    icon: Flame,
    variant: "accent",
  },
  {
    label: "Link Intime Allotment",
    href: "/allotment/link-intime",
    icon: Building2,
    variant: "default",
  },
  {
    label: "KFintech Allotment",
    href: "/allotment/kfintech",
    icon: Landmark,
    variant: "default",
  },
  {
    label: "Live Open IPOs",
    href: "/ipo/live",
    icon: TrendingUp,
    variant: "green",
  },
  {
    label: "Upcoming IPOs",
    href: "/ipo/upcoming",
    icon: Calendar,
    variant: "default",
  },
  {
    label: "Bigshare Allotment",
    href: "/allotment/bigshare",
    icon: Building2,
    variant: "default",
  },
  {
    label: "BSE India Allotment",
    href: "/allotment/bse-india",
    icon: Landmark,
    variant: "default",
  },
  {
    label: "IPO Lot Calculator",
    href: "/tools/lot-calculator",
    icon: Calculator,
    variant: "default",
  },
  {
    label: "BSE SME vs NSE Emerge",
    href: "/articles/bse-sme-vs-nse-emerge-lot-size-rules",
    icon: Layers,
    variant: "default",
  },
  {
    label: "Recently Listed IPOs",
    href: "/ipo/listed",
    icon: CheckCircle2,
    variant: "default",
  },
  {
    label: "IPO FAQs",
    href: "/faq",
    icon: HelpCircle,
    variant: "default",
  },
];

export function QuickKeywordsBar() {
  // Duplicate array 2 times so it creates an absolute, unbreakable 100% infinite seamless track
  const marqueeItems = [...QUICK_SEO_LINKS, ...QUICK_SEO_LINKS];

  return (
    <div className="w-full bg-card border-b border-line shadow-2xs overflow-hidden">
      <div className="w-full px-3 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center gap-3 overflow-hidden">
          
          {/* Fixed Lead Label */}
          <span className="shrink-0 z-10 text-[11px] font-bold uppercase tracking-wider text-mut hidden md:inline-flex items-center gap-1.5 pl-1 pr-3 select-none border-r border-line/60 bg-card">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Trending
          </span>

          {/* Pure CSS Hardware-Accelerated 100% True Infinite Loop */}
          <div className="overflow-hidden w-full relative">
            <div className="animate-marquee flex items-center gap-2.5 py-0.5 select-none will-change-transform">
              {marqueeItems.map((item, idx) => {
                const Icon = item.icon;

                let style =
                  "bg-card2/80 text-tx hover:text-accent hover:border-accent/50 hover:bg-card border-line";

                if (item.variant === "accent") {
                  style =
                    "bg-accent/10 text-accent border-accent/30 hover:bg-accent hover:text-white";
                } else if (item.variant === "green") {
                  style =
                    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25 hover:bg-emerald-500/20";
                }

                return (
                  <Link
                    key={`${item.label}-${idx}`}
                    href={item.href}
                    className={`group shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-150 shadow-2xs active:scale-95 whitespace-nowrap ${style}`}
                  >
                    <Icon className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100 transition-opacity shrink-0" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.2 rounded-full text-[9px] font-black uppercase bg-accent text-white leading-none shrink-0">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
