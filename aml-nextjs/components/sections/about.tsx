"use client"

import { motion } from "framer-motion"
import { MapPin, Heart, Target } from "lucide-react"

export function About() {
  return (
    <section className="py-24 bg-cream dark:bg-navy-900">
      <div className="container-xl section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gold-500 font-semibold text-sm tracking-wider uppercase">About Us</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy-900 dark:text-white mt-3 mb-6">
              Rooted in <span className="text-gradient-gold">Philadelphia</span>,<br />
              Serving Nationwide
            </h2>
            <div className="space-y-4 text-navy-600 dark:text-navy-300 leading-relaxed">
              <p>
                AML Funding LLC, doing business as Absolute Mortgage & Lending, was founded with a simple mission: make homeownership accessible to everyone. Based in the heart of Philadelphia, we&apos;ve grown from a local brokerage to a trusted name across 15+ states.
              </p>
              <p>
                Our team, led by <strong className="text-navy-800 dark:text-white">Mai Hoang (NMLS #2180679)</strong>, brings over a decade of mortgage expertise and a deep commitment to every client we serve. We specialize in everything from conventional loans to complex non-QM scenarios.
              </p>
              <p>
                Whether you&apos;re a first-time buyer in South Philly, an investor in Center City, or refinancing in the suburbs, we speak your language—literally. Our bilingual team ensures clear communication in English and Vietnamese.
              </p>
            </div>

            <div className="flex flex-wrap gap-6 mt-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold-500/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gold-500" />
                </div>
                <div>
                  <p className="font-semibold text-navy-800 dark:text-white text-sm">Philadelphia, PA</p>
                  <p className="text-xs text-navy-500 dark:text-navy-400">600 Washington Ave</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold-500/10 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-gold-500" />
                </div>
                <div>
                  <p className="font-semibold text-navy-800 dark:text-white text-sm">500+ Families Helped</p>
                  <p className="text-xs text-navy-500 dark:text-navy-400">And counting</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold-500/10 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-gold-500" />
                </div>
                <div>
                  <p className="font-semibold text-navy-800 dark:text-white text-sm">15+ States Licensed</p>
                  <p className="text-xs text-navy-500 dark:text-navy-400">Nationwide coverage</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { value: "$100M+", label: "Total Loan Volume" },
              { value: "500+", label: "Loans Funded" },
              { value: "10+", label: "Years Experience" },
              { value: "4.9★", label: "Google Rating" },
              { value: "21", label: "Avg. Days to Close" },
              { value: "15+", label: "States Licensed" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white dark:bg-navy-800 rounded-2xl p-6 text-center border border-navy-100 dark:border-navy-700"
              >
                <p className="font-display text-3xl font-bold text-gold-500">{stat.value}</p>
                <p className="text-sm text-navy-500 dark:text-navy-400 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
