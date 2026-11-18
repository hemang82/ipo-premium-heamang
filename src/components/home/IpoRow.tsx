import Link from "next/link";
import { Ipo } from "@/lib/types";
import {
  formatINR,
  formatPercent,
  gmpPercent,
  formatSubscription,
  formatIpoDate,
  formatIpoDateRange,
  formatShortDate,
} from "@/lib/format";
import { IpoBadgeHeader } from "@/components/ui/IpoBadgeHeader";
import { IpoLogo } from "@/components/ipo/IpoLogo";
import { Progress } from "@/components/ui/Progress";
import { ChevronRight, Calendar, Lock, ShieldCheck, CheckCircle2 } from "lucide-react";

interface IpoRowProps {
  ipo: Ipo;
}

export function IpoRow({ ipo }: IpoRowProps) {
  const percent = gmpPercent(ipo);
  const detailUrl = `/ipo/${ipo.slug}/${ipo.symbol}/`;

  // Extract key dates
  const dates = ipo.dates || [];
  const openItem = dates.find((d) => d.label?.toLowerCase().includes("open")) || dates[0];
  const closeItem = dates.find((d) => d.label?.toLowerCase().includes("close")) || dates[1];
  const allotmentItem = dates.find((d) => d.label?.toLowerCase().includes("allot")) || dates[2];
  const listingItem =
    dates.find((d) => d.label?.toLowerCase().includes("list")) ||
    dates[3] ||
    dates[dates.length - 1];

  const offerDateFormatted = formatIpoDateRange(
    openItem?.date || ipo.openDate,
    closeItem?.date || ipo.closeDate
  );
  const openDateFormatted = formatShortDate(openItem?.date || ipo.openDate);
  const closeDateFormatted = formatShortDate(closeItem?.date || ipo.closeDate);
  const allotmentDateFormatted = formatShortDate(allotmentItem?.date || ipo.allotmentDate);
  const listingDateFormatted = formatShortDate(listingItem?.date || ipo.listingDate);

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
  const allotTime = parseItemDate(allotmentItem?.date || ipo.allotmentDate);
  const listingTime = parseItemDate(listingItem?.date || ipo.listingDate);

  // Chronologically Accurate Stage Determination:
  // If upcoming (today < openTime), none of the stages are marked active (avoids false Open highlights)
  const isLiveOpen = Boolean(openTime && closeTime && today >= openTime && today <= closeTime);
  const isClosed = Boolean(closeTime && today > closeTime && (!allotTime || today < allotTime));
  const isAllotOut = Boolean(allotTime && today >= allotTime && (!listingTime || today < listingTime));
  const isListed = Boolean(listingTime && today >= listingTime);

  return (
    <Link
      href={detailUrl}
      className="group block rounded-card bg-card border border-line p-4 sm:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(217,90,43,0.10)] hover:border-accent hover:-translate-y-[1px] transition-all duration-200 focus-visible:outline-none"
    >
      <div className="flex items-center justify-between gap-4 xl:gap-6">
        {/* 1. Left: Avatar + Company Name + Badges */}
        <div className="flex items-center gap-3.5 min-w-0 flex-1">
          <IpoLogo
            src={ipo.image || ipo.rawApiData?.ipo_image}
            name={ipo.name}
            className="w-12 h-12 rounded-xl group-hover:border-accent/50 group-hover:scale-105 transition-all shadow-inner shrink-0"
          />

          <div className="min-w-0">
            {/* Company Name */}
            <h3 className="font-heading font-bold text-base sm:text-lg text-tx group-hover:text-accent transition-colors truncate tracking-tight mb-1.5">
              {ipo.name}
            </h3>

            {/* Badges on ONE clean line */}
            <div className="flex items-center gap-2 flex-nowrap">
              <IpoBadgeHeader ipo={ipo} />

              {/* Mobile / Tablet inline date hint */}
              <span className="lg:hidden text-xs text-mut flex items-center gap-1.5 ml-1">
                <Calendar className="w-3.5 h-3.5 text-accent" />
                {offerDateFormatted}
              </span>
            </div>
          </div>
        </div>

        {/* 2. Column 1: Bidding Period (Open & Close) */}
        <div className="hidden lg:flex flex-col justify-center border-l border-line/60 pl-4 xl:pl-6 shrink-0 min-w-[155px]">
          <span className="text-[11px] font-bold text-mut uppercase tracking-wider mb-1">
            Bidding Period
          </span>
          {/* Open Date */}
          <div className="flex items-center gap-1.5 whitespace-nowrap mb-0.5">
            <span
              className={`text-[13px] font-bold capitalize flex items-center gap-1 ${
                isLiveOpen ? "text-accent" : "text-mut"
              }`}
            >
              <Calendar className={`w-3.5 h-3.5 ${isLiveOpen ? "text-accent" : "text-mut/70"}`} />
              Open:
            </span>
            <span
              className={`text-[14px] font-heading tabular-nums ${
                isLiveOpen ? "text-accent font-bold" : "text-tx font-semibold"
              }`}
            >
              {openDateFormatted}
            </span>
          </div>
          {/* Close Date */}
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <span
              className={`text-[13px] font-bold capitalize flex items-center gap-1 ${
                isClosed ? "text-accent" : "text-mut"
              }`}
            >
              <Lock className={`w-3.5 h-3.5 ${isClosed ? "text-accent" : "text-mut/70"}`} />
              Close:
            </span>
            <span
              className={`text-[14px] font-heading tabular-nums ${
                isClosed ? "text-accent font-bold" : "text-tx font-semibold"
              }`}
            >
              {closeDateFormatted}
            </span>
          </div>
        </div>

        {/* 3. Column 2: Milestones (Allot & List) */}
        <div className="hidden xl:flex flex-col justify-center border-l border-line/60 pl-4 xl:pl-6 shrink-0 min-w-[155px]">
          <span className="text-[11px] font-bold text-mut uppercase tracking-wider mb-1">
            Allot & Listing
          </span>
          {/* Allot Date */}
          <div className="flex items-center gap-1.5 whitespace-nowrap mb-0.5">
            <span
              className={`text-[13px] font-bold capitalize flex items-center gap-1 ${
                isAllotOut ? "text-accent" : "text-mut"
              }`}
            >
              <ShieldCheck className={`w-3.5 h-3.5 ${isAllotOut ? "text-accent" : "text-mut/70"}`} />
              Allot:
            </span>
            <span
              className={`text-[14px] font-heading tabular-nums ${
                isAllotOut ? "text-accent font-bold" : "text-tx font-semibold"
              }`}
            >
              {allotmentDateFormatted}
            </span>
          </div>
          {/* List Date */}
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <span
              className={`text-[13px] font-bold capitalize flex items-center gap-1 ${
                isListed ? "text-accent" : "text-mut"
              }`}
            >
              <CheckCircle2 className={`w-3.5 h-3.5 ${isListed ? "text-accent" : "text-mut/70"}`} />
              List:
            </span>
            <span
              className={`text-[14px] font-heading tabular-nums ${
                isListed ? "text-accent font-bold" : "text-tx font-semibold"
              }`}
            >
              {listingDateFormatted}
            </span>
          </div>
        </div>

        {/* 4. Column 3: Price Band */}
        <div className="hidden md:flex flex-col text-right shrink-0 min-w-[130px] justify-center border-l border-line/60 pl-4 xl:pl-6">
          <span className="text-[11px] font-bold text-mut uppercase tracking-wider mb-1">
            Price Band
          </span>
          <span className="text-[14px] font-heading font-semibold text-tx tabular-nums leading-tight">
            {ipo.priceBand}
          </span>
          <span className="text-[13px] text-mut font-medium mt-0.5">
            Lot: <strong className="text-tx font-semibold">{ipo.lotSize}</strong> shares
          </span>
        </div>

        {/* 5. Column 4: Subscription */}
        <div className="hidden 2xl:flex flex-col shrink-0 w-36 justify-center border-l border-line/60 pl-4 xl:pl-6">
          <div className="flex items-center justify-between text-[13px] mb-1">
            <span className="text-mut font-medium">Subscribed</span>
            <span className="font-heading font-semibold text-tx tabular-nums">
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
          <div className="flex items-center justify-between text-[13px] text-mut mt-1">
            <span>Retail</span>
            <span className="font-semibold text-tx tabular-nums">
              {formatSubscription(ipo.subscription.retail)}
            </span>
          </div>
        </div>

        {/* 6. Column 5: GMP Today */}
        <div className="flex flex-col items-end shrink-0 min-w-[105px] sm:min-w-[125px] justify-center border-l border-line/60 pl-4 xl:pl-6">
          <span className="text-[11px] font-bold text-mut uppercase tracking-wider mb-1">
            GMP Today
          </span>
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
        </div>

        {/* 7. Far Right: Chevron */}
        <div className="text-mut/60 group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0 pl-1">
          <ChevronRight className="w-5 h-5" />
        </div>
      </div>
    </Link>
  );
}
