import { useState } from 'react'
import { createPortal } from 'react-dom'
import poolImg   from '../images/Amenities/pool.jpg'
import clubImg   from '../images/Amenities/Clubhouse.jpg'
import boardImg  from '../images/board.jpg'
import roadImg   from '../images/road.jpg'
import houseImg  from '../images/house.jpg'
import soldImg   from '../images/SOLD.jpg'
import './AdditionalContentSheet.css'

/* ── Tab definitions — each opens one custom content screen ── */
const TABS = [
  {
    id: 'announcements',
    label: 'Announcements',
    Icon: AnnouncementsIcon,
    content: {
      hero: poolImg,
      title: 'Pool Renovation Update',
      tag: 'Community Update',
      lead: 'Plaster resurfacing is in progress and on schedule. Estimated completion August 15, 2026.',
      sections: [
        {
          heading: 'Milestone Status',
          table: {
            headers: ['Milestone', 'Status'],
            rows: [
              ['Pool drained', '✅  Jun 2'],
              ['Plumbing installed', '✅  Jun 18'],
              ['Plaster resurfacing', '🔄  Jul 10'],
              ['Deck & furniture', '⏳  Aug 1'],
              ['Final refill', '⏳  Aug 15'],
            ],
          },
        },
        {
          heading: 'Temporary Access',
          text: 'Clubhouse fitness center and tennis courts remain open. A splash pad is available near the playground during construction.',
        },
      ],
      links: [
        { label: 'Submit a question about the project' },
        { label: 'View full board resolution' },
      ],
    },
  },
  {
    id: 'documents',
    label: 'Documents',
    Icon: DocumentsIcon,
    content: {
      title: 'Reserve Fund Study 2026',
      tag: 'Financial Document',
      lead: 'Independent 30-year projection prepared by Benson & Associates. Current reserve balance stands at 59.4% of full funding.',
      sections: [
        {
          heading: 'Reserve Status',
          table: {
            headers: ['Metric', 'Value'],
            rows: [
              ['Current balance', '$1,247,500'],
              ['Fully funded threshold', '$2,100,000'],
              ['Percent funded', '59.4%'],
              ['Recommended monthly increase', '+$18 / unit'],
            ],
          },
        },
        {
          heading: 'Major Components Tracked',
          list: [
            'Roofing — 15-year replacement cycle',
            'Asphalt & pavement — reseal every 5 years',
            'Pool plaster & equipment',
            'Clubhouse HVAC systems',
            'Entry gate & perimeter fencing',
          ],
        },
        {
          heading: 'Funding Plan',
          text: 'The Board has adopted Plan B (moderate increase) to reach 80% funding within 10 years without a special assessment.',
        },
        { image: roadImg },
      ],
      links: [
        { label: 'Download Reserve Fund Study (PDF, 62 pages)' },
        { label: 'View 2026–2027 Approved Budget' },
      ],
    },
  },
  {
    id: 'events',
    label: 'Events',
    Icon: EventsIcon,
    content: {
      hero: clubImg,
      title: 'New Neighbor Social',
      tag: 'Upcoming Event',
      lead: 'Join us to welcome seven new families who joined Cardinal Hills this spring. Light refreshments provided. All residents welcome.',
      sections: [
        {
          heading: 'Event Details',
          table: {
            headers: ['', ''],
            rows: [
              ['Date', 'Saturday, July 19, 2026'],
              ['Time', '4:00 – 7:00 PM'],
              ['Location', 'Clubhouse Main Room'],
              ['Cost', 'Free for all residents'],
              ['RSVP', 'Appreciated, not required'],
            ],
          },
        },
        {
          heading: 'What to Expect',
          list: [
            'Informal mixer with light bites and drinks',
            'Brief welcome remarks from the Board',
            'Community resource table with HOA info',
            'Kids’ corner with activities',
          ],
        },
      ],
      links: [
        { label: 'RSVP via Community Calendar' },
      ],
    },
  },
  {
    id: 'directories',
    label: 'Directories',
    Icon: DirectoriesIcon,
    content: {
      hero: boardImg,
      title: 'Board of Directors',
      tag: 'Community Directory',
      lead: 'Cardinal Hills HOA is governed by a five-member volunteer Board of Directors elected by homeowners.',
      sections: [
        {
          heading: 'Current Board Members',
          table: {
            headers: ['Name', 'Role', 'Term Ends'],
            rows: [
              ['Sandra Kim', 'President', '2029'],
              ['Robert Vasquez', 'Vice President', '2029'],
              ['Margaret Chen', 'Treasurer', '2028'],
              ['David Torres', 'Secretary', '2027'],
              ['Linda Park', 'Member at Large', '2027'],
            ],
          },
        },
        {
          heading: 'HOA Office',
          table: {
            headers: ['', ''],
            rows: [
              ['Phone', '(512) 555-0190'],
              ['Email', 'office@cardinalhills.hoa'],
              ['Hours', 'Mon–Fri, 9 AM–5 PM'],
              ['After-Hours', '(512) 555-0199'],
            ],
          },
        },
      ],
      links: [
        { label: 'Contact the Board of Directors' },
      ],
    },
  },
  {
    id: 'resources',
    label: 'Resources',
    Icon: ResourcesIcon,
    content: {
      hero: soldImg,
      title: 'Move-In Guide for New Residents',
      tag: 'Resident Resource',
      lead: "Welcome to Cardinal Hills! Here’s everything you need to get settled in your new home and connected to the community.",
      sections: [
        {
          heading: 'First Steps',
          list: [
            'Register your vehicle(s) for gate access',
            'Set up autopay or online billing in the financial hub',
            'Download the CINC Connect+ resident app',
            'Pick up your welcome packet at the HOA office',
          ],
        },
        {
          heading: 'Key Policies to Know',
          list: [
            'Pet registration required within 30 days',
            'ARC approval required before any exterior changes',
            'Guest parking limited to 72 hours',
            'Quiet hours: 10 PM–7 AM weekdays',
          ],
        },
        {
          heading: 'Amenity Access',
          text: 'Your key fob activates pool, gym, and clubhouse access. Reserve the clubhouse, pavilion, or tennis courts through the resident portal at least 48 hours in advance.',
        },
      ],
      links: [
        { label: 'Download Full Move-In Guide (PDF)' },
        { label: 'Make an amenity reservation' },
      ],
    },
  },
  {
    id: 'policies',
    label: 'Policies',
    Icon: PoliciesIcon,
    content: {
      title: 'Landscaping & Lawn Care Policy',
      tag: 'Community Policy · Effective July 1, 2026',
      lead: 'The updated landscaping policy reflects the new irrigation schedule and native plant pre-approvals adopted at the April 2026 annual meeting.',
      sections: [
        {
          heading: 'Irrigation Schedule',
          text: 'Outdoor watering is permitted on Monday, Wednesday, and Friday only between 6–10 AM or 7–10 PM. Drip systems and hand-watering are exempt from schedule restrictions.',
        },
        {
          heading: 'Lawn Standards',
          table: {
            headers: ['Requirement', 'Standard'],
            rows: [
              ['Grass height', '2" – 4" at all times'],
              ['Edging', 'Required along all walkways'],
              ['Artificial turf (rear)', 'Allowed without ARC approval'],
              ['Artificial turf (front)', 'Requires ARC submission'],
              ['Seasonal lighting', 'Nov 15 – Jan 15 only'],
            ],
          },
        },
        {
          heading: 'Pre-Approved Native Plants',
          list: [
            'Texas Sage (Leucophyllum frutescens)',
            'Blackfoot Daisy (Melampodium leucanthum)',
            'Autumn Sage (Salvia greggii)',
            'Esperanza (Tecoma stans)',
            'Buffalo Grass sod',
          ],
        },
        {
          heading: 'Enforcement',
          text: 'First violation: written courtesy notice with 14-day cure period. Repeat violation within 90 days: $50–$250 fine per occurrence. Fines escalate for continued non-compliance.',
        },
      ],
      links: [
        { label: 'Download Full Landscaping Policy (PDF)' },
        { label: 'Submit an ARC Request' },
      ],
    },
  },
]

/* ── Main component ─────────────────────────────────────── */
export default function AdditionalContentSheet({ onClose }) {
  const [active, setActive] = useState(null)   // null = list, otherwise tab object
  const [query,  setQuery]  = useState('')

  const target = document.querySelector('.phone-frame') || document.body

  const filtered = query.trim()
    ? TABS.filter(t => t.label.toLowerCase().includes(query.toLowerCase()))
    : TABS

  return createPortal(
    <div className="acs-backdrop" onClick={onClose}>
      <div className="acs-sheet" onClick={e => e.stopPropagation()}>

        {/* ── Header ─────────────────────────────────── */}
        <div className="acs-header">
          {active ? (
            <button className="acs-back-btn" onClick={() => setActive(null)}>
              <BackIcon />
              <span>Additional Content</span>
            </button>
          ) : (
            <span className="acs-header__title">Additional Content</span>
          )}
          <button className="acs-close" onClick={onClose} aria-label="Close">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="1.4" fill="rgba(0,0,0,0.35)" opacity="0.5"/>
              <path d="M9.5 9.5l9 9M18.5 9.5l-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.7"/>
            </svg>
          </button>
        </div>

        {/* ── Panels ─────────────────────────────────── */}
        <div className="acs-panels">

          {/* Panel 1 — search + tab list */}
          <div className={`acs-panel${!active ? ' acs-panel--active' : ' acs-panel--left'}`}>
            {/* Search bar lives inside the list panel so it slides away with it */}
            <div className="acs-search-wrap">
              <input
                className="acs-search"
                placeholder="Search…"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              {query
                ? <button className="acs-search-clear" onClick={() => setQuery('')}>×</button>
                : <SearchIcon />}
            </div>
            <div className="acs-list-items">
              {filtered.length === 0 ? (
                <p className="acs-empty">No results for "{query}"</p>
              ) : filtered.map(tab => (
                <button key={tab.id} className="acs-row" onClick={() => { setQuery(''); setActive(tab) }}>
                  <span className="acs-row__icon"><tab.Icon /></span>
                  <span className="acs-row__label">{tab.label}</span>
                  <ChevronIcon />
                </button>
              ))}
            </div>
          </div>

          {/* Panel 2 — content detail */}
          <div className={`acs-panel${active ? ' acs-panel--active' : ''}`}>
            {active && (() => {
              const c = active.content
              return (
                <>
                  {c.hero && <img src={c.hero} alt="" className="acs-detail-hero" />}
                  <div className="acs-detail-body">
                    {c.tag && <span className="acs-detail-tag">{c.tag}</span>}
                    <h2 className="acs-detail-title">{c.title}</h2>
                    {c.lead && <p className="acs-detail-lead">{c.lead}</p>}

                    {c.sections?.map((s, i) => (
                      <div key={i} className="acs-detail-section">
                        {s.heading && <h3 className="acs-detail-heading">{s.heading}</h3>}
                        {s.text    && <p  className="acs-detail-text">{s.text}</p>}
                        {s.list    && <ul className="acs-detail-list">{s.list.map((li, j) => <li key={j}>{li}</li>)}</ul>}
                        {s.image   && <img src={s.image} alt="" className="acs-detail-inline-img" />}
                        {s.table   && (
                          <div className="acs-table-wrap">
                            <table className="acs-table">
                              {s.table.headers && <thead><tr>{s.table.headers.map((h, k) => <th key={k}>{h}</th>)}</tr></thead>}
                              <tbody>{s.table.rows.map((row, k) => <tr key={k}>{row.map((cell, m) => <td key={m}>{cell}</td>)}</tr>)}</tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    ))}

                    {c.links?.length > 0 && (
                      <div className="acs-detail-links">
                        {c.links.map((l, i) => (
                          <a key={i} href="#" className="acs-detail-link" onClick={e => e.preventDefault()}>{l.label}</a>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )
            })()}
          </div>

        </div>
      </div>
    </div>,
    target
  )
}

/* ── Icons ──────────────────────────────────────────────── */
function SearchIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
}
function ChevronIcon() {
  return <svg className="acs-chevron" width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M1 1l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function BackIcon() {
  return <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M7 1L1 7l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function AnnouncementsIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M22 3L2 10l7 2 2 7 11-16z"/></svg>
}
function DocumentsIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
}
function EventsIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
}
function DirectoriesIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
}
function ResourcesIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
}
function PoliciesIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
}
