import { useState, useRef } from 'react'
import housePhoto from '../images/house.jpg'
import { CURRENT_USER } from '../data/userData'
import './HomeValuationCarousel.css'

const $full = v => '$' + v.toLocaleString()
const $K    = v => v >= 1000000 ? '$' + (v / 1000000).toFixed(1) + 'M' : '$' + Math.round(v / 1000) + 'K'

const VALUATION_STATS = [
  { estimatedValue: 425000, valueChange: 12000,  rangeLow: 398000, rangeHigh: 452000, confidenceScore: 0.85, confidenceLabel: 'Very High', updatedDate: 'Apr 1, 2026' },
  { estimatedValue: 318000, valueChange: -4500,  rangeLow: 300000, rangeHigh: 335000, confidenceScore: 0.75, confidenceLabel: 'High',      updatedDate: 'Apr 1, 2026' },
  { estimatedValue: 540000, valueChange: 22000,  rangeLow: 510000, rangeHigh: 570000, confidenceScore: 0.75, confidenceLabel: 'High',      updatedDate: 'Apr 1, 2026' },
  { estimatedValue: 275000, valueChange: 3100,   rangeLow: 260000, rangeHigh: 290000, confidenceScore: 0.50, confidenceLabel: 'Medium',    updatedDate: 'Apr 1, 2026' },
]

export const VALUATION_UNITS = CURRENT_USER.units.map((unit, i) => ({
  id: unit.id,
  address: unit.address,
  ...VALUATION_STATS[i],
}))

function RangeBar({ low, value, high }) {
  const pos = Math.max(4, Math.min(96, ((value - low) / (high - low)) * 100))
  return (
    <div className="nmi-range-wrap">
      <div className="nmi-range-bar">
        <div className="nmi-range-fill" />
        <div className="nmi-range-needle" style={{ left: `${pos}%` }} />
      </div>
      <div className="nmi-range-labels">
        <span>{$K(low)}</span>
        <span className="nmi-range-center">{$full(value)}</span>
        <span>{$K(high)}</span>
      </div>
    </div>
  )
}

function ConfidenceDots({ score, label }) {
  const count = Math.round(score * 4)
  return (
    <div className="nmi-conf-wrap">
      <div className="nmi-conf-dots">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className={`nmi-conf-dot${i <= count ? ' nmi-conf-dot--on' : ''}`} />
        ))}
      </div>
      <span className="nmi-conf-label">{label} Confidence</span>
    </div>
  )
}

function ArrowIcon({ direction }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {direction === 'prev'
        ? <polyline points="15 18 9 12 15 6"/>
        : <polyline points="9 18 15 12 9 6"/>}
    </svg>
  )
}

export default function HomeValuationCarousel({ onCardClick, edgePadding = 20 }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const scrollRef = useRef(null)

  function onScroll(e) {
    const el = e.currentTarget
    const idx = Math.round(el.scrollLeft / el.clientWidth)
    setActiveIdx(Math.min(idx, VALUATION_UNITS.length - 1))
  }

  function goTo(i) {
    const el = scrollRef.current
    if (!el) return
    const clamped = Math.max(0, Math.min(i, VALUATION_UNITS.length - 1))
    el.scrollTo({ left: clamped * el.clientWidth, behavior: 'smooth' })
    setActiveIdx(clamped)
  }

  return (
    <div className="hvc-wrap" style={{ margin: `0 -${edgePadding}px` }}>
      <div className="hvc-track" ref={scrollRef} onScroll={onScroll}>
        {VALUATION_UNITS.map(unit => (
          <div key={unit.id} className="hvc-slide" style={{ padding: `2px ${edgePadding}px 0` }}>
            <div className="nmi-card hvc-card" onClick={() => onCardClick && onCardClick(unit)}>
              <div className="nmi-avm-top">
                <img src={housePhoto} className="nmi-avm-photo" alt="Property" />
                <div className="nmi-avm-info">
                  <p className="nmi-prop-address hvc-address">{unit.address}</p>
                  <p className="nmi-avm-value">{$full(unit.estimatedValue)}</p>
                  <p className="nmi-avm-updated">Updated {unit.updatedDate}</p>
                  <div className={`nmi-change-badge ${unit.valueChange >= 0 ? 'nmi-change-badge--up' : 'nmi-change-badge--down'}`}>
                    <span>{unit.valueChange >= 0 ? '↗' : '↘'} {$K(Math.abs(unit.valueChange))} past 12 months</span>
                  </div>
                </div>
              </div>
              <div className="nmi-avm-lower">
                <p className="nmi-field-label">Estimated Range</p>
                <RangeBar low={unit.rangeLow} value={unit.estimatedValue} high={unit.rangeHigh} />
                <ConfidenceDots score={unit.confidenceScore} label={unit.confidenceLabel} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeIdx > 0 && (
        <button
          className="hvc-arrow hvc-arrow--prev"
          style={{ left: edgePadding + 6 }}
          aria-label="Previous unit"
          onClick={() => goTo(activeIdx - 1)}
        >
          <ArrowIcon direction="prev" />
        </button>
      )}
      {activeIdx < VALUATION_UNITS.length - 1 && (
        <button
          className="hvc-arrow hvc-arrow--next"
          style={{ right: edgePadding + 6 }}
          aria-label="Next unit"
          onClick={() => goTo(activeIdx + 1)}
        >
          <ArrowIcon direction="next" />
        </button>
      )}

      <div className="hvc-dots">
        {VALUATION_UNITS.map((_, i) => (
          <button
            key={i}
            className={`hvc-dot${i === activeIdx ? ' hvc-dot--active' : ''}`}
            aria-label={`Go to unit ${i + 1}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  )
}
