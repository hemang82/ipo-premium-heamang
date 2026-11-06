"use client";

import React, { useState } from "react";
import { formatINR } from "@/lib/format";
import { Card } from "@/components/ui/Card";
import { Calculator, ArrowRight } from "lucide-react";

interface LotCalculatorProps {
  issuePrice: number;
  lotSize: number;
  gmp: number;
}

export function LotCalculator({ issuePrice, lotSize, gmp }: LotCalculatorProps) {
  const [lots, setLots] = useState<number>(1);

  const handleLotsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val) || val < 1) {
      setLots(1);
    } else if (val > 100) {
      setLots(100);
    } else {
      setLots(val);
    }
  };

  const totalShares = lots * lotSize;
  const investment = totalShares * issuePrice;
  const estimatedGain = totalShares * gmp;
  const totalReturn = investment + estimatedGain;

  return (
    <Card variant="subtle" className="p-4 sm:p-5 border-line">
      <div className="flex items-center gap-2 mb-3">
        <Calculator className="w-4 h-4 text-accent" />
        <h4 className="font-heading font-bold text-sm text-tx">
          IPO Lot & Return Calculator
        </h4>
      </div>

      <div className="space-y-3">
        {/* Lots input */}
        <div>
          <div className="flex items-center justify-between text-xs text-mut mb-1.5">
            <label htmlFor="lots-input">Number of Lots to Apply</label>
            <span className="font-mono text-tx font-semibold">{lots} Lot(s)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLots((prev) => Math.max(1, prev - 1))}
              className="w-8 h-8 rounded-lg bg-card border border-line text-tx font-bold hover:bg-card2 active:scale-95 transition-all"
            >
              -
            </button>
            <input
              id="lots-input"
              type="range"
              min="1"
              max="20"
              value={lots}
              onChange={handleLotsChange}
              className="flex-1 accent-accent cursor-pointer"
            />
            <button
              type="button"
              onClick={() => setLots((prev) => Math.min(50, prev + 1))}
              className="w-8 h-8 rounded-lg bg-card border border-line text-tx font-bold hover:bg-card2 active:scale-95 transition-all"
            >
              +
            </button>
          </div>
        </div>

        {/* Quick Calculations Table */}
        <div className="pt-2 border-t border-line/60 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-mut">Total Shares Applied:</span>
            <span className="font-semibold text-tx tabular-nums">{totalShares} shares</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-mut">Required Investment (At Cap):</span>
            <span className="font-bold text-tx tabular-nums">{formatINR(investment)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-mut">Expected Listing Gain (@ GMP):</span>
            <span
              className={`font-bold tabular-nums ${
                estimatedGain > 0 ? "text-up" : estimatedGain < 0 ? "text-dn" : "text-tx"
              }`}
            >
              {estimatedGain > 0 ? `+${formatINR(estimatedGain)}` : formatINR(estimatedGain)}
            </span>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-line/40 font-semibold">
            <span className="text-tx">Estimated Portfolio Value:</span>
            <span className="text-accent tabular-nums text-sm font-bold">
              {formatINR(totalReturn)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
