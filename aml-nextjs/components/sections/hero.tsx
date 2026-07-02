"use client"

import { motion } from "framer-motion"
import { ArrowRight, Phone, Calendar, Check, Star } from "lucide-react"

const STATES = ["PA", "NJ", "DE", "MD", "FL", "TX", "NY", "VA", "NC", "SC", "GA", "TN", "+ More"]

const STATS = [
  { value: "10+", label: "Years Experience" },
  { value: "500+", label: "Loans Funded" },
  { value: "$100M+", label: "Total Volume" },
]

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-cream via-white to-navy-50 dark:from-navy-950 dark:via-navy-900 dark:to-navy-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-gold-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-navy-400/5 rounded-full blur-3xl" />

      <div className="container-xl section-padding relative z-10 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/10 border border-gold-500/20 rounded-full text-sm font-medium text-gold-600 dark:text-gold-400">
                CO-NMLS #1910591 | Licensed in PA, NJ, DE, MD, FL, TX & More
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-navy-900 dark:text-white leading-[1.1]"
            >
              Your Journey to{" "}
              <span className="text-gradient-gold">Homeownership</span>{" "}
              Starts Here
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-navy-600 dark:text-navy-300 max-w-xl leading-relaxed"
            >
              Absolute Mortgage & Lending provides premium mortgage solutions tailored to your unique financial goals. Experience the difference of personalized service with AML Funding.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="https://prod.lendingpad.com/aml-funding-llc/pos#/?loid=ec869ca1-8887-4a66-a44e-67b05cdd9bca"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-lg px-8 py-4"
              >
                Get Pre-Approved
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="https://link.theradcrm.com/widget/booking/IMM4hHx1gyfTUveXoiiU"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-lg px-8 py-4"
              >
                <Calendar className="w-5 h-5" />
                Schedule a Call
              </a>
            </motion.div>

            {/* States */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-sm text-navy-500 dark:text-navy-400 mb-3 font-medium">Licensed to Serve You In:</p>
              <div className="flex flex-wrap gap-2">
                {STATES.map((state) => (
                  <span
                    key={state}
                    className="px-3 py-1 bg-white dark:bg-navy-800 border border-navy-100 dark:border-navy-700 rounded-md text-xs font-semibold text-navy-600 dark:text-navy-300 shadow-sm"
                  >
                    {state}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="glass-card rounded-2xl p-8 space-y-6 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gold-500 rounded-xl flex items-center justify-center">
                  <span className="font-display font-bold text-white text-2xl">AML</span>
                </div>
                <div>
                  <p className="font-display font-semibold text-navy-800 dark:text-white text-lg">Absolute Mortgage</p>
                  <p className="text-sm text-navy-500 dark:text-navy-400">& Lending</p>
                </div>
              </div>

              <div className="space-y-3">
                {["Fast Pre-Approval", "Competitive Rates", "Personalized Service", "Bilingual Support"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-navy-700 dark:text-navy-200 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <hr className="border-navy-100 dark:border-navy-700" />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-navy-500 dark:text-navy-400">Call us today</p>
                  <a href="tel:814-386-7005" className="text-xl font-bold text-gold-500 hover:text-gold-600 transition-colors">
                    (814) 386-7005
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-navy-800 rounded-xl px-4 py-3">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="text-white font-bold">4.9</span>
                <span className="text-navy-300 text-sm">Google Rating</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-2xl"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl sm:text-4xl font-bold text-navy-900 dark:text-white">{stat.value}</p>
              <p className="text-sm text-navy-500 dark:text-navy-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
