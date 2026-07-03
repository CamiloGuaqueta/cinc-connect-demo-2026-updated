import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import './ResidentConsents.css'

// ─── Data ──────────────────────────────────────────────────────────────────────

const CONSENTS = [
  {
    id: 'c1',
    type: 'online-voting',
    typeLabel: 'Online Voting Consent',
    title: 'Electronic Voting Authorization',
    description: `By signing this consent, you authorize Cardinal Hills HOA to record and count your electronic votes in all upcoming board elections, special assessments, and resident surveys conducted through the CINC resident portal.\n\nThis authorization remains valid until revoked in writing. Your electronic vote carries the same legal weight as a physical ballot. You may withdraw this consent at any time by submitting a written request to the HOA management office.\n\nElectronic voting records are stored securely and made available to the association's auditors upon request. The HOA will never share your individual voting choices with other residents.`,
    requirements: ['checkbox', 'printName'],
    deadline: new Date('2026-07-15T23:59:00'),
  },
  {
    id: 'c2',
    type: 'unit',
    typeLabel: 'Unit Consent',
    title: 'Common Area Maintenance Access',
    description: `This consent authorizes Cardinal Hills HOA, its employees, and contracted vendors to access your unit's patio, balcony, and directly adjacent common areas for the purpose of completing scheduled maintenance, inspections, and improvements as outlined in the 2026 Capital Improvement Plan.\n\nAccess will be limited to normal business hours (8 AM – 6 PM, Monday through Saturday) unless an emergency requires after-hours entry. You will receive at least 48 hours' advance written notice for all non-emergency access.\n\nThe HOA will not be responsible for minor disruptions inherent to construction activities. Significant damage to personal property caused by HOA negligence will be addressed through the standard claims process.`,
    requirements: ['checkbox', 'printName', 'signature'],
    deadline: null,
  },
  {
    id: 'c3',
    type: 'user',
    typeLabel: 'User Consent',
    title: 'Electronic Communication Consent',
    description: `By accepting this consent, you authorize Cardinal Hills HOA and its management company to deliver official communications, legal notices, meeting agendas, financial statements, and all other association documents to the email address registered in your resident profile.\n\nElectronic delivery satisfies all notice requirements under the community's CC&Rs and applicable state law. You remain responsible for ensuring your registered email address is current.\n\nYou may withdraw this consent and return to paper delivery at any time by notifying the management office in writing. Standard mail delivery fees may apply for paper communications.`,
    requirements: ['checkbox'],
    deadline: new Date('2026-08-31T23:59:00'),
  },
]

// ─── Countdown ─────────────────────────────────────────────────────────────────

function useCountdown(deadline) {
  const [remaining, setRemaining] = useState(null)
  useEffect(() => {
    if (!deadline) return
    function tick() {
      const diff = deadline - Date.now()
      if (diff <= 0) { setRemaining(null); return }
      setRemaining({
        days: Math.floor(diff / 86400000),
        hrs:  Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000)  / 60000),
      })
    }
    tick()
    const id = setInterval(tick, 60000)
    return () => clearInterval(id)
  }, [deadline])
  return remaining
}

function signByLabel(deadline) {
  if (!deadline) return null
  return 'SIGN BY ' + deadline.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
}

function countdownLabel(cd, deadline) {
  if (!deadline) return null
  if (!cd) return signByLabel(deadline)
  if (cd.days > 0) return `CLOSES IN ${cd.days}D ${cd.hrs}H`
  return `CLOSES IN ${cd.hrs}H ${cd.mins}M`
}

// ─── Signature Canvas ──────────────────────────────────────────────────────────

function SignatureCanvas({ onChange }) {
  const canvasRef = useRef(null)
  const drawing = useRef(false)
  const [hasStrokes, setHasStrokes] = useState(false)

  function getPos(e) {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const src = e.touches ? e.touches[0] : e
    return {
      x: (src.clientX - rect.left) * (canvas.width / rect.width),
      y: (src.clientY - rect.top)  * (canvas.height / rect.height),
    }
  }

  function startDraw(e) {
    e.preventDefault()
    const { x, y } = getPos(e)
    const ctx = canvasRef.current.getContext('2d')
    ctx.beginPath()
    ctx.moveTo(x, y)
    drawing.current = true
  }

  function draw(e) {
    if (!drawing.current) return
    e.preventDefault()
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const { x, y } = getPos(e)
    ctx.lineTo(x, y)
    ctx.strokeStyle = '#1d1d1d'
    ctx.lineWidth = 2.5
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()
  }

  function stopDraw() {
    if (!drawing.current) return
    drawing.current = false
    setHasStrokes(true)
    onChange(canvasRef.current.toDataURL())
  }

  function clear() {
    const canvas = canvasRef.current
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    setHasStrokes(false)
    onChange(null)
  }

  return (
    <div className="sig-canvas-wrap">
      {!hasStrokes && <span className="sig-canvas__hint">Sign here</span>}
      <canvas
        ref={canvasRef}
        width={600}
        height={160}
        className="sig-canvas"
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
        onMouseLeave={stopDraw}
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={stopDraw}
      />
      {hasStrokes && (
        <button className="sig-canvas__clear" onClick={clear} type="button">Clear</button>
      )}
    </div>
  )
}

// ─── Consent Card ─────────────────────────────────────────────────────────────

function ConsentCard({ consent, signed, signedDate, onSign, onViewReceipt, onRemove }) {
  const cd = useCountdown(consent.deadline)

  return (
    <div className="consent-section">
      <p className="consent-section__label">{consent.typeLabel}</p>
      <div className={`consent-card${signed ? ' consent-card--signed' : ''}`}>
        {signed && (
          <div className="consent-signed-badge">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="7" fill="var(--lime)" />
              <path d="M3.5 7L5.5 9.5L10.5 4.5" stroke="#1a2a1a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Signed
          </div>
        )}
        <div className="consent-card__body">
          <h3 className="consent-card__title">{consent.title}</h3>
          <p className="consent-card__desc">{consent.description.slice(0, 140)}…</p>
          {signed && signedDate ? (
            <p className="consent-card__deadline">{'SIGNED ON ' + signedDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}</p>
          ) : consent.deadline && (
            <p className="consent-card__deadline">{signByLabel(consent.deadline)}</p>
          )}
        </div>

        <div className="consent-card__footer">
          {signed ? (
            <div className="consent-card__actions">
              <button className="consent-btn consent-btn--ghost" onClick={() => onViewReceipt(consent.id)}>View Receipt</button>
              <button className="consent-btn consent-btn--remove" onClick={() => onRemove(consent.id)}>Opt-Out</button>
            </div>
          ) : (
            <button className="consent-btn consent-btn--solid consent-btn--full" onClick={() => onSign(consent.id)}>
              SIGN CONSENT
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Consent Sheet ────────────────────────────────────────────────────────────

function ConsentSheet({ consent, onClose, onSigned }) {
  const cd = useCountdown(consent.deadline)
  const [checked, setChecked]     = useState(false)
  const [printName, setPrintName] = useState('')
  const [sigDataUrl, setSigDataUrl] = useState(null)

  const needs = consent.requirements
  const canSign =
    (!needs.includes('checkbox')   || checked) &&
    (!needs.includes('printName')  || printName.trim().length > 0) &&
    (!needs.includes('signature')  || sigDataUrl !== null)

  function handleSign() {
    if (!canSign) return
    onSigned({
      timestamp:  new Date(),
      printName:  printName.trim(),
      checked,
      sigDataUrl,
      method:     needs.join('+'),
    })
  }

  return (
    <div className="consent-sheet">
      <div className="consent-sheet__header">
        <button className="consent-sheet__close" onClick={onClose} type="button">✕</button>
      </div>

      <div className="consent-sheet__scroll">
        <span className={`consent-type-tag consent-type-tag--${consent.type}`}>{consent.typeLabel}</span>
        <h2 className="consent-sheet__title">{consent.title}</h2>

        {consent.deadline && (
          <p className="consent-sheet__deadline">{signByLabel(consent.deadline)}</p>
        )}

        <div className="consent-divider" />

        <p className="consent-sheet__desc">{consent.description}</p>

        <div className="consent-divider" />
        <p className="consent-section-label">SIGNATURE REQUIREMENTS</p>

        {needs.includes('checkbox') && (
          <label className="consent-checkbox">
            <input
              type="checkbox"
              checked={checked}
              onChange={e => setChecked(e.target.checked)}
              className="consent-checkbox__input"
            />
            <span className={`consent-checkbox__box${checked ? ' consent-checkbox__box--on' : ''}`}>
              {checked && '✓'}
            </span>
            <span className="consent-checkbox__label">I have read and agree to the terms above</span>
          </label>
        )}

        {needs.includes('printName') && (
          <div className="consent-field">
            <label className="consent-field__label">PRINT NAME</label>
            <input
              type="text"
              className="consent-field__input"
              placeholder="Your full name"
              value={printName}
              onChange={e => setPrintName(e.target.value)}
            />
          </div>
        )}

        {needs.includes('signature') && (
          <div className="consent-field">
            <label className="consent-field__label">SIGNATURE</label>
            <SignatureCanvas onChange={setSigDataUrl} />
          </div>
        )}
      </div>

      <div className="consent-sheet__footer">
        <button
          className={`consent-btn consent-btn--solid consent-btn--full${!canSign ? ' consent-btn--disabled' : ''}`}
          onClick={handleSign}
          disabled={!canSign}
          type="button"
        >
          SIGN CONSENT
        </button>
      </div>
    </div>
  )
}

// ─── Receipt Sheet ────────────────────────────────────────────────────────────

const METHOD_LABELS = {
  'checkbox':                       'Checkbox',
  'checkbox+printName':             'Checkbox + Print Name',
  'checkbox+printName+signature':   'Checkbox, Print Name & Signature',
  'checkbox+signature':             'Checkbox + Signature',
  'printName':                      'Print Name',
  'printName+signature':            'Print Name & Signature',
  'signature':                      'Signature',
}

function ConsentReceiptSheet({ consent, signedData, onClose }) {
  const d = signedData.timestamp
  const dateStr = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  const timeStr = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit' })

  return (
    <div className="consent-receipt">
      <div className="consent-sheet__header">
        <button className="consent-sheet__close" onClick={onClose} type="button">✕</button>
      </div>

      <div className="consent-receipt__scroll">
        <div className="consent-receipt__badge">✓</div>
        <h2 className="consent-receipt__title">Consent Signed</h2>
        <p className="consent-receipt__subtitle">{consent.title}</p>

        <div className="consent-divider" />

        <div className="receipt-row">
          <span className="receipt-label">DATE</span>
          <span className="receipt-value">{dateStr}</span>
        </div>
        <div className="receipt-row">
          <span className="receipt-label">TIME</span>
          <span className="receipt-value">{timeStr}</span>
        </div>
        <div className="receipt-row">
          <span className="receipt-label">METHOD</span>
          <span className="receipt-value">{METHOD_LABELS[signedData.method] || signedData.method}</span>
        </div>
        <div className="receipt-row">
          <span className="receipt-label">APP / WEB</span>
          <span className="receipt-value">CINC Resident App</span>
        </div>

        <div className="consent-divider" />

        {signedData.checked && (
          <div className="receipt-row">
            <span className="receipt-label">CONSENT CHECKBOX</span>
            <span className="receipt-value receipt-value--accent">Yes ✓</span>
          </div>
        )}

        {signedData.printName && (
          <div className="receipt-row">
            <span className="receipt-label">PRINT NAME</span>
            <span className="receipt-value">{signedData.printName}</span>
          </div>
        )}

        {signedData.sigDataUrl && (
          <div className="receipt-sig">
            <span className="receipt-label">DIGITAL SIGNATURE</span>
            <div className="receipt-sig__frame">
              <img src={signedData.sigDataUrl} alt="Signature" className="receipt-sig__img" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

const FILTER_TYPES = [
  { key: 'all',            label: 'All' },
  { key: 'online-voting',  label: 'Online Voting' },
  { key: 'unit',           label: 'Unit' },
  { key: 'user',           label: 'User' },
]

export default function ResidentConsents() {
  const [signedIds, setSignedIds]   = useState(new Set())
  const [signatures, setSignatures] = useState({})
  const [activeConsent, setActiveConsent] = useState(null)
  const [activeReceipt, setActiveReceipt] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType]   = useState('all')

  const portalTarget = document.querySelector('.phone-frame') || document.body

  const filterTypes = [
    ...FILTER_TYPES,
    ...(signedIds.size > 0 ? [{ key: 'signed', label: 'Signed' }] : []),
  ]

  const filtered = CONSENTS.filter(c => {
    const matchesType   = filterType === 'all'
      || (filterType === 'signed' ? signedIds.has(c.id) : c.type === filterType)
    const q             = searchQuery.toLowerCase()
    const matchesSearch = !q || c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
    return matchesType && matchesSearch
  })
  const unsigned = filtered.filter(c => !signedIds.has(c.id))
  const signed   = filtered.filter(c =>  signedIds.has(c.id))
  const ordered  = [...unsigned, ...signed]

  function handleSigned(consentId, data) {
    setSignedIds(prev => new Set([...prev, consentId]))
    setSignatures(prev => ({ ...prev, [consentId]: data }))
    setActiveConsent(null)
    setActiveReceipt(consentId)
  }

  function handleRemove(consentId) {
    setSignedIds(prev => { const s = new Set(prev); s.delete(consentId); return s })
    setSignatures(prev => { const s = { ...prev }; delete s[consentId]; return s })
  }

  const activeConsentObj = CONSENTS.find(c => c.id === activeConsent)
  const activeReceiptObj = CONSENTS.find(c => c.id === activeReceipt)

  return (
    <div className="screen res-consents">
      <h1 className="res-consents__title">Signatures &amp; Consents</h1>

      <div className="consent-search">
        <input
          className="consent-search__input"
          placeholder="Search consents…"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <span className="consent-search__icon">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12.5 12.5L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </div>

      <div className="consent-filter-chips">
        {filterTypes.map(({ key, label }) => (
          <button
            key={key}
            className={`consent-filter-chip${filterType === key ? ' consent-filter-chip--active' : ''}`}
            onClick={() => setFilterType(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="res-consents__list">
        {ordered.map(consent => (
          <ConsentCard
            key={consent.id}
            consent={consent}
            signed={signedIds.has(consent.id)}
            signedDate={signatures[consent.id]?.timestamp}
            onSign={setActiveConsent}
            onViewReceipt={setActiveReceipt}
            onRemove={handleRemove}
          />
        ))}
      </div>

      {activeConsentObj && createPortal(
        <div className="consent-overlay">
          <div className="consent-overlay__backdrop" onClick={() => setActiveConsent(null)} />
          <ConsentSheet
            consent={activeConsentObj}
            onClose={() => setActiveConsent(null)}
            onSigned={data => handleSigned(activeConsent, data)}
          />
        </div>,
        portalTarget
      )}

      {activeReceiptObj && signatures[activeReceipt] && createPortal(
        <div className="consent-overlay">
          <div className="consent-overlay__backdrop" onClick={() => setActiveReceipt(null)} />
          <ConsentReceiptSheet
            consent={activeReceiptObj}
            signedData={signatures[activeReceipt]}
            onClose={() => setActiveReceipt(null)}
          />
        </div>,
        portalTarget
      )}
    </div>
  )
}
