"use client"

import * as React from "react"

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false)
  React.useEffect(() => {
    if (typeof window === "undefined") return
    const m = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(m.matches)
    const onChange = () => setReduced(m.matches)
    m.addEventListener("change", onChange)
    return () => m.removeEventListener("change", onChange)
  }, [])
  return reduced
}
