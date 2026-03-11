import CalendlyButton from "@/components/calendly-button"

export default function ResultsCTA() {
  return (
    <section className="border-b border-black bg-foreground px-6 py-10 md:py-14">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-widest text-white/50">
          Your Turn
        </p>
        <h2 className="mb-4 text-balance text-2xl font-black tracking-tight text-white md:text-3xl">
          Ready to Stop Leaking Revenue?
        </h2>
        <p className="mb-7 text-sm leading-relaxed text-white/60">
          We only work with one restoration company per territory. Book a 15-minute audit and
          we&apos;ll show you exactly where your revenue is leaking.
        </p>
        <CalendlyButton
          label="Book 15-Minute Audit &rarr;"
          className="inline-block w-full border border-white bg-white px-6 py-3.5 font-sans text-[11px] font-black uppercase tracking-widest text-foreground transition-all hover:opacity-90 shadow-[0_0_24px_rgba(255,255,255,0.4)] hover:shadow-[0_0_36px_rgba(255,255,255,0.6)] sm:w-auto"
        />
        <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-white/30">
          No pitch if it&apos;s not a fit.
        </p>
      </div>
    </section>
  )
}
