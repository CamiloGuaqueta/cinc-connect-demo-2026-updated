import { createPortal } from 'react-dom'
import './ResidentPDFViewer.css'

// ─── Mock content ─────────────────────────────────────────────────────────────

const CONTENT = {
  ballot: {
    heading: 'Lovera Premier HOA',
    subheading: '2027 Board of Directors Election — Official Ballot Document',
    body: [
      "This document constitutes the official ballot package for the 2027 Annual Board of Directors Election of the Lovera Premier Homeowners Association. The election is conducted in accordance with California Civil Code §5100 and the Association's Bylaws, Article VI, Section 3.",
      'OPEN SEATS: Three (3) of five (5) board seats are open for election for a two-year term commencing August 1, 2026 and expiring July 31, 2028.',
      'ELIGIBILITY: Only members in good standing as of June 1, 2026 are eligible to vote. A member is considered in good standing if all assessments and charges are current and no unresolved violation notices are pending.',
      'VOTING INSTRUCTIONS: Each unit is entitled to cast one (1) ballot with up to three (3) candidate selections. Votes may be cast electronically via the resident app through June 29, 2026 at 11:59 PM Pacific Time. Paper ballots are available upon written request to management.',
      'RESULTS: Tabulated results will be announced at the Annual Meeting on July 12, 2026 at 6:30 PM in the Clubhouse. Results will also be posted on the resident portal within 24 hours of certification.',
      'Prepared by: Lovera Premier HOA Management — Date: May 15, 2026 — Document ID: LOVERA-2026-BOD-ELECTION-001',
    ],
  },
  assessment: {
    heading: 'Lovera Premier HOA',
    subheading: 'Special Assessment — Road Resurfacing Project No. 2026-SR',
    body: [
      "This document provides the official notice and supporting information for the Special Assessment Vote regarding the Lovera Premier Community Road Resurfacing Project. This assessment is proposed pursuant to the Association's Declaration of Covenants, Conditions, and Restrictions (CC&Rs), Article VIII, Section 4.",
      'PROJECT SCOPE: Complete asphalt resurfacing of all interior community roads, including Lovera Boulevard, Premier Circle, and all cul-de-sac spurs. Total linear footage: approximately 4,200 linear feet.',
      'ENGINEERING REPORT: A pavement condition assessment conducted March 2026 by Hartwell & Associates Civil Engineering rated the community road surfaces at a PCI of 28 out of 100, classified as "Poor." Immediate intervention is recommended to prevent accelerated deterioration and potential trip-and-fall liability.',
      'FINANCIAL SUMMARY: Total estimated project cost: $285,000. Per-unit special assessment: $450.00. Payment schedule: Two installments of $225.00 due August 1, 2026 and November 1, 2026 respectively.',
      'Payment plans of up to 12 months are available for residents experiencing financial hardship. Requests must be submitted in writing to management by July 15, 2026.',
      'Prepared by: Lovera Premier HOA Board of Directors — Date: May 20, 2026 — Document ID: LOVERA-2026-ASSESSMENT-SR-001',
    ],
  },
}

function candidateContent(name) {
  return {
    heading: name,
    subheading: 'Board Candidate — Official Platform Statement',
    body: [
      `This document is the official candidate platform statement submitted by ${name} for inclusion in the 2027 Lovera Premier HOA Board of Directors election ballot package.`,
      'CANDIDATE STATEMENT: I am running for the Board of Directors because I believe in transparent governance, responsible financial stewardship, and a community where every resident feels heard.',
      'KEY PRIORITIES: (1) Full reserve fund compliance within two years. (2) Vendor accountability — competitive bidding on all contracts exceeding $5,000. (3) Monthly digital newsletter and quarterly town halls open to all homeowners.',
      'RELEVANT EXPERIENCE: Prior HOA board service, finance and project management background, and a deep commitment to our neighborhood make me well-qualified to serve in this capacity.',
      'I respectfully ask for your vote. If elected, I commit to bringing the same dedication and transparency to the board that I have shown as a resident.',
      `Submitted by: ${name} — Date: April 28, 2026 — Notarized: Yes, document on file with management`,
    ],
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ResidentPDFViewer({ filename, docType, candidateName, onClose }) {
  const content = docType === 'ballot'     ? CONTENT.ballot
    : docType === 'assessment'             ? CONTENT.assessment
    : candidateContent(candidateName || filename?.replace(/_/g, ' ').replace('.pdf', '') || 'Candidate')

  const displayName = filename || 'Document.pdf'
  const portalTarget = document.querySelector('.phone-frame') || document.body

  return createPortal(
    <div className="res-pdf-panel">
      <div className="res-pdf-panel__header">
        <span className="res-pdf-panel__title">{displayName}</span>
        <button className="res-pdf-panel__close" onClick={onClose} aria-label="Close">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="13" stroke="#fff8ea" strokeWidth="1.4" fill="rgba(0,0,0,0.35)" />
            <path d="M9.5 9.5l9 9M18.5 9.5l-9 9" stroke="#fff8ea" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <div className="res-pdf-panel__doc">
        <div className="res-pdf-page">
          <h3 className="res-pdf-page__heading">{content.heading}</h3>
          <p className="res-pdf-page__subheading">{content.subheading}</p>
          <div className="res-pdf-page__divider" />
          {content.body.map((para, i) => (
            <p key={i} className="res-pdf-page__body">{para}</p>
          ))}
        </div>
      </div>
    </div>,
    portalTarget
  )
}
