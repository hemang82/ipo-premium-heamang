import Link from "next/link";
import { 
  TrendingUp, 
  Layers, 
  Clock, 
  CheckCircle2,
  AlertCircle,
  BookOpen
} from "lucide-react";

export function SeoContentSection() {
  return (
    <section className="my-12 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-tx" aria-labelledby="ipo-guide-heading">
      {/* Primary Section Header - Perfectly Synced */}
      <div className="border-b border-line pb-4 mb-8">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold text-accent mb-2.5">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Complete IPO &amp; Grey Market Knowledge Desk</span>
        </div>
        <h2 id="ipo-guide-heading" className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tightest">
          IPO Grey Market Premium (GMP) &amp; Stock Allotment Guide
        </h2>
        <p className="text-mut text-xs sm:text-sm mt-1.5 max-w-3xl leading-relaxed">
          Everything you need to know about Initial Public Offerings (IPO), live{" "}
          <Link href="/ipo-gmp" className="text-accent font-medium hover:underline">
            Grey Market Premium (GMP) rates today
          </Link>
          ,{" "}
          <Link href="/articles/kostak-rate-vs-subject-to-sauda-differences" className="text-accent font-medium hover:underline">
            Kostak rates vs Subject to Sauda
          </Link>
          , and subscription demand across QIB, NII, and Retail investor categories.
        </p>
      </div>

      {/* Grid: 3 Concept Cards - Matching Tools & Articles Synced Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {/* Card 1: What is IPO GMP */}
        <div className="rounded-3xl bg-card border border-line p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-accent/40 transition-all duration-200 flex flex-col justify-between">
          <div>
            <div className="w-11 h-11 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base sm:text-lg font-heading font-bold mb-2 text-tx leading-snug">
              What is IPO GMP (Grey Market Premium)?
            </h3>
            <p className="text-xs sm:text-sm text-mut leading-relaxed">
              Grey Market Premium (GMP) is an unofficial, off-market financial premium at which public issue shares are bid and traded prior to their official listing on BSE or NSE. Track live{" "}
              <Link href="/ipo-gmp" className="text-accent font-semibold hover:underline">
                IPO GMP Today
              </Link>{" "}
              to gauge secondary market sentiment and anticipated listing day gains.
            </p>
          </div>
          <div className="mt-5 pt-3.5 border-t border-line/60">
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-card2 border border-line text-[11px] font-semibold text-accent">
              Formula: Expected Price = Cap Price + GMP
            </span>
          </div>
        </div>

        {/* Card 2: Kostak & Subject to Sauda */}
        <div className="rounded-3xl bg-card border border-line p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-accent/40 transition-all duration-200 flex flex-col justify-between">
          <div>
            <div className="w-11 h-11 rounded-2xl bg-up/10 border border-up/20 flex items-center justify-center text-up mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base sm:text-lg font-heading font-bold mb-2 text-tx leading-snug">
              Kostak Rate vs Subject to Sauda
            </h3>
            <p className="text-xs sm:text-sm text-mut leading-relaxed">
              <strong>Kostak Rate</strong> is the fixed lump-sum profit earned by selling an IPO application before allotment, irrespective of allotment outcome. <strong>Subject to Sauda (SS)</strong> is an agreement where profit is transferred only if shares are formally allotted to the bidder. Read our{" "}
              <Link href="/articles/kostak-rate-vs-subject-to-sauda-differences" className="text-accent font-semibold hover:underline">
                Kostak vs Subject to Sauda guide
              </Link>
              .
            </p>
          </div>
          <div className="mt-5 pt-3.5 border-t border-line/60">
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-card2 border border-line text-[11px] font-semibold text-up">
              Guaranteed profit vs Allotment-conditional
            </span>
          </div>
        </div>

        {/* Card 3: Subscription Status Breakdown */}
        <div className="rounded-3xl bg-card border border-line p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-accent/40 transition-all duration-200 flex flex-col justify-between">
          <div>
            <div className="w-11 h-11 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-base sm:text-lg font-heading font-bold mb-2 text-tx leading-snug">
              IPO Subscription: QIB, NII &amp; Retail
            </h3>
            <p className="text-xs sm:text-sm text-mut leading-relaxed">
              Tracking subscription multiples shows institutional validation. Check live{" "}
              <Link href="/subscription" className="text-accent font-semibold hover:underline">
                IPO subscription status
              </Link>{" "}
              where <strong>QIB</strong> bidding picks up on Day 3, <strong>NII/HNI</strong> reflects leveraged bids, and <strong>Retail (RII)</strong> highlights overall public demand.
            </p>
          </div>
          <div className="mt-5 pt-3.5 border-t border-line/60">
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-card2 border border-line text-[11px] font-semibold text-accent">
              Real-time times-subscribed (x) tracking
            </span>
          </div>
        </div>
      </div>

      {/* Timeline & Lifecycle Container - Open, Modern & Perfectly Synced */}
      <div className="space-y-6 pt-4 border-t border-line">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-tx flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                <span>The SEBI T+3 IPO Timeline &amp; Allotment Lifecycle</span>
              </h3>
              <p className="text-xs sm:text-sm text-mut mt-1">
                Under official SEBI regulations, all Indian public issues follow this strict 4-stage T+3 settlement framework:
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-card2 border border-line text-tx shrink-0 self-start sm:self-auto">
              SEBI Compliant Flow
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-3xl bg-card border border-line shadow-2xs hover:border-accent/40 transition-colors">
              <span className="text-[11px] font-bold text-accent px-2 py-0.5 rounded-md bg-accent/10 border border-accent/20 inline-block mb-2">
                STAGE 1
              </span>
              <h4 className="font-heading font-bold text-sm sm:text-base text-tx mb-1">Issue Open &amp; Bidding</h4>
              <p className="text-xs text-mut leading-relaxed">
                3-day bidding window. Retail investors block funds via ASBA / UPI mandate.
              </p>
            </div>

            <div className="p-4 rounded-3xl bg-card border border-line shadow-2xs hover:border-accent/40 transition-colors">
              <span className="text-[11px] font-bold text-accent px-2 py-0.5 rounded-md bg-accent/10 border border-accent/20 inline-block mb-2">
                STAGE 2 (T+1)
              </span>
              <h4 className="font-heading font-bold text-sm sm:text-base text-tx mb-1">Allotment Finalization</h4>
              <p className="text-xs text-mut leading-relaxed">
                Designated registrar (Link Intime, KFintech) finalizes share allocation basis.
              </p>
            </div>

            <div className="p-4 rounded-3xl bg-card border border-line shadow-2xs hover:border-accent/40 transition-colors">
              <span className="text-[11px] font-bold text-accent px-2 py-0.5 rounded-md bg-accent/10 border border-accent/20 inline-block mb-2">
                STAGE 3 (T+2)
              </span>
              <h4 className="font-heading font-bold text-sm sm:text-base text-tx mb-1">Refunds &amp; Demat Credit</h4>
              <p className="text-xs text-mut leading-relaxed">
                UPI unblocking for non-allottees and credit of equity shares into Demat accounts.
              </p>
            </div>

            <div className="p-4 rounded-3xl bg-card border border-line shadow-2xs hover:border-accent/40 transition-colors">
              <span className="text-[11px] font-bold text-accent px-2 py-0.5 rounded-md bg-accent/10 border border-accent/20 inline-block mb-2">
                STAGE 4 (T+3)
              </span>
              <h4 className="font-heading font-bold text-sm sm:text-base text-tx mb-1">Exchange Listing</h4>
              <p className="text-xs text-mut leading-relaxed">
                Trading begins on BSE &amp; NSE at 10:00 AM after the 9:00 AM pre-open session.
              </p>
            </div>
          </div>
        </div>

        {/* Risk Advisory Banner */}
        <div className="p-4 rounded-2xl bg-card border border-line shadow-2xs text-tx">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <div>
              <h4 className="font-heading font-bold text-xs sm:text-sm text-tx">
                Important Market Risk Advisory
              </h4>
              <p className="text-xs text-mut mt-0.5 leading-relaxed">
                Grey Market Premium (GMP) is an unregulated, unofficial OTC estimate based on dealer quotes across local financial hubs. It does not guarantee listing gains and fluctuates with secondary market sentiment. Never make an IPO investment decision solely on GMP; always review company fundamentals, DRHP financial reports, and valuation multiples before applying.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
