import { Ipo } from "@/lib/types";
import { formatINR } from "@/lib/format";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { LotCalculator } from "./LotCalculator";
import {
  ExternalLink,
  CheckCircle,
  Tag,
  TrendingUp,
  Layers,
  Wallet,
  Building,
  UserCheck,
  Building2,
  FileCheck2,
} from "lucide-react";
import Link from "next/link";

interface QuickFactsPanelProps {
  ipo: Ipo;
  raw?: any;
}

function formatNum(num: any): string {
  if (num === null || num === undefined || num === "" || num === "-") return "-";
  const parsed = Number(num);
  if (isNaN(parsed)) return String(num);
  return new Intl.NumberFormat("en-IN").format(parsed);
}

// Get direct official portal URL based on registrar name
function getRegistrarPortalUrl(name?: any, fallbackUrl?: any): string {
  if (typeof fallbackUrl === "string" && fallbackUrl.startsWith("http")) return fallbackUrl;
  const lower = typeof name === "string" ? name.toLowerCase() : "";
  if (lower.includes("link intime") || lower.includes("linkintime")) {
    return "https://in.mpms.mufg.com/Initial_Offer/public-issues.html";
  }
  if (lower.includes("kfin") || lower.includes("karvy")) {
    return "https://kosmic.kfintech.com/ipostatus/";
  }
  if (lower.includes("bigshare")) {
    return "https://ipo.bigshareonline.com/IPO_Status.html";
  }
  if (lower.includes("cameo")) {
    return "https://ipo.cameoindia.com/";
  }
  if (lower.includes("skyline")) {
    return "https://www.skylinerta.com/ipo.php";
  }
  if (lower.includes("purva")) {
    return "https://www.purvashare.com/queries/";
  }
  if (lower.includes("maashitla")) {
    return "https://maashitla.com/allotment-status";
  }
  return typeof fallbackUrl === "string" && fallbackUrl ? fallbackUrl : "https://allotmentstatus.com";
}

export function QuickFactsPanel({ ipo, raw = {} }: QuickFactsPanelProps) {
  // Extract real dynamic values from current IPO
  const priceBand =
    raw.price_range
      ? String(raw.price_range).replace(/\s*per\s*share/gi, "").trim()
      : ipo.issuePrice
      ? `₹${ipo.issuePrice}`
      : "-";

  const capPrice = ipo.issuePrice || raw.issue_price || 0;
  const lotSize = ipo.lotSize || Number(raw.bid_lot) || 0;
  const minRetail =
    (raw.min_investment ? Number(raw.min_investment) : null) ||
    (capPrice && lotSize ? capPrice * lotSize : 0);

  const issueSizeText =
    raw.issue_amount
      ? `₹${raw.issue_amount} Cr`
      : raw.issue_size
      ? `${formatNum(raw.issue_size)} Shares`
      : ipo.issueSizeCr
      ? `₹${ipo.issueSizeCr} Cr`
      : "-";

  const exchanges =
    raw.listing_at_group || raw.exchange || ipo.board || "BSE, NSE";

  const registrarName =
    raw.registrar_detail?.name ||
    raw.registrar_detail?.registrar_name ||
    raw.registrar ||
    ipo.registrar ||
    "Link Intime / Bigshare";

  const directRegistrarUrl = getRegistrarPortalUrl(
    registrarName,
    raw.registrar_detail?.website || raw.registrar_detail?.link || raw.registrar_url || ipo.registrarUrl
  );

  return (
    <div className="space-y-4">
      {/* Quick Facts Card */}
      <Card variant="default" className="p-5 border-line shadow-sm">
        {/* Title Header with Allotment Button beside it */}
        <div className="flex items-center justify-between gap-2 mb-4 pb-2.5 border-b border-line">
          <h3 className="font-heading font-semibold text-base text-tx">
            Issue Key Information
          </h3>

          <a
            href="https://ipo-trend.com/ipo-allotment-status"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-accent/10 text-accent hover:bg-accent hover:text-accent-foreground border border-accent/20 transition-all shrink-0"
            title="Check Allotment Status on ipo-trend.com"
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>Allotment Status</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
        </div>

        <div className="space-y-3.5 text-xs">
          {/* Price Band */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-mut flex items-center gap-2 font-medium">
              <Tag className="w-3.5 h-3.5 text-accent shrink-0" />
              Price Band
            </span>
            <span className="font-bold text-tx font-mono tracking-tight text-sm">
              {priceBand}
            </span>
          </div>

          {/* Issue Cap Price */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-mut flex items-center gap-2 font-medium">
              <TrendingUp className="w-3.5 h-3.5 text-accent shrink-0" />
              Issue Cap Price
            </span>
            <span className="font-bold text-tx font-mono tabular-nums text-sm">
              {capPrice ? `₹${capPrice}` : "-"}
            </span>
          </div>

          {/* Market Lot Size */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-mut flex items-center gap-2 font-medium">
              <Layers className="w-3.5 h-3.5 text-accent shrink-0" />
              Market Lot Size
            </span>
            <span className="font-bold text-tx font-mono tabular-nums text-sm">
              {lotSize ? `${formatNum(lotSize)} Shares` : "-"}
            </span>
          </div>

          {/* Minimum Retail Outlay */}
          <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-accent/10 border border-accent/20">
            <span className="text-accent flex items-center gap-2 font-semibold">
              <Wallet className="w-3.5 h-3.5 text-accent shrink-0" />
              Min Retail Outlay
            </span>
            <span className="font-bold text-accent font-mono tabular-nums text-base">
              {minRetail ? formatINR(minRetail) : "-"}
            </span>
          </div>

          {/* Total Issue Size */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-mut flex items-center gap-2 font-medium">
              <Building className="w-3.5 h-3.5 text-accent shrink-0" />
              Total Issue Size
            </span>
            <span className="font-bold text-tx font-mono tabular-nums text-sm">
              {issueSizeText}
            </span>
          </div>

          {/* Listing Exchanges */}
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-line/50">
            <span className="text-mut flex items-center gap-2 font-medium">
              <Building2 className="w-3.5 h-3.5 text-accent shrink-0" />
              Listing Exchanges
            </span>
            <span className="font-bold text-tx font-mono text-xs px-2.5 py-1 rounded-md bg-card2 border border-line">
              {exchanges}
            </span>
          </div>

          {/* Clickable Registrar opens in new tab */}
          <div className="flex items-start justify-between gap-3 pt-1">
            <span className="text-mut flex items-center gap-2 font-medium shrink-0 pt-0.5">
              <UserCheck className="w-3.5 h-3.5 text-accent shrink-0" />
              Registrar
            </span>
            <a
              href={directRegistrarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-right font-semibold text-xs leading-snug text-accent hover:underline"
              title={`Open ${registrarName} official website`}
            >
              <span>{registrarName}</span>
              <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity shrink-0" />
            </a>
          </div>
        </div>

        {/* CTA to Check Allotment */}
        <div className="mt-5 pt-3 border-t border-line">
          <a
            href={directRegistrarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full block"
          >
            <Button
              variant="primary"
              size="md"
              className="w-full gap-2 font-heading font-bold shadow-md hover:shadow-accent/20 transition-all text-sm"
            >
              <CheckCircle className="w-4 h-4" />
              Check Allotment Status
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </Button>
          </a>
        </div>
      </Card>

      {/* Embedded Interactive Lot Calculator */}
      <LotCalculator
        issuePrice={capPrice || 100}
        lotSize={lotSize || 1000}
        gmp={ipo.gmp || 0}
      />
    </div>
  );
}
