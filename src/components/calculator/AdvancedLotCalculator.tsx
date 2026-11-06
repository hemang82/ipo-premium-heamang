"use client";

import { useState, useMemo } from "react";
import { Ipo } from "@/lib/types";
import { formatINR, formatPercent } from "@/lib/format";
import {
  Calculator,
  Building2,
  TrendingUp,
  ShieldCheck,
  Check,
  RotateCcw,
  Sparkles,
  Info,
  DollarSign,
  ArrowRight,
} from "lucide-react";

interface AdvancedLotCalculatorProps {
  ipos: Ipo[];
}

export function AdvancedLotCalculator({ ipos }: AdvancedLotCalculatorProps) {
  // Currently selected IPO (default to first active IPO or custom)
  const [selectedSlug, setSelectedSlug] = useState<string>(ipos[0]?.slug || "custom");

  // Inputs
  const [issuePrice, setIssuePrice] = useState<number>(ipos[0]?.issuePrice || 500);
  const [lotSize, setLotSize] = useState<number>(ipos[0]?.lotSize || 30);
  const [gmp, setGmp] = useState<number>(ipos[0]?.gmp || 80);
  const [lots, setLots] = useState<number>(1);
  const [bidCategory, setBidCategory] = useState<"retail" | "shni" | "bhni">("retail");

  // When selected IPO changes from dropdown
  const handleSelectIpo = (slug: string) => {
    setSelectedSlug(slug);
    if (slug === "custom") return;

    const found = ipos.find((i) => i.slug === slug);
    if (found) {
      const price = found.issuePrice > 0 ? found.issuePrice : 500;
      const size = found.lotSize > 0 ? found.lotSize : 30;
      const premium = !isNaN(found.gmp) ? found.gmp : 0;

      setIssuePrice(price);
      setLotSize(size);
      setGmp(premium);
      setLots(1);
      setBidCategory("retail");
    }
  };

  // Calculations
  const costPerLot = issuePrice * lotSize;
  const totalShares = lots * lotSize;
  const totalInvestment = totalShares * issuePrice;
  const totalGain = totalShares * gmp;
  const totalReturn = totalInvestment + totalGain;
  const gainPercentage = issuePrice > 0 ? ((gmp / issuePrice) * 100) : 0;
  const estimatedListingPrice = issuePrice + gmp;

  // Maximum lots for Retail (₹2,00,000 cutoff)
  const maxRetailLots = useMemo(() => {
    if (costPerLot <= 0) return 13;
    return Math.max(1, Math.floor(200000 / costPerLot));
  }, [costPerLot]);

  // Minimum lots for sHNI (₹2,00,001+)
  const minShniLots = useMemo(() => {
    if (costPerLot <= 0) return 14;
    return Math.floor(200000 / costPerLot) + 1;
  }, [costPerLot]);

  // Minimum lots for bHNI (₹10,00,001+)
  const minBhniLots = useMemo(() => {
    if (costPerLot <= 0) return 67;
    return Math.floor(1000000 / costPerLot) + 1;
  }, [costPerLot]);

  // Handle quick category switch
  const handleCategorySwitch = (cat: "retail" | "shni" | "bhni") => {
    setBidCategory(cat);
    if (cat === "retail") setLots(1);
    else if (cat === "shni") setLots(minShniLots);
    else if (cat === "bhni") setLots(minBhniLots);
  };

  // Reset calculator
  const handleReset = () => {
    if (ipos[0]) {
      handleSelectIpo(ipos[0].slug);
    } else {
      setIssuePrice(500);
      setLotSize(30);
      setGmp(80);
      setLots(1);
      setBidCategory("retail");
    }
  };

  return (
    <div className="bg-card border border-line rounded-3xl p-5 sm:p-7 lg:p-8 shadow-xs space-y-7">

      {/* ── Top Bar: IPO Selector & Reset ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-line/60">
        <div className="flex-1 max-w-md space-y-1">
          <label className="text-xs font-semibold text-mut uppercase tracking-wider block">
            Select Active IPO or Enter Custom Values
          </label>
          <select
            value={selectedSlug}
            onChange={(e) => handleSelectIpo(e.target.value)}
            className="w-full bg-card2/80 border border-line rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold text-tx focus:outline-none focus:border-accent transition-all cursor-pointer"
          >
            {ipos.map((ipo) => (
              <option key={ipo.slug} value={ipo.slug}>
                {ipo.name} (Lot: {ipo.lotSize} shares @ ₹{ipo.issuePrice})
              </option>
            ))}
            <option value="custom">-- Custom Values (Manual Input) --</option>
          </select>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-card2 border border-line text-mut hover:text-tx hover:border-accent/60 transition-all self-start sm:self-end"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Inputs
        </button>
      </div>

      {/* ── Main Layout: Inputs on Left, Real-Time Calculations on Right ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* LEFT COLUMN: Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-5">

          {/* 3 Parameter Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {/* Issue Price */}
            <div className="p-3.5 rounded-2xl bg-card2/60 border border-line space-y-1.5">
              <span className="text-[11px] font-semibold text-mut uppercase tracking-wider block">
                Issue Price (₹)
              </span>
              <input
                type="number"
                min="1"
                value={issuePrice}
                onChange={(e) => {
                  setSelectedSlug("custom");
                  setIssuePrice(Math.max(1, parseFloat(e.target.value) || 0));
                }}
                className="w-full bg-card border border-line rounded-lg px-2.5 py-1.5 text-base font-bold font-mono text-tx focus:outline-none focus:border-accent"
              />
            </div>

            {/* Lot Size */}
            <div className="p-3.5 rounded-2xl bg-card2/60 border border-line space-y-1.5">
              <span className="text-[11px] font-semibold text-mut uppercase tracking-wider block">
                Lot Size (Shares)
              </span>
              <input
                type="number"
                min="1"
                value={lotSize}
                onChange={(e) => {
                  setSelectedSlug("custom");
                  setLotSize(Math.max(1, parseInt(e.target.value, 10) || 1));
                }}
                className="w-full bg-card border border-line rounded-lg px-2.5 py-1.5 text-base font-bold font-mono text-tx focus:outline-none focus:border-accent"
              />
            </div>

            {/* Live GMP */}
            <div className="p-3.5 rounded-2xl bg-card2/60 border border-line space-y-1.5">
              <span className="text-[11px] font-semibold text-mut uppercase tracking-wider block">
                Live GMP (₹)
              </span>
              <input
                type="number"
                value={gmp}
                onChange={(e) => {
                  setSelectedSlug("custom");
                  setGmp(parseFloat(e.target.value) || 0);
                }}
                className={`w-full bg-card border border-line rounded-lg px-2.5 py-1.5 text-base font-bold font-mono focus:outline-none focus:border-accent ${
                  gmp >= 0 ? "text-up" : "text-dn"
                }`}
              />
            </div>
          </div>

          {/* Category Selector Tabs */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-mut uppercase tracking-wider block">
              Bidding Category Preset
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleCategorySwitch("retail")}
                className={`p-2.5 rounded-xl text-left border transition-all ${
                  bidCategory === "retail"
                    ? "bg-accent/15 border-accent text-accent"
                    : "bg-card2/70 border-line text-mut hover:text-tx"
                }`}
              >
                <div className="font-heading font-bold text-xs sm:text-sm">Retail</div>
                <div className="text-[10px] opacity-80 mt-0.5">1 to {maxRetailLots} Lots (&lt; ₹2L)</div>
              </button>

              <button
                type="button"
                onClick={() => handleCategorySwitch("shni")}
                className={`p-2.5 rounded-xl text-left border transition-all ${
                  bidCategory === "shni"
                    ? "bg-accent/15 border-accent text-accent"
                    : "bg-card2/70 border-line text-mut hover:text-tx"
                }`}
              >
                <div className="font-heading font-bold text-xs sm:text-sm">Small HNI</div>
                <div className="text-[10px] opacity-80 mt-0.5">{minShniLots}+ Lots (₹2L–₹10L)</div>
              </button>

              <button
                type="button"
                onClick={() => handleCategorySwitch("bhni")}
                className={`p-2.5 rounded-xl text-left border transition-all ${
                  bidCategory === "bhni"
                    ? "bg-accent/15 border-accent text-accent"
                    : "bg-card2/70 border-line text-mut hover:text-tx"
                }`}
              >
                <div className="font-heading font-bold text-xs sm:text-sm">Big HNI</div>
                <div className="text-[10px] opacity-80 mt-0.5">{minBhniLots}+ Lots (&gt; ₹10L)</div>
              </button>
            </div>
          </div>

          {/* Lots Slider & Step Controls */}
          <div className="p-4 rounded-2xl bg-card2/50 border border-line space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-tx">Number of Lots to Apply:</span>
              <span className="font-mono font-bold text-sm text-accent bg-accent/10 px-2.5 py-0.5 rounded-md border border-accent/20">
                {lots} {lots === 1 ? "Lot" : "Lots"} ({totalShares} shares)
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setLots((prev) => Math.max(1, prev - 1))}
                className="w-9 h-9 rounded-xl bg-card border border-line text-tx font-bold hover:bg-card2 active:scale-95 transition-all flex items-center justify-center shrink-0"
              >
                -
              </button>
              <input
                type="range"
                min="1"
                max={Math.max(100, minBhniLots + 20)}
                value={lots}
                onChange={(e) => setLots(Math.max(1, parseInt(e.target.value, 10) || 1))}
                className="flex-1 accent-accent cursor-pointer h-2 bg-card rounded-lg"
              />
              <button
                type="button"
                onClick={() => setLots((prev) => prev + 1)}
                className="w-9 h-9 rounded-xl bg-card border border-line text-tx font-bold hover:bg-card2 active:scale-95 transition-all flex items-center justify-center shrink-0"
              >
                +
              </button>
            </div>

            {/* Quick Lot Pills */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1 text-xs">
              <span className="text-mut text-[11px] mr-1">Presets:</span>
              {[1, 2, 5, 10, maxRetailLots, minShniLots, minBhniLots]
                .filter((v, idx, arr) => arr.indexOf(v) === idx)
                .map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setLots(val)}
                    className={`px-2.5 py-0.5 rounded-md text-[11px] font-mono font-semibold transition-all ${
                      lots === val
                        ? "bg-accent text-accent-foreground shadow-xs"
                        : "bg-card border border-line text-mut hover:text-tx"
                    }`}
                  >
                    {val}L
                  </button>
                ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Real-Time Calculations (5 cols) */}
        <div className="lg:col-span-5 bg-card2/70 border border-line rounded-2xl p-5 space-y-4 shadow-inner">
          <div className="flex items-center justify-between pb-3 border-b border-line/60">
            <span className="text-xs font-bold text-accent uppercase tracking-wider flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5" />
              Calculated Returns
            </span>
            <span className="text-[11px] font-mono text-mut">
              @ ₹{estimatedListingPrice} Est. Price
            </span>
          </div>

          {/* Metric 1: Required Capital */}
          <div className="p-3.5 rounded-xl bg-card border border-line space-y-1">
            <span className="text-[11px] font-semibold text-mut uppercase tracking-wider block">
              Required Capital (Blocked in ASBA)
            </span>
            <span className="text-2xl font-heading font-black text-tx font-mono tabular-nums block">
              {formatINR(totalInvestment)}
            </span>
            <span className="text-[11px] text-mut">
              Cost per single lot: <strong className="text-tx font-mono">{formatINR(costPerLot)}</strong>
            </span>
          </div>

          {/* Metric 2: Estimated Listing Gain */}
          <div className="p-3.5 rounded-xl bg-card border border-line space-y-1">
            <span className="text-[11px] font-semibold text-mut uppercase tracking-wider block">
              Expected Listing Gain (@ Live GMP)
            </span>
            <div className="flex items-baseline gap-2 font-mono">
              <span
                className={`text-2xl font-heading font-black tabular-nums ${
                  totalGain >= 0 ? "text-up" : "text-dn"
                }`}
              >
                {totalGain >= 0 ? `+${formatINR(totalGain)}` : formatINR(totalGain)}
              </span>
              <span
                className={`text-xs font-bold ${
                  gainPercentage >= 0 ? "text-up" : "text-dn"
                }`}
              >
                ({gainPercentage >= 0 ? `+${gainPercentage.toFixed(1)}%` : `${gainPercentage.toFixed(1)}%`})
              </span>
            </div>
            <span className="text-[11px] text-mut">
              Per lot profit: <strong className="text-up font-mono">+{formatINR(lotSize * gmp)}</strong>
            </span>
          </div>

          {/* Metric 3: Total Portfolio Value */}
          <div className="p-3.5 rounded-xl bg-accent/10 border border-accent/25 space-y-1">
            <span className="text-[11px] font-bold text-accent uppercase tracking-wider block">
              Estimated Total Portfolio Value
            </span>
            <span className="text-2xl font-heading font-black text-tx font-mono tabular-nums block">
              {formatINR(totalReturn)}
            </span>
            <span className="text-[11px] text-mut">
              {totalShares} shares × ₹{estimatedListingPrice} expected listing price
            </span>
          </div>

          {/* Quick Notice */}
          <p className="text-[11px] text-mut/80 leading-relaxed pt-1">
            * Listing returns are projections based on unofficial GMP rates. Final profit depends on
            listing day demand and secondary market conditions.
          </p>
        </div>

      </div>
    </div>
  );
}
