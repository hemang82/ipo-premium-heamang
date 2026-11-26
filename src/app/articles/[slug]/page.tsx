import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { staticArticles, Article } from "@/lib/articles-data";
import { Card } from "@/components/ui/Card";
import { renderLinkifiedParagraph } from "@/components/ui/LinkifiedText";
import { SITE_URL, getBreadcrumbSchema } from "@/lib/seo";
import {
  ArrowLeft,
  Clock,
  BookOpen,
  Share2,
  Sparkles,
  AlertCircle,
  TrendingUp,
  Users,
  CheckCircle2,
  Calculator,
  ArrowRight,
} from "lucide-react";

export const revalidate = 10;

interface ArticleDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return staticArticles.map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({ params }: ArticleDetailPageProps): Promise<Metadata> {
  const resolved = await params;
  const article = staticArticles.find((a) => a.slug === resolved.slug);
  if (!article) {
    return {
      title: "Article Not Found | ipo-premium",
    };
  }

  const canonicalUrl = `${SITE_URL}/articles/${article.slug}/`;

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: canonicalUrl,
      type: "article",
    },
  };
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const resolved = await params;
  const article = staticArticles.find((a) => a.slug === resolved.slug);

  if (!article) {
    notFound();
  }

  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Articles", url: `${SITE_URL}/articles/` },
    { name: article.title, url: `${SITE_URL}/articles/${article.slug}/` },
  ]);

  // Related articles (exclude current)
  const related = staticArticles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-24">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-mut flex-wrap">
            <li>
              <Link href="/" className="hover:text-accent transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/articles" className="hover:text-accent transition-colors">
                Articles
              </Link>
            </li>
            <li>/</li>
            <li className="text-tx font-medium truncate max-w-xs sm:max-w-md">
              {article.title}
            </li>
          </ol>
        </nav>

        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/articles"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-mut hover:text-tx transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Guides & Articles
          </Link>
        </div>

        {/* Article Header */}
        <header className="border-b border-line pb-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent">
              {article.category}
            </span>
            <span className="text-xs text-mut flex items-center gap-1.5 font-mono">
              <Clock className="w-3.5 h-3.5 text-mut" />
              {article.readTime}
            </span>
            <span className="text-xs text-mut/80 font-mono">• {article.date}</span>
          </div>

          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-tx tracking-tightest leading-tight mb-4">
            {article.title}
          </h1>

          <p className="text-sm sm:text-base text-mut leading-relaxed">
            {article.excerpt}
          </p>
        </header>

        {/* Article Body */}
        <article className="space-y-8 text-tx/90 text-sm sm:text-base leading-relaxed">
          {article.content.map((sec, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="font-heading font-bold text-lg sm:text-xl text-tx border-l-2 border-accent pl-3">
                {sec.sectionTitle}
              </h2>

              {sec.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-mut text-sm sm:text-base leading-relaxed">
                  {renderLinkifiedParagraph(p, article.slug)}
                </p>
              ))}

              {sec.keyTakeaway && (
                <Card variant="subtle" className="p-4 border-line/80 bg-card2/60 my-4 text-xs sm:text-sm">
                  <div className="flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-tx block mb-0.5 font-semibold">Key Takeaway:</strong>
                      <span className="text-mut">{sec.keyTakeaway}</span>
                    </div>
                  </div>
                </Card>
              )}
            </section>
          ))}
        </article>

        {/* Disclaimer Box */}
        <div className="mt-12 p-4 rounded-xl bg-card2 border border-line text-xs text-mut">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <p>
              <strong>Disclaimer:</strong> This article is authored solely for educational and informational purposes. It does not constitute investment advice or a recommendation to buy or sell securities. Always review the Red Herring Prospectus (RHP) before applying for any IPO.
            </p>
          </div>
        </div>

        {/* Keyword-Rich Internal Linking Grid */}
        <div className="mt-12 p-6 rounded-2xl bg-card border border-line space-y-4">
          <div>
            <h3 className="font-heading font-bold text-base sm:text-lg text-tx">
              Essential IPO Trackers &amp; Tools
            </h3>
            <p className="text-xs text-mut mt-0.5">
              Live data tools and calculators to help you evaluate and track every public issue:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <Link
              href="/ipo-gmp"
              className="p-3.5 rounded-xl bg-card2/50 border border-line hover:border-accent hover:bg-card transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-heading font-bold text-xs sm:text-sm text-tx group-hover:text-accent transition-colors block">
                    IPO Market Today
                  </span>
                  <span className="text-[11px] text-mut block">
                    Live IPO Market rates &amp; listing gains
                  </span>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-mut group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
            </Link>

            <Link
              href="/subscription"
              className="p-3.5 rounded-xl bg-card2/50 border border-line hover:border-accent hover:bg-card transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-heading font-bold text-xs sm:text-sm text-tx group-hover:text-accent transition-colors block">
                    Live IPO Subscription Status
                  </span>
                  <span className="text-[11px] text-mut block">
                    Real-time QIB, NII &amp; Retail BSE/NSE bidding
                  </span>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-mut group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
            </Link>

            <Link
              href="/allotment"
              className="p-3.5 rounded-xl bg-card2/50 border border-line hover:border-accent hover:bg-card transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-heading font-bold text-xs sm:text-sm text-tx group-hover:text-accent transition-colors block">
                    IPO Allotment Status Check
                  </span>
                  <span className="text-[11px] text-mut block">
                    Verify share allocation online by PAN number
                  </span>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-mut group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
            </Link>

            <Link
              href="/tools/lot-calculator"
              className="p-3.5 rounded-xl bg-card2/50 border border-line hover:border-accent hover:bg-card transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                  <Calculator className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-heading font-bold text-xs sm:text-sm text-tx group-hover:text-accent transition-colors block">
                    IPO Lot Size Calculator
                  </span>
                  <span className="text-[11px] text-mut block">
                    Calculate lot amounts, sHNI &amp; bHNI tiers
                  </span>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-mut group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-14 pt-8 border-t border-line">
          <h3 className="font-heading font-bold text-xl text-tx mb-6">
            Recommended IPO Reads
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((rel) => (
              <Link
                key={rel.slug}
                href={`/articles/${rel.slug}/`}
                className="p-4 rounded-xl bg-card border border-line hover:border-accent transition-colors block group"
              >
                <span className="text-xs font-semibold text-accent block mb-1">
                  {rel.category}
                </span>
                <h4 className="font-heading font-bold text-sm text-tx group-hover:text-accent transition-colors line-clamp-2">
                  {rel.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
