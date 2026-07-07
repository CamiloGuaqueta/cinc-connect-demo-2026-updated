import { useState, useRef } from 'react'
import { CURRENT_USER } from '../data/userData'
import './ResidentMyUnits.css'

const INITIAL_UNITS = CURRENT_USER.units

/* ── HOA address pool (search list) ──────────────────────── */
const HOA_ADDRESSES = [
  '100 Cardinal Hills Dr, Unit 101', '100 Cardinal Hills Dr, Unit 102',
  '100 Cardinal Hills Dr, Unit 103', '100 Cardinal Hills Dr, Unit 104',
  '200 Cardinal Hills Dr, Unit 201', '200 Cardinal Hills Dr, Unit 202',
  '200 Cardinal Hills Dr, Unit 203', '200 Cardinal Hills Dr, Unit 204',
  '300 Cardinal Hills Dr, Unit 301', '300 Cardinal Hills Dr, Unit 302',
  '300 Cardinal Hills Dr, Unit 303', '300 Cardinal Hills Dr, Unit 304',
  '400 Cardinal Point Rd, Unit 401', '400 Cardinal Point Rd, Unit 402',
  '400 Cardinal Point Rd, Unit 403', '500 Cardinal Point Rd, Unit 501',
  '500 Cardinal Point Rd, Unit 502', '500 Cardinal Point Rd, Unit 503',
  '600 Cardinal Way, Unit 601',      '600 Cardinal Way, Unit 602',
  '700 Cardinal Way, Unit 701',      '700 Cardinal Way, Unit 702',
  '800 Cardinal Way, Unit 801',      '900 Cardinal Way, Unit 901',
  '1000 Cardinal Heights, Unit 1001','1100 Cardinal Heights, Unit 1101',
  '1200 Cardinal Heights, Unit 1201','1300 North Point Hill, Unit 101',
  '1300 North Point Hill, Unit 102', '1400 North Point Hill, Unit 201',
  '1400 North Point Hill, Unit 202', '2545 North Point Hill, Unit 179',
  '2600 SE Cardinal Blvd, Unit 01',  '2600 SE Cardinal Blvd, Unit 02',
  '2700 SE Cardinal Blvd, Unit 11',  '2800 SE Cardinal Blvd, Unit 21',
  '3100 Hillcrest Loop, Unit A',     '3100 Hillcrest Loop, Unit B',
  '3200 Hillcrest Loop, Unit C',     '3300 Hillcrest Loop, Unit D',
  '4050 Summit Ridge, Unit 1',       '4050 Summit Ridge, Unit 2',
  '4050 Summit Ridge, Unit 3',       '4050 Summit Ridge, Unit 4',
  '5010 Green Valley Ct, Unit 101',  '5010 Green Valley Ct, Unit 102',
  '5020 Green Valley Ct, Unit 201',  '5020 Green Valley Ct, Unit 202',
  '6001 Ridgeline Pass, Unit 10',    '6001 Ridgeline Pass, Unit 11',
]

const RELATIONSHIPS = ['Homeowner', 'Tenant', 'Resident']

const EMPTY_FORM = { address: '', account: '', relationship: '' }

export default function ResidentMyUnits() {
  const screenRef = useRef(null)
  const [units,          setUnits]          = useState(INITIAL_UNITS)
  const [addSheetOpen,   setAddSheetOpen]   = useState(false)
  const [relPickerOpen,  setRelPickerOpen]  = useState(false)
  const [form,           setForm]           = useState({ ...EMPTY_FORM })
  const [searchQuery,    setSearchQuery]    = useState('')

  /* ── Helpers ─────────────────────────────────────────── */
  const openAddSheet = () => {
    if (screenRef.current) screenRef.current.scrollTop = 0
    setForm({ ...EMPTY_FORM })
    setSearchQuery('')
    setAddSheetOpen(true)
  }

  const closeAddSheet = () => {
    setAddSheetOpen(false)
    setRelPickerOpen(false)
  }

  const openRelPicker = () => {
    if (screenRef.current) screenRef.current.scrollTop = 0
    setRelPickerOpen(true)
  }

  const selectAddress = (addr) => {
    setForm(f => ({ ...f, address: addr }))
    setSearchQuery(addr)
  }

  const clearAddress = () => {
    setForm(f => ({ ...f, address: '' }))
    setSearchQuery('')
  }

  const isFormComplete = form.address.trim() && form.relationship

  const filteredAddresses = searchQuery
    ? HOA_ADDRESSES.filter(a => a.toLowerCase().includes(searchQuery.toLowerCase()))
    : []

  const handleAddUnit = () => {
    if (!isFormComplete) return
    setUnits(prev => [...prev, {
      id:           Date.now(),
      address:      form.address,
      account:      form.account.trim() || '—',
      relationship: form.relationship,
      status:       'pending',
    }])
    closeAddSheet()
  }

  /* ── Render ──────────────────────────────────────────── */
  return (
    <div className="screen myu-screen" ref={screenRef}>
      <div className="myu-content">

        {/* ── Title ───────────────────────────────────── */}
        <h2 className="myu-screen-title">My Units</h2>

        {/* ── Unit list ────────────────────────────────── */}
        {units.map(unit => (
          <div
            key={unit.id}
            className={`myu-unit-card${unit.status === 'pending' ? ' myu-unit-card--pending' : ''}`}
          >
            <div className="myu-unit-card__left">
              <span className={`myu-unit-card__icon${unit.status === 'pending' ? ' myu-unit-card__icon--muted' : ''}`}>
                <UnitIcon />
              </span>
              <div className="myu-unit-card__info">
                <p className="myu-unit-card__address">{unit.address}</p>
                <p className="myu-unit-card__account">{unit.account}</p>
                {unit.status === 'pending' && (
                  <p className="myu-unit-card__pending-label">Awaiting Management Review</p>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* ── Add Unit button ──────────────────────────── */}
        <button className="myu-add-btn" onClick={openAddSheet}>
          ADD UNIT
        </button>

      </div>

      {/* ══ Add Unit sheet ════════════════════════════════ */}
      {addSheetOpen && (
        <>
          <div className="myu-overlay" onClick={closeAddSheet} />
          <div className="myu-sheet">
            <div className="myu-sheet__handle" />

            {/* Header */}
            <div className="myu-sheet__header">
              <p className="myu-sheet__title">ADD UNIT</p>
              <button className="myu-sheet__close" onClick={closeAddSheet}>
                <CloseIcon />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="myu-sheet__body">

              {/* Address search */}
              <div className="myu-form-section">
                <p className="myu-caps-label">UNIT ADDRESS *</p>
                {form.address ? (
                  <div className="myu-selected-addr">
                    <span className="myu-selected-addr__text">{form.address}</span>
                    <button className="myu-selected-addr__clear" onClick={clearAddress}>×</button>
                  </div>
                ) : (
                  <>
                    <div className="myu-search-wrap">
                      <span className="myu-search-icon"><SearchIcon /></span>
                      <input
                        className="myu-search-input"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search address…"
                      />
                    </div>
                    {searchQuery.length > 0 && (
                      <div className="myu-addr-list">
                        {filteredAddresses.length > 0
                          ? filteredAddresses.map(addr => (
                              <button
                                key={addr}
                                className="myu-addr-opt"
                                onClick={() => selectAddress(addr)}
                              >
                                {addr}
                              </button>
                            ))
                          : <p className="myu-no-results">No addresses found</p>
                        }
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Account number */}
              <div className="myu-form-section myu-form-section--bordered">
                <p className="myu-caps-label">
                  ACCOUNT NUMBER&nbsp;<span className="myu-optional-tag">Optional</span>
                </p>
                <input
                  className="myu-field-input"
                  value={form.account}
                  onChange={e => setForm(f => ({ ...f, account: e.target.value }))}
                  placeholder="e.g. Acc# 123456789"
                />
              </div>

              {/* Relationship picker trigger */}
              <div className="myu-form-section myu-form-section--bordered">
                <p className="myu-caps-label">RELATIONSHIP *</p>
                <button
                  className={`myu-rel-trigger${form.relationship ? ' myu-rel-trigger--selected' : ''}`}
                  onClick={openRelPicker}
                >
                  <span>{form.relationship || 'Select relationship…'}</span>
                  <ChevronIcon />
                </button>
              </div>

              {/* Actions */}
              <div className="myu-form-actions">
                <button
                  className={`myu-submit-btn${!isFormComplete ? ' myu-submit-btn--inactive' : ''}`}
                  onClick={isFormComplete ? handleAddUnit : undefined}
                >
                  ADD UNIT
                </button>
                <button className="myu-cancel-link" onClick={closeAddSheet}>Cancel</button>
              </div>

            </div>{/* end sheet body */}
          </div>
        </>
      )}

      {/* ══ Relationship picker ═══════════════════════════ */}
      {relPickerOpen && (
        <>
          <div className="myu-rel-overlay" onClick={() => setRelPickerOpen(false)} />
          <div className="myu-rel-sheet">
            <div className="myu-sheet__handle" />
            <div className="myu-sheet__header">
              <p className="myu-sheet__title">RELATIONSHIP</p>
              <button className="myu-sheet__close" onClick={() => setRelPickerOpen(false)}>
                <CloseIcon />
              </button>
            </div>
            <div className="myu-rel-list">
              {RELATIONSHIPS.map(rel => {
                const selected = form.relationship === rel
                return (
                  <button
                    key={rel}
                    className={`myu-rel-opt${selected ? ' myu-rel-opt--selected' : ''}`}
                    onClick={() => { setForm(f => ({ ...f, relationship: rel })); setRelPickerOpen(false) }}
                  >
                    <span>{rel}</span>
                    <span className={`myu-radio${selected ? ' myu-radio--on' : ''}`}>
                      {selected && <span className="myu-radio__dot" />}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

/* ── Icons ───────────────────────────────────────────────── */
function UnitIcon() {
  return (
    <svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="myu-unit-mask" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="25">
        <path d="M0 0H19.6237V25H0V0Z" fill="black"/>
      </mask>
      <g mask="url(#myu-unit-mask)">
        <path d="M11.3831 0.00012207C11.3495 0.00012207 11.3159 0.00275048 11.2826 0.00800731L2.3866 1.42589C1.06538 1.45918 0 2.70593 0 4.23304V20.7669C0 22.294 1.06538 23.5405 2.38631 23.5741L11.2826 24.9922C11.3159 24.9975 11.3495 25.0001 11.3831 25.0001C12.7291 25.0001 13.8243 23.7405 13.8243 22.1918V2.80814C13.8243 1.25972 12.7291 0.00012207 11.3831 0.00012207ZM12.3641 22.1918C12.3641 22.7972 11.9473 23.2934 11.4266 23.3197L2.54138 21.9033C2.50809 21.898 2.4748 21.8954 2.44121 21.8954C1.90005 21.8954 1.46023 21.389 1.46023 20.7669V4.23304C1.46023 3.61069 1.90005 3.10457 2.44121 3.10457C2.4748 3.10457 2.50809 3.10194 2.54138 3.09668L11.4266 1.68055C11.9473 1.70684 12.3641 2.20273 12.3641 2.80814V22.1918Z" fill="currentColor"/>
        <path d="M17.1823 2.35864H15.0465C14.6429 2.35864 14.3164 2.73451 14.3164 3.19827C14.3164 3.66234 14.6429 4.0382 15.0465 4.0382H17.1823C17.7237 4.0382 18.1635 4.54431 18.1635 5.16666V19.8332C18.1635 20.4556 17.7237 20.9617 17.1823 20.9617H15.0465C14.6429 20.9617 14.3164 21.3375 14.3164 21.8013C14.3164 22.2651 14.6429 22.6412 15.0465 22.6412H17.1823C18.5286 22.6412 19.6235 21.3813 19.6235 19.8332V5.16666C19.6235 3.61824 18.5286 2.35864 17.1823 2.35864Z" fill="currentColor"/>
        <path d="M10.0032 12.5195C9.47078 12.5195 9.03943 13.0157 9.03943 13.6281C9.03943 14.2403 9.47078 14.7367 10.0032 14.7367C10.5356 14.7367 10.9669 14.2403 10.9669 13.6281C10.9669 13.0157 10.5356 12.5195 10.0032 12.5195Z" fill="currentColor"/>
      </g>
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M4 4L14 14M14 4L4 14" stroke="rgba(255,248,234,0.5)" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
      <circle cx="9" cy="9" r="7" stroke="rgba(255,248,234,0.4)" strokeWidth="1.8"/>
      <path d="M14 14L18 18" stroke="rgba(255,248,234,0.4)" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
      <path d="M1 1l5 5-5 5" stroke="rgba(255,248,234,0.4)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
