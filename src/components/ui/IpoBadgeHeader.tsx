import React from "react";
import { Ipo } from "@/lib/types";

interface IpoBadgeHeaderProps {
  ipo: Partial<Ipo> & {
    securityType?: string;
    listingAtGroup?: string;
    statusLabel?: string;
    closeDate?: string;
    openDate?: string;
    allotmentDate?: string;
    listingDate?: string;
    dates?: { label: string; date: string; state?: string }[];
  };
  className?: string;
}

function parseItemDate(dStr?: string): Date | null {
  if (!dStr || dStr === "-" || dStr === "TBA") return null;
  const d = new Date(dStr);
  if (isNaN(d.getTime())) return null;
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function IpoBadgeHeader({ ipo, className = "" }: IpoBadgeHeaderProps) {
  if (!ipo) return null;

  // 1. Type Badge Logic (Mainboard vs SME & BSE / NSE)
  const isSME =
    ipo.securityType === "SME" ||
    String(ipo.listingAtGroup || "").toUpperCase().includes("SME") ||
    ipo.board === "BSE SME" ||
    ipo.board === "NSE Emerge" ||
    ipo.status === "SME";

  const group = String(ipo.listingAtGroup || "").toUpperCase();
  let typeLabel = "Mainboard";

  if (isSME) {
    if (group.includes("NSE") && group.includes("BSE")) {
      typeLabel = "NSE, BSE - SME";
    } else if (group.includes("NSE")) {
      typeLabel = "NSE - SME";
    } else if (group.includes("BSE")) {
      typeLabel = "BSE - SME";
    } else {
      typeLabel = "BSE - SME";
    }
  }

  // 2. Extract Dates safely (from root properties or dates array)
  const dates = ipo.dates || [];
  const openStr = ipo.openDate || dates.find((d) => d.label?.toLowerCase().includes("open"))?.date;
  const closeStr = ipo.closeDate || dates.find((d) => d.label?.toLowerCase().includes("close"))?.date;
  const allotStr = ipo.allotmentDate || dates.find((d) => d.label?.toLowerCase().includes("allot"))?.date;
  const listStr = ipo.listingDate || dates.find((d) => d.label?.toLowerCase().includes("list"))?.date;

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const openDate = parseItemDate(openStr);
  const closeDate = parseItemDate(closeStr);
  const allotDate = parseItemDate(allotStr);
  const listDate = parseItemDate(listStr);

  // 3. Status Label Logic (Chronologically Strict)
  let statusRaw = ipo.statusLabel || ipo.status || "";

  if (openDate && today.getTime() < openDate.getTime()) {
    // Stage 1: UPCOMING (Bidding hasn't opened yet)
    const diffDays = Math.round((openDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      statusRaw = "Opens Tomorrow";
    } else if (diffDays > 1 && diffDays <= 7) {
      statusRaw = `Opens in ${diffDays} Days`;
    } else {
      statusRaw = "Upcoming";
    }
  } else if (closeDate && today.getTime() <= closeDate.getTime()) {
    // Stage 2: LIVE / OPEN (Bidding is actively ongoing)
    const diffDays = Math.round((closeDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) {
      statusRaw = "Closes Today";
    } else if (diffDays === 1) {
      statusRaw = "Closes Tomorrow";
    } else if (diffDays > 1 && diffDays <= 5) {
      statusRaw = `Closes in ${diffDays} Days`;
    } else {
      statusRaw = "Live Bidding";
    }
  } else if (closeDate && today.getTime() > closeDate.getTime()) {
    // Stage 3: CLOSED (Bidding has concluded)
    if (listDate && today.getTime() >= listDate.getTime()) {
      statusRaw = "Listed";
    } else if (listDate && today.getTime() === listDate.getTime()) {
      statusRaw = "Listing Today";
    } else if (allotDate && today.getTime() === allotDate.getTime()) {
      statusRaw = "Allotment Today";
    } else if (allotDate && today.getTime() > allotDate.getTime()) {
      statusRaw = "Allotment Out";
    } else {
      statusRaw = "Closed";
    }
  }

  // 4. Status Badge Color Styling
  let statusClass = "bg-accent/10 text-accent border-accent/25";

  const lower = statusRaw.toLowerCase();
  if (lower.includes("allotment") || lower.includes("alloted") || lower.includes("allotted")) {
    statusClass = "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30";
  } else if (lower.includes("closes today") || lower.includes("close today")) {
    statusClass = "bg-dn/10 text-dn border-dn/30";
  } else if (lower.includes("closes in") || lower.includes("closes tomorrow")) {
    statusClass = "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30";
  } else if (lower.includes("opens in") || lower.includes("opens tomorrow") || lower.includes("upcoming")) {
    statusClass = "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30";
  } else if (lower.includes("live") || lower.includes("open")) {
    statusClass = "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30";
  } else if (lower.includes("listed")) {
    statusClass = "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30";
  } else if (lower.includes("closed")) {
    statusClass = "bg-card2 text-mut border-line";
  }

  return (
    <div className={`flex items-center gap-1.5 flex-nowrap shrink-0 ${className}`}>
      {/* 1. Type Badge: Solid Dark Accent - Accurately Centered (12px) */}
      <span className="inline-flex items-center justify-center h-[22px] px-2.5 rounded-md text-[12px] font-semibold bg-accent text-accent-foreground shadow-xs leading-none whitespace-nowrap shrink-0 text-center">
        {typeLabel}
      </span>

      {/* 2. Status Badge: In Sync with Type Badge - Accurately Centered (12px) */}
      {statusRaw && (
        <span
          className={`inline-flex items-center justify-center h-[22px] px-2.5 rounded-md text-[12px] font-semibold border shadow-xs leading-none whitespace-nowrap shrink-0 text-center ${statusClass}`}
        >
          {statusRaw}
        </span>
      )}
    </div>
  );
}
