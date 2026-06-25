import styles from './JarIllustration.module.css'

const lidColors = {
  loam: { bg: '#E8D5BC', border: '#C17F4A' },
  sage: { bg: '#C8D4BF', border: '#7A8C6E' },
  bark: { bg: '#c4a882', border: '#6B4E35' },
}

export default function JarIllustration({ lidColor = 'loam', size = 'md' }) {
  const lid = lidColors[lidColor] || lidColors.loam
  const isSm = size === 'sm'

  return (
    <div className={`${styles.jar} ${isSm ? styles.sm : styles.md}`}>
      <div
        className={styles.lid}
        style={{ background: lid.bg, borderColor: lid.border }}
      />
      <div className={styles.body}>
        <div className={styles.texture} />
        <div className={styles.label}>
          <span className={styles.labelBrand}>LoamSkin</span>
          <span className={styles.labelProduct}>Body Butter</span>
        </div>
      </div>
    </div>
  )
}
