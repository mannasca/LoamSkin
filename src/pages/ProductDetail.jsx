import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import JarIllustration from '../components/JarIllustration'
import ProductBackground from '../components/ProductBackground'
import { products } from '../data/products'
import styles from './ProductDetail.module.css'

export default function ProductDetail({ onAddToCart }) {
  const { slug } = useParams()
  const product = products.find(p => p.slug === slug)
  const [added, setAdded] = useState(false)
  const [waitlisted, setWaitlisted] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!product) {
    return (
      <main className={styles.page}>
        <div className={styles.notFound}>
          <h1>Product not found</h1>
          <Link to="/products" className={styles.backBtn}>← Back to Collection</Link>
        </div>
      </main>
    )
  }

  const handleAdd = () => {
    onAddToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleWaitlist = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setWaitlisted(true)
      }
    } catch {
      setWaitlisted(true)
    }
  }

  const others = products.filter(p => p.id !== product.id).slice(0, 3)

  return (
    <main className={styles.page}>
      <div className={styles.breadcrumb}>
        <div className={styles.breadcrumbInner}>
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/products">Collection</Link>
          <span>/</span>
          <span className={styles.breadcrumbCurrent}>{product.name}</span>
        </div>
      </div>

      <section className={styles.hero}>
        <ProductBackground slug={product.slug} />
        <div className={styles.heroInner}>
          <div className={styles.visual}>
            <div
              className={styles.colorBar}
              style={{ background: product.noteBg }}
            >
              <span
                className={styles.noteBadge}
                style={{
                  background: product.noteColor,
                  color: product.noteTextColor,
                }}
              >
                {product.note}
              </span>
            </div>
            <div className={styles.jarArea}>
              <JarIllustration lidColor={product.lidColor} size="md" />
            </div>
          </div>

          <div className={styles.info}>
            <span className={`${styles.tag} ${!product.available ? styles.tagSoon : ''}`}>
              {product.tag}
            </span>
            <h1 className={styles.name}>{product.name}</h1>
            <p className={styles.tagline}>{product.tagline}</p>

            {product.available && product.rating > 0 && (
              <div className={styles.ratingRow}>
                <span className={styles.stars}>★★★★★</span>
                <span className={styles.ratingText}>
                  {product.rating} · {product.reviewCount} reviews
                </span>
              </div>
            )}

            <p className={styles.hook}>{product.hook}</p>
            <p className={styles.desc}>{product.longDescription || product.description}</p>

            <div className={styles.price}>
              <span className={styles.priceAmount}>${product.price}</span>
              <span className={styles.priceSize}>{product.size}</span>
            </div>

            {product.available ? (
              <button
                className={`${styles.addBtn} ${added ? styles.added : ''}`}
                onClick={handleAdd}
              >
                {added ? '✓ Added to Cart' : 'Add to Cart'}
              </button>
            ) : waitlisted ? (
              <div className={styles.waitlistDone}>
                <span>✓</span> You're on the list. We'll let you know.
              </div>
            ) : (
              <form className={styles.waitlistForm} onSubmit={handleWaitlist}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className={styles.waitlistInput}
                />
                <button type="submit" className={styles.waitlistBtn}>
                  Join the Waitlist
                </button>
              </form>
            )}

            <div className={styles.details}>
              <div className={styles.detailBlock}>
                <p className={styles.detailTitle}>Ingredients</p>
                <div className={styles.ingredientPills}>
                  {product.ingredients.map(ing => (
                    <span key={ing} className={styles.pill}>{ing}</span>
                  ))}
                </div>
              </div>
              <div className={styles.detailBlock}>
                <p className={styles.detailTitle}>Details</p>
                <ul className={styles.detailList}>
                  <li>Small-batched in Toronto, Canada</li>
                  <li>No synthetic fragrance or fillers</li>
                  <li>Cruelty-free · Vegan</li>
                  <li>Net weight: {product.size}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section className={styles.related}>
          <div className={styles.relatedInner}>
            <p className={styles.relatedLabel}>The Collection</p>
            <h2 className={styles.relatedHeadline}>
              Explore other <em>scents.</em>
            </h2>
            <div className={styles.relatedGrid}>
              {others.map(p => (
                <Link
                  key={p.id}
                  to={`/product/${p.slug}`}
                  className={styles.relatedCard}
                >
                  <div
                    className={styles.relatedBar}
                    style={{ background: p.noteBg }}
                  />
                  <div className={styles.relatedBody}>
                    <p className={styles.relatedName}>{p.name}</p>
                    <p className={styles.relatedHook}>{p.hook}</p>
                    <span className={styles.relatedLink}>
                      {p.available ? 'Shop →' : 'View →'}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
