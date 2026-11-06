"use client";

import React, { useState } from "react";
import { Ipo } from "@/lib/types";
import { IpoRow } from "./IpoRow";
import { IpoCard } from "./IpoCard";
import { FilterChips } from "./FilterChips";
import { filterAndSortIpos } from "@/lib/ipo-service";
import { LayoutGrid, List } from "lucide-react";

interface IpoListProps {
  allIpos: Ipo[];
  currentType: string;
  currentStatus: string;
  currentSort: string;
  query: string;
}

export function IpoList({ allIpos, currentType, currentStatus, currentSort, query }: IpoListProps) {
  // State for View Switcher: 'list' (default rows) or 'card' (modern grid cards)
  const [viewMode, setViewMode] = useState<"list" | "card">("list");

  // Filter & sort
  const filtered = filterAndSortIpos(allIpos, {
    type: currentType,
    status: currentStatus,
    sort: currentSort as any,
    query,
  });

  return (
    <section id="all-ipos" className="my-8 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Bar: Title on Left + All Filter Tabs & View Switcher on Right */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-tx tracking-tightest">
            All Current & Upcoming IPOs
          </h2>
          <p className="text-sm text-mut mt-1">
            Live Grey Market Premium rates updated continuously with verified market brokers.
          </p>
        </div>

        {/* Filters Group + View Mode Switcher placed together */}
        <div className="flex items-center gap-3 flex-wrap">
          <FilterChips currentType={currentType} currentStatus={currentStatus} />

          {/* View Toggle: List vs Card Mode */}
          <div className="flex items-center p-1 rounded-xl bg-card border border-line shadow-xs">
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === "list"
                  ? "bg-accent text-accent-foreground shadow-xs"
                  : "text-mut hover:text-tx hover:bg-card2"
              }`}
              title="List View (Full Rows)"
            >
              <List className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setViewMode("card")}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === "card"
                  ? "bg-accent text-accent-foreground shadow-xs"
                  : "text-mut hover:text-tx hover:bg-card2"
              }`}
              title="Card View (Grid Cards with Timeline)"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Display: List Mode or Card Mode */}
      {filtered.length > 0 ? (
        viewMode === "list" ? (
          /* 1. LIST VIEW: Full-Width Row Display */
          <div className="space-y-3">
            {filtered.map((ipo) => (
              <IpoRow key={ipo.slug} ipo={ipo} />
            ))}
          </div>
        ) : (
          /* 2. CARD VIEW: 3-Column Desktop Grid with 4-Stage Timeline */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {filtered.map((ipo) => (
              <IpoCard key={ipo.slug} ipo={ipo} />
            ))}
          </div>
        )
      ) : (
        <div className="text-center py-16 rounded-card bg-card border border-line">
          <p className="text-base font-semibold text-tx">No IPOs found</p>
          <p className="text-sm text-mut mt-1">
            Try adjusting your search query or switching filter tabs.
          </p>
        </div>
      )}
    </section>
  );
}
