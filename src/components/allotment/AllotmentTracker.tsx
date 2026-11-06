"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Ipo } from "@/lib/types";
import { IpoBadgeHeader } from "@/components/ui/IpoBadgeHeader";
import { IpoLogo } from "@/components/ipo/IpoLogo";
import { formatSubscription } from "@/lib/format";
import {
  Search,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  SlidersHorizontal,
  X,
  LayoutGrid,
  List,
  Calendar,
  Building2,
  CheckCircle2,
} from "lucide-react";

interface AllotmentTrackerProps {
  ipos: Ipo[];
}

function getRegistrarPortal(registrarName?: string): { name: string; url: string } {
  const r = (registrarName || "").toLowerCase();
  if (r.includes("link intime") || r.includes("linkintime")) {
    return {
      name: "Link Intime",
      url: "https://in.mpms.mufg.com/Initial_Offer/public-issues.html",
    };
  }
  if (r.includes("kfin") || r.includes("karvy")) {
    return {
      name: "KFintech",
      url: "https://kosmic.kfintech.com/ipostatus/",
    };
  }
  if (r.includes("bigshare")) {
    return {
      name: "Bigshare",
      url: "https://ipo.bigshareonline.com/IPO_Status.html",
    };
  }
  if (r.includes("maashitla")) {
    return {
      name: "Maashitla",
      url: "https://maashitla.com/allotment-status/public-issues",
    };
  }
  if (r.includes("skyline")) {
    return {
      name: "Skyline",
      url: "https://www.skylinerta.com/ipo.php",
    };
  }
  if (r.includes("purva")) {
    return {
      name: "Purva",
      url: "https://www.purvashare.com/investor-service/ipo-query",
    };
  }
  return {
    name: registrarName || "Designated RTA",
    url: "https://ipo-trend.com/ipo-allotment-status",
  };
}

function formatDate(dateStr?: string): string {
  if (!dateStr || dateStr === "-" || dateStr === "TBA") return "TBA";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

const ITEMS_PER_PAGE = 9;

export function AllotmentTracker({ ipos }: AllotmentTrackerProps) {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"all" | "live" | "upcoming" | "allotment">("all");
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 on tab or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [tab, search]);

  const filteredIpos = useMemo(() => {
    return ipos.filter((ipo) => {
      // 1. Search query filter
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesName = ipo.name.toLowerCase().includes(q);
        const matchesSymbol = ipo.symbol.toLowerCase().includes(q);
        const matchesRegistrar = (ipo.registrar || "").toLowerCase().includes(q);
        if (!matchesName && !matchesSymbol && !matchesRegistrar) return false;
      }

      // 2. Tab filter
      const statusLower = (ipo.statusLabel || ipo.status || "").toLowerCase();
      if (tab === "live") {
        return statusLower.includes("open") || statusLower.includes("live");
      }
      if (tab === "upcoming") {
        return statusLower.includes("upcoming");
      }
      if (tab === "allotment") {
        return (
          statusLower.includes("allot") ||
          statusLower.includes("closed") ||
          statusLower.includes("listed")
        );
      }
      return true;
    });
  }, [ipos, search, tab]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredIpos.length / ITEMS_PER_PAGE);
  const paginatedIpos = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredIpos.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredIpos, currentPage]);

  const liveCount = useMemo(
    () => ipos.filter((i) => (i.statusLabel || i.status || "").toLowerCase().includes("open") || (i.statusLabel || i.status || "").toLowerCase().includes("live")).length,
    [ipos]
  );
  const upcomingCount = useMemo(
    () => ipos.filter((i) => (i.statusLabel || i.status || "").toLowerCase().includes("upcoming")).length,
    [ipos]
  );
  const allotmentCount = useMemo(
    () => ipos.filter((i) => {
      const s = (i.statusLabel || i.status || "").toLowerCase();
      return s.includes("allot") || s.includes("closed") || s.includes("listed");
    }).length,
    [ipos]
  );

  return (
    <div className="space-y-5">
      {/* ── Toolbar: Filter Tabs + Search + View Switcher ── */}
      <div className="bg-card border border-line rounded-3xl p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

          {/* Left: Filter Pills with Dynamic Counts */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <SlidersHorizontal className="w-4 h-4 text-mut shrink-0" />
            <div className="flex items-center gap-1 bg-card2/80 p-1 rounded-xl border border-line flex-wrap">
              <button
                onClick={() => setTab("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  tab === "all"
                    ? "bg-accent text-accent-foreground shadow-xs"
                    : "text-mut hover:text-tx"
                }`}
              >
                All IPOs ({ipos.length})
              </button>
              <button
                onClick={() => setTab("live")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  tab === "live"
                    ? "bg-accent text-accent-foreground shadow-xs"
                    : "text-mut hover:text-tx"
                }`}
              >
                Live Bidding ({liveCount})
              </button>
              <button
                onClick={() => setTab("upcoming")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  tab === "upcoming"
                    ? "bg-accent text-accent-foreground shadow-xs"
                    : "text-mut hover:text-tx"
                }`}
              >
                Upcoming ({upcomingCount})
              </button>
              <button
                onClick={() => setTab("allotment")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  tab === "allotment"
                    ? "bg-accent text-accent-foreground shadow-xs"
                    : "text-mut hover:text-tx"
                }`}
              >
                Allotment Active ({allotmentCount})
              </button>
            </div>
          </div>

          {/* Right: Search Box + View Switcher */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-72">
              <Search className="w-4 h-4 text-mut absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by company or registrar..."
                className="w-full bg-card2/80 border border-line rounded-xl pl-9 pr-9 py-2 text-xs sm:text-sm text-tx placeholder:text-mut/70 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-mut hover:text-tx transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center p-1 rounded-xl bg-card border border-line shadow-xs shrink-0">
              <button
                type="button"
                onClick={() => setViewMode("card")}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === "card"
                    ? "bg-accent text-accent-foreground shadow-xs"
                    : "text-mut hover:text-tx hover:bg-card2"
                }`}
                title="Card View (Modern Grid)"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-accent text-accent-foreground shadow-xs"
                    : "text-mut hover:text-tx hover:bg-card2"
                }`}
                title="Table View (Full Rows)"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Count & Status info */}
        <div className="pt-2 border-t border-line/60 flex items-center justify-between text-xs text-mut flex-wrap gap-2">
          <span>
            Showing{" "}
            <strong className="text-tx font-mono">
              {filteredIpos.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1}–
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredIpos.length)}
            </strong>{" "}
            of <strong className="text-tx font-mono">{filteredIpos.length}</strong> IPOs
            {search && (
              <>
                {" "}for "<span className="text-accent font-semibold">{search}</span>"
              </>
            )}
          </span>
          <span className="hidden sm:inline text-accent/90 font-medium">
            Direct 1-click verified verification with Link Intime, KFintech &amp; Bigshare
          </span>
        </div>
      </div>

      {/* ── IPO Content Display ── */}
      {filteredIpos.length === 0 ? (
        <div className="text-center py-16 rounded-3xl bg-card border border-line">
          <p className="text-base font-semibold text-tx">No IPOs found</p>
          <p className="text-xs text-mut mt-1">Try adjusting your search query or switching filter tabs.</p>
          <button
            onClick={() => {
              setSearch("");
              setTab("all");
            }}
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-all shadow-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === "card" ? (
        /* 1. MODERN CARD GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedIpos.map((ipo) => {
            const detailUrl = `/ipo/${ipo.slug}/${ipo.symbol}`;
            const regInfo = getRegistrarPortal(ipo.registrar);
            const firstLetter = ipo.name.charAt(0).toUpperCase();

            const allotmentFormatted = formatDate(ipo.allotmentDate);
            const offerFormatted =
              ipo.openDate && ipo.closeDate
                ? `${formatDate(ipo.openDate)} - ${formatDate(ipo.closeDate)}`
                : formatDate(ipo.openDate);

            return (
              <div
                key={`${ipo.slug}-${ipo.symbol}`}
                className="group flex flex-col justify-between rounded-3xl bg-card border border-line p-5 shadow-xs hover:shadow-md hover:border-accent/60 hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="space-y-4">
                  {/* Top: Avatar + Company Name + Synced Badges */}
                  <div className="flex items-start gap-3">
                    <IpoLogo
                      src={ipo.image || ipo.rawApiData?.ipo_image}
                      name={ipo.name}
                      className="w-10 h-10 rounded-xl group-hover:scale-105 transition-transform shadow-xs"
                    />

                    <div className="min-w-0 flex-1">
                      <Link
                        href={detailUrl}
                        className="font-heading font-bold text-base text-tx group-hover:text-accent transition-colors truncate block mb-1.5"
                      >
                        {ipo.name}
                      </Link>
                      <IpoBadgeHeader ipo={ipo} />
                    </div>
                  </div>

                  {/* Spotlight Box: Allotment Date & Registrar */}
                  <div className="grid grid-cols-2 gap-2.5 p-3.5 rounded-2xl bg-card2/60 border border-line">
                    <div>
                      <span className="text-[11px] font-semibold text-mut uppercase tracking-wider block mb-0.5">
                        Allotment Date
                      </span>
                      <span className="font-heading font-extrabold text-sm text-accent font-mono block">
                        {allotmentFormatted}
                      </span>
                    </div>

                    <div className="border-l border-line/60 pl-3">
                      <span className="text-[11px] font-semibold text-mut uppercase tracking-wider block mb-0.5">
                        Registrar
                      </span>
                      <span className="font-semibold text-xs text-tx truncate block" title={regInfo.name}>
                        {regInfo.name}
                      </span>
                    </div>
                  </div>

                  {/* Key Financial Details */}
                  <div className="space-y-2 text-xs py-0.5">
                    <div className="flex items-center justify-between pb-1.5 border-b border-line/40">
                      <span className="text-mut font-medium">Issue Price</span>
                      <span className="font-bold text-tx font-mono text-xs sm:text-sm">{ipo.priceBand}</span>
                    </div>
                    <div className="flex items-center justify-between pb-1.5 border-b border-line/40">
                      <span className="text-mut font-medium">Offer Period</span>
                      <span className="font-semibold text-tx font-mono text-xs">{offerFormatted}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-mut font-medium">Subscription</span>
                      <span className="font-bold text-accent font-mono text-xs">
                        {formatSubscription(ipo.subscription.total)} Demand
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions: View IPO + Direct Check Allotment */}
                <div className="mt-4 pt-3.5 border-t border-line/60 flex items-center justify-between gap-2">
                  <Link
                    href={detailUrl}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-mut hover:text-accent transition-colors"
                  >
                    View IPO
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href={regInfo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-all shadow-xs active:scale-95"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Check Allotment
                    <ExternalLink className="w-3 h-3 opacity-80" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* 2. REFINED TABLE VIEW */
        <div className="bg-card border border-line rounded-3xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-card2/80 border-b border-line text-mut font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-5">IPO Company</th>
                  <th className="py-3.5 px-3">Price Band</th>
                  <th className="py-3.5 px-3">Allotment Date</th>
                  <th className="py-3.5 px-3">Registrar</th>
                  <th className="py-3.5 px-3">Subscription</th>
                  <th className="py-3.5 px-5 text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {paginatedIpos.map((ipo) => {
                  const detailUrl = `/ipo/${ipo.slug}/${ipo.symbol}`;
                  const regInfo = getRegistrarPortal(ipo.registrar);
                  return (
                    <tr key={`${ipo.slug}-${ipo.symbol}`} className="hover:bg-card2/40 transition-colors">
                      <td className="py-3.5 px-5">
                        <Link href={detailUrl} className="group block">
                          <p className="font-heading font-bold text-sm text-tx group-hover:text-accent transition-colors truncate max-w-[220px]">
                            {ipo.name}
                          </p>
                          <IpoBadgeHeader ipo={ipo} className="mt-1" />
                        </Link>
                      </td>
                      <td className="py-3.5 px-3 font-mono font-bold text-tx whitespace-nowrap">
                        {ipo.priceBand}
                      </td>
                      <td className="py-3.5 px-3 font-mono font-bold text-accent whitespace-nowrap">
                        {formatDate(ipo.allotmentDate)}
                      </td>
                      <td className="py-3.5 px-3 text-tx/90 font-medium whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-card2 border border-line text-xs">
                          {regInfo.name}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 font-mono font-bold text-tx whitespace-nowrap">
                        {formatSubscription(ipo.subscription.total)}
                      </td>
                      <td className="py-3.5 px-5 text-right whitespace-nowrap">
                        <a
                          href={regInfo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-accent/10 hover:bg-accent text-accent hover:text-accent-foreground border border-accent/25 hover:border-accent transition-all shadow-2xs"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Check Status
                          <ExternalLink className="w-3 h-3 opacity-70" />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Pagination Controls ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between gap-3 pt-3 flex-wrap">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-card border border-line text-tx hover:border-accent hover:text-accent disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${
                  pageNum === currentPage
                    ? "bg-accent text-accent-foreground shadow-xs"
                    : "bg-card border border-line text-tx hover:border-accent hover:text-accent"
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-card border border-line text-tx hover:border-accent hover:text-accent disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
