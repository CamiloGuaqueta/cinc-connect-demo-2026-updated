import { useState } from 'react'
import woIcon from '../ICONS/wo.svg?raw'
import houseCheckIcon from '../ICONS/house-check.svg?raw'
import violationIcon from '../ICONS/violation.svg?raw'
import { useMode } from '../ModeContext'
import HomeValuationCarousel from '../components/HomeValuationCarousel'
import CustomContentSheet from '../components/CustomContentSheet'
import houseImg from '../images/house.jpg'
import poolImg from '../images/Amenities/pool.jpg'
import mediaRoomImg from '../images/Amenities/Media room.jpg'
import './ResidentParticipation.css'

const SMARTHOME_CONTENT = {
// Layout: hero + pricing table + second inline image + short text
  hero: houseImg,
  tag: 'HOA Partner Program',
  title: 'Smart Home Upgrade Program',
  lead: 'Exclusive discounts on smart home installations for Cardinal Hills residents. All packages are pre-approved and HOA-compliant — no separate ARC submission needed.',
  sections: [
    {
      heading: 'Packages & Pricing',
      table: {
        headers: ['Package', 'Resident Price'],
        rows: [
          ['Smart thermostat', 'from $149'],
          ['Video doorbell + smart lock', 'from $249'],
          ['Home security system', 'from $499'],
          ['EV charger (solar-ready)', 'from $799'],
          ['Leak detection sensors', 'from $89'],
        ],
      },
    },
    { image: poolImg },
    {
      heading: 'How It Works',
      text: 'Request a free in-home assessment, pick your package, and a licensed installer will schedule within 5 business days. 0% APR financing available for 12 months. Program valid through December 31, 2026.',
    },
  ],
  links: [
    { label: 'Schedule Free In-Home Assessment' },
    { label: 'Contact SmartNest Solutions' },
  ],
}

function SmartHomeIcon() {
  return (
    <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
      <circle cx="17" cy="8" r="1" fill="currentColor"/>
      <path d="M14.5 5.5a3.5 3.5 0 0 1 5 5"/>
    </svg>
  )
}

export default function ResidentParticipation() {
  const { pushResidentView, isWeb } = useMode()
  const [customSheet, setCustomSheet] = useState(null)

  const fix = svg => svg.replace(/fill="#FFF8EA"/gi, 'fill="currentColor"')

  const TILES = [
    { label: 'Work\nOrders',             icon: fix(woIcon),         onTap: null },
    { label: 'Architectural\nRequests',  icon: fix(houseCheckIcon), onTap: null },
    { label: 'Violations',               icon: fix(violationIcon),  onTap: null },
    { label: 'Smart Home\nUpgrade',      icon: null,                onTap: () => setCustomSheet(SMARTHOME_CONTENT), customIcon: <SmartHomeIcon /> },
  ]

  return (
    <div className="screen resident-participation">
      <h1 className="resident-participation__title">My Properties</h1>

      <HomeValuationCarousel onCardClick={() => pushResidentView('market-index')} edgePadding={20} />

      {!isWeb && (
        <div className="participation-grid" style={{ marginTop: 16 }}>
          {TILES.map(({ label, icon, onTap, customIcon }) => (
            <button key={label} className="participation-tile" onClick={onTap || undefined}>
              <span className="participation-tile__icon">
                {customIcon ?? <span dangerouslySetInnerHTML={{__html: icon}} />}
              </span>
              <span className="participation-tile__label">{label}</span>
            </button>
          ))}
        </div>
      )}

      {customSheet && (
        <CustomContentSheet content={customSheet} onClose={() => setCustomSheet(null)} />
      )}
    </div>
  )
}
