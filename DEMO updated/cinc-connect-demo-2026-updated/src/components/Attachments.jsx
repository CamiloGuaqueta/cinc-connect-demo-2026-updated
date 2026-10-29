import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import './Attachments.css'

// Attachments are { name, url, isImage }. Files picked in the demo stay in memory
// (object URLs) — nothing is uploaded anywhere.

function toAttachments(fileList) {
  return [...fileList].map(f => ({
    name: f.name,
    url: URL.createObjectURL(f),
    isImage: f.type.startsWith('image/'),
  }))
}

/* "Add Photo or Document" button + hidden picker */
export function AddAttachmentButton({ onAdd, label = 'Add Photo or Document' }) {
  const inputRef = useRef(null)
  return (
    <>
      <button type="button" className="att-add" onClick={() => inputRef.current?.click()}>
        <ClipIcon /> {label}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,.pdf,.doc,.docx"
        multiple
        style={{ display: 'none' }}
        onChange={e => { if (e.target.files.length) onAdd(toAttachments(e.target.files)); e.target.value = '' }}
      />
    </>
  )
}

/* List of attachment chips; images open full-size, documents show their name */
export function AttachmentList({ items, onRemove }) {
  const [preview, setPreview] = useState(null)
  if (!items?.length) return null
  const frame = document.querySelector('.phone-frame')
  return (
    <>
      <div className="att-list">
        {items.map((a, i) => (
          <div key={`${a.name}-${i}`} className="att-chip">
            <button type="button" className="att-chip__main" onClick={() => a.isImage && a.url && setPreview(a)}>
              {a.isImage && a.url
                ? <img src={a.url} alt="" className="att-chip__thumb" />
                : <span className="att-chip__doc"><DocIcon /></span>}
              <span className="att-chip__name">{a.name}</span>
            </button>
            {onRemove && (
              <button type="button" className="att-chip__remove" aria-label={`Remove ${a.name}`} onClick={() => onRemove(i)}>×</button>
            )}
          </div>
        ))}
      </div>
      {preview && frame && createPortal(
        <div className="att-preview" onClick={() => setPreview(null)}>
          <img src={preview.url} alt={preview.name} />
          <span className="att-preview__name">{preview.name}</span>
        </div>,
        frame
      )}
    </>
  )
}

function ClipIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  )
}

function DocIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" />
    </svg>
  )
}
