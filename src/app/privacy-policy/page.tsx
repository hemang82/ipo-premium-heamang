import { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy | ipo-premium",
  description: "Privacy policy and cookies statement for ipo-premium.com.",
  alternates: {
    canonical: `${SITE_URL}/privacy-policy/`,
  },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-heading font-extrabold text-3xl text-tx tracking-tightest mb-6">
        Privacy Policy
      </h1>
      <div className="space-y-4 text-xs sm:text-sm text-tx/80 leading-relaxed">
        <p>
          At ipo-premium.com, we respect your privacy. We do not collect personally identifiable information (PII) unless you explicitly subscribe to alerts or submit an inquiry.
        </p>
        <p>
          We use local storage only to remember your chosen theme preference (dark or light mode) to avoid flash on page loads.
        </p>
        <p>
          Standard non-identifying telemetry cookies may be used to analyze general traffic patterns and server load to provide optimal performance.
        </p>
      </div>
    </div>
  );
}
