import type { Config } from "tailwindcss";

const config: Config = {
  // CONTENT SCANNING — ensure it catches the root and subfolders
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        "rgrm-red": "#BC2026",
        "rgrm-black": "#000000",
        "rgrm-gray": "#1A1A1A",
        "rgrm-light": "#F5F5F5",
      },
      fontFamily: {
        // MATCHING YOUR layout.tsx VARIABLES
        mono: ["var(--font-mono)", "Menlo", "monospace"],
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
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
