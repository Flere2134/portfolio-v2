import algorhythmPreview from "../assets/images/algorhythm-preview.png";
import gasguardPreview from "../assets/images/gasguard-preview.png";
import saveslotPreview from "../assets/images/saveslot-preview.png";

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
    {
    id: "project-three",
    name: "SaveSlot",
    description: "A place to track and share your experience with your favorite games to the community.",
    year: "2026",
    preview: { type: "image", src: saveslotPreview },
    accent: "from-amber to-teal",
  },
];