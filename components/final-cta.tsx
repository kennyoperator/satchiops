import CalendlyButton from "@/components/calendly-button"

export default function FinalCTA() {
  return (
    <section id="audit" className="border-b border-black bg-foreground px-6 py-10 md:py-14">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-2 font-sans text-[10px] font-bold uppercase tracking-widest text-white/50">
          Ready to Scale?
        </p>
        <h2 className="mb-4 text-balance text-2xl font-black tracking-tight text-white md:text-3xl">
          Secure Your 24-48 Hour Implementation Slot.
        </h2>
        <p className="mb-7 text-sm leading-relaxed text-white/60">
          Every day you wait, your 2:00 AM calls are hitting voicemail. Let&apos;s audit your revenue leak in 15 minutes and fix it this week.
        </p>
        <CalendlyButton
          label="Plug The Leak: Book My 15-Minute Audit"
          className="inline-block w-full border border-white bg-white px-6 py-3.5 font-sans text-[11px] font-black uppercase tracking-widest text-foreground transition-all hover:opacity-90 shadow-[0_0_24px_rgba(255,255,255,0.4)] hover:shadow-[0_0_36px_rgba(255,255,255,0.6)] sm:w-auto"
        />
      </div>
    </section>
  )
}
