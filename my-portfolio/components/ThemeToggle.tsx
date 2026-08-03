"use client";

import { useTheme } from "./ThemeProvider";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export default function ThemeToggle() {
  const { toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="inline-flex items-center justify-center rounded-md p-2 transition-colors hover:bg-foreground/10"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <SunIcon className="theme-icon-light h-5 w-5 text-foreground" aria-hidden="true" />
      <MoonIcon className="theme-icon-dark h-5 w-5 text-foreground" aria-hidden="true" />
    </button>
  );
}
