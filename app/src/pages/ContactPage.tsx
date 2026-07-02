import { useEffect } from "react"
import { lazy, Suspense } from "react"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

const Contact = lazy(() => import("@/sections/Contact").then((m) => ({ default: m.Contact })))

function SectionLoader() {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function ContactPage() {
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
            <span className="text-gold-500 font-semibold text-sm tracking-wider uppercase">Get in Touch</span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-900 dark:text-white mt-3 mb-4 leading-[1.1]">
              Let&apos;s Talk <span className="text-gradient-gold">Mortgages</span>
            </h1>
            <p className="text-lg text-navy-600 dark:text-navy-300 leading-relaxed">
              Ready to take the next step? Reach out and let&apos;s discuss your mortgage goals. Our team is here to help you every step of the way.
            </p>
          </div>
        </div>
      </section>

      <Suspense fallback={<SectionLoader />}>
        <Contact />
      </Suspense>
    </main>
  )
}
