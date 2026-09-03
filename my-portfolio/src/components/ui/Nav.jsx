import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle.jsx";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Projects", href: "#projects" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [activeHref, setActiveHref] = useState(NAV_LINKS[0].href);
  const [hoveredHref, setHoveredHref] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Scroll-spy: still tracks the on-screen section (used for aria-current
  // and the mobile dropdown's persistent highlight), but no longer drives
  // the desktop pill's visual state — that's hover-only now.
  useEffect(() => {
    const sections = NAV_LINKS.map((link) =>
      document.querySelector(link.href)
    ).filter(Boolean);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (mostVisible) {
          setActiveHref(`#${mostVisible.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu automatically if the viewport grows past the
  // breakpoint where it's rendered, so it can't get stuck open.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => setMobileOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const handleNavigate = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    setActiveHref(href);
    document.querySelector(href)?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
    window.history.replaceState(null, "", href);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:pt-6">
      <div className="mx-auto grid max-w-5xl grid-cols-[1fr_auto] items-center gap-3 md:grid-cols-[1fr_auto_1fr]">
        {/* Desktop pill nav */}
        <nav
          aria-label="Section navigation"
          onMouseLeave={() => setHoveredHref(null)}
          className="col-start-2 hidden justify-self-center rounded-full border border-espresso/10 bg-surface/80 p-1.5 ring-1 ring-transparent backdrop-blur-xl transition-shadow duration-200 hover:ring-cerulean dark:border-dark-surface dark:bg-dark-surface/80 dark:hover:ring-amber md:flex"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeHref === link.href;
            const isHovered = hoveredHref === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                onMouseEnter={() => setHoveredHref(link.href)}
                onFocus={() => setHoveredHref(link.href)}
                onBlur={() => setHoveredHref(null)}
                onClick={(e) => handleNavigate(e, link.href)}
                className="relative rounded-full px-4 py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal dark:focus-visible:outline-dark-brand"
              >
                <AnimatePresence>
                  {isHovered && (
                    <motion.span
                      layoutId="nav-highlight"
                      className="absolute inset-0 rounded-full bg-teal dark:bg-amber"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : {
                              layout: { type: "spring", stiffness: 400, damping: 32 },
                              opacity: { duration: 0.15 },
                            }
                      }
                    />
                  )}
                </AnimatePresence>
                <span
                  className={
                    "relative transition-colors duration-200 " +
                    (isHovered
                      ? "text-background"
                      : "text-espresso/70 hover:text-espresso dark:text-surface/80 dark:hover:text-background")
                  }
                >
                  {link.label}
                </span>
              </a>
            );
          })}
        </nav>

        {/* Theme toggle + mobile menu trigger */}
        <div className="col-start-2 flex items-center justify-self-end gap-2 md:col-start-3">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-espresso/15 bg-surface/80 text-espresso backdrop-blur-xl transition-colors hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal dark:border-background/20 dark:bg-dark-surface/80 dark:text-background dark:hover:bg-dark-surface dark:focus-visible:outline-dark-brand md:hidden"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            aria-label="Section navigation"
            initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="mx-auto mt-2 flex max-w-5xl flex-col overflow-hidden rounded-3xl border border-espresso/10 bg-surface/95 p-2 backdrop-blur-xl dark:border-dark-surface dark:bg-dark-surface/95 md:hidden"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeHref === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  onClick={(e) => handleNavigate(e, link.href)}
                  className={
                    "rounded-2xl px-4 py-3 text-sm font-medium transition-colors " +
                    (isActive
                      ? "bg-teal text-background dark:bg-dark-brand"
                      : "text-espresso/75 hover:bg-background/60 dark:text-surface dark:hover:bg-background/5")
                  }
                >
                  {link.label}
                </a>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}