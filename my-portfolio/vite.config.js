import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Required for GitHub Pages project sites — the site will be served from
  // https://<username>.github.io/portfolio-v2/, not the domain root, so
  // Vite needs to know to prefix all asset URLs with this path.
  base: "/portfolio-v2/",
});