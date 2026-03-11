"use client"

import { useCountUp } from "./use-count-up"

interface StatProps {
  end: number
  prefix?: string
  suffix?: string
  decimals?: number
  label: string
}

function Stat({ end, prefix = "", suffix = "", decimals = 0, label }: StatProps) {
  const { formatted, ref } = useCountUp({ end, prefix, suffix, decimals, duration: 1800 })

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="flex flex-col items-center border border-black p-6 text-center">
      <span className="font-sans text-3xl font-black tracking-tight text-foreground md:text-4xl">
        {formatted}
      </span>
      <span className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
    </div>
  )
}

const stats = [
  { end: 7500000, prefix: "$", suffix: "", decimals: 0, label: "Revenue Recovered" },
  { end: 100, prefix: "", suffix: "%", decimals: 0, label: "After-Hours Answer Rate" },
  { end: 14, prefix: "", suffix: " days", decimals: 0, label: "Avg. Days to ROI" },
  { end: 95, prefix: "", suffix: "%", decimals: 0, label: "Supplement Approval Rate" },
  { end: 48, prefix: "", suffix: " hrs", decimals: 0, label: "Avg. Deployment Time" },
  { end: 20, prefix: "", suffix: "%", decimals: 0, label: "Reduction in Lead Cost" },
]

export default function ResultsStats() {
  return (
    <section className="border-b border-black px-6 py-8 md:py-12">
      <div className="mx-auto max-w-4xl">
        <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-widest text-[#00b4d8]">
          By The Numbers
        </p>
        <h2 className="mb-6 text-balance text-2xl font-black tracking-tight text-foreground md:text-3xl">
          $7,500,000 in Revenue Recovered for Restoration Businesses
        </h2>
        <div className="grid grid-cols-2 gap-px bg-black sm:grid-cols-3">
          {stats.map((s, i) => (
            <Stat key={i} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}
