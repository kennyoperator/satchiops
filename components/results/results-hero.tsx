import CalendlyButton from "@/components/calendly-button"
import { ArrowRight } from "lucide-react"

export default function ResultsHero() {
  return (
    <section className="relative border-b border-black py-16 md:py-24">
      {/* Blueprint rail lines */}
      <div className="pointer-events-none absolute inset-y-0 left-6 w-px bg-black/10 md:left-10" />
      <div className="pointer-events-none absolute inset-y-0 right-6 w-px bg-black/10 md:right-10" />

      <div className="mx-auto flex max-w-2xl flex-col items-center px-10 text-center md:px-16">
        <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-widest text-[#00b4d8]">
          Documented Field Results
        </p>

        <h1 className="text-balance font-sans text-4xl font-black uppercase leading-none tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Real Operators.
          <br />
          Real Numbers.
        </h1>

        <p className="mt-6 max-w-xl text-sm leading-loose text-muted-foreground">
          Every metric below came from a live restoration business — tracked inside SatchiOps infrastructure. No
          projections. No estimates. Revenue recovered, calls captured, and jobs closed.
        </p>

        <div className="mt-10">
          <CalendlyButton
            label="Book My 15-Minute Audit"
            className="inline-flex items-center gap-2.5 border border-black bg-foreground px-7 py-4 font-sans text-[11px] font-black uppercase tracking-widest text-background transition-all hover:opacity-90 shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_32px_rgba(0,0,0,0.55)]"
            icon={<ArrowRight className="h-3.5 w-3.5" strokeWidth={3} />}
          />
        </div>

        <p className="mt-4 font-sans text-[10px] uppercase tracking-widest text-muted-foreground">
          Only 1 company per territory. No pitch if it&apos;s not a fit.
        </p>
      </div>
    </section>
  )
}
