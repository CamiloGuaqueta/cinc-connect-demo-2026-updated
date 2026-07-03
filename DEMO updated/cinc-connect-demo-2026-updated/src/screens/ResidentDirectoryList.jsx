import { useState, useMemo, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useMode } from '../ModeContext'
import { CONTACTS } from '../data/directoryData'
import './ResidentDirectoryList.css'

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,248,234,0.45)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )
}

function ChevronUpIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 15 12 9 6 15"/>
    </svg>
  )
}

export default function ResidentDirectoryList({ dirId, title }) {
  const { pushResidentView } = useMode()
  const [query, setQuery] = useState('')
  const [exportOpen, setExportOpen] = useState(false)
  const [format, setFormat] = useState('csv')
  const sectionRefs = useRef({})
  const listRef = useRef(null)
  const [showScrollTop, setShowScrollTop] = useState(false)

  const contacts = CONTACTS[dirId] || []

  useEffect(() => {
    const el = listRef.current
    if (!el) return
    const onScroll = () => setShowScrollTop(el.scrollTop > el.clientHeight)
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const filtered = useMemo(() => {
    if (!query.trim()) return contacts
    const q = query.toLowerCase()
    return contacts.filter(c =>
      `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) ||
      (c.address && c.address.toLowerCase().includes(q))
    )
  }, [contacts, query])

  const grouped = useMemo(() => {
    const groups = {}
    filtered.forEach(c => {
      const letter = c.lastName[0].toUpperCase()
      if (!groups[letter]) groups[letter] = []
      groups[letter].push(c)
    })
    return groups
  }, [filtered])

  const letters = Object.keys(grouped).sort()

  const scrollToLetter = letter => {
    const el = sectionRefs.current[letter]
    const list = listRef.current
    if (el && list) {
      list.scrollTo({ top: el.offsetTop - 8, behavior: 'smooth' })
    }
  }

  const doExport = () => {
    const headers = ['First Name', 'Last Name', 'Property Address', 'Mailing Address', 'Email']
    const rows = contacts.map(c => [
      c.firstName,
      c.lastName,
      Array.isArray(c.address) ? c.address[0] : c.address,
      c.mailingAddress || '',
      c.email || '',
    ])
    const csv = [headers, ...rows]
      .map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
      .join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = format === 'pdf' ? 'members-list.pdf' : 'members-list.csv'
    a.click()
    URL.revokeObjectURL(url)
    setExportOpen(false)
  }

  return (
    <div className="screen rdl-screen">
      <div className="rdl-body">
        <div className="rdl-scroll" ref={listRef}>
          <h2 className="rdl-title">{title}</h2>
          <div className="rdl-search-row">
            <div className="rdl-search-wrap">
              <input
                className="rdl-search"
                placeholder="Search by name or address"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              <SearchIcon />
            </div>
            {dirId === 'members' && (
              <button className="rdl-download-btn" onClick={() => setExportOpen(true)} aria-label="Export">
                <DownloadIcon />
              </button>
            )}
          </div>
          <div className="rdl-content">
            {letters.map((letter, gi) => (
              <div key={letter}>
                {gi > 0 && <div className="rdl-group-divider" />}
                {grouped[letter].map((contact, i, arr) => (
                  <button
                    key={contact.id}
                    className="rdl-row"
                    ref={i === 0 ? el => { sectionRefs.current[letter] = el } : null}
                    onClick={() => pushResidentView('contact-detail', { contact, dirId })}
                  >
                    <div className="rdl-avatar-wrap">
                      <div className="rdl-avatar">
                        {contact.photo ? (
                          <img src={contact.photo} alt="" className="rdl-avatar__img" />
                        ) : (
                          <span className="rdl-avatar__initials">
                            {contact.firstName[0]}{contact.lastName[0]}
                          </span>
                        )}
                      </div>
                      {contact.role && <div className="rdl-bm-badge">BM</div>}
                    </div>
                    <div className="rdl-row__info">
                      <span className="rdl-row__name">{contact.firstName} {contact.lastName}</span>
                      {dirId === 'bod' && contact.role && (
                        <span className="rdl-row__role">{contact.role}</span>
                      )}
                      {dirId !== 'bod' && contact.address && (
                        <span className="rdl-row__addr">
                          {Array.isArray(contact.address) ? contact.address[0] : contact.address}
                        </span>
                      )}
                    </div>
                    {i < arr.length - 1 && <div className="rdl-divider" />}
                  </button>
                ))}
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="rdl-empty">No contacts match your search.</p>
            )}
          </div>
        </div>

        {letters.length > 0 && (
          <div className="rdl-scrubber">
            {letters.map(l => (
              <button key={l} className="rdl-scrubber__btn" onClick={() => scrollToLetter(l)}>
                {l}
              </button>
            ))}
          </div>
        )}

        {showScrollTop && (
          <button
            className="rdl-scroll-top-btn"
            onClick={() => listRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
          >
            <ChevronUpIcon />
          </button>
        )}
      </div>

      {exportOpen && dirId === 'members' && createPortal(
        <>
          <div className="rdl-sheet-overlay" onClick={() => setExportOpen(false)} />
          <div className="rdl-export-sheet">
            <div className="rdl-sheet-handle" />
            <div className="rdl-sheet-header">
              <span className="rdl-sheet-title">Export Members List</span>
              <button className="rdl-sheet-close" onClick={() => setExportOpen(false)}><CloseIcon /></button>
            </div>
            <div className="rdl-format-section">
              <p className="rdl-format-label">Select Format</p>
              <div className="rdl-format-options">
                <button
                  className={`rdl-format-opt${format === 'csv' ? ' rdl-format-opt--active' : ''}`}
                  onClick={() => setFormat('csv')}
                >
                  <span className="rdl-format-opt__name">CSV</span>
                  <span className="rdl-format-opt__desc">Spreadsheet</span>
                </button>
                <button
                  className={`rdl-format-opt${format === 'pdf' ? ' rdl-format-opt--active' : ''}`}
                  onClick={() => setFormat('pdf')}
                >
                  <span className="rdl-format-opt__name">PDF</span>
                  <span className="rdl-format-opt__desc">Document</span>
                </button>
              </div>
            </div>
            <button className="rdl-export-btn" onClick={doExport}>
              Download {format.toUpperCase()}
            </button>
            <button className="rdl-export-cancel" onClick={() => setExportOpen(false)}>Cancel</button>
          </div>
        </>,
        document.querySelector('.phone-frame') || document.body
      )}
    </div>
  )
}
