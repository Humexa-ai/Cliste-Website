"use client"

import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import Aurora from "@/components/Aurora"
import { Footer } from "@/components/footer"
import { SalonHeroHeader } from "@/components/salon-hero-header"
import { SalonSplitScreen } from "@/components/salon-split-screen"
import { SalonTestimonialsSection } from "@/components/salon-testimonials-section"
import { SalonFAQSection } from "@/components/salon-faq-section"

export default function SalonsPage() {
  return (
    <div className="min-h-screen bg-black">
      <main className="min-h-screen relative">
        {/* Aurora background */}
        <div className="fixed inset-0 w-full h-full">
          <Aurora colorStops={["#475569", "#64748b", "#475569"]} amplitude={1.2} blend={0.6} speed={0.8} />
        </div>

        <div className="relative z-10">
          {/* Navbar */}
          <GlassmorphismNav />

          <section className="min-h-screen flex items-start justify-center px-4 pt-24 md:pt-32 pb-20 relative">
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8 mt-8 md:mt-12 animate-fade-in-badge">
                <span className="w-2 h-2 bg-white/60 rounded-full mr-2 animate-pulse"></span>
                Clutch 1.0 By Cliste
              </div>

              <SalonHeroHeader />
            </div>
          </section>

          <SalonSplitScreen />

          {/* Testimonials Section */}
          <SalonTestimonialsSection />

          {/* FAQ Section */}
          <SalonFAQSection />

          {/* Footer */}
          <Footer />
        </div>
      </main>
    </div>
  )
}

