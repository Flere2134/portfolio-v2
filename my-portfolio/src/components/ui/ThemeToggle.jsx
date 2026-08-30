import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext.jsx";

export default function ThemeToggle({ className = "" }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className={
        "flex h-11 w-11 items-center justify-center rounded-full border transition-colors " +
        "border-espresso/15 bg-surface/40 text-espresso hover:bg-surface " +
        "dark:border-background/20 dark:bg-background/5 dark:text-background dark:hover:bg-background/10 " +
        className
      }
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
