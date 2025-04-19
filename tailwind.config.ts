import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
    },
    colors: {
      primary: {
        50: "#eaf6ff",
        100: "#d8eeff",
        200: "#b9dcff",
        300: "#8ec4ff",
        400: "#629eff",
        500: "#3e77ff",
        600: "#1c4cff",
        700: "#1e48f1",
        800: "#1237c1",
        900: "#183697",
        950: "#0e1d58",
      },
      danger: colors.red,
      accent: "#fde047",
      base: {
        foreground: colors.gray[800],
        "foreground-weak": colors.gray[500],
        "light-400": colors.gray[400],
        "light-300": colors.gray[300],
        "light-200": colors.gray[200],
        "light-100": colors.gray[100],
        "light-50": colors.gray[50],
      },
      white: "#fff",
    },

    extend: {
      // @see https://tailwindcss.com/docs/font-family
      fontFamily: {
        base: [
          "var(--font-inter)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Open Sans",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
      fontSize: {
        xs: [defaultTheme.fontSize.xs[0], "var(--root-base-line-height)"],
        sm: [defaultTheme.fontSize.sm[0], "var(--root-base-line-height)"],
        base: [defaultTheme.fontSize.base[0], "var(--root-base-line-height)"],
        lg: [defaultTheme.fontSize.lg[0], "var(--root-base-line-height)"],
        xl: [defaultTheme.fontSize.xl[0], "var(--root-base-line-height)"],
        "2xl": [
          defaultTheme.fontSize["2xl"][0],
          "var(--root-base-line-height)",
        ],
        "3xl": [
          defaultTheme.fontSize["3xl"][0],
          "var(--root-base-line-height)",
        ],
        "4xl": [
          defaultTheme.fontSize["4xl"][0],
          "var(--root-base-line-height)",
        ],
        "5xl": [
          defaultTheme.fontSize["5xl"][0],
          "var(--root-base-line-height)",
        ],
        "6xl": [
          defaultTheme.fontSize["6xl"][0],
          "var(--root-base-line-height)",
        ],
        "7xl": [
          defaultTheme.fontSize["7xl"][0],
          "var(--root-base-line-height)",
        ],
        "8xl": [
          defaultTheme.fontSize["8xl"][0],
          "var(--root-base-line-height)",
        ],
        "9xl": [
          defaultTheme.fontSize["9xl"][0],
          "var(--root-base-line-height)",
        ],
      },
      boxShadow: {
        card: "0px 2px 25px -15px rgba(0, 0, 0, 0.2)",
        wide: "0 30px 60px rgba(0,0,0,.12)",
      },
      zIndex: {
        hide: "-9999",
        header: "9999",
      },
      height: {
        header: "4rem",
      },
    },
  },
  plugins: [],
} as const satisfies Config;
