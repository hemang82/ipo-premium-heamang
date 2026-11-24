import Link from "next/link";
import { NewsItem, formatNewsDate, slugify } from "@/lib/newsApi";
import { Newspaper, ArrowRight, Calendar, Sparkles } from "lucide-react";

interface HomeNewsSectionProps {
  news?: NewsItem[];
}

const DEFAULT_NEWS_IMAGE = "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop";

export function HomeNewsSection({ news = [] }: HomeNewsSectionProps) {
  // Take top 3 latest breaking news for homepage showcase
  const topNews = news.slice(0, 3);

  if (!topNews || topNews.length === 0) return null;

  return (
    <section className="my-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-line pb-3">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20">
            <Newspaper className="w-3.5 h-3.5" />
            <span>Market Intelligence</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-tx tracking-tightest">
            Latest IPO News &amp; Market Updates
          </h2>
          <p className="text-xs sm:text-sm text-mut">
            Real-time SEBI DRHP approval alerts, price band announcements, and anchor bidding updates.
          </p>
        </div>

        <Link
          href="/news"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-accent hover:underline shrink-0 group self-start sm:self-auto"
        >
          <span>View All Market News</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* 3-Column Clean News Card Grid with Featured Image */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {topNews.map((item) => {
          const itemSlug = slugify(item.title);
          const formattedDate = formatNewsDate(item.created_at);
          const imageUrl = item.news_image || DEFAULT_NEWS_IMAGE;

          return (
            <Link
              key={item.id}
              href={`/news/${item.id}/${itemSlug}`}
              className="group rounded-3xl bg-card border border-line overflow-hidden shadow-2xs hover:shadow-md hover:border-accent/40 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* News Image with Zoom Effect */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-card2 border-b border-line/60">
                  <img
                    src={imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="font-semibold text-[11px] text-accent px-2.5 py-1 rounded-lg bg-card/90 backdrop-blur-md border border-line shadow-2xs flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {item.category || "IPO News"}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6 pb-2">
                  {/* Meta Date */}
                  <div className="flex items-center gap-1.5 text-xs text-mut font-medium mb-2.5">
                    <Calendar className="w-3.5 h-3.5 text-mut/80" />
                    <span>{formattedDate}</span>
                  </div>

                  {/* News Title */}
                  <h3 className="font-heading font-bold text-base text-tx group-hover:text-accent transition-colors leading-snug line-clamp-2 mb-2">
                    {item.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-mut leading-relaxed line-clamp-2">
                    {item.short_description || item.description?.replace(/<[^>]+>/g, "").slice(0, 130)}
                  </p>
                </div>
              </div>

              {/* Read Full Report Link at Bottom */}
              <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-line/40 flex items-center justify-between mt-2">
                <span className="text-xs font-semibold text-accent flex items-center gap-1 group-hover:underline">
                  Read Full Report
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-[11px] text-mut font-medium">
                  Verified Filing
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
