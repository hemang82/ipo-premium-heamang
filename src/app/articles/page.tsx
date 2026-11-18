import { Metadata } from "next";
import Link from "next/link";
import { staticArticles } from "@/lib/articles-data";
import { Card } from "@/components/ui/Card";
import { SITE_URL } from "@/lib/seo";
import { BookOpen, Clock, ArrowRight, TrendingUp, BarChart3, FileCheck2, Calculator } from "lucide-react";

export const revalidate = 10;

export const metadata: Metadata = {
  title: "IPO Guides & Research Articles",
  description:
    "Comprehensive educational guides on IPO Grey Market Premiums, Kostak rates, Subject to Sauda agreements, and allotment allocation strategies.",
  alternates: {
    canonical: `${SITE_URL}/articles`,
  },
  keywords: [
    "IPO Educational Guides",
    "What is IPO GMP",
    "Kostak Rate vs Subject to Sauda",
    "How to Increase Allotment Chances",
    "Mainboard vs SME Comparison",
  ],
};

export default function ArticlesIndexPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 pb-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold text-accent mb-4">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Knowledge Base & Expert Insights</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-tx tracking-tightest leading-tight mb-3">
          IPO Guides, Analysis & Trading Strategies
        </h1>
        <p className="text-sm sm:text-base text-mut leading-relaxed">
          Master the primary market with research-backed articles covering live Grey Market Premium mechanics, allotment optimization, SEBI regulations, and SME stock selection.
        </p>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staticArticles.map((article) => (
          <Card
            key={article.slug}
            variant="default"
            className="flex flex-col justify-between p-6 border-line hover:border-accent/50 group transition-all"
          >
            <div>
              {/* Category & Read Time */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-card2 border border-line text-accent">
                  {article.category}
                </span>
                <span className="text-xs text-mut flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3 text-mut" />
                  {article.readTime}
                </span>
              </div>

              {/* Title */}
              <Link href={`/articles/${article.slug}/`}>
                <h2 className="font-heading font-bold text-base sm:text-lg text-tx group-hover:text-accent transition-colors line-clamp-2 mb-3 leading-snug">
                  {article.title}
                </h2>
              </Link>

              {/* Excerpt */}
              <p className="text-xs sm:text-sm text-mut leading-relaxed line-clamp-3">
                {article.excerpt}
              </p>
            </div>

            {/* Bottom Meta */}
            <div className="pt-4 mt-4 border-t border-line/60 flex items-center justify-between">
              <span className="text-xs text-mut/80 font-mono">{article.date}</span>
              <Link
                href={`/articles/${article.slug}/`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
              >
                Read Article
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {/* Keyword-Rich Cross-Navigation Mesh */}
      <div className="mt-16 bg-card border border-line rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
        <div>
          <h2 className="font-heading font-black text-xl sm:text-2xl text-tx">
            Explore Live IPO Trackers & Calculators
          </h2>
          <p className="text-sm text-mut mt-0.5">
            Put research into practice with our real-time market tracking tools.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <Link
            href="/ipo-gmp"
            className="group p-5 rounded-2xl bg-card2/40 border border-line hover:border-accent/40 transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-accent">
                <TrendingUp className="w-5 h-5" />
                <span className="text-xs uppercase font-bold tracking-wider">Premium Tracker</span>
              </div>
              <h3 className="font-heading font-bold text-base text-tx group-hover:text-accent transition-colors">
                IPO GMP Today
              </h3>
              <p className="text-xs text-mut leading-relaxed">
                Track live Grey Market Premium, expected listing gains, and Kostak rates for active IPOs.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent group-hover:underline pt-2">
              View Live GMP <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            href="/subscription"
            className="group p-5 rounded-2xl bg-card2/40 border border-line hover:border-accent/40 transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-accent">
                <BarChart3 className="w-5 h-5" />
                <span className="text-xs uppercase font-bold tracking-wider">Bidding Demand</span>
              </div>
              <h3 className="font-heading font-bold text-base text-tx group-hover:text-accent transition-colors">
                Live IPO Subscription Status
              </h3>
              <p className="text-xs text-mut leading-relaxed">
                Real-time subscription figures across QIB, NII / HNI, and Retail investor quotas.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent group-hover:underline pt-2">
              View Subscription <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            href="/allotment"
            className="group p-5 rounded-2xl bg-card2/40 border border-line hover:border-accent/40 transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-accent">
                <FileCheck2 className="w-5 h-5" />
                <span className="text-xs uppercase font-bold tracking-wider">Registrar Search</span>
              </div>
              <h3 className="font-heading font-bold text-base text-tx group-hover:text-accent transition-colors">
                IPO Allotment Status Check by PAN
              </h3>
              <p className="text-xs text-mut leading-relaxed">
                Check allotment results across Link Intime, KFintech, Bigshare, and BSE portals.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent group-hover:underline pt-2">
              Check Allotment <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            href="/tools/lot-calculator"
            className="group p-5 rounded-2xl bg-card2/40 border border-line hover:border-accent/40 transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-accent">
                <Calculator className="w-5 h-5" />
                <span className="text-xs uppercase font-bold tracking-wider">Lot Calculator</span>
              </div>
              <h3 className="font-heading font-bold text-base text-tx group-hover:text-accent transition-colors">
                IPO Lot Size Calculator
              </h3>
              <p className="text-xs text-mut leading-relaxed">
                Calculate total investment outlay, minimum lot requirements, and expected profits.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent group-hover:underline pt-2">
              Calculate Returns <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
