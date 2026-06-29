import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import JarIllustration from '../components/JarIllustration'
import ProductCard from '../components/ProductCard'
import { products, ritualSteps } from '../data/products'
import styles from './Home.module.css'

const ingredientLoop = [
  'Shea Butter', 'Sweet Almond Oil', 'Jojoba Oil', 'Beeswax', 'Vitamin E',
  'Shea Butter', 'Sweet Almond Oil', 'Jojoba Oil', 'Beeswax', 'Vitamin E',
]

const BENEFITS = [
  { symbol: '✦', label: 'Small-Batch Made' },
  { symbol: '◯', label: 'Vegan Formula' },
  { symbol: '✓', label: 'Cruelty-Free' },
  { symbol: '⊕', label: 'No Synthetic Fillers' },
  { symbol: '❋', label: '100% Botanical' },
  { symbol: '↺', label: 'Sustainably Sourced' },
]

export default function Home({ onAddToCart }) {
  const [subscribed, setSubscribed] = useState(false)
  const [email, setEmail] = useState('')
  const [subError, setSubError] = useState('')
  const [subLoading, setSubLoading] = useState(false)

  useEffect(() => {
    const els = document.querySelectorAll('[data-animate]')
    if (!els.length) return
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.setAttribute('data-visible', '')
          observer.unobserve(e.target)
        }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <main>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.heroBadge}>Fresh Batch · 2026</p>
          <p className={styles.eyebrow}>Pure · Botanical · Slow-made</p>
          <h1 className={styles.headline}>
            Skin that feels<br />
            like <em>earth</em><br />
            in bloom.
          </h1>
          <p className={styles.heroBody}>
            First Rain body butter. Shea and sweet almond oil, hand-poured
            in small batches. The scent of earth after rain, on your skin.
          </p>
          <div className={styles.heroCtas}>
            <a href="#products" className={styles.btnPrimary}>
              Shop the Collection
              <span className={styles.btnArrow}>→</span>
            </a>
            <a href="#story" className={styles.btnGhost}>Our Story</a>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <span className={styles.floatPill} data-fp="1">Shea Butter</span>
          <span className={styles.floatPill} data-fp="2">Jojoba Oil</span>
          <span className={styles.floatPill} data-fp="3">Vitamin E</span>
          <div className={styles.productCard}>
            <div className={styles.productBlob} />
            <JarIllustration lidColor="sage" size="md" />
            <p className={styles.cardName}>First Rain</p>
            <div className={styles.accentLine} />
            <p className={styles.cardSub}>Shea · Almond · Jojoba</p>
            <div className={styles.cardRating}>
              <span>★★★★★</span>
              <span>5.0 (12 reviews)</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ingredient Strip ──────────────────────────────── */}
      <div className={styles.strip}>
        <div className={styles.stripTrack}>
          {[...ingredientLoop, ...ingredientLoop].map((ing, i) => (
            <span key={i}>{ing}</span>
          ))}
        </div>
      </div>

      {/* ── Benefits Bar ──────────────────────────────────── */}
      <div className={styles.benefits}>
        <div className={styles.benefitsInner}>
          {BENEFITS.map((b, i) => (
            <div
              key={b.label}
              className={styles.benefit}
              data-animate
              data-delay={String(Math.min(i + 1, 5))}
            >
              <span className={styles.bIcon}>{b.symbol}</span>
              <span className={styles.bLabel}>{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── About ─────────────────────────────────────────── */}
      <section className={styles.about} id="story">
        <div className={styles.aboutInner}>
          <div className={styles.aboutVisual} data-animate>
            <div className={`${styles.tile} ${styles.tileLoam}`}>
              <span className={styles.tileIcon}>🌿</span>
              <span className={styles.tileTxt}>Botanical</span>
            </div>
            <div className={`${styles.tile} ${styles.tileSage} ${styles.tileDown}`}>
              <span className={styles.tileIcon}>✦</span>
              <span className={styles.tileTxt}>Unrefined</span>
            </div>
            <div className={`${styles.tile} ${styles.tileLoamLight} ${styles.tileUp}`}>
              <span className={styles.tileIcon}>◯</span>
              <span className={styles.tileTxt}>No Fillers</span>
            </div>
            <div className={`${styles.tile} ${styles.tileDark}`}>
              <span className={styles.tileNum}>100%</span>
              <span className={styles.tileTxtLight}>Natural</span>
            </div>
          </div>
          <div className={styles.aboutText} data-animate data-delay="2">
            <span className={styles.sectionLabel}>Our Philosophy</span>
            <h2 className={styles.sectionHeadline}>
              Rooted in <em>nature</em>,<br />made with intention.
            </h2>
            <p className={styles.bodyText} style={{ marginBottom: '1.25rem' }}>
              We believe skin care should come from the earth, not a lab. Every
              LoamSkin butter starts with cold-pressed botanicals, ethically
              sourced and left as close to their natural state as possible.
            </p>
            <p className={styles.bodyText}>
              No artificial fragrance. No synthetic fillers. Just what your skin
              recognizes and actually absorbs.
            </p>
            <a href="#products" className={`${styles.btnGhost} ${styles.mt}`}>
              Explore the range
            </a>
          </div>
        </div>
      </section>

      {/* ── Products ──────────────────────────────────────── */}
      <section className={styles.products} id="products">
        <div className={styles.productsInner}>
          <div className={styles.productsHeader} data-animate>
            <div>
              <span className={styles.sectionLabel}>The Collection</span>
              <h2 className={styles.sectionHeadline}>
                Every skin,<br />a different <em>blend.</em>
              </h2>
            </div>
            <Link to="/products" className={styles.btnGhost}>View all</Link>
          </div>
          <div className={styles.productsGrid}>
            {products.map((p, i) => (
              <div key={p.id} data-animate data-delay={String(i + 1)}>
                <ProductCard product={p} onAddToCart={onAddToCart} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ritual ────────────────────────────────────────── */}
      <section className={styles.ritual} id="ritual">
        <div className={styles.ritualInner}>
          <div data-animate>
            <span className={styles.sectionLabel}>The Ritual</span>
            <h2 className={styles.sectionHeadline}>
              Slow down.<br /><em>Feed</em> your skin.
            </h2>
            <ul className={styles.steps}>
              {ritualSteps.map(step => (
                <li key={step.num} className={styles.step}>
                  <span className={styles.stepNum}>{step.num}</span>
                  <div>
                    <p className={styles.stepTitle}>{step.title}</p>
                    <p className={styles.stepDesc}>{step.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.ritualVisual} data-animate data-delay="2">
            <div className={styles.ritualBox}>
              <p className={styles.ritualQuote}>
                "Your skin remembers what you feed it."
              </p>
              <span className={styles.ritualSub}>LoamSkin</span>
            </div>
          </div>
        </div>
      </section>

{/* ── Newsletter ────────────────────────────────────── */}
      <section className={styles.newsletter} id="newsletter">
        <div className={styles.newsletterInner} data-animate>
          <span className={styles.sectionLabel} style={{ color: 'var(--loam-light)' }}>
            Join the Circle
          </span>
          <h2 className={styles.sectionHeadline} style={{ color: 'var(--loam-pale)' }}>
            Rituals, restocks &<br /><em>early access.</em>
          </h2>
          <p className={styles.newsletterBody}>
            Be the first to know about restocks and new batches. Get 10% off your first order.
          </p>
          {subscribed ? (
            <div className={styles.successMsg}>
              <span className={styles.successIcon}>✓</span>
              <span>You're on the list. Welcome to the circle.</span>
            </div>
          ) : (
            <form
              className={styles.newsletterForm}
              onSubmit={async e => {
                e.preventDefault()
                setSubError('')
                setSubLoading(true)
                try {
                  const res = await fetch('/api/subscribe', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email }),
                  })
                  const data = await res.json()
                  if (res.ok) {
                    setSubscribed(true)
                  } else {
                    setSubError(data.error || 'Something went wrong. Try again.')
                  }
                } catch {
                  setSubError('Something went wrong. Try again.')
                } finally {
                  setSubLoading(false)
                }
              }}
            >
              <input
                type="email"
                placeholder="your@email.com"
                className={styles.emailInput}
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <button type="submit" className={styles.submitBtn} disabled={subLoading}>
                {subLoading ? 'Subscribing…' : 'Subscribe'}
              </button>
            </form>
          )}
          {subError && <p className={styles.subError}>{subError}</p>}
          <p className={styles.newsletterNote}>No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </main>
  )
}
