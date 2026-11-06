import { IpoStats } from "@/lib/ipo-service";
import { formatINR, formatPercent, formatSubscription } from "@/lib/format";
import { TrendingUp, Activity, Users, Layers } from "lucide-react";

interface StatTilesProps {
  stats: IpoStats;
}

export function StatTiles({ stats }: StatTilesProps) {
  const tiles = [
    {
      label: "Open now",
      value: `${stats.openCount} IPOs`,
      detail: "Accepting bids today",
      icon: Activity,
      highlightColor: "text-up",
      glowColor: "from-up/10",
    },
    {
      label: "Highest GMP",
      value: `+${stats.highestGmp.gmpPercent}%`,
      detail: `${stats.highestGmp.ipoName} (${formatINR(stats.highestGmp.gmpInr)})`,
      icon: TrendingUp,
      highlightColor: "text-accent",
      glowColor: "from-accent/10",
    },
    {
      label: "Avg. subscription",
      value: formatSubscription(stats.avgSubscription),
      detail: "Overall demand across books",
      icon: Users,
      highlightColor: "text-tx",
      glowColor: "from-blue-500/10",
    },
    {
      label: "IPOs tracked",
      value: `${stats.totalTracked}`,
      detail: "Mainboard & SME active",
      icon: Layers,
      highlightColor: "text-tx",
      glowColor: "from-purple-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 my-8 max-w-7xl mx-auto px-4">
      {tiles.map((tile, i) => {
        const Icon = tile.icon;
        return (
          <div
            key={i}
            className="relative overflow-hidden rounded-card bg-card border border-line p-4 sm:p-5 flex flex-col justify-between group hover:border-line/80 transition-all shadow-sm"
          >
            {/* Top Row: Icon & Label */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs sm:text-sm font-medium text-mut">
                {tile.label}
              </span>
              <div className="w-8 h-8 rounded-lg bg-card2 border border-line flex items-center justify-center text-mut group-hover:text-accent transition-colors">
                <Icon className="w-4 h-4" />
              </div>
            </div>

            {/* Metric Value */}
            <div>
              <div className={`text-2xl sm:text-3xl font-heading font-extrabold tracking-tightest tabular-nums ${tile.highlightColor}`}>
                {tile.value}
              </div>
              <p className="text-xs sm:text-xs text-mut/80 mt-1 truncate">
                {tile.detail}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
