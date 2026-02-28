import type { Config } from "tailwindcss";

const config: Config = {
  // 1. CONTENT SCANNING
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  // 2. DESIGN SYSTEM CALIBRATION
  theme: {
    extend: {
      colors: {
        // RGRM Signature Palette
        "rgrm-red": "#FF0000", // The primary action/diagnostic color
        "rgrm-black": "#000000",
        "rgrm-gray": "#1A1A1A",
        "rgrm-light": "#F5F5F5",
      },
      fontFamily: {
        // Technical typography mapping
        mono: ["var(--font-geist-mono)", "Menlo", "monospace"],
        sans: ["var(--font-geist-sans)", "Inter", "sans-serif"],
      },
      letterSpacing: {
        // Brutalist tracking adjustments
        tightest: "-.075em",
        widest: ".25em",
        registry: ".5em",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },

  // 3. UTILITY EXTENSIONS
  plugins: [],
};

export default config;
