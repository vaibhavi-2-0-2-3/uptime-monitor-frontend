import type * as React from "react"
import { cn } from "@/lib/utils"

export interface BrandMarkProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  decorative?: boolean
  title?: string
}

/**
 * PulseWatch Neon Monogram (PW)
 * - Vector, retina-crisp at any size
 * - Uses currentColor for strokes so it follows text color (we color it with --brand)
 * - Layered neon ring + soft glass highlight + pulse/heartbeat motif
 * - No JS, minimal SVG filters for glow, great in dark and light themes
 */
export function BrandMark({
  size = 28,
  decorative = false,
  title = "PulseWatch logo",
  className,
  ...props
}: BrandMarkProps) {
  const ariaProps = decorative ? { "aria-hidden": true } : { role: "img", "aria-label": title, focusable: false }

  // viewBox designed at 128x128 for detail; scaled via width/height
  return (
    <svg width={size} height={size} viewBox="0 0 128 128" className={cn("block", className)} {...ariaProps} {...props}>
      <defs>
        {/* Neon stroke gradient */}
        <linearGradient id="pw-neon" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.65" />
        </linearGradient>

        {/* Inner subtle glass shine */}
        <radialGradient id="pw-shine" cx="35%" cy="22%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>

        {/* Outer soft glow */}
        <filter id="pw-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.2" result="g1" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="4.6" result="g2" />
          <feMerge>
            <feMergeNode in="g2" />
            <feMergeNode in="g1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Bevel-ish inner light ring */}
        <linearGradient id="pw-ring-lite" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Background plate: subtle glassy inset so mark feels premium but adapts to theme */}
      <g>
        <rect x="10" y="10" width="108" height="108" rx="28" fill="url(#pw-shine)" />
      </g>

      {/* Outer neon ring */}
      <g filter="url(#pw-glow)" opacity="0.98">
        <rect x="14" y="14" width="100" height="100" rx="26" fill="none" stroke="url(#pw-neon)" strokeWidth="3.5" />
      </g>

      {/* Inner fine ring for depth */}
      <rect
        x="18"
        y="18"
        width="92"
        height="92"
        rx="24"
        fill="none"
        stroke="url(#pw-ring-lite)"
        strokeWidth="1.5"
        opacity="0.7"
      />

      <g filter="url(#pw-glow)">
        {/* Heartbeat/pulse line - representing uptime monitoring */}
        <path
          d="M28 64 L42 64 L48 48 L56 80 L64 40 L72 88 L80 48 L86 64 L100 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Small dot indicator - like a status indicator */}
        <circle cx="100" cy="64" r="6" fill="currentColor" opacity="0.9" />
      </g>

      {/* Soft highlight streaks on strokes for a premium finish */}
      <g opacity="0.55">
        <path
          d="M30 64 L42 64 L48 50 L56 78 L64 42 L72 86 L80 50 L86 64 L98 64"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.5"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}
