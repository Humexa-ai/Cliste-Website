"use client"

import { useEffect, useRef } from "react"
import { TestimonialsColumn } from "@/components/ui/testimonials-column"

export function SalonTestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element")
            elements.forEach((element, index) => {
              setTimeout(() => {
                element.classList.add("animate-fade-in-up")
              }, index * 300)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const testimonials = [
    {
      text: "We went from missing 60% of after-hours booking calls to capturing every single appointment request. Our bookings increased 45% in the first month.",
      name: "Emma O'Brien",
      role: "Salon Owner, Dublin",
    },
    {
      text: "No more playing phone tag with clients. Clutch handles all the appointment scheduling while we focus on making our clients look amazing.",
      name: "Ciara Murphy",
      role: "Hair Stylist & Manager",
    },
    {
      text: "With Clutch, our no-shows dropped by 70% thanks to automated reminders. Weekend bookings are up 35% because clients can book anytime.",
      name: "Aoife Kelly",
      role: "Barbershop Owner",
    },
    {
      text: "The AI handles common questions about pricing, services, and stylist availability 24/7. My team can focus on clients instead of answering phones.",
      name: "Sarah Walsh",
      role: "Salon Manager",
    },
    {
      text: "Client satisfaction has never been higher. They love getting instant responses on WhatsApp and Instagram. Our reviews went from 4.2 to 4.8 stars.",
      name: "David Byrne",
      role: "Barber & Business Owner",
    },
    {
      text: "Our small salon saw a 55% increase in bookings. The chatbot handles rescheduling and cancellations perfectly while we focus on hair.",
      name: "Lisa Ryan",
      role: "Salon Co-Owner",
    },
    {
      text: "Appointment requests are handled instantly now. We've filled our schedule completely and even added evening slots to meet demand.",
      name: "Michael Doherty",
      role: "Master Barber",
    },
    {
      text: "Color consultations and treatment bookings increased 40% with 24/7 availability. Clients get immediate answers about services and pricing.",
      name: "Rachel Fitzgerald",
      role: "Salon Director",
    },
  ]

  return (
    <section id="testimonials" ref={sectionRef} className="relative pt-16 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-32">
          <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out inline-flex items-center gap-2 text-white/60 text-sm font-medium tracking-wider uppercase mb-6">
            <div className="w-8 h-px bg-white/30"></div>
            Success Stories
            <div className="w-8 h-px bg-white/30"></div>
          </div>
          <h2 className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out text-5xl md:text-6xl lg:text-7xl font-light text-white mb-8 tracking-tight text-balance">
            The salons we <span className="font-medium italic">empower</span>
          </h2>
          <p className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Discover how leading salons and barbers are transforming their booking experience with AI-powered solutions
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out relative flex justify-center items-center min-h-[600px] md:min-h-[800px] overflow-hidden">
          <div
            className="flex gap-8 max-w-6xl"
            style={{
              maskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
            }}
          >
            <TestimonialsColumn testimonials={testimonials.slice(0, 3)} duration={15} className="flex-1" />
            <TestimonialsColumn
              testimonials={testimonials.slice(2, 5)}
              duration={12}
              className="flex-1 hidden md:block"
            />
            <TestimonialsColumn
              testimonials={testimonials.slice(1, 4)}
              duration={18}
              className="flex-1 hidden lg:block"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

