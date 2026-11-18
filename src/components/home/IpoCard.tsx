import Link from "next/link";
import { Ipo } from "@/lib/types";
import { formatINR, formatPercent, gmpPercent, formatSubscription, formatIpoDate, formatIpoDateRange, formatShortDate } from "@/lib/format";
import { IpoBadgeHeader } from "@/components/ui/IpoBadgeHeader";
import { IpoLogo } from "@/components/ipo/IpoLogo";
import {
  Calendar,
  Lock,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

interface IpoCardProps {
  ipo: Ipo;
}

export function IpoCard({ ipo }: IpoCardProps) {
  const percent = gmpPercent(ipo);
  const detailUrl = `/ipo/${ipo.slug}/${ipo.symbol}/`;
  const firstLetter = ipo.name.charAt(0).toUpperCase();

  // Extract key dates
  const dates = ipo.dates || [];
  const openItem = dates.find((d) => d.label?.toLowerCase().includes("open")) || dates[0];
  const closeItem = dates.find((d) => d.label?.toLowerCase().includes("close")) || dates[1];
  const allotmentItem = dates.find((d) => d.label?.toLowerCase().includes("allot")) || dates[2];
  const listingItem = dates.find((d) => d.label?.toLowerCase().includes("list")) || dates[3] || dates[dates.length - 1];

  const offerDateFormatted = formatIpoDateRange(
    openItem?.date || ipo.openDate,
    closeItem?.date || ipo.closeDate
  );

  const allotmentDateFormatted = formatIpoDate(allotmentItem?.date || ipo.allotmentDate);

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

  // Chronologically Strict Stage Index
  let currentStageIndex = 0;
  let isUpcoming = false;

  if (openTime && today < openTime) {
    // Stage 1: Upcoming - Bidding has not opened yet
    isUpcoming = true;
    currentStageIndex = 0; // Highlight OPEN as upcoming target
  } else if (listingTime && today >= listingTime) {
    // Stage 4: Listed
    currentStageIndex = 3;
  } else if (allotTime && today >= allotTime) {
    // Stage 3: Allotment is out
    currentStageIndex = 2;
  } else if (closeTime && today > closeTime) {
    // Stage 2: Bidding closed, allotment awaited
    currentStageIndex = 1;
  } else {
    // Stage 1: Live Bidding
    currentStageIndex = 0;
  }

  // The 4 True IPO Milestones: Open -> Close -> Allot -> Listed (Without year: "19 Nov")
  const stages = [
    { label: "Open", date: formatShortDate(openItem?.date || ipo.openDate), icon: Calendar },
    { label: "Close", date: formatShortDate(closeItem?.date || ipo.closeDate), icon: Lock },
    { label: "Allot", date: formatShortDate(allotmentItem?.date || ipo.allotmentDate), icon: ShieldCheck },
    { label: "Listed", date: formatShortDate(listingItem?.date || ipo.listingDate), icon: CheckCircle2 },
  ];

  return (
    <Link
      href={detailUrl}
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

        {/* 2. Spotlight: GMP Today & Subscription Demand Side-by-Side (Refined Weight) */}
        <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-card2/50 border border-line">
          {/* Left: GMP Today */}
          <div>
            <span className="text-[14px] font-semibold text-mut uppercase tracking-wider block mb-1">
              GMP Today
            </span>
            <div className="flex items-baseline gap-1.5 font-heading tabular-nums">
              <span className={`text-[14px] font-heading font-bold leading-none ${ipo.gmp >= 0 ? "text-up" : "text-dn"}`}>
                {formatINR(ipo.gmp)}
              </span>
              <span className={`text-[14px] font-semibold leading-none ${ipo.gmp >= 0 ? "text-up" : "text-dn"}`}>
                ({formatPercent(percent)})
              </span>
            </div>
          </div>

          {/* Right: Subscription Demand */}
          <div className="border-l border-line/60 pl-3">
            <span className="text-[14px] font-semibold text-mut uppercase tracking-wider block mb-1">
              Subscription
            </span>
            <div className="flex items-baseline gap-1.5 font-heading tabular-nums">
              <span className={`text-[14px] font-heading font-bold leading-none ${
                isUpcoming ? "text-mut/70" : "text-accent"
              }`}>
                {formatSubscription(ipo.subscription?.total || 0)}
              </span>
              <span className="text-[14px] text-mut font-medium leading-none">
                {isUpcoming ? "Upcoming" : "Demand"}
              </span>
            </div>
          </div>
        </div>

        {/* 3. Core Info Rows: Clean Key-Value Pairs (with clean top breathing space) */}
        <div className="space-y-2.5 text-[14px] mt-3.5 mb-1">
          {/* Price Band */}
          <div className="flex items-center justify-between pb-1.5 border-b border-line/40">
            <span className="text-mut font-medium">Issue Price</span>
            <span className="font-semibold text-tx font-heading text-[14px] tabular-nums">
              {ipo.priceBand}
            </span>
          </div>

          {/* Lot Size */}
          <div className="flex items-center justify-between pb-1.5 border-b border-line/40">
            <span className="text-mut font-medium">Lot Size</span>
            <span className="font-semibold text-tx font-heading text-[14px] tabular-nums">
              {ipo.lotSize ? `${ipo.lotSize.toLocaleString("en-IN")} Shares` : "TBA"}
            </span>
          </div>

          {/* Offer Period */}
          <div className="flex items-center justify-between pb-1.5 border-b border-line/40">
            <span className="text-mut font-medium">Offer Period</span>
            <span className="font-semibold text-tx font-heading text-[14px] tabular-nums">
              {offerDateFormatted}
            </span>
          </div>

          {/* Allotment Date */}
          <div className="flex items-center justify-between">
            <span className="text-mut font-medium">Allotment Date</span>
            <span className="font-semibold text-tx font-heading text-[14px] tabular-nums">
              {allotmentDateFormatted}
            </span>
          </div>
        </div>
      </div>

      {/* 4. Bottom Footer: Timeline (Exactly 14px) */}
      <div className="pt-2 mt-2.5 border-t border-line/60">
        <div className="grid grid-cols-4 gap-1 text-center">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isCurrent = idx === currentStageIndex;

            return (
              <div
                key={idx}
                className="flex flex-col items-center justify-center py-0.5"
              >
                <div className="mb-1 flex items-center justify-center">
                  <Icon
                    className={`w-[14px] h-[14px] ${
                      isCurrent ? "text-accent" : "text-mut/40"
                    }`}
                  />
                </div>

                <span
                  className={`text-[13px] sm:text-[14px] capitalize tracking-normal leading-none font-semibold ${
                    isCurrent ? "text-accent font-bold" : "text-mut"
                  }`}
                >
                  {stage.label}
                </span>

                <span
                  className={`text-[13px] sm:text-[14px] font-heading mt-1 tabular-nums whitespace-nowrap font-medium ${
                    isCurrent ? "text-accent font-semibold" : "text-tx"
                  }`}
                >
                  {stage.date}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Link>
  );
}
