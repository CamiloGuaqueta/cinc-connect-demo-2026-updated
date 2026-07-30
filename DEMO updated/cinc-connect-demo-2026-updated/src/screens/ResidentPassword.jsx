import { useState } from 'react'
import { useMode } from '../ModeContext'
import './ResidentPassword.css'

export default function ResidentPassword() {
  const { popResidentView } = useMode()
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [saved, setSaved] = useState(false)

  const mismatch = next && confirm && next !== confirm
  const canSave = current.trim().length > 0 && next.trim().length >= 8 && next === confirm

  function handleSave() {
    if (!canSave) return
    setSaved(true)
    setCurrent('')
    setNext('')
    setConfirm('')
  }

  function edit(setter) {
    return e => { setter(e.target.value); setSaved(false) }
  }

  return (
    <div className="screen rpw-screen">
      <button className="rpw-back" onClick={popResidentView}>
        <BackIcon /> More
      </button>

      <h1 className="rpw-title">Password</h1>

      {saved && <div className="rpw-success">Password updated successfully.</div>}

      <div className="filter-section">
        <p className="filter-section__label">Current Password</p>
        <input
          type="password"
          className="filter-date-input"
          value={current}
          onChange={edit(setCurrent)}
        />
      </div>

      <div className="filter-section">
        <p className="filter-section__label">New Password</p>
        <input
          type="password"
          className="filter-date-input"
          placeholder="At least 8 characters"
          value={next}
          onChange={edit(setNext)}
        />
      </div>

      <div className="filter-section">
        <p className="filter-section__label">Confirm New Password</p>
        <input
          type="password"
          className="filter-date-input"
          value={confirm}
          onChange={edit(setConfirm)}
        />
        {mismatch && <p className="rpw-error">Passwords don't match.</p>}
      </div>

      <button
        className={`filter-apply${canSave ? '' : ' filter-apply--disabled'}`}
        disabled={!canSave}
        onClick={handleSave}
      >
        Save Password
      </button>
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
