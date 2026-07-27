import { useState } from 'react'
import { PAYMENT_METHODS } from '../data/financialData'
import './FinancialPaymentMethods.css'

function BackIcon() {
  return (
    <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
      <path d="M9 1L1 9L9 17" stroke="var(--lime)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

function CheckIcon() {
  return (
    <svg width="44" height="34" viewBox="0 0 44 34" fill="none">
      <path d="M3 17L16 30L41 3" stroke="var(--res-bg1)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function FinancialPaymentMethods() {
  const [methods, setMethods] = useState(PAYMENT_METHODS)
  const [step, setStep] = useState('list') // list | add | edit | remove | removed | updated
  const [nickname, setNickname] = useState('')
  const [cardNumber, setCardNumber] = useState('')

  const card = methods.find(m => m.type === 'card')

  function handleAddCard() {
    const last4 = cardNumber.replace(/\D/g, '').slice(-4) || '4321'
    setMethods(m => [
      ...m,
      {
        id: `card-${last4}`,
        label: `Visa - ${last4}`,
        sub: nickname || 'Credit Card',
        type: 'card',
        editable: true,
        nickname: nickname || 'New Card',
        number: `**** ****** *${last4}`,
        expiry: '01/30',
        cvc: '000',
        address: '',
        state: '',
        zip: '',
      },
    ])
    setNickname('')
    setCardNumber('')
    setStep('list')
  }

  function handleRemove() {
    setMethods(m => m.filter(x => x.id !== card.id))
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
                {m.editable ? (
                  <button className="fpm-row" onClick={() => setStep('edit')}>
                    <CardIcon />
                    <div className="fpm-row__text">
                      <span className="fpm-row__label">{m.label}</span>
                      <span className="fpm-row__sub">{m.sub}</span>
                    </div>
                    <span className="fpm-row__chev" aria-hidden="true" />
                  </button>
                ) : (
                  <div className="fpm-row fpm-row--static">
                    <CardIcon />
                    <div className="fpm-row__text">
                      <span className="fpm-row__label">{m.label}</span>
                      <span className="fpm-row__sub">{m.sub}</span>
                    </div>
                  </div>
                )}
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
              <input className="fpm-field__input fpm-field__input--exp" type="tel" inputMode="numeric" placeholder="MM/YY" maxLength={5} />
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

      {step === 'edit' && card && (
        <>
          <p className="fpm-section-title">Edit Credit Card</p>
          <div className="fpm-field-card">
            <div className="fpm-field">
              <span className="fpm-field__label">Nickname</span>
              <input className="fpm-field__input" type="text" value={card.nickname} readOnly />
            </div>
          </div>
          <div className="fpm-field-card">
            <div className="fpm-field fpm-field--card-row">
              <CardIcon />
              <input className="fpm-field__input fpm-field__input--num" type="text" value={card.number} readOnly />
              <div className="fpm-field__divider" />
              <input className="fpm-field__input fpm-field__input--exp" type="text" value={card.expiry} readOnly />
              <div className="fpm-field__divider" />
              <input className="fpm-field__input fpm-field__input--cvc" type="text" value={card.cvc} readOnly />
            </div>
          </div>
          <div className="fpm-field-card">
            <div className="fpm-field">
              <span className="fpm-field__label">Address</span>
              <input className="fpm-field__input" type="text" value={card.address} readOnly />
            </div>
            <div className="fpm-field">
              <span className="fpm-field__label">State</span>
              <input className="fpm-field__input" type="text" value={card.state} readOnly />
            </div>
            <div className="fpm-field">
              <span className="fpm-field__label">Zip Code</span>
              <input className="fpm-field__input" type="text" value={card.zip} readOnly />
            </div>
          </div>
          <div className="fpm-footer--stack">
            <button className="fpm-danger" onClick={() => setStep('remove')}>Remove Credit Card</button>
            <button className="fpm-continue" onClick={() => setStep('updated')}>Save</button>
          </div>
        </>
      )}

      {step === 'remove' && card && (
        <>
          <div className="fpm-warning">
            <div className="fpm-warning__icon">!</div>
            <h2 className="fpm-warning__title">Remove Credit Card?</h2>
            <p className="fpm-warning__text">
              Are you sure you want to remove the <strong>{card.label}</strong> card from your payment methods? This action cannot be undone.
            </p>
          </div>
          <button className="fpm-danger" onClick={handleRemove}>Remove</button>
        </>
      )}

      {step === 'removed' && (
        <>
          <div className="fpm-success">
            <div className="fpm-success__icon"><CheckIcon /></div>
            <h2 className="fpm-success__title">Credit Card Removed!</h2>
            <p className="fpm-success__text">The card has been removed from your payment methods.</p>
          </div>
          <button className="fpm-continue" onClick={() => setStep('list')}>Done</button>
        </>
      )}

      {step === 'updated' && (
        <>
          <div className="fpm-success">
            <div className="fpm-success__icon"><CheckIcon /></div>
            <h2 className="fpm-success__title">Credit Card Updated!</h2>
            <p className="fpm-success__text">Your card has been updated successfully.</p>
          </div>
          <button className="fpm-continue" onClick={() => setStep('list')}>Done</button>
        </>
      )}
    </div>
  )
}
