"use client"

import type * as React from "react"
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion"
import { usePrefersReducedMotion } from "@/components/viberise/hooks/use-prefers-reduced-motion"

export interface MotionProviderProps {
  children: React.ReactNode
}

/**
 * Global Motion provider:
 * - Uses Framer's LazyMotion to keep bundle lean
 * - Respects OS motion preferences (prefers-reduced-motion)
 * - Sets a pleasant default easing and durations
 */
export function MotionProvider({ children }: MotionProviderProps) {
  const reduced = usePrefersReducedMotion()

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig
        reducedMotion="user"
        transition={{
          duration: reduced ? 0 : 0.6,
          ease: [0.22, 1, 0.36, 1], // out-quad like
        }}
      >
        {children}
      </MotionConfig>
    </LazyMotion>
  )
}
