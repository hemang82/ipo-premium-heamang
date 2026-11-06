"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  RotateCw,
  Download,
  Share2,
  ArrowUpRight,
  TrendingUp,
  Clock,
  Check,
  AlertCircle,
  Layers,
} from "lucide-react";
import { toPng } from "html-to-image";
import { SubscriptionIpoItem, formatIndianNumber } from "@/lib/subscription-service";
import { formatINR } from "@/lib/format";
import { IpoLogo } from "@/components/ipo/IpoLogo";

interface SubscriptionCardProps {
  ipo: SubscriptionIpoItem;
  canRefresh: boolean;
  onRefreshSingle?: (id: number) => Promise<void>;
}

export function SubscriptionCard({ ipo, canRefresh, onRefreshSingle }: SubscriptionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Single card refresh while preserving scroll position
  const handleSingleRefresh = async () => {
    if (!canRefresh || !onRefreshSingle || isRefreshing) return;
    setIsRefreshing(true);
    const scrollY = window.scrollY;
    try {
      await onRefreshSingle(ipo.id);
    } finally {
      setIsRefreshing(false);
      window.scrollTo({ top: scrollY });
    }
  };

  // Export card to PNG
  const handleDownloadImage = async () => {
    if (!cardRef.current || isDownloading) return;
    setIsDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        filter: (node) => !node.classList?.contains("no-capture"),
      });
      const link = document.createElement("a");
      link.download = `${ipo.companyName.replace(/[^a-zA-Z0-9]/g, "_")}_Subscription_Status.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate image:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  // Share card
  const handleShare = async () => {
    const url = window.location.href;
    const shareData = {
      title: `${ipo.companyName} Live IPO Subscription`,
      text: `${ipo.companyName} is subscribed ${ipo.totalTimes}x! Check live QIB, NII & Retail bidding demand on ipo-premium.`,
      url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // user cancelled
      }
    } else {
      // Fallback copy link
      await navigator.clipboard.writeText(`${shareData.text} ${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const detailUrl = `/ipo/${ipo.slug}/${ipo.symbol}`;
  const isPositiveGmp = ipo.gmp > 0;

  return (
    <div
      ref={cardRef}
      className="bg-card border border-line rounded-3xl p-3.5 sm:p-5 lg:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
    >
      <div className="space-y-4">
        {/* 1. Header: Company Title, Subtle Badge, Single Card Refresh */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0 flex-1">
            <IpoLogo src={ipo.image} name={ipo.companyName} className="w-10 h-10 rounded-xl shrink-0" />
            <div className="min-w-0 flex-1">
              <Link href={detailUrl} className="block group">
                <h3 className="font-heading font-black text-base sm:text-lg text-tx group-hover:text-accent transition-colors truncate">
                  {ipo.companyName}
                </h3>
                <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                  <span className="inline-flex items-center justify-center h-[21px] px-2.5 rounded-md text-[11px] font-semibold bg-accent text-accent-foreground shadow-xs leading-none whitespace-nowrap shrink-0 text-center">
                    {ipo.isSme ? `${ipo.listingAtGroup || "BSE/NSE"} - SME` : "Mainboard"}
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Action Icons in Header: Single Refresh + Share */}
          <div className="flex items-center gap-1 shrink-0 no-capture">
            <button
              onClick={handleSingleRefresh}
              disabled={!canRefresh || isRefreshing}
              title={canRefresh ? "Refresh this IPO data" : "Refresh available only during market hours (10 AM - 5 PM IST)"}
              className={`p-2 rounded-xl text-mut hover:text-tx hover:bg-card2 transition-all ${
                !canRefresh ? "opacity-40 cursor-not-allowed" : ""
              }`}
            >
              <RotateCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-accent" : ""}`} />
            </button>
            <button
              onClick={handleShare}
              title="Share IPO Subscription"
              className="p-2 rounded-xl text-mut hover:text-tx hover:bg-card2 transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={handleDownloadImage}
              disabled={isDownloading}
              title="Download as PNG Image"
              className="p-2 rounded-xl text-mut hover:text-tx hover:bg-card2 transition-all"
            >
              <Download className={`w-4 h-4 ${isDownloading ? "animate-bounce text-accent" : ""}`} />
            </button>
          </div>
        </div>

        {/* 2. Metric Strip: 3 Highlighted Columns (Issue Price, GMP, Close Date) */}
        <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-card2/60 border border-line text-center">
          <div>
            <span className="text-xs text-mut uppercase font-semibold block mb-0.5">
              Issue Price
            </span>
            <span className="text-xs sm:text-sm font-bold font-mono text-tx block truncate">
              {ipo.priceRange}
            </span>
          </div>

          <div className="border-x border-line/60">
            <span className="text-xs text-mut uppercase font-semibold block mb-0.5">
              GMP Today
            </span>
            <span className={`text-xs sm:text-sm font-bold font-mono block truncate ${isPositiveGmp ? "text-up" : "text-mut"}`}>
              {ipo.gmp === 0 ? "₹0" : `${formatINR(ipo.gmp)} (${ipo.gmpPercent}%)`}
            </span>
          </div>

          <div>
            <span className="text-xs text-mut uppercase font-semibold block mb-0.5">
              Close Date
            </span>
            <span className="text-xs sm:text-sm font-bold font-mono text-tx block truncate">
              {ipo.endDate || "TBA"}
            </span>
          </div>
        </div>

        {/* 3. Subscription Demand Table (Shares) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-mut uppercase tracking-wider">
              Subscription Demand (Shares)
            </span>
            <span className="text-xs font-mono font-bold text-accent">
              Overall: {ipo.totalTimes > 0 ? `${ipo.totalTimes}x` : "0.00x"}
            </span>
          </div>

          <div className="border border-line rounded-2xl overflow-x-auto bg-card">
            <table className="w-full text-left text-xs border-collapse min-w-[340px]">
              <thead>
                <tr className="bg-card2/80 border-b border-line text-xs font-bold text-mut uppercase whitespace-nowrap">
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3 text-right">Offered</th>
                  <th className="py-2.5 px-3 text-right">Applied</th>
                  <th className="py-2.5 px-3 text-right whitespace-nowrap">Times (x)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/40 font-mono">
                {ipo.subscriptionDetail.length > 0 ? (
                  ipo.subscriptionDetail.map((row, idx) => (
                    <tr key={idx} className="hover:bg-card2/30 transition-colors whitespace-nowrap">
                      <td className="py-2 px-3 font-sans font-medium text-tx">
                        {row.category}
                      </td>
                      <td className="py-2 px-3 text-right text-mut">
                        {formatIndianNumber(row.offered)}
                      </td>
                      <td className="py-2 px-3 text-right text-tx font-medium">
                        {formatIndianNumber(row.applied)}
                      </td>
                      <td className="py-2 px-3 text-right font-bold text-tx">
                        <span className={row.times >= 1 ? "text-accent" : "text-mut"}>
                          {row.times.toFixed(2)}x
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-3 text-center text-mut font-sans">
                      Bidding data will appear once bidding commences.
                    </td>
                  </tr>
                )}
                {/* Total Row */}
                {ipo.subscriptionDetail.length > 0 && (
                  <tr className="bg-card2/70 font-bold border-t border-line text-tx whitespace-nowrap">
                    <td className="py-2.5 px-3 font-sans font-bold">Total Demand</td>
                    <td className="py-2.5 px-3 text-right text-mut font-bold">
                      {formatIndianNumber(ipo.totalOffered)}
                    </td>
                    <td className="py-2.5 px-3 text-right text-tx font-bold">
                      {formatIndianNumber(ipo.totalApplied)}
                    </td>
                    <td className="py-2.5 px-3 text-right text-accent font-extrabold text-sm">
                      {ipo.totalTimes.toFixed(2)}x
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Application Breakup Table (if available) */}
        {ipo.applicationBreakup.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <span className="text-xs font-semibold text-mut uppercase tracking-wider block">
              Application Breakup (Approx. Bids)
            </span>
            <div className="border border-line rounded-2xl overflow-x-auto bg-card">
              <table className="w-full text-left text-xs border-collapse min-w-[340px]">
                <thead>
                  <tr className="bg-card2/80 border-b border-line text-xs font-bold text-mut uppercase whitespace-nowrap">
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3 text-right">Reserved Apps</th>
                    <th className="py-2.5 px-3 text-right">Applied Apps</th>
                    <th className="py-2.5 px-3 text-right whitespace-nowrap">Times</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/40 font-mono">
                  {ipo.applicationBreakup.map((row, idx) => (
                    <tr key={idx} className="hover:bg-card2/30 transition-colors whitespace-nowrap">
                      <td className="py-2.5 px-3 font-sans font-medium text-tx">
                        {row.category}
                      </td>
                      <td className="py-2.5 px-3 text-right text-mut">
                        {formatIndianNumber(row.reserved)}
                      </td>
                      <td className="py-2.5 px-3 text-right text-tx font-medium">
                        {formatIndianNumber(row.applied)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-accent">
                        {row.times.includes("x") ? row.times : `${row.times}x`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* 5. Card Footer: View Details Button & Action */}
      <div className="pt-4 mt-5 border-t border-line/60 flex items-center justify-between gap-3 no-capture">
        <div className="flex items-center gap-1.5 text-xs text-mut">
          <Clock className="w-3.5 h-3.5" />
          <span>Lot: {ipo.bidLot ? `${ipo.bidLot.toLocaleString("en-IN")} sh` : "TBA"}</span>
        </div>

        <Link
          href={detailUrl}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-all shadow-xs"
        >
          View Full Details
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
