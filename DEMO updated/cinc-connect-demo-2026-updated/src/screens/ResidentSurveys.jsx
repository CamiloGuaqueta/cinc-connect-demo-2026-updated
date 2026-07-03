import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useMode } from '../ModeContext'
import ResidentPDFViewer from './ResidentPDFViewer'
import ratingImg from '../images/rating.jpg'
import shImg from '../images/sh.jpg'
import gimImg from '../images/gim.jpg'
import './ResidentSurveys.css'

// ─── Survey Data ──────────────────────────────────────────────────────────────

const SURVEYS = [
  {
    id: 'satisfaction',
    image: ratingImg,
    title: 'HOA Management Satisfaction',
    closeDate: new Date('2026-07-31T23:59:00'),
    closeDateLabel: 'JULY 31 2026, 11:59 PM',
    type: 'multiple-choice',
    options: [
      { id: 'excellent', label: 'Excellent' },
      { id: 'good',      label: 'Good' },
      { id: 'fair',      label: 'Fair' },
      { id: 'poor',      label: 'Poor' },
      { id: 'very-poor', label: 'Very Poor' },
    ],
    description: 'The HOA Board invites all homeowners to share their feedback on overall community management performance for the 2025–2026 fiscal year. Your input directly informs board priorities and helps us identify areas where we can improve service delivery.\n\nThis survey covers satisfaction with communication, responsiveness to maintenance requests, enforcement of community rules, and financial transparency. All responses are anonymous and will be compiled into a summary report shared with the community at the Annual Meeting on July 12, 2026.\n\nPlease take a moment to share your honest assessment. Your voice matters in shaping how this community is managed.',
  },
  {
    id: 'amenity',
    image: gimImg,
    title: 'Amenity Improvement Priority',
    closeDate: new Date('2026-08-15T23:59:00'),
    closeDateLabel: 'AUGUST 15 2026, 11:59 PM',
    type: 'multiple-choice',
    options: [
      { id: 'pool',     label: 'Pool & Spa' },
      { id: 'fitness',  label: 'Fitness Center' },
      { id: 'club',     label: 'Clubhouse' },
      { id: 'tennis',   label: 'Tennis Courts' },
      { id: 'trails',   label: 'Walking Trails' },
    ],
    description: 'As part of the 2027 Capital Improvement Plan, the Board is gathering resident input on which shared amenity should receive the highest priority for renovation or enhancement. Budget has been allocated for one major amenity improvement project this cycle.\n\nEach option has been assessed for current condition, usage frequency, and estimated improvement cost. Your selection will be weighted alongside inspection reports and usage data when the Board makes its final decision in September 2026.\n\nSelect the amenity you feel most needs attention and would benefit the greatest number of residents.',
  },
  {
    id: 'quiet-hours',
    image: shImg,
    title: 'Quiet Hours Policy',
    closeDate: new Date('2026-06-30T23:59:00'),
    closeDateLabel: 'JUNE 30 2026, 11:59 PM',
    type: 'yes-no',
    options: [
      { id: 'yes', label: 'YES' },
      { id: 'no',  label: 'NO' },
    ],
    description: 'The current Lovera Premier quiet hours policy prohibits excessive noise between 10:00 PM and 8:00 AM on weekdays, and 11:00 PM and 9:00 AM on weekends. The Board is reviewing whether these hours continue to reflect the needs and preferences of our residents.\n\nSeveral homeowners have requested extending quiet hours on weekends to better accommodate families with young children. Others have noted that the current policy is adequate and enforced fairly. The Board wants to hear directly from the community before making any changes.\n\nDo you feel the current quiet hours policy is adequate for the community?',
  },
]

// ─── Close Button ─────────────────────────────────────────────────────────────

function CloseBtn({ onClick }) {
  return (
    <button className="survey-sheet-close" onClick={onClick} aria-label="Close">
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
    <div className="survey-sheet-header">
      <div className="survey-sheet__handle" />
      <div className="survey-sheet-header__nav">
        <button className="survey-sheet-back" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 5L7.5 10L12.5 15" stroke="var(--text)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
        <span className="survey-sheet-header__title">{title}</span>
        <CloseBtn onClick={onClose} />
      </div>
    </div>
  )
}

// ─── Success Screen ───────────────────────────────────────────────────────────

function SurveySuccessScreen({ onClose }) {
  return (
    <div className="survey-success">
      <div className="survey-success__icon">
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
          <circle cx="36" cy="36" r="36" fill="var(--lime)" fillOpacity="0.15" />
          <circle cx="36" cy="36" r="28" fill="var(--lime)" fillOpacity="0.22" />
          <circle cx="36" cy="36" r="20" fill="var(--lime)" />
          <path d="M26 36.5L32.5 43L46 29" stroke="var(--text-dark)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 className="survey-success__title">Response Recorded!</h2>
      <p className="survey-success__sub">A receipt has been sent to your email at n***@gmail.com.</p>
      <p className="survey-success__note">You can change your answer until the survey closes.</p>
      <p className="survey-success__hint">Access your receipt anytime in the Participation section.</p>
      <div className="survey-success__actions">
        <button className="survey-btn survey-btn--outline">DOWNLOAD RECEIPT</button>
        <button className="survey-btn survey-btn--solid" onClick={onClose}>CLOSE</button>
      </div>
    </div>
  )
}

// ─── Survey Hero Image ────────────────────────────────────────────────────────

function SurveyHeroImg({ image, title, closeDateLabel, onClose }) {
  return (
    <div className="survey-hero__img-wrap">
      <div className="survey-hero__handle" />
      <img src={image} alt={title} className="survey-hero__img" />
      <div className="survey-hero__gradient" />
      <CloseBtn onClick={onClose} />
      <div className="survey-hero__overlay-text">
        <h2 className="survey-hero__title">{title}</h2>
        <p className="survey-hero__close-date">CLOSES {closeDateLabel}</p>
      </div>
    </div>
  )
}

// ─── Survey Detail Sheet (description full view) ──────────────────────────────

function SurveyDetailSheet({ title, description, onClose }) {
  return (
    <div className="survey-detail">
      <SheetHeader title="" onBack={onClose} onClose={onClose} />
      <div className="survey-sheet__body">
        <h2 className="survey-detail__title">{title}</h2>
        {description.split('\n\n').map((para, i) => (
          <p key={i} className="survey-info__desc" style={{ lineHeight: 1.65, marginBottom: 14 }}>{para}</p>
        ))}
      </div>
    </div>
  )
}

// ─── Survey Sheet (main pull-up) ─────────────────────────────────────────────

function SurveySheet({ survey, onClose, onAnswered, initialShowDetail }) {
  const [step, setStep] = useState(1) // 1 = select, 2 = confirm, 3 = success
  const [selected, setSelected] = useState(null)
  const [showDetail, setShowDetail] = useState(initialShowDetail || false)
  const onDetailClose = initialShowDetail ? onClose : () => setShowDetail(false)

  if (step === 3) {
    return (
      <div className="survey-sheet survey-sheet--full">
        <SurveySuccessScreen
          onClose={() => { onAnswered?.(selected); onClose() }}
        />
      </div>
    )
  }

  if (step === 2) {
    const choice = survey.options.find(o => o.id === selected)
    return (
      <div className="survey-sheet survey-sheet--full">
        <SheetHeader
          title={survey.title}
          onBack={() => setStep(1)}
          onClose={onClose}
        />
        <div className="survey-sheet__body">
          <h2 className="survey-confirm__heading">Confirm Your Answer</h2>
          <p className="survey-confirm__name">{survey.title}</p>
          <div className="survey-confirm__choice-card">
            <div className="survey-choice-check survey-choice-check--on">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8L6.5 11.5L13 4.5" stroke="var(--text-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="survey-choice__label">{choice.label}</div>
          </div>
          <p className="survey-confirm__change-note">You may change your answer any time before the survey closes on {survey.closeDateLabel}.</p>
        </div>
        <div className="survey-sheet__footer">
          <button className="survey-btn survey-btn--solid" onClick={() => setStep(3)}>SUBMIT ANSWER</button>
          <button className="survey-sheet-back-link" onClick={() => setStep(1)}>BACK</button>
        </div>
      </div>
    )
  }

  const short = survey.description.slice(0, 140) + '…'

  return (
    <div className="survey-sheet survey-sheet--full">
      <div className="survey-sheet__scroll">
        <SurveyHeroImg
          image={survey.image}
          title={survey.title}
          closeDateLabel={survey.closeDateLabel}
          onClose={onClose}
        />
        <div className="survey-sheet__scroll-inner">
          <p className="survey-info__desc">
            {short}{' '}
            <button className="survey-info__seemore" onClick={() => setShowDetail(true)}>See More</button>
          </p>
          <div className="survey-info__divider" />
          <p className="survey-select-subtitle">Select your answer — you may change it before the survey closes.</p>
          <div className="survey-choices">
            {survey.options.map(opt => (
              <div
                key={opt.id}
                className={`survey-choice${selected === opt.id ? ' survey-choice--selected' : ''}`}
                onClick={() => setSelected(opt.id)}
              >
                <div className="survey-choice__top">
                  <div className={`survey-choice-check${selected === opt.id ? ' survey-choice-check--on' : ''}`}>
                    {selected === opt.id && (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8L6.5 11.5L13 4.5" stroke="var(--text-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <div className="survey-choice__content">
                    <div className="survey-choice__label">{opt.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="survey-sheet__footer">
        <button
          className={`survey-btn survey-btn--solid${!selected ? ' survey-btn--disabled' : ''}`}
          disabled={!selected}
          onClick={() => setStep(2)}
        >
          ANSWER SURVEY
        </button>
      </div>
      {showDetail && (
        <SurveyDetailSheet
          title={survey.title}
          description={survey.description}
          onClose={onDetailClose}
        />
      )}
    </div>
  )
}

// ─── Survey Receipt Sheet ─────────────────────────────────────────────────────

function SurveyReceiptSheet({ survey, answer, timestamp, onClose }) {
  const formatted = timestamp.toLocaleString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true,
  })
  const choice = survey.options.find(o => o.id === answer)

  return (
    <div className="survey-sheet survey-sheet--full">
      <div className="survey-detail__header">
        <button className="survey-detail__back" onClick={onClose} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="var(--text)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="survey-detail__header-title">Survey Response</span>
        <CloseBtn onClick={onClose} />
      </div>
      <div className="survey-detail__body">
        <div className="survey-receipt__card">
          <div className="survey-receipt__check">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="14" fill="var(--lime)" />
              <path d="M7 14L11.5 19L21 9" stroke="#1a2a1a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="survey-receipt__confirmed">Response Confirmed</p>
          <p className="survey-receipt__name">{survey.title}</p>
          <div className="survey-receipt__divider" />
          <p className="survey-receipt__meta-label">DATE &amp; TIME ANSWERED</p>
          <p className="survey-receipt__meta-value">{formatted}</p>
          <div className="survey-receipt__divider" />
          <p className="survey-receipt__meta-label">YOUR ANSWER</p>
          <p className="survey-receipt__choice">{choice?.label}</p>
        </div>
        <p className="survey-receipt__note">
          A confirmation has been recorded. You may change your answer any time before the survey closes.
        </p>
      </div>
    </div>
  )
}

// ─── Survey Card ──────────────────────────────────────────────────────────────

function SurveyCard({ survey, answered, onAnswer, onSeeMore, onOpenReceipt, onChangeAnswer, onResetSurvey }) {
  const short = survey.description.slice(0, 160) + '…'

  return (
    <div className="survey-section">
      <p className="survey-section__label">{survey.type === 'yes-no' ? 'YES / NO SURVEY' : 'MULTIPLE CHOICE SURVEY'}</p>
      <div className={`survey-card${answered ? ' survey-card--answered' : ''}`}>
        <div
          className="survey-card__hero"
          onClick={answered ? undefined : onAnswer}
          style={{ cursor: answered ? 'default' : 'pointer' }}
        >
          <img src={survey.image} alt={survey.title} className="survey-card__img" />
          <div className="survey-card__gradient" />
          {answered && (
            <div
              className="survey-card__answered-badge"
              onClick={onResetSurvey ? e => { e.stopPropagation(); onResetSurvey() } : undefined}
              style={onResetSurvey ? { cursor: 'pointer' } : undefined}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="7" fill="var(--lime)" />
                <path d="M3.5 7L5.5 9.5L10.5 4.5" stroke="#1a2a1a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Answered
            </div>
          )}
        </div>
        <div className="survey-card__body">
          <h3 className="survey-card__title">{survey.title}</h3>
          <p className="survey-card__desc">
            {short}{' '}
            <button className="survey-card__seemore" onClick={onSeeMore}>See More</button>
          </p>
          {answered ? (
            <>
              <button className="survey-btn survey-btn--outline survey-btn--full" onClick={onOpenReceipt}>
                SEE MY RESPONSE
              </button>
              <button className="survey-btn survey-btn--solid survey-btn--full" style={{ marginTop: '10px' }} onClick={onAnswer}>
                CHANGE MY ANSWER
              </button>
            </>
          ) : (
            <>
              <p className="survey-card__close-label">CLOSES {survey.closeDateLabel}</p>
              <button className="survey-btn survey-btn--solid survey-btn--full" onClick={onAnswer}>
                ANSWER SURVEY
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function ResidentSurveys() {
  const { popResidentView } = useMode()
  const [answeredSurveys, setAnsweredSurveys] = useState(new Set())
  const [surveyResponses, setSurveyResponses] = useState({})
  const [activeReceipt, setActiveReceipt] = useState(null)
  const [activeSheet, setActiveSheet] = useState(null)
  const [openWithDetail, setOpenWithDetail] = useState(false)

  const markAnswered = (surveyId, answerId) => {
    setAnsweredSurveys(prev => new Set([...prev, surveyId]))
    setSurveyResponses(prev => ({ ...prev, [surveyId]: { answer: answerId, timestamp: new Date() } }))
  }

  const resetSurvey = (surveyId) => {
    setAnsweredSurveys(prev => { const s = new Set(prev); s.delete(surveyId); return s })
    setSurveyResponses(prev => { const r = { ...prev }; delete r[surveyId]; return r })
  }

  const openSheet = (surveyId, withDetail = false) => {
    setOpenWithDetail(withDetail)
    setActiveSheet(surveyId)
  }

  const portalTarget = document.querySelector('.phone-frame') || document.body

  // Unanswered first, answered last
  const unanswered = SURVEYS.filter(s => !answeredSurveys.has(s.id))
  const answered   = SURVEYS.filter(s =>  answeredSurveys.has(s.id))
  const ordered = [...unanswered, ...answered]

  const activeSurvey = SURVEYS.find(s => s.id === activeSheet)

  return (
    <div className="screen resident-surveys">
      {/* Header */}
      <div className="resident-surveys__header">
        <h1 className="resident-surveys__title">Surveys</h1>
      </div>

      {/* Search bar */}
      <div className="amenities-search" style={{ margin: '0 16px 12px' }}>
        <input
          className="amenities-search__input"
          placeholder="Search surveys…"
          readOnly
        />
        <span className="amenities-search__icon">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12.5 12.5L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </div>

      {/* Survey cards */}
      {ordered.map(survey => (
        <SurveyCard
          key={survey.id}
          survey={survey}
          answered={answeredSurveys.has(survey.id)}
          onAnswer={() => openSheet(survey.id)}
          onSeeMore={() => openSheet(survey.id, true)}
          onOpenReceipt={() => setActiveReceipt(survey.id)}
          onChangeAnswer={() => openSheet(survey.id)}
          onResetSurvey={() => resetSurvey(survey.id)}
        />
      ))}

      {/* Survey Sheet portal */}
      {activeSheet && activeSurvey && createPortal(
        <div className="survey-overlay">
          <div className="survey-overlay__backdrop" onClick={() => setActiveSheet(null)} />
          <SurveySheet
            survey={activeSurvey}
            onClose={() => setActiveSheet(null)}
            onAnswered={(answerId) => { markAnswered(activeSheet, answerId); setActiveSheet(null) }}
            initialShowDetail={openWithDetail}
          />
        </div>,
        portalTarget
      )}

      {/* Receipt portal */}
      {activeReceipt && surveyResponses[activeReceipt] && createPortal(
        <div className="survey-overlay">
          <div className="survey-overlay__backdrop" onClick={() => setActiveReceipt(null)} />
          <SurveyReceiptSheet
            survey={SURVEYS.find(s => s.id === activeReceipt)}
            answer={surveyResponses[activeReceipt].answer}
            timestamp={surveyResponses[activeReceipt].timestamp}
            onClose={() => setActiveReceipt(null)}
          />
        </div>,
        portalTarget
      )}
    </div>
  )
}
