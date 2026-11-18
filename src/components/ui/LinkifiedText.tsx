import React from "react";
import Link from "next/link";

interface KeywordLink {
  term: string;
  href: string;
  title?: string;
}

// Ordered list of key SEO phrases to match inside body text
// Longer phrases come first so they match before shorter substrings
const SEO_KEYWORD_MAP: KeywordLink[] = [
  { term: "Link Intime India", href: "/allotment/link-intime", title: "Link Intime IPO Allotment Portal" },
  { term: "Link Intime", href: "/allotment/link-intime", title: "Link Intime IPO Allotment Status" },
  { term: "KFin Technologies", href: "/allotment/kfintech", title: "KFintech Allotment Status Checker" },
  { term: "KFintech", href: "/allotment/kfintech", title: "KFin Technologies IPO Allotment Portal" },
  { term: "Bigshare Services", href: "/allotment/bigshare", title: "Bigshare IPO Allotment Portal" },
  { term: "Skyline Financial", href: "/allotment/skyline", title: "Skyline Financial IPO Allotment Portal" },
  { term: "BSE India IPO status", href: "/allotment/bse-india", title: "BSE India IPO Allocation Status" },
  { term: "BSE India", href: "/allotment/bse-india", title: "BSE India Allotment Portal" },
  { term: "IPO allotment status check online by PAN number", href: "/allotment", title: "IPO Allotment Status Check Online by PAN" },
  { term: "IPO allotment status", href: "/allotment", title: "Check IPO Allotment Status Online" },
  { term: "allotment status", href: "/allotment", title: "IPO Share Allotment Status" },
  { term: "basis of allotment", href: "/articles/understanding-basis-of-allotment-retail-vs-hni", title: "Understanding Basis of Allotment Rules" },
  { term: "Grey Market Premium", href: "/ipo-gmp", title: "Live IPO GMP Today" },
  { term: "live GMP", href: "/ipo-gmp", title: "Live Grey Market Premium" },
  { term: "Subject to Sauda", href: "/articles/kostak-rate-vs-subject-to-sauda-differences", title: "Kostak vs Subject to Sauda Difference" },
  { term: "Kostak rate", href: "/articles/kostak-rate-vs-subject-to-sauda-differences", title: "Kostak Rate in IPO Applications" },
  { term: "Kostak", href: "/articles/kostak-rate-vs-subject-to-sauda-differences", title: "Kostak Rate Guide" },
  { term: "IPO subscription status", href: "/subscription", title: "Live IPO Subscription Status" },
  { term: "NSE Emerge", href: "/articles/bse-sme-vs-nse-emerge-lot-size-rules", title: "NSE Emerge SME Platform Rules" },
  { term: "BSE SME", href: "/articles/bse-sme-vs-nse-emerge-lot-size-rules", title: "BSE SME Platform Rules" },
  { term: "SME IPO", href: "/articles/bse-sme-vs-nse-emerge-lot-size-rules", title: "SME IPO Guide & Lot Sizes" },
  { term: "lot size calculator", href: "/tools/lot-calculator", title: "IPO Lot Size & Profit Calculator" },
];

/**
 * Helper to linkify text paragraphs gracefully without over-linking.
 * Limits to at most 2 relevant internal links per paragraph to respect SEO guidelines.
 */
export function renderLinkifiedParagraph(text: string, currentSlug?: string) {
  let matchedIndices: { start: number; end: number; link: KeywordLink }[] = [];

  for (const item of SEO_KEYWORD_MAP) {
    if (matchedIndices.length >= 2) break; // Maximum 2 links per paragraph (Google Best Practice)

    // Skip linking to the exact same page the user is currently reading
    if (currentSlug && item.href.includes(currentSlug)) continue;

    const regex = new RegExp(`\\b${item.term}\\b`, "i");
    const match = regex.exec(text);

    if (match) {
      const start = match.index;
      const end = start + match[0].length;

      // Ensure no overlapping matches
      const overlaps = matchedIndices.some(
        (m) => (start >= m.start && start < m.end) || (end > m.start && end <= m.end)
      );

      if (!overlaps) {
        matchedIndices.push({ start, end, link: item });
      }
    }
  }

  if (matchedIndices.length === 0) {
    return text;
  }

  // Sort by start position
  matchedIndices.sort((a, b) => a.start - b.start);

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  matchedIndices.forEach((match, i) => {
    // Plain text before match
    if (match.start > lastIndex) {
      parts.push(text.slice(lastIndex, match.start));
    }

    // Linkified anchor text
    parts.push(
      <Link
        key={i}
        href={match.link.href}
        title={match.link.title}
        className="text-accent font-semibold hover:underline decoration-accent/40 underline-offset-2 transition-colors"
      >
        {text.slice(match.start, match.end)}
      </Link>
    );

    lastIndex = match.end;
  });

  // Remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}
