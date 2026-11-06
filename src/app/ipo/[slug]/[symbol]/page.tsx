import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllIpos,
  getIpoBySlug,
  getIpoGmpDetail,
  getIpoSubscriptionDetail,
  getIpoReview,
} from "@/lib/ipo-service";
import { getIpoMetadata, getBreadcrumbSchema, getFaqSchema, SITE_URL } from "@/lib/seo";
import { formatINR, formatPercent, gmpPercent, estimatedListingPrice, formatSubscription } from "@/lib/format";
import { IpoDetailsClientLayout } from "@/components/ipo/IpoDetailsClientLayout";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";

export const revalidate = 300; // ISR 5 mins

interface PageProps {
  params: Promise<{
    slug: string;
    symbol: string;
  }>;
}

export async function generateStaticParams() {
  const ipos = await getAllIpos();
  return ipos.map((ipo) => ({
    slug: ipo.slug,
    symbol: ipo.symbol,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = await params;
  const ipo = await getIpoBySlug(resolved.slug, resolved.symbol);
  if (!ipo) {
    return {
      title: "IPO Not Found | ipo-premium",
      description: "The requested IPO details could not be found.",
    };
  }
  return getIpoMetadata(ipo);
}

export default async function IpoDetailPage({ params }: PageProps) {
  const resolved = await params;
  const ipo = await getIpoBySlug(resolved.slug, resolved.symbol);

  if (!ipo) {
    notFound();
  }

  // Parallel API requests for Specialized Tabs:
  // 1. GMP Detail API (/ipo/ipo-gmp-detail/{symbol}/)
  // 2. Subscription Detail API (/ipo/ipo-subscription-detail/{symbol}/)
  // 3. Review API (/ipo/review-retrieve/{id}/)
  const [gmpRes, subRes, reviewRes] = await Promise.all([
    getIpoGmpDetail(resolved.symbol),
    getIpoSubscriptionDetail(resolved.symbol),
    ipo.rawApiData?.id ? getIpoReview(ipo.rawApiData.id) : null,
  ]);

  const gmpData = gmpRes?.data || null;
  const subData = subRes?.data || null;
  const reviewData = reviewRes || null;

  const percent = gmpPercent(ipo);
  const estListing = estimatedListingPrice(ipo);
  const raw = ipo.rawApiData || {};

  // High-ranking Breadcrumbs Schema (Home / [Company Name] ([Board]))
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "IPOs", url: `${SITE_URL}/#all-ipos` },
    { name: `${ipo.name} (${ipo.board})`, url: `${SITE_URL}/ipo/${ipo.slug}/${ipo.symbol}/` },
  ]);

  // Dynamic FAQs for this IPO
  const ipoFaqs = [
    {
      question: `What is ${ipo.name} IPO GMP today?`,
      answer: `As of today, ${ipo.name} IPO Grey Market Premium (GMP) is trading at ${formatINR(
        ipo.gmp
      )} per share. With an issue cap price of ${formatINR(
        ipo.issuePrice
      )}, the expected listing price is ${formatINR(estListing)} (${formatPercent(percent)} gain).`,
    },
    {
      question: `What is the lot size and minimum investment for ${ipo.name} IPO?`,
      answer: `The market lot size for ${ipo.name} is ${ipo.lotSize} shares. At the upper band price of ${formatINR(
        ipo.issuePrice
      )}, retail investors require a minimum application amount of ${formatINR(
        ipo.lotSize * ipo.issuePrice
      )}.`,
    },
    {
      question: `When will ${ipo.name} IPO allotment status be finalized?`,
      answer: `${ipo.name} IPO allotment is scheduled to be finalized on ${
        ipo.allotmentDate || "the specified date"
      }. Investors can check allotment status online via ${
        ipo.registrar || "the official registrar"
      } or BSE/NSE portals.`,
    },
    {
      question: `What is the live subscription status for ${ipo.name}?`,
      answer: `Currently, ${ipo.name} IPO has been subscribed ${formatSubscription(
        ipo.subscription.total
      )} overall, with retail portion subscribed at ${formatSubscription(
        ipo.subscription.retail
      )} and HNI/NII at ${formatSubscription(ipo.subscription.nii)}.`,
    },
  ];

  const faqSchema = getFaqSchema(ipoFaqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <IpoDetailsClientLayout
        ipo={ipo}
        raw={raw}
        faqItems={ipoFaqs}
        gmpData={gmpData}
        subData={subData}
        reviewData={reviewData}
      />

      {/* Mobile Sticky CTA Bar */}
      <MobileStickyBar registrarUrl={ipo.registrarUrl} ipoName={ipo.name} />
    </>
  );
}
