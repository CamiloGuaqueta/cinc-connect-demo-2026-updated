import { useState } from 'react'
import './ResidentRatings.css'

// ─── Data ─────────────────────────────────────────────────────────────────────

const RATINGS = [
  {
    id: 'management',
    category: 'MANAGEMENT',
    question: 'How would you rate overall HOA management and board responsiveness?',
  },
  {
    id: 'maintenance',
    category: 'MAINTENANCE',
    question: 'How satisfied are you with the maintenance and upkeep of common areas?',
  },
  {
    id: 'communication',
    category: 'COMMUNICATION',
    question: 'How would you rate the clarity and frequency of HOA communications?',
  },
  {
    id: 'amenities',
    category: 'AMENITIES',
    question: 'How satisfied are you with the quality and availability of community amenities?',
  },
]

const LABELS = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent']

// ─── Star Row ─────────────────────────────────────────────────────────────────

function StarRow({ value, onChange, hovered, onHover, onLeave }) {
  return (
    <div className="rating-stars">
      {[1, 2, 3, 4, 5].map(n => {
        const filled = n <= (hovered ?? value ?? 0)
        return (
          <button
            key={n}
            className={`rating-star${filled ? ' rating-star--filled' : ''}`}
            onClick={() => onChange(n)}
            onMouseEnter={() => onHover(n)}
            onMouseLeave={onLeave}
            onTouchStart={() => onHover(n)}
            onTouchEnd={() => { onLeave(); onChange(n) }}
            aria-label={`${n} star${n > 1 ? 's' : ''}`}
          >
            <svg width="36" height="36" viewBox="0 0 24 24">
              <path
                d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z"
                fill={filled ? 'var(--lime)' : 'none'}
                stroke={filled ? 'var(--lime)' : 'var(--lime)'}
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )
      })}
    </div>
  )
}

// ─── Rating Card ──────────────────────────────────────────────────────────────

function RatingCard({ item, value, onChange }) {
  const [hovered, setHovered] = useState(null)
  const display = hovered ?? value

  return (
    <div className="rating-card">
      <p className="rating-card__category">{item.category}</p>
      <p className="rating-card__question">{item.question}</p>
      <StarRow
        value={value}
        onChange={onChange}
        hovered={hovered}
        onHover={setHovered}
        onLeave={() => setHovered(null)}
      />
      <div className="rating-card__footer">
        {display ? (
          <span className="rating-card__label rating-card__label--filled">
            {LABELS[display]}
            <span className="rating-card__num"> · {display}/5</span>
          </span>
        ) : (
          <span className="rating-card__label">Tap to rate</span>
        )}
        {value && (
          <span className="rating-card__change">Tap stars to update</span>
        )}
      </div>
    </div>
  )
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function ResidentRatings() {
  const [ratings, setRatings] = useState({})

  const setRating = (id, val) =>
    setRatings(prev => ({ ...prev, [id]: val }))

  const rated   = RATINGS.filter(r =>  ratings[r.id])
  const unrated = RATINGS.filter(r => !ratings[r.id])
  const ordered = [...unrated, ...rated]

  return (
    <div className="screen resident-ratings">
      <div className="resident-ratings__header">
        <h1 className="resident-ratings__title">Ratings</h1>
      </div>
      <div className="ratings-list">
        {ordered.map(item => (
          <RatingCard
            key={item.id}
            item={item}
            value={ratings[item.id] ?? null}
            onChange={val => setRating(item.id, val)}
          />
        ))}
      </div>
    </div>
  )
}
