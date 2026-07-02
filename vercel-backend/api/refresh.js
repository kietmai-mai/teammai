// GET /api/refresh - Forces a fresh scrape of mortgage rates
// Called by Vercel cron job daily at 9 AM ET
const { scrapeRates } = require('../lib/scraper');

module.exports = async (req, res) => {
  // Enable CORS
  const allowedOrigins = [
    'https://2ikoyafdtdu7k.kimi.page',
    'https://hoang-website.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000',
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    console.log('[Cron] Running scheduled rate refresh...');
    const result = await scrapeRates();
    console.log(`[Cron] Refresh complete. Source: ${result.source}`);
    res.status(200).json({
      ...result,
      refreshed: true,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('[API /refresh] Error:', err);
    res.status(500).json({
      error: 'Failed to refresh rates',
      message: err.message,
    });
  }
};
