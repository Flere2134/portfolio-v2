import React, { useState } from "react";
import { Linkedin, Github, ArrowUpRight } from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle.jsx";
import BackgroundPaths from "../ui/BackgroundPaths.jsx";
import { profile } from "../../data/profile.js";

const socialIcons = {
  LinkedIn: Linkedin,
  GitHub: Github,
};

export default function Hero() {
  const [glowPos, setGlowPos] = useState({ x: 50, y: 0 });

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setGlowPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background transition-colors duration-300 dark:bg-espresso">
      <BackgroundPaths />
      <ThemeToggle className="absolute top-6 right-6 z-10" />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-24 md:grid-cols-2 md:gap-14 md:px-10 md:py-32">
        {/* Left column */}
        <div className="flex flex-col justify-center">
          <span className="mb-6 inline-flex w-fit items-center rounded-full border border-teal/25 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-teal dark:border-background/20 dark:text-background/70">
            {profile.badge}
          </span>

          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-teal md:text-5xl dark:text-background">
            {profile.name},{" "}
            <span className="text-cerulean">{profile.title}</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-espresso/80 md:text-lg dark:text-background/75">
            {profile.bio}
          </p>

          <div className="mt-8 flex flex-col gap-4">
            {profile.cards.map((card) => (
              <div
                key={card.label}
                // Solid surfaces on purpose: these sit above the animated
                // background paths, so a translucent bg would let the lines
                // bleed through and read as "on top of" the card.
                className="rounded-2xl border border-espresso/10 bg-surface px-5 py-4 dark:border-background/10 dark:bg-[#332822]"
              >
                <p className="text-[11px] font-semibold tracking-[0.18em] text-amber">
                  {card.label}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-espresso/75 dark:text-background/70">
                  {card.body}
                </p>
              </div>
            ))}
          </div>

          <a
            href={profile.cta.href}
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-cerulean px-6 py-3.5 text-sm font-semibold tracking-wide text-background transition-colors hover:bg-teal dark:bg-background dark:text-espresso dark:hover:bg-surface"
          >
            {profile.cta.label}
            <ArrowUpRight size={16} />
          </a>
        </div>

        {/* Right column — profile card. Stays a solid dark block in both
            themes (not just light mode) so the background paths never
            show through it either. */}
        <div className="flex items-center justify-center md:justify-end">
          <div
            className="group relative w-full max-w-sm overflow-hidden rounded-3xl border border-espresso/10 bg-espresso p-8 transition-colors duration-300 hover:border-amber/30 dark:border-background/10 dark:bg-[#332822]"
            onMouseMove={handleCardMouseMove}
          >
            {/* Amber glow that follows the cursor */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: `radial-gradient(circle 220px at ${glowPos.x}% ${glowPos.y}%, rgba(197,153,71,0.22), transparent 70%)`,
              }}
            />
            <div className="relative z-10 flex flex-col items-center text-center">
              {profile.photo ? (
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="h-28 w-28 rounded-full object-cover"
                />
              ) : (
                // TODO: replace with a real photo via profile.photo in data/profile.js
                <div className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-cerulean/50 bg-background/10 text-2xl font-bold text-background">
                  AA
                </div>
              )}

              <h2 className="mt-5 text-2xl font-bold text-background">
                {profile.name}
              </h2>
              <p className="mt-1 text-xs font-semibold tracking-[0.18em] text-background/50">
                {profile.title.toUpperCase()}
              </p>

              <p className="mt-5 text-sm leading-relaxed text-background/75">
                {profile.tagline}
              </p>
            </div>

            <div className="relative z-10 mt-7 flex flex-col gap-3">
              {profile.socials.map(({ label, handle, href }) => {
                const Icon = socialIcons[label];
                return (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center justify-between rounded-2xl border border-background/10 bg-background/5 px-4 py-3 transition-colors hover:bg-background/10"
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-background/15 text-background">
                        <Icon size={16} />
                      </span>
                      <span className="text-left">
                        <span className="block text-sm font-semibold text-background">
                          {label}
                        </span>
                        <span className="block text-xs text-background/50">
                          {handle}
                        </span>
                      </span>
                    </span>
                    <ArrowUpRight size={14} className="text-background/50" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}