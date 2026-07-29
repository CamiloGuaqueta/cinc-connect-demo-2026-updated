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
    <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#smart-home-clip)">
        <path d="M8.75 26.2502L35 5.8335L61.25 26.2502V58.3335C61.25 59.8806 60.6354 61.3643 59.5415 62.4583C58.4475 63.5522 56.9638 64.1668 55.4167 64.1668H14.5833C13.0362 64.1668 11.5525 63.5522 10.4585 62.4583C9.36458 61.3643 8.75 59.8806 8.75 58.3335V26.2502Z" stroke="currentColor" strokeWidth="4.08333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M26.25 64.1667V35H43.75V64.1667" stroke="currentColor" strokeWidth="4.08333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M56.2917 15.2284C57.9025 15.2284 59.2083 13.9225 59.2083 12.3117C59.2083 10.7009 57.9025 9.39502 56.2917 9.39502C54.6808 9.39502 53.375 10.7009 53.375 12.3117C53.375 13.9225 54.6808 15.2284 56.2917 15.2284Z" fill="currentColor" stroke="currentColor" strokeWidth="4.08333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M49 5.02031C50.9339 3.08644 53.5568 2 56.2917 2C59.0266 2 61.6495 3.08644 63.5833 5.02031C65.5172 6.95418 66.6036 9.57707 66.6036 12.312C66.6036 15.0469 65.5172 17.6698 63.5833 19.6036" stroke="currentColor" strokeWidth="4.08333" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs>
        <clipPath id="smart-home-clip">
          <rect width="70" height="70" fill="white"/>
        </clipPath>
      </defs>
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
