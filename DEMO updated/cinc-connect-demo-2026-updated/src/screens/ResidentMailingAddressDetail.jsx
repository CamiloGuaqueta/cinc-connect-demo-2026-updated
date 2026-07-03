import { useState, useRef } from 'react'
import './ResidentMailingAddressDetail.css'

const PRIMARY_EMAIL = 'johnd@email.com'

function Toggle({ on, onToggle }) {
  return (
    <button
      className={`mad-toggle${on ? ' mad-toggle--on' : ''}`}
      onClick={onToggle}
      aria-label={on ? 'Turn off' : 'Turn on'}
    >
      <span className="mad-toggle__thumb" />
    </button>
  )
}

function Row({ icon, label, on, onToggle }) {
  return (
    <div className="mad-row">
      <span className="mad-row__icon">{icon}</span>
      <span className="mad-row__label">{label}</span>
      <Toggle on={on} onToggle={onToggle} />
    </div>
  )
}

export default function ResidentMailingAddressDetail({ unitAddress, account }) {
  const screenRef = useRef(null)
  /* ── Delivery method ── */
  const [deliveryMethod, setDeliveryMethod] = useState('email')
  const [pendingMethod, setPendingMethod] = useState(null)

  function handleDeliverySelect(val) {
    if (val !== deliveryMethod) setPendingMethod(val)
  }
  function handleAccept() {
    setDeliveryMethod(pendingMethod)
    setPendingMethod(null)
  }

  /* ── Email ── */
  const [emailOn, setEmailOn] = useState(true)
  const [secEmailOn, setSecEmailOn] = useState(true)
  const [secEmailInput, setSecEmailInput] = useState('')
  const [savedSecEmail, setSavedSecEmail] = useState(null)
  const [addingSecEmail, setAddingSecEmail] = useState(false)

  function confirmSecEmail() {
    const t = secEmailInput.trim()
    if (!t) return
    setSavedSecEmail(t)
    setAddingSecEmail(false)
    setSecEmailInput('')
  }

  /* ── Mailing addresses ── */
  const [addresses, setAddresses] = useState([
    { id: 1, address: unitAddress, on: true, addrType: '', line1: '', line2: '', city: '', state: '', zip: '' },
  ])
  const EMPTY_ADDR_FORM = { addrType: '', line1: '', line2: '', city: '', state: '', zip: '' }
  const [newAddr,    setNewAddr]    = useState(EMPTY_ADDR_FORM)
  const [editForm,   setEditForm]   = useState(EMPTY_ADDR_FORM)
  const [editingAddrId, setEditingAddrId] = useState(null)
  const [addingAddr, setAddingAddr] = useState(false)
  const [addrTypePickerOpen,   setAddrTypePickerOpen]   = useState(false)
  const [addrTypePickerTarget, setAddrTypePickerTarget] = useState('add')
  const [statePickerOpen,   setStatePickerOpen]   = useState(false)
  const [statePickerTarget, setStatePickerTarget] = useState('add')
  const [stateSearch, setStateSearch] = useState('')

  function openAddrTypePicker(target = 'add') {
    if (screenRef.current) screenRef.current.scrollTop = 0
    setAddrTypePickerTarget(target)
    setAddrTypePickerOpen(true)
  }

  function openStatePicker(target = 'add') {
    if (screenRef.current) screenRef.current.scrollTop = 0
    setStateSearch('')
    setStatePickerTarget(target)
    setStatePickerOpen(true)
  }

  const ADDR_TYPES = [
    'Emergency Contact Info',
    'Investors Address',
    "Owner's Offsite Address",
    'Previous Tenant',
    'Summer Home',
    'Work Address',
  ]

  const US_STATES = [
    ['AL','Alabama'],['AK','Alaska'],['AZ','Arizona'],['AR','Arkansas'],['CA','California'],
    ['CO','Colorado'],['CT','Connecticut'],['DE','Delaware'],['FL','Florida'],['GA','Georgia'],
    ['HI','Hawaii'],['ID','Idaho'],['IL','Illinois'],['IN','Indiana'],['IA','Iowa'],
    ['KS','Kansas'],['KY','Kentucky'],['LA','Louisiana'],['ME','Maine'],['MD','Maryland'],
    ['MA','Massachusetts'],['MI','Michigan'],['MN','Minnesota'],['MS','Mississippi'],['MO','Missouri'],
    ['MT','Montana'],['NE','Nebraska'],['NV','Nevada'],['NH','New Hampshire'],['NJ','New Jersey'],
    ['NM','New Mexico'],['NY','New York'],['NC','North Carolina'],['ND','North Dakota'],['OH','Ohio'],
    ['OK','Oklahoma'],['OR','Oregon'],['PA','Pennsylvania'],['RI','Rhode Island'],['SC','South Carolina'],
    ['SD','South Dakota'],['TN','Tennessee'],['TX','Texas'],['UT','Utah'],['VT','Vermont'],
    ['VA','Virginia'],['WA','Washington'],['WV','West Virginia'],['WI','Wisconsin'],['WY','Wyoming'],
  ]

  const filteredStates = stateSearch.trim()
    ? US_STATES.filter(([abbr, name]) =>
        name.toLowerCase().includes(stateSearch.toLowerCase()) ||
        abbr.toLowerCase().includes(stateSearch.toLowerCase())
      )
    : US_STATES

  const isFormComplete     = newAddr.addrType  && newAddr.line1.trim()  && newAddr.city.trim()  && newAddr.state  && newAddr.zip.trim()
  const isEditFormComplete = editForm.addrType && editForm.line1.trim() && editForm.city.trim() && editForm.state && editForm.zip.trim()

  function formatAddr(f) {
    return [
      f.line1.trim(),
      f.line2.trim(),
      [f.city.trim(), f.state.trim(), f.zip.trim()].filter(Boolean).join(', '),
    ].filter(Boolean).join('\n')
  }

  function confirmAddr() {
    if (!newAddr.line1.trim()) return
    setAddresses(prev => [...prev, {
      id: Date.now(),
      addrType: newAddr.addrType,
      line1: newAddr.line1.trim(), line2: newAddr.line2.trim(),
      city: newAddr.city.trim(), state: newAddr.state, zip: newAddr.zip.trim(),
      address: formatAddr(newAddr),
      on: true,
    }])
    setAddingAddr(false)
    setNewAddr(EMPTY_ADDR_FORM)
  }

  function startEditAddr(a) {
    if (screenRef.current) screenRef.current.scrollTop = 0
    setEditingAddrId(a.id)
    setEditForm({ addrType: a.addrType || '', line1: a.line1 || '', line2: a.line2 || '', city: a.city || '', state: a.state || '', zip: a.zip || '' })
    setAddingAddr(false)
  }

  function saveEditAddr() {
    setAddresses(prev => prev.map(a => a.id === editingAddrId
      ? { ...a, ...editForm, address: formatAddr(editForm) }
      : a
    ))
    setEditingAddrId(null)
    setEditForm(EMPTY_ADDR_FORM)
  }

  function removeAddr(id) { setAddresses(prev => prev.filter(a => a.id !== id)) }
  function toggleAddr(id) { setAddresses(prev => prev.map(a => a.id === id ? { ...a, on: !a.on } : a)) }

  /* ── Statements ── */
  const [stmtEmailOn, setStmtEmailOn] = useState(true)
  const [stmtMailOn, setStmtMailOn] = useState(true)

  const showEmail = deliveryMethod === 'email' || deliveryMethod === 'both'
  const showMail  = deliveryMethod === 'mail'  || deliveryMethod === 'both'

  return (
    <div className="screen mad-screen" ref={screenRef}>
      <div className="mad-content">

        {/* Unit identity */}
        <div className="mad-unit-header">
          <UnitIcon />
          <div className="mad-unit-info">
            <p className="mad-unit-address">{unitAddress}</p>
            <p className="mad-unit-account">{account}</p>
          </div>
        </div>

        {/* Delivery Method */}
        <div className="mad-card">
          <div className="mad-row">
            <span className="mad-row__icon"><DeliveryIcon /></span>
            <span className="mad-row__label">Delivery Method</span>
          </div>
          <div className="mad-delivery-picker">
            {[['email','Email'],['mail','Mail'],['both','Both']].map(([val, lbl]) => (
              <button
                key={val}
                className={`mad-delivery-opt${deliveryMethod === val ? ' mad-delivery-opt--active' : ''}`}
                onClick={() => handleDeliverySelect(val)}
              >{lbl}</button>
            ))}
          </div>
        </div>

        {/* Email card */}
        {showEmail && (
          <div className="mad-card">
            <Row icon={<EmailIcon />} label="Email" on={emailOn} onToggle={() => setEmailOn(v => !v)} />

            <div className="mad-addr-section">
              <p className="mad-caps-label">Primary Email</p>
              <p className="mad-addr-text">{PRIMARY_EMAIL}</p>
            </div>

            {savedSecEmail && (
              <div className="mad-addr-section mad-addr-section--bordered">
                <p className="mad-caps-label">Secondary Email</p>
                <div className="mad-inline-row">
                  <p className="mad-addr-text">{savedSecEmail}</p>
                  <Toggle on={secEmailOn} onToggle={() => setSecEmailOn(v => !v)} />
                  <button className="mad-remove-btn" onClick={() => setSavedSecEmail(null)}>×</button>
                </div>
              </div>
            )}

            {addingSecEmail && (
              <div className="mad-addr-section mad-addr-section--bordered">
                <p className="mad-caps-label">Secondary Email</p>
                <div className="mad-addr-form">
                  <input className="mad-input" type="email" placeholder="Secondary email address"
                    value={secEmailInput} onChange={e => setSecEmailInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && confirmSecEmail()} autoFocus />
                  <div className="mad-addr-form-actions">
                    <button className="mad-confirm-btn mad-confirm-btn--full" onClick={confirmSecEmail}>ADD EMAIL</button>
                    <button className="mad-addr-cancel-link" onClick={() => { setAddingSecEmail(false); setSecEmailInput('') }}>Cancel</button>
                  </div>
                </div>
              </div>
            )}

            {!savedSecEmail && !addingSecEmail && (
              <button className="mad-add-btn" onClick={() => setAddingSecEmail(true)}>
                <span className="mad-add-icon">+</span>
                <span>Add secondary email</span>
              </button>
            )}
          </div>
        )}

        {/* Mailing addresses card */}
        {showMail && (
          <div className="mad-card">
            <div className="mad-row">
              <span className="mad-row__icon"><MailIcon /></span>
              <span className="mad-row__label">Mailing Address</span>
            </div>

            {addresses.map((a, i) => (
              <div key={a.id} className="mad-addr-section mad-addr-section--bordered">
                <p className="mad-caps-label">{i === 0 ? 'Unit Address' : `Additional Address ${i}`}</p>

                {editingAddrId === a.id ? (
                  /* ── Inline edit form ── */
                  <div className="mad-addr-form">
                    <button
                      className={`mad-input mad-addr-type-btn${editForm.addrType ? ' mad-addr-type-btn--selected' : ''}`}
                      onClick={() => openAddrTypePicker('edit')}
                      type="button"
                    >
                      <span className={editForm.addrType ? '' : 'mad-addr-type-placeholder'}>
                        {editForm.addrType || 'Please select Address Type'}
                      </span>
                      <ChevronRightIcon />
                    </button>
                    <input className="mad-input" type="text" placeholder="Address 1"
                      value={editForm.line1} onChange={e => setEditForm(p => ({ ...p, line1: e.target.value }))} />
                    <input className="mad-input" type="text" placeholder="Address 2 (apt, suite, office)"
                      value={editForm.line2} onChange={e => setEditForm(p => ({ ...p, line2: e.target.value }))} />
                    <div className="mad-addr-form-row">
                      <input className="mad-input mad-input--city" type="text" placeholder="City"
                        value={editForm.city} onChange={e => setEditForm(p => ({ ...p, city: e.target.value }))} />
                      <button
                        className={`mad-input mad-input--state mad-addr-type-btn${editForm.state ? ' mad-addr-type-btn--selected' : ''}`}
                        onClick={() => openStatePicker('edit')}
                        type="button"
                      >
                        <span className={editForm.state ? '' : 'mad-addr-type-placeholder'}>
                          {editForm.state || 'State'}
                        </span>
                      </button>
                      <input className="mad-input mad-input--zip" type="text" placeholder="Zip"
                        value={editForm.zip} onChange={e => setEditForm(p => ({ ...p, zip: e.target.value }))} maxLength={10} />
                    </div>
                    <div className="mad-addr-form-actions">
                      <button
                        className={`mad-confirm-btn mad-confirm-btn--full${!isEditFormComplete ? ' mad-confirm-btn--inactive' : ''}`}
                        onClick={isEditFormComplete ? saveEditAddr : undefined}
                      >SAVE CHANGES</button>
                      <button className="mad-addr-cancel-link" onClick={() => { setEditingAddrId(null); setEditForm(EMPTY_ADDR_FORM) }}>Cancel</button>
                      <button className="mad-delete-addr-btn" onClick={() => { removeAddr(a.id); setEditingAddrId(null) }}>
                        Delete Address
                      </button>
                    </div>
                  </div>
                ) : (
                  /* ── Display row ── */
                  <div className="mad-inline-row">
                    <p className="mad-addr-text">{a.address}</p>
                    <Toggle on={a.on} onToggle={() => toggleAddr(a.id)} />
                    {i > 0 && (
                      <button className="mad-edit-btn" onClick={() => startEditAddr(a)} aria-label="Edit">
                        <ComposeIcon />
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}

            {addingAddr && (
              <div className="mad-addr-section mad-addr-section--bordered">
                <p className="mad-caps-label">Additional Address {addresses.length}</p>
                <div className="mad-addr-form">
                  <button
                    className={`mad-input mad-addr-type-btn${newAddr.addrType ? ' mad-addr-type-btn--selected' : ''}`}
                    onClick={openAddrTypePicker}
                    type="button"
                  >
                    <span className={newAddr.addrType ? '' : 'mad-addr-type-placeholder'}>
                      {newAddr.addrType || 'Please select Address Type'}
                    </span>
                    <ChevronRightIcon />
                  </button>
                  <input className="mad-input" type="text" placeholder="Address 1"
                    value={newAddr.line1} onChange={e => setNewAddr(p => ({ ...p, line1: e.target.value }))} />
                  <input className="mad-input" type="text" placeholder="Address 2 (apt, suite, office)"
                    value={newAddr.line2} onChange={e => setNewAddr(p => ({ ...p, line2: e.target.value }))} />
                  <div className="mad-addr-form-row">
                    <input className="mad-input mad-input--city" type="text" placeholder="City"
                      value={newAddr.city} onChange={e => setNewAddr(p => ({ ...p, city: e.target.value }))} />
                    <button
                      className={`mad-input mad-input--state mad-addr-type-btn${newAddr.state ? ' mad-addr-type-btn--selected' : ''}`}
                      onClick={openStatePicker}
                      type="button"
                    >
                      <span className={newAddr.state ? '' : 'mad-addr-type-placeholder'}>
                        {newAddr.state || 'State'}
                      </span>
                    </button>
                    <input className="mad-input mad-input--zip" type="text" placeholder="Zip"
                      value={newAddr.zip} onChange={e => setNewAddr(p => ({ ...p, zip: e.target.value }))} maxLength={10} />
                  </div>
                  <div className="mad-addr-form-actions">
                    <button
                      className={`mad-confirm-btn mad-confirm-btn--full${!isFormComplete ? ' mad-confirm-btn--inactive' : ''}`}
                      onClick={isFormComplete ? confirmAddr : undefined}
                    >ADD ADDRESS</button>
                    <button className="mad-addr-cancel-link" onClick={() => { setAddingAddr(false); setNewAddr(EMPTY_ADDR_FORM) }}>Cancel</button>
                  </div>
                </div>
              </div>
            )}

            {!addingAddr && (
              <button className="mad-add-btn" onClick={() => setAddingAddr(true)}>
                <span className="mad-add-icon">+</span>
                <span>Add Mailing Address</span>
              </button>
            )}
          </div>
        )}

        {/* Statements */}
        <div className="mad-card">
          <div className="mad-row">
            <span className="mad-row__icon"><StatementsIcon /></span>
            <span className="mad-row__label">Statements</span>
          </div>
          <div className="mad-stmt-copy-section">
            <p className="mad-stmt-copy">Use the options below to choose how you'd like to receive your statements. Toggle Email and/or Mail on or off for each property. Leave both options off if you do not wish to receive statements.</p>
          </div>
          <div className="mad-stmt-toggle-row">
            <span className="mad-row__label">Email</span>
            <Toggle on={stmtEmailOn} onToggle={() => setStmtEmailOn(v => !v)} />
          </div>
          <div className="mad-stmt-toggle-row">
            <span className="mad-row__label">Mail</span>
            <Toggle on={stmtMailOn} onToggle={() => setStmtMailOn(v => !v)} />
          </div>
        </div>

      </div>

      {addrTypePickerOpen && (
        <>
          <div className="atp-overlay" onClick={() => setAddrTypePickerOpen(false)} />
          <div className="atp-sheet">
            <div className="atp-handle" />
            <div className="atp-header">
              <p className="atp-title">Address Type</p>
              <button className="atp-close" onClick={() => setAddrTypePickerOpen(false)} aria-label="Close">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="13" stroke="rgba(255,248,234,0.35)" strokeWidth="1.5"/>
                  <path d="M9.5 9.5L18.5 18.5M18.5 9.5L9.5 18.5" stroke="rgba(255,248,234,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className="atp-list">
              {ADDR_TYPES.map(type => {
                const activeForm = addrTypePickerTarget === 'edit' ? editForm : newAddr
                const setActiveForm = addrTypePickerTarget === 'edit' ? setEditForm : setNewAddr
                const selected = activeForm.addrType === type
                return (
                  <button
                    key={type}
                    className={`atp-option${selected ? ' atp-option--selected' : ''}`}
                    onClick={() => { setActiveForm(p => ({ ...p, addrType: type })); setAddrTypePickerOpen(false) }}
                  >
                    <span>{type}</span>
                    <span className={`atp-radio${selected ? ' atp-radio--on' : ''}`}>
                      {selected && <span className="atp-radio__dot" />}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}

      {statePickerOpen && (
        <>
          <div className="atp-overlay" onClick={() => setStatePickerOpen(false)} />
          <div className="atp-sheet">
            <div className="atp-handle" />
            <div className="atp-header">
              <p className="atp-title">State</p>
              <button className="atp-close" onClick={() => setStatePickerOpen(false)} aria-label="Close">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="13" stroke="rgba(255,248,234,0.35)" strokeWidth="1.5"/>
                  <path d="M9.5 9.5L18.5 18.5M18.5 9.5L9.5 18.5" stroke="rgba(255,248,234,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className="stp-search-wrap">
              <input
                className="stp-search"
                type="text"
                placeholder="Search states…"
                value={stateSearch}
                onChange={e => setStateSearch(e.target.value)}
              />
            </div>
            <div className="atp-list">
              {filteredStates.map(([abbr, name]) => {
                const activeForm = statePickerTarget === 'edit' ? editForm : newAddr
                const setActiveForm = statePickerTarget === 'edit' ? setEditForm : setNewAddr
                const selected = activeForm.state === abbr
                return (
                  <button
                    key={abbr}
                    className={`atp-option${selected ? ' atp-option--selected' : ''}`}
                    onClick={() => { setActiveForm(p => ({ ...p, state: abbr })); setStatePickerOpen(false) }}
                  >
                    <span>{name}</span>
                    <span className={`atp-radio${selected ? ' atp-radio--on' : ''}`}>
                      {selected && <span className="atp-radio__dot" />}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}

      {pendingMethod && (
        <div className="cpn-overlay">
          <div className="cpn-sheet">
            <button className="cpn-close" onClick={() => setPendingMethod(null)} aria-label="Close">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="13" stroke="rgba(255,248,234,0.35)" strokeWidth="1.5"/>
                <path d="M9.5 9.5L18.5 18.5M18.5 9.5L9.5 18.5" stroke="rgba(255,248,234,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            <div className="cpn-body">
              <h2 className="cpn-title">Change Communication Preferences</h2>
              <p className="cpn-copy">Please Note: Community regulations and state/federal law may govern that communication for all or certain types of correspondence may not abide by the preferences you designate. You are responsible for monitoring your postal and email addresses and any communication within. For further questions or individual questions about your account, please contact your HOA/Management Company.</p>
            </div>
            <div className="cpn-footer">
              <button className="cpn-accept-btn" onClick={handleAccept}>ACCEPT AND CONTINUE</button>
              <button className="cpn-cancel-link" onClick={() => setPendingMethod(null)}>cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Icons ──────────────────────────────────────────────── */
function ComposeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mad-compose-mask" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="13" height="13">
        <path d="M0 0H12.3279V12.3297H0V0Z" fill="black"/>
      </mask>
      <g mask="url(#mad-compose-mask)">
        <path d="M11.97 1.8466L10.4812 0.357856C10.0038 -0.119537 9.22703 -0.119251 8.74993 0.358142L0 9.10921V12.3298L3.22005 12.3293L11.97 3.57819C12.4471 3.1008 12.4474 2.324 11.97 1.8466ZM0.974785 11.8247L0.50482 11.3548V9.43347L2.89579 11.8244L0.974785 11.8247ZM3.13177 11.7033L0.625954 9.19749L7.50973 2.31257L10.0155 4.81867L3.13177 11.7033ZM10.1941 4.64011L7.68829 2.13401L7.796 2.02602L10.3021 4.53212L10.1941 4.64011ZM10.4807 4.35356L7.97455 1.84746L8.08226 1.73975L10.5884 4.24586L10.4807 4.35356ZM10.7669 4.0673L8.26082 1.5612L8.36853 1.45349L10.8746 3.95959L10.7669 4.0673ZM11.6129 3.22107L11.0532 3.78103L8.54708 1.27493L9.10676 0.714973C9.38731 0.434708 9.84385 0.434422 10.1241 0.714973L11.6131 2.20372C11.8934 2.48399 11.8934 2.94052 11.6129 3.22107Z"
          fill="rgba(255,248,234,0.55)"/>
      </g>
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M6 4L10 8L6 12" stroke="rgba(255,248,234,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function UnitIcon() {
  return (
    <svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <mask id="mad-unit-mask" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="25">
        <path d="M0 0H19.6237V25H0V0Z" fill="black"/>
      </mask>
      <g mask="url(#mad-unit-mask)">
        <path d="M11.3831 0.00012207C11.3495 0.00012207 11.3159 0.00275048 11.2826 0.00800731L2.3866 1.42589C1.06538 1.45918 0 2.70593 0 4.23304V20.7669C0 22.294 1.06538 23.5405 2.38631 23.5741L11.2826 24.9922C11.3159 24.9975 11.3495 25.0001 11.3831 25.0001C12.7291 25.0001 13.8243 23.7405 13.8243 22.1918V2.80814C13.8243 1.25972 12.7291 0.00012207 11.3831 0.00012207ZM12.3641 22.1918C12.3641 22.7972 11.9473 23.2934 11.4266 23.3197L2.54138 21.9033C2.50809 21.898 2.4748 21.8954 2.44121 21.8954C1.90005 21.8954 1.46023 21.389 1.46023 20.7669V4.23304C1.46023 3.61069 1.90005 3.10457 2.44121 3.10457C2.4748 3.10457 2.50809 3.10194 2.54138 3.09668L11.4266 1.68055C11.9473 1.70684 12.3641 2.20273 12.3641 2.80814V22.1918Z" fill="currentColor"/>
        <path d="M17.1823 2.35864H15.0465C14.6429 2.35864 14.3164 2.73451 14.3164 3.19827C14.3164 3.66234 14.6429 4.0382 15.0465 4.0382H17.1823C17.7237 4.0382 18.1635 4.54431 18.1635 5.16666V19.8332C18.1635 20.4556 17.7237 20.9617 17.1823 20.9617H15.0465C14.6429 20.9617 14.3164 21.3375 14.3164 21.8013C14.3164 22.2651 14.6429 22.6412 15.0465 22.6412H17.1823C18.5286 22.6412 19.6235 21.3813 19.6235 19.8332V5.16666C19.6235 3.61824 18.5286 2.35864 17.1823 2.35864Z" fill="currentColor"/>
        <path d="M10.0032 12.5195C9.47078 12.5195 9.03943 13.0157 9.03943 13.6281C9.03943 14.2403 9.47078 14.7367 10.0032 14.7367C10.5356 14.7367 10.9669 14.2403 10.9669 13.6281C10.9669 13.0157 10.5356 12.5195 10.0032 12.5195Z" fill="currentColor"/>
      </g>
    </svg>
  )
}

function DeliveryIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/>
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mad-email-mask" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="27" height="25">
        <path d="M0 0H26.983V25H0V0Z" fill="black"/>
      </mask>
      <g mask="url(#mad-email-mask)">
        <path d="M26.983 12.5C26.983 12.2549 26.9732 12.0122 26.958 11.7705C26.9519 11.6665 26.9414 11.5626 26.9323 11.4587C26.9218 11.3393 26.9106 11.2206 26.8965 11.1023C26.8878 11.0299 26.8842 10.9574 26.8744 10.885C26.8708 10.8599 26.8621 10.8368 26.8564 10.8123C25.964 4.71549 20.3125 0 13.4915 0C6.05207 0 0 5.6073 0 12.5C0 19.3927 6.05207 25 13.4915 25C15.8859 25 18.2384 24.4109 20.2944 23.2969C20.7258 23.0632 20.8709 22.5499 20.6187 22.1499C20.3668 21.7506 19.8124 21.6168 19.3811 21.8499C17.6018 22.8141 15.5653 23.3237 13.4915 23.3237C7.04971 23.3237 1.80929 18.4684 1.80929 12.5C1.80929 6.53162 7.04971 1.67632 13.4915 1.67632C19.4983 1.67632 24.4587 5.89898 25.1013 11.3085C25.1104 11.3883 25.1184 11.4677 25.1256 11.5472C25.1368 11.6642 25.1477 11.7815 25.1545 11.8995C25.1603 11.9948 25.1618 12.09 25.165 12.1852C25.1683 12.2898 25.1737 12.3944 25.1737 12.5C25.1737 12.5047 25.1748 12.5087 25.1752 12.5134C25.1748 13.8873 24.8994 15.2237 24.3498 16.5017C24.0205 17.2678 23.3228 17.8039 22.4359 17.9732C21.5244 18.1465 20.5893 17.889 19.9351 17.2832C19.1832 16.5862 18.9516 15.5167 19.3449 14.5579C19.4618 14.2725 19.5508 13.9778 19.6174 13.6785C19.6192 13.6711 19.6206 13.6637 19.6225 13.6563C19.7621 13.0153 19.7889 12.3511 19.6927 11.6954C19.6861 11.6501 19.6728 11.6079 19.659 11.566C19.1745 8.8131 16.5973 6.70328 13.4915 6.70328C10.0416 6.70328 7.23462 9.30359 7.23462 12.5C7.23462 15.6964 10.0416 18.2967 13.4915 18.2967C15.0594 18.2967 16.4909 17.7556 17.5903 16.8692C17.8067 17.4633 18.1638 18.0128 18.6556 18.4684C19.519 19.268 20.6751 19.7032 21.8714 19.7028C22.1801 19.7028 22.4913 19.674 22.801 19.6153C24.2727 19.3344 25.4802 18.4023 26.0306 17.1226C26.6555 15.6689 26.9761 14.1022 26.9808 12.5188C26.9812 12.5124 26.983 12.5064 26.983 12V12.5ZM13.4915 16.6204C11.0392 16.6204 9.04391 14.7718 9.04391 12.5C9.04391 10.2282 11.0392 8.3796 13.4915 8.3796C15.777 8.3796 17.6637 9.98585 17.9098 12.0434C17.9156 12.0937 17.9181 12.1436 17.9221 12.1939C17.93 12.2955 17.9387 12.3967 17.9387 12.5C17.9387 12.7451 17.9112 12.9841 17.8667 13.2178C17.8577 13.2657 17.8504 13.3137 17.8392 13.3613C17.8179 13.4538 17.7915 13.544 17.7636 13.6342C17.7455 13.6919 17.7263 13.7492 17.7057 13.8065C17.1144 15.4393 15.4506 16.6204 13.4915 16.6204Z" fill="currentColor"/>
      </g>
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM18 18H6C5.45 18 5 17.55 5 17V9L10.5 13C11.38 13.63 12.62 13.63 13.5 13L19 9V17C19 17.55 18.55 18 18 18ZM13.5 11L5 6H19L13.5 11Z" fill="currentColor"/>
    </svg>
  )
}

function StatementsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20ZM16 11H8V13H16V11ZM16 15H8V17H16V15ZM10 7H8V9H10V7Z" fill="currentColor"/>
    </svg>
  )
}
