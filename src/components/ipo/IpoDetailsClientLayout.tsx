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
import { Faq } from "@/components/ui/Faq";
import {
  FileText,
  TrendingUp,
  BarChart3,
  Users,
  FolderDown,
  MessageSquareQuote,
  Sparkles,
  Building2,
} from "lucide-react";
import Link from "next/link";

interface IpoDetailsClientLayoutProps {
  ipo: Ipo;
  raw: any;
  faqItems: { question: string; answer: string }[];
  gmpData?: any;
  subData?: any;
  reviewData?: any;
}

export function IpoDetailsClientLayout({
  ipo,
  raw,
  faqItems,
  gmpData,
  subData,
  reviewData,
}: IpoDetailsClientLayoutProps) {
  const [activeTab, setActiveTab] = useState<NavTabId>("overview");
  const isClickScrollingRef = React.useRef(false);
  const clickTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const percent = gmpPercent(ipo);
  const estListing = estimatedListingPrice(ipo);

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
    { id: "gmp" as const, label: "GMP Trend", icon: TrendingUp, badge: "Live", show: true },
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
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex items-center gap-2 text-xs text-mut">
          <li>
            <Link href="/" className="hover:text-accent transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/#all-ipos" className="hover:text-accent transition-colors">
              IPOs
            </Link>
          </li>
          <li>/</li>
          <li className="text-tx font-medium truncate max-w-[200px] sm:max-w-none">
            {ipo.name} ({ipo.board})
          </li>
        </ol>
      </nav>

      {/* Top Header Card with Integrated Milestone Timeline */}
      <div className="rounded-2xl bg-card border border-line shadow-sm mb-7 overflow-hidden">
        {/* Top Header Card */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 p-4 sm:p-5">
          {/* Left: Logo & Company Name + Badges */}
          <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
            <IpoLogo src={raw.ipo_image} name={ipo.name} />

            <div className="min-w-0 flex-1">
              <h1 className="font-heading font-bold text-lg sm:text-xl md:text-2xl text-tx tracking-tight leading-snug mb-1.5 truncate">
                {ipo.name} IPO Details
              </h1>

              <div className="flex items-center gap-2.5 flex-wrap">
                <IpoBadgeHeader ipo={ipo} />
                {ipo.sector && (
                  <span className="text-xs text-mut font-medium inline-flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-accent" />
                    {ipo.sector}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right: Compact Live GMP Tracker Widget */}
          <div className="flex items-center gap-4 sm:gap-6 p-3 sm:p-3.5 rounded-xl bg-card2/70 border border-line self-start lg:self-auto shrink-0 shadow-inner">
            <div className="flex flex-col justify-center min-w-[130px]">
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <span className="text-xs font-bold uppercase tracking-wider text-mut flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                  GMP Today
                </span>
                <span className="text-xs font-mono text-accent bg-accent/15 px-2 py-0.5 rounded font-semibold">
                  Live
                </span>
              </div>

              <div className="flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-heading font-extrabold text-up tabular-nums leading-tight">
                  {formatINR(ipo.gmp)}
                </span>
                <span className="text-xs font-bold text-up tabular-nums">
                  ({formatPercent(percent)})
                </span>
              </div>

              <div className="text-xs text-mut mt-0.5">
                Est. Listing:{" "}
                <strong className="text-accent font-mono font-semibold">
                  {formatINR(estListing)}
                </strong>
              </div>
            </div>

            <div className="hidden sm:block pl-2 border-l border-line/60">
              <span className="text-xs font-medium text-mut block mb-0.5">7-Day Trend</span>
              <GmpSparkline data={ipo.gmpHistory} width={130} height={34} />
            </div>
          </div>
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
            companyName={ipo.name}
            activeTab={activeTab}
            gmpData={gmpData}
            subData={subData}
            reviewData={reviewData}
          />

          {/* FAQ Accordion */}
          <Card variant="default" className="p-6 border-line">
            <Faq items={faqItems} title={`${ipo.name} IPO Review & FAQ`} />
          </Card>
        </div>

        {/* ========================================================
            RIGHT COLUMN (STICKY: Timeline -> Navigation -> Issue Key Info)
            ======================================================== */}
        <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-20">
          {/* 1. TOP OF SIDEBAR: Compact Milestone Timeline Card (Exact user requirement) */}
          <div className="hidden lg:block">
            <KeyDatesTimeline dates={ipo.dates} />
          </div>

          {/* 2. Quick Navigation Menu (Auto Changes as user scrolls) */}
          <div className="hidden lg:block rounded-card bg-card border border-line p-3 shadow-sm">
            <div className="px-3 py-2 text-xs font-bold text-mut uppercase tracking-wider border-b border-line/60 mb-2 flex items-center justify-between">
              <span>Quick Navigation</span>
              <span className="text-xs text-accent font-semibold">Auto-Synced</span>
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
                    className={`flex items-center justify-between gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all text-left focus-visible:outline-none ${
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
                        className={`px-2 py-0.5 rounded text-xs font-mono ${
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
