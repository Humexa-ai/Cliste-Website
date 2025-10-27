"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Aurora from "@/components/Aurora"
import { useSignIn } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

export default function SignIn() {
  const { isLoaded, signIn, setActive } = useSignIn()
  const [email, setEmail] = useState("")
  const [step, setStep] = useState<"email" | "code" | "success">("email")
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const codeInputRefs = useRef<(HTMLInputElement | null)[]>([])
  const router = useRouter()

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLoaded) return

    try {
      // Start the sign-in process using the email method
      const result = await signIn.create({
        identifier: email,
      })

      // Send the user an email with the code
      await signIn.prepareFirstFactor({
        strategy: "email_code",
        emailAddressId: signIn.supportedFirstFactors.find(
          (factor: any) => factor.strategy === "email_code"
        )?.emailAddressId,
      })

      setStep("code")
    } catch (err: any) {
      // If account doesn't exist, create it (sign up flow)
      if (err.errors[0]?.code === "form_identifier_not_found") {
        try {
          const { signUp } = await import("@clerk/nextjs")
          // This will be handled by Clerk's sign-up flow
          // For now, show an alert
          alert("Account not found. Please use Google sign-in or contact support to create an account.")
        } catch (signUpErr) {
          console.error("Sign up error:", signUpErr)
        }
      } else {
        console.error("Error:", err.errors[0]?.longMessage || err.message)
        alert(err.errors[0]?.longMessage || "An error occurred. Please try again.")
      }
    }
  }

  const handleGoogleSignIn = async () => {
    if (!isLoaded) return

    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      })
    } catch (err: any) {
      console.error("Error:", err.errors[0].longMessage)
    }
  }

  // Focus first input when code screen appears
  useEffect(() => {
    if (step === "code") {
      setTimeout(() => {
        codeInputRefs.current[0]?.focus()
      }, 500)
    }
  }, [step])

  const handleCodeChange = async (index: number, value: string) => {
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
          try {
            const completeCode = newCode.join("")
            const result = await signIn?.attemptFirstFactor({
              strategy: "email_code",
              code: completeCode,
            })

            if (result?.status === "complete") {
              await setActive({ session: result.createdSessionId })
              setStep("success")
              setTimeout(() => {
                router.push("/")
              }, 2000)
            }
          } catch (err: any) {
            console.error("Error:", err.errors[0].longMessage)
          }
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

  return (
    <div className="flex w-full flex-col min-h-screen bg-black relative overflow-hidden">
      {/* Aurora Background */}
      <div className="fixed inset-0 w-full h-full">
        <Aurora
          colorStops={["#475569", "#64748b", "#475569"]}
          amplitude={1.2}
          blend={0.6}
          speed={0.8}
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4">
        <div className="w-full max-w-sm">
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
    </div>
  )
}
