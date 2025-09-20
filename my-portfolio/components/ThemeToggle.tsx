"use client";

import { useTheme } from "./ThemeProvider";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid"; // Assuming you have @heroicons/react installed

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md hover:bg-foreground/10 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <MoonIcon className="h-5 w-5 text-foreground" />
      ) : (
        <SunIcon className="h-5 w-5 text-foreground" />
      )}
    </button>
  );
}