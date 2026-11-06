"use client";

import React, { useState } from "react";

interface IpoLogoProps {
  src?: string;
  name: string;
  className?: string;
  imgClassName?: string;
  fallbackClassName?: string;
}

export function IpoLogo({
  src,
  name,
  className = "w-14 h-14 sm:w-16 sm:h-16 rounded-2xl",
  imgClassName = "object-contain p-1",
  fallbackClassName = "text-base sm:text-lg font-bold text-accent",
}: IpoLogoProps) {
  const [hasError, setHasError] = useState(false);

  const cleanName = (name || "").trim();
  const firstLetter = cleanName ? cleanName.charAt(0).toUpperCase() : "I";

  if (src && !hasError) {
    return (
      <div
        className={`bg-white dark:bg-card2 border border-line flex items-center justify-center shrink-0 overflow-hidden shadow-xs transition-transform ${className}`}
      >
        <img
          src={src}
          alt={cleanName}
          loading="lazy"
          decoding="async"
          className={`w-full h-full ${imgClassName}`}
          onError={() => setHasError(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={`bg-card2 border border-line flex items-center justify-center font-heading font-extrabold shrink-0 shadow-inner transition-transform ${className} ${fallbackClassName}`}
    >
      {firstLetter}
    </div>
  );
}
