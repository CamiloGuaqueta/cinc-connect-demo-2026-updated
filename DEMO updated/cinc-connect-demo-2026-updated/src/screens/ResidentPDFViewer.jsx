import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import './ResidentPDFViewer.css'

// ─── Mock content ─────────────────────────────────────────────────────────────

const CONTENT = {
  ballot: {
    heading: 'Cardinal Hills HOA',
    subheading: '2027 Board of Directors Election — Official Ballot Document',
    body: [
      "This document constitutes the official ballot package for the 2027 Annual Board of Directors Election of the Cardinal Hills Homeowners Association. The election is conducted in accordance with California Civil Code §5100 and the Association's Bylaws, Article VI, Section 3.",
      'OPEN SEATS: Three (3) of five (5) board seats are open for election for a two-year term commencing August 1, 2026 and expiring July 31, 2028.',
      'ELIGIBILITY: Only members in good standing as of June 1, 2026 are eligible to vote. A member is considered in good standing if all assessments and charges are current and no unresolved violation notices are pending.',
      'VOTING INSTRUCTIONS: Each unit is entitled to cast one (1) ballot with up to three (3) candidate selections. Votes may be cast electronically via the resident app through June 29, 2026 at 11:59 PM Pacific Time. Paper ballots are available upon written request to management.',
      'RESULTS: Tabulated results will be announced at the Annual Meeting on July 12, 2026 at 6:30 PM in the Clubhouse. Results will also be posted on the resident portal within 24 hours of certification.',
      'Prepared by: Cardinal Hills HOA Management — Date: May 15, 2026 — Document ID: CH-2026-BOD-ELECTION-001',
    ],
  },
  assessment: {
    heading: 'Cardinal Hills HOA',
    subheading: 'Special Assessment — Road Resurfacing Project No. 2026-SR',
    body: [
      "This document provides the official notice and supporting information for the Special Assessment Vote regarding the Cardinal Hills Main Roads Resurfacing Project. This assessment is proposed pursuant to the Association's Declaration of Covenants, Conditions, and Restrictions (CC&Rs), Article VIII, Section 4.",
      'PROJECT SCOPE: Complete asphalt resurfacing of all interior community roads, including Cardinal Hills Drive, Cardinal Point Road, and all interior cul-de-sac spurs. Total linear footage: approximately 4,200 linear feet.',
      'ENGINEERING REPORT: A pavement condition assessment conducted March 2026 by Hartwell & Associates Civil Engineering rated the community road surfaces at a PCI of 28 out of 100, classified as "Poor." Immediate intervention is recommended to prevent accelerated deterioration and potential trip-and-fall liability.',
      'FINANCIAL SUMMARY: Total estimated project cost: $285,000. Per-unit special assessment: $450.00. Payment schedule: Two installments of $225.00 due August 1, 2026 and November 1, 2026 respectively.',
      'Payment plans of up to 12 months are available for residents experiencing financial hardship. Requests must be submitted in writing to management by July 15, 2026.',
      'Prepared by: Cardinal Hills HOA Board of Directors — Date: May 20, 2026 — Document ID: CH-2026-ASSESSMENT-SR-001',
    ],
  },
  bylaws: {
    heading: 'Cardinal Hills HOA',
    subheading: 'Declaration of Bylaws — Restated and Amended',
    body: [
      "These Bylaws govern the internal affairs of the Cardinal Hills Homeowners Association and supplement the Association's Declaration of Covenants, Conditions, and Restrictions (CC&Rs). In the event of a conflict between these Bylaws and the CC&Rs, the CC&Rs control.",
      'ARTICLE III — BOARD OF DIRECTORS: The Association is governed by a five (5) member Board of Directors, each serving a two-year term. Officers consist of a President, Vice President, Secretary, Treasurer, and one Member at Large, elected annually by the Board from among its members.',
      'ARTICLE IV — MEETINGS: Regular Board meetings are held monthly and are open to all members in good standing. The Annual Meeting, at which election results are certified and the budget is ratified, is held each July.',
      'ARTICLE V — ASSESSMENTS: Regular assessments are levied monthly and are due on the 1st of each month. Special assessments require a majority vote of the Board and, where required by the Declaration, approval of the membership.',
      'ARTICLE VI — ARCHITECTURAL REVIEW: No exterior alteration, addition, or landscaping change may be made without prior written approval from the Architectural Review Committee, as detailed in the Architectural Guidelines.',
      'Adopted by the Board of Directors — Restated May 1, 2024 — Document ID: CH-BYLAWS-2024-R1',
    ],
  },
  ccrs: {
    heading: 'Cardinal Hills HOA',
    subheading: 'Declaration of Covenants, Conditions & Restrictions (CC&Rs) — 2023 Amended Edition',
    body: [
      'This Declaration is recorded against every lot within Cardinal Hills and binds all owners, residents, tenants and guests. It was originally recorded in 2018 and amended in 2021 and 2023. Where the Bylaws and this Declaration conflict, this Declaration controls.',
      'ARTICLE 3 — USE RESTRICTIONS: Each lot shall be used for single-family residential purposes. Home businesses are permitted only when they generate no customer traffic, signage or commercial vehicles parked within the community.',
      'SECTION 4.1 — ARCHITECTURAL CONTROL: The Architectural Control Committee (ACC) reviews all proposed improvements for harmony of external design, color and location in relation to surrounding structures and topography.',
      'SECTION 4.2 — EXTERIOR MODIFICATIONS: No exterior improvement, alteration or change of finish — including fences, stains and paint colors — shall be commenced until plans have been approved in writing by the Architectural Control Committee. Colors must be selected from the community-approved palette.',
      "SECTION 4.3 — REVIEW PERIOD: The Committee shall respond within thirty (30) days of receiving a complete application. Approval shall not be unreasonably withheld. Work started without approval may be cited as a violation and the owner may be required to restore the original condition at the owner's expense.",
      'SECTION 6.1 — MAINTENANCE: Each owner shall keep the lot, landscaping and exterior of the home in good repair, including lawns, shrubs, trees, fences and paint, consistent with the Landscaping & Lawn Care Policy.',
      'SECTION 8.2 — PARKING: Guest spaces are reserved for visitors only. Residents may not park in guest zones, and no vehicle may remain in a guest space for more than 72 consecutive hours.',
      'Recorded with the County Recorder — Amended March 14, 2023 — Document ID: CH-CCR-2023-A2',
    ],
  },
  arch: {
    heading: 'Cardinal Hills HOA',
    subheading: 'Architectural Review Guidelines — Owner Handbook',
    body: [
      'These Guidelines explain how the Architectural Control Committee applies CC&Rs Article 4. They are intended to help owners prepare complete applications and avoid delays.',
      'PAGE 3 — WHAT NEEDS APPROVAL: Additions, decks, patios, fences, solar panels, exterior lighting, roof replacements in a different material or color, and any change of exterior paint or stain color.',
      'PAGE 4 — HOW TO APPLY: Submit an ACC request from the resident app (My Properties → Architectural Requests) with a description, photos of the current condition and a site plan or product sheet where applicable.',
      'PAGE 6 — FENCES & EXTERIOR COLORS: Fences may be wood, composite or wrought iron, no taller than six (6) feet and set back behind the front building line. Stains and paints must match the approved palette: Natural Cedar, Sage Green, Warm White, Slate Gray, Forest Green and Driftwood Brown. Include a photo of the color sample with your application.',
      'PAGE 7 — DECISIONS: The Committee may approve, approve with stipulations, or deny an application. Decisions are recorded in the request log and visible to the owner in the app. Owners may appeal a denial to the Board within 15 days.',
      'Adopted by the Board of Directors — Revised January 2025 — Document ID: CH-ARG-2025-01',
    ],
  },
  pool: {
    heading: 'Cardinal Hills HOA',
    subheading: 'Pool Rules & Regulations',
    body: [
      'SECTION 1 — HOURS: The pool is open daily 7:00 AM – 9:00 PM, and Sundays 8:00 AM – 8:00 PM. Hours may change for maintenance or weather; closures are posted in the resident app.',
      'SECTION 2 — GUESTS: Pool access is limited to residents and authorized guests. Guests must be accompanied by a resident at all times. Private reservations allow up to four (4) guests for up to four (4) hours.',
      'SECTION 3 — SAFETY: No lifeguard is on duty — swim at your own risk. Children must be supervised by an adult at all times. Running, rough play and diving are prohibited. Glass containers are not permitted in the pool area.',
      'SECTION 4 — CONDUCT: Proper swim attire is required. Loud music, smoking and vaping are not allowed. Pets are not permitted in the pool enclosure, except service animals as required by law.',
      'SECTION 5 — ENFORCEMENT: Failure to follow these rules may result in suspension of pool privileges and additional enforcement under the CC&Rs.',
      'Adopted by the Board of Directors — Effective April 1, 2026 — Document ID: CH-POOL-2026',
    ],
  },
  meetings: {
    heading: 'Cardinal Hills HOA',
    subheading: 'Board Meeting Calendar — 2026',
    body: [
      'Regular Board meetings are held monthly and are open to all members in good standing. Meetings are held via Zoom; the link is posted in the resident app 48 hours in advance.',
      'MAY 14, 2026 — 5:30 PM (Zoom): Reserve study update · Q1 financial review · 3 ACC appeals · Maintenance contractor contract renewal.',
      'JUNE 11, 2026 — 5:30 PM (Zoom): Pool renovation progress · Landscaping vendor review · Delinquency report.',
      'JULY 12, 2026 — 6:30 PM (Clubhouse): Annual Meeting — certification of the 2027 Board election results and budget ratification.',
      'Agendas are published one week before each meeting. Owners may request to address the Board during the open forum at the start of each meeting.',
      'Prepared by: Cardinal Hills HOA Management — Document ID: CH-CAL-2026',
    ],
  },
}

function candidateContent(name) {
  return {
    heading: name,
    subheading: 'Board Candidate — Official Platform Statement',
    body: [
      `This document is the official candidate platform statement submitted by ${name} for inclusion in the 2027 Cardinal Hills HOA Board of Directors election ballot package.`,
      'CANDIDATE STATEMENT: I am running for the Board of Directors because I believe in transparent governance, responsible financial stewardship, and a community where every resident feels heard.',
      'KEY PRIORITIES: (1) Full reserve fund compliance within two years. (2) Vendor accountability — competitive bidding on all contracts exceeding $5,000. (3) Monthly digital newsletter and quarterly town halls open to all homeowners.',
      'RELEVANT EXPERIENCE: Prior HOA board service, finance and project management background, and a deep commitment to our neighborhood make me well-qualified to serve in this capacity.',
      'I respectfully ask for your vote. If elected, I commit to bringing the same dedication and transparency to the board that I have shown as a resident.',
      `Submitted by: ${name} — Date: April 28, 2026 — Notarized: Yes, document on file with management`,
    ],
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

// `highlight` = paragraph index (or array) to mark and scroll to — used by Cephai citations
export default function ResidentPDFViewer({ filename, docType, candidateName, highlight, onClose }) {
  const content = CONTENT[docType]
    ?? candidateContent(candidateName || filename?.replace(/_/g, ' ').replace('.pdf', '') || 'Candidate')
  const marked = [].concat(highlight ?? [])
  const firstMarkRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => firstMarkRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 250)
    return () => clearTimeout(t)
  }, [])

  const displayName = filename || 'Document.pdf'
  const portalTarget = document.querySelector('.phone-frame') || document.body

  return createPortal(
    <div className="res-pdf-panel">
      <div className="res-pdf-panel__header">
        <span className="res-pdf-panel__title">{displayName}</span>
        <button className="res-pdf-panel__close" onClick={onClose} aria-label="Close">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="13" stroke="var(--text)" strokeWidth="1.4" fill="none" />
            <path d="M9.5 9.5l9 9M18.5 9.5l-9 9" stroke="var(--text)" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <div className="res-pdf-panel__doc">
        <div className="res-pdf-page">
          <h3 className="res-pdf-page__heading">{content.heading}</h3>
          <p className="res-pdf-page__subheading">{content.subheading}</p>
          <div className="res-pdf-page__divider" />
          {content.body.map((para, i) => (
            <p
              key={i}
              ref={i === marked[0] ? firstMarkRef : undefined}
              className={`res-pdf-page__body${marked.includes(i) ? ' res-pdf-page__body--mark' : ''}`}
            >{para}</p>
          ))}
        </div>
      </div>
    </div>,
    portalTarget
  )
}
