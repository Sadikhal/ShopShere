"use client";

import { useTheme } from "@/hooks/use-theme";
import { Sun, Moon } from "lucide-react";

/**
 * ThemeToggle Component
 * Button to toggle between light and dark themes
 */
export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full hover:bg-bg-secondary dark:hover:bg-bg-secondary transition-colors cursor-pointer"
      aria-label="Toggle theme"
    >
      {/* Show sun in dark mode, moon in light mode */}
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};
