import { useState } from 'react'
import { useMode } from '../ModeContext'
import { UNITS, PAYMENT_METHODS, fmt } from '../data/financialData'
import './FinancialMakePayment.css'

const NOW = new Date(2026, 4, 19)
const PAYMENT_DATE = NOW.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
const CONFIRMATION_CODE = 'MX345678'

function BackIcon() {
  return (
    <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
      <path d="M9 1L1 9L9 17" stroke="var(--lime)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="44" height="34" viewBox="0 0 44 34" fill="none">
      <path d="M3 17L16 30L41 3" stroke="var(--res-bg1)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="fmp-tool-row__chev">
      <path d="M1 1l6 6-6 6" stroke="rgba(255,248,234,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function FinancialMakePayment({ unitId }) {
  const { pushResidentView, popResidentView } = useMode()
  const unit = UNITS.find(u => u.id === unitId) || UNITS[0]

  const [step, setStep] = useState('amount') // amount | method | review | success
  const [amountMode, setAmountMode] = useState('total')
  const [otherAmount, setOtherAmount] = useState('')
  const [methodId, setMethodId] = useState(PAYMENT_METHODS[0].id)

  const method = PAYMENT_METHODS.find(m => m.id === methodId) || PAYMENT_METHODS[0]
  const amount = amountMode === 'total' ? unit.balance : (parseFloat(otherAmount) || 0)
  const isCard = method.type === 'card'
  const fee = isCard ? amount * 0.04 : 0
  const total = amount + fee

  return (
    <div className="screen fmp-screen">
      {step !== 'amount' && step !== 'success' && (
        <button
          className="fmp-back"
          onClick={() => setStep(step === 'method' ? 'amount' : 'method')}
        >
          <BackIcon /> <span>Make Payment</span>
        </button>
      )}

      {step === 'amount' && (
        <>
          <h1 className="fmp-title">Make Payment</h1>
          <p className="fmp-subtitle">{unit.label} · ACC#: {unit.account}</p>

          <p className="fmp-section-title">Select Payment Amount</p>
          <div className="fmp-radio-card">
            <label className="fmp-radio-option">
              <input type="radio" name="fmp-amount" checked={amountMode === 'total'} onChange={() => setAmountMode('total')} />
              <span className="fmp-radio-option__radio" />
              <div className="fmp-radio-option__text">
                <span className="fmp-radio-option__label">Total Balance</span>
                <span className="fmp-radio-option__sub">{fmt(unit.balance)}</span>
              </div>
            </label>
            <div className="fmp-divider" />
            <label className="fmp-radio-option">
              <input type="radio" name="fmp-amount" checked={amountMode === 'other'} onChange={() => setAmountMode('other')} />
              <span className="fmp-radio-option__radio" />
              <div className="fmp-radio-option__text">
                <span className="fmp-radio-option__label">Other Amount</span>
                <span className="fmp-radio-option__sub">Enter Amount</span>
              </div>
            </label>
            {amountMode === 'other' && (
              <div className="fmp-amount-input-wrap">
                <span className="fmp-amount-input-prefix">$</span>
                <input
                  className="fmp-amount-input"
                  type="number"
                  inputMode="decimal"
                  placeholder="0.00"
                  value={otherAmount}
                  onChange={e => setOtherAmount(e.target.value)}
                  autoFocus
                />
              </div>
            )}
          </div>

          <p className="fmp-section-title">Payment tools</p>
          <div className="fmp-tool-card">
            <button className="fmp-tool-row" onClick={() => pushResidentView('fh-autopay', { unitId: unit.id })}>
              <span className="fmp-tool-row__label">AutoPay</span>
              <ChevronRightIcon />
            </button>
            <div className="fmp-divider" />
            <button className="fmp-tool-row" onClick={() => pushResidentView('fh-payment-methods')}>
              <span className="fmp-tool-row__label">Manage Payment Methods</span>
              <ChevronRightIcon />
            </button>
          </div>

          <button className="fmp-continue" onClick={() => setStep('method')}>Continue</button>
        </>
      )}

      {step === 'method' && (
        <>
          <p className="fmp-section-title">Select Payment Method</p>
          <div className="fmp-radio-card">
            {PAYMENT_METHODS.map((m, i) => (
              <div key={m.id}>
                {i > 0 && <div className="fmp-divider" />}
                <label className="fmp-radio-option">
                  <input type="radio" name="fmp-method" checked={methodId === m.id} onChange={() => setMethodId(m.id)} />
                  <span className="fmp-radio-option__radio" />
                  <div className="fmp-radio-option__text">
                    <span className="fmp-radio-option__label">{m.label}</span>
                    <span className="fmp-radio-option__sub">{m.sub}</span>
                  </div>
                </label>
              </div>
            ))}
          </div>

          <div className="fmp-tool-card">
            <button className="fmp-tool-row" onClick={() => pushResidentView('fh-payment-methods')}>
              <span className="fmp-tool-row__label">Manage Payment Methods</span>
              <ChevronRightIcon />
            </button>
          </div>

          <button className="fmp-continue" onClick={() => setStep('review')}>Continue</button>
        </>
      )}

      {step === 'review' && (
        <>
          <p className="fmp-section-title">Review Payment Details</p>

          <div className="fmp-review-card">
            <div className="fmp-review-row">
              <div className="fmp-review-row__info">
                <span className="fmp-review-row__label">Amount</span>
                <span className="fmp-review-row__sub">{amountMode === 'total' ? 'Total Balance' : 'Other Amount'}</span>
              </div>
              <span className="fmp-review-row__value">{fmt(amount)}</span>
            </div>
            <div className="fmp-divider" />
            <div className="fmp-review-row">
              <div className="fmp-review-row__info">
                <span className="fmp-review-row__label">Processing Fee</span>
                <span className="fmp-review-row__sub">{isCard ? 'Credit Card 4%' : 'No fee (bank account)'}</span>
              </div>
              <span className="fmp-review-row__value">{fmt(fee)}</span>
            </div>
            <div className="fmp-divider" />
            <div className="fmp-review-row">
              <span className="fmp-review-row__label">Total</span>
              <span className="fmp-review-row__value fmp-review-row__value--total">{fmt(total)}</span>
            </div>
          </div>

          <div className="fmp-info-card">
            <span className="fmp-info-card__label">Date</span>
            <span className="fmp-info-card__value">{PAYMENT_DATE}</span>
          </div>
          <div className="fmp-info-card">
            <span className="fmp-info-card__label">Payment Method</span>
            <span className="fmp-info-card__value">{method.label} - {method.sub}</span>
          </div>

          <button className="fmp-continue" onClick={() => setStep('success')}>Submit Payment</button>
        </>
      )}

      {step === 'success' && (
        <>
          <div className="fmp-success">
            <div className="fmp-success__icon"><CheckIcon /></div>
            <h2 className="fmp-success__title">Payment Submitted</h2>
            <p className="fmp-success__text">Your payment has been submitted. Your account balance will be updated shortly. Thank you!</p>
          </div>

          <div className="fmp-confirm-card">
            <span className="fmp-confirm-card__code">{CONFIRMATION_CODE}</span>
            <span className="fmp-confirm-card__label">Confirmation Code</span>
          </div>

          <div className="fmp-review-card">
            <div className="fmp-review-row">
              <div className="fmp-review-row__info">
                <span className="fmp-review-row__label">Amount</span>
                <span className="fmp-review-row__sub">{amountMode === 'total' ? 'Total Balance' : 'Other Amount'}</span>
              </div>
              <span className="fmp-review-row__value">{fmt(amount)}</span>
            </div>
            <div className="fmp-divider" />
            <div className="fmp-review-row">
              <div className="fmp-review-row__info">
                <span className="fmp-review-row__label">Processing Fee</span>
                <span className="fmp-review-row__sub">{isCard ? 'Credit Card 4%' : 'No fee (bank account)'}</span>
              </div>
              <span className="fmp-review-row__value">{fmt(fee)}</span>
            </div>
            <div className="fmp-divider" />
            <div className="fmp-review-row">
              <span className="fmp-review-row__label">Total</span>
              <span className="fmp-review-row__value fmp-review-row__value--total">{fmt(total)}</span>
            </div>
          </div>

          <div className="fmp-info-card">
            <span className="fmp-info-card__label">Date</span>
            <span className="fmp-info-card__value">{PAYMENT_DATE}</span>
          </div>
          <div className="fmp-info-card">
            <span className="fmp-info-card__label">Payment Method</span>
            <span className="fmp-info-card__value">{method.label} - {method.sub}</span>
          </div>

          <button className="fmp-continue" onClick={popResidentView}>Done</button>
        </>
      )}
    </div>
  )
}
