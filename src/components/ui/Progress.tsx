import React from "react";

interface ProgressProps {
  value: number; // e.g. 14.8x or percentage
  max?: number;
  className?: string;
  indicatorClassName?: string;
}

export function Progress({
  value,
  max = 20,
  className = "",
  indicatorClassName = "bg-accent",
}: ProgressProps) {
  // Cap at 100% for visual width
  const percentage = Math.min(Math.max((value / max) * 100, 3), 100);

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className={`h-2 w-full overflow-hidden rounded-full bg-card2 border border-line/40 ${className}`}
    >
      <div
        className={`h-full transition-all duration-300 rounded-full ${indicatorClassName}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
