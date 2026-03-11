"use client"

import { ArrowRight } from "lucide-react"
import Image from "next/image"
import CalendlyButton from "@/components/calendly-button"

export default function HeroSection() {
  return (
    <section className="relative border-b border-black py-16 md:py-24">
      {/* Blueprint vertical rail lines */}
      <div className="pointer-events-none absolute inset-y-0 left-6 w-px bg-black/10 md:left-10" />
      <div className="pointer-events-none absolute inset-y-0 right-6 w-px bg-black/10 md:right-10" />

      <div className="mx-auto flex max-w-2xl flex-col items-center px-10 text-center md:px-16">

        {/* Main headline */}
        <h1 className="font-sans text-5xl font-black uppercase leading-none tracking-tight text-foreground text-balance md:text-6xl lg:text-7xl">
          Stop Recruiting.{" "}
          <br className="hidden sm:block" />
          Start Scaling.
        </h1>

        {/* Sub-headline */}
        <p className="mt-8 max-w-xl text-sm leading-loose text-muted-foreground md:text-base md:leading-loose">
          I install AI infrastructure that runs your intake, dispatch, and documentation so you can book more high-ticket jobs without adding headcount.
        </p>

        {/* CTA */}
        <div className="mt-10">
          <CalendlyButton
            label="Plug The Leak: Book My 15-Minute Audit"
            className="inline-flex items-center gap-2.5 border border-black bg-foreground px-7 py-4 font-sans text-[11px] font-black uppercase tracking-widest text-background transition-all hover:opacity-90 shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_32px_rgba(0,0,0,0.55)]"
            icon={<ArrowRight className="h-3.5 w-3.5" strokeWidth={3} />}
          />
        </div>

        {/* Stats bar */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 border border-black px-6 py-4">
          <div className="text-center">
            <p className="font-sans text-2xl font-black text-foreground md:text-3xl">$7,500,000</p>
            <p className="mt-0.5 font-sans text-[10px] uppercase tracking-widest text-muted-foreground">
              Revenue Recovered
            </p>
          </div>
          <div className="hidden h-8 w-px bg-black/20 md:block" />
          <div className="text-center">
            <p className="font-sans text-2xl font-black text-foreground md:text-3xl">for Restoration</p>
            <p className="mt-0.5 font-sans text-[10px] uppercase tracking-widest text-muted-foreground">
              Businesses Like Yours
            </p>
          </div>
        </div>

        {/* Trust bar */}
        <p className="mt-5 font-sans text-[10px] uppercase tracking-widest text-muted-foreground">
          15 minutes. No pitch if it&apos;s not a fit.
        </p>

      </div>

      {/* Ecosystem Trust Strip */}
      <div className="mx-auto mt-10 max-w-4xl px-6 md:mt-14 md:px-10">
        <div className="border-t border-black/20" />
        <div className="pt-8 text-center">
          <p className="font-sans text-xs font-bold uppercase tracking-widest text-foreground md:text-sm">
            Trusted by restoration teams and built alongside industry vendors.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-5 md:gap-x-10">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Xactimate%20logo-DloR5wePW0RjQTcwtofwa56fnJgJuC.png"
              alt="Xactimate estimating software"
              width={140}
              height={30}
              className="h-4 w-auto opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all md:h-5"
            />
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Verisk%20logo-mZTdSiJP7WP6XVMdA6BdDRCmhieAXe.png"
              alt="Verisk data analytics"
              width={120}
              height={30}
              className="h-4 w-auto opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all md:h-5"
            />
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dash%20Logo-IXaoP1UVZOGn31XBgY1KpAabCi2GR8.png"
              alt="DASH by Cotality"
              width={120}
              height={30}
              className="h-4 w-auto opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all md:h-5"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/encircle-logo.svg"
              alt="Encircle field documentation"
              className="h-4 w-auto opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all md:h-5"
            />
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dri%20eaz%20logo-YuJD7nFS1SYX3UStWEFGqKMloMSfFB.avif"
              alt="Dri-Eaz drying equipment"
              width={120}
              height={30}
              className="h-4 w-auto opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all md:h-5"
            />
          </div>
        </div>
      </div>

    </section>
  )
}
