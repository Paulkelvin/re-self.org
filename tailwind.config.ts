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
        sage: "#7fb5a8",
        pine: {
          DEFAULT: "#184c4c",
          dark: "#0d3030",
        },
        coral: "#c45a4a",
        gold: "#c59f55",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
