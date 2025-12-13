"use client"

import * as React from "react"

export function useReveal() {
  const [revealed, setRevealed] = React.useState(false)
  const ref = React.useRef<HTMLDivElement | null>(null)
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => entry.isIntersecting && setRevealed(true), {
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.2,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return { ref, revealed }
}
