import { useState } from 'react'
import { CURRENT_USER } from '../data/userData'
import './ResidentBillingInfo.css'

const DELIVERY_OPTIONS = ['Email', 'Paper', 'Both']

const INITIAL = {
  billingName:  CURRENT_USER.fullName,
  billingEmail: CURRENT_USER.primaryEmail,
  delivery:     'Email',
  sameAsUnit:   true,
  street:       '',
  city:         '',
  state:        '',
  zip:          '',
}

const UNIT_ADDRESS = {
  street: '8200 Cardinal Hills Drive, Unit 204',
  city:   'Austin',
  state:  'TX',
  zip:    '78701',
}

function Toggle({ on, onToggle }) {
  return (
    <button
      className={`rb-toggle${on ? ' rb-toggle--on' : ''}`}
      onClick={onToggle}
      aria-label={on ? 'Turn off' : 'Turn on'}
    >
      <span className="rb-toggle__thumb" />
    </button>
  )
}

function Field({ label, value, editing, onChange, type = 'text', placeholder }) {
  return (
    <div className="rb-row">
      <span className="rb-row__label">{label}</span>
      {editing
        ? <input
            className="rb-input"
            value={value}
            onChange={e => onChange(e.target.value)}
            type={type}
            placeholder={placeholder}
          />
        : <span className="rb-row__value">{value || '—'}</span>
      }
    </div>
  )
}

export default function ResidentBillingInfo() {
  const [editing, setEditing] = useState(false)
  const [saved,   setSaved]   = useState({ ...INITIAL })
  const [draft,   setDraft]   = useState({ ...INITIAL })

  const set = (key, val) => setDraft(d => ({ ...d, [key]: val }))

  const handleSave = () => {
    setSaved({ ...draft })
    setEditing(false)
  }

  const handleCancel = () => {
    setDraft({ ...saved })
    setEditing(false)
  }

  const displayAddr = draft.sameAsUnit
    ? `${UNIT_ADDRESS.street}, ${UNIT_ADDRESS.city}, ${UNIT_ADDRESS.state} ${UNIT_ADDRESS.zip}`
    : [draft.street, draft.city, draft.state, draft.zip].filter(Boolean).join(', ') || '—'

  return (
    <div className="screen rb-screen">
      <div className="rb-content">

        {/* Billing Contact */}
        <h2 className="rb-section-title">Billing Contact</h2>
        <div className="rb-card">
          <Field label="Name" value={draft.billingName} editing={editing}
            onChange={v => set('billingName', v)} placeholder="Full name on statements" />
          <div className="rb-divider" />
          <Field label="Email" value={draft.billingEmail} editing={editing}
            onChange={v => set('billingEmail', v)} type="email" placeholder="billing@email.com" />
        </div>

        <p className="rb-hint">
          This name and email address will appear on invoices and statements sent by your HOA.
        </p>

        {/* Statement Delivery */}
        <h2 className="rb-section-title">Statement Delivery</h2>
        <div className="rb-card">
          <div className="rb-delivery-row">
            {DELIVERY_OPTIONS.map(opt => (
              <button
                key={opt}
                className={`rb-delivery-pill${draft.delivery === opt ? ' rb-delivery-pill--active' : ''}`}
                onClick={() => (editing || !editing) && set('delivery', opt)}
              >
                {opt === 'Email' && <EnvelopeIcon active={draft.delivery === opt} />}
                {opt === 'Paper' && <PaperIcon    active={draft.delivery === opt} />}
                {opt === 'Both'  && <BothIcon     active={draft.delivery === opt} />}
                <span>{opt}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Billing Address */}
        <h2 className="rb-section-title">Billing Address</h2>
        <div className="rb-card">
          <div className="rb-row rb-row--toggle">
            <span className="rb-row__label rb-row__label--wrap">Same as unit address</span>
            <Toggle on={draft.sameAsUnit} onToggle={() => set('sameAsUnit', !draft.sameAsUnit)} />
          </div>

          {draft.sameAsUnit ? (
            <div className="rb-addr-note">{displayAddr}</div>
          ) : (
            <>
              <div className="rb-divider" />
              <Field label="Street" value={draft.street} editing={editing || true}
                onChange={v => set('street', v)} placeholder="Street address" />
              <div className="rb-divider" />
              <Field label="City" value={draft.city} editing={editing || true}
                onChange={v => set('city', v)} placeholder="City" />
              <div className="rb-divider" />
              <div className="rb-row rb-row--half">
                <div className="rb-half">
                  <Field label="State" value={draft.state} editing={editing || true}
                    onChange={v => set('state', v)} placeholder="TX" />
                </div>
                <div className="rb-half-divider" />
                <div className="rb-half">
                  <Field label="ZIP" value={draft.zip} editing={editing || true}
                    onChange={v => set('zip', v)} placeholder="00000" />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        {editing ? (
          <div className="rb-actions">
            <button className="rb-btn rb-btn--save" onClick={handleSave}>Save Changes</button>
            <button className="rb-btn rb-btn--cancel" onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button className="rb-btn rb-btn--edit" onClick={() => setEditing(true)}>
            Edit Billing Info
          </button>
        )}

      </div>
    </div>
  )
}

/* ── Icons ─────────────────────────────────────────────── */
function EnvelopeIcon({ active }) {
  const c = active ? '#112719' : '#B2DE61'
  return (
    <svg width="16" height="13" viewBox="0 0 24 20" fill="none">
      <rect x="1" y="1" width="22" height="18" rx="3" stroke={c} strokeWidth="2"/>
      <path d="M1 5L12 13L23 5" stroke={c} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

function PaperIcon({ active }) {
  const c = active ? '#112719' : '#B2DE61'
  return (
    <svg width="14" height="16" viewBox="0 0 20 24" fill="none">
      <path d="M3 1H13L19 7V23H3V1Z" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13 1V7H19" stroke={c} strokeWidth="2" strokeLinecap="round"/>
      <path d="M7 12H13M7 16H11" stroke={c} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

function BothIcon({ active }) {
  const c = active ? '#112719' : '#B2DE61'
  return (
    <svg width="18" height="14" viewBox="0 0 26 20" fill="none">
      <rect x="1" y="1" width="16" height="13" rx="2" stroke={c} strokeWidth="1.8"/>
      <path d="M1 4L9 10L17 4" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M18 5H25V19H11V16" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 5V2H25" stroke={c} strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}
