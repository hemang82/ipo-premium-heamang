import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-line mt-16 bg-card/40">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-accent flex items-center justify-center">
                <div className="w-2.5 h-2.5 rotate-45 bg-[#2A130B] rounded-[1px]" />
              </div>
              <span className="font-heading font-bold text-lg text-tx">
                ipo-premium.com
              </span>
            </div>
            <p className="text-sm text-mut max-w-md leading-relaxed">
              India&apos;s authoritative tracker for live IPO Grey Market Premium (GMP), real-time QIB/NII/Retail subscriptions, and allotment verification guides.
            </p>
            <p className="text-xs text-accent/90 font-medium">
              Know the premium before you apply.
            </p>
          </div>

          {/* IPO Tracking Links */}
          <div className="space-y-2">
            <h4 className="font-heading font-semibold text-sm text-tx">IPO Tracking</h4>
            <ul className="space-y-1.5 text-xs text-mut">
              <li><Link href="/ipo/live" className="hover:text-accent transition-colors">Live IPO Today</Link></li>
              <li><Link href="/ipo/upcoming" className="hover:text-accent transition-colors">Upcoming IPO 2025</Link></li>
              <li><Link href="/ipo/listed" className="hover:text-accent transition-colors">Recently Listed IPOs</Link></li>
              <li><Link href="/ipo-gmp" className="hover:text-accent transition-colors">IPO GMP Today</Link></li>
              <li><Link href="/subscription" className="hover:text-accent transition-colors">Subscription Status</Link></li>
            </ul>
          </div>

          {/* Quick Links & Tools */}
          <div className="space-y-2">
            <h4 className="font-heading font-semibold text-sm text-tx">Tools & Insights</h4>
            <ul className="space-y-1.5 text-xs text-mut">
              <li><Link href="/news" className="hover:text-accent transition-colors font-medium text-tx/90">IPO News & Market Updates</Link></li>
              <li><Link href="/tools/lot-calculator" className="hover:text-accent transition-colors">IPO Lot Calculator</Link></li>
              <li><Link href="/faq" className="hover:text-accent transition-colors">IPO FAQs Knowledge Hub</Link></li>
              <li><Link href="/articles" className="hover:text-accent transition-colors">IPO Guides & Articles</Link></li>
              <li><Link href="/allotment" className="hover:text-accent transition-colors">IPO Allotment Status</Link></li>
              <li><Link href="/guides/what-is-ipo-gmp" className="hover:text-accent transition-colors">What is IPO GMP?</Link></li>
            </ul>
          </div>

          {/* Legal / Trust */}
          {/* <div className="space-y-2">
            <h4 className="font-heading font-semibold text-sm text-tx">Trust & Policies</h4>
            <ul className="space-y-1.5 text-xs text-mut">
              <li><Link href="/about" className="hover:text-accent">About & Methodology</Link></li>
              <li><Link href="/disclaimer" className="hover:text-accent">SEBI Disclaimer</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-accent">Privacy Policy</Link></li>
            </ul>
          </div> */}
        </div>

        {/* Regulatory Disclaimer Card */}
        <div className="p-4 rounded-xl bg-card2 border border-line text-xs text-mut/90 leading-relaxed mb-6">
          <p className="font-semibold text-tx mb-1">⚠️ Statutory Disclaimer & Demo Notice:</p>
          <p>
            Grey Market Premium (GMP) is purely unofficial, non-regulated, and derived from market rumors. It is <strong>not</strong> an official price or investment advice. Always read the Red Herring Prospectus (RHP) filed with SEBI before making any financial investment decisions.
          </p>
          <p className="mt-1 text-mut/70">
            Real-time IPO information, subscription stats, and GMP metrics are synchronized dynamically from live market trading databases.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-mut pt-4 border-t border-line/40 gap-2">
          <p>© {new Date().getFullYear()} ipo-premium.com. All rights reserved.</p>
          <p>Made with precision for Indian stock market investors.</p>
        </div>
      </div>
    </footer>
  );
}
