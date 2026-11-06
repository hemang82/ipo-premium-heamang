import { Metadata } from "next";
import Link from "next/link";
import { staticArticles } from "@/lib/articles-data";
import { Card } from "@/components/ui/Card";
import { SITE_URL } from "@/lib/seo";
import { BookOpen, Clock, ArrowRight, Sparkles, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "IPO Guides & Research Articles | ipo-premium",
  description:
    "Explore 8 in-depth educational articles and guides on IPO Grey Market Premium (GMP), Kostak rates, Subject to Sauda, allotment checking, and primary market investment strategies.",
  alternates: {
    canonical: `${SITE_URL}/articles/`,
  },
};

export default function ArticlesIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold text-accent mb-4">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Knowledge Base & Expert Insights</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-tx tracking-tightest leading-tight mb-4">
          IPO Guides, Analysis & Trading Strategies
        </h1>
        <p className="text-sm sm:text-base text-mut leading-relaxed">
          Master the primary market with research-backed articles covering live Grey Market Premium mechanics, allotment optimization, SEBI regulations, and SME stock selection.
        </p>
      </div>





      

      {/* Grid of 8 Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staticArticles.map((article, idx) => (
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
    </div>
  );
}
