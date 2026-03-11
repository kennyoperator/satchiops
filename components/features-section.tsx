const features = [
  {
    num: "01",
    label: "24/7 AI Dispatcher",
    body: "Every call answered on the 1st ring. Qualifies the loss, verifies insurance, and dispatches your tech at 2:00 AM on a Sunday.",
  },
  {
    num: "02",
    label: "'Claim-Ready' Guardrails",
    body: "Techs can't pull equipment until the AI verifies moisture logs and photos are uploaded. No complete documentation, no close-out.",
  },
  {
    num: "03",
    label: "Zero-Lag CRM Sync",
    body: "Job files created in JobNimbus or Dash before the van even hits the driveway. Every field pre-populated from the intake call.",
  },
]

export default function FeaturesSection() {
  return (
    <section className="border-b border-black px-6 py-8 md:py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-5">
          <p className="mb-1 font-sans text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            The System
          </p>
          <h2 className="text-balance text-lg font-black tracking-tight text-foreground md:text-xl">
            Infrastructure, Not Software.
          </h2>
          <p className="mt-2 max-w-xl font-sans text-sm font-black uppercase tracking-tight text-foreground">
            Our Custom AI is Specialized on Real Restoration Jobs.
          </p>
          <p className="mt-1 max-w-xl text-xs leading-relaxed text-muted-foreground">
            Not a generic chatbot. Every prompt, workflow, and guardrail is trained on the specific language, documentation requirements, and carrier logic of the restoration industry.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-px bg-black sm:grid-cols-3">
          {features.map((f) => (
            <div key={f.num} className="flex flex-col bg-background p-5">
              <p className="mb-2 font-sans text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {f.num}
              </p>
              <p className="mb-2 text-sm font-black text-foreground">{f.label}</p>
              <p className="text-xs leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
