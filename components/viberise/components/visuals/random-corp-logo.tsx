"use client"

import * as React from "react"

export interface RandomCorpLogoProps {
  size?: number
  seed: number
  className?: string
  title?: string
  "aria-label"?: string
}

// Tiny seeded RNG (mulberry32)
function mulberry32(a: number) {
  return () => {
    let t = (a += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function RandomCorpLogo({ size = 160, seed, className, title, ...rest }: RandomCorpLogoProps) {
  const rnd = React.useMemo(() => mulberry32(Math.floor(seed * 1e9) || 1), [seed])

  // Palette: cold grays
  const bg = ["#f3f4f6", "#e5e7eb", "#f9fafb"][Math.floor(rnd() * 3)]
  const fg = ["#9ca3af", "#a1a1aa", "#6b7280"][Math.floor(rnd() * 3)]
  const accent = ["#c7cbd1", "#bfc5cd", "#d1d5db"][Math.floor(rnd() * 3)]

  // Shape decisions
  const rounded = rnd() > 0.5
  const angleA = Math.floor(rnd() * 360)
  const angleB = angleA + (rnd() > 0.5 ? 90 + rnd() * 30 : 45 + rnd() * 20)
  const stripeW = 14 + Math.floor(rnd() * 18)
  const stripeR = 18 + Math.floor(rnd() * 24)

  // Mark geometry with abstract bars + dot
  const cx = size / 2
  const cy = size / 2

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" className={className} {...rest}>
      {title ? <title>{title}</title> : null}
      {/* Background plate */}
      <defs>
        <radialGradient id="bg" cx="50%" cy="40%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor={bg} />
        </radialGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(0,0,0,0.10)" />
        </filter>
      </defs>
      <rect
        x="8"
        y="8"
        width={size - 16}
        height={size - 16}
        rx={rounded ? 28 : 8}
        fill="url(#bg)"
        stroke="#e5e7eb"
        strokeWidth="1"
        filter="url(#shadow)"
      />
      {/* Abstract stripes */}
      <g transform={`translate(${cx} ${cy}) rotate(${angleA})`}>
        <rect x={-stripeW / 2} y={-stripeR} width={stripeW} height={stripeR * 2} fill={fg} rx={6} />
      </g>
      <g transform={`translate(${cx} ${cy}) rotate(${angleB})`}>
        <rect x={-stripeW / 2} y={-stripeR * 0.8} width={stripeW} height={stripeR * 1.6} fill={accent} rx={6} />
      </g>
      {/* Dot accent */}
      <circle cx={cx + (rnd() * 30 - 15)} cy={cy + (rnd() * 30 - 15)} r={6 + rnd() * 6} fill={fg} opacity="0.7" />
    </svg>
  )
}
