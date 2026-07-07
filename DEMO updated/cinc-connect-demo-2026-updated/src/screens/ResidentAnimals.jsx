import { useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useMode } from '../ModeContext'
import { CURRENT_USER } from '../data/userData'
import dogImg from '../images/dog.jpg'
import catImg from '../images/cat.jpg'
import hoaImg from '../images/hoa.jpg'
import './ResidentAnimals.css'
import './ResidentProfile.css'

// ─── Mock Data ──────────────────────────────────────────────────────────────

const MOCK_ANIMALS = [
  {
    id: 'a1',
    name: 'Buddy',
    type: 'Dog',
    designation: 'Pet',
    status: 'Active',
    photo: dogImg,
    color: 'Golden',
    weight: '50-100',
    microchip: '985112003456781',
    birthday: '2019-04-12',
    vaccDate: '2025-03-10',
    vaccExp: '2026-03-10',
    notes: 'Friendly with other dogs. Loves the dog park.',
  },
  {
    id: 'a2',
    name: 'Luna',
    type: 'Cat',
    designation: 'ESA',
    status: 'Pending Review',
    photo: catImg,
    color: 'Gray & White',
    weight: '5-10',
    microchip: '',
    birthday: '2021-07-30',
    vaccDate: '2025-01-20',
    vaccExp: '2026-01-20',
    notes: 'Indoor cat. ESA documentation on file.',
  },
]

const POLICY_TEXT = `1. REGISTRATION REQUIREMENT
All animals residing in or regularly visiting the community must be registered with the HOA Management office within 30 days of move-in or acquisition. Registration requires current vaccination documentation, a clear photo of the animal, and applicable fees.

2. PERMITTED ANIMALS
Residents may keep domesticated pets including dogs, cats, birds, fish, and small caged animals (hamsters, guinea pigs, rabbits). Reptiles, ferrets, and exotic animals are not permitted without prior written board approval. No single unit may house more than two (2) pets.

3. BREED & SIZE RESTRICTIONS
The following dog breeds are not permitted: Pit Bull Terrier, Rottweiler, Doberman Pinscher, Chow Chow, or any mix thereof. Dogs over 75 lbs require written board approval prior to residency. The Board reserves the right to require behavioral assessments for any animal.

4. SERVICE & EMOTIONAL SUPPORT ANIMALS
Service animals and Emotional Support Animals (ESAs) are accommodated in accordance with the Fair Housing Act and applicable state law. Residents seeking ESA approval must submit documentation from a licensed healthcare provider. ESAs are exempt from breed and weight restrictions but must be registered.

5. LEASH REQUIREMENTS
All dogs must be on a leash no longer than six (6) feet when in any common area. Dogs may not be left unattended in common areas or tied to community property. Leash requirements apply at all times, including near the pool and clubhouse.

6. WASTE REMOVAL
Residents are responsible for immediately cleaning up after their animals in all common areas, including sidewalks, lawns, and landscaped areas. Pet waste stations are located throughout the community. Failure to clean up after an animal may result in fines.

7. NUISANCE ANIMALS
Animals that create nuisances — including excessive barking, aggressive behavior, damage to common property, or repeated unsupervised access to common areas — may result in written warnings, fines, or required removal of the animal at the Board's discretion.

8. VACCINATION REQUIREMENTS
All dogs and cats must maintain current rabies and distemper vaccinations. Proof of current vaccination records must be provided at time of registration and updated annually. The HOA reserves the right to request updated records at any time.

9. VIOLATIONS & FINES
First violation: Written warning. Second violation: $50 fine. Third and subsequent violations: $100 fine per occurrence. Unregistered animals: $150 fine plus immediate registration required. Failure to remove a prohibited animal: $250 fine per month until resolved.

10. POLICY AMENDMENTS
This policy may be amended by the Board of Directors at any time with appropriate notice to residents. Residents will be notified of material changes via official HOA communication channels.

For questions or to submit a registration, contact the Management Office at management@cardinalhillshoa.com or (512) 555-0200.`

// ─── Icons ──────────────────────────────────────────────────────────────────

function ChevronIcon() {
  return (
    <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
      <path d="M1 1l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PolicyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="2" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6.5 6.5h7M6.5 9.5h7M6.5 12.5h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function CameraIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M10.5 4l-2 3H4a2 2 0 00-2 2v12a2 2 0 002 2h20a2 2 0 002-2V9a2 2 0 00-2-2h-4.5l-2-3h-7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="14" cy="15" r="4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

function FileIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M9 2H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V6l-4-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M9 2v4h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function CheckCircleIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="2.5" />
      <path d="M19 32l9 9 17-17" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="13" stroke="#fff8ea" strokeWidth="1.4" fill="rgba(0,0,0,0.35)" />
      <path d="M9.5 9.5l9 9M18.5 9.5l-9 9" stroke="#fff8ea" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function EditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M11.5 2.5l2 2-8 8H3.5v-2l8-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

function CameraSmallIcon() {
  return (
    <svg width="18" height="16" viewBox="0 0 24 21" fill="none">
      <path d="M9 3L7.17 5H4C2.9 5 2 5.9 2 7V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V7C22 5.9 21.1 5 20 5H16.83L15 3H9ZM12 18C9.24 18 7 15.76 7 13C7 10.24 9.24 8 12 8C14.76 8 17 10.24 17 13C17 15.76 14.76 18 12 18Z" fill="#112719"/>
      <circle cx="12" cy="13" r="3" fill="#112719"/>
    </svg>
  )
}

function AnimalPlaceholder({ type }) {
  const emojis = { Dog: '🐕', Cat: '🐈', Bird: '🐦', Fish: '🐠', Rodent: '🐹', Other: '🐾' }
  return (
    <div className="anim-card__photo-placeholder">
      <span className="anim-card__photo-emoji">{emojis[type] || '🐾'}</span>
    </div>
  )
}

// ─── Status Badge ────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const cls = {
    'Active':         'anim-badge--active',
    'Pending Review': 'anim-badge--pending',
    'Denied':         'anim-badge--denied',
  }[status] || 'anim-badge--pending'
  return <span className={`anim-badge ${cls}`}>{status}</span>
}

// ─── Pill Selector ───────────────────────────────────────────────────────────

function PillSelector({ options, value, onChange }) {
  return (
    <div className="anim-pill-row">
      {options.map(opt => (
        <button
          key={opt}
          type="button"
          className={`anim-pill ${value === opt ? 'anim-pill--active' : ''}`}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

// ─── File Upload Field ────────────────────────────────────────────────────────

function FileUploadField({ label, files, onChange, accept = '*', multiple = true }) {
  const ref = useRef(null)
  function handleChange(e) {
    const picked = Array.from(e.target.files)
    onChange(prev => [...prev, ...picked])
    e.target.value = ''
  }
  function remove(i) {
    onChange(prev => prev.filter((_, idx) => idx !== i))
  }
  return (
    <div className="anim-upload-field">
      <button type="button" className="anim-upload-btn" onClick={() => ref.current?.click()}>
        <FileIcon />
        <span>{label}</span>
      </button>
      <input ref={ref} type="file" accept={accept} multiple={multiple} style={{ display: 'none' }} onChange={handleChange} />
      {files.length > 0 && (
        <div className="anim-upload-list">
          {files.map((f, i) => (
            <div key={i} className="anim-upload-item">
              <FileIcon />
              <span className="anim-upload-item__name">{f.name}</span>
              <button type="button" className="anim-upload-item__remove" onClick={() => remove(i)} aria-label="Remove">×</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Info Row (profile view) ─────────────────────────────────────────────────

function InfoRow({ label, value }) {
  if (!value) return null
  return (
    <div className="anim-info-row">
      <span className="anim-info-row__label">{label}</span>
      <span className="anim-info-row__value">{value}</span>
    </div>
  )
}

function InfoDivider() {
  return <div className="anim-info-divider" />
}

// ─── Register Sheet ──────────────────────────────────────────────────────────

const ANIMAL_TYPES   = ['Dog', 'Cat', 'Bird', 'Fish', 'Rodent', 'Other']
const DESIGNATIONS   = ['Pet', 'Service Animal', 'ESA', 'Other']
const WEIGHT_OPTIONS = ['0-5', '5-10', '12-20', '20-50', '50-100', '100+']
const UNITS          = CURRENT_USER.units.map(u => u.address)

function RegisterSheet({ onClose }) {
  const photoRef = useRef(null)
  const [submitted, setSubmitted] = useState(false)
  const [errors,    setErrors]    = useState({})

  const [unit,         setUnit]         = useState('')
  const [photoPreview, setPhotoPreview] = useState(null)
  const [name,         setName]         = useState('')
  const [type,         setType]         = useState('')
  const [designation,  setDesignation]  = useState('')
  const [color,        setColor]        = useState('')
  const [weight,       setWeight]       = useState('')
  const [microchip,    setMicrochip]    = useState('')
  const [birthday,     setBirthday]     = useState('')
  const [vaccDate,     setVaccDate]     = useState('')
  const [vaccExp,      setVaccExp]      = useState('')
  const [vaccDocs,     setVaccDocs]     = useState([])
  const [notes,        setNotes]        = useState('')
  const [extraDocs,    setExtraDocs]    = useState([])

  function handlePhotoChange(e) {
    const file = e.target.files[0]
    if (!file) return
    setPhotoPreview(URL.createObjectURL(file))
  }

  function validate() {
    const e = {}
    if (!name.trim()) e.name = true
    if (!type)        e.type = true
    if (!weight)      e.weight = true
    if (!vaccDate)    e.vaccDate = true
    if (!vaccExp)     e.vaccExp = true
    return e
  }

  function handleSubmit() {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setSubmitted(true)
  }

  const portalTarget = document.querySelector('.phone-frame') || document.querySelector('.standalone-view') || document.body

  return createPortal(
    <div className="anim-sheet-backdrop" onClick={onClose}>
      <div className="anim-sheet" onClick={e => e.stopPropagation()}>
        <div className="anim-sheet__handle-wrap">
          <div className="anim-sheet__handle" />
        </div>

        <div className="anim-sheet__header">
          <span className="anim-sheet__title">Register Animal</span>
          <button className="anim-sheet__close" onClick={onClose} aria-label="Close"><CloseIcon /></button>
        </div>

        {submitted ? (
          <div className="anim-sheet__confirm">
            <div className="anim-confirm__icon"><CheckCircleIcon /></div>
            <h2 className="anim-confirm__heading">Registration Submitted!</h2>
            <p className="anim-confirm__body">
              Your pet registration has been submitted and will be reviewed by the management team. You'll be notified once the review is complete.
            </p>
            <button className="anim-confirm__done" onClick={onClose}>DONE</button>
          </div>
        ) : (
          <>
            <div className="anim-sheet__scroll">

              <div className="anim-form-group">
                <label className="anim-label">Unit / Address</label>
                <select className="anim-select" value={unit} onChange={e => setUnit(e.target.value)}>
                  <option value="">Select unit…</option>
                  {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>

              <div className="anim-form-group">
                <label className="anim-label">Animal Photo</label>
                <button type="button" className="anim-photo-upload" onClick={() => photoRef.current?.click()}>
                  {photoPreview
                    ? <img src={photoPreview} alt="Animal" className="anim-photo-upload__preview" />
                    : (
                      <div className="anim-photo-upload__placeholder">
                        <CameraIcon />
                        <span>Tap to upload photo</span>
                      </div>
                    )
                  }
                </button>
                <input ref={photoRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoChange} />
              </div>

              <div className="anim-form-group">
                <label className="anim-label">Animal Name <span className="anim-required">*</span></label>
                <input
                  className={`anim-input ${errors.name ? 'anim-input--error' : ''}`}
                  type="text" placeholder="e.g. Buddy" value={name}
                  onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: false })) }}
                />
                {errors.name && <span className="anim-error-msg">Required</span>}
              </div>

              <div className="anim-form-group">
                <label className="anim-label">Type <span className="anim-required">*</span></label>
                <PillSelector options={ANIMAL_TYPES} value={type} onChange={v => { setType(v); setErrors(p => ({ ...p, type: false })) }} />
                {errors.type && <span className="anim-error-msg">Required</span>}
              </div>

              <div className="anim-form-group">
                <label className="anim-label">Animal Designation</label>
                <PillSelector options={DESIGNATIONS} value={designation} onChange={setDesignation} />
              </div>

              <div className="anim-form-group">
                <label className="anim-label">Color</label>
                <input className="anim-input" type="text" placeholder="e.g. Golden Brown" value={color} onChange={e => setColor(e.target.value)} />
              </div>

              <div className="anim-form-group">
                <label className="anim-label">Weight (lbs) <span className="anim-required">*</span></label>
                <PillSelector options={WEIGHT_OPTIONS} value={weight} onChange={v => { setWeight(v); setErrors(p => ({ ...p, weight: false })) }} />
                {errors.weight && <span className="anim-error-msg">Required</span>}
              </div>

              <div className="anim-form-group">
                <label className="anim-label">Microchip Number</label>
                <input className="anim-input" type="text" placeholder="15-digit ISO number" value={microchip} onChange={e => setMicrochip(e.target.value)} />
              </div>

              <div className="anim-form-group">
                <label className="anim-label">Birthday</label>
                <input className="anim-input anim-input--date" type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
              </div>

              <div className="anim-form-group">
                <label className="anim-label">Vaccines Date <span className="anim-required">*</span></label>
                <input
                  className={`anim-input anim-input--date ${errors.vaccDate ? 'anim-input--error' : ''}`}
                  type="date" value={vaccDate}
                  onChange={e => { setVaccDate(e.target.value); setErrors(p => ({ ...p, vaccDate: false })) }}
                />
                {errors.vaccDate && <span className="anim-error-msg">Required</span>}
              </div>

              <div className="anim-form-group">
                <label className="anim-label">Vaccines Expiration <span className="anim-required">*</span></label>
                <input
                  className={`anim-input anim-input--date ${errors.vaccExp ? 'anim-input--error' : ''}`}
                  type="date" value={vaccExp}
                  onChange={e => { setVaccExp(e.target.value); setErrors(p => ({ ...p, vaccExp: false })) }}
                />
                {errors.vaccExp && <span className="anim-error-msg">Required</span>}
              </div>

              <div className="anim-form-group">
                <label className="anim-label">Upload Vaccine Documents</label>
                <FileUploadField label="Attach vaccine records" files={vaccDocs} onChange={setVaccDocs} accept=".pdf,.jpg,.jpeg,.png" />
              </div>

              <div className="anim-form-group">
                <label className="anim-label">Notes / Comments</label>
                <textarea className="anim-textarea" rows={3} placeholder="Any additional information about your animal…" value={notes} onChange={e => setNotes(e.target.value)} />
              </div>

              <div className="anim-form-group">
                <label className="anim-label">Upload Additional Documents</label>
                <FileUploadField label="Attach documents" files={extraDocs} onChange={setExtraDocs} />
              </div>

              <p className="anim-required-note"><span className="anim-required">*</span> Required fields</p>
            </div>

            <div className="anim-sheet__footer">
              <button className="anim-submit-btn" onClick={handleSubmit}>SUBMIT REGISTRATION</button>
            </div>
          </>
        )}
      </div>
    </div>,
    portalTarget
  )
}

// ─── Policy Sheet ────────────────────────────────────────────────────────────

function PolicySheet({ onClose }) {
  const portalTarget = document.querySelector('.phone-frame') || document.querySelector('.standalone-view') || document.body
  return createPortal(
    <div className="anim-sheet-backdrop" onClick={onClose}>
      <div className="anim-sheet" onClick={e => e.stopPropagation()}>
        <div className="anim-sheet__handle-wrap">
          <div className="anim-sheet__handle" />
        </div>
        <div className="anim-sheet__header">
          <span className="anim-sheet__title">HOA Animal Policy</span>
          <button className="anim-sheet__close" onClick={onClose} aria-label="Close"><CloseIcon /></button>
        </div>
        <div className="anim-sheet__scroll">
          {POLICY_TEXT.split('\n\n').map((para, i) => (
            <p key={i} className={para.match(/^\d+\./) ? 'anim-policy-section' : 'anim-policy-para'}>
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>,
    portalTarget
  )
}

// ─── Animals List ────────────────────────────────────────────────────────────

export default function ResidentAnimals() {
  const [showRegister, setShowRegister] = useState(false)
  const [showPolicy,   setShowPolicy]   = useState(false)
  const [activeAnimal, setActiveAnimal] = useState(null)

  return (
    <div className="screen resident-animals">
      <h2 className="anim-section-title">My Animals</h2>

      <div className="anim-card-list">
        {MOCK_ANIMALS.map(animal => (
          <div key={animal.id} className="anim-card">
            <div className="anim-card__top">
              {animal.photo
                ? <img src={animal.photo} alt={animal.name} className="anim-card__photo" />
                : <AnimalPlaceholder type={animal.type} />
              }
              <div className="anim-card__info">
                <div className="anim-card__name-row">
                  <span className="anim-card__name">{animal.name}</span>
                  <StatusBadge status={animal.status} />
                </div>
                <span className="anim-card__type">{animal.type} · {animal.designation}</span>
                <span className="anim-card__sub">{animal.color} · {animal.weight} lbs</span>
              </div>
            </div>
            <button className="anim-card__profile-btn" onClick={() => setActiveAnimal(animal)}>
              SEE ANIMAL PROFILE
            </button>
          </div>
        ))}
      </div>

      <button className="anim-policy-row" onClick={() => setShowPolicy(true)}>
        <span className="anim-policy-row__icon"><PolicyIcon /></span>
        <span className="anim-policy-row__label">Association Animal Policy</span>
        <span className="anim-policy-row__chevron"><ChevronIcon /></span>
      </button>

      <button className="anim-register-btn" onClick={() => setShowRegister(true)}>
        <PlusIcon />
        REGISTER A NEW ANIMAL
      </button>

      {showPolicy   && <PolicySheet   onClose={() => setShowPolicy(false)} />}
      {showRegister && <RegisterSheet onClose={() => setShowRegister(false)} />}
      {activeAnimal && <AnimalProfileSheet animal={activeAnimal} onClose={() => setActiveAnimal(null)} />}
    </div>
  )
}

// ─── Animal Policy Screen ────────────────────────────────────────────────────

export function ResidentAnimalPolicy() {
  return (
    <div className="screen resident-animal-policy">
      <h2 className="anim-policy-title">HOA Animal Policy</h2>
      <div className="anim-policy-body">
        {POLICY_TEXT.split('\n\n').map((para, i) => (
          <p key={i} className={para.match(/^\d+\./) ? 'anim-policy-section' : 'anim-policy-para'}>
            {para}
          </p>
        ))}
      </div>
    </div>
  )
}

// ─── Animal Profile Sheet ────────────────────────────────────────────────────

function AnimalProfileSheet({ animal: initialAnimal, onClose }) {
  const photoRef = useRef(null)
  const [saved,        setSaved]        = useState(false)
  const [photoPreview, setPhotoPreview] = useState(null)

  const [name,        setName]        = useState(initialAnimal.name)
  const [type,        setType]        = useState(initialAnimal.type)
  const [designation, setDesignation] = useState(initialAnimal.designation)
  const [color,       setColor]       = useState(initialAnimal.color || '')
  const [weight,      setWeight]      = useState(initialAnimal.weight || '')
  const [microchip,   setMicrochip]   = useState(initialAnimal.microchip || '')
  const [birthday,    setBirthday]    = useState(initialAnimal.birthday || '')
  const [vaccDate,    setVaccDate]    = useState(initialAnimal.vaccDate || '')
  const [vaccExp,     setVaccExp]     = useState(initialAnimal.vaccExp || '')
  const [vaccDocs,    setVaccDocs]    = useState([])
  const [notes,       setNotes]       = useState(initialAnimal.notes || '')
  const [extraDocs,   setExtraDocs]   = useState([])
  const [errors,      setErrors]      = useState({})

  const original = {
    name: initialAnimal.name, type: initialAnimal.type, designation: initialAnimal.designation,
    color: initialAnimal.color || '', weight: initialAnimal.weight || '',
    microchip: initialAnimal.microchip || '', birthday: initialAnimal.birthday || '',
    vaccDate: initialAnimal.vaccDate || '', vaccExp: initialAnimal.vaccExp || '',
    notes: initialAnimal.notes || '',
  }
  const current = { name, type, designation, color, weight, microchip, birthday, vaccDate, vaccExp, notes }
  const isDirty = JSON.stringify(current) !== JSON.stringify(original) || photoPreview !== null

  function handlePhotoChange(e) {
    const file = e.target.files[0]
    if (!file) return
    setPhotoPreview(URL.createObjectURL(file))
  }

  function validate() {
    const e = {}
    if (!name.trim()) e.name = true
    if (!type)        e.type = true
    if (!weight)      e.weight = true
    if (!vaccDate)    e.vaccDate = true
    if (!vaccExp)     e.vaccExp = true
    return e
  }

  function handleSave() {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const displayPhoto = photoPreview || initialAnimal.photo
  const EMOJI = { Dog: '🐕', Cat: '🐈', Bird: '🐦', Fish: '🐠', Rodent: '🐹' }
  const portalTarget = document.querySelector('.phone-frame') || document.querySelector('.standalone-view') || document.body

  return createPortal(
    <div className="anim-sheet-backdrop" onClick={onClose}>
      <div className="anim-profile-sheet" onClick={e => e.stopPropagation()}>

        {/* Handle + close sit above the scrollable body */}
        <div className="anim-profile__handle-row"><div className="anim-sheet__handle" /></div>
        <button className="anim-profile__close" aria-label="Close" onClick={onClose}><CloseIcon /></button>

        {/* Scrollable: hero + cards */}
        <div className="anim-profile__body-scroll">

          {/* ── Hero: HOA banner + round animal avatar ── */}
          <div className="anim-profile__rp-hero">
            <img src={hoaImg} alt="" className="rp-hero__bg" />
            <div className="rp-hero__overlay" />
            <div className="rp-hero__avatar-wrap" style={{ top: 28 }}>
              <div className="rp-hero__avatar-frame">
                {displayPhoto
                  ? <img src={displayPhoto} alt={name} className="rp-hero__avatar"
                      style={{ transform: 'none', objectPosition: 'center center' }} />
                  : <span style={{ fontSize: 52, lineHeight: 1 }}>{EMOJI[type] || '🐾'}</span>
                }
              </div>
              <button className="rp-hero__edit-btn" aria-label="Change photo" onClick={() => photoRef.current?.click()}>
                <CameraSmallIcon />
              </button>
            </div>
            <input ref={photoRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoChange} />
            <div className="anim-profile__hero-nameblock">
              <StatusBadge status={initialAnimal.status} />
            </div>
          </div>

          {/* ── Cards ── */}
          <div className="anim-profile__rp-cards">

            {saved && <div className="anim-profile__toast">Profile updated successfully</div>}

            <div className="rp-card">
              <div className="rp-field-section">
                <p className="rp-caps-label">ANIMAL NAME <span className="anim-required">*</span></p>
                <input className={`rp-field-input${errors.name ? ' anim-input--error' : ''}`}
                  type="text" value={name}
                  onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: false })) }}
                  placeholder="Animal name" />
                {errors.name && <span className="anim-error-msg">Required</span>}
              </div>
              <div className="rp-section-divider" />
              <div className="rp-field-section">
                <p className="rp-caps-label">TYPE <span className="anim-required">*</span></p>
                <PillSelector options={ANIMAL_TYPES} value={type} onChange={v => { setType(v); setErrors(p => ({ ...p, type: false })) }} />
                {errors.type && <span className="anim-error-msg">Required</span>}
              </div>
              <div className="rp-section-divider" />
              <div className="rp-field-section">
                <p className="rp-caps-label">DESIGNATION</p>
                <PillSelector options={DESIGNATIONS} value={designation} onChange={setDesignation} />
              </div>
              <div className="rp-section-divider" />
              <div className="rp-field-section">
                <p className="rp-caps-label">COLOR</p>
                <input className="rp-field-input" type="text" value={color}
                  onChange={e => setColor(e.target.value)} placeholder="e.g. Golden Brown" />
              </div>
              <div className="rp-section-divider" />
              <div className="rp-field-section">
                <p className="rp-caps-label">WEIGHT (LBS) <span className="anim-required">*</span></p>
                <PillSelector options={WEIGHT_OPTIONS} value={weight} onChange={v => { setWeight(v); setErrors(p => ({ ...p, weight: false })) }} />
                {errors.weight && <span className="anim-error-msg">Required</span>}
              </div>
            </div>

            <div className="rp-card">
              <div className="rp-field-section">
                <p className="rp-caps-label">MICROCHIP NUMBER</p>
                <input className="rp-field-input" type="text" value={microchip}
                  onChange={e => setMicrochip(e.target.value)} placeholder="15-digit ISO number" />
              </div>
              <div className="rp-section-divider" />
              <div className="rp-field-section">
                <p className="rp-caps-label">BIRTHDAY</p>
                <input className="rp-field-input anim-input--date" type="date" value={birthday}
                  onChange={e => setBirthday(e.target.value)} />
              </div>
            </div>

            <div className="rp-card">
              <div className="rp-field-section">
                <p className="rp-caps-label">VACCINES DATE <span className="anim-required">*</span></p>
                <input className={`rp-field-input anim-input--date${errors.vaccDate ? ' anim-input--error' : ''}`}
                  type="date" value={vaccDate}
                  onChange={e => { setVaccDate(e.target.value); setErrors(p => ({ ...p, vaccDate: false })) }} />
                {errors.vaccDate && <span className="anim-error-msg">Required</span>}
              </div>
              <div className="rp-section-divider" />
              <div className="rp-field-section">
                <p className="rp-caps-label">VACCINES EXPIRATION <span className="anim-required">*</span></p>
                <input className={`rp-field-input anim-input--date${errors.vaccExp ? ' anim-input--error' : ''}`}
                  type="date" value={vaccExp}
                  onChange={e => { setVaccExp(e.target.value); setErrors(p => ({ ...p, vaccExp: false })) }} />
                {errors.vaccExp && <span className="anim-error-msg">Required</span>}
              </div>
              <div className="rp-section-divider" />
              <div className="rp-field-section">
                <p className="rp-caps-label">VACCINE DOCUMENTS</p>
                <FileUploadField label="Attach vaccine records" files={vaccDocs} onChange={setVaccDocs} accept=".pdf,.jpg,.jpeg,.png" />
              </div>
            </div>

            <div className="rp-card">
              <div className="rp-field-section">
                <p className="rp-caps-label">NOTES / COMMENTS</p>
                <textarea className="anim-textarea" rows={3} value={notes}
                  onChange={e => setNotes(e.target.value)} placeholder="Any additional information…" />
              </div>
              <div className="rp-section-divider" />
              <div className="rp-field-section">
                <p className="rp-caps-label">ADDITIONAL DOCUMENTS</p>
                <FileUploadField label="Attach documents" files={extraDocs} onChange={setExtraDocs} />
              </div>
            </div>

            <p className="anim-required-note"><span className="anim-required">*</span> Required fields</p>

            <button
              className={`rp-save-btn${!isDirty ? ' rp-save-btn--inactive' : ''}`}
              onClick={isDirty ? handleSave : undefined}
            >
              SAVE CHANGES
            </button>

          </div>{/* end cards */}
        </div>{/* end body-scroll */}
      </div>
    </div>,
    portalTarget
  )
}

// ─── Standalone Flow Wrapper ─────────────────────────────────────────────────
// Renders the full Animals feature (list → profile → policy) for standalone mode.
// Mirrors what AppShell does for the resident view stack, but scoped to animals.

export function AnimalsStandaloneFlow() {
  return <ResidentAnimals />
}


