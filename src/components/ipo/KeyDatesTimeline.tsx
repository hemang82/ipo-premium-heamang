import React from "react";
import { IpoDate } from "@/lib/types";
import { formatShortDate } from "@/lib/format";
import { Calendar, Lock, ShieldCheck, CheckCircle2 } from "lucide-react";

interface KeyDatesTimelineProps {
  dates: IpoDate[];
}

export function KeyDatesTimeline({ dates }: KeyDatesTimelineProps) {
  if (!dates || dates.length === 0) return null;

  const openItem = dates.find((d) => d.label.toLowerCase().includes("open")) || dates[0];
  const closeItem = dates.find((d) => d.label.toLowerCase().includes("close")) || dates[1];
  const allotmentItem = dates.find((d) => d.label.toLowerCase().includes("allot")) || dates[2];
  const listingItem = dates.find((d) => d.label.toLowerCase().includes("list")) || dates[3] || dates[dates.length - 1];

  const now = new Date();
  // Strip time for clean day comparison
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

  const parseItemDate = (dStr?: string) => {
    if (!dStr || dStr === "-" || dStr === "TBA") return null;
    const d = new Date(dStr);
    if (isNaN(d.getTime())) return null;
    return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  };

  const openTime = parseItemDate(openItem?.date);
  const closeTime = parseItemDate(closeItem?.date);
  const allotTime = parseItemDate(allotmentItem?.date);
  const listingTime = parseItemDate(listingItem?.date);

  // Chronologically Strict Stage Index
  let currentStageIndex = 0;
  let isUpcoming = false;

  if (openTime && today < openTime) {
    isUpcoming = true;
    currentStageIndex = 0; // Upcoming: Next milestone is OPEN
  } else if (listingTime && today >= listingTime) {
    currentStageIndex = 3; // LISTED is active
  } else if (allotTime && today >= allotTime) {
    currentStageIndex = 2; // ALLOTMENT is active
  } else if (closeTime && today > closeTime) {
    currentStageIndex = 1; // CLOSE is active (Bidding closed, pending allotment)
  } else {
    currentStageIndex = 0; // OPEN is active (Bidding live)
  }

  // Map 4 true milestones: Open, Close, Allot, Listed
  const stages = [
    {
      key: "OPEN",
      label: "Open",
      date: formatShortDate(openItem?.date),
      icon: Calendar,
    },
    {
      key: "CLOSE",
      label: "Close",
      date: formatShortDate(closeItem?.date),
      icon: Lock,
    },
    {
      key: "ALLOT",
      label: "Allot",
      date: formatShortDate(allotmentItem?.date),
      icon: ShieldCheck,
    },
    {
      key: "LISTED",
      label: "Listed",
      date: formatShortDate(listingItem?.date),
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="w-full p-2 bg-card rounded-2xl border border-line shadow-sm">
      <div className="grid grid-cols-4 gap-2 text-center">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isCurrent = idx === currentStageIndex;
          const isPassed = !isUpcoming && idx < currentStageIndex;

          return (
            <div
              key={idx}
              className={`flex flex-col items-center justify-center px-1.5 py-2.5 rounded-xl transition-all ${
                isCurrent
                  ? "bg-accent/[0.08] border-1.5 border-accent shadow-xs"
                  : isPassed
                  ? "bg-card2/50 border border-transparent"
                  : "bg-card2/25 border border-transparent"
              }`}
            >
              {/* Icon Container */}
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center mb-1.5 shrink-0 transition-all ${
                  isCurrent
                    ? "bg-accent text-accent-foreground shadow-xs"
                    : "bg-card border border-line/60 text-mut/70"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>

              {/* Label */}
              <span
                className={`text-[11px] tracking-wide capitalize leading-none font-semibold ${
                  isCurrent ? "text-accent" : "text-mut"
                }`}
              >
                {stage.label}
              </span>

              {/* Date */}
              <span
                className={`text-xs font-heading font-semibold mt-1 tabular-nums whitespace-nowrap ${
                  isCurrent ? "text-accent" : "text-tx"
                }`}
              >
                {stage.date}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
