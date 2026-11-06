import { Metadata } from "next";
import Link from "next/link";
import { getNewsList, slugify, formatNewsDate, NewsItem } from "@/lib/newsApi";
import { SITE_URL, getBreadcrumbSchema } from "@/lib/seo";
import {
  Newspaper,
  Calendar,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  TrendingUp,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export const revalidate = 3600; // ISR 1 hour

interface NewsPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export async function generateMetadata({ searchParams }: NewsPageProps): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams.page) || 1;
  const canonicalUrl =
    currentPage > 1 ? `${SITE_URL}/news?page=${currentPage}` : `${SITE_URL}/news`;

  return {
    title: `Latest IPO News & Market Trends (Page ${currentPage}) | ipo-premium`,
    description:
      "Stay informed with real-time Indian stock market IPO news: upcoming public issues, Grey Market Premium (GMP) alerts, SEBI DRHP approvals, and expert listing analyses.",
    keywords: [
      "Latest IPO News",
      "IPO Market Trends",
      "Upcoming IPO News India",
      "Grey Market Premium News",
      "SEBI IPO Approvals",
      "Mainboard IPO News",
      "SME IPO News 2025",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: "Latest IPO News & Market Trends | ipo-premium",
      description:
        "Breaking news and verified analyses on Indian IPOs, GMP trends, and primary market updates.",
      url: canonicalUrl,
      type: "website",
      siteName: "ipo-premium",
    },
    twitter: {
      card: "summary_large_image",
      title: "Latest IPO News & Market Trends",
      description:
        "Breaking news and verified analyses on Indian IPOs, GMP trends, and primary market updates.",
    },
  };
}

export default async function NewsListingPage({ searchParams }: NewsPageProps) {
  const resolvedParams = await searchParams;
  const currentPage = Math.max(1, Number(resolvedParams.page) || 1);
  const PAGE_LIMIT = 10;

  const { data: newsItems, pagination } = await getNewsList(currentPage, PAGE_LIMIT);

  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "News", url: `${SITE_URL}/news` },
  ]);

  // On page 1, split the first item as the "Featured Story"
  const isFirstPage = currentPage === 1;
  const featuredArticle: NewsItem | null = isFirstPage && newsItems.length > 0 ? newsItems[0] : null;
  const gridArticles: NewsItem[] = isFirstPage ? newsItems.slice(1) : newsItems;

  const totalPages = pagination.totalPages || 1;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <main className="min-h-screen bg-bg py-8 sm:py-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          {/* ── 1. Hero Banner ── */}
          <div className="bg-card border border-line rounded-3xl p-6 sm:p-8 md:p-10 shadow-xs relative overflow-hidden">
            <div className="max-w-3xl space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20">
                  <Sparkles className="w-3.5 h-3.5" />
                  Real-Time Market Dispatch
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-mut bg-card2 border border-line">
                  {pagination.totalRows} Verified Articles
                </span>
              </div>

              <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-tx tracking-tightest leading-tight">
                Latest IPO News &amp; Market Trends
              </h1>

              <p className="text-sm sm:text-base text-mut leading-relaxed">
                Stay ahead of the primary market with breaking coverage on upcoming public offerings,
                Grey Market Premium (GMP) swings, SEBI DRHP approvals, and institutional anchor bookings.
              </p>
            </div>
          </div>

          {/* ── 2. Featured Story (Page 1 Only) ── */}
          {featuredArticle && (
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-accent uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Featured Story
                </span>
                <span className="text-xs text-mut">Top Editorial Pick</span>
              </div>

              {(() => {
                const slug = slugify(featuredArticle.title);
                const detailHref = `/news/${featuredArticle.id}/${slug}`;

                return (
                  <div className="group rounded-3xl bg-card border border-line overflow-hidden shadow-xs hover:shadow-md hover:border-accent/60 transition-all duration-200">
                    <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">

                      {/* Image Column (7 cols on lg) */}
                      <Link
                        href={detailHref}
                        className="lg:col-span-7 relative aspect-video lg:aspect-auto min-h-[260px] lg:min-h-[360px] overflow-hidden bg-card2 block"
                      >
                        <img
                          src={featuredArticle.news_image}
                          alt={featuredArticle.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="eager"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
                      </Link>

                      {/* Content Column (5 cols on lg) */}
                      <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="inline-flex items-center justify-center h-[21px] px-2.5 rounded-md text-[11px] font-semibold bg-accent text-accent-foreground shadow-xs leading-none whitespace-nowrap shrink-0 text-center">
                              {featuredArticle.category || "IPO News"}
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs text-mut font-medium">
                              <Calendar className="w-3.5 h-3.5 text-mut/80" />
                              {formatNewsDate(featuredArticle.created_at)}
                            </span>
                          </div>

                          <Link href={detailHref} className="block group/title">
                            <h2 className="font-heading font-black text-xl sm:text-2xl text-tx group-hover/title:text-accent transition-colors leading-snug">
                              {featuredArticle.title}
                            </h2>
                          </Link>

                          <p className="text-xs sm:text-sm text-mut leading-relaxed line-clamp-4">
                            {featuredArticle.short_description}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-line/60 flex items-center justify-between">
                          <Link
                            href={detailHref}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-accent text-accent-foreground hover:bg-accent/90 transition-all shadow-xs"
                          >
                            Read Full Story
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                          {featuredArticle.news_url && (
                            <a
                              href={featuredArticle.news_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-mut hover:text-tx transition-colors"
                            >
                              Source
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })()}
            </section>
          )}

          {/* ── 3. Articles Responsive Grid (1 col mobile, 2 col tablet, 3 col desktop) ── */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-extrabold text-xl text-tx tracking-tight flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-accent" />
                {isFirstPage ? "More Recent Stories" : `Market News – Page ${currentPage}`}
              </h2>
              <span className="text-xs text-mut font-mono">
                Showing {newsItems.length} Stories
              </span>
            </div>

            {gridArticles.length === 0 ? (
              <div className="text-center py-16 rounded-3xl bg-card border border-line space-y-3">
                <Newspaper className="w-10 h-10 text-mut mx-auto opacity-40" />
                <p className="text-base font-semibold text-tx">No articles found on this page</p>
                <Link
                  href="/news"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-accent text-accent-foreground"
                >
                  Return to Page 1
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {gridArticles.map((article) => {
                  const slug = slugify(article.title);
                  const detailHref = `/news/${article.id}/${slug}`;

                  return (
                    <article
                      key={article.id}
                      className="group flex flex-col justify-between rounded-3xl bg-card border border-line overflow-hidden shadow-xs hover:shadow-md hover:border-accent/60 transition-all duration-200"
                    >
                      <div className="space-y-3.5">
                        {/* Article Thumbnail */}
                        <Link
                          href={detailHref}
                          className="relative aspect-video w-full overflow-hidden bg-card2 block"
                        >
                          <img
                            src={article.news_image}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="inline-flex items-center justify-center h-[21px] px-2.5 rounded-md text-[11px] font-semibold bg-accent text-accent-foreground shadow-xs leading-none whitespace-nowrap shrink-0 text-center">
                              {article.category || "IPO News"}
                            </span>
                          </div>
                        </Link>

                        {/* Title & Short Description */}
                        <div className="px-5 space-y-2">
                          <div className="flex items-center gap-1.5 text-[11px] text-mut font-medium">
                            <Calendar className="w-3.5 h-3.5 text-mut/70" />
                            {formatNewsDate(article.created_at)}
                          </div>

                          <Link href={detailHref} className="block group/link">
                            <h3 className="font-heading font-bold text-base text-tx group-hover/link:text-accent transition-colors line-clamp-2 leading-snug">
                              {article.title}
                            </h3>
                          </Link>

                          <p className="text-xs text-mut leading-relaxed line-clamp-3">
                            {article.short_description}
                          </p>
                        </div>
                      </div>

                      {/* Card Footer: Read Story link */}
                      <div className="p-5 pt-3.5 mt-2 border-t border-line/60 flex items-center justify-between">
                        <Link
                          href={detailHref}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-accent group-hover:text-accent/90 transition-colors"
                        >
                          Read Full Story
                          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        {article.news_url && (
                          <span className="text-[10px] text-mut/80 font-mono">
                            Verified Source
                          </span>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>

          {/* ── 4. Pagination Component ── */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-line/60 flex-wrap">
              {/* Previous Button */}
              {currentPage > 1 ? (
                <Link
                  href={currentPage === 2 ? "/news" : `/news?page=${currentPage - 1}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-card border border-line text-tx hover:border-accent hover:text-accent transition-all shadow-xs"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-card border border-line text-mut/40 cursor-not-allowed">
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </span>
              )}

              {/* Numbered Page Buttons */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                  const isActive = pageNum === currentPage;
                  const pageHref = pageNum === 1 ? "/news" : `/news?page=${pageNum}`;

                  return (
                    <Link
                      key={pageNum}
                      href={pageHref}
                      className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all flex items-center justify-center ${
                        isActive
                          ? "bg-accent text-accent-foreground shadow-xs"
                          : "bg-card border border-line text-tx hover:border-accent hover:text-accent"
                      }`}
                    >
                      {pageNum}
                    </Link>
                  );
                })}
              </div>

              {/* Next Button */}
              {currentPage < totalPages ? (
                <Link
                  href={`/news?page=${currentPage + 1}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-card border border-line text-tx hover:border-accent hover:text-accent transition-all shadow-xs"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-card border border-line text-mut/40 cursor-not-allowed">
                  Next
                  <ChevronRight className="w-4 h-4" />
                </span>
              )}
            </div>
          )}

        </div>
      </main>
    </>
  );
}
