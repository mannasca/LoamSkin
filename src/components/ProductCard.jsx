import { useState } from 'react'
import { Link } from 'react-router-dom'
import JarIllustration from './JarIllustration'
import styles from './ProductCard.module.css'

export default function ProductCard({ product, onAddToCart }) {
  const [added, setAdded] = useState(false)

  const handleAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onAddToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <Link to={`/product/${product.slug}`} className={styles.card}>
      <span className={`${styles.tag} ${!product.available ? styles.tagSoon : ''}`}>
        {product.tag}
      </span>

      <div className={styles.jarWrap}>
        <JarIllustration lidColor={product.lidColor} size="sm" />
      </div>

      <p className={styles.name}>{product.name}</p>
      <p className={styles.tagline}>{product.tagline}</p>

      {product.available && product.rating > 0 && (
        <div className={styles.ratingRow} aria-label={`${product.rating} out of 5`}>
          <span className={styles.stars}>★★★★★</span>
          <span className={styles.ratingText}>
            {product.rating} · {product.reviewCount.toLocaleString()} reviews
          </span>
        </div>
      )}

      <p className={styles.hook}>{product.hook}</p>

      <div className={styles.pills}>
        {product.ingredients.slice(0, 3).map(ing => (
          <span key={ing} className={styles.pill}>{ing}</span>
        ))}
      </div>

      <div className={styles.footer}>
        <div>
          <span className={styles.price}>${product.price}</span>
          <span className={styles.size}>{product.size}</span>
        </div>
        {product.available ? (
          <button
            className={`${styles.addBtn} ${added ? styles.added : ''}`}
            onClick={handleAdd}
          >
            {added ? '✓ Added' : 'Add to Cart'}
          </button>
        ) : (
          <span className={styles.waitlist}>Waitlist →</span>
        )}
      </div>
    </Link>
  )
}
