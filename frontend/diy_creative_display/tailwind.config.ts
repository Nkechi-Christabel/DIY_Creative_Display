import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "auth-bg": "url('/assets/auth/auth-bg.jpg')",
        "auth-bg1": "url('/assets/auth/auth-bg1.jpg')",
      },
      colors: {
        auth: {
          50: "#b1907e",
          100: "#8b6b55",
          150: "#94634e",
          200: "#7c543f",
        },
      },
      keyframes: {
        fade: {
          "0%": { opacity: "0" },
          "14% 86%": { opacity: "1" },
          // "86%": { opacity: "1" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fade: "fade 14s linear forwards",
      },
      screens: {
        xm: { max: "475px" },
        // => @media (max-width: 475px) { ... }
        sml: "475px",
        // => @media (min-width: 475px) { ... }
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
    },
  },
  plugins: [require("@whiterussianstudio/tailwind-easing")],
};
export default config;
