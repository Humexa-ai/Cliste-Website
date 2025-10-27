"use client"

import { useEffect } from "react"
import { useClerk } from "@clerk/nextjs"

export default function SSOCallback() {
  const { handleRedirectCallback } = useClerk()

  useEffect(() => {
    handleRedirectCallback()
  }, [handleRedirectCallback])

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p>Completing sign in...</p>
      </div>
    </div>
  )
}

