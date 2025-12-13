import { motion } from "framer-motion"
import { Activity, Bell, BarChart3, Timer, ShieldCheck, Globe, ArrowRight } from "lucide-react"
import { sectionReveal, fadeUp, popIn, staggerRow } from "../../utils/motion-presets"

export function Solution() {
  const items = [
    {
      title: "Monitor Websites & APIs",
      desc: "Continuous health checks from global locations every 30 seconds.",
      icon: Activity,
    },
    {
      title: "Real-time Alerts",
      desc: "Get notified instantly via Email, SMS, Slack, or Telegram.",
      icon: Bell,
    },
    {
      title: "Response-time Analytics",
      desc: "Track performance trends with detailed charts and insights.",
      icon: BarChart3,
    },
  ]

  const metrics = [
    { icon: Timer, label: "Check interval", value: "30 seconds" },
    { icon: Globe, label: "Global locations", value: "12+ regions" },
    { icon: ShieldCheck, label: "Uptime SLA", value: "99.99%" },
  ]

  return (
    <motion.section
      id="solution"
      className="border-t border-black/10 dark:border-white/10 vh-section"
      variants={sectionReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-20% 0px" }}
    >
      <div className="container mx-auto min-h-full px-4 flex items-center">
        <div className="w-full">
          <motion.h2 className="text-3xl md:text-4xl font-bold" variants={fadeUp}>
            Complete Uptime Monitoring, Zero Complexity.
          </motion.h2>

          <motion.div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" variants={staggerRow(0.1)}>
            {items.map((item) => {
              const Icon = item.icon
              return (
                <motion.div key={item.title} variants={popIn} whileHover={{ y: -2 }}>
                  <div className="group border-black/10 dark:border-white/10 bg-white/60 dark:bg-black/40 rounded-lg border p-6">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[color:rgba(204,255,17,0.15)] ring-1 ring-[rgba(204,255,17,0.3)]">
                        <Icon className="h-5 w-5 text-[var(--brand)]" />
                      </span>
                      <h3 className="font-semibold">{item.title}</h3>
                    </div>
                    <p className="mt-3 text-black/70 dark:text-white/70">{item.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          <motion.div className="mt-8 grid gap-4 sm:grid-cols-3" variants={staggerRow(0.2)}>
            {metrics.map((m) => {
              const Icon = m.icon
              return (
                <motion.div key={m.label} variants={fadeUp}>
                  <div className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white/60 p-4 dark:border-white/10 dark:bg-black/40">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(204,255,17,0.15)] ring-1 ring-[rgba(204,255,17,0.3)]">
                      <Icon className="h-4 w-4 text-[var(--brand)]" />
                    </span>
                    <div>
                      <div className="text-sm text-black/60 dark:text-white/60">{m.label}</div>
                      <div className="font-semibold">{m.value}</div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          <motion.div
            className="mt-10 rounded-2xl border border-black/10 bg-white/60 px-5 py-4 dark:border-white/10 dark:bg-black/40"
            variants={popIn}
          >
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <div className="max-w-2xl">
                <p className="font-medium">
                  Ready to stop downtime before it starts? Join the waitlist for early access.
                </p>
              </div>
              <a href="#waitlist" className="inline-flex">
                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                  <button className="bg-[var(--brand)] text-black hover:bg-[color:rgb(204,255,17,0.9)] px-4 py-2 rounded-md font-medium transition flex items-center gap-2">
                    Get Early Access
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </motion.div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
