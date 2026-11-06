import { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "What is IPO Grey Market Premium (GMP)? Complete Guide",
  description:
    "Learn what IPO GMP, Kostak Rate, and Subject to Sauda mean in Indian stock market trading. How GMP is determined and how to read it before applying for an IPO.",
  alternates: {
    canonical: `${SITE_URL}/guides/what-is-ipo-gmp/`,
  },
};

export default function WhatIsGmpPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <article className="prose prose-invert max-w-none space-y-6">
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-tx tracking-tightest">
          What is IPO Grey Market Premium (GMP)?
        </h1>
        <p className="text-sm text-accent font-semibold">
          Last updated: Today • 5 min read • Educational Guide
        </p>

        <p className="text-sm text-tx/90 leading-relaxed">
          The <strong>Grey Market Premium (GMP)</strong> is an unofficial, off-market price indicator that reflects how much buyers are willing to pay over and above the company&apos;s official IPO issue price before the shares are formally listed on stock exchanges (BSE or NSE).
        </p>

        <Card variant="subtle" className="p-5 border-line text-xs space-y-2">
          <p className="font-semibold text-tx">Key Calculation Formula:</p>
          <code className="block bg-card p-2.5 rounded font-mono text-accent">
            Estimated Listing Price = Issue Price (Cap) + Live GMP (₹)
          </code>
        </Card>

        <h2 className="font-heading font-bold text-xl text-tx pt-4">
          Understanding Kostak and Subject to Sauda
        </h2>
        <p className="text-sm text-tx/90 leading-relaxed">
          In the Indian informal gray market, two other primary terms are closely watched:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-xs text-mut leading-relaxed">
          <li>
            <strong>Kostak Rate:</strong> The fixed premium paid by a buyer to purchase an IPO retail application outright. The seller secures this profit irrespective of whether shares are allotted.
          </li>
          <li>
            <strong>Subject to Sauda:</strong> An agreement where payment is made to the seller only if the IPO application successfully results in share allotment.
          </li>
        </ul>

        <h2 className="font-heading font-bold text-xl text-tx pt-4">
          Should You Apply Solely Based on GMP?
        </h2>
        <p className="text-sm text-tx/90 leading-relaxed">
          No. While GMP provides valuable insight into speculative market appetite, it is completely unregulated by SEBI. Investors should always analyze company fundamentals, debt levels, management track record, and valuation multiples before investing capital.
        </p>
      </article>
    </div>
  );
}
