import { motion } from "framer-motion"
import { sectionReveal, popIn, fadeUp, staggerRow } from "../../utils/motion-presets"

export function ForWhom() {
  const items = [
    { title: "For Developers", desc: "Monitor APIs, webhooks, and microservices with ease." },
    { title: "For DevOps Teams", desc: "Integrate with your CI/CD pipeline and incident workflows." },
    { title: "For Business Owners", desc: "Protect revenue with proactive uptime monitoring." },
  ]

  const quotes = [
    {
      name: "Sarah K.",
      role: "Lead Engineer @ TechStart",
      quote: "PulseWatch caught an API outage 2 minutes in. Our customers never noticed.",
      init: "SK",
    },
    {
      name: "Marcus T.",
      role: "DevOps Manager",
      quote: "The response-time charts helped us identify a slow database query before it became critical.",
      init: "MT",
    },
  ]

  return (
    <motion.section
      id="for-whom"
      className="border-t border-black/10 dark:border-white/10 vh-section"
      variants={sectionReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-20% 0px" }}
    >
      <div className="container mx-auto min-h-full px-4 flex items-center">
        <div className="w-full">
          <motion.h2 className="text-3xl md:text-4xl font-bold" variants={fadeUp}>
            Built for Teams That Ship. Trusted by Those Who Scale.
          </motion.h2>

          <motion.div className="mt-8 grid gap-6 md:grid-cols-3" variants={staggerRow(0.1)}>
            {items.map((it) => (
              <motion.div
                key={it.title}
                variants={popIn}
                whileHover={{ y: -2 }}
                className="rounded-2xl border border-black/10 bg-white/60 p-6 shadow-sm transition dark:border-white/10 dark:bg-black/40"
              >
                <h3 className="text-xl font-semibold">{it.title}</h3>
                <p className="mt-2 text-black/70 dark:text-white/70">{it.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="mt-10 grid gap-6 md:grid-cols-2" variants={staggerRow(0.15)}>
            {quotes.map((q) => (
              <motion.div key={q.name} variants={popIn} whileHover={{ y: -2 }}>
                <div className="border-black/10 bg-white/60 dark:border-white/10 dark:bg-black/40 border rounded-lg p-6">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand)] text-black font-semibold text-sm">
                      {q.init}
                    </div>
                    <div>
                      <div className="font-semibold">{q.name}</div>
                      <div className="text-xs text-black/60 dark:text-white/60">{q.role}</div>
                    </div>
                  </div>
                  <p className="mt-4 text-black/80 dark:text-white/80">&ldquo;{q.quote}&rdquo;</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
