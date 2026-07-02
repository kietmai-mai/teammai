require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const cron = require('node-cron');

const app = express();
const PORT = process.env.PORT || 3001;

const RATES_FILE = path.join(__dirname, 'rates.json');

const DEFAULT_RATES = [
  { product: '30 Yr. Fixed', rate: 6.45, change: -0.05, low52: 5.99, high52: 7.08, category: 'conventional', value: '30-fixed' },
  { product: '15 Yr. Fixed', rate: 6.01, change: -0.02, low52: 5.55, high52: 6.39, category: 'conventional', value: '15-fixed' },
  { product: '30 Yr. FHA', rate: 5.95, change: -0.05, low52: 5.62, high52: 6.53, category: 'government', value: '30-fha' },
  { product: '30 Yr. VA', rate: 5.97, change: -0.05, low52: 5.64, high52: 6.54, category: 'government', value: '30-va' },
  { product: '30 Yr. Jumbo', rate: 6.60, change: 0.00, low52: 6.10, high52: 7.15, category: 'jumbo', value: '30-jumbo' },
  { product: '7/6 SOFR ARM', rate: 6.13, change: 0.01, low52: 5.29, high52: 6.63, category: 'arm', value: '7-6-arm' },
];

function getDefaultLow52(product) {
  const r = DEFAULT_RATES.find(r => r.product === product);
  return r ? r.low52 : 5.0;
}

function getDefaultHigh52(product) {
  const r = DEFAULT_RATES.find(r => r.product === product);
  return r ? r.high52 : 7.5;
}

function getDefaultValue(product) {
  const r = DEFAULT_RATES.find(r => r.product === product);
  return r ? r.value : '30-fixed';
}

function getDefaultCategory(product) {
  const r = DEFAULT_RATES.find(r => r.product === product);
  return r ? r.category : 'conventional';
}

// Middleware
app.use(cors({ origin: '*', methods: ['POST', 'GET'], allowedHeaders: ['Content-Type'] }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// ─── RATE SCRAPER ───
async function scrapeRates() {
  try {
    console.log('[Scraper] Fetching from MortgageNewsDaily...');
    const { data: html } = await axios.get('https://www.mortgagenewsdaily.com/mortgage-rates', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      timeout: 15000,
    });

    const $ = cheerio.load(html);
    const bodyText = $('body').text();
    const rates = [];

    // Define patterns for each rate product
    const patterns = [
      { regex: /30\s*Yr\.?\s*Fixed[^\d]*([\d\.]+)%/, product: '30 Yr. Fixed', value: '30-fixed', category: 'conventional' },
      { regex: /15\s*Yr\.?\s*Fixed[^\d]*([\d\.]+)%/, product: '15 Yr. Fixed', value: '15-fixed', category: 'conventional' },
      { regex: /30\s*Yr\.?\s*FHA[^\d]*([\d\.]+)%/, product: '30 Yr. FHA', value: '30-fha', category: 'government' },
      { regex: /30\s*Yr\.?\s*VA[^\d]*([\d\.]+)%/, product: '30 Yr. VA', value: '30-va', category: 'government' },
      { regex: /30\s*Yr\.?\s*Jumbo[^\d]*([\d\.]+)%/, product: '30 Yr. Jumbo', value: '30-jumbo', category: 'jumbo' },
      { regex: /(?:7[/\-]6|SOFR|ARM)[^\d]*([\d\.]+)%/, product: '7/6 SOFR ARM', value: '7-6-arm', category: 'arm' },
    ];

    for (const p of patterns) {
      const match = bodyText.match(p.regex);
      if (match) {
        const rate = parseFloat(match[1]);
        // Find change indicator nearby
        const contextStart = Math.max(0, bodyText.indexOf(match[0]) - 50);
        const contextEnd = bodyText.indexOf(match[0]) + match[0].length + 50;
        const context = bodyText.substring(contextStart, contextEnd);
        const changeMatch = context.match(/([\+\-]\d+\.\d+)/);
        const change = changeMatch ? parseFloat(changeMatch[1]) : 0;

        rates.push({
          product: p.product,
          rate,
          change,
          low52: getDefaultLow52(p.product),
          high52: getDefaultHigh52(p.product),
          category: p.category,
          value: p.value,
        });
      }
    }

    // If we got at least 3 rates, save them
    if (rates.length >= 3) {
      const rateData = {
        rates,
        lastUpdated: new Date().toISOString(),
        source: 'mortgagenewsdaily.com',
      };
      fs.writeFileSync(RATES_FILE, JSON.stringify(rateData, null, 2));
      console.log(`[Scraper] Saved ${rates.length} rates`);
      return rates;
    }

    console.log('[Scraper] Could not parse enough rates, using defaults');
    return DEFAULT_RATES;
  } catch (err) {
    console.error('[Scraper] Error:', err.message);
    return DEFAULT_RATES;
  }
}

function loadRates() {
  try {
    if (fs.existsSync(RATES_FILE)) {
      const data = JSON.parse(fs.readFileSync(RATES_FILE, 'utf8'));
      // Check if rates are from today
      const lastUpdated = new Date(data.lastUpdated);
      const now = new Date();
      const isToday = lastUpdated.toDateString() === now.toDateString();
      
      if (isToday && data.rates && data.rates.length > 0) {
        console.log('[Rates] Loaded cached rates from today');
        return data.rates;
      }
    }
  } catch (err) {
    console.error('[Rates] Error loading cached rates:', err.message);
  }
  return DEFAULT_RATES;
}

// ─── SCHEDULED SCRAPER ───
// Run at 9:00 AM ET every day
cron.schedule('0 9 * * *', async () => {
  console.log('[Cron] Running daily rate scrape...');
  await scrapeRates();
});

// Also scrape on startup
scrapeRates();

// ─── API ENDPOINTS ───

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/rates', (req, res) => {
  const rates = loadRates();
  res.json({
    rates,
    lastUpdated: fs.existsSync(RATES_FILE)
      ? JSON.parse(fs.readFileSync(RATES_FILE, 'utf8')).lastUpdated
      : new Date().toISOString(),
    source: 'mortgagenewsdaily.com',
  });
});

// Force refresh endpoint
app.get('/api/rates/refresh', async (req, res) => {
  const rates = await scrapeRates();
  res.json({
    rates,
    lastUpdated: new Date().toISOString(),
    source: 'mortgagenewsdaily.com',
    message: 'Rates refreshed successfully',
  });
});

// ─── EMAIL SERVICE ───
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || 'teammai.amlllc@gmail.com',
    pass: process.env.EMAIL_PASS || '',
  },
});

app.post('/api/send-scenario', async (req, res) => {
  try {
    const { clientName, clientEmail, clientPhone, loanType, monthlyPayment, ...rest } = req.body;
    if (!clientEmail || !clientName) {
      return res.status(400).json({ error: 'Client name and email are required' });
    }

    const mailOptions = {
      from: `"AML Funding" <${process.env.EMAIL_USER || 'teammai.amlllc@gmail.com'}>`,
      to: clientEmail,
      cc: 'teammai.amlllc@gmail.com',
      replyTo: 'teammai.amlllc@gmail.com',
      subject: `Your AML Funding Mortgage Scenario Estimate - ${clientName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1A3A52; padding: 20px; text-align: center;">
            <h1 style="color: #C9A962; margin: 0; font-size: 24px;">AML FUNDING</h1>
            <p style="color: #fff; margin: 5px 0 0; font-size: 14px;">Absolute Mortgage & Lending</p>
            <p style="color: #C9A962; margin: 2px 0 0; font-size: 12px;">CO-NMLS #1910591</p>
          </div>
          <div style="padding: 20px; background: #fff;">
            <h2 style="color: #1A3A52;">Hello ${clientName},</h2>
            <p style="color: #333; line-height: 1.6;">Thank you for using the AML Funding Mortgage Calculator.</p>
            <div style="background: #F8F6F3; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1A3A52; margin-top: 0;">Loan Summary</h3>
              <p><strong>Loan Type:</strong> ${loanType || 'N/A'}</p>
              <p><strong>Est. Monthly:</strong> $${monthlyPayment || 'N/A'}</p>
            </div>
            <div style="background: #1A3A52; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
              <p style="color: #C9A962; margin: 0;">ESTIMATED MONTHLY PAYMENT</p>
              <p style="color: #fff; margin: 5px 0 0; font-size: 24px; font-weight: bold;">$${monthlyPayment || 'N/A'}</p>
            </div>
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://prod.lendingpad.com/aml-funding-llc/pos#/?loid=ec869ca1-8887-4a66-a44e-67b05cdd9bca" style="background: #C9A962; color: #fff; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Apply Now</a>
              <a href="https://link.theradcrm.com/widget/booking/IMM4hHx1gyfTUveXoiiU" style="background: #1A3A52; color: #fff; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; margin-left: 10px;">Schedule a Call</a>
            </div>
            <p style="color: #333; font-size: 14px;">Contact: teammai.amlllc@gmail.com | (814) 386-7005</p>
          </div>
          <div style="background: #1A3A52; padding: 15px; text-align: center;">
            <p style="color: #fff; margin: 0; font-size: 12px;">\u00A9 ${new Date().getFullYear()} AML Funding LLC | CO-NMLS #1910591</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

app.post('/api/send-contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const mailOptions = {
      from: `"AML Funding Website" <${process.env.EMAIL_USER || 'teammai.amlllc@gmail.com'}>`,
      to: 'teammai.amlllc@gmail.com',
      cc: 'teammai.amlllc@gmail.com',
      replyTo: email,
      subject: `New Website Contact Form - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
          <h2 style="color: #1A3A52;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <div style="background: #F8F6F3; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <p><strong>Message:</strong></p>
            <p>${message || 'No message provided'}</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to send contact form', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`AML Funding Backend running on port ${PORT}`);
  console.log(`Health: http://localhost:${PORT}/api/health`);
  console.log(`Rates: http://localhost:${PORT}/api/rates`);
  console.log(`Rates Refresh: http://localhost:${PORT}/api/rates/refresh`);
});
