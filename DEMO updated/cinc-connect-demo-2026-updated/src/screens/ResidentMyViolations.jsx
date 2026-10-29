import { useState } from 'react'
import { useMode } from '../ModeContext'
import { CURRENT_USER } from '../data/userData'
import { MY_VIOLATIONS, addViolationNote, unitById } from '../data/propertiesData'
import { AddAttachmentButton, AttachmentList } from '../components/Attachments'
import './ResidentMyViolations.css'

// Owner view of violations on their own units (matches the live app's "My Violations").
// Reporting a neighbor's violation stays available as a secondary action.
export default function ResidentMyViolations() {
  const { popResidentView, pushResidentView } = useMode()
  const [, bump] = useState(0)
  const rerender = () => bump(x => x + 1)
  const [unitId, setUnitId] = useState('all')
  const [statusFilter, setStatusFilter] = useState(null)   // null | 'Open' | 'Closed'
  const [panel, setPanel] = useState(null)                  // { kind: 'items' | 'log', id }

  const inUnit = MY_VIOLATIONS.filter(v => unitId === 'all' || v.unitId === Number(unitId))
  const openCount = inUnit.filter(v => v.status === 'Open').length
  const closedCount = inUnit.filter(v => v.status === 'Closed').length
  const shown = inUnit.filter(v => !statusFilter || v.status === statusFilter)

  if (panel) {
    const v = MY_VIOLATIONS.find(x => x.id === panel.id)
    return panel.kind === 'items'
      ? <ItemsPanel v={v} onBack={() => setPanel(null)} />
      : <LogPanel v={v} onBack={() => setPanel(null)} onChange={rerender} />
  }

  return (
    <div className="screen mv-screen">
      <button className="mv-back" onClick={popResidentView}><BackIcon /> My Properties</button>
      <h1 className="mv-title">My Violations</h1>

      <select className="mv-unit-select" value={unitId} onChange={e => setUnitId(e.target.value)}>
        <option value="all">All units</option>
        {CURRENT_USER.units.map(u => <option key={u.id} value={u.id}>{u.address}</option>)}
      </select>

      <div className="mv-counters">
        <button
          className={`mv-counter${statusFilter === 'Open' ? ' mv-counter--active' : ''}`}
          onClick={() => setStatusFilter(f => f === 'Open' ? null : 'Open')}
        >
          <OpenIcon /><span className="mv-counter__num">{openCount}</span>
          <span className="mv-counter__label">Open</span>
        </button>
        <button
          className={`mv-counter${statusFilter === 'Closed' ? ' mv-counter--active' : ''}`}
          onClick={() => setStatusFilter(f => f === 'Closed' ? null : 'Closed')}
        >
          <ClosedIcon /><span className="mv-counter__num">{closedCount}</span>
          <span className="mv-counter__label">Closed</span>
        </button>
      </div>

      <div className="mv-list">
        {shown.length === 0 && <p className="mv-empty">No violations here. Nice work!</p>}
        {shown.map(v => {
          const unit = unitById(v.unitId)
          return (
            <div key={v.id} className="mv-card">
              <div className="mv-card__head">
                <span className="mv-card__type"><AlertIcon /> {v.type}</span>
                <span className={`mv-pill mv-pill--${v.status.toLowerCase()}`}>{v.status}</span>
              </div>
              <div className="mv-card__fields">
                <p><b>Acct:</b> {unit?.acct}</p>
                <p className="mv-card__address">{unit?.address}</p>
                <p><b>Date:</b> {v.date}</p>
                <p><b>Level:</b> {v.level}</p>
                {v.fineStarts && <p><b>Fine Starts:</b> {v.fineStarts}</p>}
              </div>
              <button className="mv-row" onClick={() => setPanel({ kind: 'items', id: v.id })}>
                <ItemsIcon /><span>Violation Items</span><span className="mv-badge">{v.items.length}</span><ChevronIcon />
              </button>
              <button className="mv-row" onClick={() => setPanel({ kind: 'log', id: v.id })}>
                <LogIcon /><span>Log &amp; Notes</span><span className="mv-badge">{v.log.length}</span><ChevronIcon />
              </button>
              <div className="mv-card__attachments">
                <AttachmentList items={v.attachments} />
                {v.status === 'Open' && (
                  <AddAttachmentButton
                    label="Add Attachment"
                    onAdd={files => { v.attachments.push(...files); rerender() }}
                  />
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mv-report">
        <p className="mv-report__text">See an issue in the community?</p>
        <button className="mv-report__btn" onClick={() => pushResidentView('report-violation')}>Report a Violation</button>
      </div>
    </div>
  )
}

function ItemsPanel({ v, onBack }) {
  return (
    <div className="screen mv-screen">
      <button className="mv-back" onClick={onBack}><BackIcon /> My Violations</button>
      <h1 className="mv-title">Violation Items</h1>
      <p className="mv-sub"><AlertIcon /> {v.type}</p>
      <div className="mv-list">
        {v.items.map((it, i) => (
          <div key={i} className="mv-item">
            <p className="mv-item__title">{it.title}</p>
            <p className="mv-item__text">{it.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function LogPanel({ v, onBack, onChange }) {
  const unit = unitById(v.unitId)
  const [draft, setDraft] = useState('')
  const [composing, setComposing] = useState(false)

  function send() {
    if (!draft.trim()) return
    addViolationNote(v.id, draft.trim())
    setDraft('')
    setComposing(false)
    onChange()
  }

  return (
    <div className="screen mv-screen">
      <button className="mv-back" onClick={onBack}><BackIcon /> My Violations</button>
      <h1 className="mv-title">Log &amp; Notes</h1>
      <div className="mv-card__fields mv-log-meta">
        <p className="mv-card__address">{v.type} · {unit?.address}</p>
        <p><b>Date:</b> {v.date}</p>
        <p><b>Level:</b> {v.level}</p>
        {v.fineStarts && <p><b>Fine Starts:</b> {v.fineStarts}</p>}
      </div>

      <div className="mv-timeline">
        {v.log.map((l, i) => (
          <div key={i} className="mv-tl">
            <span className="mv-tl__dot" />
            <p className="mv-tl__date">{l.date}</p>
            <div className={`mv-tl__note${l.author === 'Homeowner Note' ? ' mv-tl__note--mine' : ''}`}>
              <p className="mv-tl__author">{l.author}</p>
              <p className="mv-tl__text">{l.text}</p>
            </div>
          </div>
        ))}
      </div>

      {v.status === 'Open' && (composing ? (
        <div className="mv-compose">
          <textarea
            className="mv-compose__input"
            placeholder="Write a note to management…"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            rows={3}
            autoFocus
          />
          <div className="mv-compose__actions">
            <button className="mv-compose__cancel" onClick={() => { setComposing(false); setDraft('') }}>Cancel</button>
            <button className="mv-report__btn" disabled={!draft.trim()} onClick={send}>Post Note</button>
          </div>
        </div>
      ) : (
        <button className="mv-report__btn mv-add-note" onClick={() => setComposing(true)}>Add Note</button>
      ))}
    </div>
  )
}

function BackIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
}
function ChevronIcon() {
  return <svg className="mv-row__chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
}
function AlertIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7.5v5.5" /><circle cx="12" cy="16.5" r="0.6" fill="currentColor" /></svg>
}
function OpenIcon() {
  return <svg className="mv-counter__icon" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="10" /><circle cx="8" cy="12" r="0.9" fill="currentColor" /><circle cx="12" cy="12" r="0.9" fill="currentColor" /><circle cx="16" cy="12" r="0.9" fill="currentColor" /></svg>
}
function ClosedIcon() {
  return <svg className="mv-counter__icon" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M7.5 12.5l3 3 6-6.5" /></svg>
}
function ItemsIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7.5v5.5" /><circle cx="12" cy="16.5" r="0.6" fill="currentColor" /></svg>
}
function LogIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" /></svg>
}
