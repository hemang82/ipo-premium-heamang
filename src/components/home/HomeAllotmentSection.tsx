import Link from "next/link";
import { Ipo } from "@/lib/types";
import { formatIpoDate } from "@/lib/format";
import { IpoBadgeHeader } from "@/components/ui/IpoBadgeHeader";
import {
  ShieldCheck,
  ExternalLink,
  ArrowRight,
  Clock,
  Building2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface HomeAllotmentSectionProps {
  ipos: Ipo[];
}

function getRegistrarRoute(registrarName?: string): { name: string; href: string; isInternal: boolean } {
  const r = (registrarName || "").toLowerCase();
  if (r.includes("link intime") || r.includes("linkintime")) {
    return { name: "Link Intime", href: "/allotment/link-intime", isInternal: true };
  }
  if (r.includes("kfin") || r.includes("karvy")) {
    return { name: "KFintech", href: "/allotment/kfintech", isInternal: true };
  }
  if (r.includes("bigshare")) {
    return { name: "Bigshare", href: "/allotment/bigshare", isInternal: true };
  }
  if (r.includes("skyline")) {
    return { name: "Skyline", href: "/allotment/skyline", isInternal: true };
  }
  if (r.includes("bse")) {
    return { name: "BSE India", href: "/allotment/bse-india", isInternal: true };
  }
  return {
    name: registrarName || "Designated RTA",
    href: "/allotment",
    isInternal: true,
  };
}

export function HomeAllotmentSection({ ipos }: HomeAllotmentSectionProps) {
  // Pick active and recent IPOs with allotment dates
  const allotmentIpos = ipos
    .filter((ipo) => ipo.allotmentDate || ipo.status === "Open" || ipo.status === "Upcoming")
    .slice(0, 6);

  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="bg-card border border-line rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-line pb-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              Live Allotment Verification Hub
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-tx tracking-tight">
              IPO Allotment Status Check Online by PAN
            </h2>
            <p className="text-xs sm:text-sm text-mut leading-relaxed">
              Verify your share allocation status across active Mainboard &amp; SME IPOs. Official direct query links for Link Intime, KFintech, Bigshare, and BSE India.
            </p>
          </div>

          <Link
            href="/allotment"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-accent text-accent-foreground hover:bg-accent/90 transition-all shrink-0 self-start sm:self-auto shadow-xs active:scale-95"
          >
            <span>View All Allotments</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Quick Registrar Links Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            href="/allotment/link-intime"
            className="p-3.5 rounded-2xl bg-card2/50 border border-line hover:border-accent/40 transition-all flex items-center justify-between group"
          >
            <div className="min-w-0 pr-2">
              <span className="text-[11px] font-bold text-accent uppercase tracking-wider block">Link Intime</span>
              <span className="text-xs font-bold text-tx truncate block">MUFG Portal</span>
            </div>
            <ArrowRight className="w-4 h-4 text-mut group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0" />
          </Link>

          <Link
            href="/allotment/kfintech"
            className="p-3.5 rounded-2xl bg-card2/50 border border-line hover:border-accent/40 transition-all flex items-center justify-between group"
          >
            <div className="min-w-0 pr-2">
              <span className="text-[11px] font-bold text-accent uppercase tracking-wider block">KFintech</span>
              <span className="text-xs font-bold text-tx truncate block">Servers 1 to 5</span>
            </div>
            <ArrowRight className="w-4 h-4 text-mut group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0" />
          </Link>

          <Link
            href="/allotment/bigshare"
            className="p-3.5 rounded-2xl bg-card2/50 border border-line hover:border-accent/40 transition-all flex items-center justify-between group"
          >
            <div className="min-w-0 pr-2">
              <span className="text-[11px] font-bold text-accent uppercase tracking-wider block">Bigshare</span>
              <span className="text-xs font-bold text-tx truncate block">SME Issues</span>
            </div>
            <ArrowRight className="w-4 h-4 text-mut group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0" />
          </Link>

          <Link
            href="/allotment/bse-india"
            className="p-3.5 rounded-2xl bg-card2/50 border border-line hover:border-accent/40 transition-all flex items-center justify-between group"
          >
            <div className="min-w-0 pr-2">
              <span className="text-[11px] font-bold text-accent uppercase tracking-wider block">BSE India</span>
              <span className="text-xs font-bold text-tx truncate block">Crash-Proof Check</span>
            </div>
            <ArrowRight className="w-4 h-4 text-mut group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0" />
          </Link>
        </div>

        {/* Allotment Status Table */}
        <div className="overflow-x-auto rounded-2xl border border-line bg-card shadow-xs">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className="bg-card2/90 border-b border-line text-tx font-heading font-bold text-xs sm:text-sm">
                <th className="py-3.5 px-4 font-bold text-tx">IPO Name</th>
                <th className="py-3.5 px-4 font-bold text-tx">Issue Type &amp; Status</th>
                <th className="py-3.5 px-4 font-bold text-tx">Allotment Date</th>
                <th className="py-3.5 px-4 font-bold text-tx">Designated Registrar</th>
                <th className="py-3.5 px-4 font-bold text-tx text-right">Verification Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {allotmentIpos.map((ipo) => {
                const regInfo = getRegistrarRoute(ipo.registrar);
                const isMainboard = ipo.board === "Mainboard";

                return (
                  <tr key={`${ipo.slug}-${ipo.symbol}`} className="hover:bg-card2/40 transition-colors">
                    {/* IPO Name */}
                    <td className="py-3.5 px-4">
                      <Link
                        href={`/ipo/${ipo.slug}/${ipo.symbol}`}
                        className="font-heading font-bold text-tx hover:text-accent transition-colors block truncate max-w-[240px] sm:max-w-xs"
                      >
                        {ipo.name}
                      </Link>
                      <span className="text-[11px] text-mut">
                        Lot: {ipo.lotSize} Shares • Price: {ipo.priceBand}
                      </span>
                    </td>

                    {/* Board / Type & Status unified badge */}
                    <td className="py-3.5 px-4">
                      <IpoBadgeHeader ipo={ipo} />
                    </td>

                    {/* Allotment Date */}
                    <td className="py-3.5 px-4 font-mono font-semibold text-tx">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-mut" />
                        <span>{formatIpoDate(ipo.allotmentDate)}</span>
                      </div>
                    </td>

                    {/* Registrar */}
                    <td className="py-3.5 px-4 max-w-[180px] sm:max-w-[200px]">
                      <Link
                        href={regInfo.href}
                        className="inline-flex items-center gap-1.5 text-tx hover:text-accent font-semibold transition-colors max-w-full group"
                        title={regInfo.name}
                      >
                        <Building2 className="w-3.5 h-3.5 text-mut shrink-0 group-hover:text-accent transition-colors" />
                        <span className="truncate">{regInfo.name}</span>
                        <ArrowRight className="w-3 h-3 text-accent shrink-0 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/ipo/${ipo.slug}/${ipo.symbol}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-accent/10 text-accent hover:bg-accent hover:text-white border border-accent/25 transition-all shadow-2xs"
                      >
                        <span>Check Status</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Bottom Fast Verification Tip */}
        <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-mut">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Updated live in accordance with SEBI T+3 IPO Allotment Framework.</span>
          </div>
          <Link href="/allotment" className="font-semibold text-accent hover:underline">
            Check Allotment by PAN, Demat DP ID or Application No →
          </Link>
        </div>

      </div>
    </section>
  );
}
