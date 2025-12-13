import React, { useState } from "react"
import { motion } from "framer-motion"
import { GlobalStyles } from "../components/landing/GlobalStyles"
import { MotionProvider } from "../components/landing/MotionProvider"
import { ScrollProgress } from "../components/landing/ScrollProgress"
import { Header } from "../components/landing/Header"
import { SiteFooter } from "../components/landing/SiteFooter"
import { BackToTop } from "../components/landing/BackToTop"
import { useThemeToggle } from "../hooks/useThemeToggle"
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion"
import { useScrollProgress } from "../hooks/useScrollProgress"
import { useToast } from "../hooks/useToast"
import { burstConfetti } from "../utils/burst-confetti"
import { fadeIn } from "../utils/motion-presets"
import { SectionSpinner } from "../components/landing/SectionSpinner"
import { Hero } from "../components/landing/Hero"
import { Problem } from "../components/landing/Problem"
import { Solution } from "../components/landing/Solution"
import { HowItWorks } from "../components/landing/HowItWorks"
import { ForWhom } from "../components/landing/ForWhom"
import { FAQ } from "../components/landing/FAQ"
import { Waitlist } from "../components/landing/Waitlist"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
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

export function Landing() {
  const { theme, setTheme } = useThemeToggle()
  const reduced = usePrefersReducedMotion()
  const progress = useScrollProgress()
  const { toast } = useToast()

  const [showTop, setShowTop] = useState(false)
  const [role, setRole] = useState(null)
  const [email, setEmail] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [emailError, setEmailError] = useState(null)
  const [roleError, setRoleError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState(null)
  const [submittedRole, setSubmittedRole] = useState(null)

  React.useEffect(() => {
    document.title = "PulseWatch — Real-time Uptime Monitoring"
  }, [])

  React.useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  React.useEffect(() => {
    const onHashClick = (e) => {
      const t = e.target
      const a = t?.closest("a[href^='#']")
      if (!a) return
      const href = a.getAttribute("href") || ""
      if (!href.startsWith("#")) return
      const el = document.querySelector(href)
      if (!el) return
      e.preventDefault()
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" })
      history.pushState(null, "", href)
    }
    document.addEventListener("click", onHashClick)
    return () => document.removeEventListener("click", onHashClick)
  }, [])

  React.useEffect(() => {
    const { hash } = window.location
    if (!hash) return
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const tryScroll = () => {
      const el = document.querySelector(hash)
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

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

  async function handleSubmit(e) {
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
              submittedEmail={submittedEmail}
              submittedRole={submittedRole}
              onJoinAnother={resetSuccess}
              roleError={roleError}
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
