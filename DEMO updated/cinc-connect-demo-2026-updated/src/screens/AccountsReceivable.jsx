import { useState, useMemo, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useMode } from '../ModeContext'
import hoaBg from '../images/hoa.jpg'
import './AccountsReceivable.css'

// Delinquent accounts — same three homeowners as Board Aging so balances,
// accts and contact info match across Board Room screens.
const ACCOUNTS = [
  {
    id: 'dalton',
    name: 'Dalton Thomson',
    photo: '/images/personas/dalton-thomson.png',
    address: '204 Cardinal Hills Dr',
    acct: '2024-1588',
    balance: '$3,596.00',
    lastPay: '02/02/2026',
    collections: 'At Attorney',
    email: 'dalton.thomson@email.com',
    phone: '(555) 421-0889',
    emergency: { name: 'Laura Thomson', email: 'laura.thomson@email.com', phone: '(555) 421-0890' },
    violations: 1,
    ledger: [
      { date: 'Apr 01 2026', items: [{ label: 'Regular Assessment 2026', sub: 'Q2 installment', amount: '$840.00' }] },
      { date: 'Jan 02 2026', items: [{ label: 'Regular Assessment 2026', sub: 'Q1 installment', amount: '$840.00' }] },
      { date: 'Oct 01 2025', items: [{ label: 'Regular Assessment 2025', sub: 'Q4 installment', amount: '$958.00' }] },
      { date: 'Jul 01 2025', items: [{ label: 'Regular Assessment 2025', sub: 'Q3 installment', amount: '$958.00' }] },
    ],
    collectionsLog: [
      { date: '03/15/26', user: 'Community Manager', action: 'Collection Level', from: '60 Days Notice', to: 'At Attorney' },
      { date: '01/20/26', user: 'Community Manager', action: 'Collection Level', from: '30 Days Notice', to: '60 Days Notice' },
      { date: '12/05/25', user: 'Darren Wilson', action: 'Collection Level', from: 'Owner', to: '30 Days Notice' },
    ],
  },
  {
    id: 'emma',
    name: 'Emma Hughes',
    photo: '/images/personas/emma-hughes.png',
    address: '76 Pinecrest Loop',
    acct: '2024-2341',
    balance: '$960.00',
    lastPay: '03/10/2026',
    collections: '30 Days Notice',
    email: 'emma.hughes@email.com',
    phone: '(555) 512-7734',
    emergency: { name: 'Daniel Hughes', email: 'daniel.hughes@email.com', phone: '(555) 512-7735' },
    violations: 0,
    ledger: [
      { date: 'Mar 20 2026', items: [{ label: 'Special Assessment 2025', sub: 'Pool renovation', amount: '$960.00' }] },
    ],
    collectionsLog: [
      { date: '04/22/26', user: 'Community Manager', action: 'Collection Level', from: 'Owner', to: '30 Days Notice' },
    ],
  },
  {
    id: 'james',
    name: 'James Roberts',
    photo: '/images/personas/james-roberts.png',
    address: '150 Cardinal Point Rd',
    acct: '2024-3096',
    balance: '$1,195.00',
    lastPay: '01/18/2026',
    collections: '60 Days Notice',
    email: 'james.roberts@email.com',
    phone: '(555) 648-2211',
    emergency: { name: 'Olivia Roberts', email: 'olivia.roberts@email.com', phone: '(555) 648-2212' },
    violations: 0,
    ledger: [
      { date: 'Feb 10 2026', items: [{ label: 'Late Fee', amount: '$75.00' }] },
      { date: 'Feb 01 2026', items: [{ label: 'Regular Assessment 2025', sub: 'Q4 installment', amount: '$560.00' }] },
      { date: 'Jan 02 2026', items: [{ label: 'Regular Assessment 2025', sub: 'Q3 installment', amount: '$560.00' }] },
    ],
    collectionsLog: [
      { date: '04/05/26', user: 'Community Manager', action: 'Collection Level', from: '30 Days Notice', to: '60 Days Notice' },
      { date: '02/25/26', user: 'Community Manager', action: 'Collection Level', from: 'Owner', to: '30 Days Notice' },
    ],
  },
]

/* ── Icons ───────────────────────────────────────────────── */
function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,248,234,0.45)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
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

function RowChevron() {
  return (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="ar-card__chevron">
      <path d="M1 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function LedgerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  )
}

function CollectionsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 6v6l4 2"/>
    </svg>
  )
}

function ViolationRowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  )
}

function TxIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
    </svg>
  )
}

/* ── Slide-over sub-screen (ledger / collections) ────────── */
function SubScreen({ title, onClose, children }) {
  return createPortal(
    <div className="ar-sub">
      <div className="ar-sub__header">
        <button className="ar-sub__back" type="button" onClick={onClose} aria-label="Back">
          <BackIcon />
        </button>
        <span className="ar-sub__title">{title}</span>
      </div>
      <div className="ar-sub__body">{children}</div>
    </div>,
    document.querySelector('.phone-frame') || document.body
  )
}

export default function AccountsReceivable() {
  const { pushResidentView } = useMode()
  const [query, setQuery] = useState('')
  const [owner, setOwner] = useState(null)
  const [sub, setSub] = useState(null)   // { type: 'ledger' | 'collections', acct }
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (el) el.scrollTop = 0
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ACCOUNTS
    return ACCOUNTS.filter(a =>
      a.name.toLowerCase().includes(q) ||
      a.address.toLowerCase().includes(q) ||
      a.acct.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <div className="screen arx-screen" ref={ref}>
      <h1 className="arx-title">Accounts Receivable</h1>

      <div className="arx-search">
        <input
          className="arx-search__input"
          type="text"
          placeholder="Search Name, Address, Account"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <span className="arx-search__icon"><SearchIcon /></span>
      </div>

      {filtered.map(a => (
        <div className="ar-card" key={a.id}>
          <div className="ar-card__header">
            <p className="ar-card__address">{a.address}</p>
            <p className="ar-card__meta"><strong>Acct:</strong> {a.acct}</p>
            <p className="ar-card__meta"><strong>Total Balance:</strong> <span className="ar-card__lime">{a.balance}</span></p>
            <p className="ar-card__meta"><strong>Last Pay:</strong> {a.lastPay}</p>
            <p className="ar-card__meta"><strong>Collections:</strong> <span className="ar-card__lime">{a.collections}</span></p>
          </div>

          <button className="ar-card__owner" type="button" onClick={() => setOwner(a)}>
            <img className="ar-card__owner-photo" src={a.photo} alt={a.name} />
            <div className="ar-card__owner-info">
              <span className="ar-card__owner-name">{a.name}</span>
              <span className="ar-card__owner-role">Owner</span>
            </div>
            <RowChevron />
          </button>

          <button className="ar-card__link" type="button" onClick={() => setSub({ type: 'ledger', acct: a })}>
            <LedgerIcon />
            <span className="ar-card__link-label">Account Ledger</span>
            <RowChevron />
          </button>
          <button className="ar-card__link" type="button" onClick={() => setSub({ type: 'collections', acct: a })}>
            <CollectionsIcon />
            <span className="ar-card__link-label">Collections</span>
            <RowChevron />
          </button>
          {a.violations > 0 && (
            <button className="ar-card__link" type="button" onClick={() => pushResidentView('board-violations')}>
              <ViolationRowIcon />
              <span className="ar-card__link-label">Violations</span>
              <span className="ar-card__link-badge">{a.violations}</span>
              <RowChevron />
            </button>
          )}
        </div>
      ))}

      {filtered.length === 0 && (
        <p className="arx-empty">No accounts match your search.</p>
      )}

      {/* ── Home Owner sheet (same pattern as Board Aging) ── */}
      {owner && createPortal(
        <>
          <div className="ar-sheet-overlay" onClick={() => setOwner(null)} />
          <div className="ar-sheet">
            <div className="ar-sub__header">
              <button className="ar-sub__back" type="button" onClick={() => setOwner(null)} aria-label="Close">
                <BackIcon />
              </button>
              <span className="ar-sub__title">Home Owner</span>
            </div>
            <div className="ar-sheet__hero">
              <img src={hoaBg} alt="" className="ar-sheet__hero-bg" aria-hidden="true" />
              <div className="ar-sheet__hero-overlay" />
              <div className="ar-sheet__hero-content">
                <img className="ar-sheet__avatar" src={owner.photo} alt={owner.name} />
                <h2 className="ar-sheet__name">{owner.name}</h2>
              </div>
            </div>
            <div className="ar-sheet__body">
              <div className="ar-sheet__card">
                <div className="ar-sheet__row">
                  <div>
                    <p className="ar-sheet__row-primary ar-sheet__row-primary--lime">{owner.address}</p>
                    <p className="ar-sheet__row-sub">Acct: {owner.acct}</p>
                  </div>
                </div>
                <div className="ar-sheet__divider" />
                <a className="ar-sheet__row" href={`mailto:${owner.email}`}>
                  <p className="ar-sheet__row-primary">{owner.email}</p>
                </a>
                <div className="ar-sheet__divider" />
                <a className="ar-sheet__row" href={`tel:${owner.phone.replace(/[^+\d]/g, '')}`}>
                  <p className="ar-sheet__row-primary">{owner.phone}</p>
                </a>
              </div>

              <h3 className="ar-sheet__section-title">Emergency contact</h3>
              <div className="ar-sheet__card">
                <div className="ar-sheet__row">
                  <p className="ar-sheet__row-primary">{owner.emergency.name}</p>
                </div>
                <div className="ar-sheet__divider" />
                <a className="ar-sheet__row" href={`mailto:${owner.emergency.email}`}>
                  <p className="ar-sheet__row-primary">{owner.emergency.email}</p>
                </a>
                <div className="ar-sheet__divider" />
                <a className="ar-sheet__row" href={`tel:${owner.emergency.phone.replace(/[^+\d]/g, '')}`}>
                  <p className="ar-sheet__row-primary">{owner.emergency.phone}</p>
                </a>
              </div>
            </div>
          </div>
        </>,
        document.querySelector('.phone-frame') || document.body
      )}

      {/* ── Ledger sub-screen ── */}
      {sub?.type === 'ledger' && (
        <SubScreen title="Ledger" onClose={() => setSub(null)}>
          <div className="ar-ledger__meta">
            <p className="ar-ledger__acct"><strong>Acct:</strong> {sub.acct.acct}</p>
            <p className="ar-ledger__address">{sub.acct.address}</p>
          </div>
          <div className="ar-ledger__balance">
            <span className="ar-ledger__balance-label">Total Balance</span>
            <span className="ar-ledger__balance-amount">{sub.acct.balance}</span>
          </div>
          {sub.acct.ledger.map(group => (
            <div key={group.date}>
              <p className="ar-ledger__date">{group.date}</p>
              <div className="ar-ledger__card">
                {group.items.map((item, i) => (
                  <div key={item.label + i}>
                    {i > 0 && <div className="ar-ledger__divider" />}
                    <div className="ar-ledger__row">
                      <TxIcon />
                      <div className="ar-ledger__row-text">
                        <span className="ar-ledger__row-label">{item.label}</span>
                        {item.sub && <span className="ar-ledger__row-sub">{item.sub}</span>}
                      </div>
                      <span className="ar-ledger__row-amount">{item.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </SubScreen>
      )}

      {/* ── Collections sub-screen ── */}
      {sub?.type === 'collections' && (
        <SubScreen title="Collections" onClose={() => setSub(null)}>
          <div className="ar-ledger__meta">
            <p className="ar-ledger__acct"><strong>Acct:</strong> {sub.acct.acct}</p>
            <p className="ar-ledger__address">{sub.acct.address}</p>
          </div>
          {sub.acct.collectionsLog.map((log, i) => (
            <div className="ar-coll-card" key={i}>
              <p className="ar-coll-card__line"><strong>Date:</strong> {log.date}</p>
              <p className="ar-coll-card__line"><strong>User:</strong> {log.user}</p>
              <p className="ar-coll-card__line"><strong>Action:</strong> {log.action}</p>
              <p className="ar-coll-card__line"><strong>From:</strong> {log.from}</p>
              <p className="ar-coll-card__line"><strong>To:</strong> <span className="ar-card__lime">{log.to}</span></p>
            </div>
          ))}
        </SubScreen>
      )}
    </div>
  )
}
