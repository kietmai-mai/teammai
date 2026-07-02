import { lazy, Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import { Navbar } from "@/sections/Navbar"
import { Footer } from "@/sections/Footer"
import HomePage from "@/pages/HomePage"
import RefinancePage from "@/pages/RefinancePage"

const AboutPage = lazy(() => import("@/pages/AboutPage"))
const ContactPage = lazy(() => import("@/pages/ContactPage"))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/about"
            element={
              <Suspense fallback={<PageLoader />}>
                <AboutPage />
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={<PageLoader />}>
                <ContactPage />
              </Suspense>
            }
          />
          <Route path="/refinance" element={<RefinancePage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
