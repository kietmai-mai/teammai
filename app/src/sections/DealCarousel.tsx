"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { ChevronLeft, ChevronRight, MapPin, Calendar, DollarSign, CheckCircle } from "lucide-react"

const DEALS = [
  { img: "/deal1.jpg", title: "First-Time Homebuyer", location: "Philadelphia, PA", date: "March 2025", amount: "$425,000", type: "Conventional", summary: "Beautifully renovated rowhome funded for a first-time homebuyer with a conventional loan." },
  { img: "/deal2.jpg", title: "Cash-Out Refinance", location: "Philadelphia, PA", date: "February 2025", amount: "$380,000", type: "Cash-Out Refi", summary: "No tax return program - helped client access equity from their primary residence." },
  { img: "/deal3.jpg", title: "First Home Purchase", location: "Delaware County, PA", date: "February 2025", amount: "$350,000", type: "Conventional", summary: "5-star review from a happy first-time homeowner who closed in under 30 days!" },
  { img: "/deal4.jpg", title: "Fast Close", location: "Montgomery County, PA", date: "February 2025", amount: "$520,000", type: "Conventional", summary: "Saved the transaction - client almost lost EMD. Clear to close in 13 days!" },
  { img: "/deal5.jpg", title: "First-Time Homebuyer", location: "Philadelphia, PA 19122", date: "January 2025", amount: "$295,000", type: "FHA", summary: "Modern townhouse closed and funded for a young professional using FHA financing." },
  { img: "/deal6.jpg", title: "VA Loan", location: "Bucks County, PA", date: "January 2025", amount: "$485,000", type: "VA", summary: "Helped a veteran family achieve their homeownership dream with zero down payment." },
  { img: "/deal7.jpg", title: "Investment Property", location: "Philadelphia, PA", date: "December 2024", amount: "$620,000", type: "DSCR", summary: "DSCR loan for investor - qualified based on rental income, not personal income." },
  { img: "/deal8.jpg", title: "Refinance Success", location: "Chester County, PA", date: "December 2024", amount: "$410,000", type: "Conventional", summary: "Rate and term refinance saving client $400/month on their mortgage payment." },
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

export function DealCarousel() {
  const [current, setCurrent] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(2)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [animKey, setAnimKey] = useState(0)

  const maxIndex = Math.max(0, DEALS.length - itemsPerPage)

  // Preload ALL deal images on mount
  const imageSrcs = DEALS.map((d) => d.img)
  const loadedImages = usePreloadImages(imageSrcs)
  const allLoaded = loadedImages.size >= imageSrcs.length

  // Responsive items per page
  useEffect(() => {
    const update = () => setItemsPerPage(window.innerWidth < 768 ? 1 : 2)
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const next = useCallback(() => {
    setCurrent((c) => (c >= maxIndex ? 0 : c + 1))
    setAnimKey((k) => k + 1)
  }, [maxIndex])

  const prev = () => {
    setCurrent((c) => (c <= 0 ? maxIndex : c - 1))
    setAnimKey((k) => k + 1)
  }

  const goTo = (i: number) => {
    setCurrent(Math.min(i, maxIndex))
    setAnimKey((k) => k + 1)
  }

  // Auto-advance only after all images loaded
  useEffect(() => {
    if (isPaused || !allLoaded) return
    timerRef.current = setInterval(next, AUTOPLAY_INTERVAL)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [isPaused, next, allLoaded])

  const visibleDeals = DEALS.slice(current, current + itemsPerPage)

  return (
    <section id="deals" className="py-16 lg:py-20 bg-cream dark:bg-navy-900">
      <div className="container-xl section-padding">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-gold-500 font-semibold text-sm tracking-wider uppercase">Proven Track Record</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy-900 dark:text-white mt-3 mb-4">
            Recent <span className="text-gradient-gold">Deals</span>
          </h2>
          <p className="text-navy-600 dark:text-navy-400">Real results for real clients across the Philadelphia metro area and beyond.</p>
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
              <span className="text-sm text-navy-500 dark:text-navy-400">Loading deals...</span>
            </div>
          )}

          {allLoaded && (
            <>
              <div className="grid md:grid-cols-2 gap-6">
                {visibleDeals.map((deal, i) => (
                  <div
                    key={`${animKey}-${i}`}
                    className="bg-white dark:bg-navy-800 rounded-2xl overflow-hidden border border-navy-100 dark:border-navy-700 hover:shadow-xl transition-all duration-500 animate-crossfade"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <div className="relative bg-navy-100 dark:bg-navy-900">
                      <div className="aspect-square w-full">
                        <img
                          src={deal.img}
                          alt={deal.title}
                          className="w-full h-full object-contain"
                          decoding="sync"
                        />
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-gold-500 text-white text-xs font-bold rounded-full">{deal.type}</span>
                        <span className="flex items-center gap-1 px-2 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
                          <CheckCircle className="w-3 h-3" /> Funded
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-bold text-navy-800 dark:text-white mb-2">{deal.title}</h3>
                      <p className="text-navy-600 dark:text-navy-300 text-sm mb-4 leading-relaxed">{deal.summary}</p>
                      <div className="flex items-center justify-between text-sm text-navy-500 dark:text-navy-400">
                        <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{deal.location}</div>
                        <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{deal.date}</div>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-gold-500" />
                        <span className="font-display text-xl font-bold text-navy-800 dark:text-white">{deal.amount}</span>
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
                  {DEALS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        i >= current && i < current + itemsPerPage ? "bg-gold-500 w-8" : "bg-navy-300 dark:bg-navy-600 w-2.5 hover:bg-navy-400"
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
      </div>
    </section>
  )
}
