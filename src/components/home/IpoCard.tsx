import Link from "next/link";
import { Ipo } from "@/lib/types";
import {
  formatINR,
  formatPercent,
  gmpPercent,
  formatSubscription,
  formatShortDate,
} from "@/lib/format";
import { IpoBadgeHeader } from "@/components/ui/IpoBadgeHeader";
import { IpoLogo } from "@/components/ipo/IpoLogo";
import { Calendar, Lock } from "lucide-react";

interface IpoCardProps {
  ipo: Ipo;
}

export function IpoCard({ ipo }: IpoCardProps) {
  const percent = gmpPercent(ipo);
  const detailUrl = `/ipo/${ipo.slug}/${ipo.symbol}`;

  // Extract key dates
  const dates = ipo.dates || [];
  const openItem = dates.find((d) => d.label?.toLowerCase().includes("open")) || dates[0];
  const closeItem = dates.find((d) => d.label?.toLowerCase().includes("close")) || dates[1];

  const openDateFormatted = formatShortDate(openItem?.date || ipo.openDate);
  const closeDateFormatted = formatShortDate(closeItem?.date || ipo.closeDate);

  // Issue size formatted
  const issueSizeText = ipo.issueSizeCr && ipo.issueSizeCr > 0
    ? `₹${ipo.issueSizeCr.toLocaleString("en-IN")} Cr`
    : ipo.rawApiData?.issue_size_cr
    ? `₹${Number(ipo.rawApiData.issue_size_cr).toLocaleString("en-IN")} Cr`
    : ipo.lotSize && ipo.issuePrice
    ? `₹${((ipo.lotSize * ipo.issuePrice * 1000) / 10000000).toFixed(1)} Cr`
    : "TBA";

  // Check GMP availability & dynamic heading
  const rawGmp = ipo.rawApiData?.gmp ?? (ipo.hasGmp !== false ? ipo.gmp : undefined);
  const rawHeading = (ipo.gmpHeading || ipo.rawApiData?.gmp_heading || "").trim();
  const hasGmpVal = rawGmp !== undefined && rawGmp !== null && rawGmp !== "" && rawGmp !== "-";
  const showGmpSection = hasGmpVal || Boolean(rawHeading);

  return (
    <Link
      href={detailUrl}
      prefetch={false}
      className="group block rounded-card bg-card border border-line p-4 sm:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(217,90,43,0.12)] hover:border-accent hover:-translate-y-[1.5px] transition-all duration-200 flex flex-col justify-between"
    >
      <div>
        {/* 1. Header: Logo + Name + Unified Badges */}
        <div className="flex items-center gap-3.5 mb-3.5">
          <IpoLogo
            src={ipo.image || ipo.rawApiData?.ipo_image}
            name={ipo.name}
            className="w-12 h-12 rounded-xl group-hover:border-accent/50 group-hover:scale-105 transition-all shadow-inner shrink-0"
          />

          <div className="min-w-0 flex-1">
            <h3 className="font-heading font-bold text-base text-tx group-hover:text-accent transition-colors truncate tracking-tight mb-1">
              {ipo.name}
            </h3>
            <IpoBadgeHeader ipo={ipo} />
          </div>
        </div>

        {/* 2. Spotlight: Dynamic GMP & Subscription (Hides GMP or entire spotlight cleanly) */}
        {showGmpSection ? (
          <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-card2/50 border border-line">
            {/* Dynamic GMP Section */}
            <div className="flex flex-col justify-center">
              {rawHeading ? (
                <span className="text-xs font-semibold text-mut uppercase tracking-wider block mb-1 truncate" title={rawHeading}>
                  {rawHeading}
                </span>
              ) : null}
              {hasGmpVal ? (
                <div className="flex items-baseline gap-1.5 font-heading tabular-nums">
                  <span className={`text-[15px] font-heading font-bold leading-none ${ipo.gmp >= 0 ? "text-up" : "text-dn"}`}>
                    {formatINR(ipo.gmp)}
                  </span>
                  <span className={`text-xs font-semibold leading-none ${ipo.gmp >= 0 ? "text-up" : "text-dn"}`}>
                    ({formatPercent(percent)})
                  </span>
                </div>
              ) : (
                <span className="text-xs text-mut font-medium">-</span>
              )}
            </div>

            {/* Subscription Demand */}
            <div className="border-l border-line/60 pl-3">
              <span className="text-xs font-semibold text-mut uppercase tracking-wider block mb-1">
                Subscription
              </span>
              <div className="flex items-baseline gap-1.5 font-heading tabular-nums">
                <span className="text-[15px] font-heading font-bold leading-none text-accent">
                  {formatSubscription(ipo.subscription?.total || 0)}
                </span>
                <span className="text-xs text-mut font-medium leading-none">
                  Demand
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-card2/50 border border-line flex items-center justify-between">
            <span className="text-xs font-semibold text-mut uppercase tracking-wider">
              Subscription Demand
            </span>
            <div className="flex items-baseline gap-1.5 font-heading tabular-nums">
              <span className="text-[15px] font-heading font-bold leading-none text-accent">
                {formatSubscription(ipo.subscription?.total || 0)}
              </span>
              <span className="text-xs text-mut font-medium leading-none">
                Demand
              </span>
            </div>
          </div>
        )}

        {/* 3. Core 4 Metrics: Open Date, Close Date, Price Band, Issue Size */}
        <div className="space-y-2 text-xs sm:text-sm mt-3.5 mb-1">
          {/* Open Date */}
          <div className="flex items-center justify-between pb-1.5 border-b border-line/40">
            <span className="text-mut font-medium flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-accent" />
              Open Date
            </span>
            <span className="font-semibold text-tx font-heading tabular-nums">
              {openDateFormatted}
            </span>
          </div>

          {/* Close Date */}
          <div className="flex items-center justify-between pb-1.5 border-b border-line/40">
            <span className="text-mut font-medium flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-mut/80" />
              Close Date
            </span>
            <span className="font-semibold text-tx font-heading tabular-nums">
              {closeDateFormatted}
            </span>
          </div>

          {/* Price Band */}
          <div className="flex items-center justify-between pb-1.5 border-b border-line/40">
            <span className="text-mut font-medium">Price Band</span>
            <span className="font-semibold text-tx font-heading tabular-nums">
              {ipo.priceBand}
            </span>
          </div>

          {/* Issue Size */}
          <div className="flex items-center justify-between">
            <span className="text-mut font-medium">Issue Size</span>
            <span className="font-bold text-tx font-heading tabular-nums">
              {issueSizeText}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
