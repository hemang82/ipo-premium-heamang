"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  TrendingUp,
  X,
  Loader2,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  globalSearch,
  GlobalSearchResult,
  slugifyCompanyName,
} from "@/lib/ipo-service";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<GlobalSearchResult>({
    mainboard: [],
    sme: [],
    unlisted: [],
  });

  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced search logic
  useEffect(() => {
    let isCancelled = false;
    const delay = query ? 350 : 0;

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const data = await globalSearch(query);
        if (!isCancelled) {
          setResults(data);
        }
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }, delay);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectIpo = (item: any) => {
    setIsOpen(false);
    const slug = slugifyCompanyName(item.company_name);
    const symbol = (item.symbol || "IPO").toUpperCase();
    router.push(`/ipo/${slug}/${symbol}/`);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsOpen(false);
    router.push(`/?q=${encodeURIComponent(query.trim())}#all-ipos`);
  };

  const hasAnyResults =
    results.mainboard.length > 0 || results.sme.length > 0 || results.unlisted.length > 0;

  return (
    <section className="relative pt-7 pb-4 text-center max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        {/* Visually hidden for clean UI, fully present in HTML for Google & SEO */}
        <span className="sr-only">ipo-premium.com | Live IPO Tracker</span>

        {/* Main H1 Headline - perfectly centered */}
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-tx tracking-tight leading-[1.18] mb-2.5">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-[#FF7A45] to-[#D95A2B]">
            IPO Premium
          </span>{" "}
          – Know the Premium{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-[#F3C5B5] to-accent">
            Before You Apply
          </span>
        </h1>

        {/* Description */}
        <p className="text-xs sm:text-sm text-mut leading-relaxed max-w-lg mb-6">
          Real-time Grey Market Premium (GMP), live QIB/NII/Retail subscription numbers, and reliable allotment status for Mainboard & SME IPOs.
        </p>

        {/* Centered Premium Search Input Box with Live Dropdown */}
        <div ref={dropdownRef} className="relative w-full max-w-lg">
          <form
            onSubmit={handleFormSubmit}
            className="flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-card border border-line shadow-md outline-none focus:outline-none focus-within:outline-none focus-visible:outline-none focus-within:border-accent focus-within:shadow-[0_0_0_3px_rgba(217,90,43,0.18)] focus-within:ring-0 ring-0 transition-all"
          >
            <div className="pl-2.5 sm:pl-3 text-mut shrink-0">
              <Search className="w-4 h-4" />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onFocus={() => setIsOpen(true)}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              placeholder="Search IPOs (Mainboard, SME)..."
              className="flex-1 min-w-0 bg-transparent px-1.5 sm:px-2 py-1.5 text-xs sm:text-sm text-tx placeholder:text-mut/70 outline-none focus:outline-none ring-0 focus:ring-0"
            />

            {isLoading ? (
              <div className="pr-1.5 text-accent animate-spin shrink-0">
                <Loader2 className="w-4 h-4" />
              </div>
            ) : query ? (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                className="p-1 text-mut hover:text-tx outline-none focus:outline-none shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            ) : null}

            <Button
              type="submit"
              size="sm"
              variant="primary"
              className="px-3.5 sm:px-5 py-2 text-xs sm:text-sm font-bold shadow-sm shrink-0 rounded-xl"
            >
              Search
            </Button>
          </form>

          {/* Instant Search Results Dropdown */}
          {isOpen && (
            <div className="absolute left-0 right-0 top-full mt-2 rounded-2xl bg-card border border-line shadow-[0_20px_50px_rgba(0,0,0,0.18)] z-50 overflow-hidden text-left max-h-[340px] sm:max-h-[440px] overflow-y-auto">
              <div className="px-3.5 sm:px-4 py-2.5 bg-card2/80 border-b border-line flex items-center justify-between text-xs font-semibold text-tx">
                <span className="flex items-center gap-2 min-w-0 pr-2">
                  <TrendingUp className="w-4 h-4 text-accent shrink-0" />
                  <span className="text-tx font-bold font-heading truncate">
                    {query ? `Search results for "${query}"` : "Trending & Active IPOs"}
                  </span>
                </span>
                <span className="text-[11px] text-mut shrink-0 hidden sm:inline-block">Click to view IPO</span>
              </div>

              {hasAnyResults ? (
                <div className="p-2 divide-y divide-line/40">
                  {/* Mainboard */}
                  {results.mainboard.length > 0 && (
                    <div className="py-2 first:pt-0 last:pb-0">
                      <div className="px-3 py-1 text-[11px] font-bold text-mut uppercase tracking-wider">
                        Mainboard IPOs ({results.mainboard.length})
                      </div>
                      {results.mainboard.slice(0, 4).map((item: any, idx: number) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectIpo(item)}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-card2 transition-colors text-left"
                        >
                          <div className="min-w-0 flex-1 pr-2">
                            <span className="text-xs sm:text-sm font-semibold text-tx block truncate">
                              {item.company_name}
                            </span>
                            <span className="text-xs text-mut">
                              {item.symbol ? `${item.symbol} • ` : ""}
                              {item.status || "Mainboard"}
                            </span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-mut shrink-0" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* SME */}
                  {results.sme.length > 0 && (
                    <div className="py-2 first:pt-0 last:pb-0">
                      <div className="px-3 py-1 text-[11px] font-bold text-accent uppercase tracking-wider">
                        SME IPOs ({results.sme.length})
                      </div>
                      {results.sme.slice(0, 4).map((item: any, idx: number) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectIpo(item)}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-card2 transition-colors text-left"
                        >
                          <div className="min-w-0 flex-1 pr-2">
                            <span className="text-xs sm:text-sm font-semibold text-tx block truncate">
                              {item.company_name}
                            </span>
                            <span className="text-xs text-mut">
                              {item.symbol ? `${item.symbol} • ` : ""}
                              BSE SME / NSE Emerge
                            </span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-mut shrink-0" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-6 text-center text-xs text-mut">
                  {isLoading ? "Searching live market..." : "No matching IPOs found."}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
