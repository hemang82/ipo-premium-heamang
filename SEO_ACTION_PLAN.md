# Technical SEO Strategic Action Plan

**Target Objective:** Rank [https://ipo-premium.com/](https://ipo-premium.com/) in the **Top 5 on Google India** for high-volume IPO GMP, Subscription, and Allotment search queries.

---

## Phase 1: Week 1 – Technical Foundations & Critical Crawl Fixes (P0)
*Goal: Remove all crawl blockers, eliminate duplicate URL hazards, and fix broken signals.*

| Day | Action / Task | Target Issue IDs | Expected Impact |
| :--- | :--- | :--- | :--- |
| **Day 1** | **Crawl & Indexing Normalization:**<br>- Update `src/app/robots.ts` to allow `/_next/` asset crawling.<br>- Standardize all URLs in `src/app/sitemap.ts` to **no trailing slash**.<br>- Add self-referencing canonical to Homepage in `src/lib/seo.ts`. | `SEO-001`<br>`SEO-002`<br>`SEO-003` | Unblocks Googlebot asset rendering; stops 308 redirect loops and sitemap canonical mismatch warnings. |
| **Day 2** | **Sitemap Completeness & Redirect Corrections:**<br>- Include all 8 educational research articles in `src/app/sitemap.ts`.<br>- Include recent dynamic news articles in sitemap.<br>- Change `redirect()` to `permanentRedirect()` (308) in `src/app/ipo/[slug]/page.tsx`.<br>- 308-redirect thin `/guides/what-is-ipo-gmp` to `/articles/what-is-ipo-gmp-grey-market-premium`. | `SEO-004`<br>`SEO-005`<br>`SEO-013` | Recovers indexation for educational pillar content; transfers full link equity on short URLs; eliminates cannibalization. |
| **Day 3** | **Brand Suffix Cleanup & Title Truncation Fixes:**<br>- Remove manual `| ipo-premium` from `/articles`, `/articles/[slug]`, `/news`, `/about`, `/disclaimer`, `/privacy-policy`.<br>- Shorten base titles on `/ipo-gmp`, `/ipo/live`, `/ipo/upcoming`, `/ipo/listed`, `/subscription`, `/allotment`, `/tools/lot-calculator` so total title stays ≤ 60 chars. | `SEO-006`<br>`SEO-011` | Eliminates double-branding in SERPs; prevents mobile title truncation; increases organic CTR by ~15–25%. |
| **Day 4** | **Schema & Core Asset Repair:**<br>- Place high-resolution `logo.png` into `public/logo.png` (fixing HTTP 404 in Organization schema).<br>- Add `WebSite` schema with `SearchAction` (Sitelinks Searchbox) on the homepage. | `SEO-007`<br>`SEO-015` | Fixes rich result syntax errors in Google Search Console; qualifies homepage for brand searchbox. |
| **Day 5** | **Performance & Font Optimization:**<br>- Remove `@import url('https://fonts.googleapis.com/...')` from `src/app/globals.css`.<br>- Implement zero-blocking font loading via `next/font/google` in `src/app/layout.tsx`.<br>- Add preconnect hints for Google Tag Manager in `<head>`. | `SEO-008`<br>`SEO-038` | Slashes FCP and LCP by 400ms–800ms; eliminates layout shifts caused by external font fetching. |

---

## Phase 2: Week 2 – On-Page Optimization, Headers & Search Intent (P1)
*Goal: Align headings, meta descriptions, and image pipelines with Indian investor search queries.*

| Day | Action / Task | Target Issue IDs | Expected Impact |
| :--- | :--- | :--- | :--- |
| **Day 6** | **Homepage & Detail H1 Optimization:**<br>- Rewrite Homepage `<h1>` in `HeroSection.tsx` to: `IPO GMP Today – Live Grey Market Premium Tracker`.<br>- Rewrite detail page `<h1>` in `IpoDetailsClientLayout.tsx` to: `{ipo.name} IPO GMP Today, Review & Subscription Status`. | `SEO-009`<br>`SEO-018` | Directly strengthens page topic authority for primary search keywords. |
| **Day 7** | **Meta Description & Date Modernization:**<br>- Deploy rewritten meta descriptions (140–155 chars) across all pages.<br>- Re-engineer dynamic detail meta description formula in `src/lib/seo.ts` to prevent truncation.<br>- Remove all outdated `"2024–25"` strings; update to `"2025–2026"`. | `SEO-012`<br>`SEO-014`<br>`SEO-030` | Eliminates stale snippet timestamps; improves mobile CTR on competitive queries. |
| **Day 8** | **Image Pipeline & Core Web Vitals:**<br>- Remove `images: { unoptimized: true }` in `next.config.js`.<br>- Update `IpoLogo.tsx` alt tags to `{name} IPO Logo - Live GMP & Allotment Tracker`.<br>- Add explicit width/height containers to news thumbnail images to eliminate Cumulative Layout Shift (CLS). | `SEO-010`<br>`SEO-022` | Reduces image payload by 60–80% via WebP/AVIF; boosts Google Image search visibility. |
| **Day 9** | **Security & Analytics Infrastructure:**<br>- Configure OWASP security headers & caching policies in `next.config.js`.<br>- Add Search Console (`google-site-verification`) & Bing Webmaster verification codes in `src/lib/seo.ts`.<br>- Verify GA4 tracking and data stream health in Google Tag Manager. | `SEO-016`<br>`SEO-017`<br>`SEO-019` | Enhances technical trust signals; verifies Google/Bing property ownership for instant sitemap submission. |
| **Day 10** | **Article Schema & Navigation Breadcrumbs:**<br>- Inject `Article` / `BlogPosting` JSON-LD schema into all research guides (`/articles/[slug]`).<br>- Add `BreadcrumbList` schema to `/articles` index. | `SEO-021`<br>`SEO-029` | Qualifies research articles for Google Discover cards and rich article carousels. |

---

## Phase 3: Month 1 – Content Expansion & Competitive Moat (P2)
*Goal: Close content gaps against Chittorgarh & InvestorGain, and establish E-E-A-T trust signals.*

| Week | Action / Task | Target Issue IDs | Strategic Deliverable |
| :--- | :--- | :--- | :--- |
| **Week 3** | **Launch Dedicated SME IPO GMP Hub:**<br>- Create `src/app/sme-ipo-gmp/page.tsx`.<br>- Target high-volume keywords: *"SME IPO GMP Today"*, *"Current SME IPO Grey Market"*, *"BSE SME IPO Rates"*. | `SEO-020` | Captures massive high-intent SME retail search traffic currently missed by competitors. |
| **Week 4** | **Day-by-Day Historical GMP Trend Tables:**<br>- Render historical GMP movements in a structured HTML `<table>` on detail pages.<br>- Google extracts table rows directly into featured snippet answers. | `SEO-025` | Dominates Google Position 0 (Featured Snippets) for *"What is [Company] IPO GMP movement?"* |
| **Week 4** | **E-E-A-T & Trust Infrastructure:**<br>- Add verified Author Byline with SEBI NISM / equity research credentials to all articles.<br>- Launch `/contact` page with editorial transparency, corrections policy, and physical address.<br>- Standardize all page title delimiters and clean up obsolete `keywords` tags. | `SEO-023`<br>`SEO-032`<br>`SEO-034` | Protects the site against Google's Helpful Content System and YMYL financial penalties. |

---

## Phase 4: Month 2+ – Regional Dominance & Authority Building (P3)
*Goal: Scale domain authority, regional language reach, and high-tier financial backlink acquisition.*

| Initiative | Strategy & Execution | Target Issue IDs | Target Result |
| :--- | :--- | :--- | :--- |
| **Regional Language Expansion** | Roll out Gujarati (`/gu/ipo-gmp`) and Hindi (`/hi/ipo-gmp`) localized subpaths with `hreflang="gu-IN"` and `hreflang="hi-IN"`. Utilize `src/lib/i18n.ts`. | `SEO-036` | Captures high-volume, low-competition regional queries ("IPO GMP આજે", "IPO GMP आज का"). |
| **Dedicated IPO Calendar** | Launch `/ipo-calendar` displaying month-by-month opening, closing, and allotment timelines. | `SEO-027` | Ranks for high-volume monthly queries (*"IPO Calendar March 2026"*). |
| **Digital PR & Authority Backlinks** | - Publish weekly primary market research reports (e.g. *"Average Listing Day Gain of Indian IPOs in 2025"*).<br>- Distribute press releases to financial outlets (Moneycontrol, LiveMint, Economic Times).<br>- Provide free IPO GMP embed widgets for Indian financial blogs and FinTech apps with contextual backlinks. | Competitive Gap | Drives Domain Authority (DA) from fresh launch to DA 35+, enabling sustainable Top 3 rankings against established legacy competitors. |
