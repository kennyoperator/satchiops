"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"

const faqs = [
  {
    trigger: "Why should I trust a single partner over a big agency?",
    content: (
      <p>
        Big agencies want 6-week discovery meetings and monthly fees to talk to middle managers. I spent 12 years growing companies and building AI systems. I saw the pattern: they move slow while you lose $10,000 or more a week in missed calls. I am a Systems Architect. I install the tech in 5 days and get out. You own the systems. No middle managers. No BS.
      </p>
    ),
  },
  {
    trigger: "I've been burned by 'lead gen' agencies before. How are you different?",
    content: (
      <p>
        Most agencies are a cost center. They sell you impressions and leads you cannot even answer. I am an investment in your capacity. I do not just find leads. I build the machine that ensures you actually book them. If your 2:00 AM calls hit voicemail, your ad spend is a donation to your competitor. I plug that leak.
      </p>
    ),
  },
  {
    trigger: "Can't I just have my office manager handle this?",
    content: (
      <p>
        Your office manager is already drowning in dispatch chaos and paperwork. A senior tech hire costs $150k or more and takes months to train. I install a Digital Operator that handles 90% of your intake. It does not sleep, it does not get burnt out, and it never misses a Category 3 lead.
      </p>
    ),
  },
  {
    trigger: "We are too busy to take on a new project right now.",
    content: (
      <p>
        That is exactly why you need this. You are busy because your systems are broken and you are the bottleneck. My setup requires less than 3 hours of your team&apos;s time. After 5 days, your staff saves 15 or more hours every week. The busier you are, the more you are bleeding cash.
      </p>
    ),
  },
  {
    trigger: "We already use JobNimbus (or Dash/Encircle). Why do I need you?",
    content: (
      <p>
        Those tools are just digital filing cabinets. If your team does not put the right data in them, they are useless. I am the Architect who builds the pipes that feed those cabinets. My system automatically qualifies the loss and creates the job file so your techs do not have to chase paperwork.
      </p>
    ),
  },
  {
    trigger: "What are the guarantees?",
    content: (
      <div className="space-y-3">
        <p>
          <strong className="font-bold text-foreground">The Speed Guarantee:</strong> If your AI Dispatcher and CRM automation are not live and testing within 5 days, you do not pay. I will refund your deposit in full.
        </p>
        <p>
          <strong className="font-bold text-foreground">The Result Guarantee:</strong> If the system does not capture and qualify at least one emergency mitigation lead that you would have otherwise missed within the first 14 days of going live, I will refund every dime of your first month&apos;s fee.
        </p>
      </div>
    ),
  },
]

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="border-b border-border px-6 py-8 md:py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 text-center">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            FAQ
          </p>
          <h2 className="text-lg font-black tracking-tight text-foreground md:text-xl">
            No Fluff. Just Facts.
          </h2>
        </div>

        <div className="divide-y divide-border border border-border">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition-colors hover:bg-secondary"
                aria-expanded={open === i}
              >
                <span className="text-xs font-semibold text-foreground leading-snug">
                  {faq.trigger}
                </span>
                <span className="shrink-0 text-muted-foreground">
                  {open === i ? (
                    <Minus className="h-3.5 w-3.5" />
                  ) : (
                    <Plus className="h-3.5 w-3.5" />
                  )}
                </span>
              </button>
              {open === i && (
                <div className="border-t border-border bg-secondary px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                  {faq.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
