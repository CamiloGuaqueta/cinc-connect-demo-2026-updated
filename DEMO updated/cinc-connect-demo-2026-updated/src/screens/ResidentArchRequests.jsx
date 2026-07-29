import { useState } from 'react'
import { useMode } from '../ModeContext'
import { CURRENT_USER } from '../data/userData'
import { ARCH_REQUESTS, ARCH_PROJECT_TYPES, submitArchRequest, unitById } from '../data/propertiesData'
import './ResidentArchRequests.css'

const STATUS_COLOR = {
  'Under Review': '#ffb74d',
  Approved: '#6bcb77',
  Denied: '#e57373',
}

export default function ResidentArchRequests() {
  const { popResidentView } = useMode()
  const [, bump] = useState(0)
  const rerender = () => bump(x => x + 1)
  const [expandedId, setExpandedId] = useState(null)
  const [showForm, setShowForm] = useState(false)

  function handleSubmit(data) {
    submitArchRequest(data)
    setShowForm(false)
    rerender()
  }

  return (
    <div className="screen rar-screen">
      <button className="rar-back" onClick={popResidentView}>
        <BackIcon /> My Properties
      </button>

      <div className="rar-header-row">
        <h1 className="rar-title">Architectural Requests</h1>
        <button className="rar-new-btn" onClick={() => setShowForm(true)}>+ New</button>
      </div>

      <div className="rar-list">
        {ARCH_REQUESTS.length === 0 ? (
          <p className="rar-empty">No architectural requests yet.</p>
        ) : ARCH_REQUESTS.map(req => {
          const unit = unitById(req.unitId)
          const isOpen = expandedId === req.id
          return (
            <div key={req.id} className="rar-card">
              <button className="rar-card__head" onClick={() => setExpandedId(isOpen ? null : req.id)}>
                <div className="rar-card__text">
                  <span className="rar-card__category">{req.projectType}</span>
                  <span className="rar-card__address">{unit?.address}</span>
                  <p className="rar-card__desc">{req.description}</p>
                </div>
                <span className="rar-status" style={{ color: STATUS_COLOR[req.status] }}>{req.status}</span>
              </button>
              {isOpen && (
                <div className="rar-card__log">
                  {req.decisionDate && <p className="rar-card__decision">Decision date: {req.decisionDate}</p>}
                  {req.log.map((l, i) => (
                    <div key={i} className="rar-log-row">
                      <span className="rar-log-date">{l.date}</span>
                      <span className="rar-log-text">{l.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {showForm && (
        <NewArchRequestSheet onSave={handleSubmit} onClose={() => setShowForm(false)} />
      )}
    </div>
  )
}

function NewArchRequestSheet({ onSave, onClose }) {
  const [unitId, setUnitId] = useState(CURRENT_USER.units[0].id)
  const [projectType, setProjectType] = useState(ARCH_PROJECT_TYPES[0])
  const [description, setDescription] = useState('')
  const canSave = description.trim().length > 0

  return (
    <>
      <div className="filter-scrim" onClick={onClose} />
      <div className="filter-sheet">
        <div className="filter-sheet__handle" />
        <div className="filter-sheet__header">
          <span className="filter-sheet__title">New Architectural Request</span>
          <button className="filter-sheet__close" onClick={onClose} aria-label="Close"><CloseIcon /></button>
        </div>

        <div className="filter-section">
          <p className="filter-section__label">Property</p>
          <select className="filter-date-input" value={unitId} onChange={e => setUnitId(Number(e.target.value))}>
            {CURRENT_USER.units.map(u => <option key={u.id} value={u.id}>{u.address}</option>)}
          </select>
        </div>

        <div className="filter-section">
          <p className="filter-section__label">Project Type</p>
          <div className="filter-chips">
            {ARCH_PROJECT_TYPES.map(t => {
              const isOn = projectType === t
              return (
                <button
                  key={t}
                  className="filter-chip"
                  onClick={() => setProjectType(t)}
                  style={isOn ? { background: 'var(--lime)', borderColor: 'var(--lime)', color: 'var(--text-dark)' } : undefined}
                >
                  {t}
                </button>
              )
            })}
          </div>
        </div>

        <div className="filter-section">
          <p className="filter-section__label">Description</p>
          <textarea
            className="filter-date-input"
            placeholder="Describe the proposed change…"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={4}
          />
        </div>

        <button
          className={`filter-apply${canSave ? '' : ' filter-apply--disabled'}`}
          disabled={!canSave}
          onClick={() => onSave({ unitId, projectType, description: description.trim() })}
        >
          Submit Application
        </button>
        <button className="filter-clear" onClick={onClose}>Cancel</button>
      </div>
    </>
  )
}

function BackIcon() {
  return (
    <svg width="9" height="16" viewBox="0 0 9 16" fill="none">
      <path d="M8 1L1 8L8 15" stroke="var(--lime)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )
}
