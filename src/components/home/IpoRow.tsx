import Link from "next/link";
import { Ipo } from "@/lib/types";
import { formatINR, formatPercent, gmpPercent, formatSubscription } from "@/lib/format";
import { IpoBadgeHeader } from "@/components/ui/IpoBadgeHeader";
import { IpoLogo } from "@/components/ipo/IpoLogo";
import { Progress } from "@/components/ui/Progress";
import { ChevronRight } from "lucide-react";

interface IpoRowProps {
  ipo: Ipo;
}

export function IpoRow({ ipo }: IpoRowProps) {
  const percent = gmpPercent(ipo);
  const detailUrl = `/ipo/${ipo.slug}/${ipo.symbol}/`;
  const firstLetter = ipo.name.charAt(0).toUpperCase();

  return (
    <Link
      href={detailUrl}
      className="group block rounded-card bg-card border border-line p-4 md:p-4.5 shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(217,90,43,0.12)] hover:border-accent hover:-translate-y-[1.5px] transition-all duration-200 focus-visible:outline-none"
    >
      <div className="flex items-center justify-between gap-4 md:gap-6">
        {/* Left: Avatar + Name + Badges */}
        <div className="flex items-center gap-3.5 min-w-0 flex-1">
          {/* Company Logo / Avatar */}
          <IpoLogo
            src={ipo.image || ipo.rawApiData?.ipo_image}
            name={ipo.name}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl group-hover:border-accent/50 group-hover:scale-105 transition-all shadow-inner"
          />

          <div className="min-w-0">
            {/* Row 1: Company Name */}
            <div className="mb-1.5">
              <h3 className="font-heading font-bold text-base sm:text-lg text-tx group-hover:text-accent transition-colors truncate tracking-tight">
                {ipo.name}
              </h3>
            </div>

            {/* Row 2: Standardized Type & Status Badges */}
            <IpoBadgeHeader ipo={ipo} />
          </div>
        </div>

        {/* Center: Price Band Column (Strict Column Alignment) */}
        <div className="hidden md:flex flex-col text-right shrink-0 min-w-[130px] justify-center">
          <span className="text-xs font-semibold text-mut uppercase tracking-wider mb-0.5">
            Price Band
          </span>
          <span className="text-sm sm:text-base font-heading font-bold text-tx tabular-nums leading-tight font-mono">
            {ipo.priceBand}
          </span>
          <span className="text-xs text-mut font-medium mt-0.5">
            Lot: <strong className="text-tx/90 font-mono">{ipo.lotSize}</strong> shares
          </span>
        </div>

        {/* Center-Right: Subscription Progress Bar */}
        <div className="hidden lg:flex flex-col shrink-0 w-36 xl:w-40 justify-center">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-mut font-medium">Subscribed</span>
            <span className="font-heading font-bold text-tx tabular-nums font-mono">
              {formatSubscription(ipo.subscription.total)}
            </span>
          </div>
          <Progress
            value={ipo.subscription.total}
            max={25}
            indicatorClassName={
              ipo.subscription.total >= 10
                ? "bg-accent"
                : ipo.subscription.total > 0
                ? "bg-up"
                : "bg-mut/30"
            }
          />
          <div className="flex items-center justify-between text-xs text-mut mt-1">
            <span>Retail</span>
            <span className="font-semibold text-tx/90 tabular-nums font-mono">
              {formatSubscription(ipo.subscription.retail)}
            </span>
          </div>
        </div>

        {/* Right: GMP Today - Highlight Card / Pill */}
        <div className="flex flex-col items-end shrink-0 min-w-[100px] sm:min-w-[125px] justify-center">
          <span className="text-xs font-semibold text-mut uppercase tracking-wider mb-1">
            GMP Today
          </span>
          <div
            className={`flex flex-col items-end px-2.5 py-1 rounded-xl border transition-colors font-mono tabular-nums ${
              ipo.gmp > 0
                ? "bg-up/10 border-up/25 text-up"
                : ipo.gmp < 0
                ? "bg-dn/10 border-dn/25 text-dn"
                : "bg-card2 border-line text-mut"
            }`}
          >
            <span className="text-base sm:text-lg font-heading font-bold leading-tight">
              {formatINR(ipo.gmp)}
            </span>
            <span className="text-xs font-bold">
              {formatPercent(percent)}
            </span>
          </div>
        </div>

        {/* Far Right: Chevron arrow */}
        <div className="text-mut/60 group-hover:text-accent transition-colors shrink-0">
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
