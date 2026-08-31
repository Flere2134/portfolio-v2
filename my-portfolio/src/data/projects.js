// `preview` accepts either:
//   { type: "image", src: "/src/assets/images/your-shot.png" }
//   { type: "video", src: "/src/assets/images/your-clip.mp4" }
// Leave it as `null` to fall back to a placeholder swatch.

export const projects = [
  {
    id: "project-one",
    name: "Algorhythm",
    description: "A sleep sound therapy device with companion mobile app with a goal of helping people improve their sleep quality.",
    year: "2026",
    preview: { type: "image", src: "/src/assets/images/algorhythm-preview.jpg" },
    accent: "from-teal to-cerulean",
  },
  {
    id: "project-two",
    name: "GasGuard",
    description: "A smart gas leak detection system with real-time monitoring and alerts.",
    year: "2026",
    preview: { type: "image", src: "/src/assets/images/gasguard-preview.png" },
    accent: "from-cerulean to-amber",
  },

];