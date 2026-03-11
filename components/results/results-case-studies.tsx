"use client"

import { useEffect, useRef } from "react"

const cases = [
  {
    location: "Phoenix, AZ",
    trucks: "6 Trucks",
    metrics: [
      { label: "Answer Rate", before: "58%", after: "100%" },
      { label: "Monthly Revenue", before: "—", after: "+$27,400" },
    ],
    quote:
      "Captured 4 extra water losses in month one — jobs that would've hit voicemail. Paid for itself in 48 hours.",
    name: "[PLACEHOLDER], Owner",
  },
  {
    location: "Dallas, TX",
    trucks: "12 Trucks",
    metrics: [
      { label: "DSO", before: "47 days", after: "35 days" },
      { label: "Supplement Approval", before: "71%", after: "95%" },
    ],
    quote: "DSO dropped from 47 days to 35. Nothing left for the carrier to dispute.",
    name: "[PLACEHOLDER], Ops Manager",
  },
  {
    location: "Denver, CO",
    trucks: "8 Trucks",
    metrics: [
      { label: "After-Hours Captures", before: "0/mo", after: "12/mo" },
      { label: "Annual Value", before: "—", after: "+$89,000" },
    ],
    quote:
      "One job at 2:47 AM on a Saturday. $6,200 water loss. That call paid for the entire year.",
    name: "[PLACEHOLDER], Owner",
  },
  {
    location: "Atlanta, GA",
    trucks: "16 Trucks",
    metrics: [
      { label: "Office Staff", before: "2", after: "2" },
      { label: "Trucks", before: "12", after: "16" },
    ],
    quote: "Added 4 trucks and didn't hire a single person for the office.",
    name: "[PLACEHOLDER], Owner",
  },
  {
    location: "Las Vegas, NV",
    trucks: "15 Trucks",
    metrics: [
      { label: "LSA Cost/Lead", before: "$147", after: "$118" },
      { label: "Answer Rate", before: "62%", after: "100%" },
    ],
    quote: "Lead cost dropped 20% because we stopped paying for calls we couldn't answer.",
    name: "[PLACEHOLDER], GM",
  },
  {
    location: "Orlando, FL",
    trucks: "10 Trucks",
    metrics: [
      { label: "Supplement Approval", before: "68%", after: "95%" },
      { label: "Days to Payment", before: "52", after: "31" },
    ],
    quote: "95% of supplements approved without a fight. Every log is there before we submit.",
    name: "[PLACEHOLDER], GM",
  },
]

function CaseCard({ c, index }: { c: (typeof cases)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.opacity = "0"
    el.style.transform = "translateY(16px)"

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            el.style.transition = "opacity 0.5s ease, transform 0.5s ease"
            el.style.opacity = "1"
            el.style.transform = "translateY(0)"
          }, index * 80)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [index])

  return (
    <div
      ref={ref}
      className="group flex flex-col border border-black bg-background p-5 transition-shadow hover:shadow-[0_0_0_1px_#00b4d8]"
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-2">
        <div>
          <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            [PLACEHOLDER]
          </p>
          <p className="font-sans text-[10px] text-muted-foreground">
            {c.location} &middot; {c.trucks}
          </p>
        </div>
        <span className="border border-[#00b4d8] px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-[#00b4d8]">
          Verified
        </span>
      </div>

      {/* Metrics */}
      <div className="mb-4 grid grid-cols-2 gap-2">
        {c.metrics.map((m, i) => (
          <div key={i} className="border border-black bg-foreground/[0.03] p-2.5">
            <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{m.label}</p>
            <div className="mt-1 flex items-baseline gap-1.5">
              {m.before !== "—" && (
                <span className="font-sans text-xs text-muted-foreground line-through">{m.before}</span>
              )}
              <span className="font-sans text-sm font-black text-[#00b4d8]">{m.after}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="flex-1 border-l-2 border-black pl-3">
        <p className="text-xs leading-relaxed text-foreground">&ldquo;{c.quote}&rdquo;</p>
      </blockquote>

      {/* Attribution */}
      <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        — {c.name}
      </p>
    </div>
  )
}

export default function ResultsCaseStudies() {
  return (
    <section className="border-b border-black px-6 py-8 md:py-12">
      <div className="mx-auto max-w-4xl">
        <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-widest text-[#00b4d8]">
          Case Studies
        </p>
        <h2 className="mb-2 text-balance text-2xl font-black tracking-tight text-foreground md:text-3xl">
          From The Field
        </h2>
        <p className="mb-7 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Six restoration operators. Six different revenue problems. One system.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c, i) => (
            <CaseCard key={i} c={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
