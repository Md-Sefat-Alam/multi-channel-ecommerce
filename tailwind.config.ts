import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    darkMode: "class",
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      openSans: ["Open Sans", "sans-serif"],
      hindSiliguri: ["Hind Siliguri", "sans-serif"],
    },
    extend: {
      container: {
        center: true, // Center the container by default
        padding: {
          DEFAULT: "10px", // Default horizontal padding
        },
        // screens: {
        //   // Set a max-width for container on large screens
        //   lg: "1080px",
        //   xl: "1080px",
        // },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          DEFAULT: "var(--primary)",
          light: "var(--primary-light)",
          white: "#fafafa",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          light: "var(--secondary-light)",
          medium: "var(--secondary-medium)",
          bright: "var(--secondary-bright)",
        },
        background: {
          lightGray: "var(--bg-light-gray)",
        },
        font: {
          primary: "var(--font-primary)",
          secondary: "var(--font-secondary)",
          light: "var(--font-light)",
          dark: "var(--font-dark)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
