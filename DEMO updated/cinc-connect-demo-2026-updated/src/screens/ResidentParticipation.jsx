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

export const SMARTHOME_CONTENT = {
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
    <svg width="71" height="76" viewBox="0 0 71 76" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M35 3L4 28v40a6 6 0 0 0 6 6h13V52h24v22h13a6 6 0 0 0 6-6V28L35 3Z" fill="currentColor"/>
      <circle cx="45" cy="20" r="3.5" fill="currentColor"/>
      <path d="M39 13a12 12 0 0 1 17 0" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
      <path d="M43 17a6 6 0 0 1 9 0" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
    </svg>
  )
}

export function SmartHomeSheetScreen() {
  const { popResidentView } = useMode()
  return <CustomContentSheet content={SMARTHOME_CONTENT} onClose={popResidentView} />
}

export default function ResidentParticipation() {
  const { pushResidentView, isWeb } = useMode()

  const fix = svg => svg.replace(/fill="#FFF8EA"/gi, 'fill="currentColor"')

  const TILES = [
    { label: 'Work\nOrders',             icon: fix(woIcon),         onTap: () => pushResidentView('work-orders') },
    { label: 'Architectural\nRequests',  icon: fix(houseCheckIcon), onTap: () => pushResidentView('arch-requests') },
    { label: 'Violations',               icon: fix(violationIcon),  onTap: () => pushResidentView('report-violation') },
    { label: 'Smart Home\nUpgrade',      icon: null,                onTap: () => pushResidentView('smart-home'), customIcon: <SmartHomeIcon /> },
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
    </div>
  )
}
