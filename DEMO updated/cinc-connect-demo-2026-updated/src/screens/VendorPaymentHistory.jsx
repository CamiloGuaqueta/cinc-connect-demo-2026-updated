import { useState, useMemo, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import './VendorPaymentHistory.css'

// Reference "today" for the demo, consistent with Bank Summary (As of 05/19/2026)
const NOW = new Date(2026, 4, 19)

// Paid vendor invoices — Cardinal Hills HOA. Recurring vendors match the
// pending invoices in Tasks.jsx (Green Valley, Pacific Pool, Westside Plumbing).
const PAYMENTS = [
  { id: 1, vendor: 'Green Valley Landscaping',      date: '04/15/2026', invoice: 'GVL_032026', amount: '$6,200.00' },
  { id: 2, vendor: 'Pacific Pool Services',         date: '04/10/2026', invoice: 'PPS_032026', amount: '$3,800.00' },
  { id: 3, vendor: 'Westside Plumbing',             date: '03/28/2026', invoice: 'WSP_022026', amount: '$2,140.00' },
  { id: 4, vendor: 'AC&M Construction Services',    date: '03/15/2026', invoice: 'ACM-34567',  amount: '$36,720.00' },
  { id: 5, vendor: 'Pipes And Flows LLC',           date: '02/28/2026', invoice: 'PFL-00892',  amount: '$4,150.00' },
  { id: 6, vendor: '1-800-GOT-JUNK?',               date: '02/20/2026', invoice: 'GJI_025445', amount: '$2,360.00' },
  { id: 7, vendor: 'EverGreen Property Care',       date: '01/18/2026', invoice: 'EGP-11204',  amount: '$1,890.00' },
]

const DATE_RANGES = [
  { key: 'all', label: 'All time',      days: null },
  { key: 'd30', label: 'Last 30 days',  days: 30 },
  { key: 'd90', label: 'Last 90 days',  days: 90 },
  { key: 'd180', label: 'Last 6 months', days: 180 },
]

function parseDate(mdy) {
  const [m, d, y] = mdy.split('/').map(Number)
  return new Date(y, m - 1, d)
}

function VendorIcon() {
  return (
    <svg className="vph-card__icon" width="26" height="22" viewBox="0 0 25 22" fill="none">
      <path d="M2 14V7.5C2 6.12 2.84 4.9 4.1 4.38L11.5 1.5L18.9 4.38C20.16 4.9 21 6.12 21 7.5V14"
        stroke="var(--lime)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="1" y="13" width="22" height="7" rx="2" stroke="var(--lime)" strokeWidth="1.6" />
      <path d="M8.5 13v7M15.5 13v7" stroke="var(--lime)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,248,234,0.45)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function FilterIcon() {
  return (
    <svg width="22" height="20" viewBox="0 0 22 20" fill="none">
      <line x1="1" y1="6" x2="21" y2="6" stroke="var(--lime)" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="1" y1="14" x2="21" y2="14" stroke="var(--lime)" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="7" cy="6" r="2.6" fill="var(--res-bg2)" stroke="var(--lime)" strokeWidth="1.8" />
      <circle cx="15" cy="14" r="2.6" fill="var(--res-bg2)" stroke="var(--lime)" strokeWidth="1.8" />
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

export default function VendorPaymentHistory() {
  const [query, setQuery] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [vendorFilter, setVendorFilter] = useState('')      // applied
  const [rangeFilter, setRangeFilter] = useState('all')     // applied
  const [draftVendor, setDraftVendor] = useState('')        // in-sheet
  const [draftRange, setDraftRange] = useState('all')       // in-sheet
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (el) el.scrollTop = 0
  }, [])

  const vendors = useMemo(() => [...new Set(PAYMENTS.map(p => p.vendor))], [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const range = DATE_RANGES.find(r => r.key === rangeFilter)
    return PAYMENTS.filter(p => {
      if (q && !(p.vendor.toLowerCase().includes(q) || p.invoice.toLowerCase().includes(q))) return false
      if (vendorFilter && p.vendor !== vendorFilter) return false
      if (range?.days != null) {
        const diffDays = (NOW - parseDate(p.date)) / 86400000
        if (diffDays > range.days) return false
      }
      return true
    })
  }, [query, vendorFilter, rangeFilter])

  const activeFilterCount = (vendorFilter ? 1 : 0) + (rangeFilter !== 'all' ? 1 : 0)

  function openFilter() {
    setDraftVendor(vendorFilter)
    setDraftRange(rangeFilter)
    setFilterOpen(true)
  }
  function applyFilter() {
    setVendorFilter(draftVendor)
    setRangeFilter(draftRange)
    setFilterOpen(false)
  }
  function resetFilter() {
    setDraftVendor('')
    setDraftRange('all')
  }

  return (
    <div className="screen vph-screen" ref={ref}>
      <div className="vph-title-row">
        <h1 className="vph-title">Vendor Payment History</h1>
        <button className={`vph-filter-btn${activeFilterCount ? ' vph-filter-btn--active' : ''}`} onClick={openFilter} aria-label="Filter">
          <FilterIcon />
          {activeFilterCount > 0 && <span className="vph-filter-badge">{activeFilterCount}</span>}
        </button>
      </div>

      <div className="vph-search">
        <input
          className="vph-search__input"
          type="text"
          placeholder="Search by Vendor Name, Invoice#"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <span className="vph-search__icon"><SearchIcon /></span>
      </div>

      <div className="vph-list">
        {filtered.map(p => (
          <div className="vph-card" key={p.id}>
            <div className="vph-card__vendor">
              <VendorIcon />
              <span className="vph-card__name">{p.vendor}</span>
            </div>
            <div className="vph-card__meta">
              <p className="vph-card__meta-line"><strong>Date:</strong> {p.date}</p>
              <p className="vph-card__meta-line"><strong>Invoice #:</strong> {p.invoice}</p>
            </div>
            <div className="vph-card__amount-row">
              <span className="vph-card__amount-label">Invoice Amount</span>
              <span className="vph-card__amount">{p.amount}</span>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="vph-empty">No payments match your filters.</p>}
      </div>

      {filterOpen && createPortal(
        <>
          <div className="vph-sheet-overlay" onClick={() => setFilterOpen(false)} />
          <div className="vph-sheet">
            <div className="vph-sheet__header">
              <button className="vph-sheet__back" onClick={() => setFilterOpen(false)} aria-label="Close"><BackIcon /></button>
              <span className="vph-sheet__title">Filter Payment History</span>
              <button className="vph-sheet__reset" onClick={resetFilter}>Reset</button>
            </div>
            <div className="vph-sheet__body">
              <p className="vph-filter-section">Vendor</p>
              <div className="vph-filter-group">
                <button
                  className={`vph-chip${draftVendor === '' ? ' vph-chip--active' : ''}`}
                  onClick={() => setDraftVendor('')}
                >All vendors</button>
                {vendors.map(v => (
                  <button
                    key={v}
                    className={`vph-chip${draftVendor === v ? ' vph-chip--active' : ''}`}
                    onClick={() => setDraftVendor(v)}
                  >{v}</button>
                ))}
              </div>

              <p className="vph-filter-section">Invoice Date</p>
              <div className="vph-radio-group">
                {DATE_RANGES.map(r => (
                  <button key={r.key} className="vph-radio-row" onClick={() => setDraftRange(r.key)}>
                    <span className={`vph-radio${draftRange === r.key ? ' vph-radio--selected' : ''}`} />
                    <span className="vph-radio-label">{r.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="vph-sheet__footer">
              <button className="vph-apply" onClick={applyFilter}>Apply Filter</button>
            </div>
          </div>
        </>,
        document.querySelector('.phone-frame') || document.body
      )}
    </div>
  )
}
