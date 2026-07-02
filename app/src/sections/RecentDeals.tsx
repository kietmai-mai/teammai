"use client"

import { useRef, useEffect } from "react"
import { MapPin, Calendar, DollarSign, CheckCircle } from "lucide-react"

const DEALS = [
  { title: "First-Time Homebuyer", subtitle: "Philadelphia Rowhome", location: "Philadelphia, PA 19148", desc: "Beautifully renovated rowhome funded for a first-time homebuyer.", amount: 425000, date: "March 2025", type: "Conventional" },
  { title: "Cash-Out Refinance", subtitle: "Cash Out Refi Success", location: "Philadelphia, PA", desc: "No tax return program - helped client access equity.", amount: 380000, date: "February 2025", type: "Cash-Out Refi" },
  { title: "First Home Purchase", subtitle: "Client Testimonial", location: "Delaware County, PA", desc: "5-star review from a happy first-time homeowner!", amount: 350000, date: "February 2025", type: "Conventional" },
  { title: "Fast Close", subtitle: "Clear to Close - 13 Days!", location: "Montgomery County, PA", desc: "Saved the transaction - client almost lost EMD.", amount: 520000, date: "February 2025", type: "Conventional" },
  { title: "First-Time Homebuyer", subtitle: "Modern Townhouse", location: "Philadelphia, PA 19122", desc: "Modern townhouse closed for young professional.", amount: 295000, date: "January 2025", type: "FHA" },
  { title: "VA Loan", subtitle: "Closed & Funded", location: "Bucks County, PA", desc: "Helped a veteran family achieve their homeownership dream.", amount: 485000, date: "January 2025", type: "VA" },
]

function fmtCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n)
}

export function RecentDeals() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) { e.target.querySelectorAll(".reveal-up").forEach((el, i) => { (el as HTMLElement).style.transitionDelay = `${i * 0.1}s`; el.classList.add("active") }) } }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="deals" ref={ref} className="py-24 bg-white dark:bg-navy-950">
      <div className="container-xl section-padding">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal-up">
          <span className="text-gold-500 font-semibold text-sm tracking-wider uppercase">Proven Track Record</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy-900 dark:text-white mt-3 mb-4">Recent <span className="text-gradient-gold">Deals</span></h2>
          <p className="text-navy-600 dark:text-navy-400">Real results for real clients across the Philadelphia metro area.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEALS.map((d, i) => (
            <div key={i} className="reveal-up group bg-cream dark:bg-navy-900 rounded-2xl overflow-hidden border border-navy-100 dark:border-navy-800 hover:shadow-xl hover:shadow-gold-500/5 transition-all duration-300">
              <div className="p-6 pb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-gold-500/10 text-gold-600 dark:text-gold-400 text-xs font-semibold rounded-full">{d.type}</span>
                  <div className="flex items-center gap-1 text-emerald-500"><CheckCircle className="w-4 h-4" /><span className="text-xs font-semibold">Funded</span></div>
                </div>
                <h3 className="font-display text-xl font-bold text-navy-800 dark:text-white mb-1">{d.title}</h3>
                <p className="text-sm text-gold-600 dark:text-gold-400 font-medium mb-3">{d.subtitle}</p>
                <p className="text-sm text-navy-500 dark:text-navy-400 leading-relaxed">{d.desc}</p>
              </div>
              <div className="px-6 py-4 bg-navy-50 dark:bg-navy-950/50 border-t border-navy-100 dark:border-navy-700">
                <div className="flex items-center justify-between text-sm text-navy-600 dark:text-navy-300">
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-navy-400" />{d.location}</div>
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-navy-400" />{d.date}</div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-gold-500" />
                  <span className="font-display text-xl font-bold text-navy-800 dark:text-white">{fmtCurrency(d.amount)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
