import { useState, useEffect, useRef } from 'react'
import styles from './AnnouncementBar.module.css'

const MESSAGES = [
  '🌿  Free shipping on orders over $65',
  '✦  New 2026 Batch · Small-batch botanical blends, freshly made',
  '◯  Cruelty-Free  ·  Vegan  ·  No Synthetic Fillers',
]

export default function AnnouncementBar() {
  const [idx, setIdx] = useState(0)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % MESSAGES.length), 4500)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > 60 && y > lastY.current)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`${styles.bar} ${hidden ? styles.barHidden : ''}`}
      role="status"
      aria-live="polite"
    >
      <p className={styles.msg} key={idx}>{MESSAGES[idx]}</p>
    </div>
  )
}
