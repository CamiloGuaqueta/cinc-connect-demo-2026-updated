import { useState, useMemo, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import './BoardAging.css'

// Delinquent homeowners — Cardinal Hills HOA (consistent with the community).
// Thomas Bravo is the logged-in board member, so he is intentionally NOT listed here.
const HOMEOWNERS = [
  {
    id: 'dalton',
    name: 'Dalton Thomson',
    photo: '/images/personas/dalton-thomson.png',
    address: '204 Cardinal Hills Dr',
    acct: '2024-1588',
    status: 'Owner Occupied',
    lastPayment: '$240.00',
    lastPaymentDate: '02/02/2026',
    email: 'dalton.thomson@email.com',
    phone: '(555) 345-0567',
    emergency: { name: 'Laura Thomson', email: 'laura.thomson@email.com', phone: '(555) 421-0890' },
    charges: [
      {
        label: 'Regular Assessment 2025', amount: '$1,916.00',
        breakdown: { current: '$0.00', d30: '$0.00', d60: '$0.00', d90: '$1,916.00', total: '$1,916.00' },
      },
      {
        label: 'Regular Assessment 2026', amount: '$1,680.00',
        breakdown: { current: '$1,680.00', d30: '$0.00', d60: '$0.00', d90: '$0.00', total: '$1,680.00' },
      },
    ],
    total: '$3,596.00',
  },
  {
    id: 'emma',
    name: 'Emma Hughes',
    photo: '/images/personas/emma-hughes.png',
    address: '76 Pinecrest Loop',
    acct: '2024-2341',
    status: 'Owner Occupied',
    lastPayment: '$480.00',
    lastPaymentDate: '03/10/2026',
    email: 'emma.hughes@email.com',
    phone: '(555) 512-7734',
    emergency: { name: 'Daniel Hughes', email: 'daniel.hughes@email.com', phone: '(555) 512-7735' },
    charges: [
      {
        label: 'Special Assessment 2025', amount: '$960.00', open: true,
        breakdown: { current: '$0.00', d30: '$0.00', d60: '$960.00', d90: '$0.00', total: '$960.00' },
      },
    ],
    total: '$960.00',
  },
  {
    id: 'james',
    name: 'James Roberts',
    photo: '/images/personas/james-roberts.png',
    address: '150 Cardinal Point Rd',
    acct: '2024-3096',
    status: 'Tenant Occupied',
    lastPayment: '$320.00',
    lastPaymentDate: '01/18/2026',
    email: 'james.roberts@email.com',
    phone: '(555) 648-2211',
    emergency: { name: 'Olivia Roberts', email: 'olivia.roberts@email.com', phone: '(555) 648-2212' },
    charges: [
      {
        label: 'Regular Assessment 2025', amount: '$1,120.00',
        breakdown: { current: '$0.00', d30: '$0.00', d60: '$560.00', d90: '$560.00', total: '$1,120.00' },
      },
      {
        label: 'Late Fee', amount: '$75.00',
        breakdown: { current: '$0.00', d30: '$0.00', d60: '$0.00', d90: '$75.00', total: '$75.00' },
      },
    ],
    total: '$1,195.00',
  },
]

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,248,234,0.45)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function ChargeChevron({ open }) {
  return (
    <svg className={`ba-row__chevron${open ? ' ba-row__chevron--up' : ''}`} width="12" height="8" viewBox="0 0 12 8" fill="none">
      <path d="M1 1l5 5 5-5" stroke="var(--lime)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function OwnerChevron() {
  return (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="ba-card__owner-chevron">
      <path d="M1 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function BackIcon() {
  return (
    <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
      <path d="M9 1L1 9L9 17" stroke="var(--lime)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChargeRow({ charge }) {
  const [open, setOpen] = useState(!!charge.open)
  const b = charge.breakdown
  return (
    <div className={`ba-row${open ? ' ba-row--open' : ''}`}>
      <button className="ba-row__toggle" type="button" onClick={() => setOpen(o => !o)}>
        <span className="ba-row__label">{charge.label}</span>
        <span className="ba-row__amount">{charge.amount}</span>
        <ChargeChevron open={open} />
      </button>
      {open && (
        <div className="ba-row__breakdown">
          {[
            ['Current', b.current],
            ['Over 30 Days', b.d30],
            ['Over 60 Days', b.d60],
            ['Over 90 Days', b.d90],
          ].map(([label, value]) => (
            <div className="ba-breakdown__line" key={label}>
              <span className="ba-breakdown__label">{label}</span>
              <span className="ba-breakdown__dots" />
              <span className="ba-breakdown__value">{value}</span>
            </div>
          ))}
          <div className="ba-breakdown__line ba-breakdown__line--total">
            <span className="ba-breakdown__label">Total</span>
            <span className="ba-breakdown__dots" />
            <span className="ba-breakdown__value ba-breakdown__value--lg">{b.total}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default function BoardAging() {
  const [query, setQuery] = useState('')
  const [owner, setOwner] = useState(null)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (el) el.scrollTop = 0
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return HOMEOWNERS
    return HOMEOWNERS.filter(h =>
      h.name.toLowerCase().includes(q) ||
      h.address.toLowerCase().includes(q) ||
      h.acct.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <div className="screen ba-screen" ref={ref}>
      <h1 className="ba-title">Board Aging</h1>

      <div className="ba-search">
        <input
          className="ba-search__input"
          type="text"
          placeholder="Search Account #, HO Name, Unit/Address"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <span className="ba-search__icon"><SearchIcon /></span>
      </div>

      {filtered.map(h => (
        <div className="ba-card" key={h.id}>
          <div className="ba-card__header">
            <p className="ba-card__address">{h.address}</p>
            <p className="ba-card__meta"><strong>Acct:</strong> {h.acct}</p>
            <p className="ba-card__meta"><strong>Status:</strong> <span className="ba-card__status">{h.status}</span></p>
            <p className="ba-card__meta"><strong>Last Payment:</strong> {h.lastPayment}</p>
            <p className="ba-card__meta"><strong>Last Payment Date:</strong> {h.lastPaymentDate}</p>
          </div>

          <button className="ba-card__owner" type="button" onClick={() => setOwner(h)}>
            {h.photo
              ? <img className="ba-card__owner-photo" src={h.photo} alt={h.name} />
              : <span className="ba-card__owner-initials">{h.name.split(' ').map(n => n[0]).join('')}</span>}
            <div className="ba-card__owner-info">
              <span className="ba-card__owner-name">{h.name}</span>
              <span className="ba-card__owner-role">Owner</span>
            </div>
            <OwnerChevron />
          </button>

          <div className="ba-card__charges">
            {h.charges.map((c, i) => <ChargeRow charge={c} key={i} />)}
            <div className="ba-row ba-row--total">
              <span className="ba-row__label">Total</span>
              <span className="ba-row__amount ba-row__amount--lg">{h.total}</span>
            </div>
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <p className="ba-empty">No homeowners match your search.</p>
      )}

      {owner && createPortal(
        <>
          <div className="ba-sheet-overlay" onClick={() => setOwner(null)} />
          <div className="ba-sheet">
            <div className="ba-sheet__header">
              <button className="ba-sheet__back" type="button" onClick={() => setOwner(null)} aria-label="Close">
                <BackIcon />
              </button>
              <span className="ba-sheet__title">Home Owner</span>
            </div>
            <div className="ba-sheet__hero">
              {owner.photo
                ? <img className="ba-sheet__avatar" src={owner.photo} alt={owner.name} />
                : <span className="ba-sheet__avatar-initials">{owner.name.split(' ').map(n => n[0]).join('')}</span>}
              <h2 className="ba-sheet__name">{owner.name}</h2>
            </div>
            <div className="ba-sheet__body">
              <div className="ba-sheet__card">
                <div className="ba-sheet__row">
                  <div className="ba-sheet__row-text">
                    <p className="ba-sheet__row-primary ba-sheet__row-primary--lime">{owner.address}</p>
                    <p className="ba-sheet__row-sub">Acct: {owner.acct}</p>
                  </div>
                </div>
                <div className="ba-sheet__divider" />
                <a className="ba-sheet__row" href={`mailto:${owner.email}`}>
                  <p className="ba-sheet__row-primary">{owner.email}</p>
                </a>
                <div className="ba-sheet__divider" />
                <a className="ba-sheet__row" href={`tel:${owner.phone.replace(/[^+\d]/g, '')}`}>
                  <p className="ba-sheet__row-primary">{owner.phone}</p>
                </a>
              </div>

              <h3 className="ba-sheet__section-title">Emergency contact</h3>
              <div className="ba-sheet__card">
                <div className="ba-sheet__row">
                  <p className="ba-sheet__row-primary">{owner.emergency.name}</p>
                </div>
                <div className="ba-sheet__divider" />
                <a className="ba-sheet__row" href={`mailto:${owner.emergency.email}`}>
                  <p className="ba-sheet__row-primary">{owner.emergency.email}</p>
                </a>
                <div className="ba-sheet__divider" />
                <a className="ba-sheet__row" href={`tel:${owner.emergency.phone.replace(/[^+\d]/g, '')}`}>
                  <p className="ba-sheet__row-primary">{owner.emergency.phone}</p>
                </a>
              </div>
            </div>
          </div>
        </>,
        document.querySelector('.phone-frame') || document.body
      )}
    </div>
  )
}
