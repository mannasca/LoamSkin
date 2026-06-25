import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { amount, currency = 'cad', items } = req.body

    if (!amount || amount < 50) {
      return res.status(400).json({ error: 'Invalid amount' })
    }

    // Create PaymentIntent with full order metadata
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency,
      automatic_payment_methods: { enabled: true },
      metadata: {
        order_items: JSON.stringify(
          items?.map(i => `${i.name} x${i.quantity}`) ?? []
        ),
        source: 'loamskin_website',
      },
    })

    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (err) {
    console.error('PaymentIntent error:', err)
    return res.status(500).json({ error: err.message })
  }
}
