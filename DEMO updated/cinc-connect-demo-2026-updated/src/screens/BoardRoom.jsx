import { useEffect, useRef } from 'react'
import { useMode } from '../ModeContext'
import './BoardRoom.css'

// Rows with screen: null are placeholders until their sub-screen exists
const ROWS = [
  { screen: null,           label: 'Accounts Receivable',       count: 2,    icon: <ARIcon /> },
  { screen: null,           label: 'Board Action Items Review', count: 3,    icon: <ChecklistIcon /> },
  { screen: null,           label: 'Board ACC Review',          count: 2,    icon: <ACCIcon /> },
  { screen: null,           label: 'Board Violations Review',   count: 2,    icon: <ViolationsIcon /> },
  { screen: null,           label: 'Board Work Order Review',   count: 2,    icon: <WOIcon /> },
  { screen: null,           label: 'Invoice Approval',          count: 2,    icon: <InvoiceIcon /> },
  { screen: 'bank-summary',  label: 'Bank Summary',              count: 3,    icon: <BankIcon /> },
  { screen: null,           label: 'Vendor Payment History',    count: 2,    icon: <VendorPaymentIcon /> },
  { screen: 'board-aging',   label: 'Board Aging',               count: 3,    icon: <AgingIcon /> },
  { screen: 'members-list', label: 'Homeowner List',            count: null, icon: <HomeownersIcon /> },
]

export default function BoardRoom() {
  const { pushResidentView } = useMode()
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current?.parentElement
    if (el) el.scrollTop = 0
  }, [])

  return (
    <div className="screen br-screen" ref={ref}>
      <h1 className="br-title">Board Room</h1>
      <div className="br-card">
        {ROWS.map((row, i) => (
          <div key={row.label}>
            {i > 0 && <div className="br-divider" />}
            <button
              className="br-row"
              onClick={() => { if (row.screen) pushResidentView(row.screen) }}
            >
              <span className="br-row__icon">{row.icon}</span>
              <span className="br-row__label">{row.label}</span>
              {row.count != null && (
                <span className="br-row__badge">{row.count}</span>
              )}
              <ChevronIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Icons ───────────────────────────────────────────────── */

function ChevronIcon() {
  return (
    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" className="br-row__chevron">
      <path d="M1 1l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ARIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <path d="M8 21h8M12 17v4"/>
      <path d="M7 9h3M7 12h5"/>
      <path d="M14 9h3v4h-3z"/>
    </svg>
  )
}

function ChecklistIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
      <rect x="9" y="3" width="6" height="4" rx="1"/>
      <path d="M9 12l2 2 4-4"/>
      <path d="M9 17h4"/>
    </svg>
  )
}

function ACCIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
      <path d="M12 7v.01"/>
    </svg>
  )
}

function ViolationsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  )
}

function WOIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  )
}

function InvoiceIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  )
}

function BankIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 9 12 2 21 9"/>
      <path d="M4 9v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9"/>
      <path d="M9 20V12h6v8"/>
    </svg>
  )
}

function VendorPaymentIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  )
}

function AgingIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <path d="M3 9h18"/>
      <path d="M9 21V9"/>
      <path d="M7 13h2M7 17h2M13 13h2M13 17h2"/>
    </svg>
  )
}

function HomeownersIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  )
}
