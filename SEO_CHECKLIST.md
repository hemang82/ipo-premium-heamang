# Technical SEO Implementation Checklist

All identified issues mapped by priority for tracking and sprint management.

---

## 🔴 Critical Priority (P0) – Must Fix Before Indexation
- [x] **SEO-001** | Standardize sitewide trailing slashes to **no trailing slash** across `sitemap.ts`, `next.config.js`, and all canonical tags. *(SOLVED IN CODE)*
- [x] **SEO-002** | Add self-referencing canonical tag to Homepage (`/`) via `src/lib/seo.ts` and `src/app/page.tsx`. *(SOLVED IN CODE)*
- [x] **SEO-003** | Remove `/_next/` disallow rule from `src/app/robots.ts` to unblock Googlebot CSS/JS asset rendering. *(SOLVED IN CODE)*
- [x] **SEO-004** | Include all educational articles (`/articles/[slug]`), trust pages, and dynamic news in `src/app/sitemap.ts`. *(SOLVED IN CODE)*
- [x] **SEO-005** | Replace temporary HTTP 307 `redirect()` with permanent HTTP 308 `permanentRedirect()` in `src/app/ipo/[slug]/page.tsx`. *(SOLVED IN CODE)*
- [x] **SEO-006** | Remove duplicate brand suffixes (`| ipo-premium`) from individual page titles to fix double brand SERP snippets. *(SOLVED IN CODE)*
- [x] **SEO-007** | Fix broken Organization schema logo reference (created `public/logo.png` & `public/icon.svg`). *(SOLVED IN CODE)*
- [x] **SEO-008** | Replace render-blocking `@import` Google Fonts in `globals.css` with zero-latency `next/font/google` in `layout.tsx`. *(SOLVED IN CODE)*

---

## 🟠 High Priority (P1) – CTR, CWV & Core Rankings
- [x] **SEO-009** | Rewrite Homepage `<h1>` in `HeroSection.tsx` to incorporate primary keyword *"IPO GMP Today"*. *(SOLVED IN CODE)*
- [x] **SEO-010** | Enable AVIF/WebP image formats and remote domain patterns in `next.config.js`. *(SOLVED IN CODE)*
- [x] **SEO-011** | Shorten core landing page meta titles to strictly ≤ 60 characters total (including layout brand suffix). *(SOLVED IN CODE)*
- [x] **SEO-012** | Remove outdated "2024–25" and "2025" years hardcoded in metadata across `/ipo/live`, `/ipo/upcoming`, `/ipo/listed`, and footer. *(SOLVED IN CODE)*
- [x] **SEO-013** | Eliminate keyword cannibalization by 308-redirecting thin `/guides/what-is-ipo-gmp` to `/articles/what-is-ipo-gmp-grey-market-premium`. *(SOLVED IN CODE)*
- [x] **SEO-014** | Re-engineer dynamic detail page meta descriptions to cap length at 155 characters and prevent data truncation. *(SOLVED IN CODE)*
- [x] **SEO-015** | Implement `WebSite` structured data with `SearchAction` (Sitelinks Searchbox) on the homepage. *(SOLVED IN CODE)*
- [x] **SEO-016** | Add standard OWASP security and HTTP caching headers in `next.config.js`. *(SOLVED IN CODE)*
- [ ] **SEO-017** | Add Google Search Console (`google-site-verification`) code in `layout.tsx` / `seo.ts`. *(CODE READY — PENDING USER TOKEN)*
- [x] **SEO-018** | Enhance dynamic detail page `<h1>` to include "IPO GMP Today, Review & Subscription Status". *(SOLVED IN CODE)*
- [ ] **SEO-019** | Ensure GA4 / GTM container ID is replaced with your real account ID. *(CODE READY — PENDING USER GTM ID)*

---

## 🟡 Medium Priority (P2) – Content Quality & Rich Results
- [ ] **SEO-020** | Create a dedicated `/sme-ipo-gmp` hub page (currently accessible via `/ipo-gmp?segment=SME`). *(FUTURE ROADMAP ROUTE)*
- [x] **SEO-021** | Inject `Article` JSON-LD schema into `src/app/articles/[slug]/page.tsx`. *(SOLVED IN CODE)*
- [x] **SEO-022** | Upgrade generic alt text in `src/components/ipo/IpoLogo.tsx` to include brand name and "IPO Logo". *(SOLVED IN CODE)*
- [x] **SEO-023** | Add Author Byline, analyst credentials, and SEBI compliance notes to educational articles (E-E-A-T). *(SOLVED IN CODE)*
- [x] **SEO-024** | Add explicit fallback `openGraph.images` array in `getBaseMetadata()` for social link sharing. *(SOLVED IN CODE)*
- [x] **SEO-025** | Add structured HTML day-by-day GMP trend history table to IPO detail pages. *(SOLVED IN CODE)*
- [x] **SEO-026** | Standardize page title delimiters sitewide to use consistent en-dashes (`–`) and pipes (`|`). *(SOLVED IN CODE)*
- [ ] **SEO-027** | Create an indexable monthly `/ipo-calendar` table page for upcoming issues. *(FUTURE ROADMAP ROUTE)*
- [x] **SEO-028** | Isolate client-side market hours logic in `SubscriptionClient.tsx` to prevent React hydration mismatch. *(SOLVED IN CODE)*
- [x] **SEO-029** | Add `BreadcrumbList` schema to `/articles` index page. *(SOLVED IN CODE)*
- [x] **SEO-030** | Expand short meta descriptions on `/disclaimer` and `/privacy-policy` to 135–155 characters. *(SOLVED IN CODE)*
- [x] **SEO-031** | Replace external placeholder in schema with a branded local fallback graphic. *(SOLVED IN CODE)*

---

## 🟢 Low Priority (P3) – Code Hygiene & Future Enhancements
- [x] **SEO-032** | Remove obsolete `keywords` metadata arrays from all route definitions. *(SOLVED IN CODE)*
- [ ] **SEO-033** | Add `Dataset` schema with update cadence metadata to live GMP financial tables. *(OPTIONAL ENHANCEMENT)*
- [x] **SEO-034** | Create dedicated trust pages (`/about`, `/contact`, `/editorial-policy`, `/disclaimer`, `/privacy-policy`, `/terms`). *(SOLVED IN CODE)*
- [x] **SEO-035** | Add search input and quick navigational hub links to `src/app/not-found.tsx` (404 page). *(SOLVED IN CODE)*
- [ ] **SEO-036** | Plan subpath localization architecture (`/gu/`, `/hi/`) with `hreflang` alternates. *(LONG-TERM EXPANSION)*
- [x] **SEO-037** | Ensure `lastModified` in `sitemap.ts` uses real timestamps. *(SOLVED IN CODE)*
- [x] **SEO-038** | Add `<link rel="preconnect">` hints for Google Tag Manager and API backends in `RootLayout`. *(SOLVED IN CODE)*
