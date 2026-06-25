import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { href: '#story',      label: 'Story' },
  { href: '#products',   label: 'Products' },
  { href: '#ritual',     label: 'Ritual' },
  { href: '#newsletter', label: 'Journal' },
]

export default function Navbar({ onOpenCart, cartCount = 0 }) {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <Link to="/" className={styles.logo} onClick={close}>
          Loam<span>Skin</span>
        </Link>

        <ul className={styles.links}>
          {NAV_LINKS.map(l => (
            <li key={l.href}><a href={l.href}>{l.label}</a></li>
          ))}
        </ul>

        <div className={styles.actions}>
          <a href="#products" className={styles.cta}>Shop Now</a>
          <button
            type="button"
            className={styles.cartBtn}
            onClick={onOpenCart}
            aria-label={`Open cart, ${cartCount} items`}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3.75 4.5H5.25L7.5 15.75H18L20.25 7.5H6.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="9" cy="19.5" r="1.5" fill="currentColor"/>
              <circle cx="17.25" cy="19.5" r="1.5" fill="currentColor"/>
            </svg>
            {cartCount > 0 && <span className={styles.badge} aria-hidden="true">{cartCount}</span>}
          </button>

          <button
            type="button"
            className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
            onClick={() => setMenuOpen(m => !m)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`} aria-hidden={!menuOpen}>
        <ul className={styles.mobileLinks}>
          {NAV_LINKS.map((l, i) => (
            <li key={l.href} style={{ animationDelay: `${i * 0.07 + 0.1}s` }}>
              <a href={l.href} onClick={close}>{l.label}</a>
            </li>
          ))}
        </ul>
        <a href="#products" className={styles.mobileShop} onClick={close}>
          Shop the Collection
        </a>
        <p className={styles.mobileSub}>Botanical · Slow-made · Pure</p>
      </div>
    </>
  )
}
