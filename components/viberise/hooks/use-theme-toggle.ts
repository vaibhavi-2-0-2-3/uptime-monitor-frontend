"use client"

import * as React from "react"

export function useThemeToggle() {
  const [theme, setTheme] = React.useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "dark"
    return (
      (localStorage.getItem("theme") as "light" | "dark") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    )
  })
  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    localStorage.setItem("theme", theme)
  }, [theme])
  return { theme, setTheme }
}
