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
    question: "What is an IPO Price Band and Cut-off Price?",
    answer:
      "The Price Band is the bidding range set by the issuing company and lead managers (e.g., ₹150 to ₹158). The lower price is the Floor Price, and the highest limit is the Cut-off Price (Cap Price). Retail individual investors typically bid at the Cut-off Price to ensure maximum allotment eligibility.",
  },
  {
    question: "How is the estimated listing price projected?",
    answer:
      "The projected listing price is calculated by adding the indicative pre-listing premium to the upper issue price cap: Estimated Price = Cap Price + Indicative Premium. For example, if an IPO's cap price is ₹500 and the indicative premium is ₹100, the estimated listing level is ₹600 (gain of 20%).",
  },
  {
    question: "Do pre-listing price indications guarantee listing profits?",
    answer:
      "No. Indicative forward rates are informal estimates with no regulatory standing or approval from SEBI, BSE, or NSE. Final listing prices are determined solely by market demand-supply, institutional anchor bidding, and macroeconomic sentiment on the listing date morning.",
  },
  {
    question: "What should investors review in an IPO Prospectus (RHP)?",
    answer:
      "Investors should review the company's Red Herring Prospectus (RHP) filed with SEBI to understand financial performance (Revenue, EBITDA, PAT margins), debt obligations, peer valuation multiples (P/E, P/B), management track record, and specific business risk factors.",
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
