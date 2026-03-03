import AnnouncementBar from "@/components/announcement-bar"
import HeroSection from "@/components/hero-section"
import CarrierReadySection from "@/components/carrier-ready-section"
import AgitationSection from "@/components/agitation-section"
import ProblemSection from "@/components/problem-section"
import CalculatorSection from "@/components/calculator-section"
import FeaturesSection from "@/components/features-section"
import CredibilitySection from "@/components/credibility-section"
import MechanismSection from "@/components/mechanism-section"
import GuaranteesSection from "@/components/guarantees-section"
import TestimonialsSection from "@/components/testimonials-section"
import FaqSection from "@/components/faq-section"
import FinalCTA from "@/components/final-cta"
import StickyCTA from "@/components/sticky-cta"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <AnnouncementBar />
      <HeroSection />
      <CarrierReadySection />
      <AgitationSection />
      <ProblemSection />
      <CalculatorSection />
      <FeaturesSection />
      <CredibilitySection />
      <MechanismSection />
      <GuaranteesSection />
      <TestimonialsSection />
      <FaqSection />
      <FinalCTA />
      <StickyCTA />
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
