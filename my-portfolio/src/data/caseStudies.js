// Placeholder case study entries — swap in real titles, tags, links, and
// images once you have them. `image` accepts a path/import (see the note
// in CaseStudies.jsx); leave it `null` to fall back to a placeholder swatch.
import caseStudy1 from "../assets/images/case-study-1.png";
import caseStudy2 from "../assets/images/case-study-2.png";

export const caseStudies = [
  {
    id: "case-one",
    title: "Fresh Only toggle for Spotify",
    tag: "Fresh Only",
    href: "https://app.notion.com/p/Product-Teardown-Improvement-Pitch-9cb8bcc18ed54828ad1e2bed6759071d",
    image: caseStudy1,
    accent: "from-teal to-cerulean",
  },
  {
    id: "case-two",
    title: "[PRD] Algorhythm",
    tag: "Product Requirements Document",
    href: "#",
    image: caseStudy2,
    accent: "from-cerulean to-amber",
  },
  {
    id: "case-three",
    title: "Case Study Three",
    tag: "PLACEHOLDER TAG",
    href: "#",
    image: null,
    accent: "from-amber to-espresso",
  },
];