import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        background: "#0D0D0F",
        surface: "#141418",
        "accent-mint": "#6EE7B7",
        "accent-indigo": "#818CF8",
        "text-primary": "#F1F5F9",
        "text-muted": "#64748B",
        border: "#1E1E2E",
      },
      boxShadow: {
        mint: '0 0 20px rgba(110,231,183,0.3)',
        indigo: '0 0 20px rgba(129,140,248,0.3)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
