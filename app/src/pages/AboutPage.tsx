import { useEffect } from "react"
import { lazy, Suspense } from "react"
import { ArrowLeft, Users, Building2, Award, Star, Clock, MapPin } from "lucide-react"
import { Link } from "react-router-dom"

const Team = lazy(() => import("@/sections/Team").then((m) => ({ default: m.Team })))

function SectionLoader() {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

const STATS = [
  { value: "10+", label: "Years Experience", icon: Award },
  { value: "4.9\u2605", label: "Google Rating", icon: Star },
  { value: "21", label: "Avg. Days to Close", icon: Clock },
  { value: "15+", label: "States Licensed", icon: MapPin },
]

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main>
      {/* Hero Banner */}
      <section className="pt-28 pb-12 bg-gradient-to-br from-cream via-white to-navy-50 dark:from-navy-950 dark:via-navy-900 dark:to-navy-950">
        <div className="container-xl section-padding">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-navy-500 dark:text-navy-400 hover:text-gold-500 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="max-w-2xl">
            <span className="text-gold-500 font-semibold text-sm tracking-wider uppercase">About Us</span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-900 dark:text-white mt-3 mb-4 leading-[1.1]">
              Rooted in <span className="text-gradient-gold">Philadelphia</span>,<br />
              Serving Nationwide
            </h1>
            <p className="text-lg text-navy-600 dark:text-navy-300 leading-relaxed">
              AML Funding LLC, doing business as Absolute Mortgage & Lending, was founded with a simple mission: make homeownership accessible to everyone. Based in the heart of Philadelphia, we&apos;ve grown from a local brokerage to a trusted name across 15+ states.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-white dark:bg-navy-950 border-y border-navy-100 dark:border-navy-800">
        <div className="container-xl section-padding">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="text-center">
                  <Icon className="w-6 h-6 text-gold-500 mx-auto mb-2" />
                  <p className="font-display text-3xl font-bold text-gold-500">{stat.value}</p>
                  <p className="text-sm text-navy-500 dark:text-navy-400 mt-1">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 bg-cream dark:bg-navy-900">
        <div className="container-xl section-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <div className="space-y-4 text-navy-600 dark:text-navy-300 leading-relaxed">
                <p>
                  Our team, led by <strong className="text-navy-800 dark:text-white">Mai Hoang (NMLS #2180679)</strong>, brings over a decade of mortgage expertise and a deep commitment to every client we serve.
                </p>
                <p>
                  Whether you&apos;re a first-time buyer in South Philly, an investor in Center City, or refinancing in the suburbs, we speak your language&mdash;literally. Our bilingual team ensures clear communication in English and Vietnamese.
                </p>
                <p>
                  We believe every family deserves a place to call home. That&apos;s why we work tirelessly to find the right loan program for your unique situation, guiding you through every step of the process with transparency and care.
                </p>
              </div>
              <div className="flex flex-wrap gap-6 mt-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold-500/10 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-gold-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy-800 dark:text-white text-sm">Philadelphia, PA</p>
                    <p className="text-xs text-navy-500 dark:text-navy-400">600 Washington Ave</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold-500/10 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-gold-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy-800 dark:text-white text-sm">500+ Families Helped</p>
                    <p className="text-xs text-navy-500 dark:text-navy-400">And counting</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-navy-800 rounded-2xl p-8 border border-navy-100 dark:border-navy-700">
              <h3 className="font-display text-2xl font-bold text-navy-800 dark:text-white mb-6">Why Choose AML Funding?</h3>
              <div className="space-y-4">
                {[
                  { title: "Local Expertise", desc: "Deep knowledge of the Philadelphia market and surrounding areas." },
                  { title: "Bilingual Service", desc: "Fluent in English and Vietnamese for clear communication." },
                  { title: "Wide Range of Programs", desc: "From conventional to Non-QM, we have options for every situation." },
                  { title: "Fast Turnaround", desc: "Average 21 days to close, keeping your transactions on track." },
                  { title: "Personalized Attention", desc: "You're not just a number. We build lasting relationships." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-navy-800 dark:text-white text-sm">{item.title}</p>
                      <p className="text-sm text-navy-500 dark:text-navy-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Experts */}
      <Suspense fallback={<SectionLoader />}>
        <Team />
      </Suspense>
    </main>
  )
}
