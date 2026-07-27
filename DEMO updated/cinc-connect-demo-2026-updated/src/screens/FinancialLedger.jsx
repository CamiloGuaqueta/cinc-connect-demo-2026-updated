import { useState } from 'react'
import { useMode } from '../ModeContext'
import { UNITS, fmt } from '../data/financialData'
import './FinancialLedger.css'

function PayIcon() {
  return (
    <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
      <path d="M1 5L5 9L13 1" stroke="var(--res-bg1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function FinancialLedger({ unitId, lineItemLabel }) {
  const { pushResidentView } = useMode()
  const unit = UNITS.find(u => u.id === unitId) || UNITS[0]
  const [activeLabel, setActiveLabel] = useState(lineItemLabel || unit.lineItems[0].label)

  const lineItem = unit.lineItems.find(li => li.label === activeLabel) || unit.lineItems[0]

  return (
    <div className="screen fl-screen">
      <h1 className="fl-title">Account Ledger</h1>
      <p className="fl-subtitle">{unit.label} · ACC#: {unit.account}</p>

      <div className="fl-tabs">
        {unit.lineItems.map(li => (
          <button
            key={li.label}
            className={`fl-tab${li.label === activeLabel ? ' fl-tab--active' : ''}`}
            onClick={() => setActiveLabel(li.label)}
          >
            {li.label}
          </button>
        ))}
      </div>

      <div className="fl-balance">
        <span className="fl-balance__label">Total Balance</span>
        <span className="fl-balance__amount">{fmt(lineItem.amount)}</span>
      </div>

      {lineItem.ledger.length === 0 ? (
        <p className="fl-empty">No transactions to show for {activeLabel.toLowerCase()}.</p>
      ) : (
        lineItem.ledger.map(group => (
          <div key={group.date}>
            <p className="fl-date">{group.date}</p>
            <div className="fl-card">
              {group.items.map((item, i) => {
                const isPayment = item.amount.startsWith('-')
                return (
                  <div key={item.label + i}>
                    {i > 0 && <div className="fl-divider" />}
                    <div className="fl-row">
                      {isPayment && (
                        <span className="fl-row__pay-icon"><PayIcon /></span>
                      )}
                      <div className="fl-row__text">
                        <span className={`fl-row__label${isPayment ? ' fl-row__label--lime' : ''}`}>{item.label}</span>
                        {item.sub && <span className="fl-row__sub">{item.sub}</span>}
                      </div>
                      <span className={`fl-row__amount${isPayment ? ' fl-row__amount--lime' : ''}`}>
                        {item.amount}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))
      )}

      <button
        className="fl-pay-btn"
        onClick={() => pushResidentView('fh-make-payment', { unitId: unit.id })}
      >
        MAKE A PAYMENT
      </button>
    </div>
  )
}
