import amenitiesIcon from '../ICONS/amenities.svg?raw'
import { useMode } from '../ModeContext'
import './ResidentConcierge.css'

export default function ResidentConcierge() {
  const { pushResidentView } = useMode()

  const TILES = [
    { label: 'Amenities &\nCommon Areas', icon: amenitiesIcon, onTap: () => pushResidentView('amenities') },
  ]

  return (
    <div className="screen resident-concierge">
      <h1 className="resident-concierge__title">Concierge</h1>
      <div className="concierge-grid">
        {TILES.map(({ label, icon, onTap }) => (
          <button key={label} className="concierge-tile" onClick={onTap ?? undefined}>
            <span className="concierge-tile__icon" dangerouslySetInnerHTML={{__html: icon}} />
            <span className="concierge-tile__label">{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
