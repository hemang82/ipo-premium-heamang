/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      fontSize: {
        // Enforce minimum 14px everywhere:
        // 'xs' maps to 14px (0.875rem) so no text in the project is ever below 14px
        xs: ["0.875rem", { lineHeight: "1.25rem" }], // 14px
        sm: ["0.9375rem", { lineHeight: "1.375rem" }], // 15px
        base: ["1rem", { lineHeight: "1.5rem" }], // 16px
      },
      colors: {
        bg: "var(--bg)",
        card: "var(--card)",
        card2: "var(--card2)",
        line: "var(--line)",
        tx: "var(--tx)",
        mut: "var(--mut)",
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--on-accent)",
        },
        up: "var(--up)",
        dn: "var(--dn)",
        glow: "var(--glow)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      borderRadius: {
        card: "19px",
        btn: "12px",
      },
      letterSpacing: {
        tightest: "-0.025em",
      },
    },
  },
  plugins: [],
};
