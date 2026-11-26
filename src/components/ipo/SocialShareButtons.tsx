"use client";

import React, { useState } from "react";
import { Share2, Check, Copy } from "lucide-react";
import { formatINR, formatPercent } from "@/lib/format";

interface SocialShareButtonsProps {
  companyName: string;
  gmp: number;
  pct: number;
  estListing: number;
}

export function SocialShareButtons({
  companyName,
  gmp,
  pct,
  estListing,
}: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const currentUrl = typeof window !== "undefined" ? window.location.href : "https://ipo-premium.com";
    const title = `${companyName} IPO Live GMP Today & Allotment`;
    const text = `🚀 ${companyName} IPO Update\n🔥 Live GMP: ${formatINR(gmp)} (${formatPercent(pct)})\n📈 Est. Listing: ${formatINR(estListing)}\nCheck complete details & allotment status:`;

    // 1. If device supports native Web Share API (All mobile phones, tablets, Chrome, Safari, Edge)
    // Opens native device share sheet: WhatsApp, Telegram, Instagram, Twitter/X, Messages, Gmail, etc.
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: currentUrl,
        });
        return;
      } catch (err) {
        // User cancelled share or share failed
        if ((err as Error)?.name !== "AbortError") {
          console.error("Web share failed", err);
        }
      }
    }

    // 2. Fallback for Desktop browsers without navigator.share: Copy link to clipboard with instant feedback
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // fallback
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-card2 hover:bg-card border border-line hover:border-accent/40 text-tx text-xs font-semibold transition-all shadow-2xs active:scale-95 group focus-visible:outline-none"
      title="Share this IPO"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-up shrink-0" />
          <span className="text-[11px] text-up font-bold">Copied!</span>
        </>
      ) : (
        <>
          <Share2 className="w-3.5 h-3.5 text-accent group-hover:scale-110 transition-transform shrink-0" />
          <span className="text-[11px] text-mut group-hover:text-accent font-medium transition-colors">Share</span>
        </>
      )}
    </button>
  );
}
