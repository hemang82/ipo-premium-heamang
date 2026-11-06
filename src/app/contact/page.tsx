import { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { SITE_URL } from "@/lib/seo";
import { Mail, MapPin, Clock, MessageSquare, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us & Editorial Inquiries",
  description:
    "Get in touch with the ipo-premium.com editorial and research desk for data corrections, press releases, partnerships, or investor inquiries.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: "Contact Us & Editorial Inquiries",
    description: "Contact the research and editorial desk at ipo-premium.com for IPO updates and data inquiries.",
    url: `${SITE_URL}/contact`,
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-tx tracking-tightest mb-3">
          Contact Our Editorial Desk
        </h1>
        <p className="text-sm sm:text-base text-mut leading-relaxed">
          Have an inquiry, corrections regarding an ongoing IPO, or feedback on our live Grey Market Premium data? We welcome your input.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card variant="default" className="p-6 border-line flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-base text-tx mb-1">Editorial Desk</h3>
            <p className="text-xs text-mut leading-relaxed mb-3">
              For news tips, DRHP review corrections, and corporate updates.
            </p>
          </div>
          <span className="text-xs font-mono font-semibold text-accent break-all">
            editorial@ipo-premium.com {/* TODO: Replace with your actual editorial email */}
          </span>
        </Card>

        <Card variant="default" className="p-6 border-line flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-base text-tx mb-1">General Support</h3>
            <p className="text-xs text-mut leading-relaxed mb-3">
              For website bugs, lot calculator questions, or partnership inquiries.
            </p>
          </div>
          <span className="text-xs font-mono font-semibold text-accent break-all">
            support@ipo-premium.com {/* TODO: Replace with your actual support email */}
          </span>
        </Card>

        <Card variant="default" className="p-6 border-line flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-base text-tx mb-1">Operating Hours</h3>
            <p className="text-xs text-mut leading-relaxed mb-3">
              Monday – Friday (Indian Stock Market Hours)
            </p>
          </div>
          <span className="text-xs font-mono text-tx font-medium">
            9:00 AM – 6:00 PM IST
          </span>
        </Card>
      </div>

      <Card variant="default" className="p-6 sm:p-8 border-line space-y-4">
        <h2 className="font-heading font-bold text-xl text-tx">Office & Operational Details</h2>
        <div className="space-y-3 text-xs sm:text-sm text-tx/80 leading-relaxed">
          <p className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <span>
              <strong>Registered Office:</strong> ipo-premium Digital Media Desk, Mumbai / Ahmedabad, India.{" "}
              <span className="text-mut text-xs block mt-0.5">
                {/* TODO: Provide complete registered legal entity address here */}
                [Registered Entity Address: 104, Financial District, Mumbai, Maharashtra 400051, India]
              </span>
            </span>
          </p>
          <p className="text-mut text-xs pt-2 border-t border-line">
            ⚠️ <strong>Notice:</strong> ipo-premium.com is an independent financial analytics publisher and does NOT provide stock tips, buy/sell recommendations, or Portfolio Management Services (PMS). We never solicit money for IPO applications.
          </p>
        </div>
      </Card>
    </div>
  );
}
