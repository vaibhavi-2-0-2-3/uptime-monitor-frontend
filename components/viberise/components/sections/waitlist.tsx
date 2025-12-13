"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle2, Users, BellRing, PartyPopper, ArrowLeft, Sparkles, AlertCircle } from "lucide-react"
import { sectionReveal, fadeUp, popIn, staggerRow } from "@/components/viberise/utils/motion-presets"

export interface WaitlistProps {
  role: "developer" | "devops" | "business" | null
  setRole: (r: "developer" | "devops" | "business") => void
  email: string
  setEmail: (v: string) => void
  onSubmit: (e: React.FormEvent) => void
  emailError: string | null
  submitting: boolean
  success?: boolean
  submittedEmail?: string
  submittedRole?: "developer" | "devops" | "business"
  onJoinAnother?: () => void
  roleError?: string
}

export function Waitlist({
  role,
  setRole,
  email,
  setEmail,
  onSubmit,
  emailError,
  submitting,
  success = false,
  submittedEmail,
  submittedRole,
  onJoinAnother,
  roleError,
}: WaitlistProps) {
  const roles = [
    { key: "developer" as const, label: "Developer", desc: "I build and ship applications", emoji: "👨‍💻" },
    { key: "devops" as const, label: "DevOps / SRE", desc: "I manage infrastructure reliability", emoji: "🔧" },
    { key: "business" as const, label: "Business Owner", desc: "I need to protect my online presence", emoji: "💼" },
  ]

  const [count, setCount] = React.useState<number | null>(null)
  React.useEffect(() => {
    let mounted = true
    fetch("/api/waitlist", { method: "GET", cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return
        const n = typeof data?.count === "number" ? data.count : null
        setCount(n)
      })
      .catch(() => {
        if (!mounted) return
        setCount(null)
      })
    return () => {
      mounted = false
    }
  }, [])

  const perks = [
    { title: "Early access", desc: "Be first to try PulseWatch when we launch.", icon: BellRing },
    { title: "Founder pricing", desc: "Lock in special rates for early supporters.", icon: Users },
    { title: "Priority support", desc: "Direct line to our engineering team.", icon: CheckCircle2 },
  ] as const

  if (success) {
    return (
      <motion.section
        id="waitlist"
        className="border-t border-black/10 dark:border-white/10 vh-section"
        variants={sectionReveal}
        initial="hidden"
        animate="show"
      >
        <div className="vh-center container mx-auto px-4">
          <div className="mx-auto w-full max-w-2xl text-center text-black dark:text-white">
            <motion.div
              variants={popIn}
              className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/60 px-3 py-1 text-xs text-black/80 backdrop-blur dark:bg-white/10 dark:text-white/80"
            >
              <Sparkles className="h-3.5 w-3.5 text-[var(--brand)]" />
              <span>{"You're officially on the list"}</span>
            </motion.div>

            <motion.h2
              className="mt-6 text-3xl md:text-4xl font-extrabold tracking-tight text-black dark:text-white"
              variants={fadeUp}
            >
              {"Welcome to PulseWatch!"}
            </motion.h2>

            <motion.p className="mt-3 text-black/70 dark:text-white/70" variants={fadeUp} aria-live="polite">
              {submittedEmail
                ? `We saved ${submittedEmail}${submittedRole ? ` as ${submittedRole}.` : "."}`
                : "We saved your details."}{" "}
              {"We'll email you when we're ready to launch."}
            </motion.p>

            {typeof count === "number" && (
              <motion.div
                variants={fadeUp}
                className="mt-3 mx-auto inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs text-black/80 ring-1 ring-black/10 dark:bg-white/10 dark:text-white/80 dark:ring-white/10"
              >
                <span className="inline-block h-2 w-2 rounded-full bg-[var(--brand)] shadow-[0_0_8px_rgba(204,255,17,0.8)]" />
                <span className="font-medium">{`Early adopters: ${count}`}</span>
              </motion.div>
            )}

            <motion.div
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-center"
              variants={staggerRow(0.05)}
            >
              <motion.div variants={popIn} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link href="#main" className="inline-flex w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-[var(--brand)] text-black hover:bg-[color:rgb(204,255,17,0.9)]">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {"Back Landing"}
                  </Button>
                </Link>
              </motion.div>
              <motion.div variants={popIn} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link href="#how-it-works" className="inline-flex w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto border-white/15 bg-white/60 hover:bg-white/80 dark:border-white/15 dark:bg-white/10"
                  >
                    <PartyPopper className="mr-2 h-4 w-4" />
                    {"Explore features"}
                  </Button>
                </Link>
              </motion.div>
              {onJoinAnother && (
                <motion.div
                  variants={popIn}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto"
                >
                  <button
                    type="button"
                    onClick={onJoinAnother}
                    className="w-full sm:w-auto inline-flex items-center justify-center rounded-md border border-black/10 bg-white/60 px-4 py-2 text-sm font-medium transition hover:bg-white/80 dark:border-white/15 dark:bg-white/10"
                  >
                    {"Add another email"}
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
        <style jsx>{`
          .vh-center {
            min-height: calc(100svh - var(--header-h));
            display: grid;
            place-items: center;
          }
          @supports not (height: 1svh) {
            .vh-center {
              min-height: calc(100dvh - var(--header-h));
            }
          }
        `}</style>
      </motion.section>
    )
  }

  return (
    <motion.section
      id="waitlist"
      className="border-t border-black/10 dark:border-white/10 vh-section"
      variants={sectionReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-20% 0px" }}
    >
      <div className="container mx-auto min-h-full px-4">
        <div className="w-full">
          <div className="flex items-center justify-between gap-3">
            <motion.h2 className="text-3xl md:text-4xl font-bold" variants={fadeUp}>
              {"Get Early Access to PulseWatch"}
            </motion.h2>
            {typeof count === "number" && (
              <motion.div
                variants={fadeUp}
                className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs text-black/80 ring-1 ring-black/10 dark:bg-white/10 dark:text-white/80 dark:ring-white/10"
                aria-live="polite"
              >
                <span className="inline-block h-2 w-2 rounded-full bg-[var(--brand)] shadow-[0_0_8px_rgba(204,255,17,0.8)]" />
                <span className="font-medium">{`Early adopters: ${count}`}</span>
              </motion.div>
            )}
          </div>

          {/* Role select */}
          <motion.div
            className="mt-6 grid gap-4 sm:grid-cols-3"
            variants={staggerRow(0.05)}
            animate={roleError ? "shake" : "idle"}
          >
            {roles.map((r) => {
              const active = role === r.key
              return (
                <motion.button
                  key={r.key}
                  type="button"
                  onClick={() => setRole(r.key)}
                  variants={popIn}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={[
                    "text-left rounded-2xl border p-4 transition focus:outline-none focus-visible:ring-4",
                    active
                      ? "border-[rgba(204,255,17,0.5)] bg-[rgba(204,255,17,0.1)] ring-[rgba(204,255,17,0.3)]"
                      : roleError
                        ? "border-red-400 bg-white/60 dark:bg-black/40"
                        : "border-black/10 bg-white/60 hover:border-[rgba(204,255,17,0.4)] dark:border-white/10 dark:bg-black/40",
                  ].join(" ")}
                  aria-pressed={active}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" aria-hidden="true">
                      {r.emoji}
                    </span>
                    <div>
                      <div className="font-semibold">{r.label}</div>
                      <div className="text-sm text-black/70 dark:text-white/70">{r.desc}</div>
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </motion.div>

          {roleError && (
            <div
              className="mt-2 flex items-center gap-2 text-sm text-red-600 dark:text-red-400"
              role="alert"
              aria-live="assertive"
            >
              <AlertCircle className="h-4 w-4" />
              <span>{roleError}</span>
            </div>
          )}

          {/* Email form */}
          <motion.form
            className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]"
            onSubmit={onSubmit}
            variants={staggerRow(0.1)}
          >
            <label htmlFor="email" className="sr-only">
              {"Email"}
            </label>
            <motion.div variants={fadeUp}>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                placeholder={"Enter your work email for early access"}
                className="bg-white/70 dark:bg-black/50"
                aria-invalid={!!emailError}
                aria-describedby={emailError ? "email-err" : undefined}
                required
              />
            </motion.div>
            <motion.div variants={popIn} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                className="w-full sm:w-auto bg-[var(--brand)] text-black hover:bg-[color:rgb(204,255,17,0.9)] disabled:opacity-60"
                disabled={submitting}
              >
                {submitting ? "Joining..." : "Get Early Access"}
              </Button>
            </motion.div>
          </motion.form>
          {emailError && (
            <motion.p
              id="email-err"
              className="mt-2 text-sm text-red-600 dark:text-red-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {emailError}
            </motion.p>
          )}

          {/* Perks */}
          <motion.div className="mt-8 grid gap-4 sm:grid-cols-3" variants={staggerRow(0.1)}>
            {perks.map((p) => {
              const Icon = p.icon
              return (
                <motion.div
                  key={p.title}
                  variants={popIn}
                  whileHover={{ y: -2 }}
                  className="flex items-start gap-3 rounded-2xl border border-black/10 bg-white/60 p-4 dark:border-white/10 dark:bg-black/40"
                >
                  <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(204,255,17,0.15)] ring-1 ring-[rgba(204,255,17,0.3)]">
                    <Icon className="h-4 w-4 text-[var(--brand)]" />
                  </span>
                  <div>
                    <div className="font-semibold">{p.title}</div>
                    <div className="text-sm text-black/70 dark:text-white/70">{p.desc}</div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          20% {
            transform: translateX(-4px);
          }
          40% {
            transform: translateX(4px);
          }
          60% {
            transform: translateX(-3px);
          }
          80% {
            transform: translateX(3px);
          }
        }
        [data-animate="shake"] {
          animation: shake 0.35s ease-in-out;
        }
      `}</style>
    </motion.section>
  )
}
