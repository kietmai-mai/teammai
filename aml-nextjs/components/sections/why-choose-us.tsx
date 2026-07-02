"use client"

import { motion } from "framer-motion"
import { Shield, Clock, Users, TrendingUp, Award, Heart } from "lucide-react"

const BENEFITS = [
  {
    icon: Clock,
    title: "Fast Pre-Approvals",
    description: "Get pre-approved in as little as 24 hours. Our streamlined process means you can make offers with confidence.",
  },
  {
    icon: TrendingUp,
    title: "Competitive Rates",
    description: "We shop multiple lenders to find you the best rate and terms. Access wholesale rates not available to the public.",
  },
  {
    icon: Users,
    title: "Bilingual Support",
    description: "Our team speaks English and Vietnamese, ensuring clear communication throughout your home buying journey.",
  },
  {
    icon: Shield,
    title: "Licensed in 15+ States",
    description: "Licensed in PA, NJ, DE, MD, FL, TX and more. Whether you're buying local or across state lines, we've got you covered.",
  },
  {
    icon: Award,
    title: "500+ Loans Funded",
    description: "Over $100 million in total loan volume. Our experience means we know how to handle even the most complex scenarios.",
  },
  {
    icon: Heart,
    title: "Client-First Approach",
    description: "We treat every client like family. Personalized service, transparent communication, and honest advice every step of the way.",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-white dark:bg-navy-950">
      <div className="container-xl section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-gold-500 font-semibold text-sm tracking-wider uppercase">Why AML Funding</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy-900 dark:text-white mt-3 mb-4">
            The AML <span className="text-gradient-gold">Advantage</span>
          </h2>
          <p className="text-navy-600 dark:text-navy-400">
            We combine deep industry expertise with a personal touch to deliver an unmatched mortgage experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BENEFITS.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group text-center"
            >
              <div className="w-16 h-16 bg-gold-500/10 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-gold-500/20 transition-colors">
                <benefit.icon className="w-8 h-8 text-gold-500" />
              </div>
              <h3 className="font-display text-xl font-bold text-navy-800 dark:text-white mb-3">
                {benefit.title}
              </h3>
              <p className="text-navy-600 dark:text-navy-400 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
