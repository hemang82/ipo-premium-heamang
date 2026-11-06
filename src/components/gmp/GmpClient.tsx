"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  LockOpen,
  Lock,
  CheckCircle2,
  Layers,
  LayoutGrid,
  Table as TableIcon,
  Clock,
  Sparkles,
  ArrowUpRight,
  ChevronDown,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { GmpIpoItem } from "@/lib/gmp-service";
import { gmpFaqs } from "@/lib/gmp-faqs";
import { formatINR } from "@/lib/format";
import { IpoLogo } from "@/components/ipo/IpoLogo";

// Format date to "02 NOV"
function formatShortDate(dateStr?: string): string {
  if (!dateStr || dateStr === "-" || dateStr === "TBA") return "-";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) {
      const parts = dateStr.trim().split(" ");
      if (parts.length >= 2) return `${parts[0]} ${parts[1].toUpperCase()}`;
      return dateStr;
    }
    const day = String(d.getDate()).padStart(2, "0");
    const month = d.toLocaleDateString("en-IN", { month: "short" }).toUpperCase();
    return `${day} ${month}`;
  } catch {
    return dateStr;
  }
}

interface GmpClientProps {
  initialItems: GmpIpoItem[];
  updatedAt: string;
}

export function GmpClient({ initialItems, updatedAt }: GmpClientProps) {
  // 1. States
  const [segmentFilter, setSegmentFilter] = useState<"All" | "Mainboard" | "SME">("All");
  const [statusFilter, setStatusFilter] = useState<"All" | "Live" | "Upcoming">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "card">("table");

  // On mobile viewports, automatically default to Card View per task specifications
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setViewMode("card");
    }
  }, []);

  // 2. Counts
  const counts = useMemo(() => {
    const all = initialItems.length;
    const mainboard = initialItems.filter((i) => !i.isSme).length;
    const sme = initialItems.filter((i) => i.isSme).length;
    const live = initialItems.filter((i) => i.categoryType === "live").length;
    const upcoming = initialItems.filter((i) => i.categoryType === "upcoming").length;
    return { all, mainboard, sme, live, upcoming };
  }, [initialItems]);

  // 3. Filtered Items
  const filteredItems = useMemo(() => {
    let list = [...initialItems];

    // Segment Filter
    if (segmentFilter === "Mainboard") {
      list = list.filter((i) => !i.isSme);
    } else if (segmentFilter === "SME") {
      list = list.filter((i) => i.isSme);
    }

    // Status Filter
    if (statusFilter === "Live") {
      list = list.filter((i) => i.categoryType === "live");
    } else if (statusFilter === "Upcoming") {
      list = list.filter((i) => i.categoryType === "upcoming");
    }

    // Search Query (Instant with trim)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.symbol.toLowerCase().includes(q) ||
          i.listingAtGroup.toLowerCase().includes(q)
      );
    }

    return list;
  }, [initialItems, segmentFilter, statusFilter, searchQuery]);

  // Format date helper
  const formatDateRange = (start?: string, end?: string) => {
    if (!start && !end) return "TBA";
    if (start && !end) return start;
    if (!start && end) return `Closes ${end}`;
    return `${start} to ${end}`;
  };

  return (
    <div className="space-y-6">
      {/* =========================================================================
          TOOLBAR: Header + Title + Timestamp Badge + View Switcher
         ========================================================================= */}
      <div className="bg-card border border-line rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Live Rates
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-mut bg-card2 border border-line">
                <Clock className="w-3.5 h-3.5 text-mut" />
                Updated at: <span className="text-tx font-medium">{updatedAt}</span>
              </span>
            </div>

            <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-tx tracking-tight">
              IPO GMP Today – Live Grey Market Premium Rates
            </h1>

            <p className="text-sm sm:text-base text-mut leading-relaxed">
              Track live Grey Market Premium (GMP) updates for all Mainboard &amp; SME IPOs on BSE and NSE. Monitor real-time estimated listing prices, expected listing gains, and bidding trends before applying.
            </p>
          </div>

          {/* View Switcher Toggle */}
          <div className="flex items-center self-start lg:self-center gap-1 bg-card2/80 p-1.5 rounded-xl border border-line shrink-0">
            <button
              onClick={() => setViewMode("table")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                viewMode === "table"
                  ? "bg-card text-tx shadow-xs border border-line"
                  : "text-mut hover:text-tx"
              }`}
            >
              <TableIcon className="w-4 h-4" />
              Table View
            </button>
            <button
              onClick={() => setViewMode("card")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                viewMode === "card"
                  ? "bg-card text-tx shadow-xs border border-line"
                  : "text-mut hover:text-tx"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              Card View
            </button>
          </div>
        </div>

        {/* =========================================================================
            FILTER BAR: Segment Pills + Status Tabs + Search Box
           ========================================================================= */}
        <div className="mt-8 pt-6 border-t border-line/60 flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4">
          {/* Left: Segment & Status Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Segment Pills */}
            <div className="flex items-center gap-1 bg-card2/60 p-1 rounded-xl border border-line">
              <button
                onClick={() => setSegmentFilter("All")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  segmentFilter === "All"
                    ? "bg-accent text-accent-foreground shadow-xs"
                    : "text-mut hover:text-tx"
                }`}
              >
                All IPOs ({counts.all})
              </button>
              <button
                onClick={() => setSegmentFilter("Mainboard")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  segmentFilter === "Mainboard"
                    ? "bg-accent text-accent-foreground shadow-xs"
                    : "text-mut hover:text-tx"
                }`}
              >
                Mainboard ({counts.mainboard})
              </button>
              <button
                onClick={() => setSegmentFilter("SME")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  segmentFilter === "SME"
                    ? "bg-accent text-accent-foreground shadow-xs"
                    : "text-mut hover:text-tx"
                }`}
              >
                SME IPOs ({counts.sme})
              </button>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1 bg-card2/40 p-1 rounded-xl border border-line">
              {(["All", "Live", "Upcoming"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    statusFilter === status
                      ? "bg-card text-tx shadow-xs border border-line"
                      : "text-mut hover:text-tx"
                  }`}
                >
                  {status === "All" ? "All Status" : status === "Live" ? `Live (${counts.live})` : `Upcoming (${counts.upcoming})`}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Instant Search Box */}
          <div className="relative w-full xl:w-80">
            <Search className="w-4 h-4 text-mut absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by IPO or Company name..."
              className="w-full bg-card2/80 border border-line rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-tx placeholder:text-mut/70 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-mut hover:text-tx"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* =========================================================================
          DATA DISPLAY: Table View (Desktop & Responsive) OR Card View
         ========================================================================= */}
      {filteredItems.length === 0 ? (
        <div className="bg-card border border-line rounded-3xl p-12 text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-mut mx-auto opacity-60" />
          <h3 className="font-heading font-bold text-lg text-tx">No IPOs Found</h3>
          <p className="text-sm text-mut max-w-md mx-auto">
            No IPO matches your current filter criteria. Try clearing search keywords or switching filters.
          </p>
          <button
            onClick={() => {
              setSegmentFilter("All");
              setStatusFilter("All");
              setSearchQuery("");
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-all mt-2"
          >
            Reset All Filters
          </button>
        </div>
      ) : viewMode === "table" ? (
        /* TABLE VIEW (Clean Desktop Layout: IPO Company | Price Band | Live GMP | Est. Gain | Est. Listing Price | Listing Date | Allotment) */
        <div className="bg-card border border-line rounded-3xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-line bg-card2/60 text-xs font-semibold text-mut uppercase tracking-wider whitespace-nowrap">
                  <th className="py-3.5 px-5">IPO Company</th>
                  <th className="py-3.5 px-3 text-right">Price Band</th>
                  <th className="py-3.5 px-3 text-right">Live GMP</th>
                  <th className="py-3.5 px-3 text-center">Est. Gain</th>
                  <th className="py-3.5 px-3 text-right">Est. Listing Price</th>
                  <th className="py-3.5 px-3 text-center">Listing Date</th>
                  <th className="py-3.5 px-3 text-center">Allotment</th>
                  <th className="py-3.5 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60 text-sm">
                {filteredItems.map((item) => {
                  const detailUrl = `/ipo/${item.slug}/${item.symbol}`;
                  const isPositive = item.gmp > 0;
                  const isNegative = item.gmp < 0;

                  return (
                    <tr
                      key={`${item.id}-${item.symbol}`}
                      className="hover:bg-card2/40 transition-colors group"
                    >
                      {/* 1. IPO Company with Subtle Badge After Title */}
                      <td className="py-3.5 px-5 whitespace-nowrap">
                        <Link href={detailUrl} className="flex items-center gap-2 group-hover:text-accent transition-colors">
                          <span className="font-heading font-bold text-tx text-sm sm:text-base">
                            {item.name}
                          </span>
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium bg-card2 border border-line text-mut shrink-0">
                            {item.isSme ? `${item.listingAtGroup || "BSE/NSE"} - SME` : "Mainboard"}
                          </span>
                        </Link>
                      </td>

                      {/* 2. Price Band */}
                      <td className="py-3.5 px-3 text-right whitespace-nowrap font-mono text-tx font-bold text-xs sm:text-sm">
                        {item.priceRange}
                      </td>

                      {/* 3. Live GMP */}
                      <td className="py-3.5 px-3 text-right whitespace-nowrap font-mono font-bold text-sm sm:text-base">
                        <span className={isPositive ? "text-up" : isNegative ? "text-dn" : "text-mut"}>
                          {item.gmp === 0 ? "₹0" : formatINR(item.gmp)}
                        </span>
                      </td>

                      {/* 4. Est. Gain */}
                      <td className="py-3.5 px-3 text-center whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold font-mono ${
                            isPositive
                              ? "bg-[#DCFCE7] text-[#16A34A] dark:bg-emerald-950/60 dark:text-emerald-400"
                              : isNegative
                              ? "bg-[#FEE2E2] text-[#DC2626] dark:bg-rose-950/60 dark:text-rose-400"
                              : "bg-[#F1F5F9] text-[#64748B] dark:bg-slate-800/60 dark:text-slate-400"
                          }`}
                        >
                          {isPositive ? (
                            <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                          ) : isNegative ? (
                            <TrendingDown className="w-3.5 h-3.5 shrink-0" />
                          ) : (
                            <Minus className="w-3.5 h-3.5 shrink-0" />
                          )}
                          {item.expectedGainPercent > 0 ? `+${item.expectedGainPercent}%` : `${item.expectedGainPercent}%`}
                        </span>
                      </td>

                      {/* 5. Est. Listing Price */}
                      <td className="py-3.5 px-3 text-right whitespace-nowrap font-mono font-bold text-tx text-sm sm:text-base">
                        {item.estimatedListingPrice > 0 ? formatINR(item.estimatedListingPrice) : "TBA"}
                      </td>

                      {/* 6. Listing Date */}
                      <td className="py-3.5 px-3 text-center whitespace-nowrap font-mono text-xs text-tx font-medium">
                        {item.listingDate || "TBA"}
                      </td>

                      {/* 7. Allotment */}
                      <td className="py-3.5 px-3 text-center whitespace-nowrap font-mono text-xs text-accent font-semibold">
                        {item.allotmentDate || "TBA"}
                      </td>

                      {/* 8. Action: View Details */}
                      <td className="py-3.5 px-5 text-right whitespace-nowrap">
                        <Link
                          href={detailUrl}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-all shadow-xs"
                        >
                          View Details
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* CARD VIEW — Home page IpoCard style */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => {
            const detailUrl = `/ipo/${item.slug}/${item.symbol}`;
            const isPositive = item.gmp > 0;
            const isNegative = item.gmp < 0;
            const firstLetter = item.name.charAt(0).toUpperCase();

            // Badge logic (matches IpoBadgeHeader)
            const group = String(item.listingAtGroup || "").toUpperCase();
            let typeLabel = "Mainboard";
            if (item.isSme) {
              if (group.includes("NSE") && group.includes("BSE")) typeLabel = "NSE, BSE - SME";
              else if (group.includes("NSE")) typeLabel = "NSE - SME";
              else if (group.includes("BSE")) typeLabel = "BSE - SME";
              else typeLabel = "BSE - SME";
            }

            const statusLabel = item.categoryType === "live" ? "Open" : "Upcoming";
            const statusClass = item.categoryType === "live"
              ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30"
              : "bg-accent/10 text-accent border-accent/25";
            const dotClass = item.categoryType === "live" ? "bg-blue-500" : "bg-accent";

            // Timeline stages
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
            const parseDate = (s?: string) => {
              if (!s) return null;
              const d = new Date(s);
              if (isNaN(d.getTime())) return null;
              return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
            };
            const openTime = parseDate(item.startDate);
            const closeTime = parseDate(item.endDate);
            const listingTime = parseDate(item.listingDate);

            let currentStageIndex = 0;
            if (listingTime && today >= listingTime) currentStageIndex = 3;
            else if (closeTime && today > closeTime) currentStageIndex = 2;
            else if (openTime && today >= openTime) currentStageIndex = 1;

            const stages = [
              { label: "UPCOMING", date: formatShortDate(item.startDate), icon: Calendar },
              { label: "OPEN", date: formatShortDate(item.startDate), icon: LockOpen },
              { label: "CLOSE", date: formatShortDate(item.endDate), icon: Lock },
              { label: "LISTED", date: formatShortDate(item.listingDate), icon: CheckCircle2 },
            ];

            // Gain percent display
            const gainDisplay = item.expectedGainPercent > 0
              ? `+${item.expectedGainPercent}%`
              : `${item.expectedGainPercent}%`;

            return (
              <Link
                key={`${item.id}-${item.symbol}`}
                href={detailUrl}
                className="group flex flex-col justify-between rounded-2xl bg-card border border-line p-4 sm:p-4.5 shadow-[0_2px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_36px_rgba(217,90,43,0.14)] hover:border-accent hover:-translate-y-[2px] transition-all duration-200 focus-visible:outline-none"
              >
                <div className="space-y-3">

                  {/* 1. Top Header: Avatar + Company Name + Badges */}
                  <div className="flex items-start gap-3">
                    <IpoLogo
                      src={item.image}
                      name={item.name}
                      className="w-10 h-10 rounded-xl group-hover:border-accent/40 group-hover:scale-105 transition-all shadow-xs"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-heading font-bold text-base text-tx group-hover:text-accent transition-colors truncate tracking-tight mb-1">
                        {item.name}
                      </h3>
                      {/* Badges: Solid Dark Accent & In-Sync Status Badge */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="inline-flex items-center justify-center h-[21px] px-2.5 rounded-md text-[11px] font-semibold bg-accent text-accent-foreground shadow-xs leading-none whitespace-nowrap shrink-0 text-center">
                          {typeLabel}
                        </span>
                        <span className={`inline-flex items-center justify-center h-[21px] px-2.5 rounded-md text-[11px] font-semibold border shadow-xs leading-none whitespace-nowrap shrink-0 text-center ${statusClass}`}>
                          {statusLabel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 2. Spotlight: GMP Today & Est. Listing Price side-by-side */}
                  <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-card2/50 border border-line">
                    {/* Left: GMP Today */}
                    <div>
                      <span className="text-xs font-semibold text-mut uppercase tracking-wider block mb-1">
                        GMP Today
                      </span>
                      <div className="flex items-baseline gap-1.5 font-mono tabular-nums">
                        <span className={`text-xl font-heading font-extrabold leading-none ${
                          isPositive ? "text-up" : isNegative ? "text-dn" : "text-mut"
                        }`}>
                          {item.gmp === 0 ? "₹0" : formatINR(item.gmp)}
                        </span>
                        <span className={`text-xs font-bold leading-none ${
                          isPositive ? "text-up" : isNegative ? "text-dn" : "text-mut"
                        }`}>
                          ({gainDisplay})
                        </span>
                      </div>
                    </div>

                    {/* Right: Est. Listing Price */}
                    <div className="border-l border-line/60 pl-3">
                      <span className="text-xs font-semibold text-mut uppercase tracking-wider block mb-1">
                        Est. Price
                      </span>
                      <div className="flex items-baseline gap-1.5 font-mono tabular-nums">
                        <span className="text-xl font-heading font-extrabold text-accent leading-none">
                          {item.estimatedListingPrice > 0 ? formatINR(item.estimatedListingPrice) : "TBA"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 3. Core Info Rows */}
                  <div className="space-y-1.5 text-xs py-0.5">
                    {/* Issue Price */}
                    <div className="flex items-center justify-between pb-1.5 border-b border-line/40">
                      <span className="text-mut font-medium">Issue Price</span>
                      <span className="font-bold text-tx font-mono text-xs sm:text-sm tabular-nums">{item.priceRange}</span>
                    </div>

                    {/* Lot Size */}
                    <div className="flex items-center justify-between pb-1.5 border-b border-line/40">
                      <span className="text-mut font-medium">Lot Size</span>
                      <span className="font-bold text-tx font-mono text-xs sm:text-sm tabular-nums">
                        {item.bidLot ? `${item.bidLot.toLocaleString("en-IN")} Shares` : "TBA"}
                      </span>
                    </div>

                    {/* Offer Period */}
                    <div className="flex items-center justify-between pb-1.5 border-b border-line/40">
                      <span className="text-mut font-medium">Offer Period</span>
                      <span className="font-bold text-tx font-mono text-xs sm:text-sm tabular-nums">
                        {formatDateRange(item.startDate, item.endDate)}
                      </span>
                    </div>

                    {/* Allotment */}
                    <div className="flex items-center justify-between">
                      <span className="text-mut font-medium">Allotment Date</span>
                      <span className="font-bold text-accent font-mono text-xs sm:text-sm tabular-nums">
                        {formatShortDate(item.allotmentDate) || "TBA"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 4. Bottom Timeline: UPCOMING → OPEN → CLOSE → LISTED */}
                <div className="pt-2 mt-2.5 border-t border-line/60">
                  <div className="grid grid-cols-4 gap-1 text-center">
                    {stages.map((stage, idx) => {
                      const Icon = stage.icon;
                      const isCurrent = idx === currentStageIndex;
                      const isPassed = idx < currentStageIndex;
                      return (
                        <div key={idx} className="flex flex-col items-center justify-center py-0.5">
                          <div className="mb-1 flex items-center justify-center">
                            <Icon
                              className={`w-3.5 h-3.5 ${
                                isCurrent
                                  ? stage.label === "CLOSE" ? "text-red-600" : "text-accent"
                                  : isPassed ? "text-mut/80" : "text-mut/40"
                              }`}
                            />
                          </div>
                          <span className={`text-[12px] uppercase tracking-wider leading-none ${
                            isCurrent
                              ? stage.label === "CLOSE" ? "text-red-600 font-extrabold" : "text-accent font-extrabold"
                              : isPassed ? "text-tx/60 font-medium" : "text-mut/70 font-normal"
                          }`}>
                            {stage.label}
                          </span>
                          <span className={`text-[12px] font-mono mt-0.5 tabular-nums ${
                            isCurrent ? "text-tx font-bold" : isPassed ? "text-tx/60 font-normal" : "text-mut/60 font-normal"
                          }`}>
                            {stage.date}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* =========================================================================
          EDUCATIONAL SEO CONTENT & FAQ ACCORDION (Google Rich Snippets)
         ========================================================================= */}
      <div className="mt-12 space-y-8">
        {/* Educational Guide Card */}
        <div className="bg-card border border-line rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-line pb-4">
            <h2 className="font-heading font-black text-xl sm:text-2xl text-tx">
              Complete Guide to IPO Grey Market Premium (GMP)
            </h2>
            <p className="text-sm text-mut mt-1">
              Essential knowledge for Indian stock market investors evaluating Mainboard &amp; SME IPO premiums.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-tx/85 leading-relaxed">
            <div className="space-y-3 bg-card2/40 p-5 rounded-2xl border border-line">
              <h3 className="font-heading font-bold text-base text-accent flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                What is IPO Grey Market Premium (GMP)?
              </h3>
              <p>
                The <strong>Grey Market Premium (GMP)</strong> is the unofficial cash premium at which shares of an unlisted company are traded in off-market dealer networks prior to the official listing on the <strong>BSE</strong> or <strong>NSE</strong>. It indicates how much extra money buyers are willing to pay over and above the issue price based on institutional demand, anchor investments, and overall market sentiment.
              </p>
            </div>

            <div className="space-y-3 bg-card2/40 p-5 rounded-2xl border border-line">
              <h3 className="font-heading font-bold text-base text-accent flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                How is the Estimated Listing Price Calculated?
              </h3>
              <p>
                The calculation is simple: <strong>Estimated Listing Price = Cutoff Price (Upper Price Band) + Current GMP</strong>. For example, if an IPO has an upper price band of ₹158 and the current GMP is ₹25, the expected listing price is <strong>₹183</strong> (which corresponds to an estimated listing gain of +15.82%).
              </p>
            </div>

            <div className="space-y-3 bg-card2/40 p-5 rounded-2xl border border-line">
              <h3 className="font-heading font-bold text-base text-accent flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Why Do SME IPOs Have Higher GMP Volatility?
              </h3>
              <p>
                SME (Small and Medium Enterprises) IPOs trade in fixed lot sizes (often 1,000+ shares per lot worth ₹1,00,000 to ₹1,40,000) on BSE SME and NSE Emerge. Because the issue sizes are smaller and liquidity is thinner compared to Mainboard offerings, Grey Market dealer quotes can fluctuate wildly due to speculative bidding.
              </p>
            </div>

            <div className="space-y-3 bg-card2/40 p-5 rounded-2xl border border-line">
              <h3 className="font-heading font-bold text-base text-rose-500 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                SEBI Disclaimer on Grey Market Trading
              </h3>
              <p className="text-xs sm:text-sm text-mut">
                <strong>Disclaimer:</strong> Grey Market Premium (GMP) is an unofficial, unregulated market indicator. It has no legal standing with or approval from the Securities and Exchange Board of India (SEBI), BSE, or NSE. Investors must not make application decisions solely based on GMP; always review the company’s Red Herring Prospectus (RHP), valuation multiples, financials, and underlying business model.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive FAQ Accordion */}
        <div className="bg-card border border-line rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-line pb-4 flex items-center gap-2.5">
            <HelpCircle className="w-6 h-6 text-accent" />
            <div>
              <h2 className="font-heading font-black text-xl sm:text-2xl text-tx">
                Frequently Asked Questions (FAQ) on IPO GMP
              </h2>
              <p className="text-sm text-mut mt-0.5">
                Clear answers regarding GMP trading rules, Kostak rates, and allotment formulas.
              </p>
            </div>
          </div>

          <div className="divide-y divide-line/60">
            {gmpFaqs.map((faq, index) => (
              <FaqAccordionItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// FAQ Accordion Component
// -------------------------------------------------------------
function FaqAccordionItem({ question, answer }: { question: string; answer: string }) {
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
