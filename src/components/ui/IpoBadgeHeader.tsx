import React from "react";
import { Ipo } from "@/lib/types";

interface IpoBadgeHeaderProps {
  ipo: Partial<Ipo> & {
    securityType?: string;
    listingAtGroup?: string;
    statusLabel?: string;
    closeDate?: string;
    openDate?: string;
  };
  className?: string;
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

  // 2. Status Label Logic
  let statusRaw = ipo.statusLabel || ipo.status || "";

  if (ipo.closeDate) {
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];
    const closeDateClean = ipo.closeDate.split("T")[0];

    if (closeDateClean === todayStr) {
      statusRaw = "Closes Today";
    } else {
      const closeTime = new Date(ipo.closeDate).getTime();
      const nowTime = today.getTime();
      const diffDays = Math.ceil((closeTime - nowTime) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        statusRaw = "Closes Tomorrow";
      } else if (diffDays > 1 && diffDays <= 5) {
        statusRaw = `Closes in ${diffDays} Days`;
      }
    }
  }

  // Right Side Status Badge: Theme-based Tinted / Outlined with dot
  // (Left badge is solid filled, so right badge is soft tinted for perfect odd-even balance)
  let statusClass = "bg-accent/10 text-accent border-accent/25";
  let dotClass = "bg-accent";

  const lower = statusRaw.toLowerCase();
  if (lower.includes("allotment") || lower.includes("alloted") || lower.includes("allotted")) {
    // Orange styling for Allotment / Alloted status
    statusClass = "bg-orange-500/10 text-orange-500 dark:text-orange-400 border-orange-500/30";
    dotClass = "bg-orange-500 dark:bg-orange-400";
  } else if (lower.includes("closes today") || lower.includes("close today")) {
    statusClass = "bg-dn/10 text-dn border-dn/30";
    dotClass = "bg-dn";
  } else if (lower.includes("closes in") || lower.includes("closes tomorrow")) {
    statusClass = "bg-amber-500/10 text-amber-500 dark:text-amber-400 border-amber-500/30";
    dotClass = "bg-amber-500 dark:bg-amber-400";
  } else if (lower.includes("open") || lower.includes("live")) {
    statusClass = "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30";
    dotClass = "bg-blue-500 dark:bg-blue-400";
  } else if (lower.includes("listed") || lower.includes("closed")) {
    statusClass = "bg-up/10 text-up border-up/30";
    dotClass = "bg-up";
  }

  return (
    <div className={`flex items-center gap-1.5 flex-wrap ${className}`}>
      {/* 1. Type Badge: Solid Dark Accent - Accurately Centered */}
      <span className="inline-flex items-center justify-center h-[21px] px-2.5 rounded-md text-[11px] font-semibold bg-accent text-accent-foreground shadow-xs leading-none whitespace-nowrap shrink-0 text-center">
        {typeLabel}
      </span>

      {/* 2. Status Badge: In Sync with Type Badge - Accurately Centered */}
      {statusRaw && (
        <span
          className={`inline-flex items-center justify-center h-[21px] px-2.5 rounded-md text-[11px] font-semibold border shadow-xs leading-none whitespace-nowrap shrink-0 text-center ${statusClass}`}
        >
          {statusRaw}
        </span>
      )}
    </div>
  );
}
