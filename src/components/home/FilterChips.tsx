"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface FilterChipsProps {
  currentType: string; // 'All' | 'Mainboard' | 'SME'
  currentStatus: string; // 'Open' | 'Upcoming' | 'Listed' | 'Close Today'
}

export function FilterChips({ currentType = "All", currentStatus = "Open" }: FilterChipsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Group 1: Board Type (Single Select: All | Mainboard | SME)
  const boardTypes = [
    { key: "All", label: "All" },
    { key: "Mainboard", label: "Mainboard" },
    { key: "SME", label: "SME" },
  ];

  // Group 2: Status Category (Single Select: Open | Upcoming | Close Today | Listed)
  const statusCategories = [
    { key: "Open", label: "Open", isSpecial: false },
    { key: "Upcoming", label: "Upcoming", isSpecial: false },
    { key: "Close Today", label: "Close Today", isSpecial: true },
    { key: "Listed", label: "Listed", isSpecial: false },
  ];

  const updateFilters = (newType: string, newStatus: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newType === "All") {
      params.delete("type");
    } else {
      params.set("type", newType);
    }

    if (newStatus === "Open") {
      params.delete("status");
    } else {
      params.set("status", newStatus);
    }

    router.push(`/?${params.toString()}#all-ipos`, { scroll: false });
  };

  return (
    <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5 min-w-0">
      {/* Group 1: Board Type Selection (All, Mainboard, SME) */}
      <div className="grid grid-cols-3 sm:flex items-center gap-1 p-1 rounded-xl bg-card border border-line shadow-xs shrink-0">
        {boardTypes.map((t) => {
          const isSelected =
            (t.key === "All" && (!currentType || currentType === "All")) ||
            currentType?.toLowerCase() === t.key.toLowerCase();

          return (
            <button
              key={t.key}
              type="button"
              onClick={() => updateFilters(t.key, currentStatus || "Open")}
              className={`text-center px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap focus-visible:outline-none cursor-pointer ${
                isSelected
                  ? "bg-accent text-accent-foreground shadow-xs font-bold"
                  : "text-mut hover:text-tx hover:bg-card2"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Subtle Divider (Desktop only) */}
      <div className="h-5 w-[1px] bg-line/80 shrink-0 hidden lg:block" />

      {/* Group 2: Status Selection (Open, Upcoming, Close Today, Listed) */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-card border border-line shadow-xs overflow-x-auto scrollbar-none w-full sm:w-auto">
        {statusCategories.map((s) => {
          const isSelected =
            (s.key === "Open" && (!currentStatus || currentStatus === "Open")) ||
            currentStatus?.toLowerCase() === s.key.toLowerCase();

          let activeStyle = "bg-accent text-accent-foreground shadow-xs font-bold";
          if (s.isSpecial) {
            // Close Today special styling
            activeStyle = "bg-dn text-white font-bold shadow-xs";
          }

          let defaultStyle = "text-mut hover:text-tx hover:bg-card2";
          if (s.isSpecial && !isSelected) {
            defaultStyle = "text-dn hover:bg-dn/10 font-semibold";
          }

          return (
            <button
              key={s.key}
              type="button"
              onClick={() => updateFilters(currentType || "All", s.key)}
              className={`flex-1 sm:flex-initial text-center px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap focus-visible:outline-none cursor-pointer ${
                isSelected ? activeStyle : defaultStyle
              }`}
            >
              {s.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
