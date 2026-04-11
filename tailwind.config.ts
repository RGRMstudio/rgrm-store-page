import type { Config } from "tailwindcss";

const config: Config = {
  // Focus exclusively on the src directory to avoid path conflicts
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  // This ensures Tailwind styles override any remaining CSS ghosts
  important: true,

  theme: {
    extend: {
      colors: {
        "rgrm-red": "#BC2026",
        "rgrm-black": "#000000",
        "rgrm-gray": "#1A1A1A",
        "rgrm-light": "#F5F5F5",
      },
      fontFamily: {
        // These match the variables you set in your layout.tsx
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
