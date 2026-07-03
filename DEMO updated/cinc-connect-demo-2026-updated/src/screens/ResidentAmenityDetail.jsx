import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useMode } from '../ModeContext'
import usersIcon from '../ICONS/Users.svg'
import depositIcon from '../ICONS/deposit.svg'
import moneyIcon from '../ICONS/Money.svg'
import phoneIcon from '../ICONS/phone.svg'
import attachmentIcon from '../ICONS/Attachment.svg'
import courtsImg from '../images/Amenities/courts.jpg'
import calendarCheckIcon from '../ICONS/calendar-check.svg'
import visaIcon from '../ICONS/visa.svg'
import mastercardIcon from '../ICONS/mastercard.svg'
import amexIcon from '../ICONS/amex.svg'
import applePayIcon from '../ICONS/applepay.svg'
import bankIcon from '../ICONS/Bank.svg'
import invoiceIcon from '../ICONS/Invoice.svg'
import './ResidentAmenityDetail.css'

const TODAY_STR = (() => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
})()

const DOW = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December']

function AmenityMonthBlock({ year, month, selectedDate, onDateSelect }) {
  const firstDow    = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = Array(firstDow).fill(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <div className="amenity-cal-month-block">
      <div className="amenity-cal-month-label">
        <span>{MONTH_NAMES[month]}</span>
        <span>{year}</span>
      </div>
      <div className="amenity-cal-dow-row">
        {DOW.map((d, i) => <span key={i} className="amenity-cal-dow">{d}</span>)}
      </div>
      <div className="amenity-cal-grid">
        {cells.map((day, i) => {
          if (!day) return <div key={`e${i}`} className="amenity-cal-cell amenity-cal-cell--empty" />
          const ds = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`
          const isPast = ds < TODAY_STR
          return (
            <button
              key={day}
              className={`amenity-cal-cell${ds === TODAY_STR ? ' amenity-cal-cell--today' : ''}${isPast ? ' amenity-cal-cell--past' : ''}${ds === selectedDate ? ' amenity-cal-cell--selected' : ''}`}
              onClick={() => !isPast && onDateSelect(ds)}
              disabled={isPast}
            >
              <span className="amenity-cal-cell__num">{day}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function AmenityCalendarPicker({ selectedDate, onDateSelect }) {
  const today = new Date(TODAY_STR + 'T12:00:00')
  const months = Array.from({ length: 18 }, (_, i) => {
    const d = new Date(today.getFullYear(), today.getMonth() + i, 1)
    return { year: d.getFullYear(), month: d.getMonth() }
  })

  return (
    <div className="amenity-cal-picker">
      {months.map(({ year, month }) => (
        <AmenityMonthBlock
          key={`${year}-${month}`}
          year={year}
          month={month}
          selectedDate={selectedDate}
          onDateSelect={onDateSelect}
        />
      ))}
    </div>
  )
}


function parseMinutes(timeStr) {
  const [time, period] = timeStr.trim().split(' ')
  let [h, m] = time.split(':').map(Number)
  if (period === 'PM' && h !== 12) h += 12
  if (period === 'AM' && h === 12) h = 0
  return h * 60 + m
}

const DAY_NAMES = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

function getTimesForDate(dateStr, amenity) {
  const dow = new Date(dateStr + 'T12:00:00').getDay()
  const dayEntry = amenity.dailyHours?.find(d => d.day === DAY_NAMES[dow])
  if (!dayEntry?.blocks?.length) return []
  const slots = []
  for (const block of dayEntry.blocks) {
    const [startStr, endStr] = block.split('–').map(s => s.trim())
    const startMins = parseMinutes(startStr)
    const endMins = parseMinutes(endStr)
    for (let t = startMins; t < endMins; t += 60) slots.push(formatMinutes(t))
  }
  return slots
}

function mmddyyyyToISO(str) {
  if (!str) return null
  const [m, d, y] = str.split('/')
  return `${y}-${m.padStart(2,'0')}-${d.padStart(2,'0')}`
}

function formatMinutes(totalMins) {
  let h = Math.floor(totalMins / 60)
  const m = totalMins % 60
  const period = h >= 12 ? 'PM' : 'AM'
  if (h > 12) h -= 12
  if (h === 0) h = 12
  return `${h}:${String(m).padStart(2, '0')} ${period}`
}

function getEndTimes(startTime, maxHours) {
  const startMins = parseMinutes(startTime)
  const times = []
  for (let offset = 30; offset <= maxHours * 60; offset += 30) {
    times.push(formatMinutes(startMins + offset))
  }
  return times
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 13 13" fill="none" className="amenity-stat__icon">
      <circle cx="6.5" cy="6.5" r="5.7" stroke="#fff8ea" strokeWidth="1.2" />
      <path d="M6.5 3.5v3l2 1.5" stroke="#fff8ea" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function HeartIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        fill={active ? '#FF3B30' : '#FFF8EA'}
      />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="4" width="16" height="14" rx="2" stroke="rgba(255,248,234,0.5)" strokeWidth="1.4" />
      <path d="M6 2v4M14 2v4M2 9h16" stroke="rgba(255,248,234,0.5)" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function PayCardIcon() {
  return (
    <svg width="22" height="15" viewBox="0 0 30 21" fill="none">
      <rect x="1" y="1" width="28" height="19" rx="3" stroke="rgba(255,248,234,0.5)" strokeWidth="1.2" />
      <path d="M1 7h28" stroke="rgba(255,248,234,0.5)" strokeWidth="2.5" />
      <rect x="4" y="12" width="7" height="4" rx="1" fill="rgba(255,248,234,0.3)" />
    </svg>
  )
}

function PayBankIcon() {
  return (
    <svg width="26" height="24" viewBox="0 0 26 24" fill="none">
      <path d="M13 2L1 9h24L13 2z" stroke="rgba(255,248,234,0.5)" strokeWidth="1.3" strokeLinejoin="round" />
      <rect x="3" y="9" width="3" height="10" rx="0.5" fill="rgba(255,248,234,0.3)" />
      <rect x="8" y="9" width="3" height="10" rx="0.5" fill="rgba(255,248,234,0.3)" />
      <rect x="14" y="9" width="3" height="10" rx="0.5" fill="rgba(255,248,234,0.3)" />
      <rect x="19" y="9" width="3" height="10" rx="0.5" fill="rgba(255,248,234,0.3)" />
      <path d="M1 19h24M1 23h24" stroke="rgba(255,248,234,0.5)" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

const SAVED_METHODS = [
  { id: 'apple-pay', label: 'Apple Pay',            sub: 'Amex. Discover, Mastercard, Visa', type: 'apple-pay', logo: null        },
  { id: 'visa-2564', label: 'Visa ****2564',         sub: 'Debit Card Business',              type: 'card',      logo: 'visa'      },
  { id: 'mc-1234',   label: 'Mastercard ****1234',   sub: 'Credit Personal',                  type: 'card',      logo: 'mastercard'},
  { id: 'amex-4567', label: 'Amex ****4567',         sub: 'Amex Platinum',                    type: 'card',      logo: 'amex'      },
  { id: 'bank-4567', label: 'Bank Account ****4567', sub: 'Joint Checking',                   type: 'ach',       logo: null        },
]

function ChevronRightIcon() {
  return (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
      <path d="M1 1l6 6-6 6" stroke="rgba(255,248,234,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const LOGO_MAP = { visa: visaIcon, mastercard: mastercardIcon, amex: amexIcon }

function MethodIcon({ type, logo }) {
  if (logo && LOGO_MAP[logo]) return <img src={LOGO_MAP[logo]} alt={logo} className="amenity-method-sel__brand-img" />
  if (type === 'apple-pay') return <img src={applePayIcon} alt="Apple Pay" className="amenity-method-sel__brand-img amenity-method-sel__brand-img--apple" />
  if (type === 'ach') return <img src={bankIcon} alt="Bank" className="amenity-method-sel__brand-img amenity-method-sel__brand-img--bank" />
  return <PayCardIcon />
}

function SwitchPayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M3 6h12M12 3l3 3-3 3" stroke="rgba(255,248,234,0.45)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 12H3M6 9l-3 3 3 3" stroke="rgba(255,248,234,0.45)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CheckCircleIcon() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      <circle cx="36" cy="36" r="36" fill="rgba(178,222,97,0.12)" />
      <circle cx="36" cy="36" r="26" fill="rgba(178,222,97,0.2)" />
      <path d="M22 36l10 10 18-18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
      <path d="M9 1C5.13 1 2 4.13 2 8c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#fff8ea" strokeWidth="1.4" />
      <circle cx="9" cy="8" r="2.5" stroke="#fff8ea" strokeWidth="1.3" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M3 1h4l2 5-2.5 1.5A11 11 0 0 0 11 13l1.5-2.5L17 13v4a2 2 0 0 1-2 2A16 16 0 0 1 1 3a2 2 0 0 1 2-2z" stroke="#fff8ea" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  )
}

function PaperclipIcon() {
  return (
    <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
      <path d="M16 8L8 16a5 5 0 0 1-7-7l8-8a3 3 0 0 1 4 4L5 13a1 1 0 0 1-1-1l7-7" stroke="#fff8ea" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function ResidentAmenityDetail({ amenity }) {
  const { popResidentView } = useMode()
  const [date, setDate]               = useState(amenity.initialDate || '')
  const [calDate, setCalDate]         = useState(() => mmddyyyyToISO(amenity.initialDate))
  const [selectedStart, setStart]     = useState(amenity.initialStartTime || null)
  const [selectedEnd, setEnd]         = useState(null)
  const [selectedCourt, setCourt]     = useState(null)
  const [availableCourts, setAvailableCourts] = useState([])
  const [guests, setGuests]           = useState(2)
  const [expanded, setExpanded]       = useState(false)
  const [favorited, setFavorited]     = useState(false)
  const [showHours, setShowHours]     = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [showPdf, setShowPdf]         = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [selectedMethodId, setSelectedMethodId] = useState(null)
  const [showMethodSelector, setShowMethodSelector] = useState(false)
  const [confirmed, setConfirmed]     = useState(false)
  const [showFeeReceipt, setShowFeeReceipt]       = useState(false)
  const [showDepositDetail, setShowDepositDetail] = useState(false)
  const [additionalDetails, setAdditionalDetails] = useState('')
  const [showDisclosure, setShowDisclosure] = useState(false)
  const [disclosureAgreed, setDisclosureAgreed] = useState(false)
  const [confirmationNum] = useState(() => 'CHC-' + Math.random().toString(36).substr(2, 6).toUpperCase())
  const [timeLeft, setTimeLeft] = useState(null)

  useEffect(() => {
    if (!showPayment || confirmed) { setTimeLeft(null); return }
    setTimeLeft(120)
    const interval = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(interval); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [showPayment, confirmed])

  useEffect(() => {
    if (!showPayment) return
    const sheet = document.querySelector('.amenity-detail-sheet')
    if (!sheet) return
    const orig = sheet.style.overflow
    sheet.style.overflow = 'hidden'
    return () => { sheet.style.overflow = orig }
  }, [showPayment])

  function openCalendar() {
    setShowCalendar(true)
    setShowHours(false)
    document.querySelector('.amenity-detail-sheet')?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleDateSelect(ds) {
    setCalDate(ds)
    const [y, m, d2] = ds.split('-')
    setDate(`${m}/${d2}/${y}`)
    setStart(null)
    setEnd(null)
    setShowCalendar(false)
  }

  const todayIndex = new Date().getDay() // 0=Sun,1=Mon,...
  const dayOrder = [1, 2, 3, 4, 5, 6, 0] // Mon–Sun display order

  if (!amenity) return null

  const shortDesc = amenity.description.slice(0, 130) + '...'
  const endTimes = selectedStart ? getEndTimes(selectedStart, amenity.maxHours) : []
  const guestCounts = Array.from({ length: amenity.maxGuests }, (_, i) => i + 1)

  const timesToShow = !calDate || calDate === TODAY_STR
    ? (amenity.availableTimes || [])
    : getTimesForDate(calDate, amenity)

  const hasAmenityFee = amenity.hourlyRate != null
  const hasDeposit    = amenity.deposit != null
  const requiresPayment = hasAmenityFee || hasDeposit
  const amenityFee    = hasAmenityFee ? amenity.hourlyRate : 0
  const selectedMethod = SAVED_METHODS.find(m => m.id === selectedMethodId) || null
  const paymentMethod  = selectedMethod?.type || null
  const txFee          = paymentMethod === 'ach' ? 1.00 : paymentMethod ? amenityFee * 0.035 : 0
  const totalDue       = amenityFee + txFee
  const canPay         = !requiresPayment || !!paymentMethod
  const hasCourts      = amenity.courts?.length > 0
  const hasDetailsPrompt = !!amenity.additionalDetailsPrompt
  const canContinue    = !!date && !!selectedStart && !!selectedEnd && (!hasCourts || !!selectedCourt) && (!hasDetailsPrompt || additionalDetails.trim().length > 0)
  const fmt            = n => '$' + n.toFixed(2)
  const availableMethods = hasDeposit
    ? SAVED_METHODS.filter(m => m.type === 'card')
    : SAVED_METHODS

  function handleStartSelect(t) {
    setStart(t)
    setEnd(null)
    setCourt(null)
    setAvailableCourts([])
  }

  function handleContinue() {
    openPayment()
    if (amenity.disclosureText) {
      setDisclosureAgreed(false)
      setShowDisclosure(true)
    }
  }

  function openPayment() {
    setShowPayment(true)
    setSelectedMethodId('visa-2564')
    setShowMethodSelector(false)
    setConfirmed(false)
    document.querySelector('.amenity-detail-sheet')?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleEndSelect(t) {
    setEnd(t)
    setCourt(null)
    if (amenity.courts?.length) {
      const seed = (date + selectedStart + t).split('').reduce((s, c) => s + c.charCodeAt(0), 0)
      const rand = i => Math.abs(Math.sin(seed * 31 + i * 127 + 17))
      const available = amenity.courts.filter((_, i) => rand(i) > 0.3)
      setAvailableCourts(available.length >= 2 ? available : amenity.courts.slice(0, 3))
    }
  }

  const hoursView = (
    <div className="amenity-hours-panel">
      <div className="amenity-hours-panel__header">
        <button className="amenity-hours-panel__back" onClick={() => setShowHours(false)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#fff8ea" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="amenity-hours-panel__title">Back</span>
        </button>
        <button className="amenity-detail__close amenity-hours-panel__close" aria-label="Close" onClick={popResidentView}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="13" stroke="#fff8ea" strokeWidth="1.4" fill="rgba(0,0,0,0.35)" />
            <path d="M9.5 9.5l9 9M18.5 9.5l-9 9" stroke="#fff8ea" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <div className="amenity-hours-panel__name">{amenity.name} Hours of Operation</div>
      <div className="amenity-hours-panel__list">
        {amenity.dailyHours && [...amenity.dailyHours].sort((a, b) => {
          const order = { Monday:0,Tuesday:1,Wednesday:2,Thursday:3,Friday:4,Saturday:5,Sunday:6 }
          return order[a.day] - order[b.day]
        }).map(({ day, blocks }) => {
          const dayMap = { Monday:1,Tuesday:2,Wednesday:3,Thursday:4,Friday:5,Saturday:6,Sunday:0 }
          const isToday = dayMap[day] === todayIndex
          return (
            <div key={day} className={`amenity-hours-row${isToday ? ' amenity-hours-row--today' : ''}`}>
              <span className="amenity-hours-row__day">{day}</span>
              <div className="amenity-hours-row__blocks">
                {(blocks || []).map((b, i) => (
                  <span key={i} className="amenity-hours-row__time">{b}</span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  const sliderClass = showHours
    ? 'amenity-view-slider amenity-view-slider--hours'
    : 'amenity-view-slider'

  return (
    <div className="resident-amenity-detail">
      <div className={sliderClass}>
      <div className="amenity-view-main">
      {/* Hero photo */}
      <div className="amenity-detail__hero">
        <div className="amenity-detail-sheet__handle amenity-detail__handle-overlay" />
        <img src={amenity.img} alt={amenity.name} className="amenity-detail__hero-img" />
        <div className="amenity-detail__hero-gradient" />
        <button className="amenity-detail__close" aria-label="Close" onClick={popResidentView}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="13" stroke="#fff8ea" strokeWidth="1.4" fill="rgba(0,0,0,0.35)" />
            <path d="M9.5 9.5l9 9M18.5 9.5l-9 9" stroke="#fff8ea" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
        <h2 className="amenity-detail__hero-name">{amenity.name}</h2>
        <button className="amenity-detail__bookmark" aria-label="Favorite" onClick={() => setFavorited(f => !f)}>
          <HeartIcon active={favorited} />
        </button>
      </div>

      {/* Sliding detail panel */}
      <div className="amenity-detail__panel">
        {/* Stats */}
        <div className="amenity-detail__stats">
          <span className="amenity-stat"><img src={usersIcon} alt="" className="amenity-stat__icon" /><span>Max {amenity.maxGuests}</span></span>
          <span className="amenity-stat"><ClockIcon /><span>Max: {amenity.maxHours} Hrs</span></span>
          {amenity.hourlyRate != null
            ? <span className="amenity-stat"><img src={moneyIcon} alt="" className="amenity-stat__icon" /><span>${amenity.hourlyRate}.00</span></span>
            : amenity.deposit != null
              ? <span className="amenity-stat"><img src={depositIcon} alt="" className="amenity-stat__icon" /><span>${amenity.deposit}.00</span></span>
              : <span className="amenity-stat" style={{ visibility: 'hidden' }}><img src={moneyIcon} alt="" className="amenity-stat__icon" /><span>$0</span></span>
          }
          <span className="amenity-stat" style={amenity.hourlyRate == null || amenity.deposit == null ? { visibility: 'hidden' } : undefined}><img src={depositIcon} alt="" className="amenity-stat__icon" /><span>${amenity.deposit}.00</span></span>
        </div>

        {/* Description */}
        <p className="amenity-detail__desc">
          {expanded ? amenity.description : shortDesc}
          {' '}
          <button className="amenity-detail__see-more" onClick={() => setExpanded(e => !e)}>
            {expanded ? 'See Less' : 'See More'}
          </button>
        </p>

        {/* Reservation date */}
        <p className="amenity-detail__section-label">RESERVATION DATE</p>
        <button className="amenity-detail__date-field amenity-detail__date-field--btn" onClick={openCalendar}>
          <CalendarIcon />
          <div className="amenity-detail__date-text">
            <span className={`amenity-detail__date-input${date ? ' amenity-detail__date-input--filled' : ''}`}>
              {date || 'MM/DD/YYYY'}
            </span>
            {calDate && (
              <span className="amenity-detail__date-written">
                {new Date(calDate + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            )}
          </div>
        </button>

        {/* Start times — only shown after date is selected */}
        {date && <>
        <p className="amenity-detail__section-label">START TIMES</p>
        <div className="amenity-detail__times">
          {timesToShow.length === 0 ? (
            <span className="amenity-no-times">NO AVAILABLE TIMES</span>
          ) : timesToShow.map(t => (
            <button
              key={t}
              className={`amenity-time-pill${selectedStart === t ? ' amenity-time-pill--active' : ''}`}
              onClick={() => handleStartSelect(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* End times — only shown after start is selected */}
        {selectedStart && (
          <>
            <p className="amenity-detail__section-label">END TIME</p>
            <div className="amenity-detail__times">
              {endTimes.map(t => (
                <button
                  key={t}
                  className={`amenity-time-pill${selectedEnd === t ? ' amenity-time-pill--active' : ''}`}
                  onClick={() => handleEndSelect(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Court picker — tennis only, shown after end time is selected */}
        {selectedEnd && availableCourts.length > 0 && (
          <>
            <p className="amenity-detail__section-label">{availableCourts.length} Available Amenities</p>
            <div className={`amenity-court-carousel${selectedCourt ? ' amenity-court-carousel--has-selection' : ''}`}>
              {availableCourts.map(court => (
                <button
                  key={court.id}
                  className={`amenity-court-card${selectedCourt?.id === court.id ? ' amenity-court-card--active' : ''}`}
                  onClick={() => setCourt(court)}
                >
                  <img src={courtsImg} alt={court.name} className="amenity-court-card__img" />
                  <div className="amenity-court-card__gradient" />
                  <span className="amenity-court-card__name">{court.name}</span>
                </button>
              ))}
            </div>
          </>
        )}

        </>}

        {/* Guest count */}
        <p className="amenity-detail__section-label">NUMBER OF GUESTS</p>
        <div className="amenity-detail__guests">
          {guestCounts.map(n => (
            <button
              key={n}
              className={`amenity-guest-btn${guests === n ? ' amenity-guest-btn--active' : ''}`}
              onClick={() => setGuests(n)}
            >
              {n}
            </button>
          ))}
        </div>

        {/* Additional Details — only for amenities that require it */}
        {hasDetailsPrompt && (
          <>
            <p className="amenity-detail__section-label">
              Additional Details <span className="amenity-detail__required">*</span>
            </p>
            <p className="amenity-detail__details-hint">{amenity.additionalDetailsPrompt}</p>
            <textarea
              className="amenity-detail__details-input"
              placeholder="Type your details here…"
              value={additionalDetails}
              onChange={e => setAdditionalDetails(e.target.value)}
              rows={4}
            />
          </>
        )}

        {/* Continue */}
        <button
          className={`amenity-detail__continue${canContinue ? '' : ' amenity-detail__continue--disabled'}`}
          onClick={canContinue ? handleContinue : undefined}
        >CONTINUE</button>

        {/* Contact info */}
        <div className="amenity-detail__info-card">
          <div className="amenity-detail__info-row amenity-detail__info-row--tappable"
               onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(amenity.address)}`, '_blank')}>
            <LocationIcon />
            <span>{amenity.address}</span>
          </div>
          <div className="amenity-detail__info-divider" />
          <div className="amenity-detail__info-row amenity-detail__info-row--tappable"
               onClick={() => { window.location.href = `tel:${amenity.phone.replace(/[^+\d]/g, '')}` }}>
            <img src={phoneIcon} alt="" className="amenity-detail__info-icon" />
            <span>{amenity.phone}</span>
          </div>
          <div className="amenity-detail__info-divider" />
          <div className="amenity-detail__info-row amenity-detail__info-row--tappable"
               onClick={() => { setShowHours(true); document.querySelector('.amenity-detail-sheet')?.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            <ClockIcon />
            <span>Hours of Operation</span>
          </div>
          <div className="amenity-detail__info-divider" />
          <div className="amenity-detail__info-row amenity-detail__info-row--tappable"
               onClick={() => setShowPdf(true)}>
            <img src={attachmentIcon} alt="" className="amenity-detail__info-icon" />
            <span className="amenity-detail__rules-link">{amenity.rules}</span>
          </div>
        </div>


        {/* PDF webview overlay — slides up from bottom */}
        {showPdf && createPortal(
          <div className="amenity-pdf-panel">
            <div className="amenity-pdf-panel__header">
              <span className="amenity-pdf-panel__title">{amenity.rules}</span>
              <button className="amenity-pdf-panel__close" onClick={() => setShowPdf(false)}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="13" stroke="#fff8ea" strokeWidth="1.4" fill="rgba(0,0,0,0.35)" />
                  <path d="M9.5 9.5l9 9M18.5 9.5l-9 9" stroke="#fff8ea" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="amenity-pdf-panel__doc">
              <div className="amenity-pdf-doc__page">
                <h3 className="amenity-pdf-doc__heading">{amenity.name}</h3>
                <p className="amenity-pdf-doc__subheading">Rules &amp; Regulations</p>
                <div className="amenity-pdf-doc__divider" />
                <p className="amenity-pdf-doc__body">All residents must present their community ID card before accessing this amenity. Reservations are required and subject to availability.</p>
                <p className="amenity-pdf-doc__body">No outside food or beverages are permitted without prior written approval from the HOA management office. All guests must be accompanied by a registered resident at all times.</p>
                <p className="amenity-pdf-doc__body">The amenity must be left in the same condition it was found. Damage fees will be assessed and charged to the resident's account.</p>
                <p className="amenity-pdf-doc__body">Reservations may be cancelled up to 24 hours in advance without penalty. Late cancellations may forfeit the deposit.</p>
                <p className="amenity-pdf-doc__body">Maximum capacity and time limits must be strictly observed. The HOA reserves the right to terminate a reservation in the event of noise complaints or rule violations.</p>
              </div>
            </div>
          </div>,
          document.querySelector('.phone-frame') || document.body
        )}
      </div>
      </div>{/* end amenity-view-main */}
      <div className="amenity-view-hours">
        {hoursView}
      </div>
      </div>{/* end amenity-view-slider */}

      {/* Payment portal */}
      {showPayment && createPortal(
        <div className="amenity-pay-portal">
          {confirmed ? (
            /* ── Confirmation (Figma layout) ── */
            <div className="amenity-confirm">
              <div className="amenity-confirm__photo-wrap">
                <img src={amenity.img} alt={amenity.name} className="amenity-confirm__photo" />
                <div className="amenity-confirm__photo-gradient" />
                <button className="amenity-confirm__close" onClick={popResidentView}>
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <circle cx="14" cy="14" r="13" stroke="#fff8ea" strokeWidth="1.4" fill="rgba(0,0,0,0.35)" />
                    <path d="M9.5 9.5l9 9M18.5 9.5l-9 9" stroke="#fff8ea" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
                <div className="amenity-confirm__icon-ring">
                  <img src={calendarCheckIcon} alt="" className="amenity-confirm__icon" />
                </div>
              </div>

              <div className="amenity-confirm__body">
                <div className="amenity-confirm__main-card">
                  <h2 className="amenity-confirm__title">Booking Confirmed!</h2>
                  <p className="amenity-confirm__sub">Your reservation has been successfully placed.</p>
                  <div className="amenity-confirm__sep" />
                  <div className="amenity-confirm__amenity-name">{amenity.name}</div>
                  {selectedCourt && <div className="amenity-confirm__detail--court">{selectedCourt.name}</div>}
                  <div className="amenity-confirm__datetime">
                    {date || 'MM/DD/YYYY'}
                    {selectedStart && selectedEnd ? `  ${selectedStart} – ${selectedEnd}` : ''}
                  </div>
                  <div className="amenity-confirm__guests">Guests: {guests}</div>
                </div>

                {hasAmenityFee && (
                  <button className="amenity-confirm__row-card" onClick={() => setShowFeeReceipt(true)}>
                    <img src={invoiceIcon} alt="" className="amenity-confirm__row-icon" />
                    <span className="amenity-confirm__row-text">Reservation Fee Receipt</span>
                    <svg width="7" height="13" viewBox="0 0 7 13" fill="none" className="amenity-confirm__row-chevron">
                      <path d="M1 1l5 5.5L1 12" stroke="#fff8ea" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                    </svg>
                  </button>
                )}
                {hasDeposit && (
                  <button className="amenity-confirm__row-card" onClick={() => setShowDepositDetail(true)}>
                    <img src={depositIcon} alt="" className="amenity-confirm__row-icon" />
                    <span className="amenity-confirm__row-text">Security Deposit Hold</span>
                    <svg width="7" height="13" viewBox="0 0 7 13" fill="none" className="amenity-confirm__row-chevron">
                      <path d="M1 1l5 5.5L1 12" stroke="#fff8ea" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                    </svg>
                  </button>
                )}

                <div className="amenity-confirm__contact-card">
                  <div className="amenity-confirm__contact-row">
                    <LocationIcon />
                    <span className="amenity-confirm__contact-text">{amenity.address}</span>
                  </div>
                  <div className="amenity-confirm__divider" />
                  <div className="amenity-confirm__contact-row">
                    <img src={phoneIcon} alt="" className="amenity-confirm__contact-icon" />
                    <span className="amenity-confirm__contact-text">{amenity.phone}</span>
                  </div>
                  <div className="amenity-confirm__divider" />
                  <div className="amenity-confirm__contact-row">
                    <img src={attachmentIcon} alt="" className="amenity-confirm__contact-icon" />
                    <span className="amenity-confirm__contact-text">{amenity.rules}</span>
                  </div>
                </div>

                <button className="amenity-confirm__share-btn">SHARE RESERVATION</button>
                <button className="amenity-confirm__calendar-btn">ADD TO CALENDAR</button>
              </div>
            </div>
          ) : (
          <>
          <div className="amenity-pay-portal__header">
            <div className="amenity-hours-panel__header">
              <button className="amenity-hours-panel__back" onClick={() => setShowPayment(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18l-6-6 6-6" stroke="#fff8ea" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="amenity-hours-panel__title">Back</span>
              </button>
              <button className="amenity-detail__close amenity-hours-panel__close" onClick={popResidentView}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="13" stroke="#fff8ea" strokeWidth="1.4" fill="rgba(0,0,0,0.35)" />
                  <path d="M9.5 9.5l9 9M18.5 9.5l-9 9" stroke="#fff8ea" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="amenity-detail__info-divider" />
          </div>

          <div className="amenity-pay-portal__body">
            {timeLeft !== null && (
              <div className="amenity-pay-timer">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                  <circle cx="7" cy="7" r="6.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
                  <path d="M7 4v3.5l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>We can only hold this slot for the next <strong>{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</strong> — please complete your reservation.</span>
              </div>
            )}
            {/* ── Payment ── */}
            <div className="amenity-pay-view">
                {/* Reservation summary card */}
                <p className="amenity-detail__section-label">RESERVATION SUMMARY</p>
                <div className="amenity-pay-summary-card">
                  <img src={calendarCheckIcon} alt="" className="amenity-pay-summary-card__icon" />
                  <div className="amenity-pay-summary-card__info">
                    <div className="amenity-pay-summary-card__name">{amenity.name}</div>
                    {selectedCourt && <div className="amenity-pay-summary-card__court">{selectedCourt.name}</div>}
                    <div className="amenity-pay-summary-card__date">
                      {date}{selectedStart ? ` · ${selectedStart}` : ''}{selectedEnd ? ` – ${selectedEnd}` : ''}
                    </div>
                    <div className="amenity-pay-summary-card__guests">Guests: {guests}</div>
                  </div>
                </div>

                {/* Amount due */}
                {hasAmenityFee && (
                  <>
                    <p className="amenity-detail__section-label amenity-pay__section-label">AMOUNT DUE TODAY</p>
                    <div className="amenity-pay-breakdown">
                      <div className="amenity-pay-row">
                        <span className="amenity-pay-row__label">Amenity Fee</span>
                        <span className="amenity-pay-row__value">{fmt(amenityFee)}</span>
                      </div>
                      <div className="amenity-pay-divider" />
                      <div className="amenity-pay-row">
                        <span className="amenity-pay-row__label">
                          Transaction Fee{paymentMethod === 'ach' ? ' ($1.00 flat)' : paymentMethod ? ' (3.5%)' : ''}
                        </span>
                        <span className={`amenity-pay-row__value${!paymentMethod ? ' amenity-pay-row__value--dim' : ''}`}>
                          {paymentMethod ? fmt(txFee) : '—'}
                        </span>
                      </div>
                      <div className="amenity-pay-divider amenity-pay-divider--strong" />
                      <div className="amenity-pay-row amenity-pay-row--total">
                        <span className="amenity-pay-row__label">Total Due Today</span>
                        <span className="amenity-pay-row__value">{paymentMethod ? fmt(totalDue) : '—'}</span>
                      </div>
                    </div>
                  </>
                )}

                {/* Security deposit */}
                {hasDeposit && (
                  <>
                    <p className="amenity-detail__section-label amenity-pay__section-label">SECURITY DEPOSIT</p>
                    <div className="amenity-pay-deposit-card">
                      <div className="amenity-pay-deposit-card__top">
                        <span className="amenity-pay-deposit-card__label">Hold Amount</span>
                        <span className="amenity-pay-deposit-card__amount">{fmt(amenity.deposit)}</span>
                      </div>
                      <p className="amenity-pay-deposit-card__note">
                        This hold will be released once the amenity has been inspected and confirmed to be in the same condition it was received.
                      </p>
                    </div>
                  </>
                )}

                {/* Payment method */}
                {requiresPayment && (
                  <>
                    <p className="amenity-detail__section-label amenity-pay__section-label">SELECT PAYMENT METHOD</p>
                    <div className="amenity-pay-selected-method" onClick={() => setShowMethodSelector(true)}>
                      <div className="amenity-pay-selected-method__icon">
                        <MethodIcon type={selectedMethod?.type} logo={selectedMethod?.logo} />
                      </div>
                      <div className="amenity-pay-selected-method__info">
                        <span className="amenity-pay-selected-method__name">{selectedMethod?.label || 'Select method'}</span>
                        <span className="amenity-pay-selected-method__sub">{selectedMethod?.sub}</span>
                      </div>
                      <SwitchPayIcon />
                    </div>
                  </>
                )}

                <button
                  className={`amenity-pay-cta${canPay ? ' amenity-pay-cta--active' : ''}`}
                  onClick={() => canPay && setConfirmed(true)}
                >
                  {requiresPayment ? 'PAY & RESERVE NOW' : 'RESERVE NOW'}
                </button>
              </div>
          </div>
          </>
          )}

          {/* Booking Fee screen */}
          {confirmed && showFeeReceipt && (
            <div className="res-fee-screen">
              <div className="amenity-confirm">
                <div className="amenity-confirm__photo-wrap">
                  <img src={amenity.img} alt="" className="amenity-confirm__photo" />
                  <div className="amenity-confirm__photo-gradient" />
                  <button className="res-fee-screen__back" onClick={() => setShowFeeReceipt(false)}>
                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                      <path d="M7 1L1 7l6 6" stroke="#fff8ea" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Back</span>
                  </button>
                  <button className="amenity-confirm__close" onClick={() => setShowFeeReceipt(false)}>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <circle cx="14" cy="14" r="13" stroke="#fff8ea" strokeWidth="1.4" fill="rgba(0,0,0,0.35)" />
                      <path d="M9.5 9.5l9 9M18.5 9.5l-9 9" stroke="#fff8ea" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </button>
                  <div className="amenity-confirm__icon-ring">
                    <img src={invoiceIcon} alt="" className="amenity-confirm__icon" />
                  </div>
                </div>
                <div className="amenity-confirm__body">
                  <div className="amenity-confirm__main-card">
                    <h2 className="amenity-confirm__title">Booking Fee</h2>
                    <div className="amenity-confirm__sep" />
                    <div className="res-fee-screen__row">
                      <span className="res-fee-screen__row-label">Amenity Fee</span>
                      <span className="res-fee-screen__row-value">{fmt(amenityFee)}</span>
                    </div>
                    <div className="res-fee-screen__divider" />
                    <div className="res-fee-screen__row">
                      <div>
                        <span className="res-fee-screen__row-label">Administrative Fee</span>
                        <p className="res-fee-screen__row-sub">Credit Card 3.5%</p>
                      </div>
                      <span className="res-fee-screen__row-value">{fmt(txFee)}</span>
                    </div>
                    <div className="res-fee-screen__divider res-fee-screen__divider--strong" />
                    <div className="res-fee-screen__total-row">
                      <span className="res-fee-screen__total-label">Total</span>
                      <span className="res-fee-screen__total-value">{fmt(totalDue)}</span>
                    </div>
                  </div>
                  <button className="res-fee-screen__download-btn">DOWNLOAD RECEIPT</button>
                </div>
              </div>
            </div>
          )}

          {/* Security Deposit screen */}
          {confirmed && showDepositDetail && (
            <div className="res-fee-screen">
              <div className="amenity-confirm">
                <div className="amenity-confirm__photo-wrap">
                  <img src={amenity.img} alt="" className="amenity-confirm__photo" />
                  <div className="amenity-confirm__photo-gradient" />
                  <button className="res-fee-screen__back" onClick={() => setShowDepositDetail(false)}>
                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                      <path d="M7 1L1 7l6 6" stroke="#fff8ea" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Back</span>
                  </button>
                  <button className="amenity-confirm__close" onClick={() => setShowDepositDetail(false)}>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <circle cx="14" cy="14" r="13" stroke="#fff8ea" strokeWidth="1.4" fill="rgba(0,0,0,0.35)" />
                      <path d="M9.5 9.5l9 9M18.5 9.5l-9 9" stroke="#fff8ea" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </button>
                  <div className="amenity-confirm__icon-ring">
                    <img src={depositIcon} alt="" className="amenity-confirm__icon" />
                  </div>
                </div>
                <div className="amenity-confirm__body">
                  <div className="amenity-confirm__main-card">
                    <h2 className="amenity-confirm__title">Security Deposit</h2>
                    <div className="amenity-confirm__sep" />
                    <div className="res-fee-screen__row">
                      <span className="res-fee-screen__row-label">Amenity Fee</span>
                      <span className="res-fee-screen__row-value">{fmt(amenity.deposit)}</span>
                    </div>
                    <div className="res-fee-screen__divider" />
                    <div className="res-fee-screen__row">
                      <span className="res-fee-screen__row-label">Administrative Fee</span>
                      <span className="res-fee-screen__row-value">{fmt(0)}</span>
                    </div>
                    <div className="res-fee-screen__divider res-fee-screen__divider--strong" />
                    <div className="res-fee-screen__total-row">
                      <span className="res-fee-screen__total-label">Total</span>
                      <span className="res-fee-screen__total-value">{fmt(amenity.deposit)}</span>
                    </div>
                  </div>
                  <p className="res-fee-screen__deposit-note">
                    Following your reservation, the condition of the amenity will be evaluated. Based on the results of this inspection, your security deposit may be released in full, partially charged, or charged in full.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>,
        document.querySelector('.phone-frame') || document.body
      )}

      {/* Payment method selector portal */}
      {showMethodSelector && createPortal(
        <div className="amenity-method-sel">
          <div className="amenity-method-sel__header">
            <div className="amenity-hours-panel__header">
              <button className="amenity-hours-panel__back" onClick={() => setShowMethodSelector(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18l-6-6 6-6" stroke="#fff8ea" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="amenity-hours-panel__title">Back</span>
              </button>
              <button className="amenity-detail__close amenity-hours-panel__close" aria-label="Close" onClick={popResidentView}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="13" stroke="#fff8ea" strokeWidth="1.4" fill="rgba(0,0,0,0.35)" />
                  <path d="M9.5 9.5l9 9M18.5 9.5l-9 9" stroke="#fff8ea" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
          <div className="amenity-method-sel__body">
            <p className="amenity-detail__section-label" style={{ marginBottom: 10 }}>AVAILABLE PAYMENT METHODS</p>
            <div className="amenity-method-sel__list">
              {availableMethods.map((m, i) => (
                <button
                  key={m.id}
                  className="amenity-method-sel__row"
                  onClick={() => { setSelectedMethodId(m.id); setShowMethodSelector(false) }}
                >
                  <div className="amenity-method-sel__icon"><MethodIcon type={m.type} logo={m.logo} /></div>
                  <div className="amenity-method-sel__info">
                    <span className="amenity-method-sel__label">{m.label}</span>
                    <span className="amenity-method-sel__sub">{m.sub}</span>
                  </div>
                  <div className={`amenity-method-sel__radio${m.id === selectedMethodId ? ' amenity-method-sel__radio--active' : ''}`}>
                    {m.id === selectedMethodId && <div className="amenity-method-sel__radio-dot" />}
                  </div>
                </button>
              ))}
            </div>

            <p className="amenity-detail__section-label" style={{ marginTop: 28, marginBottom: 10 }}>ADD PAYMENT METHOD</p>
            <div className="amenity-method-sel__list">
              <button className="amenity-method-sel__row">
                <div className="amenity-method-sel__icon"><PayCardIcon /></div>
                <div className="amenity-method-sel__info">
                  <span className="amenity-method-sel__label">New Debit/Credit Card</span>
                  <span className="amenity-method-sel__sub">Amex, Discover, Mastercard, Visa</span>
                </div>
                <ChevronRightIcon />
              </button>
              <button className="amenity-method-sel__row">
                <div className="amenity-method-sel__icon"><img src={bankIcon} alt="Bank" className="amenity-method-sel__brand-img amenity-method-sel__brand-img--bank" /></div>
                <div className="amenity-method-sel__info">
                  <span className="amenity-method-sel__label">New Bank Account</span>
                  <span className="amenity-method-sel__sub">E-check/ACH</span>
                </div>
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        </div>,
        document.querySelector('.phone-frame') || document.body
      )}

      {/* Disclosure Agreement portal */}
      {showDisclosure && createPortal(
        <div className="amenity-disclosure-overlay">
          <div className="amenity-disclosure-modal">
            <button className="amenity-disclosure-modal__close" onClick={() => setShowDisclosure(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="11" fill="rgba(0,0,0,0.25)" stroke="rgba(255,248,234,0.3)" strokeWidth="1" />
                <path d="M8.5 8.5l7 7M15.5 8.5l-7 7" stroke="#fff8ea" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <p className="amenity-disclosure-modal__label">DISCLOSURE AGREEMENT</p>
            <div className="amenity-disclosure-modal__sep" />

            <div className="amenity-disclosure-modal__body-wrap">
              <div
                className="amenity-disclosure-modal__body"
                onScroll={e => {
                  const el = e.currentTarget
                  const fade = el.parentElement?.querySelector('.amenity-disclosure-modal__body-fade')
                  if (fade) fade.style.opacity = el.scrollTop + el.clientHeight >= el.scrollHeight - 2 ? '0' : '1'
                }}
              >
                {amenity.disclosureText.split('\n\n').map((para, i) => (
                  <p key={i} className="amenity-disclosure-modal__para">{para}</p>
                ))}
                {amenity.disclosureRules?.length > 0 && (
                  <>
                    <p className="amenity-disclosure-modal__rules-title">Pool Rules</p>
                    <ul className="amenity-disclosure-modal__rules-list">
                      {amenity.disclosureRules.map((rule, i) => (
                        <li key={i} className="amenity-disclosure-modal__rule">{rule}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
              <div className="amenity-disclosure-modal__body-fade" />
            </div>

            <div className="amenity-disclosure-modal__sep" />

            <div className="amenity-disclosure-modal__footer">
              <button
                className="amenity-disclosure-modal__pdf-link"
                onClick={() => { setShowDisclosure(false); setShowPdf(true) }}
              >
                <img src={attachmentIcon} alt="" style={{ width: 18, height: 18 }} />
                <span>{amenity.rules}</span>
              </button>
              <label className="amenity-disclosure-modal__checkbox-row">
                <input
                  type="checkbox"
                  className="amenity-disclosure-modal__checkbox"
                  checked={disclosureAgreed}
                  onChange={e => setDisclosureAgreed(e.target.checked)}
                />
                <span className="amenity-disclosure-modal__checkbox-label">
                  I have read and agree to the above disclaimer
                </span>
              </label>
              <button
                className={`amenity-disclosure-modal__cta${disclosureAgreed ? ' amenity-disclosure-modal__cta--active' : ''}`}
                onClick={() => { if (disclosureAgreed) { setShowDisclosure(false) } }}
              >
                CONTINUE
              </button>
            </div>
          </div>
        </div>,
        document.querySelector('.amenity-detail-backdrop') || document.body
      )}

      {/* Calendar portal — absolute overlay inside the sheet */}
      {showCalendar && createPortal(
        <div className="amenity-cal-portal">
          <div className="amenity-cal-portal__header">
            <div className="amenity-hours-panel__header">
              <button className="amenity-hours-panel__back" onClick={() => setShowCalendar(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18l-6-6 6-6" stroke="#fff8ea" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="amenity-hours-panel__title">Back</span>
              </button>
              <button className="amenity-detail__close amenity-hours-panel__close" aria-label="Close" onClick={popResidentView}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="13" stroke="#fff8ea" strokeWidth="1.4" fill="rgba(0,0,0,0.35)" />
                  <path d="M9.5 9.5l9 9M18.5 9.5l-9 9" stroke="#fff8ea" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="amenity-detail__info-divider" />
          </div>
          <div className="amenity-cal-portal__body">
            <AmenityCalendarPicker
              selectedDate={calDate}
              onDateSelect={handleDateSelect}
            />
          </div>
        </div>,
        document.querySelector('.phone-frame') || document.body
      )}
    </div>
  )
}
