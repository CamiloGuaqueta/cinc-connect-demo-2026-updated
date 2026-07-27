import { useState } from 'react'
import { useMode } from '../ModeContext'
import { PAYMENT_METHODS } from '../data/financialData'
import applePayIcon from '../ICONS/applepay.svg'
import './FinancialPaymentMethods.css'

function BackIcon() {
  return (
    <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
      <path d="M9 1L1 9L9 17" stroke="var(--lime)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" className="fpm-row__chev">
      <path d="M1 1l6 6-6 6" stroke="rgba(255,248,234,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CardIcon() {
  return (
    <svg width="26" height="18" viewBox="0 0 28 20" fill="none">
      <rect x="0.5" y="0.5" width="27" height="19" rx="3.5" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" />
      <rect x="0" y="6" width="28" height="5" fill="rgba(255,255,255,0.15)" />
      <rect x="3" y="13" width="8" height="2" rx="1" fill="rgba(255,255,255,0.3)" />
    </svg>
  )
}

function GooglePayBadge() {
  return (
    <span className="fpm-gpay-badge">
      <span className="fpm-gpay-badge__g">G</span>Pay
    </span>
  )
}

function MethodIcon({ method }) {
  if (method.id === 'applepay') return <img src={applePayIcon} alt="Apple Pay" className="fpm-brand-img fpm-brand-img--apple" />
  if (method.id === 'googlepay') return <GooglePayBadge />
  return <CardIcon />
}

function CheckIcon() {
  return (
    <svg width="44" height="34" viewBox="0 0 44 34" fill="none">
      <path d="M3 17L16 30L41 3" stroke="var(--res-bg1)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Word used in "Edit ___" / "Remove ___" / "___ Updated!" copy for each type.
function typeLabel(m) {
  if (m.type === 'card') return 'Credit Card'
  if (m.type === 'bank') return 'Bank Account'
  return m.label
}

export default function FinancialPaymentMethods() {
  const { defaultPaymentMethodId, setDefaultPaymentMethodId } = useMode()
  const [methods, setMethods] = useState(PAYMENT_METHODS)
  const [step, setStep] = useState('list') // list | add | edit | remove | removed | updated
  const [editingId, setEditingId] = useState(null)
  const [actionLabel, setActionLabel] = useState('')
  const [nickname, setNickname] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')

  const editing = methods.find(m => m.id === editingId)

  function formatExpiry(raw) {
    const digits = raw.replace(/\D/g, '').slice(0, 4)
    return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits
  }

  function openEdit(m) {
    setEditingId(m.id)
    setStep('edit')
  }

  function handleAddCard() {
    const last4 = cardNumber.replace(/\D/g, '').slice(-4) || '4321'
    setMethods(m => [
      ...m,
      {
        id: `card-${last4}`,
        label: `Visa - ${last4}`,
        sub: nickname || 'Credit Card',
        type: 'card',
        nickname: nickname || 'New Card',
        number: `**** ****** *${last4}`,
        expiry: expiry || '01/30',
        cvc: '000',
        address: '',
        state: '',
        zip: '',
      },
    ])
    setNickname('')
    setCardNumber('')
    setExpiry('')
    setStep('list')
  }

  function handleSave() {
    setActionLabel(typeLabel(editing))
    setStep('updated')
  }

  function handleRemove() {
    setActionLabel(typeLabel(editing))
    setMethods(m => m.filter(x => x.id !== editing.id))
    if (defaultPaymentMethodId === editing.id) setDefaultPaymentMethodId('bank1')
    setStep('removed')
  }

  return (
    <div className="screen fpm-screen">
      {step !== 'list' && (
        <button className="fpm-back" onClick={() => setStep('list')}>
          <BackIcon /> <span>Payment Methods</span>
        </button>
      )}

      {step === 'list' && (
        <>
          <h1 className="fpm-title">Payment Methods</h1>
          <p className="fpm-section-title">Saved Methods</p>
          <div className="fpm-card">
            {methods.map((m, i) => (
              <div key={m.id}>
                {i > 0 && <div className="fpm-divider" />}
                <div className="fpm-row">
                  <button
                    className={`fpm-row__default${m.id === defaultPaymentMethodId ? ' fpm-row__default--selected' : ''}`}
                    onClick={() => setDefaultPaymentMethodId(m.id)}
                    aria-pressed={m.id === defaultPaymentMethodId}
                    aria-label={`Set ${m.label} as default payment method`}
                  >
                    <span className="fpm-row__default-dot" />
                  </button>
                  <MethodIcon method={m} />
                  <div className="fpm-row__text">
                    <span className="fpm-row__label">
                      {m.label}
                      {m.id === defaultPaymentMethodId && <span className="fpm-row__default-badge">Default</span>}
                    </span>
                    <span className="fpm-row__sub">{m.sub}</span>
                  </div>
                  <button className="fpm-row__edit" onClick={() => openEdit(m)} aria-label={`Edit ${m.label}`}>
                    <ChevronRightIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="fpm-continue" onClick={() => setStep('add')}>Add Payment Method</button>
        </>
      )}

      {step === 'add' && (
        <>
          <p className="fpm-section-title">Add Debit or Credit Card</p>
          <div className="fpm-field-card">
            <div className="fpm-field">
              <span className="fpm-field__label">Nickname</span>
              <input className="fpm-field__input" type="text" placeholder="Optional" value={nickname} onChange={e => setNickname(e.target.value)} />
            </div>
          </div>
          <div className="fpm-field-card">
            <div className="fpm-field fpm-field--card-row">
              <CardIcon />
              <input className="fpm-field__input fpm-field__input--num" type="tel" inputMode="numeric" placeholder="Card number" maxLength={19} value={cardNumber} onChange={e => setCardNumber(e.target.value)} />
              <div className="fpm-field__divider" />
              <input
                className="fpm-field__input fpm-field__input--exp"
                type="tel"
                inputMode="numeric"
                placeholder="MM/YY"
                maxLength={5}
                value={expiry}
                onChange={e => setExpiry(formatExpiry(e.target.value))}
              />
              <div className="fpm-field__divider" />
              <input className="fpm-field__input fpm-field__input--cvc" type="tel" inputMode="numeric" placeholder="CVC" maxLength={4} />
            </div>
          </div>
          <div className="fpm-field-card">
            <div className="fpm-field">
              <span className="fpm-field__label">Address</span>
              <input className="fpm-field__input" type="text" placeholder="Billing address" />
            </div>
            <div className="fpm-field">
              <span className="fpm-field__label">State</span>
              <input className="fpm-field__input" type="text" placeholder="State" maxLength={2} />
            </div>
            <div className="fpm-field">
              <span className="fpm-field__label">Zip Code</span>
              <input className="fpm-field__input" type="tel" inputMode="numeric" placeholder="Zip code" maxLength={10} />
            </div>
          </div>
          <button className="fpm-continue" onClick={handleAddCard}>Add Credit Card</button>
        </>
      )}

      {step === 'edit' && editing && (
        <>
          <p className="fpm-section-title">Edit {typeLabel(editing)}</p>

          {editing.type === 'card' && (
            <>
              <div className="fpm-field-card">
                <div className="fpm-field">
                  <span className="fpm-field__label">Nickname</span>
                  <input className="fpm-field__input" type="text" value={editing.nickname} readOnly />
                </div>
              </div>
              <div className="fpm-field-card">
                <div className="fpm-field fpm-field--card-row">
                  <CardIcon />
                  <input className="fpm-field__input fpm-field__input--num" type="text" value={editing.number} readOnly />
                  <div className="fpm-field__divider" />
                  <input className="fpm-field__input fpm-field__input--exp" type="text" value={editing.expiry} readOnly />
                  <div className="fpm-field__divider" />
                  <input className="fpm-field__input fpm-field__input--cvc" type="text" value={editing.cvc} readOnly />
                </div>
              </div>
              <div className="fpm-field-card">
                <div className="fpm-field">
                  <span className="fpm-field__label">Address</span>
                  <input className="fpm-field__input" type="text" value={editing.address} readOnly />
                </div>
                <div className="fpm-field">
                  <span className="fpm-field__label">State</span>
                  <input className="fpm-field__input" type="text" value={editing.state} readOnly />
                </div>
                <div className="fpm-field">
                  <span className="fpm-field__label">Zip Code</span>
                  <input className="fpm-field__input" type="text" value={editing.zip} readOnly />
                </div>
              </div>
            </>
          )}

          {editing.type === 'bank' && (
            <div className="fpm-field-card">
              <div className="fpm-field">
                <span className="fpm-field__label">Account Name</span>
                <input className="fpm-field__input" type="text" value={editing.label} readOnly />
              </div>
              <div className="fpm-field">
                <span className="fpm-field__label">Account Number</span>
                <input className="fpm-field__input" type="text" value={`•••• ${editing.last4}`} readOnly />
              </div>
              <div className="fpm-field">
                <span className="fpm-field__label">Account Type</span>
                <input className="fpm-field__input" type="text" value={editing.sub} readOnly />
              </div>
            </div>
          )}

          {editing.type === 'wallet' && (
            <div className="fpm-field-card">
              <div className="fpm-field">
                <span className="fpm-field__label">Payment Method</span>
                <input className="fpm-field__input" type="text" value={editing.label} readOnly />
              </div>
              <div className="fpm-field">
                <span className="fpm-field__label">Linked Cards</span>
                <input className="fpm-field__input" type="text" value={editing.sub} readOnly />
              </div>
            </div>
          )}

          <div className="fpm-footer--stack">
            <button className="fpm-danger" onClick={() => setStep('remove')}>Remove {typeLabel(editing)}</button>
            <button className="fpm-continue" onClick={handleSave}>Save</button>
          </div>
        </>
      )}

      {step === 'remove' && editing && (
        <>
          <div className="fpm-warning">
            <div className="fpm-warning__icon">!</div>
            <h2 className="fpm-warning__title">Remove {typeLabel(editing)}?</h2>
            <p className="fpm-warning__text">
              Are you sure you want to remove <strong>{editing.label}</strong> from your payment methods? This action cannot be undone.
            </p>
          </div>
          <button className="fpm-danger" onClick={handleRemove}>Remove</button>
        </>
      )}

      {step === 'removed' && (
        <>
          <div className="fpm-success">
            <div className="fpm-success__icon"><CheckIcon /></div>
            <h2 className="fpm-success__title">{actionLabel} Removed!</h2>
            <p className="fpm-success__text">It has been removed from your payment methods.</p>
          </div>
          <button className="fpm-continue" onClick={() => setStep('list')}>Done</button>
        </>
      )}

      {step === 'updated' && (
        <>
          <div className="fpm-success">
            <div className="fpm-success__icon"><CheckIcon /></div>
            <h2 className="fpm-success__title">{actionLabel} Updated!</h2>
            <p className="fpm-success__text">Your changes have been saved successfully.</p>
          </div>
          <button className="fpm-continue" onClick={() => setStep('list')}>Done</button>
        </>
      )}
    </div>
  )
}
