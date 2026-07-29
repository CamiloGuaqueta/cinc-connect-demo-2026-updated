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
    <svg width="62" height="67" viewBox="0 0 62 67" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.04175 26.2917L28.2917 5.875L54.5417 26.2917V58.375C54.5417 59.9221 53.9272 61.4058 52.8332 62.4998C51.7392 63.5938 50.2555 64.2083 48.7084 64.2083H7.87508C6.32799 64.2083 4.84425 63.5938 3.75029 62.4998C2.65633 61.4058 2.04175 59.9221 2.04175 58.375V26.2917Z" stroke="currentColor" strokeWidth="4.08333" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19.5417 64.2082V35.0415H37.0417V64.2082" stroke="currentColor" strokeWidth="4.08333" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M49.5834 15.2699C51.1942 15.2699 52.5001 13.964 52.5001 12.3532C52.5001 10.7424 51.1942 9.43652 49.5834 9.43652C47.9726 9.43652 46.6667 10.7424 46.6667 12.3532C46.6667 13.964 47.9726 15.2699 49.5834 15.2699Z" fill="currentColor" stroke="currentColor" strokeWidth="4.08333" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M42.2917 5.06181C44.2256 3.12794 46.8485 2.0415 49.5834 2.0415C52.3183 2.0415 54.9412 3.12794 56.8751 5.06181C58.809 6.99568 59.8954 9.61857 59.8954 12.3535C59.8954 15.0884 58.809 17.7113 56.8751 19.6451" stroke="currentColor" strokeWidth="4.08333" strokeLinecap="round" strokeLinejoin="round"/>
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
