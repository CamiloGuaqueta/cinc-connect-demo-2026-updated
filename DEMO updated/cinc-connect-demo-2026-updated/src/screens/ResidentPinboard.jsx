import calendarIcon from '../ICONS/calendar-check.svg?raw'
import shoppingBagIcon from '../ICONS/shopping-bag.svg?raw'
import indexIcon from '../ICONS/index.svg?raw'
import { useMode } from '../ModeContext'
import './ResidentPinboard.css'

export default function ResidentPinboard() {
  const { pushResidentView } = useMode()

  const TILES = [
    { label: 'Community\nCalendar', icon: calendarIcon, onTap: () => pushResidentView('calendar') },
    { label: 'Community\nMarketplace', icon: shoppingBagIcon, onTap: null },
    { label: 'Home Value\nInsights', icon: indexIcon, onTap: () => pushResidentView('market-index') },
  ]

  return (
    <div className="screen resident-pinboard">
      <h1 className="resident-pinboard__title">Community Pinboard</h1>
      <div className="pinboard-grid">
        {TILES.map(({ label, icon, onTap }) => (
          <button key={label} className="pinboard-tile" onClick={onTap ?? undefined}>
            <span className="pinboard-tile__icon" dangerouslySetInnerHTML={{__html: icon}} />
            <span className="pinboard-tile__label">{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
