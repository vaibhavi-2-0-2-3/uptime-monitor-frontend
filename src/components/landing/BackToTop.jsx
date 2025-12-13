export function BackToTop({ visible = false }) {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    })
  }

  if (!visible) return null

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 rounded-full bg-[var(--brand)] p-3 text-black shadow-lg hover:shadow-xl transition-shadow"
      aria-label="Back to top"
      title="Back to top"
    >
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 14l-7-7m0 0L5 14m7-7v12"
        />
      </svg>
    </button>
  )
}
