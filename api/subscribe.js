export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' })
  }

  const API_KEY = process.env.MAILCHIMP_API_KEY
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID
  const SERVER = API_KEY.split('-')[1] // e.g. "us12"

  try {
    const response = await fetch(
      `https://${SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(`anystring:${API_KEY}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
          tags: ['loamskin-website'],
        }),
      }
    )

    const data = await response.json()

    if (response.ok) {
      return res.status(200).json({ success: true })
    }

    // Already subscribed is not an error for the user
    if (data.title === 'Member Exists') {
      return res.status(200).json({ success: true, alreadySubscribed: true })
    }

    return res.status(400).json({ error: data.detail || 'Subscription failed' })
  } catch (err) {
    return res.status(500).json({ error: 'Server error' })
  }
}
