"use client"

import * as React from "react"

export function useScrollProgress() {
  const [progress, setProgress] = React.useState(0)
  React.useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const height = document.body.scrollHeight - window.innerHeight
      const p = height > 0 ? (scrollTop / height) * 100 : 0
      setProgress(Math.min(100, Math.max(0, p)))
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  return progress
}
