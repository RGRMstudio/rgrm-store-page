import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // McQueen-inspired color palette
      colors: {
        black: "#000000",
        charcoal: "#0a0a0a",
        darkGray: "#1a1a1a",
        accentRed: "#BC2026",
        concreteGray: "#2a2a2a",
        boneWhite: "#f5f5f5",
      },
      // Typography
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      // Letter spacing for that editorial look
      letterSpacing: {
        tighter: "-0.02em",
        tight: "-0.01em",
        normal: "0",
        wide: "0.1em",
        wider: "0.2em",
        widest: "0.3em",
      },
      // Animation easing (McQueen-style dramatic)
      transitionTimingFunction: {
        "dramatic": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      // Font sizes for massive headlines
      fontSize: {
        "7xl": "5rem",
        "8xl": "7rem",
        "9xl": "9rem",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
export default config;
