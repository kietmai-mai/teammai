"use client"

import { useRef, useEffect, useState } from "react"
import { TrendingUp, TrendingDown, Minus, AlertTriangle, ExternalLink, RefreshCw, Loader2 } from "lucide-react"
import { DEFAULT_RATES, fetchMarketRates, type MarketRate } from "@/lib/rates"

/* ─── Desktop table row ─── */
function RateRow({ rate }: { rate: MarketRate }) {
  const isUp = rate.change > 0
  const isDown = rate.change < 0
  return (
    <div className="hidden sm:grid grid-cols-12 gap-2 py-4 px-4 items-center hover:bg-gold-500/5 transition-colors rounded-lg">
      <div className="col-span-2">
        <span className="font-semibold text-navy-800 dark:text-white text-sm">{rate.product}</span>
      </div>
      <div className="col-span-2 text-center">
        <span className="font-display text-2xl font-bold text-navy-900 dark:text-white">{rate.rate.toFixed(2)}%</span>
      </div>
      <div className="col-span-2 text-center">
        <span className={`inline-flex items-center gap-1 text-sm font-medium ${isUp ? "text-red-500" : isDown ? "text-emerald-500" : "text-navy-400 dark:text-navy-500"}`}>
          {isUp ? <TrendingUp className="w-4 h-4" /> : isDown ? <TrendingDown className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
          {rate.change > 0 ? "+" : ""}{rate.change.toFixed(2)}%
        </span>
      </div>
      <div className="col-span-2 text-center">
        <span className="text-sm text-navy-500 dark:text-navy-400">{rate.weekChange > 0 ? "+" : ""}{rate.weekChange.toFixed(2)}%</span>
      </div>
      <div className="col-span-2 text-center">
        <span className="text-sm text-navy-500 dark:text-navy-400">{rate.monthChange > 0 ? "+" : ""}{rate.monthChange.toFixed(2)}%</span>
      </div>
      <div className="col-span-2 text-right">
        <div className="flex items-center justify-end gap-2">
          <div className="w-20 h-2 bg-navy-100 dark:bg-navy-700 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-gold-500" style={{ width: `${((rate.rate - rate.low52) / (rate.high52 - rate.low52)) * 100}%` }} />
          </div>
          <span className="text-xs text-navy-400 dark:text-navy-500">{rate.low52.toFixed(2)}%-{rate.high52.toFixed(2)}%</span>
        </div>
      </div>
    </div>
  )
}

/* ─── Mobile card ─── */
function RateCard({ rate }: { rate: MarketRate }) {
  const isUp = rate.change > 0
  const isDown = rate.change < 0
  const pct = ((rate.rate - rate.low52) / (rate.high52 - rate.low52)) * 100

  return (
    <div className="sm:hidden bg-navy-50/50 dark:bg-navy-900/50 rounded-xl p-4 space-y-3">
      {/* Top row: Product + Rate */}
      <div className="flex items-center justify-between">
        <span className="font-semibold text-navy-800 dark:text-white text-sm">{rate.product}</span>
        <span className="font-display text-3xl font-bold text-navy-900 dark:text-white">{rate.rate.toFixed(2)}%</span>
      </div>

      {/* Change + Week + Month row */}
      <div className="flex items-center gap-4 text-xs">
        <span className={`inline-flex items-center gap-1 font-medium ${isUp ? "text-red-500" : isDown ? "text-emerald-500" : "text-navy-400 dark:text-navy-500"}`}>
          {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : isDown ? <TrendingDown className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
          {rate.change > 0 ? "+" : ""}{rate.change.toFixed(2)}%
        </span>
        <span className="text-navy-400 dark:text-navy-500">W: {rate.weekChange > 0 ? "+" : ""}{rate.weekChange.toFixed(2)}%</span>
        <span className="text-navy-400 dark:text-navy-500">M: {rate.monthChange > 0 ? "+" : ""}{rate.monthChange.toFixed(2)}%</span>
      </div>

      {/* 52-week range bar */}
      <div>
        <div className="flex items-center justify-between text-[10px] text-navy-400 dark:text-navy-500 mb-1">
          <span>52W Low</span>
          <span>52W High</span>
        </div>
        <div className="w-full h-2.5 bg-navy-100 dark:bg-navy-700 rounded-full overflow-hidden">
          <div className="h-full rounded-full bg-gold-500 transition-all" style={{ width: `${pct}%` }} />
        </div>
        <div className="flex items-center justify-between text-[10px] text-navy-400 dark:text-navy-500 mt-1">
          <span>{rate.low52.toFixed(2)}%</span>
          <span className="font-medium text-navy-600 dark:text-navy-300">Current: {rate.rate.toFixed(2)}%</span>
          <span>{rate.high52.toFixed(2)}%</span>
        </div>
      </div>
    </div>
  )
}

export function RateSheet() {
  const ref = useRef<HTMLDivElement>(null)
  const [rates, setRates] = useState<MarketRate[]>(DEFAULT_RATES)
  const [lastUpdated, setLastUpdated] = useState("Loading...")
  const [source, setSource] = useState("Freddie Mac PMMS")
  const [isLoading, setIsLoading] = useState(false)

  const loadRates = async (showLoading = true) => {
    if (showLoading) setIsLoading(true)
    try {
      const result = await fetchMarketRates()
      setRates(result.rates)
      setSource(result.source)
      setLastUpdated(new Date(result.lastUpdated).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }))
    } catch {
      setRates(DEFAULT_RATES)
      setLastUpdated(new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadRates(false)
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        e.target.querySelectorAll(".reveal-up").forEach((el, i) => {
          (el as HTMLElement).style.transitionDelay = `${i * 0.05}s`
          el.classList.add("active")
        })
      }
    }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="rates" ref={ref} className="py-16 lg:py-20 bg-cream dark:bg-navy-900">
      <div className="container-xl section-padding">
        <div className="text-center max-w-2xl mx-auto mb-12 reveal-up">
          <span className="text-gold-500 font-semibold text-sm tracking-wider uppercase">Market Intelligence</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy-900 dark:text-white mt-3 mb-4">Weekly <span className="text-gradient-gold">Rate Sheet</span></h2>
          <p className="text-navy-600 dark:text-navy-400">Official weekly mortgage rate survey from Freddie Mac. Rates update every Thursday.</p>
        </div>

        <div className="reveal-up bg-white dark:bg-navy-800 rounded-2xl shadow-xl overflow-hidden border border-navy-100 dark:border-navy-700">
          {/* Desktop header */}
          <div className="hidden sm:block bg-navy-800 dark:bg-navy-950 text-white py-4 px-4">
            <div className="grid grid-cols-12 gap-2 items-center">
              <div className="col-span-2 font-semibold text-sm">Product</div>
              <div className="col-span-2 text-center font-semibold text-sm">Rate</div>
              <div className="col-span-2 text-center font-semibold text-sm">Change</div>
              <div className="col-span-2 text-center font-semibold text-sm">1 Week</div>
              <div className="col-span-2 text-center font-semibold text-sm">1 Month</div>
              <div className="col-span-2 text-right font-semibold text-sm">52W Range</div>
            </div>
          </div>

          {/* Mobile header */}
          <div className="sm:hidden bg-navy-800 dark:bg-navy-950 text-white py-3 px-4 flex items-center justify-between">
            <span className="font-semibold text-sm">Product</span>
            <span className="font-semibold text-sm">Rate</span>
          </div>

          {isLoading ? (
            <div className="py-12 text-center">
              <Loader2 className="w-8 h-8 text-gold-500 animate-spin mx-auto mb-3" />
              <p className="text-navy-600 dark:text-navy-400">Fetching latest rates from Freddie Mac...</p>
            </div>
          ) : (
            <div className="sm:divide-y sm:divide-navy-50 sm:dark:divide-navy-700/50 p-3 sm:p-0 space-y-3 sm:space-y-0">
              {rates.map((rate) => (
                <div key={rate.product} className="reveal-up">
                  <RateRow rate={rate} />
                  <RateCard rate={rate} />
                </div>
              ))}
            </div>
          )}

          <div className="bg-cream dark:bg-navy-900/50 px-4 py-3 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button onClick={() => loadRates(true)} disabled={isLoading} className="inline-flex items-center gap-1 text-navy-400 dark:text-navy-500 text-sm hover:text-navy-600 dark:hover:text-navy-300 transition-colors disabled:opacity-50">
                <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                <span>Last Updated: {lastUpdated}</span>
              </button>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-navy-400 dark:text-navy-600">Source: {source}</span>
              <a href="https://www.mortgagenewsdaily.com/mortgage-rates" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-gold-500 hover:text-gold-600 text-sm font-medium transition-colors">View Daily Rates<ExternalLink className="w-3 h-3" /></a>
            </div>
          </div>
        </div>

        <div className="mt-8 reveal-up bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-300 dark:border-amber-700/50 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-amber-100 dark:bg-amber-800/30 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">IMPORTANT DISCLAIMER</h4>
              <p className="text-amber-700 dark:text-amber-400/80 text-sm leading-relaxed">
                The rates displayed are <strong>estimates for informational purposes only</strong> based on Freddie Mac&apos;s Primary Mortgage Market Survey. These are national average indices and <strong>not a commitment to lend</strong>. Your actual rate depends on credit profile, loan amount, property type, and other factors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
