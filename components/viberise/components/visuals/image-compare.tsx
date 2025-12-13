"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const BRAND = "#CCFF11"

export interface CompareSide {
  src: string
  alt: string
  label: string
}
export interface ImageCompareProps {
  left: CompareSide
  right: CompareSide
  gapLabel: string
}

export function ImageCompare({ left, right, gapLabel }: ImageCompareProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const [pos, setPos] = React.useState(56)
  const [dragging, setDragging] = React.useState(false)
  const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max)

  const setFromClientX = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const next = ((clientX - rect.left) / rect.width) * 100
    setPos(clamp(next, 0, 100))
  }

  const onPointerDown = (e: React.PointerEvent) => {
    ;(e.currentTarget as HTMLDivElement).setPointerCapture?.(e.pointerId)
    setDragging(true)
    setFromClientX(e.clientX)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (e.buttons !== 1) return
    setFromClientX(e.clientX)
  }
  const onPointerUp = () => setDragging(false)

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      setPos((p) => clamp(p - 3, 0, 100))
    } else if (e.key === "ArrowRight") {
      e.preventDefault()
      setPos((p) => clamp(p + 3, 0, 100))
    }
  }

  return (
    <div
      className="group relative w-full overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-black/40 supports-[backdrop-filter]:backdrop-blur-md"
      ref={containerRef}
    >
      {/* Outer neon frame */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-[rgba(204,255,17,0.25)] shadow-[0_0_80px_rgba(204,255,17,0.18)]" />

      {/* Right image (Talent) */}
      <div className="relative">
        <div className="aspect-[16/9] w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={right.src || "/placeholder.svg"}
            alt={right.alt}
            width={1600}
            height={900}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_30%,rgba(204,255,17,0.20),transparent_60%)]" />
        </div>
        <div className="pointer-events-none absolute bottom-4 right-4">
          <span className="rounded-full bg-black/60 px-3 py-1 text-xs text-white shadow-md ring-1 ring-white/10 dark:bg-white/10 dark:text-white">
            {right.label}
          </span>
        </div>
      </div>

      {/* Left image (Company) clipped by slider */}
      <div className="absolute inset-y-0 left-0" style={{ width: `${pos}%` }} aria-hidden="true">
        <div className="relative h-full w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={left.src || "/placeholder.svg"}
            alt={left.alt}
            width={1600}
            height={900}
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-gray-200/70 to-gray-500/40 dark:from-zinc-900/80 dark:to-zinc-700/40" />
          <div className="pointer-events-none absolute bottom-4 left-4">
            <span className="rounded-full bg-white/70 px-3 py-1 text-xs text-black shadow-sm ring-1 ring-black/10 dark:bg-white/10 dark:text-white">
              {left.label}
            </span>
          </div>
        </div>
      </div>

      {/* Draggable divider + knob + centered gap badge */}
      <div
        role="slider"
        tabIndex={0}
        aria-label={gapLabel}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        aria-describedby="gap-badge"
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        className="absolute inset-y-0"
        style={{ left: `calc(${pos}% - 1px)` }}
      >
        {/* The glowing divider line */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[2px] bg-[rgba(204,255,17,0.9)] shadow-[0_0_24px_rgba(204,255,17,0.8),0_0_40px_rgba(204,255,17,0.6)] divider-glow" />

        {/* Knob */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2">
          <button
            type="button"
            className={cn(
              "grid place-items-center rounded-full bg-[#CCFF11] text-black h-10 w-10 shadow-lg ring-2 ring-[rgba(204,255,17,0.6)] transition will-change-transform",
              "focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(204,255,17,0.75)]",
              dragging ? "scale-105" : "group-hover:scale-105",
            )}
            aria-hidden="true"
            onPointerDown={onPointerDown}
          >
            <span className="sr-only">{gapLabel}</span>
            {"↔"}
          </button>
        </div>

        {/* Centered Gap Badge (under the knob) */}
        <div
          id="gap-badge"
          className="pointer-events-none absolute left-1/2 -translate-x-1/2"
          style={{ top: "calc(50% + 42px)" }}
        >
          <div className="relative">
            <div className="mx-auto w-max rounded-full bg-[#CCFF11]/95 px-3 py-1 text-xs font-medium text-black shadow-md ring-1 ring-[rgba(204,255,17,0.6)]">
              {gapLabel}
            </div>
            {/* caret */}
            <div
              className="mx-auto h-0 w-0"
              style={{
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderBottom: `6px solid ${BRAND}`,
                transform: "translateY(-6px)",
              }}
            />
          </div>
        </div>
      </div>

      {/* slight 3D hover tilt */}
      <div className="pointer-events-none absolute inset-0 transition duration-500 group-hover:[transform:perspective(1200px)_rotateX(1.2deg)]" />
    </div>
  )
}
