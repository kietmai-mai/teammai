"use client"

import { useRef, useEffect, useState } from "react"
import { Phone, Mail, Award } from "lucide-react"

const TEAM = [
  {
    name: "Mai Hoang",
    role: "Loan Originator",
    nmls: "NMLS #2180679",
    phone: "(814) 386-7005",
    email: "Mai.Hoang@absoluteml.com",
    desc: "With over a decade of experience in the mortgage industry, Mai Hoang has helped hundreds of families achieve their dream of homeownership. Her personalized approach and deep knowledge of loan programs ensure every client finds the perfect mortgage solution. President's Club Award Winner 2026.",
    img: "/mai-hoang-logo.jpg",
  },
  {
    name: "Michael Mai",
    role: "Consultant",
    nmls: "",
    phone: "(215) 380-8930",
    email: "Michael.mai@absoluteml.com",
    desc: "Michael brings expertise in investment property financing and complex loan scenarios. His dedication to finding creative solutions has made him a trusted advisor for real estate investors and self-employed borrowers.",
    img: "/michael-mai-logo.jpg",
  },
]

function ProfileSkeleton() {
  return (
    <div className="bg-cream dark:bg-navy-900 rounded-2xl overflow-hidden border border-navy-100 dark:border-navy-800">
      <div className="relative bg-navy-800 dark:bg-navy-950 pt-10 pb-6 flex flex-col items-center">
        <div className="w-40 h-40 rounded-full bg-navy-700 dark:bg-navy-800 animate-pulse" />
      </div>
      <div className="p-6 text-center">
        <div className="h-7 w-32 bg-navy-200 dark:bg-navy-700 rounded mx-auto mb-2 animate-pulse" />
        <div className="h-5 w-24 bg-gold-200/50 dark:bg-gold-800/30 rounded mx-auto mb-4 animate-pulse" />
        <div className="h-16 w-full bg-navy-200 dark:bg-navy-700 rounded mx-auto mb-4 animate-pulse" />
        <div className="space-y-2 text-left inline-block">
          <div className="h-4 w-40 bg-navy-200 dark:bg-navy-700 rounded animate-pulse" />
          <div className="h-4 w-36 bg-navy-200 dark:bg-navy-700 rounded animate-pulse" />
          <div className="h-4 w-48 bg-navy-200 dark:bg-navy-700 rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export function Team() {
  const ref = useRef<HTMLDivElement>(null)
  const [imagesReady, setImagesReady] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setIsVisible(true)
          e.target.querySelectorAll(".reveal-up").forEach((el, i) => {
            ;(el as HTMLElement).style.transitionDelay = `${i * 0.15}s`
            el.classList.add("active")
          })
        }
      },
      { threshold: 0.1, rootMargin: "200px" }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  // Preload team images when section is near viewport
  useEffect(() => {
    if (!isVisible) return
    let loaded = 0
    const onLoad = () => {
      loaded++
      if (loaded >= TEAM.length) setImagesReady(true)
    }
    TEAM.forEach((m) => {
      const img = new Image()
      img.onload = onLoad
      img.onerror = onLoad
      img.src = m.img
    })
    // Fallback: show after 2s regardless
    const timer = setTimeout(() => setImagesReady(true), 2000)
    return () => clearTimeout(timer)
  }, [isVisible])

  return (
    <section id="about" ref={ref} className="py-24 bg-white dark:bg-navy-950">
      <div className="container-xl section-padding">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal-up">
          <span className="text-gold-500 font-semibold text-sm tracking-wider uppercase">Our Team</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy-900 dark:text-white mt-3 mb-4">
            Meet the <span className="text-gradient-gold">Experts</span>
          </h2>
          <p className="text-navy-600 dark:text-navy-400">
            Dedicated professionals committed to making your homeownership dreams a reality.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {!imagesReady && isVisible ? (
            <>
              <ProfileSkeleton />
              <ProfileSkeleton />
            </>
          ) : (
            TEAM.map((m) => (
              <div
                key={m.name}
                className="reveal-up bg-cream dark:bg-navy-900 rounded-2xl overflow-hidden border border-navy-100 dark:border-navy-800 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative bg-navy-800 dark:bg-navy-950 pt-10 pb-6 flex flex-col items-center">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-gold-500 shadow-lg bg-white dark:bg-navy-800">
                    <img
                      src={m.img}
                      alt={m.name}
                      className="w-full h-full object-cover"
                      loading="eager"
                      decoding="sync"
                    />
                  </div>
                </div>
                <div className="p-5 sm:p-6 text-center">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-navy-800 dark:text-white">
                    {m.name}
                  </h3>
                  <p className="text-gold-600 dark:text-gold-400 font-medium mb-3">{m.role}</p>
                  <p className="text-navy-600 dark:text-navy-400 text-sm leading-relaxed mb-5">
                    {m.desc}
                  </p>
                  <div className="space-y-2 text-left inline-block">
                    {m.nmls && (
                      <div className="flex items-center gap-2 text-sm text-navy-600 dark:text-navy-300">
                        <Award className="w-4 h-4 text-gold-500 flex-shrink-0" />
                        {m.nmls}
                      </div>
                    )}
                    <a
                      href={`tel:${m.phone.replace(/\D/g, "")}`}
                      className="flex items-center gap-2 text-sm text-navy-600 dark:text-navy-300 hover:text-gold-500 transition-colors"
                    >
                      <Phone className="w-4 h-4 text-gold-500 flex-shrink-0" />
                      {m.phone}
                    </a>
                    <a
                      href={`mailto:${m.email}`}
                      className="flex items-center gap-2 text-sm text-navy-600 dark:text-navy-300 hover:text-gold-500 transition-colors"
                    >
                      <Mail className="w-4 h-4 text-gold-500 flex-shrink-0" />
                      {m.email}
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
