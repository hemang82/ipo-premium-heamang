"use client";

import Link from "next/link";
import { formatINR, formatPercent, gmpPercent } from "@/lib/format";
import { Ipo } from "@/lib/types";
import { CheckCircle, Sparkles } from "lucide-react";

interface MobileStickyBarProps {
  ipo: Ipo;
  registrarName?: string;
}

export function MobileStickyBar({ ipo, registrarName }: MobileStickyBarProps) {
  if (!ipo) return null;

  const pct = gmpPercent(ipo);

  // Direct internal route for registrar verification
  const getInternalAllotmentLink = (name?: string) => {
    const lower = (name || "").toLowerCase();
    if (lower.includes("link intime") || lower.includes("linkintime")) return "/allotment/link-intime";
    if (lower.includes("kfin") || lower.includes("karvy")) return "/allotment/kfintech";
    if (lower.includes("bigshare")) return "/allotment/bigshare";
    if (lower.includes("skyline")) return "/allotment/skyline";
    if (lower.includes("bse")) return "/allotment/bse-india";
    return "/allotment";
  };

  const allotmentHref = getInternalAllotmentLink(registrarName || ipo.registrar);

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-line p-3 px-4 shadow-[0_-8px_24px_rgba(0,0,0,0.12)]">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        {/* Left: Compact Live GMP Indicator */}
        <div className="flex flex-col justify-center min-w-[100px] shrink-0">
          <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-mut">
            <Sparkles className="w-3 h-3 text-accent" />
            <span>Live GMP</span>
          </div>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-base font-heading font-black text-up tabular-nums leading-none">
              {formatINR(ipo.gmp)}
            </span>
            <span className="text-[11px] font-bold text-up tabular-nums">
              ({formatPercent(pct)})
            </span>
          </div>
        </div>

        {/* Right: Direct 1-Click Allotment Action Button */}
        <Link
          href={allotmentHref}
          className="flex-1 flex items-center justify-center gap-1.5 h-11 px-4 rounded-xl bg-accent text-accent-foreground text-xs font-heading font-bold shadow-sm active:scale-95 transition-transform"
        >
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span className="truncate">Check Allotment Status</span>
        </Link>
      </div>
    </div>
  );
}
