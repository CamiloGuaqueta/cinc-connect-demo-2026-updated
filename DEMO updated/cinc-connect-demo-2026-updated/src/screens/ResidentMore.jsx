import { useState } from 'react'
import { useMode } from '../ModeContext'
import { PROTOTYPE_VERSION } from '../theme'
import './ResidentMore.css'
import votingIconRaw from '../ICONS/voting.svg?raw'
import signatureIconRaw from '../ICONS/signature.svg?raw'
import surveyIconRaw from '../ICONS/survey.svg?raw'
import ratingsIconRaw from '../ICONS/ratings.svg?raw'
import profileImg from '../images/profile.jpg'
import bgImg from '../images/hoa.jpg'
import pencilSvg from '../ICONS/Pencil.svg'
import CustomContentSheet from '../components/CustomContentSheet'
import poolImg from '../images/Amenities/pool.jpg'
import clubhouseImg from '../images/Amenities/Clubhouse.jpg'
import courtsImg from '../images/Amenities/courts.jpg'
import mediaRoomImg from '../images/Amenities/Media room.jpg'
import tennisImg from '../images/Amenities/tennis.png'
import boardImg from '../images/board.jpg'
import soldImg from '../images/SOLD.jpg'
import newChImg from '../images/new-ch.png'

const PROFILE_IMG = profileImg
const HOA_LOGO    = '/images/cinc-icon.png'
const BG_IMG      = bgImg

const CUSTOM_TILES = [
  {
    // Layout: no hero — starts with title, then progress status table
    label: 'Pool Renovation\nUpdate',
    content: {
      tag: 'Capital Project · In Progress',
      title: 'Pool Renovation Update',
      subtitle: 'Expected completion: August 15, 2026',
      lead: 'We\'re upgrading the pool deck, resurfacing the interior, and replacing aging equipment. Work is on schedule.',
      sections: [
        {
          heading: 'Milestone Status',
          table: {
            headers: ['Milestone', 'Status'],
            rows: [
              ['Pool drained & surface removed', '✅ Done June 2'],
              ['New plumbing & filtration', '✅ Done June 18'],
              ['Plaster resurfacing', '🔄 Est. July 10'],
              ['Deck pavers & furniture', '⏳ July 15–Aug 1'],
              ['Final inspection & refill', '⏳ Aug 5–15'],
            ],
          },
        },
        {
          image: poolImg,
        },
        {
          heading: 'During Renovation',
          text: 'Full access to the Clubhouse fitness center and tennis courts. A splash pad has been installed near the playground for kids.',
        },
      ],
      links: [
        { label: 'View Full Project Timeline' },
        { label: 'Submit a Question or Comment' },
      ],
    },
  },
  {
    // Layout: text only, no image — clean policy document style
    label: 'New Landscaping\nPolicy',
    content: {
      tag: 'Policy Update · Effective July 1, 2026',
      title: 'Updated Landscaping & Lawn Care Policy',
      subtitle: 'Adopted by the Board of Directors — May 20, 2026',
      sections: [
        {
          heading: 'Irrigation',
          text: 'Irrigation is permitted on Monday, Wednesday, and Friday only, in compliance with county water conservation guidelines. Drip systems and hand-watering are exempt.',
        },
        {
          heading: 'Lawn Maintenance',
          text: 'Grass height must be maintained between 2" and 4". Lawns exceeding 6" may be subject to a courtesy notice. Native and drought-tolerant plants are pre-approved and do not require an ARC submission.',
        },
        {
          heading: 'Artificial Turf & Special Materials',
          text: 'Artificial turf is permitted in rear yards without ARC approval. Front yard installation requires a submitted ARC request. Gravel, decomposed granite, and xeriscape designs require approval.',
        },
        {
          heading: 'Seasonal Lighting',
          text: 'Holiday lighting on landscaping and exterior structures is permitted November 15 through January 15.',
        },
        {
          heading: 'Enforcement',
          text: 'First violations receive a written courtesy notice. Repeat violations within 90 days may result in a fine of $50–$250 per occurrence. Residents may request a hearing within 15 days.',
        },
      ],
      links: [
        { label: 'Download Full Landscaping Policy (PDF)' },
        { label: 'Submit an ARC Request' },
        { label: 'View Approved Native Plant List' },
      ],
    },
  },
  {
    // Layout: hero image + short lead + simple list only
    label: 'Welcome New\nNeighbors',
    content: {
      hero: soldImg,
      title: 'Welcome to Cardinal Hills!',
      lead: 'Seven new families joined our community this spring. Say hello when you see them around the neighborhood.',
      sections: [
        {
          heading: 'New Residents — Spring 2026',
          list: [
            'The Martínez Family — 2318 Crestview Lane',
            'David & Priya Nguyen — 445 Ridgeway Court',
            'The Okafor Family — 789 Maple Ridge Drive',
            'James & Lena Schultz — 1102 Hillcrest Blvd',
            'The Patel Family — 334 Sunrise Pass',
            'Chloe & Marcus Webb — 2201 Cardinal Way',
            'The Andersons — 990 Brookstone Circle',
          ],
        },
        {
          heading: 'New Neighbor Social',
          text: 'Saturday, July 19 · 4–7 PM at the Clubhouse. Light refreshments provided. All residents welcome.',
        },
      ],
      links: [
        { label: 'RSVP for New Neighbor Social' },
        { label: 'View Community Directory' },
      ],
    },
  },
  {
    // Layout: hero + two tables (election results + budget)
    label: 'Annual Meeting\nRecap',
    content: {
      hero: boardImg,
      tag: 'Board Update',
      title: 'Annual Meeting Recap',
      subtitle: 'April 10, 2026 · Clubhouse · 94 residents attended',
      sections: [
        {
          heading: 'Board Election Results',
          table: {
            headers: ['Candidate', 'Result', 'Votes'],
            rows: [
              ['Sandra Kim', 'Re-elected · 2029', '214'],
              ['Robert Vasquez', 'Elected · 2029', '198'],
              ['Margaret Chen', 'Re-elected · 2028', '221'],
            ],
          },
        },
        {
          heading: '2026–2027 Budget',
          table: {
            headers: ['Item', 'Amount'],
            rows: [
              ['Operating budget', '$1,840,000'],
              ['Monthly assessment', '$385/unit'],
              ['Reserve contribution', '$312/unit/mo'],
              ['Pool renovation', '$185,000'],
            ],
          },
        },
        {
          heading: 'Resolutions Passed',
          list: [
            'Updated Landscaping Policy — effective July 1, 2026',
            'New grounds maintenance vendor contract',
            'EV charging stations approved for visitor parking',
          ],
        },
        {
          heading: 'Next Meeting',
          text: 'Board Meeting — June 18, 2026 at 6:30 PM in the Clubhouse. All residents welcome.',
        },
      ],
      links: [
        { label: 'Download Full Meeting Minutes (PDF)' },
        { label: 'View Approved Budget' },
      ],
    },
  },
]

function ChevronIcon() {
  return (
    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" className="more-row__chevron">
      <path d="M1 1l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function Row({ icon, label, onTap }) {
  return (
    <button className="more-row" onClick={onTap}>
      <span className="more-row__icon">{icon}</span>
      <span className="more-row__label">{label}</span>
      <ChevronIcon />
    </button>
  )
}

export default function ResidentMore() {
  const { pushResidentView, residentProfile, navStyle, setNavStyle, showBoardRoom, setShowBoardRoom } = useMode()
  const [customSheet, setCustomSheet] = useState(null)
  return (
    <div className="screen resident-more">
      {/* Hero / profile header */}
      <div className="more-hero">
        <img src={BG_IMG} alt="" className="more-hero__bg" />
        <div className="more-hero__overlay" />
        <div className="more-hero__avatar-wrap">
          <div className="more-hero__avatar-frame">
            <img src={PROFILE_IMG} alt="Profile" className="more-hero__avatar" />
          </div>
          <button className="more-hero__edit-btn" aria-label="Edit photo">
            <PencilIcon />
          </button>
        </div>
        <p className="more-hero__name">{residentProfile.firstName} {residentProfile.lastName}</p>
      </div>

      <div className="more-content">
        {/* HOA + community section */}
        <div className="more-card">
          <button className="more-hoa-row">
            <img src={HOA_LOGO} alt="HOA" className="more-hoa-row__logo" />
            <div className="more-hoa-row__text">
              <span className="more-hoa-row__name">Cardinal Hills HOA</span>
              <span className="more-hoa-row__sub">Add or Switch association</span>
            </div>
            <ChevronIcon />
          </button>

          <div className="more-divider" />
          <Row icon={<CephAIIcon />}    label="Ask CephAI" />
          <div className="more-divider" />
          <Row icon={<MarketIndexIcon />} label="Home Value Insights" onTap={() => pushResidentView('market-index')} />
          <div className="more-divider" />
          <Row icon={<DocumentsIcon />} label="Documents" />
          <div className="more-divider" />
          <Row icon={<GroupsIcon />}    label="Groups" />
          <div className="more-divider" />
          <Row icon={<DirectoryIcon />} label="Directories" onTap={() => pushResidentView('directories')} />
          <div className="more-divider" />
          <Row icon={<ParkingIcon />}   label="Parking & Vehicles" />
          <div className="more-divider" />
          <Row icon={<AnimalsIcon />}   label="Animals" onTap={() => pushResidentView('animals')} />
          <div className="more-divider" />
          <Row icon={<FaqIcon />}       label="FAQs" />
        </div>

        {/* Participation */}
        <div className="more-card">
          <Row icon={<RawIcon raw={votingIconRaw} />}    label="Ballots & Votes"       onTap={() => pushResidentView('ballot-votes')} />
          <div className="more-divider" />
          <Row icon={<RawIcon raw={signatureIconRaw} />} label="Signatures & Consents" onTap={() => pushResidentView('signatures-consents')} />
          <div className="more-divider" />
          <Row icon={<RawIcon raw={surveyIconRaw} />}    label="Surveys"               onTap={() => pushResidentView('surveys')} />
          <div className="more-divider" />
          <Row icon={<RawIcon raw={ratingsIconRaw} />}   label="Ratings"               onTap={() => pushResidentView('ratings')} />
        </div>

        {/* Custom tiles */}
        <div className="more-card">
          {CUSTOM_TILES.map((tile, i) => (
            <div key={i}>
              {i > 0 && <div className="more-divider" />}
              <Row
                icon={<CustomTileIcon />}
                label={tile.label.replace('\n', ' ')}
                onTap={() => setCustomSheet(tile.content)}
              />
            </div>
          ))}
        </div>

        {/* Account / settings */}
        <div className="more-card">
          <Row icon={<ProfileIcon />}   label="My Profile"           onTap={() => pushResidentView('my-profile')} />
          <div className="more-divider" />
          <Row icon={<UnitsIcon />}     label="My Units"             onTap={() => pushResidentView('my-units')} />
          <div className="more-divider" />
          <Row icon={<BillingIcon />}   label="My Billing Information" onTap={() => pushResidentView('my-billing')} />
          <div className="more-divider" />
          <Row icon={<LockIcon />}      label="Password" />
          <div className="more-divider" />
          <Row icon={<ListIcon />}      label="Membership List Opt-In/Out" onTap={() => pushResidentView('membership-opt-in')} />
          <div className="more-divider" />
          <Row icon={<BellIcon />}      label="Communication Preferences" onTap={() => pushResidentView('notification-prefs')} />
          <div className="more-divider" />
          <Row icon={<EyeIcon />}       label="Privacy" />
          <div className="more-divider" />
          <Row icon={<GlobeIcon />}     label="Languages" />
        </div>

        <button className="more-logout" onClick={() => window.dispatchEvent(new CustomEvent('app-logout'))}>LOG OUT</button>
        <div className="more-proto-row">
          <button className="more-reset" onClick={() => {
            localStorage.clear()
            window.dispatchEvent(new CustomEvent('app-logout'))
          }}>Reset Prototype</button>
          <span className="more-proto-sep">|</span>
          <button className="more-theme-btn" onClick={() => pushResidentView('prototype-theme')}>Prototype Theme</button>
          <span className="more-proto-sep">|</span>
          <button
            className={`more-theme-btn${navStyle === 'v2' ? ' more-theme-btn--active' : ''}`}
            onClick={() => setNavStyle(navStyle === 'v2' ? 'v1' : 'v2')}
          >Nav 2.0</button>
          <span className="more-proto-sep">|</span>
          <button
            className={`more-theme-btn${showBoardRoom ? ' more-theme-btn--active' : ''}`}
            onClick={() => setShowBoardRoom(!showBoardRoom)}
          >Nav + Board</button>
        </div>
        <p className="more-version">{PROTOTYPE_VERSION}</p>
      </div>

      {customSheet && (
        <CustomContentSheet content={customSheet} onClose={() => setCustomSheet(null)} />
      )}
    </div>
  )
}

/* ── Icons ───────────────────────────────────────────── */
function RawIcon({ raw }) {
  return <span style={{display:'flex',alignItems:'center',justifyContent:'center',width:25,height:25}} dangerouslySetInnerHTML={{__html: raw}} />
}

function MarketIndexIcon() {
  return (
    <svg width="25" height="26" viewBox="0 0 71.12 73.93" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M69.2,41.86c-2.94-3.75-8.3-4.54-12.2-1.8l-9.96,7c-1.45-2.18-3.93-3.62-6.74-3.62H14.25c-7.99,0-14.25,4.73-14.25,10.76v8.96c0,6.03,6.26,10.76,14.25,10.76h20.05c3.65,0,7.11-1.02,9.75-2.87,3.36-2.36,15.88-11.15,23.27-16.34,2.03-1.42,3.35-3.56,3.71-6.01.36-2.42-.31-4.92-1.82-6.85ZM66.07,47.98c-.16,1.08-.74,2.02-1.63,2.65-7.39,5.19-19.91,13.98-23.27,16.34-1.78,1.25-4.28,1.96-6.87,1.96H14.25c-5.01,0-9.25-2.64-9.25-5.76v-8.96c0-3.12,4.24-5.76,9.25-5.76h26.04c1.71,0,3.1,1.39,3.1,3.1s-1.39,3.1-3.1,3.1h-17.39c-1.38,0-2.5,1.12-2.5,2.5s1.12,2.5,2.5,2.5h17.39c4.23,0,7.71-3.26,8.07-7.4l11.51-8.09c1.72-1.21,4.09-.86,5.39.79.68.87.97,1.94.81,3.03Z" fill="currentColor"/>
      <path d="M18.94,34.1h20.32c3.21,0,5.83-2.61,5.83-5.83v-14.05c0-1.36-.6-2.65-1.63-3.53L32.09,1.06c-1.67-1.42-4.32-1.41-5.98,0l-11.37,9.63c-1.04.88-1.63,2.17-1.63,3.53v14.04c0,3.21,2.62,5.83,5.83,5.83ZM19.11,14.86l9.99-8.47,9.98,8.47v13.24h-19.98v-13.24Z" fill="currentColor"/>
    </svg>
  )
}
function DirectoryIcon() {
  return (
    <svg width="25" height="26" viewBox="0 0 69 71" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M48.4899 57.71H27.53C26.08 57.71 24.7199 57.06 23.8099 55.93C22.8899 54.78 22.5399 53.3 22.8599 51.86C24.4099 44.82 30.7799 39.7 38.0099 39.7C45.2399 39.7 51.6 44.81 53.16 51.86C53.48 53.3 53.13 54.79 52.21 55.93C51.3 57.06 49.9499 57.71 48.4899 57.71ZM27.7999 52.71H48.22C47.08 48.06 42.8299 44.7 38.0099 44.7C33.1899 44.7 28.9299 48.05 27.7999 52.71Z" fill="currentColor"/>
      <path d="M38.0101 34.6299C33.0801 34.6299 29.0701 30.6199 29.0701 25.6899C29.0701 20.7599 33.0801 16.75 38.0101 16.75C42.9401 16.75 46.9501 20.7599 46.9501 25.6899C46.9501 30.6199 42.9401 34.6299 38.0101 34.6299ZM38.0101 21.7599C35.8401 21.7599 34.0701 23.53 34.0701 25.7C34.0701 27.87 35.8401 29.64 38.0101 29.64C40.1801 29.64 41.9501 27.87 41.9501 25.7C41.9501 23.53 40.1801 21.7599 38.0101 21.7599Z" fill="currentColor"/>
      <path d="M60.25 70.45H15.77C11.35 70.45 7.75 66.85 7.75 62.43V8.01996C7.75 3.59996 11.35 0 15.77 0H60.25C64.67 0 68.27 3.59996 68.27 8.01996V62.43C68.27 66.85 64.67 70.45 60.25 70.45ZM15.77 4.98999C14.1 4.98999 12.75 6.34995 12.75 8.00995V62.42C12.75 64.09 14.11 65.4399 15.77 65.4399H60.25C61.92 65.4399 63.27 64.08 63.27 62.42V8.00995C63.27 6.33995 61.91 4.98999 60.25 4.98999H15.77Z" fill="currentColor"/>
      <path d="M10.24 17.72H2.5C1.12 17.72 0 16.6 0 15.22C0 13.84 1.12 12.72 2.5 12.72H10.24C11.62 12.72 12.74 13.84 12.74 15.22C12.74 16.6 11.62 17.72 10.24 17.72Z" fill="currentColor"/>
      <path d="M10.24 57.71H2.5C1.12 57.71 0 56.59 0 55.21C0 53.83 1.12 52.71 2.5 52.71H10.24C11.62 52.71 12.74 53.83 12.74 55.21C12.74 56.59 11.62 57.71 10.24 57.71Z" fill="currentColor"/>
      <path d="M10.24 44.3799H2.5C1.12 44.3799 0 43.2599 0 41.8799C0 40.4999 1.12 39.3799 2.5 39.3799H10.24C11.62 39.3799 12.74 40.4999 12.74 41.8799C12.74 43.2599 11.62 44.3799 10.24 44.3799Z" fill="currentColor"/>
      <path d="M10.24 31.05H2.5C1.12 31.05 0 29.93 0 28.55C0 27.17 1.12 26.05 2.5 26.05H10.24C11.62 26.05 12.74 27.17 12.74 28.55C12.74 29.93 11.62 31.05 10.24 31.05Z" fill="currentColor"/>
    </svg>
  )
}
function PencilIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_13_664" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="13" height="13">
        <path d="M0 0H12.3279V12.3297H0V0Z" fill="black"/>
      </mask>
      <g mask="url(#mask0_13_664)">
        <path d="M11.97 1.8466L10.4812 0.357856C10.0038 -0.119537 9.22703 -0.119251 8.74993 0.358142L0 9.10921V12.3298L3.22005 12.3293L11.97 3.57819C12.4471 3.1008 12.4474 2.324 11.97 1.8466ZM0.974785 11.8247L0.50482 11.3548V9.43347L2.89579 11.8244L0.974785 11.8247ZM3.13177 11.7033L0.625954 9.19749L7.50973 2.31257L10.0155 4.81867L3.13177 11.7033ZM10.1941 4.64011L7.68829 2.13401L7.796 2.02602L10.3021 4.53212L10.1941 4.64011ZM10.4807 4.35356L7.97455 1.84746L8.08226 1.73975L10.5884 4.24586L10.4807 4.35356ZM10.7669 4.0673L8.26082 1.5612L8.36853 1.45349L10.8746 3.95959L10.7669 4.0673ZM11.6129 3.22107L11.0532 3.78103L8.54708 1.27493L9.10676 0.714973C9.38731 0.434708 9.84385 0.434422 10.1241 0.714973L11.6131 2.20372C11.8934 2.48399 11.8934 2.94052 11.6129 3.22107Z" fill="#112719"/>
      </g>
    </svg>
  )
}
function CephAIIcon() {
  return (
    <img src="/images/cephai-logo.svg" alt="CephAI" width="29" height="29" />
  )
}
function DocumentsIcon() {
  return (
    <svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="docs-mask" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="25">
        <path d="M0 0H19.9344V25H0V0Z" fill="black"/>
      </mask>
      <g mask="url(#docs-mask)">
        <path d="M15.678 16.6004V6.33617C15.678 5.82795 15.5636 5.31904 15.3512 4.87311C15.2654 4.68725 15.1643 4.51092 15.0486 4.3448C14.9329 4.17869 14.8025 4.02278 14.6585 3.87845L13.2264 2.44909L11.7937 1.01803C11.7045 0.929183 11.6112 0.848166 11.5152 0.770895C11.2939 0.591842 11.0591 0.444106 10.8208 0.33824L10.8116 0.334496C10.8061 0.331773 10.8007 0.328368 10.7949 0.325986C10.7908 0.324284 10.7864 0.323943 10.7827 0.322241C10.3323 0.109488 9.84689 -0.00012207 9.3373 -0.00012207H4.3868C1.96788 -0.00012207 0 1.96776 0 4.38633V16.6045C0 19.0214 1.96584 20.9872 4.38237 20.9872H11.2909C13.7098 20.9872 15.678 19.0193 15.678 16.6004ZM12.7502 4.37884H11.2987V2.92974L12.4711 4.10005L12.7502 4.37884ZM1.70202 16.6045V4.38633C1.70202 2.90625 2.90638 1.7019 4.3868 1.7019H9.3373C9.42512 1.7019 9.51125 1.71041 9.59669 1.72335V5.22986C9.59669 5.69995 9.97794 6.08087 10.4477 6.08087H13.9545C13.9671 6.16529 13.976 6.25039 13.976 6.33617V16.6004C13.976 18.0808 12.7716 19.2852 11.2909 19.2852H4.38237C2.90433 19.2852 1.70202 18.0829 1.70202 16.6045Z" fill="currentColor"/>
        <path d="M19.0835 7.53784C18.6134 7.53784 18.2324 7.91875 18.2324 8.38885V17.5978C18.2324 20.7408 15.675 23.2982 12.5317 23.2982H5.86725C5.39715 23.2982 5.01624 23.6791 5.01624 24.1492C5.01624 24.6193 5.39715 25.0003 5.86725 25.0003H12.5317C16.6138 25.0003 19.9345 21.6796 19.9345 17.5978V8.38885C19.9345 7.91875 19.5536 7.53784 19.0835 7.53784Z" fill="currentColor"/>
      </g>
    </svg>
  )
}
function GroupsIcon() {
  return (
    <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="users-mask" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
        <path d="M0 0H25V23.0022H0V0Z" fill="black"/>
      </mask>
      <g mask="url(#users-mask)">
        <path d="M7.48299 14.6052C3.93805 14.6052 0.811286 17.1146 0.0482334 20.5718C-0.0839538 21.1714 0.0591969 21.7884 0.44135 22.2643C0.818177 22.7332 1.37919 23.0019 1.98092 23.0019H12.9854C13.5871 23.0019 14.1481 22.7332 14.5246 22.2646C14.9071 21.7884 15.0506 21.1717 14.9181 20.5718C14.1553 17.1146 11.0282 14.6052 7.48299 14.6052ZM13.3036 21.2835C13.2579 21.3405 13.1558 21.4357 12.9854 21.4357H1.98092C1.81052 21.4357 1.70841 21.3405 1.66267 21.2835C1.57904 21.1795 1.54803 21.0433 1.57778 20.9092C2.18359 18.1639 4.66696 16.1714 7.48299 16.1714C10.2993 16.1714 12.783 18.1639 13.3885 20.9092C13.4183 21.0429 13.3872 21.1795 13.3036 21.2835Z" fill="currentColor"/>
        <path d="M7.48298 12.0338C9.69916 12.0338 11.5019 10.2308 11.5019 8.01496C11.5019 5.79879 9.69916 3.99609 7.48298 3.99609C5.26681 3.99609 3.46411 5.79879 3.46411 8.01496C3.46411 10.2308 5.26681 12.0338 7.48298 12.0338ZM7.48298 5.56229C8.83524 5.56229 9.93565 6.66239 9.93565 8.01496C9.93565 9.36722 8.83524 10.4676 7.48298 10.4676C6.13073 10.4676 5.03031 9.36722 5.03031 8.01496C5.03031 6.66239 6.13073 5.56229 7.48298 5.56229Z" fill="currentColor"/>
        <path d="M24.9517 16.5762C24.1887 13.1189 21.0619 10.6093 17.5167 10.6093C15.4769 10.6093 13.5611 11.4052 12.1218 12.8508C11.8167 13.1575 11.8176 13.6533 12.1239 13.9584C12.4303 14.2635 12.9265 14.2623 13.2316 13.9562C14.3749 12.8082 15.8966 12.1755 17.5167 12.1755C20.3327 12.1755 22.8167 14.1683 23.4222 16.9135C23.4516 17.0473 23.4209 17.1839 23.3373 17.2878C23.2916 17.3449 23.1895 17.4404 23.0191 17.4404H17.2244C16.7918 17.4404 16.4413 17.7909 16.4413 18.2235C16.4413 18.6561 16.7918 19.0066 17.2244 19.0066H23.0191C23.6205 19.0066 24.1815 18.7375 24.5583 18.2689C24.9405 17.7931 25.0839 17.176 24.9517 16.5762Z" fill="currentColor"/>
        <path d="M17.5167 8.03786C19.7328 8.03786 21.5356 6.23485 21.5356 4.01899C21.5356 1.80282 19.7328 0.00012207 17.5167 0.00012207C15.3005 0.00012207 13.4978 1.80282 13.4978 4.01899C13.4978 6.23485 15.3005 8.03786 17.5167 8.03786ZM17.5167 1.56632C18.8689 1.56632 19.9694 2.66673 19.9694 4.01899C19.9694 5.37125 18.8689 6.47166 17.5167 6.47166C16.1644 6.47166 15.064 5.37125 15.064 4.01899C15.064 2.66673 16.1644 1.56632 17.5167 1.56632Z" fill="currentColor"/>
      </g>
    </svg>
  )
}
function ParkingIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="parking-mask" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="25">
        <path d="M0 0H25V25H0V0Z" fill="black"/>
      </mask>
      <g mask="url(#parking-mask)">
        <path d="M12.4997 0.00012207C5.60715 0.00012207 0 5.60762 0 12.5001C0 19.3926 5.60715 25.0001 12.4997 25.0001C19.3925 25.0001 24.9997 19.3926 24.9997 12.5001C24.9997 5.60762 19.3925 0.00012207 12.4997 0.00012207ZM12.4997 23.2532C6.57038 23.2532 1.74688 18.4294 1.74688 12.5001C1.74688 6.57085 6.57038 1.74701 12.4997 1.74701C18.4293 1.74701 23.2528 6.57085 23.2528 12.5001C23.2528 18.4294 18.4293 23.2532 12.4997 23.2532Z" fill="currentColor"/>
        <path d="M12.4923 7.38342H8.06323V17.6163H10.4313V14.7951H12.4923C15.2262 14.7951 16.9364 13.377 16.9364 11.0966C16.9364 8.80154 15.2262 7.38342 12.4923 7.38342ZM12.3609 12.8655H10.4313V9.31338H12.3609C13.8084 9.31338 14.5389 9.97126 14.5389 11.0966C14.5389 12.2076 13.8084 12.8655 12.3609 12.8655Z" fill="currentColor"/>
      </g>
    </svg>
  )
}
function AnimalsIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="animals-mask" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="25">
        <path d="M0 0H25V24.309H0V0Z" fill="black"/>
      </mask>
      <g mask="url(#animals-mask)">
        <path d="M18.6534 15.3143L18.6177 15.2967C18.435 15.1994 18.1359 14.7561 17.8712 14.3631C17.0153 13.0982 15.7218 11.1873 12.9981 11.1873L12.2983 11.1883C9.5759 11.1886 8.28276 13.0999 7.42646 14.3648C7.14918 14.7755 6.86239 15.1997 6.6916 15.2909L6.63921 15.3174C5.51243 15.8886 2.88193 17.4669 2.78531 19.7861C2.74822 21.0564 3.23303 22.3097 4.10566 23.2137C4.75615 23.9108 5.67403 24.3092 6.6273 24.3092C6.67425 24.3092 6.72086 24.3068 6.76747 24.3C7.22675 24.2316 7.6629 24.0795 8.06299 23.8475C8.93461 23.4273 10.1315 22.8609 12.6007 22.8609H12.712C14.23 22.8316 15.7613 23.1712 17.1316 23.8325C17.5681 24.0676 18.0376 24.2248 18.5268 24.2996C18.5779 24.3071 18.6289 24.3092 18.6799 24.3092C19.6318 24.3092 20.547 23.9104 21.1835 23.2242C22.0664 22.3091 22.5505 21.0561 22.5131 19.7755C22.4165 17.4692 19.7859 15.8896 18.6534 15.3143ZM19.9479 22.0549C19.6308 22.3968 19.1872 22.5965 18.7221 22.6078C18.4438 22.5581 18.1764 22.4645 17.9267 22.3285C17.9148 22.322 17.9025 22.3159 17.8906 22.3097C16.3335 21.5548 14.6025 21.1581 12.8844 21.1581C12.8225 21.1581 12.7599 21.1588 12.6977 21.1598H12.6007C9.72049 21.1598 8.20588 21.8903 7.29343 22.3302C7.27064 22.3407 7.24921 22.3523 7.22777 22.3649C7.02705 22.4846 6.80829 22.5659 6.57763 22.6074C6.11256 22.5942 5.66689 22.3938 5.33926 22.043C4.77282 21.4558 4.46152 20.6516 4.48534 19.8466C4.53331 18.693 6.09011 17.5033 7.40638 16.8358L7.47442 16.8011C8.03577 16.5017 8.4066 15.9526 8.83561 15.3177C9.60618 14.1794 10.4792 12.8893 12.2996 12.8893H12.3006L12.9994 12.8883C14.8192 12.8883 15.6919 14.1784 16.4621 15.3161C16.8911 15.9519 17.2613 16.501 17.8386 16.8086L17.8896 16.8337C19.2083 17.5036 20.7651 18.6947 20.813 19.8361C20.8369 20.6512 20.5259 21.4555 19.9479 22.0549Z" fill="currentColor"/>
        <path d="M5.08411 14.5329C5.88735 14.1117 6.45482 13.3255 6.60043 12.4362C6.9386 10.4572 5.98635 8.47308 4.2125 7.48851C3.77363 7.25853 3.27896 7.13265 2.78225 7.12415C2.75844 7.12415 2.73326 7.12449 2.70911 7.12619C2.33624 7.13231 1.96269 7.2194 1.62452 7.3793C1.61363 7.38441 1.60308 7.38951 1.59254 7.39529C0.788962 7.81681 0.221492 8.60304 0.0786034 9.4767C-0.10579 10.448 0.037438 11.469 0.474608 12.3379C1.20402 13.8579 2.58935 14.7949 3.92128 14.7949C4.31966 14.7949 4.71397 14.7108 5.08411 14.5329ZM2.00113 11.5874C1.7242 11.0369 1.63472 10.4 1.75312 9.77302C1.81299 9.40831 2.04162 9.08682 2.36618 8.91025C2.49001 8.8548 2.62508 8.82384 2.76014 8.8269C2.77171 8.82758 2.78361 8.8269 2.79484 8.82656C3.01394 8.83608 3.22963 8.89392 3.40552 8.98577C4.53025 9.61006 5.14059 10.8818 4.92285 12.1555C4.86196 12.5263 4.62687 12.8519 4.32102 13.0128C3.61271 13.352 2.53254 12.6937 2.00113 11.5874Z" fill="currentColor"/>
        <path d="M23.3551 7.76944C23.2078 7.70004 23.0523 7.64458 22.8938 7.6041L22.8696 7.59797C21.339 7.22238 19.6277 8.23553 18.7986 10.0039C18.3622 10.8915 18.2285 11.9139 18.4173 12.8614C18.5721 13.7561 19.146 14.5372 19.9805 14.9639C20.3309 15.1282 20.713 15.2098 21.1053 15.2098C21.6071 15.2098 22.1266 15.0765 22.6199 14.8121C23.4296 14.3784 24.1127 13.6333 24.5428 12.7151C25.4722 10.7316 24.9388 8.51348 23.3551 7.76944ZM23.0026 11.9935C22.7308 12.5735 22.2984 13.0546 21.8167 13.3128C21.5809 13.439 21.1236 13.6207 20.7293 13.4367C20.3952 13.2655 20.1578 12.9423 20.0897 12.5508C19.9693 11.9459 20.0527 11.308 20.3316 10.7402C20.8011 9.73993 21.6108 9.22281 22.23 9.22281C22.3144 9.22281 22.3957 9.23268 22.4716 9.25173L22.4858 9.25547C22.5362 9.26909 22.5852 9.28745 22.6318 9.30889C23.3554 9.64876 23.5252 10.8783 23.0026 11.9935Z" fill="currentColor"/>
        <path d="M15.0781 9.55526C15.2598 9.60288 15.4445 9.62602 15.6309 9.62602C16.3277 9.62602 17.0442 9.2984 17.6964 8.67207C17.7076 8.66084 17.7192 8.64962 17.7297 8.63805C19.3471 6.89992 19.9775 4.48476 19.4161 2.17848C19.4124 2.16317 19.4083 2.14786 19.4039 2.13289C19.0708 1.03435 18.4128 0.305963 17.5491 0.0810846C17.3711 0.0351562 17.1884 0.0116817 17.0057 0.0116817C16.986 0.0113415 16.9639 0.0120219 16.9421 0.013723C16.1542 0.0691772 15.4265 0.421295 14.9117 0.985363C14.0881 1.83215 13.5091 2.8868 13.2413 4.01629C12.9365 5.18424 12.9188 6.37905 13.1927 7.38199C13.5067 8.5319 14.1932 9.32459 15.0781 9.55526ZM14.892 4.42727C15.0934 3.5781 15.5217 2.798 16.1491 2.15228C16.3794 1.89985 16.6914 1.74505 17.0302 1.71307C17.0615 1.71511 17.0925 1.72022 17.1221 1.72736C17.3776 1.79438 17.6188 2.12132 17.7692 2.60408C18.1829 4.33813 17.7096 6.15043 16.5009 7.46126C16.1331 7.80896 15.7616 7.97634 15.5075 7.90932C15.2366 7.83855 14.9784 7.465 14.8335 6.93394C14.6399 6.2246 14.6593 5.3176 14.892 4.42727Z" fill="currentColor"/>
        <path d="M7.24619 8.65094C7.89837 9.29666 8.62302 9.63517 9.33134 9.63517C9.50519 9.63517 9.67801 9.6151 9.84846 9.57393C10.714 9.36539 11.3838 8.64618 11.7431 7.52145C12.0619 6.39127 12.0711 5.19543 11.7696 4.06151C11.5114 2.91602 10.9497 1.85967 10.1621 1.0265C9.63106 0.425004 8.89757 0.0616593 8.09672 0.00348337C8.07528 0.00144211 8.05385 -0.00195999 8.03241 0.0011019C7.85959 0.00178232 7.68744 0.0225351 7.51768 0.0637006C6.65354 0.275311 5.98469 0.993835 5.63495 2.08659C5.62985 2.1019 5.62543 2.11755 5.62169 2.1332C5.027 4.43166 5.62203 6.85565 7.21353 8.61658C7.22408 8.62883 7.23496 8.64006 7.24619 8.65094ZM7.26218 2.58296C7.42038 2.1019 7.66635 1.7787 7.92049 1.7161C7.94941 1.7093 7.979 1.70487 8.00928 1.70317C8.34983 1.73719 8.66112 1.89641 8.90642 2.17334C9.50655 2.80886 9.9233 3.59576 10.1131 4.44833C10.1159 4.46092 10.1186 4.47282 10.122 4.48507C10.3486 5.32811 10.3435 6.21878 10.1145 7.03154C9.9563 7.52553 9.70761 7.85791 9.44939 7.92017C9.18981 7.98277 8.82102 7.81062 8.45938 7.45817C7.27001 6.13033 6.82331 4.31122 7.26218 2.58296Z" fill="currentColor"/>
      </g>
    </svg>
  )
}
function FaqIcon() {
  return (
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="faqs-mask" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
        <path d="M0 0H25V23.1755H0V0Z" fill="black"/>
      </mask>
      <g mask="url(#faqs-mask)">
        <path d="M21.1044 -0.00012207H3.89559C1.74735 -0.00012207 0 1.74758 0 3.89547V15.824C0 17.9723 1.74735 19.7196 3.89559 19.7196H6.53642C7.11308 19.7196 7.65535 19.944 8.06283 20.3518L9.74522 22.0342C10.4813 22.7703 11.4592 23.1757 12.5 23.1757C13.5408 23.1757 14.519 22.7703 15.2544 22.0342L16.9372 20.3518C17.345 19.944 17.8869 19.7196 18.4636 19.7196H21.1044C23.2526 19.7196 25 17.9723 25 15.824V3.89547C25 1.74758 23.2526 -0.00012207 21.1044 -0.00012207ZM23.2631 15.824C23.2631 17.0142 22.2946 17.9827 21.1044 17.9827H18.4636C17.4232 17.9827 16.4449 18.3877 15.7092 19.1238L14.0264 20.8062C13.6186 21.2141 13.0767 21.4388 12.5 21.4388C11.9233 21.4388 11.3814 21.2141 10.9739 20.8062L9.29119 19.1238C8.55543 18.3877 7.57719 17.9827 6.53642 17.9827H3.89559C2.7051 17.9827 1.73693 17.0142 1.73693 15.824V3.89547C1.73693 2.70532 2.7051 1.73681 3.89559 1.73681H21.1044C22.2946 1.73681 23.2631 2.70532 23.2631 3.89547V15.824Z" fill="currentColor"/>
        <path d="M12.2908 4.39294C9.93799 4.39294 8.29971 5.29927 7.35864 6.72842L9.46728 7.96581C10.0252 7.16405 10.8791 6.67597 11.9942 6.67597C13.1273 6.67597 13.8766 7.21615 13.8766 8.07038C13.8766 9.58672 11.1577 10.1269 11.1577 12.5669H13.7895C13.7895 10.7195 16.7176 10.4059 16.7176 7.61738C16.7176 5.56051 14.9049 4.39294 12.2908 4.39294Z" fill="currentColor"/>
        <path d="M12.4826 13.8047C11.5064 13.8047 10.8096 14.4668 10.8096 15.3558C10.8096 16.2274 11.5064 16.9419 12.4826 16.9419C13.4587 16.9419 14.1556 16.2274 14.1556 15.3558C14.1556 14.4668 13.4587 13.8047 12.4826 13.8047Z" fill="currentColor"/>
      </g>
    </svg>
  )
}
function CustomTileIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="4"/>
    </svg>
  )
}
function ProfileIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="profile-mask" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="25">
        <path d="M0 0.00012207H24.9999V25H0V0.00012207Z" fill="black"/>
      </mask>
      <g mask="url(#profile-mask)">
        <path d="M12.4999 0.00012207C5.60716 0.00012207 0 5.60728 0 12.5001C0 16.2556 1.66293 19.6269 4.29358 21.9222C6.49103 23.8402 9.35924 25 12.4999 25C15.6372 25 18.5089 23.8402 20.7028 21.9257C23.3335 19.6304 24.9999 16.2556 24.9999 12.5001C24.9999 5.60728 19.3927 0.00012207 12.4999 0.00012207ZM6.36526 21.3248C7.44477 18.9736 9.83786 17.3806 12.4999 17.3806C15.162 17.3806 17.5551 18.9736 18.6346 21.3248C16.8948 22.5406 14.7812 23.2532 12.4999 23.2532C10.2187 23.2532 8.10505 22.5406 6.36526 21.3248ZM20.0146 20.1824C18.5752 17.4539 15.6896 15.6338 12.4999 15.6338C9.31033 15.6338 6.42814 17.4539 4.98531 20.1789C2.98699 18.2295 1.74678 15.508 1.74678 12.5001C1.74678 6.5715 6.57138 1.7469 12.4999 1.7469C18.4285 1.7469 23.2531 6.5715 23.2531 12.5001C23.2531 15.508 22.0129 18.2295 20.0146 20.1824Z" fill="currentColor"/>
        <path d="M12.4999 3.80103C10.0265 3.80103 8.0177 5.81331 8.0177 8.28326C8.0177 10.7567 10.0265 12.7655 12.4999 12.7655C14.9699 12.7655 16.9822 10.7567 16.9822 8.28326C16.9822 5.81331 14.9699 3.80103 12.4999 3.80103ZM12.4999 11.0187C10.9907 11.0187 9.76447 9.79247 9.76447 8.28326C9.76447 6.77404 10.9907 5.5478 12.4999 5.5478C14.0091 5.5478 15.2354 6.77404 15.2354 8.28326C15.2354 9.79247 14.0091 11.0187 12.4999 11.0187Z" fill="currentColor"/>
      </g>
    </svg>
  )
}
function UnitsIcon() {
  return (
    <svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="unit-mask" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="25">
        <path d="M0 0H19.6237V25H0V0Z" fill="black"/>
      </mask>
      <g mask="url(#unit-mask)">
        <path d="M11.3831 0.00012207C11.3495 0.00012207 11.3159 0.00275048 11.2826 0.00800731L2.3866 1.42589C1.06538 1.45918 0 2.70593 0 4.23304V20.7669C0 22.294 1.06538 23.5405 2.38631 23.5741L11.2826 24.9922C11.3159 24.9975 11.3495 25.0001 11.3831 25.0001C12.7291 25.0001 13.8243 23.7405 13.8243 22.1918V2.80814C13.8243 1.25972 12.7291 0.00012207 11.3831 0.00012207ZM12.3641 22.1918C12.3641 22.7972 11.9473 23.2934 11.4266 23.3197L2.54138 21.9033C2.50809 21.898 2.4748 21.8954 2.44121 21.8954C1.90005 21.8954 1.46023 21.389 1.46023 20.7669V4.23304C1.46023 3.61069 1.90005 3.10457 2.44121 3.10457C2.4748 3.10457 2.50809 3.10194 2.54138 3.09668L11.4266 1.68055C11.9473 1.70684 12.3641 2.20273 12.3641 2.80814V22.1918Z" fill="currentColor"/>
        <path d="M17.1823 2.35864H15.0465C14.6429 2.35864 14.3164 2.73451 14.3164 3.19827C14.3164 3.66234 14.6429 4.0382 15.0465 4.0382H17.1823C17.7237 4.0382 18.1635 4.54431 18.1635 5.16666V19.8332C18.1635 20.4556 17.7237 20.9617 17.1823 20.9617H15.0465C14.6429 20.9617 14.3164 21.3375 14.3164 21.8013C14.3164 22.2651 14.6429 22.6412 15.0465 22.6412H17.1823C18.5286 22.6412 19.6235 21.3813 19.6235 19.8332V5.16666C19.6235 3.61824 18.5286 2.35864 17.1823 2.35864Z" fill="currentColor"/>
        <path d="M10.0032 12.5195C9.47078 12.5195 9.03943 13.0157 9.03943 13.6281C9.03943 14.2403 9.47078 14.7367 10.0032 14.7367C10.5356 14.7367 10.9669 14.2403 10.9669 13.6281C10.9669 13.0157 10.5356 12.5195 10.0032 12.5195Z" fill="currentColor"/>
      </g>
    </svg>
  )
}
function BillingIcon() {
  return (
    <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="invoice-mask" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="26">
        <path d="M0 0H24.5684V25.7742H0V0Z" fill="black"/>
      </mask>
      <g mask="url(#invoice-mask)">
        <path d="M17.683 25.7742H3.76278C1.68794 25.7742 0 24.0895 0 22.0185V3.76349C0 1.6883 1.68794 0 3.76278 0H10.6318C11.4798 0 12.2867 0.184036 13.0296 0.546422C13.5931 0.797251 14.1359 1.17349 14.6141 1.65206L19.7941 6.82388C20.2613 7.29143 20.6383 7.83288 20.9161 8.43437C21.1218 8.87989 20.9271 9.40784 20.4812 9.61319C20.035 9.81855 19.5081 9.6235 19.3028 9.17833C19.1162 8.77366 18.8523 8.39422 18.5386 8.08051L13.3586 2.90869C13.0342 2.58396 12.6707 2.33064 12.2782 2.15584C11.7523 1.89969 11.2073 1.7764 10.6318 1.7764H3.76278C2.66745 1.7764 1.7764 2.6678 1.7764 3.76349V22.0185C1.7764 23.11 2.66745 23.9978 3.76278 23.9978H17.683C18.1737 23.9978 18.5712 24.3954 18.5712 24.886C18.5712 25.3767 18.1737 25.7742 17.683 25.7742Z" fill="currentColor"/>
        <path d="M20.1096 9.69455H12.6402C12.1495 9.69455 11.752 9.29699 11.752 8.80635V1.34474C11.752 1.04346 11.9044 0.763143 12.157 0.599359C12.4092 0.435574 12.7276 0.410704 13.0022 0.533632C13.5937 0.797605 14.1362 1.17385 14.6145 1.65206L19.7941 6.82424C20.2602 7.29037 20.6375 7.83181 20.9157 8.4333C21.0429 8.70865 21.0212 9.02947 20.8582 9.28491C20.6951 9.54 20.4126 9.69455 20.1096 9.69455ZM13.5284 7.91815H18.3755L13.5284 3.0778V7.91815Z" fill="currentColor"/>
        <path d="M18.2099 19.9054C18.5997 19.9054 18.9521 20.1463 19.0835 20.5129C19.2985 21.1123 19.8115 21.5265 20.8322 21.5265C21.8992 21.5265 22.5266 21.0487 22.5266 20.1004C22.5266 19.2094 22.0345 18.7397 20.4773 18.1936C18.1488 17.4003 17.1807 16.6748 17.1807 15.0675C17.1807 13.44 18.5993 12.3866 20.7388 12.3866C22.4932 12.3866 23.4912 12.9007 23.9722 13.7153C24.3282 14.3182 23.8344 15.0803 23.1341 15.0803C22.7419 15.0803 22.4108 14.8284 22.2566 14.4678C22.053 13.991 21.594 13.6478 20.7125 13.6478C19.6616 13.6478 19.1937 14.1655 19.1937 14.9492C19.1937 15.7255 19.7227 16.1607 21.4121 16.7395C23.7075 17.5158 24.5684 18.4043 24.5684 19.9214C24.5684 21.6473 23.3526 22.7874 20.7551 22.7828C18.8711 22.7796 17.8095 22.1998 17.315 21.2757C16.9835 20.6568 17.4532 19.9054 18.1552 19.9054H18.2099ZM20.0535 12.647V12.0707C20.0535 11.6398 20.4031 11.2902 20.834 11.2902C21.265 11.2902 21.6146 11.6398 21.6146 12.0707V12.647H20.0535ZM20.0535 23.1395V22.4748H21.6146V23.1395C21.6146 23.5704 21.265 23.9201 20.834 23.9201C20.4031 23.9201 20.0535 23.5704 20.0535 23.1395Z" fill="currentColor"/>
        <path d="M8.04499 7.43143H4.78493C4.29429 7.43143 3.89673 7.03423 3.89673 6.54323C3.89673 6.05259 4.29429 5.65503 4.78493 5.65503H8.04499C8.53563 5.65503 8.93319 6.05259 8.93319 6.54323C8.93319 7.03423 8.53563 7.43143 8.04499 7.43143Z" fill="currentColor"/>
        <path d="M8.04499 11.7616H4.78493C4.29429 11.7616 3.89673 11.3641 3.89673 10.8734C3.89673 10.3828 4.29429 9.98523 4.78493 9.98523H8.04499C8.53563 9.98523 8.93319 10.3828 8.93319 10.8734C8.93319 11.3641 8.53563 11.7616 8.04499 11.7616Z" fill="currentColor"/>
        <path d="M12.9102 21.3467H7.29073C5.41911 21.3467 3.89673 19.8243 3.89673 17.9527C3.89673 16.0815 5.41911 14.5591 7.29073 14.5591H12.9102C13.4009 14.5591 13.7984 14.9566 13.7984 15.4473C13.7984 15.9376 13.4009 16.3355 12.9102 16.3355H7.29073C6.39862 16.3355 5.67313 17.061 5.67313 17.9527C5.67313 18.8448 6.39862 19.5703 7.29073 19.5703H12.9102C13.4009 19.5703 13.7984 19.9679 13.7984 20.4585C13.7984 20.9492 13.4009 21.3467 12.9102 21.3467Z" fill="currentColor"/>
      </g>
    </svg>
  )
}
function LockIcon() {
  return (
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="lock-mask" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="25">
        <path d="M0 0H23.5675V25H0V0Z" fill="black"/>
      </mask>
      <g mask="url(#lock-mask)">
        <path d="M20.6093 6.85332H19.5794V3.91516C19.5794 1.75621 17.8231 -0.00012207 15.6642 -0.00012207H7.90333C5.74438 -0.00012207 3.98804 1.75621 3.98804 3.91516V6.85332H2.95814C1.32696 6.85332 0 8.18028 0 9.81146V22.0421C0 23.6733 1.32696 25.0003 2.95814 25.0003H20.6093C22.2405 25.0003 23.5675 23.6733 23.5675 22.0421V9.81146C23.5675 8.18028 22.2405 6.85332 20.6093 6.85332ZM5.87293 3.91516C5.87293 2.79554 6.78371 1.88476 7.90333 1.88476H15.6642C16.7838 1.88476 17.6946 2.79554 17.6946 3.91516V6.85332H5.87293V3.91516ZM21.6826 22.0421C21.6826 22.6336 21.2012 23.1154 20.6093 23.1154H2.95814C2.36629 23.1154 1.88489 22.6336 1.88489 22.0421V9.81146C1.88489 9.21961 2.36629 8.73821 2.95814 8.73821H4.93049H18.637H20.6093C21.2012 8.73821 21.6826 9.21961 21.6826 9.81146V22.0421Z" fill="currentColor"/>
        <path d="M11.7835 13.0477C11.2629 13.0477 10.8411 13.4696 10.8411 13.9902V17.8621C10.8411 18.3827 11.2629 18.8045 11.7835 18.8045C12.3041 18.8045 12.726 18.3827 12.726 17.8621V13.9902C12.726 13.4696 12.3041 13.0477 11.7835 13.0477Z" fill="currentColor"/>
      </g>
    </svg>
  )
}
function BellIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_bell" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="25">
        <path d="M0 0H25V24.7343H0V0Z" fill="black"/>
      </mask>
      <g mask="url(#mask0_bell)">
        <path d="M20.7309 10.8363C20.235 10.8363 19.8333 11.2381 19.8333 11.7339V19.6966C19.8333 21.4843 18.3787 22.9392 16.5907 22.9392H5.03784C3.24977 22.9392 1.79525 21.4843 1.79525 19.6966V8.14343C1.79525 6.35572 3.24977 4.90085 5.03784 4.90085H13.0002C13.496 4.90085 13.8978 4.49907 13.8978 4.00322C13.8978 3.50737 13.496 3.10559 13.0002 3.10559H5.03784C2.25987 3.10559 0 5.36546 0 8.14343V19.6966C0 22.4746 2.25987 24.7345 5.03784 24.7345H16.5907C19.3686 24.7345 21.6285 22.4746 21.6285 19.6966V11.7339C21.6285 11.2381 21.2267 10.8363 20.7309 10.8363Z" fill="currentColor"/>
        <path d="M19.8153 0.00012207C16.9565 0.00012207 14.6306 2.32605 14.6306 5.18482C14.6306 8.04358 16.9565 10.3695 19.8153 10.3695C22.6741 10.3695 25 8.04358 25 5.18482C25 2.32605 22.6741 0.00012207 19.8153 0.00012207ZM19.8153 8.57426C17.9464 8.57426 16.4259 7.05368 16.4259 5.18482C16.4259 3.31596 17.9464 1.79538 19.8153 1.79538C21.6842 1.79538 23.2048 3.31596 23.2048 5.18482C23.2048 7.05368 21.6842 8.57426 19.8153 8.57426Z" fill="currentColor"/>
      </g>
    </svg>
  )
}
function EyeIcon() {
  return (
    <svg width="25" height="18" viewBox="0 0 25 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_eye" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="18">
        <path d="M0 0H25V17.8864H0V0Z" fill="black"/>
      </mask>
      <g mask="url(#mask0_eye)">
        <path d="M12.5002 4.19385C9.88141 4.19385 7.75085 6.32409 7.75085 8.94318C7.75085 11.562 9.88141 13.6925 12.5002 13.6925C15.119 13.6925 17.2498 11.562 17.2498 8.94318C17.2498 6.32409 15.119 4.19385 12.5002 4.19385V4.19385ZM12.5002 12.1176C10.7498 12.1176 9.32578 10.6936 9.32578 8.94318C9.32578 7.19281 10.7498 5.76877 12.5002 5.76877C14.2506 5.76877 15.6749 7.19281 15.6749 8.94318C15.6749 10.6936 14.2506 12.1176 12.5002 12.1176Z" fill="currentColor"/>
        <path d="M24.8895 8.54017C21.6133 3.03298 17.2133 0 12.5002 0C7.78709 0 3.38707 3.03298 0.110918 8.54017C-0.0368099 8.78838 -0.0368099 9.09738 0.110918 9.34559C3.38707 14.8531 7.78709 17.8864 12.5002 17.8864C17.2133 17.8864 21.6133 14.8531 24.8895 9.34559C25.0372 9.09738 25.0372 8.78838 24.8895 8.54017ZM12.5002 16.3115C8.47659 16.3115 4.65803 13.6993 1.70883 8.94272C4.65803 4.18677 8.47659 1.57492 12.5002 1.57492C16.5238 1.57492 20.3424 4.18677 23.2916 8.94272C20.3424 13.6993 16.5238 16.3115 12.5002 16.3115Z" fill="currentColor"/>
      </g>
    </svg>
  )
}
function ListIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2"/>
      <circle cx="8" cy="10.5" r="2"/>
      <path d="M4 19v-1a4 4 0 014-4h0a4 4 0 014 4v1"/>
      <line x1="14" y1="9" x2="19" y2="9"/>
      <line x1="14" y1="13" x2="19" y2="13"/>
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_globe" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="25">
        <path d="M0 0H25V25H0V0Z" fill="black"/>
      </mask>
      <g mask="url(#mask0_globe)">
        <path d="M12.5 0.000244141C5.60751 0.000244141 0 5.60775 0 12.5002C0 19.3927 5.60751 24.9999 12.5 24.9999C19.3925 24.9999 25 19.3927 25 12.5002C25 5.60775 19.3925 0.000244141 12.5 0.000244141ZM12.5 23.3419C11.4415 23.3419 10.0832 21.2156 9.40111 17.5301C10.4228 17.6345 11.4667 17.6889 12.5 17.6889C13.5336 17.6889 14.5775 17.6345 15.5992 17.5301C14.9171 21.2156 13.5585 23.3419 12.5 23.3419ZM12.5 16.0309C11.2979 16.0309 10.1804 15.9639 9.15307 15.8475C9.03634 14.8198 8.96969 13.7027 8.96969 12.5002C8.96969 11.2978 9.03634 10.1803 9.15307 9.15298C10.1804 9.03626 11.2979 8.9696 12.5 8.9696C13.7024 8.9696 14.8199 9.03626 15.8473 9.15298C15.964 10.1803 16.0306 11.2978 16.0306 12.5002C16.0306 13.7027 15.964 14.8198 15.8473 15.8472C14.8199 15.9639 13.7024 16.0309 12.5 16.0309ZM7.47016 15.5991C3.78465 14.917 1.65804 13.5587 1.65804 12.5002C1.65804 11.4417 3.78465 10.0831 7.47016 9.40103C7.3657 10.4227 7.31165 11.4666 7.31165 12.5002C7.31165 13.5335 7.3657 14.5774 7.47016 15.5991ZM12.5 1.65829C13.5585 1.65829 14.9171 3.78457 15.5992 7.47007C14.5775 7.36561 13.5336 7.31156 12.5 7.31156C11.4667 7.31156 10.4228 7.36561 9.40111 7.47007C10.0832 3.78457 11.4415 1.65829 12.5 1.65829ZM17.5302 9.40103C21.2157 10.0831 23.342 11.4417 23.342 12.5002C23.342 13.5587 21.2157 14.917 17.5302 15.5991C17.6346 14.5774 17.6887 13.5335 17.6887 12.5002C17.6887 11.467 17.6346 10.4227 17.5302 9.40103ZM22.9301 9.5476C21.5227 8.68342 19.5195 8.06166 17.3037 7.69656C16.9386 5.48075 16.3168 3.47716 15.4526 2.07015C19.0606 3.09316 21.9071 5.93969 22.9301 9.5476ZM9.54769 2.07015C8.68351 3.47716 8.06175 5.48041 7.69664 7.69656C5.4805 8.06166 3.47725 8.68342 2.07023 9.5476C3.09292 5.93969 5.93978 3.09316 9.54769 2.07015ZM2.07023 15.4529C3.47725 16.3171 5.4805 16.9388 7.69664 17.3039C8.06175 19.5197 8.68351 21.523 9.54769 22.93C5.93978 21.9073 3.09292 19.0605 2.07023 15.4529ZM15.4526 22.93C16.3168 21.523 16.9386 19.5197 17.3037 17.3039C19.5195 16.9388 21.5227 16.3171 22.9301 15.4529C21.9071 19.0605 19.0606 21.907 15.4526 22.93Z" fill="currentColor"/>
      </g>
    </svg>
  )
}
