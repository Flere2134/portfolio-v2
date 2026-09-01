import algorhythmPreview from "../assets/images/algorhythm-preview.jpg";
import gasguardPreview from "../assets/images/gasguard-preview.png";

export const projects = [
  {
    id: "project-one",
    name: "Algorhythm",
    description: "A sleep sound therapy device with companion mobile app with a goal of helping people improve their sleep quality.",
    year: "2026",
    preview: { type: "image", src: algorhythmPreview },
    accent: "from-teal to-cerulean",
  },
  {
    id: "project-two",
    name: "GasGuard",
    description: "A smart gas leak detection system with real-time monitoring and alerts.",
    year: "2026",
    preview: { type: "image", src: gasguardPreview },
    accent: "from-cerulean to-amber",
  },
];