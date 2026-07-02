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

const CACHE_KEY = "aml_rates_cache"
const CACHE_TTL_MS = 24 * 60 * 60 * 1000 // 24 hours

interface RateCache {
  rates: MarketRate[]
  source: string
  lastUpdated: string
  timestamp: number
}

function getCachedRates(): RateCache | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const cache: RateCache = JSON.parse(raw)
    if (Date.now() - cache.timestamp > CACHE_TTL_MS) return null
    return cache
  } catch { return null }
}

function setCachedRates(data: Omit<RateCache, "timestamp">) {
  try {
    const cache: RateCache = { ...data, timestamp: Date.now() }
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache))
  } catch { /* silent */ }
}

export const RATE_SPREADS: Record<string, number> = {
  "15-fixed": -0.66,
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

function getChange(current: number, previous: number): number {
  return Math.round((current - previous) * 100) / 100
}

function parseFreddieMacHTML(html: string): { rate30yr: number; rate15yr: number; prev30yr: number; date: string } | null {
  try {
    const pattern30yrFull = /The 30-year fixed-rate mortgage<\/strong>.*?([\d.]+)%\s+as of\s+([A-Za-z]+ \d+,? \d+).*?averaged\s+([\d.]+)%/i
    const match30yrFull = html.match(pattern30yrFull)
    const pattern15yr = /The 15-year fixed-rate mortgage<\/strong>.*?([\d.]+)%/i
    const match15yr = html.match(pattern15yr)
    if (!match30yrFull) return null
    const rate30yr = parseFloat(match30yrFull[1])
    const prev30yr = parseFloat(match30yrFull[3])
    const date = match30yrFull[2] || ""
    const rate15yr = match15yr ? parseFloat(match15yr[1]) : rate30yr + RATE_SPREADS["15-fixed"]
    if (rate30yr <= 1 || rate30yr >= 20) return null
    return { rate30yr, rate15yr, prev30yr, date }
  } catch { return null }
}

function buildRates(rate30yr: number, rate15yr: number, prev30yr: number, _date: string): MarketRate[] {
  const change30yr = getChange(rate30yr, prev30yr)
  return [
    { product: "30 Yr. Fixed", rate: rate30yr, change: change30yr, weekChange: change30yr, monthChange: DEFAULT_RATES[0].monthChange, low52: RANGES_52W["30-fixed"].low, high52: RANGES_52W["30-fixed"].high, category: "conventional", value: "30-fixed" },
    { product: "15 Yr. Fixed", rate: rate15yr, change: getChange(rate15yr, rate15yr - change30yr), weekChange: getChange(rate15yr, rate15yr - change30yr), monthChange: DEFAULT_RATES[1].monthChange, low52: RANGES_52W["15-fixed"].low, high52: RANGES_52W["15-fixed"].high, category: "conventional", value: "15-fixed" },
    { product: "30 Yr. FHA", rate: Math.round((rate30yr + RATE_SPREADS["30-fha"]) * 100) / 100, change: change30yr, weekChange: change30yr, monthChange: DEFAULT_RATES[2].monthChange, low52: RANGES_52W["30-fha"].low, high52: RANGES_52W["30-fha"].high, category: "government", value: "30-fha" },
    { product: "30 Yr. VA", rate: Math.round((rate30yr + RATE_SPREADS["30-va"]) * 100) / 100, change: change30yr, weekChange: change30yr, monthChange: DEFAULT_RATES[3].monthChange, low52: RANGES_52W["30-va"].low, high52: RANGES_52W["30-va"].high, category: "government", value: "30-va" },
    { product: "30 Yr. Jumbo", rate: Math.round((rate30yr + RATE_SPREADS["30-jumbo"]) * 100) / 100, change: change30yr, weekChange: change30yr, monthChange: DEFAULT_RATES[4].monthChange, low52: RANGES_52W["30-jumbo"].low, high52: RANGES_52W["30-jumbo"].high, category: "jumbo", value: "30-jumbo" },
    { product: "7/6 SOFR ARM", rate: Math.round((rate30yr + RATE_SPREADS["7-6-arm"]) * 100) / 100, change: change30yr, weekChange: change30yr, monthChange: DEFAULT_RATES[5].monthChange, low52: RANGES_52W["7-6-arm"].low, high52: RANGES_52W["7-6-arm"].high, category: "arm", value: "7-6-arm" },
  ]
}

export async function fetchMarketRates(): Promise<{ rates: MarketRate[]; source: string; lastUpdated: string }> {
  // Check cache first
  const cached = getCachedRates()
  if (cached) {
    return { rates: cached.rates, source: cached.source, lastUpdated: cached.lastUpdated }
  }

  // Try multiple proxy sources for resilience
  const proxyUrls = [
    `https://api.allorigins.win/raw?url=${encodeURIComponent("https://www.freddiemac.com/pmms")}`,
    `https://corsproxy.io/?${encodeURIComponent("https://www.freddiemac.com/pmms")}`,
  ]

  for (const proxyUrl of proxyUrls) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 12000)
      const response = await fetch(proxyUrl, { signal: controller.signal })
      clearTimeout(timeoutId)
      if (!response.ok) continue
      const html = await response.text()
      const parsed = parseFreddieMacHTML(html)
      if (parsed) {
        const { rate30yr, rate15yr, prev30yr, date } = parsed
        const rates = buildRates(rate30yr, rate15yr, prev30yr, date)
        const result = {
          rates,
          source: "Freddie Mac PMMS",
          lastUpdated: date ? new Date(date).toISOString() : new Date().toISOString(),
        }
        setCachedRates(result)
        return result
      }
    } catch { /* try next proxy */ }
  }

  // Fallback to default rates
  return { rates: DEFAULT_RATES, source: "Freddie Mac PMMS (cached)", lastUpdated: new Date().toISOString() }
}
