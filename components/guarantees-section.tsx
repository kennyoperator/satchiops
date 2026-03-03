import CalendlyButton from "@/components/calendly-button"

export default function GuaranteesSection() {
  return (
    <section className="border-b border-black px-6 py-8 md:py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-5">
          <p className="mb-1 font-sans text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Risk-Free
          </p>
          <h2 className="text-balance text-lg font-black tracking-tight text-foreground md:text-xl">
            Two Guarantees. No Weasel Words.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-px bg-black sm:grid-cols-2">
          <div className="bg-background p-6">
            <p className="mb-2 font-sans text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              The Speed Guarantee
            </p>
            <p className="mb-3 text-base font-black text-foreground">
              Live in 24-48 Hours or You Don&apos;t Pay.
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              If your AI Dispatcher and CRM automation are not live and testing within 24-48 hours, I refund your deposit in full. No questions asked.
            </p>
          </div>
          <div className="bg-foreground p-6">
            <p className="mb-2 font-sans text-[10px] font-black uppercase tracking-widest text-white/50">
              The Result Guarantee
            </p>
            <p className="mb-3 text-base font-black text-white">
              One Captured Job in 14 Days or a Full Refund.
            </p>
            <p className="text-xs leading-relaxed text-white/60">
              If the system does not capture and qualify at least one emergency mitigation lead you would have otherwise missed within 14 days of going live, I refund every dime of your first month&apos;s fee.
            </p>
          </div>
        </div>
        <div className="mt-4 border border-black p-5 text-center">
          <CalendlyButton
            label="Secure Your 24-48 Hour Implementation Slot"
            className="inline-block w-full border border-black bg-foreground px-6 py-3.5 font-sans text-[11px] font-black uppercase tracking-widest text-background transition-all hover:opacity-90 shadow-[0_0_18px_rgba(0,0,0,0.3)] hover:shadow-[0_0_28px_rgba(0,0,0,0.5)] sm:w-auto"
          />
        </div>
      </div>
    </section>
  )
}
