"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"

const REVIEWS = [
  {
    name: "Dan Kochmer",
    text: "We first met Mai about 7 years ago when we were buying our first house. She helped us with our first mortgage. About a year ago, we decided to refinance. She was able to get us an excellent rate and the process was quick.",
    rating: 5,
    date: "December 2024",
  },
  {
    name: "Marjolie Thegenus",
    text: "Mai was very helpful throughout the entire loan application process! She was always available to answer any questions that I had and provided great support. Mai made the experience less stressful.",
    rating: 5,
    date: "December 2024",
  },
  {
    name: "Pankaj Joshi",
    text: "Outstanding experience! The team went above and beyond to ensure a smooth closing. Professional, knowledgeable, and always available. Highly recommend to anyone looking for mortgage services.",
    rating: 5,
    date: "November 2024",
  },
  {
    name: "Heather Marsteller",
    text: "Mai is AMAZING! She made our dream of owning a home come true. Very patient with us and always quick to respond. The process was seamless from start to finish. Thank you Mai!",
    rating: 5,
    date: "October 2024",
  },
]

export function Testimonials() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((c) => (c + 1) % REVIEWS.length)
  const prev = () => setCurrent((c) => (c - 1 + REVIEWS.length) % REVIEWS.length)

  return (
    <section className="py-24 bg-gradient-navy dark:bg-navy-900">
      <div className="container-xl section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-gold-400 font-semibold text-sm tracking-wider uppercase">Client Stories</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
            What Our <span className="text-gold-400">Clients Say</span>
          </h2>
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            ))}
            <span className="text-white/70 ml-2">4.9 average rating</span>
          </div>
        </motion.div>

        {/* Carousel */}
        <div className="max-w-3xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 sm:p-10"
            >
              <Quote className="w-10 h-10 text-gold-500/30 mb-4" />
              <p className="text-lg text-white/90 leading-relaxed mb-6">
                &ldquo;{REVIEWS[current].text}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">{REVIEWS[current].name}</p>
                  <p className="text-sm text-white/50">{REVIEWS[current].date}</p>
                </div>
                <div className="flex">
                  {[...Array(REVIEWS[current].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? "bg-gold-500 w-8" : "bg-white/30 hover:bg-white/50"}`}
                />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
