"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/sections/hero"
import { TrustBar } from "@/components/sections/trust-bar"
import { LoanPrograms } from "@/components/sections/loan-programs"
import { RateSheet } from "@/components/sections/rate-sheet"
import { MortgageCalculator } from "@/components/sections/mortgage-calculator"
import { RecentDeals } from "@/components/sections/recent-deals"
import { WhyChooseUs } from "@/components/sections/why-choose-us"
import { Testimonials } from "@/components/sections/testimonials"
import { Team } from "@/components/sections/team"
import { About } from "@/components/sections/about"
import { Contact } from "@/components/sections/contact"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <LoanPrograms />
        <WhyChooseUs />
        <RecentDeals />
        <RateSheet />
        <MortgageCalculator />
        <Testimonials />
        <Team />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
