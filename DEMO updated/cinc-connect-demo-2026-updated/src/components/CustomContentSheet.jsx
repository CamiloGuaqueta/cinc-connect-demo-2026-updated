import { createPortal } from 'react-dom'
import './CustomContentSheet.css'

export default function CustomContentSheet({ content, onClose }) {
  const target = document.querySelector('.phone-frame') || document.body

  return createPortal(
    <div className="ccs-backdrop" onClick={onClose}>
      <div className="ccs-sheet" onClick={e => e.stopPropagation()}>

        {/* Top header with name + close button */}
        <div className="ccs-header">
          <span className="ccs-header__name">{content.title}</span>
          <button className="ccs-close" onClick={onClose} aria-label="Close">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="13" stroke="#fff8ea" strokeWidth="1.4" fill="rgba(0,0,0,0.35)" />
              <path d="M9.5 9.5l9 9M18.5 9.5l-9 9" stroke="#fff8ea" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Hero image — full bleed */}
        {content.hero && (
          <div className="ccs-hero-wrap">
            <img src={content.hero} alt="" className="ccs-hero__img" />
          </div>
        )}

        <div className="ccs-body">
          {content.tag && <span className="ccs-tag">{content.tag}</span>}
          <h2 className="ccs-title">{content.title}</h2>
          {content.subtitle && <p className="ccs-subtitle">{content.subtitle}</p>}
          {content.lead && <p className="ccs-lead">{content.lead}</p>}

          {content.sections?.map((s, i) => (
            <div key={i} className="ccs-section">
              {s.heading && <h3 className="ccs-section__heading">{s.heading}</h3>}
              {s.text    && <p className="ccs-section__text">{s.text}</p>}
              {s.list    && (
                <ul className="ccs-list">
                  {s.list.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
              )}
              {/* Inline image */}
              {s.image && <img src={s.image} alt="" className="ccs-inline-img" />}
              {/* Table */}
              {s.table && (
                <div className="ccs-table-wrap">
                  <table className="ccs-table">
                    {s.table.headers && (
                      <thead>
                        <tr>{s.table.headers.map((h, k) => <th key={k}>{h}</th>)}</tr>
                      </thead>
                    )}
                    <tbody>
                      {s.table.rows.map((row, k) => (
                        <tr key={k}>{row.map((cell, m) => <td key={m}>{cell}</td>)}</tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}

          {content.links?.length > 0 && (
            <div className="ccs-links">
              {content.links.map((l, i) => (
                <a key={i} href="#" className="ccs-link" onClick={e => e.preventDefault()}>{l.label}</a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>,
    target
  )
}
