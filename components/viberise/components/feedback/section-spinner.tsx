"use client"

import { BrandMark } from "@/components/viberise/components/brand/brand-mark"

export interface SectionSpinnerProps {
  label?: string
  minHeight?: number
}

export function SectionSpinner({ label = "Loading...", minHeight = 320 }: SectionSpinnerProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className="grid w-full place-items-center"
      style={{ minHeight }}
    >
      <div className="relative h-16 w-16">
        {/* Center badge */}
        <div className="absolute inset-0 z-10 grid place-items-center rounded-2xl bg-white/80 text-black shadow-xl ring-2 ring-[rgba(204,255,17,0.55)] backdrop-blur dark:bg-white/10 dark:text-white">
          <BrandMark size={22} className="text-[var(--brand)]" decorative />
        </div>
        {/* Outer ring */}
        <div className="absolute inset-0">
          <span className="spinner-ring block h-full w-full rounded-full border-2 border-[rgba(204,255,17,0.35)] border-l-transparent" />
        </div>
      </div>
      <span className="mt-3 text-xs text-black/60 dark:text-white/60">{label}</span>

      <style jsx>{`
        .spinner-ring {
          animation: spin 0.9s linear infinite;
          box-shadow: 0 0 20px rgba(204, 255, 17, 0.25), inset 0 0 10px rgba(204, 255, 17, 0.1);
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}
