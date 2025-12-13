import { useState, useEffect } from "react";

export function useThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return (
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
    );
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
}
