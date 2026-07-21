import { useState, useEffect, useRef } from 'react'
import AttachSvg        from '../ICONS/Attachment.svg'
import LogSvg           from '../ICONS/log.svg'
import ViolationPlusSvg from '../ICONS/violation-plus.svg'
import ViolationSvg     from '../ICONS/violation.svg'
import './ViolationCard.css'

export const TYPE_COLOR = {
  'Parking':          '#c05a35',
  'Landscaping':      '#4a7a4a',
  'Architectural':    '#9a8030',
  'Noise / nuisance': '#7a3535',
  'Trash / bins':     '#6a8a6a',
}

export const TYPE_HERO = {
  'Parking':          '/images/card-workorder.jpg',
  'Landscaping':      '/images/card-violation.jpg',
  'Architectural':    '/images/card-acc.jpg',
  'Noise / nuisance': '/images/card-invoice.jpg',
  'Trash / bins':     '/images/card-task.jpg',
}

/* ── Violation items mock data by type ─────────────────── */
const VIOL_ITEMS_BY_TYPE = {
  'Parking': {
    category: 'Parking',
    items: [
      { id: 'p1', title: 'Unauthorized Parking',
        description: 'Vehicle is parked in a restricted area, fire lane, or designated zone in violation of community parking rules per CC&R Section 3.1. Immediate removal is required to avoid further escalation.' },
      { id: 'p2', title: 'Overnight Restriction',
        description: 'Commercial, recreational, or oversized vehicle was found parked on the street overnight in violation of Rule 3.4. All such vehicles must be stored in the garage or designated areas after 10 PM.' },
      { id: 'p3', title: 'Guest Zone Misuse',
        description: 'A resident vehicle is regularly occupying designated guest-only parking spots, limiting availability for visitors as outlined in community parking policy.' },
    ],
  },
  'Landscaping': {
    category: 'Landscaping',
    items: [
      { id: 'l1', title: 'Lawn Maintenance',
        description: 'Front or side-yard lawn contains dead or brown grass covering more than 30% of the visible area, in violation of community maintenance standards per CC&R Section 4.1.' },
      { id: 'l2', title: 'Vegetation Overgrowth',
        description: 'Shrubs, hedges, or trees have exceeded allowable height limits or are encroaching on neighboring property, the sidewalk, or common areas as outlined in CC&R Section 4.2.' },
      { id: 'l3', title: 'Debris / Dead Material',
        description: 'Yard debris, dead vegetation, trimmings, or organic waste is visible in the front or side yard or on the sidewalk strip in violation of community cleanliness standards.' },
    ],
  },
  'Architectural': {
    category: 'Architectural',
    items: [
      { id: 'a1', title: 'Unapproved Modification',
        description: 'A structural change, addition, or exterior installation was made to the property without prior Architectural Control Committee approval as required by CC&R Article 5.' },
      { id: 'a2', title: 'Color / Material Non-Compliance',
        description: 'Exterior paint color, fencing material, or finish does not match the community-approved palette. The approved color and material guide was included with the first notice letter.' },
      { id: 'a3', title: 'Permit Requirement',
        description: 'The modification requires a local building permit in addition to ACC approval. Proof of permit must be submitted to the HOA office before work resumes or the application can be reviewed.' },
    ],
  },
  'Noise / nuisance': {
    category: 'Noise & Nuisance',
    items: [
      { id: 'n1', title: 'Quiet Hours Violation',
        description: 'Loud music, gatherings, or other disturbances were reported after 10 PM quiet hours on multiple occasions, in violation of community rules. Several documented complaints are on file.' },
      { id: 'n2', title: 'Persistent Disturbance',
        description: 'The noise or nuisance issue has been documented on more than one occasion. Continued non-compliance after first notice may result in fines as outlined in the enforcement schedule.' },
      { id: 'n3', title: 'Animal Disturbance',
        description: 'Excessive and prolonged pet noise has generated multiple complaints from neighboring residents within a short period. Owner must take corrective action.' },
    ],
  },
  'Trash / bins': {
    category: 'Trash & Bins',
    items: [
      { id: 't1', title: 'Bin Placement Timing',
        description: 'Trash or recycling containers were left at the curb for more than 24 hours after the scheduled collection day, in violation of CC&R Section 6.1.' },
      { id: 't2', title: 'Storage Location',
        description: 'Containers must be stored out of public view except on collection day. Bins left visible from the street between collection days are in violation of community standards.' },
      { id: 't3', title: 'Container Condition',
        description: 'Damaged, overflowing, or improperly closed containers create unsanitary conditions and must be replaced or repaired per community maintenance rules.' },
    ],
  },
}

/* ── Helpers ────────────────────────────────────────────── */
function formatDate(dateStr) {
  if (!dateStr) return ''
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }
  return dateStr
}

function getContact(v) {
  const first = v.ownerName.split(/[\s&]+/)[0].toLowerCase().replace(/[^a-z]/g, '')
  const digits = String(v.acct ?? '').replace(/\D/g, '').slice(-4).padStart(4, '0')
  return {
    email:  v.ownerEmail ?? `${first}@email.com`,
    mobile: v.ownerPhone ?? `305.555.${digits.slice(0, 2)}${digits.slice(2)}`,
    home:   v.ownerHomePhone ?? (v.ownerPhone ? null : `305.555.${String(Number(digits) + 100).slice(-4)}`),
    work:   null,
  }
}

function getLogMessages(v) {
  const ownerFirst   = v.ownerName.split(/[\s&]+/)[0]
  const ownerInitial = (ownerFirst[0] ?? '?').toUpperCase()
  const status       = v.status ?? 'Open'

  if (status === 'Cured') return [
    { id: 1, from: 'committee', name: 'Community Manager', initial: 'CM', time: '10 days ago · 9:00 AM',
      text: `First notice issued to ${v.ownerName} at ${v.address}. Letter sent via certified mail.` },
    { id: 2, from: 'homeowner', name: ownerFirst, initial: ownerInitial, time: '8 days ago · 11:15 AM',
      text: "Thank you for the notice. We'll take care of this right away." },
    { id: 3, from: 'committee', name: 'Community Manager', initial: 'CM', time: '5 days ago · 3:30 PM',
      text: 'Violation confirmed resolved upon re-inspection. Photo evidence on file. Case closed.' },
  ]

  if (status === 'Escalated') return [
    { id: 1, from: 'committee', name: 'Community Manager', initial: 'CM', time: '14 days ago · 9:00 AM',
      text: `First notice issued to ${v.ownerName} at ${v.address}. Certified mail sent.` },
    { id: 2, from: 'committee', name: 'Community Manager', initial: 'CM', time: '7 days ago · 2:30 PM',
      text: 'Follow-up attempt made. No response received. Second notice sent via certified mail.' },
    { id: 3, from: 'homeowner', name: ownerFirst, initial: ownerInitial, time: '5 days ago · 4:10 PM',
      text: 'We received the notice. We need additional time to resolve this.' },
    { id: 4, from: 'committee', name: 'Community Manager', initial: 'CM', time: '2 days ago · 10:15 AM',
      text: `No corrective action taken. Case escalated to board. Fine schedule begins ${formatDate(v.fineStarts) || 'soon'}.` },
  ]

  return [
    { id: 1, from: 'committee', name: 'Community Manager', initial: 'CM', time: 'Today · 9:00 AM',
      text: `First notice issued to ${v.ownerName} at ${v.address}. Letter sent via certified mail.` },
    { id: 2, from: 'committee', name: 'System', initial: 'SYS', time: 'Today · 9:01 AM',
      text: `Violation case opened. Status: Open · Level: ${v.level}.` },
  ]
}

/* ── Icons ──────────────────────────────────────────────── */
function AlertIcon() {
  return <img src={ViolationSvg} style={{ width: 18, height: 18, flexShrink: 0 }} alt="" />
}

function ChevronRowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFF8EA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.75 }}>
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  )
}

function SendIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  )
}

function ViolItemAlertIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  )
}

function ViolCategoryIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.65 }}>
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  )
}

function PanelBellIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  )
}

function PanelBackIcon() {
  return (
    <svg width="43" height="43" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  )
}

/* ── Shared panel header ────────────────────────────────── */
function ViolPanelHeader({ onClose }) {
  useEffect(() => {
    const screen = document.querySelector('.screen')
    if (screen) {
      screen.scrollTop = 0
      screen.style.overflowY = 'hidden'
    }
    return () => { if (screen) screen.style.overflowY = '' }
  }, [])
  return (
    <header className="app-header inv-panel__appheader">
      <div className="app-header__inner">
        <div className="app-header__left">
          <button className="app-header__back" onClick={onClose} aria-label="Back">
            <PanelBackIcon />
          </button>
        </div>
        <div className="app-header__right">
          <button className="notif-btn" aria-label="Notifications">
            <PanelBellIcon />
            <span className="notif-btn__badge">5</span>
          </button>
        </div>
      </div>
      <div className="app-header__divider" />
    </header>
  )
}

/* ── Owner / Contact panel ──────────────────────────────── */
export function ViolOwnerPanel({ violation: v, onClose }) {
  const contact = getContact(v)
  const initials = v.ownerName.split(/[\s&]+/).filter(Boolean).slice(0, 2).map(w => w[0]).join('')
  const fields = [
    ['Unit Address', v.address],
    ['Account #',    v.acct],
    ['Email',        contact.email],
    ['Mobile',       contact.mobile],
    ...(contact.home ? [['Home', contact.home]] : []),
    ...(contact.work ? [['Work', contact.work]] : []),
  ]
  return (
    <div className="inv-panel">
      <ViolPanelHeader onClose={onClose} />
      <div className="inv-panel__body">
        <h2 className="inv-panel__page-title">Home Owner</h2>
        <div className="viol-contact-card">
          <div className="viol-contact-avatar">
            {v.ownerPhoto
              ? <img src={v.ownerPhoto} alt={v.ownerName} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
              : initials}
          </div>
          <div className="viol-contact-name">{v.ownerName}</div>
          <div className="viol-contact-role">Home Owner</div>
        </div>
        <div className="vend-card" style={{ marginTop: 16 }}>
          <div className="vend-fields">
            {fields.map(([label, value]) => (
              <div key={label} className="vend-field">
                <span className="vend-field__label">{label}:</span>
                <span className="vend-field__value">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Violation items panel ──────────────────────────────── */
function ViolItemCard({ item }) {
  const [expanded, setExpanded] = useState(false)
  const MAX = 130
  const isLong = item.description.length > MAX
  return (
    <div className="vi-item-card">
      <div className="vi-item-header">
        <ViolItemAlertIcon />
        <span className="vi-item-title">{item.title}</span>
      </div>
      <p className="vi-item-desc">
        {expanded || !isLong ? item.description : item.description.slice(0, MAX) + '…'}
        {isLong && (
          <button className="vi-see-more" onClick={() => setExpanded(e => !e)}>
            {expanded ? ' See Less' : ' See More'}
          </button>
        )}
      </p>
    </div>
  )
}

export function ViolItemsPanel({ violation: v, onClose }) {
  const data  = VIOL_ITEMS_BY_TYPE[v.type] ?? { category: v.type, items: [] }
  const items = data.items.slice(0, v.violationCount ?? data.items.length)
  return (
    <div className="inv-panel">
      <ViolPanelHeader onClose={onClose} />
      <div className="inv-panel__body">
        <h2 className="inv-panel__page-title">Violation Items</h2>
        <div className="vi-category-row">
          <ViolCategoryIcon />
          <span className="vi-category-label">{data.category}</span>
        </div>
        <div className="vi-items">
          {items.map(item => <ViolItemCard key={item.id} item={item} />)}
        </div>
      </div>
    </div>
  )
}

/* ── Log & Notes panel ──────────────────────────────────── */
export function ViolLogPanel({ violation: v, onClose }) {
  const [msgs,  setMsgs]  = useState(() => getLogMessages(v))
  const [draft, setDraft] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 350)
    return () => clearTimeout(t)
  }, [])

  function send() {
    if (!draft.trim()) return
    setMsgs(m => [...m, {
      id: Date.now(), from: 'committee', name: 'Community Manager', initial: 'CM',
      time: 'Now', text: draft.trim(),
    }])
    setDraft('')
  }

  return (
    <div className="inv-panel">
      <ViolPanelHeader onClose={onClose} />
      <div className="inv-panel__body acc-chat-body">
        <h2 className="inv-panel__page-title">Log &amp; Notes</h2>
        <p className="acc-chat-meta">{v.address} · {v.type}</p>
        <div className="acc-chat-log">
          {msgs.map(msg => (
            <div key={msg.id} className={`acc-bubble-row acc-bubble-row--${msg.from}`}>
              {msg.from !== 'homeowner' && (
                <div className="viol-log-avatar">{msg.initial}</div>
              )}
              <div className="acc-bubble-wrap">
                <span className="acc-bubble-name">{msg.name} · {msg.time}</span>
                <div className={`acc-bubble acc-bubble--${msg.from}`}>{msg.text}</div>
              </div>
              {msg.from === 'homeowner' && (
                <div className="viol-log-avatar viol-log-avatar--owner">{msg.initial}</div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="acc-chat-input">
        <input
          ref={inputRef}
          className="acc-chat-input__field"
          placeholder="Add a note…"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
        />
        <button className="acc-chat-input__send" onClick={send} disabled={!draft.trim()}>
          <SendIcon />
        </button>
      </div>
    </div>
  )
}

/* ── Attachment panel ───────────────────────────────────── */
const EVIDENCE_IMAGES = [
  '/images/card-workorder.jpg',
  '/images/card-violation.jpg',
  '/images/card-acc.jpg',
  '/images/card-invoice.jpg',
  '/images/card-task.jpg',
]

export function ViolAttachmentPanel({ violation: v, onClose }) {
  const attachments = v.attachments ?? [v.attachment].filter(Boolean)
  const heroBase    = TYPE_HERO[v.type] ?? '/images/card-violation.jpg'
  const title       = attachments.length > 1 ? `Attachments (${attachments.length})` : 'Attachment'

  return (
    <div className="inv-panel">
      <ViolPanelHeader onClose={onClose} />
      <div className="inv-panel__body inv-panel__body--pdf">
        <h2 className="inv-panel__page-title">{title}</h2>
        <div className="viol-attachments-list">
          {attachments.map((filename, i) => {
            const isPdf = filename.toLowerCase().endsWith('.pdf')
            const imgSrc = EVIDENCE_IMAGES[i % EVIDENCE_IMAGES.length]
            return (
              <div key={filename} className="viol-attachment-item">
                <p className="viol-attach-filename">{filename}</p>
                {isPdf ? (
                  <div className="viol-pdf-placeholder">
                    <div className="viol-pdf-icon">📄</div>
                    <p className="viol-pdf-name">{filename}</p>
                    <p className="viol-pdf-sub">Document on file · {formatDate(v.date)}</p>
                  </div>
                ) : (
                  <>
                    <img src={imgSrc} className="viol-evidence-img" alt={`Evidence ${i + 1}`} />
                    <p className="viol-evidence-caption">Evidence photo {attachments.length > 1 ? `${i + 1} of ${attachments.length}` : ''} · {formatDate(v.date)}</p>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ── Shared violation card body ─────────────────────────── */
export function ViolationCardBody({ violation: v, stopDrag, onOpenPanel }) {
  const typeColor = TYPE_COLOR[v.type] ?? '#888'
  const heroSrc   = TYPE_HERO[v.type] ?? '/images/card-violation.jpg'
  const initials  = v.ownerName.split(/[\s&]+/).filter(Boolean).slice(0, 2).map(w => w[0]).join('')
  const dateStr   = formatDate(v.date)
  const fineStr   = formatDate(v.fineStarts)

  function open(type) {
    return (e) => { e?.stopPropagation?.(); onOpenPanel?.(type) }
  }

  return (
    <>
      <div className="card-hero">
        <img src={heroSrc} className="card-hero__img" alt="" />
      </div>

      <div className="inv-vendor">
        <AlertIcon />
        <span className="inv-vendor__name viol-type" style={{ color: typeColor }}>{v.type}</span>
      </div>

      <div className="viol-address-row">
        <span className="viol-address-text">{v.address}</span>
      </div>

      <div className="inv-fields">
        <div className="inv-field">
          <span className="inv-field__label">Acct:</span>
          <span className="inv-field__value">{v.acct}</span>
        </div>
        <div className="inv-field">
          <span className="inv-field__label">Date Reported:</span>
          <span className="inv-field__value">{dateStr}</span>
        </div>
        <div className="inv-field">
          <span className="inv-field__label">Level:</span>
          <span className="inv-field__value">{v.level}</span>
        </div>
        {fineStr && (
          <div className="inv-field">
            <span className="inv-field__label">Fine Starts:</span>
            <span className="inv-field__value inv-field__value--urgent">{fineStr}</span>
          </div>
        )}
        <div className="inv-field wo-description">{v.description}</div>
      </div>

      <div className="inv-rows">
        <button className="inv-row" onPointerDown={stopDrag} onClick={open('owner')}>
          <span className="inv-row__icon viol-avatar">
            {v.ownerPhoto
              ? <img src={v.ownerPhoto} alt={v.ownerName} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
              : initials}
          </span>
          <span className="inv-row__content">
            <span className="inv-row__title">{v.ownerName}</span>
            <span className="inv-row__sub">Home Owner</span>
          </span>
          <ChevronRowIcon />
        </button>
        <button className="inv-row" onPointerDown={stopDrag} onClick={open('items')}>
          <span className="inv-row__icon">
            <img src={ViolationPlusSvg} className="inv-row__svg" alt="" />
          </span>
          <span className="inv-row__content">
            <span className="inv-row__title">Violation Items</span>
          </span>
          {v.violationCount > 0 && <span className="inv-row__badge">{v.violationCount}</span>}
          <ChevronRowIcon />
        </button>
        <button className="inv-row" onPointerDown={stopDrag} onClick={open('log')}>
          <span className="inv-row__icon"><img src={LogSvg} className="inv-row__svg" alt="" /></span>
          <span className="inv-row__content">
            <span className="inv-row__title">Log &amp; Notes</span>
          </span>
          {v.logCount > 0 && <span className="inv-row__badge">{v.logCount}</span>}
          <ChevronRowIcon />
        </button>
        <button className="inv-row inv-row--last" onPointerDown={stopDrag} onClick={open('attachment')}>
          <span className="inv-row__icon"><img src={AttachSvg} className="inv-row__svg" alt="" /></span>
          <span className="inv-row__content">
            <span className="inv-row__title">
              {v.attachments?.length > 1 ? 'Attachments' : v.attachment}
            </span>
          </span>
          {v.attachments?.length > 1 && <span className="inv-row__badge">{v.attachments.length}</span>}
          <ChevronRowIcon />
        </button>
      </div>

      <div className="viol-actions" onPointerDown={stopDrag}>
        <button className="viol-btn viol-btn--comment" onClick={open('log')}>Add Comment</button>
      </div>
    </>
  )
}
