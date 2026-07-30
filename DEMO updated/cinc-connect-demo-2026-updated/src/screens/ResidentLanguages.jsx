import { useState } from 'react'
import { useMode } from '../ModeContext'
import './ResidentLanguages.css'

const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'es', label: 'Spanish', native: 'Español' },
  { code: 'fr', label: 'French', native: 'Français' },
  { code: 'zh', label: 'Chinese (Simplified)', native: '简体中文' },
  { code: 'vi', label: 'Vietnamese', native: 'Tiếng Việt' },
]

export default function ResidentLanguages() {
  const { popResidentView } = useMode()
  const [selected, setSelected] = useState('en')

  return (
    <div className="screen rlg-screen">
      <button className="rlg-back" onClick={popResidentView}>
        <BackIcon /> More
      </button>

      <h1 className="rlg-title">Languages</h1>
      <p className="rlg-sub">Choose the language used for your resident portal.</p>

      <div className="rlg-list">
        {LANGUAGES.map(l => (
          <button key={l.code} className="rlg-row" onClick={() => setSelected(l.code)}>
            <div className="rlg-row__text">
              <span className="rlg-row__label">{l.label}</span>
              <span className="rlg-row__native">{l.native}</span>
            </div>
            {selected === l.code && <CheckIcon />}
          </button>
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

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}
