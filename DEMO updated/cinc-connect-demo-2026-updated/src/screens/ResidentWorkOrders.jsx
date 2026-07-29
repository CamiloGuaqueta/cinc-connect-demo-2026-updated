import { useState } from 'react'
import { useMode } from '../ModeContext'
import { CURRENT_USER } from '../data/userData'
import { WORK_ORDERS, WORK_ORDER_CATEGORIES, submitWorkOrder, unitById } from '../data/propertiesData'
import './ResidentWorkOrders.css'

const STATUS_COLOR = {
  Submitted: '#8aa0ff',
  Scheduled: '#ffb74d',
  Completed: '#6bcb77',
}

export default function ResidentWorkOrders() {
  const { popResidentView } = useMode()
  const [, bump] = useState(0)
  const rerender = () => bump(x => x + 1)
  const [expandedId, setExpandedId] = useState(null)
  const [showForm, setShowForm] = useState(false)

  function handleSubmit(data) {
    submitWorkOrder(data)
    setShowForm(false)
    rerender()
  }

  return (
    <div className="screen rwo-screen">
      <button className="rwo-back" onClick={popResidentView}>
        <BackIcon /> My Properties
      </button>

      <div className="rwo-header-row">
        <h1 className="rwo-title">Work Orders</h1>
        <button className="rwo-new-btn" onClick={() => setShowForm(true)}>+ New</button>
      </div>

      <div className="rwo-list">
        {WORK_ORDERS.length === 0 ? (
          <p className="rwo-empty">No work orders yet.</p>
        ) : WORK_ORDERS.map(wo => {
          const unit = unitById(wo.unitId)
          const isOpen = expandedId === wo.id
          return (
            <div key={wo.id} className="rwo-card">
              <button className="rwo-card__head" onClick={() => setExpandedId(isOpen ? null : wo.id)}>
                <div className="rwo-card__text">
                  <span className="rwo-card__category">{wo.category}</span>
                  <span className="rwo-card__address">{unit?.address}</span>
                  <p className="rwo-card__desc">{wo.description}</p>
                </div>
                <span className="rwo-status" style={{ color: STATUS_COLOR[wo.status] }}>{wo.status}</span>
              </button>
              {isOpen && (
                <div className="rwo-card__log">
                  {wo.vendor && <p className="rwo-card__vendor">Vendor: {wo.vendor}</p>}
                  {wo.log.map((l, i) => (
                    <div key={i} className="rwo-log-row">
                      <span className="rwo-log-date">{l.date}</span>
                      <span className="rwo-log-text">{l.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {showForm && (
        <NewWorkOrderSheet onSave={handleSubmit} onClose={() => setShowForm(false)} />
      )}
    </div>
  )
}

function NewWorkOrderSheet({ onSave, onClose }) {
  const [unitId, setUnitId] = useState(CURRENT_USER.units[0].id)
  const [category, setCategory] = useState(WORK_ORDER_CATEGORIES[0])
  const [description, setDescription] = useState('')
  const canSave = description.trim().length > 0

  return (
    <>
      <div className="filter-scrim" onClick={onClose} />
      <div className="filter-sheet">
        <div className="filter-sheet__handle" />
        <div className="filter-sheet__header">
          <span className="filter-sheet__title">New Work Order</span>
          <button className="filter-sheet__close" onClick={onClose} aria-label="Close"><CloseIcon /></button>
        </div>

        <div className="filter-section">
          <p className="filter-section__label">Property</p>
          <select className="filter-date-input" value={unitId} onChange={e => setUnitId(Number(e.target.value))}>
            {CURRENT_USER.units.map(u => <option key={u.id} value={u.id}>{u.address}</option>)}
          </select>
        </div>

        <div className="filter-section">
          <p className="filter-section__label">Category</p>
          <div className="filter-chips">
            {WORK_ORDER_CATEGORIES.map(c => {
              const isOn = category === c
              return (
                <button
                  key={c}
                  className="filter-chip"
                  onClick={() => setCategory(c)}
                  style={isOn ? { background: 'var(--lime)', borderColor: 'var(--lime)', color: 'var(--text-dark)' } : undefined}
                >
                  {c}
                </button>
              )
            })}
          </div>
        </div>

        <div className="filter-section">
          <p className="filter-section__label">Description</p>
          <textarea
            className="filter-date-input"
            placeholder="Describe the issue…"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={4}
          />
        </div>

        <button
          className={`filter-apply${canSave ? '' : ' filter-apply--disabled'}`}
          disabled={!canSave}
          onClick={() => onSave({ unitId, category, description: description.trim() })}
        >
          Submit Request
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
