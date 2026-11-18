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

/**
 * Format date to standard format: "19 Nov, 2026" (First letter capitalized only)
 */
export function formatIpoDate(dateStr?: string | Date): string {
  if (!dateStr || dateStr === "-" || dateStr === "TBA") return "-";
  try {
    const toCapitalizedMonth = (d: Date) => {
      const raw = d.toLocaleDateString("en-US", { month: "short" });
      return raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
    };

    if (typeof dateStr === "string") {
      const trimmed = dateStr.trim();
      if (!trimmed || trimmed === "-" || trimmed === "TBA") return "-";
      // Support DD-MM-YYYY format
      if (/^\d{2}-\d{2}-\d{4}$/.test(trimmed)) {
        const parts = trimmed.split("-");
        const d = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
        const day = String(d.getDate()).padStart(2, "0");
        const month = toCapitalizedMonth(d);
        return `${day} ${month}, ${d.getFullYear()}`;
      }
      // Support "19 Nov" without year
      const parts = trimmed.split(/[\s,]+/);
      if (parts.length === 2 && isNaN(Number(parts[1]))) {
        const m = parts[1];
        const month = m.charAt(0).toUpperCase() + m.slice(1).toLowerCase();
        return `${parts[0].padStart(2, "0")} ${month}, ${new Date().getFullYear()}`;
      }
    }
    const d = typeof dateStr === "string" ? new Date(dateStr) : dateStr;
    if (isNaN(d.getTime())) return String(dateStr);
    const day = String(d.getDate()).padStart(2, "0");
    const month = toCapitalizedMonth(d);
    return `${day} ${month}, ${d.getFullYear()}`;
  } catch {
    return String(dateStr);
  }
}

/**
 * Format date without year: "19 Nov" (First letter capitalized only)
 */
export function formatShortDate(dateStr?: string | Date): string {
  if (!dateStr || dateStr === "-" || dateStr === "TBA") return "-";
  try {
    const formatted = formatIpoDate(dateStr);
    if (!formatted || formatted === "-") return "-";
    const withoutYear = formatted.split(",")[0].trim();
    return withoutYear || formatted;
  } catch {
    return String(dateStr);
  }
}

/**
 * Format date range: "18 - 20 Nov, 2026" or "29 Oct - 02 Nov, 2026"
 */
export function formatIpoDateRange(startStr?: string, endStr?: string): string {
  if (!startStr && !endStr) return "-";
  if (!startStr || !endStr) return formatIpoDate(startStr || endStr);

  try {
    const parseDateHelper = (str: string) => {
      const trimmed = str.trim();
      if (/^\d{2}-\d{2}-\d{4}$/.test(trimmed)) {
        const parts = trimmed.split("-");
        return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
      }
      return new Date(trimmed);
    };

    const toCapMonth = (d: Date) => {
      const raw = d.toLocaleDateString("en-US", { month: "short" });
      return raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
    };

    const d1 = parseDateHelper(startStr);
    const d2 = parseDateHelper(endStr);

    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
      return `${formatIpoDate(startStr)} - ${formatIpoDate(endStr)}`;
    }

    const day1 = String(d1.getDate()).padStart(2, "0");
    const day2 = String(d2.getDate()).padStart(2, "0");
    const month1 = toCapMonth(d1);
    const month2 = toCapMonth(d2);
    const year1 = d1.getFullYear();
    const year2 = d2.getFullYear();

    if (year1 === year2 && month1 === month2) {
      return `${day1} - ${day2} ${month1}, ${year1}`;
    }
    if (year1 === year2) {
      return `${day1} ${month1} - ${day2} ${month2}, ${year1}`;
    }
    return `${day1} ${month1}, ${year1} - ${day2} ${month2}, ${year2}`;
  } catch {
    return `${formatIpoDate(startStr)} - ${formatIpoDate(endStr)}`;
  }
}
