"use client"

import { useState, useMemo } from "react"
import CalendlyButton from "@/components/calendly-button"

type SliderInputProps = {
  label: string
  value: number
  min: number
  max: number
  step: number
  format: (v: number) => string
  onChange: (v: number) => void
}

function SliderInput({ label, value, min, max, step, format, onChange }: SliderInputProps) {
  return (
    <div className="border-b border-border py-3 last:border-0 last:pb-0">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</span>
        <span className="font-sans text-xs font-black tabular-nums text-foreground">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none bg-border accent-foreground
          [&::-webkit-slider-thumb]:h-5
          [&::-webkit-slider-thumb]:w-5
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:bg-foreground
          [&::-webkit-slider-thumb]:cursor-grab
          [&::-moz-range-thumb]:h-5
          [&::-moz-range-thumb]:w-5
          [&::-moz-range-thumb]:border-0
          [&::-moz-range-thumb]:bg-foreground"
      />
      <div className="mt-1 flex justify-between">
        <span className="font-sans text-[9px] text-muted-foreground">{format(min)}</span>
        <span className="font-sans text-[9px] text-muted-foreground">{format(max)}</span>
      </div>
    </div>
  )
}

const fmt$ = (v: number) => "$" + v.toLocaleString()
const fmtPct = (v: number) => v + "%"

export default function CalculatorSection() {
  const [adSpend, setAdSpend] = useState(5000)
  const [cpl, setCpl] = useState(120)
  const [missedRate, setMissedRate] = useState(20)
  const [avgTicket, setAvgTicket] = useState(5500)
  const [bookingRate, setBookingRate] = useState(50)

  const { monthly, annual, leads, missed, jobs } = useMemo(() => {
    const leads = cpl > 0 ? adSpend / cpl : 0
    const missed = leads * (missedRate / 100)
    const jobs = missed * (bookingRate / 100)
    const monthly = Math.round(jobs * avgTicket)
    const annual = monthly * 12
    return { monthly, annual, leads: Math.round(leads), missed: Math.round(missed), jobs: Math.round(jobs) }
  }, [adSpend, cpl, missedRate, avgTicket, bookingRate])

  return (
    <section className="border-b border-border px-6 py-8 md:py-10">
      <div className="mx-auto max-w-4xl">

        {/* Diagnostic instruction header */}
        <div className="mb-0 border border-b-0 border-border bg-[#f5f5f5] px-4 py-2">
          <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-foreground">
            Diagnostic Instructions: Adjust sliders to match your current shop stats. The math is automatic.
          </p>
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 border border-border md:grid-cols-2">

          {/* Left: Inputs */}
          <div className="flex flex-col gap-0 border-b border-border bg-background p-5 md:border-b-0 md:border-r">
            <SliderInput
              label="Monthly Ad Spend"
              value={adSpend}
              min={0}
              max={20000}
              step={500}
              format={fmt$}
              onChange={setAdSpend}
            />
            <SliderInput
              label="Cost Per Lead"
              value={cpl}
              min={50}
              max={300}
              step={5}
              format={fmt$}
              onChange={setCpl}
            />
            <SliderInput
              label="Missed Call Rate"
              value={missedRate}
              min={0}
              max={50}
              step={1}
              format={fmtPct}
              onChange={setMissedRate}
            />
            <SliderInput
              label="Avg. Mitigation Ticket"
              value={avgTicket}
              min={2500}
              max={12000}
              step={500}
              format={fmt$}
              onChange={setAvgTicket}
            />
            <SliderInput
              label="Booking Rate"
              value={bookingRate}
              min={0}
              max={100}
              step={1}
              format={fmtPct}
              onChange={setBookingRate}
            />
          </div>

          {/* Right: Results */}
          <div className="flex flex-col justify-between bg-foreground p-5">

            {/* Top stats row */}
            <div className="mb-5 grid grid-cols-3 gap-px bg-white/10">
              {[
                { label: "Leads / Mo", val: leads.toLocaleString() },
                { label: "Missed Calls", val: missed.toLocaleString() },
                { label: "Jobs Lost", val: jobs.toLocaleString() },
              ].map((s) => (
                <div key={s.label} className="bg-foreground px-2 py-3 text-center">
                  <p className="font-sans text-lg font-black tabular-nums text-white">{s.val}</p>
                  <p className="font-sans text-[9px] uppercase tracking-widest text-white/50">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="h-px w-full bg-white/10" />

            {/* Monthly leak */}
            <div className="my-4">
              <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-white/50">
                Monthly Revenue Leak
              </p>
              <p className="font-sans text-4xl font-black tabular-nums text-white md:text-5xl">
                {fmt$(monthly)}
              </p>
            </div>

            <div className="h-px w-full bg-white/10" />

            {/* Annual leak — red warning */}
            <div className="my-4">
              <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-white/50">
                Annual Revenue Leak
              </p>
              <p className="font-sans text-3xl font-black tabular-nums text-[#FF0000] md:text-4xl">
                {fmt$(annual)}
              </p>
            </div>

            <div className="h-px w-full bg-white/10" />

            {/* Footer copy */}
            <p className="my-4 font-sans text-[10px] leading-relaxed text-white/60">
              This is money you&apos;ve already spent to acquire customers you aren&apos;t booking. Your competition is thanking you.
            </p>

            {/* CTA */}
            <CalendlyButton
              label="Plug The Leak: Book My 15-Minute Audit"
              className="w-full bg-white px-5 py-3 font-sans text-[10px] font-bold uppercase tracking-widest text-foreground transition-all hover:bg-white/90"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
