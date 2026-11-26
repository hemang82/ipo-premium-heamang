import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-line mt-16 bg-card/40">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand Info - Spans 2 columns on large screens */}
          <div className="sm:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-accent flex items-center justify-center">
                <div className="w-2.5 h-2.5 rotate-45 bg-[#2A130B] rounded-[1px]" />
              </div>
              <span className="font-heading font-bold text-lg text-tx">
                ipo-premium.com
              </span>
            </div>
            <p className="text-sm text-mut max-w-md leading-relaxed">
              India&apos;s authoritative tracker for live IPO metrics, real-time QIB/NII/Retail subscriptions, and allotment verification guides.
            </p>
            <p className="text-xs text-accent/90 font-medium">
              Know the premium before you apply.
            </p>
          </div>

          {/* IPO Tracking Links - Perfectly Synced Keywords */}
          <div className="space-y-2">
            <h4 className="font-heading font-semibold text-sm text-tx">IPO Tracking</h4>
            <ul className="space-y-1.5 text-xs text-mut">
              <li><Link href="/ipo/live" className="hover:text-accent transition-colors">Live IPOs</Link></li>
              <li><Link href="/ipo/upcoming" className="hover:text-accent transition-colors">Upcoming IPOs</Link></li>
              <li><Link href="/ipo/listed" className="hover:text-accent transition-colors">Listed IPOs</Link></li>
              <li><Link href="/ipo-gmp" className="hover:text-accent transition-colors">IPO Market Tracker</Link></li>
              <li><Link href="/subscription" className="hover:text-accent transition-colors">IPO Subscription Status</Link></li>
              <li><Link href="/ipo/live?status=Close+Today" className="hover:text-accent transition-colors">Closing Today IPOs</Link></li>
            </ul>
          </div>

          {/* Quick Links & Tools */}
          <div className="space-y-2">
            <h4 className="font-heading font-semibold text-sm text-tx">Tools &amp; Insights</h4>
            <ul className="space-y-1.5 text-xs text-mut">
              <li><Link href="/tools/lot-calculator" className="hover:text-accent transition-colors">IPO Lot Calculator</Link></li>
              <li><Link href="/allotment" className="hover:text-accent transition-colors">IPO Allotment Tracker</Link></li>
              <li><Link href="/news" className="hover:text-accent transition-colors font-medium text-tx/90">IPO News &amp; Market</Link></li>
              <li><Link href="/articles" className="hover:text-accent transition-colors">IPO Guides &amp; Articles</Link></li>
              <li><Link href="/faq" className="hover:text-accent transition-colors">IPO FAQs Knowledge Hub</Link></li>
              {/* <li><Link href="/articles/what-is-ipo-gmp-grey-market-premium" className="hover:text-accent transition-colors">What is IPO GMP?</Link></li> */}
            </ul>
          </div>

          {/* Registrar Portals (Direct High-Ranking SEO Links) */}
          <div className="space-y-2">
            <h4 className="font-heading font-semibold text-sm text-tx">Registrar Status</h4>
            <ul className="space-y-1.5 text-xs text-mut">
              <li><Link href="/allotment/link-intime" className="hover:text-accent transition-colors">Link Intime Allotment</Link></li>
              <li><Link href="/allotment/kfintech" className="hover:text-accent transition-colors">KFintech Allotment (S1-S5)</Link></li>
              <li><Link href="/allotment/bigshare" className="hover:text-accent transition-colors">Bigshare SME Allotment</Link></li>
              <li><Link href="/allotment/bse-india" className="hover:text-accent transition-colors">BSE India Allotment</Link></li>
              <li><Link href="/allotment/skyline" className="hover:text-accent transition-colors">Skyline Allotment</Link></li>
              <li><Link href="/allotment" className="hover:text-accent transition-colors">Check Allotment by PAN</Link></li>
            </ul>
          </div>

          {/* Legal / Trust & Transparency */}
          <div className="space-y-2">
            <h4 className="font-heading font-semibold text-sm text-tx">Trust &amp; Policies</h4>
            <ul className="space-y-1.5 text-xs text-mut">
              <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
              <li><Link href="/editorial-policy" className="hover:text-accent transition-colors">Editorial Policy</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-accent transition-colors">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="hover:text-accent transition-colors">SEBI Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        {/* Regulatory Disclaimer Card */}
        <div className="p-4 rounded-2xl bg-card border border-line text-xs text-mut/90 leading-relaxed mb-6">
          <p className="font-semibold text-tx mb-1">⚠️ Statutory Financial Market Disclaimer:</p>
          <p>
            Indicative market rates and dealer estimates are unofficial, non-regulated, and derived from OTC quotes. They do <strong>not</strong> constitute an official price or investment advice. Always read the Red Herring Prospectus (RHP) filed with SEBI before making any financial investment decisions.
          </p>
          <p className="mt-1.5 flex items-center gap-1.5 font-medium text-accent">
            <a
              href="https://docipo.ipotrending.com/uploads/otherdocument/1795585231037.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline inline-flex items-center gap-1"
            >
              📄 Read Official SEBI Advisory (PDF) →
            </a>
          </p>
          <p className="mt-1 text-mut/70">
            Real-time IPO information, subscription stats, and market metrics are synchronized dynamically from live market trading databases.
          </p>
        </div>

        {/* Bottom Bar with Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-mut pt-4 border-t border-line/40 gap-3">
          <p>© {new Date().getFullYear()} ipo-premium.com. All rights reserved.</p>
          
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs">
            <Link href="/about" className="hover:text-accent transition-colors">About</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-accent transition-colors">Contact</Link>
            <span>•</span>
            <Link href="/editorial-policy" className="hover:text-accent transition-colors">Editorial Policy</Link>
            <span>•</span>
            <Link href="/privacy-policy" className="hover:text-accent transition-colors">Privacy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-accent transition-colors">Terms</Link>
            <span>•</span>
            <Link href="/disclaimer" className="hover:text-accent transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
