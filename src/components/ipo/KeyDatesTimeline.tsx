import React from "react";
import { IpoDate } from "@/lib/types";
import { Calendar, LockOpen, Lock, CheckCircle2 } from "lucide-react";

interface KeyDatesTimelineProps {
  dates: IpoDate[];
}

// Format date into short format like "29 OCT", "05 NOV"
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

export function KeyDatesTimeline({ dates }: KeyDatesTimelineProps) {
  if (!dates || dates.length === 0) return null;

  const openItem = dates.find((d) => d.label.toLowerCase().includes("open")) || dates[0];
  const closeItem = dates.find((d) => d.label.toLowerCase().includes("close")) || dates[1];
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
  const listingTime = parseItemDate(listingItem?.date);

  // Determine stage status: 'completed' | 'current' | 'upcoming'
  let currentStageIndex = 0; // 0: UPCOMING, 1: OPEN, 2: CLOSE, 3: LISTED

  if (listingTime && today >= listingTime) {
    currentStageIndex = 3; // LISTED is active
  } else if (closeTime && today > closeTime) {
    currentStageIndex = 2; // CLOSE is active (Bidding closed, pending allotment/listing)
  } else if (openTime && today >= openTime) {
    currentStageIndex = 1; // OPEN is active (Bidding live)
  } else {
    currentStageIndex = 0; // UPCOMING
  }

  // Map 4 specific milestones: UPCOMING, OPEN, CLOSE, LISTED
  const stages = [
    {
      key: "UPCOMING",
      label: "UPCOMING",
      date: formatShortDate(openItem?.date),
      icon: Calendar,
    },
    {
      key: "OPEN",
      label: "OPEN",
      date: formatShortDate(openItem?.date),
      icon: LockOpen,
    },
    {
      key: "CLOSE",
      label: "CLOSE",
      date: formatShortDate(closeItem?.date),
      icon: Lock,
    },
    {
      key: "LISTED",
      label: "LISTED",
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
          const isPassed = idx < currentStageIndex;

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
                    : isPassed
                    ? "bg-accent/15 text-accent"
                    : "bg-card border border-line/60 text-mut/80"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>

              {/* Label */}
              <span
                className={`text-[11px] tracking-wider uppercase leading-none font-bold ${
                  isCurrent
                    ? "text-accent font-extrabold"
                    : isPassed
                    ? "text-accent/90 font-semibold"
                    : "text-mut"
                }`}
              >
                {stage.label}
              </span>

              {/* Date */}
              <span
                className={`text-[12px] font-bold font-mono mt-1 tabular-nums ${
                  isCurrent
                    ? "text-tx font-extrabold"
                    : isPassed
                    ? "text-tx/90 font-medium"
                    : "text-mut"
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
