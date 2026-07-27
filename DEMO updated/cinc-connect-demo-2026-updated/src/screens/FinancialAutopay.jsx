import { useState } from 'react'
import { UNITS, fmt } from '../data/financialData'
import './FinancialAutopay.css'

export default function FinancialAutopay({ unitId }) {
  const unit = UNITS.find(u => u.id === unitId) || UNITS[0]
  const [lineItems, setLineItems] = useState(() => unit.lineItems.map(li => ({ ...li })))
  const [confirmMsg, setConfirmMsg] = useState(null)

  function toggle(label) {
    setLineItems(items => items.map(li => {
      if (li.label !== label) return li
      const next = !li.autopay
      setConfirmMsg(`Autopay turned ${next ? 'on' : 'off'} for ${label}.`)
      return { ...li, autopay: next }
    }))
  }

  return (
    <div className="screen fap-screen">
      <h1 className="fap-title">Autopay</h1>
      <p className="fap-subtitle">{unit.label} · ACC#: {unit.account}</p>

      {confirmMsg && (
        <div className="fap-banner">
          <span>{confirmMsg}</span>
          <button className="fap-banner__close" onClick={() => setConfirmMsg(null)} aria-label="Dismiss">×</button>
        </div>
      )}

      <div className="fap-card">
        {lineItems.map((li, i) => (
          <div key={li.label}>
            {i > 0 && <div className="fap-divider" />}
            <div className="fap-row">
              <div className="fap-row__text">
                <span className="fap-row__label">{li.label}</span>
                <span className="fap-row__amount">{fmt(li.amount)} due</span>
              </div>
              <button
                className={`fap-toggle${li.autopay ? ' fap-toggle--on' : ''}`}
                onClick={() => toggle(li.label)}
                role="switch"
                aria-checked={li.autopay}
                aria-label={`Toggle autopay for ${li.label}`}
              >
                <span className="fap-toggle__knob" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="fap-note">
        When Autopay is on, the current balance for that charge type is automatically paid using your default
        payment method a few days before the due date.
      </p>
    </div>
  )
}
