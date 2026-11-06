import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "subtle" | "interactive";
  className?: string;
}

export function Card({ children, variant = "default", className = "", ...props }: CardProps) {
  const baseStyles = "rounded-card border transition-all duration-200";
  
  const variantStyles = {
    default: "bg-card border-line shadow-sm",
    subtle: "bg-card2 border-line/60",
    interactive: "bg-card border-line hover:border-accent/40 hover:shadow-md cursor-pointer",
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
}
