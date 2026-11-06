import React from "react";
import { GmpSignal } from "@/lib/types";

interface GmpRingProps {
  percent: number;
  signal: GmpSignal;
  size?: number;
}

export function GmpRing({ percent, signal, size = 110 }: GmpRingProps) {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Max visual scale capped at 100%
  const visualPercent = Math.min(Math.max(percent, 0), 100);
  const strokeDashoffset = circumference - (visualPercent / 100) * circumference;

  let strokeColor = "var(--mut)";
  if (signal === "Strong") strokeColor = "var(--up)";
  else if (signal === "Neutral") strokeColor = "#FBBF24";
  else if (signal === "Weak") strokeColor = "var(--dn)";

  return (
    <div
      className="relative flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`GMP strength meter: ${percent}% listing gain, rated ${signal}`}
    >
      <svg width={size} height={size} className="rotate-[-90deg]">
        {/* Background track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--line)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Animated Progress ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          className="transition-all duration-700 ease-out"
        />
      </svg>

      {/* Center Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-base font-heading font-extrabold text-tx tabular-nums leading-none">
          {percent > 0 ? `+${percent}%` : `${percent}%`}
        </span>
        <span className="text-xs text-mut font-medium mt-0.5">
          {signal}
        </span>
      </div>
    </div>
  );
}
