import Link from "next/link";
import { Ipo } from "@/lib/types";
import { formatINR, formatPercent, gmpPercent, formatSubscription } from "@/lib/format";
import { IpoBadgeHeader } from "@/components/ui/IpoBadgeHeader";
import { IpoLogo } from "@/components/ipo/IpoLogo";
import {
  Calendar,
  LockOpen,
  Lock,
  CheckCircle2,
} from "lucide-react";

interface IpoCardProps {
  ipo: Ipo;
}

// Format date to "02 NOV"
function formatShortDate(dateStr?: string): string {
  if (!dateStr || dateStr === "-" || dateStr === "TBA") return "-";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) {
      const parts = dateStr.trim().split(" ");
      if (parts.length >= 2) return `${parts[0]} ${parts[1].toUpperCase()}`;
      return dateStr;
    }
    const day = String(d.getDate()).padStart(2, "0");
    const month = d.toLocaleDateString("en-IN", { month: "short" }).toUpperCase();
    return `${day} ${month}`;
  } catch {
    return dateStr;
  }
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

  const offerDateFormatted = openItem?.date && closeItem?.date
    ? `${formatShortDate(openItem.date)} - ${formatShortDate(closeItem.date)}`
    : formatShortDate(openItem?.date || ipo.openDate);

  const allotmentDateFormatted = formatShortDate(allotmentItem?.date || ipo.allotmentDate);

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

  const parseItemDate = (dStr?: string) => {
    if (!dStr || dStr === "-" || dStr === "TBA") return null;
    const d = new Date(dStr);
    if (isNaN(d.getTime())) return null;
    return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  };

  const openTime = parseItemDate(openItem?.date);
  const closeTime = parseItemDate(closeItem?.date);
  const listingTime = parseItemDate(listingItem?.date);

  // Stage index
  let currentStageIndex = 0;
  if (listingTime && today >= listingTime) {
    currentStageIndex = 3;
  } else if (closeTime && today > closeTime) {
    currentStageIndex = 2;
  } else if (openTime && today >= openTime) {
    currentStageIndex = 1;
  } else {
    currentStageIndex = 0;
  }

  const stages = [
    { label: "UPCOMING", date: formatShortDate(openItem?.date), icon: Calendar },
    { label: "OPEN", date: formatShortDate(openItem?.date), icon: LockOpen },
    { label: "CLOSE", date: formatShortDate(closeItem?.date), icon: Lock },
    { label: "LISTED", date: formatShortDate(listingItem?.date), icon: CheckCircle2 },
  ];

  return (
    <Link
      href={detailUrl}
      className="group flex flex-col justify-between rounded-2xl bg-card border border-line p-4 sm:p-4.5 shadow-[0_2px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_36px_rgba(217,90,43,0.14)] hover:border-accent hover:-translate-y-[2px] transition-all duration-200 focus-visible:outline-none"
    >
      <div className="space-y-3">
        {/* 1. Top Header: Avatar + Company Name + Badges */}
        <div className="flex items-start gap-3">
          <IpoLogo
            src={ipo.image || ipo.rawApiData?.ipo_image}
            name={ipo.name}
            className="w-10 h-10 rounded-xl group-hover:border-accent/40 group-hover:scale-105 transition-all shadow-xs"
          />

          <div className="min-w-0 flex-1">
            <h3 className="font-heading font-bold text-base text-tx group-hover:text-accent transition-colors truncate tracking-tight mb-1">
              {ipo.name}
            </h3>
            <IpoBadgeHeader ipo={ipo} />
          </div>
        </div>

        {/* 2. Spotlight: GMP Today & Subscription Demand Side-by-Side (આજુ-બાજુ) */}
        <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-card2/50 border border-line">
          {/* Left: GMP Today */}
          <div>
            <span className="text-xs font-semibold text-mut uppercase tracking-wider block mb-1">
              GMP Today
            </span>
            <div className="flex items-baseline gap-1.5 font-mono tabular-nums">
              <span className={`text-xl font-heading font-extrabold leading-none ${ipo.gmp >= 0 ? "text-up" : "text-dn"}`}>
                {formatINR(ipo.gmp)}
              </span>
              <span className={`text-xs font-bold leading-none ${ipo.gmp >= 0 ? "text-up" : "text-dn"}`}>
                ({formatPercent(percent)})
              </span>
            </div>
          </div>

          {/* Right: Subscription Demand */}
          <div className="border-l border-line/60 pl-3">
            <span className="text-xs font-semibold text-mut uppercase tracking-wider block mb-1">
              Subscription
            </span>
            <div className="flex items-baseline gap-1.5 font-mono tabular-nums">
              <span className="text-xl font-heading font-extrabold text-accent leading-none">
                {formatSubscription(ipo.subscription.total)}
              </span>
              <span className="text-xs text-mut font-medium leading-none">
                Demand
              </span>
            </div>
          </div>
        </div>

        {/* 3. Core Info Rows: Clean Key-Value Pairs */}
        <div className="space-y-1.5 text-xs py-0.5">
          {/* Price Band */}
          <div className="flex items-center justify-between pb-1.5 border-b border-line/40">
            <span className="text-mut font-medium">Issue Price</span>
            <span className="font-bold text-tx font-mono text-xs sm:text-sm tabular-nums">
              {ipo.priceBand}
            </span>
          </div>

          {/* Lot Size */}
          <div className="flex items-center justify-between pb-1.5 border-b border-line/40">
            <span className="text-mut font-medium">Lot Size</span>
            <span className="font-bold text-tx font-mono text-xs sm:text-sm tabular-nums">
              {ipo.lotSize ? `${ipo.lotSize.toLocaleString("en-IN")} Shares` : "TBA"}
            </span>
          </div>

          {/* Offer Date */}
          <div className="flex items-center justify-between pb-1.5 border-b border-line/40">
            <span className="text-mut font-medium">Offer Period</span>
            <span className="font-bold text-tx font-mono text-xs sm:text-sm tabular-nums">
              {offerDateFormatted}
            </span>
          </div>

          {/* Allotment Date */}
          <div className="flex items-center justify-between">
            <span className="text-mut font-medium">Allotment Date</span>
            <span className="font-bold text-accent font-mono text-xs sm:text-sm tabular-nums">
              {allotmentDateFormatted}
            </span>
          </div>
        </div>
      </div>

      {/* 4. Bottom Footer: Timeline matching Screenshot (Clean icon + Label + Date) */}
      <div className="pt-2 mt-2.5 border-t border-line/60">
        <div className="grid grid-cols-4 gap-1 text-center">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isCurrent = idx === currentStageIndex;
            const isPassed = idx < currentStageIndex;

            // Determine status color: Active gets highlight (Close=Red, Open=Accent/Green, etc.)
            let colorClass = "text-mut";
            if (isCurrent) {
              if (stage.label === "CLOSE") colorClass = "text-red-600";
              else if (stage.label === "OPEN") colorClass = "text-accent";
              else if (stage.label === "LISTED") colorClass = "text-accent";
              else colorClass = "text-accent";
            } else if (isPassed) {
              colorClass = "text-tx/70";
            }

            return (
              <div
                key={idx}
                className="flex flex-col items-center justify-center py-0.5"
              >
                <div className="mb-1 flex items-center justify-center">
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      isCurrent
                        ? stage.label === "CLOSE"
                          ? "text-red-600"
                          : "text-accent"
                        : isPassed
                        ? "text-mut/80"
                        : "text-mut/40"
                    }`}
                  />
                </div>

                <span
                  className={`text-[12px] uppercase tracking-wider leading-none ${
                    isCurrent
                      ? stage.label === "CLOSE"
                        ? "text-red-600 font-extrabold"
                        : "text-accent font-extrabold"
                      : isPassed
                      ? "text-tx/60 font-medium"
                      : "text-mut/70 font-normal"
                  }`}
                >
                  {stage.label}
                </span>

                <span
                  className={`text-[12px] font-mono mt-0.5 tabular-nums ${
                    isCurrent
                      ? "text-tx font-bold"
                      : isPassed
                      ? "text-tx/60 font-normal"
                      : "text-mut/60 font-normal"
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
