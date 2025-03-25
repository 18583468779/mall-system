/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  important: true,
  corePlugins: {
    preflight: false, // 禁用默认样式重置
  },
  theme: {
    extend: {
      spacing: {
        0.05: "0.05rem",
        0.1: "0.1rem",
        0.15: "0.15rem",
        0.2: "0.2rem",
        // 添加更多自定义间距...
      },
      fontSize: {
        0.2: "0.2rem",
        0.24: "0.24rem",
        0.3: "0.3rem",
        0.32: "0.32rem",
        // 添加更多字体尺寸...
      },
      borderRadius: {
        0.1: "0.1rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
