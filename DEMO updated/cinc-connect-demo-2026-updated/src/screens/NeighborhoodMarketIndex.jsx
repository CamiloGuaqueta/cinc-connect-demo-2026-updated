import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useMode } from '../ModeContext'
import { BLOGS } from '../data/blogs'
import sarahPhoto from '../images/sarah1.jpg'
import housePhoto from '../images/house.jpg'
import HomeValuationCarousel from '../components/HomeValuationCarousel'
import './NeighborhoodMarketIndex.css'

/* ── Formatters ─────────────────────────────────────── */
const $full = v => '$' + v.toLocaleString()
const $K    = v => v >= 1000000 ? '$' + (v / 1000000).toFixed(1) + 'M' : '$' + Math.round(v / 1000) + 'K'
const fmtPct = (v, sign = true) => (sign && v > 0 ? '+' : '') + v.toFixed(1) + '%'
const fmtDate = d => new Date(d + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

/* ── Mock data ──────────────────────────────────────── */
const MOCK = {
  meta: {
    address: '12346 Washington Avenue',
    city: 'Cardinal Hills',
    state: 'FL',
    zip: '32801',
    avmAsOf: '2026-04-01 00:00:00',
  },
  avm: {
    estimatedValue: 425000,
    valueChangeAmount: 12000,
    rangeLow: 398000,
    rangeHigh: 452000,
    confidenceScore: 0.85,
    confidenceLabel: 'Very High',
  },
  nmiScore: {
    composite: 72,
    label: 'Good',
    percentileCounty: 72,
    valuation: 68,
    demand: 81,
    turnover: 55,
    momentum: 74,
  },
  realtorCard: {
    agentName: 'Sarah Mitchell',
    title: 'Senior Real Estate Agent',
    brokerage: 'Cardinal Realty Group',
    phone: '(407) 555-0192',
    email: 'sarah@cardinalrealty.com',
  },
  market: {
    medianSalePrice: 418000,
    medianSalePricePctChange: 4.2,
    homesSold90d: 23,
    avgDaysOnMarket: 18,
    priorAvgDom: 24,
    avgPricePerSqft: 215,
    pricePerSqftPctChange: 3.1,
    activeListings: 7,
    marketCondition: 'Balanced',
    marketTrend: '• Stable',
  },
  areaProfile: {
    ownerOccupiedPct: 78,
    medianHomeValue: 412000,
    medianBuildYear: 2001,
    schoolDistrict: 'Orange County Schools',
    vacancyRate: 4.2,
  },
  recentSales: [
    { address: '101 Maple Ridge Dr',     beds: 3, baths: 2, sqft: 1820, status: 'Sold',    salePrice: 415000, saleDate: '2026-04-12' },
    { address: '234 Birchwood Ct',       beds: 4, baths: 3, sqft: 2240, status: 'Sold',    salePrice: 498000, saleDate: '2026-04-08' },
    { address: '57 Oakridge Ln',         beds: 3, baths: 2, sqft: 1650, status: 'Active',  salePrice: 389000, saleDate: '2026-04-05' },
    { address: '89 Willowbrook Way',     beds: 5, baths: 4, sqft: 3100, status: 'Sold',    salePrice: 621000, saleDate: '2026-03-28' },
    { address: '412 Cherry Blossom Pl',  beds: 3, baths: 2, sqft: 1710, status: 'Pending', salePrice: 402000, saleDate: '2026-03-22' },
    { address: '63 Ferndale Ave',        beds: 4, baths: 2, sqft: 1990, status: 'Sold',    salePrice: 441000, saleDate: '2026-03-18' },
    { address: '175 Glen Park Rd',       beds: 3, baths: 3, sqft: 2050, status: 'Sold',    salePrice: 459000, saleDate: '2026-03-14' },
    { address: '28 Juniper Ct',          beds: 2, baths: 2, sqft: 1300, status: 'Sold',    salePrice: 325000, saleDate: '2026-03-10' },
    { address: '501 Ivy Crossing',       beds: 4, baths: 3, sqft: 2380, status: 'Active',  salePrice: 512000, saleDate: '2026-03-06' },
    { address: '37 Brookhaven Ln',       beds: 3, baths: 2, sqft: 1740, status: 'Sold',    salePrice: 427000, saleDate: '2026-03-01' },
    { address: '99 Lakeside Dr',         beds: 4, baths: 4, sqft: 2800, status: 'Sold',    salePrice: 589000, saleDate: '2026-02-24' },
    { address: '14 Sunrise Blvd',        beds: 3, baths: 2, sqft: 1580, status: 'Sold',    salePrice: 371000, saleDate: '2026-02-18' },
  ],
}

/* ── NMI Gauge ──────────────────────────────────────── */
function arcSegColor(t) {
  const lerp = (a, b, s) => Math.round(a + (b - a) * s)
  const [r, g, b] = t < 0.5
    ? [lerp(224, 255, t * 2), lerp(92, 183, t * 2),  lerp(92, 77,  t * 2)]
    : [lerp(255, 178, (t - 0.5) * 2), lerp(183, 222, (t - 0.5) * 2), lerp(77, 97, (t - 0.5) * 2)]
  return `rgb(${r},${g},${b})`
}

function NmiGauge({ score }) {
  const cx = 70, cy = 70, R = 54
  const SEGS = 72
  const glowColor = score < 40 ? '#e05c5c' : score < 70 ? '#ffb74d' : '#B2DE61'

  const segs = []
  for (let i = 0; i < SEGS; i++) {
    const t0 = i / SEGS
    if (t0 >= score / 100) break
    const t1 = Math.min((i + 1) / SEGS, score / 100)
    const a0 = -Math.PI / 2 + t0 * 2 * Math.PI
    const a1 = -Math.PI / 2 + t1 * 2 * Math.PI
    const x0 = cx + R * Math.cos(a0), y0 = cy + R * Math.sin(a0)
    const x1 = cx + R * Math.cos(a1), y1 = cy + R * Math.sin(a1)
    segs.push(
      <path key={i} d={`M ${x0} ${y0} A ${R} ${R} 0 0 1 ${x1} ${y1}`}
        fill="none" stroke={arcSegColor(t0 / (score / 100))}
        strokeWidth="13" strokeLinecap="butt" opacity="0.92" />
    )
  }

  const startA = -Math.PI / 2
  const endA   = -Math.PI / 2 + (score / 100) * 2 * Math.PI
  const capR = 6.5

  return (
    <svg width="140" height="140" viewBox="0 0 140 140">
      <circle cx={cx} cy={cy} r={R + 9} fill="none" stroke={glowColor} strokeWidth="1" opacity="0.12" />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="13" />
      {segs}
      <circle cx={cx + R * Math.cos(startA)} cy={cy + R * Math.sin(startA)} r={capR} fill="#e05c5c" opacity="0.92" />
      <circle cx={cx + R * Math.cos(endA)}   cy={cy + R * Math.sin(endA)}   r={capR} fill={arcSegColor(1)} opacity="0.92" />
      <text x={cx} y={cy + 8} fill="#FFF8EA" fontSize="34" fontWeight="700" textAnchor="middle" fontFamily="Montserrat,sans-serif" letterSpacing="-1">{score}</text>
      <text x={cx} y={cy + 28} fill="rgba(255,248,234,0.35)" fontSize="11" textAnchor="middle" fontFamily="Montserrat,sans-serif">/ 100</text>
    </svg>
  )
}

/* ── Sub-score bar ──────────────────────────────────── */
function SubScoreBar({ label, value }) {
  const color = value < 40 ? '#e05c5c' : value < 70 ? '#ffb74d' : '#B2DE61'
  return (
    <div className="nmi-sub-row">
      <span className="nmi-sub-label">{label}</span>
      <div className="nmi-sub-track">
        <div className="nmi-sub-fill" style={{ width: `${value}%`, background: color }} />
      </div>
      <span className="nmi-sub-val" style={{ color }}>{value}</span>
    </div>
  )
}

/* ── AVM Range bar ──────────────────────────────────── */
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

/* ── Confidence dots ────────────────────────────────── */
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

/* ── Status badge ───────────────────────────────────── */
function StatusBadge({ status }) {
  const cls = status === 'Active' ? 'nmi-badge--active' : status === 'Pending' ? 'nmi-badge--pending' : 'nmi-badge--sold'
  return <span className={`nmi-badge ${cls}`}>{status}</span>
}

/* ── Inline icons ───────────────────────────────────── */
function PinIcon() {
  return (
    <svg width="24" height="32" viewBox="0 0 24 32" fill="none" style={{ position: 'relative', zIndex: 1 }}>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 8.5 12 20 12 20S24 20.5 24 12C24 5.373 18.627 0 12 0Z" fill="rgba(178,222,97,0.7)" />
      <circle cx="12" cy="12" r="5" fill="#112719" />
    </svg>
  )
}
function PhoneSmIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 25 26" fill="none">
      <path d="M23.6 18.94l-2.55-1.89a2.5 2.5 0 00-3.05-.21c-1.4.73-3.08.44-4.19-.71L9.51 12.1c-1.11-1.15-1.38-2.91-.68-4.36A2.5 2.5 0 008.6 4.1L6.78 1.45A2.5 2.5 0 004.07.02C2.86.14 1.84.9 1.34 2.06c-1.97 4.58-1 10.05 2.41 13.6l6.52 6.77c2.23 2.33 5.26 3.57 8.32 3.57 1.62 0 3.25-.34 4.77-1.06 1.11-.52 1.84-1.58 1.96-2.84.12-1.25-.4-2.44-1.38-3.16Z" fill="currentColor" />
    </svg>
  )
}
function EmailSmIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M16 8v5a3 3 0 006 0v-1a10 10 0 10-3.92 7.94" />
    </svg>
  )
}

/* ── Blog pull-up sheet ─────────────────────────────── */
const CATEGORY_COLORS = {
  lime:  { bg: 'rgba(178,222,97,0.15)',   color: '#B2DE61' },
  amber: { bg: 'rgba(255,183,77,0.15)',   color: '#ffb74d' },
  blue:  { bg: 'rgba(100,160,255,0.15)',  color: '#64a0ff' },
}

function BlogSheet({ post, onClose }) {
  const cc = CATEGORY_COLORS[post.categoryColor] || CATEGORY_COLORS.lime
  return (
    <div className="nmi-blog-overlay">
      <div className="nmi-blog-overlay__backdrop" onClick={onClose} />
      <div className="nmi-blog-sheet">
        <div className="nmi-blog-sheet__handle" />
        <div className="nmi-blog-sheet__scroll">
          {post.heroImage && (
            <div className="nmi-blog-sheet__hero">
              <img src={post.heroImage} alt="" className="nmi-blog-sheet__hero-img" />
              <div className="nmi-blog-sheet__hero-overlay" />
              <button className="nmi-blog-sheet__close" onClick={onClose}>✕</button>
            </div>
          )}
          {!post.heroImage && (
            <div className="nmi-blog-sheet__top-row">
              <button className="nmi-blog-sheet__close-plain" onClick={onClose}>✕</button>
            </div>
          )}
          <div className="nmi-blog-sheet__body">
            <span className="nmi-tag nmi-blog-tag" style={{ background: cc.bg, color: cc.color }}>{post.category}</span>
            <h2 className="nmi-blog-sheet__title">{post.title}</h2>
            <div className="nmi-blog-sheet__meta">
              <img src={sarahPhoto} alt="Sarah Mitchell" className="nmi-blog-sheet__avatar" />
              <div>
                <p className="nmi-blog-sheet__author">Sarah Mitchell</p>
                <p className="nmi-blog-sheet__sub">{post.date} · {post.readTime}</p>
              </div>
            </div>
            <div className="nmi-blog-sheet__divider" />
            {post.paragraphs.map((p, i) => (
              <p key={i} className="nmi-blog-sheet__para">{p}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Main screen ────────────────────────────────────── */
export default function NeighborhoodMarketIndex() {
  const { pushResidentView } = useMode()
  const { meta, avm, nmiScore, realtorCard, market, areaProfile, recentSales } = MOCK
  const [activeBlog, setActiveBlog] = useState(null)

  const updatedDate = meta.avmAsOf.split(' ')[0]
  const pageSales   = recentSales.slice(0, 5)
  const agentInitials = realtorCard.agentName.split(' ').map(w => w[0]).join('')
  const scoreGrade = nmiScore.composite < 40 ? 'bad' : nmiScore.composite < 70 ? 'fair' : 'good'

  return (
    <div className="screen nmi-screen">
      {activeBlog && createPortal(
        <BlogSheet post={activeBlog} onClose={() => setActiveBlog(null)} />,
        document.querySelector('.phone-frame') || document.body
      )}
      <div className="nmi-inner">

        {/* ── Property Header ─────────────────────── */}
        <div className="nmi-prop-header">
          <p className="nmi-prop-address">Home Value Insights</p>
        </div>

        {/* ── At a Glance tiles ───────────────────── HIDDEN
        <div className="nmi-kpi-row">
          ...
        </div>
        */}

        {/* ── AVM Carousel ────────────────────────── */}
        <p className="nmi-section-label">Home Valuation</p>
        <HomeValuationCarousel edgePadding={16} />

        {/* ── Realtor Card ────────────────────────── */}
        <p className="nmi-section-label">Featured Realtor</p>
        <div className="nmi-card nmi-realtor-card">
          <div className="nmi-realtor-top">
            <img src={sarahPhoto} alt={realtorCard.agentName} className="nmi-realtor-avatar nmi-realtor-avatar--photo" />
            <div>
              <p className="nmi-realtor-name">{realtorCard.agentName}</p>
              <p className="nmi-realtor-title">{realtorCard.title}</p>
              <p className="nmi-realtor-brokerage">{realtorCard.brokerage}</p>
            </div>
          </div>
          <div className="nmi-realtor-info">
            <div className="nmi-realtor-info-row">
              <PhoneSmIcon />
              <span>{realtorCard.phone}</span>
            </div>
            <div className="nmi-realtor-info-row">
              <EmailSmIcon />
              <span>{realtorCard.email}</span>
            </div>
          </div>
          <div className="nmi-realtor-actions">
            <button className="nmi-realtor-btn nmi-realtor-btn--primary">Schedule a Call</button>
            <button className="nmi-realtor-btn nmi-realtor-btn--secondary">See Listings</button>
          </div>
        </div>

        {/* ── NMI Score Card ──────────────────────── */}
        <p className="nmi-section-label">Community Score</p>
        <div className="nmi-card nmi-score-card">
          <div className="nmi-gauge-wrap">
            <NmiGauge score={nmiScore.composite} />
            <span className={`nmi-score-badge nmi-score-badge--${scoreGrade}`}>{nmiScore.label}</span>
          </div>
          <p className="nmi-percentile">Top {100 - nmiScore.percentileCounty}% in County</p>
          <div className="nmi-sub-scores">
            <SubScoreBar label="Valuation" value={nmiScore.valuation} />
            <SubScoreBar label="Demand"    value={nmiScore.demand}    />
            <SubScoreBar label="Turnover"  value={nmiScore.turnover}  />
            <SubScoreBar label="Momentum"  value={nmiScore.momentum}  />
          </div>
        </div>

        {/* ── Market Stats ────────────────────────── */}
        <p className="nmi-section-label">Neighborhood Market Stats</p>
        <div className="nmi-card nmi-stat-card">
          <div className="nmi-stat-grid">
            <div className="nmi-stat-cell">
              <p className="nmi-stat-val">{$K(market.medianSalePrice)}</p>
              <p className="nmi-stat-label">Median Sale Price</p>
              <p className={`nmi-stat-delta ${market.medianSalePricePctChange >= 0 ? 'nmi-delta--up' : 'nmi-delta--down'}`}>
                {fmtPct(market.medianSalePricePctChange)} YoY
              </p>
            </div>
            <div className="nmi-stat-cell">
              <p className="nmi-stat-val">{market.homesSold90d}</p>
              <p className="nmi-stat-label">Homes Sold (90d)</p>
            </div>
            <div className="nmi-stat-cell">
              <p className="nmi-stat-val">{market.avgDaysOnMarket}<span className="nmi-stat-unit"> days</span></p>
              <p className="nmi-stat-label">Avg Days on Market</p>
              <p className="nmi-stat-sub">Down from {market.priorAvgDom} days</p>
            </div>
            <div className="nmi-stat-cell">
              <p className="nmi-stat-val">${market.avgPricePerSqft}<span className="nmi-stat-unit">/sqft</span></p>
              <p className="nmi-stat-label">Price per Sq Ft</p>
              <p className={`nmi-stat-delta ${market.pricePerSqftPctChange >= 0 ? 'nmi-delta--up' : 'nmi-delta--down'}`}>
                {fmtPct(market.pricePerSqftPctChange)} YoY
              </p>
            </div>
            <div className="nmi-stat-cell">
              <p className="nmi-stat-val">{market.activeListings}</p>
              <p className="nmi-stat-label">Active Listings</p>
            </div>
            <div className="nmi-stat-cell">
              <p className="nmi-stat-val nmi-stat-val--sm nmi-delta--up">{market.marketCondition}</p>
              <p className="nmi-stat-label">Market Condition</p>
              <p className="nmi-stat-sub">{market.marketTrend}</p>
            </div>
          </div>
        </div>

        {/* ── Area Profile ────────────────────────── HIDDEN */}

        {/* ── Neighborhood Note ───────────────────── */}
        <p className="nmi-section-label">Neighborhood Notes</p>
        <div className="nmi-card nmi-note-card">
          <div className="nmi-note-header">
            <img className="nmi-note-photo" src={sarahPhoto} alt={realtorCard.name} />
            <div className="nmi-note-tags">
              <span className="nmi-tag nmi-tag--lime">Market Update</span>
              <span className="nmi-tag nmi-tag--lime">Spring 2026</span>
              <span className="nmi-tag nmi-tag--lime">Maple Ridge</span>
            </div>
          </div>
          <p className="nmi-note-body">
            The local market continues to outperform the broader metro this spring. Inventory remains tight — most well-priced homes go under contract within 10 days. Your AVM reflects solid equity growth and the area's momentum score remains strong.
          </p>
          <p className="nmi-note-attribution">Posted by {realtorCard.name} · Featured local agent</p>
        </div>

        {/* ── Recent Sales ────────────────────────── */}
        <div className="nmi-section-row">
          <p className="nmi-section-label" style={{ marginTop: 0 }}>Recent Sales</p>
          <span className="nmi-sales-total">Full Report</span>
        </div>
        <div className="nmi-card">
          {pageSales.map((sale, i) => (
            <div key={i} className={`nmi-sale-row${i < pageSales.length - 1 ? ' nmi-sale-row--border' : ''}`}>
              <div className="nmi-sale-info">
                <p className="nmi-sale-address">{sale.address}</p>
                <p className="nmi-sale-details">{sale.beds}bd · {sale.baths}ba · {sale.sqft.toLocaleString()} sqft</p>
              </div>
              <div className="nmi-sale-right">
                <StatusBadge status={sale.status} />
                <p className="nmi-sale-price">{$K(sale.salePrice)}</p>
                <p className="nmi-sale-date">{fmtDate(sale.saleDate)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Neighborhood Insights (Blog list) ──── HIDDEN */}

      </div>

      <div className="nmi-legal">
        <p>The information provided is drawn from a variety of trusted sources. Data may vary and is intended for informational purposes only. Not appraisals; not warranted to be accurate. Consult a licensed real estate professional.</p>
        <p>Content is managed by the platform, and does not constitute an endorsement by HOA, its board or management company. Questions: <a href="mailto:[email protected]">[email protected]</a></p>
        <p>Realtors interested in contributing: <a href="mailto:[email protected]">[email protected]</a></p>
      </div>

    </div>
  )
}
