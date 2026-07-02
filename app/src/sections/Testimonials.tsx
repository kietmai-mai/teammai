"use client"

import { useState, useRef, useEffect } from "react"
import { Star, ChevronLeft, ChevronRight, Quote, ExternalLink } from "lucide-react"

const REVIEWS = [
  {
    name: "A Cdhury",
    text: "Mai Hoang was amazing throughout my home loan process. She guided me step by step, answered all my questions, and made everything smooth and stress-free. Thanks to her help, I was able to get my loan approved and buy my house without problems. I highly recommend her to anyone looking for a reliable and professional loan officer.",
    rating: 5,
    date: "3 months ago",
    source: "Google",
  },
  {
    name: "Ngoc Nguyen",
    text: "Mai was very knowledgeable and incredibly helpful throughout my first-time home-buying process. She took the time to explain everything and made the process feel easy and stress-free. I felt supported every step of the way and would highly recommend Mai to anyone looking to kickstart their mortgage.",
    rating: 5,
    date: "3 months ago",
    source: "Google",
  },
  {
    name: "Minh Nhat Tran",
    text: "I had a great experience working with Mai Hoang throughout the home loan process. She was professional, responsive, and always available to answer my questions. Highly recommend her to anyone looking for a trustworthy and helpful loan officer. Thank you for the excellent service!",
    rating: 5,
    date: "5 months ago",
    source: "Google",
  },
  {
    name: "Dan Kochmer",
    text: "We first met Mai about 7 years ago when we were buying our first house. She helped us with our first mortgage. About a year ago, we decided to refinance. She was able to get us an excellent rate and the process was quick. We highly recommend Mai for any mortgage needs!",
    rating: 5,
    date: "December 2024",
    source: "Google",
  },
  {
    name: "Marjolie Thegenus",
    text: "Mai was very helpful throughout the entire loan application process! She was always available to answer any questions that I had and provided great support. Mai made the experience less stressful. I would definitely recommend her services to anyone looking for a mortgage.",
    rating: 5,
    date: "December 2024",
    source: "Google",
  },
  {
    name: "Heather Marsteller",
    text: "Mai is AMAZING! She made our dream of owning a home come true. Very patient with us and always quick to respond. The process was seamless from start to finish. Thank you Mai for everything you did for our family!",
    rating: 5,
    date: "October 2024",
    source: "Google",
  },
]

export function Testimonials() {
  const [current, setCurrent] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) e.target.querySelector(".reveal-up")?.classList.add("active") }, { threshold: 0.2 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const next = () => setCurrent((c) => (c + 1) % REVIEWS.length)
  const prev = () => setCurrent((c) => (c - 1 + REVIEWS.length) % REVIEWS.length)

  return (
    <section ref={ref} className="py-16 lg:py-20 bg-gradient-navy">
      <div className="container-xl section-padding">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal-up">
          <span className="text-gold-400 font-semibold text-sm tracking-wider uppercase">Real Client Reviews</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
            What Our <span className="text-gold-400">Clients Say</span>
          </h2>
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            ))}
            <span className="text-white/70 ml-2 font-medium">5.0 rating on Google (26 reviews)</span>
            <a
              href="https://www.google.com/search?q=Mai+Hoang-+Loan+Officer+Reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex items-center gap-1 text-xs text-gold-400 hover:text-gold-300"
            >
              View on Google <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="max-w-3xl mx-auto relative">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 sm:p-10 transition-all duration-400">
            <Quote className="w-10 h-10 text-gold-500/30 mb-4" />
            <p className="text-lg text-white/90 leading-relaxed mb-6">
              &ldquo;{REVIEWS[current].text}&rdquo;
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">{REVIEWS[current].name}</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-white/50">{REVIEWS[current].date}</p>
                  <span className="text-xs text-white/40">&middot;</span>
                  <span className="text-xs text-gold-400">{REVIEWS[current].source}</span>
                </div>
              </div>
              <div className="flex">
                {[...Array(REVIEWS[current].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
          </div>

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
