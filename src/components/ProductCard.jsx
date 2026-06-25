import { useState } from 'react'
import JarIllustration from './JarIllustration'
import styles from './ProductCard.module.css'

function Stars({ rating }) {
  const filled = Math.round(rating)
  return (
    <div className={styles.rating} aria-label={`${rating} out of 5 stars`}>
      <span className={styles.stars}>
        {'★'.repeat(filled)}{'☆'.repeat(5 - filled)}
      </span>
      <span className={styles.ratingText}>{rating} · {/* blank */}</span>
    </div>
  )
}

export default function ProductCard({ product, onAddToCart }) {
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    onAddToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className={styles.card}>
      <span className={styles.tag}>{product.tag}</span>

      <div className={styles.jarWrap}>
        <JarIllustration lidColor={product.lidColor} size="sm" />
      </div>

      <p className={styles.name}>{product.name}</p>
      <p className={styles.tagline}>{product.tagline}</p>

      <div className={styles.ratingRow} aria-label={`${product.rating} out of 5`}>
        <span className={styles.stars}>★★★★★</span>
        <span className={styles.ratingText}>
          {product.rating} · {product.reviewCount.toLocaleString()} reviews
        </span>
      </div>

      <p className={styles.desc}>{product.description}</p>

      <div className={styles.pills}>
        {product.ingredients.map(ing => (
          <span key={ing} className={styles.pill}>{ing}</span>
        ))}
      </div>

      <div className={styles.footer}>
        <div>
          <span className={styles.price}>${product.price}</span>
          <span className={styles.size}>{product.size}</span>
        </div>
        <button className={`${styles.addBtn} ${added ? styles.added : ''}`} onClick={handleAdd}>
          {added ? '✓ Added' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}
