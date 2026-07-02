"use client"

import { Facebook, Linkedin, Phone, Mail, MapPin, Heart } from "lucide-react"
import { Link } from "react-router-dom"

const COMPANY = [
  { name: "About Us", href: "/about", type: "page" },
  { name: "Our Team", href: "/about", type: "page" },
  { name: "Programs", href: "/#programs", type: "page" },
  { name: "Rates", href: "/#rates", type: "page" },
  { name: "Contact", href: "/contact", type: "page" },
]

const PROGRAMS = [
  { name: "Conventional", href: "#programs" },
  { name: "FHA Loans", href: "#programs" },
  { name: "VA Loans", href: "#programs" },
  { name: "Non-QM Loans", href: "#programs" },
  { name: "DSCR Loans", href: "#programs" },
  { name: "Bank Statement", href: "#programs" },
]

const RESOURCES = [
  { name: "Mortgage Calculator", href: "#calculator" },
  { name: "Rate Sheet", href: "#rates" },
  { name: "Recent Deals", href: "#deals" },
  { name: "Schedule Call", href: "https://link.theradcrm.com/widget/booking/IMM4hHx1gyfTUveXoiiU" },
  { name: "Apply Now", href: "https://prod.lendingpad.com/aml-funding-llc/pos#/?loid=ec869ca1-8887-4a66-a44e-67b05cdd9bca" },
]

const SOCIAL = [
  { icon: Facebook, href: "https://www.facebook.com/janwinny.smile", label: "Facebook" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/maihoang05", label: "LinkedIn" },
]

export function Footer() {
  return (
    <footer className="bg-navy-900 dark:bg-navy-950 text-white">
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
            <p className="text-navy-300 text-sm leading-relaxed mb-6 max-w-sm">Your trusted partner in homeownership. Premium mortgage solutions tailored to your unique financial goals.</p>
            <div className="space-y-3">
              <a href="tel:814-386-7005" className="flex items-center gap-3 text-navy-300 hover:text-gold-400 transition-colors"><Phone className="w-4 h-4" /><span className="text-sm">(814) 386-7005</span></a>
              <a href="mailto:teammai@absoluteml.com" className="flex items-center gap-3 text-navy-300 hover:text-gold-400 transition-colors"><Mail className="w-4 h-4" /><span className="text-sm">teammai@absoluteml.com</span></a>
              <div className="flex items-center gap-3 text-navy-300"><MapPin className="w-4 h-4" /><span className="text-sm">600 Washington Ave, Philadelphia, PA 19147</span></div>
            </div>
            <div className="flex gap-3 mt-6">
              {SOCIAL.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="w-10 h-10 bg-navy-800 rounded-full flex items-center justify-center hover:bg-gold-500 transition-colors">
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            {/* Fair Housing & NMLS */}
            <div className="mt-6 flex items-center gap-4">
              <img src="/fair-housing-logo.jpg" alt="Equal Housing Lender" className="h-12 w-auto rounded-lg" />
              <div>
                <p className="text-xs text-navy-400 font-medium">Equal Housing Lender</p>
                <p className="text-xs text-navy-500">Fair Housing & Lending Compliant</p>
              </div>
              <div className="w-px h-10 bg-navy-700" />
              <a
                href="https://www.nmlsconsumeraccess.org/EntityDetails.aspx/COMPANY/1910591"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-3 py-2 bg-navy-800 hover:bg-navy-700 rounded-lg border border-navy-700 hover:border-gold-500/30 transition-all"
              >
                <div className="w-8 h-8 bg-navy-900 group-hover:bg-navy-800 rounded-md flex items-center justify-center flex-shrink-0">
                  <span className="font-display font-bold text-gold-500 text-[10px]">NMLS</span>
                </div>
                <div>
                  <p className="text-xs text-navy-300 group-hover:text-white font-medium transition-colors">NMLS #1910591</p>
                  <p className="text-[10px] text-navy-500 group-hover:text-navy-400 transition-colors">Verify License &rarr;</p>
                </div>
              </a>
            </div>
          </div>

          {/* Links */}
          <div><h4 className="font-semibold text-sm uppercase tracking-wider text-navy-400 mb-4">Company</h4><ul className="space-y-3">{COMPANY.map((l) => (<li key={l.name}><Link to={l.href} className="text-navy-300 hover:text-gold-400 transition-colors text-sm">{l.name}</Link></li>))}</ul></div>
          <div><h4 className="font-semibold text-sm uppercase tracking-wider text-navy-400 mb-4">Programs</h4><ul className="space-y-3">{PROGRAMS.map((l) => (<li key={l.name}><a href={l.href} className="text-navy-300 hover:text-gold-400 transition-colors text-sm">{l.name}</a></li>))}</ul></div>
          <div><h4 className="font-semibold text-sm uppercase tracking-wider text-navy-400 mb-4">Resources</h4><ul className="space-y-3">{RESOURCES.map((l) => (<li key={l.name}><a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined} className="text-navy-300 hover:text-gold-400 transition-colors text-sm">{l.name}</a></li>))}</ul></div>
        </div>
      </div>

      <div className="border-t border-navy-800">
        <div className="container-xl section-padding py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-navy-400">
              <span>CO-NMLS #1910591</span><span>|</span><span>NMLS #2180679</span><span>|</span><span>AML Funding LLC</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-navy-500">Made with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> in Philadelphia</div>
          </div>
          <p className="text-center text-xs text-navy-500 mt-4">&copy; {new Date().getFullYear()} AML Funding LLC DBA Absolute Mortgage & Lending. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
