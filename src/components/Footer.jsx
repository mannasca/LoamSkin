import styles from './Footer.module.css'

const SOCIAL = [
  {
    label: 'Instagram',
    href: '#',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  },
  {
    label: 'TikTok',
    href: '#',
    path: 'M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.36 6.36 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.79a4.85 4.85 0 01-1.01-.1z',
  },
  {
    label: 'Pinterest',
    href: '#',
    path: 'M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z',
  },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <p className={styles.logo}>Loam<span>Skin</span></p>
          <p className={styles.tagline}>
            Body butter rooted in botanical purity.<br />
            Small-batched. No shortcuts.
          </p>
          <div className={styles.social}>
            {SOCIAL.map(s => (
              <a key={s.label} href={s.href} className={styles.socialLink} aria-label={s.label}>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div className={styles.col}>
          <p className={styles.colTitle}>Shop</p>
          <ul className={styles.colLinks}>
            <li><a href="#products">First Rain</a></li>
            <li><a href="#products">Body Butter 50g</a></li>
          </ul>
        </div>

        <div className={styles.col}>
          <p className={styles.colTitle}>Brand</p>
          <ul className={styles.colLinks}>
            <li><a href="#story">Our Story</a></li>
            <li><a href="#ritual">The Ritual</a></li>
            <li><a href="#newsletter">Newsletter</a></li>
          </ul>
        </div>

        <div className={styles.col}>
          <p className={styles.colTitle}>Support</p>
          <ul className={styles.colLinks}>
            <li><a href="mailto:hello@loamskin.com">Contact Us</a></li>
            <li><a href="#newsletter">Subscribe</a></li>
            <li><a href="#products">Shop Now</a></li>
          </ul>
        </div>
      </div>

      <div className={styles.certifications}>
        {['✓ Cruelty-Free', '◯ Vegan', '❋ 100% Natural', '✦ Small-Batch'].map(c => (
          <span key={c} className={styles.cert}>{c}</span>
        ))}
      </div>

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} LoamSkin. All rights reserved. Made in Canada.</p>
        <p className={styles.bottomLinks}>Privacy Policy · Terms of Service · Shipping Policy</p>
      </div>
    </footer>
  )
}
