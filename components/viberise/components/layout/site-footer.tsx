import Link from "next/link"
import { CONTACT_MAILTO, SITE_NAME } from "@/lib/site"
import { BrandMark } from "@/components/viberise/components/brand/brand-mark"

export function SiteFooter() {
  return (
    <footer
      className="relative z-10 border-t border-white/10 bg-transparent text-white/90 dark:text-white/80"
      aria-label={`${SITE_NAME} footer`}
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6 md:py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:gap-8">
          <div className="flex items-center gap-3">
            <BrandMark size={20} />
            <span className="text-sm font-medium tracking-wide text-white">{SITE_NAME}</span>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-4 md:gap-6">
            <Link
              href="#how-it-works"
              className="text-sm text-white/80 transition hover:text-[var(--brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]"
            >
              How it works
            </Link>
            <Link
              href="#faq"
              className="text-sm text-white/80 transition hover:text-[var(--brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]"
            >
              FAQ
            </Link>
            <a
              href={CONTACT_MAILTO}
              className="text-sm text-white/90 underline decoration-white/30 underline-offset-4 transition hover:text-black hover:decoration-[var(--brand)] hover:bg-[var(--brand)] hover:px-2 hover:py-1 hover:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]"
            >
              Contact
            </a>
          </nav>
        </div>

        <div className="mt-8 flex items-center justify-center">
          <p className="text-xs text-white/60">
            {"© "}
            {new Date().getFullYear()} {SITE_NAME}. {"All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  )
}
