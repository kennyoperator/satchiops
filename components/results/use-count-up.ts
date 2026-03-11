"use client"

import { useEffect, useRef, useState } from "react"

interface UseCountUpOptions {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
}

export function useCountUp({ end, duration = 2000, prefix = "", suffix = "", decimals = 0 }: UseCountUpOptions) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true
          const startTime = performance.now()

          const tick = (now: number) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            // ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(parseFloat((eased * end).toFixed(decimals)))
            if (progress < 1) requestAnimationFrame(tick)
          }

          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [end, duration, decimals])

  const formatted = `${prefix}${value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}${suffix}`

  return { formatted, ref }
}
