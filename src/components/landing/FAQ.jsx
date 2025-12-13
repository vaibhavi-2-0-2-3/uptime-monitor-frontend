import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/Accordion"
import { MessageCircleQuestion, Mail, LifeBuoy } from "lucide-react"
import { motion } from "framer-motion"
import { sectionReveal, fadeUp, popIn, staggerRow } from "../../utils/motion-presets"

const CONTACT_MAILTO = "mailto:hello@pulsewatch.dev"

export function FAQ() {
  const items = [
    {
      q: "What is PulseWatch?",
      a: "PulseWatch is a real-time uptime monitoring platform that checks your websites and APIs every 30 seconds and alerts you instantly when something goes down.",
    },
    {
      q: "How do alerts work?",
      a: "You can receive alerts via Email, SMS, Slack, Telegram, or webhooks. Configure escalation policies and on-call schedules for your team.",
    },
    {
      q: "Can I create public status pages?",
      a: "Yes! PulseWatch lets you create beautiful, customizable status pages to keep your users informed about service health.",
    },
    {
      q: "What about cron job monitoring?",
      a: "We support cron-based checks — get notified if your scheduled jobs fail to run on time.",
    },
  ]

  return (
    <motion.section
      id="faq"
      className="border-t border-black/10 dark:border-white/10 vh-section"
      variants={sectionReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-20% 0px" }}
    >
      <div className="container mx-auto min-h-full px-4 flex items-center">
        <div className="w-full">
          <motion.h2 className="text-3xl md:text-4xl font-bold" variants={fadeUp}>
            Frequently Asked Questions
          </motion.h2>

          <motion.div className="mt-6" variants={staggerRow(0.05)}>
            <Accordion type="single" collapsible className="w-full">
              {items.map((qa, i) => (
                <AccordionItem key={qa.q} value={`item-${i}`}>
                  <AccordionTrigger>{qa.q}</AccordionTrigger>
                  <AccordionContent className="text-black/70 dark:text-white/70">{qa.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          <motion.div
            className="mt-10 rounded-2xl border border-black/10 bg-white/60 p-6 dark:border-white/10 dark:bg-black/40"
            variants={popIn}
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <span
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[rgba(204,255,17,0.15)] ring-1 ring-[rgba(204,255,17,0.3)]"
                  aria-hidden="true"
                >
                  <MessageCircleQuestion className="h-4 w-4 text-[var(--brand)]" />
                </span>
                <div>
                  <div className="font-semibold text-base sm:text-sm md:text-base">Still have questions?</div>
                  <p className="text-sm text-black/70 dark:text-white/70">
                    Reach out to our team or join the waitlist for early access.
                  </p>
                </div>
              </div>

              <div className="flex w-full flex-col gap-2 pt-2 sm:w-auto sm:flex-row sm:pt-0">
                <a
                  href={CONTACT_MAILTO}
                  className="border-black/15 bg-white/70 hover:bg-white/80 dark:border-white/15 dark:bg-white/10 border rounded-md px-4 py-2 inline-flex items-center text-sm font-medium transition"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Email us
                </a>

                <a
                  href="#waitlist"
                  className="bg-[var(--brand)] text-black hover:bg-[color:rgb(204,255,17,0.9)] rounded-md px-4 py-2 inline-flex items-center text-sm font-medium transition"
                >
                  <LifeBuoy className="mr-2 h-4 w-4" />
                  Join waitlist
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
