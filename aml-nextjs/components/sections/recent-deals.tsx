"use client"

import { motion } from "framer-motion"
import { MapPin, Calendar, DollarSign, CheckCircle, TrendingUp } from "lucide-react"
import { RECENT_DEALS } from "@/lib/rates"
import { formatCurrency } from "@/lib/utils"

export function RecentDeals() {
  return (
    <section id="deals" className="py-24 bg-cream dark:bg-navy-900">
      <div className="container-xl section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-gold-500 font-semibold text-sm tracking-wider uppercase">Proven Track Record</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy-900 dark:text-white mt-3 mb-4">
            Recent <span className="text-gradient-gold">Deals</span>
          </h2>
          <p className="text-navy-600 dark:text-navy-400">
            Real results for real clients across the Philadelphia metro area and beyond.
          </p>
        </motion.div>

        {/* Deals Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RECENT_DEALS.map((deal, index) => (
            <motion.div
              key={deal.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-navy-800 rounded-2xl overflow-hidden border border-navy-100 dark:border-navy-700 hover:shadow-xl hover:shadow-gold-500/5 transition-all duration-300 group"
            >
              {/* Card Header */}
              <div className="p-6 pb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-gold-500/10 text-gold-600 dark:text-gold-400 text-xs font-semibold rounded-full">
                    {deal.type}
                  </span>
                  <div className="flex items-center gap-1 text-emerald-500">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-xs font-semibold">{deal.status}</span>
                  </div>
                </div>

                <h3 className="font-display text-xl font-bold text-navy-800 dark:text-white mb-1">
                  {deal.title}
                </h3>
                <p className="text-sm text-gold-600 dark:text-gold-400 font-medium mb-3">
                  {deal.subtitle}
                </p>
                <p className="text-sm text-navy-500 dark:text-navy-400 leading-relaxed">
                  {deal.description}
                </p>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-navy-50 dark:bg-navy-950/50 border-t border-navy-100 dark:border-navy-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-navy-600 dark:text-navy-300">
                    <MapPin className="w-4 h-4 text-navy-400" />
                    {deal.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-navy-600 dark:text-navy-300">
                    <Calendar className="w-4 h-4 text-navy-400" />
                    {deal.closedDate}
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-gold-500" />
                  <span className="font-display text-xl font-bold text-navy-800 dark:text-white">
                    {formatCurrency(deal.loanAmount)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
