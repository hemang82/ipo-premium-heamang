# ipo-premium.com

Live IPO GMP (Grey Market Premium), Real-Time Subscription & Allotment Tracker for the Indian Stock Market. Built with Next.js 15+ (App Router), TypeScript, and Tailwind CSS.

---

## 🚀 Quick Start Commands

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production (Strict type & lint checks)
npm run build

# 4. Start production server
npm start
```
Default URL: `http://localhost:3000`

---

## 🎨 Design Tokens & Theme Support
Configured via CSS variables in `src/app/globals.css` and mapped in `tailwind.config.js`:

| Token | Dark (Default) | Light | Description |
|---|---|---|---|
| `--bg` | `#0A1022` | `#F6F4F2` | Page background with top radial glow |
| `--card` | `#121A33` | `#FFFFFF` | Primary card background |
| `--card2` | `#1A2547` | `#F1ECE8` | Secondary container / input background |
| `--line` | `#27345C` | `#E6DDD6` | Subtle border lines |
| `--tx` | `#EEF1FA` | `#121A33` | Primary typography color |
| `--mut` | `#9AA6C6` | `#5B6785` | Muted labels and secondary text |
| `--accent` | `#E8B4A0` | `#A65D49` | Rose gold accent (Buttons, highlights) |
| `--up` | `#4ADE80` | `#15803D` | Positive GMP indicator |
| `--dn` | `#FF6B81` | `#BE123C` | Negative GMP indicator |

* **Typography**: Headings & numbers use `Sora` (weights 600-800, letter-spacing `-0.025em`), Body uses `DM Sans`. All prices and percentages utilize `tabular-nums`.

---

## 📂 Project Architecture

```text
src/
├── app/
│   ├── layout.tsx                     // Root layout, Sora & DM Sans fonts, ThemeProvider, Header, Footer
│   ├── page.tsx                       // Homepage: Hero, Stat Tiles, Filtered IPO List, Tools, FAQs
│   ├── globals.css                    // CSS variables for Dark/Light tokens & top glow
│   ├── not-found.tsx                  // Custom 404 page
│   ├── sitemap.ts                     // Dynamic XML sitemap generation
│   ├── robots.ts                      // Search crawler rules
│   ├── opengraph-image.tsx            // Dynamic social preview generator (PNG)
│   ├── ipo/
│   │   ├── [slug]/
│   │   │   ├── page.tsx               // 308 redirect helper to canonical /[slug]/[symbol]/
│   │   │   └── [symbol]/
│   │   │       └── page.tsx           // Single IPO Detail Page (generateStaticParams + metadata)
│   ├── tools/
│   │   └── lot-calculator/page.tsx    // Interactive Lot Size & Gain Calculator page
│   ├── allotment/page.tsx             // Allotment status hub & registrar links
│   ├── guides/what-is-ipo-gmp/page.tsx // Educational corner-stone article
│   ├── about/page.tsx                 // Methodology & E-E-A-T credentials
│   ├── disclaimer/page.tsx            // SEBI & Financial regulatory disclaimer
│   └── privacy-policy/page.tsx        // Privacy policy
├── components/
│   ├── layout/                        // Header, Footer, ThemeToggle, MobileStickyBar
│   ├── home/                          // Hero, StatTiles, IpoList, IpoRow, FilterChips, SortSelect, ToolsSection
│   ├── ipo/                           // GmpRing, GmpSparkline, KeyDatesTimeline, SubscriptionBars, QuickFactsPanel, etc.
│   └── ui/                            // Card, Badge, Button, SignalChip, Faq, Progress
└── lib/
    ├── types.ts                       // TypeScript definitions
    ├── data.ts                        // Initial 6 seed IPOs (Navkar, Saurashtra, Kalpa, Sabarmati, Gir Dairy, Tapi)
    ├── ipo-service.ts                 // Single Source of Truth for fetching data
    ├── format.ts                      // Currency (en-IN), percentages, GMP signal strength helpers
    ├── seo.ts                         // Dynamic Meta, OpenGraph & JSON-LD schemas
    └── i18n.ts                        // Multi-language stub (English, Gujarati, Hindi)
```

---

## 🔌 How to Swap Mock Data for a Real API

All data reads throughout the entire application pass through **`src/lib/ipo-service.ts`**. No component directly imports `src/lib/data.ts`.

To connect your live database or REST API:
1. Open `src/lib/ipo-service.ts`.
2. Replace `getAllIpos()` with your live endpoint:
```typescript
export async function getAllIpos(): Promise<Ipo[]> {
  const response = await fetch("https://api.ipo-premium.com/v1/ipos", {
    next: { revalidate: 300 }, // 5 min ISR caching
  });
  return response.json();
}
```
All static pages, sitemaps, search filtering, and calculations will automatically start using your live API without touching a single component.
"# ipo-premiuam-website" 
"# ipo-premium-heamang" 
