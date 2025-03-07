import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // gray: { // these are the ones the designer gave us, but just use the default zinc colors
        //   600: "#2f",
        //   500: "#54",
        //   400: "#73",
        //   300: "#a6",
        //   200: "#da",
        //   100: "#f2",
        // },
        beige: {
          50: "#FEFDFB",
          100: "#FEFBF6",
          200: "#FCF6EA",
          300: "#F4DEB3",
          400: "#EDC87E",
          500: "#E6B34C",
          600: "#D6991F",
          700: "#A17317",
          800: "#6B4D0F",
          900: "#362608",
          950: "#1B1304",
        },
        steelblue: {
          DEFAULT: "#2d5c80",
          400: "#45769c",
          300: "#6597bd",
          200: "#97c4e6",
          100: "#d2ebff",
        },
        rosered: {
          DEFAULT: "#a12d44",
          400: "#CO4C63",
          300: "#da6d83",
          200: "#F297A9",
          100: "#FFD5DD",
        },
        carrotorange: {
          DEFAULT: "#ec9623",
          400: "#FCB659",
          300: "#FFC77C",
          200: "#FFD9A7",
          100: "#FFEFD9",
        },
        applegreen: {
          DEFAULT: "#8bb53a",
          400: "#AFD75E",
          300: "#CBEF81",
          200: "#E5FFB1",
          100: "#F1FFD3",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
  darkMode: "selector", // dark mode must be explicitly enabled
}
export default config
