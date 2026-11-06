export interface FaqItem {
  id: string;
  category: "all" | "gmp" | "allotment" | "bidding" | "calculator" | "regulations";
  categoryLabel: string;
  question: string;
  answer: string;
  tags: string[];
}

export const ALL_FAQS: FaqItem[] = [
  // ── 1. GMP FAQs ──
  {
    id: "gmp-1",
    category: "gmp",
    categoryLabel: "Grey Market Premium",
    question: "What is IPO Grey Market Premium (GMP) and how is it determined?",
    answer:
      "Grey Market Premium (GMP) is the unofficial premium price at which IPO shares trade in the unlisted, over-the-counter gray circles before officially listing on BSE or NSE. It is determined purely by market demand, retail interest, institutional anchor response, and broker sentiment. For example, if an IPO's upper price band is ₹500 and the GMP is ₹100, the estimated listing price is ₹600 (a 20% gain).",
    tags: ["GMP", "Estimated Listing Price", "Unlisted Market"],
  },
  {
    id: "gmp-2",
    category: "gmp",
    categoryLabel: "Grey Market Premium",
    question: "Is IPO GMP legally approved or backed by SEBI, BSE, or NSE?",
    answer:
      "No. Grey Market Premium (GMP) is completely unofficial, unregulated, and has zero backing from SEBI, BSE, or NSE. It operates outside the official stock exchange trading mechanism. While it serves as an early barometer of retail enthusiasm, it is volatile and subject to speculative dealer quotes. Investors should always evaluate company fundamentals and RHP financials before investing.",
    tags: ["SEBI Disclaimer", "Legality", "Risk Factor"],
  },
  {
    id: "gmp-3",
    category: "gmp",
    categoryLabel: "Grey Market Premium",
    question: "What is Kostak Rate and how is it different from Subject to Sauda (SS)?",
    answer:
      "Kostak Rate is a fixed cash amount an investor receives by selling their entire IPO application to a grey market buyer before allotment, regardless of whether shares are allotted or not. 'Subject to Sauda' (SS), on the other hand, is a conditional deal where the premium is paid only if the applicant is successfully allotted shares. If no shares are allotted, the SS contract becomes void.",
    tags: ["Kostak", "Subject to Sauda", "Off-Market"],
  },
  {
    id: "gmp-4",
    category: "gmp",
    categoryLabel: "Grey Market Premium",
    question: "How accurate is GMP in predicting the actual listing price?",
    answer:
      "Statistically, GMP shows a strong positive correlation (around 70–80%) with listing day open prices during normal market conditions. However, sudden secondary market corrections, geopolitical shocks, or negative macroeconomic news between issue close and listing morning can significantly compress the listing gain.",
    tags: ["Listing Accuracy", "Market Correlation"],
  },

  // ── 2. Allotment & Refund FAQs ──
  {
    id: "allot-1",
    category: "allotment",
    categoryLabel: "Allotment & Refunds",
    question: "How does the computerized lottery system work for retail IPO allotment?",
    answer:
      "Under SEBI guidelines, all retail applicants are treated equally irrespective of how many lots they applied for. When the retail category is oversubscribed, the registrar conducts a computer-randomized draw where each valid application is assigned an equal mathematical probability. Successful applicants receive exactly one minimum lot. Applying for multiple lots in retail does not increase allocation probability in an oversubscribed issue.",
    tags: ["Lottery System", "Retail Quota", "Oversubscription"],
  },
  {
    id: "allot-2",
    category: "allotment",
    categoryLabel: "Allotment & Refunds",
    question: "What is the timeline for IPO allotment and Demat credit under SEBI T+3?",
    answer:
      "India strictly follows the SEBI T+3 listing framework: Day T is issue close; Day T+1 is Basis of Allotment finalization; Day T+2 is credit of allotted shares to your CDSL/NSDL Demat account and release of unallotted bank funds; and Day T+3 morning (10:00 AM IST) is official stock exchange listing on BSE and NSE.",
    tags: ["T+3 Timeline", "Demat Credit", "Listing Day"],
  },
  {
    id: "allot-3",
    category: "allotment",
    categoryLabel: "Allotment & Refunds",
    question: "What should I do if my funds remain blocked after the allotment date?",
    answer:
      "If you were not allotted shares, your bank is mandated to release the blocked funds (UPI mandate unblock) by Day T+2. If the funds remain blocked after 48 hours, you can raise a grievance with your bank citing the UPI Mandate URN, or email the registrar's investor grievances desk with your PAN and application reference.",
    tags: ["UPI Mandate", "Refund", "Bank Funds"],
  },
  {
    id: "allot-4",
    category: "allotment",
    categoryLabel: "Allotment & Refunds",
    question: "Can I submit multiple IPO applications using the same PAN to boost my chances?",
    answer:
      "No! Submitting multiple applications under the same PAN in the same category (even across different brokers like Zerodha, Groww, and AngelOne) leads to automatic rejection of all applications by the registrar. To legally increase family allocation odds, each adult family member must apply using their own unique PAN, bank account, and Demat account.",
    tags: ["Multiple Bids", "PAN Rejection", "Rules"],
  },

  // ── 3. Bidding & Categories FAQs ──
  {
    id: "bid-1",
    category: "bidding",
    categoryLabel: "Bidding & Quotas",
    question: "What is the difference between Mainboard IPO and SME IPO?",
    answer:
      "Mainboard IPOs are for established enterprises with minimum retail investment ticket around ₹14,000–₹15,000, post-listing single-share trading, and listing on the main BSE/NSE exchanges. SME IPOs (listed on BSE SME or NSE Emerge) are for growing small-and-medium businesses with minimum lot sizes over ₹1,00,000 and mandatory lot trading post-listing.",
    tags: ["Mainboard", "SME IPO", "Ticket Size"],
  },
  {
    id: "bid-2",
    category: "bidding",
    categoryLabel: "Bidding & Quotas",
    question: "What is 'Cut-Off Price' and why should retail investors always bid at Cut-Off?",
    answer:
      "The 'Cut-Off Price' is the final issue price decided by the company and book-running lead managers within the price band. When you check the 'Cut-Off' checkbox, you agree to buy shares at whatever final price is finalized. Bidding below the cut-off price results in automatic disqualification if the IPO prices at the upper band.",
    tags: ["Cut-Off Price", "Bidding Strategy", "Retail"],
  },
  {
    id: "bid-3",
    category: "bidding",
    categoryLabel: "Bidding & Quotas",
    question: "What are QIB, NII/HNI, and Retail quotas in a public issue?",
    answer:
      "Under SEBI rules, a standard book-built issue is divided into: Qualified Institutional Buyers (QIB) - typically 50% of the issue; Non-Institutional Investors (NII/HNI) - 15% of the issue; and Retail Individual Investors (RII) - 35% of the issue. For loss-making companies (under Rule 6(2)), QIB quota increases to 75% while retail is reduced to 10%.",
    tags: ["QIB", "NII", "Retail Quota"],
  },
  {
    id: "bid-4",
    category: "bidding",
    categoryLabel: "Bidding & Quotas",
    question: "What is the difference between Small HNI (sHNI) and Big HNI (bHNI)?",
    answer:
      "The NII category is split into two tiers: Small HNI (sHNI) for application amounts between ₹2,00,000 and ₹10,00,000 (one-third of NII quota); and Big HNI (bHNI) for application amounts exceeding ₹10,00,000 (two-thirds of NII quota). Both categories have separate allotment draws.",
    tags: ["sHNI", "bHNI", "NII Breakdown"],
  },

  // ── 4. Calculator & Returns FAQs ──
  {
    id: "calc-1",
    category: "calculator",
    categoryLabel: "Calculator & Returns",
    question: "How does SEBI determine the minimum lot size for retail investors?",
    answer:
      "SEBI mandates that the minimum application value for a retail investor must fall within the range of ₹14,000 to ₹15,000. The lot size is calculated by dividing ₹15,000 by the upper price band and rounding to convenient share lots. For example, at an upper band of ₹500, the lot size will be 30 shares (30 × ₹500 = ₹15,000).",
    tags: ["Lot Size Formula", "Retail Range", "SEBI Rule"],
  },
  {
    id: "calc-2",
    category: "calculator",
    categoryLabel: "Calculator & Returns",
    question: "How is expected listing profit calculated from lot size and GMP?",
    answer:
      "Expected Listing Profit = (Number of Lots × Shares per Lot) × Live GMP (₹). For example, if you are allotted 1 lot of 50 shares with a GMP of ₹80, your estimated listing gain is 50 × ₹80 = ₹4,000.",
    tags: ["Profit Formula", "Listing Return", "Lot Calculator"],
  },
  {
    id: "calc-3",
    category: "calculator",
    categoryLabel: "Calculator & Returns",
    question: "How are IPO listing gains taxed in India?",
    answer:
      "If you sell your allotted IPO shares on listing day or within 12 months, the profit is classified as Short-Term Capital Gains (STCG) and taxed at 20% (as per Budget 2024 revised rates) under Section 111A. If held for more than 12 months, gains above ₹1.25 lakh per financial year are taxed as Long-Term Capital Gains (LTCG) at 12.5% under Section 112A.",
    tags: ["STCG", "LTCG", "Taxation", "Budget 2024"],
  },

  // ── 5. Regulations & ASBA FAQs ──
  {
    id: "reg-1",
    category: "regulations",
    categoryLabel: "ASBA & Rules",
    question: "What is ASBA (Applications Supported by Blocked Amount)?",
    answer:
      "ASBA is a mandatory facility developed by SEBI where your application money remains safely in your own savings bank account and is only 'blocked' (lien marked). Money is debited from your account ONLY if shares are allotted. During the bidding period, your money continues to earn savings bank interest.",
    tags: ["ASBA", "Bank Interest", "Safe Bidding"],
  },
  {
    id: "reg-2",
    category: "regulations",
    categoryLabel: "ASBA & Rules",
    question: "Why do third-party bank UPI applications get rejected in IPOs?",
    answer:
      "SEBI mandates that the bank account used to authorize the UPI mandate MUST belong to the primary Demat account holder. If an investor applies in their own Demat account but authorizes the UPI mandate from a spouse's, parent's, or friend's bank account, the application is strictly flagged as third-party and rejected.",
    tags: ["Third-Party UPI", "Rejection Reason", "PAN Match"],
  },
];

export const CATEGORIES = [
  { id: "all", label: "All Questions", count: ALL_FAQS.length },
  { id: "gmp", label: "Grey Market Premium", count: 4 },
  { id: "allotment", label: "Allotment & Refunds", count: 4 },
  { id: "bidding", label: "Bidding & Quotas", count: 4 },
  { id: "calculator", label: "Calculator & Taxes", count: 3 },
  { id: "regulations", label: "ASBA & Regulations", count: 2 },
];
