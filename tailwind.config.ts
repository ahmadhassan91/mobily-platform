import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mobily: {
          cyan: '#00A5D9',
          blue: '#002C6A',
          bg: 'var(--bg-main)',
          surface: 'var(--bg-surface)',
          card: 'var(--bg-card)',
          border: 'var(--border-color)',
          text: 'var(--text-main)',
          muted: 'var(--text-muted)'
        },
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
