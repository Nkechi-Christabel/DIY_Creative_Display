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
        "about-hero": "url('/assets/about/hero.jpg')",
        "saved-miniHero": "url('/assets/saved/mini-hero.jpg')",
      },
      colors: {
        auth: {
          50: "#b1907e",
          100: "#8b6b55",
          150: "#94634e",
          200: "#7c543f",
        },
        bg: {
          100: "#f8f7f4;",
        },
      },
      extend: {
        gridTemplateColumns: {
          "auto-fill-270": "repeat(auto-fill, minmax(270px, 1fr))",
          "auto-fit-270": "repeat(auto-fit, minmax(270px, 1fr))",
        },
      },
      keyframes: {
        spin: {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(360deg)",
          },
        },
        bounce: {
          "0%, 100%": {
            transform: "translateY(-25%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        pulse: {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: ".5",
          },
        },
      },
      animation: {
        spin: "spin 1s linear infinite",
        boune: "bounce 1s infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      screens: {
        xxm: "320px",
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
