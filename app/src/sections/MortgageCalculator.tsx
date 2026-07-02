"use client"

import { useState, useEffect, useCallback } from "react"
import { Calculator, Download, Mail, DollarSign, Percent, Clock, ChevronDown, ChevronUp, CheckCircle, Loader2 } from "lucide-react"
import { DEFAULT_RATES, fetchMarketRates, type MarketRate } from "@/lib/rates"

interface Inputs {
  homeValue: number; downPaymentPercent: number; downPaymentAmount: number;
  loanAmount: number; interestRate: number; loanTerm: number;
  propertyTax: number; homeInsurance: number; hoaFees: number;
  loanType: string; clientName: string; clientEmail: string; clientPhone: string;
}

const defaultInputs: Inputs = {
  homeValue: 400000, downPaymentPercent: 20, downPaymentAmount: 80000,
  loanAmount: 320000, interestRate: 6.30, loanTerm: 30,
  propertyTax: 4800, homeInsurance: 1200, hoaFees: 0,
  loanType: "30-fixed", clientName: "", clientEmail: "", clientPhone: "",
}

let ratePresets = DEFAULT_RATES.map((r) => ({ label: r.product, rate: r.rate, value: r.value }))

interface Result {
  principalInterest: number; monthlyTax: number; monthlyInsurance: number;
  monthlyHOA: number; totalMonthly: number; totalInterest: number;
  totalCost: number; payoffDate: string; loanToValue: number;
}

function fmtCur(v: number) { return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(v) }
function fmtCurP(v: number) { return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v) }

export function MortgageCalculator() {
  const [inputs, setInputs] = useState<Inputs>(defaultInputs)
  const [result, setResult] = useState<Result | null>(null)
  const [showAmort, setShowAmort] = useState(false)
  const [schedule, setSchedule] = useState<Array<{month:number;payment:number;principal:number;interest:number;balance:number}>>([])
  const [showSuccess, setShowSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const calculate = useCallback(() => {
    const principal = inputs.loanAmount
    const monthlyRate = inputs.interestRate / 100 / 12
    const numPayments = inputs.loanTerm * 12
    let monthlyPI = 0
    if (inputs.interestRate === 0) { monthlyPI = principal / numPayments }
    else { monthlyPI = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1) }
    const monthlyTax = inputs.propertyTax / 12
    const monthlyInsurance = inputs.homeInsurance / 12
    const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance + inputs.hoaFees
    const totalInterest = monthlyPI * numPayments - principal
    const totalCost = principal + totalInterest + inputs.propertyTax * inputs.loanTerm + inputs.homeInsurance * inputs.loanTerm + inputs.hoaFees * numPayments
    const payoffDate = new Date()
    payoffDate.setMonth(payoffDate.getMonth() + numPayments)
    const ltv = (inputs.loanAmount / inputs.homeValue) * 100
    setResult({ principalInterest: monthlyPI, monthlyTax, monthlyInsurance, monthlyHOA: inputs.hoaFees, totalMonthly, totalInterest, totalCost, payoffDate: payoffDate.toLocaleDateString("en-US", { month: "long", year: "numeric" }), loanToValue: ltv })
    const newSched = []
    let balance = principal
    for (let m = 1; m <= Math.min(numPayments, 360); m++) {
      const intPmt = balance * monthlyRate
      const prinPmt = monthlyPI - intPmt
      balance -= prinPmt
      if (balance < 0) balance = 0
      newSched.push({ month: m, payment: monthlyPI, principal: prinPmt, interest: intPmt, balance: Math.max(balance, 0) })
      if (balance <= 0) break
    }
    setSchedule(newSched)
  }, [inputs])

  useEffect(() => { calculate() }, [calculate])

  // Fetch dynamic rates on mount and update calculator
  useEffect(() => {
    async function loadRates() {
      try {
        const result = await fetchMarketRates()
        if (result.rates && result.rates.length > 0) {
          ratePresets = result.rates.map((r: MarketRate) => ({ label: r.product, rate: r.rate, value: r.value }))
          // Update current interest rate to match the fetched rate for selected loan type
          setInputs((prev) => {
            const currentPreset = ratePresets.find((p) => p.value === prev.loanType)
            if (currentPreset) {
              return { ...prev, interestRate: currentPreset.rate }
            }
            return prev
          })
        }
      } catch (err) {
        console.warn("Rate fetch failed in calculator, using defaults:", err)
      }
    }
    loadRates()
  }, [])

  const handleChange = (field: keyof Inputs, value: string | number) => {
    setInputs((prev) => {
      const next = { ...prev, [field]: value }
      if (field === "homeValue") { next.downPaymentAmount = Math.round(next.homeValue * (next.downPaymentPercent / 100)); next.loanAmount = next.homeValue - next.downPaymentAmount }
      else if (field === "downPaymentPercent") { next.downPaymentAmount = Math.round(next.homeValue * (next.downPaymentPercent / 100)); next.loanAmount = next.homeValue - next.downPaymentAmount }
      else if (field === "downPaymentAmount") { next.downPaymentPercent = Math.round((next.downPaymentAmount / next.homeValue) * 100 * 100) / 100; next.loanAmount = next.homeValue - next.downPaymentAmount }
      return next
    })
  }

  const handleLoanType = (value: string) => {
    const preset = ratePresets.find((p) => p.value === value)
    if (preset) setInputs((prev) => ({ ...prev, loanType: value, interestRate: preset.rate }))
  }

  const handlePDF = async () => {
    if (!result) return
    if (!inputs.clientName.trim()) { alert("Please enter your full name before downloading the PDF."); return }
    if (!inputs.clientEmail.trim() || !inputs.clientEmail.includes("@")) { alert("Please enter a valid email address before downloading the PDF."); return }
    setIsLoading(true)
    try {
      const jspdf = await import("jspdf")
      const { jsPDF } = jspdf
      const doc = new jsPDF({ unit: "pt", format: "letter" })
      let y = 40
      doc.setFontSize(22); doc.setTextColor(26, 58, 82); doc.text("AML Funding - Mortgage Estimate", 40, y); y += 30
      doc.setFontSize(10); doc.setTextColor(100, 100, 100); doc.text(`Prepared for: ${inputs.clientName || "Client"} | ${new Date().toLocaleDateString()}`, 40, y); y += 16
      doc.text(`Loan Officer: Mai Hoang NMLS #2180679 | teammai@absoluteml.com | (814) 386-7005`, 40, y); y += 30
      doc.setFontSize(14); doc.setTextColor(26, 58, 82); doc.text("Loan Details", 40, y); y += 16
      doc.setDrawColor(201, 169, 98); doc.setLineWidth(1); doc.line(40, y, 200, y); y += 18
      const details = [
        ["Home Value:", fmtCur(inputs.homeValue)], ["Down Payment:", `${inputs.downPaymentPercent}% (${fmtCur(inputs.downPaymentAmount)})`],
        ["Loan Amount:", fmtCur(inputs.loanAmount)], ["Interest Rate:", `${inputs.interestRate.toFixed(2)}%`],
        ["Loan Term:", `${inputs.loanTerm} years`], ["Loan Type:", ratePresets.find((p) => p.value === inputs.loanType)?.label || "30 Yr. Fixed"],
        ["LTV Ratio:", `${result.loanToValue.toFixed(1)}%`],
      ]
      doc.setFontSize(10)
      details.forEach(([label, value]) => { doc.setTextColor(80, 80, 80); doc.text(label, 40, y); doc.setTextColor(26, 58, 82); doc.text(value, 200, y); y += 16 })
      y += 16
      doc.setFillColor(26, 58, 82); doc.rect(40, y - 10, 270, 90, "F")
      doc.setTextColor(255, 255, 255); doc.setFontSize(11); doc.text("TOTAL MONTHLY PAYMENT", 55, y + 10)
      doc.setFontSize(28); doc.setTextColor(201, 169, 98); doc.text(fmtCurP(result.totalMonthly), 55, y + 42)
      doc.setTextColor(200, 200, 200); doc.setFontSize(9); doc.text(`Payoff Date: ${result.payoffDate}`, 55, y + 60)
      y += 100
      doc.setTextColor(26, 58, 82); doc.setFontSize(14); doc.text("Monthly Payment Breakdown", 40, y); y += 16
      doc.setDrawColor(201, 169, 98); doc.line(40, y, 250, y); y += 18
      const breakdown = [
        ["Principal & Interest:", fmtCurP(result.principalInterest)], ["Property Tax:", fmtCurP(result.monthlyTax)],
        ["Home Insurance:", fmtCurP(result.monthlyInsurance)], ...(inputs.hoaFees > 0 ? [["HOA Fees:", fmtCurP(result.monthlyHOA)]] : []),
      ]
      doc.setFontSize(10)
      breakdown.forEach(([label, value]) => { doc.setTextColor(80, 80, 80); doc.text(label, 40, y); doc.setTextColor(26, 58, 82); doc.text(value, 220, y); y += 16 })
      y += 16
      doc.setFontSize(8); doc.setTextColor(120, 120, 120)
      const disclaimer = "This estimate is for informational purposes only and not a commitment to lend. Actual rates and terms depend on credit profile, loan amount, property type, and other factors. Contact AML Funding at (814) 386-7005 for a personalized quote."
      doc.text(doc.splitTextToSize(disclaimer, 500), 40, y)
      doc.save(`AML-Funding-Estimate-${inputs.clientName || "Client"}-${new Date().toISOString().split("T")[0]}.pdf`)

      // Auto-send email to teamMai@absoluteml.com
      await sendLeadToTeam(inputs, result)

      setShowSuccess(true); setTimeout(() => setShowSuccess(false), 4000)
    } catch (err) { console.error(err); alert("Error generating PDF. Please try again.") }
    finally { setIsLoading(false) }
  }

  async function sendLeadToTeam(inputs: Inputs, result: Result) {
    const loanTypeLabel = ratePresets.find((p) => p.value === inputs.loanType)?.label || "30 Yr. Fixed"
    const subject = `RadCRM - NEED RESPONSE- Prospect - Web - ${inputs.clientName || "New Lead"}`
    const body =
      `New Prospect Inquiry from AML Funding Website\n\n` +
      `CLIENT INFORMATION:\n` +
      `Name: ${inputs.clientName || "N/A"}\n` +
      `Email: ${inputs.clientEmail || "N/A"}\n` +
      `Phone: ${inputs.clientPhone || "N/A"}\n\n` +
      `LOAN DETAILS:\n` +
      `Home Value: ${fmtCur(inputs.homeValue)}\n` +
      `Down Payment: ${inputs.downPaymentPercent}% (${fmtCur(inputs.downPaymentAmount)})\n` +
      `Loan Amount: ${fmtCur(inputs.loanAmount)}\n` +
      `Interest Rate: ${inputs.interestRate.toFixed(2)}%\n` +
      `Loan Term: ${inputs.loanTerm} years\n` +
      `Loan Type: ${loanTypeLabel}\n` +
      `LTV Ratio: ${result.loanToValue.toFixed(1)}%\n\n` +
      `MONTHLY PAYMENT BREAKDOWN:\n` +
      `Total Monthly Payment: ${fmtCurP(result.totalMonthly)}\n` +
      `Principal & Interest: ${fmtCurP(result.principalInterest)}\n` +
      `Property Tax: ${fmtCurP(result.monthlyTax)}\n` +
      `Home Insurance: ${fmtCurP(result.monthlyInsurance)}\n` +
      `${inputs.hoaFees > 0 ? `HOA Fees: ${fmtCurP(result.monthlyHOA)}\n` : ""}` +
      `\nTotal Interest Over Life of Loan: ${fmtCur(result.totalInterest)}\n` +
      `Payoff Date: ${result.payoffDate}\n\n` +
      `---\n` +
      `Generated via AML Funding Website Calculator\n` +
      `Please follow up within 24 hours.`

    // Try Formspree first, fallback to mailto
    try {
      await fetch("https://formspree.io/f/xpwqjgrv", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: subject,
          name: inputs.clientName,
          email: inputs.clientEmail,
          phone: inputs.clientPhone,
          message: body,
          to: "teamMai@absoluteml.com",
        }),
      })
    } catch {
      // Fallback: open mailto
      const mailtoSubject = encodeURIComponent(subject)
      const mailtoBody = encodeURIComponent(body)
      window.open(`mailto:teamMai@absoluteml.com?subject=${mailtoSubject}&body=${mailtoBody}`, "_blank")
    }
  }

  const handleEmail = () => {
    if (!result) return
    const loanTypeLabel = ratePresets.find((p) => p.value === inputs.loanType)?.label || "30 Yr. Fixed"
    const subject = encodeURIComponent(`Mortgage Estimate - ${inputs.clientName || "Client Inquiry"}`)
    const body = encodeURIComponent(
      `Hello AML Funding Team,\n\n` +
      `Please find my mortgage estimate details below:\n\n` +
      `Client: ${inputs.clientName || "N/A"}\nEmail: ${inputs.clientEmail || "N/A"}\nPhone: ${inputs.clientPhone || "N/A"}\n\n` +
      `Loan Details:\n- Home Value: ${fmtCur(inputs.homeValue)}\n- Down Payment: ${inputs.downPaymentPercent}% (${fmtCur(inputs.downPaymentAmount)})\n` +
      `- Loan Amount: ${fmtCur(inputs.loanAmount)}\n- Interest Rate: ${inputs.interestRate.toFixed(2)}%\n` +
      `- Loan Term: ${inputs.loanTerm} years\n- Loan Type: ${loanTypeLabel}\n- LTV: ${result.loanToValue.toFixed(1)}%\n\n` +
      `Monthly Payment: ${fmtCurP(result.totalMonthly)}\nTotal Interest: ${fmtCur(result.totalInterest)}\n\n` +
      `Please contact me to discuss next steps.\n\nGenerated via AML Funding Calculator`
    )
    window.open(`mailto:Mai.Hoang@absoluteml.com?cc=teammai@absoluteml.com&subject=${subject}&body=${body}`, "_blank")
    setShowSuccess(true); setTimeout(() => setShowSuccess(false), 4000)
  }

  return (
    <section id="calculator" className="py-16 lg:py-20 bg-white dark:bg-navy-950">
      <div className="container-xl section-padding">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-gold-500 font-semibold text-sm tracking-wider uppercase">Plan Your Payment</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-navy-900 dark:text-white mt-3 mb-4">Mortgage <span className="text-gradient-gold">Calculator</span></h2>
          <p className="text-navy-600 dark:text-navy-400">Estimate your monthly payment and explore different loan scenarios.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-2 bg-cream dark:bg-navy-900 rounded-2xl p-6 sm:p-8 border border-navy-100 dark:border-navy-800">
            <h3 className="font-display text-2xl font-bold text-navy-800 dark:text-white mb-6 flex items-center gap-2">
              <Calculator className="w-6 h-6 text-gold-500" /> Loan Details
            </h3>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-navy-700 dark:text-navy-300 mb-2">Loan Program</label>
                <select value={inputs.loanType} onChange={(e) => handleLoanType(e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-navy-800 border border-navy-200 dark:border-navy-700 rounded-lg text-navy-800 dark:text-white focus:ring-2 focus:ring-gold-500 outline-none">
                  {ratePresets.map((p) => <option key={p.value} value={p.value}>{p.label} ({p.rate.toFixed(2)}%)</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 dark:text-navy-300 mb-2">Home Value</label>
                <div className="relative"><DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
                  <input type="number" value={inputs.homeValue} onChange={(e) => handleChange("homeValue", Number(e.target.value))} className="w-full pl-10 pr-4 py-3 bg-white dark:bg-navy-800 border border-navy-200 dark:border-navy-700 rounded-lg text-navy-800 dark:text-white focus:ring-2 focus:ring-gold-500 outline-none" /></div>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 dark:text-navy-300 mb-2">Down Payment %</label>
                <div className="relative"><Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
                  <input type="number" value={inputs.downPaymentPercent} onChange={(e) => handleChange("downPaymentPercent", Number(e.target.value))} className="w-full pl-10 pr-4 py-3 bg-white dark:bg-navy-800 border border-navy-200 dark:border-navy-700 rounded-lg text-navy-800 dark:text-white focus:ring-2 focus:ring-gold-500 outline-none" /></div>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 dark:text-navy-300 mb-2">Interest Rate</label>
                <div className="relative"><Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
                  <input type="number" step="0.01" value={inputs.interestRate} onChange={(e) => handleChange("interestRate", Number(e.target.value))} className="w-full pl-10 pr-4 py-3 bg-white dark:bg-navy-800 border border-navy-200 dark:border-navy-700 rounded-lg text-navy-800 dark:text-white focus:ring-2 focus:ring-gold-500 outline-none" /></div>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 dark:text-navy-300 mb-2">Loan Term</label>
                <div className="relative"><Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
                  <select value={inputs.loanTerm} onChange={(e) => handleChange("loanTerm", Number(e.target.value))} className="w-full pl-10 pr-4 py-3 bg-white dark:bg-navy-800 border border-navy-200 dark:border-navy-700 rounded-lg text-navy-800 dark:text-white focus:ring-2 focus:ring-gold-500 outline-none appearance-none">
                    <option value={30}>30 Years</option><option value={20}>20 Years</option><option value={15}>15 Years</option><option value={10}>10 Years</option>
                  </select></div>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 dark:text-navy-300 mb-2">Annual Property Tax</label>
                <div className="relative"><DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
                  <input type="number" value={inputs.propertyTax} onChange={(e) => handleChange("propertyTax", Number(e.target.value))} className="w-full pl-10 pr-4 py-3 bg-white dark:bg-navy-800 border border-navy-200 dark:border-navy-700 rounded-lg text-navy-800 dark:text-white focus:ring-2 focus:ring-gold-500 outline-none" /></div>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 dark:text-navy-300 mb-2">Annual Insurance</label>
                <div className="relative"><DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
                  <input type="number" value={inputs.homeInsurance} onChange={(e) => handleChange("homeInsurance", Number(e.target.value))} className="w-full pl-10 pr-4 py-3 bg-white dark:bg-navy-800 border border-navy-200 dark:border-navy-700 rounded-lg text-navy-800 dark:text-white focus:ring-2 focus:ring-gold-500 outline-none" /></div>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 dark:text-navy-300 mb-2">Monthly HOA</label>
                <div className="relative"><DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-400" />
                  <input type="number" value={inputs.hoaFees} onChange={(e) => handleChange("hoaFees", Number(e.target.value))} className="w-full pl-10 pr-4 py-3 bg-white dark:bg-navy-800 border border-navy-200 dark:border-navy-700 rounded-lg text-navy-800 dark:text-white focus:ring-2 focus:ring-gold-500 outline-none" /></div>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 dark:text-navy-300 mb-2">Your Name</label>
                <input type="text" value={inputs.clientName} onChange={(e) => handleChange("clientName", e.target.value)} placeholder="Full Name" className="w-full px-4 py-3 bg-white dark:bg-navy-800 border border-navy-200 dark:border-navy-700 rounded-lg text-navy-800 dark:text-white focus:ring-2 focus:ring-gold-500 outline-none placeholder:text-navy-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 dark:text-navy-300 mb-2">Email</label>
                <input type="email" value={inputs.clientEmail} onChange={(e) => handleChange("clientEmail", e.target.value)} placeholder="your@email.com" className="w-full px-4 py-3 bg-white dark:bg-navy-800 border border-navy-200 dark:border-navy-700 rounded-lg text-navy-800 dark:text-white focus:ring-2 focus:ring-gold-500 outline-none placeholder:text-navy-400" />
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            <div className="bg-navy-800 rounded-2xl p-6 text-white">
              <p className="text-navy-300 text-sm mb-1">Estimated Monthly Payment</p>
              <p className="font-display text-4xl font-bold text-gold-400">{result ? fmtCurP(result.totalMonthly) : "$0.00"}</p>
              <p className="text-navy-400 text-xs mt-1">{result ? `Principal & Interest: ${fmtCurP(result.principalInterest)}` : ""}</p>
            </div>
            <div className="bg-cream dark:bg-navy-900 rounded-2xl p-6 border border-navy-100 dark:border-navy-800 space-y-4">
              <h4 className="font-semibold text-navy-800 dark:text-white">Payment Breakdown</h4>
              {[{ label: "Principal & Interest", value: result?.principalInterest || 0 }, { label: "Property Tax", value: result?.monthlyTax || 0 }, { label: "Home Insurance", value: result?.monthlyInsurance || 0 }, ...(inputs.hoaFees > 0 ? [{ label: "HOA Fees", value: result?.monthlyHOA || 0 }] : [])].map((item) => (
                <div key={item.label} className="flex justify-between items-center py-2 border-b border-navy-100 dark:border-navy-800 last:border-0">
                  <span className="text-sm text-navy-600 dark:text-navy-400">{item.label}</span>
                  <span className="font-semibold text-navy-800 dark:text-white">{fmtCurP(item.value)}</span>
                </div>
              ))}
            </div>
            <div className="bg-cream dark:bg-navy-900 rounded-2xl p-6 border border-navy-100 dark:border-navy-800 space-y-3">
              <h4 className="font-semibold text-navy-800 dark:text-white">Loan Summary</h4>
              {[{ label: "Loan Amount", value: fmtCur(inputs.loanAmount) }, { label: "Down Payment", value: `${inputs.downPaymentPercent}% (${fmtCur(inputs.downPaymentAmount)})` }, { label: "Total Interest", value: result ? fmtCur(result.totalInterest) : "$0" }, { label: "LTV Ratio", value: result ? `${result.loanToValue.toFixed(1)}%` : "0%" }, { label: "Payoff Date", value: result?.payoffDate || "-" }].map((item) => (
                <div key={item.label} className="flex justify-between text-sm"><span className="text-navy-500 dark:text-navy-400">{item.label}</span><span className="font-medium text-navy-800 dark:text-white">{item.value}</span></div>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <button onClick={handlePDF} disabled={isLoading} className="btn-primary w-full">{isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}{isLoading ? "Generating..." : "Download PDF"}</button>
              <button onClick={handleEmail} className="btn-outline w-full"><Mail className="w-5 h-5" />Email to AML Team</button>
            </div>
            {schedule.length > 0 && (
              <button onClick={() => setShowAmort(!showAmort)} className="w-full flex items-center justify-between px-4 py-3 bg-navy-50 dark:bg-navy-800 rounded-lg text-sm font-medium text-navy-700 dark:text-navy-200 hover:bg-navy-100 dark:hover:bg-navy-700 transition-colors">
                <span>View Amortization Schedule</span>{showAmort ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>

        {showAmort && schedule.length > 0 && (
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="bg-navy-800 text-white"><th className="px-4 py-3 text-left rounded-tl-lg">Month</th><th className="px-4 py-3 text-right">Payment</th><th className="px-4 py-3 text-right">Principal</th><th className="px-4 py-3 text-right">Interest</th><th className="px-4 py-3 text-right rounded-tr-lg">Balance</th></tr></thead>
              <tbody>{schedule.map((row) => (<tr key={row.month} className="border-b border-navy-100 dark:border-navy-800 hover:bg-gold-500/5"><td className="px-4 py-2 text-navy-700 dark:text-navy-300">{row.month}</td><td className="px-4 py-2 text-right text-navy-800 dark:text-white">{fmtCurP(row.payment)}</td><td className="px-4 py-2 text-right text-emerald-600">{fmtCurP(row.principal)}</td><td className="px-4 py-2 text-right text-navy-500 dark:text-navy-400">{fmtCurP(row.interest)}</td><td className="px-4 py-2 text-right font-medium text-navy-800 dark:text-white">{fmtCurP(row.balance)}</td></tr>))}</tbody>
            </table>
          </div>
        )}

        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-navy-950/50 backdrop-blur-sm" onClick={() => setShowSuccess(false)} />
            <div className="relative bg-white dark:bg-navy-800 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-8 h-8 text-emerald-500" /></div>
              <h3 className="font-display text-2xl font-bold text-navy-800 dark:text-white mb-2">Success!</h3>
              <p className="text-navy-600 dark:text-navy-300 mb-6">Your mortgage estimate has been prepared. A copy has been sent to <strong>teammai@absoluteml.com</strong> so our team can follow up.</p>
              <button onClick={() => setShowSuccess(false)} className="btn-primary">Close</button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
