"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface FilterChipsProps {
  currentStatus: string; // 'Open' | 'Upcoming' | 'Close Today' | 'Listed'
  onStatusChange?: (newStatus: string) => void;
}

export function FilterChips({ currentStatus = "Open", onStatusChange }: FilterChipsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Status Category Tabs (Single unified row)
  const statusCategories = [
    { key: "Open", label: "Open IPOs", isSpecial: false },
    { key: "Upcoming", label: "Upcoming IPOs", isSpecial: false },
    { key: "Close Today", label: "Close Today", isSpecial: true },
    { key: "Listed", label: "Recently Listed", isSpecial: false },
  ];

  const updateStatusFilter = (newStatus: string) => {
    // 1. Instant 0ms Local UI Switch
    if (onStatusChange) {
      onStatusChange(newStatus);
    }

    // 2. Sync URL in background without blocking or reloading
    const params = new URLSearchParams(searchParams.toString());
    params.delete("type");

    if (newStatus === "Open") {
      params.delete("status");
    } else {
      params.set("status", newStatus);
    }

    const queryStr = params.toString();
    const newUrl = queryStr ? `/?${queryStr}#all-ipos` : `/#all-ipos`;
    window.history.replaceState(null, "", newUrl);
  };

  return (
    <div className="w-full sm:w-auto flex items-center gap-1 p-1 rounded-xl bg-card border border-line shadow-xs overflow-x-auto scrollbar-none">
      {statusCategories.map((s) => {
        const isSelected =
          (s.key === "Open" && (!currentStatus || currentStatus === "Open")) ||
          currentStatus?.toLowerCase() === s.key.toLowerCase();

        let activeStyle = "bg-accent text-accent-foreground shadow-xs font-bold";
        if (s.isSpecial) {
          activeStyle = "bg-dn text-white font-bold shadow-xs";
        }

        let defaultStyle = "text-mut hover:text-tx hover:bg-card2 font-medium";
        if (s.isSpecial && !isSelected) {
          defaultStyle = "text-dn hover:bg-dn/10 font-semibold";
        }

        return (
          <button
            key={s.key}
            type="button"
            onClick={() => updateStatusFilter(s.key)}
            className={`text-center px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm transition-all whitespace-nowrap focus-visible:outline-none cursor-pointer ${
              isSelected ? activeStyle : defaultStyle
            }`}
          >
            {s.label}
          </button>
        );
      })}
    </div>
  );
}
