import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
  AddressElement,
} from '@stripe/react-stripe-js'
import styles from './CheckoutModal.module.css'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

// ── Inner checkout form ─────────────────────────────────────────────────────
function StripeForm({ total, items, onClose, onPlaceOrder }) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)
    setError(null)

    // Validate all Elements fields before submitting
    const { error: submitError } = await elements.submit()
    if (submitError) {
      setError(submitError.message)
      setLoading(false)
      return
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}?order=success`,
      },
      redirect: 'if_required',
    })

    if (confirmError) {
      setError(confirmError.message)
      setLoading(false)
    } else {
      onPlaceOrder()
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.section}>
        <p className={styles.sectionLabel}>Shipping address</p>
        <AddressElement
          options={{
            mode: 'shipping',
            allowedCountries: ['CA', 'US'],
            defaultValues: { address: { country: 'CA' } },
          }}
        />
      </div>

      <div className={styles.section}>
        <p className={styles.sectionLabel}>Payment details</p>
        <PaymentElement
          options={{
            layout: 'tabs',
            paymentMethodOrder: ['card', 'apple_pay', 'google_pay'],
          }}
        />
      </div>

      {error && <p className={styles.errorMsg}>⚠ {error}</p>}

      <div className={styles.footer}>
        <div>
          <p className={styles.totalLabel}>Order total</p>
          <p className={styles.totalValue}>${total.toFixed(2)} CAD</p>
        </div>
        <button
          type="submit"
          className={styles.placeOrderBtn}
          disabled={!stripe || loading}
        >
          {loading ? 'Processing…' : `Pay $${total.toFixed(2)}`}
        </button>
      </div>
    </form>
  )
}

// ── Outer modal ─────────────────────────────────────────────────────────────
export default function CheckoutModal({ isOpen, total, items, onClose, onPlaceOrder }) {
  const [clientSecret, setClientSecret] = useState(null)
  const [fetchError, setFetchError] = useState(null)

  useEffect(() => {
    if (!isOpen || total <= 0) return
    setClientSecret(null)
    setFetchError(null)

    // Calls your secure Vercel serverless function
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: Math.round(total * 100),
        currency: 'cad',
        items: items.map(i => ({ name: i.name, quantity: i.quantity })),
      }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.error) throw new Error(data.error)
        setClientSecret(data.clientSecret)
      })
      .catch(err => setFetchError(err.message))
  }, [isOpen, total])

  if (!isOpen) return null

  const appearance = {
    theme: 'flat',
    variables: {
      colorPrimary: '#C17F4A',
      colorBackground: '#FAF7F2',
      colorText: '#3D2B1A',
      colorTextSecondary: '#6B4E35',
      colorDanger: '#c0392b',
      fontFamily: 'Jost, system-ui, sans-serif',
      borderRadius: '2px',
      spacingUnit: '5px',
    },
    rules: {
      '.Input': {
        border: '0.5px solid #E8D5BC',
        boxShadow: 'none',
        backgroundColor: '#FFFFFF',
      },
      '.Input:focus': {
        border: '0.5px solid #C17F4A',
        boxShadow: 'none',
      },
      '.Label': {
        fontSize: '11px',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        color: '#9C9186',
      },
      '.Tab': {
        border: '0.5px solid #E8D5BC',
        backgroundColor: '#FAF7F2',
      },
      '.Tab--selected': {
        border: '0.5px solid #C17F4A',
        backgroundColor: '#F5EDE1',
      },
    },
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label="Checkout"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className={styles.header}>
          <div>
            <p className={styles.headerLabel}>Secure Checkout</p>
            <h2 className={styles.headerTitle}>Complete your order</h2>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* Order summary strip */}
        <div className={styles.orderSummary}>
          {items.map(item => (
            <div key={item.id} className={styles.orderItem}>
              <span>{item.name} <span className={styles.qty}>×{item.quantity}</span></span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className={styles.orderShipping}>
            <span>Shipping</span>
            <span>$4.99</span>
          </div>
        </div>

        {/* Stripe badge */}
        <div className={styles.stripeBadge}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 1L3 5v6c0 5.25 3.75 10.05 9 11.25C17.25 21.05 21 16.25 21 11V5L12 1z" stroke="#7A8C6E" strokeWidth="1.5" fill="none"/>
          </svg>
          <span>Payments secured by <strong>Stripe</strong></span>
        </div>

        {/* States */}
        {fetchError && (
          <div className={styles.errorBox}>
            <p>Could not initialize payment: {fetchError}</p>
            <button onClick={() => window.location.reload()}>Try again</button>
          </div>
        )}

        {!clientSecret && !fetchError && (
          <div className={styles.loading}>
            <div className={styles.spinner} />
            <p>Setting up secure payment…</p>
          </div>
        )}

        {clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
            <StripeForm
              total={total}
              items={items}
              onClose={onClose}
              onPlaceOrder={onPlaceOrder}
            />
          </Elements>
        )}
      </div>
    </div>
  )
}
