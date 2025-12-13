"use client"

import { NeonBackground } from "../visuals/neon-background"
import { FloatingCoins } from "../visuals/floating-coins"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { sectionReveal, fadeUp, popIn } from "@/components/viberise/utils/motion-presets"

export interface HeroProps {
  reduced: boolean
}

export function Hero({ reduced }: HeroProps) {
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
            <span className="block">{"Never Let Downtime"}</span>
            <span className="block">{"Go Unnoticed Again."}</span>
          </motion.h1>
          <motion.p className="mt-4 max-w-2xl mx-auto text-lg text-black/70 dark:text-white/70" variants={fadeUp}>
            {"Real-time uptime monitoring for websites & APIs. Get instant alerts before your users notice."}
          </motion.p>
          <motion.div className="mt-8 inline-flex" variants={popIn} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <Link href="#waitlist">
              <Button className="bg-[var(--brand)] text-black hover:bg-[color:rgb(204,255,17,0.9)]">
                {"Start Monitoring Free"}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-32 bg-gradient-to-t from-white to-transparent dark:from-black"
      />
    </motion.section>
  )
}
