import type { Config } from "tailwindcss";

/**
 * Tailwind v4 is configured CSS-first via the `@theme` block in
 * app/globals.css (loaded here through the `@config` directive). This file
 * mirrors the design tokens so they're documented in one place and available
 * to any tooling that reads the JS config.
 */
const config: Config = {
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        "primary-dark": "var(--primary-dark)",
        secondary: "var(--secondary)",
        navy: "var(--navy)",
        "bg-accent": "var(--bg-accent)",
        "bg-accent-2": "var(--bg-accent-2)",
        "bg-alt": "var(--bg-alt)",
        text: "var(--text)",
        "text-muted": "var(--text-muted)",
        border: "var(--border)",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "ui-sans-serif", "system-ui", "sans-serif"],
        inter: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
};

export default config;
