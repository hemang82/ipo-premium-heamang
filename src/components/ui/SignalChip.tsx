import React from "react";
import { GmpSignal } from "@/lib/types";

interface SignalChipProps {
  signal: GmpSignal;
  className?: string;
}

export function SignalChip({ signal, className = "" }: SignalChipProps) {
  let badgeStyles = "bg-mut/10 text-mut border-line";

  if (signal === "Strong") {
    badgeStyles = "bg-up/10 text-up border-up/30";
  } else if (signal === "Neutral") {
    badgeStyles = "bg-amber-400/10 text-amber-400 border-amber-400/30";
  } else if (signal === "Weak") {
    badgeStyles = "bg-dn/10 text-dn border-dn/30";
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeStyles} ${className}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          signal === "Strong"
            ? "bg-up"
            : signal === "Neutral"
            ? "bg-amber-400"
            : "bg-dn"
        }`}
      />
      {signal}
    </span>
  );
}
