import { useState } from 'react'
import { createPortal } from 'react-dom'
import unitIconRaw from '../ICONS/Unit.svg?raw'
import invoiceIconRaw from '../ICONS/Invoice.svg?raw'
import timeMoneyIconRaw from '../ICONS/time-money.svg?raw'
import walletIconRaw from '../ICONS/wallet.svg?raw'
import autopayIconRaw from '../ICONS/autopay.svg?raw'
import CustomContentSheet from '../components/CustomContentSheet'
import roadImg from '../images/road.jpg'
import hoaImg from '../images/hoa.jpg'
import boardImg from '../images/board.jpg'
import './ResidentFinancialHub.css'

// Layout: hero image + two data tables
const RESERVE_FUND_CONTENT = {
  hero: roadImg,
  tag: 'Financial Report',
  title: 'Reserve Fund Study 2026',
  subtitle: 'Prepared by Benson & Associates · Published April 2026',
  sections: [
    {
      heading: 'Reserve Status',
      table: {
        headers: ['Metric', 'Value'],
        rows: [
          ['Current balance', '$1,247,500'],
          ['Fully funded threshold', '$2,100,000'],
          ['Percent funded', '59.4%'],
          ['Monthly increase (per unit)', '+$18 from Jan 2027'],
        ],
      },
    },
    {
      heading: 'Planned Capital Projects',
      table: {
        headers: ['Project', 'Year', 'Budget'],
        rows: [
          ['Pool resurfacing', '2027', '$185,000'],
          ['Entry gate & access', '2028', '$94,000'],
          ['Parking lot repaving', '2028–30', '$340,000'],
          ['Clubhouse HVAC', '2031', '$68,000'],
          ['Perimeter fencing', '2033', '$210,000'],
        ],
      },
    },
    {
      heading: 'Next Steps',
      text: 'The Board will vote on the recommended funding increase at the Annual Meeting on July 15, 2026. Written comments may be submitted to the HOA office by July 1.',
    },
  ],
  links: [
    { label: 'Download Full Reserve Fund Study (PDF)' },
    { label: 'View 2025 Audited Financial Statements' },
    { label: 'Submit Comments to the Board' },
  ],
}

const UNITS = [
  {
    id: 1,
    label: '319 Cardinal Hills Dr',
    account: 'CH:6523',
    balance: 750.41,
    futureBalance: 2368.00,
    lineItems: [
      { label: 'Regular Charges',    autopay: false, amount: 500.00 },
      { label: 'Special Assessment', autopay: true,  amount: 70.41  },
      { label: 'Violations',         autopay: false, amount: 80.00  },
    ],
  },
  {
    id: 2,
    label: '47 Pinecrest Loop',
    account: 'CH:7841',
    balance: 320.00,
    futureBalance: 960.00,
    lineItems: [
      { label: 'Regular Charges',    autopay: false, amount: 320.00 },
      { label: 'Special Assessment', autopay: false, amount: 0.00   },
      { label: 'Violations',         autopay: false, amount: 0.00   },
    ],
  },
]

function ReserveFundIcon() {
  return (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  )
}

const BASE_TILES = [
  { label: 'Statements',       icon: <StatementsIcon /> },
  { label: 'Payment\nHistory', icon: <PaymentHistoryIcon /> },
  { label: 'Payment\nMethods', icon: <PaymentMethodsIcon /> },
  { label: 'Autopay',          icon: <AutopayIcon /> },
]

function fmt(n) {
  return '$' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/* ── Unit selector sheet ─────────────────────────────────── */
function UnitSelectorSheet({ units, selectedId, onSelect, onClose }) {
  const [query, setQuery] = useState('')
  const filtered = units.filter(u =>
    u.label.toLowerCase().includes(query.toLowerCase()) ||
    u.account.toLowerCase().includes(query.toLowerCase())
  )

  const phoneFrame = document.querySelector('.phone-frame')

  return createPortal(
    <div className="fh-sheet-overlay" onClick={onClose}>
      <div className="fh-sheet" onClick={e => e.stopPropagation()}>
        {/* Sheet header */}
        <div className="fh-sheet__handle" />
        <div className="fh-sheet__header">
          <span className="fh-sheet__title">Select Unit or Account</span>
          <button className="fh-sheet__close" onClick={onClose}>Close</button>
        </div>
        <div className="fh-sheet__divider" />

        {/* Search */}
        <div className="fh-sheet__search-wrap">
          <SearchIcon />
          <input
            className="fh-sheet__search"
            placeholder="Search Unit or Account Number"
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
        </div>

        {/* Unit list */}
        <div className="fh-sheet__list">
          {filtered.map(u => (
            <button
              key={u.id}
              className="fh-unit-card"
              onClick={() => { onSelect(u.id); onClose() }}
            >
              <div className="fh-unit-card__top">
                <PinIcon />
                <div className="fh-unit-card__info">
                  <span className="fh-unit-card__address">{u.label}</span>
                  <span className="fh-unit-card__acct">ACC#: {u.account}</span>
                </div>
                <RadioIcon selected={u.id === selectedId} />
              </div>

              <div className="fh-unit-card__charges">
                {u.lineItems.map(item => (
                  <div key={item.label} className="fh-unit-card__charge-row">
                    <span className="fh-unit-card__charge-label">{item.label}:</span>
                    <span className="fh-unit-card__charge-amount">{fmt(item.amount)}</span>
                  </div>
                ))}
              </div>

              <div className="fh-unit-card__divider" />

              <div className="fh-unit-card__total-row">
                <span className="fh-unit-card__total-label">Total Balance:</span>
                <span className="fh-unit-card__total-amount">{fmt(u.balance)}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>,
    phoneFrame || document.body
  )
}

/* ── Main screen ─────────────────────────────────────────── */
export default function ResidentFinancialHub() {
  const [selectedId,     setSelectedId]     = useState(UNITS[0].id)
  const [sheetOpen,      setSheetOpen]      = useState(false)
  const [customSheet,    setCustomSheet]    = useState(null)

  const TILES = [
    ...BASE_TILES,
    { label: 'Reserve Fund\nStudy 2026', icon: <ReserveFundIcon />, onTap: () => setCustomSheet(RESERVE_FUND_CONTENT) },
  ]

  const unit = UNITS.find(u => u.id === selectedId)

  return (
    <div className="screen fh-screen">
      <h1 className="fh-title">Financial Hub</h1>

      {/* Unit selector trigger */}
      <button className="fh-selector" onClick={() => setSheetOpen(true)}>
        <PinIcon />
        <span className="fh-selector__label">{unit.label}</span>
        <ChevronDownIcon />
      </button>

      {/* Account card */}
      <div className="fh-card">
        <p className="fh-card__acct">ACC#: {unit.account}</p>

        {unit.lineItems.map((item, i) => (
          <div key={item.label}>
            <div className="fh-line-item">
              <div className="fh-line-item__left">
                <span className="fh-line-item__label">{item.label}</span>
                <span className={`fh-line-item__autopay${item.autopay ? ' fh-line-item__autopay--on' : ''}`}>
                  {item.autopay ? 'Autopay On' : 'Autopay Off'}
                </span>
              </div>
              <div className="fh-line-item__right">
                <span className="fh-line-item__amount">{fmt(item.amount)}</span>
                <ChevronRightIcon />
              </div>
            </div>
            {i < unit.lineItems.length - 1 && <div className="fh-divider" />}
          </div>
        ))}

        <div className="fh-divider fh-divider--thick" />

        <div className="fh-balance-row">
          <span className="fh-balance-row__label">Total Balance</span>
          <span className="fh-balance-row__dots" />
          <span className="fh-balance-row__total">{fmt(unit.balance)}</span>
        </div>
        <div className="fh-balance-row fh-balance-row--future">
          <span className="fh-balance-row__label">Future Balance (90 days)</span>
          <span className="fh-balance-row__dots" />
          <span className="fh-balance-row__future">{fmt(unit.futureBalance)}</span>
        </div>

        <button className="fh-pay-btn">MAKE A PAYMENT</button>
      </div>

      {/* Tile grid */}
      <div className="fh-grid">
        {TILES.map(({ label, icon, onTap }) => (
          <button key={label} className="fh-tile" onClick={onTap}>
            <span className="fh-tile__icon">{icon}</span>
            <span className="fh-tile__label">{label}</span>
          </button>
        ))}
      </div>

      {/* Unit selector sheet */}
      {sheetOpen && (
        <UnitSelectorSheet
          units={UNITS}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onClose={() => setSheetOpen(false)}
        />
      )}

      {customSheet && (
        <CustomContentSheet content={customSheet} onClose={() => setCustomSheet(null)} />
      )}
    </div>
  )
}

/* ── Icons ───────────────────────────────────────────────── */
function PinIcon() {
  return (
    <span style={{display:'flex',alignItems:'center',justifyContent:'center',width:16,height:20,flexShrink:0,color:'currentColor'}}
      dangerouslySetInnerHTML={{__html: unitIconRaw.replace(/fill="#FFF8EA"/g, 'fill="currentColor"')}} />
  )
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0, opacity:0.5}}>
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
      <path d="M1 1L6 7L11 1"/>
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 1L5 5L1 9"/>
    </svg>
  )
}

function RadioIcon({ selected }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{flexShrink:0}}>
      <circle cx="10" cy="10" r="9" stroke="var(--lime)" strokeWidth="1.5"/>
      {selected && <circle cx="10" cy="10" r="5.5" fill="var(--lime)"/>}
    </svg>
  )
}

function StatementsIcon() {
  return (
    <span style={{display:'flex',alignItems:'center',justifyContent:'center',width:52,height:52}}
      dangerouslySetInnerHTML={{__html: invoiceIconRaw.replace(/fill="#FFF8EA"/g, 'fill="currentColor"')}} />
  )
}

function PaymentHistoryIcon() {
  return (
    <span style={{display:'flex',alignItems:'center',justifyContent:'center',width:52,height:52}}
      dangerouslySetInnerHTML={{__html: timeMoneyIconRaw.replace(/fill="#FFF8EA"/g, 'fill="currentColor"')}} />
  )
}

function PaymentMethodsIcon() {
  return (
    <span style={{display:'flex',alignItems:'center',justifyContent:'center',width:52,height:52}}
      dangerouslySetInnerHTML={{__html: walletIconRaw.replace(/fill="#FFF8EA"/g, 'fill="currentColor"')}} />
  )
}

function AutopayIcon() {
  return (
    <span style={{display:'flex',alignItems:'center',justifyContent:'center',width:52,height:52}}
      dangerouslySetInnerHTML={{__html: autopayIconRaw.replace(/fill="#FFF8EA"/g, 'fill="currentColor"').replace(/fill="#fff8ea"/g, 'fill="currentColor"')}} />
  )
}
