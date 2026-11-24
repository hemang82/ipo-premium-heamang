import Link from "next/link";
import { NewsItem, formatNewsDate, slugify } from "@/lib/newsApi";
import { Newspaper, ArrowRight, Calendar, Sparkles, ExternalLink } from "lucide-react";

interface IpoNewsSectionProps {
  news: NewsItem[];
  companyName: string;
}

const DEFAULT_NEWS_IMAGE = "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop";

export function IpoNewsSection({ news = [], companyName }: IpoNewsSectionProps) {
  if (!news || news.length === 0) return null;

  return (
    <section id="section-news" className="scroll-mt-24 space-y-4">
      <div className="rounded-3xl bg-card border border-line p-6 sm:p-7 shadow-xs space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-line">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                <Newspaper className="w-3.5 h-3.5" />
              </div>
              <h2 className="font-heading font-extrabold text-lg sm:text-xl text-tx tracking-tight">
                {companyName} News &amp; DRHP Market Updates
              </h2>
            </div>
            <p className="text-xs text-mut">
              Real-time filings, price band updates, anchor allocations, and listing expectations.
            </p>
          </div>

          <Link
            href="/news"
            className="text-xs font-bold text-accent hover:underline flex items-center gap-1 self-start sm:self-auto shrink-0"
          >
            <span>All IPO News</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {news.slice(0, 4).map((item) => {
            const itemSlug = slugify(item.title);
            const formattedDate = formatNewsDate(item.created_at);
            const imageUrl = item.news_image || DEFAULT_NEWS_IMAGE;

            return (
              <Link
                key={item.id}
                href={`/news/${item.id}/${itemSlug}`}
                className="group rounded-2xl bg-card2/50 border border-line overflow-hidden hover:border-accent/40 hover:bg-card2 transition-all flex flex-col justify-between shadow-2xs"
              >
                <div>
                  {/* Image */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-card border-b border-line/60">
                    <img
                      src={imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="font-semibold text-[10px] text-accent px-2 py-0.5 rounded-md bg-card/90 backdrop-blur-md border border-line shadow-2xs flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        {item.category || "IPO News"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 pb-2">
                    <div className="flex items-center gap-1.5 text-[11px] text-mut font-medium mb-1.5">
                      <Calendar className="w-3 h-3 text-mut/80" />
                      <span>{formattedDate}</span>
                    </div>

                    <h3 className="font-heading font-bold text-sm text-tx group-hover:text-accent transition-colors leading-snug line-clamp-2 mb-1.5">
                      {item.title}
                    </h3>

                    <p className="text-xs text-mut leading-relaxed line-clamp-2">
                      {item.short_description || item.description?.replace(/<[^>]+>/g, "").slice(0, 120)}
                    </p>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="px-4 pb-3.5 pt-2 border-t border-line/40 flex items-center justify-between text-xs mt-2">
                  <span className="font-semibold text-accent flex items-center gap-1 group-hover:underline">
                    Read Report <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-[10px] text-mut font-medium">Verified Update</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
