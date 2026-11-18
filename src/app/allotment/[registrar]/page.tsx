import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { REGISTRARS_DATA } from "@/lib/registrars-data";
import { getAllIpos } from "@/lib/ipo-service";
import { SITE_URL, getBreadcrumbSchema, getFaqSchema } from "@/lib/seo";
import {
  ShieldCheck,
  ExternalLink,
  Server,
  ArrowRight,
  HelpCircle,
  Clock,
  Building2,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  FileText,
  Search,
} from "lucide-react";

export const revalidate = 10;

interface PageProps {
  params: Promise<{
    registrar: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(REGISTRARS_DATA).map((slug) => ({
    registrar: slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = await params;
  const reg = REGISTRARS_DATA[resolved.registrar];

  if (!reg) {
    return {
      title: "Registrar Not Found",
    };
  }

  const title = `${reg.name} IPO Allotment Status Check Online by PAN | Official Portal`;
  const description = `Check ${reg.name} IPO allotment status online by PAN number. Official direct server links (Servers 1-5), basis of allotment dates & steps to verify your application.`;
  const canonicalUrl = `${SITE_URL}/allotment/${reg.slug}`;

  return {
    title,
    description,
    keywords: [
      `${reg.name} IPO Allotment Status`,
      `${reg.name} Allotment Check Online`,
      `${reg.name} IPO Allotment by PAN`,
      `${reg.name} Portal`,
      `${reg.name} Server Links`,
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function RegistrarAllotmentPage({ params }: PageProps) {
  const resolved = await params;
  const reg = REGISTRARS_DATA[resolved.registrar];

  if (!reg) {
    notFound();
  }

  const allIpos = await getAllIpos();
  // Filter IPOs that match this registrar
  const matchingIpos = allIpos.filter((ipo) => {
    const rName = (ipo.registrar || "").toLowerCase();
    const querySlug = reg.slug.replace("-", "");
    return rName.includes(reg.name.toLowerCase()) || rName.replace(/[\s-]/g, "").includes(querySlug);
  });

  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "IPO Allotment Status", url: `${SITE_URL}/allotment` },
    { name: `${reg.name} Allotment`, url: `${SITE_URL}/allotment/${reg.slug}` },
  ]);

  const faqSchema = getFaqSchema(reg.faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-bg py-8 sm:py-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-mut" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <span>/</span>
            <Link href="/allotment" className="hover:text-accent transition-colors">Allotment</Link>
            <span>/</span>
            <span className="text-tx font-medium">{reg.name}</span>
          </nav>

          {/* Hero Section */}
          <div className="bg-card border border-line rounded-3xl p-6 sm:p-8 md:p-10 shadow-xs relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              
              <div className="max-w-3xl space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified RTA Portal
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-mut bg-card2 border border-line">
                    SEBI Reg: {reg.sebiRegNo}
                  </span>
                </div>

                <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-tx tracking-tightest leading-tight">
                  {reg.name} IPO Allotment Status Check Online
                </h1>

                <p className="text-sm sm:text-base text-mut leading-relaxed">
                  {reg.description} Check your share allotment status directly using your PAN Card number, Application Number, or Demat DP Client ID.
                </p>

                {/* Search methods tags */}
                <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-mut font-semibold">Accepted Query Modes:</span>
                  {reg.searchMethods.map((mode) => (
                    <span key={mode} className="px-2.5 py-1 rounded-lg bg-card2 border border-line text-tx font-medium">
                      ✓ {mode}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct Query Card */}
              <div className="lg:w-[320px] bg-card2/70 border border-accent/40 rounded-2xl p-5 space-y-3.5 shrink-0 shadow-sm">
                <span className="text-xs font-bold text-accent uppercase tracking-wider flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5" />
                  Primary Server
                </span>
                <div>
                  <h3 className="font-heading font-bold text-base text-tx">
                    Official {reg.name} Link
                  </h3>
                  <p className="text-xs text-mut mt-1">
                    Direct access to official SEBI authorized allocation portal.
                  </p>
                </div>
                <a
                  href={reg.officialPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-accent text-accent-foreground hover:bg-accent/90 transition-all shadow-xs hover:scale-[1.02] active:scale-[0.98]"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Open {reg.name} Portal
                  <ExternalLink className="w-4 h-4 opacity-80" />
                </a>
              </div>

            </div>
          </div>

          {/* Server Mirrors Section (Crucial during high traffic) */}
          <section className="space-y-4">
            <div>
              <h2 className="font-heading font-black text-xl sm:text-2xl text-tx tracking-tight flex items-center gap-2">
                <Server className="w-5 h-5 text-accent" />
                {reg.name} Direct Server Mirrors (Fastest Load)
              </h2>
              <p className="text-xs sm:text-sm text-mut mt-0.5">
                If the primary server is experiencing high traffic, use alternate direct server links below.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {reg.servers.map((srv, idx) => (
                <div key={srv.name} className="p-5 rounded-2xl bg-card border border-line hover:border-accent/50 transition-all flex flex-col justify-between space-y-3 shadow-xs">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-accent/10 text-accent">
                        Server 0{idx + 1}
                      </span>
                      <span className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1">
                        ● Online
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-sm sm:text-base text-tx pt-1">
                      {srv.name}
                    </h3>
                    <p className="text-xs text-mut leading-relaxed">
                      {srv.note}
                    </p>
                  </div>
                  <a
                    href={srv.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-all shrink-0"
                  >
                    Open Server 0{idx + 1} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Active IPOs under this registrar */}
          {matchingIpos.length > 0 && (
            <section className="space-y-4">
              <div>
                <h2 className="font-heading font-black text-xl sm:text-2xl text-tx tracking-tight">
                  Active &amp; Recent IPOs Managed by {reg.name}
                </h2>
                <p className="text-xs sm:text-sm text-mut mt-0.5">
                  Click on any public issue below to check its specific basis of allotment date and live status.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {matchingIpos.slice(0, 6).map((ipo) => (
                  <Link
                    key={`${ipo.slug}-${ipo.symbol}`}
                    href={`/ipo/${ipo.slug}/${ipo.symbol}`}
                    className="p-5 rounded-2xl bg-card border border-line hover:border-accent/40 transition-all space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-card2 text-tx font-bold">
                          {ipo.board}
                        </span>
                        <span className="text-xs font-semibold text-accent">
                          Allotment: {ipo.allotmentDate || "TBA"}
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-base text-tx hover:text-accent transition-colors">
                        {ipo.name}
                      </h3>
                      <p className="text-xs text-mut">
                        Price Band: {ipo.priceBand} | Lot: {ipo.lotSize} Shares
                      </p>
                    </div>

                    <div className="pt-2 border-t border-line/60 flex items-center justify-between text-xs font-semibold text-accent">
                      <span>View Allotment Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Step-by-Step Guide */}
          <section className="bg-card border border-line rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
            <div>
              <h2 className="font-heading font-extrabold text-lg sm:text-xl text-tx tracking-tight flex items-center gap-2">
                <FileText className="w-5 h-5 text-accent" />
                Step-by-Step: How to Check {reg.name} IPO Allotment Status Online
              </h2>
              <p className="text-xs sm:text-sm text-mut mt-1">
                Follow these simple instructions to verify your application result in less than 30 seconds:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-card2/50 border border-line space-y-2">
                <span className="font-mono text-accent font-black text-sm">STEP 1</span>
                <h4 className="font-heading font-bold text-sm text-tx">Open Official Portal</h4>
                <p className="text-xs text-mut leading-relaxed">
                  Click any verified server button above to open {reg.name}&apos;s official public issue query page.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-card2/50 border border-line space-y-2">
                <span className="font-mono text-accent font-black text-sm">STEP 2</span>
                <h4 className="font-heading font-bold text-sm text-tx">Select Company Name</h4>
                <p className="text-xs text-mut leading-relaxed">
                  Choose your applied IPO from the dropdown menu (e.g., Mainboard or SME company name).
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-card2/50 border border-line space-y-2">
                <span className="font-mono text-accent font-black text-sm">STEP 3</span>
                <h4 className="font-heading font-bold text-sm text-tx">Choose Query Option</h4>
                <p className="text-xs text-mut leading-relaxed">
                  Select &apos;PAN Number&apos; (fastest), Application Number, or Demat DP Client ID.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-card2/50 border border-line space-y-2">
                <span className="font-mono text-accent font-black text-sm">STEP 4</span>
                <h4 className="font-heading font-bold text-sm text-tx">Submit &amp; View Status</h4>
                <p className="text-xs text-mut leading-relaxed">
                  Enter your 10-digit PAN and captcha. Your applied lots and allocated shares will be displayed immediately.
                </p>
              </div>
            </div>
          </section>

          {/* RTA Contact & Grievance Details */}
          <section className="bg-card border border-line rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <div>
              <h2 className="font-heading font-extrabold text-lg sm:text-xl text-tx tracking-tight flex items-center gap-2">
                <Building2 className="w-5 h-5 text-accent" />
                {reg.name} Investor Grievances &amp; Helpline
              </h2>
              <p className="text-xs text-mut mt-0.5">
                For non-receipt of refund, unblocking bank mandate issues, or Demat credit delays:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-card2/60 border border-line space-y-1">
                <div className="flex items-center gap-1.5 text-tx font-bold">
                  <Phone className="w-3.5 h-3.5 text-accent" />
                  Helpline Phone
                </div>
                <p className="text-mut">{reg.helplinePhone}</p>
              </div>
              <div className="p-4 rounded-xl bg-card2/60 border border-line space-y-1">
                <div className="flex items-center gap-1.5 text-tx font-bold">
                  <Mail className="w-3.5 h-3.5 text-accent" />
                  Investor Email
                </div>
                <p className="text-mut">{reg.helplineEmail}</p>
              </div>
              <div className="p-4 rounded-xl bg-card2/60 border border-line space-y-1">
                <div className="flex items-center gap-1.5 text-tx font-bold">
                  <MapPin className="w-3.5 h-3.5 text-accent" />
                  Registered Office
                </div>
                <p className="text-mut">{reg.address}</p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="bg-card border border-line rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <div>
              <h2 className="font-heading font-extrabold text-lg sm:text-xl text-tx tracking-tight flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-accent" />
                Frequently Asked Questions ({reg.name} Allotment)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reg.faqs.map((faq, i) => (
                <div key={i} className="p-5 rounded-2xl bg-card2/50 border border-line space-y-2">
                  <h3 className="font-heading font-bold text-sm text-tx">{faq.question}</h3>
                  <p className="text-xs text-mut leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Cross-Link Mesh */}
          <div className="bg-card border border-line rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
            <h3 className="font-heading font-bold text-base text-tx">
              Other Official Registrar Portals
            </h3>
            <div className="flex flex-wrap gap-2 text-xs">
              {Object.values(REGISTRARS_DATA)
                .filter((r) => r.slug !== reg.slug)
                .map((other) => (
                  <Link
                    key={other.slug}
                    href={`/allotment/${other.slug}`}
                    className="px-3 py-1.5 rounded-xl bg-card2 border border-line hover:border-accent text-tx hover:text-accent transition-colors font-medium"
                  >
                    {other.name} Allotment Status →
                  </Link>
                ))}
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
