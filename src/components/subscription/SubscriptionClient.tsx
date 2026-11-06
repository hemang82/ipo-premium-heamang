"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  RotateCw,
  Clock,
  Sparkles,
  Layers,
  ChevronDown,
  HelpCircle,
  Share2,
  Check,
  Building2,
  TrendingUp,
} from "lucide-react";
import { SubscriptionIpoItem } from "@/lib/subscription-service";
import { SubscriptionCard } from "./SubscriptionCard";
import { subscriptionFaqs } from "@/lib/subscription-faqs";

interface SubscriptionClientProps {
  initialMainboard: SubscriptionIpoItem[];
  initialSme: SubscriptionIpoItem[];
  initialUpdatedAt: string;
  initialIsMarketHours: boolean;
}

export function SubscriptionClient({
  initialMainboard,
  initialSme,
  initialUpdatedAt,
  initialIsMarketHours,
}: SubscriptionClientProps) {
  const [mainboardList, setMainboardList] = useState<SubscriptionIpoItem[]>(initialMainboard);
  const [smeList, setSmeList] = useState<SubscriptionIpoItem[]>(initialSme);
  const [updatedAt, setUpdatedAt] = useState<string>(initialUpdatedAt);
  const [isMarketHours, setIsMarketHours] = useState<boolean>(initialIsMarketHours);
  const [isGlobalRefreshing, setIsGlobalRefreshing] = useState(false);
  const [copiedPage, setCopiedPage] = useState(false);

  // Check market hours on client
  const checkMarketHoursClient = () => {
    try {
      const now = new Date();
      const istString = now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
      const istDate = new Date(istString);
      const day = istDate.getDay();
      if (day < 1 || day > 5) return false;
      const totalMinutes = istDate.getHours() * 60 + istDate.getMinutes();
      return totalMinutes >= 600 && totalMinutes <= 1020;
    } catch (e) {
      return true;
    }
  };

  // Silent refresh without full-screen spinners
  const fetchLiveData = useCallback(async (isSilent = true) => {
    if (!isSilent) setIsGlobalRefreshing(true);
    try {
      const res = await fetch("/api/subscription-live");
      if (res.ok) {
        const json = await res.json();
        if (json.mainboard) setMainboardList(json.mainboard);
        if (json.sme) setSmeList(json.sme);
        if (json.updatedAt) setUpdatedAt(json.updatedAt);
      }
    } catch (err) {
      console.error("Silent refresh error:", err);
    } finally {
      if (!isSilent) setIsGlobalRefreshing(false);
    }
  }, []);

  // Refresh single card callback
  const handleRefreshSingle = async (id: number) => {
    await fetchLiveData(true);
  };

  // Market Timing & Background Auto-Polling Rules
  useEffect(() => {
    const active = checkMarketHoursClient();
    setIsMarketHours(active);

    if (!active) {
      // Outside market hours: No auto polling
      return;
    }

    // Auto-polling interval: 30 seconds during active bidding hours
    const interval = setInterval(() => {
      fetchLiveData(true);
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchLiveData]);

  // Global manual refresh
  const handleGlobalRefresh = () => {
    if (!isMarketHours) return;
    fetchLiveData(false);
  };

  // Share Page
  const handleSharePage = async () => {
    const shareData = {
      title: "Live IPO Subscription Status 2026",
      text: "Track live IPO oversubscription rates across QIB, NII & Retail on BSE & NSE in real-time.",
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (e) {}
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedPage(true);
      setTimeout(() => setCopiedPage(false), 2000);
    }
  };

  return (
    <div className="space-y-10">
      {/* =========================================================================
          HEADER SECTION: Breadcrumbs + Title + Market Badge + Toolbar Actions
         ========================================================================= */}
      <div className="bg-card border border-line rounded-3xl p-6 sm:p-8 shadow-sm">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-mut font-medium mb-3">
          <Link href="/" className="hover:text-tx transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-accent font-semibold">Subscription</span>
        </nav>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Market Status Badge */}
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                  isMarketHours
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isMarketHours ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                  }`}
                />
                {isMarketHours ? "Bidding Active (10 AM - 5 PM)" : "Bidding Closed (Reopens 10 AM IST)"}
              </span>

              {/* Timestamp */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-mut bg-card2 border border-line">
                <Clock className="w-3.5 h-3.5" />
                Last updated on: <span className="text-tx font-medium">{updatedAt}</span>
              </span>
            </div>

            <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-tx tracking-tight">
              IPO Subscription Status Live 2026
            </h1>

            <p className="text-sm sm:text-base text-mut leading-relaxed">
              Track live IPO oversubscription figures updated in real-time across <strong>Qualified Institutional Buyers (QIB)</strong>, <strong>Non-Institutional Investors (NII/HNI)</strong>, and <strong>Retail Individual Investors (RII)</strong> on the BSE and NSE stock exchanges.
            </p>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2.5 self-start lg:self-center shrink-0">
            <button
              onClick={handleGlobalRefresh}
              disabled={!isMarketHours || isGlobalRefreshing}
              title={
                isMarketHours
                  ? "Click to refresh live bidding figures"
                  : "Manual refresh is paused outside market hours (10:00 AM - 5:00 PM IST Mon-Fri)"
              }
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                isMarketHours
                  ? "bg-accent text-accent-foreground border-accent hover:bg-accent/90 shadow-xs cursor-pointer"
                  : "bg-card2 text-mut border-line opacity-60 cursor-not-allowed"
              }`}
            >
              <RotateCw className={`w-4 h-4 ${isGlobalRefreshing ? "animate-spin" : ""}`} />
              <span>{isGlobalRefreshing ? "Refreshing..." : "Refresh Live"}</span>
            </button>

            <button
              onClick={handleSharePage}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-card2 border border-line text-tx hover:text-accent hover:border-accent/40 transition-all"
            >
              {copiedPage ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
              <span>{copiedPage ? "Link Copied!" : "Share"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1: Mainboard IPOs Grid
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center justify-between border-b border-line pb-3">
          <div className="flex items-center gap-2.5">
            <Building2 className="w-5 h-5 text-accent" />
            <h2 className="font-heading font-black text-xl sm:text-2xl text-tx">
              Mainboard IPOs Subscription
            </h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-accent/10 text-accent">
              {mainboardList.length} Active
            </span>
          </div>
        </div>

        {mainboardList.length === 0 ? (
          <div className="bg-card border border-line rounded-3xl p-8 text-center text-sm text-mut">
            Currently no Mainboard IPOs are open for active bidding. Check back soon for new issues!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainboardList.map((ipo) => (
              <SubscriptionCard
                key={`mb-${ipo.id}-${ipo.symbol}`}
                ipo={ipo}
                canRefresh={isMarketHours}
                onRefreshSingle={handleRefreshSingle}
              />
            ))}
          </div>
        )}
      </section>

      {/* =========================================================================
          SECTION 2: SME IPOs Grid
         ========================================================================= */}
      <section className="space-y-5">
        <div className="flex items-center justify-between border-b border-line pb-3">
          <div className="flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-accent" />
            <h2 className="font-heading font-black text-xl sm:text-2xl text-tx">
              SME IPOs Subscription (BSE SME &amp; NSE Emerge)
            </h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-accent/10 text-accent">
              {smeList.length} Active
            </span>
          </div>
        </div>

        {smeList.length === 0 ? (
          <div className="bg-card border border-line rounded-3xl p-8 text-center text-sm text-mut">
            No SME IPOs currently open for subscription.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {smeList.map((ipo) => (
              <SubscriptionCard
                key={`sme-${ipo.id}-${ipo.symbol}`}
                ipo={ipo}
                canRefresh={isMarketHours}
                onRefreshSingle={handleRefreshSingle}
              />
            ))}
          </div>
        )}
      </section>

      {/* =========================================================================
          EDUCATIONAL GUIDE & INTERACTIVE FAQ ACCORDION
         ========================================================================= */}
      <section className="space-y-8 pt-4">
        {/* Guide Card */}
        <div className="bg-card border border-line rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-line pb-4">
            <h2 className="font-heading font-black text-xl sm:text-2xl text-tx">
              Understanding IPO Subscription &amp; Allotment Math
            </h2>
            <p className="text-sm text-mut mt-1">
              How institutional QIB, HNI and Retail oversubscriptions impact your allotment probability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm text-tx/85 leading-relaxed">
            <div className="bg-card2/40 p-5 rounded-2xl border border-line space-y-2">
              <span className="text-xs uppercase font-bold text-accent tracking-wider block">
                Category 1
              </span>
              <h3 className="font-heading font-bold text-base text-tx">
                QIB (50% Quota)
              </h3>
              <p className="text-xs sm:text-sm text-mut">
                Qualified Institutional Buyers include Mutual Funds, Foreign Portfolio Investors (FPIs), Banks and Insurance Companies. Allotment is proportionate to bid size.
              </p>
            </div>

            <div className="bg-card2/40 p-5 rounded-2xl border border-line space-y-2">
              <span className="text-xs uppercase font-bold text-accent tracking-wider block">
                Category 2
              </span>
              <h3 className="font-heading font-bold text-base text-tx">
                NII / HNI (15% Quota)
              </h3>
              <p className="text-xs sm:text-sm text-mut">
                Split into <strong>sNII</strong> (₹2 Lakh - ₹10 Lakh bids, 1/3 quota) and <strong>bNII</strong> (&gt; ₹10 Lakh bids, 2/3 quota). Allotment is decided by randomised lottery draw per minimum lot.
              </p>
            </div>

            <div className="bg-card2/40 p-5 rounded-2xl border border-line space-y-2">
              <span className="text-xs uppercase font-bold text-accent tracking-wider block">
                Category 3
              </span>
              <h3 className="font-heading font-bold text-base text-tx">
                Retail (35% Quota)
              </h3>
              <p className="text-xs sm:text-sm text-mut">
                Individual retail bids up to ₹2 Lakh. If oversubscribed, computerized lottery ensures maximum applicants receive at least 1 minimum lot, eliminating multiple-lot advantage.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-card border border-line rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-line pb-4 flex items-center gap-2.5">
            <HelpCircle className="w-6 h-6 text-accent" />
            <div>
              <h2 className="font-heading font-black text-xl sm:text-2xl text-tx">
                Live Subscription FAQ
              </h2>
              <p className="text-sm text-mut mt-0.5">
                Everything you need to know about IPO demand, cutoff bidding, and application lotteries.
              </p>
            </div>
          </div>

          <div className="divide-y divide-line/60">
            {subscriptionFaqs.map((faq, index) => (
              <SubscriptionFaqItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function SubscriptionFaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left gap-4 group focus-visible:outline-none"
      >
        <span className="font-heading font-bold text-sm sm:text-base text-tx group-hover:text-accent transition-colors">
          {question}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-mut shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-accent" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="mt-2.5 text-xs sm:text-sm text-mut leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}
