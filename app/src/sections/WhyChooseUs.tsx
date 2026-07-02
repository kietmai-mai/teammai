"use client"

import { useRef, useEffect } from "react"
import { Clock, TrendingUp, Users, Shield, Award, Heart } from "lucide-react"

const BENEFITS = [
  { icon: Clock, title: "Fast Pre-Approvals", desc: "Get pre-approved in as little as 24 hours. Make offers with confidence." },
  { icon: TrendingUp, title: "Competitive Rates", desc: "We shop multiple lenders to find you the best rate and terms available." },
  { icon: Users, title: "Bilingual Support", desc: "Our team speaks English and Vietnamese for clear communication." },
  { icon: Shield, title: "Licensed in 15+ States", desc: "Licensed in PA, NJ, DE, MD, FL, TX and more states." },
  { icon: Award, title: "500+ Loans Funded", desc: "Over $100 million in total loan volume. Proven experience." },
  { icon: Heart, title: "Client-First Approach", desc: "Personalized service and honest advice every step of the way." },
]

export function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) { e.target.querySelectorAll(".reveal-up").forEach((el, i) => { (el as HTMLElement).style.transitionDelay = `${i * 0.1}s`; el.classList.add("active") }) } }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-16 lg:py-20 bg-cream dark:bg-navy-900">
      <div className="container-xl section-padding">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal-up">
          <span className="text-gold-500 font-semibold text-sm tracking-wider uppercase">Why AML Funding</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy-900 dark:text-white mt-3 mb-4">The AML <span className="text-gradient-gold">Advantage</span></h2>
          <p className="text-navy-600 dark:text-navy-400">Deep industry expertise with a personal touch for an unmatched mortgage experience.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BENEFITS.map((b) => (
            <div key={b.title} className="reveal-up group text-center">
              <div className="w-16 h-16 bg-gold-500/10 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-gold-500/20 transition-colors">
                <b.icon className="w-8 h-8 text-gold-500" />
              </div>
              <h3 className="font-display text-xl font-bold text-navy-800 dark:text-white mb-3">{b.title}</h3>
              <p className="text-navy-600 dark:text-navy-400 text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
