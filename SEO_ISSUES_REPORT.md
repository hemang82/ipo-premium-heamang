# Complete Technical SEO Audit & Issues Report

**Domain:** [https://ipo-premium.com/](https://ipo-premium.com/)  
**Target Market:** India (Financial Niche – Initial Public Offerings & Grey Market Premium)  
**Niche Classification:** YMYL (Your Money Your Life) – Financial Markets & Investment Indicators  
**Auditor:** Senior Technical SEO Auditor & Next.js Engineer  
**Framework:** Next.js 15.1.0 (App Router), React 19  
**Audit Date:** November 2026  

---

## 1. Executive Summary

| Audit Dimension | Score | Rating | Summary |
| :--- | :--- | :--- | :--- |
| **Technical SEO** | **58 / 100** | Needs Immediate Attention | Trailing slash conflicts between sitemap & canonicals, robots.txt blocking `/_next/`, missing homepage canonical, 307 temporary redirect instead of 308, missing security & cache headers. |
| **On-Page SEO** | **64 / 100** | Fair / Unoptimized | Weak Homepage H1 lacking primary keywords, duplicate brand suffix (`... \| ipo-premium \| ipo-premium`) across multiple routes, titles over 60 characters, keyword cannibalization between guides and articles. |
| **Content & E-E-A-T** | **52 / 100** | High YMYL Risk | Missing author bios & SEBI analyst credentials, thin duplicate guide page, lack of day-by-day GMP trend history tables, outdated "2024–25" keywords. |
| **Structured Data** | **62 / 100** | Incomplete | Broken logo reference (`logo.png` returns 404), missing WebSite SearchAction schema, missing Article schema on educational guides, missing financial offering/dataset schema on IPO detail pages. |
| **Performance & CWV** | **55 / 100** | High Latency Risk | Render-blocking `@import` Google Fonts in CSS, `images: { unoptimized: true }` in `next.config.js`, non-responsive raw `<img>` tags without explicit dimensions causing mobile layout shifts (CLS). |
| **Overall SEO Score** | **58 / 100** | **Grade: C** | **Verdict: PARTLY READY (Not viable for Top 5 Google rankings against Chittorgarh, InvestorGain & IPOWatch without implementing Critical/High fixes)** |

### Issues Summary by Severity
- 🔴 **CRITICAL (P0):** 8 Issues (Must fix before indexing / active ranking)
- 🟠 **HIGH (P1):** 11 Issues (Directly impairs CTR, ranking signals & Core Web Vitals)
- 🟡 **MEDIUM (P2):** 12 Issues (Structured data gaps, cannibalization, UX & crawl efficiency)
- 🟢 **LOW (P3):** 7 Issues (Code hygiene, minor schema enhancements, microcopy)
- **Total Issues Identified:** **38 Issues**

---

## 2. Comprehensive Issue Ledger

### 🔴 CRITICAL ISSUES (P0)

#### SEO-001 | Canonical Conflict: Inconsistent Trailing Slashes Between Sitemap and Pages
- **Category:** Technical SEO / Indexing & Canonicals
- **Page/URL:** Sitewide (`/ipo-gmp`, `/ipo/live`, `/ipo/upcoming`, `/ipo/listed`, `/subscription`, `/allotment`, `/tools/lot-calculator`, `/faq`, `/news`)
- **File + Line:** `src/app/sitemap.ts:10-95` vs individual page metadata files
- **Problem:** In `src/app/sitemap.ts`, all static URLs have a trailing slash (e.g., `https://ipo-premium.com/ipo-gmp/`, `https://ipo-premium.com/subscription/`). However, in `src/app/ipo-gmp/page.tsx:14`, `src/app/subscription/page.tsx:14`, and Next.js router (`trailingSlash: false` by default), the canonical tags and internal links are defined WITHOUT trailing slashes (`https://ipo-premium.com/ipo-gmp`).
- **Why it matters:** Google receives conflicting signals. It visits the sitemap URL with a slash, gets redirected or finds a canonical pointing to the non-slashed version. This wastes crawl budget, creates 308 redirect loops, splits link equity (PageRank), and can cause Google Search Console to report *"Duplicate without user-selected canonical"*.
- **Fix:** Standardize the entire domain on **no trailing slash** (standard Next.js default) across `sitemap.ts`, `next.config.js`, and all metadata canonicals.
```typescript
// in src/app/sitemap.ts:
const staticRoutes: MetadataRoute.Sitemap = [
  { url: `${SITE_URL}`, lastModified: currentDate, changeFrequency: "hourly", priority: 1.0 },
  { url: `${SITE_URL}/ipo-gmp`, lastModified: currentDate, changeFrequency: "always", priority: 1.0 },
  { url: `${SITE_URL}/ipo/live`, lastModified: currentDate, changeFrequency: "always", priority: 1.0 },
  { url: `${SITE_URL}/ipo/upcoming`, lastModified: currentDate, changeFrequency: "hourly", priority: 0.95 },
  { url: `${SITE_URL}/ipo/listed`, lastModified: currentDate, changeFrequency: "daily", priority: 0.9 },
  { url: `${SITE_URL}/subscription`, lastModified: currentDate, changeFrequency: "always", priority: 1.0 },
  { url: `${SITE_URL}/articles`, lastModified: currentDate, changeFrequency: "daily", priority: 0.9 },
  { url: `${SITE_URL}/tools/lot-calculator`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.8 },
  { url: `${SITE_URL}/faq`, lastModified: currentDate, changeFrequency: "daily", priority: 0.85 },
  { url: `${SITE_URL}/allotment`, lastModified: currentDate, changeFrequency: "daily", priority: 0.8 },
  { url: `${SITE_URL}/news`, lastModified: currentDate, changeFrequency: "hourly", priority: 0.9 },
  { url: `${SITE_URL}/about`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.5 },
  { url: `${SITE_URL}/disclaimer`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.5 },
  { url: `${SITE_URL}/privacy-policy`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.5 },
];
```
- **Effort:** Low
- **Status:** [ ] Open

---

#### SEO-002 | Missing Canonical Tag on Homepage (`/`)
- **Category:** Technical SEO / Canonicals
- **Page/URL:** `https://ipo-premium.com/`
- **File + Line:** `src/app/page.tsx:1-86`, `src/lib/seo.ts:9-67`
- **Problem:** `src/app/page.tsx` does not export a `metadata` object; it relies entirely on `getBaseMetadata()` in `src/lib/seo.ts`. However, `getBaseMetadata()` omits the `alternates.canonical` field. Consequently, the homepage has no self-referencing canonical tag.
- **Why it matters:** If users or bots access `https://ipo-premium.com`, `https://ipo-premium.com/?type=All`, or `https://ipo-premium.com/?status=Open`, search engines may index the query parameter versions as separate URLs or flag duplicate content, diluting the homepage's domain authority.
- **Fix:** Add `alternates: { canonical: SITE_URL }` in `getBaseMetadata()` in `src/lib/seo.ts` and explicitly set it in `src/app/page.tsx`.
```typescript
// In src/lib/seo.ts:
export function getBaseMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: SITE_URL,
    },
    // ...
  };
}
```
- **Effort:** Low
- **Status:** [ ] Open

---

#### SEO-003 | robots.txt Disallows `/_next/` (Blocks Asset Crawling for Bots)
- **Category:** Technical SEO / Crawling
- **Page/URL:** `https://ipo-premium.com/robots.txt`
- **File + Line:** `src/app/robots.ts:10`
- **Problem:** `disallow: ["/api/", "/_next/"]` explicitly blocks search bots from crawling the `/_next/` directory.
- **Why it matters:** Googlebot and Bingbot require access to JavaScript chunks and CSS bundles located inside `/_next/static/` to properly render the DOM, execute client hydration, verify mobile-friendliness, and calculate Core Web Vitals (LCP/CLS). Blocking `/_next/` can cause indexing degradation and *"Page cannot be properly rendered"* warnings in Search Console.
- **Fix:** Update `src/app/robots.ts` to allow `/_next/static/` or remove the `/_next/` disallow rule:
```typescript
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
```
- **Effort:** Low
- **Status:** [ ] Open

---

#### SEO-004 | Sitemap Omits All Educational Articles (`/articles/[slug]`) and News Articles
- **Category:** Technical SEO / Indexation & Sitemap
- **Page/URL:** `https://ipo-premium.com/sitemap.xml`
- **File + Line:** `src/app/sitemap.ts:97-105`
- **Problem:** `src/app/sitemap.ts` dynamically maps IPO detail routes (`/ipo/[slug]/[symbol]`), but completely ignores all static research articles from `staticArticles` in `src/lib/articles-data.ts`, all dynamic news articles from `getNewsList()`, and `/privacy-policy`.
- **Why it matters:** 8 high-value educational guides (e.g. `what-is-ipo-gmp-grey-market-premium`, `kostak-rate-vs-subject-to-sauda-differences`) and hundreds of daily IPO news pages will not be submitted to Googlebot via sitemap, severely slowing discovery and organic indexing.
- **Fix:** Import `staticArticles` and `getNewsList` into `src/app/sitemap.ts` and append their routes to the exported sitemap array.
```typescript
import { staticArticles } from "@/lib/articles-data";
import { getNewsList } from "@/lib/newsApi";

// Append articleRoutes:
const articleRoutes: MetadataRoute.Sitemap = staticArticles.map((article) => ({
  url: `${SITE_URL}/articles/${article.slug}`,
  lastModified: currentDate,
  changeFrequency: "weekly",
  priority: 0.8,
}));
```
- **Effort:** Medium
- **Status:** [ ] Open

---

#### SEO-005 | Temporary 307 Redirect on `/ipo/[slug]` Instead of Permanent 308
- **Category:** Technical SEO / Redirects & Link Equity
- **Page/URL:** `/ipo/[slug]` -> `/ipo/[slug]/[symbol]/`
- **File + Line:** `src/app/ipo/[slug]/page.tsx:19`
- **Problem:** Line 19 executes `redirect(\`/ipo/${ipo.slug}/${ipo.symbol}/\`)`. Next.js `redirect()` throws a `NEXT_REDIRECT` with HTTP 307 (Temporary Redirect).
- **Why it matters:** HTTP 307 does not instruct Googlebot to pass link equity (PageRank) permanently from old or short URLs to the canonical destination. If external blogs or backlinks link to `/ipo/swiggy-limited`, PageRank is diluted.
- **Fix:** Replace `redirect()` with `permanentRedirect()` from `next/navigation` which sends a clean HTTP 308 (Permanent Redirect):
```typescript
import { notFound, permanentRedirect } from "next/navigation";

export default async function IpoSlugRedirectPage({ params }: PageProps) {
  const resolved = await params;
  const ipo = await getIpoBySlug(resolved.slug);
  if (!ipo) notFound();

  permanentRedirect(`/ipo/${ipo.slug}/${ipo.symbol}`);
}
```
- **Effort:** Low
- **Status:** [ ] Open

---

#### SEO-006 | Double Brand Suffix in Page Titles Due to Title Template Misconfiguration
- **Category:** On-Page SEO / Meta Titles & CTR
- **Page/URL:** `/news`, `/news/[id]/[slug]`, `/articles`, `/articles/[slug]`, `/about`, `/disclaimer`, `/privacy-policy`
- **File + Line:** `src/app/layout.tsx:9`, `src/lib/seo.ts:14`, `src/app/articles/page.tsx:9`, `src/app/news/page.tsx:31`
- **Problem:** `src/lib/seo.ts` sets `template: "%s | ipo-premium"`. However, multiple pages explicitly append `| ipo-premium` in their own page titles (e.g., `title: "IPO Guides & Research Articles | ipo-premium"` in `articles/page.tsx`, `title: "Latest IPO News & Market Trends | ipo-premium"` in `news/page.tsx`). Next.js renders:
  `IPO Guides & Research Articles | ipo-premium | ipo-premium`
- **Why it matters:** Google truncates messy duplicate titles in SERP snippets. It appears amateurish, triggers keyword stuffing warnings, lowers click-through rate (CTR), and pushes primary keywords out of view on mobile screens.
- **Fix:** Strip the `| ipo-premium` suffix from all individual page titles and let the `template` in `src/lib/seo.ts` handle the brand suffix automatically.
- **Effort:** Low
- **Status:** [ ] Open

---

#### SEO-007 | Organization Schema Points to Non-Existent `logo.png` (404 Error)
- **Category:** Structured Data / Schema Integrity
- **Page/URL:** Sitewide (Rendered on every page via `RootLayout`)
- **File + Line:** `src/lib/seo.ts:125`, `src/app/layout.tsx:26, 52`
- **Problem:** Line 125 declares `logo: "${SITE_URL}/logo.png"`. There is no `logo.png` inside the `public/` folder.
- **Why it matters:** Google's Structured Data Testing Tool and Rich Results Test flag this as an invalid image URL error. Search engines will not show rich logo cards or Knowledge Panels when structured asset URLs return HTTP 404.
- **Fix:** Place a high-resolution `logo.png` (512x512) into `public/logo.png` or reference the newly created `public/icon.svg`.
- **Effort:** Low
- **Status:** [ ] Open

---

#### SEO-008 | Render-Blocking External Google Fonts in CSS (`@import url`)
- **Category:** Performance / Core Web Vitals (FCP, LCP)
- **Page/URL:** Sitewide
- **File + Line:** `src/app/globals.css:5`
- **Problem:** `src/app/globals.css` loads fonts via CSS `@import url('https://fonts.googleapis.com/css2?family=Inter:...&family=Plus+Jakarta+Sans:...');`.
- **Why it matters:** CSS `@import` blocks HTML parsing and creates a critical rendering bottleneck. The browser must finish loading `globals.css`, make an external DNS handshake to Google Fonts, download the font CSS, and only then download the `.woff2` font files. This delays First Contentful Paint (FCP) and Largest Contentful Paint (LCP) by 400ms to 1200ms on mobile networks in India.
- **Fix:** Migrate to Next.js native font optimization (`next/font/google`) in `src/app/layout.tsx`. Next.js self-hosts the fonts at build time with zero external network roundtrips.
- **Effort:** Medium
- **Status:** [ ] Open

---

### 🟠 HIGH SEVERITY ISSUES (P1)

#### SEO-009 | Homepage Primary Keyword Absent from `<h1>` Tag
- **Category:** On-Page SEO / Header Hierarchy
- **Page/URL:** `https://ipo-premium.com/`
- **File + Line:** `src/components/home/HeroSection.tsx:97-100`
- **Problem:** The only `<h1>` tag on the homepage is:
  `<h1>Know the premium before you apply</h1>`
  It completely lacks the phrase "IPO GMP", "Grey Market Premium", or "IPO Tracker".
- **Why it matters:** Google gives substantial weight to the text in the `<h1>` tag for establishing page topic relevance. Competitors (InvestorGain, Chittorgarh) use descriptive H1 tags like *"IPO GMP Today - Live Grey Market Premium"*. Having a purely promotional slogan as the H1 significantly hurts ranking for the core keyword "IPO GMP Today".
- **Fix:** Revise the H1 in `HeroSection.tsx` to include the primary keyword while maintaining brand identity:
```tsx
<h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-tx tracking-tight leading-[1.15] mb-2.5">
  IPO GMP Today – <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-[#F3C5B5] to-accent">Live Grey Market Premium</span> Tracker
</h1>
```
- **Effort:** Low
- **Status:** [ ] Open

---

#### SEO-010 | Next.js Image Optimization Disabled (`images: { unoptimized: true }`)
- **Category:** Performance / Core Web Vitals (LCP)
- **Page/URL:** Sitewide (especially `/news`, `/news/[id]/[slug]`, `/`)
- **File + Line:** `next.config.js:4-6`
- **Problem:** `next.config.js` contains `images: { unoptimized: true }`. Furthermore, all components use standard HTML `<img>` tags rather than Next.js `<Image />`.
- **Why it matters:** Images are served uncompressed in their original formats (heavy PNGs/JPEGs) without modern AVIF/WebP conversion, responsive `srcset`, or lazy-loading optimizations. On news pages and IPO logos, this inflates page payload by several megabytes, degrading Largest Contentful Paint (LCP) on Indian mobile networks.
- **Fix:** Enable Next.js image optimization in `next.config.js` and specify allowed image remote domains (`images.unsplash.com`, IPO registrar CDN domains):
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '**' },
    ],
  },
};
```
- **Effort:** Medium
- **Status:** [ ] Open

---

#### SEO-011 | Meta Titles Exceeding 60 Characters Across Core Landing Pages
- **Category:** On-Page SEO / SERP Snippets & CTR
- **Page/URL:** `/ipo-gmp`, `/ipo/live`, `/ipo/upcoming`, `/ipo/listed`, `/subscription`, `/allotment`, `/tools/lot-calculator`
- **File + Line:** `src/app/ipo-gmp/page.tsx:10`, `src/app/ipo/live/page.tsx:10`, `src/app/ipo/upcoming/page.tsx:9`, `src/app/subscription/page.tsx:10`, `src/app/allotment/page.tsx:27`
- **Problem:** Adding the layout template (` | ipo-premium`, 14 chars) pushes almost all main page titles over 75–88 characters.
  - `/ipo/upcoming`: `Upcoming IPO 2024–25 – All Upcoming IPOs with Dates, GMP & Allotment | ipo-premium` (**84 characters**)
  - `/allotment`: `Check IPO Allotment Status Online – Live & Upcoming IPOs Allotment Dates | ipo-premium` (**87 characters**)
  - `/ipo/listed`: `Listed IPO 2024–25 – Recently Listed IPOs with Listing Day Gain & GMP | ipo-premium` (**87 characters**)
- **Why it matters:** Google automatically truncates titles longer than ~580–600 pixels (roughly 60 characters) with an ellipsis (`...`), often cutting off key terms and dates, reducing SERP visibility and click-through rates.
- **Fix:** Shorten base titles to 42–48 characters so that `Base Title + " | ipo-premium"` stays strictly under 60 characters. (See `SEO_TITLE_DESCRIPTION_REWRITES.md` for exact formulas).
- **Effort:** Low
- **Status:** [ ] Open

---

#### SEO-012 | Outdated Years ("2024–25") Hardcoded in Page Titles and Descriptions
- **Category:** Content SEO / Freshness & Search Intent
- **Page/URL:** `/ipo/live`, `/ipo/upcoming`, `/ipo/listed`
- **File + Line:** `src/app/ipo/live/page.tsx:10, 26`, `src/app/ipo/upcoming/page.tsx:9, 25`, `src/app/ipo/listed/page.tsx:9, 25`
- **Problem:** Titles and Open Graph tags explicitly state `"2024–25"` (e.g. `Live IPO 2024–25`, `Upcoming IPO 2024–25`).
- **Why it matters:** For stock market searches in 2025/2026, users search for *"Upcoming IPO 2025"* or *"Upcoming IPO 2026"*. Search snippets mentioning "2024" look expired and out of date. Google's freshness algorithms devalue stale timestamps on fast-moving financial queries.
- **Fix:** Replace hardcoded "2024–25" with current dynamically updated years or evergreen high-intent phrasing (e.g., `Upcoming IPOs in India 2025–2026 | Dates, GMP & Details`).
- **Effort:** Low
- **Status:** [ ] Open

---

#### SEO-013 | Keyword Cannibalization: Duplicate URLs for "What is IPO GMP"
- **Category:** Content SEO / Architecture & Cannibalization
- **Page/URL:**
  1. `https://ipo-premium.com/guides/what-is-ipo-gmp`
  2. `https://ipo-premium.com/articles/what-is-ipo-gmp-grey-market-premium`
- **File + Line:** `src/app/guides/what-is-ipo-gmp/page.tsx` vs `src/lib/articles-data.ts:17-46`
- **Problem:** Two separate URLs exist for the exact same informational search intent ("What is IPO GMP"). `/guides/what-is-ipo-gmp` contains very short, thin content (~150 words), while `/articles/what-is-ipo-gmp-grey-market-premium` contains the full 6-minute research article.
- **Why it matters:** Search engines split keyword rankings between both URLs, preventing either from reaching the Top 5. Google may flag the shorter guide as "thin content".
- **Fix:** 308 redirect `/guides/what-is-ipo-gmp` to `/articles/what-is-ipo-gmp-grey-market-premium`, update all footer links to point to the canonical article, and remove the redundant route.
- **Effort:** Low
- **Status:** [ ] Open

---

#### SEO-014 | Dynamic IPO Detail Description Length Exceeds Google Limits (280–320 Chars)
- **Category:** On-Page SEO / SERP Snippets
- **Page/URL:** `/ipo/[slug]/[symbol]` (All IPO Detail Pages)
- **File + Line:** `src/lib/seo.ts:87-88`
- **Problem:** In `getIpoMetadata(ipo)`:
  `const description = \`${aboutSnippet} Check live GMP ₹${ipo.gmp} (${formatPercent(pct)} listing gain), price band ${ipo.priceBand}, lot size ${ipo.lotSize}, subscription status (${formatSubscription(subTotal)}), and key allotment dates.\`;`
  `aboutSnippet` alone is sliced to 160 chars. Adding the 130-char tail results in descriptions of **290–310 characters**.
- **Why it matters:** Google truncates meta descriptions after 155–160 characters. Crucial decision-making data placed at the end (lot size, subscription status, allotment dates) will be truncated.
- **Fix:** Re-engineer description string templating: put the high-converting financial metrics first (GMP, Price Band, Listing Gain) and truncate the company summary to fit within 155 characters total.
- **Effort:** Low
- **Status:** [ ] Open

---

#### SEO-015 | Missing SearchAction WebSite Schema (No Sitelinks Search Box)
- **Category:** Structured Data / SERP Features
- **Page/URL:** Homepage (`https://ipo-premium.com/`)
- **File + Line:** `src/lib/seo.ts:119-128`, `src/app/page.tsx:60-68`
- **Problem:** The site has a working global search mechanism (`HeroSection.tsx`), but no `WebSite` structured data with `potentialAction: SearchAction` is declared in JSON-LD.
- **Why it matters:** A Sitelinks Search Box allows Google users to search IPOs directly inside Google search results, dominating SERP real estate for branded queries (`ipo premium`).
- **Fix:** Add a `WebSite` schema with `SearchAction` targeting `https://ipo-premium.com/?q={search_term_string}`:
```typescript
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ipo-premium",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}
```
- **Effort:** Low
- **Status:** [ ] Open

---

#### SEO-016 | Missing Security and Caching Headers in `next.config.js`
- **Category:** Technical SEO / Security & Crawl Health
- **Page/URL:** Sitewide
- **File + Line:** `next.config.js:1-9`
- **Problem:** `next.config.js` lacks HTTP security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`) and does not configure `poweredByHeader: false`.
- **Why it matters:** Exposes `x-powered-by: Next.js` (unnecessary fingerprinting), leaves the site open to clickjacking iframe attacks, and misses browser security signals factored into modern page experience evaluations.
- **Fix:** Add a `headers()` configuration block in `next.config.js` with standard OWASP-recommended headers.
- **Effort:** Low
- **Status:** [ ] Open

---

#### SEO-017 | Missing Google Search Console & Bing Webmaster Verification Tags
- **Category:** Technical SEO / Verification & Monitoring
- **Page/URL:** Sitewide
- **File + Line:** `src/lib/seo.ts:10-58`
- **Problem:** No verification metadata (`google-site-verification` or `msvalidate.01`) exists in `getBaseMetadata()`.
- **Why it matters:** Search Console cannot verify ownership via HTML tag without external DNS access. Fast indexing verification in Bing and Google requires verified property status.
- **Fix:** Add `verification` object in `src/lib/seo.ts`:
```typescript
verification: {
  google: "YOUR_GOOGLE_SEARCH_CONSOLE_CODE",
  bing: "YOUR_BING_VERIFICATION_CODE",
},
```
- **Effort:** Low
- **Status:** [ ] Open

---

#### SEO-018 | Dynamic Detail Page H1 Lacks High-Volume Search Keywords
- **Category:** On-Page SEO / Header Optimization
- **Page/URL:** `/ipo/[slug]/[symbol]`
- **File + Line:** `src/components/ipo/IpoDetailsClientLayout.tsx:157-158`
- **Problem:** The H1 on detail pages is simply:
  `<h1>{ipo.name} IPO Details</h1>`
- **Why it matters:** In India, 85%+ of searches for individual IPOs include the words "GMP", "Review", or "Subscription" (e.g. *"NTPC Green IPO GMP Today"* or *"Swiggy IPO Subscription Status"*). An H1 with only "IPO Details" misses the primary keyword search intent.
- **Fix:** Upgrade the H1 to:
  `<h1>{ipo.name} IPO GMP Today, Review & Subscription Status</h1>`
- **Effort:** Low
- **Status:** [ ] Open

---

#### SEO-019 | Google Analytics 4 (GA4) Tag Incomplete in GTM Script
- **Category:** Technical SEO / Analytics & Conversion Tracking
- **Page/URL:** Sitewide
- **File + Line:** `src/app/layout.tsx:41-47`
- **Problem:** `src/app/layout.tsx` initializes `window.dataLayer` and defines `gtag()`, but never calls `gtag('config', 'G-XXXXXXXXXX')`.
- **Why it matters:** If the GTM container (`GTM-TBGC8L9K`) does not have a published GA4 configuration tag, or if GTM is blocked by user ad-blockers, zero analytics data, traffic sources, or user engagement metrics are recorded.
- **Fix:** Ensure GA4 measurement ID is properly configured inside the GTM container, or implement native Google Analytics tag with consent mode.
- **Effort:** Low
- **Status:** [ ] Open

---

### 🟡 MEDIUM SEVERITY ISSUES (P2)

#### SEO-020 | Missing Dedicated SME IPO Hub Page
- **Category:** Content SEO / Keyword Opportunities
- **Page/URL:** Missing `/sme-ipo` or `/sme-ipo-gmp`
- **Problem:** SME IPOs have explosive retail search volume in India (e.g., "SME IPO GMP Today", "Upcoming SME IPOs"). Currently, SME IPOs are only available as a JavaScript filter tab on `/ipo-gmp` and `/`. There is no dedicated, indexable URL targeting the standalone keyword "SME IPO GMP Today".
- **Why it matters:** Search engines cannot index a JavaScript state change. Competitors (InvestorGain, Chittorgarh) have dedicated URLs ranking for *"SME IPO GMP"* and capturing massive traffic.
- **Fix:** Create `src/app/sme-ipo-gmp/page.tsx` with dedicated metadata, pre-filtered SME data, and custom introductory SEO content.
- **Effort:** Medium
- **Status:** [ ] Open

---

#### SEO-021 | Missing Article / BlogPosting Schema on Research Articles
- **Category:** Structured Data / Content Rich Snippets
- **Page/URL:** `/articles/[slug]`
- **File + Line:** `src/app/articles/[slug]/page.tsx:68-71`
- **Problem:** Article detail pages only output `BreadcrumbList` schema. They lack `Article` or `BlogPosting` structured data with `headline`, `author`, `datePublished`, `dateModified`, and `publisher`.
- **Why it matters:** Rich snippets (author byline, publication date, Google Discover eligibility) require valid `Article` schema.
- **Fix:** Inject `Article` JSON-LD schema into `ArticleDetailPage`.
- **Effort:** Low
- **Status:** [ ] Open

---

#### SEO-022 | Generic Alt Text on IPO Logos and External Images
- **Category:** On-Page SEO / Image SEO
- **Page/URL:** Sitewide (`/`, `/ipo-gmp`, `/ipo/[slug]/[symbol]`)
- **File + Line:** `src/components/ipo/IpoLogo.tsx:32`
- **Problem:** `IpoLogo.tsx` sets `alt={cleanName}` (e.g. `alt="Swiggy"`).
- **Why it matters:** Google Image Search associates images with surrounding text and alt tags. Alt text like `alt="Swiggy IPO Logo & Issue Details"` improves relevance for brand + IPO image searches.
- **Fix:** Update line 32 to: `alt={\`${cleanName} IPO Logo - Live GMP & Allotment Tracker\`}`.
- **Effort:** Low
- **Status:** [ ] Open

---

#### SEO-023 | Missing Author Byline and Financial Disclosures on Articles (E-E-A-T)
- **Category:** Content SEO / E-E-A-T & YMYL
- **Page/URL:** `/articles`, `/articles/[slug]`, `/news/[id]/[slug]`
- **File + Line:** `src/app/articles/[slug]/page.tsx:107-116`
- **Problem:** Articles show "6 min read • October 2026", but do not display an author name, author biography, SEBI registration status, or editorial review credentials.
- **Why it matters:** Google's Quality Rater Guidelines and Helpful Content System heavily penalize anonymous financial content in YMYL niches. Stating "Written by Financial Analyst / Reviewed by SEBI RIA" with link to author profile is essential for top rankings.
- **Fix:** Add an Author Bio box at the bottom of all articles with author photo, credentials, LinkedIn link, and editorial policy.
- **Effort:** Medium
- **Status:** [ ] Open

---

#### SEO-024 | Missing OpenGraph Image Fallback in Base Metadata
- **Category:** On-Page SEO / Social Signals & CTR
- **Page/URL:** Pages relying on `getBaseMetadata()` (`/`, `/about`, `/disclaimer`, `/privacy-policy`)
- **File + Line:** `src/lib/seo.ts:43-57`
- **Problem:** `getBaseMetadata()` sets `openGraph.type` and `title`, but does not define an explicit `openGraph.images` array.
- **Why it matters:** When links are shared on WhatsApp, Telegram, X, or LinkedIn, a missing OG image causes social platforms to show a blank card or scrape random UI icons, reducing click-through rates.
- **Fix:** Add standard 1200x630 OG image in `getBaseMetadata()`:
```typescript
openGraph: {
  images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "ipo-premium" }],
}
```
- **Effort:** Low
- **Status:** [ ] Open

---

#### SEO-025 | Lack of Historic Day-by-Day GMP Trend Table on Detail Pages
- **Category:** Content SEO / Search Intent & Competitor Gap
- **Page/URL:** `/ipo/[slug]/[symbol]`
- **File + Line:** `src/components/ipo/IpoDetailsClientLayout.tsx`
- **Problem:** Competitor pages (InvestorGain, IPOWatch) feature a daily table: Date | GMP (₹) | Sub2Sauda | Kostak | Estimated Listing Price. `ipo-premium.com` displays current GMP and a small chart, but lacks the structured daily table that Google scrapes for featured snippets.
- **Why it matters:** Google often generates "GMP movement" table snippets directly from HTML tables.
- **Fix:** Ensure `gmpData` history is rendered as a clean, responsive HTML `<table>` with proper `<thead>`, `<tbody>`, and date rows.
- **Effort:** Medium
- **Status:** [ ] Open

---

#### SEO-026 | Inconsistent Page Title Delimiters Across Routes
- **Category:** On-Page SEO / Branding & Consistency
- **Page/URL:** Sitewide
- **Problem:** Some pages use en-dashes (`–`), some use colons (`:`), some use pipes (`|`), and some use hyphens (`-`).
- **Why it matters:** Inconsistent SERP formatting weakens brand recognition across search results.
- **Fix:** Standardize on: `Primary Keyword – Secondary Hook | ipo-premium` across all routes.
- **Effort:** Low
- **Status:** [ ] Open

---

#### SEO-027 | Missing Static IPO Calendar / Schedule Page
- **Category:** Content SEO / Competitor Gap
- **Page/URL:** Missing `/ipo-calendar`
- **Problem:** "IPO Calendar 2025/2026" is a high-volume monthly query in India. While `/ipo/upcoming` lists upcoming issues, a dedicated calendar view categorized by opening and listing dates is missing.
- **Why it matters:** Chittorgarh and LiveMint dominate the "IPO Calendar" query because they maintain a dedicated calendar table page.
- **Fix:** Add a dedicated `/ipo-calendar` page or add a calendar view toggle to `/ipo/upcoming`.
- **Effort:** Medium
- **Status:** [ ] Open

---

#### SEO-028 | Client-Side Hydration Risk in Market Hours Evaluation
- **Category:** Technical SEO / Hydration
- **Page/URL:** `/subscription`
- **File + Line:** `src/components/subscription/SubscriptionClient.tsx:42-50`
- **Problem:** `checkMarketHoursClient()` runs inside `SubscriptionClient`, which can produce different output during server rendering (UTC) versus client browser execution (IST), potentially causing React hydration mismatches.
- **Why it matters:** React hydration errors can cause Next.js to discard the server-rendered HTML and re-render entirely on the client, causing layout shifts (CLS) and brief content flashes that hinder web crawlers.
- **Fix:** Ensure market hours status is computed on the server and passed as a static prop, with client updates isolated to a `useEffect` hook.
- **Effort:** Low
- **Status:** [ ] Open

---

#### SEO-029 | Missing Breadcrumb Schema on `/articles` and `/guides`
- **Category:** Structured Data / Navigation
- **Page/URL:** `/articles`, `/guides/what-is-ipo-gmp`
- **File + Line:** `src/app/articles/page.tsx:17-40`
- **Problem:** While `BreadcrumbList` schema is implemented on `/allotment`, `/faq`, and `/ipo/[slug]/[symbol]`, it is omitted on the main `/articles` index page.
- **Why it matters:** Google uses breadcrumb markup to render navigation paths in search results instead of raw URLs.
- **Fix:** Inject `getBreadcrumbSchema([{ name: "Home", url: SITE_URL }, { name: "Articles", url: \`${SITE_URL}/articles\` }])` into `articles/page.tsx`.
- **Effort:** Low
- **Status:** [ ] Open

---

#### SEO-030 | Meta Descriptions Under 100 Characters on Policy Pages
- **Category:** On-Page SEO / Meta Descriptions
- **Page/URL:** `/disclaimer`, `/privacy-policy`
- **File + Line:** `src/app/disclaimer/page.tsx:7`, `src/app/privacy-policy/page.tsx:6`
- **Problem:**
  - `/disclaimer`: `description: "Official statutory risk disclaimer and financial terms of use for ipo-premium.com."` (83 characters)
  - `/privacy-policy`: `description: "Privacy policy and cookies statement for ipo-premium.com."` (61 characters)
- **Why it matters:** Overly short meta descriptions fail to fill the SERP snippet. Google frequently discards short descriptions and replaces them with random scraped page text.
- **Fix:** Expand both descriptions to 135–155 characters explaining editorial neutrality, disclaimer regarding SEBI regulations, and user privacy protection.
- **Effort:** Low
- **Status:** [ ] Open

---

#### SEO-031 | External Unsplash Fallback Image Used in NewsArticle Schema
- **Category:** Structured Data / Schema Quality
- **Page/URL:** `/news/[id]/[slug]`
- **File + Line:** `src/app/news/[id]/[slug]/page.tsx:47, 72`
- **Problem:** When an article lacks an image, the schema uses:
  `"https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200"`
- **Why it matters:** Using a generic Unsplash stock photo across multiple news articles in structured data harms Google Discover eligibility and looks generic to search engines.
- **Fix:** Use a branded default OpenGraph graphic hosted on the domain (e.g. `${SITE_URL}/images/news-default.png`).
- **Effort:** Low
- **Status:** [ ] Open

---

### 🟢 LOW SEVERITY ISSUES (P3)

#### SEO-032 | Vestigial `keywords` Meta Tag Across Multiple Pages
- **Category:** Code Quality / Meta Tags
- **Page/URL:** Sitewide
- **File + Line:** `src/lib/seo.ts:18-28`, `src/app/ipo-gmp/page.tsx:16-26`, `src/app/ipo/live/page.tsx:14-24`
- **Problem:** Every page defines an array of `keywords` in metadata.
- **Why it matters:** Google has officially ignored the `meta name="keywords"` tag since 2009. While it does not cause a penalty, it adds unnecessary HTML bloat and reveals target keyword strategies to competitors.
- **Fix:** Safely remove `keywords` arrays from metadata definitions to streamline the code.
- **Effort:** Low
- **Status:** [ ] Open

---

#### SEO-033 | Missing Table Schema on Live GMP Financial Tables
- **Category:** Structured Data / Enhancements
- **Page/URL:** `/ipo-gmp`
- **File + Line:** `src/app/ipo-gmp/page.tsx`
- **Problem:** The GMP table has `ItemList` schema, but lacks `Dataset` or `Table` microdata.
- **Why it matters:** Financial tables benefit from dataset markup for Google Dataset Search and algorithmic tabular understanding.
- **Fix:** Optional enhancement: add `Dataset` schema with update cadence.
- **Effort:** Medium
- **Status:** [ ] Open

---

#### SEO-034 | Missing Contact & Editorial Team Page
- **Category:** E-E-A-T / Trust Signals
- **Page/URL:** Missing `/contact`
- **Problem:** The website has an `/about` page, but no dedicated `/contact` page with physical address, support email, or feedback form.
- **Why it matters:** Google's Quality Rater Guidelines assess whether a commercial or financial website provides clear customer contact avenues.
- **Fix:** Add a simple `/contact` page with email, social profiles, and editorial query contact options.
- **Effort:** Low
- **Status:** [ ] Open

---

#### SEO-035 | 404 Error Page Missing Search Box and Help Links
- **Category:** UX & Crawl Recovery
- **Page/URL:** `/not-found` (`src/app/not-found.tsx`)
- **File + Line:** `src/app/not-found.tsx:7-24`
- **Problem:** The 404 page shows a single button: "Return to Live IPOs". It has no search bar or quick links to top hubs.
- **Why it matters:** When users or bots land on a dead link (e.g., an IPO that changed symbol), a search bar and links to `/ipo-gmp`, `/allotment`, and `/subscription` reduce bounce rate.
- **Fix:** Add quick navigation cards and a search input to `not-found.tsx`.
- **Effort:** Low
- **Status:** [ ] Open

---

#### SEO-036 | Lack of Gujarati / Hindi Regional Language SEO Foundations
- **Category:** International / Regional SEO
- **Page/URL:** Sitewide
- **File + Line:** `src/lib/i18n.ts`, `src/app/layout.tsx:29`
- **Problem:** The project context notes an audience in India (English, Gujarati, Hindi). `src/lib/i18n.ts` exists in the repo but is not linked to multi-language URL structures (`/gu/`, `/hi/`) or `hreflang` tags.
- **Why it matters:** Millions of retail IPO investors in Gujarat and North India search for "IPO GMP આજે" or "IPO GMP आज का". Adding localized pages creates massive zero-competition traffic opportunities.
- **Fix:** Plan a phased rollout of subpath localization (`/gu/ipo-gmp`, `/hi/ipo-gmp`) with `hreflang` alternates in Phase 3.
- **Effort:** High
- **Status:** [ ] Open

---

#### SEO-037 | Missing `lastmod` on Dynamic IPO Routes in Sitemap
- **Category:** Technical SEO / Crawling
- **Page/URL:** `https://ipo-premium.com/sitemap.xml`
- **File + Line:** `src/app/sitemap.ts:100`
- **Problem:** If `ipo.updatedAt` is undefined, line 100 falls back to `currentDate` (today's timestamp on every request).
- **Why it matters:** If all URLs in a sitemap report the current timestamp on every crawl, Googlebot disregards `lastModified` as unreliable.
- **Fix:** Ensure a persistent timestamp from the backend API is used.
- **Effort:** Low
- **Status:** [ ] Open

---

#### SEO-038 | Missing Preconnect Hints for Google Tag Manager and API Endpoints
- **Category:** Performance / Network Optimization
- **Page/URL:** Sitewide
- **File + Line:** `src/app/layout.tsx:34-54`
- **Problem:** `<head>` has no `<link rel="preconnect">` for external CDN or third-party tracking scripts.
- **Why it matters:** Preconnecting to external domains saves 50–150ms of DNS resolution and TLS negotiation time.
- **Fix:** Add `<link rel="preconnect" href="https://www.googletagmanager.com" />` in `<head>`.
- **Effort:** Low
- **Status:** [ ] Open

---

## 3. Manual Checks (Items Requiring External Verification)

| Check Item | Where to Check | Verification Purpose |
| :--- | :--- | :--- |
| **Google Search Console Property** | [search.google.com/search-console](https://search.google.com/search-console) | Verify DNS TXT record or HTML tag verification for `https://ipo-premium.com`. |
| **Core Web Vitals Field Data** | [PageSpeed Insights](https://pagespeed.web.dev/) on live URL | Check real Chrome User Experience Report (CrUX) data for mobile 75th percentile LCP, INP, and CLS. |
| **HTTPS Redirection & SSL** | SSL Labs (`ssllabs.com/ssltest/`) | Verify HTTP to HTTPS 301 redirection and HSTS header enforcement. |
| **WWW to Non-WWW Canonical Redirect** | Terminal: `curl -I https://www.ipo-premium.com` | Verify that `www.ipo-premium.com` permanently redirects (301/308) to `https://ipo-premium.com`. |
| **Live Backlinks & Brand Mentions** | Ahrefs / Semrush / Google Alert | Verify no toxic backlinks or scraper scrapers duplicating content. |
| **GTM Container Publishing** | Google Tag Manager Console | Confirm container `GTM-TBGC8L9K` has live, published tags for GA4. |
