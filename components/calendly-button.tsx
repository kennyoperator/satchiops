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

interface CalendlyButtonProps {
  label: string
  className?: string
  icon?: React.ReactNode
}

export default function CalendlyButton({ label, className, icon }: CalendlyButtonProps) {
  useEffect(() => {
    if (document.getElementById("calendly-widget-css")) return
    const link = document.createElement("link")
    link.id = "calendly-widget-css"
    link.rel = "stylesheet"
    link.href = "https://assets.calendly.com/assets/external/widget.css"
    document.head.appendChild(link)

    if (document.getElementById("calendly-widget-js")) return
    const script = document.createElement("script")
    script.id = "calendly-widget-js"
    script.src = "https://assets.calendly.com/assets/external/widget.js"
    script.async = true
    document.body.appendChild(script)
  }, [])

  function handleClick(e: React.MouseEvent) {
    e.preventDefault()
    window.Calendly?.initPopupWidget({ url: CALENDLY_URL })
  }

  return (
    <button onClick={handleClick} className={className}>
      {label}
      {icon && icon}
    </button>
  )
}
