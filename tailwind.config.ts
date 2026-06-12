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
        sage: "#668c75",
        pine: {
          DEFAULT: "#25463d",
          dark: "#0f1a17",
        },
        coral: "#bd6a55",
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
