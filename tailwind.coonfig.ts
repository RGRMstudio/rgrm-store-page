import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // --- 1. INDUSTRIAL COLOR PALETTE ---
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // The signature 'RGRM Red' used for alerts and highlights
        'rgrm-red': '#BC2026', 
      },

      // --- 2. TYPOGRAPHY SYSTEM ---
      // These link to the CSS variables defined in layout.tsx
      fontFamily: {
        headline: ['var(--font-headline)', 'sans-serif'], // Oswald
        body: ['var(--font-body)', 'sans-serif'],         // Space Grotesk
        mono: ['Courier New', 'Courier', 'monospace'],     // Fallback technical font
      },

      // --- 3. ANIMATION KEYFRAMES ---
      keyframes: {
        // Used for Skeleton Loading (Scanning effect)
        shimmer: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        // Used for 404 Pages and System Errors
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        // A slower, more ominous pulse for status indicators
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },

      // --- 4. ANIMATION UTILITIES ---
      animation: {
        'shimmer': 'shimmer 2s infinite linear',
        'glitch': 'glitch 1s infinite linear',
        'pulse-slow': 'pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },

      // --- 5. CURSOR ---
      cursor: {
        // Optional: Adds a technical crosshair cursor to specific elements
        'crosshair': 'crosshair',
      }
    },
  },
  plugins: [
    // Required for the "prose" text block on the Product Detail page
    require('@tailwindcss/typography'), 
  ],
};

export default config;
