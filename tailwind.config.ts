import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--ink)",
        foreground: "var(--paper)",
        raised: "var(--ink-raised)",
        rule: "var(--rule)",
        muted: "var(--muted)",
        faint: "var(--faint)",
        accent: "var(--accent)",
      },
      fontFamily: {
        display: ["var(--font-archivo)", "system-ui", "sans-serif"],
        sans: ["var(--font-instrument-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
