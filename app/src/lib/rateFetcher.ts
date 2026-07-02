// Client-side rate fetcher
// Priority: Vercel backend API → Freddie Mac PMMS (weekly) → Fallback
//
// TO ENABLE DAILY RATES: Deploy the backend to Vercel
// 1. See /vercel-backend/README.md for instructions
// 2. Set VITE_API_URL=https://your-project.vercel.app
// 3. Rebuild and redeploy the frontend

const BACKEND_URL = import.meta.env.VITE_API_URL || '';

const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
const FREDDIE_MAC_URL = 'https://www.freddiemac.com/pmms';

const RATE_SPREADS: Record<string, number> = {
  '15-fixed': -0.55,
  '30-fha': -0.40,
  '30-va': -0.38,
  '30-jumbo': 0.18,
  '7-6-arm': -0.38,
};

const RANGES_52W: Record<string, { low: number; high: number }> = {
  '30-fixed': { low: 5.99, high: 7.08 },
  '15-fixed': { low: 5.40, high: 6.35 },
  '30-fha': { low: 5.62, high: 6.53 },
  '30-va': { low: 5.64, high: 6.54 },
  '30-jumbo': { low: 6.10, high: 7.15 },
  '7-6-arm': { low: 5.29, high: 6.63 },
};

export interface MarketRate {
  product: string;
  rate: number;
  change: number;
  weekChange: number;
  monthChange: number;
  low52: number;
  high52: number;
  category: string;
  value: string;
}

export const FALLBACK_RATES: MarketRate[] = [
  { product: '30 Yr. Fixed', rate: 6.30, change: 0.07, weekChange: 0.07, monthChange: -0.32, low52: 5.99, high52: 7.08, category: 'conventional', value: '30-fixed' },
  { product: '15 Yr. Fixed', rate: 5.64, change: 0.06, weekChange: 0.06, monthChange: -0.23, low52: 5.40, high52: 6.35, category: 'conventional', value: '15-fixed' },
  { product: '30 Yr. FHA', rate: 5.90, change: 0.07, weekChange: 0.07, monthChange: -0.19, low52: 5.62, high52: 6.53, category: 'government', value: '30-fha' },
  { product: '30 Yr. VA', rate: 5.92, change: 0.07, weekChange: 0.07, monthChange: -0.19, low52: 5.64, high52: 6.54, category: 'government', value: '30-va' },
  { product: '30 Yr. Jumbo', rate: 6.48, change: 0.07, weekChange: 0.07, monthChange: -0.13, low52: 6.10, high52: 7.15, category: 'jumbo', value: '30-jumbo' },
  { product: '7/6 SOFR ARM', rate: 5.92, change: 0.07, weekChange: 0.07, monthChange: -0.36, low52: 5.29, high52: 6.63, category: 'arm', value: '7-6-arm' },
];

function getChange(current: number, previous: number): number {
  return Math.round((current - previous) * 100) / 100;
}

// Try to fetch from Vercel backend
async function fetchFromBackend(endpoint: string): Promise<any | null> {
  if (!BACKEND_URL) return null;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    const response = await fetch(`${BACKEND_URL}${endpoint}`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

// Fetch from Freddie Mac PMMS via CORS proxy
async function fetchFromFreddieMac(): Promise<any | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);
    const response = await fetch(`${CORS_PROXY}${encodeURIComponent(FREDDIE_MAC_URL)}`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (!response.ok) return null;
    const html = await response.text();
    return parseFreddieMacHTML(html);
  } catch {
    return null;
  }
}

function parseFreddieMacHTML(html: string): any | null {
  try {
    const pattern30yrFull = /The 30-year fixed-rate mortgage<\/strong>.*?([\d.]+)%\s+as of\s+([A-Za-z]+ \d+,? \d+).*?averaged\s+([\d.]+)%/i;
    const match30yrFull = html.match(pattern30yrFull);
    const pattern15yr = /The 15-year fixed-rate mortgage<\/strong>.*?([\d.]+)%/i;
    const match15yr = html.match(pattern15yr);

    if (!match30yrFull) return null;

    const rate30yr = parseFloat(match30yrFull[1]);
    const prev30yr = parseFloat(match30yrFull[3]);
    const date = match30yrFull[2] || '';
    const rate15yr = match15yr ? parseFloat(match15yr[1]) : rate30yr + RATE_SPREADS['15-fixed'];

    if (rate30yr <= 1 || rate30yr >= 20) return null;

    return { rate30yr, rate15yr, prev30yr, date };
  } catch {
    return null;
  }
}

function buildRatesFromData(rate30yr: number, rate15yr: number, prev30yr: number, date: string, source: string) {
  const change30yr = getChange(rate30yr, prev30yr);
  const rateFHA = Math.round((rate30yr + RATE_SPREADS['30-fha']) * 100) / 100;
  const rateVA = Math.round((rate30yr + RATE_SPREADS['30-va']) * 100) / 100;
  const rateJumbo = Math.round((rate30yr + RATE_SPREADS['30-jumbo']) * 100) / 100;
  const rateARM = Math.round((rate30yr + RATE_SPREADS['7-6-arm']) * 100) / 100;

  return {
    rates: [
      { product: '30 Yr. Fixed', rate: rate30yr, change: change30yr, weekChange: change30yr, monthChange: FALLBACK_RATES[0].monthChange, low52: RANGES_52W['30-fixed'].low, high52: RANGES_52W['30-fixed'].high, category: 'conventional', value: '30-fixed' },
      { product: '15 Yr. Fixed', rate: rate15yr, change: getChange(rate15yr, rate15yr - change30yr), weekChange: getChange(rate15yr, rate15yr - change30yr), monthChange: FALLBACK_RATES[1].monthChange, low52: RANGES_52W['15-fixed'].low, high52: RANGES_52W['15-fixed'].high, category: 'conventional', value: '15-fixed' },
      { product: '30 Yr. FHA', rate: rateFHA, change: change30yr, weekChange: change30yr, monthChange: FALLBACK_RATES[2].monthChange, low52: RANGES_52W['30-fha'].low, high52: RANGES_52W['30-fha'].high, category: 'government', value: '30-fha' },
      { product: '30 Yr. VA', rate: rateVA, change: change30yr, weekChange: change30yr, monthChange: FALLBACK_RATES[3].monthChange, low52: RANGES_52W['30-va'].low, high52: RANGES_52W['30-va'].high, category: 'government', value: '30-va' },
      { product: '30 Yr. Jumbo', rate: rateJumbo, change: change30yr, weekChange: change30yr, monthChange: FALLBACK_RATES[4].monthChange, low52: RANGES_52W['30-jumbo'].low, high52: RANGES_52W['30-jumbo'].high, category: 'jumbo', value: '30-jumbo' },
      { product: '7/6 SOFR ARM', rate: rateARM, change: change30yr, weekChange: change30yr, monthChange: FALLBACK_RATES[5].monthChange, low52: RANGES_52W['7-6-arm'].low, high52: RANGES_52W['7-6-arm'].high, category: 'arm', value: '7-6-arm' },
    ],
    source,
    lastUpdated: date ? new Date(date).toISOString() : new Date().toISOString(),
  };
}

export async function fetchMarketRates(): Promise<{ rates: MarketRate[]; source: string; lastUpdated: string }> {
  // Priority 1: Vercel backend (daily rates from MND)
  if (BACKEND_URL) {
    const backendData = await fetchFromBackend('/api/rates');
    if (backendData && backendData.rates && backendData.rates.length > 0) {
      return {
        rates: backendData.rates,
        source: backendData.source || 'mortgagenewsdaily.com',
        lastUpdated: backendData.lastUpdated || new Date().toISOString(),
      };
    }
  }

  // Priority 2: Freddie Mac PMPS (weekly, official)
  const fmac = await fetchFromFreddieMac();
  if (fmac) {
    return buildRatesFromData(fmac.rate30yr, fmac.rate15yr, fmac.prev30yr, fmac.date, 'Freddie Mac PMMS');
  }

  // Priority 3: Fallback
  return {
    rates: FALLBACK_RATES,
    source: 'Freddie Mac PMMS (cached)',
    lastUpdated: new Date().toISOString(),
  };
}
