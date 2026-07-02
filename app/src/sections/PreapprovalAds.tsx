"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const ADS = [
  { img: "/preapproval-ad1.jpg", title: "Pre-Approval Made Easy" },
  { img: "/preapproval-ad2.jpg", title: "Fast Pre-Approval Process" },
  { img: "/preapproval-ad3.jpg", title: "Your Dream Home Awaits" },
  { img: "/preapproval-ad4.jpg", title: "Get Pre-Approved Today" },
  { img: "/preapproval-ad5.jpg", title: "Start Your Journey" },
  { img: "/preapproval-ad6.jpg", title: "Homeownership Within Reach" },
  { img: "/preapproval-ad8.jpg", title: "Expert Mortgage Guidance" },
  { img: "/preapproval-ad9.jpg", title: "Personalized Loan Solutions" },
  { img: "/preapproval-ad10.jpg", title: "Competitive Rates Available" },
]

const AUTOPLAY_INTERVAL = 4000 // 4 seconds

function usePreloadImages(srcs: string[]) {
  const [loaded, setLoaded] = useState<Set<string>>(new Set())
  useEffect(() => {
    srcs.forEach((src) => {
      const img = new Image()
      img.onload = () => setLoaded((prev) => new Set(prev).add(src))
      img.onerror = () => setLoaded((prev) => new Set(prev).add(src))
      img.src = src
    })
  }, [srcs])
  return loaded
}

export function PreapprovalAds() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [animKey, setAnimKey] = useState(0)
  const maxIndex = Math.max(0, ADS.length - 3)

  const imageSrcs = ADS.map((a) => a.img)
  const loadedImages = usePreloadImages(imageSrcs)
  const allLoaded = loadedImages.size >= imageSrcs.length

  const next = useCallback(() => {
    setCurrent((c) => (c >= maxIndex ? 0 : c + 1))
    setAnimKey((k) => k + 1)
  }, [maxIndex])

  const prev = () => {
    setCurrent((c) => (c <= 0 ? maxIndex : c - 1))
    setAnimKey((k) => k + 1)
  }
  const goTo = (i: number) => {
    setCurrent(i)
    setAnimKey((k) => k + 1)
  }

  useEffect(() => {
    if (isPaused || !allLoaded) return
    timerRef.current = setInterval(next, AUTOPLAY_INTERVAL)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [isPaused, next, allLoaded])

  return (
    <section className="py-20 bg-white dark:bg-navy-950">
      <div className="container-xl section-padding">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-gold-500 font-semibold text-sm tracking-wider uppercase">Pre-Approval</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy-900 dark:text-white mt-3 mb-4">
            Get <span className="text-gradient-gold">Pre-Approved</span> Today
          </h2>
          <p className="text-navy-600 dark:text-navy-400">
            Take the first step towards your dream home. Our streamlined pre-approval process gets you ready to make offers with confidence.
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {!allLoaded && (
            <div className="flex items-center justify-center gap-2 py-20">
              <div className="w-6 h-6 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-navy-500 dark:text-navy-400">Loading ads...</span>
            </div>
          )}

          {allLoaded && (
            <>
              <div className="flex gap-4 overflow-hidden">
                {ADS.slice(current, current + 3).map((ad, i) => (
                  <div
                    key={`${animKey}-${i}`}
                    className="flex-1 min-w-0 group animate-crossfade"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <div className="rounded-2xl overflow-hidden border border-navy-100 dark:border-navy-800 hover:shadow-xl transition-all duration-500 bg-white dark:bg-navy-800">
                      <div className="aspect-square w-full">
                        <img
                          src={ad.img}
                          alt={ad.title}
                          className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-500"
                          decoding="sync"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-4 mt-8">
                <button onClick={prev} className="w-10 h-10 rounded-full border border-navy-200 dark:border-navy-700 flex items-center justify-center text-navy-600 dark:text-navy-300 hover:bg-gold-500 hover:text-white hover:border-gold-500 transition-all">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-2">
                  {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        i === current ? "bg-gold-500 w-8" : "bg-navy-300 dark:bg-navy-600 w-2.5 hover:bg-navy-400"
                      }`}
                    />
                  ))}
                </div>
                <button onClick={next} className="w-10 h-10 rounded-full border border-navy-200 dark:border-navy-700 flex items-center justify-center text-navy-600 dark:text-navy-300 hover:bg-gold-500 hover:text-white hover:border-gold-500 transition-all">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </>
          )}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://prod.lendingpad.com/aml-funding-llc/pos#/?loid=ec869ca1-8887-4a66-a44e-67b05cdd9bca"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-lg px-8"
          >
            Start Your Pre-Approval
          </a>
        </div>
      </div>
    </section>
  )
}
