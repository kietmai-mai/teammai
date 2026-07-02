// GET /api/rates - Returns current mortgage rates (cached or fresh)
const { getRates } = require('../lib/scraper');

module.exports = async (req, res) => {
  // Enable CORS for your frontend domain
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
    const result = await getRates();
    res.status(200).json(result);
  } catch (err) {
    console.error('[API /rates] Error:', err);
    res.status(500).json({
      error: 'Failed to fetch rates',
      message: err.message,
    });
  }
};
