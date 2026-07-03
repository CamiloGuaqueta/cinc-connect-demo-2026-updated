import { useState, useMemo } from 'react'
import { useMode } from '../ModeContext'
import filterIcon from '../ICONS/filter.svg?raw'
import './ResidentCalendar.css'

const TODAY = '2026-05-04'
let _lastCalView = 'list'

export const CATEGORIES = [
  { name: 'Board Of Directors', color: '#7B5EA7' },
  { name: 'Community Calendar', color: '#E8A020' },
  { name: 'Trash Pickup',       color: '#E06030' },
]

const EVENTS = [
  { id: 1,  title: 'May Board Of Directors Meeting', category: 'Board Of Directors', location: 'Clubhouse',     date: '2026-05-04', start: '12:00 PM', end: '3:00 PM',  image: 'https://picsum.photos/seed/boardroom1/800/400', description: 'Monthly Board of Directors meeting covering financial updates, community projects, and homeowner compliance matters.' },
  { id: 2,  title: 'Pool Party',                     category: 'Community Calendar', location: 'Pool Area',     date: '2026-05-04', start: '4:00 PM',  end: '7:00 PM',  image: 'https://picsum.photos/seed/poolparty2/800/400', description: 'Community pool party! Enjoy warm weather with your neighbors. Drinks and snacks will be provided.' },
  { id: 3,  title: 'Trash Day',                      category: 'Trash Pickup',       location: 'Curbside',      date: '2026-05-06', start: '7:00 AM',  end: '9:00 AM',  image: 'https://picsum.photos/seed/street3/800/400', recurrenceId: 'trash-weekly', description: 'Regular trash and recycling pickup. Please have all bins at the curb by 7:00 AM.' },
  { id: 4,  title: 'Spring Mixer',                   category: 'Community Calendar', location: 'Clubhouse',     date: '2026-05-08', start: '4:00 PM',  end: '7:00 PM',  image: 'https://picsum.photos/seed/socialparty4/800/400', description: 'Annual spring mixer! Join your neighbors for food, drinks, and great conversation at the clubhouse.' },
  { id: 5,  title: 'Tennis Club',                    category: 'Community Calendar', location: 'Tennis Courts', date: '2026-05-10', start: '9:00 AM',  end: '11:00 AM', image: 'https://picsum.photos/seed/tennis5/800/400', recurrenceId: 'tennis-weekly', description: 'Weekly tennis club open to all skill levels. Rackets available to borrow at the front desk.' },
  { id: 6,  title: 'May Committee Meeting',          category: 'Board Of Directors', location: 'https://meeting.zoom.com/678iiuy67989', date: '2026-05-12', start: '6:00 PM',  end: '7:30 PM',  image: 'https://picsum.photos/seed/meeting6/800/400', description: 'Landscaping and maintenance committee meeting. Zoom link will be sent to all registered attendees.' },
  { id: 7,  title: 'Trash Day',                      category: 'Trash Pickup',       location: 'Curbside',      date: '2026-05-13', start: '7:00 AM',  end: '9:00 AM',  image: 'https://picsum.photos/seed/street3/800/400', recurrenceId: 'trash-weekly', description: 'Regular trash and recycling pickup. Please have all bins at the curb by 7:00 AM.' },
  { id: 8,  title: 'Movie Night',                    category: 'Community Calendar', location: 'Clubhouse',     date: '2026-05-15', start: '7:00 PM',  end: '10:00 PM', image: 'https://picsum.photos/seed/cinema8/800/400', description: 'Community movie night at the clubhouse. Popcorn and refreshments provided. Movie selection TBD.' },
  { id: 9,  title: 'Trash Day',                      category: 'Trash Pickup',       location: 'Curbside',      date: '2026-05-20', start: '7:00 AM',  end: '9:00 AM',  image: 'https://picsum.photos/seed/street3/800/400', recurrenceId: 'trash-weekly', description: 'Regular trash and recycling pickup. Please have all bins at the curb by 7:00 AM.' },
  { id: 10, title: 'Memorial Day BBQ',               category: 'Community Calendar', location: 'Pool Area',     date: '2026-05-25', start: '12:00 PM', end: '4:00 PM',  image: 'https://picsum.photos/seed/bbq10/800/400', description: 'Annual Memorial Day BBQ celebration at the pool. Free for all residents. RSVP to the community manager by May 22.' },
  { id: 11, title: 'Trash Day',                      category: 'Trash Pickup',       location: 'Curbside',      date: '2026-05-27', start: '7:00 AM',  end: '9:00 AM',  image: 'https://picsum.photos/seed/street3/800/400', recurrenceId: 'trash-weekly', description: 'Regular trash and recycling pickup. Please have all bins at the curb by 7:00 AM.' },
  { id: 12, title: 'Summer Kick-off Party',          category: 'Community Calendar', location: 'Pool Area',     date: '2026-06-06', start: '3:00 PM',  end: '7:00 PM',  image: 'https://picsum.photos/seed/summer12/800/400', description: 'Welcome summer with a poolside celebration! DJ, food trucks, and activities for kids and adults alike.' },
  { id: 13, title: 'June Board Meeting',             category: 'Board Of Directors', location: 'Clubhouse',     date: '2026-06-08', start: '5:30 PM',  end: '7:30 PM',  image: 'https://picsum.photos/seed/boardroom1/800/400', description: 'Monthly Board of Directors meeting. Agenda includes reserve fund review and summer maintenance schedule.' },
]

function getCatColor(categoryName) {
  return CATEGORIES.find(c => c.name === categoryName)?.color ?? '#888'
}

function formatDateHeader(dateStr) {
  const d = new Date(dateStr + 'T12:00:00')
  if (dateStr === TODAY) {
    return `Today (${d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })})`
  }
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
}

/* ── Main Calendar Screen ─────────────────────────────── */
export function ResidentCalendar() {
  const { pushResidentView } = useMode()
  const [view,             setView]             = useState(_lastCalView)
  const [filterOpen,       setFilterOpen]       = useState(false)
  const [activeCats,       setActiveCats]       = useState(new Set(CATEGORIES.map(c => c.name)))
  const [search,           setSearch]           = useState('')
  const [startDate,        setStartDate]        = useState('')
  const [endDate,          setEndDate]          = useState('')
  const [calMonth,         setCalMonth]         = useState(new Date(2026, 4, 1))
  const [selectedDate,     setSelectedDate]     = useState(TODAY)

  const filteredEvents = useMemo(() => {
    return EVENTS.filter(e => {
      if (!activeCats.has(e.category)) return false
      if (search && !e.title.toLowerCase().includes(search.toLowerCase())) return false
      if (startDate && e.date < startDate) return false
      if (endDate && e.date > endDate) return false
      if (!startDate && !endDate && e.date < TODAY) return false
      return true
    }).sort((a, b) => a.date !== b.date ? a.date.localeCompare(b.date) : a.start.localeCompare(b.start))
  }, [activeCats, search, startDate, endDate])

  function handleEventTap(event) {
    pushResidentView('event-detail', event)
  }

  function handleDateTap(dateStr) {
    setSelectedDate(dateStr)
  }

  function toggleCat(name) {
    setActiveCats(prev => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  return (
    <div className="screen resident-calendar">
      <div className="cal-scroll-content">
        <h1 className="resident-calendar__title">Community Calendar</h1>

        {/* View tabs */}
        <div className="cal-tab-nav">
          <button
            className={`cal-tab${view === 'list' ? ' cal-tab--active' : ''}`}
            onClick={() => { setView('list'); _lastCalView = 'list' }}
          >List View</button>
          <button
            className={`cal-tab${view === 'calendar' ? ' cal-tab--active' : ''}`}
            onClick={() => { setView('calendar'); _lastCalView = 'calendar' }}
          >Calendar View</button>
        </div>

        {/* Search + filter row */}
        <div className="cal-toolbar">
          <div className="cal-search">
            <input
              type="text"
              className="cal-search__input"
              placeholder="Search Events"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search
              ? <button className="cal-search__clear" onClick={() => setSearch('')} aria-label="Clear">×</button>
              : <CalSearchIcon />
            }
          </div>
          <button className="cal-filter-btn" onClick={() => setFilterOpen(true)} aria-label="Filter">
            <span className="filter-svg-icon" dangerouslySetInnerHTML={{__html: filterIcon}} />
          </button>
        </div>

        {/* Content */}
        {view === 'list' ? (
          <ListView events={filteredEvents} onEventTap={handleEventTap} />
        ) : (
          <>
            <CalendarMonthView
              month={calMonth}
              allEvents={EVENTS.filter(e => activeCats.has(e.category))}
              selectedDate={selectedDate}
              onPrev={() => setCalMonth(m => new Date(m.getFullYear(), m.getMonth() - 1, 1))}
              onNext={() => setCalMonth(m => new Date(m.getFullYear(), m.getMonth() + 1, 1))}
              onDateTap={handleDateTap}
              onSetMonth={(yr, mo) => setCalMonth(new Date(yr, mo, 1))}
            />
            {selectedDate && (
              <SelectedDayEvents
                date={selectedDate}
                events={EVENTS.filter(e => e.date === selectedDate && activeCats.has(e.category))}
                onEventTap={handleEventTap}
              />
            )}
          </>
        )}
      </div>

      {/* Filter panel — outside scroll area so overlay covers full screen */}
      {filterOpen && (
        <FilterPanel
          activeCats={activeCats}
          startDate={startDate}
          endDate={endDate}
          onApply={({ cats, startDate: sd, endDate: ed }) => {
            setActiveCats(cats)
            setStartDate(sd)
            setEndDate(ed)
            setFilterOpen(false)
          }}
          onClose={() => setFilterOpen(false)}
        />
      )}
    </div>
  )
}

/* ── List View ────────────────────────────────────────── */
function ListView({ events, onEventTap }) {
  if (events.length === 0) {
    return <p className="cal-empty">No upcoming events match your filters.</p>
  }

  const groups = []
  let current = null
  events.forEach(e => {
    if (!current || current.date !== e.date) {
      current = { date: e.date, events: [] }
      groups.push(current)
    }
    current.events.push(e)
  })

  return (
    <div className="cal-list">
      {groups.map(g => (
        <div key={g.date} className="cal-group">
          <p className="cal-group__date">{formatDateHeader(g.date)}</p>
          {g.events.map(e => (
            <EventCard key={e.id} event={e} onTap={() => onEventTap(e)} />
          ))}
        </div>
      ))}
    </div>
  )
}

/* ── Event Card (list view) ───────────────────────────── */
function EventCard({ event, onTap }) {
  return (
    <button className="cal-card" onClick={onTap}>
      <div className="cal-card__time">
        <span>{event.start}</span>
        <span>{event.end}</span>
      </div>
      <div className="cal-card__divider" />
      <div className="cal-card__main">
        <div className="cal-card__title-row">
          <span className="cal-card__title">{event.title}</span>
          {event.recurrenceId && <span className="cal-recur-badge"><RepeatIcon /></span>}
        </div>
        <span className="cal-tag" style={{ backgroundColor: getCatColor(event.category) }}>
          {event.category}
        </span>
      </div>
    </button>
  )
}

/* ── Calendar Month View ──────────────────────────────── */
const DOW = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December']

/* ── Selected Day Events ──────────────────────────────── */
function SelectedDayEvents({ date, events, onEventTap }) {
  const label = date ? formatDateHeader(date) : ''
  return (
    <div className="cal-day-events">
      <p className="cal-group__date">{label}</p>
      {events.length === 0
        ? <p className="cal-empty" style={{ marginTop: 12 }}>No events on this day.</p>
        : <div className="cal-list" style={{ gap: 10 }}>
            {events.map(e => (
              <EventCard key={e.id} event={e} onTap={() => onEventTap(e)} />
            ))}
          </div>
      }
    </div>
  )
}

function CalendarMonthView({ month, allEvents, selectedDate, onPrev, onNext, onDateTap, onSetMonth }) {
  const [yearView,     setYearView]     = useState(false)
  const [yearViewYear, setYearViewYear] = useState(() => month.getFullYear())

  const yr  = month.getFullYear()
  const mo  = month.getMonth()

  function openYearView() {
    setYearViewYear(yr)
    setYearView(true)
  }

  function selectMonth(y, m) {
    onSetMonth(y, m)
    setYearView(false)
  }

  if (yearView) {
    const todayDate = new Date(TODAY + 'T12:00:00')
    const todayYr = todayDate.getFullYear()
    const todayMo = todayDate.getMonth()
    return (
      <div className="cal-month">
        <div className="cal-month__nav">
          <button className="cal-month__arrow" onClick={() => setYearViewYear(y => y - 1)}>‹</button>
          <span className="cal-month__label">{yearViewYear}</span>
          <button className="cal-month__arrow" onClick={() => setYearViewYear(y => y + 1)}>›</button>
        </div>
        <div className="cal-year-grid">
          {MONTH_NAMES.map((name, idx) => {
            const isToday   = todayYr === yearViewYear && todayMo === idx
            const isCurrent = yr === yearViewYear && mo === idx && !isToday
            return (
              <button
                key={idx}
                className={`cal-year-cell${isToday ? ' cal-year-cell--today' : ''}${isCurrent ? ' cal-year-cell--current' : ''}`}
                onClick={() => selectMonth(yearViewYear, idx)}
              >
                {name.slice(0, 3)}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  const firstDow    = new Date(yr, mo, 1).getDay()
  const daysInMonth = new Date(yr, mo + 1, 0).getDate()

  const byDay = {}
  allEvents.forEach(e => {
    const d = new Date(e.date + 'T12:00:00')
    if (d.getFullYear() === yr && d.getMonth() === mo) {
      const day = d.getDate()
      if (!byDay[day]) byDay[day] = []
      byDay[day].push(e)
    }
  })

  const cells = Array(firstDow).fill(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <div className="cal-month">
      <div className="cal-month__nav">
        <button className="cal-month__arrow" onClick={onPrev}>‹</button>
        <button className="cal-month__label-btn" onClick={openYearView}>{MONTH_NAMES[mo]} {yr}</button>
        <button className="cal-month__arrow" onClick={onNext}>›</button>
      </div>
      <div className="cal-dow-row">
        {DOW.map((d, i) => <span key={i} className="cal-dow">{d}</span>)}
      </div>
      <div className="cal-grid">
        {cells.map((day, i) => {
          if (!day) return <div key={`e${i}`} className="cal-cell cal-cell--empty" />
          const ds = `${yr}-${String(mo + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`
          const dayEvents = byDay[day] || []
          const cats = [...new Set(dayEvents.map(e => e.category))].slice(0, 3)
          return (
            <button
              key={day}
              className={`cal-cell${ds === TODAY ? ' cal-cell--today' : ''}${ds < TODAY ? ' cal-cell--past' : ''}${dayEvents.length ? ' cal-cell--has-events' : ''}${ds === selectedDate ? ' cal-cell--selected' : ''}`}
              onClick={() => onDateTap(ds)}
            >
              <span className="cal-cell__num">{day}</span>
              {cats.length > 0 && (
                <div className="cal-cell__dots">
                  {cats.map(c => <span key={c} className="cal-dot" style={{ background: getCatColor(c) }} />)}
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ── Day List (multiple events on a calendar date) ────── */
export function ResidentDayList({ date, events }) {
  const { pushResidentView } = useMode()
  const d = new Date(date + 'T12:00:00')
  const label = d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
  return (
    <div className="screen resident-calendar">
      <h1 className="resident-calendar__title">{label}</h1>
      <div className="cal-list">
        <div className="cal-group">
          {events.map(e => (
            <EventCard key={e.id} event={e} onTap={() => pushResidentView('event-detail', e)} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Event Detail ─────────────────────────────────────── */
export function ResidentEventDetail({ event }) {
  const [notifOn, setNotifOn] = useState(true)
  const [scopeSheet, setScopeSheet] = useState(false)
  const catColor = getCatColor(event.category)

  function handleToggle() {
    if (notifOn) {
      setScopeSheet(true)
    } else {
      setNotifOn(true)
    }
  }

  function applyScope() {
    setScopeSheet(false)
    setNotifOn(false)
  }

  return (
    <div className="screen event-detail">
      <div className="event-detail__scroll">
        <div className="event-detail__content">
          <span className="cal-tag" style={{ backgroundColor: catColor }}>
            {event.category}
          </span>
          <h1 className="event-detail__title">{event.title}</h1>

          {event.image
            ? <img src={event.image} alt={event.title} className="event-detail__image" />
            : <div className="event-detail__image-placeholder" style={{ background: `linear-gradient(135deg, ${catColor}22 0%, ${catColor}55 100%)`, borderLeft: `3px solid ${catColor}` }} />
          }

          <div className="event-detail__meta">
            <div className="event-detail__meta-row">
              <CalendarIcon />
              <span>{new Date(event.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="event-detail__meta-row">
              <ClockIcon />
              <span>{event.start} – {event.end}</span>
            </div>
            <div className="event-detail__meta-row event-detail__meta-row--top">
              <LocationIcon />
              {detectConference(event.location)
                ? (() => {
                    const conf = detectConference(event.location)
                    return (
                      <div className="event-detail__conf-meta">
                        <span className="event-detail__conf-meta-name">{conf.name}</span>
                        <div className="event-detail__conf-meta-link">
                          <span className="event-detail__conf-link">{event.location}</span>
                          <button
                            className="event-detail__conf-copy"
                            onClick={() => navigator.clipboard.writeText(event.location)}
                            title="Copy link"
                          >
                            <CopyIcon />
                          </button>
                        </div>
                      </div>
                    )
                  })()
                : <span>{event.location}</span>
              }
            </div>
            {event.recurrenceId && (
              <div className="event-detail__meta-row">
                <RepeatIcon />
                <span>Recurring event</span>
              </div>
            )}
          </div>

          <p className="event-detail__description">{event.description}</p>

          <div className="event-detail__meta event-detail__notif-row">
            <BellIcon muted={!notifOn} />
            <span className="event-detail__notif-label">
              {notifOn ? 'Notifications on' : 'Notifications off'}
            </span>
            <button
              className={`event-detail__toggle${notifOn ? ' event-detail__toggle--on' : ''}`}
              onClick={handleToggle}
              aria-label="Toggle notifications"
            >
              <span className="event-detail__toggle-thumb" />
            </button>
          </div>

          {detectConference(event.location) && (() => {
            const conf = detectConference(event.location)
            return (
              <div className="event-detail__conf-block">
                <button
                  className="event-detail__action-btn"
                  style={{ background: conf.color }}
                  onClick={() => window.open(event.location, '_blank')}
                >
                  <VideoIcon />
                  Join {conf.name}
                </button>
              </div>
            )
          })()}

          <button className="event-detail__action-btn event-detail__action-btn--cal" onClick={() => addToCalendar(event)}>
            <CalendarAddIcon />
            Add to Personal Calendar
          </button>
        </div>
      </div>

      {scopeSheet && (
        <NotifScopeSheet
          event={event}
          onApply={applyScope}
          onCancel={() => setScopeSheet(false)}
        />
      )}
    </div>
  )
}

function NotifScopeSheet({ event, onApply, onCancel }) {
  return (
    <>
      <div className="filter-scrim" onClick={onCancel} />
      <div className="filter-sheet event-detail__scope-sheet">
        <div className="filter-sheet__handle" />
        <button className="event-detail__scope-close" onClick={onCancel} aria-label="Close">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="1.5"/>
            <line x1="9.5" y1="9.5" x2="18.5" y2="18.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="18.5" y1="9.5" x2="9.5" y2="18.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
        <p className="event-detail__scope-title">Turn off notifications for</p>
        <p className="event-detail__scope-sub">"{event.title}"</p>
        <div className="event-detail__scope-options">
          <button className="event-detail__scope-btn" onClick={onApply}>
            <span className="event-detail__scope-btn-label">This event only</span>
            <span className="event-detail__scope-btn-sub">Only this occurrence</span>
          </button>
          {event.recurrenceId && <>
            <div className="divider" />
            <button className="event-detail__scope-btn" onClick={onApply}>
              <span className="event-detail__scope-btn-label">All future occurrences</span>
              <span className="event-detail__scope-btn-sub">This and all upcoming repeats</span>
            </button>
          </>}
          <div className="divider" />
          <button className="event-detail__scope-btn" onClick={onApply}>
            <span className="event-detail__scope-btn-label">All "{event.category}" events</span>
            <span className="event-detail__scope-btn-sub">Turn off for the entire category</span>
          </button>
        </div>
        <button className="filter-clear" onClick={onCancel}>Cancel</button>
      </div>
    </>
  )
}

/* ── Video conference detection ──────────────────────── */
const CONFERENCE_PROVIDERS = [
  { match: /zoom/i,         name: 'Zoom',          color: '#2D8CFF' },
  { match: /teams/i,        name: 'Teams',         color: '#6264A7' },
  { match: /google\s*meet/i,name: 'Google Meet',   color: '#00897B' },
  { match: /\bmeet\b/i,     name: 'Google Meet',   color: '#00897B' },
  { match: /webex/i,        name: 'Webex',         color: '#00BCEB' },
  { match: /gotomeeting/i,  name: 'GoToMeeting',   color: '#F68D2E' },
  { match: /bluejeans/i,    name: 'BlueJeans',     color: '#004AAD' },
]

function detectConference(location) {
  if (!location) return null
  return CONFERENCE_PROVIDERS.find(p => p.match.test(location)) ?? null
}

/* ── Add to calendar (.ics download) ─────────────────── */
function parseTime(timeStr) {
  const [time, ampm] = timeStr.trim().split(' ')
  let [h, m] = time.split(':').map(Number)
  if (ampm === 'PM' && h !== 12) h += 12
  if (ampm === 'AM' && h === 12) h = 0
  return `${String(h).padStart(2,'0')}${String(m).padStart(2,'0')}00`
}

function addToCalendar(event) {
  const dateCompact = event.date.replace(/-/g, '')
  const dtStart = `${dateCompact}T${parseTime(event.start)}`
  const dtEnd   = `${dateCompact}T${parseTime(event.end)}`
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Cardinal Hills HOA//BOD Experience//EN',
    'BEGIN:VEVENT',
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${event.title}`,
    `LOCATION:${event.location}`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href     = url
  a.download = `${event.title.replace(/\s+/g, '-')}.ics`
  a.click()
  URL.revokeObjectURL(url)
}

/* ── Contrast helper ──────────────────────────────────── */
function contrastColor(hex) {
  const r = parseInt(hex.slice(1,3),16)/255
  const g = parseInt(hex.slice(3,5),16)/255
  const b = parseInt(hex.slice(5,7),16)/255
  const lin = c => c <= 0.03928 ? c/12.92 : ((c+0.055)/1.055)**2.4
  const L = 0.2126*lin(r) + 0.7152*lin(g) + 0.0722*lin(b)
  return L > 0.179 ? '#112719' : '#FFF8EA'
}

/* ── Filter Panel ─────────────────────────────────────── */
function FilterPanel({ activeCats, startDate, endDate, onApply, onClose }) {
  const [draftCats,      setDraftCats]      = useState(new Set(activeCats))
  const [draftStartDate, setDraftStartDate] = useState(startDate)
  const [draftEndDate,   setDraftEndDate]   = useState(endDate)

  function toggleCat(name) {
    setDraftCats(prev => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  function handleReset() {
    setDraftCats(new Set(CATEGORIES.map(c => c.name)))
    setDraftStartDate('')
    setDraftEndDate('')
  }

  return (
    <>
      <div className="filter-scrim" onClick={onClose} />
      <div className="filter-sheet">
        <div className="filter-sheet__handle" />
        <button className="event-detail__scope-close" onClick={onClose} aria-label="Close">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="1.5"/>
            <line x1="9.5" y1="9.5" x2="18.5" y2="18.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="18.5" y1="9.5" x2="9.5" y2="18.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
        <div className="filter-sheet__header">
          <span className="filter-sheet__title">Filter</span>
        </div>

        <div className="filter-section">
          <p className="filter-section__label">Date Range</p>
          <div className="filter-date-row">
            <div className="filter-date-field">
              <span className="filter-date-label">From</span>
              <input
                type="date"
                className="filter-date-input"
                value={draftStartDate}
                onChange={e => setDraftStartDate(e.target.value)}
              />
            </div>
            <div className="filter-date-field">
              <span className="filter-date-label">To</span>
              <input
                type="date"
                className="filter-date-input"
                value={draftEndDate}
                onChange={e => setDraftEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="filter-section">
          <p className="filter-section__label">Event Categories</p>
          <div className="filter-chips">
            {CATEGORIES.map(cat => {
              const isOn = draftCats.has(cat.name)
              return (
                <button
                  key={cat.name}
                  className="filter-chip"
                  onClick={() => toggleCat(cat.name)}
                  style={isOn
                    ? { background: cat.color, borderColor: cat.color, color: contrastColor(cat.color) }
                    : { background: 'transparent', borderColor: cat.color, color: cat.color }
                  }
                >
                  {cat.name}
                </button>
              )
            })}
          </div>
        </div>

        <button className="filter-apply" onClick={() => onApply({ cats: draftCats, startDate: draftStartDate, endDate: draftEndDate })}>
          Apply Filters
        </button>
        <button className="filter-clear" onClick={handleReset}>Reset to Default</button>
      </div>
    </>
  )
}

/* ── Icons ────────────────────────────────────────────── */
function CalSearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/>
    </svg>
  )
}
function CalFilterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="4" y1="6" x2="20" y2="6"/>
      <line x1="7" y1="12" x2="17" y2="12"/>
      <line x1="10" y1="18" x2="14" y2="18"/>
    </svg>
  )
}
function RepeatIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
    </svg>
  )
}
function BellIcon({ muted }) {
  return muted ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/><path d="M18.63 13A17.89 17.89 0 0 1 18 8"/><path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14"/><path d="M18 8a6 6 0 0 0-9.33-5"/><line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  )
}
function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  )
}
function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  )
}
function LocationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  )
}
function VideoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7"/>
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
    </svg>
  )
}
function CalendarAddIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
      <line x1="12" y1="14" x2="12" y2="18"/>
      <line x1="10" y1="16" x2="14" y2="16"/>
    </svg>
  )
}
function CopyIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  )
}
function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}
function CalCloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )
}
