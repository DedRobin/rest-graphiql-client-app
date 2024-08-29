import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        darkGray: "#121212",
        mediumGray: "#AEAEB4",
        lightGray: "#F3F3F3",
        red: "#FF6464",
        green: "#E3FD16",
      },
      fontFamily: {
        spaceMono: ["Space Mono", "monospace"],
      },
      fontStyle: {
        normal: "normal",
        italic: "italic",
      },
      fontSize: {
        h1: "5em",
        h2: "3em",
        h3: "22px",
        h4: "16px",
        h5: "15px",
        h6: "12px",
        span: "11px",
      },
      fontWeight: {
        h1: "700",
        h2: "400",
        h3: "700",
        h4: "700",
        h5: "400",
        h6: "400",
        span: "400",
      },
      lineHeight: {
        h1: "130%",
        h2: "125%",
        h3: "150%",
        h4: "150%",
        h5: "normal",
        h6: "normal",
        span: "normal",
      },
      letterSpacing: {
        h1: "0.01em",
        h2: "normal",
        h3: "0.01em",
        h4: "0.01em",
        h5: "-0.01em",
        h6: "0.02em",
        span: "0.02em",
      },
    },
  },
  plugins: [],
};

export default config;
