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

        // ------------------------------------------------------------
        // Dark mode palette. Only 3 new tokens are needed — the rest of
        // the dark theme reuses existing tokens, since their hex values
        // happen to already match the dark-mode role:
        //
        //   role              dark hex   token to use
        //   ----------------  ---------  --------------------
        //   Global Background #271E1C -> espresso   (existing)
        //   Surfaces & Cards  #372D2A -> dark-surface (new)
        //   Primary Text      #F4F1EA -> background  (existing)
        //   Secondary Text    #DAD6CB -> surface     (existing)
        //   Primary Brand     #4CA1A2 -> dark-brand   (new)
        //   Interactive       #29AEC6 -> cerulean    (existing, same hex)
        //   Highlights/Accent #DBAC54 -> dark-accent  (new)
        // ------------------------------------------------------------
        "dark-surface": "#372D2A",
        "dark-brand": "#4CA1A2",
        "dark-accent": "#DBAC54",
      },
    },
  },
  plugins: [],
};