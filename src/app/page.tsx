import { getAllIpos, getStats } from "@/lib/ipo-service";
import { getNewsList } from "@/lib/newsApi";
import { HeroSection } from "@/components/home/HeroSection";
import { IpoList } from "@/components/home/IpoList";
import { HomeAllotmentSection } from "@/components/home/HomeAllotmentSection";
import { ToolsSection } from "@/components/home/ToolsSection";
import { SeoContentSection } from "@/components/home/SeoContentSection";
import { ArticlesSection } from "@/components/home/ArticlesSection";
import { HomeNewsSection } from "@/components/home/HomeNewsSection";
import { TrendingKeywordsDirectory } from "@/components/home/TrendingKeywordsDirectory";
import { Faq } from "@/components/ui/Faq";
import { getFaqSchema } from "@/lib/seo";

export const revalidate = 15; // 15-second ISR cache

interface HomePageProps {
  searchParams: Promise<{
    type?: string;
    status?: string;
    sort?: string;
    q?: string;
  }>;
}

const homeFaqs = [
  {
    question: "What is IPO Grey Market Premium (GMP)?",
    answer:
      "Grey Market Premium (GMP) is the unofficial price premium at which an unlisted IPO share trades in the off-market gray circles before it officially lists on stock exchanges (BSE/NSE). It provides an early signal of listing demand and expected listing day gain.",
  },
  {
    question: "How is the estimated listing price calculated from GMP?",
    answer:
      "The expected listing price is calculated by adding the live Grey Market Premium (GMP) to the IPO issue price cap. For example, if an IPO's upper price band is ₹500 and the GMP is ₹100, the estimated listing price is ₹600 (listing gain of 20%).",
  },
  {
    question: "Is IPO GMP a 100% guarantee of listing profit?",
    answer:
      "No. GMP is completely unofficial, volatile, and driven by market demand-supply and dealer bids. It carries no official backing from SEBI, BSE, or NSE. The actual listing price depends on secondary market sentiment, institutional anchor participation, and macroeconomic conditions on listing morning.",
  },
  {
    question: "What is Kostak Rate and Subject to Sauda (SS)?",
    answer:
      "Kostak Rate is the fixed cash amount an investor earns by selling their entire IPO application to an off-market buyer regardless of allotment outcome. 'Subject to Sauda' is an agreement where profit is paid only if shares are actually allotted to the applicant.",
  },
  {
    question: "What is the difference between Mainboard IPO and SME IPO?",
    answer:
      "Mainboard IPOs are for established, larger enterprises with minimum retail investment around ₹14,000–₹15,000 and post-listing trading in single shares. SME IPOs (listed on BSE SME or NSE Emerge) are for small-and-medium enterprises with minimum lot investments over ₹1,00,000 and trading restricted to fixed lot sizes.",
  },
  {
    question: "Where can I check IPO allotment status online?",
    answer:
      "You can verify your IPO allotment status on official registrar websites such as Link Intime, KFin Technologies (KFintech), Bigshare Services, Skyline, or directly via the BSE India and NSE India IPO allocation verification portals using your PAN card number or Application number.",
  },
];

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedParams = await searchParams;
  const currentType = resolvedParams.type || "All";
  const currentStatus = resolvedParams.status || "Open";
  const currentSort = resolvedParams.sort || "default";
  const query = resolvedParams.q || "";

  const [allIpos, stats, newsData] = await Promise.all([
    getAllIpos(),
    getStats(),
    getNewsList(1, 3).catch(() => ({ data: [] })),
  ]);
  const faqSchema = getFaqSchema(homeFaqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div>
        <HeroSection />
        <IpoList
          allIpos={allIpos}
          currentType={currentType}
          currentStatus={currentStatus}
          currentSort={currentSort}
          query={query}
          stats={stats}
        />
        <HomeAllotmentSection ipos={allIpos} />
        <ToolsSection />
        <ArticlesSection />
        <HomeNewsSection news={newsData?.data || []} />
        <SeoContentSection />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <Faq items={homeFaqs} />
        </div>
        <TrendingKeywordsDirectory ipos={allIpos} />
      </div>
    </>
  );
}
