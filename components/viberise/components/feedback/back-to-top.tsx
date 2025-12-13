"use client"

import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface BackToTopProps {
  visible: boolean
}

export function BackToTop({ visible }: BackToTopProps) {
  if (!visible) return null
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        size="icon"
        className="rounded-full bg-[var(--brand)] text-black hover:bg-[color:rgb(204,255,17,0.9)]"
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </div>
  )
}
