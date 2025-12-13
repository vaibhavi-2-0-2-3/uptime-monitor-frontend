export function SectionSpinner({ label = "Loading...", minHeight = 200 }) {
  return (
    <div
      className="flex items-center justify-center"
      style={{ minHeight: `${minHeight}px` }}
    >
      <div className="text-center">
        <div className="inline-block">
          <div
            className="h-8 w-8 border-4 border-[var(--brand)] border-t-transparent rounded-full animate-spin"
            aria-label={label}
          />
        </div>
        {label && (
          <p className="mt-3 text-sm text-black/70 dark:text-white/70">{label}</p>
        )}
      </div>
    </div>
  )
}
