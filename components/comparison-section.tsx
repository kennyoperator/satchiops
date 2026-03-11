const rows = [
  {
    feature: "What they sell",
    agency: "Leads (you pay whether you answer or not)",
    satchiops: "Infrastructure to capture leads you're already paying for",
    agencyBad: false,
  },
  {
    feature: "Deployment time",
    agency: "4–8 weeks",
    satchiops: "48 hours",
    agencyBad: true,
  },
  {
    feature: "Contract",
    agency: "6-month minimum",
    satchiops: "No commitment. Cancel anytime.",
    agencyBad: true,
  },
  {
    feature: "Setup cost",
    agency: "$4,500 – $9,000+",
    satchiops: "Fraction of that",
    agencyBad: true,
  },
  {
    feature: "After-hours coverage",
    agency: "Not their problem",
    satchiops: "24/7 AI answers every call",
    agencyBad: true,
    satchiopsGood: true,
  },
  {
    feature: "Missed call solution",
    agency: "None",
    satchiops: "Every call answered in <10 seconds",
    agencyBad: true,
    satchiopsGood: true,
  },
  {
    feature: "Documentation enforcement",
    agency: "None",
    satchiops: "Techs can't close jobs without proof",
    agencyBad: true,
    satchiopsGood: true,
  },
  {
    feature: "Dependency",
    agency: "Stop paying → leads stop",
    satchiops: "You own the infrastructure forever",
    agencyBad: true,
  },
  {
    feature: "Guarantee",
    agency: '"Double ROI" (vague)',
    satchiops: "1 captured job in 14 days or full refund",
    agencyBad: true,
  },
]

export default function ComparisonSection() {
  return (
    <section className="border-b border-black px-6 py-8 md:py-10">
      <div className="mx-auto max-w-4xl">
        {/* Label */}
        <p className="mb-2 font-sans text-[10px] font-bold uppercase tracking-widest text-[#00b4d8]">
          The Difference
        </p>

        {/* Heading */}
        <h2 className="mb-3 text-balance text-2xl font-black tracking-tight text-foreground md:text-3xl">
          Lead Gen Agencies vs. SatchiOps
        </h2>

        {/* Subhead */}
        <p className="mb-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
          They fill your pipe with leads. We make sure you actually capture them.
        </p>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-black text-xs">
            <thead>
              <tr className="bg-foreground/5">
                <th className="border border-black px-4 py-3 text-left font-sans text-[10px] uppercase tracking-widest text-muted-foreground w-1/3">
                  Feature
                </th>
                <th className="border border-black px-4 py-3 text-left font-sans text-[10px] uppercase tracking-widest text-muted-foreground w-1/3">
                  Typical Lead Gen Agency
                </th>
                <th className="border border-black px-4 py-3 text-left font-sans text-[10px] font-black uppercase tracking-widest text-[#00b4d8] w-1/3">
                  SatchiOps
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-black">
                  <td className="border border-black px-4 py-3 font-sans text-xs font-black text-foreground">
                    {row.feature}
                  </td>
                  <td className="border border-black px-4 py-3 leading-relaxed text-muted-foreground">
                    {row.agencyBad ? (
                      <span className="text-red-500 font-medium">{row.agency}</span>
                    ) : (
                      row.agency
                    )}
                  </td>
                  <td className="border border-black px-4 py-3 leading-relaxed text-foreground font-semibold">
                    {row.satchiopsGood ? (
                      <span className="flex items-start gap-1.5">
                        <span className="mt-0.5 text-green-500 font-black shrink-0">✓</span>
                        <span>{row.satchiops}</span>
                      </span>
                    ) : (
                      row.satchiops
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
