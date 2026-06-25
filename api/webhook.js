import Stripe from 'stripe'
import sgMail from '@sendgrid/mail'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// Disable body parsing — Stripe needs the raw body to verify signature
export const config = { api: { bodyParser: false } }

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', chunk => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const rawBody = await getRawBody(req)
  const sig = req.headers['stripe-signature']

  let event
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook signature failed:', err.message)
    return res.status(400).json({ error: `Webhook Error: ${err.message}` })
  }

  // Handle successful payment
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object
    const { metadata, amount, currency } = paymentIntent

    const orderItems = JSON.parse(metadata.order_items || '[]')
    const totalFormatted = `$${(amount / 100).toFixed(2)} ${currency.toUpperCase()}`

    // Send order confirmation email via SendGrid
    if (process.env.SENDGRID_API_KEY && metadata.customer_email) {
      try {
        await sgMail.send({
          to: metadata.customer_email,
          from: {
            email: process.env.FROM_EMAIL || 'hello@loamskin.com',
            name: 'LoamSkin',
          },
          subject: `Your LoamSkin order is confirmed ✓`,
          html: `
            <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #3D2B1A;">
              <div style="background: #3D2B1A; padding: 32px; text-align: center;">
                <h1 style="color: #E8D5BC; font-weight: 300; letter-spacing: 4px; margin: 0; font-size: 24px;">
                  LOAM<span style="color: #C17F4A;">SKIN</span>
                </h1>
              </div>
              <div style="padding: 40px 32px; background: #FAF7F2;">
                <p style="font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #7A8C6E; margin-bottom: 12px;">
                  Order Confirmed
                </p>
                <h2 style="font-size: 28px; font-weight: 300; margin-bottom: 24px;">
                  Thank you for your order.
                </h2>
                <p style="font-size: 14px; line-height: 1.8; color: #6B4E35; margin-bottom: 32px;">
                  Your body butter is being carefully prepared and will be on its way soon.
                  We'll send you a shipping confirmation with your tracking number.
                </p>

                <div style="border-top: 0.5px solid #E8D5BC; border-bottom: 0.5px solid #E8D5BC; padding: 24px 0; margin-bottom: 32px;">
                  <p style="font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase; color: #9C9186; margin-bottom: 16px;">
                    Order Summary
                  </p>
                  ${orderItems.map(item => `
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                      <span style="font-size: 14px; color: #3D2B1A;">${item}</span>
                    </div>
                  `).join('')}
                  <div style="margin-top: 16px; padding-top: 16px; border-top: 0.5px solid #E8D5BC; display: flex; justify-content: space-between;">
                    <span style="font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; color: #9C9186;">Total Charged</span>
                    <span style="font-size: 18px; color: #C17F4A;">${totalFormatted}</span>
                  </div>
                </div>

                <p style="font-size: 13px; color: #9C9186; line-height: 1.8;">
                  Questions? Reply to this email or reach us at hello@loamskin.com
                </p>
              </div>
              <div style="background: #F5EDE1; padding: 20px 32px; text-align: center;">
                <p style="font-size: 11px; color: #9C9186; margin: 0; letter-spacing: 1px;">
                  Pure · Botanical · Slow-made
                </p>
              </div>
            </div>
          `,
        })
      } catch (emailErr) {
        console.error('Email send failed:', emailErr)
        // Don't fail the webhook — payment already succeeded
      }
    }

    console.log(`✓ Payment succeeded: ${paymentIntent.id} — ${totalFormatted}`)
  }

  return res.status(200).json({ received: true })
}
