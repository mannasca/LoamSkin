import { Link } from 'react-router-dom'
import styles from './Success.module.css'

export default function Success() {
  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <div className={styles.icon}>✓</div>
        <h1 className={styles.title}>Order confirmed.</h1>
        <p className={styles.sub}>
          Thank you for your order. You'll receive a confirmation email shortly.
          Your First Rain is being prepared with care.
        </p>
        <p className={styles.tagline}>"Small-batched. No shortcuts."</p>
        <Link to="/" className={styles.btn}>Back to LoamSkin</Link>
      </div>
    </main>
  )
}
