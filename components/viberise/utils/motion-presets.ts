"use client"

import type { Variants } from "framer-motion"

// Common section reveal
export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { when: "beforeChildren", staggerChildren: 0.06 },
  },
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
}

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1 },
}

export const floatIn: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
  },
}

export const staggerRow = (delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: delay },
  },
})

export const hoverGlow = {
  whileHover: { scale: 1.02, filter: "drop-shadow(0 0 8px rgba(204,255,17,0.4))" },
  whileTap: { scale: 0.98 },
}
