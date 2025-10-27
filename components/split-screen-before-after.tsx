"use client"
import { useEffect, useRef, useState } from "react"
import type React from "react"

import Image from "next/image"

export function SplitScreenBeforeAfter() {
  const [sectionInView, setSectionInView] = useState(false)
  const [whatsappInView, setWhatsappInView] = useState(false)
  const [voiceInView, setVoiceInView] = useState(false)
  const [serviceInView, setServiceInView] = useState(false)
  const [tyreKickersInView, setTyreKickersInView] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const whatsappSectionRef = useRef<HTMLDivElement>(null)
  const voiceSectionRef = useRef<HTMLDivElement>(null)
  const serviceSectionRef = useRef<HTMLDivElement>(null)
  const tyreKickersSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Mobile-friendly observer - triggers much earlier on small screens
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    const observerOptions = {
      threshold: 0,
      rootMargin: isMobile ? "0px 0px 600px 0px" : "0px 0px -50px 0px",
    }

    // Extra aggressive settings for Smart Filtering section on mobile
    const tyreKickersOptions = {
      threshold: 0,
      rootMargin: isMobile ? "0px 0px 1500px 0px" : "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === sectionRef.current) {
            setSectionInView(true)
          } else if (entry.target === whatsappSectionRef.current) {
            setWhatsappInView(true)
          } else if (entry.target === voiceSectionRef.current) {
            setVoiceInView(true)
          } else if (entry.target === serviceSectionRef.current) {
            setServiceInView(true)
          }
        }
      })
    }, observerOptions)

    // Separate observer for Smart Filtering section with more aggressive settings
    const tyreKickersObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target === tyreKickersSectionRef.current) {
          setTyreKickersInView(true)
        }
      })
    }, tyreKickersOptions)

    if (sectionRef.current) observer.observe(sectionRef.current)
    if (whatsappSectionRef.current) observer.observe(whatsappSectionRef.current)
    if (voiceSectionRef.current) observer.observe(voiceSectionRef.current)
    if (serviceSectionRef.current) observer.observe(serviceSectionRef.current)
    if (tyreKickersSectionRef.current) tyreKickersObserver.observe(tyreKickersSectionRef.current)

    // Check if sections are already in viewport on mount (for mobile/small screens)
    const checkInitialVisibility = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setSectionInView(true)
        }
      }
    }

    // Small delay to ensure layout is stable
    const initialCheck = setTimeout(checkInitialVisibility, 100)

    return () => {
      observer.disconnect()
      tyreKickersObserver.disconnect()
      clearTimeout(initialCheck)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 1024) {
        setScrollY(window.scrollY)
      } else {
        // On mobile, manually check if Smart Filtering section should be visible
        if (tyreKickersSectionRef.current && !tyreKickersInView) {
          const rect = tyreKickersSectionRef.current.getBoundingClientRect()
          const triggerPoint = window.innerHeight + 1200 // Trigger 1200px before it enters viewport
          if (rect.top < triggerPoint) {
            setTyreKickersInView(true)
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setScrollY(0)
      }
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [tyreKickersInView])

  const getParallaxOffset = (sectionRef: React.RefObject<HTMLDivElement>) => {
    if (!sectionRef.current || typeof window === "undefined" || window.innerWidth < 1024) {
      return 0
    }

    const rect = sectionRef.current.getBoundingClientRect()
    const sectionTop = rect.top + window.scrollY
    const sectionHeight = rect.height
    const windowHeight = window.innerHeight

    // Calculate how far we've scrolled into this section
    const scrollIntoSection = scrollY + windowHeight / 2 - sectionTop
    const scrollProgress = Math.max(0, Math.min(1, scrollIntoSection / sectionHeight))

    // Simple linear movement from 0 to 80px as you scroll through the section
    // This creates smooth downward movement without any jumps
    return scrollProgress * 80
  }

  const whatsappParallax = getParallaxOffset(whatsappSectionRef)
  const voiceParallax = getParallaxOffset(voiceSectionRef) * 0.5 // Slower parallax for voice section

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 relative z-10 px-4 sm:px-6 lg:px-8">
      <div>
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-16 shadow-lg">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-6xl mx-auto">
            <div
              className={`transition-all duration-700 ease-out ${
                sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="relative aspect-[3/4] max-w-[450px] lg:max-w-none rounded-2xl overflow-hidden">
                <Image
                  src="/images/dealership-showroom.jpg"
                  alt="Modern car dealership showroom"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div
              className={`transition-all duration-700 ease-out delay-100 ${
                sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-slate-100 to-slate-50 border border-slate-200/80 mb-4">
                <span className="text-slate-700 font-semibold text-sm uppercase tracking-wide">Clutch by Cliste</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 lg:mb-8 text-balance">
                <span className="text-slate-900">Never miss a lead with</span>{" "}
                <span className="bg-gradient-to-r from-slate-600 to-slate-400 bg-clip-text text-transparent">
                  Clutch by Cliste
                </span>
              </h2>

              <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
                <div>
                  <h3 className="font-bold text-slate-900 text-base lg:text-xl mb-2">WhatsApp & Messenger</h3>
                  <p className="text-slate-600 text-sm lg:text-base leading-relaxed">
                    Respond instantly to customer inquiries from WhatsApp, Facebook Messenger, and Instagram DMs. Never
                    leave a customer waiting again.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base lg:text-xl mb-2">Phone Calls 24/7</h3>
                  <p className="text-slate-600 text-sm lg:text-base leading-relaxed">
                    Handle unlimited inbound calls around the clock. Answer questions, book test drives, and qualify
                    leads even after hours.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base lg:text-xl mb-2">Website Chat Widget</h3>
                  <p className="text-slate-600 text-sm lg:text-base leading-relaxed">
                    Engage visitors the moment they land on your site. Provide instant answers about inventory, pricing,
                    and availability in real-time.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base lg:text-xl mb-2">Email & SMS</h3>
                  <p className="text-slate-600 text-sm lg:text-base leading-relaxed">
                    Automatically respond to email inquiries and text messages. Keep conversations flowing across every
                    channel your customers prefer.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base lg:text-xl mb-2">Lead Qualification</h3>
                  <p className="text-slate-600 text-sm lg:text-base leading-relaxed">
                    Automatically identify high-intent buyers, capture budget ranges, vehicle preferences, and trade-in
                    details before your team gets involved.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base lg:text-xl mb-2">Instant Booking</h3>
                  <p className="text-slate-600 text-sm lg:text-base leading-relaxed">
                    Schedule test drives, service appointments, and viewings automatically. Sync with your calendar and
                    send confirmations instantly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div ref={whatsappSectionRef} className="mt-6 lg:mt-24 pt-6 lg:pt-24 border-t border-slate-200">
            <div className="grid lg:grid-cols-2 gap-4 lg:gap-16 items-center max-w-6xl mx-auto">
              <div
                className={`transition-all duration-700 ease-out ${
                  whatsappInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-slate-100 to-slate-50 border border-slate-200/80 mb-4">
                  <svg className="w-4 h-4 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  <span className="text-slate-700 font-semibold text-sm uppercase tracking-wide">Messaging</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 text-balance">
                  <span className="text-slate-900">Respond to every message</span>{" "}
                  <span className="bg-gradient-to-r from-slate-600 to-slate-400 bg-clip-text text-transparent">
                    instantly, 24/7
                  </span>
                </h2>

                <p className="text-slate-600 text-base lg:text-lg mb-6 lg:mb-8 leading-relaxed">
                  Clutch by Cliste handles all your WhatsApp, Messenger, and Instagram DM conversations automatically.
                  Never miss a lead, even after hours or during busy times.
                </p>

                <div className="space-y-3 lg:space-y-3">
                  <div className="flex gap-3">
                    <svg
                      className="w-5 h-5 lg:w-5 lg:h-5 text-green-500 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-slate-700 text-sm lg:text-base leading-relaxed">
                      Respond instantly to customer inquiries across WhatsApp, Facebook Messenger, and Instagram DMs.
                      Handle unlimited conversations simultaneously with consistent, professional responses that book
                      test drives and qualify leads automatically.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <svg
                      className="w-5 h-5 lg:w-5 lg:h-5 text-green-500 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-slate-700 text-sm lg:text-base leading-relaxed">
                      Capture complete customer information including vehicle preferences, budget range, trade-in
                      details, and contact information. Every conversation is logged with full history, so your sales
                      team always has context.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <svg
                      className="w-5 h-5 lg:w-5 lg:h-5 text-green-500 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-slate-700 text-sm lg:text-base leading-relaxed">
                      Deliver consistent, on-brand responses that enhance your dealership's reputation. Customers
                      receive instant, helpful answers that feel personal and professional, building trust from the
                      first message.
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone mockups on RIGHT */}
              <div
                className={`transition-all duration-700 ease-out delay-100 ${
                  whatsappInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <div className="relative h-[550px] lg:h-[600px] max-w-[500px] lg:max-w-[700px] mx-auto">
                  {/* Smaller phone - NO parallax */}
                  <div className="absolute left-0 top-12 w-[145px] sm:w-[160px] lg:w-[48%] z-10">
                    <div className="bg-black rounded-[2rem] sm:rounded-[2.5rem] p-2 sm:p-3 shadow-2xl border-[6px] sm:border-8 border-slate-800 aspect-[9/19.5] lg:aspect-auto lg:h-[600px] overflow-hidden flex flex-col">
                      {/* Status bar */}
                      <div className="bg-[#075e54] px-3 pt-1 pb-0.5 flex items-center justify-between text-white text-[8px] sm:text-[9px] lg:text-xs rounded-t-xl sm:rounded-t-[1.25rem]">
                        <span className="font-medium">11:15</span>
                        <div className="flex items-center gap-1">
                          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                          </svg>
                          <span className="font-semibold">85%</span>
                        </div>
                      </div>
                      
                      {/* WhatsApp Header */}
                      <div className="bg-[#075e54] px-1.5 py-1 lg:py-2.5 flex items-center gap-1 lg:gap-2">
                        <svg className="w-3 h-3 lg:w-5 lg:h-5 text-white hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-slate-400 flex items-center justify-center text-slate-700 font-bold text-[9px] lg:text-xs flex-shrink-0">
                          JD
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-white font-medium text-[10px] lg:text-sm truncate">John Doe</div>
                          <div className="text-white/80 text-[8px] lg:text-xs hidden sm:block">Customer</div>
                        </div>
                        <div className="flex items-center gap-1 lg:gap-2">
                          <svg className="w-3 h-3 lg:w-4.5 lg:h-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          <svg className="w-3 h-3 lg:w-4.5 lg:h-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <svg className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                          </svg>
                        </div>
                      </div>

                      {/* Chat background with WhatsApp's beige color */}
                      <div className="flex-1 bg-[#e5ddd5] px-2 py-2 lg:px-3 lg:py-3 overflow-y-auto scrollbar-hide">
                        {/* Incoming message */}
                        <div className="mb-1">
                          <div className="bg-white rounded-lg rounded-tl-none p-1 lg:p-2 inline-block max-w-[90%] shadow-sm">
                            <p className="text-slate-900 text-[9px] lg:text-xs leading-tight">
                              Hello, I'm interested in the BMW X5 you have listed
                            </p>
                            <p className="text-slate-500 text-[8px] lg:text-[10px] mt-0.5">19:00</p>
                          </div>
                        </div>

                        {/* Outgoing auto-response message */}
                        <div className="mb-1 flex justify-end">
                          <div className="bg-[#dcf8c6] rounded-lg rounded-tr-none p-1 lg:p-2 inline-block max-w-[90%] shadow-sm">
                            <p className="text-slate-900 text-[9px] lg:text-xs leading-tight">
                              <span className="lg:hidden">We're currently closed. Business hours: 9 AM - 6 PM.</span>
                              <span className="hidden lg:inline">We're currently closed. Business hours: 9 AM - 6 PM. We'll respond tomorrow!</span>
                            </p>
                            <div className="flex items-center justify-end gap-1 mt-0.5">
                              <p className="text-slate-600 text-[8px] lg:text-[10px]">19:00</p>
                            </div>
                          </div>
                        </div>

                        {/* Incoming message */}
                        <div className="mb-1">
                          <div className="bg-white rounded-lg rounded-tl-none p-1 lg:p-2 inline-block max-w-[70%] shadow-sm">
                            <p className="text-slate-900 text-[9px] lg:text-xs leading-tight">Hello?</p>
                            <p className="text-slate-500 text-[8px] lg:text-[10px] mt-0.5">19:10</p>
                          </div>
                        </div>

                        {/* Outgoing auto-response message */}
                        <div className="flex justify-end">
                          <div className="bg-[#dcf8c6] rounded-lg rounded-tr-none p-1 lg:p-2 inline-block max-w-[85%] shadow-sm">
                            <p className="text-slate-900 text-[9px] lg:text-xs leading-tight">
                              We're currently closed. Business hours: 9 AM - 6 PM.
                            </p>
                            <div className="flex items-center justify-end gap-1 mt-0.5">
                              <p className="text-slate-600 text-[8px] lg:text-[10px]">19:10</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom input bar */}
                      <div className="bg-[#f0f0f0] px-1.5 py-1 lg:py-2 flex items-center gap-1 lg:gap-2 rounded-b-xl sm:rounded-b-[1.25rem]">
                        <svg className="w-4 h-4 lg:w-6 lg:h-6 text-slate-500 flex-shrink-0 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="flex-1 bg-white rounded-full px-2 py-0.5 lg:py-2 border border-slate-200">
                          <input
                            type="text"
                            placeholder="Type"
                            className="w-full bg-transparent text-slate-900 text-[9px] lg:text-xs placeholder-slate-400 outline-none"
                            disabled
                          />
                        </div>
                        <svg className="w-3 h-3 lg:w-5 lg:h-5 text-slate-500 flex-shrink-0 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                        <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-[#00a884] flex items-center justify-center flex-shrink-0">
                          <svg className="w-3.5 h-3.5 lg:w-4.5 lg:h-4.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 15c1.66 0 2.99-1.34 2.99-3L15 6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 15 6.7 12H5c0 3.41 2.72 6.23 6 6.72V22h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="absolute right-0 top-0 w-[180px] sm:w-[200px] lg:w-[60%] z-20 transition-transform duration-500 ease-out will-change-transform"
                    style={{
                      transform: `translateY(${whatsappParallax}px)`,
                    }}
                  >
                    <div className="bg-black rounded-[2rem] sm:rounded-[2.5rem] p-2 sm:p-3 shadow-2xl border-[6px] sm:border-8 border-slate-800 aspect-[9/19.5] lg:aspect-auto lg:h-[700px] overflow-hidden flex flex-col">
                      {/* Status bar */}
                      <div className="bg-[#075e54] px-3 pt-1 pb-0.5 flex items-center justify-between text-white text-[8px] sm:text-[9px] lg:text-xs rounded-t-xl sm:rounded-t-[1.25rem]">
                        <span className="font-medium">11:15</span>
                        <div className="flex items-center gap-1">
                          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                          </svg>
                          <span className="font-semibold">85%</span>
                        </div>
                      </div>
                      
                      {/* WhatsApp Header */}
                      <div className="bg-[#075e54] px-1.5 py-1 lg:py-2.5 flex items-center gap-1 lg:gap-2">
                        <svg className="w-3 h-3 lg:w-5 lg:h-5 text-white hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <div className="w-6 h-6 lg:w-9 lg:h-9 rounded-full bg-slate-300 flex items-center justify-center text-slate-700 font-bold text-[9px] lg:text-xs flex-shrink-0">
                          A
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-white font-medium text-[10px] lg:text-sm">Adam</div>
                          <div className="text-white/80 text-[8px] lg:text-xs hidden sm:block">online</div>
                        </div>
                        <div className="flex items-center gap-1 lg:gap-2">
                          <svg className="w-3 h-3 lg:w-5 lg:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          <svg className="w-3 h-3 lg:w-5 lg:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <svg className="w-3 h-3 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                          </svg>
                        </div>
                      </div>

                      {/* Chat background with WhatsApp's beige color */}
                      <div className="flex-1 bg-[#e5ddd5] px-2 py-2 lg:px-3 lg:py-3 overflow-y-auto scrollbar-hide">
                        {/* Incoming message */}
                        <div className="mb-1">
                          <div className="bg-white rounded-lg rounded-tl-none p-1 lg:p-2 inline-block max-w-[85%] shadow-sm">
                            <p className="text-slate-900 text-[9px] lg:text-xs leading-tight">
                              Hello, I'm interested in the BMW X5 you have listed
                            </p>
                            <p className="text-slate-500 text-[8px] lg:text-[10px] mt-0.5">19:00</p>
                          </div>
                        </div>

                        {/* Outgoing message */}
                        <div className="mb-1 flex justify-end">
                          <div className="bg-[#dcf8c6] rounded-lg rounded-tr-none p-1 lg:p-2 inline-block max-w-[85%] shadow-sm">
                            <p className="text-slate-900 text-[9px] lg:text-xs leading-tight">
                              Hi John! Thanks for your interest in the BMW X5. I'd be happy to schedule a test drive. 🚗
                            </p>
                            <div className="flex items-center justify-end gap-1 mt-0.5">
                              <p className="text-slate-600 text-[8px] lg:text-[10px]">19:00</p>
                              <svg className="w-3 h-3 lg:w-3 lg:h-3 text-slate-600" fill="currentColor" viewBox="0 0 16 15">
                                <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Incoming message */}
                        <div className="mb-1">
                          <div className="bg-white rounded-lg rounded-tl-none p-1 lg:p-2 inline-block max-w-[85%] shadow-sm">
                            <p className="text-slate-900 text-[9px] lg:text-xs leading-tight">
                              That would be great! When are you available?
                            </p>
                            <p className="text-slate-500 text-[8px] lg:text-[10px] mt-0.5">19:01</p>
                          </div>
                        </div>

                        {/* Outgoing message */}
                        <div className="mb-1 flex justify-end">
                          <div className="bg-[#dcf8c6] rounded-lg rounded-tr-none p-1 lg:p-2 inline-block max-w-[85%] shadow-sm">
                            <p className="text-slate-900 text-[9px] lg:text-xs leading-tight">
                              I have availability tomorrow at 10am, 2pm, or 4pm. Which time works best?
                            </p>
                            <div className="flex items-center justify-end gap-1 mt-0.5">
                              <p className="text-slate-600 text-[8px] lg:text-[10px]">19:01</p>
                              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-600" fill="currentColor" viewBox="0 0 16 15">
                                <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* TODAY divider */}
                        <div className="hidden lg:flex items-center justify-center my-2 sm:my-3">
                          <div className="bg-[#dcf8c6]/60 px-2 py-0.5 sm:px-3 sm:py-1 rounded-md shadow-sm">
                            <span className="text-slate-700 text-[8px] sm:text-[9px] lg:text-[10px] font-medium uppercase tracking-wide">
                              TODAY
                            </span>
                          </div>
                        </div>

                        {/* Incoming message */}
                        <div className="mb-1">
                          <div className="bg-white rounded-lg rounded-tl-none p-1 lg:p-2 inline-block max-w-[85%] shadow-sm">
                            <p className="text-slate-900 text-[9px] lg:text-xs leading-tight">
                              2pm works perfect. What's the price?
                            </p>
                            <p className="text-slate-500 text-[8px] lg:text-[10px] mt-0.5">19:02</p>
                          </div>
                        </div>

                        {/* Outgoing message */}
                        <div className="mb-1 flex justify-end">
                          <div className="bg-[#dcf8c6] rounded-lg rounded-tr-none p-1 lg:p-2 inline-block max-w-[85%] shadow-sm">
                            <p className="text-slate-900 text-[9px] lg:text-xs leading-tight">
                              Perfect! I've booked you for 2pm tomorrow. The BMW X5 is €45,900. 2023 model, 15,000km. Financing options?
                            </p>
                            <div className="flex items-center justify-end gap-1 mt-0.5">
                              <p className="text-slate-600 text-[8px] lg:text-[10px]">19:02</p>
                              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-600" fill="currentColor" viewBox="0 0 16 15">
                                <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Incoming message */}
                        <div className="mb-1">
                          <div className="bg-white rounded-lg rounded-tl-none p-1 lg:p-2 inline-block max-w-[85%] shadow-sm">
                            <p className="text-slate-900 text-[9px] lg:text-xs leading-tight">
                              Yes please! Do you accept trade-ins?
                            </p>
                            <p className="text-slate-500 text-[8px] lg:text-[10px] mt-0.5">19:02</p>
                          </div>
                        </div>

                        {/* Outgoing message */}
                        <div className="flex justify-end">
                          <div className="bg-[#dcf8c6] rounded-lg rounded-tr-none p-1 lg:p-2 inline-block max-w-[85%] shadow-sm">
                            <p className="text-slate-900 text-[9px] lg:text-xs leading-tight">
                              Yes we accept trade-ins. What vehicle do you have?
                            </p>
                            <div className="flex items-center justify-end gap-1 mt-0.5">
                              <p className="text-slate-600 text-[8px] lg:text-[10px]">19:02</p>
                              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-600" fill="currentColor" viewBox="0 0 16 15">
                                <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom input bar */}
                      <div className="bg-[#f0f0f0] px-1.5 py-1 lg:py-2 flex items-center gap-1 lg:gap-2 rounded-b-xl sm:rounded-b-[1.25rem]">
                        <svg className="w-4 h-4 lg:w-6 lg:h-6 text-slate-500 flex-shrink-0 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="flex-1 bg-white rounded-full px-2 py-0.5 lg:py-2 border border-slate-200">
                          <input
                            type="text"
                            placeholder="Type"
                            className="w-full bg-transparent text-slate-900 text-[9px] lg:text-xs placeholder-slate-400 outline-none"
                            disabled
                          />
                        </div>
                        <svg className="w-3 h-3 lg:w-5 lg:h-5 text-slate-500 flex-shrink-0 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                        <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-[#00a884] flex items-center justify-center flex-shrink-0">
                          <svg className="w-3.5 h-3.5 lg:w-4.5 lg:h-4.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 15c1.66 0 2.99-1.34 2.99-3L15 6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 15 6.7 12H5c0 3.41 2.72 6.23 6 6.72V22h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Voice Agent Section - order is already correct: phones LEFT, text RIGHT */}
            <div ref={voiceSectionRef} className="mt-0 lg:mt-24 pt-0 lg:pt-24 lg:border-t border-slate-200">
              <div className="grid lg:grid-cols-2 gap-4 lg:gap-16 items-center max-w-6xl mx-auto">
                <div
                  className={`order-2 lg:order-1 transition-all duration-700 ease-out ${
                    voiceInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  <div className="relative h-[550px] lg:h-[600px] max-w-[500px] lg:max-w-[550px] mx-auto">
                    <div
                      className="absolute right-0 top-0 w-[200px] lg:w-[60%] z-20 transition-transform duration-500 ease-out will-change-transform"
                      style={{
                        transform: `translateY(${voiceParallax}px)`,
                      }}
                    >
                      <div className="bg-slate-900 rounded-[2rem] sm:rounded-[2.5rem] p-2 sm:p-3 lg:p-4 shadow-2xl border-[6px] sm:border-8 border-slate-800 aspect-[9/19.5] lg:aspect-auto lg:h-[700px] overflow-hidden flex flex-col">
                        {/* Header */}
                        <div className="bg-gradient-to-br from-green-900 to-slate-900 rounded-t-xl sm:rounded-t-[1.25rem] px-3 py-3 sm:py-4 lg:py-5 text-center border-b border-green-700/50">
                          <div className="text-green-400 text-[9px] sm:text-[10px] lg:text-sm mb-1.5 lg:mb-2 font-medium tracking-wide flex items-center justify-center gap-1.5">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            ANSWERED BY CLISTE AI
                          </div>
                          <div className="text-white font-bold text-xs sm:text-sm lg:text-lg mb-0.5">James O'Brien</div>
                          <div className="text-slate-400 text-[9px] sm:text-[10px] lg:text-xs font-mono">
                            +353 86 234 5678
                          </div>
                        </div>

                        {/* Call Info */}
                        <div className="bg-slate-900 p-2 sm:p-3 lg:p-4 border-b border-slate-700/50">
                          <div className="flex items-center justify-between text-[8px] sm:text-[9px] lg:text-xs">
                            <div className="flex items-center gap-1.5">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                              <span className="text-green-400 font-semibold">Call Active</span>
                            </div>
                            <span className="text-slate-400 font-mono">03:42</span>
                          </div>
                        </div>

                        {/* Conversation Transcript */}
                        <div className="flex-1 bg-slate-900 p-2 sm:p-3 lg:p-4 overflow-y-auto scrollbar-hide space-y-2 lg:space-y-2.5">
                          <div className="bg-slate-800/50 rounded-lg p-2 lg:p-2.5 border-l-2 border-purple-500">
                            <div className="flex items-center gap-1.5 mb-1">
                              <span className="text-purple-400 font-semibold text-[8px] sm:text-[9px] lg:text-xs">Cliste AI</span>
                              <span className="text-slate-500 text-[7px] sm:text-[8px] lg:text-[10px]">03:40</span>
                            </div>
                            <div className="text-slate-300 text-[8px] sm:text-[9px] lg:text-xs leading-relaxed">
                              Good evening! Premium Motors. How can I help you today?
                            </div>
                          </div>

                          <div className="bg-slate-800/50 rounded-lg p-2 lg:p-2.5 border-l-2 border-blue-500">
                            <div className="flex items-center gap-1.5 mb-1">
                              <span className="text-blue-400 font-semibold text-[8px] sm:text-[9px] lg:text-xs">James</span>
                              <span className="text-slate-500 text-[7px] sm:text-[8px] lg:text-[10px]">03:40</span>
                            </div>
                            <div className="text-slate-300 text-[8px] sm:text-[9px] lg:text-xs leading-relaxed">
                              Hi, I'm interested in the BMW X5. Is it still available?
                            </div>
                          </div>

                          <div className="bg-slate-800/50 rounded-lg p-2 lg:p-2.5 border-l-2 border-purple-500">
                            <div className="flex items-center gap-1.5 mb-1">
                              <span className="text-purple-400 font-semibold text-[8px] sm:text-[9px] lg:text-xs">Cliste AI</span>
                              <span className="text-slate-500 text-[7px] sm:text-[8px] lg:text-[10px]">03:41</span>
                            </div>
                            <div className="text-slate-300 text-[8px] sm:text-[9px] lg:text-xs leading-relaxed">
                              Yes! The 2024 BMW X5 is available. Would you like to schedule a test drive?
                            </div>
                          </div>

                          <div className="bg-slate-800/50 rounded-lg p-2 lg:p-2.5 border-l-2 border-blue-500">
                            <div className="flex items-center gap-1.5 mb-1">
                              <span className="text-blue-400 font-semibold text-[8px] sm:text-[9px] lg:text-xs">James</span>
                              <span className="text-slate-500 text-[7px] sm:text-[8px] lg:text-[10px]">03:41</span>
                            </div>
                            <div className="text-slate-300 text-[8px] sm:text-[9px] lg:text-xs leading-relaxed">
                              Absolutely! What's the price and when can I come by?
                            </div>
                          </div>

                          <div className="bg-slate-800/50 rounded-lg p-2 lg:p-2.5 border-l-2 border-purple-500">
                            <div className="flex items-center gap-1.5 mb-1">
                              <span className="text-purple-400 font-semibold text-[8px] sm:text-[9px] lg:text-xs">Cliste AI</span>
                              <span className="text-slate-500 text-[7px] sm:text-[8px] lg:text-[10px]">03:42</span>
                            </div>
                            <div className="text-slate-300 text-[8px] sm:text-[9px] lg:text-xs leading-relaxed">
                              It's priced at €62,500. I have availability tomorrow at 2pm or Thursday at 11am...
                            </div>
                          </div>
                        </div>

                        {/* Lead Captured Banner */}
                        <div className="bg-gradient-to-br from-green-900/40 to-green-800/40 border-t-2 border-green-500/50 rounded-b-xl sm:rounded-b-[1.25rem] p-2 lg:p-3">
                          <div className="flex items-center justify-center gap-1.5">
                            <svg className="w-3 h-3 lg:w-4 lg:h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-green-400 text-[9px] sm:text-[10px] lg:text-sm font-bold uppercase tracking-wide">
                              Lead Captured
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Smaller phone - NO parallax */}
                  <div className="absolute left-0 top-12 w-[160px] lg:w-[45%] z-10">
                    <div className="bg-slate-900 rounded-[2rem] sm:rounded-[2.5rem] p-2 sm:p-3 lg:p-4 shadow-2xl border-[6px] sm:border-8 border-slate-800 aspect-[9/19.5] lg:aspect-auto lg:h-[600px] overflow-hidden flex flex-col">
                      {/* Header */}
                      <div className="bg-gradient-to-br from-red-900 to-slate-900 rounded-t-xl sm:rounded-t-[1.25rem] px-3 py-4 sm:py-5 lg:py-6 text-center border-b border-red-700/50">
                        <div className="text-red-400 text-[9px] sm:text-[10px] lg:text-sm mb-2 lg:mb-3 font-medium tracking-wide">
                          MISSED CALL
                        </div>
                        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center mb-2 sm:mb-3 lg:mb-3 shadow-lg shadow-red-500/30 ring-4 ring-red-500/20">
                          <svg
                            className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                        <div className="text-white font-bold text-xs sm:text-sm lg:text-base mb-0.5">Emma Johnson</div>
                        <div className="text-slate-400 text-[9px] sm:text-[10px] lg:text-xs font-mono">
                          +353 85 789 1234
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 bg-slate-900 p-2 sm:p-3 lg:p-4 overflow-y-auto scrollbar-hide space-y-2 lg:space-y-2.5">
                        {/* Closed Notice */}
                        <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 border-2 border-red-500/40 rounded-xl p-2 sm:p-2.5 lg:p-3">
                          <div className="text-center">
                            <div className="text-red-400 text-[10px] sm:text-xs lg:text-sm font-bold mb-1">
                              OFFICE CLOSED
                            </div>
                            <div className="text-slate-300 text-[8px] sm:text-[9px] lg:text-xs">
                              Office Hours: Mon-Fri
                            </div>
                            <div className="text-white text-[9px] sm:text-[10px] lg:text-xs font-semibold">
                              9:00 AM - 6:00 PM
                            </div>
                          </div>
                        </div>

                        {/* Call Details */}
                        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-2 sm:p-2.5 lg:p-3">
                          <div className="text-slate-300 text-[9px] sm:text-[10px] lg:text-xs font-semibold mb-1.5">
                            Call Details
                          </div>
                          <div className="space-y-1 text-[8px] sm:text-[9px] lg:text-xs">
                            <div className="flex justify-between">
                              <span className="text-slate-400">Time</span>
                              <span className="text-white font-medium">7:15 PM</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Duration</span>
                              <span className="text-white font-medium">3 rings</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Status</span>
                              <span className="text-red-400 font-semibold">Unanswered</span>
                            </div>
                          </div>
                        </div>

                        {/* Voicemail */}
                        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-2 sm:p-2.5 lg:p-3">
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <svg
                              className="w-3 h-3 lg:w-4 lg:h-4 text-slate-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            <span className="text-slate-300 text-[9px] sm:text-[10px] lg:text-xs font-medium">
                              Voicemail
                            </span>
                          </div>
                          <div className="text-slate-400 text-[8px] sm:text-[9px] lg:text-xs italic leading-relaxed">
                            "You've reached Premium Motors. We're closed. Leave a message and we'll call back during business hours..."
                          </div>
                        </div>

                      </div>

                      {/* Lead Lost Banner */}
                      <div className="bg-gradient-to-br from-red-900/40 to-red-800/40 border-t-2 border-red-500/50 rounded-b-xl sm:rounded-b-[1.25rem] p-2 sm:p-2.5 lg:p-3">
                        <div className="flex items-center justify-center gap-1.5">
                          <svg className="w-3 h-3 lg:w-4 lg:h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-red-400 text-[9px] sm:text-[10px] lg:text-sm font-bold uppercase tracking-wide">
                            Lead Lost
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`order-1 lg:order-2 transition-all duration-700 ease-out delay-100 ${
                    voiceInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-slate-100 to-slate-50 border border-slate-200/80 mb-4">
                    <svg className="w-4 h-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span className="text-slate-700 font-semibold text-sm uppercase tracking-wide">Voice Calls</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 text-balance">
                    <span className="text-slate-900">Answer every call</span>{" "}
                    <span className="bg-gradient-to-r from-slate-600 to-slate-400 bg-clip-text text-transparent">
                      instantly, 24/7
                    </span>
                  </h2>

                  <p className="text-slate-600 text-base lg:text-lg mb-6 lg:mb-8 leading-relaxed">
                    Never miss a lead with intelligent phone automation that handles unlimited calls around the clock.
                    Book test drives, answer questions, and qualify leads automatically.
                  </p>

                  <div className="space-y-3 lg:space-y-3">
                    <div className="flex gap-3">
                      <svg
                        className="w-5 h-5 lg:w-5 lg:h-5 text-green-500 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-slate-700 text-sm lg:text-base leading-relaxed">
                        Answer every call instantly with natural-sounding conversations that understand your inventory,
                        pricing, and availability. Never lose a customer to voicemail again.
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <svg
                        className="w-5 h-5 lg:w-5 lg:h-5 text-green-500 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-slate-700 text-sm lg:text-base leading-relaxed">
                        Book test drives, answer vehicle questions, provide pricing, and handle trade-in inquiries
                        through natural phone conversations that feel completely human.
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <svg
                        className="w-5 h-5 lg:w-5 lg:h-5 text-green-500 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-slate-700 text-sm lg:text-base leading-relaxed">
                        Get real-time insights on every call including customer intent, budget range, and vehicle
                        preferences. Your sales team receives warm leads ready to close.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service & Parts Section */}
            <div ref={serviceSectionRef} className="mt-6 lg:mt-32 pt-6 lg:pt-32 border-t border-slate-200">
              <div className="grid lg:grid-cols-2 gap-4 lg:gap-16 items-center max-w-6xl mx-auto">
                <div
                  className={`transition-all duration-700 ease-out ${
                    serviceInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-slate-100 to-slate-50 border border-slate-200/80 mb-4">
                    <svg className="w-4 h-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="text-slate-700 font-semibold text-sm uppercase tracking-wide">
                      Service & Parts
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 text-balance">
                    <span className="text-slate-900">Automate Service</span>{" "}
                    <span className="bg-gradient-to-r from-slate-600 to-slate-400 bg-clip-text text-transparent">
                      Bookings & Parts
                    </span>
                  </h2>

                  <p className="text-slate-600 text-base lg:text-lg mb-6 lg:mb-8 leading-relaxed">
                    Handle service appointments and parts inquiries automatically across all your sales channels -
                    website, phone, and social media. Clutch By Cliste manages bookings, answers parts questions, and
                    processes orders seamlessly, all customized to your dealership's operations.
                  </p>

                  <div className="space-y-5 lg:space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-black flex items-center justify-center">
                          <svg className="w-4 h-4 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <h3 className="font-bold text-black text-base lg:text-base">Service Bookings</h3>
                      </div>
                      <p className="text-slate-600 text-sm lg:text-sm leading-relaxed ml-10 lg:ml-11">
                        Clutch By Cliste automatically schedules service appointments and sends confirmations across all
                        channels - website, phone, and social media, customized to your workflow
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-black flex items-center justify-center">
                          <svg className="w-4 h-4 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
                          </svg>
                        </div>
                        <h3 className="font-bold text-black text-base lg:text-base">Parts Inquiries</h3>
                      </div>
                      <p className="text-slate-600 text-sm lg:text-sm leading-relaxed ml-10 lg:ml-11">
                        Answers questions about parts availability, pricing, and delivery times based on your inventory
                        in real-time, whether customers reach out via phone, website, or social media
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-black flex items-center justify-center">
                          <svg className="w-4 h-4 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                            <path
                              fillRule="evenodd"
                              d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <h3 className="font-bold text-black text-base lg:text-base">Order Management</h3>
                      </div>
                      <p className="text-slate-600 text-sm lg:text-sm leading-relaxed ml-10 lg:ml-11">
                        Processes parts orders and provides tracking updates without human intervention across every
                        customer touchpoint, tailored to your systems
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-black flex items-center justify-center">
                          <svg className="w-4 h-4 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                        <h3 className="font-bold text-black text-base lg:text-base">Customer Updates</h3>
                      </div>
                      <p className="text-slate-600 text-sm lg:text-sm leading-relaxed ml-10 lg:ml-11">
                        Keeps customers informed about service progress and parts arrival status 24/7 in real-time
                        across messaging, or getting push notifications, all customized to your communication style
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={`transition-all duration-700 ease-out delay-100 ${
                    serviceInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  <div className="relative h-[480px] lg:h-[600px] max-w-[500px] lg:max-w-[480px] mx-auto overflow-visible">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:rotate-6 w-full max-w-[260px] lg:max-w-[320px]">
                      <div className="bg-white rounded-[1.75rem] lg:rounded-[2.5rem] p-2 lg:p-3 shadow-2xl border-[5px] lg:border-8 border-slate-800 h-[460px] lg:h-[650px] overflow-hidden flex flex-col">
                        {/* Status bar */}
                        <div className="bg-white px-3 pt-1 pb-0.5 flex items-center justify-between text-black text-[8px] sm:text-[9px] lg:text-xs rounded-t-xl sm:rounded-t-[1.25rem]">
                          <span className="font-medium">2:15 PM</span>
                          <div className="flex items-center gap-1">
                            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                            </svg>
                            <span className="font-semibold">85%</span>
                          </div>
                        </div>

                        {/* Chat header */}
                        <div className="bg-white border-b border-slate-200 px-3 py-2 sm:py-3 lg:py-3 flex items-center gap-2">
                          <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-6 lg:h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                          <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-xs sm:text-sm lg:text-base">PM</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-slate-900 font-semibold text-xs sm:text-sm lg:text-base">Premium Motors</div>
                            <div className="text-slate-500 text-[9px] sm:text-[10px] lg:text-xs">Active now</div>
                          </div>
                          <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-6 lg:h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>

                        {/* Chat messages */}
                        <div className="flex-1 bg-white p-2 lg:p-3 space-y-1 lg:space-y-1 overflow-y-auto scrollbar-hide">
                          {/* Incoming message */}
                          <div className="flex items-end gap-0.5 lg:gap-1 mb-0.5">
                            <div className="w-4 h-4 lg:w-6 lg:h-6 rounded-full bg-slate-400 flex-shrink-0 flex items-center justify-center">
                              <svg className="w-2 h-2 lg:w-3 lg:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="bg-[#E4E6EB] rounded-2xl lg:rounded-2xl px-2 py-1 lg:px-3 lg:py-2 max-w-[70%] lg:max-w-[65%]">
                              <p className="text-slate-900 text-[10px] lg:text-sm leading-snug lg:leading-relaxed">
                                Hi, I need to book a service for my car
                              </p>
                            </div>
                          </div>

                          {/* Outgoing message */}
                          <div className="flex justify-end mb-0.5">
                            <div className="bg-[#0084FF] rounded-2xl lg:rounded-2xl px-2 py-1 lg:px-3 lg:py-2 max-w-[70%] lg:max-w-[65%]">
                              <p className="text-white text-[10px] lg:text-sm leading-snug lg:leading-relaxed">
                                I'd be happy to help! What type of service do you need? We have slots available this week.
                              </p>
                            </div>
                          </div>

                          {/* Incoming message */}
                          <div className="flex items-end gap-0.5 lg:gap-1 mb-0.5">
                            <div className="w-4 h-4 lg:w-6 lg:h-6 rounded-full bg-slate-400 flex-shrink-0 flex items-center justify-center">
                              <svg className="w-2 h-2 lg:w-3 lg:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="bg-[#E4E6EB] rounded-2xl lg:rounded-2xl px-2 py-1 lg:px-3 lg:py-2 max-w-[70%] lg:max-w-[65%]">
                              <p className="text-slate-900 text-[10px] lg:text-sm leading-snug lg:leading-relaxed">
                                Full service. Also, do you have brake pads in stock?
                              </p>
                            </div>
                          </div>

                          {/* Outgoing message */}
                          <div className="flex justify-end mb-0.5">
                            <div className="bg-[#0084FF] rounded-2xl lg:rounded-2xl px-2 py-1 lg:px-3 lg:py-2 max-w-[70%] lg:max-w-[65%]">
                              <p className="text-white text-[10px] lg:text-sm leading-snug lg:leading-relaxed">
                                Yes! We have brake pads in stock. I can book you in for Thursday at 2 PM and include the brake pad replacement. Total: €180
                              </p>
                            </div>
                          </div>

                          {/* Incoming message */}
                          <div className="flex items-end gap-0.5 lg:gap-1 mb-0.5">
                            <div className="w-4 h-4 lg:w-6 lg:h-6 rounded-full bg-slate-400 flex-shrink-0 flex items-center justify-center">
                              <svg className="w-2 h-2 lg:w-3 lg:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="bg-[#E4E6EB] rounded-2xl lg:rounded-2xl px-2 py-1 lg:px-3 lg:py-2 max-w-[70%] lg:max-w-[65%]">
                              <p className="text-slate-900 text-[10px] lg:text-sm leading-snug lg:leading-relaxed">
                                Perfect! Can I order an oil filter too?
                              </p>
                            </div>
                          </div>

                          {/* Outgoing message */}
                          <div className="flex justify-end">
                            <div className="bg-[#0084FF] rounded-2xl lg:rounded-2xl px-2 py-1 lg:px-3 lg:py-2 max-w-[70%] lg:max-w-[65%]">
                              <p className="text-white text-[10px] lg:text-sm leading-snug lg:leading-relaxed">
                                I've added an oil filter (#GF35) to your order. Your appointment is confirmed for Thursday at 2 PM. See you then!
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Input bar */}
                        <div className="bg-white border-t border-slate-200 px-3 py-2 flex items-center gap-2">
                          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#0084FF]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                          </svg>
                          <div className="flex-1 bg-slate-100 rounded-full px-3 py-1.5">
                            <input
                              type="text"
                              placeholder="Aa"
                              className="w-full bg-transparent text-slate-900 text-[10px] sm:text-xs lg:text-sm placeholder-slate-500 outline-none"
                              disabled
                            />
                          </div>
                          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#0084FF]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tyre Kickers Section - swapped order so chat mockup is on LEFT, text on RIGHT */}
                <div
                  ref={tyreKickersSectionRef}
                  className={`order-2 lg:order-1 transition-all duration-700 ease-out mt-6 lg:mt-24 ${
                    tyreKickersInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  <div className="relative h-[480px] lg:h-[600px] max-w-[500px] lg:max-w-[480px] mx-auto overflow-visible">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:-rotate-6 w-full max-w-[260px] lg:max-w-[320px]">
                      <div className="bg-white rounded-[1.75rem] lg:rounded-[2.5rem] p-2 lg:p-3 shadow-2xl border-[5px] lg:border-8 border-slate-800 h-[460px] lg:h-[650px] overflow-hidden flex flex-col">
                        {/* Status bar */}
                        <div className="bg-white px-3 pt-1 pb-0.5 flex items-center justify-between text-black text-[8px] sm:text-[9px] lg:text-xs rounded-t-xl sm:rounded-t-[1.25rem]">
                          <span className="font-medium">9:41</span>
                          <div className="flex items-center gap-1">
                            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                            </svg>
                          </div>
                        </div>

                        {/* Chat header */}
                        <div className="bg-white border-b border-slate-200 px-3 py-2 sm:py-3 lg:py-3 flex items-center gap-2">
                          <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-6 lg:h-6 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                          <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-purple-400 via-pink-500 to-orange-400 flex items-center justify-center flex-shrink-0 ring-2 ring-white">
                            <span className="text-white font-bold text-xs sm:text-sm lg:text-base">PM</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-slate-900 font-semibold text-xs sm:text-sm lg:text-base">Premium Motors</div>
                            <div className="text-slate-500 text-[9px] sm:text-[10px] lg:text-xs">silvaqueen15</div>
                          </div>
                          <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-6 lg:h-6 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-6 lg:h-6 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>

                        {/* Chat messages */}
                        <div className="flex-1 bg-white p-2 lg:p-3 space-y-1 lg:space-y-1 overflow-y-auto scrollbar-hide">
                          {/* Incoming message */}
                          <div className="flex items-end gap-0.5 lg:gap-1 mb-0.5">
                            <div className="w-4 h-4 lg:w-6 lg:h-6 rounded-full bg-gradient-to-br from-purple-400 via-pink-500 to-orange-400 flex-shrink-0 flex items-center justify-center">
                              <svg className="w-2 h-2 lg:w-3 lg:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="border border-slate-300 lg:border-2 rounded-2xl lg:rounded-3xl px-2 py-1 lg:px-3 lg:py-2 max-w-[70%] lg:max-w-[65%]">
                              <p className="text-slate-900 text-[10px] lg:text-sm leading-snug lg:leading-relaxed">
                                What's the NCT status on the BMW?
                              </p>
                            </div>
                          </div>

                          {/* Outgoing message */}
                          <div className="flex justify-end mb-0.5">
                            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl lg:rounded-3xl px-2 py-1 lg:px-3 lg:py-2 max-w-[70%] lg:max-w-[65%]">
                              <p className="text-white text-[10px] lg:text-sm leading-snug lg:leading-relaxed">
                                The BMW has a fresh NCT valid until March 2026. Full service history available!
                              </p>
                            </div>
                          </div>

                          {/* Incoming message */}
                          <div className="flex items-end gap-0.5 lg:gap-1 mb-0.5">
                            <div className="w-4 h-4 lg:w-6 lg:h-6 rounded-full bg-gradient-to-br from-purple-400 via-pink-500 to-orange-400 flex-shrink-0 flex items-center justify-center">
                              <svg className="w-2 h-2 lg:w-3 lg:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="border border-slate-300 lg:border-2 rounded-2xl lg:rounded-3xl px-2 py-1 lg:px-3 lg:py-2 max-w-[70%] lg:max-w-[65%]">
                              <p className="text-slate-900 text-[10px] lg:text-sm leading-snug lg:leading-relaxed">
                                How many miles?
                              </p>
                            </div>
                          </div>

                          {/* Outgoing message */}
                          <div className="flex justify-end mb-0.5">
                            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl lg:rounded-3xl px-2 py-1 lg:px-3 lg:py-2 max-w-[70%] lg:max-w-[65%]">
                              <p className="text-white text-[10px] lg:text-sm leading-snug lg:leading-relaxed">
                                45,000 miles with full dealer service history. Would you like to schedule a test drive?
                              </p>
                            </div>
                          </div>

                          {/* Incoming message */}
                          <div className="flex items-end gap-0.5 lg:gap-1 mb-0.5">
                            <div className="w-4 h-4 lg:w-6 lg:h-6 rounded-full bg-gradient-to-br from-purple-400 via-pink-500 to-orange-400 flex-shrink-0 flex items-center justify-center">
                              <svg className="w-2 h-2 lg:w-3 lg:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="border border-slate-300 lg:border-2 rounded-2xl lg:rounded-3xl px-2 py-1 lg:px-3 lg:py-2 max-w-[70%] lg:max-w-[65%]">
                              <p className="text-slate-900 text-[10px] lg:text-sm leading-snug lg:leading-relaxed">
                                Do you take trade-ins?
                              </p>
                            </div>
                          </div>

                          {/* Outgoing message */}
                          <div className="flex justify-end">
                            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl lg:rounded-3xl px-2 py-1 lg:px-3 lg:py-2 max-w-[70%] lg:max-w-[65%]">
                              <p className="text-white text-[10px] lg:text-sm leading-snug lg:leading-relaxed">
                                Yes! We offer competitive trade-in values. What vehicle are you looking to trade?
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Input bar */}
                        <div className="bg-white border-t border-slate-200 px-3 py-2 flex items-center gap-2">
                          <div className="flex-1 bg-white border border-slate-300 rounded-full px-3 py-1.5">
                            <input
                              type="text"
                              placeholder="Message..."
                              className="w-full bg-transparent text-slate-900 text-[10px] sm:text-xs lg:text-sm placeholder-slate-500 outline-none"
                              disabled
                            />
                          </div>
                          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text on RIGHT desktop, ABOVE on mobile */}
                <div
                  className={`order-1 lg:order-2 transition-all duration-700 ease-out delay-100 mt-12 lg:mt-24 ${
                    tyreKickersInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-slate-100 to-slate-50 border border-slate-200/80 mb-4">
                    <svg className="w-4 h-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                      />
                    </svg>
                    <span className="text-slate-700 font-semibold text-sm uppercase tracking-wide">
                      Smart Filtering
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 text-balance">
                    <span className="text-slate-900">Handle Tyre Kickers</span>{" "}
                    <span className="bg-gradient-to-r from-slate-600 to-slate-400 bg-clip-text text-transparent">
                      Automatically
                    </span>
                  </h2>

                  <p className="text-slate-600 text-base lg:text-lg mb-6 lg:mb-8 leading-relaxed">
                    Stop wasting time on repetitive questions. Clutch By Cliste instantly answers common inquiries about
                    NCT, mileage, trade-ins, and pricing while qualifying serious buyers - across your website widget,
                    phone calls, and social media channels, all tailored to your dealership's specific needs.
                  </p>

                  <div className="space-y-5 lg:space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-black flex items-center justify-center">
                          <svg className="w-4 h-4 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <h3 className="font-bold text-black text-base lg:text-base">Instant Answers</h3>
                      </div>
                      <p className="text-slate-600 text-sm lg:text-sm leading-relaxed ml-10 lg:ml-11">
                        Clutch By Cliste responds to 50+ common questions about NCT, mileage, trade-ins, and pricing
                        instantly across your website, phone, and social channels
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-black flex items-center justify-center">
                          <svg className="w-4 h-4 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                            <path
                              fillRule="evenodd"
                              d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <h3 className="font-bold text-black text-base lg:text-base">Qualify Leads</h3>
                      </div>
                      <p className="text-slate-600 text-sm lg:text-sm leading-relaxed ml-10 lg:ml-11">
                        Automatically filters serious buyers from browsers by asking the right questions tailored to
                        your dealership
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-black flex items-center justify-center">
                          <svg className="w-4 h-4 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <h3 className="font-bold text-black text-base lg:text-base">Save Time</h3>
                      </div>
                      <p className="text-slate-600 text-sm lg:text-sm leading-relaxed ml-10 lg:ml-11">
                        Stop answering the same questions repeatedly - let Clutch By Cliste handle the tire kickers
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-black flex items-center justify-center">
                          <svg className="w-4 h-4 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <h3 className="font-bold text-black text-base lg:text-base">24/7 Availability</h3>
                      </div>
                      <p className="text-slate-600 text-sm lg:text-sm leading-relaxed ml-10 lg:ml-11">
                        Never miss a serious inquiry while filtering out time-wasters around the clock - on every
                        channel
                      </p>
                    </div>
                  </div>
                </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}
