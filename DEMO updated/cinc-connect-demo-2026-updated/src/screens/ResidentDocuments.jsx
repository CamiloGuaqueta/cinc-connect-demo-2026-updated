import { useState, useMemo } from 'react'
import CustomContentSheet from '../components/CustomContentSheet'
import ResidentPDFViewer from './ResidentPDFViewer'
import { RESERVE_FUND_CONTENT } from './ResidentFinancialHub'
import { CUSTOM_TILES } from './ResidentMore'
import { POLICY_TEXT } from './ResidentAnimals'
import './ResidentDocuments.css'

const LANDSCAPING_CONTENT = CUSTOM_TILES.find(t => t.label.includes('Landscaping'))?.content

const ANIMAL_POLICY_CONTENT = {
  title: 'HOA Animal Policy',
  sections: POLICY_TEXT.split('\n\n').map(para => ({ text: para })),
}

const DOC_FOLDERS = [
  {
    id: 'governing',
    name: 'Governing Documents',
    docs: [
      { id: 'bylaws', name: 'Cardinal Hills HOA Bylaws.pdf', kind: 'pdf', docType: 'bylaws' },
      { id: 'ballot', name: '2027 Board of Directors Election Ballot.pdf', kind: 'pdf', docType: 'ballot' },
    ],
  },
  {
    id: 'financial',
    name: 'Financial Reports',
    docs: [
      { id: 'reserve', name: 'Reserve Fund Study 2026.pdf', kind: 'sheet', content: RESERVE_FUND_CONTENT },
    ],
  },
  {
    id: 'rules',
    name: 'Rules & Policies',
    docs: [
      { id: 'animal', name: 'Animal Policy.pdf', kind: 'sheet', content: ANIMAL_POLICY_CONTENT },
      { id: 'landscaping', name: 'Landscaping & Lawn Care Policy.pdf', kind: 'sheet', content: LANDSCAPING_CONTENT },
    ],
  },
]

function FolderIcon() {
  return (
    <svg width="26" height="22" viewBox="0 0 26 22" fill="none">
      <path d="M1 4a2 2 0 0 1 2-2h6l2.5 3H23a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4z" stroke="var(--lime)" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

function FileIcon() {
  return (
    <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
      <path d="M12 1H3a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7l-7-6z" stroke="var(--lime)" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 1v6h7" stroke="var(--lime)" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
      <path d="M1 1l6 6-6 6" stroke="rgba(255,248,234,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function BackIcon() {
  return (
    <svg width="9" height="16" viewBox="0 0 9 16" fill="none">
      <path d="M8 1L1 8L8 15" stroke="var(--lime)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function ResidentDocuments() {
  const [openFolderId, setOpenFolderId] = useState(null)
  const [search, setSearch] = useState('')
  const [activeDoc, setActiveDoc] = useState(null)

  const openFolder = DOC_FOLDERS.find(f => f.id === openFolderId) || null

  const searchResults = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return null
    return DOC_FOLDERS.flatMap(f =>
      f.docs
        .filter(d => d.name.toLowerCase().includes(q))
        .map(d => ({ ...d, folderName: f.name }))
    )
  }, [search])

  return (
    <div className="screen res-docs">
      <h1 className="res-docs__title">Documents</h1>

      <div className="res-docs__search">
        <SearchIcon />
        <input
          type="text"
          className="res-docs__search-input"
          placeholder="Search Documents"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button className="res-docs__search-clear" onClick={() => setSearch('')} aria-label="Clear">×</button>
        )}
      </div>

      {searchResults ? (
        <div className="res-docs__list">
          {searchResults.length === 0 ? (
            <p className="res-docs__empty">No documents match your search.</p>
          ) : searchResults.map(d => (
            <button key={d.folderName + d.id} className="res-docs__row" onClick={() => setActiveDoc(d)}>
              <FileIcon />
              <div className="res-docs__row-text">
                <span className="res-docs__row-name">{d.name}</span>
                <span className="res-docs__row-sub">{d.folderName}</span>
              </div>
              <ChevronRightIcon />
            </button>
          ))}
        </div>
      ) : openFolder ? (
        <>
          <button className="res-docs__back" onClick={() => setOpenFolderId(null)}>
            <BackIcon /> <span>Documents</span>
          </button>
          <h2 className="res-docs__folder-title">{openFolder.name}</h2>
          <div className="res-docs__list">
            {openFolder.docs.map(d => (
              <button key={d.id} className="res-docs__row" onClick={() => setActiveDoc(d)}>
                <FileIcon />
                <span className="res-docs__row-name">{d.name}</span>
                <ChevronRightIcon />
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="res-docs__list">
          {DOC_FOLDERS.map(f => (
            <button key={f.id} className="res-docs__row" onClick={() => setOpenFolderId(f.id)}>
              <FolderIcon />
              <span className="res-docs__row-name">{f.name}</span>
              <ChevronRightIcon />
            </button>
          ))}
        </div>
      )}

      {activeDoc?.kind === 'sheet' && (
        <CustomContentSheet content={activeDoc.content} onClose={() => setActiveDoc(null)} />
      )}
      {activeDoc?.kind === 'pdf' && (
        <ResidentPDFViewer filename={activeDoc.name} docType={activeDoc.docType} onClose={() => setActiveDoc(null)} />
      )}
    </div>
  )
}
