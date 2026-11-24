"use client";

import React, { useState } from "react";
import { MessageCircle, Send, Share2, Check, Copy } from "lucide-react";
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

  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return "https://ipo-premium.com";
  };

  const shareText = `🚀 *${companyName} IPO Update*\n\n🔥 Live GMP: *${formatINR(gmp)}* (${formatPercent(pct)})\n📈 Est. Listing: *${formatINR(estListing)}*\n\n👉 Check Live GMP, Subscription & Allotment:\n${getShareUrl()}`;

  const shareWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank");
  };

  const shareTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(getShareUrl())}&text=${encodeURIComponent(`🚀 ${companyName} IPO Live GMP: ${formatINR(gmp)} (${formatPercent(pct)}) | Est. Listing: ${formatINR(estListing)}`)}`;
    window.open(url, "_blank");
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-[11px] font-bold text-mut uppercase tracking-wider hidden sm:inline-block">
        Share:
      </span>

      {/* WhatsApp Share Button */}
      <button
        type="button"
        onClick={shareWhatsApp}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white border border-emerald-500/20 text-xs font-bold transition-all shadow-2xs active:scale-95"
        title="Share to WhatsApp"
      >
        <MessageCircle className="w-3.5 h-3.5" />
        <span>WhatsApp</span>
      </button>

      {/* Telegram Share Button */}
      <button
        type="button"
        onClick={shareTelegram}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/10 hover:bg-sky-500 text-sky-500 hover:text-white border border-sky-500/20 text-xs font-bold transition-all shadow-2xs active:scale-95"
        title="Share to Telegram"
      >
        <Send className="w-3.5 h-3.5" />
        <span>Telegram</span>
      </button>

      {/* Copy Link Button */}
      <button
        type="button"
        onClick={copyLink}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card2 hover:bg-card border border-line text-tx text-xs font-medium transition-all shadow-2xs active:scale-95"
        title="Copy IPO Page Link"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-up" />
            <span className="text-up font-bold">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 text-mut" />
            <span>Copy Link</span>
          </>
        )}
      </button>
    </div>
  );
}
