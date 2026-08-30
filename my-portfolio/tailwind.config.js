/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // ------------------------------------------------------------
        // Portfolio palette — reference these tokens everywhere instead
        // of raw hex values so the whole site stays consistent.
        // ------------------------------------------------------------
        background: "#F4F1EA", // Off-White — global background (light mode)
        surface: "#DAD6CB", // Warm Gray — cards, sidebars, quote blocks
        espresso: "#271E1C", // Espresso — body text / dark-mode base
        teal: "#066E70", // Deep Teal — nav, H1/H2, structural borders
        cerulean: "#29AEC6", // Cerulean — links, hovers, CTAs
        amber: "#C59947", // Amber — badges, highlights, accents
      },
    },
  },
  plugins: [],
};
