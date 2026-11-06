"use client";

import React, { useMemo } from "react";
import { ShieldAlert, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";

interface StrengthsRisksProps {
  strengths: string[];
  risks: string[];
}

/**
 * Parses raw text or HTML strings (e.g. Quill/rich-text `<ol><li>...`)
 * into clean, readable bullet points.
 */
function cleanBulletList(items: string[]): { title?: string; body: string }[] {
  if (!items || items.length === 0) return [];

  const rawCombined = items.join("\n");

  // Check if string contains HTML tags
  if (/<[a-z][\s\S]*>/i.test(rawCombined)) {
    // If it contains <li> tags, split by <li>
    const liMatches = rawCombined.match(/<li[^>]*>([\s\S]*?)<\/li>/gi);
    if (liMatches && liMatches.length > 0) {
      return liMatches.map((liHtml) => {
        // Extract <strong> if present for bold title
        const strongMatch = liHtml.match(/<strong[^>]*>([\s\S]*?)<\/strong>/i);
        const title = strongMatch ? strongMatch[1].replace(/<[^>]+>/g, "").trim() : undefined;

        // Strip all HTML tags
        let cleanText = liHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
        if (title && cleanText.startsWith(title)) {
          cleanText = cleanText.slice(title.length).replace(/^[:\s-]+/, "").trim();
        }

        return { title, body: cleanText };
      }).filter((item) => item.title || item.body);
    }

    // Generic HTML cleanup
    const cleanPlain = rawCombined.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    return [{ body: cleanPlain }];
  }

  // Plain strings
  return items.map((item) => {
    const parts = item.split(":");
    if (parts.length > 1 && parts[0].length < 60) {
      return {
        title: parts[0].trim(),
        body: parts.slice(1).join(":").trim(),
      };
    }
    return { body: item.trim() };
  }).filter((item) => item.title || item.body);
}

export function StrengthsRisks({ strengths, risks }: StrengthsRisksProps) {
  const parsedStrengths = useMemo(() => cleanBulletList(strengths), [strengths]);
  const parsedRisks = useMemo(() => cleanBulletList(risks), [risks]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Strengths Card */}
      <Card variant="default" className="p-5 border-line">
        <div className="flex items-center gap-2 mb-4 text-up font-heading font-bold text-sm">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>Key Strengths & Growth Drivers</span>
        </div>
        <ul className="space-y-3 text-xs text-tx/90 leading-relaxed">
          {parsedStrengths.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="text-up font-bold text-base leading-none mt-0.5">•</span>
              <div>
                {item.title && (
                  <strong className="text-tx font-semibold">{item.title}: </strong>
                )}
                <span className="text-tx/85">{item.body}</span>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      {/* Risks Card */}
      <Card variant="default" className="p-5 border-line">
        <div className="flex items-center gap-2 mb-4 text-dn font-heading font-bold text-sm">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>Key Risks & Challenges</span>
        </div>
        <ul className="space-y-3 text-xs text-tx/90 leading-relaxed">
          {parsedRisks.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="text-dn font-bold text-base leading-none mt-0.5">•</span>
              <div>
                {item.title && (
                  <strong className="text-tx font-semibold">{item.title}: </strong>
                )}
                <span className="text-tx/85">{item.body}</span>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
