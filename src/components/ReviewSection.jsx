import { useState, useEffect, useMemo } from 'react'
import styles from './ReviewSection.module.css'

const STORAGE_KEY = 'loamskin_reviews'

function getStoredReviews(slug) {
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    return all[slug] || []
  } catch { return [] }
}

function saveReviews(slug, reviews) {
  try {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    all[slug] = reviews
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
  } catch {}
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  return `${months}mo ago`
}

function StarSelect({ value, onChange, size = 'lg' }) {
  const [hover, setHover] = useState(0)
  return (
    <div
      className={`${styles.starSelect} ${size === 'sm' ? styles.starSelectSm : ''}`}
      onMouseLeave={() => setHover(0)}
    >
      {[1, 2, 3, 4, 5].map(i => (
        <button
          key={i}
          type="button"
          className={`${styles.starBtn} ${i <= (hover || value) ? styles.starFilled : ''}`}
          onMouseEnter={() => setHover(i)}
          onClick={() => onChange(i)}
          aria-label={`${i} star${i > 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  )
}

function StarDisplay({ rating, size = 'sm' }) {
  return (
    <span className={`${styles.starDisplay} ${size === 'sm' ? styles.starDisplaySm : ''}`}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={i <= Math.round(rating) ? styles.starLit : styles.starDim}>★</span>
      ))}
    </span>
  )
}

export default function ReviewSection({ product }) {
  const [reviews, setReviews] = useState([])
  const [formOpen, setFormOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [sortBy, setSortBy] = useState('newest')
  const [filterStar, setFilterStar] = useState(0)

  useEffect(() => {
    setReviews(getStoredReviews(product.slug))
    setFormOpen(false)
    setSubmitted(false)
    setRating(0)
    setName('')
    setTitle('')
    setBody('')
    setFilterStar(0)
  }, [product.slug])

  const stats = useMemo(() => {
    if (!reviews.length) return { avg: 0, total: 0, dist: [0, 0, 0, 0, 0] }
    const dist = [0, 0, 0, 0, 0]
    let sum = 0
    reviews.forEach(r => { dist[r.rating - 1]++; sum += r.rating })
    return { avg: (sum / reviews.length).toFixed(1), total: reviews.length, dist }
  }, [reviews])

  const filtered = useMemo(() => {
    let list = [...reviews]
    if (filterStar > 0) list = list.filter(r => r.rating === filterStar)
    if (sortBy === 'newest') list.sort((a, b) => new Date(b.date) - new Date(a.date))
    else if (sortBy === 'highest') list.sort((a, b) => b.rating - a.rating)
    else if (sortBy === 'lowest') list.sort((a, b) => a.rating - b.rating)
    else if (sortBy === 'helpful') list.sort((a, b) => (b.helpful || 0) - (a.helpful || 0))
    return list
  }, [reviews, sortBy, filterStar])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (rating === 0) return
    const newReview = {
      id: Date.now(),
      rating,
      name: name.trim() || 'Anonymous',
      title: title.trim(),
      body: body.trim(),
      date: new Date().toISOString(),
      helpful: 0,
      verified: false,
    }
    const updated = [newReview, ...reviews]
    setReviews(updated)
    saveReviews(product.slug, updated)
    setSubmitted(true)
    setRating(0)
    setName('')
    setTitle('')
    setBody('')
    setTimeout(() => { setSubmitted(false); setFormOpen(false) }, 3000)
  }

  const handleHelpful = (id) => {
    const updated = reviews.map(r =>
      r.id === id ? { ...r, helpful: (r.helpful || 0) + 1 } : r
    )
    setReviews(updated)
    saveReviews(product.slug, updated)
  }

  const maxDist = Math.max(...stats.dist, 1)

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <span className={styles.label}>Customer Reviews</span>
            <h2 className={styles.heading}>
              What people are <em>saying.</em>
            </h2>
          </div>
          {!formOpen && !submitted && (
            <button className={styles.writeBtn} onClick={() => setFormOpen(true)}>
              Write a Review
            </button>
          )}
        </div>

        {/* Write review form */}
        {formOpen && !submitted && (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formHeader}>
              <h3 className={styles.formTitle}>Share your experience</h3>
              <button type="button" className={styles.formClose} onClick={() => setFormOpen(false)}>
                ✕
              </button>
            </div>

            <div className={styles.formField}>
              <p className={styles.fieldLabel}>Your Rating</p>
              <StarSelect value={rating} onChange={setRating} />
              {rating === 0 && <p className={styles.fieldHint}>Select a star rating</p>}
            </div>

            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label className={styles.fieldLabel} htmlFor="rev-name">Name</label>
                <input
                  id="rev-name"
                  type="text"
                  className={styles.input}
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className={styles.formField}>
                <label className={styles.fieldLabel} htmlFor="rev-title">Review Title</label>
                <input
                  id="rev-title"
                  type="text"
                  className={styles.input}
                  placeholder="Sum it up in a few words"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.formField}>
              <label className={styles.fieldLabel} htmlFor="rev-body">Your Review</label>
              <textarea
                id="rev-body"
                className={styles.textarea}
                placeholder="What did you like or dislike? How does it feel on your skin?"
                value={body}
                onChange={e => setBody(e.target.value)}
                rows={4}
                required
              />
            </div>

            <button type="submit" className={styles.submitBtn} disabled={rating === 0}>
              Submit Review
            </button>
          </form>
        )}

        {submitted && (
          <div className={styles.successMsg}>
            <span className={styles.successIcon}>✓</span>
            <span>Thank you. Your review has been added.</span>
          </div>
        )}

        {/* Stats panel */}
        {stats.total > 0 && (
          <div className={styles.statsGrid}>
            <div className={styles.overallBox}>
              <span className={styles.bigRating}>{stats.avg}</span>
              <StarDisplay rating={parseFloat(stats.avg)} />
              <span className={styles.totalCount}>{stats.total} review{stats.total !== 1 ? 's' : ''}</span>
            </div>

            <div className={styles.snapshot}>
              <p className={styles.snapshotTitle}>Rating Breakdown</p>
              {[5, 4, 3, 2, 1].map(star => {
                const count = stats.dist[star - 1]
                const pct = (count / maxDist) * 100
                const isActive = filterStar === star
                return (
                  <button
                    key={star}
                    className={`${styles.barRow} ${isActive ? styles.barRowActive : ''}`}
                    onClick={() => setFilterStar(isActive ? 0 : star)}
                    aria-label={`Filter by ${star} star reviews (${count})`}
                  >
                    <span className={styles.barLabel}>{star}★</span>
                    <div className={styles.barTrack}>
                      <div
                        className={styles.barFill}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className={styles.barCount}>{count}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Filter / Sort */}
        {stats.total > 0 && (
          <div className={styles.controls}>
            {filterStar > 0 && (
              <button className={styles.clearFilter} onClick={() => setFilterStar(0)}>
                Showing {filterStar}★ · Clear filter
              </button>
            )}
            <div className={styles.sortWrap}>
              <label htmlFor="rev-sort" className={styles.sortLabel}>Sort by</label>
              <select
                id="rev-sort"
                className={styles.sortSelect}
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
                <option value="helpful">Most Helpful</option>
              </select>
            </div>
          </div>
        )}

        {/* Review list */}
        {filtered.length > 0 ? (
          <div className={styles.list}>
            {filtered.map(r => (
              <div key={r.id} className={styles.review}>
                <div className={styles.reviewTop}>
                  <div className={styles.reviewMeta}>
                    <div className={styles.avatar}>
                      {(r.name || 'A').charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className={styles.reviewAuthor}>{r.name}</p>
                      <p className={styles.reviewDate}>{timeAgo(r.date)}</p>
                    </div>
                  </div>
                  <StarDisplay rating={r.rating} />
                </div>
                {r.title && <p className={styles.reviewTitle}>{r.title}</p>}
                <p className={styles.reviewBody}>{r.body}</p>
                <button
                  className={styles.helpfulBtn}
                  onClick={() => handleHelpful(r.id)}
                >
                  Helpful {r.helpful > 0 && `(${r.helpful})`}
                </button>
              </div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className={styles.empty}>
            <p className={styles.emptyText}>No reviews yet. Be the first to share your experience.</p>
            {!formOpen && (
              <button className={styles.writeBtn} onClick={() => setFormOpen(true)}>
                Write the First Review
              </button>
            )}
          </div>
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptyText}>No {filterStar}★ reviews yet.</p>
            <button className={styles.clearFilter} onClick={() => setFilterStar(0)}>
              Clear filter
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
