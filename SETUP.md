# LoamSkin — Full Deployment Guide
## React + Stripe Checkout + Vercel Serverless

---

## Project Structure

```
loamskin-final/
├── api/
│   ├── create-payment-intent.js   ← Secure Vercel serverless function
│   └── webhook.js                 ← Stripe webhook (order confirmation emails)
├── src/
│   ├── components/
│   │   ├── Navbar.jsx             ← Cart count badge
│   │   ├── CartDrawer.jsx         ← Side cart with quantity controls
│   │   ├── CheckoutModal.jsx      ← Real Stripe Payment + Address Elements
│   │   ├── ProductCard.jsx
│   │   ├── JarIllustration.jsx
│   │   └── Footer.jsx
│   ├── pages/Home.jsx
│   ├── data/products.js
│   └── App.jsx
├── .env                           ← Frontend publishable key (safe to commit)
├── .env.local                     ← SECRET keys — NEVER commit to GitHub
├── .env.production                ← Live publishable key (swap before launch)
└── vercel.json                    ← Vercel routing config
```

---

## Step 1 — Run locally

```bash
cd loamskin-final
npm install
npm run dev
```

Open http://localhost:5173

> **Note:** In local dev, the `/api/create-payment-intent` endpoint won't run
> unless you use Vercel CLI. For local testing, the app will show an error at
> checkout — that's fine. See Step 3 for testing with Vercel CLI.

---

## Step 2 — Add your secret keys to Vercel

**Never put your secret key in code or `.env`. Use Vercel's environment variables.**

1. Go to https://vercel.com → your LoamSkin project → **Settings → Environment Variables**
2. Add these one by one:

| Variable | Value | Environment |
|---|---|---|
| `STRIPE_SECRET_KEY` | `sk_test_51Tla1KB...` | Preview + Production |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` (get in Step 4) | Preview + Production |
| `VITE_STRIPE_PUBLISHABLE_KEY` | `pk_test_51Tla1KB...` | All |
| `SENDGRID_API_KEY` | `SG.xxx` (optional) | Production |
| `FROM_EMAIL` | `hello@loamskin.com` (optional) | Production |

**Where to find your Stripe secret key:**
- Stripe Dashboard → Developers → API Keys → Secret key (click "Reveal")

---

## Step 3 — Deploy to Vercel

### Option A: GitHub (recommended)

```bash
# In your project folder
git init
git add .
git commit -m "Initial LoamSkin commit"
git remote add origin https://github.com/YOUR_USERNAME/loamskin.git
git push -u origin main
```

Then in Vercel: New Project → Import from GitHub → select `loamskin` → Deploy.

### Option B: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## Step 4 — Set up Stripe Webhook

This is what triggers order confirmation emails after payment succeeds.

1. Go to Stripe Dashboard → Developers → Webhooks → **Add endpoint**
2. Endpoint URL: `https://loamskin.com/api/webhook`
3. Select event: `payment_intent.succeeded`
4. Click **Add endpoint**
5. Click **Reveal signing secret** → copy the `whsec_...` value
6. Paste it into Vercel as `STRIPE_WEBHOOK_SECRET`

---

## Step 5 — Test payments (test mode)

Use these test card numbers:

| Card Number | Result |
|---|---|
| `4242 4242 4242 4242` | ✅ Payment succeeds |
| `4000 0000 0000 9995` | ❌ Card declined |
| `4000 0027 6000 3184` | 🔐 3D Secure required |
| `4000 0076 2000 3184` | 🇨🇦 Canadian card |

- Any future expiry date (e.g. 12/29)
- Any 3-digit CVC
- Any postal/ZIP code

---

## Step 6 — Go live (when ready)

1. In Stripe Dashboard: click **"Switch to Live mode"** (top right toggle)
2. Get your **live publishable key** (`pk_live_...`) and **live secret key** (`sk_live_...`)
3. Update Vercel environment variables with the live keys
4. Create a new webhook endpoint for your live site
5. Update `.env.production` with your live publishable key

---

## Order confirmation emails (optional — SendGrid)

1. Sign up at https://sendgrid.com (free tier: 100 emails/day)
2. Go to Settings → API Keys → Create API Key
3. Add it as `SENDGRID_API_KEY` in Vercel
4. Verify your sender email at SendGrid → Sender Authentication

Customers will receive a branded LoamSkin confirmation email after every successful payment.

---

## Stripe Dashboard — managing orders

After payments, everything appears in your Stripe Dashboard:
- **Payments** tab: every transaction with status, amount, and customer info
- **Customers** tab: customer email list builds automatically
- **Reports** tab: revenue by day/week/month
- **Refunds**: click any payment → Refund

---

## Test card for Canadian payments

```
Card: 4000 0076 2000 3184
Expiry: 12/29
CVC: 123
Postal: A1A1A1
```

---

## Support

- Stripe docs: https://stripe.com/docs
- Vercel docs: https://vercel.com/docs
- Stripe test cards: https://stripe.com/docs/testing
