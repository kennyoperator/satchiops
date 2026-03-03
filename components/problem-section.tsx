const problems = [
  {
    label: "The Lead Leak",
    body: "You're paying for LSAs, but your office misses a 2:00 AM water loss. That's a $5,000+ mitigation ticket gone to the competitor who picked up the phone.",
  },
  {
    label: "The Documentation Disaster",
    body: "Missing moisture readings or 'After' photos mean your $8k invoice sits in an adjuster's 'Review' pile for 60 days.",
  },
  {
    label: "The Dispatch Bottleneck",
    body: "Every new lead requires three phone calls between the customer, the office, and the tech. This 'phone tag' becomes a full-time job.",
  },
  {
    label: "The Margin Crush",
    body: "You add trucks, but your overhead grows faster than your profit. You're working harder for a smaller piece of the pie.",
  },
]

export default function ProblemSection() {
  return (
    <section className="border-b border-black px-6 py-8 md:py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-5">
          <p className="mb-1 font-sans text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            The Problem
          </p>
          <h2 className="text-balance text-lg font-black tracking-tight text-foreground md:text-xl">
            The &apos;Scaling Wall&apos;: Why Growth Usually Kills Restoration Margins
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-px bg-black sm:grid-cols-2">
          {problems.map((p, i) => (
            <div key={i} className="bg-background p-4">
              <p className="mb-1 font-sans text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {p.label}
              </p>
              <p className="text-xs leading-relaxed text-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
