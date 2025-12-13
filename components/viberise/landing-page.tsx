"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import { useToast } from "@/hooks/use-toast"
import { ScrollProgress } from "@/components/viberise/components/feedback/scroll-progress"
import { Header } from "@/components/viberise/components/layout/header"
import { SiteFooter } from "@/components/viberise/components/layout/site-footer"
import { BackToTop } from "@/components/viberise/components/feedback/back-to-top"
import { GlobalStyles } from "@/components/viberise/components/styles/global-styles"
import { useThemeToggle } from "@/components/viberise/hooks/use-theme-toggle"
import { usePrefersReducedMotion } from "@/components/viberise/hooks/use-prefers-reduced-motion"
import { useScrollProgress } from "@/components/viberise/hooks/use-scroll-progress"
import { burstConfetti } from "@/components/viberise/utils/burst-confetti"
import { MotionProvider } from "@/components/viberise/components/styles/motion-provider"
import { motion } from "framer-motion"
import { fadeIn } from "@/components/viberise/utils/motion-presets"
import { SectionSpinner } from "@/components/viberise/components/feedback/section-spinner"

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; name: string },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode; name: string }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log(`[v0] Error in ${this.props.name}:`, error.message, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded-lg m-4">
          <p className="font-bold">Error in {this.props.name}:</p>
          <p className="text-sm">{this.state.error?.message}</p>
        </div>
      )
    }
    return this.props.children
  }
}

const Hero = dynamic(() => import("@/components/viberise/components/sections/hero").then((m) => m.Hero), {
  ssr: false,
  loading: () => <SectionSpinner label="Preparing hero..." minHeight={420} />,
})
const Problem = dynamic(() => import("@/components/viberise/components/sections/problem").then((m) => m.Problem), {
  ssr: false,
  loading: () => <SectionSpinner label="Loading section..." />,
})
const Solution = dynamic(() => import("@/components/viberise/components/sections/solution").then((m) => m.Solution), {
  ssr: false,
  loading: () => <SectionSpinner label="Loading section..." />,
})
const HowItWorks = dynamic(
  () => import("@/components/viberise/components/sections/how-it-works").then((m) => m.HowItWorks),
  { ssr: false, loading: () => <SectionSpinner label="Loading chart..." /> },
)
const ForWhom = dynamic(() => import("@/components/viberise/components/sections/for-whom").then((m) => m.ForWhom), {
  ssr: false,
  loading: () => <SectionSpinner label="Loading section..." />,
})
const FAQ = dynamic(() => import("@/components/viberise/components/sections/faq").then((m) => m.FAQ), {
  ssr: false,
  loading: () => <SectionSpinner label="Loading FAQ..." />,
})
const Waitlist = dynamic(() => import("@/components/viberise/components/sections/waitlist").then((m) => m.Waitlist), {
  ssr: false,
  loading: () => <SectionSpinner label="Loading waitlist..." />,
})

export default function LandingPage() {
  console.log("[v0] LandingPage rendering")

  const { theme, setTheme } = useThemeToggle()
  const reduced = usePrefersReducedMotion()
  const progress = useScrollProgress()
  const { toast } = useToast()

  React.useEffect(() => {
    document.title = "PulseWatch — Real-time Uptime Monitoring"
  }, [])

  const [showTop, setShowTop] = React.useState(false)
  React.useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Smooth hash links
  React.useEffect(() => {
    const onHashClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null
      const a = t?.closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!a) return
      const href = a.getAttribute("href") || ""
      if (!href.startsWith("#")) return
      const el = document.querySelector(href) as HTMLElement | null
      if (!el) return
      e.preventDefault()
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" })
      history.pushState(null, "", href)
    }
    document.addEventListener("click", onHashClick)
    return () => document.removeEventListener("click", onHashClick)
  }, [])

  // Robust initial hash scroll (works with dynamic sections)
  React.useEffect(() => {
    const { hash } = window.location
    if (!hash) return
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const tryScroll = () => {
      const el = document.querySelector(hash) as HTMLElement | null
      if (!el) return false
      el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" })
      return true
    }
    if (tryScroll()) return
    const obs = new MutationObserver(() => {
      if (tryScroll()) obs.disconnect()
    })
    obs.observe(document.body, { childList: true, subtree: true })
    const timeout = setTimeout(() => obs.disconnect(), 5000)
    return () => {
      obs.disconnect()
      clearTimeout(timeout)
    }
  }, [])

  // Waitlist state - updated roles for PulseWatch
  const [role, setRole] = React.useState<"developer" | "devops" | "business" | null>(null)
  const [email, setEmail] = React.useState("")
  const [submitting, setSubmitting] = React.useState(false)
  const [emailError, setEmailError] = React.useState<string | null>(null)
  const [roleError, setRoleError] = React.useState<string | null>(null)

  // Success state
  const [success, setSuccess] = React.useState(false)
  const [submittedEmail, setSubmittedEmail] = React.useState<string | null>(null)
  const [submittedRole, setSubmittedRole] = React.useState<"developer" | "devops" | "business" | null>(null)

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setEmailError(null)
    setRoleError(null)

    if (!role) {
      setRoleError("Please select your role first.")
      document.querySelector("#waitlist")?.scrollIntoView({ behavior: "smooth", block: "start" })
      return
    }
    if (!validateEmail(email)) {
      setEmailError("Enter a valid email")
      return
    }

    try {
      setSubmitting(true)
      const currentEmail = email
      const currentRole = role
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: currentEmail, role: currentRole }),
      })
      if (res.status === 409 || res.ok) {
        setSubmittedEmail(currentEmail)
        setSubmittedRole(currentRole)
        setSuccess(true)
        toast({ title: "You're on the list! Welcome to PulseWatch." })
        burstConfetti()
        setEmail("")
        setRole(null)
        return
      }
      throw new Error("failed")
    } catch {
      toast({ title: "Something went wrong. Please try again." })
    } finally {
      setSubmitting(false)
    }
  }

  function resetSuccess() {
    setSuccess(false)
  }

  console.log("[v0] About to render components")

  return (
    <MotionProvider>
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeIn}
        className="min-h-[100dvh] bg-white text-black dark:bg-black dark:text-white"
      >
        <GlobalStyles />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-md focus:bg-[var(--brand)] focus:px-3 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>
        <ScrollProgress value={progress} />
        <ErrorBoundary name="Header">
          <Header theme={theme} setTheme={setTheme} />
        </ErrorBoundary>
        <main id="main" className="flex-1">
          <ErrorBoundary name="Hero">
            <Hero reduced={reduced} />
          </ErrorBoundary>
          <ErrorBoundary name="Problem">
            <Problem />
          </ErrorBoundary>
          <ErrorBoundary name="Solution">
            <Solution />
          </ErrorBoundary>
          <ErrorBoundary name="HowItWorks">
            <HowItWorks />
          </ErrorBoundary>
          <ErrorBoundary name="ForWhom">
            <ForWhom />
          </ErrorBoundary>
          <ErrorBoundary name="FAQ">
            <FAQ />
          </ErrorBoundary>
          <ErrorBoundary name="Waitlist">
            <Waitlist
              role={role}
              setRole={(r) => {
                setRole(r)
                if (roleError) setRoleError(null)
              }}
              email={email}
              setEmail={(v) => {
                setEmail(v)
                if (emailError && validateEmail(v)) setEmailError(null)
              }}
              onSubmit={handleSubmit}
              emailError={emailError}
              submitting={submitting}
              success={success}
              submittedEmail={submittedEmail ?? undefined}
              submittedRole={submittedRole ?? undefined}
              onJoinAnother={resetSuccess}
              roleError={roleError ?? undefined}
            />
          </ErrorBoundary>
        </main>
        <ErrorBoundary name="SiteFooter">
          <SiteFooter />
        </ErrorBoundary>
        <BackToTop visible={showTop} />
      </motion.div>
    </MotionProvider>
  )
}
