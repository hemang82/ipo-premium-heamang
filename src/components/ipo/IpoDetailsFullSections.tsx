"use client";

import React, { useState } from "react";
import { formatINR } from "@/lib/format";
import {
  FileText,
  TrendingUp,
  BarChart3,
  ShieldAlert,
  Building2,
  Calendar,
  Layers,
  Award,
  CheckCircle2,
} from "lucide-react";

interface RawApiDataProps {
  raw: any;
  companyName: string;
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

export function IpoDetailsFullSections({ raw, companyName }: RawApiDataProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "subscription" | "financials" | "analysis" | "contact"
  >("overview");

  if (!raw) return null;

  // 1. Core Issue Details mapping
  const coreDetails = [
    {
      label: "IPO Date",
      value:
        raw.start_date && raw.end_date
          ? `${formatDate(raw.start_date)} to ${formatDate(raw.end_date)}`
          : "-",
    },
    { label: "Allotment Date", value: formatDate(raw.allotment_date) },
    { label: "Listing Date", value: formatDate(raw.listing_date) },
    {
      label: "Issue Price",
      value: raw.price_range
        ? `${raw.price_range} per share`
        : raw.issue_price
        ? `₹${raw.issue_price} per share`
        : "-",
    },
    {
      label: "Lot Size",
      value: raw.bid_lot ? `${formatNumber(raw.bid_lot)} Shares` : "-",
    },
    {
      label: "Face Value",
      value: raw.face_value ? `₹${raw.face_value} per share` : "-",
    },
    {
      label: "Total Issue Size",
      value:
        raw.issue_size || raw.issue_amount
          ? `${formatNumber(raw.issue_size)} Shares ${
              raw.issue_amount ? `(aggregating up to ₹${raw.issue_amount} Cr)` : ""
            }`
          : "-",
    },
    {
      label: "Fresh Issue",
      value:
        raw.fresh_issue_value && Number(raw.fresh_issue_value) > 0
          ? `${formatNumber(raw.fresh_issue_value)} Shares ${
              raw.fresh_issue_size ? `(₹${raw.fresh_issue_size} Cr)` : ""
            }`
          : "-",
    },
    {
      label: "Offer For Sale (OFS)",
      value:
        raw.offer_of_sale && Number(raw.offer_of_sale) > 0
          ? `${formatNumber(raw.offer_of_sale)} Shares ${
              raw.offer_of_sale_value ? `(₹${raw.offer_of_sale_value} Cr)` : ""
            }`
          : "-",
    },
    {
      label: "Listing At",
      value: raw.listing_at_group || raw.exchange || "BSE, NSE",
    },
    {
      label: "Pre-Issue Share Holding",
      value: formatNumber(raw.pre_issue_share_holding),
    },
    {
      label: "Post-Issue Share Holding",
      value: formatNumber(raw.post_issue_share_holding),
    },
    ...(raw.market_maker_offered && Number(raw.market_maker_offered) > 0
      ? [
          {
            label: "Market Maker Portion",
            value: `${formatNumber(raw.market_maker_offered)} Shares`,
          },
        ]
      : []),
  ];

  // Data sets
  const lotDesc = Array.isArray(raw.ipo_lot_description) ? raw.ipo_lot_description : [];
  const subDetail = Array.isArray(raw.ipo_subscription_detail) ? raw.ipo_subscription_detail : [];
  const dayWise = Array.isArray(raw.day_wise_subscription)
    ? raw.day_wise_subscription
    : Array.isArray(raw.subscription_history)
    ? raw.subscription_history
    : [];
  const reservation = Array.isArray(raw.ipo_reservation) ? raw.ipo_reservation : [];
  const kpis = Array.isArray(raw.key_performance_indicator) ? raw.key_performance_indicator : [];
  const finObj = raw.company_financial_data || {};
  const finRows = Array.isArray(finObj.financial_data) ? finObj.financial_data : [];
  const finAmountType = finObj.financial_amount_type || "In Crores";
  const leadManagers = raw.lead_managers || raw.lead_manager || "";

  // Registrar details
  const registrarDetail = raw.registrar_detail || raw.registrar || "";
  let regName = "";
  let regPhone = "";
  let regEmail = "";
  let regWebsite = "";

  if (typeof registrarDetail === "string") {
    const parts = registrarDetail.split(",").map((s) => s.trim());
    regName = parts[0] || registrarDetail;
    regPhone = parts[1] || "";
    regEmail = parts[2] || "";
    regWebsite = parts[3] || "";
  } else if (typeof registrarDetail === "object" && registrarDetail !== null) {
    regName = registrarDetail.registrar_name || registrarDetail.name || "";
    regPhone = registrarDetail.phone || registrarDetail.contact || "";
    regEmail = registrarDetail.email || "";
    regWebsite = registrarDetail.website || registrarDetail.web || "";
  }

  const companyAddr = raw.company_address || {};
  const docLinks = Array.isArray(raw.ipo_doc_link) ? raw.ipo_doc_link : [];

  // Vertical Navigation Tabs
  const navTabs = [
    { id: "overview", label: "Overview & Lots", icon: FileText, badge: `${coreDetails.length}` },
    { id: "subscription", label: "Subscription", icon: TrendingUp, badge: "Live" },
    { id: "financials", label: "Financials & KPI", icon: BarChart3, badge: "3Y Data" },
    { id: "analysis", label: "Strengths & Risks", icon: ShieldAlert, badge: null },
    { id: "contact", label: "Company & Registrar", icon: Building2, badge: null },
  ] as const;

  return (
    <div className="flex flex-col md:flex-row gap-5 items-start">
      {/* ========================================================
          VERTICAL NAVIGATION SIDEBAR (Desktop: Sticky Col | Mobile: Horizontal Scroll)
          ======================================================== */}
      <div className="w-full md:w-56 shrink-0 md:sticky md:top-20 z-10">
        <div className="rounded-card bg-card border border-line p-2 shadow-sm">
          <div className="hidden md:block px-3 py-2 text-xs font-bold text-mut uppercase tracking-wider border-b border-line/60 mb-1">
            Navigation Menu
          </div>

          <div className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-1 md:pb-0 scrollbar-none">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all whitespace-nowrap md:whitespace-normal text-left focus-visible:outline-none ${
                    isActive
                      ? "bg-accent text-accent-foreground shadow-sm"
                      : "text-mut hover:text-tx hover:bg-card2"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{tab.label}</span>
                  </div>

                  {tab.badge && (
                    <span
                      className={`hidden md:inline-block px-2 py-0.5 rounded text-xs font-mono ${
                        isActive
                          ? "bg-black/20 text-accent-foreground font-bold"
                          : "bg-card2 text-mut border border-line"
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================
          MAIN CONTENT AREA (Switches instantly without long scroll)
          ======================================================== */}
      <div className="flex-1 w-full min-w-0 space-y-6">
        {/* ================= TAB 1: OVERVIEW & LOTS ================= */}
        {activeTab === "overview" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Core Details Table */}
            <section className="rounded-card bg-card border border-line p-5 md:p-6 shadow-sm">
              <h2 className="text-base md:text-lg font-heading font-extrabold text-tx tracking-tightest mb-4 pb-3 border-b border-line flex items-center justify-between">
                <span>{companyName} IPO Details</span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-accent/15 text-accent border border-accent/25">
                  Core Specifications
                </span>
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs md:text-sm text-left">
                  <tbody className="divide-y divide-line/40">
                    {coreDetails.map((item, idx) => (
                      <tr key={idx} className="hover:bg-card2/50 transition-colors">
                        <td className="py-2.5 pr-4 text-mut font-medium w-1/3 min-w-[140px]">
                          {item.label}
                        </td>
                        <td className="py-2.5 pl-4 text-tx font-semibold tabular-nums">
                          {item.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Lot(s) Distribution */}
            {lotDesc.length > 0 && (
              <section className="rounded-card bg-card border border-line p-5 md:p-6 shadow-sm">
                <h2 className="text-base md:text-lg font-heading font-extrabold text-tx tracking-tightest mb-4 pb-3 border-b border-line">
                  Lot(s) Distribution
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs md:text-sm text-left">
                    <thead>
                      <tr className="border-b border-line text-mut uppercase font-semibold text-xs tracking-wider bg-card2/40">
                        <th className="py-2.5 px-3">Application</th>
                        <th className="py-2.5 px-3 text-right">Lots</th>
                        <th className="py-2.5 px-3 text-right">Shares</th>
                        <th className="py-2.5 px-3 text-right">Amount (₹)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line/40">
                      {lotDesc.map((item: any, idx: number) => {
                        let appLabel = item.category;
                        if (item.category === "RETAIL") appLabel = "Retail (Min)";
                        else if (item.category === "sHNI") appLabel = "sHNI (Min)";
                        else if (item.category === "bHNI") appLabel = "bHNI (Min)";

                        return (
                          <tr key={idx} className="hover:bg-card2/50 transition-colors">
                            <td className="py-2.5 px-3 font-semibold text-tx">{appLabel}</td>
                            <td className="py-2.5 px-3 text-right tabular-nums text-tx font-mono">
                              {item["lot(s)"] || item.lots || 1}
                            </td>
                            <td className="py-2.5 px-3 text-right tabular-nums text-tx font-mono">
                              {formatNumber(item.qty || item.shares)}
                            </td>
                            <td className="py-2.5 px-3 text-right tabular-nums font-bold text-accent">
                              {formatINR(Number(item.amount) || 0)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* IPO Reservation */}
            {reservation.length > 0 && (
              <section className="rounded-card bg-card border border-line p-5 md:p-6 shadow-sm">
                <h2 className="text-base md:text-lg font-heading font-extrabold text-tx tracking-tightest mb-4 pb-3 border-b border-line">
                  IPO Reservation
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs md:text-sm text-left">
                    <thead>
                      <tr className="border-b border-line text-mut uppercase font-semibold text-xs tracking-wider bg-card2/40">
                        <th className="py-2.5 px-3">Investor Category</th>
                        <th className="py-2.5 px-3 text-right">Shares Offered</th>
                        <th className="py-2.5 px-3 text-right">Percentage (%)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line/40">
                      {reservation.map((item: any, idx: number) => (
                        <tr key={idx} className="hover:bg-card2/50 transition-colors">
                          <td className="py-2.5 px-3 font-semibold text-tx">
                            {item.investor_category || item.category || "-"}
                          </td>
                          <td className="py-2.5 px-3 text-right tabular-nums text-tx font-mono">
                            {formatNumber(item.no_of_shares || item.shares)}
                          </td>
                          <td className="py-2.5 px-3 text-right tabular-nums font-bold text-accent">
                            {item.shares_offered
                              ? `${item.shares_offered}%`
                              : item.share_percentage
                              ? `${item.share_percentage}%`
                              : "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
          </div>
        )}

        {/* ================= TAB 2: SUBSCRIPTION ================= */}
        {activeTab === "subscription" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Live Demand by Category */}
            {subDetail.length > 0 && (
              <section className="rounded-card bg-card border border-line p-5 md:p-6 shadow-sm">
                <h2 className="text-base md:text-lg font-heading font-extrabold text-tx tracking-tightest mb-4 pb-3 border-b border-line">
                  Live Subscription Demand (No. of Shares)
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs md:text-sm text-left">
                    <thead>
                      <tr className="border-b border-line text-mut uppercase font-semibold text-xs tracking-wider bg-card2/40">
                        <th className="py-2.5 px-3">Category</th>
                        <th className="py-2.5 px-3 text-right">Offered Shares</th>
                        <th className="py-2.5 px-3 text-right">Applied Shares</th>
                        <th className="py-2.5 px-3 text-right">Subscription (Times)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line/40">
                      {subDetail.map((item: any, idx: number) => (
                        <tr key={idx} className="hover:bg-card2/50 transition-colors">
                          <td className="py-2.5 px-3 font-semibold text-tx">{item.category}</td>
                          <td className="py-2.5 px-3 text-right tabular-nums text-mut font-mono">
                            {formatNumber(item.offered)}
                          </td>
                          <td className="py-2.5 px-3 text-right tabular-nums text-mut font-mono">
                            {formatNumber(item.applied)}
                          </td>
                          <td className="py-2.5 px-3 text-right tabular-nums font-bold text-accent">
                            {item.times !== undefined ? `${Number(item.times).toFixed(2)}x` : "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Day-Wise Subscription Table */}
            {dayWise.length > 0 && (
              <section className="rounded-card bg-card border border-line p-5 md:p-6 shadow-sm">
                <h2 className="text-base md:text-lg font-heading font-extrabold text-tx tracking-tightest mb-4 pb-3 border-b border-line">
                  Day Wise Bidding Progression
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs md:text-sm text-left">
                    <thead>
                      <tr className="border-b border-line text-mut uppercase font-semibold text-xs tracking-wider bg-card2/40">
                        <th className="py-2.5 px-3">Day</th>
                        <th className="py-2.5 px-3">Date</th>
                        <th className="py-2.5 px-3 text-right">QIB</th>
                        <th className="py-2.5 px-3 text-right">NII</th>
                        <th className="py-2.5 px-3 text-right">Retail</th>
                        <th className="py-2.5 px-3 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line/40">
                      {dayWise.map((entry: any, idx: number) => {
                        const arr = entry.ipo_subscription_detail || [];
                        const getCat = (name: string) => {
                          const f = arr.find((x: any) =>
                            String(x.category || "").toUpperCase().includes(name.toUpperCase())
                          );
                          return f ? `${Number(f.times).toFixed(2)}x` : "-";
                        };

                        return (
                          <tr key={idx} className="hover:bg-card2/50 transition-colors">
                            <td className="py-2.5 px-3 font-semibold text-tx font-mono">
                              Day {idx + 1}
                            </td>
                            <td className="py-2.5 px-3 text-mut font-medium">
                              {formatDate(entry.created_at || entry.date)}
                            </td>
                            <td className="py-2.5 px-3 text-right tabular-nums text-tx font-mono">
                              {getCat("QIB")}
                            </td>
                            <td className="py-2.5 px-3 text-right tabular-nums text-tx font-mono">
                              {getCat("NIB")}
                            </td>
                            <td className="py-2.5 px-3 text-right tabular-nums text-tx font-mono">
                              {getCat("RETAIL")}
                            </td>
                            <td className="py-2.5 px-3 text-right tabular-nums font-bold text-accent font-mono">
                              {getCat("TOTAL")}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
          </div>
        )}

        {/* ================= TAB 3: FINANCIALS & KPI ================= */}
        {activeTab === "financials" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* KPI Metrics */}
            {kpis.length > 1 && (
              <section className="rounded-card bg-card border border-line p-5 md:p-6 shadow-sm">
                <h2 className="text-base md:text-lg font-heading font-extrabold text-tx tracking-tightest mb-4 pb-3 border-b border-line">
                  {companyName} Key Performance Indicators (KPI)
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs md:text-sm text-left">
                    <thead>
                      <tr className="border-b border-line text-mut uppercase font-semibold text-xs tracking-wider bg-card2/40">
                        <th className="py-2.5 px-3">Period</th>
                        <th className="py-2.5 px-3 text-right">EPS (₹)</th>
                        <th className="py-2.5 px-3 text-right">ROCE (%)</th>
                        <th className="py-2.5 px-3 text-right">RONW (%)</th>
                        <th className="py-2.5 px-3 text-right">Pre-IPO P/E</th>
                        <th className="py-2.5 px-3 text-right">Post-IPO P/E</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line/40">
                      {kpis.slice(1).map((kpiItem: any, idx: number) => (
                        <tr key={idx} className="hover:bg-card2/50 transition-colors">
                          <td className="py-2.5 px-3 font-semibold text-tx">{kpiItem.kpi}</td>
                          <td className="py-2.5 px-3 text-right tabular-nums text-tx font-mono">
                            {kpiItem.eps || "-"}
                          </td>
                          <td className="py-2.5 px-3 text-right tabular-nums text-tx font-mono">
                            {kpiItem.roec ? `${kpiItem.roec}%` : "-"}
                          </td>
                          <td className="py-2.5 px-3 text-right tabular-nums text-tx font-mono">
                            {kpiItem.ronw ? `${kpiItem.ronw}%` : "-"}
                          </td>
                          <td className="py-2.5 px-3 text-right tabular-nums font-mono text-accent">
                            {kpiItem.pre_ipo && kpiItem.pre_ipo !== "0"
                              ? `${kpiItem.pre_ipo}x`
                              : "-"}
                          </td>
                          <td className="py-2.5 px-3 text-right tabular-nums font-bold text-accent font-mono">
                            {kpiItem.post_ipo && kpiItem.post_ipo !== "0"
                              ? `${kpiItem.post_ipo}x`
                              : "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Financial Performance */}
            {finRows.length > 1 && (
              <section className="rounded-card bg-card border border-line p-5 md:p-6 shadow-sm">
                <h2 className="text-base md:text-lg font-heading font-extrabold text-tx tracking-tightest mb-4 pb-3 border-b border-line flex items-center justify-between">
                  <span>Company Financials</span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-card2 text-accent border border-line">
                    {finAmountType}
                  </span>
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs md:text-sm text-left">
                    <thead>
                      <tr className="border-b border-line text-mut uppercase font-semibold text-xs tracking-wider bg-card2/40">
                        <th className="py-2.5 px-3">Particulars</th>
                        {finRows.slice(1).map((col: any, i: number) => (
                          <th key={i} className="py-2.5 px-3 text-right">
                            {col.period_ended || `Period ${i + 1}`}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line/40">
                      <tr className="hover:bg-card2/50 transition-colors">
                        <td className="py-2.5 px-3 font-semibold text-tx">Assets</td>
                        {finRows.slice(1).map((c: any, i: number) => (
                          <td key={i} className="py-2.5 px-3 text-right tabular-nums font-mono text-tx">
                            {c.assets || "-"}
                          </td>
                        ))}
                      </tr>
                      <tr className="hover:bg-card2/50 transition-colors">
                        <td className="py-2.5 px-3 font-semibold text-tx">Total Revenue</td>
                        {finRows.slice(1).map((c: any, i: number) => (
                          <td
                            key={i}
                            className="py-2.5 px-3 text-right tabular-nums font-bold font-mono text-accent"
                          >
                            {c.revenue || "-"}
                          </td>
                        ))}
                      </tr>
                      <tr className="hover:bg-card2/50 transition-colors">
                        <td className="py-2.5 px-3 font-semibold text-tx">Profit After Tax (PAT)</td>
                        {finRows.slice(1).map((c: any, i: number) => (
                          <td
                            key={i}
                            className="py-2.5 px-3 text-right tabular-nums font-bold font-mono text-up"
                          >
                            {c.profit_after_tax || "-"}
                          </td>
                        ))}
                      </tr>
                      <tr className="hover:bg-card2/50 transition-colors">
                        <td className="py-2.5 px-3 font-semibold text-tx">Net Worth</td>
                        {finRows.slice(1).map((c: any, i: number) => (
                          <td key={i} className="py-2.5 px-3 text-right tabular-nums font-mono text-tx">
                            {c.net_worth || "-"}
                          </td>
                        ))}
                      </tr>
                      <tr className="hover:bg-card2/50 transition-colors">
                        <td className="py-2.5 px-3 font-semibold text-tx">Reserves and Surplus</td>
                        {finRows.slice(1).map((c: any, i: number) => (
                          <td key={i} className="py-2.5 px-3 text-right tabular-nums font-mono text-tx">
                            {c.reserves_and_surpluse || "-"}
                          </td>
                        ))}
                      </tr>
                      <tr className="hover:bg-card2/50 transition-colors">
                        <td className="py-2.5 px-3 font-semibold text-tx">Total Borrowing</td>
                        {finRows.slice(1).map((c: any, i: number) => (
                          <td key={i} className="py-2.5 px-3 text-right tabular-nums font-mono text-dn">
                            {c.total_borrowing || "-"}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            )}
          </div>
        )}

        {/* ================= TAB 4: ANALYSIS (STRENGTHS & RISKS) ================= */}
        {activeTab === "analysis" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {raw.company_strenght && (
                <section className="rounded-card bg-card border border-line p-5 shadow-sm">
                  <h2 className="text-base md:text-lg font-heading font-extrabold text-up tracking-tightest mb-3 pb-2 border-b border-line flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>{companyName} Strength Factors</span>
                  </h2>
                  <div
                    className="text-xs md:text-sm text-tx/85 leading-relaxed prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: raw.company_strenght }}
                  />
                </section>
              )}

              {raw.company_weakness && (
                <section className="rounded-card bg-card border border-line p-5 shadow-sm">
                  <h2 className="text-base md:text-lg font-heading font-extrabold text-dn tracking-tightest mb-3 pb-2 border-b border-line flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5" />
                    <span>{companyName} Risk Factors</span>
                  </h2>
                  <div
                    className="text-xs md:text-sm text-tx/85 leading-relaxed prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: raw.company_weakness }}
                  />
                </section>
              )}
            </div>

            {/* Promoters */}
            {raw.company_promoter && (
              <section className="rounded-card bg-card border border-line p-5 shadow-sm">
                <h2 className="text-base md:text-lg font-heading font-extrabold text-tx tracking-tightest mb-3 pb-2 border-b border-line flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent" />
                  <span>Promoter(s)</span>
                </h2>
                <div
                  className="text-xs md:text-sm text-tx/85 leading-relaxed prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: raw.company_promoter }}
                />
              </section>
            )}
          </div>
        )}

        {/* ================= TAB 5: COMPANY PROFILE & CONTACT ================= */}
        {activeTab === "contact" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* About Narrative */}
            {raw.about_the_company && (
              <section className="rounded-card bg-card border border-line p-5 shadow-sm">
                <h2 className="text-base md:text-lg font-heading font-extrabold text-tx tracking-tightest mb-3 pb-2 border-b border-line">
                  About {companyName}
                </h2>
                <div
                  className="text-xs md:text-sm text-tx/85 leading-relaxed prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: raw.about_the_company }}
                />
              </section>
            )}

            {/* Parties: Lead Managers & Registrar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {leadManagers && (
                <div className="rounded-card bg-card border border-line p-5 shadow-sm">
                  <h3 className="font-heading font-bold text-base text-tx mb-3 pb-2 border-b border-line">
                    Lead Manager(s)
                  </h3>
                  <p className="text-xs md:text-sm text-tx/90 font-medium leading-relaxed">
                    {leadManagers}
                  </p>
                </div>
              )}

              {regName && (
                <div className="rounded-card bg-card border border-line p-5 shadow-sm">
                  <h3 className="font-heading font-bold text-base text-tx mb-3 pb-2 border-b border-line">
                    Registrar
                  </h3>
                  <div className="space-y-1 text-xs md:text-sm text-tx/90">
                    <p className="font-bold text-tx">{regName}</p>
                    {regPhone && (
                      <p className="text-mut">
                        Phone: <span className="text-tx font-mono">{regPhone}</span>
                      </p>
                    )}
                    {regEmail && (
                      <p className="text-mut">
                        Email: <span className="text-accent">{regEmail}</span>
                      </p>
                    )}
                    {regWebsite && (
                      <p className="text-mut">
                        Website:{" "}
                        <a
                          href={regWebsite.startsWith("http") ? regWebsite : `https://${regWebsite}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent underline font-medium hover:brightness-110"
                        >
                          {regWebsite}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Address */}
            {companyAddr.address && (
              <div className="rounded-card bg-card border border-line p-5 shadow-sm">
                <h3 className="font-heading font-bold text-base text-tx mb-3 pb-2 border-b border-line">
                  Company Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs md:text-sm">
                  <div>
                    <p className="text-mut font-medium mb-1">Corporate Office:</p>
                    <p className="text-tx leading-relaxed">{companyAddr.address}</p>
                  </div>
                  <div className="space-y-1">
                    {companyAddr.Phone && (
                      <p className="text-mut">
                        Phone: <span className="text-tx font-mono">{companyAddr.Phone}</span>
                      </p>
                    )}
                    {companyAddr.Email && (
                      <p className="text-mut">
                        Email: <span className="text-accent">{companyAddr.Email}</span>
                      </p>
                    )}
                    {companyAddr.Website && (
                      <p className="text-mut">
                        Website:{" "}
                        <a
                          href={companyAddr.Website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent underline font-medium hover:brightness-110"
                        >
                          {companyAddr.Website}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* DRHP / RHP Docs */}
            {docLinks.length > 0 && (
              <div className="rounded-card bg-card border border-line p-5 shadow-sm">
                <h3 className="font-heading font-bold text-base text-tx mb-3 pb-2 border-b border-line">
                  Official Documents (Prospectus)
                </h3>
                <div className="flex items-center gap-3 flex-wrap">
                  {docLinks.map((doc: any, i: number) => (
                    <a
                      key={i}
                      href={doc.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-btn bg-card2 border border-line text-xs font-semibold text-tx hover:border-accent hover:text-accent transition-all shadow-sm"
                    >
                      <span>📄</span>
                      <span>{doc.label || doc.lable || "Download Prospectus (PDF)"}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
