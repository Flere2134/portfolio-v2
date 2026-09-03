import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";

// Show once the visitor has scrolled roughly past the hero, rather than
// after an arbitrary pixel count — keeps the trigger point consistent
// across screen sizes.
const SHOW_AFTER_VH = 0.75;

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * SHOW_AFTER_VH);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
    window.history.replaceState(null, "", "#hero");
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={handleClick}
          aria-label="Scroll to top"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={
            prefersReducedMotion ? { duration: 0 } : { duration: 0.2, ease: "easeOut" }
          }
          className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-espresso/15 bg-surface/80 text-espresso ring-1 ring-transparent backdrop-blur-xl transition-shadow duration-200 hover:ring-cerulean focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal dark:border-background/20 dark:bg-dark-surface/80 dark:text-background dark:hover:ring-amber dark:focus-visible:outline-dark-brand md:bottom-8 md:right-8"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}