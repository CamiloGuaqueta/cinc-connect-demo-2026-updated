import { useState } from 'react'
import { useMode } from '../ModeContext'
import './ResidentDirectories.css'

const DIRECTORIES = [
  { id: 'members', label: 'Members List', isMembersList: true },
  { id: 'bod', label: 'Board of Directors' },
  { id: 'hoa', label: 'Homeowners' },
]

function ChevronIcon() {
  return (
    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" className="rd-chevron">
      <path d="M1 1l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function DirectoryIcon() {
  return (
    <svg width="24" height="25" viewBox="0 0 69 71" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M48.4899 57.71H27.53C26.08 57.71 24.7199 57.06 23.8099 55.93C22.8899 54.78 22.5399 53.3 22.8599 51.86C24.4099 44.82 30.7799 39.7 38.0099 39.7C45.2399 39.7 51.6 44.81 53.16 51.86C53.48 53.3 53.13 54.79 52.21 55.93C51.3 57.06 49.9499 57.71 48.4899 57.71ZM27.7999 52.71H48.22C47.08 48.06 42.8299 44.7 38.0099 44.7C33.1899 44.7 28.9299 48.05 27.7999 52.71Z" fill="#FFF8EA"/>
      <path d="M38.0101 34.6299C33.0801 34.6299 29.0701 30.6199 29.0701 25.6899C29.0701 20.7599 33.0801 16.75 38.0101 16.75C42.9401 16.75 46.9501 20.7599 46.9501 25.6899C46.9501 30.6199 42.9401 34.6299 38.0101 34.6299ZM38.0101 21.7599C35.8401 21.7599 34.0701 23.53 34.0701 25.7C34.0701 27.87 35.8401 29.64 38.0101 29.64C40.1801 29.64 41.9501 27.87 41.9501 25.7C41.9501 23.53 40.1801 21.7599 38.0101 21.7599Z" fill="#FFF8EA"/>
      <path d="M60.25 70.45H15.77C11.35 70.45 7.75 66.85 7.75 62.43V8.01996C7.75 3.59996 11.35 0 15.77 0H60.25C64.67 0 68.27 3.59996 68.27 8.01996V62.43C68.27 66.85 64.67 70.45 60.25 70.45ZM15.77 4.98999C14.1 4.98999 12.75 6.34995 12.75 8.00995V62.42C12.75 64.09 14.11 65.4399 15.77 65.4399H60.25C61.92 65.4399 63.27 64.08 63.27 62.42V8.00995C63.27 6.33995 61.91 4.98999 60.25 4.98999H15.77Z" fill="#FFF8EA"/>
      <path d="M10.24 17.72H2.5C1.12 17.72 0 16.6 0 15.22C0 13.84 1.12 12.72 2.5 12.72H10.24C11.62 12.72 12.74 13.84 12.74 15.22C12.74 16.6 11.62 17.72 10.24 17.72Z" fill="#FFF8EA"/>
      <path d="M10.24 57.71H2.5C1.12 57.71 0 56.59 0 55.21C0 53.83 1.12 52.71 2.5 52.71H10.24C11.62 52.71 12.74 53.83 12.74 55.21C12.74 56.59 11.62 57.71 10.24 57.71Z" fill="#FFF8EA"/>
      <path d="M10.24 44.3799H2.5C1.12 44.3799 0 43.2599 0 41.8799C0 40.4999 1.12 39.3799 2.5 39.3799H10.24C11.62 39.3799 12.74 40.4999 12.74 41.8799C12.74 43.2599 11.62 44.3799 10.24 44.3799Z" fill="#FFF8EA"/>
      <path d="M10.24 31.05H2.5C1.12 31.05 0 29.93 0 28.55C0 27.17 1.12 26.05 2.5 26.05H10.24C11.62 26.05 12.74 27.17 12.74 28.55C12.74 29.93 11.62 31.05 10.24 31.05Z" fill="#FFF8EA"/>
    </svg>
  )
}

function MembersListIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFF8EA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <circle cx="8" cy="10.5" r="2" />
      <path d="M4 19v-1a4 4 0 014-4h0a4 4 0 014 4v1" />
      <line x1="14" y1="9" x2="19" y2="9" />
      <line x1="14" y1="13" x2="19" y2="13" />
    </svg>
  )
}

function LockBadgeIcon() {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.45, flexShrink: 0 }}>
      <rect x="1" y="6" width="12" height="9" rx="2" stroke="#fff8ea" strokeWidth="1.5"/>
      <path d="M4 6V4a3 3 0 016 0v2" stroke="#fff8ea" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="7" cy="11" r="1.2" fill="#fff8ea"/>
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFF8EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  )
}

export default function ResidentDirectories() {
  const { pushResidentView } = useMode()
  const [query, setQuery] = useState('')

  const filtered = DIRECTORIES.filter(d =>
    d.label.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="screen rd-screen">
      <div className="rd-top">
        <h2 className="rd-title">Directories</h2>
        <div className="rd-search-wrap">
          <input
            className="rd-search"
            placeholder="Search Directories"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <SearchIcon />
        </div>
      </div>

      <div className="rd-scroll">
        <div className="rd-list">
          {filtered.map(dir => dir.isMembersList ? (
            <button key={dir.id} className="rd-row rd-row--members" onClick={() => pushResidentView('members-list', {})}>
              <MembersListIcon />
              <span className="rd-row__label">{dir.label}</span>
              <ChevronIcon />
            </button>
          ) : (
            <button key={dir.id} className="rd-row" onClick={() => pushResidentView('directory-list', { dirId: dir.id, title: dir.label })}>
              <DirectoryIcon />
              <span className="rd-row__label">{dir.label}</span>
              <ChevronIcon />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
