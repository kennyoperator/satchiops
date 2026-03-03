const testimonials = [
  { quote: "Captured 4 extra water losses in the first month. Paid for itself in 48 hours.", name: "Mike R.", role: "Owner", trucks: "6 Trucks" },
  { quote: "DSO dropped by 12 days. Nothing left for the carrier to dispute.", name: "Sarah J.", role: "Ops Manager", trucks: "12 Trucks" },
  { quote: "Perfect 100% LSA answer rate. Lead cost dropped 20%.", name: "David L.", role: "GM", trucks: "15 Trucks" },
]

export default function TestimonialsSection() {
  return (
    <section className="border-b border-black px-6 py-8 md:py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-5">
          <p className="mb-1 font-sans text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Results From The Field
          </p>
          <h2 className="text-balance text-lg font-black tracking-tight text-foreground md:text-xl">
            What Operators Are Saying
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-px bg-black sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <div key={i} className="flex flex-col justify-between gap-3 bg-background p-4">
              <p className="text-xs leading-relaxed text-foreground">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="border-t border-black pt-2">
                <p className="font-sans text-[10px] font-bold text-foreground">{t.name}, {t.role}</p>
                <p className="font-sans text-[10px] text-muted-foreground">{t.trucks}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
