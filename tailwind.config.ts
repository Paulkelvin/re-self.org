import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#17211f",
        muted: "#5f6d68",
        line: "#dfe8e2",
        paper: "#fbfaf5",
        mist: "#eef5ef",
        sage: "#c9b8a0",
        pine: {
          DEFAULT: "#5e6d52",
          dark: "#4a5840",
        },
        coral: "#c45a4a",
        gold: "#A06830",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
