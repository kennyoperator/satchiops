const days = [
  {
    day: "Day 1",
    title: "Intake Audit",
    body: "We map every inbound lead path — LSA, web form, direct call — and identify exactly where calls are leaking.",
  },
  {
    day: "Day 2",
    title: "AI Dispatcher Build",
    body: "Your 24/7 AI voice agent is built, scripted for emergency mitigation, and connected to your phone system.",
  },
  {
    day: "Day 3",
    title: "CRM Automation",
    body: "JobNimbus, Dash, or your CRM gets wired in. Job files are created automatically before the van hits the driveway.",
  },
  {
    day: "Day 4",
    title: "Field Guardrails",
    body: "Techs can't mark a job complete until moisture logs and photos are verified. No more incomplete files.",
  },
  {
    day: "Day 5",
    title: "Go-Live & Handoff",
    body: "Full system is live and tested. You get a 30-minute walkthrough. I stay on call for 14 days post-launch.",
  },
]

export default function MechanismSection() {
  return (
    <section className="border-b border-black px-6 py-8 md:py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-5">
          <p className="mb-1 font-sans text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            The 5-Day Blitz
          </p>
          <h2 className="text-balance text-lg font-black tracking-tight text-foreground md:text-xl">
            Your Digital Infrastructure, Live in One Week.
          </h2>
          <p className="mt-1 font-sans text-[10px] text-muted-foreground">
            I rewire your intake and dispatch in less than 5 days.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-px bg-black sm:grid-cols-2 lg:grid-cols-5">
          {days.map((d, i) => (
            <div key={i} className="flex flex-col bg-background p-4">
              <div className="mb-3">
                <span className="border border-black bg-foreground px-2 py-0.5 font-sans text-[10px] font-black uppercase tracking-wider text-background">
                  {d.day}
                </span>
              </div>
              <p className="mb-1 text-xs font-black text-foreground">{d.title}</p>
              <p className="text-xs leading-relaxed text-muted-foreground">{d.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
