"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const navigation = [
  { name: "Dentists", href: "#features" },
  { name: "Barbers & Salons", href: "#ai-team" },
  { name: "Restaurants", href: "#testimonials" },
  { name: "Car Dealerships", href: "/car-dealerships" },
]

export function GlassmorphismNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY
      const isMobile = window.innerWidth < 768
      const scrollThreshold = isMobile ? 20 : 5
      
      // Always show when at the top
      if (currentScrollY < 10) {
        if (!isVisible) setIsVisible(true)
        lastScrollY.current = currentScrollY
        ticking.current = false
        return
      }

      // Check scroll direction with larger threshold for mobile
      if (currentScrollY > lastScrollY.current + scrollThreshold) {
        // Scrolling down
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY.current - scrollThreshold) {
        // Scrolling up
        setIsVisible(true)
      }

      lastScrollY.current = currentScrollY
      ticking.current = false
    }

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(controlNavbar)
        ticking.current = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    console.log("[v0] Scrolling to top")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToSection = (href: string) => {
    if (href.startsWith("/")) {
      return
    }

    console.log("[v0] Attempting to scroll to:", href)
    const element = document.querySelector(href)
    if (element) {
      console.log("[v0] Found element:", element)

      const rect = element.getBoundingClientRect()
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop
      const elementAbsoluteTop = rect.top + currentScrollY
      const navbarHeight = 100
      const targetPosition = Math.max(0, elementAbsoluteTop - navbarHeight)

      console.log("[v0] Element rect.top:", rect.top)
      console.log("[v0] Current scroll position:", currentScrollY)
      console.log("[v0] Element absolute top:", elementAbsoluteTop)
      console.log("[v0] Target scroll position:", targetPosition)

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    } else {
      console.log("[v0] Element not found for:", href)
    }
    setIsOpen(false)
  }

  return (
    <>
      {/* Backdrop blur - behind nav, only on mobile when menu open */}
      {isOpen && (
        <div 
          className="fixed inset-0 backdrop-blur-md md:hidden" 
          style={{ zIndex: 45 }}
          onClick={() => setIsOpen(false)}
        />
      )}

      <nav
        className={`fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0 pointer-events-none"
        }`}
      >
        {/* Main Navigation */}
        <div className="w-[90vw] max-w-xs md:max-w-4xl mx-auto relative z-10">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-3 md:px-6 md:py-2">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center hover:scale-105 transition-transform duration-200 cursor-pointer"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                  <Image
                    src="/images/cliste-logo.png"
                    alt="Cliste"
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                  />
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navigation.map((item) =>
                  item.href.startsWith("/") ? (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-white/80 hover:text-white hover:scale-105 transition-all duration-200 font-medium cursor-pointer"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className="text-white/80 hover:text-white hover:scale-105 transition-all duration-200 font-medium cursor-pointer"
                    >
                      {item.name}
                    </button>
                  ),
                )}
              </div>

              {/* Desktop CTA Button */}
              <div className="hidden md:block">
                <Link href="/sign-in">
                  <button className="relative bg-white hover:bg-gray-50 text-black font-medium px-6 py-2 rounded-full flex items-center transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group">
                    <span className="mr-2">Log In</span>
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-white hover:scale-110 transition-transform duration-200 cursor-pointer"
              >
                <div className="relative w-6 h-6">
                  <Menu
                    size={24}
                    className={`absolute inset-0 transition-all duration-300 ${
                      isOpen ? "opacity-0 rotate-180 scale-75" : "opacity-100 rotate-0 scale-100"
                    }`}
                  />
                  <X
                    size={24}
                    className={`absolute inset-0 transition-all duration-300 ${
                      isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-180 scale-75"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="md:hidden relative overflow-hidden z-10">
          {/* Menu container */}
          <div
            className={`mt-2 w-[90vw] max-w-xs mx-auto ${
              isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
            }`}
            style={{
              transition: 'max-height 0.25s ease-out, opacity 0.25s ease-out'
            }}
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-2xl">
              <div className="flex flex-col space-y-1">
                {navigation.map((item, index) =>
                  item.href.startsWith("/") ? (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg px-3 py-3 text-left transition-all duration-200 font-medium cursor-pointer"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg px-3 py-3 text-left transition-all duration-200 font-medium cursor-pointer"
                    >
                      {item.name}
                    </button>
                  ),
                )}
                <div className="h-px bg-white/10 my-2" />
                <Link href="/sign-in" className="w-full">
                  <button className="relative bg-white hover:bg-gray-50 text-black font-medium px-6 py-3 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-pointer group w-full">
                    <span className="mr-2">Log In</span>
                    <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
