import axios from "axios";
import { decryptApiResponse } from "./cryptoUtils";
import { slugifyCompanyName } from "./ipo-service";

const BASE_URL = "https://api.ipo-trend.com";

export interface SubscriptionDetailItem {
  category: string;
  offered: number;
  applied: number;
  times: number;
}

export interface ApplicationBreakupItem {
  category: string;
  reserved: string;
  applied: string;
  times: string;
}

export interface SubscriptionIpoItem {
  id: number;
  companyName: string;
  symbol: string;
  slug: string;
  startDate?: string;
  endDate?: string;
  bidLot?: number;
  priceRange: string;
  cutoffPrice: number;
  gmp: number;
  gmpPercent: number;
  securityType: string;
  isSme: boolean;
  listingAtGroup: string;
  subscriptionDetail: SubscriptionDetailItem[];
  applicationBreakup: ApplicationBreakupItem[];
  totalOffered: number;
  totalApplied: number;
  totalTimes: number;
  image?: string;
}

export interface SubscriptionResponseData {
  mainboard: SubscriptionIpoItem[];
  sme: SubscriptionIpoItem[];
  updatedAt: string;
}

/**
 * Format Indian number with commas: e.g. 4,90,07,828
 */
export function formatIndianNumber(num: number | string | undefined): string {
  if (num === undefined || num === null || num === "") return "-";
  const n = typeof num === "number" ? num : parseFloat(String(num).replace(/,/g, ""));
  if (isNaN(n)) return String(num);
  return new Intl.NumberFormat("en-IN").format(n);
}

/**
 * Parse raw IPO item into normalized SubscriptionIpoItem
 */
export function normalizeSubscriptionItem(raw: any, isSmeFallback = false): SubscriptionIpoItem {
  const isSme =
    raw.security_type?.toUpperCase() === "SME" ||
    raw.listing_at_group?.toUpperCase().includes("SME") ||
    isSmeFallback;

  const minVal = raw.ipo_min_value;
  const maxVal = raw.ipo_max_value;
  const cutoff = maxVal || minVal || 0;
  let priceRange = "TBA";
  if (minVal && maxVal && minVal !== maxVal) {
    priceRange = `₹${minVal} - ₹${maxVal}`;
  } else if (cutoff) {
    priceRange = `₹${cutoff}`;
  }

  const numGmp = typeof raw.gmp === "number" ? raw.gmp : parseFloat(String(raw.gmp || "0").replace(/[^0-9.-]/g, "")) || 0;
  const gmpPct = cutoff > 0 ? Number(((numGmp / cutoff) * 100).toFixed(1)) : 0;

  // 1. Subscription detail items
  let subDetails: SubscriptionDetailItem[] = [];
  if (Array.isArray(raw.ipo_subscription_detail)) {
    subDetails = raw.ipo_subscription_detail.map((item: any) => {
      const offered = Number(item.offered) || 0;
      const applied = Number(item.applied) || 0;
      let times = Number(item.times) || 0;
      if (times === 0 && offered > 0 && applied > 0) {
        times = Number((applied / offered).toFixed(2));
      }
      return {
        category: item.category || "General",
        offered,
        applied,
        times,
      };
    });
  }

  // Calculate totals
  let totalOffered = 0;
  let totalApplied = 0;
  subDetails.forEach((row) => {
    // Only sum QIB, NIB/NII, RETAIL to avoid double counting sub-HNIs
    const cat = row.category.toUpperCase();
    if (!cat.includes("HNIS") || cat.includes("NIB") || cat === "NII") {
      totalOffered += row.offered;
      totalApplied += row.applied;
    }
  });

  if (totalOffered === 0) {
    totalOffered = subDetails.reduce((acc, r) => acc + r.offered, 0);
    totalApplied = subDetails.reduce((acc, r) => acc + r.applied, 0);
  }

  const totalTimes = totalOffered > 0 ? Number((totalApplied / totalOffered).toFixed(2)) : 0;

  // 2. Application-wise breakup
  let appBreakup: ApplicationBreakupItem[] = [];
  if (raw.appplication_wise_breakup?.data && Array.isArray(raw.appplication_wise_breakup.data)) {
    // Filter out header row if present
    appBreakup = raw.appplication_wise_breakup.data
      .filter((r: any) => r.category !== "Category" && r.times !== "Times")
      .map((r: any) => {
        const reserved = Number(r.reserved) || 0;
        const applied = Number(r.applied) || 0;
        let timesStr = r.times;
        if ((!timesStr || timesStr === "0" || timesStr === "0.0") && reserved > 0 && applied > 0) {
          timesStr = (applied / reserved).toFixed(2);
        }
        return {
          category: r.category,
          reserved: r.reserved,
          applied: r.applied,
          times: timesStr || "0.0x",
        };
      });
  }

  return {
    id: raw.id,
    companyName: raw.company_name,
    symbol: raw.symbol,
    slug: slugifyCompanyName(raw.company_name),
    startDate: raw.start_date,
    endDate: raw.end_date,
    bidLot: raw.bid_lot,
    priceRange,
    cutoffPrice: cutoff,
    gmp: numGmp,
    gmpPercent: gmpPct,
    securityType: raw.security_type || (isSme ? "SME" : "EQ"),
    isSme,
    listingAtGroup: raw.listing_at_group || (isSme ? "BSE/NSE SME" : "BSE/NSE"),
    subscriptionDetail: subDetails,
    applicationBreakup: appBreakup,
    totalOffered,
    totalApplied,
    totalTimes,
    image: raw.ipo_image || raw.logo || raw.image || undefined,
  };
}

/**
 * Fetch and decrypt Live Subscription List
 */
export async function getLiveSubscriptionList(): Promise<SubscriptionResponseData> {
  try {
    const response = await axios.get(
      `${BASE_URL}/ipo/ipo-subscription-list/?platform=Web`,
      {
        headers: { "Content-Type": "application/json" },
        timeout: 10000,
      }
    );

    const decrypted = decryptApiResponse(response.data);
    const results = decrypted?.data?.results || {};

    const rawMainboard = Array.isArray(results.mainboard_ipo) ? results.mainboard_ipo : [];
    const rawSme = Array.isArray(results.sme_ipo) ? results.sme_ipo : [];

    const mainboard = rawMainboard.map((item: any) => normalizeSubscriptionItem(item, false));
    const sme = rawSme.map((item: any) => normalizeSubscriptionItem(item, true));

    const now = new Date();
    const updatedAt = new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    }).format(now) + " IST";

    return {
      mainboard,
      sme,
      updatedAt,
    };
  } catch (error) {
    console.error("Error fetching live subscription list:", error);
    return {
      mainboard: [],
      sme: [],
      updatedAt: new Date().toLocaleDateString("en-IN") + " IST",
    };
  }
}

/**
 * Check if current time is within Indian Stock Market Bidding Hours (Mon-Fri, 10:00 to 17:00 IST)
 */
export function checkIsMarketHours(): boolean {
  try {
    const now = new Date();
    // Convert to IST
    const istString = now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    const istDate = new Date(istString);

    const day = istDate.getDay(); // 0 = Sun, 1 = Mon, ..., 5 = Fri, 6 = Sat
    if (day < 1 || day > 5) return false;

    const hours = istDate.getHours();
    const minutes = istDate.getMinutes();
    const totalMinutes = hours * 60 + minutes;

    // 10:00 AM = 600 mins, 5:00 PM (17:00) = 1020 mins
    return totalMinutes >= 600 && totalMinutes <= 1020;
  } catch (e) {
    return true; // Default fallback to active if timezone parse fails
  }
}
