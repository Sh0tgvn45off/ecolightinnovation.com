import type { Config } from "tailwindcss";

/**
 * EcoLight design tokens.
 * Dark "obsidian" surfaces, hairline borders, and two disciplined light accents:
 * emerald (clean solar light) and amber (warmth, and the kerosene flame we replace).
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#000000",
          900: "#050507",
          800: "#0A0D14",
          700: "#10141D",
          600: "#171C27",
        },
        platinum: {
          DEFAULT: "#94A3B8",
          soft: "#CBD5E1",
          dim: "#64748B",
        },
        photon: {
          DEFAULT: "#10B981",
          light: "#34D399",
          deep: "#047857",
        },
        ember: {
          DEFAULT: "#F59E0B",
          light: "#FBBF24",
          deep: "#B45309",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        // Display sizes with tight leading, for cinematic headlines.
        "display-xl": ["clamp(3rem, 8vw, 6.5rem)", { lineHeight: "0.98", letterSpacing: "-0.045em" }],
        "display-lg": ["clamp(2.5rem, 5.5vw, 4.5rem)", { lineHeight: "1.02", letterSpacing: "-0.04em" }],
        "display-md": ["clamp(2rem, 4vw, 3.25rem)", { lineHeight: "1.06", letterSpacing: "-0.035em" }],
      },
      borderColor: {
        hairline: "rgba(255, 255, 255, 0.08)",
        "hairline-strong": "rgba(255, 255, 255, 0.14)",
      },
      backgroundImage: {
        "text-platinum": "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 35%, #94A3B8 100%)",
        "photon-glow": "radial-gradient(closest-side, rgba(16, 185, 129, 0.35), rgba(16, 185, 129, 0) 70%)",
        "ember-glow": "radial-gradient(closest-side, rgba(245, 158, 11, 0.28), rgba(245, 158, 11, 0) 70%)",
      },
      boxShadow: {
        glass: "inset 0 1px 0 0 rgba(255, 255, 255, 0.06), 0 20px 60px -20px rgba(0, 0, 0, 0.8)",
        photon: "0 0 0 1px rgba(52, 211, 153, 0.25), 0 10px 40px -10px rgba(16, 185, 129, 0.55)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      transitionTimingFunction: {
        apple: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "45%": { opacity: "0.86" },
          "50%": { opacity: "0.95" },
          "72%": { opacity: "0.8" },
        },
        "slow-pan": {
          "0%": { transform: "scale(1.08) translate3d(0, 0, 0)" },
          "100%": { transform: "scale(1.16) translate3d(-1.5%, -1%, 0)" },
        },
      },
      animation: {
        flicker: "flicker 2.4s ease-in-out infinite",
        "slow-pan": "slow-pan 24s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};

export default config;
