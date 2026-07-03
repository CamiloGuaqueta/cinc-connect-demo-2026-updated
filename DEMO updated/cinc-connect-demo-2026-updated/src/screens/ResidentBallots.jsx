import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useMode } from '../ModeContext'
import ResidentPDFViewer from './ResidentPDFViewer'
import boardImg from '../images/board.jpg'
import newChImg from '../images/new-ch.png'
import roadImg from '../images/road.jpg'
import margaretImg from '../images/Margaret-chen.jpg'
import robertImg from '../images/Robert-Vasquez.jpg'
import lindaImg from '../images/Linda-park.jpg'
import davidImg from '../images/david-torres.jpg'
import susanImg from '../images/Susan-Mitchell.jpg'
import './ResidentBallots.css'

// ─── Mock Data ────────────────────────────────────────────────────────────────

const ELECTION_CLOSE = new Date('2026-06-29T23:59:00')
const ASSESSMENT_CLOSE = new Date('2026-06-29T23:59:00')
const CLUBHOUSE_CLOSE = new Date('2026-07-15T23:59:00')

const CANDIDATES = [
  { id: 1, name: 'Margaret Chen',  role: 'Incumbent – Treasurer', bio: 'Margaret has served on the board for six years and championed the reserve fund overhaul that saved residents over $200,000 in deferred maintenance costs.', photo: margaretImg, pdf: 'Margaret_Chen_Platform.pdf' },
  { id: 2, name: 'Robert Vasquez', role: 'Challenger',             bio: 'Robert brings 15 years of commercial real estate and HOA governance experience, with a focus on transparent budgeting and proactive infrastructure management.', photo: robertImg, pdf: null },
  { id: 3, name: 'Linda Park',     role: 'Incumbent – Secretary',  bio: 'Linda has been a resident for 12 years and has dedicated her tenure to improving community communication and streamlining meeting minutes.', photo: lindaImg, pdf: 'Linda_Park_Platform.pdf' },
  { id: 4, name: 'David Torres',   role: 'Challenger',             bio: 'David is a retired civil engineer who wants to apply his expertise to long-term capital planning and ensure our amenities are well-maintained for generations to come.', photo: davidImg, pdf: null },
  { id: 5, name: 'Susan Mitchell', role: 'Incumbent – President',  bio: 'Susan has led the board through two major capital projects and is committed to maintaining property values while keeping assessments fair and predictable.', photo: susanImg, pdf: 'Susan_Mitchell_Platform.pdf' },
]

const ASSESSMENT_CHOICES = [
  { id: 'yes', label: 'YES' },
  { id: 'no',  label: 'NO' },
]

const CLUBHOUSE_CHOICES = [
  { id: 'a', label: 'Option A — Modern',   desc: 'Clean lines, floor-to-ceiling windows, and a minimalist interior palette with smart-home integration. Designed for a sleek, contemporary community gathering space.', pdf: 'Clubhouse_Option_A_Modern.pdf' },
  { id: 'b', label: 'Option B — Classic',  desc: 'Preserves the original architectural character of the building with updated finishes, crown molding, and traditional furnishings that honor the community\'s heritage.', pdf: 'Clubhouse_Option_B_Classic.pdf' },
  { id: 'c', label: 'Option C — Barn',     desc: 'Warm, rustic aesthetic with reclaimed wood accents, exposed beams, and a farmhouse-inspired great room perfect for community events and casual gatherings.', pdf: 'Clubhouse_Option_C_Barn.pdf' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getTimeLeft(target) {
  const diff = Math.max(0, target - Date.now())
  const days    = Math.floor(diff / 86400000)
  const hours   = Math.floor((diff % 86400000) / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)
  return { days, hours, minutes, seconds }
}

function CountdownTimer({ target }) {
  const [t, setT] = useState(() => getTimeLeft(target))
  useEffect(() => {
    const id = setInterval(() => setT(getTimeLeft(target)), 1000)
    return () => clearInterval(id)
  }, [target])
  const pad = n => String(n).padStart(2, '0')
  return (
    <div className="ballot-countdown">
      {[['days', t.days], ['hrs', t.hours], ['min', t.minutes], ['sec', t.seconds]].map(([label, val]) => (
        <div key={label} className="ballot-countdown__seg">
          <span className="ballot-countdown__num">{pad(val)}</span>
          <span className="ballot-countdown__label">{label}</span>
        </div>
      ))}
    </div>
  )
}

// ─── Close Button ─────────────────────────────────────────────────────────────

function CloseBtn({ onClick }) {
  return (
    <button className="ballot-sheet-close" onClick={onClick} aria-label="Close">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="16" fill="rgba(0,0,0,0.35)" />
        <circle cx="16" cy="16" r="15.5" stroke="var(--text)" strokeOpacity="0.25" />
        <line x1="11" y1="11" x2="21" y2="21" stroke="var(--text)" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="21" y1="11" x2="11" y2="21" stroke="var(--text)" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </button>
  )
}

// ─── Sheet Header ─────────────────────────────────────────────────────────────

function SheetHeader({ title, onBack, onClose }) {
  return (
    <div className="ballot-sheet-header">
      <div className="ballot-sheet__handle" />
      <div className="ballot-sheet-header__nav">
        <button className="ballot-sheet-back" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 5L7.5 10L12.5 15" stroke="var(--text)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
        <span className="ballot-sheet-header__title">{title}</span>
        <CloseBtn onClick={onClose} />
      </div>
    </div>
  )
}

// ─── Success Screen ───────────────────────────────────────────────────────────

function SuccessScreen({ note, onClose }) {
  return (
    <div className="ballot-success">
      <div className="ballot-success__icon">
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
          <circle cx="36" cy="36" r="36" fill="var(--lime)" fillOpacity="0.15" />
          <circle cx="36" cy="36" r="28" fill="var(--lime)" fillOpacity="0.22" />
          <circle cx="36" cy="36" r="20" fill="var(--lime)" />
          <path d="M26 36.5L32.5 43L46 29" stroke="var(--text-dark)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 className="ballot-success__title">Your Vote Has Been Cast!</h2>
      <p className="ballot-success__sub">A receipt has been sent to your email at n***@gmail.com.</p>
      {note && <p className="ballot-success__note">{note}</p>}
      <p className="ballot-success__hint">Access your receipt anytime in the Participation section.</p>
      <div className="ballot-success__actions">
        <button className="ballot-btn ballot-btn--outline">DOWNLOAD RECEIPT</button>
        <button className="ballot-btn ballot-btn--solid" onClick={onClose}>CLOSE</button>
      </div>
    </div>
  )
}

// ─── Ballot Hero Image (image-only, no description) ──────────────────────────

function BallotHeroImg({ image, title, closeDate, onClose }) {
  return (
    <div className="ballot-hero__img-wrap">
      <div className="ballot-hero__handle" />
      <img src={image} alt={title} className="ballot-hero__img" />
      <div className="ballot-hero__gradient" />
      <CloseBtn onClick={onClose} />
      <div className="ballot-hero__overlay-text">
        <h2 className="ballot-hero__title">{title}</h2>
        <p className="ballot-hero__close-date">VOTE CLOSES {closeDate.toUpperCase()}</p>
      </div>
    </div>
  )
}

// ─── Attachment Button ────────────────────────────────────────────────────────

function AttachmentBtn({ label = 'Ballot Document.pdf', onOpen }) {
  return (
    <button className="ballot-info__attachment" onClick={onOpen}>
      <svg width="22" height="25" viewBox="0 0 14 16" fill="none">
        <path d="M8 1H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6L8 1z" stroke="var(--lime)" strokeWidth="1.3" strokeLinejoin="round"/>
        <path d="M8 1v5h5" stroke="var(--lime)" strokeWidth="1.3" strokeLinejoin="round"/>
        <path d="M5 9h4M5 12h2" stroke="var(--lime)" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
      <span className="ballot-info__attachment-label">{label}</span>
      <svg className="ballot-info__attachment-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M6 3l5 5-5 5" stroke="var(--lime)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}

// ─── Ballot Detail (full description second pull-up) ─────────────────────────

function BallotDetailSheet({ title, description, onClose, onOpenPdf }) {
  return (
    <div className="ballot-detail">
      <SheetHeader title="" onBack={onClose} onClose={onClose} />
      <div className="ballot-sheet__body">
        <h2 className="ballot-detail__title">{title}</h2>
        {description.split('\n\n').map((para, i) => (
          <p key={i} className="ballot-info__desc" style={{ lineHeight: 1.65, marginBottom: 14 }}>{para}</p>
        ))}
        <div style={{ marginTop: 4, marginBottom: 24 }}>
          <AttachmentBtn onOpen={onOpenPdf} />
        </div>
      </div>
    </div>
  )
}

// ─── Candidate Detail Sheet ───────────────────────────────────────────────────

function CandidateDetailSheet({ candidate, onClose, onOpenPdf }) {
  return (
    <div className="ballot-detail">
      <SheetHeader title="" onBack={onClose} onClose={onClose} />
      <div className="ballot-sheet__body">
        <div className="candidate-detail__hero">
          <img src={candidate.photo} alt={candidate.name} className="candidate-detail__photo" />
          <div>
            <h2 className="candidate-detail__name">{candidate.name}</h2>
            <p className="candidate-detail__role">{candidate.role}</p>
          </div>
        </div>
        <p className="ballot-info__desc" style={{ lineHeight: 1.65, marginTop: 20 }}>{candidate.bio}</p>
        {candidate.pdf && (
          <div style={{ marginTop: 16, marginBottom: 24 }}>
            <AttachmentBtn label={candidate.pdf} onOpen={() => onOpenPdf({ filename: candidate.pdf, docType: 'candidate', candidateName: candidate.name })} />
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Electoral Ballot Sheet ───────────────────────────────────────────────────

function ElectoralSheet({ onClose, onVoted, image, title, closeDate, description, initialShowDetail, onOpenPdf }) {
  const [step, setStep] = useState(1) // 1 = select, 2 = confirm, 3 = success
  const [selected, setSelected] = useState([]) // array of candidate ids
  const [showDetail, setShowDetail] = useState(initialShowDetail || false)
  const onDetailClose = initialShowDetail ? onClose : () => setShowDetail(false)
  const [activeCandidate, setActiveCandidate] = useState(null)
  const MAX = 3

  const openPdf = onOpenPdf || (() => {})

  function toggleCandidate(id) {
    setSelected(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id)
      if (prev.length >= MAX) return prev
      return [...prev, id]
    })
  }

  const selectedCandidates = CANDIDATES.filter(c => selected.includes(c.id))

  if (step === 3) {
    return (
      <div className="ballot-sheet ballot-sheet--full">
        <SuccessScreen
          note={null}
          onClose={() => { onVoted?.(selectedCandidates); onClose() }}
        />
      </div>
    )
  }

  if (step === 2) {
    return (
      <div className="ballot-sheet ballot-sheet--full">
        <SheetHeader
          title="2027 Board of Directors Election"
          onBack={() => setStep(1)}
          onClose={onClose}
        />
        <div className="ballot-sheet__body">
          <h2 className="ballot-confirm__heading">Confirm Your Vote</h2>
          <p className="ballot-confirm__ballot-name">2027 Board of Directors Election</p>
          <div className="ballot-confirm__warning">
            <span className="ballot-confirm__warning-icon">⚠</span>
            This vote is final and cannot be changed once submitted.
          </div>
          <p className="ballot-confirm__selected-label">Your selected candidates:</p>
          <div className="ballot-confirm__candidates">
            {selectedCandidates.map(c => (
              <div key={c.id} className="ballot-confirm__candidate">
                <img src={c.photo} alt={c.name} className="ballot-confirm__candidate-photo" />
                <div>
                  <div className="ballot-confirm__candidate-name">{c.name}</div>
                  <div className="ballot-confirm__candidate-role">{c.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="ballot-sheet__footer">
          <button className="ballot-btn ballot-btn--solid" onClick={() => setStep(3)}>CONFIRM VOTE</button>
          <button className="ballot-sheet-back-link" onClick={() => setStep(1)}>BACK</button>
        </div>
      </div>
    )
  }

  const short = description.slice(0, 140) + '…'

  return (
    <div className="ballot-sheet ballot-sheet--full">
      {/* Single scrollable area — hero + info + candidates all scroll together */}
      <div className="ballot-sheet__scroll">
        <BallotHeroImg image={image} title={title} closeDate={closeDate} onClose={onClose} />
        <div className="ballot-sheet__scroll-inner">
          {/* Description snippet */}
          <p className="ballot-info__desc">
            {short}{' '}
            <button className="ballot-info__seemore" onClick={() => setShowDetail(true)}>See More</button>
          </p>
          <AttachmentBtn onOpen={() => openPdf({ filename: 'Ballot_Document.pdf', docType: 'ballot' })} />
          <div className="ballot-info__divider" />
          {/* Candidate selection */}
          <div className="ballot-select-meta">
            <p className="ballot-select-subtitle">Select up to {MAX} candidates <span className="ballot-select-seats">({MAX} of 5 seats)</span></p>
          </div>
          <div className="ballot-candidates">
            {CANDIDATES.map(c => {
              const isSelected = selected.includes(c.id)
              const bioShort = c.bio.slice(0, 185) + '…'
              return (
                <div
                  key={c.id}
                  className={`ballot-candidate${isSelected ? ' ballot-candidate--selected' : ''}`}
                  onClick={() => toggleCandidate(c.id)}
                >
                  <div className="ballot-candidate__top">
                    <img src={c.photo} alt={c.name} className="ballot-candidate__photo" />
                    <div className="ballot-candidate__info">
                      <div className="ballot-candidate__name">{c.name}</div>
                      <div className="ballot-candidate__role">{c.role}</div>
                    </div>
                    <div className={`ballot-candidate__check${isSelected ? ' ballot-candidate__check--on' : ''}`}>
                      {isSelected && (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8L6.5 11.5L13 4.5" stroke="var(--text-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <p className="ballot-candidate__bio">
                    {bioShort}{' '}
                    <button
                      className="ballot-candidate__readmore"
                      onClick={e => { e.stopPropagation(); setActiveCandidate(c) }}
                    >
                      Read More
                    </button>
                  </p>
                  {c.pdf && (
                    <>
                      <div className="ballot-candidate__pdf-divider" />
                      <button
                        className="ballot-candidate__pdf-link"
                        onClick={e => { e.stopPropagation(); openPdf({ filename: c.pdf, docType: 'candidate', candidateName: c.name }) }}
                      >
                        <svg width="18" height="20" viewBox="0 0 14 16" fill="none">
                          <path d="M8 1H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6L8 1z" stroke="var(--lime)" strokeWidth="1.3" strokeLinejoin="round"/>
                          <path d="M8 1v5h5" stroke="var(--lime)" strokeWidth="1.3" strokeLinejoin="round"/>
                          <path d="M5 9h4M5 12h2" stroke="var(--lime)" strokeWidth="1.3" strokeLinecap="round"/>
                        </svg>
                        <span className="ballot-candidate__pdf-label">{c.pdf}</span>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <path d="M6 3l5 5-5 5" stroke="var(--lime)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="ballot-sheet__footer">
        <button
          className={`ballot-btn ballot-btn--solid${selected.length < MAX ? ' ballot-btn--disabled' : ''}`}
          disabled={selected.length < MAX}
          onClick={() => setStep(2)}
        >
          CAST MY VOTE
        </button>
        <span className="ballot-select-counter__num" style={{ color: selected.length === MAX ? 'var(--lime)' : 'var(--text-muted)', textAlign: 'center' }}>
          {selected.length} / {MAX} selected
        </span>
      </div>
      {/* Second pull-up: full ballot description */}
      {showDetail && <BallotDetailSheet title={title} description={description} onClose={onDetailClose} onOpenPdf={() => openPdf({ filename: 'Ballot_Document.pdf', docType: 'ballot' })} />}
      {/* Second pull-up: candidate bio detail */}
      {activeCandidate && <CandidateDetailSheet candidate={activeCandidate} onClose={() => setActiveCandidate(null)} onOpenPdf={openPdf} />}
    </div>
  )
}

// ─── Non-Electoral Ballot Sheet ───────────────────────────────────────────────

function AssessmentSheet({ onClose, onVoted, image, title, closeDate, description, initialShowDetail, onOpenPdf, choices = ASSESSMENT_CHOICES, pdfDocType = 'assessment' }) {
  const [step, setStep] = useState(1)
  const [selected, setSelected] = useState(null)
  const [showDetail, setShowDetail] = useState(initialShowDetail || false)
  const onDetailClose = initialShowDetail ? onClose : () => setShowDetail(false)

  const openPdf = onOpenPdf || (() => {})

  if (step === 3) {
    const choice = choices.find(c => c.id === selected)
    return (
      <div className="ballot-sheet ballot-sheet--full">
        <SuccessScreen
          note="You can change your vote until the ballot closes."
          onClose={() => { onVoted?.(choice); onClose() }}
        />
      </div>
    )
  }

  if (step === 2) {
    const choice = choices.find(c => c.id === selected)
    return (
      <div className="ballot-sheet ballot-sheet--full">
        <SheetHeader
          title={title}
          onBack={() => setStep(1)}
          onClose={onClose}
        />
        <div className="ballot-sheet__body">
          <h2 className="ballot-confirm__heading">Confirm Your Vote</h2>
          <p className="ballot-confirm__ballot-name">{title}</p>
          <div className="ballot-confirm__choice-card">
            <div className={`ballot-choice-check ballot-choice-check--on`}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8L6.5 11.5L13 4.5" stroke="var(--text-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <div className="ballot-choice__label">{choice.label}</div>
            </div>
          </div>
          <p className="ballot-confirm__change-note">You may change your vote any time before {closeDate}.</p>
        </div>
        <div className="ballot-sheet__footer">
          <button className="ballot-btn ballot-btn--solid" onClick={() => setStep(3)}>CONFIRM VOTE</button>
          <button className="ballot-sheet-back-link" onClick={() => setStep(1)}>BACK</button>
        </div>
      </div>
    )
  }

  const short = description.slice(0, 140) + '…'

  return (
    <div className="ballot-sheet ballot-sheet--full">
      <div className="ballot-sheet__scroll">
        <BallotHeroImg image={image} title={title} closeDate={closeDate} onClose={onClose} />
        <div className="ballot-sheet__scroll-inner">
          <p className="ballot-info__desc">
            {short}{' '}
            <button className="ballot-info__seemore" onClick={() => setShowDetail(true)}>See More</button>
          </p>
          <AttachmentBtn onOpen={() => openPdf({ filename: 'Ballot_Document.pdf', docType: pdfDocType })} />
          <div className="ballot-info__divider" />
          <p className="ballot-select-subtitle">Cast your vote — you may change your selection before the ballot closes.</p>
          <div className="ballot-choices">
            {choices.map(c => (
              <div
                key={c.id}
                className={`ballot-choice${selected === c.id ? ' ballot-choice--selected' : ''}`}
                onClick={() => setSelected(c.id)}
              >
                <div className="ballot-choice__top">
                  <div className={`ballot-choice-check${selected === c.id ? ' ballot-choice-check--on' : ''}`}>
                    {selected === c.id && (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8L6.5 11.5L13 4.5" stroke="var(--text-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <div className="ballot-choice__content">
                    <div className="ballot-choice__label">{c.label}</div>
                  </div>
                </div>
                {c.desc && <p className="ballot-choice__desc">{c.desc}</p>}
                {c.pdf && (
                  <>
                    <div className="ballot-candidate__pdf-divider" />
                    <button
                      className="ballot-candidate__pdf-link"
                      onClick={e => { e.stopPropagation(); openPdf({ filename: c.pdf, docType: 'assessment', candidateName: c.label }) }}
                    >
                      <svg width="18" height="20" viewBox="0 0 14 16" fill="none">
                        <path d="M8 1H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6L8 1z" stroke="var(--lime)" strokeWidth="1.3" strokeLinejoin="round"/>
                        <path d="M8 1v5h5" stroke="var(--lime)" strokeWidth="1.3" strokeLinejoin="round"/>
                        <path d="M5 9h4M5 12h2" stroke="var(--lime)" strokeWidth="1.3" strokeLinecap="round"/>
                      </svg>
                      <span className="ballot-candidate__pdf-label">{c.pdf}</span>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M6 3l5 5-5 5" stroke="var(--lime)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="ballot-sheet__footer">
        <button
          className={`ballot-btn ballot-btn--solid${!selected ? ' ballot-btn--disabled' : ''}`}
          disabled={!selected}
          onClick={() => setStep(2)}
        >
          CAST MY VOTE
        </button>
      </div>
      {showDetail && <BallotDetailSheet title={title} description={description} onClose={onDetailClose} onOpenPdf={() => openPdf({ filename: 'Ballot_Document.pdf', docType: pdfDocType })} />}
    </div>
  )
}

// ─── Vote Receipt Sheet ───────────────────────────────────────────────────────

function VoteReceiptSheet({ ballotType, ballotTitle, receipt, onClose }) {
  const { candidates, choice, timestamp } = receipt
  const formatted = timestamp.toLocaleString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true,
  })

  return (
    <div className="ballot-sheet ballot-sheet--full">
      <div className="ballot-detail__header">
        <button className="ballot-detail__back" onClick={onClose} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="var(--text)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="ballot-detail__header-title">Vote Receipt</span>
        <CloseBtn onClick={onClose} />
      </div>
      <div className="ballot-detail__body">
        {/* Receipt card */}
        <div className="vote-receipt__card">
          <div className="vote-receipt__check">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="14" fill="var(--lime)" />
              <path d="M7 14L11.5 19L21 9" stroke="#1a2a1a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="vote-receipt__confirmed">Vote Confirmed</p>
          <p className="vote-receipt__ballot-name">{ballotTitle}</p>
          <div className="vote-receipt__divider" />
          <p className="vote-receipt__meta-label">DATE &amp; TIME CAST</p>
          <p className="vote-receipt__meta-value">{formatted}</p>
          <div className="vote-receipt__divider" />
          {candidates ? (
            <>
              <p className="vote-receipt__meta-label">YOUR SELECTIONS</p>
              <div className="vote-receipt__candidates">
                {candidates.map(c => (
                  <div key={c.id} className="vote-receipt__candidate">
                    <img src={c.photo} alt={c.name} className="vote-receipt__candidate-photo" />
                    <div>
                      <div className="vote-receipt__candidate-name">{c.name}</div>
                      <div className="vote-receipt__candidate-role">{c.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : choice ? (
            <>
              <p className="vote-receipt__meta-label">YOUR SELECTION</p>
              <p className="vote-receipt__choice">{choice.label}</p>
            </>
          ) : null}
        </div>
        <p className="vote-receipt__note">
          {ballotType === 'electoral'
            ? 'Your vote has been recorded and is final. Electoral ballot selections cannot be changed after submission.'
            : 'A confirmation has been recorded. You may change your vote any time before the ballot closes.'}
        </p>
      </div>
    </div>
  )
}

// ─── Ballot Card ──────────────────────────────────────────────────────────────

const DESCRIPTIONS = {
  electoral: 'The annual Board of Directors election determines who will serve in leadership positions for the 2027 fiscal year. This year, five candidates are running for three open seats. Residents are encouraged to review each candidate\'s platform before voting.\n\nThe Board of Directors is responsible for overseeing the financial health of the association, approving the annual budget, enforcing community rules and regulations, and making decisions on capital improvement projects. Elected members serve two-year terms, and this election will fill three of the five available seats.\n\nVoting is open exclusively to homeowners in good standing — defined as having no outstanding assessments or violation fines at the time of the election. Each unit receives one vote regardless of the number of owners on the deed. You may select up to three candidates. Your selections are confidential and cannot be changed after submission. Results will be announced at the Annual Meeting on July 12, 2026.',
  assessment: 'The HOA Board is requesting approval for a one-time special assessment to fund critical asphalt resurfacing of the community\'s main roads. Pavement deterioration has been rated "poor" by our engineering firm, and delaying repairs may result in higher costs and potential liability exposure.\n\nThe total project cost is estimated at $285,000. With 634 units in the community, this translates to a one-time assessment of $450 per unit, due in two equal installments of $225 — the first due August 1, 2026, and the second due November 1, 2026. Payment plans are available upon request.\n\nIf the assessment is approved, work is scheduled to begin in September 2026 and be completed before the end of the year. If rejected, the Board will explore alternative financing options, though further deterioration during that period could significantly increase the overall project cost. All homeowners in good standing are eligible to vote. You may change your vote at any time before the ballot closes on June 29, 2026.',
  clubhouse: 'The Board of Directors is inviting all homeowners to vote on the new design direction for the Lovera Premier Clubhouse renovation. Following a community survey and three design presentations held in April 2026, the Board has shortlisted three concepts for a final community vote.\n\nOption A (Modern) features clean lines, floor-to-ceiling windows, and a minimalist interior palette with smart-home integration. Option B (Classic) preserves the original architectural character of the building with updated finishes, crown molding, and traditional furnishings. Option C (Barn) embraces a warm, rustic aesthetic with reclaimed wood accents, exposed beams, and a farmhouse-inspired great room.\n\nAll three designs have been budgeted within the existing renovation reserve allocation of $180,000. The winning design will be contracted by August 1, 2026, with construction expected to conclude by November 30, 2026. Each homeowner in good standing may cast one vote. You may change your selection until the ballot closes on July 15, 2026.',
}

function BallotCard({ sectionLabel, image, title, descKey, closeDate, countdownTarget, onVote, onSeeMore, voted, onOpenReceipt, canRecast, onResetVote }) {
  const desc = DESCRIPTIONS[descKey]
  const short = desc.slice(0, 160) + '…'

  return (
    <div className="ballot-section">
      <p className="ballot-section__label">{sectionLabel}</p>
      <div className={`ballot-card${voted ? ' ballot-card--voted' : ''}`}>
        <div className="ballot-card__hero" onClick={voted ? undefined : onVote} style={{ cursor: voted ? 'default' : 'pointer' }}>
          <img src={image} alt={title} className="ballot-card__img" />
          <div className="ballot-card__gradient" />
          {voted && (
            <div
              className="ballot-card__voted-badge"
              onClick={onResetVote ? e => { e.stopPropagation(); onResetVote() } : undefined}
              style={onResetVote ? { cursor: 'pointer' } : undefined}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="7" fill="var(--lime)" />
                <path d="M3.5 7L5.5 9.5L10.5 4.5" stroke="#1a2a1a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Vote Cast
            </div>
          )}
        </div>
        <div className="ballot-card__body">
          <h3 className="ballot-card__title">{title}</h3>
          <p className="ballot-card__desc">
            {short}{' '}
            <button className="ballot-card__seemore" onClick={onSeeMore}>See More</button>
          </p>
          {voted ? (
            <>
              {canRecast && (
                <>
                  <p className="ballot-card__close-label">VOTE CLOSES {closeDate}</p>
                  <CountdownTimer target={countdownTarget} />
                </>
              )}
              <button className="ballot-btn ballot-btn--outline ballot-btn--full" onClick={onOpenReceipt}>
                SEE VOTE RECEIPT
              </button>
              {canRecast && (
                <button className="ballot-btn ballot-btn--solid ballot-btn--full" style={{ marginTop: '10px' }} onClick={onVote}>
                  RE-CAST MY VOTE
                </button>
              )}
            </>
          ) : (
            <>
              <p className="ballot-card__close-label">VOTE CLOSES {closeDate}</p>
              <CountdownTimer target={countdownTarget} />
              <button className="ballot-btn ballot-btn--solid ballot-btn--full" onClick={onVote}>
                CAST MY VOTE
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function ResidentBallots() {
  const { popResidentView } = useMode()
  const [activeSheet, setActiveSheet] = useState(null)
  const [openWithDetail, setOpenWithDetail] = useState(false)
  const [activePdf, setActivePdf] = useState(null)
  const [votedBallots, setVotedBallots] = useState(new Set())
  const [voteReceipts, setVoteReceipts] = useState({})
  const [activeReceipt, setActiveReceipt] = useState(null)
  const [filterType, setFilterType] = useState('all') // 'all' | 'electoral' | 'non-electoral'

  const markVoted = (key, data) => {
    setVotedBallots(prev => new Set([...prev, key]))
    setVoteReceipts(prev => ({ ...prev, [key]: { ...data, timestamp: new Date() } }))
  }

  const resetVote = (key) => {
    setVotedBallots(prev => { const s = new Set(prev); s.delete(key); return s })
    setVoteReceipts(prev => { const r = { ...prev }; delete r[key]; return r })
  }

  const openSheet = (sheet, withDetail = false) => {
    setOpenWithDetail(withDetail)
    setActiveSheet(sheet)
  }

  const portalTarget = document.querySelector('.phone-frame') || document.body

  return (
    <div className="screen resident-ballots">
      {/* Header */}
      <div className="resident-ballots__header">
        <h1 className="resident-ballots__title">Ballots &amp; Votes</h1>
      </div>

      {/* Search bar */}
      <div className="amenities-search" style={{ margin: '0 16px 12px' }}>
        <input
          className="amenities-search__input"
          placeholder="Search ballots…"
          readOnly
        />
        <span className="amenities-search__icon" style={{ opacity: 0.7 }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="8" cy="8" r="5.5" stroke="var(--text)" strokeWidth="1.5" />
            <path d="M12.5 12.5L16 16" stroke="var(--text)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </div>

      {/* Filter chips */}
      <div className="ballot-filter-chips">
        {['all', 'electoral', 'non-electoral'].map(f => (
          <button
            key={f}
            className={`ballot-filter-chip${filterType === f ? ' ballot-filter-chip--active' : ''}`}
            onClick={() => setFilterType(f)}
          >
            {f === 'all' ? 'All' : f === 'electoral' ? 'Electoral' : 'Non-Electoral'}
          </button>
        ))}
      </div>

      {/* Ballot cards — voted ones rendered last */}
      {(filterType === 'all' || filterType === 'electoral') && !votedBallots.has('electoral') && <BallotCard
        sectionLabel="ELECTORAL BALLOT"
        image={boardImg}
        title="2027 Board of Directors Election"
        descKey="electoral"
        closeDate="JUNE 29 2026, 11:59 PM"
        countdownTarget={ELECTION_CLOSE}
        onVote={() => openSheet('electoral')}
        onSeeMore={() => openSheet('electoral', true)}
        voted={false}
      />}
      {(filterType === 'all' || filterType === 'non-electoral') && !votedBallots.has('assessment') && <BallotCard
        sectionLabel="NON-ELECTORAL BALLOT"
        image={roadImg}
        title="Special Assessment for HOA Main Roads Repair"
        descKey="assessment"
        closeDate="JUNE 29 2026, 11:59 PM"
        countdownTarget={ASSESSMENT_CLOSE}
        onVote={() => openSheet('assessment')}
        onSeeMore={() => openSheet('assessment', true)}
        voted={false}
      />}
      {(filterType === 'all' || filterType === 'non-electoral') && !votedBallots.has('clubhouse') && <BallotCard
        sectionLabel="NON-ELECTORAL BALLOT"
        image={newChImg}
        title="Clubhouse Design Proposal"
        descKey="clubhouse"
        closeDate="JULY 15 2026, 11:59 PM"
        countdownTarget={CLUBHOUSE_CLOSE}
        onVote={() => openSheet('clubhouse')}
        onSeeMore={() => openSheet('clubhouse', true)}
        voted={false}
      />}

      {/* Voted cards — shown at bottom */}
      {(filterType === 'all' || filterType === 'electoral') && votedBallots.has('electoral') && <BallotCard
        sectionLabel="ELECTORAL BALLOT"
        image={boardImg}
        title="2027 Board of Directors Election"
        descKey="electoral"
        closeDate="JUNE 29 2026, 11:59 PM"
        countdownTarget={ELECTION_CLOSE}
        onVote={() => openSheet('electoral')}
        onSeeMore={() => openSheet('electoral', true)}
        voted={true}
        onOpenReceipt={() => setActiveReceipt('electoral')}
        onResetVote={() => resetVote('electoral')}
      />}
      {(filterType === 'all' || filterType === 'non-electoral') && votedBallots.has('assessment') && <BallotCard
        sectionLabel="NON-ELECTORAL BALLOT"
        image={roadImg}
        title="Special Assessment for HOA Main Roads Repair"
        descKey="assessment"
        closeDate="JUNE 29 2026, 11:59 PM"
        countdownTarget={ASSESSMENT_CLOSE}
        onVote={() => openSheet('assessment')}
        onSeeMore={() => openSheet('assessment', true)}
        voted={true}
        onOpenReceipt={() => setActiveReceipt('assessment')}
        canRecast
        onResetVote={() => resetVote('assessment')}
      />}
      {(filterType === 'all' || filterType === 'non-electoral') && votedBallots.has('clubhouse') && <BallotCard
        sectionLabel="NON-ELECTORAL BALLOT"
        image={newChImg}
        title="Clubhouse Design Proposal"
        descKey="clubhouse"
        closeDate="JULY 15 2026, 11:59 PM"
        countdownTarget={CLUBHOUSE_CLOSE}
        onVote={() => openSheet('clubhouse')}
        onSeeMore={() => openSheet('clubhouse', true)}
        voted={true}
        onOpenReceipt={() => setActiveReceipt('clubhouse')}
        canRecast
        onResetVote={() => resetVote('clubhouse')}
      />}

      {/* Portals */}
      {activeSheet === 'electoral' && createPortal(
        <div className="ballot-overlay">
          <div className="ballot-overlay__backdrop" onClick={() => setActiveSheet(null)} />
          <ElectoralSheet
            onClose={() => setActiveSheet(null)}
            onVoted={(candidates) => { markVoted('electoral', { candidates }); setActiveSheet(null) }}
            image={boardImg}
            title="2027 Board of Directors Election"
            closeDate="June 29, 2026, 11:59 PM"
            description={DESCRIPTIONS.electoral}
            initialShowDetail={openWithDetail}
            onOpenPdf={setActivePdf}
          />
        </div>,
        portalTarget
      )}
      {activeSheet === 'assessment' && createPortal(
        <div className="ballot-overlay">
          <div className="ballot-overlay__backdrop" onClick={() => setActiveSheet(null)} />
          <AssessmentSheet
            onClose={() => setActiveSheet(null)}
            onVoted={(choice) => { markVoted('assessment', { choice }); setActiveSheet(null) }}
            image={roadImg}
            title="Special Assessment for HOA Main Roads Repair"
            closeDate="June 29, 2026, 11:59 PM"
            description={DESCRIPTIONS.assessment}
            initialShowDetail={openWithDetail}
            onOpenPdf={setActivePdf}
          />
        </div>,
        portalTarget
      )}
      {activeSheet === 'clubhouse' && createPortal(
        <div className="ballot-overlay">
          <div className="ballot-overlay__backdrop" onClick={() => setActiveSheet(null)} />
          <AssessmentSheet
            onClose={() => setActiveSheet(null)}
            onVoted={(choice) => { markVoted('clubhouse', { choice }); setActiveSheet(null) }}
            image={newChImg}
            title="Clubhouse Design Proposal"
            closeDate="July 15, 2026, 11:59 PM"
            description={DESCRIPTIONS.clubhouse}
            choices={CLUBHOUSE_CHOICES}
            pdfDocType="assessment"
            initialShowDetail={openWithDetail}
            onOpenPdf={setActivePdf}
          />
        </div>,
        portalTarget
      )}
      {activePdf && (
        <ResidentPDFViewer
          {...activePdf}
          onClose={() => setActivePdf(null)}
        />
      )}

      {/* Vote Receipt */}
      {activeReceipt && voteReceipts[activeReceipt] && createPortal(
        <div className="ballot-overlay">
          <div className="ballot-overlay__backdrop" onClick={() => setActiveReceipt(null)} />
          <VoteReceiptSheet
            ballotType={activeReceipt}
            ballotTitle={activeReceipt === 'electoral' ? '2027 Board of Directors Election' : activeReceipt === 'assessment' ? 'Special Assessment for HOA Main Roads Repair' : 'Clubhouse Design Proposal'}
            receipt={voteReceipts[activeReceipt]}
            onClose={() => setActiveReceipt(null)}
          />
        </div>,
        portalTarget
      )}
    </div>
  )
}
