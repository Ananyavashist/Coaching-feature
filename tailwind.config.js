/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        4.5: "1.125rem",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        // Untitled UI - Gray (light mode)
        gray: {
          25: "#FCFCFD",
          50: "#F9FAFB",
          100: "#F2F4F7",
          200: "#EAECF0",
          300: "#D0D5DD",
          400: "#98A2B3",
          500: "#667085",
          600: "#475467",
          700: "#344054",
          800: "#182230",
          900: "#101828",
          950: "#0C111D",
        },
        // Primary CTA (black)
        cta: {
          DEFAULT: "#000000",
          hover: "#1A1A1A",
          ring: "#E5E7EB",
        },
        // Brand purple (#5048EF primary)
        brand: {
          25: "#F5F4FF",
          50: "#EEEDFE",
          100: "#DDD9FD",
          200: "#BBB3FB",
          300: "#918CF6",
          400: "#6E6AF2",
          500: "#5048EF",
          600: "#5048EF",
          700: "#3D36D4",
          800: "#322EB0",
          900: "#2A268F",
          950: "#1A1858",
        },
        success: {
          50: "#ECFDF3",
          100: "#DCFAE6",
          200: "#ABEFC6",
          500: "#17B26A",
          600: "#079455",
          700: "#067647",
        },
        warning: {
          50: "#FFFAEB",
          100: "#FEF0C7",
          200: "#FEDF89",
          500: "#F79009",
          600: "#DC6803",
          700: "#B54708",
        },
        error: {
          50: "#FEF3F2",
          100: "#FEE4E2",
          500: "#F04438",
          600: "#D92D20",
          700: "#B42318",
        },
      },
      boxShadow: {
        xs: "none",
        sm: "none",
        md: "none",
        lg: "none",
        xl: "none",
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },
    },
  },
  plugins: [],
};
