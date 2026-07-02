"use client"

import { useState, useRef, useEffect } from "react"
import { Phone, Mail, MapPin, Clock, Calendar, Send, CheckCircle } from "lucide-react"

const INFO = [
  { icon: Phone, label: "Call Us", value: "(814) 386-7005", href: "tel:814-386-7005" },
  { icon: Mail, label: "Email", value: "Mai.Hoang@absoluteml.com", href: "mailto:Mai.Hoang@absoluteml.com" },
  { icon: MapPin, label: "Visit Us", value: "600 Washington Ave, Philadelphia, PA 19147", href: "https://maps.google.com" },
  { icon: Clock, label: "Hours", value: "Mon-Fri: 9AM-6PM EST", href: null },
]

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" })
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) e.target.querySelector(".reveal-up")?.classList.add("active") }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Contact Form - ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`)
    window.open(`mailto:teammai@absoluteml.com?subject=${subject}&body=${body}`, "_blank")
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section id="contact" ref={ref} className="py-24 bg-white dark:bg-navy-950">
      <div className="container-xl section-padding">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal-up">
          <span className="text-gold-500 font-semibold text-sm tracking-wider uppercase">Get Started</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy-900 dark:text-white mt-3 mb-4">Let&apos;s Talk <span className="text-gradient-gold">Mortgages</span></h2>
          <p className="text-navy-600 dark:text-navy-400">Ready to take the next step? Reach out and let&apos;s discuss your mortgage goals.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="space-y-4">
            {INFO.map((item) => (
              <div key={item.label} className="bg-cream dark:bg-navy-900 rounded-xl p-5 border border-navy-100 dark:border-navy-800">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold-500/10 rounded-lg flex items-center justify-center flex-shrink-0"><item.icon className="w-5 h-5 text-gold-500" /></div>
                  <div>
                    <p className="text-xs font-semibold text-navy-500 dark:text-navy-400 uppercase tracking-wider">{item.label}</p>
                    {item.href ? <a href={item.href} className="text-navy-800 dark:text-white font-medium hover:text-gold-500 transition-colors">{item.value}</a> : <p className="text-navy-800 dark:text-white font-medium">{item.value}</p>}
                  </div>
                </div>
              </div>
            ))}
            <a href="https://link.theradcrm.com/widget/booking/IMM4hHx1gyfTUveXoiiU" target="_blank" rel="noopener noreferrer" className="btn-primary w-full mt-4"><Calendar className="w-5 h-5" />Schedule a Consultation</a>
          </div>

          <div className="lg:col-span-2 bg-cream dark:bg-navy-900 rounded-2xl p-8 border border-navy-100 dark:border-navy-800">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-8 h-8 text-emerald-500" /></div>
                <h3 className="font-display text-2xl font-bold text-navy-800 dark:text-white mb-2">Message Sent!</h3>
                <p className="text-navy-600 dark:text-navy-400">We&apos;ve received your inquiry. Our team will reach out within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div><label className="block text-sm font-medium text-navy-700 dark:text-navy-300 mb-2">Full Name</label><input type="text" required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 bg-white dark:bg-navy-800 border border-navy-200 dark:border-navy-700 rounded-lg text-navy-800 dark:text-white focus:ring-2 focus:ring-gold-500 outline-none" placeholder="John Smith" /></div>
                  <div><label className="block text-sm font-medium text-navy-700 dark:text-navy-300 mb-2">Email</label><input type="email" required value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 bg-white dark:bg-navy-800 border border-navy-200 dark:border-navy-700 rounded-lg text-navy-800 dark:text-white focus:ring-2 focus:ring-gold-500 outline-none" placeholder="john@email.com" /></div>
                </div>
                <div><label className="block text-sm font-medium text-navy-700 dark:text-navy-300 mb-2">Phone</label><input type="tel" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} className="w-full px-4 py-3 bg-white dark:bg-navy-800 border border-navy-200 dark:border-navy-700 rounded-lg text-navy-800 dark:text-white focus:ring-2 focus:ring-gold-500 outline-none" placeholder="(555) 123-4567" /></div>
                <div><label className="block text-sm font-medium text-navy-700 dark:text-navy-300 mb-2">Message</label><textarea rows={4} value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} className="w-full px-4 py-3 bg-white dark:bg-navy-800 border border-navy-200 dark:border-navy-700 rounded-lg text-navy-800 dark:text-white focus:ring-2 focus:ring-gold-500 outline-none resize-none" placeholder="Tell us about your mortgage goals..." /></div>
                <button type="submit" className="btn-primary w-full"><Send className="w-5 h-5" />Send Message</button>
                <p className="text-xs text-navy-500 dark:text-navy-500 text-center">This will open your email client with the details pre-filled.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
