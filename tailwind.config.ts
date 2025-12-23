// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rgrm: {
          black: "#000000",
          blue: "#0055ff", // Estimated from logo
          red: "#ff0000",  // Estimated from logo
          yellow: "#ffcc00", // Estimated from logo
          white: "#ffffff",
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-archivo-black)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
