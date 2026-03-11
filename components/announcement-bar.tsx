"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void
    }
  }
}

const CALENDLY_URL =
  "https://calendly.com/kentheaiguy/15-min-restoration-ops-audit?hide_gdpr_banner=1"

export default function AnnouncementBar() {
  const ticker =
    "CARRIER-READY DATA PROTOCOLS ENABLED  //  IICRC S500 LOGIC ALIGNMENT  //  AUTO-DOCUMENTATION GUARDRAILS: ACTIVE  //  5-DAY DEPLOYMENT STATUS: 2 SLOTS REMAINING"

  useEffect(() => {
    if (!document.getElementById("calendly-widget-css")) {
      const link = document.createElement("link")
      link.id = "calendly-widget-css"
      link.rel = "stylesheet"
      link.href = "https://assets.calendly.com/assets/external/widget.css"
      document.head.appendChild(link)
    }
    if (!document.getElementById("calendly-widget-js")) {
      const script = document.createElement("script")
      script.id = "calendly-widget-js"
      script.src = "https://assets.calendly.com/assets/external/widget.js"
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  function handleCheckArea(e: React.MouseEvent) {
    e.preventDefault()
    window.Calendly?.initPopupWidget({ url: CALENDLY_URL })
  }

  return (
    <>
      {/* Territory exclusivity banner */}
      <div className="z-50 border-b border-black bg-background px-4 py-2.5 text-center">
        <p className="font-sans text-[11px] font-black uppercase tracking-widest text-foreground">
          Only 1 Company Per Territory&nbsp;&nbsp;//&nbsp;&nbsp;
          <button
            onClick={handleCheckArea}
            className="underline underline-offset-2 cursor-pointer hover:opacity-70 transition-opacity"
          >
            Check Your Area
          </button>
        </p>
      </div>

      {/* Scrolling ticker */}
      <div className="sticky top-0 z-50 h-10 overflow-hidden border-b border-black bg-foreground">
        <div className="flex h-full items-center whitespace-nowrap">
          <div className="animate-ticker inline-flex">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="mx-12 font-sans text-[10px] font-bold uppercase tracking-widest text-background"
              >
                {ticker}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
