import { useState } from 'react'
import loginLogo from '../images/login-logo.svg'
import connecPlus from '../images/connecplus-wordmark.svg'
import faceIdIcon from '../images/face-id.svg'
import './LoginScreen.css'

function EnvelopeIcon() {
  return (
    <svg width="16" height="13" viewBox="0 0 20 16" fill="none" stroke="rgba(255,248,234,0.5)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="1" width="18" height="14" rx="2"/>
      <polyline points="1,1 10,9 19,1"/>
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="16" height="17" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.5 }}>
      <mask id="lock-mask" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="25">
        <path d="M0 0H23.5675V25H0V0Z" fill="black"/>
      </mask>
      <g mask="url(#lock-mask)">
        <path d="M20.6093 6.85332H19.5794V3.91516C19.5794 1.75621 17.8231 -0.00012207 15.6642 -0.00012207H7.90333C5.74438 -0.00012207 3.98804 1.75621 3.98804 3.91516V6.85332H2.95814C1.32696 6.85332 0 8.18028 0 9.81146V22.0421C0 23.6733 1.32696 25.0003 2.95814 25.0003H20.6093C22.2405 25.0003 23.5675 23.6733 23.5675 22.0421V9.81146C23.5675 8.18028 22.2405 6.85332 20.6093 6.85332ZM5.87293 3.91516C5.87293 2.79554 6.78371 1.88476 7.90333 1.88476H15.6642C16.7838 1.88476 17.6946 2.79554 17.6946 3.91516V6.85332H5.87293V3.91516ZM21.6826 22.0421C21.6826 22.6336 21.2012 23.1154 20.6093 23.1154H2.95814C2.36629 23.1154 1.88489 22.6336 1.88489 22.0421V9.81146C1.88489 9.21961 2.36629 8.73821 2.95814 8.73821H4.93049H18.637H20.6093C21.2012 8.73821 21.6826 9.21961 21.6826 9.81146V22.0421Z" fill="#FFF8EA"/>
        <path d="M11.7835 13.0477C11.2629 13.0477 10.8411 13.4696 10.8411 13.9902V17.8621C10.8411 18.3827 11.2629 18.8045 11.7835 18.8045C12.3041 18.8045 12.726 18.3827 12.726 17.8621V13.9902C12.726 13.4696 12.3041 13.0477 11.7835 13.0477Z" fill="#FFF8EA"/>
      </g>
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg width="20" height="15" viewBox="0 0 20 14.4621" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.4 }}>
      <mask id="eye-off-mask" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="15">
        <path d="M0 0H20V14.4621H0V0Z" fill="black"/>
      </mask>
      <g mask="url(#eye-off-mask)">
        <path d="M19.9116 6.90884C18.7365 4.93351 17.3796 3.3596 15.9017 2.22036L17.0465 1.07558C17.2924 0.829391 17.2924 0.430747 17.0465 0.184807C16.8003 -0.061385 16.4016 -0.061385 16.1557 0.184807L14.8466 1.49388C13.3193 0.5643 11.6849 0.0764522 9.99987 0.0764522C6.22938 0.0764522 2.70937 2.50309 0.0886996 6.90884C-0.0294825 7.10741 -0.0294825 7.35461 0.0886996 7.55317C1.26372 9.52851 2.62042 11.1024 4.09858 12.2417L2.95355 13.3867C2.70761 13.6329 2.70761 14.0315 2.95355 14.2775C3.07652 14.4007 3.23779 14.4622 3.39906 14.4622C3.56008 14.4622 3.72135 14.4007 3.84432 14.2775L5.15365 12.9684C6.68069 13.8977 8.31483 14.3858 9.99987 14.3858H10.0001C13.7704 14.3858 17.2909 11.9589 19.9116 7.55317C20.0297 7.35461 20.0297 7.10741 19.9116 6.90884ZM1.36703 7.23088C3.72639 3.42612 6.78124 1.33639 9.99987 1.33639C11.35 1.33639 12.6707 1.70858 13.9238 2.41641L12.2007 4.1395C11.5791 3.6955 10.8206 3.43141 10.0001 3.43141C7.9051 3.43141 6.20066 5.13611 6.20066 7.23113C6.20066 8.05161 6.46474 8.81009 6.90849 9.43174L4.99943 11.3411C3.677 10.3538 2.44831 8.97489 1.36703 7.23088ZM12.5397 7.23113C12.5397 8.63143 11.4004 9.77092 10.0001 9.77092C9.52815 9.77092 9.08718 9.63888 8.70819 9.4136L12.1826 5.93919C12.4079 6.31844 12.5397 6.75916 12.5397 7.23113ZM7.4606 7.23113C7.4606 5.83084 8.59983 4.69135 10.0001 4.69135C10.4721 4.69135 10.9128 4.82314 11.2918 5.04842L7.81741 8.52282C7.59238 8.14383 7.4606 7.70311 7.4606 7.23113ZM9.99987 13.1259C8.64973 13.1259 7.32931 12.7534 6.07618 12.0459L7.79927 10.3225C8.42092 10.7665 9.17965 11.0309 10.0001 11.0309C12.0952 11.0309 13.7996 9.32641 13.7996 7.23113C13.7996 6.41066 13.5355 5.65218 13.0915 5.03028L15.0008 3.12122C16.3232 4.1085 17.5517 5.48713 18.6332 7.23088C16.2736 11.0361 13.2188 13.1259 9.99987 13.1259Z" fill="#FFF8EA"/>
      </g>
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg width="20" height="16" viewBox="0 0 24 16" fill="none" stroke="rgba(255,248,234,0.4)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 8s4-7 11-7 11 7 11 7-4 7-11 7S1 8 1 8z"/>
      <circle cx="12" cy="8" r="3"/>
    </svg>
  )
}

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  return (
    <div className="login-screen">
      <div className="login-logo-area">
        <div className="login-logo-lockup">
          <img src={loginLogo} alt="CINC Connect+" className="login-logo" />
          <img src={connecPlus} alt="CONNEC+" className="login-connecplus" />
        </div>
      </div>

      <div className="login-form">
        <div className="login-input-wrap">
          <span className="login-input-icon"><EnvelopeIcon /></span>
          <input
            className="login-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        <div className="login-input-wrap">
          <span className="login-input-icon"><LockIcon /></span>
          <input
            className="login-input"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <button
            className="login-eye-btn"
            onClick={() => setShowPassword(v => !v)}
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeIcon /> : <EyeOffIcon />}
          </button>
        </div>

        <div className="login-remember-row">
          <button
            className={`login-toggle${rememberMe ? ' login-toggle--on' : ''}`}
            onClick={() => setRememberMe(v => !v)}
            role="switch"
            aria-checked={rememberMe}
          >
            <span className="login-toggle__thumb" />
          </button>
          <span className="login-remember-label">Remember me</span>
        </div>

        <button className="login-btn" onClick={onLogin}>
          Sign in
        </button>

        <button className="login-forgot" onClick={() => {}}>
          Forgot username or password?
        </button>
      </div>

      <div className="login-biometric">
        <div className="login-faceid-wrap">
          <img src={faceIdIcon} alt="Face ID" className="login-faceid" />
        </div>
      </div>
    </div>
  )
}
