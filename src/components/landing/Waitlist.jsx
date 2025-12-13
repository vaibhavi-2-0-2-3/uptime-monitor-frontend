import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle2, Users, BellRing, PartyPopper, ArrowLeft, Sparkles, AlertCircle } from "lucide-react"
import { sectionReveal, fadeUp, popIn, staggerRow } from "../../utils/motion-presets"

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
}) {
  const roles = [
    { key: "developer", label: "Developer", desc: "I build and ship applications", emoji: "👨‍💻" },
    { key: "devops", label: "DevOps / SRE", desc: "I manage infrastructure reliability", emoji: "🔧" },
    { key: "business", label: "Business Owner", desc: "I need to protect my online presence", emoji: "💼" },
  ]

  const [count, setCount] = useState(null)

  useEffect(() => {
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
  ]

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
              <span>You're officially on the list</span>
            </motion.div>

            <motion.h2
              className="mt-6 text-3xl md:text-4xl font-extrabold tracking-tight text-black dark:text-white"
              variants={fadeUp}
            >
              Welcome to PulseWatch!
            </motion.h2>

            <motion.p className="mt-3 text-black/70 dark:text-white/70" variants={fadeUp} aria-live="polite">
              {submittedEmail
                ? `We saved ${submittedEmail}${submittedRole ? ` as ${submittedRole}.` : "."}`
                : "We saved your details."}{" "}
              We'll email you when we're ready to launch.
            </motion.p>

            {typeof count === "number" && (
              <motion.div
                variants={fadeUp}
                className="mt-3 mx-auto inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs text-black/80 ring-1 ring-black/10 dark:bg-white/10 dark:text-white/80 dark:ring-white/10"
              >
                <span className="inline-block h-2 w-2 rounded-full bg-[var(--brand)] shadow-[0_0_8px_rgba(204,255,17,0.8)]" />
                <span className="font-medium">Early adopters: {count}</span>
              </motion.div>
            )}

            <motion.div
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-center"
              variants={staggerRow(0.05)}
            >
              <motion.div variants={popIn} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <a href="#main" className="inline-flex w-full sm:w-auto">
                  <button className="w-full sm:w-auto bg-[var(--brand)] text-black hover:bg-[color:rgb(204,255,17,0.9)] px-4 py-2 rounded-md font-medium transition flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back Landing
                  </button>
                </a>
              </motion.div>
              <motion.div variants={popIn} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <a href="#how-it-works" className="inline-flex w-full sm:w-auto">
                  <button className="w-full sm:w-auto border-white/15 bg-white/60 hover:bg-white/80 dark:border-white/15 dark:bg-white/10 border rounded-md px-4 py-2 font-medium transition flex items-center gap-2">
                    <PartyPopper className="h-4 w-4" />
                    Explore features
                  </button>
                </a>
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
                    Add another email
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
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
      <div className="container mx-auto min-h-full px-4 flex items-center">
        <div className="w-full">
          <motion.h2 className="text-3xl md:text-4xl font-bold" variants={fadeUp}>
            Ready to Monitor with Confidence?
          </motion.h2>

          <motion.div className="mt-10 grid gap-6 md:grid-cols-3" variants={staggerRow(0.1)}>
            {perks.map((perk) => {
              const Icon = perk.icon
              return (
                <motion.div key={perk.title} variants={popIn}>
                  <div className="rounded-2xl border border-black/10 bg-white/60 p-6 dark:border-white/10 dark:bg-black/40">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(204,255,17,0.15)] ring-1 ring-[rgba(204,255,17,0.3)]">
                      <Icon className="h-5 w-5 text-[var(--brand)]" />
                    </div>
                    <h3 className="mt-3 font-semibold">{perk.title}</h3>
                    <p className="mt-2 text-black/70 dark:text-white/70 text-sm">{perk.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          <motion.form onSubmit={onSubmit} className="mt-10 mx-auto max-w-2xl" variants={fadeUp}>
            <motion.div className="space-y-4" variants={staggerRow(0.05)}>
              <motion.div variants={fadeUp}>
                <label className="block text-sm font-medium mb-2">Select your role</label>
                <div className="grid gap-3 sm:grid-cols-3">
                  {roles.map((r) => (
                    <motion.button
                      key={r.key}
                      type="button"
                      onClick={() => setRole(r.key)}
                      variants={popIn}
                      className={`rounded-lg border-2 p-4 text-left transition ${role === r.key
                        ? "border-[var(--brand)] bg-[rgba(204,255,17,0.1)]"
                        : "border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/40 hover:border-black/20 dark:hover:border-white/20"
                        }`}
                    >
                      <div className="text-xl mb-1">{r.emoji}</div>
                      <div className="font-medium text-sm">{r.label}</div>
                      <div className="text-xs text-black/60 dark:text-white/60 mt-1">{r.desc}</div>
                    </motion.button>
                  ))}
                </div>
                {roleError && (
                  <motion.div variants={fadeUp} className="mt-2 flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    {roleError}
                  </motion.div>
                )}
              </motion.div>

              <motion.div variants={fadeUp}>
                <label className="block text-sm font-medium mb-2">Email address</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 rounded-md border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/40 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
                  />
                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-[var(--brand)] text-black hover:bg-[color:rgb(204,255,17,0.9)] disabled:opacity-50 px-6 py-2 rounded-md font-medium transition"
                  >
                    {submitting ? "Joining..." : "Join Waitlist"}
                  </motion.button>
                </div>
                {emailError && (
                  <motion.div variants={fadeUp} className="mt-2 flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    {emailError}
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </motion.form>
        </div>
      </div>
    </motion.section>
  )
}
