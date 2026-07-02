"use client"

import Link from "next/link"
import { Facebook, Linkedin, Instagram, Youtube, Phone, Mail, MapPin, Heart } from "lucide-react"

const FOOTER_LINKS = {
  company: [
    { name: "About Us", href: "#about" },
    { name: "Our Team", href: "#about" },
    { name: "Programs", href: "#programs" },
    { name: "Rates", href: "#rates" },
    { name: "Contact", href: "#contact" },
  ],
  programs: [
    { name: "Conventional", href: "#programs" },
    { name: "FHA Loans", href: "#programs" },
    { name: "VA Loans", href: "#programs" },
    { name: "Non-QM Loans", href: "#programs" },
    { name: "DSCR Loans", href: "#programs" },
    { name: "Bank Statement", href: "#programs" },
  ],
  resources: [
    { name: "Mortgage Calculator", href: "#calculator" },
    { name: "Rate Sheet", href: "#rates" },
    { name: "Recent Deals", href: "#deals" },
    { name: "Schedule Call", href: "https://link.theradcrm.com/widget/booking/IMM4hHx1gyfTUveXoiiU" },
    { name: "Apply Now", href: "https://prod.lendingpad.com/aml-funding-llc/pos#/?loid=ec869ca1-8887-4a66-a44e-67b05cdd9bca" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "NMLS Consumer Access", href: "https://www.nmlsconsumeraccess.org" },
    { name: "Equal Housing", href: "#" },
  ],
}

const SOCIAL_LINKS = [
  { icon: Facebook, href: "https://facebook.com/amlfunding", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/amlfunding", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com/company/amlfunding", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com/@amlfunding", label: "YouTube" },
]

export function Footer() {
  return (
    <footer className="bg-navy-900 dark:bg-navy-950 text-white">
      {/* Main Footer */}
      <div className="container-xl section-padding py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 bg-gold-500 rounded-xl flex items-center justify-center">
                <span className="font-display font-bold text-white text-xl">AML</span>
              </div>
              <div>
                <p className="font-display font-semibold text-lg">AML Funding</p>
                <p className="text-xs text-navy-400">ABSOLUTE MORTGAGE & LENDING</p>
              </div>
            </div>
            <p className="text-navy-300 text-sm leading-relaxed mb-6 max-w-sm">
              Your trusted partner in homeownership. Premium mortgage solutions tailored to your unique financial goals.
            </p>
            <div className="space-y-3">
              <a href="tel:814-386-7005" className="flex items-center gap-3 text-navy-300 hover:text-gold-400 transition-colors">
                <Phone className="w-4 h-4" />
                <span className="text-sm">(814) 386-7005</span>
              </a>
              <a href="mailto:teammai@absoluteml.com" className="flex items-center gap-3 text-navy-300 hover:text-gold-400 transition-colors">
                <Mail className="w-4 h-4" />
                <span className="text-sm">teammai@absoluteml.com</span>
              </a>
              <div className="flex items-center gap-3 text-navy-300">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">600 Washington Ave, Philadelphia, PA 19147</span>
              </div>
            </div>
            {/* Social */}
            <div className="flex gap-3 mt-6">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 bg-navy-800 rounded-full flex items-center justify-center hover:bg-gold-500 transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-navy-400 mb-4">Company</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-navy-300 hover:text-gold-400 transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-navy-400 mb-4">Programs</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.programs.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-navy-300 hover:text-gold-400 transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-navy-400 mb-4">Resources</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-navy-300 hover:text-gold-400 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-navy-800">
        <div className="container-xl section-padding py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-navy-400">
              <span>CO-NMLS #1910591</span>
              <span>|</span>
              <span>NMLS #2180679</span>
              <span>|</span>
              <span>AML Funding LLC</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-navy-500">
              Made with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> in Philadelphia
            </div>
          </div>
          <p className="text-center text-xs text-navy-500 mt-4">
            &copy; {new Date().getFullYear()} AML Funding LLC DBA Absolute Mortgage & Lending. All rights reserved.
            All rates, terms, and conditions are subject to change and will be verified during the pre-approval process.
          </p>
        </div>
      </div>
    </footer>
  )
}
