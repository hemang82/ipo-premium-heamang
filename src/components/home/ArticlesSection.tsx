import Link from "next/link";
import { staticArticles } from "@/lib/articles-data";
import { BookOpen, ArrowRight, Clock } from "lucide-react";

export function ArticlesSection() {
  // Show top 6 high-traffic guides on homepage
  const featuredArticles = staticArticles.slice(0, 6);

  return (
    <section className="my-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Clean & Balanced Section Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-line pb-3">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20">
            <BookOpen className="w-3.5 h-3.5" />
            <span>IPO Learning Academy</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-tx tracking-tightest">
            IPO Educational Guides &amp; Market Insights
          </h2>
          <p className="text-xs sm:text-sm text-mut">
            Master IPO price discovery, allotment probability strategies, and SME investing rules.
          </p>
        </div>

        <Link
          href="/articles"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-accent hover:underline shrink-0 group self-start sm:self-auto"
        >
          <span>Explore All 8 Guides</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* 3-Column Responsive Article Cards (Equal Height & Synced Bottom Line) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuredArticles.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="group rounded-3xl bg-card border border-line p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-accent/40 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              {/* Meta Row */}
              <div className="flex items-center justify-between text-[11px] mb-3">
                <span className="font-semibold text-accent px-2 py-0.5 rounded-md bg-accent/10 border border-accent/20">
                  {article.category}
                </span>
                <span className="text-mut flex items-center gap-1 font-medium">
                  <Clock className="w-3 h-3 text-mut/80" />
                  {article.readTime}
                </span>
              </div>

              {/* Title (Consistent height clamp) */}
              <h3 className="font-heading font-bold text-base text-tx group-hover:text-accent transition-colors leading-snug line-clamp-2 mb-2">
                {article.title}
              </h3>

              {/* Excerpt */}
              <p className="text-xs sm:text-sm text-mut leading-relaxed line-clamp-2">
                {article.excerpt}
              </p>
            </div>

            {/* Bottom Synced Line */}
            <div className="mt-5 pt-3.5 border-t border-line/60 flex items-center justify-between text-xs font-bold text-tx group-hover:text-accent transition-colors">
              <span>Read Full Guide</span>
              <div className="w-6 h-6 rounded-full bg-card2 group-hover:bg-accent group-hover:text-white flex items-center justify-center transition-all">
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
