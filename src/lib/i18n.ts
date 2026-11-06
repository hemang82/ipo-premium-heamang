export type Locale = "en" | "hi";

export interface Translations {
  heroTagline: string;
  heroSub: string;
  openNow: string;
  highestGmp: string;
  avgSubscription: string;
  iposTracked: string;
  filterAll: string;
  filterOpen: string;
  filterUpcoming: string;
  filterClosed: string;
  filterListed: string;
  filterSme: string;
  disclaimer: string;
}

export const i18nConfig = {
  defaultLocale: "en" as Locale,
  locales: ["en", "hi"] as Locale[],
};

export const dictionary: Record<Locale, Translations> = {
  en: {
    heroTagline: "Know the premium before you apply",
    heroSub: "Live Grey Market Premium (GMP), real-time subscription figures, and allotment dates for Indian Mainboard & SME IPOs.",
    openNow: "Open now",
    highestGmp: "Highest GMP",
    avgSubscription: "Avg. subscription",
    iposTracked: "IPOs tracked",
    filterAll: "All",
    filterOpen: "Open",
    filterUpcoming: "Upcoming",
    filterClosed: "Closed",
    filterListed: "Listed",
    filterSme: "SME",
    disclaimer: "GMP is unofficial and is not investment advice. Read the Red Herring Prospectus (RHP) before you apply.",
  },
  hi: {
    heroTagline: "आवेदन करने से पहले प्रीमियम जानें",
    heroSub: "भारतीय मेनबोर्ड और एसएमई आईपीओ के लिए लाइव ग्रे मार्केट प्रीमियम (GMP), सब्सक्रिप्शन और आवंटन तिथियां।",
    openNow: "खुले हैं",
    highestGmp: "उच्चतम GMP",
    avgSubscription: "औसत सब्सक्रिप्शन",
    iposTracked: "ट्रैक किए गए IPO",
    filterAll: "सभी",
    filterOpen: "ओपन",
    filterUpcoming: "आगामी",
    filterClosed: "बंद",
    filterListed: "लिस्टेड",
    filterSme: "SME",
    disclaimer: "GMP अनौपचारिक है और निवेश सलाह नहीं है। आवेदन करने से पहले RHP ध्यानपूर्वक पढ़ें।",
  },
};
