"use client"

import { useState, useEffect, useMemo, useRef, lazy, Suspense } from "react"
import { Link } from "react-router-dom"
import {
  ArrowLeft,
  Phone,
  ArrowRight,
  TrendingDown,
  DollarSign,
  Clock,
  Home,
  Calculator,
  Sparkles,
  AlertTriangle,
  Star,
  ChevronRight,
  Target,
  Zap,
  Shield,
  Download,
  Mail,
  User,
  CheckCircle,
  X,
} from "lucide-react"
import { fetchMarketRates, DEFAULT_RATES } from "@/lib/rates"
import type { MarketRate } from "@/lib/rates"

const RefinanceCharts = lazy(() => import("@/components/RefinanceCharts"))

/* ─── formatters ─── */
const fmtCur = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n)
const fmtCurP = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n)

/* ─── mortgage math ─── */
function calcMonthlyPayment(principal: number, rate: number, years: number): number {
  if (rate === 0 || years === 0) return principal / (years * 12)
  const r = rate / 100 / 12
  const n = years * 12
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
}
function calcTotalInterest(principal: number, rate: number, years: number): number {
  return calcMonthlyPayment(principal, rate, years) * years * 12 - principal
}
function calcCumulativeSavings(balance: number, oldRate: number, oldYears: number, newRate: number, newYears: number, closingCosts: number) {
  const data: { year: number; savings: number }[] = []
  const oldMonthly = calcMonthlyPayment(balance, oldRate, oldYears)
  const newMonthly = calcMonthlyPayment(balance, newRate, newYears)
  let cumulative = -closingCosts
  for (let y = 1; y <= 30; y++) {
    cumulative += (oldMonthly - newMonthly) * 12
    if (y <= newYears) data.push({ year: y, savings: Math.max(0, cumulative) })
  }
  return data
}
function calcBreakeven(balance: number, oldRate: number, oldYears: number, newRate: number, newYears: number, closingCosts: number): number {
  const oldMonthly = calcMonthlyPayment(balance, oldRate, oldYears)
  const newMonthly = calcMonthlyPayment(balance, newRate, newYears)
  if (newMonthly >= oldMonthly) return 0
  return Math.ceil(closingCosts / (oldMonthly - newMonthly))
}

const COLORS = { gold: "#C9A962", navy: "#102A43", green: "#10B981", lightGold: "#E8D5A3" }

const BENEFITS = [
  { title: "Save Hundreds of Thousands", desc: "Lower your rate and keep more money in your pocket", icon: DollarSign },
  { title: "Own Your Home Sooner", desc: "Shorter terms mean faster payoff", icon: Home },
  { title: "Reduce Financial Stress", desc: "Lower monthly payments free up your budget", icon: Shield },
  { title: "Build Equity Faster", desc: "More of each payment goes toward principal", icon: TrendingDown },
]

/* ─── Slider Component ─── */
function Slider({ label, value, min, max, step, onChange, prefix = "", suffix = "" }: {
  label: string; value: number; min: number; max: number; step: number
  onChange: (v: number) => void; prefix?: string; suffix?: string
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-navy-700 dark:text-navy-200">{label}</label>
        <span className="text-sm font-bold text-gold-600 dark:text-gold-400">{prefix}{value.toLocaleString()}{suffix}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-navy-100 dark:bg-navy-700 rounded-full appearance-none cursor-pointer accent-gold-500" />
      <div className="flex justify-between text-[10px] text-navy-400">
        <span>{prefix}{min.toLocaleString()}{suffix}</span>
        <span>{prefix}{max.toLocaleString()}{suffix}</span>
      </div>
    </div>
  )
}

/* ─── PDF Generator ─── */
async function generateRefinancePDF(inputs: { name: string; email: string }, calc: CalcData) {
  const jspdf = await import("jspdf")
  const { jsPDF } = jspdf
  const doc = new jsPDF({ unit: "pt", format: "letter" })
  let y = 40

  doc.setFontSize(22); doc.setTextColor(16, 42, 67); doc.text("AML Funding - Refinance Savings Estimate", 40, y); y += 30
  doc.setFontSize(10); doc.setTextColor(100, 100, 100); doc.text(`Prepared for: ${inputs.name} | ${new Date().toLocaleDateString()}`, 40, y); y += 16
  doc.text(`Loan Officer: Mai Hoang NMLS #2180679 | teammai@absoluteml.com | (814) 386-7005`, 40, y); y += 28

  doc.setFontSize(14); doc.setTextColor(16, 42, 67); doc.text("Loan Details", 40, y); y += 16
  doc.setDrawColor(201, 169, 98); doc.setLineWidth(1); doc.line(40, y, 200, y); y += 18

  const details = [
    ["Current Loan Balance:", fmtCur(calc.balance)],
    ["Current Interest Rate:", `${calc.oldRate.toFixed(2)}%`],
    ["Years Left:", `${calc.oldYearsLeft} years`],
    ["New Interest Rate:", `${calc.newRate.toFixed(2)}%`],
    ["New Loan Term:", `${calc.newTerm} years`],
    ["Closing Costs:", fmtCur(calc.closingCosts)],
  ]
  doc.setFontSize(10)
  details.forEach(([label, value]) => { doc.setTextColor(80, 80, 80); doc.text(label, 40, y); doc.setTextColor(16, 42, 67); doc.text(value, 200, y); y += 16 })
  y += 12

  doc.setFillColor(16, 42, 67); doc.rect(40, y - 10, 280, 110, "F")
  doc.setTextColor(255, 255, 255); doc.setFontSize(11); doc.text("YOUR SAVINGS SUMMARY", 55, y + 10)
  doc.setFontSize(24); doc.setTextColor(201, 169, 98); doc.text(fmtCurP(calc.monthlySavings) + "/mo", 55, y + 40)
  doc.setFontSize(11); doc.setTextColor(200, 200, 200); doc.text(`Total Lifetime Savings: ${fmtCur(calc.totalSavings)}`, 55, y + 58)
  doc.setFontSize(9); doc.text(`Break-even: ${calc.breakeven} months | Interest Saved: ${fmtCur(Math.max(0, calc.oldTotalInterest - calc.newTotalInterest))}`, 55, y + 74)
  y += 120

  doc.setTextColor(16, 42, 67); doc.setFontSize(14); doc.text("Current vs. New Loan Comparison", 40, y); y += 16
  doc.setDrawColor(201, 169, 98); doc.line(40, y, 310, y); y += 18

  doc.setFontSize(10)
  const compHeader = ["", "Current Loan", "New Loan"]
  doc.setTextColor(100, 100, 100); compHeader.forEach((h, i) => doc.text(h, 40 + i * 150, y)); y += 16
  ;[["Monthly P&I:", fmtCurP(calc.oldMonthly), fmtCurP(calc.newMonthly)],
    ["Total Interest:", fmtCur(calc.oldTotalInterest), fmtCur(calc.newTotalInterest)],
    ["Payoff Year:", String(calc.oldPayoffYear), String(calc.payoffYear)],
  ].forEach(([label, oldV, newV]) => {
    doc.setTextColor(80, 80, 80); doc.text(label, 40, y)
    doc.setTextColor(200, 50, 50); doc.text(oldV, 190, y)
    doc.setTextColor(16, 42, 67); doc.text(newV, 340, y)
    y += 16
  })
  y += 16

  doc.setFontSize(8); doc.setTextColor(120, 120, 120)
  const disc = "This estimate is for informational purposes only and not a commitment to lend. Actual rates and terms depend on credit profile, loan amount, property type, and other factors. Rates from Freddie Mac Primary Mortgage Market Survey. Contact AML Funding at (814) 386-7005 for a personalized quote."
  doc.text(doc.splitTextToSize(disc, 500), 40, y)
  y += 50
  doc.setFontSize(9); doc.setTextColor(80, 80, 80)
  doc.text("Mai Hoang | NMLS #2180679 | Absolute Mortgage & Lending", 40, y); y += 14
  doc.text("(814) 386-7005 | teammai@absoluteml.com | 600 Washington Ave, Philadelphia, PA 19147", 40, y); y += 14
  doc.text("CO-NMLS #1910591", 40, y)

  doc.save(`AML-Funding-Refinance-Estimate-${inputs.name.replace(/\s+/g, "-")}-${new Date().toISOString().split("T")[0]}.pdf`)
}

interface CalcData {
  balance: number; oldRate: number; oldYearsLeft: number; newRate: number; newTerm: number
  closingCosts: number; oldMonthly: number; newMonthly: number; monthlySavings: number
  oldTotalInterest: number; newTotalInterest: number; totalSavings: number; breakeven: number
  payoffYear: number; oldPayoffYear: number
}

export default function RefinancePage() {
  const [balance, setBalance] = useState(400000)
  const [oldRate, setOldRate] = useState(7.0)
  const [oldYearsLeft, setOldYearsLeft] = useState(28)
  const [newTerm, setNewTerm] = useState(30)
  const [closingCosts, setClosingCosts] = useState(6000)
  const [rates, setRates] = useState<MarketRate[]>(DEFAULT_RATES)
  const [lastUpdated, setLastUpdated] = useState("")

  /* ─── PDF state ─── */
  const [showPdfForm, setShowPdfForm] = useState(false)
  const [pdfName, setPdfName] = useState("")
  const [pdfEmail, setPdfEmail] = useState("")
  const [pdfSuccess, setPdfSuccess] = useState(false)
  const pdfFormRef = useRef<HTMLDivElement>(null)

  /* ─── load current rate (background, non-blocking) ─── */
  useEffect(() => {
    window.scrollTo(0, 0)
    // Fetch in background without blocking render
    fetchMarketRates().then((r) => {
      setRates(r.rates)
      setLastUpdated(new Date(r.lastUpdated).toLocaleDateString("en-US", { month: "short", day: "numeric" }))
    }).catch(() => {
      setLastUpdated(new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }))
    })
  }, [])

  const current30yr = rates.find((r) => r.value === "30-fixed")?.rate ?? 6.30

  /* ─── derived calculations ─── */
  const calc: CalcData = useMemo(() => {
    const oldMonthly = calcMonthlyPayment(balance, oldRate, oldYearsLeft)
    const newMonthly = calcMonthlyPayment(balance, current30yr, newTerm)
    const monthlySavings = Math.max(0, oldMonthly - newMonthly)
    const oldTotalInterest = calcTotalInterest(balance, oldRate, oldYearsLeft)
    const newTotalInterest = calcTotalInterest(balance, current30yr, newTerm)
    const totalSavings = Math.max(0, oldTotalInterest - newTotalInterest - closingCosts)
    const breakeven = calcBreakeven(balance, oldRate, oldYearsLeft, current30yr, newTerm, closingCosts)
    return {
      balance, oldRate, oldYearsLeft, newRate: current30yr, newTerm, closingCosts,
      oldMonthly, newMonthly, monthlySavings, oldTotalInterest, newTotalInterest,
      totalSavings, breakeven, payoffYear: new Date().getFullYear() + newTerm,
      oldPayoffYear: new Date().getFullYear() + oldYearsLeft,
    }
  }, [balance, oldRate, oldYearsLeft, current30yr, newTerm, closingCosts])

  const chartData = useMemo(() => calcCumulativeSavings(balance, oldRate, oldYearsLeft, current30yr, newTerm, closingCosts),
    [balance, oldRate, oldYearsLeft, current30yr, newTerm, closingCosts])

  const barData = [
    { name: "Current", payment: Math.round(calc.oldMonthly), fill: COLORS.navy },
    { name: "New", payment: Math.round(calc.newMonthly), fill: COLORS.gold },
  ]
  const pieData = [
    { name: "Current Interest", value: Math.round(calc.oldTotalInterest) },
    { name: "New Interest", value: Math.round(calc.newTotalInterest) },
  ]
  // pieColors moved to lazy-loaded chart component

  /* ─── PDF handler ─── */
  const handlePDF = async () => {
    if (!pdfName.trim()) { alert("Please enter your full name."); return }
    if (!pdfEmail.trim() || !pdfEmail.includes("@")) { alert("Please enter a valid email address."); return }

    try {
      await generateRefinancePDF({ name: pdfName, email: pdfEmail }, calc)

      // Auto-send email
      const subject = `RadCRM - NEED RESPONSE- Prospect - Web - Refinance - ${pdfName}`
      const body =
        `New Refinance Inquiry from AML Funding Website\n\n` +
        `CLIENT INFORMATION:\n` +
        `Name: ${pdfName}\n` +
        `Email: ${pdfEmail}\n\n` +
        `REFINANCE DETAILS:\n` +
        `Current Balance: ${fmtCur(calc.balance)}\n` +
        `Current Rate: ${calc.oldRate.toFixed(2)}%\n` +
        `Years Left: ${calc.oldYearsLeft}\n` +
        `New Rate: ${calc.newRate.toFixed(2)}%\n` +
        `New Term: ${calc.newTerm} years\n` +
        `Closing Costs: ${fmtCur(calc.closingCosts)}\n\n` +
        `SAVINGS SUMMARY:\n` +
        `Monthly Savings: ${fmtCurP(calc.monthlySavings)}\n` +
        `Total Lifetime Savings: ${fmtCur(calc.totalSavings)}\n` +
        `Break-Even: ${calc.breakeven} months\n` +
        `Interest Saved: ${fmtCur(Math.max(0, calc.oldTotalInterest - calc.newTotalInterest))}\n\n` +
        `COMPARISON:\n` +
        `Current Monthly: ${fmtCurP(calc.oldMonthly)}\n` +
        `New Monthly: ${fmtCurP(calc.newMonthly)}\n` +
        `Current Payoff: ${calc.oldPayoffYear}\n` +
        `New Payoff: ${calc.payoffYear}\n\n` +
        `---\nGenerated via AML Funding Refinance Calculator\nPlease follow up within 24 hours.`

      try {
        await fetch("https://formspree.io/f/xpwqjgrv", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ _subject: subject, name: pdfName, email: pdfEmail, message: body, to: "teamMai@absoluteml.com" }),
        })
      } catch { window.open(`mailto:teamMai@absoluteml.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, "_blank") }

      setShowPdfForm(false)
      setPdfSuccess(true)
      setTimeout(() => setPdfSuccess(false), 4000)
    } catch (err) { console.error(err); alert("Error generating PDF. Please try again.") }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-cream via-white to-navy-50 dark:from-navy-950 dark:via-navy-900 dark:to-navy-950">

      {/* ═══ HERO ═══ */}
      <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-12 lg:pb-16 overflow-hidden">
        <div className="container-xl section-padding">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-navy-500 dark:text-navy-400 hover:text-gold-500 transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
            {/* Left: Poster */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-navy-100 dark:border-navy-700 shadow-2xl">
                <img src="/refinance-poster.jpg" alt="Refinance Your Home with Mai Hoang" className="w-full h-auto" loading="eager" fetchPriority="high" decoding="sync" />
              </div>
              <div className="absolute -bottom-3 -right-2 sm:right-4 bg-gold-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-bold">
                <Sparkles className="w-4 h-4" /> Refinance Hotline
              </div>
            </div>

            {/* Right: Headline */}
            <div className="space-y-4 lg:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-navy-100 dark:bg-navy-800/50 text-navy-700 dark:text-navy-300 rounded-full text-xs font-bold">
                <Zap className="w-3.5 h-3.5" /> SAVE HUNDREDS OF THOUSANDS
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 dark:text-white leading-[1.1]">
                <span className="text-navy-700 dark:text-navy-400">Refinance Today</span>
                <br />
                <span className="text-gradient-gold">Stop Waiting 30 More Years!</span>
              </h1>

              <p className="text-base sm:text-lg text-navy-600 dark:text-navy-300 leading-relaxed">
                From high 2025 rates to today's lows — see how much you can save with <strong className="text-navy-800 dark:text-white">Mai Hoang</strong>.
              </p>

              {/* Current Rate */}
              <div className="bg-white dark:bg-navy-800 rounded-xl border border-navy-100 dark:border-navy-700 p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingDown className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-navy-500 dark:text-navy-400">Current 30-Year Rate</p>
                  <p className="font-display text-3xl font-bold text-navy-900 dark:text-white">
                    {current30yr.toFixed(2)}%
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-xs text-navy-400 dark:text-navy-500">Updated {lastUpdated || "Today"}</p>
                  <p className="text-[10px] text-navy-400 dark:text-navy-500">Freddie Mac PMMS</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a href="tel:814-386-7005" className="btn-primary bg-navy-800 hover:bg-navy-900 px-6 py-3.5 text-base">
                  <Phone className="w-5 h-5" /> Call Mai: (814) 386-7005
                </a>
                <a href="https://prod.lendingpad.com/aml-funding-llc/pos#/?loid=ec869ca1-8887-4a66-a44e-67b05cdd9bca" target="_blank" rel="noopener noreferrer" className="btn-outline px-6 py-3.5 text-base">
                  Apply Now <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CALCULATOR ═══ */}
      <section className="py-12 lg:py-16 bg-white dark:bg-navy-900">
        <div className="container-xl section-padding">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-navy-600 font-semibold text-sm tracking-wider uppercase">Interactive Calculator</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900 dark:text-white mt-2 mb-3">
              Your <span className="text-gradient-gold">Refinance Savings</span>
            </h2>
            <p className="text-navy-500 dark:text-navy-400">Enter your details to see how much you could save</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
            {/* ─── Inputs ─── */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-cream dark:bg-navy-800 rounded-2xl border border-navy-100 dark:border-navy-700 p-5 sm:p-6 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <Calculator className="w-5 h-5 text-navy-600 dark:text-navy-400" />
                  <h3 className="font-display text-lg font-bold text-navy-800 dark:text-white">Your Loan Details</h3>
                </div>

                <Slider label="Current Loan Balance" value={balance} min={100000} max={2000000} step={10000} onChange={setBalance} prefix="$" />
                <Slider label="Current Interest Rate" value={oldRate} min={3} max={10} step={0.125} onChange={setOldRate} suffix="%" />
                <Slider label="Years Left on Current Loan" value={oldYearsLeft} min={1} max={30} step={1} onChange={setOldYearsLeft} suffix=" yrs" />

                <hr className="border-navy-100 dark:border-navy-700" />

                <div className="space-y-2">
                  <label className="text-sm font-medium text-navy-700 dark:text-navy-200">New Loan Term</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[15, 20, 30].map((term) => (
                      <button key={term} onClick={() => setNewTerm(term)} className={`py-2.5 rounded-lg text-sm font-bold transition-all ${newTerm === term ? "bg-gold-500 text-white shadow-md" : "bg-navy-100 dark:bg-navy-700 text-navy-600 dark:text-navy-300 hover:bg-navy-200 dark:hover:bg-navy-600"}`}>
                        {term} Yr
                      </button>
                    ))}
                  </div>
                </div>

                <Slider label="Estimated Closing Costs" value={closingCosts} min={0} max={20000} step={500} onChange={setClosingCosts} prefix="$" />

                <div className="bg-navy-50 dark:bg-navy-900/50 rounded-lg p-3">
                  <p className="text-xs font-semibold text-navy-600 dark:text-navy-300 mb-2">Quick Select: 2025 High Rate Scenarios</p>
                  <div className="flex gap-2">
                    {[7.0, 7.5, 8.0].map((r) => (
                      <button key={r} onClick={() => setOldRate(r)} className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-all ${oldRate === r ? "bg-navy-800 text-white" : "bg-white dark:bg-navy-700 text-navy-600 dark:text-navy-300 hover:bg-navy-100 dark:hover:bg-navy-800/30"}`}>
                        {r.toFixed(1)}%
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mai speech bubble */}
              <div className="bg-navy-50 dark:bg-navy-900/20 rounded-2xl border border-navy-100 dark:border-navy-800/30 p-5 flex gap-4">
                <img src="/mai-hoang-logo.jpg" alt="Mai Hoang" className="w-14 h-14 rounded-full object-cover border-2 border-gold-500 flex-shrink-0" loading="lazy" />
                <div>
                  <p className="text-sm font-semibold text-navy-800 dark:text-navy-300 mb-1">Mai Hoang</p>
                  <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-300 italic">
                    &ldquo;Hi, I&rsquo;m Mai Hoang &ndash; Let&rsquo;s calculate your exact savings and get you approved fast!&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* ─── Results ─── */}
            <div className="lg:col-span-8 space-y-6">
              {/* Hero numbers */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/10 rounded-xl p-4 border border-green-100 dark:border-green-800/30 text-center">
                  <p className="text-[10px] sm:text-xs text-green-600 dark:text-green-400 font-semibold uppercase tracking-wider mb-1">Monthly Savings</p>
                  <p className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-green-700 dark:text-green-300">{fmtCurP(calc.monthlySavings)}</p>
                </div>
                <div className="bg-gradient-to-br from-gold-50 to-amber-50 dark:from-gold-900/20 dark:to-amber-900/10 rounded-xl p-4 border border-gold-100 dark:border-gold-800/30 text-center">
                  <p className="text-[10px] sm:text-xs text-gold-600 dark:text-gold-400 font-semibold uppercase tracking-wider mb-1">Lifetime Savings</p>
                  <p className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-gold-700 dark:text-gold-300">{fmtCur(calc.totalSavings)}</p>
                </div>
                <div className="bg-gradient-to-br from-navy-50 to-blue-50 dark:from-navy-800/30 dark:to-blue-900/20 rounded-xl p-4 border border-navy-100 dark:border-navy-700/50 text-center">
                  <p className="text-[10px] sm:text-xs text-navy-600 dark:text-navy-400 font-semibold uppercase tracking-wider mb-1">Break-Even</p>
                  <p className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-navy-700 dark:text-navy-300">{calc.breakeven} mo</p>
                </div>
                <div className="bg-gradient-to-br from-navy-50 to-blue-50 dark:from-navy-800/30 dark:to-blue-900/20 rounded-xl p-4 border border-navy-100 dark:border-navy-700/50 text-center">
                  <p className="text-[10px] sm:text-xs text-navy-500 dark:text-navy-400 font-semibold uppercase tracking-wider mb-1">Interest Saved</p>
                  <p className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-navy-700 dark:text-navy-300">{fmtCur(Math.max(0, calc.oldTotalInterest - calc.newTotalInterest))}</p>
                </div>
              </div>

              {/* Side-by-side */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-navy-800 dark:bg-navy-900 rounded-xl p-5 text-white">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-red-400" />
                    <h4 className="font-display font-bold">Current Loan</h4>
                    <span className="ml-auto text-xs bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full">Old</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm"><span className="text-navy-300">Monthly P&I</span><span className="font-bold">{fmtCurP(calc.oldMonthly)}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-navy-300">Total Interest</span><span className="font-bold text-red-300">{fmtCur(calc.oldTotalInterest)}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-navy-300">Payoff Year</span><span className="font-bold">{calc.oldPayoffYear}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-navy-300">Interest Rate</span><span className="font-bold">{calc.oldRate.toFixed(2)}%</span></div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-gold-500/10 to-gold-600/5 dark:from-gold-900/30 dark:to-gold-800/20 rounded-xl p-5 border border-gold-200 dark:border-gold-800/30">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-gold-600 dark:text-gold-400" />
                    <h4 className="font-display font-bold text-navy-800 dark:text-white">New Loan</h4>
                    <span className="ml-auto text-xs bg-gold-500/20 text-gold-700 dark:text-gold-300 px-2 py-0.5 rounded-full">Refi</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm"><span className="text-navy-500 dark:text-navy-400">Monthly P&I</span><span className="font-bold text-navy-800 dark:text-white">{fmtCurP(calc.newMonthly)}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-navy-500 dark:text-navy-400">Total Interest</span><span className="font-bold text-green-600 dark:text-green-400">{fmtCur(calc.newTotalInterest)}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-navy-500 dark:text-navy-400">Payoff Year</span><span className="font-bold text-navy-800 dark:text-white">{calc.payoffYear}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-navy-500 dark:text-navy-400">Interest Rate</span><span className="font-bold text-gold-600 dark:text-gold-400">{calc.newRate.toFixed(2)}%</span></div>
                  </div>
                </div>
              </div>

              {/* Charts - lazy loaded */}
              <Suspense fallback={<div className="min-h-[200px] flex items-center justify-center"><div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" /></div>}>
                <RefinanceCharts barData={barData} pieData={pieData} chartData={chartData} closingCosts={calc.closingCosts} />
              </Suspense>

              {/* Break-even */}
              {calc.breakeven > 0 && (
                <div className="bg-gradient-to-r from-navy-800 to-navy-700 rounded-xl p-5 text-white flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-display text-lg font-bold">Break-even in {calc.breakeven} months</p>
                    <p className="text-sm text-navy-200">After that, every payment is pure savings! You will save {fmtCurP(calc.monthlySavings)} every month.</p>
                  </div>
                </div>
              )}

              {/* PDF Download Button */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => setShowPdfForm(true)}
                  className="btn-primary bg-navy-800 hover:bg-navy-900 px-6 py-3.5 text-base w-full sm:w-auto"
                >
                  <Download className="w-5 h-5" />
                  Download Your Savings Report (PDF)
                </button>
              </div>

              {/* PDF Email Form Modal */}
              {showPdfForm && (
                <div className="bg-white dark:bg-navy-800 rounded-2xl border border-navy-100 dark:border-navy-700 p-6 space-y-4 shadow-xl" ref={pdfFormRef}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold text-navy-800 dark:text-white flex items-center gap-2">
                      <Download className="w-5 h-5 text-gold-500" />
                      Download Your Refinance Report
                    </h3>
                    <button onClick={() => setShowPdfForm(false)} className="w-8 h-8 rounded-full bg-navy-100 dark:bg-navy-700 flex items-center justify-center text-navy-500 hover:text-red-500 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-navy-500 dark:text-navy-400">Enter your info to download a personalized PDF with your refinance savings analysis.</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-navy-700 dark:text-navy-200 flex items-center gap-1"><User className="w-3.5 h-3.5" /> Full Name *</label>
                      <input type="text" value={pdfName} onChange={(e) => setPdfName(e.target.value)} placeholder="John Smith" className="w-full input-field" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-navy-700 dark:text-navy-200 flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> Email *</label>
                      <input type="email" value={pdfEmail} onChange={(e) => setPdfEmail(e.target.value)} placeholder="john@email.com" className="w-full input-field" />
                    </div>
                  </div>
                  <button onClick={handlePDF} className="btn-primary bg-navy-800 hover:bg-navy-900 w-full py-3">
                    <Download className="w-5 h-5" /> Download PDF & Send to Team
                  </button>
                </div>
              )}

              {/* Success popup */}
              {pdfSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/50 backdrop-blur-sm">
                  <div className="bg-white dark:bg-navy-800 rounded-2xl p-8 border border-gold-200 dark:border-gold-800/30 shadow-2xl text-center max-w-sm mx-4 animate-crossfade">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-navy-800 dark:text-white mb-2">PDF Downloaded!</h3>
                    <p className="text-sm text-navy-500 dark:text-navy-400 mb-1">Your refinance report has been saved.</p>
                    <p className="text-xs text-navy-400 dark:text-navy-500">Our team will follow up with you shortly.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BENEFITS ═══ */}
      <section className="py-12 lg:py-16 bg-cream dark:bg-navy-950">
        <div className="container-xl section-padding">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-gold-500 font-semibold text-sm tracking-wider uppercase">Benefits</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900 dark:text-white mt-2">
              Why <span className="text-navy-600 dark:text-navy-400">Refinance?</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {BENEFITS.map((b) => {
              const Icon = b.icon
              return (
                <div key={b.title} className="bg-white dark:bg-navy-800 rounded-xl p-5 border border-navy-100 dark:border-navy-700 text-center hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-navy-100 dark:bg-navy-800/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-navy-600 dark:text-navy-400" />
                  </div>
                  <p className="font-semibold text-navy-800 dark:text-white text-sm mb-1">{b.title}</p>
                  <p className="text-xs text-navy-500 dark:text-navy-400">{b.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-12 lg:py-16 bg-navy-800 dark:bg-navy-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/40 to-navy-800/40" />
        <div className="container-xl section-padding relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
                Ready to <span className="text-gold-400">Save</span>?
              </h2>
              <p className="text-navy-300 text-base">
                Call Mai Hoang today to start your refinance journey. No hidden fees, no risk — just real savings!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a href="tel:814-386-7005" className="btn-primary bg-navy-800 hover:bg-navy-900 px-8 py-4 text-lg">
                  <Phone className="w-5 h-5" /> Call Mai: (814) 386-7005
                </a>
                <a href="https://prod.lendingpad.com/aml-funding-llc/pos#/?loid=ec869ca1-8887-4a66-a44e-67b05cdd9bca" target="_blank" rel="noopener noreferrer" className="btn-outline border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-navy-900 px-8 py-4 text-lg">
                  Apply Now <ChevronRight className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/5 rounded-xl p-5 border border-white/10">
              <img src="/mai-hoang-logo.jpg" alt="Mai Hoang" className="w-20 h-20 rounded-xl object-cover border-2 border-gold-500 flex-shrink-0" loading="lazy" />
              <div>
                <p className="font-display font-bold text-white text-lg">Mai Hoang</p>
                <p className="text-gold-400 text-sm">Mortgage Loan Originator | NMLS #2180679</p>
                <p className="text-navy-300 text-sm mt-1">Absolute Mortgage & Lending</p>
                <div className="flex items-center gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                  <span className="text-navy-300 text-xs ml-1">5.0 (26 Reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ DISCLAIMER ═══ */}
      <section className="py-8 bg-navy-900 dark:bg-navy-950 border-t border-navy-800">
        <div className="container-xl section-padding">
          <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 rounded-xl p-4">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                <strong>Disclaimer:</strong> The rates displayed are estimates for informational purposes only based on Freddie Mac&rsquo;s Primary Mortgage Market Survey. These are national average indices and <strong>not a commitment to lend</strong>. Your actual rate depends on credit profile, loan amount, property type, and other factors. Numbers shown are projections only. Contact Mai Hoang at (814) 386-7005 for a personalized rate quote.
              </p>
              <p className="text-xs text-amber-700 dark:text-amber-400 mt-2">
                Mai Hoang | NMLS #2180679 | Absolute Mortgage & Lending<br />
                (814) 386-7005 | teammai@absoluteml.com | 600 Washington Ave, Philadelphia, PA 19147<br />
                CO-NMLS #1910591
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
