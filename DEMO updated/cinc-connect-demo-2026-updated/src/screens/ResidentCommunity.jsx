import { useState } from 'react'
import calendarIcon from '../ICONS/calendar-check.svg?raw'
import shoppingBagIcon from '../ICONS/shopping-bag.svg?raw'
import amenitiesIcon from '../ICONS/amenities.svg?raw'
import { useMode } from '../ModeContext'
import AdditionalContentSheet from '../components/AdditionalContentSheet'
import './ResidentCommunity.css'

function LinkIcon() {
  return (
    <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  )
}

export default function ResidentCommunity() {
  const { pushResidentView } = useMode()
  const [showAdditional, setShowAdditional] = useState(false)

  const TILES = [
    { label: 'Amenities &\nCommon Areas',  icon: amenitiesIcon,   onTap: () => pushResidentView('amenities') },
    { label: 'Community\nCalendar',        icon: calendarIcon,    onTap: () => pushResidentView('calendar') },
    { label: 'Community\nMarketplace',     icon: shoppingBagIcon, onTap: null },
    { label: 'Additional\nContent',        icon: null,            onTap: () => setShowAdditional(true), customIcon: <LinkIcon /> },
  ]

  return (
    <div className="screen resident-community">
      <h1 className="resident-community__title">My Community</h1>
      <div className="community-grid">
        {TILES.map(({ label, icon, onTap, customIcon }) => (
          <button key={label} className="community-tile" onClick={onTap ?? undefined}>
            <span className="community-tile__icon">
              {customIcon ?? <span dangerouslySetInnerHTML={{__html: icon}} />}
            </span>
            <span className="community-tile__label">{label}</span>
          </button>
        ))}
      </div>

      {showAdditional && (
        <AdditionalContentSheet onClose={() => setShowAdditional(false)} />
      )}
    </div>
  )
}
