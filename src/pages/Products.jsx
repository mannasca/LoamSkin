import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
import styles from './Products.module.css'

export default function Products({ onAddToCart }) {
  useEffect(() => {
    window.scrollTo(0, 0)
    const els = document.querySelectorAll('[data-animate]')
    if (!els.length) return
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.setAttribute('data-visible', '')
          observer.unobserve(e.target)
        }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <Link to="/" className={styles.back}>← Back</Link>
          <span className={styles.sectionLabel}>The Collection</span>
          <h1 className={styles.headline}>
            Every skin,<br />a different <em>blend.</em>
          </h1>
          <p className={styles.sub}>
            Small-batched botanical body butters. Crafted with intention, no shortcuts.
          </p>
        </div>
      </div>

      <div className={styles.grid}>
        {products.map((p, i) => (
          <div key={p.id} data-animate data-delay={String((i % 3) + 1)}>
            <ProductCard product={p} onAddToCart={onAddToCart} />
          </div>
        ))}
      </div>
    </main>
  )
}
