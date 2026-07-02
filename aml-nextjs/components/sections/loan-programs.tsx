"use client"

import { motion } from "framer-motion"
import { Check, ArrowRight, Home, Building, Star, Banknote, FileText, Landmark } from "lucide-react"
import { LOAN_PROGRAMS } from "@/lib/rates"

const ICONS = [Home, Building, Star, Banknote, Landmark, FileText]

export function LoanPrograms() {
  return (
    <section id="programs" className="py-24 bg-white dark:bg-navy-950">
      <div className="container-xl section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-gold-500 font-semibold text-sm tracking-wider uppercase">Loan Solutions</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy-900 dark:text-white mt-3 mb-4">
            Programs for Every <span className="text-gradient-gold">Borrower</span>
          </h2>
          <p className="text-navy-600 dark:text-navy-400">
            From first-time homebuyers to seasoned investors, we have the right loan program for your unique situation.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LOAN_PROGRAMS.map((program, index) => {
            const Icon = ICONS[index] || Home
            return (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-cream dark:bg-navy-900 rounded-2xl p-6 border border-navy-100 dark:border-navy-800 hover:border-gold-500/30 dark:hover:border-gold-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/5"
              >
                {/* Icon & Title */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center group-hover:bg-gold-500/20 transition-colors">
                    <Icon className="w-6 h-6 text-gold-500" />
                  </div>
                  <span className="text-xs font-semibold text-navy-400 dark:text-navy-500 uppercase tracking-wider">
                    {program.subtitle}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-navy-800 dark:text-white mb-2">
                  {program.title}
                </h3>
                <p className="text-navy-600 dark:text-navy-400 text-sm mb-5 leading-relaxed">
                  {program.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {program.features.slice(0, 3).map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-navy-600 dark:text-navy-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={program.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-primary text-sm"
                >
                  {program.cta}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-navy-500 dark:text-navy-400 mb-4">
            Not sure which program is right for you? Let us help.
          </p>
          <a
            href="https://link.theradcrm.com/widget/booking/IMM4hHx1gyfTUveXoiiU"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            Schedule a Free Consultation
          </a>
        </motion.div>
      </div>
    </section>
  )
}
