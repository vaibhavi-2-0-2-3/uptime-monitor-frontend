export interface ScrollProgressProps {
  value: number
}

export function ScrollProgress({ value }: ScrollProgressProps) {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1 bg-transparent">
      <div
        className="h-full bg-[var(--brand)] shadow-[0_0_12px_rgba(204,255,17,0.8)] transition-[width]"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}
