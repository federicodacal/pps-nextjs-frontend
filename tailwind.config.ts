import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        gradientStart: '#190033',
        gradientEnd: '#000000',
        cardGradientStart: '#CC00CC',
        cardGradientEnd: '#4C0099',
        dark: "#212f3c",
        dim: "#1e1e1e",
        accent: "#4f46e5",
        lightText: "#e5e7eb",
        purpleDark: '#5A189A',
        purpleLight: '#9D4EDD',
        backgroundDark: '#1A1A2E',
      },
    },
  },
  darkMode: "class",
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
export default config;
