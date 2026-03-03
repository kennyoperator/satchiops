"use client"

import { useEffect, useState } from "react"
import CalendlyButton from "@/components/calendly-button"

export default function StickyCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background px-4 py-3 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
        <p className="hidden text-xs font-bold text-foreground sm:block">
          Ready to scale without adding staff?
        </p>
        <CalendlyButton
          label="Book the 15-Minute Audit"
          className="w-full text-center bg-foreground px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-background shadow-[0_0_18px_rgba(0,0,0,0.3)] hover:shadow-[0_0_28px_rgba(0,0,0,0.5)] transition-all hover:opacity-90 sm:w-auto"
        />
      </div>
    </div>
  )
}
