import { useState } from 'react'
import { useMode } from '../ModeContext'
import './ResidentNotificationPrefs.css'

const PRIMARY_EMAIL = 'johnd@email.com'

const INITIAL = {
  email:             true,
  annualMeeting:     true,
  bodMeetings:       true,
  poolDates:         true,
  socialEvents:      true,
  tennisGroup:       true,
  neighborhoodWatch: true,
  petOwners:         true,
}

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

function Row({ icon, label, sublabel, on, onToggle, action }) {
  return (
    <div className="np-row">
      <span className="np-row__icon">{icon}</span>
      <span className="np-row__label-wrap">
        <span className="np-row__label">{label}</span>
        {sublabel && <span className="np-row__sublabel">{sublabel}</span>}
      </span>
      {action || <Toggle on={on} onToggle={onToggle} />}
    </div>
  )
}

const UNITS = [
  { id: 1, address: '2545 North Point Hill, 179 Street',          account: 'Acc# 134565435666' },
  { id: 2, address: '254 SE very long Addresa road, 1234 street', account: 'Acc# 134565435666' },
  { id: 3, address: '3rd unit road, 179 Street',                  account: 'Acc# 134565435666' },
  { id: 4, address: '4th unit road, 179 Street',                  account: 'Acc# 134565435666' },
]

export default function ResidentNotificationPrefs() {
  const { pushResidentView } = useMode()
  const [prefs, setPrefs] = useState(INITIAL)
  const toggle = key => setPrefs(p => ({ ...p, [key]: !p[key] }))


  /* ── Broadcast Notifications ── */
  const [phones, setPhones] = useState([
    { id: 1, number: '+1 545.766.7876', on: true },
    { id: 2, number: '+1 555.656.7876', on: true },
  ])
  const [newPhone, setNewPhone] = useState('')
  const [addingPhone, setAddingPhone] = useState(false)

  function confirmPhone() {
    const trimmed = newPhone.trim()
    if (!trimmed) return
    setPhones(prev => [...prev, { id: Date.now(), number: trimmed, on: true }])
    setAddingPhone(false)
    setNewPhone('')
  }

  function removePhone(id) {
    setPhones(prev => prev.filter(p => p.id !== id))
  }

  function togglePhone(id) {
    setPhones(prev => prev.map(p => p.id === id ? { ...p, on: !p.on } : p))
  }

  return (
    <div className="screen np-screen">
      <div className="np-content">

        <h2 className="np-section-title">Statements &amp; Official Communications</h2>

        <div className="np-card">
          {UNITS.map((unit, i) => (
            <button
              key={unit.id}
              className={`np-unit-row${i > 0 ? ' np-unit-row--bordered' : ''}`}
              onClick={() => pushResidentView('mailing-address-detail', { unitAddress: unit.address, account: unit.account })}
            >
              <UnitIcon />
              <div className="np-unit-info">
                <span className="np-unit-address">{unit.address}</span>
                <span className="np-unit-account">{unit.account}</span>
              </div>
              <ChevronIcon />
            </button>
          ))}
        </div>

        <h2 className="np-section-title">Broadcast Notifications</h2>

        <div className="np-card">
          {/* Header row — icon + title + master toggle */}
          <Row
            icon={<EmailIcon />}
            label="Email"
            on={prefs.email}
            onToggle={() => toggle('email')}
          />

          {/* Primary email address */}
          <div className="np-email-section">
            <p className="np-caps-label">Primary Email</p>
            <p className="np-email-address">{PRIMARY_EMAIL}</p>
          </div>
        </div>

        <div className="np-card">
          {/* Header row — icon + title, no master toggle */}
          <div className="np-row">
            <span className="np-row__icon"><SmsIcon /></span>
            <span className="np-row__label">SMS</span>
          </div>

          <p className="np-disclaimer">
            By opting in, you agree to receive SMS messages from your Property Management Company
            regarding your account and community. Message and data rates may apply. Message
            frequency varies. You may opt out at any time by replying STOP to any message or
            updating your notification settings.
          </p>
          <p className="np-disclaimer-links">
            <a href="#" className="np-link">Terms and Conditions</a>
            {'  |  '}
            <a href="#" className="np-link">Privacy Policy</a>
          </p>

          {/* Phone numbers — all removable */}
          {phones.map((p, i) => (
            <div key={p.id} className={`np-email-section${i > 0 ? ' np-email-section--secondary' : ''}`}>
              <p className="np-caps-label">Phone Number {i + 1}</p>
              <div className="np-secondary-row">
                <p className="np-email-address">{p.number}</p>
                <Toggle on={p.on} onToggle={() => togglePhone(p.id)} />
                <button className="np-remove-btn" onClick={() => removePhone(p.id)} aria-label={`Remove phone ${i + 1}`}>×</button>
              </div>
            </div>
          ))}

          {/* Add phone — input */}
          {addingPhone && (
            <div className="np-email-section np-email-section--secondary">
              <p className="np-caps-label">Phone Number {phones.length + 1}</p>
              <div className="np-add-row">
                <input
                  className="np-email-input"
                  type="tel"
                  placeholder="Phone number"
                  value={newPhone}
                  onChange={e => setNewPhone(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && confirmPhone()}
                  autoFocus
                />
                <button className="np-add-confirm" onClick={confirmPhone}>Add</button>
                <button className="np-add-cancel" onClick={() => { setAddingPhone(false); setNewPhone('') }}>×</button>
              </div>
            </div>
          )}

          {/* Add phone — trigger (max 3) */}
          {!addingPhone && phones.length < 3 && (
            <button className="np-add-secondary-btn" onClick={() => setAddingPhone(true)}>
              <span className="np-add-secondary-icon">+</span>
              <span>Add Phone Number</span>
            </button>
          )}
        </div>

        <h2 className="np-section-title">Calendar Notifications</h2>

        <div className="np-card">
          <Row icon={<CalendarIcon />} label="Annual Meeting"
            on={prefs.annualMeeting} onToggle={() => toggle('annualMeeting')} />
        </div>
        <div className="np-card">
          <Row icon={<CalendarIcon />} label="BOD Meetings"
            on={prefs.bodMeetings} onToggle={() => toggle('bodMeetings')} />
        </div>
        <div className="np-card">
          <Row icon={<CalendarIcon />} label="Pool dates"
            on={prefs.poolDates} onToggle={() => toggle('poolDates')} />
        </div>
        <div className="np-card">
          <Row icon={<CalendarIcon />} label="Social Events"
            on={prefs.socialEvents} onToggle={() => toggle('socialEvents')} />
        </div>

        <h2 className="np-section-title">Groups</h2>

        <div className="np-card">
          <Row icon={<GroupIcon />} label="Tennis Group"
            on={prefs.tennisGroup} onToggle={() => toggle('tennisGroup')} />
        </div>
        <div className="np-card">
          <Row icon={<GroupIcon />} label="Neighborhood Watch"
            on={prefs.neighborhoodWatch} onToggle={() => toggle('neighborhoodWatch')} />
        </div>
        <div className="np-card">
          <Row icon={<GroupIcon />} label="Pet Owners"
            on={prefs.petOwners} onToggle={() => toggle('petOwners')} />
        </div>

      </div>
    </div>
  )
}

/* ── Icons ─────────────────────────────────────────────── */
function UnitIcon() {
  return (
    <svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, opacity: 0.8 }}>
      <mask id="np-unit-mask" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="25">
        <path d="M0 0H19.6237V25H0V0Z" fill="black"/>
      </mask>
      <g mask="url(#np-unit-mask)">
        <path d="M11.3831 0.00012207C11.3495 0.00012207 11.3159 0.00275048 11.2826 0.00800731L2.3866 1.42589C1.06538 1.45918 0 2.70593 0 4.23304V20.7669C0 22.294 1.06538 23.5405 2.38631 23.5741L11.2826 24.9922C11.3159 24.9975 11.3495 25.0001 11.3831 25.0001C12.7291 25.0001 13.8243 23.7405 13.8243 22.1918V2.80814C13.8243 1.25972 12.7291 0.00012207 11.3831 0.00012207ZM12.3641 22.1918C12.3641 22.7972 11.9473 23.2934 11.4266 23.3197L2.54138 21.9033C2.50809 21.898 2.4748 21.8954 2.44121 21.8954C1.90005 21.8954 1.46023 21.389 1.46023 20.7669V4.23304C1.46023 3.61069 1.90005 3.10457 2.44121 3.10457C2.4748 3.10457 2.50809 3.10194 2.54138 3.09668L11.4266 1.68055C11.9473 1.70684 12.3641 2.20273 12.3641 2.80814V22.1918Z" fill="currentColor"/>
        <path d="M17.1823 2.35864H15.0465C14.6429 2.35864 14.3164 2.73451 14.3164 3.19827C14.3164 3.66234 14.6429 4.0382 15.0465 4.0382H17.1823C17.7237 4.0382 18.1635 4.54431 18.1635 5.16666V19.8332C18.1635 20.4556 17.7237 20.9617 17.1823 20.9617H15.0465C14.6429 20.9617 14.3164 21.3375 14.3164 21.8013C14.3164 22.2651 14.6429 22.6412 15.0465 22.6412H17.1823C18.5286 22.6412 19.6235 21.3813 19.6235 19.8332V5.16666C19.6235 3.61824 18.5286 2.35864 17.1823 2.35864Z" fill="currentColor"/>
        <path d="M10.0032 12.5195C9.47078 12.5195 9.03943 13.0157 9.03943 13.6281C9.03943 14.2403 9.47078 14.7367 10.0032 14.7367C10.5356 14.7367 10.9669 14.2403 10.9669 13.6281C10.9669 13.0157 10.5356 12.5195 10.0032 12.5195Z" fill="currentColor"/>
      </g>
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path d="M1 1L7 7L1 13" stroke="rgba(255,248,234,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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

function MailIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM18 18H6C5.45 18 5 17.55 5 17V9L10.5 13C11.38 13.63 12.62 13.63 13.5 13L19 9V17C19 17.55 18.55 18 18 18ZM13.5 11L5 6H19L13.5 11Z" fill="currentColor"/>
      <rect x="2" y="14" width="6" height="1.5" rx="0.75" fill="currentColor" opacity="0"/>
      <path d="M5 20H3C2.45 20 2 19.55 2 19V17C2 16.45 2.45 16 3 16H5C5.55 16 6 16.45 6 17V19C6 19.55 5.55 20 5 20Z" fill="currentColor" opacity="0"/>
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
function EmailIcon() {
  return (
    <svg width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_at" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="27" height="25">
        <path d="M0 0H26.983V25H0V0Z" fill="black"/>
      </mask>
      <g mask="url(#mask0_at)">
        <path d="M26.983 12.5C26.983 12.2549 26.9732 12.0122 26.958 11.7705C26.9519 11.6665 26.9414 11.5626 26.9323 11.4587C26.9218 11.3393 26.9106 11.2206 26.8965 11.1023C26.8878 11.0299 26.8842 10.9574 26.8744 10.885C26.8708 10.8599 26.8621 10.8368 26.8564 10.8123C25.964 4.71549 20.3125 0 13.4915 0C6.05207 0 0 5.6073 0 12.5C0 19.3927 6.05207 25 13.4915 25C15.8859 25 18.2384 24.4109 20.2944 23.2969C20.7258 23.0632 20.8709 22.5499 20.6187 22.1499C20.3668 21.7506 19.8124 21.6168 19.3811 21.8499C17.6018 22.8141 15.5653 23.3237 13.4915 23.3237C7.04971 23.3237 1.80929 18.4684 1.80929 12.5C1.80929 6.53162 7.04971 1.67632 13.4915 1.67632C19.4983 1.67632 24.4587 5.89898 25.1013 11.3085C25.1104 11.3883 25.1184 11.4677 25.1256 11.5472C25.1368 11.6642 25.1477 11.7815 25.1545 11.8995C25.1603 11.9948 25.1618 12.09 25.165 12.1852C25.1683 12.2898 25.1737 12.3944 25.1737 12.5C25.1737 12.5047 25.1748 12.5087 25.1752 12.5134C25.1748 13.8873 24.8994 15.2237 24.3498 16.5017C24.0205 17.2678 23.3228 17.8039 22.4359 17.9732C21.5244 18.1465 20.5893 17.889 19.9351 17.2832C19.1832 16.5862 18.9516 15.5167 19.3449 14.5579C19.4618 14.2725 19.5508 13.9778 19.6174 13.6785C19.6192 13.6711 19.6206 13.6637 19.6225 13.6563C19.7621 13.0153 19.7889 12.3511 19.6927 11.6954C19.6861 11.6501 19.6728 11.6079 19.659 11.566C19.1745 8.8131 16.5973 6.70328 13.4915 6.70328C10.0416 6.70328 7.23462 9.30359 7.23462 12.5C7.23462 15.6964 10.0416 18.2967 13.4915 18.2967C15.0594 18.2967 16.4909 17.7556 17.5903 16.8692C17.8067 17.4633 18.1638 18.0128 18.6556 18.4684C19.519 19.268 20.6751 19.7032 21.8714 19.7028C22.1801 19.7028 22.4913 19.674 22.801 19.6153C24.2727 19.3344 25.4802 18.4023 26.0306 17.1226C26.6555 15.6689 26.9761 14.1022 26.9808 12.5188C26.9812 12.5124 26.983 12.5064 26.983 12V12.5ZM13.4915 16.6204C11.0392 16.6204 9.04391 14.7718 9.04391 12.5C9.04391 10.2282 11.0392 8.3796 13.4915 8.3796C15.777 8.3796 17.6637 9.98585 17.9098 12.0434C17.9156 12.0937 17.9181 12.1436 17.9221 12.1939C17.93 12.2955 17.9387 12.3967 17.9387 12.5C17.9387 12.7451 17.9112 12.9841 17.8667 13.2178C17.8577 13.2657 17.8504 13.3137 17.8392 13.3613C17.8179 13.4538 17.7915 13.544 17.7636 13.6342C17.7455 13.6919 17.7263 13.7492 17.7057 13.8065C17.1144 15.4393 15.4506 16.6204 13.4915 16.6204Z" fill="currentColor"/>
      </g>
    </svg>
  )
}

function SmsIcon() {
  return (
    <svg width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_sms" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="27" height="24">
        <path d="M0 0H26.983V23.1755H0V0Z" fill="black"/>
      </mask>
      <g mask="url(#mask0_sms)">
        <path d="M13.4919 23.1755C12.3686 23.1755 11.3127 22.7701 10.5186 22.0344L8.70275 20.3516C8.26257 19.9441 7.67767 19.7197 7.05526 19.7197H4.20459C1.88633 19.7197 0 17.972 0 15.8241V3.89559C0 1.7477 1.88633 0 4.20459 0H22.7788C25.097 0 26.983 1.7477 26.983 3.89559V15.8241C26.983 17.972 25.097 19.7197 22.7788 19.7197H19.9285C19.3061 19.7197 18.7208 19.9441 18.2806 20.3516L16.4648 22.0344C15.6707 22.7701 14.6148 23.1755 13.4919 23.1755ZM4.20459 1.73693C2.92004 1.73693 1.8747 2.70544 1.8747 3.89559V15.8241C1.8747 17.0143 2.92004 17.9828 4.20459 17.9828H7.05526C8.17821 17.9828 9.23442 18.3878 10.0282 19.1236L11.8444 20.8064C12.2842 21.2142 12.8695 21.4386 13.4919 21.4386C14.1139 21.4386 14.6992 21.2142 15.139 20.8064L16.9552 19.1236C17.7493 18.3878 18.8052 17.9828 19.9285 17.9828H22.7788C24.0633 17.9828 25.1083 17.0143 25.1083 15.8241V3.89559C25.1083 2.70544 24.0633 1.73693 22.7788 1.73693H4.20459Z" fill="currentColor"/>
        <path d="M4.11011 12.266L4.66315 11.1151C5.19031 11.4385 5.93907 11.6591 6.62821 11.6591C7.32598 11.6591 7.59818 11.4778 7.59818 11.21C7.59818 10.3349 4.21209 10.9734 4.21209 8.92415C4.21209 7.93862 5.07971 7.13477 6.84943 7.13477C7.62368 7.13477 8.42343 7.30047 9.01021 7.61555L8.49129 8.77443C7.92138 8.49062 7.35972 8.34888 6.8408 8.34888C6.13479 8.34888 5.87945 8.56947 5.87945 8.8453C5.87945 9.68875 9.25692 9.05824 9.25692 11.0918C9.25692 12.0534 8.38931 12.8732 6.61959 12.8732C5.64137 12.8732 4.67177 12.6287 4.11011 12.266Z" fill="currentColor"/>
        <path d="M15.4059 12.7636L15.3891 9.83933L13.8578 12.22H13.1091L11.586 9.91819V12.7636H10.0293V7.24609H11.4158L13.5087 10.4306L15.5507 7.24609H16.9372L16.9541 12.7636H15.4059Z" fill="currentColor"/>
        <path d="M17.7264 12.266L18.2795 11.1151C18.8066 11.4385 19.5554 11.6591 20.2445 11.6591C20.9423 11.6591 21.2145 11.4778 21.2145 11.21C21.2145 10.3349 17.8284 10.9734 17.8284 8.92415C17.8284 7.93862 18.696 7.13477 20.4658 7.13477C21.24 7.13477 22.0394 7.30047 22.6265 7.61555L22.1076 8.77443C21.5377 8.49062 20.9761 8.34888 20.4571 8.34888C19.7511 8.34888 19.4958 8.56947 19.4958 8.8453C19.4958 9.68875 22.8733 9.05824 22.8733 11.0918C22.8733 12.0534 22.0056 12.8732 20.2359 12.8732C19.2577 12.8732 18.2881 12.6287 17.7264 12.266Z" fill="currentColor"/>
      </g>
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="81" height="73" viewBox="0 0 81 73" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:24,height:24}}>
      <path d="M33.2002 60.56H9.93994C7.21994 60.56 5.01025 58.35 5.01025 55.63V25.35H71.7202C73.1002 25.35 74.2202 24.23 74.2202 22.85V17.58C74.2202 12.1 69.76 7.64996 64.29 7.64996H51.4102V2.5C51.4102 1.12 50.2902 0 48.9102 0C47.5302 0 46.4102 1.12 46.4102 2.5V7.64996H27.8101V2.5C27.8101 1.12 26.6901 0 25.3101 0C23.9301 0 22.8101 1.12 22.8101 2.5V7.64996H9.93018C4.45018 7.64996 0 12.11 0 17.58V55.63C0 61.11 4.46018 65.56 9.93018 65.56H33.1899C34.5699 65.56 35.6899 64.44 35.6899 63.06C35.6899 61.68 34.5699 60.56 33.1899 60.56H33.2002ZM5 17.58C5 14.86 7.21018 12.65 9.93018 12.65H64.2803C67.0003 12.65 69.21 14.86 69.21 17.58V20.35H5V17.58Z" fill="currentColor"/>
      <path d="M59.5703 30.28C47.9603 30.28 38.52 39.72 38.52 51.33C38.52 62.94 47.9603 72.3801 59.5703 72.3801C71.1803 72.3801 80.6201 62.94 80.6201 51.33C80.6201 39.72 71.1803 30.28 59.5703 30.28ZM59.5703 67.3701C50.7203 67.3701 43.52 60.1701 43.52 51.3201C43.52 42.4701 50.7203 35.27 59.5703 35.27C68.4203 35.27 75.6201 42.4701 75.6201 51.3201C75.6201 60.1701 68.4203 67.3701 59.5703 67.3701Z" fill="currentColor"/>
      <path d="M63.6603 45.65L57.6203 51.6901L55.4904 49.5601C54.5104 48.5801 52.9303 48.5801 51.9503 49.5601C50.9703 50.5401 50.9703 52.1201 51.9503 53.1001L55.8502 57.0001C56.3202 57.4701 56.9503 57.7301 57.6203 57.7301C58.2903 57.7301 58.9203 57.4701 59.3903 57.0001L67.2003 49.2C68.1803 48.22 68.1803 46.64 67.2003 45.66C66.2203 44.68 64.6403 44.68 63.6603 45.66V45.65Z" fill="currentColor"/>
    </svg>
  )
}

function GroupIcon() {
  return (
    <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_users_np" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
        <path d="M0 0H25V23.0022H0V0Z" fill="black"/>
      </mask>
      <g mask="url(#mask0_users_np)">
        <path d="M7.48299 14.6052C3.93805 14.6052 0.811286 17.1146 0.0482334 20.5718C-0.0839538 21.1714 0.0591969 21.7884 0.44135 22.2643C0.818177 22.7332 1.37919 23.0019 1.98092 23.0019H12.9854C13.5871 23.0019 14.1481 22.7332 14.5246 22.2646C14.9071 21.7884 15.0506 21.1717 14.9181 20.5718C14.1553 17.1146 11.0282 14.6052 7.48299 14.6052V14.6052ZM13.3036 21.2835C13.2579 21.3405 13.1558 21.4357 12.9854 21.4357H1.98092C1.81052 21.4357 1.70841 21.3405 1.66267 21.2835C1.57904 21.1795 1.54803 21.0433 1.57778 20.9092C2.18359 18.1639 4.66696 16.1714 7.48299 16.1714C10.2993 16.1714 12.783 18.1639 13.3885 20.9092C13.4183 21.0429 13.3872 21.1795 13.3036 21.2835Z" fill="currentColor"/>
        <path d="M7.48298 12.0338C9.69916 12.0338 11.5019 10.2308 11.5019 8.01496C11.5019 5.79879 9.69916 3.99609 7.48298 3.99609C5.26681 3.99609 3.46411 5.79879 3.46411 8.01496C3.46411 10.2308 5.26681 12.0338 7.48298 12.0338ZM7.48298 5.56229C8.83524 5.56229 9.93565 6.66239 9.93565 8.01496C9.93565 9.36722 8.83524 10.4676 7.48298 10.4676C6.13073 10.4676 5.03031 9.36722 5.03031 8.01496C5.03031 6.66239 6.13073 5.56229 7.48298 5.56229Z" fill="currentColor"/>
        <path d="M24.9517 16.5762C24.1887 13.1189 21.0619 10.6093 17.5167 10.6093C15.4769 10.6093 13.5611 11.4052 12.1218 12.8508C11.8167 13.1575 11.8176 13.6533 12.1239 13.9584C12.4303 14.2635 12.9265 14.2623 13.2316 13.9562C14.3749 12.8082 15.8966 12.1755 17.5167 12.1755C20.3327 12.1755 22.8167 14.1683 23.4222 16.9135C23.4516 17.0473 23.4209 17.1839 23.3373 17.2878C23.2916 17.3449 23.1895 17.4404 23.0191 17.4404H17.2244C16.7918 17.4404 16.4413 17.7909 16.4413 18.2235C16.4413 18.6561 16.7918 19.0066 17.2244 19.0066H23.0191C23.6205 19.0066 24.1815 18.7375 24.5583 18.2689C24.9405 17.7931 25.0839 17.176 24.9517 16.5762Z" fill="currentColor"/>
        <path d="M17.5167 8.03786C19.7328 8.03786 21.5356 6.23485 21.5356 4.01899C21.5356 1.80282 19.7328 0.00012207 17.5167 0.00012207C15.3005 0.00012207 13.4978 1.80282 13.4978 4.01899C13.4978 6.23485 15.3005 8.03786 17.5167 8.03786ZM17.5167 1.56632C18.8689 1.56632 19.9694 2.66673 19.9694 4.01899C19.9694 5.37125 18.8689 6.47166 17.5167 6.47166C16.1644 6.47166 15.064 5.37125 15.064 4.01899C15.064 2.66673 16.1644 1.56632 17.5167 1.56632Z" fill="currentColor"/>
      </g>
    </svg>
  )
}
