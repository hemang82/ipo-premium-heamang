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
import { ChevronRight, Calendar, Lock } from "lucide-react";

interface IpoRowProps {
  ipo: Ipo;
}

export function IpoRow({ ipo }: IpoRowProps) {
  const percent = gmpPercent(ipo);
  const detailUrl = `/ipo/${ipo.slug}/${ipo.symbol}`;

  // Check GMP availability & dynamic heading
  const rawGmp = ipo.rawApiData?.gmp ?? (ipo.hasGmp !== false ? ipo.gmp : undefined);
  const rawHeading = (ipo.gmpHeading || ipo.rawApiData?.gmp_heading || "").trim();
  const hasGmpVal = rawGmp !== undefined && rawGmp !== null && rawGmp !== "" && rawGmp !== "-";
  const showGmpSection = hasGmpVal || Boolean(rawHeading);

  // Extract key dates
  const dates = ipo.dates || [];
  const openItem = dates.find((d) => d.label?.toLowerCase().includes("open")) || dates[0];
  const closeItem = dates.find((d) => d.label?.toLowerCase().includes("close")) || dates[1];

  const openDateFormatted = formatShortDate(openItem?.date || ipo.openDate);
  const closeDateFormatted = formatShortDate(closeItem?.date || ipo.closeDate);

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

  const parseItemDate = (dStr?: string) => {
    if (!dStr || dStr === "-" || dStr === "TBA") return null;
    const d = new Date(dStr);
    if (isNaN(d.getTime())) return null;
    return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  };

  const openTime = parseItemDate(openItem?.date || ipo.openDate);
  const closeTime = parseItemDate(closeItem?.date || ipo.closeDate);

  const isLiveOpen = Boolean(openTime && closeTime && today >= openTime && today <= closeTime);
  const isClosed = Boolean(closeTime && today > closeTime);

  // Issue size formatted
  const issueSizeText = ipo.issueSizeCr && ipo.issueSizeCr > 0
    ? `₹${ipo.issueSizeCr.toLocaleString("en-IN")} Cr`
    : ipo.rawApiData?.issue_size_cr
    ? `₹${Number(ipo.rawApiData.issue_size_cr).toLocaleString("en-IN")} Cr`
    : ipo.lotSize && ipo.issuePrice
    ? `₹${((ipo.lotSize * ipo.issuePrice * 1000) / 10000000).toFixed(1)} Cr`
    : "TBA";

  return (
    <Link
      href={detailUrl}
      prefetch={false}
      className="group block rounded-card bg-card border border-line p-4 sm:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(217,90,43,0.10)] hover:border-accent hover:-translate-y-[1px] transition-all duration-200 focus-visible:outline-none"
    >
      <div className="flex items-center justify-between gap-4 xl:gap-6">
        {/* 1. Company Name & Badges */}
        <div className="flex items-center gap-3.5 min-w-0 flex-1">
          <IpoLogo
            src={ipo.image || ipo.rawApiData?.ipo_image}
            name={ipo.name}
            className="w-12 h-12 rounded-xl group-hover:border-accent/50 group-hover:scale-105 transition-all shadow-inner shrink-0"
          />

          <div className="min-w-0">
            <h3 className="font-heading font-bold text-base sm:text-lg text-tx group-hover:text-accent transition-colors truncate tracking-tight mb-1.5">
              {ipo.name}
            </h3>
            <div className="flex items-center gap-2 flex-nowrap">
              <IpoBadgeHeader ipo={ipo} />
            </div>
          </div>
        </div>

        {/* 2. Open & Close Date */}
        <div className="hidden lg:flex flex-col justify-center border-l border-line/60 pl-4 xl:pl-6 shrink-0 min-w-[145px]">
          <span className="text-[11px] font-bold text-mut uppercase tracking-wider mb-1">
            Bidding Dates
          </span>
          {/* Open Date */}
          <div className="flex items-center gap-1.5 whitespace-nowrap mb-0.5">
            <span className={`text-[13px] font-bold capitalize flex items-center gap-1 ${isLiveOpen ? "text-accent" : "text-mut"}`}>
              <Calendar className={`w-3.5 h-3.5 ${isLiveOpen ? "text-accent" : "text-mut/70"}`} />
              Open:
            </span>
            <span className={`text-[13px] font-heading tabular-nums ${isLiveOpen ? "text-accent font-bold" : "text-tx font-semibold"}`}>
              {openDateFormatted}
            </span>
          </div>
          {/* Close Date */}
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <span className={`text-[13px] font-bold capitalize flex items-center gap-1 ${isClosed ? "text-accent" : "text-mut"}`}>
              <Lock className={`w-3.5 h-3.5 ${isClosed ? "text-accent" : "text-mut/70"}`} />
              Close:
            </span>
            <span className={`text-[13px] font-heading tabular-nums ${isClosed ? "text-accent font-bold" : "text-tx font-semibold"}`}>
              {closeDateFormatted}
            </span>
          </div>
        </div>

        {/* 3. Price Band */}
        <div className="hidden md:flex flex-col text-right shrink-0 min-w-[125px] justify-center border-l border-line/60 pl-4 xl:pl-6">
          <span className="text-[11px] font-bold text-mut uppercase tracking-wider mb-1">
            Price Band
          </span>
          <span className="text-[14px] font-heading font-semibold text-tx tabular-nums leading-tight">
            {ipo.priceBand}
          </span>
          <span className="text-[12px] text-mut font-medium mt-0.5">
            Lot: <strong className="text-tx font-semibold">{ipo.lotSize}</strong>
          </span>
        </div>

        {/* 4. Issue Size */}
        <div className="hidden sm:flex flex-col text-right shrink-0 min-w-[105px] justify-center border-l border-line/60 pl-4 xl:pl-6">
          <span className="text-[11px] font-bold text-mut uppercase tracking-wider mb-1">
            Issue Size
          </span>
          <span className="text-[14px] font-heading font-bold text-tx tabular-nums leading-tight">
            {issueSizeText}
          </span>
          <span className="text-[12px] text-mut font-medium mt-0.5">
            {ipo.board === "Mainboard" ? "Mainboard" : "SME"}
          </span>
        </div>

        {/* 5. Subscription */}
        <div className="hidden xl:flex flex-col text-right shrink-0 min-w-[105px] justify-center border-l border-line/60 pl-4 xl:pl-6">
          <span className="text-[11px] font-bold text-mut uppercase tracking-wider mb-1">
            Subscription
          </span>
          <span className="text-[14px] font-heading font-bold text-accent tabular-nums leading-tight">
            {formatSubscription(ipo.subscription?.total || 0)}
          </span>
          <span className="text-[12px] text-mut font-medium mt-0.5">
            Retail: {formatSubscription(ipo.subscription?.retail || 0)}
          </span>
        </div>

        {/* 6. Dynamic GMP (Only shown if gmp or gmp_heading exists; otherwise hidden) */}
        {showGmpSection && (
          <div className="flex flex-col items-end shrink-0 min-w-[105px] sm:min-w-[125px] justify-center border-l border-line/60 pl-4 xl:pl-6">
            {rawHeading ? (
              <span className="text-[11px] font-bold text-mut uppercase tracking-wider mb-1 max-w-[120px] truncate" title={rawHeading}>
                {rawHeading}
              </span>
            ) : null}
            {hasGmpVal ? (
              <div
                className={`flex items-baseline gap-1.5 px-3 py-1 rounded-lg border font-heading tabular-nums ${
                  ipo.gmp > 0
                    ? "bg-up/10 border-up/25 text-up"
                    : ipo.gmp < 0
                    ? "bg-dn/10 border-dn/25 text-dn"
                    : "bg-card2 border-line text-mut"
                }`}
              >
                <span className="text-[14px] font-semibold leading-tight">
                  {formatINR(ipo.gmp)}
                </span>
                <span className="text-[13px] font-semibold">
                  ({formatPercent(percent)})
                </span>
              </div>
            ) : (
              <span className="text-xs text-mut font-medium">-</span>
            )}
          </div>
        )}

        {/* Far Right: Arrow */}
        <div className="text-mut/60 group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0 pl-1">
          <ChevronRight className="w-5 h-5" />
        </div>
      </div>
    </Link>
  );
}
