"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Ipo } from "@/lib/types";
import { IpoRow } from "./IpoRow";
import { IpoCard } from "./IpoCard";
import { filterAndSortIpos, IpoStats } from "@/lib/ipo-service";
import { LayoutGrid, List, Building2, Store, ArrowRight, ExternalLink, Flame, BarChart2 } from "lucide-react";

interface IpoListProps {
  allIpos: Ipo[];
  currentType?: string;
  currentStatus: string;
  currentSort: string;
  query: string;
  stats?: IpoStats;
}

const STATUS_TABS = [
  { key: "Open", label: "Live IPOs", isSpecial: false },
  { key: "Upcoming", label: "Upcoming IPOs", isSpecial: false },
  { key: "Close Today", label: "Closing Today", isSpecial: true },
  { key: "Listed", label: "Listed IPOs", isSpecial: false },
];

export function IpoList({ allIpos, currentStatus = "Open", currentSort = "default", query = "", stats }: IpoListProps) {
  // Direct local state for 100% instant, guaranteed tab switching
  const [activeTab, setActiveTab] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const sp = new URLSearchParams(window.location.search);
      const urlStatus = sp.get("status");
      if (urlStatus) return urlStatus;
    }
    return currentStatus || "Open";
  });

  const [viewMode, setViewMode] = useState<"list" | "card">("list");

  // Handle Tab Click directly
  const handleTabChange = (key: string) => {
    setActiveTab(key);

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (key === "Open") {
        url.searchParams.delete("status");
      } else {
        url.searchParams.set("status", key);
      }
      url.searchParams.delete("type");
      url.hash = "all-ipos";
      window.history.replaceState(null, "", url.toString());
    }
  };

  // Instant calculation based on activeTab
  const { mainboardIpos, smeIpos, totalCount } = useMemo(() => {
    const list = filterAndSortIpos(allIpos, {
      type: "All",
      status: activeTab,
      sort: currentSort as any,
      query,
    });

    const main = list.filter((i) => i.board === "Mainboard");
    const sme = list.filter((i) => i.board === "BSE SME" || i.board === "NSE Emerge" || i.status === "SME");

    return {
      mainboardIpos: main,
      smeIpos: sme,
      totalCount: list.length,
    };
  }, [allIpos, activeTab, currentSort, query]);

  const statusLabel =
    activeTab.toLowerCase() === "upcoming"
      ? "Upcoming IPOs"
      : activeTab.toLowerCase() === "close today"
      ? "Closing Today IPOs"
      : activeTab.toLowerCase() === "listed"
      ? "Listed IPOs"
      : "Live IPOs";

  // Dedicated page category route
  const targetCategoryRoute =
    activeTab.toLowerCase() === "upcoming"
      ? "/ipo/upcoming"
      : activeTab.toLowerCase() === "listed"
      ? "/ipo/listed"
      : "/ipo/live";

  return (
    <section id="all-ipos" className="mt-5 sm:mt-6 mb-8 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4 mb-5">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-tx tracking-tightest">
              {statusLabel}
            </h2>

            {/* Option C: Integrated Sleek Market Pulse Pills */}
            {stats && (
              <div className="flex items-center gap-1.5 flex-wrap ml-1">
                {/* 1. Top Gain Pill (Only shown if highestGmp has actual positive gain) */}
                {/* {stats.highestGmp?.gmpPercent > 0 && stats.highestGmp?.ipoName !== "N/A" && (
                  <Link
                    href={stats.highestGmp?.slug ? `/ipo/${stats.highestGmp.slug}/${stats.highestGmp.symbol}` : "/ipo-gmp"}
                    prefetch={false}
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/25 text-[11px] font-semibold text-tx transition-colors"
                    title="View Top Performing IPO"
                  >
                    <Flame className="w-3 h-3 text-orange-500 fill-orange-500 shrink-0" />
                    <span className="text-mut hidden sm:inline">Top Gain:</span>
                    <span className="font-bold text-orange-600 dark:text-orange-400">
                      {stats.highestGmp?.ipoName?.replace(/ Limited$/i, " Ltd")}
                    </span>
                    <span className="text-up font-heading font-bold">
                      (+{stats.highestGmp?.gmpPercent}%)
                    </span>
                  </Link>
                )} */}

                {/* 2. Top Demand Pill */}
                {stats.mostSubscribed?.total > 0 && (
                  <Link
                    href={stats.mostSubscribed?.slug ? `/ipo/${stats.mostSubscribed.slug}/${stats.mostSubscribed.symbol}` : "/subscription"}
                    prefetch={false}
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent/10 hover:bg-accent/20 border border-accent/25 text-[11px] font-semibold text-tx transition-colors"
                    title="View Top Demand IPO"
                  >
                    <BarChart2 className="w-3 h-3 text-accent shrink-0" />
                    <span className="text-mut hidden sm:inline">Top Demand:</span>
                    <span className="font-bold text-accent">
                      {stats.mostSubscribed?.total}x
                    </span>
                  </Link>
                )}
              </div>
            )}
          </div>

          <p className="text-xs sm:text-sm text-mut">
            Live subscription demand and price performance for Mainboard &amp; SME public issues.
          </p>
        </div>

        {/* Status Tabs + View Mode Switcher */}
        <div className="w-full lg:w-auto flex items-center justify-between sm:justify-end gap-3 min-w-0">
          
          {/* Direct Guaranteed Status Tabs */}
          <div className="w-full sm:w-auto flex items-center gap-1 p-1 rounded-xl bg-card border border-line shadow-xs overflow-x-auto scrollbar-none">
            {STATUS_TABS.map((tab) => {
              const isSelected = activeTab.toLowerCase() === tab.key.toLowerCase();

              let activeStyle = "bg-accent text-accent-foreground shadow-xs font-bold";
              if (tab.isSpecial) {
                activeStyle = "bg-dn text-white font-bold shadow-xs";
              }

              let defaultStyle = "text-mut hover:text-tx hover:bg-card2 font-medium";
              if (tab.isSpecial && !isSelected) {
                defaultStyle = "text-dn hover:bg-dn/10 font-semibold";
              }

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => handleTabChange(tab.key)}
                  className={`text-center px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm transition-all whitespace-nowrap focus-visible:outline-none cursor-pointer ${
                    isSelected ? activeStyle : defaultStyle
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* View Toggle */}
          <div className="hidden md:flex items-center p-1 rounded-xl bg-card border border-line shadow-xs shrink-0">
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === "list"
                  ? "bg-accent text-accent-foreground shadow-xs"
                  : "text-mut hover:text-tx hover:bg-card2"
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setViewMode("card")}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === "card"
                  ? "bg-accent text-accent-foreground shadow-xs"
                  : "text-mut hover:text-tx hover:bg-card2"
              }`}
              title="Card View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Display */}
      {totalCount > 0 ? (
        <div className="space-y-8">
          {/* Mainboard Section */}
          {mainboardIpos.length > 0 && (
            <div className="space-y-3.5">
              <div className="flex items-center justify-between border-b border-line pb-2.5">
                <Link
                  href={`${targetCategoryRoute}?type=mainboard`}
                  className="group flex items-center gap-2 hover:opacity-90 transition-opacity"
                  title="View all Mainboard IPOs on dedicated page"
                >
                  <div className="w-7 h-7 rounded-lg bg-accent/10 text-accent flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base sm:text-lg text-tx group-hover:text-accent transition-colors flex items-center gap-1.5">
                      <span>Mainboard IPOs</span>
                      <ArrowRight className="w-3.5 h-3.5 text-mut opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </h3>
                    <p className="text-[11px] text-mut">NSE / BSE Main Exchange issues</p>
                  </div>
                </Link>

                <Link
                  href={`${targetCategoryRoute}?type=mainboard`}
                  className="text-xs font-semibold px-2.5 py-1 rounded-full bg-card2 hover:bg-accent hover:text-white border border-line text-tx transition-all flex items-center gap-1 group"
                >
                  <span>{mainboardIpos.length} {mainboardIpos.length === 1 ? "IPO" : "IPOs"}</span>
                  <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                </Link>
              </div>

              {viewMode === "list" ? (
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 md:hidden">
                    {mainboardIpos.map((ipo) => (
                      <IpoCard key={`card-${ipo.slug}`} ipo={ipo} />
                    ))}
                  </div>
                  <div className="hidden md:block space-y-3">
                    {mainboardIpos.map((ipo) => (
                      <IpoRow key={`row-${ipo.slug}`} ipo={ipo} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                  {mainboardIpos.map((ipo) => (
                    <IpoCard key={ipo.slug} ipo={ipo} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SME Section */}
          {smeIpos.length > 0 && (
            <div className="space-y-3.5">
              <div className="flex items-center justify-between border-b border-line pb-2.5">
                <Link
                  href={`${targetCategoryRoute}?type=sme`}
                  className="group flex items-center gap-2 hover:opacity-90 transition-opacity"
                  title="View all SME IPOs on dedicated page"
                >
                  <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                    <Store className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base sm:text-lg text-tx group-hover:text-accent transition-colors flex items-center gap-1.5">
                      <span>SME IPOs</span>
                      <ArrowRight className="w-3.5 h-3.5 text-mut opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </h3>
                    <p className="text-[11px] text-mut">BSE SME &amp; NSE Emerge issues</p>
                  </div>
                </Link>

                <Link
                  href={`${targetCategoryRoute}?type=sme`}
                  className="text-xs font-semibold px-2.5 py-1 rounded-full bg-card2 hover:bg-accent hover:text-white border border-line text-tx transition-all flex items-center gap-1 group"
                >
                  <span>{smeIpos.length} {smeIpos.length === 1 ? "IPO" : "IPOs"}</span>
                  <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                </Link>
              </div>

              {viewMode === "list" ? (
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 md:hidden">
                    {smeIpos.map((ipo) => (
                      <IpoCard key={`card-sme-${ipo.slug}`} ipo={ipo} />
                    ))}
                  </div>
                  <div className="hidden md:block space-y-3">
                    {smeIpos.map((ipo) => (
                      <IpoRow key={`row-sme-${ipo.slug}`} ipo={ipo} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                  {smeIpos.map((ipo) => (
                    <IpoCard key={ipo.slug} ipo={ipo} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* View All Button when Listed tab is active */}
          {activeTab.toLowerCase() === "listed" && (
            <div className="pt-4 flex justify-center">
              <Link
                href="/ipo/listed"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-card border border-line hover:border-accent hover:bg-card2 text-sm font-bold text-tx transition-all shadow-xs"
              >
                <span>View All Listed IPOs &amp; Listing Day Gains</span>
                <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-16 rounded-card bg-card border border-line">
          <p className="text-base font-semibold text-tx">No {statusLabel} found</p>
          <p className="text-sm text-mut mt-1">
            Try adjusting your search query or switching tabs above.
          </p>
        </div>
      )}
    </section>
  );
}
