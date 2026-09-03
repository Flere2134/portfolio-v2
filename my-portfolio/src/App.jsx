import React from "react";
import Nav from "./components/ui/Nav.jsx";
import ScrollToTop from "./components/ui/ScrolltoTop.jsx";
import Hero from "./components/sections/Hero.jsx";
import Projects from "./components/sections/Projects.jsx";
import CaseStudies from "./components/sections/CaseStudies.jsx";
import Contact from "./components/sections/Contact.jsx";

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Projects />
        <CaseStudies />
        <Contact />
      </main>
      <ScrollToTop />
    </>
  );
}