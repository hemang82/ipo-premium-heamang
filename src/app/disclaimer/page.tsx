import { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "SEBI & Financial Risk Disclaimer | ipo-premium",
  description: "Official statutory risk disclaimer and financial terms of use for ipo-premium.com.",
  alternates: {
    canonical: `${SITE_URL}/disclaimer/`,
  },
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-tx tracking-tightest mb-6">
        Statutory & Financial Disclaimer
      </h1>

      <div className="space-y-4 text-xs sm:text-sm text-tx/90 leading-relaxed">
        <Card variant="default" className="p-5 border-dn/30 bg-dn/5">
          <p className="font-bold text-dn mb-2">
            ⚠️ Grey Market Premium (GMP) Notice:
          </p>
          <p className="text-xs text-mut">
            The Grey Market Premium (GMP) published on ipo-premium.com represents unofficial, informal market transactions. It is not recognized or regulated by the Securities and Exchange Board of India (SEBI), Reserve Bank of India (RBI), Bombay Stock Exchange (BSE), or National Stock Exchange (NSE).
          </p>
        </Card>

        <p>
          1. <strong>No Investment Advice:</strong> All information provided on this website is strictly for informational, educational, and research purposes. Nothing on this website constitutes financial, investment, legal, or tax advice.
        </p>

        <p>
          2. <strong>RHP Compliance:</strong> Investors are strongly urged to consult a certified SEBI-registered financial advisor and review the formal Red Herring Prospectus (RHP) before bidding for any shares.
        </p>

        <p>
          3. <strong>Market Volatility:</strong> Past performance or estimated premiums are not indicative of actual future listing gains. Stock market investments are subject to market risks.
        </p>
      </div>
    </div>
  );
}
