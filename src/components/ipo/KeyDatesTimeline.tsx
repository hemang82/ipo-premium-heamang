import React from "react";
import { IpoDate } from "@/lib/types";
import { formatShortDate } from "@/lib/format";
import { Calendar, Lock, ShieldCheck, CheckCircle2, Clock } from "lucide-react";

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

  // Chronologically Strict Stage Index (0: Open, 1: Close, 2: Allot, 3: Listed)
  let currentStageIndex = 0;
  let isUpcoming = false;

  if (openTime && today < openTime) {
    isUpcoming = true;
    currentStageIndex = 0;
  } else if (listingTime && today >= listingTime) {
    currentStageIndex = 3;
  } else if (allotTime && today >= allotTime) {
    currentStageIndex = 2;
  } else if (closeTime && today > closeTime) {
    currentStageIndex = 1;
  } else {
    currentStageIndex = 0;
  }

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
    <div className="w-full bg-card rounded-3xl border border-line p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-line mb-5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
            <Clock className="w-3.5 h-3.5" />
          </div>
          <span className="font-heading font-extrabold text-sm text-tx tracking-tight">
            Key IPO Lifecycle &amp; Dates
          </span>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-card2 border border-line text-mut flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          T+3 Framework
        </span>
      </div>

      {/* Stepper with Pixel-Perfect Central Connecting Line */}
      <div className="relative pt-1 pb-1">
        {/* Progress Track Line passing exactly through the center of 36px (h-9) circles (18px) */}
        <div className="absolute top-[19px] left-[12%] right-[12%] h-[2px] bg-line/80 z-0">
          <div
            className="h-full bg-accent transition-all duration-500 rounded-full"
            style={{
              width: `${(currentStageIndex / 3) * 100}%`,
            }}
          />
        </div>

        {/* 4 Nodes */}
        <div className="grid grid-cols-4 gap-1 relative z-10 text-center">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isCurrent = idx === currentStageIndex;
            const isPassed = !isUpcoming && idx < currentStageIndex;

            return (
              <div key={idx} className="flex flex-col items-center">
                {/* Node Circle: Exactly 36x36px */}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 border-2 ${
                    isCurrent
                      ? "bg-accent text-accent-foreground border-accent ring-4 ring-accent/20 shadow-xs"
                      : isPassed
                      ? "bg-up text-white border-up shadow-2xs"
                      : "bg-card text-mut border-line"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                {/* Milestone Label */}
                <span
                  className={`text-xs font-bold mt-2.5 leading-none block truncate max-w-full ${
                    isCurrent
                      ? "text-accent"
                      : isPassed
                      ? "text-tx font-semibold"
                      : "text-mut"
                  }`}
                >
                  {stage.label}
                </span>

                {/* Milestone Date */}
                <span
                  className={`text-[11px] font-heading mt-1 tabular-nums whitespace-nowrap block ${
                    isCurrent
                      ? "text-accent font-bold"
                      : isPassed
                      ? "text-tx font-medium"
                      : "text-mut/70"
                  }`}
                >
                  {stage.date}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
