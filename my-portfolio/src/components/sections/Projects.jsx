import React, { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../../data/projects.js";

function ProjectPreview({ project, className = "" }) {
  return (
    <div
      className={
        "flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl border border-espresso/10 dark:border-surface/10 " +
        className
      }
    >
      {project.preview?.type === "image" ? (
        <img
          src={project.preview.src}
          alt={project.name}
          className="h-full w-full object-cover"
        />
      ) : project.preview?.type === "video" ? (
        <video
          src={project.preview.src}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        // TODO: replace with a real screenshot or short clip via
        // project.preview in data/projects.js
        <div
          className={
            "flex h-full w-full items-center justify-center bg-gradient-to-br text-xs font-semibold tracking-widest text-background/70 " +
            project.accent
          }
        >
          PREVIEW
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  const containerRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [expandedId, setExpandedId] = useState(null); // mobile tap state

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const hoveredProject = projects.find((p) => p.id === hoveredId);

  return (
    <section
      id="projects"
      className="w-full border-t border-espresso/10 bg-background px-6 py-24 dark:border-surface/10 dark:bg-espresso md:px-10"
    >
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-semibold tracking-[0.2em] text-espresso/50 dark:text-surface/70">
          SELECTED PROJECTS
        </p>

        <div
          ref={containerRef}
          className="relative mt-8 border-t border-espresso/10 dark:border-surface/10"
        >
          {projects.map((project) => {
            const isHovered = hoveredId === project.id;
            const isExpanded = expandedId === project.id;

            return (
              <div
                key={project.id}
                className="border-b border-espresso/10 dark:border-surface/10"
              >
                <a
                  href={project.href}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={(e) => {
                    // On touch devices, first tap expands the inline
                    // preview instead of immediately following the link.
                    if (window.matchMedia("(hover: none)").matches) {
                      if (!isExpanded) {
                        e.preventDefault();
                        setExpandedId(project.id);
                      }
                    }
                  }}
                  className={
                    "flex items-center justify-between gap-6 rounded-2xl px-5 py-6 transition-colors md:px-6 " +
                    (isHovered
                      ? "bg-surface/60 dark:bg-dark-surface/60"
                      : "bg-transparent")
                  }
                >
                  <div>
                    <span
                      className={
                        "text-2xl font-bold tracking-tight text-espresso dark:text-background md:text-3xl " +
                        (isHovered ? "underline decoration-cerulean" : "")
                      }
                    >
                      {project.name}
                    </span>
                    {isHovered && (
                      <ArrowUpRight
                        size={20}
                        className="ml-2 inline text-cerulean"
                      />
                    )}
                    <p className="mt-1 text-sm text-espresso/70 dark:text-surface md:text-base">
                      {project.description}
                    </p>
                  </div>

                  <span className="shrink-0 text-sm text-espresso/50 dark:text-surface/70">
                    {project.year}
                  </span>
                </a>

                {/* Mobile: inline expandable preview */}
                {isExpanded && (
                  <div className="px-5 pb-6 md:hidden">
                    <ProjectPreview project={project} />
                  </div>
                )}
              </div>
            );
          })}

          {/* Desktop: floating preview that follows the cursor */}
          {hoveredProject && (
            <div
              className="pointer-events-none absolute z-10 hidden w-64 md:block"
              style={{
                left: Math.min(mousePos.x + 24, 600),
                top: Math.max(mousePos.y - 120, 0),
              }}
            >
              <ProjectPreview project={hoveredProject} className="shadow-xl" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}