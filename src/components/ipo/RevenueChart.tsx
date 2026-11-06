import { IpoFinancial } from "@/lib/types";

interface RevenueChartProps {
  financials: IpoFinancial[];
}

export function RevenueChart({ financials }: RevenueChartProps) {
  if (!financials || financials.length === 0) return null;

  const maxRevenue = Math.max(...financials.map((f) => f.revenueCr)) * 1.15;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-mut pb-2 border-b border-line">
        <span>Year (Standalone / Consolidated)</span>
        <span>Revenue (₹ Crores)</span>
      </div>

      <div className="space-y-3">
        {financials.map((item, idx) => {
          const widthPercent = Math.min((item.revenueCr / maxRevenue) * 100, 100);

          return (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-tx">{item.year}</span>
                <span className="text-accent tabular-nums">
                  ₹{item.revenueCr} Cr
                  {item.patCr ? ` (PAT: ₹${item.patCr} Cr)` : ""}
                </span>
              </div>
              <div className="h-3 w-full bg-card2 rounded-full overflow-hidden border border-line/40">
                <div
                  className="h-full bg-gradient-to-r from-accent/80 to-accent rounded-full transition-all duration-500"
                  style={{ width: `${widthPercent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
