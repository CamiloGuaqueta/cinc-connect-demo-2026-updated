import { useEffect, useRef } from 'react'
import './BankSummary.css'

// Association bank accounts — Cardinal Hills HOA
const ACCOUNTS = [
  {
    name: 'Bank of America, Operating Account',
    acct: '****4021',
    type: 'Depository Account',
    bankBalance: '$257,628.31',
    registerBalance: '$263,144.00',
    asOf: '05/19/2026',
  },
  {
    name: 'Bank of America, Reserve Fund',
    acct: '****8841',
    type: 'Reserve Account',
    bankBalance: '$1,245,360.00',
    registerBalance: '$1,287,420.00',
    asOf: '05/19/2026',
  },
  {
    name: 'Bank of America, Maintenance Reserve',
    acct: '****2207',
    type: 'Reserve Account',
    bankBalance: '$185,245.00',
    registerBalance: '$213,963.00',
    asOf: '05/19/2026',
  },
]

export default function BankSummary() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (el) el.scrollTop = 0
  }, [])

  return (
    <div className="screen bs-screen" ref={ref}>
      <h1 className="bs-title">Bank Summary</h1>

      {ACCOUNTS.map(acc => (
        <div className="bs-card" key={acc.acct}>
          <div className="bs-card__header">
            <p className="bs-card__name">{acc.name}</p>
            <p className="bs-card__meta"><strong>Acct:</strong> {acc.acct}</p>
            <p className="bs-card__type">{acc.type}</p>
          </div>
          <div className="bs-card__body">
            <div className="bs-card__row">
              <span className="bs-card__label">Bank Balance</span>
              <span className="bs-card__dots" />
              <span className="bs-card__value-stack">
                <span className="bs-card__value">{acc.bankBalance}</span>
                <span className="bs-card__date">As of: {acc.asOf}</span>
              </span>
            </div>
            <div className="bs-card__row">
              <span className="bs-card__label">Register Balance</span>
              <span className="bs-card__dots" />
              <span className="bs-card__value-stack">
                <span className="bs-card__value">{acc.registerBalance}</span>
                <span className="bs-card__date">As of: {acc.asOf}</span>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
