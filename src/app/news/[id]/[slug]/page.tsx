import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getNewsDetail,
  getNewsList,
  slugify,
  formatNewsDate,
  NewsItem,
} from "@/lib/newsApi";
import { formatNewsArticleHtml } from "@/lib/newsContentFormatter";
import { SITE_URL, getBreadcrumbSchema } from "@/lib/seo";
import {
  Calendar,
  Clock,
  ChevronRight,
  ExternalLink,
  ArrowLeft,
  Share2,
  TrendingUp,
  Newspaper,
  ShieldCheck,
} from "lucide-react";

export const revalidate = 3600; // ISR 1 hour

interface NewsDetailProps {
  params: Promise<{
    id: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: NewsDetailProps): Promise<Metadata> {
  const resolvedParams = await params;
  const article = await getNewsDetail(resolvedParams.id);

  if (!article) {
    return {
      title: "News Article Not Found | ipo-premium",
      description: "The requested IPO news article could not be located.",
    };
  }

  const slug = resolvedParams.slug || slugify(article.title);
  const canonicalUrl = `${SITE_URL}/news/${article.id}/${slug}`;
  const ogImage = article.news_image || "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200";

  return {
    title: `${article.title} | ipo-premium News`,
    description:
      article.short_description ||
      "Read full reporting and detailed IPO market developments on ipo-premium.",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: article.title,
      description: article.short_description,
      url: canonicalUrl,
      type: "article",
      publishedTime: article.created_at,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      siteName: "ipo-premium",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.short_description,
      images: [ogImage],
    },
  };
}

export default async function NewsDetailPage({ params }: NewsDetailProps) {
  const resolvedParams = await params;
  const article = await getNewsDetail(resolvedParams.id);

  if (!article) {
    notFound();
  }

  const currentSlug = resolvedParams.slug || slugify(article.title);
  const canonicalUrl = `${SITE_URL}/news/${article.id}/${currentSlug}`;

  // Fetch recent news for sidebar (5 items, excluding current article)
  const recentListResponse = await getNewsList(1, 10);
  const sidebarRecent = recentListResponse.data
    .filter((item) => String(item.id) !== String(article.id))
    .slice(0, 5);

  // Schema.org: NewsArticle JSON-LD
  const newsArticleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.short_description,
    image: [article.news_image || "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200"],
    datePublished: article.created_at,
    dateModified: article.created_at,
    author: [
      {
        "@type": "Organization",
        name: "ipo-premium Editorial Team",
        url: SITE_URL,
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "ipo-premium",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  };

  // Schema.org: Breadcrumbs JSON-LD
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "News", url: `${SITE_URL}/news` },
    { name: article.title, url: canonicalUrl },
  ]);

  // Format article content (handles HTML tags, Markdown links, bullets, and plain-text paragraphs)
  const formattedContent = formatNewsArticleHtml(article.description);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen bg-bg py-8 sm:py-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

          {/* ── Breadcrumb Bar ── */}
          <nav className="flex items-center gap-2 text-xs text-mut flex-wrap">
            <Link href="/" className="hover:text-accent transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-mut/60" />
            <Link href="/news" className="hover:text-accent transition-colors">
              News
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-mut/60" />
            <span className="text-tx font-medium truncate max-w-[260px] sm:max-w-md">
              {article.title}
            </span>
          </nav>

          {/* ── Main Layout: Article on Left (8 cols), Sidebar on Right (4 cols) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* LEFT COLUMN: Main Article (8 cols) */}
            <article className="lg:col-span-8 bg-card border border-line rounded-3xl p-6 sm:p-8 md:p-10 shadow-xs space-y-6">

              {/* Category, Date & Back Link */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-line/60">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center justify-center h-[21px] px-2.5 rounded-md text-[11px] font-semibold bg-accent text-accent-foreground shadow-xs leading-none whitespace-nowrap shrink-0 text-center">
                    {article.category || "IPO News"}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-mut font-medium">
                    <Calendar className="w-3.5 h-3.5 text-mut/70" />
                    {formatNewsDate(article.created_at)}
                  </span>
                </div>

                <Link
                  href="/news"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-mut hover:text-accent transition-colors self-start sm:self-auto"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  All Stories
                </Link>
              </div>

              {/* Article Headline (H1) */}
              <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-tx tracking-tight leading-snug">
                {article.title}
              </h1>

              {/* Lead Summary Callout */}
              {article.short_description && (
                <div className="p-4 rounded-2xl bg-card2/60 border-l-4 border-accent text-xs sm:text-sm text-tx/90 leading-relaxed font-medium">
                  {article.short_description}
                </div>
              )}

              {/* High-Res Featured Image */}
              {article.news_image && (
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-card2 border border-line shadow-xs">
                  <img
                    src={article.news_image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
              )}

              {/* Main Article Body (Render HTML Description safely) */}
              <div
                className="prose prose-invert max-w-none text-xs sm:text-sm text-tx/90 leading-relaxed sm:leading-loose space-y-4 pt-2 [&>h1]:hidden [&>article>h1]:hidden [&>h2]:font-heading [&>h2]:font-extrabold [&>h2]:text-lg [&>h2]:sm:text-xl [&>h2]:text-tx [&>h2]:pt-6 [&>h2]:pb-2 [&>h2]:border-b [&>h2]:border-line/40 [&>h3]:font-heading [&>h3]:font-bold [&>h3]:text-base [&>h3]:text-tx [&>h3]:pt-4 [&>p]:leading-relaxed sm:[&>p]:leading-loose [&>p]:text-tx/90 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ul]:text-tx/85 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2 [&>ol]:text-tx/85 [&>strong]:text-tx [&>strong]:font-bold [&>a]:text-accent [&>a]:underline [&>a]:font-semibold [&>a:hover]:text-accent/80"
                dangerouslySetInnerHTML={{ __html: formattedContent }}
              />

              {/* Original Source Button */}
              {article.news_url && (
                <div className="pt-6 border-t border-line/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-xs text-mut">
                    Original reporting syndicated via official market sources.
                  </div>
                  <a
                    href={article.news_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-accent text-accent-foreground hover:bg-accent/90 transition-all shadow-xs self-start sm:self-auto"
                  >
                    Read Original Source
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {/* Bottom Navigation CTA inside Article */}
              <div className="p-5 rounded-2xl bg-card2/50 border border-line flex flex-col sm:flex-row items-center justify-between gap-3 text-xs mt-6">
                <span className="font-semibold text-tx">
                  Explore live grey market premiums and subscription demand:
                </span>
                <div className="flex items-center gap-2">
                  <Link
                    href="/ipo-gmp"
                    className="px-3 py-1.5 rounded-lg font-semibold bg-accent/15 text-accent border border-accent/25 hover:bg-accent hover:text-accent-foreground transition-all"
                  >
                    IPO GMP
                  </Link>
                  <Link
                    href="/subscription"
                    className="px-3 py-1.5 rounded-lg font-semibold bg-card border border-line text-tx hover:border-accent hover:text-accent transition-all"
                  >
                    Subscription
                  </Link>
                </div>
              </div>

            </article>

            {/* RIGHT COLUMN: Sticky Sidebar (4 cols) */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">

              {/* Sidebar Card: Recent Stories */}
              <div className="bg-card border border-line rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-line/60">
                  <h3 className="font-heading font-extrabold text-base text-tx flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-accent" />
                    Recent Stories
                  </h3>
                  <Link
                    href="/news"
                    className="text-xs font-semibold text-accent hover:underline"
                  >
                    View All
                  </Link>
                </div>

                <div className="space-y-3.5">
                  {sidebarRecent.map((item) => {
                    const slug = slugify(item.title);
                    const detailHref = `/news/${item.id}/${slug}`;

                    return (
                      <Link
                        key={item.id}
                        href={detailHref}
                        className="group flex items-start gap-3 p-2.5 rounded-2xl hover:bg-card2 transition-all border border-transparent hover:border-line"
                      >
                        {/* Thumbnail */}
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-card2 shrink-0 border border-line/60">
                          <img
                            src={item.news_image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            loading="lazy"
                          />
                        </div>

                        {/* Title & Date */}
                        <div className="min-w-0 flex-1 space-y-1">
                          <h4 className="font-heading font-bold text-xs sm:text-sm text-tx group-hover:text-accent transition-colors line-clamp-2 leading-snug">
                            {item.title}
                          </h4>
                          <span className="text-[11px] text-mut block font-mono">
                            {formatNewsDate(item.created_at)}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Quick Links Card */}
              <div className="p-5 rounded-3xl bg-accent/8 border border-accent/20 space-y-3 text-xs">
                <h4 className="font-heading font-bold text-sm text-tx flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  Quick Tools
                </h4>
                <p className="text-mut leading-relaxed">
                  Calculate required lot sizes or verify your application status on official registrar portals.
                </p>
                <div className="space-y-1.5 pt-1">
                  <Link
                    href="/tools/lot-calculator"
                    className="flex items-center justify-between p-2 rounded-xl bg-card border border-line hover:border-accent hover:text-accent transition-all font-medium text-tx"
                  >
                    <span>Lot Size Calculator</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/allotment"
                    className="flex items-center justify-between p-2 rounded-xl bg-card border border-line hover:border-accent hover:text-accent transition-all font-medium text-tx"
                  >
                    <span>Allotment Status Checker</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </aside>

          </div>

        </div>
      </main>
    </>
  );
}
