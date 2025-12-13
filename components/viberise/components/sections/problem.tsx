"use client"

import { motion } from "framer-motion"
import { sectionReveal, fadeUp, popIn, staggerRow } from "@/components/viberise/utils/motion-presets"

export function Problem() {
  return (
    <motion.section
      id="problem"
      className="border-t border-black/10 dark:border-white/10 vh-section"
      variants={sectionReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-20% 0px" }}
    >
      <div className="container mx-auto min-h-full px-4 flex items-center">
        <div className="w-full">
          <motion.div className="mx-auto max-w-3xl text-center" variants={fadeUp}>
            <h2 className="text-3xl md:text-4xl font-bold">{"Downtime Costs More Than You Think."}</h2>
            <p className="mt-3 text-lg text-black/70 dark:text-white/70">
              {"Every minute offline means lost revenue, frustrated users, and damaged reputation."}
            </p>
          </motion.div>

          {/* Equal-height grid */}
          <motion.div className="mt-10 grid items-stretch gap-6 md:grid-cols-[1fr_auto_1fr]" variants={staggerRow(0.1)}>
            {/* Without monitoring card */}
            <motion.div
              variants={popIn}
              className="relative h-full rounded-3xl border border-black/10 bg-white/70 p-6 dark:border-white/10 dark:bg-black/40"
            >
              <div className="flex items-center justify-start">
                <span className="text-sm font-semibold tracking-wide text-black/70 dark:text-white/70">
                  {"Without Monitoring"}
                </span>
              </div>

              {/* Perfectly centered emoji tile */}
              <div className="mt-4 grid place-items-center">
                <div className="emoji-tile relative h-56 w-full max-w-[420px] overflow-hidden rounded-2xl ring-1 ring-[rgba(204,255,17,0.25)] shadow-[0_0_40px_rgba(204,255,17,0.18)] bg-white/80 dark:bg-white/5">
                  <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_30%,rgba(204,255,17,0.20),transparent_60%)]" />
                  <span
                    role="img"
                    aria-label="Server offline"
                    className="emoji block leading-none text-7xl md:text-8xl select-none"
                  >
                    {"💀"}
                  </span>
                </div>
              </div>

              <ul className="mx-auto mt-4 grid max-w-sm list-disc gap-1 pl-5 text-sm text-black/70 dark:text-white/70">
                <li>{"Users discover outages first"}</li>
                <li>{"Hours of silent downtime"}</li>
                <li>{"Revenue lost, trust broken"}</li>
              </ul>
            </motion.div>

            {/* Center gap label (perfectly centered) */}
            <div className="hidden md:flex relative items-center justify-center px-2">
              {/* Vertical neon line */}
              <div className="pointer-events-none absolute inset-y-6 left-1/2 w-[2px] -translate-x-1/2 bg-[rgba(204,255,17,0.9)] shadow-[0_0_18px_rgba(204,255,17,0.8)]" />
              {/* Centered badge */}
              <div className="relative z-10">
                <div className="rounded-full bg-[var(--brand)] px-3 py-1 text-xs font-bold text-black shadow ring-1 ring-[rgba(204,255,17,0.6)]">
                  {"The gap we're closing"}
                </div>
              </div>
            </div>

            {/* With PulseWatch card */}
            <motion.div
              variants={popIn}
              className="relative h-full overflow-hidden rounded-3xl border border-black/10 bg-white/70 p-6 dark:border-white/10 dark:bg-black/40"
            >
              <span className="text-sm font-semibold tracking-wide text-black/70 dark:text-white/70">
                {"With PulseWatch"}
              </span>

              {/* Perfectly centered emoji tile */}
              <div className="mt-4 grid place-items-center">
                <div className="emoji-tile relative h-56 w-full max-w-[420px] overflow-hidden rounded-2xl ring-1 ring-[rgba(204,255,17,0.25)] shadow-[0_0_40px_rgba(204,255,17,0.18)] bg-white/80 dark:bg-white/5">
                  <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_30%,rgba(204,255,17,0.20),transparent_60%)]" />
                  <span
                    role="img"
                    aria-label="Server healthy"
                    className="emoji block leading-none text-7xl md:text-8xl select-none"
                  >
                    {"💚"}
                  </span>
                </div>
              </div>

              <ul className="mx-auto mt-4 grid max-w-sm list-disc gap-1 pl-5 text-sm text-black/70 dark:text-white/70">
                <li>{"Instant alerts in seconds"}</li>
                <li>{"24/7 automated checks"}</li>
                <li>{"Fix issues before users notice"}</li>
              </ul>
            </motion.div>

            {/* Mobile gap label row */}
            <div className="md:hidden col-span-1">
              <div className="mt-2 flex items-center justify-center">
                <div className="rounded-full bg-[var(--brand)] px-3 py-1 text-xs font-bold text-black shadow ring-1 ring-[rgba(204,255,17,0.6)]">
                  {"The gap we're closing"}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        :root {
          --brand: #CCFF11;
        }
        /* Ensure emoji are optically centered within their tile */
        .emoji-tile {
          display: grid;
          place-items: center;
        }
        .emoji {
          line-height: 1;
          transform: translateZ(0);
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.12));
        }
        @media (prefers-reduced-motion: reduce) {
          .emoji {
            transform: none !important;
          }
        }
      `}</style>
    </motion.section>
  )
}
