import React from "react";
import Hero from "./components/sections/Hero.jsx";
import Projects from "./components/sections/Projects.jsx";
import CaseStudies from "./components/sections/CaseStudies.jsx";
import Experience from "./components/sections/Experience.jsx";
import Contact from "./components/sections/Contact.jsx";

export default function App() {
  return (
    <main>
      <Hero />
      <Projects />
      <CaseStudies />
      <Experience />
      <Contact />
    </main>
  );
}