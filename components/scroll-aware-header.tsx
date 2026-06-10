"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const MIN_SCROLL_DELTA = 2
const TOP_REVEAL_OFFSET = 16

function ScrollAwareHeader({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const [hidden, setHidden] = React.useState(false)
  const lastScrollYRef = React.useRef(0)
  const tickingRef = React.useRef(false)

  React.useEffect(() => {
    function updateHeaderVisibility() {
      const currentScrollY = Math.max(window.scrollY, 0)

      if (currentScrollY <= TOP_REVEAL_OFFSET) {
        setHidden(false)
        lastScrollYRef.current = currentScrollY
        tickingRef.current = false
        return
      }

      const scrollDelta = currentScrollY - lastScrollYRef.current

      if (Math.abs(scrollDelta) >= MIN_SCROLL_DELTA) {
        setHidden(scrollDelta > 0)
        lastScrollYRef.current = currentScrollY
      }

      tickingRef.current = false
    }

    function requestTick() {
      if (tickingRef.current) {
        return
      }

      tickingRef.current = true
      window.requestAnimationFrame(updateHeaderVisibility)
    }

    lastScrollYRef.current = Math.max(window.scrollY, 0)
    window.addEventListener("scroll", requestTick, { passive: true })

    return () => {
      window.removeEventListener("scroll", requestTick)
    }
  }, [])

  return (
    <header
      className={cn("mobile-site-header bg-white", className)}
      data-hidden={hidden ? "true" : "false"}
      onFocusCapture={() => setHidden(false)}
    >
      {children}
    </header>
  )
}

export { ScrollAwareHeader }
