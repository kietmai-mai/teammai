// Mortgage rate scraper for MortgageNewsDaily
// Works server-side where CORS is not an issue

const cheerio = require('cheerio');

const MND_URL = 'https://www.mortgagenewsdaily.com/mortgage-rates';

// Fallback rates when scraping fails
const fallbackRates = [
  { product: '30 Yr. Fixed', rate: 6.32, change: 0.07, weekChange: 0.07, monthChange: -0.32, low52: 5.99, high52: 7.08, category: 'conventional', value: '30-fixed' },
  { product: '15 Yr. Fixed', rate: 5.92, change: 0.06, weekChange: 0.06, monthChange: -0.23, low52: 5.55, high52: 6.39, category: 'conventional', value: '15-fixed' },
  { product: '30 Yr. FHA', rate: 5.91, change: 0.07, weekChange: 0.07, monthChange: -0.19, low52: 5.62, high52: 6.53, category: 'government', value: '30-fha' },
  { product: '30 Yr. VA', rate: 5.93, change: 0.07, weekChange: 0.07, monthChange: -0.19, low52: 5.64, high52: 6.54, category: 'government', value: '30-va' },
  { product: '30 Yr. Jumbo', rate: 6.52, change: -0.01, weekChange: 0.00, monthChange: -0.13, low52: 6.10, high52: 7.15, category: 'jumbo', value: '30-jumbo' },
  { product: '7/6 SOFR ARM', rate: 5.95, change: -0.01, weekChange: 0.01, monthChange: -0.36, low52: 5.29, high52: 6.63, category: 'arm', value: '7-6-arm' },
];

// In-memory cache (persists as long as function is warm)
let cachedRates = null;
let lastFetchTime = null;

async function scrapeRates() {
  try {
    const fetch = (await import('node-fetch')).default;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(MND_URL, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`MND returned ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const rates = [];

    // Look for rate data in the page
    // MND typically has rate data in specific elements
    const rateTexts = [];

    // Try to find rate values from the page text
    const pageText = $('body').text();

    // Extract rates using regex patterns
    const patterns = [
      { product: '30 Yr. Fixed', value: '30-fixed', category: 'conventional', regex: /30[\s-]*(?:Year|Yr)[\s.]*Fixed[\s\S]{0,200}?([\d.]+)\s*%/i },
      { product: '15 Yr. Fixed', value: '15-fixed', category: 'conventional', regex: /15[\s-]*(?:Year|Yr)[\s.]*Fixed[\s\S]{0,200}?([\d.]+)\s*%/i },
      { product: '30 Yr. FHA', value: '30-fha', category: 'government', regex: /30[\s-]*(?:Year|Yr)[\s.]*FHA[\s\S]{0,200}?([\d.]+)\s*%/i },
      { product: '30 Yr. VA', value: '30-va', category: 'government', regex: /30[\s-]*(?:Year|Yr)[\s.]*VA[\s\S]{0,200}?([\d.]+)\s*%/i },
      { product: '30 Yr. Jumbo', value: '30-jumbo', category: 'jumbo', regex: /30[\s-]*(?:Year|Yr)[\s.]*Jumbo[\s\S]{0,200}?([\d.]+)\s*%/i },
      { product: '7/6 SOFR ARM', value: '7-6-arm', category: 'arm', regex: /(?:7[/\s]6|7-6)[\s\S]{0,100}?ARM[\s\S]{0,200}?([\d.]+)\s*%/i },
    ];

    for (const p of patterns) {
      const match = pageText.match(p.regex);
      if (match) {
        const rate = parseFloat(match[1]);
        if (rate > 1 && rate < 20) {
          const fallback = fallbackRates.find(f => f.product === p.product);
          rates.push({
            product: p.product,
            rate,
            change: fallback?.change ?? 0,
            weekChange: fallback?.weekChange ?? 0,
            monthChange: fallback?.monthChange ?? 0,
            low52: fallback?.low52 ?? 5.5,
            high52: fallback?.high52 ?? 7.5,
            category: p.category,
            value: p.value,
          });
        }
      }
    }

    // If we got at least 3 rates, consider it a success
    if (rates.length >= 3) {
      // Fill in any missing rates from fallback
      for (const fallback of fallbackRates) {
        if (!rates.find(r => r.product === fallback.product)) {
          // Derive from 30yr fixed rate if available
          const rate30yr = rates.find(r => r.product === '30 Yr. Fixed');
          if (rate30yr) {
            const spreads = { '15-fixed': -0.40, '30-fha': -0.41, '30-va': -0.39, '30-jumbo': 0.20, '7-6-arm': -0.37 };
            const spread = spreads[fallback.value] || 0;
            rates.push({
              ...fallback,
              rate: Math.round((rate30yr.rate + spread) * 100) / 100,
            });
          } else {
            rates.push(fallback);
          }
        }
      }

      // Sort to match fallback order
      const order = fallbackRates.map(f => f.product);
      rates.sort((a, b) => order.indexOf(a.product) - order.indexOf(b.product));

      cachedRates = rates;
      lastFetchTime = Date.now();
      return { rates, source: 'mortgagenewsdaily.com', lastUpdated: new Date().toISOString() };
    }

    throw new Error('Could not extract enough rate data from page');
  } catch (err) {
    console.error('[Scraper] Error:', err.message);
    return {
      rates: fallbackRates,
      source: 'mortgagenewsdaily.com (fallback)',
      lastUpdated: new Date().toISOString(),
      error: err.message,
    };
  }
}

async function getRates() {
  // If we have cached rates from less than 24 hours ago, return them
  if (cachedRates && lastFetchTime && (Date.now() - lastFetchTime) < 24 * 60 * 60 * 1000) {
    return {
      rates: cachedRates,
      source: 'mortgagenewsdaily.com (cached)',
      lastUpdated: new Date(lastFetchTime).toISOString(),
    };
  }

  // Otherwise, scrape fresh
  return scrapeRates();
}

module.exports = { scrapeRates, getRates };
