import { useState } from 'react'

function Toggle({ on, onToggle }) {
  return (
    <button
      className={`np-toggle${on ? ' np-toggle--on' : ''}`}
      onClick={onToggle}
      aria-label={on ? 'Turn off' : 'Turn on'}
    >
      <span className="np-toggle__thumb" />
    </button>
  )
}

function Row({ icon, label, sublabel, on, onToggle }) {
  return (
    <div className="np-row">
      <span className="np-row__icon">{icon}</span>
      <span className="np-row__label-wrap">
        <span className="np-row__label">{label}</span>
        {sublabel && <span className="np-row__sublabel">{sublabel}</span>}
      </span>
      <Toggle on={on} onToggle={onToggle} />
    </div>
  )
}

const INITIAL = {
  profileVisible: true,
  addressVisible: true,
  petDirectory: false,
  boardContact: true,
}

export default function ResidentPrivacy() {
  const [prefs, setPrefs] = useState(INITIAL)
  const toggle = key => setPrefs(p => ({ ...p, [key]: !p[key] }))

  return (
    <div className="screen np-screen">
      <div className="np-content">
        <h2 className="np-section-title">Directory Visibility</h2>
        <div className="np-card">
          <Row
            icon={<EyeIcon />}
            label="Show my profile to other residents"
            sublabel="Visible in the Homeowner Directory"
            on={prefs.profileVisible}
            onToggle={() => toggle('profileVisible')}
          />
        </div>
        <div className="np-card">
          <Row
            icon={<HomeIcon />}
            label="Show my unit address"
            sublabel="Visible to board members and neighbors"
            on={prefs.addressVisible}
            onToggle={() => toggle('addressVisible')}
          />
        </div>
        <div className="np-card">
          <Row
            icon={<PawIcon />}
            label="Show my pets in the community directory"
            on={prefs.petDirectory}
            onToggle={() => toggle('petDirectory')}
          />
        </div>

        <h2 className="np-section-title">Communication</h2>
        <div className="np-card">
          <Row
            icon={<BoardIcon />}
            label="Allow board members to contact me directly"
            sublabel="Outside of official HOA broadcasts"
            on={prefs.boardContact}
            onToggle={() => toggle('boardContact')}
          />
        </div>
      </div>
    </div>
  )
}

function EyeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )
}

function HomeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
      <path d="M9 22V12h6v10"/>
    </svg>
  )
}

function PawIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6.5" cy="8.5" r="1.8"/>
      <circle cx="12" cy="5.5" r="1.8"/>
      <circle cx="17.5" cy="8.5" r="1.8"/>
      <path d="M8.5 17.5c0-2.5 1.8-4 3.5-4s3.5 1.5 3.5 4c0 1.5-1.5 2.5-3.5 2.5s-3.5-1-3.5-2.5z"/>
    </svg>
  )
}

function BoardIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  )
}
