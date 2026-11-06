export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: "GMP & Trading" | "Allotment & Process" | "Strategy" | "SME Guide";
  readTime: string;
  date: string;
  content: {
    sectionTitle: string;
    paragraphs: string[];
    keyTakeaway?: string;
  }[];
}

export const staticArticles: Article[] = [
  {
    slug: "what-is-ipo-gmp-grey-market-premium",
    title: "What is IPO Grey Market Premium (GMP)? A Complete Beginner's Guide",
    excerpt: "Understand how IPO Grey Market Premium works in India, how dealers quote unofficial premiums, and what it signals about listing day gains.",
    category: "GMP & Trading",
    readTime: "6 min read",
    date: "October 2026",
    content: [
      {
        sectionTitle: "1. The Mechanics of Grey Market Trading",
        paragraphs: [
          "Grey Market Premium (GMP) is an over-the-counter (OTC) financial premium at which shares of an upcoming IPO are privately traded before they formally ring the opening bell on BSE or NSE.",
          "Unlike regulated exchanges, the grey market is an unofficial, trust-driven dealer network. It acts as an early barometer of supply and demand among retail participants, high-net-worth investors (HNIs), and institutional funds.",
        ],
        keyTakeaway: "Estimated Listing Price = Issue Upper Price Band + Live GMP in Rupees.",
      },
      {
        sectionTitle: "2. Is GMP 100% Reliable for Listing Day Profits?",
        paragraphs: [
          "While a positive GMP indicates robust pre-listing demand, it is fundamentally speculative. Fluctuations in broader equity benchmark indices (Nifty 50, Sensex), sudden geopolitical events, or negative institutional notes can crush premiums overnight.",
          "Seasoned investors treat GMP as one supplementary indicator alongside company fundamentals, debt-to-equity ratios, P/E valuations, and anchor investor commitments.",
        ],
      },
      {
        sectionTitle: "3. Best Practices Before Applying",
        paragraphs: [
          "Never base your investment decision entirely on GMP numbers posted on unofficial messaging channels. Always inspect the Draft Red Herring Prospectus (DRHP) submitted to SEBI to verify revenue sustainability and promoter backgrounds.",
        ],
      },
    ],
  },
  {
    slug: "kostak-rate-vs-subject-to-sauda-differences",
    title: "Kostak Rate vs Subject to Sauda: Key Differences & How They Work",
    excerpt: "Demystifying Kostak rates and Subject to Sauda agreements in IPO applications. Discover how risk-averse investors lock in guaranteed profits.",
    category: "GMP & Trading",
    readTime: "5 min read",
    date: "October 2026",
    content: [
      {
        sectionTitle: "1. What is Kostak Rate in IPO Applications?",
        paragraphs: [
          "Kostak rate refers to the predetermined cash reward an IPO applicant receives by selling their entire application to an off-market buyer before share allotment is announced.",
          "The biggest advantage of a Kostak transaction for the seller is zero allotment risk: you keep the agreed Kostak profit whether you are allotted 0 shares or a complete lot.",
        ],
        keyTakeaway: "Kostak gives guaranteed upfront cash regardless of lottery allotment results.",
      },
      {
        sectionTitle: "2. What is 'Subject to Sauda' (SS)?",
        paragraphs: [
          "Subject to Sauda (often abbreviated as SS) is a conditional agreement between an applicant and a buyer. Unlike Kostak, the buyer agrees to pay a substantially larger profit margin, but ONLY IF shares are actually allotted to the applicant.",
          "If the investor receives zero allotment in the lottery, the Subject to Sauda deal becomes null and void, and no money exchanges hands.",
        ],
      },
      {
        sectionTitle: "3. Comparison: Which One Should You Choose?",
        paragraphs: [
          "In high-subscription IPOs with severe oversubscription (e.g. 80x+ in Retail), Subject to Sauda rates command a premium, whereas Kostak offers safe peace-of-mind for multi-account retail families seeking fixed application returns.",
        ],
      },
    ],
  },
  {
    slug: "how-to-check-ipo-allotment-status-fast",
    title: "How to Check IPO Allotment Status Online: 4 Fastest Ways",
    excerpt: "Step-by-step tutorial on checking your IPO allotment status via Link Intime, KFintech, Bigshare Services, BSE, and NSE portals using PAN card.",
    category: "Allotment & Process",
    readTime: "4 min read",
    date: "November 2026",
    content: [
      {
        sectionTitle: "1. Checking on Designated Registrar Websites (Fastest)",
        paragraphs: [
          "Official registrars finalize and upload the basis of allotment database several hours before stock exchanges update their records.",
          "The three primary registrars in India are Link Intime India, KFin Technologies (KFintech), and Bigshare Services. Select the company name, enter your 10-digit PAN or Application Number, and solve the captcha to view allotted share counts.",
        ],
        keyTakeaway: "Registrar portals update allotment results earliest, typically late evening of T+1 day.",
      },
      {
        sectionTitle: "2. Checking on BSE & NSE Official Status Portals",
        paragraphs: [
          "You can also navigate to the BSE India IPO status page, select 'Equity', choose the issue name from the dropdown, enter your PAN number, and click Search.",
          "Stock exchanges offer dependable backup verification when high-traffic crashes registrar servers during mega IPO allotments.",
        ],
      },
      {
        sectionTitle: "3. Bank Mandate Debit/Credit SMS Alerts",
        paragraphs: [
          "If your bank account notifies you that your UPI lien amount was successfully debited, you have almost certainly won an allotment. If the amount is released or unblocked, your bid was unsuccessful.",
        ],
      },
    ],
  },
  {
    slug: "understanding-qib-nii-retail-subscription-data",
    title: "Understanding QIB, NII, and Retail Subscriptions: How to Read the Numbers",
    excerpt: "Learn why Qualified Institutional Buyers (QIB) wait until Day 3, how NII funding works, and what high retail bidding means for listing gains.",
    category: "Strategy",
    readTime: "7 min read",
    date: "November 2026",
    content: [
      {
        sectionTitle: "1. Who are QIB, NII, and Retail Investors?",
        paragraphs: [
          "SEBI reserves specific quotas in every public issue: Qualified Institutional Buyers (minimum 50% in mainboard), Non-Institutional Investors / HNIs (15%), and Retail Individual Investors (35%).",
          "Retail investors apply for amounts up to ₹2,00,000, while sHNI (Small HNI) bids range from ₹2 Lakh to ₹10 Lakh, and bHNI (Big HNI) applies above ₹10 Lakh.",
        ],
      },
      {
        sectionTitle: "2. Why QIB Subscriptions Spike on Day 3",
        paragraphs: [
          "Institutional investors such as mutual funds, foreign portfolio investors (FPIs), and insurance conglomerates strategically submit bids on the final afternoon (Day 3) between 2:00 PM and 4:30 PM.",
          "Waiting until the last day allows institutional desks to assess retail sentiment, avoid interest loss on committed funds, and observe foreign anchor commitments.",
        ],
        keyTakeaway: "A QIB subscription of 20x or higher strongly signals institutional confidence and listing support.",
      },
      {
        sectionTitle: "3. How HNI Bidding Influences Breakeven Points",
        paragraphs: [
          "Because many large HNIs borrow short-term capital via NBFC funding to bid hundreds of lots, they require a minimum GMP just to cover their 5-to-7 day financing interest costs.",
        ],
      },
    ],
  },
  {
    slug: "mainboard-vs-sme-ipo-complete-comparison",
    title: "Mainboard IPO vs SME IPO: Risks, Lot Sizes, and Liquidity Differences",
    excerpt: "A deep dive comparing BSE/NSE Mainboard issues with SME platforms (NSE Emerge & BSE SME). Discover the risks and rewards of small-cap listings.",
    category: "SME Guide",
    readTime: "6 min read",
    date: "November 2026",
    content: [
      {
        sectionTitle: "1. Capital Requirements: ₹15,000 vs ₹1,00,000+",
        paragraphs: [
          "Mainboard IPOs cater to mainstream retail investors with lot ticket sizes kept deliberately between ₹14,000 and ₹15,000. Anyone with a demat account and modest savings can participate.",
          "In contrast, SME IPOs listed on BSE SME or NSE Emerge mandate a minimum application threshold exceeding ₹1,00,000 to ₹1,40,000 to ensure only risk-tolerant participants enter high-volatility microcaps.",
        ],
        keyTakeaway: "SME shares trade strictly in pre-defined lots (e.g. 1,000 shares) even post-listing.",
      },
      {
        sectionTitle: "2. Post-Listing Trading & Liquidity Concerns",
        paragraphs: [
          "On the mainboard, you can buy or sell single shares after listing. SME shares can only be bought or sold in entire lots. If a stock enters lower circuit, exiting an illiquid SME position can take several sessions.",
        ],
      },
      {
        sectionTitle: "3. Underwriting & Merchant Banker Regulations",
        paragraphs: [
          "SME issues are 100% underwritten, with the lead merchant banker required to underwrite at least 15% on their own balance sheet, providing a safety net for nascent enterprises.",
        ],
      },
    ],
  },
  {
    slug: "how-to-increase-ipo-allotment-chances",
    title: "Smart Strategies: How to Increase Your IPO Allotment Chances",
    excerpt: "Proven and SEBI-compliant techniques to maximize your odds of securing lottery shares in heavily oversubscribed IPOs.",
    category: "Strategy",
    readTime: "5 min read",
    date: "November 2026",
    content: [
      {
        sectionTitle: "1. Apply 1 Lot from Multiple Family Demat Accounts",
        paragraphs: [
          "Under SEBI rules, retail allotment in oversubscribed issues is conducted via a computer-generated computerized lottery system.",
          "Applying for 10 lots from a single PAN provides zero extra probability compared to applying for 1 lot from that same PAN. To genuinely maximize your statistical odds, apply for 1 lot each from different demat accounts belonging to family members.",
        ],
        keyTakeaway: "Always apply 1 lot across multiple unique PAN cards rather than multiple lots on 1 PAN.",
      },
      {
        sectionTitle: "2. Always Bid at the Cut-Off Price",
        paragraphs: [
          "When submitting your bid via ASBA or UPI, always check the 'Cut-off Price' box. If you bid below the upper cap price and the issue prices at the ceiling, your application will be automatically rejected before the lottery draw.",
        ],
      },
      {
        sectionTitle: "3. Avoid Last-Minute UPI Mandate Approvals",
        paragraphs: [
          "Do not delay submitting applications until 4:30 PM on Day 3. Bank payment gateways and NPCI UPI servers face severe congestion. Authorize mandates before 2:00 PM to prevent unreceived mandate failures.",
        ],
      },
    ],
  },
  {
    slug: "sebi-t-plus-3-listing-timeline-explained",
    title: "SEBI's T+3 IPO Timeline Explained: Faster Allotments & Listing Dates",
    excerpt: "Understand how India transitioned to the swift T+3 settlement cycle, drastically reducing the duration your application capital remains blocked.",
    category: "Allotment & Process",
    readTime: "4 min read",
    date: "November 2026",
    content: [
      {
        sectionTitle: "1. What is the T+3 Listing Regime?",
        paragraphs: [
          "The Securities and Exchange Board of India (SEBI) made the T+3 timeline mandatory for all public issues. Here, 'T' stands for the IPO issue closing day, and all listing procedures must wrap up within three working days.",
          "This rapid cycle replaced the legacy T+6 framework, drastically reducing capital lock-in times and lowering exposure to global market swings.",
        ],
        keyTakeaway: "From issue close to exchange listing now takes just 3 working days.",
      },
      {
        sectionTitle: "2. Breakdown of the T+3 Calendar",
        paragraphs: [
          "• T Day: Issue closes for bidding at 5:00 PM IST.",
          "• T+1 Day: Verification of bids and finalization of basis of allotment.",
          "• T+2 Day: Unblocking of funds for unsuccessful bidders and credit of equity shares into CDSL/NSDL demat accounts.",
          "• T+3 Day: Opening bell rings and shares commence official trading on stock exchanges.",
        ],
      },
      {
        sectionTitle: "3. Impact on Retail and HNI Investors",
        paragraphs: [
          "Faster timelines allow retail investors to quickly recycle unblocked capital into subsequent open public issues, increasing overall primary market liquidity.",
        ],
      },
    ],
  },
  {
    slug: "anchor-investors-and-lock-in-periods",
    title: "Anchor Investors in IPOs: What Their Lock-in Expiry Means for Stock Prices",
    excerpt: "Why institutional anchor books matter, how 30-day and 90-day lock-in expiries impact secondary share prices, and what retail investors should track.",
    category: "Strategy",
    readTime: "6 min read",
    date: "November 2026",
    content: [
      {
        sectionTitle: "1. Who are Anchor Investors in Indian IPOs?",
        paragraphs: [
          "Anchor investors are Qualified Institutional Buyers (QIBs) who subscribe to substantial allocations of shares at a fixed price one day prior to the public bidding window opening.",
          "Anchor participation is vetted by merchant bankers and gives strong credibility to the company's valuation before retail applicants commit their money.",
        ],
      },
      {
        sectionTitle: "2. The 30-Day and 90-Day Lock-in Regulations",
        paragraphs: [
          "SEBI requires anchor investors to observe mandatory lock-in periods: 50% of allocated anchor shares are locked in for 30 days post-listing, while the remaining 50% are locked in for 90 days.",
          "When these lock-in windows expire, high selling volumes can enter the market if anchors seek to book quick gains, occasionally generating downward pressure on the stock.",
        ],
        keyTakeaway: "Track anchor lock-in dates to anticipate potential short-term post-listing supply surges.",
      },
      {
        sectionTitle: "3. What to Observe in Anchor Bid Disclosures",
        paragraphs: [
          "Examine the pedigree of anchor funds in the RHP anchor sheet: presence of marquee sovereign wealth funds, marquee mutual funds (e.g., SBI MF, HDFC MF), and renowned global asset managers signals genuine fundamental conviction.",
        ],
      },
    ],
  },
];
