"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "./theme-provider"
import {
  Menu,
  X,
  Phone,
  Sun,
  Moon,
  ArrowRight,
  Calendar,
} from "lucide-react"

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "Programs", href: "#programs" },
  { name: "Rates", href: "#rates" },
  { name: "Deals", href: "#deals" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    setIsMenuOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass shadow-lg shadow-navy-900/5 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container-xl section-padding">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center">
                <span className="font-display font-bold text-white text-lg">AML</span>
              </div>
              <div className="hidden sm:block">
                <p className="font-display font-semibold text-navy-800 dark:text-white text-sm leading-tight">
                  AML Funding
                </p>
                <p className="text-[10px] text-navy-500 dark:text-navy-300 tracking-wide">
                  ABSOLUTE MORTGAGE & LENDING
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="px-3 py-2 text-sm font-medium text-navy-600 dark:text-navy-200 hover:text-gold-500 dark:hover:text-gold-400 transition-colors rounded-lg hover:bg-gold-500/5"
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-navy-500 dark:text-navy-300 hover:bg-gold-500/10 hover:text-gold-500 transition-colors"
                aria-label="Toggle theme"
              >
                {resolvedTheme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Phone */}
              <a
                href="tel:814-386-7005"
                className="hidden md:flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-navy-600 dark:text-navy-200 hover:text-gold-500 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>(814) 386-7005</span>
              </a>

              {/* Schedule */}
              <a
                href="https://link.theradcrm.com/widget/booking/IMM4hHx1gyfTUveXoiiU"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm font-medium border-2 border-gold-500 text-gold-600 dark:text-gold-400 rounded-lg hover:bg-gold-500 hover:text-white transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule</span>
              </a>

              {/* Apply Now */}
              <a
                href="https://prod.lendingpad.com/aml-funding-llc/pos#/?loid=ec869ca1-8887-4a66-a44e-67b05cdd9bca"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm !px-4 !py-2"
              >
                Get Pre-Approved
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-navy-600 dark:text-navy-200 hover:bg-navy-100 dark:hover:bg-navy-800 transition-colors"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="absolute inset-0 bg-navy-950/50 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
        <div
          className={`absolute top-20 left-4 right-4 bg-white dark:bg-navy-900 rounded-2xl shadow-2xl p-6 transition-all duration-300 ${
            isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-left px-4 py-3 text-navy-700 dark:text-navy-100 font-medium rounded-lg hover:bg-gold-500/10 hover:text-gold-600 dark:hover:text-gold-400 transition-colors"
              >
                {link.name}
              </button>
            ))}
            <hr className="border-navy-100 dark:border-navy-700 my-2" />
            <a
              href="tel:814-386-7005"
              className="flex items-center gap-2 px-4 py-3 text-navy-700 dark:text-navy-100"
            >
              <Phone className="w-5 h-5 text-gold-500" />
              (814) 386-7005
            </a>
            <a
              href="https://link.theradcrm.com/widget/booking/IMM4hHx1gyfTUveXoiiU"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gold-500 text-gold-600 dark:text-gold-400 font-semibold rounded-lg hover:bg-gold-500 hover:text-white transition-all"
            >
              <Calendar className="w-5 h-5" />
              Schedule a Call
            </a>
            <a
              href="https://prod.lendingpad.com/aml-funding-llc/pos#/?loid=ec869ca1-8887-4a66-a44e-67b05cdd9bca"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-center"
            >
              Get Pre-Approved
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
