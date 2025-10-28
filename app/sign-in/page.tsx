"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import Aurora from "@/components/Aurora"
import { Footer } from "@/components/footer"
import { Menu, X, ArrowRight } from "lucide-react"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [step, setStep] = useState<"email" | "code" | "success">("email")
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [isNavVisible, setIsNavVisible] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const codeInputRefs = useRef<(HTMLInputElement | null)[]>([])
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  // Navbar scroll behavior
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY < 10) {
        setIsNavVisible(true)
        lastScrollY.current = currentScrollY
        return
      }

      if (currentScrollY > lastScrollY.current + 5) {
        setIsNavVisible(false)
      } else if (currentScrollY < lastScrollY.current - 5) {
        setIsNavVisible(true)
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

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setStep("code")
    }
  }

  const handleGoogleSignIn = () => {
    // UI only - no actual authentication
    console.log("Google sign-in clicked (UI demo only)")
  }

  // Focus first input when code screen appears
  useEffect(() => {
    if (step === "code") {
      setTimeout(() => {
        codeInputRefs.current[0]?.focus()
      }, 500)
    }
  }, [step])

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code]
      newCode[index] = value
      setCode(newCode)

      // Focus next input if value is entered
      if (value && index < 5) {
        codeInputRefs.current[index + 1]?.focus()
      }

      // Check if code is complete
      if (index === 5 && value) {
        const isComplete = newCode.every((digit) => digit.length === 1)
        if (isComplete) {
          setStep("success")
          // UI only - no actual authentication or redirect
        }
      }
    }
  }

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      codeInputRefs.current[index - 1]?.focus()
    }
  }

  const handleBackClick = () => {
    setStep("email")
    setCode(["", "", "", "", "", ""])
  }

  const navigation = [
    { name: "Dentists", href: "/#features" },
    { name: "Barbers & Salons", href: "/#ai-team" },
    { name: "Restaurants", href: "/#testimonials" },
    { name: "Car Dealerships", href: "/car-dealerships" },
  ]

  return (
    <div className="flex w-full flex-col min-h-screen bg-black relative">
      {/* Aurora Background */}
      <div className="fixed inset-0 w-full h-full">
        <Aurora
          colorStops={["#475569", "#64748b", "#475569"]}
          amplitude={1.2}
          blend={0.6}
          speed={0.8}
        />
      </div>

      {/* Navbar */}
      <nav
        className={`fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-out ${
          isNavVisible ? "translate-y-0 opacity-100" : "-translate-y-[200%] opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-[90vw] max-w-xs md:max-w-4xl mx-auto">
          <div className={`border border-white/20 rounded-full px-4 py-3 md:px-6 md:py-2 transition-all duration-300 ${
            isMobileMenuOpen ? "bg-transparent" : "bg-white/10 backdrop-blur-md"
          }`}>
            <div className="flex items-center justify-between">
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

              <div className="hidden md:flex items-center space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-white/80 hover:text-white hover:scale-105 transition-all duration-200 font-medium cursor-pointer"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="hidden md:block">
                <Link href="/">
                  <button className="relative bg-white hover:bg-gray-50 text-black font-medium px-6 py-2 rounded-full flex items-center transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group">
                    <span className="mr-2">Return Home</span>
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </Link>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-white hover:scale-110 transition-transform duration-200 cursor-pointer"
              >
                <div className="relative w-6 h-6">
                  <Menu
                    size={24}
                    className={`absolute inset-0 transition-all duration-300 ${
                      isMobileMenuOpen ? "opacity-0 rotate-180 scale-75" : "opacity-100 rotate-0 scale-100"
                    }`}
                  />
                  <X
                    size={24}
                    className={`absolute inset-0 transition-all duration-300 ${
                      isMobileMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-180 scale-75"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
        
        <div className="md:hidden relative">
          {/* Menu container */}
          <div
            className={`mt-2 w-[90vw] max-w-xs mx-auto transition-all duration-500 ease-out transform-gpu ${
              isMobileMenuOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-8 scale-95 pointer-events-none"
            }`}
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-2xl">
              <div className="flex flex-col space-y-1">
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-white/80 hover:text-white hover:bg-white/10 rounded-lg px-3 py-3 text-left transition-all duration-300 font-medium cursor-pointer transform hover:scale-[1.02] hover:translate-x-1 ${
                      isMobileMenuOpen ? "animate-mobile-menu-item" : ""
                    }`}
                    style={{
                      animationDelay: isMobileMenuOpen ? `${index * 80 + 100}ms` : "0ms",
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="h-px bg-white/10 my-2" />
                <Link href="/" className="w-full">
                  <button
                    className={`relative bg-white hover:bg-gray-50 text-black font-medium px-6 py-3 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group transform w-full ${
                      isMobileMenuOpen ? "animate-mobile-menu-item" : ""
                    }`}
                    style={{
                      animationDelay: isMobileMenuOpen ? `${navigation.length * 80 + 150}ms` : "0ms",
                    }}
                  >
                    <span className="mr-2">Return Home</span>
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-32 md:py-24">
        <div className="w-full max-w-xs md:max-w-sm my-8 md:my-0">
          <AnimatePresence mode="wait">
            {step === "email" ? (
              <motion.div
                key="email-step"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-6 text-center"
              >
                <div className="space-y-2">
                  <h1 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight text-white">
                    Welcome Back
                  </h1>
                  <p className="text-xl sm:text-2xl text-white/70 font-light">
                    Sign in to continue
                  </p>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={handleGoogleSignIn}
                    className="backdrop-blur-sm w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full py-3 px-4 transition-colors"
                  >
                    <span className="text-lg">G</span>
                    <span>Sign in with Google</span>
                  </button>

                  <div className="flex items-center gap-4">
                    <div className="h-px bg-white/10 flex-1" />
                    <span className="text-white/40 text-sm">or</span>
                    <div className="h-px bg-white/10 flex-1" />
                  </div>

                  <form onSubmit={handleEmailSubmit}>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full backdrop-blur-sm bg-white/5 text-white border border-white/10 rounded-full py-3 px-4 focus:outline-none focus:border-white/30 text-center placeholder:text-white/40"
                        required
                      />
                      <button
                        type="submit"
                        className="absolute right-1.5 top-1.5 text-white w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors group overflow-hidden"
                      >
                        <span className="relative w-full h-full block overflow-hidden">
                          <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-full">
                            →
                          </span>
                          <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 -translate-x-full group-hover:translate-x-0">
                            →
                          </span>
                        </span>
                      </button>
                    </div>
                  </form>
                </div>

                <p className="text-xs text-white/40 pt-10">
                  By signing in, you agree to our{" "}
                  <Link
                    href="#"
                    className="underline text-white/40 hover:text-white/60 transition-colors"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="#"
                    className="underline text-white/40 hover:text-white/60 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </motion.div>
            ) : step === "code" ? (
              <motion.div
                key="code-step"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-6 text-center"
              >
                <div className="space-y-2">
                  <h1 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight text-white">
                    We sent you a code
                  </h1>
                  <p className="text-lg sm:text-xl text-white/50 font-light">
                    Please enter it
                  </p>
                </div>

                <div className="w-full">
                  <div className="relative rounded-full py-4 px-5 border border-white/10 bg-white/5 backdrop-blur-sm">
                    <div className="flex items-center justify-center">
                      {code.map((digit, i) => (
                        <div key={i} className="flex items-center">
                          <div className="relative">
                            <input
                              ref={(el) => {
                                codeInputRefs.current[i] = el
                              }}
                              type="text"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              maxLength={1}
                              value={digit}
                              onChange={(e) =>
                                handleCodeChange(i, e.target.value)
                              }
                              onKeyDown={(e) => handleKeyDown(i, e)}
                              className="w-8 text-center text-xl bg-transparent text-white border-none focus:outline-none focus:ring-0 appearance-none"
                              style={{ caretColor: "transparent" }}
                            />
                            {!digit && (
                              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
                                <span className="text-xl text-white/30">0</span>
                              </div>
                            )}
                          </div>
                          {i < 5 && (
                            <span className="text-white/20 text-xl">|</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex w-full gap-3">
                  <motion.button
                    onClick={handleBackClick}
                    className="rounded-full bg-white/10 border border-white/20 text-white font-medium px-8 py-3 hover:bg-white/20 transition-colors w-[30%] backdrop-blur-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    Back
                  </motion.button>
                  <motion.button
                    className={`flex-1 rounded-full font-medium py-3 border transition-all duration-300 backdrop-blur-sm ${
                      code.every((d) => d !== "")
                        ? "bg-white text-black border-transparent hover:bg-white/90 cursor-pointer"
                        : "bg-white/5 text-white/50 border-white/10 cursor-not-allowed"
                    }`}
                    disabled={!code.every((d) => d !== "")}
                  >
                    Continue
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success-step"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-6 text-center"
              >
                <div className="space-y-2">
                  <h1 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight text-white">
                    You're in!
                  </h1>
                  <p className="text-lg sm:text-xl text-white/50 font-light">
                    Redirecting...
                  </p>
                </div>

                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="py-10"
                >
                  <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-white to-white/70 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-black"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  )
}
