import { UNITS, getPaymentHistory } from '../data/financialData'
import './FinancialPaymentHistory.css'

function PayIcon() {
  return (
    <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
      <path d="M1 5L5 9L13 1" stroke="var(--res-bg1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function FinancialPaymentHistory({ unitId }) {
  const unit = UNITS.find(u => u.id === unitId) || UNITS[0]
  const history = getPaymentHistory(unit)

  return (
    <div className="screen fph-screen">
      <h1 className="fph-title">Payment History</h1>
      <p className="fph-subtitle">{unit.label} · ACC#: {unit.account}</p>

      {history.length === 0 ? (
        <p className="fph-empty">No payments recorded yet for this unit.</p>
      ) : (
        history.map(group => (
          <div key={group.date}>
            <p className="fph-date">{group.date}</p>
            <div className="fph-card">
              {group.items.map((item, i) => (
                <div key={item.label + i}>
                  {i > 0 && <div className="fph-divider" />}
                  <div className="fph-row">
                    <span className="fph-row__icon"><PayIcon /></span>
                    <div className="fph-row__text">
                      <span className="fph-row__label">{item.label}</span>
                      <span className="fph-row__sub">{item.sub}</span>
                    </div>
                    <span className="fph-row__amount">{item.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
