"use client"
import { useEffect, useRef, useState } from "react"
import type React from "react"

export function SalonSplitScreen() {
  const [sectionInView, setSectionInView] = useState(false)
  const [whatsappInView, setWhatsappInView] = useState(false)
  const [voiceInView, setVoiceInView] = useState(false)
  const [smartFilteringInView, setSmartFilteringInView] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const whatsappSectionRef = useRef<HTMLDivElement>(null)
  const voiceSectionRef = useRef<HTMLDivElement>(null)
  const smartFilteringSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    const observerOptions = {
      threshold: 0,
      rootMargin: isMobile ? "0px 0px 800px 0px" : "0px 0px -50px 0px",
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
          } else if (entry.target === smartFilteringSectionRef.current) {
            setSmartFilteringInView(true)
          }
        }
      })
    }, observerOptions)

    if (sectionRef.current) observer.observe(sectionRef.current)
    if (whatsappSectionRef.current) observer.observe(whatsappSectionRef.current)
    if (voiceSectionRef.current) observer.observe(voiceSectionRef.current)
    if (smartFilteringSectionRef.current) observer.observe(smartFilteringSectionRef.current)

    const checkInitialVisibility = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setSectionInView(true)
        }
      }
    }

    const initialCheck = setTimeout(checkInitialVisibility, 100)

    return () => {
      observer.disconnect()
      clearTimeout(initialCheck)
    }
  }, [])

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
              <div className="relative aspect-[3/4] max-w-[450px] lg:max-w-none rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <div className="text-center p-8">
                  <svg className="w-32 h-32 mx-auto mb-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
                  </svg>
                  <p className="text-slate-500 text-sm">Salon/Barber Image</p>
                </div>
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
                <span className="text-slate-900">Never miss a booking with</span>{" "}
                <span className="bg-gradient-to-r from-slate-600 to-slate-400 bg-clip-text text-transparent">
                  Clutch by Cliste
                </span>
              </h2>

              <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
                <div>
                  <h3 className="font-bold text-slate-900 text-base lg:text-xl mb-2">WhatsApp & Messenger</h3>
                  <p className="text-slate-600 text-sm lg:text-base leading-relaxed">
                    Respond instantly to appointment inquiries from WhatsApp, Facebook Messenger, and Instagram DMs. Never
                    leave a customer waiting again.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base lg:text-xl mb-2">Phone Calls 24/7</h3>
                  <p className="text-slate-600 text-sm lg:text-base leading-relaxed">
                    Handle unlimited inbound calls around the clock. Answer questions, book appointments, and manage
                    cancellations even after hours.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base lg:text-xl mb-2">Website Chat Widget</h3>
                  <p className="text-slate-600 text-sm lg:text-base leading-relaxed">
                    Engage visitors the moment they land on your site. Provide instant answers about services, pricing,
                    and stylist availability in real-time.
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
                  <h3 className="font-bold text-slate-900 text-base lg:text-xl mb-2">Smart Scheduling</h3>
                  <p className="text-slate-600 text-sm lg:text-base leading-relaxed">
                    Automatically identify customer preferences, capture service requests, and preferred stylists before
                    your team gets involved.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base lg:text-xl mb-2">Instant Booking</h3>
                  <p className="text-slate-600 text-sm lg:text-base leading-relaxed">
                    Schedule haircuts, treatments, and consultations automatically. Sync with your calendar and
                    send confirmations instantly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp Section */}
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

                <div className="space-y-4 lg:space-y-6">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base lg:text-xl mb-2">Book Appointments</h3>
                    <p className="text-slate-600 text-sm lg:text-base leading-relaxed">
                      Book appointments, answer questions, and manage rescheduling automatically.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-base lg:text-xl mb-2">Client Information</h3>
                    <p className="text-slate-600 text-sm lg:text-base leading-relaxed">
                      Capture complete customer information including service preferences, stylist requests, and special
                      requirements automatically.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-base lg:text-xl mb-2">Brand Consistency</h3>
                    <p className="text-slate-600 text-sm lg:text-base leading-relaxed">
                      Deliver consistent, on-brand responses that enhance your salon's reputation. Customers feel valued
                      and heard—even at 3 AM.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`transition-all duration-700 ease-out delay-100 lg:order-first ${
                  whatsappInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                }`}
              >
                <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-slate-200/80 max-w-md mx-auto">
                  <div className="space-y-4">
                    {/* Customer message */}
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center text-white text-sm font-semibold">
                        S
                      </div>
                      <div className="flex-1">
                        <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-slate-200/80">
                          <p className="text-slate-700 text-sm leading-relaxed">
                            Hi, I'd like to book a haircut for tomorrow afternoon
                          </p>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 ml-1">2:14 PM</p>
                      </div>
                    </div>

                    {/* AI Response */}
                    <div className="flex gap-3 justify-end">
                      <div className="flex-1">
                        <div className="bg-gradient-to-br from-slate-700 to-slate-600 rounded-2xl rounded-tr-sm px-4 py-3 shadow-lg ml-auto max-w-[85%]">
                          <p className="text-white text-sm leading-relaxed">
                            Hi Sarah! I'd be happy to book you in. 💇‍♀️ We have availability at 2pm, 3:30pm, or 5pm tomorrow. Which works best for you?
                          </p>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 mr-1 text-right">2:14 PM</p>
                      </div>
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      </div>
                    </div>

                    {/* Customer response */}
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center text-white text-sm font-semibold">
                        S
                      </div>
                      <div className="flex-1">
                        <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-slate-200/80">
                          <p className="text-slate-700 text-sm leading-relaxed">
                            3:30pm works perfect! Can I get Emma?
                          </p>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 ml-1">2:15 PM</p>
                      </div>
                    </div>

                    {/* AI confirmation */}
                    <div className="flex gap-3 justify-end">
                      <div className="flex-1">
                        <div className="bg-gradient-to-br from-slate-700 to-slate-600 rounded-2xl rounded-tr-sm px-4 py-3 shadow-lg ml-auto max-w-[85%]">
                          <p className="text-white text-sm leading-relaxed">
                            Perfect! Booked you with Emma tomorrow at 3:30pm for a haircut (€45). You'll receive a confirmation text. See you then! ✨
                          </p>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 mr-1 text-right">2:15 PM</p>
                      </div>
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Voice Calls Section */}
          <div ref={voiceSectionRef} className="mt-6 lg:mt-24 pt-6 lg:pt-24 border-t border-slate-200">
            <div className="grid lg:grid-cols-2 gap-4 lg:gap-16 items-center max-w-6xl mx-auto">
              <div
                className={`transition-all duration-700 ease-out delay-100 ${
                  voiceInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                }`}
              >
                <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-slate-200/80 max-w-md mx-auto">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900">Incoming Call</h3>
                      <p className="text-sm text-slate-600">New Customer</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-mono text-slate-600">00:47</span>
                    </div>
                  </div>

                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="text-slate-500 mb-1">Customer:</p>
                      <p className="text-slate-800">"Hi, do you have any appointments available this week?"</p>
                    </div>

                    <div>
                      <p className="text-slate-500 mb-1">Clutch AI:</p>
                      <p className="text-slate-800">"Yes! We have availability Wednesday at 2pm, Thursday at 11am, or Friday at 4pm. Which day works best?"</p>
                    </div>

                    <div>
                      <p className="text-slate-500 mb-1">Customer:</p>
                      <p className="text-slate-800">"Thursday at 11 sounds great. How much for a cut and color?"</p>
                    </div>

                    <div>
                      <p className="text-slate-500 mb-1">Clutch AI:</p>
                      <p className="text-slate-800">"Perfect! Cut and color is €85. I'll book you in for Thursday at 11am. Can I get your name and number for confirmation?"</p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`transition-all duration-700 ease-out ${
                  voiceInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-slate-100 to-slate-50 border border-slate-200/80 mb-4">
                  <svg className="w-4 h-4 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                  <span className="text-slate-700 font-semibold text-sm uppercase tracking-wide">Voice Calls</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 text-balance">
                  <span className="text-slate-900">Answer every call</span>{" "}
                  <span className="bg-gradient-to-r from-slate-600 to-slate-400 bg-clip-text text-transparent">
                    with AI
                  </span>
                </h2>

                <div className="space-y-4 lg:space-y-6">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base lg:text-xl mb-2">Natural Conversations</h3>
                    <p className="text-slate-600 text-sm lg:text-base leading-relaxed">
                      Book appointments, answer questions, and provide service information automatically.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-base lg:text-xl mb-2">Real-Time Insights</h3>
                    <p className="text-slate-600 text-sm lg:text-base leading-relaxed">
                      Get real-time insights on every call including customer preferences, service requests, and
                      booking details. Know exactly what clients want before you call back.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-base lg:text-xl mb-2">Never Miss Revenue</h3>
                    <p className="text-slate-600 text-sm lg:text-base leading-relaxed">
                      Every missed call is a missed booking. Clutch By Cliste ensures every caller gets immediate attention,
                      books appointments, and receives pricing information—converting more inquiries into revenue.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Smart Filtering Section */}
          <div ref={smartFilteringSectionRef} className="mt-6 lg:mt-24 pt-6 lg:pt-24 border-t border-slate-200">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-slate-100 to-slate-50 border border-slate-200/80 mb-6">
                <span className="text-slate-700 font-semibold text-sm uppercase tracking-wide">Smart Filtering</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance">
                <span className="text-slate-900">Focus on your craft,</span>{" "}
                <span className="bg-gradient-to-r from-slate-600 to-slate-400 bg-clip-text text-transparent">
                  not your phone
                </span>
              </h2>

              <p className="text-slate-600 text-lg mb-12 leading-relaxed">
                Stop answering the same questions repeatedly. Clutch By Cliste handles common inquiries about
                pricing, availability, and services—so you can focus on what you do best.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-xl border border-slate-200/80 shadow-sm">
                  <h3 className="font-bold text-slate-900 text-lg mb-2">Instant Answers</h3>
                  <p className="text-slate-600 text-sm">
                    Responds to 50+ common questions about pricing, services, and availability instantly.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-xl border border-slate-200/80 shadow-sm">
                  <h3 className="font-bold text-slate-900 text-lg mb-2">Qualify Clients</h3>
                  <p className="text-slate-600 text-sm">
                    Automatically filters serious bookings from casual inquiries by asking the right questions.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-xl border border-slate-200/80 shadow-sm">
                  <h3 className="font-bold text-slate-900 text-lg mb-2">Save Time</h3>
                  <p className="text-slate-600 text-sm">
                    Stop repeating yourself. Let Clutch By Cliste handle routine questions while you style.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-xl border border-slate-200/80 shadow-sm">
                  <h3 className="font-bold text-slate-900 text-lg mb-2">24/7 Availability</h3>
                  <p className="text-slate-600 text-sm">
                    Never miss a booking opportunity while filtering out time-wasters around the clock.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

