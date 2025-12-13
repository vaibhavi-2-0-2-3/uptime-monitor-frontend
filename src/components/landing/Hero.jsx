import { motion } from "framer-motion"
import { sectionReveal, fadeUp, popIn } from "../../utils/motion-presets"
import { NeonBackground } from "./NeonBackground"
import { FloatingCoins } from "./FloatingCoins"
import { Link } from 'react-router-dom';


export function Hero({ reduced = false }) {
  return (
    <motion.section
      id="hero"
      className="relative isolate overflow-hidden grid place-items-center min-h-[calc(100dvh-var(--header-h))]"
      style={{ minHeight: "calc(100svh - var(--header-h))" }}
      variants={sectionReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-20% 0px" }}
    >
      <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none">
        <NeonBackground />
      </div>

      {!reduced && (
        <div aria-hidden="true" className="absolute inset-0 z-10 pointer-events-none">
          <FloatingCoins reduced={reduced} />
        </div>
      )}

      <div className="relative z-20 container mx-auto h-full px-4 grid place-items-center text-center">
        <div className="mx-auto max-w-4xl">
          <motion.h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl" variants={fadeUp}>
            <span className="block">Never Let Downtime</span>
            <span className="block">Go Unnoticed Again.</span>
          </motion.h1>
          <motion.p className="mt-4 max-w-2xl mx-auto text-lg text-black/70 dark:text-white/70" variants={fadeUp}>
            Real-time uptime monitoring for websites & APIs. Get instant alerts before your users notice.
          </motion.p>
          <motion.div className="mt-8 inline-flex" variants={popIn} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <a href="#waitlist">
              <Link
                to="/register">
                <button className="bg-[var(--brand)] text-black hover:bg-[color:rgb(204,255,17,0.9)] px-6 py-3 rounded-md font-medium transition">
                  Start Monitoring Free
                </button>
              </Link>
            </a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
