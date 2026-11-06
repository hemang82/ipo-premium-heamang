"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Sparkles, TrendingUp, X, Loader2, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { globalSearch, GlobalSearchResult, slugifyCompanyName } from "@/lib/ipo-service";
import { Button } from "@/components/ui/Button";
import { IpoLogo } from "@/components/ipo/IpoLogo";

export function Hero() {
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

  // Fetch initial/trending IPOs or debounced search results
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
    <section className="relative pt-12 pb-10 text-center max-w-4xl mx-auto px-4">
      {/* Small badge */}
      {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card2 border border-line text-xs font-medium text-mut mb-6 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-accent" />
        <span>Indian Stock Market Live GMP & Allotment Engine</span>
      </div> */}

      {/* Main H1 */}
      <h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-tx tracking-tightest leading-[1.15] mb-4">
        Know the premium <br className="hidden sm:inline" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-[#F3C5B5] to-accent">
          before you apply
        </span>
      </h1>

      {/* English Description */}
      <p className="text-sm sm:text-base text-mut max-w-2xl mx-auto mb-8 leading-relaxed">
        Real-time Grey Market Premium (GMP), live QIB/NII/Retail subscription numbers, and reliable allotment status for Mainboard & SME IPOs.
      </p>

      {/* Search Input Box with Live Dropdown */}
      <div ref={dropdownRef} className="relative max-w-xl mx-auto">
        <form
          onSubmit={handleFormSubmit}
          className="flex items-center gap-2 p-1.5 rounded-2xl bg-card border border-line shadow-lg focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20 transition-all"
        >
          <div className="pl-3 text-mut">
            <Search className="w-5 h-5" />
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
            placeholder="Search Mainboard, SME or Unlisted IPOs..."
            className="flex-1 bg-transparent px-2 py-2 text-sm text-tx placeholder:text-mut/70 focus:outline-none"
          />

          {isLoading ? (
            <div className="pr-2 text-accent animate-spin">
              <Loader2 className="w-4 h-4" />
            </div>
          ) : query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="p-1 text-mut hover:text-tx focus:outline-none"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}

          <Button type="submit" size="sm" variant="primary">
            Search
          </Button>
        </form>

        {/* Solid Opaque High-Contrast Premium Dropdown */}
        {isOpen && (
          <div className="absolute left-0 right-0 top-full mt-2.5 rounded-2xl bg-card border-2 border-line/90 shadow-[0_20px_60px_rgba(0,0,0,0.35)] z-50 overflow-hidden text-left max-h-[460px] overflow-y-auto">
            {/* Header label */}
            <div className="px-4 py-3 bg-card2/80 border-b border-line flex items-center justify-between text-xs font-semibold text-tx">
              <span className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-accent" />
                <span className="text-tx font-bold font-heading">
                  {query ? `Search results for "${query}"` : "Trending & Active IPOs"}
                </span>
              </span>
              <span className="text-xs text-mut">Click to open IPO</span>
            </div>

            {hasAnyResults ? (
              <div className="p-2 divide-y divide-line/40">
                {/* 1. Mainboard IPOs */}
                {results.mainboard.length > 0 && (
                  <div className="py-2 first:pt-1">
                    <div className="px-3 py-1 text-xs font-bold text-accent uppercase tracking-wider flex items-center justify-between">
                      <span>Mainboard IPOs</span>
                      <span className="text-mut font-normal">({results.mainboard.length})</span>
                    </div>
                    <div className="space-y-1 mt-1">
                      {results.mainboard.map((item) => (
                        <div
                          key={item.id || item.symbol}
                          onClick={() => handleSelectIpo(item)}
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-card2 cursor-pointer transition-all group border border-transparent hover:border-line"
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            <IpoLogo
                              src={item.ipo_image || item.logo}
                              name={item.company_name}
                              className="w-9 h-9 rounded-xl group-hover:scale-105 transition-transform shrink-0 shadow-inner"
                            />
                            <div className="min-w-0">
                              <p className="font-heading font-bold text-sm sm:text-base text-tx group-hover:text-accent transition-colors truncate">
                                {item.company_name}
                              </p>
                              <p className="text-xs text-mut font-medium flex items-center gap-2 mt-0.5">
                                <span className="font-mono bg-card2 px-1.5 py-0.2 rounded border border-line">
                                  {item.symbol}
                                </span>
                                {item.price_band && <span>• ₹{item.price_band}</span>}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            {item.gmp !== undefined && (
                              <div className="text-right">
                                <span className="text-sm font-heading font-extrabold text-up block">
                                  {item.gmp > 0 ? `+₹${item.gmp}` : "GMP: ₹0"}
                                </span>
                                {item.expected_premium && (
                                  <span className="text-xs text-mut font-semibold">
                                    {item.expected_premium}
                                  </span>
                                )}
                              </div>
                            )}
                            <ChevronRight className="w-4 h-4 text-mut group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. SME IPOs */}
                {results.sme.length > 0 && (
                  <div className="py-2">
                    <div className="px-3 py-1 text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center justify-between">
                      <span>SME IPOs</span>
                      <span className="text-mut font-normal">({results.sme.length})</span>
                    </div>
                    <div className="space-y-1 mt-1">
                      {results.sme.map((item) => (
                        <div
                          key={item.id || item.symbol}
                          onClick={() => handleSelectIpo(item)}
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-card2 cursor-pointer transition-all group border border-transparent hover:border-line"
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            <IpoLogo
                              src={item.ipo_image || item.logo}
                              name={item.company_name}
                              className="w-9 h-9 rounded-xl group-hover:scale-105 transition-transform shrink-0 shadow-inner"
                              fallbackClassName="text-purple-400 font-bold"
                            />
                            <div className="min-w-0">
                              <p className="font-heading font-bold text-sm sm:text-base text-tx group-hover:text-accent transition-colors truncate">
                                {item.company_name}
                              </p>
                              <p className="text-xs text-mut font-medium flex items-center gap-2 mt-0.5">
                                <span className="font-mono bg-card2 px-1.5 py-0.2 rounded border border-line">
                                  {item.symbol}
                                </span>
                                <span>• SME</span>
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            {item.gmp !== undefined && (
                              <div className="text-right">
                                <span className="text-sm font-heading font-extrabold text-up block">
                                  {item.gmp > 0 ? `+₹${item.gmp}` : "GMP: ₹0"}
                                </span>
                                {item.expected_premium && (
                                  <span className="text-xs text-mut font-semibold">
                                    {item.expected_premium}
                                  </span>
                                )}
                              </div>
                            )}
                            <ChevronRight className="w-4 h-4 text-mut group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Unlisted IPOs */}
                {results.unlisted.length > 0 && (
                  <div className="py-2">
                    <div className="px-3 py-1 text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center justify-between">
                      <span>Unlisted Shares</span>
                      <span className="text-mut font-normal">({results.unlisted.length})</span>
                    </div>
                    <div className="space-y-1 mt-1">
                      {results.unlisted.map((item) => (
                        <div
                          key={item.id || item.symbol}
                          onClick={() => handleSelectIpo(item)}
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-card2 cursor-pointer transition-all group border border-transparent hover:border-line"
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            <div className="w-9 h-9 rounded-xl bg-card2 border border-line flex items-center justify-center font-bold text-base text-blue-400 shrink-0">
                              U
                            </div>
                            <div className="min-w-0">
                              <p className="font-heading font-bold text-sm sm:text-base text-tx truncate">
                                {item.company_name}
                              </p>
                              <p className="text-xs text-mut font-mono mt-0.5">
                                {item.symbol || "Unlisted"}
                              </p>
                            </div>
                          </div>
                          <span className="text-xs font-semibold text-mut bg-card2 px-2.5 py-1 rounded-md border border-line">
                            Unlisted
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : !isLoading ? (
              <div className="p-8 text-center text-mut text-sm">
                No matching IPOs found for &quot;{query}&quot;.
              </div>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
