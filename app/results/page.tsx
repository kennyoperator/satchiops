import type { Metadata } from "next"
import ResultsHero from "@/components/results/results-hero"
import ResultsStats from "@/components/results/results-stats"
import ResultsCaseStudies from "@/components/results/results-case-studies"
import ResultsVideoTestimonials from "@/components/results/results-video-testimonials"
import ResultsComparison from "@/components/results/results-comparison"
import ResultsCTA from "@/components/results/results-cta"
import AnnouncementBar from "@/components/announcement-bar"

export const metadata: Metadata = {
  title: "Real Results | SatchiOps",
  description:
    "See the documented revenue, answer rates, and job captures SatchiOps has delivered for restoration businesses across the US.",
}

export default function ResultsPage() {
  return (
    <main className="min-h-screen bg-background font-sans text-foreground">
      <AnnouncementBar />

      <ResultsHero />
      <ResultsStats />
      <ResultsCaseStudies />
      <ResultsVideoTestimonials />
      <ResultsComparison />
      <ResultsCTA />

      <footer className="border-t border-black px-6 py-6">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-foreground">
            SatchiOps: Systems Architects.
          </p>
          <p className="mt-1 font-sans text-[10px] text-muted-foreground">
            &copy; {new Date().getFullYear()} SatchiOps. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
