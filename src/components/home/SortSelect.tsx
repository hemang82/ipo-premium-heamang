"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowUpDown } from "lucide-react";

interface SortSelectProps {
  currentSort: string;
}

export function SortSelect({ currentSort }: SortSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (val === "default") {
      params.delete("sort");
    } else {
      params.set("sort", val);
    }
    router.push(`/?${params.toString()}#all-ipos`, { scroll: false });
  };

  return (
    <div className="relative inline-flex items-center">
      <div className="absolute left-3 pointer-events-none text-mut">
        <ArrowUpDown className="w-3.5 h-3.5" />
      </div>
      <select
        aria-label="Sort IPOs by"
        value={currentSort || "default"}
        onChange={handleSortChange}
        className="appearance-none bg-card border border-line rounded-btn pl-8 pr-8 py-1.5 text-xs font-semibold text-tx focus:outline-none hover:border-mut/40 cursor-pointer"
      >
        <option value="default">Sort by: Default</option>
        <option value="gmp">Highest GMP %</option>
        <option value="subscription">Most Subscribed</option>
        <option value="name">Company Name (A-Z)</option>
      </select>
    </div>
  );
}
