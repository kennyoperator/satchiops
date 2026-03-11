import { X, Check } from "lucide-react"

const leadGen = [
  "Leads stop when you stop paying",
  "4–8 week onboarding",
  "No after-hours solution",
  "You rent access",
]

const inHouse = [
  "$45k+ salary + benefits",
  "Doesn't work at 2 AM",
  "Training takes months",
  "Single point of failure",
]

const satchiops = [
  "Infrastructure you own forever",
  "Live in 48 hours",
  "24/7 AI dispatch",
  "Costs less than one missed job",
]

export default function ResultsComparison() {
  return (
    <section className="border-b border-black px-6 py-8 md:py-12">
      <div className="mx-auto max-w-4xl">
        <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-widest text-[#00b4d8]">
          The SatchiOps Difference
        </p>
        <h2 className="mb-7 text-balance text-2xl font-black tracking-tight text-foreground md:text-3xl">
          {"We're Not Lead Gen. We're Infrastructure."}
        </h2>

        <div className="grid grid-cols-1 gap-px bg-black sm:grid-cols-3">
          {/* Lead Gen Agencies */}
          <div className="bg-background p-5">
            <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Lead Gen Agencies
            </p>
            <ul className="flex flex-col gap-2.5">
              {leadGen.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-500" strokeWidth={3} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* In-House Hire */}
          <div className="bg-background p-5">
            <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              In-House Hire
            </p>
            <ul className="flex flex-col gap-2.5">
              {inHouse.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-500" strokeWidth={3} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* SatchiOps */}
          <div className="border border-[#00b4d8] bg-background p-5">
            <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-widest text-[#00b4d8]">
              SatchiOps
            </p>
            <ul className="flex flex-col gap-2.5">
              {satchiops.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs font-semibold text-foreground">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#00b4d8]" strokeWidth={3} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
