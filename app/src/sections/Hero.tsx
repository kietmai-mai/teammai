"use client"

import { useEffect, useRef } from "react"
import { ArrowRight, Calendar, Star, Award, Phone, Check } from "lucide-react"

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add("animate-in") },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="home" ref={sectionRef} className="relative flex items-center overflow-hidden bg-gradient-to-br from-cream via-white to-navy-50 dark:from-navy-950 dark:via-navy-900 dark:to-navy-950">
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      </div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-gold-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-navy-400/5 rounded-full blur-3xl" />

      <div className="container-xl section-padding relative z-10 pt-20 sm:pt-28 lg:pt-36 pb-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start lg:items-center">

          <div className="lg:col-span-7 space-y-4 sm:space-y-5 lg:space-y-6">
            <h1 className="reveal-item font-accent text-[1.2rem] sm:text-[2.0rem] lg:text-[4.0rem] xl:text-[5.0rem] text-navy-900 dark:text-white leading-[1.15] sm:leading-[1.05]" style={{ fontWeight: 900 }}>
              Your Journey to <span className="text-gradient-gold">Homeownership</span> Starts Here
            </h1>

            <p className="reveal-item font-accent text-xs sm:text-base lg:text-lg text-navy-600 dark:text-navy-300 max-w-lg leading-relaxed" style={{ fontWeight: 500 }}>
              Premium mortgage solutions tailored to your goals.
            </p>

            <div className="reveal-item flex flex-row sm:inline-flex gap-2 sm:gap-3">
              <a href="https://prod.lendingpad.com/aml-funding-llc/pos#/?loid=ec869ca1-8887-4a66-a44e-67b05cdd9bca" target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none btn-primary !px-3 sm:!px-7 !py-3.5 text-sm sm:text-base justify-center">
                <span className="sm:hidden">Apply Now</span>
                <span className="hidden sm:inline">Get Pre-Approved</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="https://link.theradcrm.com/widget/booking/IMM4hHx1gyfTUveXoiiU" target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none btn-outline !px-3 sm:!px-7 !py-3.5 text-sm sm:text-base justify-center">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="sm:hidden">Schedule</span>
                <span className="hidden sm:inline">Schedule a Call</span>
              </a>
            </div>

            <div className="reveal-item grid grid-cols-2 sm:inline-grid gap-2 sm:gap-3">
              {["Fast Pre-Approval", "Competitive Rates", "Personalized Service", "Bilingual Support"].map((item) => (
                <div key={item} className="flex items-center justify-center sm:justify-start gap-1 sm:gap-2 px-1.5 sm:px-4 py-1.5 sm:py-2.5 bg-white dark:bg-navy-800 border border-navy-100 dark:border-navy-700 rounded-md whitespace-nowrap">
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500 flex-shrink-0" />
                  <span className="text-[10px] sm:text-sm font-medium text-navy-700 dark:text-navy-200">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 reveal-item">
            <div className="bg-white dark:bg-navy-800 rounded-2xl border border-navy-100 dark:border-navy-700 shadow-xl overflow-hidden">
              <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] bg-navy-800">
                <img src="/president-club.jpg" alt="Mai Hoang - President's Club 2026" className="absolute inset-0 w-full h-full object-cover" loading="eager" fetchPriority="high" decoding="sync" />
              </div>
              <div className="p-4 sm:p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <img src="/mai-hoang-logo.jpg" alt="Mai Hoang" className="w-11 h-11 rounded-lg object-cover border-2 border-gold-500/30 flex-shrink-0" loading="eager" decoding="sync" />
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-bold text-navy-800 dark:text-white text-base">Mai Hoang</p>
                    <p className="text-xs text-navy-500 dark:text-navy-400">Loan Originator | NMLS #2180679</p>
                  </div>
                  <span className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-1 bg-gold-500/10 text-gold-600 dark:text-gold-400 text-xs font-bold rounded-full">
                    <Award className="w-3 h-3" />President&apos;s Club
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                  <a href="tel:814-386-7005" className="inline-flex items-center gap-1 font-bold text-gold-500 hover:text-gold-600 transition-colors">
                    <Phone className="w-3.5 h-3.5" />(814) 386-7005
                  </a>
                  <span className="text-navy-300">|</span>
                  <div className="flex items-center gap-0.5">
                    {[1,2,3,4,5].map((i) => <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />)}
                    <span className="font-medium text-navy-700 dark:text-navy-200 ml-1">5.0</span>
                  </div>
                  <a href="https://www.google.com/search?q=Mai+Hoang-+Loan+Officer+Reviews" target="_blank" rel="noopener noreferrer" className="text-xs text-navy-400 hover:text-gold-500 transition-colors underline">26 Reviews</a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{"\n        .reveal-item { opacity: 0; transform: translateY(20px); transition: all 0.6s ease-out; }\n        .animate-in .reveal-item { opacity: 1; transform: translateY(0); }\n        .animate-in .reveal-item:nth-child(1) { transition-delay: 0.1s; }\n        .animate-in .reveal-item:nth-child(2) { transition-delay: 0.2s; }\n        .animate-in .reveal-item:nth-child(3) { transition-delay: 0.3s; }\n        .animate-in .reveal-item:nth-child(4) { transition-delay: 0.4s; }\n        .animate-in .reveal-item:nth-child(5) { transition-delay: 0.5s; }\n      "}</style>
    </section>
  )
}
