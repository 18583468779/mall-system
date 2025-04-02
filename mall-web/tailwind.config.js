/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  important: true,
  corePlugins: {
    preflight: false, // 禁用默认样式重置
  },
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      boxShadow: {
        nav: "0 8px 24px -2px rgba(0, 0, 0, 0.05)",
        card: "0 12px 32px -4px rgba(0, 0, 0, 0.1)",
      },
      transitionProperty: {
        height: "height",
        "max-height": "max-height",
        filter: "opacity, transform",
      },
    },
  },
  plugins: [],
};
