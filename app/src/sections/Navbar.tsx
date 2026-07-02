"use client"

import { useState, useEffect, useCallback } from "react"
import { useLocation, Link, useNavigate } from "react-router-dom"
import {
  Menu,
  X,
  Phone,
  Sun,
  Moon,
  ArrowRight,
  Calendar,
  Home,
  FileText,
  TrendingUp,
  Image,
  Users,
  Mail,
  RefreshCw,
} from "lucide-react"
import { useTheme } from "@/components/theme-provider"

const NAV_LINKS = [
  { name: "Home", href: "/", icon: Home, type: "page" },
  { name: "Programs", href: "#programs", icon: FileText, type: "scroll" },
  { name: "Rates", href: "#rates", icon: TrendingUp, type: "scroll" },
  { name: "Deals", href: "#deals", icon: Image, type: "scroll" },
  { name: "Refinance", href: "/refinance", icon: RefreshCw, type: "page" },
  { name: "About", href: "/about", icon: Users, type: "page" },
  { name: "Contact", href: "/contact", icon: Mail, type: "page" },
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("#home")
  const { resolvedTheme, setTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()

  const isHomePage = location.pathname === "/"

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Track active section on home page
  useEffect(() => {
    if (!isHomePage) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`)
          }
        })
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
    )
    NAV_LINKS.filter((l) => l.type === "scroll").forEach((link) => {
      const el = document.querySelector(link.href)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [isHomePage])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  const handleNavClick = useCallback(
    (link: (typeof NAV_LINKS)[0]) => {
      setIsMenuOpen(false)

      if (link.type === "page") {
        // Navigate to page
        if (link.href === "/") {
          navigate("/")
          window.scrollTo({ top: 0, behavior: "smooth" })
        } else {
          navigate(link.href)
        }
      } else if (link.type === "scroll") {
        // Scroll to section
        if (isHomePage) {
          document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" })
        } else {
          // Not on home page, navigate home then scroll
          navigate("/" + link.href)
        }
      }
    },
    [isHomePage, navigate]
  )

  const isActive = (link: (typeof NAV_LINKS)[0]) => {
    if (link.type === "page") {
      if (link.href === "/") return location.pathname === "/"
      return location.pathname === link.href
    }
    return isHomePage && activeSection === link.href
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass shadow-lg shadow-navy-900/5 py-2.5"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container-xl section-padding">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 min-w-0"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 bg-gold-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="font-display font-bold text-white text-sm sm:text-lg">
                  AML
                </span>
              </div>
              <div className="hidden sm:block">
                <p className="font-display font-semibold text-navy-800 dark:text-white text-sm leading-tight">
                  AML Funding
                </p>
                <p className="text-[10px] text-navy-500 dark:text-navy-400 tracking-wide">
                  ABSOLUTE MORTGAGE & LENDING
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive(link)
                      ? "text-gold-600 dark:text-gold-400 bg-gold-500/10"
                      : "text-navy-600 dark:text-navy-200 hover:text-gold-500 dark:hover:text-gold-400 hover:bg-gold-500/5"
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() =>
                  setTheme(resolvedTheme === "dark" ? "light" : "dark")
                }
                className="w-9 h-9 rounded-lg flex items-center justify-center text-navy-500 dark:text-navy-300 hover:bg-gold-500/10 hover:text-gold-500 transition-colors"
                aria-label="Toggle theme"
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>

              <a
                href="tel:814-386-7005"
                className="hidden md:flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-navy-600 dark:text-navy-200 hover:text-gold-500 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>(814) 386-7005</span>
              </a>

              <a
                href="https://link.theradcrm.com/widget/booking/IMM4hHx1gyfTUveXoiiU"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm font-medium border-2 border-gold-500 text-gold-600 dark:text-gold-400 rounded-lg hover:bg-gold-500 hover:text-white transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule</span>
              </a>

              <a
                href="https://prod.lendingpad.com/aml-funding-llc/pos#/?loid=ec869ca1-8887-4a66-a44e-67b05cdd9bca"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs sm:text-sm !px-3 sm:!px-4 !py-2"
              >
                Apply
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center text-navy-600 dark:text-navy-200 hover:bg-navy-100 dark:hover:bg-navy-800 active:scale-95 transition-all"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
        <div
          className={`absolute top-[72px] left-0 right-0 bottom-0 bg-white dark:bg-navy-900 overflow-y-auto transition-transform duration-300 ease-out ${
            isMenuOpen ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          <div className="p-4 space-y-1">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon
              const active = isActive(link)
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-all active:scale-[0.98] ${
                    active
                      ? "bg-gold-500/10 text-gold-600 dark:text-gold-400"
                      : "text-navy-700 dark:text-navy-100 hover:bg-navy-50 dark:hover:bg-navy-800"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {link.name}
                  {active && (
                    <span className="ml-auto w-2 h-2 rounded-full bg-gold-500" />
                  )}
                </button>
              )
            })}

            <hr className="border-navy-100 dark:border-navy-700 my-3" />

            <a
              href="tel:814-386-7005"
              className="flex items-center gap-3 px-4 py-3.5 text-navy-700 dark:text-navy-100 active:bg-navy-50 dark:active:bg-navy-800 rounded-xl"
            >
              <Phone className="w-5 h-5 text-gold-500" />
              (814) 386-7005
            </a>

            <a
              href="https://link.theradcrm.com/widget/booking/IMM4hHx1gyfTUveXoiiU"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3.5 border-2 border-gold-500 text-gold-600 dark:text-gold-400 font-semibold rounded-xl hover:bg-gold-500 hover:text-white transition-all active:scale-[0.98]"
            >
              <Calendar className="w-5 h-5" />
              Schedule a Call
            </a>

            <a
              href="https://prod.lendingpad.com/aml-funding-llc/pos#/?loid=ec869ca1-8887-4a66-a44e-67b05cdd9bca"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full justify-center text-center py-3.5"
            >
              Get Pre-Approved
            </a>

            <p className="text-center text-xs text-navy-400 dark:text-navy-500 pt-4 pb-6">
              CO-NMLS #1910591 | NMLS #2180679
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
