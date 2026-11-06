"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9 rounded-full bg-card2 border border-line" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      className="w-9 h-9 flex items-center justify-center rounded-full bg-card2 border border-line text-tx hover:text-accent hover:border-accent/40 transition-colors focus-visible:outline-none"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-accent transition-transform duration-200" />
      ) : (
        <Moon className="w-4 h-4 text-accent transition-transform duration-200" />
      )}
    </button>
  );
}
