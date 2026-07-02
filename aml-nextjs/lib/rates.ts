export interface MarketRate {
  product: string
  rate: number
  change: number
  weekChange: number
  monthChange: number
  low52: number
  high52: number
  category: string
  value: string
}

export const DEFAULT_RATES: MarketRate[] = [
  { product: "30 Yr. Fixed", rate: 6.30, change: 0.07, weekChange: 0.07, monthChange: -0.32, low52: 5.99, high52: 7.08, category: "conventional", value: "30-fixed" },
  { product: "15 Yr. Fixed", rate: 5.64, change: 0.06, weekChange: 0.06, monthChange: -0.23, low52: 5.40, high52: 6.35, category: "conventional", value: "15-fixed" },
  { product: "30 Yr. FHA", rate: 5.90, change: 0.07, weekChange: 0.07, monthChange: -0.19, low52: 5.62, high52: 6.53, category: "government", value: "30-fha" },
  { product: "30 Yr. VA", rate: 5.92, change: 0.07, weekChange: 0.07, monthChange: -0.19, low52: 5.64, high52: 6.54, category: "government", value: "30-va" },
  { product: "30 Yr. Jumbo", rate: 6.48, change: 0.07, weekChange: 0.07, monthChange: -0.13, low52: 6.10, high52: 7.15, category: "jumbo", value: "30-jumbo" },
  { product: "7/6 SOFR ARM", rate: 5.92, change: 0.07, weekChange: 0.07, monthChange: -0.36, low52: 5.29, high52: 6.63, category: "arm", value: "7-6-arm" },
]

export const RATE_SPREADS: Record<string, number> = {
  "15-fixed": -0.55,
  "30-fha": -0.40,
  "30-va": -0.38,
  "30-jumbo": 0.18,
  "7-6-arm": -0.38,
}

export const RANGES_52W: Record<string, { low: number; high: number }> = {
  "30-fixed": { low: 5.99, high: 7.08 },
  "15-fixed": { low: 5.40, high: 6.35 },
  "30-fha": { low: 5.62, high: 6.53 },
  "30-va": { low: 5.64, high: 6.54 },
  "30-jumbo": { low: 6.10, high: 7.15 },
  "7-6-arm": { low: 5.29, high: 6.63 },
}

export function getChange(current: number, previous: number): number {
  return Math.round((current - previous) * 100) / 100
}

export const LOAN_PROGRAMS = [
  {
    title: "Conventional",
    subtitle: "Fixed & Adjustable",
    description: "Fixed and adjustable rate mortgage options for qualified buyers.",
    features: ["Down payment as low as 3%", "No mortgage insurance with 20% down", "Fixed and adjustable rate options", "Loan amounts up to $766,550", "Primary, second homes, and investment"],
    requirements: ["Minimum 620 credit score", "Debt-to-income ratio under 43%", "Stable employment history", "PMI required under 20% down"],
    cta: "Apply Now",
    ctaLink: "https://prod.lendingpad.com/aml-funding-llc/pos#/?loid=ec869ca1-8887-4a66-a44e-67b05cdd9bca",
  },
  {
    title: "FHA",
    subtitle: "Federal Housing Administration",
    description: "Government-backed loans with flexible qualification requirements.",
    features: ["Down payment as low as 3.5%", "Credit scores down to 580", "Seller can pay closing costs", "Higher debt-to-income allowed", "Streamlined refinancing available"],
    requirements: ["Primary residence only", "Upfront mortgage insurance premium", "Annual mortgage insurance", "Property must meet FHA standards"],
    cta: "Apply Now",
    ctaLink: "https://prod.lendingpad.com/aml-funding-llc/pos#/?loid=ec869ca1-8887-4a66-a44e-67b05cdd9bca",
  },
  {
    title: "VA",
    subtitle: "Veterans Affairs",
    description: "Zero down payment loans for eligible veterans and active military.",
    features: ["No down payment required", "No monthly mortgage insurance", "Competitive interest rates", "Flexible credit requirements", "Can be used multiple times"],
    requirements: ["VA Certificate of Eligibility", "Primary residence only", "Meet VA residual income requirements", "Satisfactory credit history"],
    cta: "Apply Now",
    ctaLink: "https://prod.lendingpad.com/aml-funding-llc/pos#/?loid=ec869ca1-8887-4a66-a44e-67b05cdd9bca",
  },
  {
    title: "Non-QM",
    subtitle: "Non-Qualified Mortgage",
    description: "Flexible loan programs for borrowers with unique financial situations.",
    features: ["No traditional income docs required", "Bank statement loans available", "DSCR loans for investors", "Asset depletion programs", "Interest-only options"],
    requirements: ["Higher down payment (10-25%)", "Strong compensating factors", "Alternative documentation", "Reserves required"],
    cta: "Apply Now",
    ctaLink: "https://prod.lendingpad.com/aml-funding-llc/pos#/?loid=ec869ca1-8887-4a66-a44e-67b05cdd9bca",
  },
  {
    title: "DSCR",
    subtitle: "Debt Service Coverage Ratio",
    description: "Investment property loans based on rental income, not personal income.",
    features: ["No personal income verification", "Based on property cash flow", "Unlimited cash-out", "Short-term rental eligible", "Portfolio loans available"],
    requirements: ["Minimum DSCR ratio of 1.0", "Investment property only", "6 months reserves required", "Minimum 620 credit score"],
    cta: "Apply Now",
    ctaLink: "https://prod.lendingpad.com/aml-funding-llc/pos#/?loid=ec869ca1-8887-4a66-a44e-67b05cdd9bca",
  },
  {
    title: "Bank Statement",
    subtitle: "Self-Employed Program",
    description: "Use bank statements instead of tax returns to qualify.",
    features: ["12 or 24 month bank statements", "No tax returns required", "Personal or business accounts", "Up to 90% LTV", "Purchase and refinance"],
    requirements: ["Self-employed for 2+ years", "Minimum 660 credit score", "10-20% down payment", "Reserves required"],
    cta: "Apply Now",
    ctaLink: "https://prod.lendingpad.com/aml-funding-llc/pos#/?loid=ec869ca1-8887-4a66-a44e-67b05cdd9bca",
  },
]

export const RECENT_DEALS = [
  {
    title: "First-Time Homebuyer",
    subtitle: "Just Funded - Philadelphia Rowhome",
    location: "Philadelphia, PA 19148",
    description: "Beautifully renovated rowhome funded for a first-time homebuyer.",
    loanAmount: 425000,
    closedDate: "March 2025",
    type: "Conventional",
    status: "Successfully Funded",
  },
  {
    title: "Cash-Out Refinance",
    subtitle: "Cash Out Refi Success",
    location: "Philadelphia, PA",
    description: "No tax return program - helped client access equity.",
    loanAmount: 380000,
    closedDate: "February 2025",
    type: "Cash-Out Refi",
    status: "Successfully Funded",
  },
  {
    title: "First Home Purchase",
    subtitle: "Client Testimonial - First Home",
    location: "Delaware County, PA",
    description: "5-star review from a happy first-time homeowner!",
    loanAmount: 350000,
    closedDate: "February 2025",
    type: "Conventional",
    status: "Successfully Funded",
  },
  {
    title: "Fast Close",
    subtitle: "Clear to Close - 13 Days!",
    location: "Montgomery County, PA",
    description: "Saved the transaction - client almost lost EMD.",
    loanAmount: 520000,
    closedDate: "February 2025",
    type: "Conventional",
    status: "Successfully Funded",
  },
  {
    title: "First-Time Homebuyer Success",
    subtitle: "Modern Townhouse",
    location: "Philadelphia, PA 19122",
    description: "Modern townhouse closed and funded for young professional.",
    loanAmount: 295000,
    closedDate: "January 2025",
    type: "FHA",
    status: "Successfully Funded",
  },
  {
    title: "VA Loan",
    subtitle: "Closed & Funded - Family Home",
    location: "Bucks County, PA",
    description: "Helped a veteran family achieve their homeownership dream.",
    loanAmount: 485000,
    closedDate: "January 2025",
    type: "VA",
    status: "Successfully Funded",
  },
]
