import React from "react";
import { IpoStatus, BoardType } from "@/lib/types";

interface BadgeProps {
  children?: React.ReactNode;
  status?: IpoStatus | BoardType | string;
  variant?: "outline" | "solid";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({ children, status, variant = "outline", size = "sm", className = "" }: BadgeProps) {
  const content = children || status;

  let colorClasses = "bg-card2 text-tx border-line";

  if (status === "Open") {
    colorClasses = "bg-up/10 text-up border-up/30";
  } else if (status === "Upcoming") {
    colorClasses = "bg-accent/10 text-accent border-accent/30";
  } else if (status === "Closed") {
    colorClasses = "bg-mut/10 text-mut border-line";
  } else if (status === "Listed") {
    colorClasses = "bg-blue-500/10 text-blue-400 border-blue-500/30";
  } else if (status === "SME" || status === "BSE SME" || status === "NSE Emerge") {
    colorClasses = "bg-purple-500/10 text-purple-400 border-purple-500/30";
  }

  const sizeClasses = size === "sm" ? "text-xs px-2.5 py-0.5" : "text-sm px-3 py-1";

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${sizeClasses} ${colorClasses} ${className}`}
    >
      {content}
    </span>
  );
}
