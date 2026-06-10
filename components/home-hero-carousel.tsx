"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { hospital } from "@/lib/site-data"
import { cn } from "@/lib/utils"

type HeroSlide = {
  title: string
  description: string
  image: string
  imageAlt: string
  ctaLabel: string
  ctaHref: string
}

const AUTO_ADVANCE_MS = 7000
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"

const slides: HeroSlide[] = [
  {
    title: "Metro Rosario Medical Specialists Center",
    description:
      "A private Level 1 general hospital on J. Magtibay St. serving Rosario, Batangas with outpatient care, diagnostics, and core specialty services.",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=2000&q=80",
    imageAlt: "Doctor holding a stethoscope in a hospital corridor",
    ctaLabel: "Learn more",
    ctaHref: "#about",
  },
  {
    title: "General Medicine, Pediatrics, OB-Gyne and Surgery",
    description:
      "Plan your visit for general consultations, maternal and child care, surgical assessment, X-ray, ECG, and laboratory testing.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=2000&q=80",
    imageAlt: "Medical team reviewing patient information",
    ctaLabel: "Book appointment",
    ctaHref: "/appointment",
  },
  {
    title: "HMO and PhilHealth Coordination",
    description:
      "Submit your coverage details ahead of your visit. Published provider directories advise patients to proceed to OPD for HMO coordination.",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=2000&q=80",
    imageAlt: "Healthcare professional preparing patient paperwork",
    ctaLabel: "Start HMO approval",
    ctaHref: "/hmo-approval",
  },
]

function usePrefersReducedMotion() {
  return React.useSyncExternalStore(
    (onStoreChange) => {
      const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY)

      mediaQuery.addEventListener("change", onStoreChange)

      return () => {
        mediaQuery.removeEventListener("change", onStoreChange)
      }
    },
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false
  )
}

function HomeHeroCarousel() {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [isFocusWithin, setIsFocusWithin] = React.useState(false)
  const [isPointerInside, setIsPointerInside] = React.useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()
  const carouselRef = React.useRef<HTMLElement>(null)

  const activeSlide = slides[activeIndex]
  const isInteracting = isFocusWithin || isPointerInside
  const isAutoPlayPaused = isInteracting || prefersReducedMotion

  const goToNextSlide = React.useCallback(() => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length)
  }, [])

  const goToPreviousSlide = React.useCallback(() => {
    setActiveIndex(
      (currentIndex) => (currentIndex - 1 + slides.length) % slides.length
    )
  }, [])

  React.useEffect(() => {
    if (isAutoPlayPaused) {
      return
    }

    const intervalId = window.setInterval(() => {
      if (!document.hidden) {
        goToNextSlide()
      }
    }, AUTO_ADVANCE_MS)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [goToNextSlide, isAutoPlayPaused])

  return (
    <section
      ref={carouselRef}
      className="relative min-h-110 overflow-hidden bg-slate-900"
      aria-label="Featured medical services"
      aria-roledescription="carousel"
      onFocusCapture={() => setIsFocusWithin(true)}
      onBlurCapture={(event) => {
        const nextFocusedElement = event.relatedTarget

        if (
          nextFocusedElement instanceof Node &&
          carouselRef.current?.contains(nextFocusedElement)
        ) {
          return
        }

        setIsFocusWithin(false)
      }}
      onMouseEnter={() => setIsPointerInside(true)}
      onMouseLeave={() => setIsPointerInside(false)}
    >
      <div
        className="absolute inset-0"
        aria-live={isAutoPlayPaused ? "polite" : "off"}
      >
        {slides.map((slide, index) => {
          const isActive = index === activeIndex

          return (
            <div
              key={slide.title}
              className={cn(
                "absolute inset-0 transition-opacity duration-700 ease-out",
                isActive ? "opacity-100" : "opacity-0"
              )}
              aria-hidden={!isActive}
            >
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-r from-slate-950/78 via-slate-800/48 to-slate-100/25" />
            </div>
          )
        })}
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon-lg"
        className="absolute top-1/2 left-4 z-20 hidden size-11 -translate-y-1/2 rounded-full border border-white/25 bg-black/10 text-white backdrop-blur-sm hover:bg-white/15 hover:text-white md:grid"
        aria-label="Show previous slide"
        onClick={goToPreviousSlide}
      >
        <ChevronLeft className="size-8" strokeWidth={1.5} />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-lg"
        className="absolute top-1/2 right-4 z-20 hidden size-11 -translate-y-1/2 rounded-full border border-white/25 bg-black/10 text-white backdrop-blur-sm hover:bg-white/15 hover:text-white md:grid"
        aria-label="Show next slide"
        onClick={goToNextSlide}
      >
        <ChevronRight className="size-8" strokeWidth={1.5} />
      </Button>

      <div className="relative z-10 mx-auto flex min-h-110 max-w-7xl items-center px-5 py-20">
        <div className="max-w-2xl text-white">
          <p className="mb-4 text-xs font-bold tracking-[0.2em] text-sky-100 uppercase">
            {hospital.tagline}
          </p>
          <h1 className="text-5xl leading-none font-extrabold md:text-6xl">
            {activeSlide.title}
          </h1>
          <p className="mt-7 max-w-lg text-sm leading-7 font-semibold text-white/90">
            {activeSlide.description}
          </p>
          <Button
            asChild
            variant="link"
            className="mt-7 h-auto p-0 text-sm font-semibold text-white hover:text-white"
          >
            <Link href={activeSlide.ctaHref}>
              {activeSlide.ctaLabel}
              <ChevronRight className="size-4" data-icon="inline-end" />
            </Link>
          </Button>
        </div>
      </div>

      <div
        className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2"
        aria-label="Choose featured slide"
      >
        {slides.map((slide, index) => {
          const isActive = index === activeIndex

          return (
            <button
              key={slide.title}
              type="button"
              aria-current={isActive ? "true" : undefined}
              aria-label={`Show slide ${index + 1}: ${slide.title}`}
              className={cn(
                "h-2 rounded-full transition-all focus-visible:ring-3 focus-visible:ring-white/60 focus-visible:outline-none",
                isActive ? "w-8 bg-blue-500" : "w-2 bg-white/65 hover:bg-white"
              )}
              onClick={() => setActiveIndex(index)}
            />
          )
        })}
      </div>
    </section>
  )
}

export { HomeHeroCarousel }
