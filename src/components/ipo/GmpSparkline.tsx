import React from "react";
import { formatINR } from "@/lib/format";

interface GmpSparklineProps {
  data: number[];
  height?: number;
  width?: number;
}

export function GmpSparkline({ data, height = 50, width = 200 }: GmpSparklineProps) {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padding = 6;

  const usableWidth = width - padding * 2;
  const usableHeight = height - padding * 2;

  // Generate SVG path coordinates
  const points = data.map((val, i) => {
    const x = padding + (i / (data.length - 1)) * usableWidth;
    const y = height - padding - ((val - min) / range) * usableHeight;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const pathD = `M ${points.join(" L ")}`;

  // Area under path
  const firstPoint = points[0].split(",");
  const lastPoint = points[points.length - 1].split(",");
  const areaD = `${pathD} L ${lastPoint[0]},${height} L ${firstPoint[0]},${height} Z`;

  const isUp = data[data.length - 1] >= data[0];
  const strokeColor = isUp ? "var(--up)" : "var(--dn)";
  const gradientId = `sparkline-gradient-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div
      className="flex flex-col"
      role="img"
      aria-label={`7-day GMP trend sparkline ranging from ${formatINR(min)} to ${formatINR(max)}`}
    >
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={strokeColor} stopOpacity="0.25" />
            <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Shaded Area */}
        <path d={areaD} fill={`url(#${gradientId})`} />

        {/* Trend Line */}
        <path
          d={pathD}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Endpoint pulse dot */}
        <circle
          cx={lastPoint[0]}
          cy={lastPoint[1]}
          r="3.5"
          fill={strokeColor}
          stroke="var(--card)"
          strokeWidth="1.5"
        />
      </svg>
      <div className="flex items-center justify-between text-xs text-mut mt-1 tabular-nums">
        <span>7 days ago: {formatINR(data[0])}</span>
        <span>Latest: {formatINR(data[data.length - 1])}</span>
      </div>
    </div>
  );
}
