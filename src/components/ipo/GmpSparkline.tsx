import React, { useId } from "react";
import { formatINR } from "@/lib/format";

interface GmpSparklineProps {
  data?: number[];
  height?: number;
  width?: number;
  showLabels?: boolean;
}

export function GmpSparkline({
  data,
  height = 36,
  width = 120,
  showLabels = false,
}: GmpSparklineProps) {
  const reactId = useId();
  const gradientId = `sparkline-gradient-${reactId.replace(/:/g, "")}`;

  // Fallback if data is empty or single point
  const chartData = data && data.length >= 2 ? data : [0, 0];
  const isFallback = !data || data.length < 2;

  const min = Math.min(...chartData);
  const max = Math.max(...chartData);
  const range = max - min || 1;
  const padding = 4;

  const usableWidth = width - padding * 2;
  const usableHeight = height - padding * 2;

  // Generate SVG path coordinates
  const points = chartData.map((val, i) => {
    const x = padding + (i / (chartData.length - 1)) * usableWidth;
    const y = isFallback
      ? height / 2
      : height - padding - ((val - min) / range) * usableHeight;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const pathD = `M ${points.join(" L ")}`;

  // Area under path
  const firstPoint = points[0].split(",");
  const lastPoint = points[points.length - 1].split(",");
  const areaD = `${pathD} L ${lastPoint[0]},${height} L ${firstPoint[0]},${height} Z`;

  const isUp = chartData[chartData.length - 1] >= chartData[0];
  const strokeColor = isFallback ? "var(--mut)" : isUp ? "var(--up)" : "var(--dn)";

  return (
    <div
      className="flex flex-col items-center"
      role="img"
      aria-label={
        isFallback
          ? "GMP trend data updating"
          : `7-day GMP trend sparkline ranging from ${formatINR(min)} to ${formatINR(max)}`
      }
    >
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={strokeColor} stopOpacity={isFallback ? 0.08 : 0.28} />
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
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={isFallback ? "3,3" : "none"}
        />

        {/* Endpoint pulse dot */}
        <circle
          cx={lastPoint[0]}
          cy={lastPoint[1]}
          r="3"
          fill={strokeColor}
          stroke="var(--card)"
          strokeWidth="1.5"
        />
      </svg>

      {showLabels && !isFallback && (
        <div className="flex items-center justify-between w-full text-[11px] text-mut mt-1 tabular-nums font-heading font-semibold">
          <span>7D: {formatINR(chartData[0])}</span>
          <span>Now: {formatINR(chartData[chartData.length - 1])}</span>
        </div>
      )}
    </div>
  );
}
