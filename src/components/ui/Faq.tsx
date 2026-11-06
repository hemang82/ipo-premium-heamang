"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Card } from "./Card";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqProps {
  items: FaqItem[];
  title?: string;
  description?: string;
}

export function Faq({
  items,
  title = "Frequently Asked Questions",
  description = "Everything you need to know about IPO GMP, Kostak, and listing expectations.",
}: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="my-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-tx tracking-tightest">
          {title}
        </h2>
        {description && <p className="text-sm text-mut mt-2">{description}</p>}
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {items.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <Card
              key={idx}
              variant="default"
              className="overflow-hidden border-line"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus-visible:outline-none"
              >
                <span className="font-heading font-semibold text-tx text-base">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-mut shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-accent" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-sm text-mut leading-relaxed border-t border-line/40 pt-3">
                  {faq.answer}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </section>
  );
}
