import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bauhaus: {
          blue: "#0066FF",
          red: "#FF0000",
          yellow: "#FFCC00",
          white: "#F9F7F2",
        },
      },
      borderWidth: {
        '4': '4px',
        '8': '8px',
      },
    },
  },
  plugins: [],
};
export default config;
