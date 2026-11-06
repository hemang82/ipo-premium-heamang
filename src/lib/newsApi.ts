/**
 * News API Client for IPO News & Market Updates
 * Endpoint: POST https://docipo.ipotrending.com/api/v1/common/getNewsList
 */

export interface NewsItem {
  id: number | string;
  title: string;
  short_description: string;
  description: string;
  news_url?: string;
  news_image?: string;
  category?: string;
  created_at: string;
  web?: string;
}

export interface NewsPagination {
  page: number;
  limit: number;
  totalRows: number;
  totalPages: number;
}

export interface NewsResponse {
  data: NewsItem[];
  pagination: NewsPagination;
}

const NEWS_API_ENDPOINT = "https://docipo.ipotrending.com/api/v1/common/getNewsList";
const DEFAULT_DOMAIN = process.env.NEXT_PUBLIC_NEWS_DOMAIN || "ipo-premium.com";
const FALLBACK_DOMAIN = "ipogreypremium.com";
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop";

/**
 * Generate a clean URL-friendly slug from a title string
 */
export function slugify(text: string): string {
  if (!text) return "ipo-news-update";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // remove non-alphanumeric chars
    .replace(/[\s_-]+/g, "-") // replace spaces and underscores with single hyphen
    .replace(/^-+|-+$/g, ""); // trim leading & trailing hyphens
}

/**
 * Format date string to Indian locale (en-IN, e.g. "27 Oct 2024")
 */
export function formatNewsDate(dateStr?: string): string {
  if (!dateStr) return "Recent Update";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

/**
 * Fetch paginated list of news articles
 * Caches using Next.js ISR with 3600 seconds (1 hour) revalidation
 */
export async function getNewsList(page = 1, limit = 9): Promise<NewsResponse> {
  const pageNum = Math.max(1, Number(page) || 1);
  const limitNum = Math.max(1, Number(limit) || 9);

  try {
    // 1. Try querying with configured domain
    let res = await fetch(NEWS_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page: pageNum,
        limit: limitNum,
        web: DEFAULT_DOMAIN,
      }),
      next: { revalidate: 3600 },
    });

    let json = await res.json().catch(() => null);
    let items = json?.data?.data || [];
    let pagination = json?.data?.pagination || {
      page: pageNum,
      limit: limitNum,
      totalRows: 0,
      totalPages: 0,
    };

    // 2. If specific domain has no rows yet, gracefully fallback to active IPO database pool
    if (!items || items.length === 0) {
      const fallbackRes = await fetch(NEWS_API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page: pageNum,
          limit: limitNum,
          web: FALLBACK_DOMAIN,
        }),
        next: { revalidate: 3600 },
      });
      const fallbackJson = await fallbackRes.json().catch(() => null);
      if (fallbackJson?.data?.data && fallbackJson.data.data.length > 0) {
        items = fallbackJson.data.data;
        pagination = fallbackJson.data.pagination;
      }
    }

    // 3. Normalize items
    const normalized: NewsItem[] = items.map((item: any) => ({
      id: item.id,
      title: item.title || item.old_title || "IPO Market News Update",
      short_description:
        item.short_description ||
        item.old_short_description ||
        "Read the latest primary market developments, IPO subscriptions, and grey market premium updates.",
      description:
        item.description ||
        item.old_description ||
        item.short_description ||
        "",
      news_url: item.news_url || "",
      news_image: item.news_image || DEFAULT_IMAGE,
      category: item.category || "IPO News",
      created_at: item.created_at || new Date().toISOString(),
      web: item.web || DEFAULT_DOMAIN,
    }));

    const totalRows = Number(pagination.totalRows) || normalized.length;
    const totalPages =
      Number(pagination.totalPages) ||
      Math.ceil(totalRows / limitNum) ||
      1;

    return {
      data: normalized,
      pagination: {
        page: pageNum,
        limit: limitNum,
        totalRows,
        totalPages,
      },
    };
  } catch (error) {
    console.error("Error in getNewsList:", error);
    return {
      data: [],
      pagination: { page: pageNum, limit: limitNum, totalRows: 0, totalPages: 0 },
    };
  }
}

/**
 * Fetch a single news article by ID
 * Fetches list with limit=100 and matches String(item.id) === String(id)
 */
export async function getNewsDetail(id: string | number): Promise<NewsItem | null> {
  if (!id) return null;
  const targetId = String(id).trim();

  try {
    // 1. Search in primary list
    const listResponse = await getNewsList(1, 100);
    const found = listResponse.data.find(
      (item) => String(item.id) === targetId
    );
    if (found) return found;

    // 2. Fallback search across broader API pool
    const poolRes = await fetch(NEWS_API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: 1, limit: 100, web: "" }),
      next: { revalidate: 3600 },
    });
    const poolJson = await poolRes.json().catch(() => null);
    const poolItems = poolJson?.data?.data || [];
    const poolFound = poolItems.find(
      (item: any) => String(item.id) === targetId
    );

    if (poolFound) {
      return {
        id: poolFound.id,
        title: poolFound.title || poolFound.old_title || "IPO Market News Update",
        short_description:
          poolFound.short_description ||
          poolFound.old_short_description ||
          "",
        description:
          poolFound.description ||
          poolFound.old_description ||
          poolFound.short_description ||
          "",
        news_url: poolFound.news_url || "",
        news_image: poolFound.news_image || DEFAULT_IMAGE,
        category: poolFound.category || "IPO News",
        created_at: poolFound.created_at || new Date().toISOString(),
        web: poolFound.web || DEFAULT_DOMAIN,
      };
    }

    return null;
  } catch (error) {
    console.error(`Error in getNewsDetail(${id}):`, error);
    return null;
  }
}
