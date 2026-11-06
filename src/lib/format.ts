import { Ipo, GmpSignal } from "./types";

/**
 * Format Indian Rupee currency with ₹ symbol and en-IN commas
 */
export function formatINR(amount: number, options: { decimals?: number; showZero?: boolean } = {}): string {
  if (isNaN(amount)) return "₹0";
  const { decimals = 0 } = options;

  const formatted = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(amount);

  return `₹${formatted}`;
}

/**
 * Format subscription number with 'x' suffix
 */
export function formatSubscription(value: number): string {
  if (isNaN(value)) return "0.00x";
  return `${value.toFixed(2)}x`;
}

/**
 * Format percentage
 */
export function formatPercent(value: number): string {
  if (isNaN(value)) return "0.0%";
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}

/**
 * Calculate GMP percentage relative to issue price (cap)
 */
export function gmpPercent(ipo: Pick<Ipo, "gmp" | "issuePrice">): number {
  if (!ipo.issuePrice || ipo.issuePrice <= 0 || isNaN(ipo.gmp)) return 0;
  return Number(((ipo.gmp / ipo.issuePrice) * 100).toFixed(1));
}

/**
 * Determine GMP signal strength
 * Strong: >= 20%
 * Neutral: >= 8%
 * Weak: < 8%
 */
export function gmpSignal(percent: number): GmpSignal {
  if (percent >= 20) return "Strong";
  if (percent >= 8) return "Neutral";
  return "Weak";
}

/**
 * Estimated listing price
 */
export function estimatedListingPrice(ipo: Pick<Ipo, "issuePrice" | "gmp">): number {
  return (ipo.issuePrice || 0) + (ipo.gmp || 0);
}
