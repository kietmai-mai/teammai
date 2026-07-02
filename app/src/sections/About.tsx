"use client"

import { useRef, useEffect } from "react"
import { MapPin, Heart, Target } from "lucide-react"

export function About() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) { e.target.querySelectorAll(".reveal-up").forEach((el, i) => { (el as HTMLElement).style.transitionDelay = `${i * 0.1}s`; el.classList.add("active") }) } }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-24 bg-cream dark:bg-navy-900">
      <div className="container-xl section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="reveal-up">
            <span className="text-gold-500 font-semibold text-sm tracking-wider uppercase">About Us</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy-900 dark:text-white mt-3 mb-6">Rooted in <span className="text-gradient-gold">Philadelphia</span>,<br />Serving Nationwide</h2>
            <div className="space-y-4 text-navy-600 dark:text-navy-300 leading-relaxed">
              <p>AML Funding LLC, doing business as Absolute Mortgage & Lending, was founded with a simple mission: make homeownership accessible to everyone. Based in the heart of Philadelphia, we&apos;ve grown from a local brokerage to a trusted name across 15+ states.</p>
              <p>Our team, led by <strong className="text-navy-800 dark:text-white">Mai Hoang (NMLS #2180679)</strong>, brings over a decade of mortgage expertise and a deep commitment to every client we serve.</p>
              <p>Whether you&apos;re a first-time buyer in South Philly, an investor in Center City, or refinancing in the suburbs, we speak your language&mdash;literally. Our bilingual team ensures clear communication in English and Vietnamese.</p>
            </div>
            <div className="flex flex-wrap gap-6 mt-8">
              {[{icon: MapPin, title: "Philadelphia, PA", sub: "600 Washington Ave"}, {icon: Heart, title: "500+ Families Helped", sub: "And counting"}, {icon: Target, title: "15+ States Licensed", sub: "Nationwide coverage"}].map((item) => (
                <div key={item.title} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold-500/10 rounded-lg flex items-center justify-center"><item.icon className="w-5 h-5 text-gold-500" /></div>
                  <div><p className="font-semibold text-navy-800 dark:text-white text-sm">{item.title}</p><p className="text-xs text-navy-500 dark:text-navy-400">{item.sub}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[{value: "10+", label: "Years Experience"}, {value: "4.9★", label: "Google Rating"}, {value: "21", label: "Avg. Days to Close"}, {value: "15+", label: "States Licensed"}].map((stat) => (
              <div key={stat.label} className="reveal-up bg-white dark:bg-navy-800 rounded-2xl p-6 text-center border border-navy-100 dark:border-navy-700">
                <p className="font-display text-3xl font-bold text-gold-500">{stat.value}</p>
                <p className="text-sm text-navy-500 dark:text-navy-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
