# AML Rates API - Vercel Deployment Guide

Daily mortgage rate scraper that fetches live rates from MortgageNewsDaily.com and serves them via a CORS-enabled API. Runs automatically every weekday at 9 AM ET via Vercel Cron Jobs.

---

## What This Does

- Scrapes MortgageNewsDaily.com for current mortgage rates (30yr Fixed, 15yr Fixed, FHA, VA, Jumbo, ARM)
- Caches rates for 24 hours to avoid repeated scraping
- Serves rates via `/api/rates` endpoint with CORS enabled for your frontend
- Auto-refreshes daily at 9 AM ET (Monday-Friday) via Vercel Cron
- Manual refresh available via `/api/refresh` endpoint

---

## Step-by-Step Deployment

### Step 1: Install Vercel CLI

```bash
npm i -g vercel
```

Or download from: https://vercel.com/download

### Step 2: Login to Vercel

```bash
vercel login
```

This will open a browser window to authenticate.

### Step 3: Deploy the Backend

Navigate to this folder (`vercel-backend/`) and run:

```bash
cd vercel-backend
vercel
```

You'll be prompted:
- **Set up and deploy?** → Type `Y`
- **Which scope?** → Select your account
- **Link to existing project?** → Type `N` (new project)
- **Project name** → Type `aml-rates-api`
- **Directory** → Press Enter (current directory)

Vercel will deploy and give you a URL like:
```
https://aml-rates-api.vercel.app
```

### Step 4: Verify the API Works

Test the rates endpoint:
```bash
curl https://aml-rates-api.vercel.app/api/rates
```

Test the refresh endpoint:
```bash
curl https://aml-rates-api.vercel.app/api/refresh
```

You should see JSON with mortgage rate data.

### Step 5: Update Your Frontend to Use the API

In your frontend project, update the API URL:

```bash
cd /mnt/okcomputer/output/app
VITE_API_URL=https://aml-rates-api.vercel.app npm run build
```

Then redeploy the frontend.

### Step 6: (Optional) Add Your Production Domain to CORS

If you have a custom domain, add it to the `allowedOrigins` array in:
- `api/rates.js`
- `api/refresh.js`

Then redeploy:
```bash
vercel --prod
```

---

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/rates` | GET | Returns cached or fresh rates |
| `/api/refresh` | GET | Forces a fresh scrape of rates |

### Example Response

```json
{
  "rates": [
    {
      "product": "30 Yr. Fixed",
      "rate": 6.32,
      "change": 0.07,
      "weekChange": 0.07,
      "monthChange": -0.32,
      "low52": 5.99,
      "high52": 7.08,
      "category": "conventional",
      "value": "30-fixed"
    }
  ],
  "source": "mortgagenewsdaily.com",
  "lastUpdated": "2026-05-12T14:00:00.000Z"
}
```

---

## Cron Schedule

The scraper runs automatically:
- **When**: Every weekday (Mon-Fri) at 9:00 AM ET
- **Schedule**: `0 14 * * 1-5` (14:00 UTC = 9:00 AM ET)

You can view cron execution logs in the Vercel dashboard under your project's **Cron Jobs** tab.

---

## Project Structure

```
vercel-backend/
  api/
    rates.js      # GET /api/rates endpoint
    refresh.js    # GET /api/refresh endpoint (cron target)
  lib/
    scraper.js    # Shared scraping logic
  vercel.json     # Vercel config with cron schedule
  package.json    # Dependencies
  README.md       # This file
```

---

## Troubleshooting

### "Cannot find module 'cheerio'"
Run `npm install` in the `vercel-backend` folder before deploying.

### Rates show as fallback
MortgageNewsDaily occasionally changes their HTML structure. If scraping fails, the API returns sensible fallback rates. Check the Vercel function logs for error details.

### CORS errors on frontend
Add your frontend domain to the `allowedOrigins` array in both `api/rates.js` and `api/refresh.js`, then redeploy.

### Cron job not running
- Vercel's free (Hobby) plan supports cron jobs
- Check the **Cron Jobs** tab in your Vercel project dashboard
- Cron logs show execution history

---

## Free Tier Limits

Vercel Hobby (free) plan:
- Function execution: 100 GB-hours/month
- Function duration: 10 seconds max (we set 30s in config, but free tier may limit)
- Cron jobs: Supported on Hobby plan
- Bandwidth: 100 GB/month

For a simple rate API, the free tier is more than sufficient.

---

## Next Steps After Deployment

1. Set up a custom domain (optional): `vercel domains add your-domain.com`
2. Update frontend `VITE_API_URL` to point to your Vercel URL
3. Redeploy frontend
4. Rates will now update automatically every weekday morning

---

Built for AML Funding LLC - Absolute Mortgage & Lending
