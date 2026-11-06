import Link from "next/link";
import { 
  TrendingUp, 
  HelpCircle, 
  ShieldAlert, 
  Layers, 
  Clock, 
  FileCheck, 
  Calculator,
  Search,
  BookOpen,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Card } from "@/components/ui/Card";

export function SeoContentSection() {
  return (
    <section className="my-16 max-w-7xl mx-auto px-4 text-tx" aria-labelledby="ipo-guide-heading">
      {/* Primary Section Header */}
      <div className="border-b border-line pb-6 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold text-accent mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Complete IPO & Grey Market Guide</span>
        </div>
        <h2 id="ipo-guide-heading" className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold tracking-tightest">
          IPO Grey Market Premium (GMP) & Stock Allotment Guide
        </h2>
        <p className="text-mut text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
          Everything you need to know about Initial Public Offerings (IPO), live Grey Market Premium (GMP) rates today, 
          Kostak rates, Subject to Sauda, subscription metrics across QIB, NII, Retail categories, and allotment status verification on BSE, NSE, Link Intime, and KFintech.
        </p>
      </div>

      {/* Grid: Concept Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {/* Card 1: What is IPO GMP */}
        <Card className="p-6 flex flex-col justify-between hover:border-accent/40 transition-colors">
          <div>
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-heading font-bold mb-2 text-tx">
              What is IPO GMP (Grey Market Premium)?
            </h3>
            <p className="text-xs sm:text-sm text-mut leading-relaxed">
              Grey Market Premium (GMP) is an unofficial, off-market financial premium at which public issue shares are bid and traded prior to their official listing on BSE or NSE. GMP reflects investor sentiment, secondary market dynamics, and anticipated listing price gain.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-line/60">
            <span className="text-xs font-mono text-accent">Formula: Expected Price = Cap Price + GMP</span>
          </div>
        </Card>

        {/* Card 2: Kostak & Subject to Sauda */}
        <Card className="p-6 flex flex-col justify-between hover:border-accent/40 transition-colors">
          <div>
            <div className="w-10 h-10 rounded-xl bg-up/10 border border-up/20 flex items-center justify-center text-up mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-heading font-bold mb-2 text-tx">
              Kostak Rate vs Subject to Sauda
            </h3>
            <p className="text-xs sm:text-sm text-mut leading-relaxed">
              <strong>Kostak Rate</strong> is the fixed lump-sum profit earned by selling an IPO application before allotment, irrespective of allotment success. <strong>Subject to Sauda (SS)</strong> is an agreement where profit is transferred only if shares are formally allotted to the bidder.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-line/60">
            <span className="text-xs font-mono text-up">Guaranteed profit vs allotment-conditional</span>
          </div>
        </Card>

        {/* Card 3: Subscription Status Breakdown */}
        <Card className="p-6 flex flex-col justify-between hover:border-accent/40 transition-colors">
          <div>
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-heading font-bold mb-2 text-tx">
              IPO Subscription: QIB, NII & Retail
            </h3>
            <p className="text-xs sm:text-sm text-mut leading-relaxed">
              Tracking subscription multiples shows institutional validation. <strong>QIB</strong> (Qualified Institutional Buyers) bidding picks up on Day 3. <strong>NII/HNI</strong> (Non-Institutional) reflects leveraged bids, while <strong>RII</strong> (Retail Individual Investors) highlights public demand.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-line/60">
            <span className="text-xs font-mono text-accent">Track real-time times-subscribed (x)</span>
          </div>
        </Card>
      </div>

      {/* In-depth Informational Section */}
      <div className="space-y-8 bg-card/60 border border-line rounded-2xl p-6 sm:p-8">
        {/* Step by step IPO Process */}
        <div>
          <h3 className="text-xl sm:text-2xl font-heading font-bold mb-4 text-tx flex items-center gap-2">
            <Clock className="w-5 h-5 text-accent" />
            The Complete IPO Timeline & Allotment Lifecycle
          </h3>
          <p className="text-sm text-mut leading-relaxed mb-4">
            Investing in initial public offerings requires understanding key regulatory milestones set under SEBI guidelines (T+3 listing timeline):
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <div className="p-4 rounded-xl bg-card2/80 border border-line/80">
              <span className="text-xs font-bold text-accent uppercase tracking-wider block mb-1">Step 01</span>
              <h4 className="font-heading font-bold text-sm text-tx">Bidding Window (T)</h4>
              <p className="text-xs text-mut mt-1 leading-relaxed">
                IPO opens for subscription (usually 3 working days). Investors place bids via ASBA net banking or UPI mandating.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-card2/80 border border-line/80">
              <span className="text-xs font-bold text-accent uppercase tracking-wider block mb-1">Step 02</span>
              <h4 className="font-heading font-bold text-sm text-tx">Basis of Allotment (T+1)</h4>
              <p className="text-xs text-mut mt-1 leading-relaxed">
                The designated registrar finalizes the share allocation lottery basis. Successful applicants receive debit alerts.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-card2/80 border border-line/80">
              <span className="text-xs font-bold text-accent uppercase tracking-wider block mb-1">Step 03</span>
              <h4 className="font-heading font-bold text-sm text-tx">Refunds & Demat Credit (T+2)</h4>
              <p className="text-xs text-mut mt-1 leading-relaxed">
                Bank mandate liens are unblocked for unsuccessful bids. Allotted shares are credited directly to your CDSL/NSDL demat account.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-card2/80 border border-line/80">
              <span className="text-xs font-bold text-accent uppercase tracking-wider block mb-1">Step 04</span>
              <h4 className="font-heading font-bold text-sm text-tx">Exchange Listing (T+3)</h4>
              <p className="text-xs text-mut mt-1 leading-relaxed">
                Shares ring the opening bell on BSE & NSE with pre-market discovery session from 9:00 AM to 9:45 AM.
              </p>
            </div>
          </div>
        </div>

        <hr className="border-line/70" />

        {/* Mainboard vs SME IPOs */}
        <div>
          <h3 className="text-xl sm:text-2xl font-heading font-bold mb-3 text-tx flex items-center gap-2">
            <Layers className="w-5 h-5 text-accent" />
            Mainboard IPO vs SME IPO: Key Differences
          </h3>
          <p className="text-sm text-mut leading-relaxed mb-4">
            India has two major initial public offering segments: Mainboard IPOs (regulated for larger capitalization) and SME IPOs (BSE SME & NSE Emerge platforms designed for emerging enterprises):
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-line bg-card2/50 text-mut uppercase font-mono tracking-wider">
                  <th className="py-3 px-4">Feature</th>
                  <th className="py-3 px-4">Mainboard IPO</th>
                  <th className="py-3 px-4">SME IPO (NSE Emerge / BSE SME)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                <tr>
                  <td className="py-3 px-4 font-semibold text-tx">Minimum Investment</td>
                  <td className="py-3 px-4 text-mut">~₹14,000 to ₹15,000 (1 Lot)</td>
                  <td className="py-3 px-4 text-mut">₹1,00,000 to ₹1,40,000+ (Fixed Lot Size)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-tx">Trading Lot Post-Listing</td>
                  <td className="py-3 px-4 text-mut">1 share (Liquid on BSE/NSE)</td>
                  <td className="py-3 px-4 text-mut">Traded only in predetermined lots (e.g. 1000, 2000 shares)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-tx">Underwriting Requirement</td>
                  <td className="py-3 px-4 text-mut">Mandatory partial / opt-in</td>
                  <td className="py-3 px-4 text-mut">100% underwritten issue (Merchant Banker ensures 15%)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-tx">Reporting & Track Record</td>
                  <td className="py-3 px-4 text-mut">Strict SEBI profitability & track record</td>
                  <td className="py-3 px-4 text-mut">Relaxed compliance for MSMEs and fast-growth companies</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-tx">Liquidity & Volatility</td>
                  <td className="py-3 px-4 text-mut">High liquidity, broad institutional participation</td>
                  <td className="py-3 px-4 text-mut">Higher volatility, circuit limits, lower daily volumes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <hr className="border-line/70" />

        {/* How to Check IPO Allotment Status */}
        <div>
          <h3 className="text-xl sm:text-2xl font-heading font-bold mb-3 text-tx flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-accent" />
            How to Check IPO Allotment Status Online
          </h3>
          <p className="text-sm text-mut leading-relaxed mb-4">
            Investors can check their allocation status across four reliable official channels. You will need your <strong>PAN card number</strong>, <strong>Application Number</strong>, or <strong>DP Client ID</strong>:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-card2/60 border border-line">
              <h4 className="font-heading font-bold text-sm text-tx mb-2">1. Registrar Portals (Fastest)</h4>
              <p className="text-xs text-mut leading-relaxed">
                Registrars like Link Intime India, KFin Technologies (KFintech), Bigshare Services, Skyline, and Cameo Corporate upload the finalized basis of allotment first. Simply pick the company name from the dropdown and submit your PAN.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-card2/60 border border-line">
              <h4 className="font-heading font-bold text-sm text-tx mb-2">2. Stock Exchanges (BSE & NSE)</h4>
              <p className="text-xs text-mut leading-relaxed">
                Visit the official BSE India or NSE India IPO Status portal. Select issue type as &apos;Equity&apos;, choose the company name, enter application number and PAN, and verify the allotment confirmation.
              </p>
            </div>
          </div>
        </div>

        <hr className="border-line/70" />

        {/* Risk Disclaimer */}
        <div className="p-4 rounded-xl bg-down/10 border border-down/20 text-tx">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-down shrink-0 mt-0.5" />
            <div>
              <h4 className="font-heading font-bold text-sm text-down">
                Important Grey Market Disclaimer & Risk Advisory
              </h4>
              <p className="text-xs text-mut mt-1 leading-relaxed">
                Grey Market Premium (GMP) is an unregulated, unofficial OTC estimate based on dealer quotes across local financial hubs. It does not guarantee listing gains and fluctuates wildly with overall market conditions, geopolitical news, and speculative pressure. Never make an IPO investment decision solely on the basis of GMP. Always evaluate company fundamentals, DRHP financial reports, valuation multiples (P/E ratio), promoter integrity, and anchor investor participation before applying.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
