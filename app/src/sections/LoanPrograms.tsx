"use client"

import { useRef, useEffect } from "react"
import { Check, ArrowRight, Home, Building2, Star, Banknote, Landmark, FileText } from "lucide-react"

const PROGRAMS = [
  { title: "Conventional", subtitle: "Fixed & Adjustable", desc: "Fixed and adjustable rate mortgage options for qualified buyers with competitive rates and flexible terms.", icon: Home, features: ["Down payment as low as 3%", "No PMI with 20% down", "Loan amounts up to $766,550"] },
  { title: "FHA", subtitle: "Federal Housing Admin", desc: "Government-backed loans with flexible qualification requirements and lower down payment options.", icon: Building2, features: ["Down payment as low as 3.5%", "Credit scores down to 580", "Higher DTI allowed"] },
  { title: "VA", subtitle: "Veterans Affairs", desc: "Zero down payment loans for eligible veterans and active military with no monthly mortgage insurance.", icon: Star, features: ["No down payment required", "No monthly PMI", "Competitive interest rates"] },
  { title: "Non-QM", subtitle: "Non-Qualified Mortgage", desc: "Flexible loan programs for borrowers with unique financial situations and alternative documentation.", icon: Banknote, features: ["No traditional income docs", "Bank statement loans", "Interest-only options"] },
  { title: "DSCR", subtitle: "Investment Property", desc: "Investment property loans based on rental income, not personal income. Perfect for real estate investors.", icon: Landmark, features: ["No personal income verification", "Based on property cash flow", "Unlimited cash-out"] },
  { title: "Bank Statement", subtitle: "Self-Employed Program", desc: "Use bank statements instead of tax returns to qualify. Ideal for entrepreneurs and business owners.", icon: FileText, features: ["12 or 24 month statements", "No tax returns required", "Up to 90% LTV"] },
]

export function LoanPrograms() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) { e.target.querySelectorAll('.reveal-up').forEach((el, i) => { (el as HTMLElement).style.transitionDelay = `${i * 0.1}s`; el.classList.add('active') }) } }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="programs" ref={ref} className="py-16 lg:py-20 bg-white dark:bg-navy-950">
      <div className="container-xl section-padding">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal-up">
          <span className="text-gold-500 font-semibold text-sm tracking-wider uppercase">Loan Solutions</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy-900 dark:text-white mt-3 mb-4">
            Programs for Every <span className="text-gradient-gold">Borrower</span>
          </h2>
          <p className="text-navy-600 dark:text-navy-400">From first-time homebuyers to seasoned investors, we have the right loan program for your unique situation.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROGRAMS.map((p) => (
            <div key={p.title} className="reveal-up group bg-cream dark:bg-navy-900 rounded-2xl p-6 border border-navy-100 dark:border-navy-800 hover:border-gold-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/5">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center group-hover:bg-gold-500/20 transition-colors">
                  <p.icon className="w-6 h-6 text-gold-500" />
                </div>
                <span className="text-xs font-semibold text-navy-400 dark:text-navy-500 uppercase tracking-wider">{p.subtitle}</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-navy-800 dark:text-white mb-2">{p.title}</h3>
              <p className="text-navy-600 dark:text-navy-400 text-sm mb-5 leading-relaxed">{p.desc}</p>
              <ul className="space-y-2 mb-6">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" /><span className="text-sm text-navy-600 dark:text-navy-300">{f}</span></li>
                ))}
              </ul>
              <a href="https://prod.lendingpad.com/aml-funding-llc/pos#/?loid=ec869ca1-8887-4a66-a44e-67b05cdd9bca" target="_blank" rel="noopener noreferrer" className="btn-primary text-sm w-full">Apply Now<ArrowRight className="w-4 h-4" /></a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
