"use client"

import { motion } from "framer-motion"
import { Phone, Mail, Award } from "lucide-react"

const TEAM = [
  {
    name: "Mai Hoang",
    role: "Loan Originator",
    nmls: "NMLS #2180679",
    phone: "(814) 386-7005",
    email: "Mai.Hoang@absoluteml.com",
    teamEmail: "teammai@absoluteml.com",
    description: "With over a decade of experience in the mortgage industry, Mai Hoang has helped hundreds of families achieve their dream of homeownership. Her personalized approach and deep knowledge of loan programs ensure every client finds the perfect mortgage solution.",
    initials: "MH",
    color: "bg-gold-500",
  },
  {
    name: "Michael Mai",
    role: "Loan Consultant",
    nmls: "NMLS #2180679",
    phone: "(215) 380-8930",
    email: "Michael.mai@absoluteml.com",
    teamEmail: "teammai@absoluteml.com",
    description: "Michael brings expertise in investment property financing and complex loan scenarios. His dedication to finding creative solutions has made him a trusted advisor for real estate investors and self-employed borrowers.",
    initials: "MM",
    color: "bg-navy-600",
  },
]

export function Team() {
  return (
    <section id="about" className="py-24 bg-white dark:bg-navy-950">
      <div className="container-xl section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-gold-500 font-semibold text-sm tracking-wider uppercase">Our Team</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy-900 dark:text-white mt-3 mb-4">
            Meet the <span className="text-gradient-gold">Experts</span>
          </h2>
          <p className="text-navy-600 dark:text-navy-400">
            Dedicated professionals committed to making your homeownership dreams a reality.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {TEAM.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-cream dark:bg-navy-900 rounded-2xl p-8 border border-navy-100 dark:border-navy-800 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className={`w-16 h-16 ${member.color} rounded-xl flex items-center justify-center`}>
                  <span className="font-display font-bold text-white text-xl">{member.initials}</span>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-navy-800 dark:text-white">{member.name}</h3>
                  <p className="text-gold-600 dark:text-gold-400 font-medium">{member.role}</p>
                </div>
              </div>

              <p className="text-navy-600 dark:text-navy-400 text-sm leading-relaxed mb-5">
                {member.description}
              </p>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-navy-600 dark:text-navy-300">
                  <Award className="w-4 h-4 text-gold-500" />
                  {member.nmls}
                </div>
                <a href={`tel:${member.phone.replace(/\D/g, "")}`} className="flex items-center gap-2 text-sm text-navy-600 dark:text-navy-300 hover:text-gold-500 transition-colors">
                  <Phone className="w-4 h-4 text-gold-500" />
                  {member.phone}
                </a>
                <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-sm text-navy-600 dark:text-navy-300 hover:text-gold-500 transition-colors">
                  <Mail className="w-4 h-4 text-gold-500" />
                  {member.email}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
