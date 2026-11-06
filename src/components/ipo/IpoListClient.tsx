"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { Ipo } from "@/lib/types";
import { IpoRow } from "@/components/home/IpoRow";
import { IpoCard } from "@/components/home/IpoCard";
import { transformApiIpo, getHomePageIpoList } from "@/lib/ipo-service";
import {
  Search,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  Loader2,
  SlidersHorizontal,
  X,
  AlertTriangle,
  AlertCircle,
  Building2,
  CalendarClock,
  Sparkles,
} from "lucide-react";

type Category = "live" | "upcoming" | "listed";
type IpoTypeFilter = "all" | "mainboard" | "sme";

interface IpoListClientProps {
  category: Category;
  initialItems: Ipo[];
  initialTotal: number;
  initialPage: number;
  pageSize: number;
  initialIpoType: IpoTypeFilter;
}

const PAGE_SIZE = 15;

const categoryTabs = [
  { key: "live", label: "Live Bidding", href: "/ipo/live", dotClass: "bg-emerald-500 animate-pulse" },
  { key: "upcoming", label: "Upcoming IPOs", href: "/ipo/upcoming", dotClass: "bg-amber-500" },
  { key: "listed", label: "Recently Listed", href: "/ipo/listed", dotClass: "bg-sky-500" },
];

export function IpoListClient({
  category,
  initialItems,
  initialTotal,
  initialPage,
  pageSize,
  initialIpoType,
}: IpoListClientProps) {
  const [items, setItems] = useState<Ipo[]>(initialItems);
  const [total, setTotal] = useState(initialTotal);
  const [page, setPage] = useState(initialPage);
  const [ipoType, setIpoType] = useState<IpoTypeFilter>(initialIpoType);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "card">("list");
  const [isFallbackSme, setIsFallbackSme] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const searchRef = useRef<HTMLInputElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Auto-switch to card on mobile
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setViewMode("card");
    }
  }, []);

  // Debounce search input 400ms
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // reset page on new search
    }, 400);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [search]);

  // Fetch data whenever page, ipoType, or debouncedSearch changes
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const typeParam =
        ipoType === "mainboard"
          ? "mainboard"
          : ipoType === "sme"
          ? "sme"
          : "";

      const res = await getHomePageIpoList({
        category,
        page,
        pageSize: PAGE_SIZE,
        ipoType: typeParam,
        search: debouncedSearch,
      });

      if (res?.error) {
        setApiError(res.message || "Upstream data provider server error");
      } else {
        setApiError(null);
      }

      setIsFallbackSme(Boolean(res?.data?._fallbackToSme));

      const results: any[] = res?.data?.results || [];
      const totalCount: number = res?.data?.count ?? results.length;

      const transformed = results.map((raw: any) => transformApiIpo(raw, category));
      setItems(transformed);
      setTotal(totalCount);
    } catch (err: any) {
      console.error("IpoListClient fetch error:", err);
      setApiError(err?.message || "Failed to load IPOs");
    } finally {
      setLoading(false);
    }
  }, [category, page, ipoType, debouncedSearch]);

  // Skip first render (use initial SSR data), fetch on subsequent filter changes
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    fetchData();
    // Do NOT scroll window to top on filter change to preserve user context!
  }, [fetchData]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const handleTypeChange = (type: IpoTypeFilter) => {
    if (ipoType === type) return;
    setIpoType(type);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === page) return;
    setPage(newPage);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 250, behavior: "smooth" });
    }
  };

  // Generate pagination range with ellipsis
  const getPaginationRange = () => {
    const delta = 1;
    const range: (number | "...")[] = [];
    for (let i = Math.max(2, page - delta); i <= Math.min(totalPages - 1, page + delta); i++) {
      range.push(i);
    }
    if (page - delta > 2) range.unshift("...");
    if (page + delta < totalPages - 1) range.push("...");
    if (totalPages > 1) range.unshift(1);
    if (totalPages > 1) range.push(totalPages);
    return range;
  };

  const typeFilters: { label: string; value: IpoTypeFilter }[] = [
    { label: "All IPOs", value: "all" },
    { label: "Mainboard", value: "mainboard" },
    { label: "SME IPOs", value: "sme" },
  ];

  return (
    <div className="space-y-5">
      {/* ── Category Navigation Tabs (Live / Upcoming / Listed) ── */}
      <div className="flex items-center gap-2 border-b border-line/70 pb-3 overflow-x-auto scrollbar-none">
        {categoryTabs.map((tab) => {
          const isActive = category === tab.key;
          return (
            <Link
              key={tab.key}
              href={tab.href}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                isActive
                  ? "bg-accent text-accent-foreground shadow-xs font-bold"
                  : "bg-card2/80 text-mut hover:text-tx hover:bg-card2 border border-line"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${tab.dotClass}`} />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>

      {/* ── Filter Bar ── */}
      <div className="bg-card border border-line rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

          {/* Left: Type Filter Pills (All / Mainboard / SME) */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <SlidersHorizontal className="w-4 h-4 text-mut shrink-0" />
            <div className="flex items-center gap-1 bg-card2/60 p-1 rounded-xl border border-line">
              {typeFilters.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => handleTypeChange(f.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    ipoType === f.value
                      ? "bg-accent text-accent-foreground shadow-xs"
                      : "text-mut hover:text-tx"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Search + View Toggle */}
          <div className="flex items-center gap-3">
            {/* Search Box */}
            <div className="relative flex-1 sm:w-72">
              <Search className="w-4 h-4 text-mut absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by company or symbol..."
                className="w-full bg-card2/80 border border-line rounded-xl pl-9 pr-9 py-2 text-xs sm:text-sm text-tx placeholder:text-mut/70 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-mut hover:text-tx transition-colors cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center p-1 rounded-xl bg-card border border-line shadow-xs shrink-0">
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

        {/* Fallback Banner for Listed IPOs */}
        {isFallbackSme && (
          <div className="bg-amber-500/10 border border-amber-500/25 text-amber-700 dark:text-amber-400 rounded-xl px-3.5 py-2 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-500" />
            <span>
              Showing <strong>SME Listed IPOs</strong>. (Mainboard listed data is temporarily undergoing server maintenance by the upstream data provider).
            </span>
          </div>
        )}

        {/* Result count line */}
        <div className="pt-2 border-t border-line/60 flex items-center justify-between gap-2 text-xs text-mut flex-wrap">
          {loading ? (
            <span className="flex items-center gap-1.5">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-accent" />
              Loading IPOs...
            </span>
          ) : (
            <span>
              Showing{" "}
              <strong className="text-tx">
                {total > 0 ? `${Math.min((page - 1) * PAGE_SIZE + 1, total)}–${Math.min(page * PAGE_SIZE, total)}` : "0"}
              </strong>{" "}
              of <strong className="text-tx">{total}</strong> {category === "live" ? "Open" : category === "upcoming" ? "Upcoming" : "Listed"} IPOs
              {debouncedSearch && (
                <> for "<span className="text-accent font-semibold">{debouncedSearch}</span>"</>
              )}
            </span>
          )}

          {ipoType !== "all" && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-card2 border border-line text-[11px] font-medium text-mut">
              Filtered: <span className="text-tx font-semibold capitalize">{ipoType}</span>
            </span>
          )}
        </div>
      </div>

      {/* ── IPO List / Card Grid / Contextual Empty States ── */}
      {loading ? (
        <div className="flex items-center justify-center py-20 rounded-2xl bg-card border border-line">
          <div className="text-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto" />
            <p className="text-sm text-mut">Fetching latest IPO data...</p>
          </div>
        </div>
      ) : apiError && items.length === 0 ? (
        /* Upstream API Error State (e.g. 500 error on listed mainboard) */
        <div className="text-center py-14 px-4 rounded-2xl bg-card border border-line space-y-3.5">
          <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
          <h3 className="text-base font-bold text-tx">Upstream Data Provider Notice</h3>
          <p className="text-xs sm:text-sm text-mut max-w-lg mx-auto leading-relaxed">
            The external data server encountered a temporary format error while querying {ipoType === "mainboard" ? "Mainboard Listed" : "IPO"} records ({apiError}).
            {category === "listed" && " Over 1,100+ SME Listed IPOs are fully available."}
          </p>
          {category === "listed" && ipoType !== "sme" && (
            <button
              type="button"
              onClick={() => handleTypeChange("sme")}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-all cursor-pointer shadow-sm"
            >
              Browse 1,100+ SME Listed IPOs
            </button>
          )}
        </div>
      ) : items.length === 0 ? (
        /* Contextual Empty States */
        category === "live" && ipoType === "mainboard" ? (
          /* Live page with Mainboard filter: currently 0 mainboard live in India */
          <div className="text-center py-14 px-4 rounded-2xl bg-card border border-line space-y-3.5">
            <Building2 className="w-10 h-10 text-mut/60 mx-auto" />
            <h3 className="text-base font-bold text-tx">No Live Mainboard IPOs Open Today</h3>
            <p className="text-xs sm:text-sm text-mut max-w-md mx-auto leading-relaxed">
              There are currently no Mainboard IPOs open for public bidding on BSE or NSE. Currently, 2 SME IPOs are active in bidding.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleTypeChange("sme")}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-all cursor-pointer shadow-sm"
              >
                View 2 Active SME IPOs
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange("all")}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-card2 border border-line text-tx hover:border-accent hover:text-accent transition-all cursor-pointer"
              >
                Show All Active IPOs
              </button>
            </div>
          </div>
        ) : category === "upcoming" ? (
          /* Upcoming page: currently 0 upcoming announced in market */
          <div className="text-center py-14 px-4 rounded-2xl bg-card border border-line space-y-3.5">
            <CalendarClock className="w-10 h-10 text-amber-500 mx-auto" />
            <h3 className="text-base font-bold text-tx">No Upcoming IPOs Scheduled Right Now</h3>
            <p className="text-xs sm:text-sm text-mut max-w-lg mx-auto leading-relaxed">
              There are currently no upcoming IPOs with declared bidding dates on BSE or NSE. New IPO announcements will automatically appear here once Red Herring Prospectus (RHP) and bid dates are declared with SEBI.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <Link
                href="/ipo/live"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-all shadow-sm"
              >
                View Live Bidding IPOs
              </Link>
              <Link
                href="/ipo-gmp"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-card2 border border-line text-tx hover:border-accent hover:text-accent transition-all"
              >
                Check IPO GMP Today
              </Link>
              <Link
                href="/ipo/listed"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-card2 border border-line text-tx hover:border-accent hover:text-accent transition-all"
              >
                View Recently Listed IPOs
              </Link>
            </div>
          </div>
        ) : debouncedSearch ? (
          /* Search returned 0 results */
          <div className="text-center py-14 px-4 rounded-2xl bg-card border border-line space-y-3.5">
            <Search className="w-10 h-10 text-mut/60 mx-auto" />
            <h3 className="text-base font-bold text-tx">No IPOs found for "{debouncedSearch}"</h3>
            <p className="text-xs sm:text-sm text-mut max-w-md mx-auto leading-relaxed">
              We couldn't find any {ipoType !== "all" ? ipoType.toUpperCase() : ""} IPO matching your search query. Try checking for typos or searching by another keyword.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setSearch("")}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-all cursor-pointer shadow-sm"
              >
                Clear Search
              </button>
              {ipoType !== "all" && (
                <button
                  type="button"
                  onClick={() => handleTypeChange("all")}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-card2 border border-line text-tx hover:border-accent hover:text-accent transition-all cursor-pointer"
                >
                  Search Across All IPOs
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Generic Empty State */
          <div className="text-center py-14 rounded-2xl bg-card border border-line space-y-3">
            <p className="text-base font-semibold text-tx">No IPOs found</p>
            <p className="text-sm text-mut">Try adjusting your filters or resetting.</p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setIpoType("all");
                setPage(1);
              }}
              className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )
      ) : viewMode === "list" ? (
        /* LIST VIEW */
        <div className="space-y-3">
          {items.map((ipo) => (
            <IpoRow key={`${ipo.slug}-${ipo.symbol}`} ipo={ipo} />
          ))}
        </div>
      ) : (
        /* CARD VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {items.map((ipo) => (
            <IpoCard key={`${ipo.slug}-${ipo.symbol}`} ipo={ipo} />
          ))}
        </div>
      )}

      {/* ── Pagination ── */}
      {totalPages > 1 && !loading && items.length > 0 && (
        <div className="flex items-center justify-between gap-4 pt-3">
          {/* Prev */}
          <button
            type="button"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-card border border-line text-tx hover:border-accent hover:text-accent transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-line disabled:hover:text-tx cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {getPaginationRange().map((p, i) =>
              p === "..." ? (
                <span key={`ellipsis-${i}`} className="px-2 text-sm text-mut select-none">
                  …
                </span>
              ) : (
                <button
                  type="button"
                  key={p}
                  onClick={() => handlePageChange(p as number)}
                  className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                    p === page
                      ? "bg-accent text-accent-foreground shadow-xs"
                      : "bg-card border border-line text-tx hover:border-accent hover:text-accent"
                  }`}
                >
                  {p}
                </button>
              )
            )}
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-card border border-line text-tx hover:border-accent hover:text-accent transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-line disabled:hover:text-tx cursor-pointer"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
