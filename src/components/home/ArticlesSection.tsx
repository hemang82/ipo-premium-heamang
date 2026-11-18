import Link from "next/link";
import { staticArticles } from "@/lib/articles-data";
import { BookOpen, ArrowRight, Clock, Calendar, Sparkles } from "lucide-react";

export function ArticlesSection() {
  // Show top 6 high-traffic guides on homepage
  const featuredArticles = staticArticles.slice(0, 6);

  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      <div className="bg-card border border-line rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20">
              <BookOpen className="w-3.5 h-3.5" />
              IPO Learning Academy
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-tx tracking-tight">
              IPO Educational Guides &amp; Market Insights
            </h2>
            <p className="text-xs sm:text-sm text-mut leading-relaxed">
              Master Grey Market Premium (GMP), allotment probability strategies, and SME investing with our verified investor guides.
            </p>
          </div>

          <Link
            href="/articles"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-accent hover:underline shrink-0 group self-start sm:self-auto"
          >
            Explore All 8 Guides
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
          {featuredArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group p-5 rounded-2xl bg-card2/50 border border-line hover:border-accent/40 transition-all flex flex-col justify-between space-y-3.5 shadow-xs hover:shadow-sm"
            >
              <div className="space-y-2.5">
                {/* Meta Badge Row */}
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-accent px-2 py-0.5 rounded-md bg-accent/10 border border-accent/20">
                    {article.category}
                  </span>
                  <span className="text-mut flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-base text-tx group-hover:text-accent transition-colors leading-snug line-clamp-2">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs text-mut leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              {/* Bottom Row */}
              <div className="pt-3 border-t border-line/60 flex items-center justify-between text-xs font-semibold text-accent">
                <span className="group-hover:underline">Read Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
