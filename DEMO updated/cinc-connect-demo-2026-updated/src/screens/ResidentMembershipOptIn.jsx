import { useState } from 'react'
import { useMode } from '../ModeContext'
import { CURRENT_USER } from '../data/userData'
import './ResidentMembershipOptIn.css'

const INITIAL_UNITS = CURRENT_USER.units

function BackIcon() {
  return (
    <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
      <path d="M9 1L1 8.5L9 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function UnitIcon() {
  return (
    <svg width="20" height="25" viewBox="0 0 20 25" fill="none" style={{ flexShrink: 0, opacity: 0.7 }}>
      <mask id="rmoi-unit-mask" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="25">
        <path d="M0 0H19.6237V25H0V0Z" fill="black"/>
      </mask>
      <g mask="url(#rmoi-unit-mask)">
        <path d="M11.3831 0.00012207C11.3495 0.00012207 11.3159 0.00275048 11.2826 0.00800731L2.3866 1.42589C1.06538 1.45918 0 2.70593 0 4.23304V20.7669C0 22.294 1.06538 23.5405 2.38631 23.5741L11.2826 24.9922C11.3159 24.9975 11.3495 25.0001 11.3831 25.0001C12.7291 25.0001 13.8243 23.7405 13.8243 22.1918V2.80814C13.8243 1.25972 12.7291 0.00012207 11.3831 0.00012207ZM12.3641 22.1918C12.3641 22.7972 11.9473 23.2934 11.4266 23.3197L2.54138 21.9033C2.50809 21.898 2.4748 21.8954 2.44121 21.8954C1.90005 21.8954 1.46023 21.389 1.46023 20.7669V4.23304C1.46023 3.61069 1.90005 3.10457 2.44121 3.10457C2.4748 3.10457 2.50809 3.10194 2.54138 3.09668L11.4266 1.68055C11.9473 1.70684 12.3641 2.20273 12.3641 2.80814V22.1918Z" fill="currentColor"/>
        <path d="M17.1823 2.35864H15.0465C14.6429 2.35864 14.3164 2.73451 14.3164 3.19827C14.3164 3.66234 14.6429 4.0382 15.0465 4.0382H17.1823C17.7237 4.0382 18.1635 4.54431 18.1635 5.16666V19.8332C18.1635 20.4556 17.7237 20.9617 17.1823 20.9617H15.0465C14.6429 20.9617 14.3164 21.3375 14.3164 21.8013C14.3164 22.2651 14.6429 22.6412 15.0465 22.6412H17.1823C18.5286 22.6412 19.6235 21.3813 19.6235 19.8332V5.16666C19.6235 3.61824 18.5286 2.35864 17.1823 2.35864Z" fill="currentColor"/>
        <path d="M10.0032 12.5195C9.47078 12.5195 9.03943 13.0157 9.03943 13.6281C9.03943 14.2403 9.47078 14.7367 10.0032 14.7367C10.5356 14.7367 10.9669 14.2403 10.9669 13.6281C10.9669 13.0157 10.5356 12.5195 10.0032 12.5195Z" fill="currentColor"/>
      </g>
    </svg>
  )
}

export default function ResidentMembershipOptIn() {
  const { popResidentView } = useMode()
  const [units, setUnits] = useState(INITIAL_UNITS)

  const toggle = id =>
    setUnits(u => u.map(unit => unit.id === id ? { ...unit, optedIn: !unit.optedIn } : unit))

  return (
    <div className="screen rmoi-screen">
      {/* Header */}
      <div className="rmoi-header">
        <button className="rmoi-back" onClick={popResidentView} aria-label="Back">
          <BackIcon />
        </button>
        <h1 className="rmoi-title">Membership List Opt-In/Out</h1>
      </div>

      {/* Body */}
      <div className="rmoi-body">
        <h2 className="rmoi-section-title">Membership List Opt-In/Out</h2>
        <p className="rmoi-description">
          The membership list may be requested by any member and includes homeowner names, property addresses, and email addresses. Use the toggle next to each unit below to opt that property in or out of the membership directory
        </p>

        <div className="rmoi-units">
          {units.map((unit, i) => (
            <div key={unit.id}>
              <div className="rmoi-unit-row">
                <UnitIcon />
                <div className="rmoi-unit-info">
                  <span className="rmoi-unit-address">{unit.address}</span>
                  <span className="rmoi-unit-account">{unit.account}</span>
                </div>
                <button
                  className={`rmoi-toggle${unit.optedIn ? ' rmoi-toggle--on' : ''}`}
                  onClick={() => toggle(unit.id)}
                  role="switch"
                  aria-checked={unit.optedIn}
                >
                  <span className="rmoi-toggle__thumb" />
                </button>
              </div>
              {i < units.length - 1 && <div className="rmoi-unit-divider" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
