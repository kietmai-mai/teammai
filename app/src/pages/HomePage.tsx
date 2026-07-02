import { lazy, Suspense } from "react"
import { Link } from "react-router-dom"
import { RefreshCw, ArrowRight, TrendingDown, Sparkles } from "lucide-react"
import { Hero } from "@/sections/Hero"
import { TrustBar } from "@/sections/TrustBar"

const LoanPrograms = lazy(() => import("@/sections/LoanPrograms").then((m) => ({ default: m.LoanPrograms })))
const WhyChooseUs = lazy(() => import("@/sections/WhyChooseUs").then((m) => ({ default: m.WhyChooseUs })))
const DealCarousel = lazy(() => import("@/sections/DealCarousel").then((m) => ({ default: m.DealCarousel })))
const RateSheet = lazy(() => import("@/sections/RateSheet").then((m) => ({ default: m.RateSheet })))
const MortgageCalculator = lazy(() => import("@/sections/MortgageCalculator").then((m) => ({ default: m.MortgageCalculator })))
const PreapprovalAds = lazy(() => import("@/sections/PreapprovalAds").then((m) => ({ default: m.PreapprovalAds })))
const Testimonials = lazy(() => import("@/sections/Testimonials").then((m) => ({ default: m.Testimonials })))

function SectionLoader() {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

function RefinancePromo() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-navy-800 via-navy-700 to-gold-500/80 my-[50px] rounded-none sm:rounded-xl container-xl sm:mx-auto section-padding">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} />
      <div className="relative z-10 py-3 sm:py-4">
        <Link to="/refinance" className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 group">
          <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0 w-full">
            <div className="relative flex-shrink-0">
              <img
                src="/refinance-banner-thumb.jpg"
                alt="Refinance with Mai Hoang"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover border-2 border-gold-400/50 shadow-lg group-hover:scale-105 transition-transform"
                loading="eager"
              />
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gold-400 rounded-full flex items-center justify-center shadow-md">
                <Sparkles className="w-3 h-3 text-navy-900" />
              </div>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <TrendingDown className="w-3.5 h-3.5 text-green-300 flex-shrink-0" />
                <span className="text-[10px] sm:text-xs font-bold text-green-200 uppercase tracking-wider">Refinance Special</span>
              </div>
              <p className="text-sm sm:text-base font-bold text-white leading-snug truncate">
                Refinance Today – Save Hundreds of Thousands!
              </p>
              <p className="text-xs text-navy-200 hidden sm:block">
                See how much you can save with our interactive calculator
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto">
            <div className="flex items-center gap-2 bg-gold-500 text-navy-900 px-5 py-2.5 rounded-full font-bold text-sm shadow-lg group-hover:bg-white transition-all flex-1 sm:flex-none justify-center">
              <RefreshCw className="w-4 h-4" />
              <span>Try Calculator</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <main>
      <Hero />
      <RefinancePromo />
      <TrustBar />
      <Suspense fallback={<SectionLoader />}>
        <LoanPrograms />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <WhyChooseUs />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <DealCarousel />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <RateSheet />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <MortgageCalculator />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <PreapprovalAds />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Testimonials />
      </Suspense>
    </main>
  )
}
