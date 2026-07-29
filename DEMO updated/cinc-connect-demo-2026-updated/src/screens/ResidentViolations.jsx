import { useState } from 'react'
import { useMode } from '../ModeContext'
import { REPORTED_VIOLATIONS } from '../data/propertiesData'
import ReportViolation from './ReportViolation'
import './ResidentViolations.css'

export default function ResidentViolations() {
  const { popResidentView } = useMode()
  const [, bump] = useState(0)
  const rerender = () => bump(x => x + 1)
  const [showForm, setShowForm] = useState(REPORTED_VIOLATIONS.length === 0)

  function handleClose() {
    rerender()
    if (REPORTED_VIOLATIONS.length === 0) popResidentView()
    else setShowForm(false)
  }

  if (showForm) {
    return <ReportViolation onClose={handleClose} />
  }

  return (
    <div className="screen rvl-screen">
      <button className="rvl-back" onClick={popResidentView}>
        <BackIcon /> My Properties
      </button>

      <div className="rvl-header-row">
        <h1 className="rvl-title">Violations</h1>
        <button className="rvl-new-btn" onClick={() => setShowForm(true)}>+ New</button>
      </div>

      <div className="rvl-list">
        {REPORTED_VIOLATIONS.map(v => (
          <div key={v.id} className="rvl-card">
            <div className="rvl-card__text">
              <span className="rvl-card__type">{v.violationType}</span>
              <span className="rvl-card__address">{v.address}</span>
              <p className="rvl-card__ref">{v.ccrRef} · Reported {v.submittedDate}</p>
            </div>
            <span className="rvl-status">{v.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function BackIcon() {
  return (
    <svg width="9" height="16" viewBox="0 0 9 16" fill="none">
      <path d="M8 1L1 8L8 15" stroke="var(--lime)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
