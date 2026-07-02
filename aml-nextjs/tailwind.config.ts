import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#EEF2F6",
          100: "#D5DEE8",
          200: "#ABBDD1",
          300: "#819CBA",
          400: "#5A7DA3",
          500: "#3D5F82",
          600: "#2E4A66",
          700: "#1E3550",
          800: "#152538",
          900: "#0C1620",
          950: "#070E14",
        },
        gold: {
          50: "#FBF5E8",
          100: "#F5EACC",
          200: "#EBD599",
          300: "#E1C066",
          400: "#D4AF37",
          500: "#C9A962",
          600: "#B8942F",
          700: "#8A6F24",
          800: "#5C4A18",
          900: "#2E250C",
        },
        cream: "#F8F6F3",
        emerald: {
          450: "#10B981",
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        accent: ["Montserrat", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "slide-in-right": "slideInRight 0.6s ease-out forwards",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "spin-slow": "spin 3s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(201,169,98,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(201,169,98,0.6)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
export default config
