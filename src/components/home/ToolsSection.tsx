import Link from "next/link";
import { Calculator, ExternalLink, ShieldCheck, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function ToolsSection() {
  return (
    <section className="my-12 max-w-7xl mx-auto px-4">
      <div className="mb-6">
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-tx tracking-tightest">
          Essential IPO Tools & Services
        </h2>
        <p className="text-xs sm:text-sm text-mut mt-1">
          Smart calculators and registrar allotment verification links for smart primary market investors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Lot Calculator */}
        <Card variant="default" className="p-6 flex flex-col justify-between group hover:border-accent/50">
          <div>
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4">
              <Calculator className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-lg text-tx group-hover:text-accent transition-colors">
              IPO Lot Size & Profit Calculator
            </h3>
            <p className="text-xs sm:text-sm text-mut mt-2 leading-relaxed">
              Calculate your required investment outlay, minimum lot requirement, and estimated listing profits based on live GMP across multiple lots and applicant categories.
            </p>
          </div>
          <div className="mt-6">
            <Link href="/tools/lot-calculator">
              <Button variant="secondary" size="sm" className="gap-2">
                Launch Calculator
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </Card>

        {/* Card 2: Allotment Status */}
        <Card variant="default" className="p-6 flex flex-col justify-between group hover:border-accent/50">
          <div>
            <div className="w-10 h-10 rounded-xl bg-up/10 border border-up/20 flex items-center justify-center text-up mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-lg text-tx group-hover:text-accent transition-colors">
              Check Allotment Status Online
            </h3>
            <p className="text-xs sm:text-sm text-mut mt-2 leading-relaxed">
              Instantly check your IPO share allotment status directly via Link Intime, KFin Technologies, Bigshare Services, and BSE / NSE official exchange databases using PAN or Application Number.
            </p>
          </div>
          <div className="mt-6">
            <a
              href="https://allotmentstatus.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary" size="sm" className="gap-2">
                Check Allotment Status
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </Card>
      </div>
    </section>
  );
}
