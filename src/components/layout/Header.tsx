"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import {
  Menu,
  X,
  Sparkles,
  TrendingUp,
  Newspaper,
  Calculator,
  ChevronDown,
  Zap,
  Clock,
  CheckCircle2,
  BarChart3,
  ShieldCheck,
  Layers,
  HelpCircle,
} from "lucide-react";

// ─── IPO dropdown sub-links ───────────────────────────────────────────────────
const ipoSubLinks = [
  {
    label: "Live IPO",
    href: "/ipo/live",
    icon: Zap,
    desc: "Currently open for bidding",
    badge: "Live",
    badgeClass: "bg-emerald-500/15 text-emerald-500",
    dotClass: "bg-emerald-500 animate-pulse",
  },
  {
    label: "Upcoming IPO",
    href: "/ipo/upcoming",
    icon: Clock,
    desc: "Opening soon – mark your dates",
    badge: null,
    badgeClass: "",
    dotClass: "",
  },
  {
    label: "Listed IPO",
    href: "/ipo/listed",
    icon: CheckCircle2,
    desc: "Recent listings & performance",
    badge: null,
    badgeClass: "",
    dotClass: "",
  },
];

// ─── More dropdown sub-links (Articles, Calculator & FAQs) ─────────────────────
const moreSubLinks = [
  {
    label: "IPO News",
    href: "/news",
    icon: Newspaper,
    desc: "Real-time IPO news, market analysis & DRHP updates",
  },
  {
    label: "Articles & Guides",
    href: "/articles",
    icon: Newspaper,
    desc: "In-depth IPO analysis, reviews & guides",
  },
  {
    label: "IPO Lot Calculator",
    href: "/tools/lot-calculator",
    icon: Calculator,
    desc: "Calculate retail & HNI lot investment amounts",
  },
  {
    label: "IPO FAQs",
    href: "/faq",
    icon: HelpCircle,
    desc: "Complete Q&A on GMP, Allotment & SEBI rules",
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ipoDropdownOpen, setIpoDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const pathname = usePathname();

  const ipoDropdownRef = useRef<HTMLDivElement>(null);
  const moreDropdownRef = useRef<HTMLDivElement>(null);

  // Close all menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setIpoDropdownOpen(false);
    setMoreDropdownOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ipoDropdownRef.current && !ipoDropdownRef.current.contains(e.target as Node)) {
        setIpoDropdownOpen(false);
      }
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(e.target as Node)) {
        setMoreDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isIpoActive =
    pathname === "/" ||
    pathname?.startsWith("/ipo/live") ||
    pathname?.startsWith("/ipo/upcoming") ||
    pathname?.startsWith("/ipo/listed");

  const isAllotmentActive = pathname === "/allotment" || pathname?.startsWith("/allotment");
  const isNewsActive = pathname?.startsWith("/news");

  const isMoreActive =
    pathname?.startsWith("/articles") ||
    pathname === "/tools/lot-calculator" ||
    pathname === "/faq";

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur-md border-b border-line shadow-xs">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          {/* 1. Logo */}
          <Link href="/" className="flex items-center gap-2.5 group focus-visible:outline-none shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-[#D49882] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <div className="w-3.5 h-3.5 rotate-45 bg-[#2A130B] rounded-[2px]" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-lg text-tx tracking-tightest leading-none">
                ipo<span className="text-accent">-premium</span>
              </span>
              <span className="text-[11px] text-mut font-medium uppercase tracking-wider mt-0.5">
                India Live Tracker
              </span>
            </div>
          </Link>

          {/* 2. Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">

            {/* A. IPO Dropdown */}
            <div ref={ipoDropdownRef} className="relative">
              <button
                onClick={() => {
                  setIpoDropdownOpen((o) => !o);
                  setMoreDropdownOpen(false);
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
                  isIpoActive
                    ? "text-accent font-semibold bg-accent/8"
                    : "text-tx hover:text-accent hover:bg-card2"
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                IPO
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${ipoDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown Panel */}
              {ipoDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-card border border-line rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {/* Top: Home link */}
                  <Link
                    href="/"
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all mb-1 ${
                      pathname === "/"
                        ? "bg-accent/10 text-accent font-semibold"
                        : "text-tx hover:bg-card2 hover:text-accent"
                    }`}
                  >
                    <Layers className="w-4 h-4 shrink-0 text-accent" />
                    <div>
                      <div className="font-semibold text-sm">All IPOs</div>
                      <div className="text-xs text-mut font-normal">Live, Upcoming & Listed</div>
                    </div>
                  </Link>

                  <div className="h-px bg-line/60 my-1.5" />

                  {/* Sub-links */}
                  {ipoSubLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname?.startsWith(link.href);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all ${
                          isActive
                            ? "bg-accent/10 text-accent font-semibold"
                            : "text-tx hover:bg-card2 hover:text-accent"
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0 text-mut" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm flex items-center gap-1.5">
                            {link.label}
                            {link.badge && (
                              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold ${link.badgeClass}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${link.dotClass}`} />
                                {link.badge}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-mut font-normal truncate">{link.desc}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* B. IPO GMP */}
            <Link
              href="/ipo-gmp"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
                pathname === "/ipo-gmp"
                  ? "text-accent font-bold bg-accent/8"
                  : "text-tx hover:text-accent hover:bg-card2 font-semibold"
              }`}
            >
              IPO GMP
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </Link>

            {/* C. Subscription */}
            <Link
              href="/subscription"
              className={`px-3 py-2 rounded-xl transition-all ${
                pathname === "/subscription"
                  ? "text-accent font-semibold bg-accent/8"
                  : "text-tx hover:text-accent hover:bg-card2"
              }`}
            >
              Subscription
            </Link>

            {/* D. Allotment Status (Internal Page - No external redirect!) */}
            <Link
              href="/allotment"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
                isAllotmentActive
                  ? "text-accent font-semibold bg-accent/8"
                  : "text-tx hover:text-accent hover:bg-card2"
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Allotment
            </Link>

            {/* E. IPO News */}
            <Link
              href="/news"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
                isNewsActive
                  ? "text-accent font-semibold bg-accent/8"
                  : "text-tx hover:text-accent hover:bg-card2"
              }`}
            >
              <Newspaper className="w-4 h-4" />
              News
            </Link>

            {/* F. More Dropdown (Articles & Calculator) */}
            <div ref={moreDropdownRef} className="relative">
              <button
                onClick={() => {
                  setMoreDropdownOpen((o) => !o);
                  setIpoDropdownOpen(false);
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
                  isMoreActive
                    ? "text-accent font-semibold bg-accent/8"
                    : "text-tx hover:text-accent hover:bg-card2"
                }`}
              >
                More
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${moreDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* More Dropdown Panel */}
              {moreDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-card border border-line rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {moreSubLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname?.startsWith(link.href);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all ${
                          isActive
                            ? "bg-accent/10 text-accent font-semibold"
                            : "text-tx hover:bg-card2 hover:text-accent"
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0 text-accent" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm">{link.label}</div>
                          <div className="text-xs text-mut font-normal truncate">{link.desc}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

          </nav>

          {/* 3. Right: Theme Toggle & Mobile Hamburger */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile menu"
              className="md:hidden p-2 rounded-xl text-tx hover:bg-card2 border border-line transition-colors focus-visible:outline-none"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          MOBILE SLIDE-OVER DRAWER
         ========================================================================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          {/* Backdrop */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
          />

          {/* Slide-out Panel */}
          <div className="fixed inset-y-0 right-0 w-[290px] sm:w-[320px] bg-card border-l border-line shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">

            {/* Panel Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-line shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-[#D49882] flex items-center justify-center shadow-xs">
                  <div className="w-3 h-3 rotate-45 bg-[#2A130B] rounded-[2px]" />
                </div>
                <span className="font-heading font-extrabold text-base text-tx">
                  ipo<span className="text-accent">-premium</span>
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close mobile menu"
                className="p-1.5 rounded-lg text-mut hover:text-tx hover:bg-card2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Nav Links */}
            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">

              {/* Section 1: IPO Categories */}
              <p className="text-[11px] font-bold text-mut uppercase tracking-widest px-3 pb-1 pt-1">
                IPO Categories
              </p>

              {/* All IPOs (Home) */}
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  pathname === "/"
                    ? "bg-accent/15 text-accent border border-accent/20"
                    : "text-tx hover:bg-card2/80"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Layers className={`w-4 h-4 ${pathname === "/" ? "text-accent" : "text-mut"}`} />
                  <span>All IPOs</span>
                </div>
              </Link>

              {/* Live / Upcoming / Listed */}
              {ipoSubLinks.map((item) => {
                const Icon = item.icon;
                const isActive = pathname?.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-accent/15 text-accent border border-accent/20"
                        : "text-tx hover:bg-card2/80"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? "text-accent" : "text-mut"}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold ${item.badgeClass}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${item.dotClass}`} />
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}

              {/* Section 2: Real-Time Trackers */}
              <div className="pt-3">
                <p className="text-[11px] font-bold text-mut uppercase tracking-widest px-3 pb-1">
                  Trackers
                </p>
              </div>

              {/* IPO GMP */}
              <Link
                href="/ipo-gmp"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  pathname === "/ipo-gmp"
                    ? "bg-accent/15 text-accent border border-accent/20"
                    : "text-tx hover:bg-card2/80"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Sparkles className={`w-4 h-4 ${pathname === "/ipo-gmp" ? "text-accent" : "text-mut"}`} />
                  <span>IPO GMP</span>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-500/15 text-emerald-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </span>
              </Link>

              {/* Subscription */}
              <Link
                href="/subscription"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  pathname === "/subscription"
                    ? "bg-accent/15 text-accent border border-accent/20"
                    : "text-tx hover:bg-card2/80"
                }`}
              >
                <div className="flex items-center gap-3">
                  <BarChart3 className={`w-4 h-4 ${pathname === "/subscription" ? "text-accent" : "text-mut"}`} />
                  <span>Subscription Status</span>
                </div>
              </Link>

              {/* Allotment Status (Internal Link) */}
              <Link
                href="/allotment"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isAllotmentActive
                    ? "bg-accent/15 text-accent border border-accent/20"
                    : "text-tx hover:bg-card2/80"
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Allotment Status</span>
                </div>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-500">
                  Direct
                </span>
              </Link>

              {/* Section 3: More (Articles & Calculator) */}
              <div className="pt-3">
                <p className="text-[11px] font-bold text-mut uppercase tracking-widest px-3 pb-1">
                  More Resources
                </p>
              </div>

              {moreSubLinks.map((item) => {
                const Icon = item.icon;
                const isActive = pathname?.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-accent/15 text-accent border border-accent/20"
                        : "text-tx hover:bg-card2/80"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? "text-accent" : "text-mut"}`} />
                      <span>{item.label}</span>
                    </div>
                  </Link>
                );
              })}

            </nav>

            {/* Panel Footer */}
            <div className="px-5 py-4 border-t border-line shrink-0 text-xs text-mut space-y-1.5">
              <div className="flex items-center justify-between">
                <span>Market Hours</span>
                <span className="font-semibold text-tx">10 AM – 5 PM IST</span>
              </div>
              <p className="text-[11px] text-mut/80 leading-relaxed">
                India's real-time IPO GMP, Subscription &amp; Allotment tracker.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
