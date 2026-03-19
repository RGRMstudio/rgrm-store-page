import type { Config } from "tailwindcss";

const config: Config = {
  // CONTENT SCANNING — fixed to match your actual folder structure
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        "rgrm-red": "#BC2026",    // matches your selection:bg-[#BC2026] in page.tsx
        "rgrm-black": "#000000",
        "rgrm-gray": "#1A1A1A",
        "rgrm-light": "#F5F5F5",
      },
      fontFamily: {
        mono: ["var(--font-geist-mono)", "Menlo", "monospace"],
        sans: ["var(--font-geist-sans)", "Inter", "sans-serif"],
      },
      letterSpacing: {
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

  plugins: [],
};

export default config;
