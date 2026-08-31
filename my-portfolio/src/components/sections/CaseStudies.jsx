import React, { useEffect, useRef, useState } from "react";
import { Maximize2, SkipForward } from "lucide-react";
import { caseStudies } from "../../data/caseStudies.js";

const ITEM_HEIGHT = 96; // px — keep in sync with the `h-24` on each <li>
const TRACK_SLOTS = 5; // odd number of rows visible in the text track
const TRACK_HEIGHT = ITEM_HEIGHT * TRACK_SLOTS;

const CARD_HEIGHT = 260; // px — height of each image card
const CARD_GAP = 28; // px — space between stacked image cards
const CARD_STEP = CARD_HEIGHT + CARD_GAP;

export default function CaseStudies() {
  const sectionRef = useRef(null);
  const imageTrackRef = useRef(null);
  const [activeFloat, setActiveFloat] = useState(0);
  const [imageTrackHeight, setImageTrackHeight] = useState(600);

  useEffect(() => {
    let ticking = false;

    const computeProgress = () => {
      ticking = false;
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;

      // How far we've scrolled through the pinned section, 0 → 1.
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      setActiveFloat(progress * (caseStudies.length - 1));
    };

    const measure = () => {
      if (imageTrackRef.current) {
        setImageTrackHeight(imageTrackRef.current.clientHeight);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(computeProgress);
      }
    };

    computeProgress();
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const activeIndex = Math.round(activeFloat);

  // Manual "skip" — scrolls the window to the point in the pinned section
  // that corresponds to the next item, since position is scroll-driven.
  const goToIndex = (index) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight;
    const targetProgress = index / (caseStudies.length - 1);
    const targetY = window.scrollY + rect.top + targetProgress * scrollable;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="case-studies"
      // Extra scroll distance gives the pin room to work — roughly one
      // viewport per item, plus one for settle-in/settle-out.
      style={{ height: `${(caseStudies.length + 1) * 100}vh` }}
      className="relative border-t border-espresso/10 dark:border-background/10"
    >
      <div className="sticky top-0 flex h-screen w-full overflow-hidden bg-background dark:bg-espresso">
        {/* Scroll-synced list */}
        <div className="flex w-full items-center justify-center md:w-1/2">
          <div
            className="relative w-full max-w-md overflow-hidden px-6"
            style={{ height: TRACK_HEIGHT }}
          >
            <ul
              className="absolute inset-x-0 left-6 right-6"
              style={{
                transform: `translateY(${
                  TRACK_HEIGHT / 2 - ITEM_HEIGHT / 2 - activeFloat * ITEM_HEIGHT
                }px)`,
              }}
            >
              {caseStudies.map((item, index) => {
                const distance = Math.abs(index - activeFloat);
                const isActive = index === activeIndex;
                return (
                  <li
                    key={item.id}
                    className="flex items-center"
                    style={{
                      height: ITEM_HEIGHT,
                      opacity: Math.max(0.15, 1 - distance * 0.45),
                    }}
                  >
                    <button
                      onClick={() => goToIndex(index)}
                      className={
                        "text-left transition-all duration-200 " +
                        (isActive
                          ? "font-serif text-3xl italic text-espresso dark:text-background md:text-4xl"
                          : "text-xl text-espresso/50 dark:text-background/50 md:text-2xl")
                      }
                    >
                      {item.title}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Image panel — same scroll-sync mechanic as the list, applied to
            a vertical stack of image cards, so it reads as one continuous
            filmstrip rather than a single image swapping in place. */}
        <div className="hidden w-1/2 items-stretch justify-center py-10 pr-10 md:flex">
          <div
            ref={imageTrackRef}
            className="relative w-full max-w-md overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
            }}
          >
            <div
              className="absolute inset-x-0"
              style={{
                transform: `translateY(${
                  imageTrackHeight / 2 -
                  CARD_HEIGHT / 2 -
                  activeFloat * CARD_STEP
                }px)`,
              }}
            >
              {caseStudies.map((item, index) => {
                const distance = Math.abs(index - activeFloat);
                const isActive = index === activeIndex;
                const opacity = Math.max(0.12, 1 - distance * 0.55);
                const scale = Math.max(0.88, 1 - distance * 0.08);
                const blur = distance > 0.4 ? Math.min(distance * 3, 6) : 0;

                return (
                  <div
                    key={item.id}
                    className="w-full overflow-hidden rounded-2xl border border-background/10 bg-espresso shadow-xl"
                    style={{
                      height: CARD_HEIGHT,
                      marginBottom: CARD_GAP,
                      opacity,
                      transform: `scale(${scale})`,
                      filter: blur ? `blur(${blur}px)` : "none",
                      transition: "filter 150ms linear",
                    }}
                  >
                    <div className="relative h-full w-full">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        // TODO: replace with a real image via `image` in
                        // data/caseStudies.js
                        <div
                          className={
                            "flex h-full w-full items-center justify-center bg-gradient-to-br text-xs font-semibold tracking-widest text-background/70 " +
                            item.accent
                          }
                        >
                          IMAGE PLACEHOLDER
                        </div>
                      )}

                      {/* Tag + controls, overlaid directly on the image */}
                      <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-black/50 to-transparent px-4 py-3">
                        <span className="text-xs font-semibold tracking-[0.15em] text-background/80">
                          {item.tag}
                        </span>
                        {isActive && (
                          <div className="flex items-center gap-2">
                            <a
                              href={item.href}
                              aria-label="Open case study"
                              className="flex h-7 w-7 items-center justify-center rounded-full bg-black/30 text-background/80 backdrop-blur-sm transition-colors hover:bg-black/50 hover:text-background"
                            >
                              <Maximize2 size={13} />
                            </a>
                            <button
                              onClick={() =>
                                goToIndex((activeIndex + 1) % caseStudies.length)
                              }
                              aria-label="Next case study"
                              className="flex h-7 w-7 items-center justify-center rounded-full bg-black/30 text-background/80 backdrop-blur-sm transition-colors hover:bg-black/50 hover:text-background"
                            >
                              <SkipForward size={13} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}