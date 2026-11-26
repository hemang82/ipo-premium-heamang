"use client";

import React, { useState, useEffect } from "react";
import { Ipo } from "@/lib/types";
import { formatINR, formatPercent, gmpPercent, estimatedListingPrice } from "@/lib/format";
import { Card } from "@/components/ui/Card";
import { IpoLogo } from "@/components/ipo/IpoLogo";
import { IpoBadgeHeader } from "@/components/ui/IpoBadgeHeader";
import { GmpRing } from "@/components/ipo/GmpRing";
import { GmpSparkline } from "@/components/ipo/GmpSparkline";
import { KeyDatesTimeline } from "@/components/ipo/KeyDatesTimeline";
import { QuickFactsPanel } from "@/components/ipo/QuickFactsPanel";
import { IpoDetailsContent, NavTabId } from "@/components/ipo/IpoDetailsContent";
import { SocialShareButtons } from "@/components/ipo/SocialShareButtons";
import { IpoNewsSection } from "@/components/ipo/IpoNewsSection";
import { Faq } from "@/components/ui/Faq";
import { NewsItem } from "@/lib/newsApi";
import {
  FileText,
  TrendingUp,
  BarChart3,
  Users,
  FolderDown,
  MessageSquareQuote,
  Sparkles,
  Building2,
  ArrowRight,
  FileCheck2,
  Calculator,
} from "lucide-react";
import Link from "next/link";

interface IpoDetailsClientLayoutProps {
  ipo: Ipo;
  raw: any;
  faqItems: { question: string; answer: string }[];
  gmpData?: any;
  subData?: any;
  reviewData?: any;
  newsList?: NewsItem[];
}

export function IpoDetailsClientLayout({
  ipo,
  raw,
  faqItems,
  gmpData,
  subData,
  reviewData,
  newsList = [],
}: IpoDetailsClientLayoutProps) {
  const [activeTab, setActiveTab] = useState<NavTabId>("overview");
  const isClickScrollingRef = React.useRef(false);
  const clickTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const percent = gmpPercent(ipo);
  const estListing = estimatedListingPrice(ipo);

  // Clean company name by removing legal suffixes for cleaner UI display
  const displayCompanyName = ipo.name
    .replace(/\s+Limited\b/gi, "")
    .replace(/\s+Ltd\.?\b/gi, "")
    .replace(/\s*\(India\)\s*/gi, "")
    .trim();

  // Dynamic GMP rules
  const rawGmp = raw?.gmp ?? (ipo.hasGmp !== false ? ipo.gmp : undefined);
  const rawHeading = (ipo.gmpHeading || raw?.gmp_heading || "").trim();
  const hasGmpVal = rawGmp !== undefined && rawGmp !== null && rawGmp !== "" && rawGmp !== "-";
  const showGmpSection = hasGmpVal || Boolean(rawHeading);

  // Check if Peer Comparison data exists
  const hasPeers =
    (Array.isArray(raw?.peer_comparison) && raw.peer_comparison.length > 0) ||
    (Array.isArray(raw?.peers) && raw.peers.length > 0);

  // Check if Broker Review data exists
  const hasReviews =
    (Array.isArray(reviewData?.data?.results) && reviewData.data.results.length > 0) ||
    (Array.isArray(reviewData?.results) && reviewData.results.length > 0) ||
    (Array.isArray(reviewData?.data) && reviewData.data.length > 0);

  const allNavTabs = [
    { id: "overview" as const, label: "IPO Details", icon: FileText, badge: "Specs", show: true },
    { id: "gmp" as const, label: rawHeading || "Premium Trend", icon: TrendingUp, badge: "Live", show: showGmpSection },
    { id: "subscription" as const, label: "Subscription", icon: BarChart3, badge: "Demand", show: true },
    { id: "docs" as const, label: "IPO Docs", icon: FolderDown, badge: "PDF", show: true },
    { id: "peers" as const, label: "Peer Comparison", icon: Users, badge: null, show: hasPeers },
    { id: "review" as const, label: "Broker Review", icon: MessageSquareQuote, badge: null, show: hasReviews },
  ];

  const navTabs = allNavTabs.filter((tab) => tab.show);

  // Auto Scroll-Spy Effect: Detect which section is in view while user is scrolling
  useEffect(() => {
    const sectionIds: NavTabId[] = navTabs.map((t) => t.id);

    const handleScroll = () => {
      // If user recently clicked a tab button, pause auto-spy temporarily to prevent flickering/blinking
      if (isClickScrollingRef.current) return;

      const scrollPosition = window.scrollY + 180; // offset for sticky header

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(`section-${id}`);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveTab(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    };
  }, [navTabs]);

  const scrollToSection = (tabId: NavTabId) => {
    // 1. Immediately highlight the clicked tab (Instant UI response, zero blink)
    setActiveTab(tabId);
    isClickScrollingRef.current = true;

    // Clear previous timer if any
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);

    // 2. Smoothly scroll to the target section
    const element = document.getElementById(`section-${tabId}`);
    if (element) {
      const yOffset = -90; // offset below sticky navigation
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }

    // 3. Unlock scroll-spy after smooth scroll animation finishes (~800ms)
    clickTimerRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 850);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5 pb-24 md:pb-16">
      {/* Breadcrumb Navigation - Strictly Synced to site-wide routes */}
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex items-center gap-2 text-xs text-mut flex-wrap">
          <li>
            <Link href="/" className="hover:text-accent transition-colors font-medium">
              Home
            </Link>
          </li>
          <li className="text-line">/</li>
          <li>
            <Link href="/ipo/live" className="hover:text-accent transition-colors font-medium">
              Live IPOs
            </Link>
          </li>
          <li className="text-line">/</li>
          <li>
            <Link href="/ipo/upcoming" className="hover:text-accent transition-colors font-medium">
              Upcoming IPOs
            </Link>
          </li>
          <li className="text-line">/</li>
          <li className="text-tx font-bold truncate max-w-[200px] sm:max-w-none">
            {ipo.name}
          </li>
        </ol>
      </nav>

      {/* Top Header Card: Synced with Homepage Modern Design System */}
      <div className="rounded-3xl bg-card border border-line shadow-xs mb-8 overflow-hidden">
        <div className="p-5 sm:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left: Logo & Company Name + Badges */}
          <div className="flex items-start sm:items-center gap-4 sm:gap-5 min-w-0 flex-1">
            <IpoLogo 
              src={raw.ipo_image} 
              name={ipo.name} 
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl shadow-xs shrink-0" 
            />

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <IpoBadgeHeader ipo={ipo} />
                  {ipo.sector && ipo.sector.toLowerCase() !== "sme" && (
                    <span className="text-xs text-mut font-medium inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-card2 border border-line">
                      <Building2 className="w-3.5 h-3.5 text-accent" />
                      {ipo.sector}
                    </span>
                  )}
                </div>

                {/* 1-Click Native Social Share Button pushed to the far right end */}
                <div className="ml-auto">
                  <SocialShareButtons
                    companyName={displayCompanyName}
                    gmp={ipo.gmp}
                    pct={percent}
                    estListing={estListing}
                  />
                </div>
              </div>

              {/* Main H1 Target: Exact Brand & High-Volume Ranking Keyword */}
              <h1 className="font-heading font-extrabold text-xl sm:text-2xl lg:text-3xl text-tx tracking-tightest leading-tight mb-1.5">
                {displayCompanyName} IPO <span className="text-accent font-black">{rawHeading ? `${rawHeading} & Allotment` : "Allotment & Details"}</span>
              </h1>

              <p className="text-xs sm:text-sm text-mut leading-relaxed line-clamp-1">
                {rawHeading
                  ? `Real-time ${rawHeading}, live QIB/NII/Retail subscription demand, price band & registrar allotment status.`
                  : "Live QIB/NII/Retail subscription demand, price band, financials & registrar allotment status."}
              </p>
            </div>
          </div>

          {/* Right: Modern High-Impact Live GMP Widget (Only shown if GMP exists or gmp_heading exists; otherwise hidden) */}
          {showGmpSection && (
            <div className="flex items-stretch gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl bg-card2/80 border border-line/80 self-stretch sm:self-start lg:self-auto shrink-0 shadow-inner">
              <div className="flex flex-col justify-center min-w-[150px]">
                {rawHeading ? (
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-mut flex items-center gap-1 truncate max-w-[140px]" title={rawHeading}>
                      <Sparkles className="w-3.5 h-3.5 text-accent shrink-0" />
                      {rawHeading}
                    </span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/25 animate-pulse shrink-0">
                      Live
                    </span>
                  </div>
                ) : null}

                {hasGmpVal ? (
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-heading font-black text-up tabular-nums tracking-tight">
                      {formatINR(ipo.gmp)}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-up tabular-nums px-1.5 py-0.5 rounded bg-up/10 border border-up/20">
                      {formatPercent(percent)}
                    </span>
                  </div>
                ) : (
                  <span className="text-sm font-heading font-bold text-mut">-</span>
                )}

                {hasGmpVal && (
                  <div className="text-xs text-mut mt-2 pt-2 border-t border-line/60 flex items-center justify-between gap-2">
                    <span>Est. Listing:</span>
                    <strong className="text-accent font-heading font-bold tabular-nums text-sm">
                      {formatINR(estListing)}
                    </strong>
                  </div>
                )}
              </div>

              {hasGmpVal && (
                <div className="hidden sm:flex flex-col justify-between pl-4 border-l border-line/60 min-w-[130px]">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-mut block mb-1">
                      7-Day Trend
                    </span>
                    <span className="text-[11px] font-medium text-mut">
                      Daily Volatility
                    </span>
                  </div>
                  <div className="pt-2">
                    <GmpSparkline data={ipo.gmpHistory} width={130} height={36} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile-Only Horizontal Scrollable Tab Bar (Sticky on Mobile) */}
      <div className="lg:hidden sticky top-0 z-30 bg-bg/95 backdrop-blur-md mb-6 -mx-4 px-4 overflow-x-auto scrollbar-none flex gap-2 border-b border-line py-2.5">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => scrollToSection(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "bg-card border border-line text-mut hover:text-tx"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 2-Column Desktop Grid: Main Continuous Scroll Content (Left) + Sticky Right Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ========================================================
            LEFT COLUMN (Full Continuous Scroll Details)
            ======================================================== */}
        <div className="lg:col-span-8 space-y-8">
          {/* Main Continuous Sections with Auto-Spy */}
          <IpoDetailsContent
            raw={raw}
            companyName={displayCompanyName}
            activeTab={activeTab}
            gmpData={gmpData}
            subData={subData}
            reviewData={reviewData}
          />

          {/* Company-Specific Breaking News & Updates */}
          {newsList && newsList.length > 0 && (
            <IpoNewsSection news={newsList} companyName={displayCompanyName} />
          )}

          {/* FAQ Accordion: Seamless Open Container Synced with Homepage */}
          <div className="pt-2">
            <Faq 
              items={faqItems} 
              title={`${displayCompanyName} IPO Review & FAQ`} 
              description={`Frequently asked questions about ${displayCompanyName} Grey Market Premium (GMP), minimum lot investment, allotment dates, and listing day expectations.`}
            />
          </div>

          {/* Keyword-Rich Internal Linking Grid: Synced with Homepage Tools Layout */}
          <div className="rounded-3xl bg-card border border-line p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="border-b border-line pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-tx tracking-tight">
                  Related IPO Tools &amp; Next Steps for {displayCompanyName}
                </h2>
                <p className="text-xs sm:text-sm text-mut mt-1">
                  Track live market demand, calculate lot profits, and verify your share allocation basis.
                </p>
              </div>
              <span className="text-xs font-semibold text-accent flex items-center gap-1.5 shrink-0">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Investor Tools
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {/* Tool Card 1: Live GMP Tracker */}
              <Link
                href="/ipo-gmp"
                className="group p-5 rounded-2xl bg-card2/50 border border-line hover:border-accent/50 hover:bg-card2 transition-all flex flex-col justify-between space-y-3 shadow-2xs"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shrink-0">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-accent block">Live Market</span>
                      <h3 className="font-heading font-bold text-base text-tx group-hover:text-accent transition-colors">
                        Live IPO Market
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs text-mut leading-relaxed">
                    Track real-time Grey Market Premium, estimated listing price, and Kostak rate history for {displayCompanyName} and all active IPOs.
                  </p>
                </div>
                <div className="pt-2 border-t border-line/60 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-accent group-hover:underline">
                    Check All GMP Rates <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-[10px] text-mut font-semibold">Real-time</span>
                </div>
              </Link>

              {/* Tool Card 2: Live Subscription Status */}
              <Link
                href="/subscription"
                className="group p-5 rounded-2xl bg-card2/50 border border-line hover:border-accent/50 hover:bg-card2 transition-all flex flex-col justify-between space-y-3 shadow-2xs"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 shrink-0">
                      <BarChart3 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-accent block">Live Bidding</span>
                      <h3 className="font-heading font-bold text-base text-tx group-hover:text-accent transition-colors">
                        IPO Subscription Status
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs text-mut leading-relaxed">
                    Check day-wise bidding figures, QIB institutional demand, and retail oversubscription multiples updated in real-time.
                  </p>
                </div>
                <div className="pt-2 border-t border-line/60 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-accent group-hover:underline">
                    View Subscription Demand <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-[10px] text-mut font-semibold">BSE &amp; NSE</span>
                </div>
              </Link>

              {/* Tool Card 3: Allotment Status */}
              <Link
                href="/allotment"
                className="group p-5 rounded-2xl bg-card2/50 border border-line hover:border-accent/50 hover:bg-card2 transition-all flex flex-col justify-between space-y-3 shadow-2xs"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
                      <FileCheck2 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-accent block">Direct Registrar</span>
                      <h3 className="font-heading font-bold text-base text-tx group-hover:text-accent transition-colors">
                        Check Allotment by PAN
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs text-mut leading-relaxed">
                    Verify allotment for {displayCompanyName} across Link Intime, KFintech, Bigshare, and BSE portals with your PAN card number.
                  </p>
                </div>
                <div className="pt-2 border-t border-line/60 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-accent group-hover:underline">
                    Check Allotment Status <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-[10px] text-mut font-semibold">Server 1-4</span>
                </div>
              </Link>

              {/* Tool Card 4: Lot & Profit Calculator */}
              <Link
                href="/tools/lot-calculator"
                className="group p-5 rounded-2xl bg-card2/50 border border-line hover:border-accent/50 hover:bg-card2 transition-all flex flex-col justify-between space-y-3 shadow-2xs"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                      <Calculator className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-accent block">Investment Math</span>
                      <h3 className="font-heading font-bold text-base text-tx group-hover:text-accent transition-colors">
                        IPO Profit &amp; Lot Calculator
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs text-mut leading-relaxed">
                    Calculate minimum lot investment outlay, sNII/bNII bidding limits, and estimated listing profits based on live market GMP.
                  </p>
                </div>
                <div className="pt-2 border-t border-line/60 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-accent group-hover:underline">
                    Open Calculator <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-[10px] text-mut font-semibold">Free Utility</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* ========================================================
            RIGHT COLUMN (STICKY: Timeline -> Navigation -> Issue Key Info)
            ======================================================== */}
        <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-20">
          {/* 1. TOP OF SIDEBAR: Milestone Timeline Card */}
          <div className="hidden lg:block">
            <KeyDatesTimeline dates={ipo.dates} />
          </div>

          {/* 2. Quick Navigation Menu (Auto Changes as user scrolls) */}
          <div className="hidden lg:block rounded-3xl bg-card border border-line p-4 shadow-xs">
            <div className="px-3 py-2 text-xs font-extrabold text-mut uppercase tracking-wider border-b border-line mb-2 flex items-center justify-between">
              <span>Quick Navigation</span>
              <span className="text-[10px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full border border-accent/20">Auto-Synced</span>
            </div>

            <div className="flex flex-col gap-1.5">
              {navTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => scrollToSection(tab.id)}
                    className={`flex items-center justify-between gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all text-left focus-visible:outline-none ${
                      isActive
                        ? "bg-accent text-accent-foreground shadow-sm font-bold translate-x-1"
                        : "text-mut hover:text-tx hover:bg-card2"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{tab.label}</span>
                    </div>

                    {tab.badge && (
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-heading font-semibold tabular-nums ${
                          isActive
                            ? "bg-black/20 text-accent-foreground font-bold"
                            : "bg-card2 text-mut border border-line"
                        }`}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Issue Key Information & Lot Calculator (100% Dynamic per IPO) */}
          <QuickFactsPanel ipo={ipo} raw={raw} />
        </div>
      </div>
    </div>
  );
}
