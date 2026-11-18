export interface RegistrarData {
  slug: string;
  name: string;
  fullName: string;
  badge: string;
  tagline: string;
  description: string;
  sebiRegNo: string;
  officialPortalUrl: string;
  servers: { name: string; url: string; note: string }[];
  searchMethods: string[];
  helplineEmail: string;
  helplinePhone: string;
  address: string;
  faqs: { question: string; answer: string }[];
}

export const REGISTRARS_DATA: Record<string, RegistrarData> = {
  "link-intime": {
    slug: "link-intime",
    name: "Link Intime",
    fullName: "Link Intime India Pvt. Ltd. (MUFG Intime)",
    badge: "Largest Mainboard RTA",
    tagline: "Official IPO Allotment Status Checker for Link Intime Issues",
    description:
      "Link Intime India (now part of MUFG Pension & Market Services) is India's premier Category-1 Share Transfer Agent handling flagship Mainboard IPOs including Tata Technologies, IREDA, Bajaj Housing Finance, and major public offerings.",
    sebiRegNo: "INR000004058",
    officialPortalUrl: "https://in.mpms.mufg.com/Initial_Offer/public-issues.html",
    servers: [
      {
        name: "MUFG / Link Intime Public Issues Portal (Primary)",
        url: "https://in.mpms.mufg.com/Initial_Offer/public-issues.html",
        note: "Fastest server with auto-fill company dropdown",
      },
      {
        name: "Link Intime Direct Web Portal",
        url: "https://linkintime.co.in/initial_offer/public-issues.html",
        note: "Alternate mirror server for high-traffic listing nights",
      },
    ],
    searchMethods: ["PAN Number", "Application Number", "DP/Client ID", "Account No / IFSC"],
    helplineEmail: "ipo.helpdesk@linkintime.co.in",
    helplinePhone: "+91 22 4918 6200",
    address: "C-101, 247 Park, LBS Marg, Vikhroli (West), Mumbai - 400083",
    faqs: [
      {
        question: "How to check Link Intime IPO allotment status online by PAN?",
        answer:
          "Visit the official Link Intime allotment portal, select the IPO name from the dropdown menu, choose 'PAN' as your search type, enter your 10-digit Permanent Account Number, and click 'Submit'. Your applied quantity and allotted shares will appear instantly.",
      },
      {
        question: "Why does Link Intime show 'No Record Found' or 'Server Busy'?",
        answer:
          "During high-demand IPO allotment nights, millions of investors query the database simultaneously. If you see 'Server Busy' or 'No Record Found' early on, wait 15–30 minutes until the registrar finishes data reconciliation and final basis of allotment upload.",
      },
      {
        question: "When does Link Intime upload allotment data?",
        answer:
          "Under SEBI's T+3 framework, allotment is finalized on Day T+1. Link Intime usually releases allotment status between 8:00 PM and 11:30 PM on the designated allotment date.",
      },
    ],
  },
  "kfintech": {
    slug: "kfintech",
    name: "KFintech",
    fullName: "KFin Technologies Limited",
    badge: "High-Traffic RTA",
    tagline: "Official KFintech IPO Allotment Status Checker (Servers 1 to 5)",
    description:
      "KFin Technologies is a leading SEBI-registered Category-1 Registrar and Transfer Agent powering high-volume Mainboard and SME public issues such as LIC of India, Swiggy, and premier industrial issues.",
    sebiRegNo: "INR000000221",
    officialPortalUrl: "https://kosmic.kfintech.com/ipostatus/",
    servers: [
      {
        name: "KFintech Server 1",
        url: "https://kosmic.kfintech.com/ipostatus/",
        note: "Primary Cloud Portal",
      },
      {
        name: "KFintech Server 2",
        url: "https://kcas.kfintech.com/ipostatus/",
        note: "High-Availability Mirror",
      },
      {
        name: "KFintech Server 3",
        url: "https://evoting.kfintech.com/ipostatus/",
        note: "Fast load server during peak traffic",
      },
      {
        name: "KFintech Server 4",
        url: "https://kcas1.kfintech.com/ipostatus/",
        note: "Failover query mirror",
      },
      {
        name: "KFintech Server 5",
        url: "https://ris.kfintech.com/ipostatus/",
        note: "Alternative corporate query portal",
      },
    ],
    searchMethods: ["PAN Number", "Application Number", "Demat DP ID (CDSL / NSDL)"],
    helplineEmail: "einward.ris@kfintech.com",
    helplinePhone: "1800 309 4001 / +91 40 6716 2222",
    address: "Selenium Tower B, Plot 31-32, Financial District, Nanakramguda, Hyderabad - 500032",
    faqs: [
      {
        question: "Which KFintech server is fastest to check allotment?",
        answer:
          "KFintech provides 5 dedicated server mirrors (Server 1 to Server 5). If Server 1 is overloaded with traffic, switch to Server 2 or Server 3 for faster response times without captcha errors.",
      },
      {
        question: "How to check KFintech IPO allotment status online by PAN?",
        answer:
          "Open any of the 5 KFintech server mirrors, select the IPO name from the list, select 'PAN' option, input your 10-digit PAN number along with the visual captcha, and click 'Submit' to view your allotment details.",
      },
      {
        question: "What if funds are debited from bank but KFintech shows non-allotment?",
        answer:
          "Bank debit messages are the ultimate confirmation of allotment. Sometimes the registrar takes 2–4 hours to refresh the web database after bank mandates are executed. If your bank sent an allotment debit SMS, shares will be credited to your Demat account.",
      },
    ],
  },
  "bigshare": {
    slug: "bigshare",
    name: "Bigshare Services",
    fullName: "Bigshare Services Pvt. Ltd.",
    badge: "SME & Mainboard Specialist",
    tagline: "Official Bigshare IPO Allotment Status Portal (BSE SME & NSE Emerge)",
    description:
      "Bigshare Services is India's most prominent registrar for BSE SME and NSE Emerge public issues, alongside select Mainboard offerings. Renowned for prompt allotment publishing and straightforward PAN status queries.",
    sebiRegNo: "INR000001385",
    officialPortalUrl: "https://ipo.bigshareonline.com/IPO_Status.html",
    servers: [
      {
        name: "Bigshare Primary Portal (Server 1)",
        url: "https://ipo.bigshareonline.com/IPO_Status.html",
        note: "Dedicated IPO query system",
      },
      {
        name: "Bigshare Mirror (Server 2)",
        url: "https://www.bigshareonline.com/Investor_Service.aspx",
        note: "Corporate investor services portal",
      },
    ],
    searchMethods: ["Application No / CAF No", "Beneficiary ID (Demat DP ID)", "PAN Number"],
    helplineEmail: "investor@bigshareonline.com",
    helplinePhone: "+91 22 6263 8200",
    address: "Office No S6-2, 6th Floor, Pinnacle Business Park, Mahakali Caves Road, Andheri (East), Mumbai - 400093",
    faqs: [
      {
        question: "How to check Bigshare SME IPO allotment status by PAN?",
        answer:
          "Navigate to Bigshare's IPO Status page, select the company from the dropdown, choose 'PAN' in the radio button, enter your PAN number, and click 'Search'.",
      },
      {
        question: "Why is the company name not showing in Bigshare dropdown?",
        answer:
          "If an IPO is not appearing in Bigshare's issue dropdown, the registrar is still in the process of finalizing the basis of allotment with the stock exchange. It usually appears between 7:00 PM and 11:00 PM on allotment day.",
      },
    ],
  },
  "bse-india": {
    slug: "bse-india",
    name: "BSE India",
    fullName: "Bombay Stock Exchange (BSE India)",
    badge: "Exchange Verification",
    tagline: "Official BSE Stock Exchange IPO Application & Allotment Checker",
    description:
      "The Bombay Stock Exchange (BSE) provides a centralized, crash-proof portal to verify IPO allotment across ALL public issues listed on BSE Mainboard and BSE SME platforms, irrespective of the designated registrar.",
    sebiRegNo: "Stock Exchange",
    officialPortalUrl: "https://www.bseindia.com/investors/appli_check.aspx",
    servers: [
      {
        name: "BSE Application Status Verification",
        url: "https://www.bseindia.com/investors/appli_check.aspx",
        note: "100% crash-proof stock exchange portal",
      },
    ],
    searchMethods: ["Issue Name + Application Number + PAN"],
    helplineEmail: "is@bseindia.com",
    helplinePhone: "+91 22 2272 1233",
    address: "BSE Limited, Phiroze Jeejeebhoy Towers, Dalal Street, Mumbai - 400001",
    faqs: [
      {
        question: "How to check IPO allotment status on BSE India official portal?",
        answer:
          "Go to bseindia.com/investors/appli_check.aspx. 1) Select Issue Type as 'Equity'. 2) Select Issue Name from dropdown. 3) Enter Application Number OR PAN Number. 4) Complete the ReCaptcha and click 'Search'.",
      },
      {
        question: "Why is BSE India portal recommended during high traffic?",
        answer:
          "Individual registrar sites often experience server slowdowns during mega IPO listings. BSE's exchange infrastructure handles immense traffic without lag, making it the most reliable verification fallback.",
      },
    ],
  },
  "skyline": {
    slug: "skyline",
    name: "Skyline Financial",
    fullName: "Skyline Financial Services Pvt. Ltd.",
    badge: "Verified SME RTA",
    tagline: "Official Skyline IPO Allotment Status Portal",
    description:
      "Skyline Financial Services is a SEBI-registered Category-1 Registrar and Transfer Agent serving emerging SME IPOs and regional capital market public issues on NSE Emerge and BSE SME.",
    sebiRegNo: "INR000003241",
    officialPortalUrl: "https://www.skylinerta.com/ipo.php",
    servers: [
      {
        name: "Skyline Official IPO Portal",
        url: "https://www.skylinerta.com/ipo.php",
        note: "Official query server",
      },
    ],
    searchMethods: ["PAN Number", "DP ID / Client ID", "Application Number"],
    helplineEmail: "compliances@skylinerta.com",
    helplinePhone: "+91 11 4045 0193-97",
    address: "D-153A, 1st Floor, Okhla Industrial Area, Phase-I, New Delhi - 110020",
    faqs: [
      {
        question: "How to check Skyline Financial IPO allotment status?",
        answer:
          "Visit skylinerta.com/ipo.php, select the company from the dropdown, choose your search criteria (PAN / Application / Demat ID), enter the details, and submit.",
      },
    ],
  },
};
