"use client"

import { useRef, useEffect } from "react"
import { Shield, Award, Clock, Users } from "lucide-react"

const ITEMS = [
  { icon: Shield, label: "NMLS Licensed", sub: "#1910591" },
  { icon: Award, label: "15+ States", sub: "Licensed" },
  { icon: Clock, label: "21 Days", sub: "Avg. Close" },
  { icon: Users, label: "500+", sub: "Clients Served" },
]

export function TrustBar() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) e.target.classList.add("active") }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative z-10 -mt-8">
      <div className="container-xl section-padding">
        <div ref={ref} className="reveal-up bg-white dark:bg-navy-800 rounded-2xl shadow-xl shadow-navy-900/5 border border-navy-100 dark:border-navy-700 px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {ITEMS.map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-gold-500" />
                </div>
                <div>
                  <p className="font-bold text-navy-800 dark:text-white text-sm">{item.label}</p>
                  <p className="text-xs text-navy-500 dark:text-navy-400">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
