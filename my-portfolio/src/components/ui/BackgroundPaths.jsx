import React from "react";
import { motion } from "framer-motion";

// One fan of curved lines. Rendered twice (mirrored) for a fuller effect —
// see BackgroundPaths below.
function FloatingPaths({ position }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 696 316"
      fill="none"
    >
      {paths.map((path) => (
        <motion.path
          key={path.id}
          d={path.d}
          stroke="currentColor"
          strokeWidth={path.width}
          strokeOpacity={0.1 + path.id * 0.02}
          initial={{ pathLength: 0.3, opacity: 0.6 }}
          animate={{
            pathLength: 1,
            opacity: [0.3, 0.6, 0.3],
            pathOffset: [0, 1, 0],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </svg>
  );
}

/**
 * Decorative animated background — a fan of slowly flowing curved lines.
 * Purely decorative: pointer-events are disabled and it sits behind content
 * via z-index, so it never interferes with clicks/taps.
 *
 * Usage: drop it as the first child of a `relative` (or `relative overflow-
 * hidden`) container, then give your actual content `relative z-10`.
 *
 *   <section className="relative overflow-hidden">
 *     <BackgroundPaths />
 *     <div className="relative z-10">...your content...</div>
 *   </section>
 */
export default function BackgroundPaths({ className = "" }) {
  return (
    <div
      className={
        "pointer-events-none absolute inset-0 text-espresso/30 dark:text-dark-accent/60 " +
        className
      }
    >
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
    </div>
  );
}