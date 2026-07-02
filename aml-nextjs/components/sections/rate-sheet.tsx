"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Minus, AlertTriangle, RefreshCw, ExternalLink } from "lucide-react"
import { DEFAULT_RATES, type MarketRate } from "@/lib/rates"
import { useState, useEffect } from "react"

function RateRow({ rate }: { rate: MarketRate }) {
  const isUp = rate.change > 0
  const isDown = rate.change < 0

  return (
    <div className="grid grid-cols-12 gap-2 py-4 px-4 items-center hover:bg-gold-500/5 transition-colors rounded-lg">
      <div className="col-span-3 sm:col-span-2">
        <span className="font-semibold text-navy-800 dark:text-white text-sm sm:text-base">{rate.product}</span>
      </div>
      <div className="col-span-2 text-center">
        <span className="font-display text-xl sm:text-2xl font-bold text-navy-900 dark:text-white">
          {rate.rate.toFixed(2)}%
        </span>
      </div>
      <div className="col-span-2 text-center">
        <span className={`inline-flex items-center gap-1 text-sm font-medium ${isUp ? "text-red-500" : isDown ? "text-emerald-500" : "text-navy-400 dark:text-navy-500"}`}>
          {isUp ? <TrendingUp className="w-4 h-4" /> : isDown ? <TrendingDown className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
          {rate.change > 0 ? "+" : ""}{rate.change.toFixed(2)}%
        </span>
      </div>
      <div className="hidden sm:block col-span-2 text-center">
        <span className="text-sm text-navy-500 dark:text-navy-400">{rate.weekChange > 0 ? "+" : ""}{rate.weekChange.toFixed(2)}%</span>
      </div>
      <div className="hidden sm:block col-span-2 text-center">
        <span className="text-sm text-navy-500 dark:text-navy-400">{rate.monthChange > 0 ? "+" : ""}{rate.monthChange.toFixed(2)}%</span>
      </div>
      <div className="col-span-5 sm:col-span-2 text-right">
        <div className="flex items-center justify-end gap-2">
          <div className="w-20 h-2 bg-navy-100 dark:bg-navy-700 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gold-500"
              style={{ width: `${((rate.rate - rate.low52) / (rate.high52 - rate.low52)) * 100}%` }}
            />
          </div>
          <span className="text-xs text-navy-400 dark:text-navy-500">{rate.low52.toFixed(2)}%-{rate.high52.toFixed(2)}%</span>
        </div>
      </div>
    </div>
  )
}

export function RateSheet() {
  const [rates, setRates] = useState<MarketRate[]>(DEFAULT_RATES)
  const [lastUpdated, setLastUpdated] = useState("April 30, 2026")
  const [source, setSource] = useState("Freddie Mac PMMS")

  return (
    <section id="rates" className="py-24 bg-cream dark:bg-navy-900">
      <div className="container-xl section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-gold-500 font-semibold text-sm tracking-wider uppercase">Market Intelligence</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy-900 dark:text-white mt-3 mb-4">
            Weekly <span className="text-gradient-gold">Rate Sheet</span>
          </h2>
          <p className="text-navy-600 dark:text-navy-400">
            Official weekly mortgage rate survey from Freddie Mac. Updated every Thursday.
          </p>
        </motion.div>

        {/* Rate Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-navy-800 rounded-2xl shadow-xl overflow-hidden border border-navy-100 dark:border-navy-700"
        >
          {/* Table Header */}
          <div className="bg-navy-800 dark:bg-navy-950 text-white py-4 px-4">
            <div className="grid grid-cols-12 gap-2 items-center">
              <div className="col-span-3 sm:col-span-2 font-semibold text-sm">Product</div>
              <div className="col-span-2 text-center font-semibold text-sm">Rate</div>
              <div className="col-span-2 text-center font-semibold text-sm">Change</div>
              <div className="hidden sm:block col-span-2 text-center font-semibold text-sm">1 Week</div>
              <div className="hidden sm:block col-span-2 text-center font-semibold text-sm">1 Month</div>
              <div className="col-span-5 sm:col-span-2 text-right font-semibold text-sm">52W Range</div>
            </div>
          </div>

          {/* Rate Rows */}
          <div className="divide-y divide-navy-50 dark:divide-navy-700/50">
            {rates.map((rate, index) => (
              <motion.div
                key={rate.product}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <RateRow rate={rate} />
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="bg-cream dark:bg-navy-900/50 px-4 py-3 flex flex-wrap items-center justify-between gap-4">
            <span className="text-navy-400 dark:text-navy-500 text-sm">
              Last Updated: {lastUpdated}
            </span>
            <div className="flex items-center gap-4">
              <span className="text-xs text-navy-400 dark:text-navy-600">Source: {source}</span>
              <a
                href="https://www.mortgagenewsdaily.com/mortgage-rates"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-gold-500 hover:text-gold-600 text-sm font-medium transition-colors"
              >
                View Daily Rates
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-300 dark:border-amber-700/50 rounded-xl p-6"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-amber-100 dark:bg-amber-800/30 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">IMPORTANT DISCLAIMER</h4>
              <p className="text-amber-700 dark:text-amber-400/80 text-sm leading-relaxed">
                The rates displayed are <strong>estimates for informational purposes only</strong> based on Freddie Mac&apos;s Primary Mortgage Market Survey. These are national average indices and <strong>not a commitment to lend</strong>. Your actual rate depends on credit profile, loan amount, property type, and other factors. All rates are vetted during the pre-approval process per applicable regulations.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
