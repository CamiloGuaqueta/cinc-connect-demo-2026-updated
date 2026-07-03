import { useState, useEffect } from 'react'
import { useMode } from '../ModeContext'
import profileImg from '../images/profile.jpg'
import bgImg from '../images/hoa.jpg'
import './ResidentProfile.css'

function buildPhonesFromProfile(profile) {
  if (profile.phones && profile.phones.length > 0) return [...profile.phones]
  const phones = []
  if (profile.mobile) phones.push(profile.mobile)
  if (profile.home)   phones.push(profile.home)
  return phones.length > 0 ? phones : ['']
}

export default function ResidentProfile() {
  const { residentProfile, updateResidentProfile, popResidentView, setNavGuard } = useMode()

  const getOriginal = () => ({
    firstName:     residentProfile.firstName     || '',
    lastName:      residentProfile.lastName      || '',
    businessName:  residentProfile.businessName  || '',
    phones:        buildPhonesFromProfile(residentProfile),
    primaryEmail:  residentProfile.primaryEmail  || '',
    secondaryEmail: residentProfile.secondaryEmail || '',
  })

  const [draft, setDraft] = useState(getOriginal)
  const [showSecondaryEmail, setShowSecondaryEmail] = useState(!!residentProfile.secondaryEmail)
  const [useBusinessName, setUseBusinessName] = useState(residentProfile.useBusinessName || false)
  const [showSaveConfirm,    setShowSaveConfirm]    = useState(false)
  const [showUnsavedWarning, setShowUnsavedWarning] = useState(false)

  const isDirty = JSON.stringify(draft) !== JSON.stringify(getOriginal())

  // Register / clear the nav guard whenever dirty state changes
  useEffect(() => {
    if (isDirty) {
      setNavGuard(() => setShowUnsavedWarning(true))
    } else {
      setNavGuard(null)
    }
    return () => setNavGuard(null)
  }, [isDirty])

  const set = (key, val) => setDraft(d => ({ ...d, [key]: val }))

  const setPhone = (i, val) => setDraft(d => {
    const phones = [...d.phones]
    phones[i] = val
    return { ...d, phones }
  })

  const addPhone = () => {
    if (draft.phones.length < 3) setDraft(d => ({ ...d, phones: [...d.phones, ''] }))
  }

  const removePhone = (i) => setDraft(d => ({
    ...d,
    phones: d.phones.filter((_, idx) => idx !== i),
  }))

  const handleSave = () => {
    const filteredPhones = draft.phones.filter(p => p.trim())
    updateResidentProfile({
      ...residentProfile,
      firstName:     draft.firstName,
      lastName:      draft.lastName,
      businessName:  draft.businessName,
      phones:        filteredPhones.length ? filteredPhones : [''],
      mobile:        filteredPhones[0] || '',
      home:          filteredPhones[1] || '',
      primaryEmail:  draft.primaryEmail,
      secondaryEmail: draft.secondaryEmail,
    })
    setShowSaveConfirm(true)
  }

  const handleSaveAndLeave = () => {
    handleSave()
    setShowUnsavedWarning(false)
    setNavGuard(null)
    popResidentView()
  }

  const handleDiscard = () => {
    setShowUnsavedWarning(false)
    setNavGuard(null)
    popResidentView()
  }

  return (
    <div className="screen rp-screen">
      <div className="rp-content">

        {/* ── Hero ────────────────────────────────────────── */}
        <div className="rp-hero">
          <img src={bgImg} alt="" className="rp-hero__bg" />
          <div className="rp-hero__overlay" />
          <div className="rp-hero__avatar-wrap">
            <div className="rp-hero__avatar-frame">
              <img src={profileImg} alt="Profile" className="rp-hero__avatar" />
            </div>
            <button className="rp-hero__edit-btn" aria-label="Change photo">
              <CameraIcon />
            </button>
          </div>
          <p className="rp-hero__name">
            {draft.firstName} {draft.lastName}
          </p>
        </div>

        {/* ── Cards (overlap hero) ────────────────────────── */}
        <div className="rp-cards-wrap">

        {/* ── Personal Information ────────────────────────── */}
        <p className="rp-section-title">Personal Information</p>
        <div className="rp-card">

          <div className="rp-field-section">
            <p className="rp-caps-label">FIRST NAME</p>
            <input
              className="rp-field-input"
              value={draft.firstName}
              onChange={e => set('firstName', e.target.value)}
              placeholder="First name"
            />
          </div>

          <div className="rp-section-divider" />

          <div className="rp-field-section">
            <p className="rp-caps-label">LAST NAME</p>
            <input
              className="rp-field-input"
              value={draft.lastName}
              onChange={e => set('lastName', e.target.value)}
              placeholder="Last name"
            />
          </div>

          <div className="rp-section-divider" />

          <div className="rp-field-section">
            <p className="rp-caps-label">
              BUSINESS NAME&nbsp;<span className="rp-optional-tag">Optional</span>
            </p>
            <input
              className="rp-field-input"
              value={draft.businessName}
              onChange={e => set('businessName', e.target.value)}
              placeholder="Business or company name"
            />
          </div>

          <div className={`rp-field-section rp-field-section--toggle${!draft.businessName.trim() ? ' rp-field-section--disabled' : ''}`}>
            <span className="rp-toggle-label">
              Use business name as official name in mailings and other communications
            </span>
            <RpToggle
              on={useBusinessName && !!draft.businessName.trim()}
              onToggle={draft.businessName.trim() ? () => setUseBusinessName(v => !v) : undefined}
            />
          </div>

        </div>

        {/* ── Phone Numbers ───────────────────────────────── */}
        <p className="rp-section-title">Phone Numbers</p>
        <div className="rp-card">

          {draft.phones.map((phone, i) => (
            <div key={i}>
              {i > 0 && <div className="rp-section-divider" />}
              <div className="rp-field-section">
                <div className="rp-field-header">
                  <p className="rp-caps-label rp-caps-label--no-mb">PHONE {i + 1}</p>
                  {i > 0 && (
                    <button className="rp-remove-btn" onClick={() => removePhone(i)}>×</button>
                  )}
                </div>
                <input
                  className="rp-field-input rp-field-input--top"
                  value={phone}
                  type="tel"
                  onChange={e => setPhone(i, e.target.value)}
                  placeholder="(___) ___-____"
                />
              </div>
            </div>
          ))}

          {draft.phones.length < 3 && (
            <button className="rp-add-btn" onClick={addPhone}>
              <span className="rp-add-icon">+</span>
              Add Additional Phone
            </button>
          )}

        </div>

        {/* ── Email Addresses ─────────────────────────────── */}
        <p className="rp-section-title">Email Addresses</p>
        <div className="rp-card">

          <div className="rp-field-section">
            <p className="rp-caps-label">PRIMARY EMAIL</p>
            <input
              className="rp-field-input"
              value={draft.primaryEmail}
              type="email"
              onChange={e => set('primaryEmail', e.target.value)}
              placeholder="email@example.com"
            />
          </div>

          {showSecondaryEmail && (
            <>
              <div className="rp-section-divider" />
              <div className="rp-field-section">
                <div className="rp-field-header">
                  <p className="rp-caps-label rp-caps-label--no-mb">SECONDARY EMAIL</p>
                  <button
                    className="rp-remove-btn"
                    onClick={() => { setShowSecondaryEmail(false); set('secondaryEmail', '') }}
                  >×</button>
                </div>
                <input
                  className="rp-field-input rp-field-input--top"
                  value={draft.secondaryEmail}
                  type="email"
                  onChange={e => set('secondaryEmail', e.target.value)}
                  placeholder="email@example.com"
                />
              </div>
            </>
          )}

          {!showSecondaryEmail && (
            <button className="rp-add-btn" onClick={() => setShowSecondaryEmail(true)}>
              <span className="rp-add-icon">+</span>
              Add Secondary Email
            </button>
          )}

        </div>

        {/* ── Save ────────────────────────────────────────── */}
        <button
          className={`rp-save-btn${!isDirty ? ' rp-save-btn--inactive' : ''}`}
          onClick={isDirty ? handleSave : undefined}
        >
          SAVE CHANGES
        </button>

        </div>{/* end rp-cards-wrap */}
      </div>

      {/* ══ Save confirmation modal ═══════════════════════ */}
      {showSaveConfirm && (
        <div className="rp-modal-overlay">
          <div className="rp-modal-sheet">
            <button className="rp-modal-close" onClick={() => setShowSaveConfirm(false)}>
              <ModalCloseIcon />
            </button>
            <div className="rp-modal-body">
              <div className="rp-modal-icon">
                <CheckCircleIcon />
              </div>
              <p className="rp-modal-title">PROFILE UPDATED</p>
              <p className="rp-modal-copy">
                Your profile information has been saved successfully. Any changes you made are now reflected across your account.
              </p>
            </div>
            <div className="rp-modal-footer">
              <button className="rp-modal-accept-btn" onClick={() => setShowSaveConfirm(false)}>
                GOT IT
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ Unsaved changes warning modal ════════════════ */}
      {showUnsavedWarning && (
        <div className="rp-modal-overlay">
          <div className="rp-modal-sheet">
            <button className="rp-modal-close" onClick={() => setShowUnsavedWarning(false)}>
              <ModalCloseIcon />
            </button>
            <div className="rp-modal-body">
              <p className="rp-modal-title">UNSAVED CHANGES</p>
              <p className="rp-modal-copy">
                You have unsaved changes to your profile. Would you like to save them before leaving, or discard your updates?
              </p>
            </div>
            <div className="rp-modal-footer">
              <button className="rp-modal-accept-btn" onClick={handleSaveAndLeave}>
                SAVE CHANGES
              </button>
              <button className="rp-modal-cancel-link" onClick={handleDiscard}>
                Discard Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function RpToggle({ on, onToggle }) {
  return (
    <button
      className={`rp-toggle${on ? ' rp-toggle--on' : ''}`}
      onClick={onToggle}
      aria-label={on ? 'Turn off' : 'Turn on'}
    >
      <span className="rp-toggle__thumb" />
    </button>
  )
}

function CheckCircleIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="32" fill="rgba(178,222,97,0.12)" />
      <circle cx="32" cy="32" r="22" fill="rgba(178,222,97,0.18)" />
      <path d="M21 32L29 40L44 24" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ModalCloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M4 4L14 14M14 4L4 14" stroke="rgba(255,248,234,0.5)" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}

function CameraIcon() {
  return (
    <svg width="18" height="16" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 3L7.17 5H4C2.9 5 2 5.9 2 7V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V7C22 5.9 21.1 5 20 5H16.83L15 3H9ZM12 18C9.24 18 7 15.76 7 13C7 10.24 9.24 8 12 8C14.76 8 17 10.24 17 13C17 15.76 14.76 18 12 18Z" fill="#112719"/>
      <circle cx="12" cy="13" r="3" fill="#112719"/>
    </svg>
  )
}
