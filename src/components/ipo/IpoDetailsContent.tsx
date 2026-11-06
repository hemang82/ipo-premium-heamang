"use client";

import React from "react";
import { formatINR } from "@/lib/format";
import {
  Calendar,
  DollarSign,
  Layers,
  Coins,
  Building,
  Users,
  CheckCircle2,
  Award,
  Clock,
  ArrowUpRight,
  Building2,
  TrendingUp,
  Download,
  ExternalLink,
  ShieldAlert,
  ThumbsUp,
  HelpCircle,
  XCircle,
  FileText,
} from "lucide-react";

export type NavTabId =
  | "overview"
  | "gmp"
  | "subscription"
  | "peers"
  | "docs"
  | "review";

interface IpoDetailsContentProps {
  raw: any;
  companyName: string;
  activeTab?: NavTabId;
  gmpData?: any;
  subData?: any;
  reviewData?: any;
}

// Helpers
function formatDate(dateStr?: string): string {
  if (!dateStr || dateStr === "-" || dateStr === "TBA") return "-";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function formatNumber(num: any): string {
  if (num === null || num === undefined || num === "" || num === "-") return "-";
  const parsed = Number(num);
  if (isNaN(parsed)) return String(num);
  return new Intl.NumberFormat("en-IN").format(parsed);
}

export function IpoDetailsContent({
  raw,
  companyName,
  gmpData,
  subData,
  reviewData,
}: IpoDetailsContentProps) {
  if (!raw) return null;

  // --------------------------------------------------------------------------
  // 1. DATA PREPARATION FOR OVERVIEW
  // --------------------------------------------------------------------------
  const coreDetails = [
    {
      label: "IPO Bidding Dates",
      value:
        raw.start_date && raw.end_date
          ? `${formatDate(raw.start_date)} to ${formatDate(raw.end_date)}`
          : "-",
      icon: Calendar,
      isHighlight: false,
    },
    {
      label: "Allotment Date",
      value: formatDate(raw.allotment_date),
      icon: Clock,
      isHighlight: false,
    },
    {
      label: "Listing Date",
      value: formatDate(raw.listing_date),
      icon: ArrowUpRight,
      isHighlight: false,
    },
    {
      label: "Issue Price Band",
      value: raw.price_range
        ? String(raw.price_range).replace(/\s*per\s*share/gi, "").trim()
        : raw.issue_price
        ? `₹${raw.issue_price}`
        : "-",
      icon: DollarSign,
      isHighlight: true,
    },
    {
      label: "Market Lot Size",
      value: raw.bid_lot ? `${formatNumber(raw.bid_lot)} Shares` : "-",
      icon: Layers,
      isHighlight: false,
    },
    {
      label: "Face Value",
      value: (() => {
        if (!raw.face_value) return "-";
        const cleanFv = String(raw.face_value).replace(/\s*per\s*share/gi, "").replace(/₹/g, "").trim();
        return `₹${cleanFv} per share`;
      })(),
      icon: Coins,
      isHighlight: false,
    },
    {
      label: "Total Issue Size",
      value:
        raw.issue_size || raw.issue_amount
          ? `${formatNumber(raw.issue_size)} Shares ${
              raw.issue_amount ? `(₹${raw.issue_amount} Cr)` : ""
            }`
          : "-",
      icon: Building,
      isHighlight: true,
    },
    {
      label: "Fresh Issue",
      value:
        raw.fresh_issue_value && Number(raw.fresh_issue_value) > 0
          ? `${formatNumber(raw.fresh_issue_value)} Shares ${
              raw.fresh_issue_size ? `(₹${raw.fresh_issue_size} Cr)` : ""
            }`
          : "-",
      icon: Coins,
      isHighlight: false,
    },
    {
      label: "Offer For Sale (OFS)",
      value:
        raw.offer_of_sale && Number(raw.offer_of_sale) > 0
          ? `${formatNumber(raw.offer_of_sale)} Shares ${
              raw.offer_of_sale_value ? `(₹${raw.offer_of_sale_value} Cr)` : ""
            }`
          : "-",
      icon: Coins,
      isHighlight: false,
    },
    {
      label: "Listing Exchange(s)",
      value: raw.listing_at_group || raw.exchange || "BSE, NSE",
      icon: Building2,
      isHighlight: false,
    },
    {
      label: "Pre-Issue Shares",
      value: formatNumber(raw.pre_issue_share_holding),
      icon: Users,
      isHighlight: false,
    },
    {
      label: "Post-Issue Shares",
      value: formatNumber(raw.post_issue_share_holding),
      icon: Users,
      isHighlight: false,
    },
  ];

  if (raw.security_type === "SME" && raw.market_maker_offered) {
    coreDetails.push({
      label: "Market Maker Portion",
      value: `${formatNumber(raw.market_maker_offered)} Shares`,
      icon: Award,
      isHighlight: false,
    });
  }

  const lotDesc = Array.isArray(raw.ipo_lot_description) ? raw.ipo_lot_description : [];

  // Subscription Details (Fallback to subData or raw)
  const subDetail = Array.isArray(subData?.ipo_subscription_detail)
    ? subData.ipo_subscription_detail
    : Array.isArray(raw.ipo_subscription_detail)
    ? raw.ipo_subscription_detail
    : [];

  const dayWise = Array.isArray(raw.day_wise_subscription)
    ? raw.day_wise_subscription
    : Array.isArray(raw.subscription_history)
    ? raw.subscription_history
    : [];

  const reservation = Array.isArray(subData?.ipo_reservation)
    ? subData.ipo_reservation
    : Array.isArray(raw.ipo_reservation)
    ? raw.ipo_reservation
    : [];

  const kpis = Array.isArray(raw.key_performance_indicator) ? raw.key_performance_indicator : [];
  const financialObj = raw.company_financial_data || {};
  const financialRows = Array.isArray(financialObj.financial_data) ? financialObj.financial_data : [];

  // --------------------------------------------------------------------------
  // 2. HERO HIGHLIGHT CARDS
  // --------------------------------------------------------------------------
  const heroPriceBand = raw.price_range || (raw.issue_price ? `₹${raw.issue_price}` : "-");
  const heroLotSize = raw.bid_lot ? `${formatNumber(raw.bid_lot)} Shares` : "-";
  const heroMinInvestment = raw.min_investment
    ? `₹${formatNumber(raw.min_investment)}`
    : raw.bid_lot && raw.issue_price
    ? `₹${formatNumber(Number(raw.bid_lot) * Number(raw.issue_price))}`
    : "-";
  const heroCloseDate = formatDate(raw.end_date);
  const heroTotalSub = raw.subscription ? `${raw.subscription}x` : "0.00x";

  // --------------------------------------------------------------------------
  // 3. GMP DATA
  // --------------------------------------------------------------------------
  const gmpList = Array.isArray(gmpData?.ipo_gmp) ? gmpData.ipo_gmp : [];
  const currentGmpVal = Number(raw.gmp || (gmpList[0]?.gmp ?? 0));
  const upperPriceVal = Number(raw.issue_price || raw.max_investment || 94);
  const estListingPriceVal = upperPriceVal + currentGmpVal;
  const expGainPct = upperPriceVal > 0 ? ((currentGmpVal / upperPriceVal) * 100).toFixed(1) : "0.0";

  // --------------------------------------------------------------------------
  // 4. DOCS DATA (Anchor only if actually exists)
  // --------------------------------------------------------------------------
  const docLinks = Array.isArray(raw.ipo_doc_link) ? raw.ipo_doc_link : [];
  const drhpFile =
    raw.drhp_file ||
    docLinks.find((d: any) => d.label?.toUpperCase() === "DRHP" || d.lable?.toUpperCase() === "DRHP")?.link;
  const rhpFile =
    raw.rhp_file ||
    docLinks.find((d: any) => d.label?.toUpperCase() === "RHP" || d.lable?.toUpperCase() === "RHP")?.link;
  const anchorFile =
    raw.anchor_file ||
    raw.anchor_investor_file_url ||
    docLinks.find((d: any) => d.label?.toUpperCase()?.includes("ANCHOR"))?.link;

  // --------------------------------------------------------------------------
  // 5. PEERS DATA
  // --------------------------------------------------------------------------
  const peerList = Array.isArray(raw.peer_comparison)
    ? raw.peer_comparison
    : Array.isArray(raw.peers)
    ? raw.peers
    : [];

  // --------------------------------------------------------------------------
  // 6. REVIEW DATA
  // --------------------------------------------------------------------------
  const reviews = Array.isArray(reviewData?.data?.results)
    ? reviewData.data.results
    : Array.isArray(reviewData?.results)
    ? reviewData.results
    : Array.isArray(reviewData?.data)
    ? reviewData.data
    : [];

  return (
    <div className="space-y-10">
      {/* ========================================================
          4 KEY HERO HIGHLIGHT CARDS (Direct Eye-Catchers)
          ======================================================== */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Card 1: Price Band */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-card border border-line shadow-sm hover:border-accent/40 transition-all">
          <span className="text-xs font-bold uppercase tracking-wider text-mut block mb-1">
            Price Band
          </span>
          <span className="text-base sm:text-lg font-heading font-bold text-tx tabular-nums block font-mono">
            {heroPriceBand}
          </span>
          <span className="text-xs text-mut/80 mt-0.5 block truncate">
            Lot: {heroLotSize}
          </span>
        </div>

        {/* Card 2: Min Outlay */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-card border border-line shadow-sm hover:border-accent/40 transition-all">
          <span className="text-xs font-bold uppercase tracking-wider text-mut block mb-1">
            Min Outlay
          </span>
          <span className="text-base sm:text-lg font-heading font-bold text-accent tabular-nums block font-mono">
            {heroMinInvestment}
          </span>
          <span className="text-xs text-mut/80 mt-0.5 block truncate">
            Retail Category
          </span>
        </div>

        {/* Card 3: Closes On */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-card border border-line shadow-sm hover:border-accent/40 transition-all">
          <span className="text-xs font-bold uppercase tracking-wider text-mut block mb-1">
            Closes On
          </span>
          <span className="text-base sm:text-lg font-heading font-bold text-dn tabular-nums block">
            {heroCloseDate}
          </span>
          <span className="text-xs text-mut/80 mt-0.5 block truncate">
            Bidding Deadline
          </span>
        </div>

        {/* Card 4: Total Demand */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-card border border-line shadow-sm hover:border-accent/40 transition-all">
          <span className="text-xs font-bold uppercase tracking-wider text-mut block mb-1">
            Total Demand
          </span>
          <span className="text-base sm:text-lg font-heading font-bold text-up tabular-nums block font-mono">
            {heroTotalSub}
          </span>
          <span className="text-xs text-mut/80 mt-0.5 block truncate">
            Subscription Book
          </span>
        </div>
      </div>

      {/* ========================================================
          SECTION 1: IPO DETAILS (OVERVIEW)
          ======================================================== */}
      <div id="section-overview" className="scroll-mt-24 space-y-6">
        {/* Core Issue Details */}
        <section className="rounded-card bg-card border border-line p-5 md:p-6 shadow-sm">
          <h2 className="text-base md:text-lg font-heading font-semibold text-tx tracking-tight mb-4 pb-3 border-b border-line flex items-center justify-between">
            <span>{companyName} IPO Details</span>
            <span className="text-xs font-mono font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-full">
              Core Specs
            </span>
          </h2>

          <div className="overflow-x-auto rounded-xl border border-line/60">
            <table className="w-full text-xs md:text-sm text-left">
              <tbody>
                {coreDetails.map((item, idx) => {
                  const Icon = item.icon;
                  const isEven = idx % 2 === 0;

                  return (
                    <tr
                      key={idx}
                      className={`transition-colors border-b border-line/40 last:border-0 ${
                        isEven ? "bg-card2/35" : "bg-card"
                      } hover:bg-card2/80`}
                    >
                      <td className="py-3 px-4 text-mut font-semibold whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <div className="w-6 h-6 rounded-md bg-card2 border border-line flex items-center justify-center text-accent shrink-0">
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <span className="whitespace-nowrap">{item.label}</span>
                        </div>
                      </td>
                      <td
                        className={`py-3 px-4 font-mono font-bold tabular-nums text-right sm:text-left ${
                          item.isHighlight
                            ? "text-accent text-sm md:text-base font-extrabold"
                            : "text-tx"
                        }`}
                      >
                        {item.value}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Lot(s) Distribution */}
        {lotDesc.length > 0 && (
          <section className="rounded-card bg-card border border-line p-5 md:p-6 shadow-sm">
            <h2 className="text-base md:text-lg font-heading font-semibold text-tx tracking-tight mb-4 pb-3 border-b border-line">
              Lot(s) Distribution
            </h2>
            <div className="overflow-x-auto rounded-xl border border-line/60">
              <table className="w-full text-xs md:text-sm text-left whitespace-nowrap">
                <thead>
                  <tr className="border-b border-line text-mut uppercase font-semibold text-xs tracking-wider bg-card2/60">
                    <th className="py-3 px-4">Application</th>
                    <th className="py-3 px-4 text-right">Lots</th>
                    <th className="py-3 px-4 text-right">Shares</th>
                    <th className="py-3 px-4 text-right">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/40">
                  {lotDesc.map((item: any, idx: number) => {
                    let appLabel = item.category;
                    if (item.category === "RETAIL") appLabel = "Retail (Min)";
                    else if (item.category === "sHNI") appLabel = "sHNI (Min)";
                    else if (item.category === "bHNI") appLabel = "bHNI (Min)";

                    return (
                      <tr
                        key={idx}
                        className={`hover:bg-card2/80 transition-colors ${
                          idx % 2 === 0 ? "bg-card2/35" : "bg-card"
                        }`}
                      >
                        <td className="py-3 px-4 font-semibold text-tx">{appLabel}</td>
                        <td className="py-3 px-4 text-right font-mono text-mut">
                          {item["lot(s)"] || item.lots || 1}
                        </td>
                        <td className="py-3 px-4 text-right font-mono text-tx">
                          {formatNumber(item.qty || item.shares)}
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-accent">
                          ₹{formatNumber(item.amount)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Company Financials (Horizontal Year Columns as requested) */}
        {financialRows.length > 0 && (() => {
          // Filter out header row if present in backend data (where period_ended === "Period Ended")
          const periods = financialRows.filter(
            (r: any) =>
              r.period_ended &&
              String(r.period_ended).toLowerCase() !== "period ended"
          );

          if (periods.length === 0) return null;

          const metricRows = [
            { key: "assets", label: "Assets" },
            { key: "revenue", altKey: "total_revenue", label: "Revenue" },
            { key: "net_worth", label: "Net Worth" },
            { key: "total_borrowing", altKey: "borrowing", label: "Borrowing" },
            { key: "profit_after_tax", altKey: "pat", label: "PAT" },
            { key: "reserves_and_surpluse", altKey: "reserves", label: "Reserves" },
          ];

          return (
            <section className="rounded-card bg-card border border-line p-5 md:p-6 shadow-sm">
              <div className="flex items-center gap-2.5 mb-4 pb-2 border-b border-line">
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <h2 className="text-base md:text-lg font-heading font-semibold text-tx tracking-tight">
                  Company Financials ({financialObj.financial_amount_type || "In Crores"})
                </h2>
              </div>

              <div className="overflow-x-auto rounded-xl border border-line/60">
                <table className="w-full text-xs md:text-sm text-left whitespace-nowrap">
                  <thead>
                    <tr className="bg-card2/80 border-b border-line text-tx font-semibold text-xs md:text-sm">
                      <th className="py-3 px-4 text-tx font-semibold w-40">Period Ended</th>
                      {periods.map((p: any, i: number) => (
                        <th key={i} className="py-3 px-4 text-center font-semibold text-tx font-mono">
                          {p.period_ended}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line/40">
                    {metricRows.map((m, rowIdx) => {
                      const isEven = rowIdx % 2 === 0;
                      return (
                        <tr
                          key={m.key}
                          className={`hover:bg-card2/60 transition-colors ${
                            isEven ? "bg-card" : "bg-card2/25"
                          }`}
                        >
                          <td className="py-3.5 px-4 font-semibold text-tx">
                            {m.label}
                          </td>
                          {periods.map((p: any, colIdx: number) => {
                            const val = p[m.key] !== undefined ? p[m.key] : m.altKey ? p[m.altKey] : "-";
                            return (
                              <td
                                key={colIdx}
                                className="py-3.5 px-4 text-center font-mono font-medium text-tx tabular-nums"
                              >
                                {val !== null && val !== undefined && val !== "" ? val : "-"}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          );
        })()}

        {/* Key Performance Indicators (KPI) - Show only if valid data exists */}
        {kpis.length > 0 && (() => {
          // Filter out dummy header row if present
          const validKpis = kpis.filter(
            (k: any) =>
              (k.kpi && String(k.kpi).toLowerCase() !== "kpi") ||
              k.title ||
              k.metric ||
              (k.value && k.value !== "-")
          );

          if (validKpis.length === 0) return null;

          // If KPI comes as period-based table (e.g. Antala / VPFL)
          const isPeriodBased = validKpis.some((k: any) => k.kpi || k.eps || k.roec || k.ronw);

          if (isPeriodBased) {
            const kpiPeriods = validKpis.filter((k: any) => k.kpi && String(k.kpi).toLowerCase() !== "kpi");
            if (kpiPeriods.length === 0) return null;

            const kpiMetrics = [
              { key: "roec", label: "ROCE (%)" },
              { key: "ronw", label: "RONW (%)" },
              { key: "eps", label: "EPS (₹)" },
              { key: "post_ipo", altKey: "pre_ipo", label: "P/E Ratio" },
            ];

            return (
              <section className="rounded-card bg-card border border-line p-5 md:p-6 shadow-sm">
                <div className="flex items-center gap-2.5 mb-4 pb-2 border-b border-line">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <h2 className="text-base md:text-lg font-heading font-semibold text-tx tracking-tight">
                    Key Performance Indicators (KPI)
                  </h2>
                </div>

                <div className="overflow-x-auto rounded-xl border border-line/60">
                  <table className="w-full text-xs md:text-sm text-left whitespace-nowrap">
                    <thead>
                      <tr className="bg-card2/80 border-b border-line text-tx font-semibold text-xs md:text-sm">
                        <th className="py-3 px-4 text-tx font-semibold w-40">Metric</th>
                        {kpiPeriods.map((p: any, i: number) => (
                          <th key={i} className="py-3 px-4 text-center font-semibold text-tx font-mono">
                            {p.kpi}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line/40">
                      {kpiMetrics.map((m, rowIdx) => {
                        const isEven = rowIdx % 2 === 0;
                        return (
                          <tr
                            key={m.key}
                            className={`hover:bg-card2/60 transition-colors ${
                              isEven ? "bg-card" : "bg-card2/25"
                            }`}
                          >
                            <td className="py-3.5 px-4 font-semibold text-tx">
                              {m.label}
                            </td>
                            {kpiPeriods.map((p: any, colIdx: number) => {
                              const val = p[m.key] && p[m.key] !== "0" ? p[m.key] : m.altKey && p[m.altKey] && p[m.altKey] !== "0" ? p[m.altKey] : "-";
                              return (
                                <td
                                  key={colIdx}
                                  className="py-3.5 px-4 text-center font-mono font-medium text-tx tabular-nums"
                                >
                                  {val}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>
            );
          }

          // Otherwise show card grid if data has actual non-empty values
          const filledCards = validKpis.filter((k: any) => k.value && k.value !== "-" && k.value !== "0");
          if (filledCards.length === 0) return null;

          return (
            <section className="rounded-card bg-card border border-line p-5 md:p-6 shadow-sm">
              <h2 className="text-base md:text-lg font-heading font-semibold text-tx tracking-tight mb-4 pb-3 border-b border-line">
                Key Performance Indicators (KPI)
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {filledCards.map((kpi: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-card2/40 border border-line flex flex-col justify-between"
                  >
                    <span className="text-xs text-mut font-medium">{kpi.title || kpi.metric}</span>
                    <span className="text-base font-mono font-bold text-tx mt-1">
                      {kpi.value}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          );
        })()}

        {/* About Company */}
        {raw.about_the_company && (
          <section className="rounded-card bg-card border border-line p-5 md:p-6 shadow-sm">
            <h2 className="text-base md:text-lg font-heading font-semibold text-tx tracking-tight mb-4 pb-3 border-b border-line">
              About {companyName}
            </h2>
            <div
              className="text-xs sm:text-sm text-tx/85 leading-relaxed prose prose-invert max-w-none space-y-3"
              dangerouslySetInnerHTML={{ __html: raw.about_the_company }}
            />
          </section>
        )}

        {/* Strengths & Risks */}
        {(raw.company_strenght || raw.company_weakness) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {raw.company_strenght && (
              <section className="rounded-card bg-card border border-line p-5 shadow-sm">
                <h3 className="font-heading font-semibold text-sm sm:text-base text-up mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-up" />
                  Strengths & Growth Drivers
                </h3>
                <div
                  className="text-xs sm:text-sm text-tx/85 leading-relaxed space-y-2 prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: raw.company_strenght }}
                />
              </section>
            )}

            {raw.company_weakness && (
              <section className="rounded-card bg-card border border-line p-5 shadow-sm">
                <h3 className="font-heading font-semibold text-sm sm:text-base text-dn mb-3 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-dn" />
                  Risk Factors
                </h3>
                <div
                  className="text-xs sm:text-sm text-tx/85 leading-relaxed space-y-2 prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: raw.company_weakness }}
                />
              </section>
            )}
          </div>
        )}

        {/* Promoters & Lead Managers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {raw.company_promoter && (
            <section className="rounded-card bg-card border border-line p-5 shadow-sm">
              <h3 className="font-heading font-semibold text-sm sm:text-base text-tx mb-3">
                Company Promoters
              </h3>
              <div
                className="text-xs sm:text-sm text-tx/85 leading-relaxed space-y-2 prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: raw.company_promoter }}
              />
            </section>
          )}

          {raw.lead_managers && (
            <section className="rounded-card bg-card border border-line p-5 shadow-sm">
              <h3 className="font-heading font-semibold text-sm sm:text-base text-tx mb-3">
                Lead Manager(s)
              </h3>
              <div
                className="text-xs sm:text-sm text-tx/85 leading-relaxed space-y-2 prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: raw.lead_managers }}
              />
            </section>
          )}
        </div>
      </div>

      {/* ========================================================
          SECTION 2: GMP TREND
          ======================================================== */}
      <div id="section-gmp" className="scroll-mt-24 space-y-6">
        {/* Top Metric Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-card border border-line shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-mut block mb-1">
              Current GMP Today
            </span>
            <span className="text-2xl font-heading font-bold text-up tabular-nums block font-mono">
              {currentGmpVal >= 0 ? `+₹${currentGmpVal}` : `-₹${Math.abs(currentGmpVal)}`}
            </span>
            <span className="text-xs text-mut mt-1 block">Live Unofficial Premium</span>
          </div>

          <div className="p-4 rounded-2xl bg-card border border-line shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-mut block mb-1">
              Estimated Listing Price
            </span>
            <span className="text-2xl font-heading font-bold text-accent tabular-nums block font-mono">
              ₹{estListingPriceVal.toFixed(2)}
            </span>
            <span className="text-xs text-mut mt-1 block">
              Cap Price (₹{upperPriceVal}) + GMP (₹{currentGmpVal})
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-card border border-line shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-mut block mb-1">
              Estimated Listing Gain
            </span>
            <span className="text-2xl font-heading font-bold text-emerald-400 tabular-nums block font-mono">
              +{expGainPct}%
            </span>
            <span className="text-xs text-mut mt-1 block">Expected ROI per Share</span>
          </div>
        </div>

        {/* Daily GMP Trend History Table */}
        <section className="rounded-card bg-card border border-line p-5 md:p-6 shadow-sm">
          <h2 className="text-base md:text-lg font-heading font-semibold text-tx tracking-tight mb-4 pb-3 border-b border-line flex items-center justify-between">
            <span>{companyName} Daily GMP Trend History</span>
            <span className="text-xs font-mono text-accent bg-accent/10 px-2.5 py-1 rounded-full">
              Live Daily Trend
            </span>
          </h2>

          {gmpList.length > 0 ? (
            <div className="overflow-x-auto rounded-xl border border-line/60">
              <table className="w-full text-xs md:text-sm text-left whitespace-nowrap">
                <thead>
                  <tr className="border-b border-line text-mut uppercase font-semibold text-xs tracking-wider bg-card2/60">
                    <th className="py-3 px-4">GMP Date</th>
                    <th className="py-3 px-4 text-right">IPO Price</th>
                    <th className="py-3 px-4 text-right">GMP (₹)</th>
                    <th className="py-3 px-4 text-right">Est. Listing Price</th>
                    <th className="py-3 px-4 text-right">Expected Gain (%)</th>
                    <th className="py-3 px-4 text-right">Last Updated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/40">
                  {gmpList.map((g: any, idx: number) => {
                    const gmpNum = Number(g.gmp || 0);
                    const ipoPr = Number(g.ipo_price || upperPriceVal);
                    const gain = ipoPr > 0 ? ((gmpNum / ipoPr) * 100).toFixed(1) : "0.0";
                    const isPositive = gmpNum > 0;
                    const isZero = gmpNum === 0;

                    return (
                      <tr
                        key={idx}
                        className={`hover:bg-card2/80 transition-colors ${
                          idx % 2 === 0 ? "bg-card2/35" : "bg-card"
                        }`}
                      >
                        <td className="py-3 px-4 font-semibold text-tx font-mono">
                          {formatDate(g.gmp_date)}
                        </td>
                        <td className="py-3 px-4 text-right font-mono text-mut">
                          ₹{ipoPr}
                        </td>
                        <td
                          className={`py-3 px-4 text-right font-mono font-bold ${
                            isZero
                              ? "text-mut"
                              : isPositive
                              ? "text-emerald-500"
                              : "text-red-500"
                          }`}
                        >
                          {isPositive ? `+₹${gmpNum}` : `₹${gmpNum}`}
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-accent">
                          ₹{g.estimated_listing_price || (ipoPr + gmpNum).toFixed(2)}
                        </td>
                        <td
                          className={`py-3 px-4 text-right font-mono font-bold ${
                            isPositive ? "text-emerald-500" : "text-mut"
                          }`}
                        >
                          {isPositive ? `+${gain}%` : `${gain}%`}
                        </td>
                        <td className="py-3 px-4 text-right font-mono text-mut text-xs">
                          {g.updated_at
                            ? new Date(g.updated_at).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "-"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-mut text-xs sm:text-sm">
              No historical GMP data found for this IPO.
            </div>
          )}
        </section>
      </div>

      {/* ========================================================
          SECTION 3: SUBSCRIPTION
          ======================================================== */}
      <div id="section-subscription" className="scroll-mt-24 space-y-6">
        {/* Real-Time Category Demand Table */}
        <section className="rounded-card bg-card border border-line p-5 md:p-6 shadow-sm">
          <h2 className="text-base md:text-lg font-heading font-semibold text-tx tracking-tight mb-4 pb-3 border-b border-line flex items-center justify-between">
            <span>Subscription Details (No. of Shares)</span>
            <span className="text-xs font-mono text-accent bg-accent/10 px-2.5 py-1 rounded-full">
              Live Demand Book
            </span>
          </h2>

          {subDetail.length > 0 ? (
            <div className="overflow-x-auto rounded-xl border border-line/60">
              <table className="w-full text-xs md:text-sm text-left whitespace-nowrap">
                <thead>
                  <tr className="border-b border-line text-mut uppercase font-semibold text-xs tracking-wider bg-card2/60">
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4 text-right">Shares Offered</th>
                    <th className="py-3 px-4 text-right">Shares Applied</th>
                    <th className="py-3 px-4 text-right">Subscription Demand</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/40">
                  {subDetail.map((sub: any, idx: number) => {
                    const timesVal = Number(sub.times || 0);
                    const fillPercent = Math.min(Math.max(timesVal * 30, 8), 100);

                    return (
                      <tr
                        key={idx}
                        className={`hover:bg-card2/80 transition-colors ${
                          idx % 2 === 0 ? "bg-card2/35" : "bg-card"
                        }`}
                      >
                        <td className="py-3.5 px-4 font-semibold text-tx">
                          {sub.category || "General"}
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono text-mut">
                          {formatNumber(sub.offered || sub.shares_offered)}
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono text-tx font-medium">
                          {formatNumber(sub.applied || sub.shares_applied)}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2.5">
                            <div className="w-20 sm:w-28 h-2 rounded-full bg-card2 border border-line/50 overflow-hidden hidden sm:block">
                              <div
                                className="h-full bg-gradient-to-r from-accent/80 to-up rounded-full transition-all duration-500"
                                style={{ width: `${fillPercent}%` }}
                              />
                            </div>
                            <span className="font-mono font-bold text-up min-w-[50px]">
                              {timesVal}x
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-mut text-xs sm:text-sm">
              Subscription data is not yet available for this IPO.
            </div>
          )}
        </section>

        {/* Day-Wise Subscription Bidding Table */}
        {dayWise.length > 0 && (
          <section className="rounded-card bg-card border border-line p-5 md:p-6 shadow-sm">
            <h2 className="text-base md:text-lg font-heading font-semibold text-tx tracking-tight mb-4 pb-3 border-b border-line">
              Day Wise Subscription Details
            </h2>
            <div className="overflow-x-auto rounded-xl border border-line/60">
              <table className="w-full text-xs md:text-sm text-left whitespace-nowrap">
                <thead>
                  <tr className="border-b border-line text-mut uppercase font-semibold text-xs tracking-wider bg-card2/60">
                    <th className="py-3 px-4">Day</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4 text-right">QIB (x)</th>
                    <th className="py-3 px-4 text-right">NII (x)</th>
                    <th className="py-3 px-4 text-right">Retail (x)</th>
                    <th className="py-3 px-4 text-right font-bold text-accent">Total (x)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/40">
                  {dayWise.map((day: any, idx: number) => (
                    <tr
                      key={idx}
                      className={`hover:bg-card2/80 transition-colors ${
                        idx % 2 === 0 ? "bg-card2/35" : "bg-card"
                      }`}
                    >
                      <td className="py-3 px-4 font-semibold text-tx">Day {idx + 1}</td>
                      <td className="py-3 px-4 font-mono text-mut">
                        {formatDate(day.date || day.day_date)}
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-mut">
                        {day.qib || day.qibs || 0}x
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-mut">
                        {day.nii || day.hnis || 0}x
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-mut">
                        {day.retail || 0}x
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-up">
                        {day.total || 0}x
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Reservation Breakup */}
        {reservation.length > 0 && (
          <section className="rounded-card bg-card border border-line p-5 md:p-6 shadow-sm">
            <h2 className="text-base md:text-lg font-heading font-semibold text-tx tracking-tight mb-4 pb-3 border-b border-line">
              IPO Reservation Breakup
            </h2>
            <div className="overflow-x-auto rounded-xl border border-line/60">
              <table className="w-full text-xs md:text-sm text-left whitespace-nowrap">
                <thead>
                  <tr className="border-b border-line text-mut uppercase font-semibold text-xs tracking-wider bg-card2/60">
                    <th className="py-3 px-4">Investor Category</th>
                    <th className="py-3 px-4 text-right">Shares Offered</th>
                    <th className="py-3 px-4 text-right">Allocation (%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/40">
                  {reservation.map((res: any, idx: number) => (
                    <tr
                      key={idx}
                      className={`hover:bg-card2/80 transition-colors ${
                        idx % 2 === 0 ? "bg-card2/35" : "bg-card"
                      }`}
                    >
                      <td className="py-3 px-4 font-semibold text-tx">
                        {res.investor_category || res.category}
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-mut">
                        {formatNumber(res.no_of_shares || res.shares_offered)}
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-accent">
                        {res.shares_offered || res.share_percentage || 0}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>

      {/* ========================================================
          SECTION 5: OFFICIAL IPO DOCUMENTS
          ======================================================== */}
      <div id="section-docs" className="scroll-mt-24 space-y-6">
        <section className="rounded-card bg-card border border-line p-5 md:p-6 shadow-sm">
          <h2 className="text-base md:text-lg font-heading font-semibold text-tx tracking-tight mb-4 pb-3 border-b border-line">
            Official IPO Documents & Filings
          </h2>

          {/* Grid layout: Shows RHP and DRHP minimum 2 cards. Anchor only if exists */}
          <div
            className={`grid grid-cols-1 ${
              anchorFile ? "sm:grid-cols-2 md:grid-cols-3" : "sm:grid-cols-2"
            } gap-4`}
          >
            {/* 1. RHP Document */}
            <div className="p-4 rounded-xl bg-card2/50 border border-line flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-3">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-semibold text-tx text-sm font-semibold mb-1">
                  Red Herring Prospectus (RHP)
                </h3>
                <p className="text-xs text-mut mb-4">
                  Complete issue guidelines, risks, financials, and company profile.
                </p>
              </div>
              {rhpFile ? (
                <a
                  href={rhpFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-accent text-accent-foreground font-semibold text-xs shadow-sm hover:brightness-105"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download RHP PDF
                </a>
              ) : (
                <span className="text-xs text-mut italic">Document not uploaded yet</span>
              )}
            </div>

            {/* 2. DRHP Document */}
            <div className="p-4 rounded-xl bg-card2/50 border border-line flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-3">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-semibold text-tx text-sm font-semibold mb-1">
                  Draft Red Herring (DRHP)
                </h3>
                <p className="text-xs text-mut mb-4">
                  Initial draft submitted to SEBI before price discovery.
                </p>
              </div>
              {drhpFile ? (
                <a
                  href={drhpFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-card2 border border-line font-semibold text-xs text-tx hover:text-accent shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  View DRHP PDF
                </a>
              ) : (
                <span className="text-xs text-mut italic">Document not uploaded yet</span>
              )}
            </div>

            {/* 3. Anchor File (Only render if actually available) */}
            {anchorFile && (
              <div className="p-4 rounded-xl bg-card2/50 border border-line flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-semibold text-tx text-sm font-semibold mb-1">
                    Anchor Investor Allocation
                  </h3>
                  <p className="text-xs text-mut mb-4">
                    List of institutional anchor bidders and allocated quota.
                  </p>
                </div>
                <a
                  href={anchorFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-card2 border border-line font-semibold text-xs text-tx hover:text-accent shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Anchor PDF
                </a>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* ========================================================
          SECTION 4: PEER COMPARISON (Conditional: Only if peers exist)
          ======================================================== */}
      {peerList.length > 0 && (
        <div id="section-peers" className="scroll-mt-24 space-y-6">
          <section className="rounded-card bg-card border border-line p-5 md:p-6 shadow-sm">
            <h2 className="text-base md:text-lg font-heading font-semibold text-tx tracking-tight mb-2">
              {companyName} Peer Comparison
            </h2>
            <p className="text-xs text-mut mb-4">
              Valuation metrics compared with industry competitors
            </p>

            <div className="overflow-x-auto rounded-xl border border-line/60">
              <table className="w-full text-xs md:text-sm text-left whitespace-nowrap">
                <thead>
                  <tr className="border-b border-line text-mut uppercase font-semibold text-xs tracking-wider bg-card2/60">
                    <th className="py-3 px-4">Company Name</th>
                    <th className="py-3 px-4 text-right">Total Income (₹ Cr)</th>
                    <th className="py-3 px-4 text-right">P/E Ratio</th>
                    <th className="py-3 px-4 text-right">EPS (Basic & Diluted)</th>
                    <th className="py-3 px-4 text-right">RoNW (%)</th>
                    <th className="py-3 px-4 text-right">NAV Per Share</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/40">
                  {peerList.map((peer: any, idx: number) => (
                    <tr
                      key={idx}
                      className={`hover:bg-card2/80 transition-colors ${
                        idx % 2 === 0 ? "bg-card2/35" : "bg-card"
                      }`}
                    >
                      <td className="py-3 px-4 font-semibold text-tx">
                        {peer.company_name || peer.name || "-"}
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-tx">
                        {peer.total_income || peer.revenue || "-"}
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-accent">
                        {peer.pe_ratio || peer.pe || "-"}
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-tx">
                        {peer.eps || "-"}
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-emerald-400 font-bold">
                        {peer.ronw || "-"}%
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-tx">
                        {peer.nav || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}

      {/* ========================================================
          SECTION 6: REVIEW (Conditional: Only if reviews exist)
          ======================================================== */}
      {reviews.length > 0 && (
        <div id="section-review" className="scroll-mt-24 space-y-6">
          <section className="rounded-card bg-card border border-line p-5 md:p-6 shadow-sm">
            <h2 className="text-base md:text-lg font-heading font-semibold text-tx tracking-tight mb-4 pb-3 border-b border-line flex items-center justify-between">
              <span>Broker Reviews & Recommendations</span>
              <span className="text-xs font-mono text-accent bg-accent/10 px-2.5 py-1 rounded-full">
                Analyst Consensus
              </span>
            </h2>

            <div className="space-y-6">
              {/* Visual Consensus Bar */}
              <div className="p-4 rounded-xl bg-card2/40 border border-line space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-emerald-400 flex items-center gap-1">
                    <ThumbsUp className="w-3.5 h-3.5" /> Apply
                  </span>
                  <span className="text-amber-400 flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5" /> May Apply
                  </span>
                  <span className="text-red-400 flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5" /> Avoid
                  </span>
                </div>
                <div className="h-2.5 w-full bg-card2 rounded-full overflow-hidden flex">
                  <div className="bg-emerald-500 h-full w-[70%]" />
                  <div className="bg-amber-500 h-full w-[20%]" />
                  <div className="bg-red-500 h-full w-[10%]" />
                </div>
              </div>

              {/* Broker Table */}
              <div className="overflow-x-auto rounded-xl border border-line/60">
                <table className="w-full text-xs md:text-sm text-left whitespace-nowrap">
                  <thead>
                    <tr className="border-b border-line text-mut uppercase font-semibold text-xs tracking-wider bg-card2/60">
                      <th className="py-3 px-4">Broker Name</th>
                      <th className="py-3 px-4">Recommendation</th>
                      <th className="py-3 px-4 text-right">Research Report</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line/40">
                    {reviews.map((rev: any, idx: number) => {
                      const rec = (rev.recommendation || rev.rating || "Apply").toUpperCase();
                      const isApply = rec.includes("APPLY") && !rec.includes("MAY");
                      const isMay = rec.includes("MAY");

                      return (
                        <tr
                          key={idx}
                          className={`hover:bg-card2/80 transition-colors ${
                            idx % 2 === 0 ? "bg-card2/35" : "bg-card"
                          }`}
                        >
                          <td className="py-3 px-4 font-semibold text-tx">
                            {rev.broker_name || rev.name || "Analyst"}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold font-mono ${
                                isApply
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                  : isMay
                                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                  : "bg-red-500/10 text-red-400 border border-red-500/20"
                              }`}
                            >
                              {rev.recommendation || rev.rating || "Apply"}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            {rev.report_link || rev.link ? (
                              <a
                                href={rev.report_link || rev.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent hover:underline inline-flex items-center gap-1 font-semibold text-xs"
                              >
                                View Report <ExternalLink className="w-3 h-3" />
                              </a>
                            ) : (
                              <span className="text-mut text-xs">-</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
