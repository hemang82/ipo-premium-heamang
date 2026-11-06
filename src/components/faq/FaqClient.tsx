"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  HelpCircle,
  TrendingUp,
  ShieldCheck,
  Calculator,
  Layers,
  ChevronDown,
  X,
  Sparkles,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { ALL_FAQS, CATEGORIES, FaqItem } from "./faqData";

export function FaqClient() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openFaqId, setOpenFaqId] = useState<string | null>("gmp-1");

  const filteredFaqs = useMemo(() => {
    return ALL_FAQS.filter((faq) => {
      // 1. Category filter
      if (activeCategory !== "all" && faq.category !== activeCategory) {
        return false;
      }
      // 2. Search query filter
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesQuestion = faq.question.toLowerCase().includes(q);
        const matchesAnswer = faq.answer.toLowerCase().includes(q);
        const matchesTag = faq.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesQuestion && !matchesAnswer && !matchesTag) return false;
      }
      return true;
    });
  }, [search, activeCategory]);

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-8">
      {/* ── Filter Toolbar: Search Bar + Category Pills ── */}
      <div className="bg-card border border-line rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-mut absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions by keyword (e.g., GMP, Allotment lottery, Taxes, ASBA)..."
            className="w-full bg-card2/80 border border-line rounded-2xl pl-10 pr-10 py-3 text-xs sm:text-sm text-tx placeholder:text-mut/70 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-mut hover:text-tx transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === cat.id
                  ? "bg-accent text-accent-foreground shadow-xs"
                  : "bg-card2/80 text-mut hover:text-tx border border-line"
              }`}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>

        {/* Results counter */}
        <div className="pt-2 border-t border-line/60 flex items-center justify-between text-xs text-mut">
          <span>
            Showing <strong className="text-tx font-mono">{filteredFaqs.length}</strong> answers
            {search && (
              <>
                {" "}for "<span className="text-accent font-semibold">{search}</span>"
              </>
            )}
          </span>
          <span className="hidden sm:inline text-accent/90 font-medium">
            Updated in accordance with latest SEBI 2024–25 ICDR guidelines
          </span>
        </div>
      </div>

      {/* ── FAQ Accordion List ── */}
      {filteredFaqs.length === 0 ? (
        <div className="text-center py-16 rounded-3xl bg-card border border-line">
          <HelpCircle className="w-8 h-8 text-mut mx-auto mb-2 opacity-50" />
          <p className="text-base font-semibold text-tx">No matching answers found</p>
          <p className="text-xs text-mut mt-1">Try searching with a different financial keyword or resetting filters.</p>
          <button
            onClick={() => {
              setSearch("");
              setActiveCategory("all");
            }}
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-all shadow-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-card border-accent/40 shadow-xs"
                    : "bg-card/70 border-line hover:border-line/80 hover:bg-card"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-4.5 sm:p-5 text-left flex items-start justify-between gap-4 focus:outline-none"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-card2 border border-line text-accent">
                      {faq.categoryLabel}
                    </span>
                    <h3 className="font-heading font-bold text-sm sm:text-base text-tx leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`w-7 h-7 rounded-lg bg-card2 border border-line flex items-center justify-center text-mut shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-accent bg-accent/10 border-accent/25" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4.5 sm:px-5 pb-5 pt-1 border-t border-line/40 space-y-3 animate-in fade-in duration-150">
                    <p className="text-xs sm:text-sm text-mut leading-relaxed">
                      {faq.answer}
                    </p>

                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      <span className="text-[11px] font-semibold text-tx/80 mr-1">Related:</span>
                      {faq.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-card2 text-mut border border-line"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── Related Knowledge Tools Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        <Link
          href="/tools/lot-calculator"
          className="p-5 rounded-2xl bg-card border border-line hover:border-accent/60 transition-all group flex flex-col justify-between space-y-3 shadow-xs"
        >
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <Calculator className="w-4 h-4" />
            </div>
            <h4 className="font-heading font-bold text-sm text-tx group-hover:text-accent transition-colors">
              IPO Lot & Profit Calculator
            </h4>
            <p className="text-xs text-mut leading-relaxed">
              Calculate exact retail & HNI required investment capital, shares, and expected listing returns.
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent pt-1">
            Open Calculator
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>

        <Link
          href="/allotment"
          className="p-5 rounded-2xl bg-card border border-line hover:border-accent/60 transition-all group flex flex-col justify-between space-y-3 shadow-xs"
        >
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h4 className="font-heading font-bold text-sm text-tx group-hover:text-accent transition-colors">
              Allotment Status Checker
            </h4>
            <p className="text-xs text-mut leading-relaxed">
              Direct official verification links to Link Intime, KFintech, Bigshare, BSE & NSE.
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent pt-1">
            Check Allotment
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>

        <Link
          href="/ipo-gmp"
          className="p-5 rounded-2xl bg-card border border-line hover:border-accent/60 transition-all group flex flex-col justify-between space-y-3 shadow-xs"
        >
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h4 className="font-heading font-bold text-sm text-tx group-hover:text-accent transition-colors">
              Live IPO GMP Tracker
            </h4>
            <p className="text-xs text-mut leading-relaxed">
              Real-time Grey Market Premium rates, Kostak numbers, and expected listing gain percentages.
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent pt-1">
            View Live Rates
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      </div>
    </div>
  );
}
