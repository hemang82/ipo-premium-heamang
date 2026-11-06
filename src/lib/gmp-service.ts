import axios from "axios";
import { decryptApiResponse } from "./cryptoUtils";
import { slugifyCompanyName } from "./ipo-service";

const BASE_URL = "https://api.ipo-trend.com";

export interface RawGmpIpoItem {
  id: number;
  company_name: string;
  symbol: string;
  security_type?: string;
  listing_at_group?: string;
  price_range?: string;
  price_band?: string;
  gmp?: string | number;
  cutoff_price?: number;
  issue_price?: number | null;
  start_date?: string;
  end_date?: string;
  allotment_date?: string;
  listing_date?: string;
  bid_lot?: number;
  status?: string;
  [key: string]: any;
}

export interface GmpIpoItem {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  categoryType: "live" | "upcoming";
  securityType: string;
  isSme: boolean;
  listingAtGroup: string;
  priceRange: string;
  cutoffPrice: number;
  gmp: number;
  estimatedListingPrice: number;
  expectedGainPercent: number;
  startDate?: string;
  endDate?: string;
  allotmentDate?: string;
  listingDate?: string;
  bidLot?: number;
  image?: string;
}

/**
 * Extract upper price cap from a price range string e.g. "₹150 - ₹158", "66", "150-158"
 */
export function extractCutoffPrice(priceRange?: string, rawCutoff?: number, rawIssuePrice?: number | null): number {
  if (typeof rawCutoff === "number" && rawCutoff > 0) return rawCutoff;
  if (typeof rawIssuePrice === "number" && rawIssuePrice > 0) return rawIssuePrice;
  if (!priceRange) return 0;

  // Clean string and find all numbers
  const cleaned = priceRange.replace(/,/g, "");
  const matches = cleaned.match(/\d+(\.\d+)?/g);
  if (matches && matches.length > 0) {
    // If range (e.g. 150 to 158), take the last number (upper cap)
    const nums = matches.map(Number).filter((n) => !isNaN(n) && n > 0);
    if (nums.length > 0) {
      return nums[nums.length - 1];
    }
  }
  return 0;
}

/**
 * Fetch and merge Live and Upcoming IPOs for the IPO GMP Today page
 */
export async function getIpoGmpList(): Promise<{
  items: GmpIpoItem[];
  updatedAt: string;
}> {
  try {
    const [liveRes, upcomingRes] = await Promise.allSettled([
      axios.post(
        `${BASE_URL}/ipo/new-ipo-list?category=live&page=1&type=all-ipo&platform=Web`,
        {},
        { headers: { "Content-Type": "application/json" }, timeout: 10000 }
      ),
      axios.post(
        `${BASE_URL}/ipo/new-ipo-list?category=upcoming&page=1&type=all-ipo&platform=Web`,
        {},
        { headers: { "Content-Type": "application/json" }, timeout: 10000 }
      ),
    ]);

    let liveRawList: RawGmpIpoItem[] = [];
    let upcomingRawList: RawGmpIpoItem[] = [];

    if (liveRes.status === "fulfilled" && liveRes.value?.data) {
      const dec = decryptApiResponse(liveRes.value.data);
      if (dec?.data?.results && Array.isArray(dec.data.results)) {
        liveRawList = dec.data.results;
      }
    }

    if (upcomingRes.status === "fulfilled" && upcomingRes.value?.data) {
      const dec = decryptApiResponse(upcomingRes.value.data);
      if (dec?.data?.results && Array.isArray(dec.data.results)) {
        upcomingRawList = dec.data.results;
      }
    }

    const mapItem = (raw: RawGmpIpoItem, category: "live" | "upcoming"): GmpIpoItem => {
      const cutoff = extractCutoffPrice(raw.price_range || raw.price_band, raw.cutoff_price, raw.issue_price);
      const numGmp = typeof raw.gmp === "number" ? raw.gmp : parseFloat(String(raw.gmp || "0").replace(/[^0-9.-]/g, "")) || 0;
      
      const estimatedListing = cutoff > 0 ? cutoff + numGmp : numGmp;
      const expectedGain = cutoff > 0 ? Number(((numGmp / cutoff) * 100).toFixed(2)) : 0;
      
      const isSme =
        raw.security_type?.toUpperCase() === "SME" ||
        raw.listing_at_group?.toUpperCase().includes("SME") ||
        false;

      const slug = slugifyCompanyName(raw.company_name);

      return {
        id: raw.id,
        name: raw.company_name,
        symbol: raw.symbol,
        slug,
        categoryType: category,
        securityType: raw.security_type || (isSme ? "SME" : "EQ"),
        isSme,
        listingAtGroup: raw.listing_at_group || "NSE / BSE",
        priceRange: raw.price_range || raw.price_band || (cutoff ? `₹${cutoff}` : "TBA"),
        cutoffPrice: cutoff,
        gmp: numGmp,
        estimatedListingPrice: estimatedListing,
        expectedGainPercent: expectedGain,
        startDate: raw.start_date,
        endDate: raw.end_date,
        allotmentDate: raw.allotment_date,
        listingDate: raw.listing_date,
        bidLot: raw.bid_lot,
        image: raw.ipo_image || raw.logo || raw.image || undefined,
      };
    };

    const liveItems = liveRawList.map((item) => mapItem(item, "live"));
    const upcomingItems = upcomingRawList.map((item) => mapItem(item, "upcoming"));

    // Combined unique list
    const combined = [...liveItems, ...upcomingItems];

    // Current formatted timestamp (e.g. "05 Nov 2026, 18:00 IST")
    const now = new Date();
    const updatedAt = new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    }).format(now) + " IST";

    return {
      items: combined,
      updatedAt,
    };
  } catch (error) {
    console.error("Error in getIpoGmpList:", error);
    return {
      items: [],
      updatedAt: new Date().toLocaleDateString("en-IN") + " IST",
    };
  }
}
