import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import hoaBg from '../images/hoa.jpg'
import './MemberDetail.css'

function BuildingIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_md_prop" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="25">
        <path d="M0 0H19.6237V25H0V0Z" fill="black"/>
      </mask>
      <g mask="url(#mask0_md_prop)">
        <path d="M11.3831 0.00012207C11.3495 0.00012207 11.3159 0.00275048 11.2826 0.00800731L2.3866 1.42589C1.06538 1.45918 0 2.70593 0 4.23304V20.7669C0 22.294 1.06538 23.5405 2.38631 23.5741L11.2826 24.9922C11.3159 24.9975 11.3495 25.0001 11.3831 25.0001C12.7291 25.0001 13.8243 23.7405 13.8243 22.1918V2.80814C13.8243 1.25972 12.7291 0.00012207 11.3831 0.00012207ZM12.3641 22.1918C12.3641 22.7972 11.9473 23.2934 11.4266 23.3197L2.54138 21.9033C2.50809 21.898 2.4748 21.8954 2.44121 21.8954C1.90005 21.8954 1.46023 21.389 1.46023 20.7669V4.23304C1.46023 3.61069 1.90005 3.10457 2.44121 3.10457C2.4748 3.10457 2.50809 3.10194 2.54138 3.09668L11.4266 1.68055C11.9473 1.70684 12.3641 2.20273 12.3641 2.80814V22.1918Z" fill="#FFF8EA"/>
        <path d="M17.1823 2.35864H15.0465C14.6429 2.35864 14.3164 2.73451 14.3164 3.19827C14.3164 3.66234 14.6429 4.0382 15.0465 4.0382H17.1823C17.7237 4.0382 18.1635 4.54431 18.1635 5.16666V19.8332C18.1635 20.4556 17.7237 20.9617 17.1823 20.9617H15.0465C14.6429 20.9617 14.3164 21.3375 14.3164 21.8013C14.3164 22.2651 14.6429 22.6412 15.0465 22.6412H17.1823C18.5286 22.6412 19.6235 21.3813 19.6235 19.8332V5.16666C19.6235 3.61824 18.5286 2.35864 17.1823 2.35864Z" fill="#FFF8EA"/>
        <path d="M10.0032 12.5195C9.47078 12.5195 9.03943 13.0157 9.03943 13.6281C9.03943 14.2403 9.47078 14.7367 10.0032 14.7367C10.5356 14.7367 10.9669 14.2403 10.9669 13.6281C10.9669 13.0157 10.5356 12.5195 10.0032 12.5195Z" fill="#FFF8EA"/>
      </g>
    </svg>
  )
}

function MailingIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFF8EA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#FFF8EA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/>
      <path d="M16 8v5a3 3 0 006 0v-1a10 10 0 10-3.92 7.94"/>
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="17" height="25" viewBox="0 0 17 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.50003 21.9624C8.27527 21.9624 8.05391 21.8666 7.89726 21.7033C7.73721 21.5365 7.64526 21.3094 7.64526 21.0752C7.64526 20.841 7.73721 20.6139 7.89726 20.4471C8.09478 20.2413 8.38765 20.149 8.66349 20.2058C8.71798 20.2165 8.77245 20.2342 8.82353 20.2555C8.87462 20.2768 8.92572 20.3052 8.96999 20.3371C9.01766 20.369 9.06194 20.4081 9.0994 20.4471C9.25945 20.6139 9.3514 20.841 9.3514 21.0752C9.3514 21.3094 9.25945 21.5365 9.0994 21.7033C9.06194 21.7424 9.01766 21.7814 8.96999 21.8133C8.92572 21.8453 8.87462 21.8701 8.82353 21.895C8.77245 21.9162 8.71798 21.934 8.66349 21.9446C8.609 21.9553 8.55452 21.9624 8.50003 21.9624Z" fill="#FFF8EA"/>
      <path d="M14.2654 25H2.73117C1.22597 25 0 23.7225 0 22.154V2.846C0 1.27751 1.22597 0 2.73117 0H14.2654C15.7706 0 16.9966 1.27751 16.9966 2.846V22.154C16.9966 23.7225 15.7706 25 14.2654 25ZM2.73458 1.77076C2.16587 1.77076 1.70613 2.25337 1.70613 2.84244V22.1505C1.70613 22.7431 2.16928 23.2221 2.73458 23.2221H14.2688C14.8375 23.2221 15.2973 22.7395 15.2973 22.1505V2.84244C15.2973 2.24983 14.8341 1.77076 14.2688 1.77076H2.73458Z" fill="#FFF8EA"/>
      <path d="M16.1486 19.0241H0.851361C0.38141 19.0241 0 18.6267 0 18.137C0 17.6473 0.38141 17.2498 0.851361 17.2498H16.1486C16.6186 17.2498 17 17.6473 17 18.137C17 18.6267 16.6186 19.0241 16.1486 19.0241Z" fill="#FFF8EA"/>
    </svg>
  )
}

function MobileIcon() {
  return (
    <svg width="14" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,248,234,0.6)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2"/>
      <line x1="12" y1="18" x2="12.01" y2="18"/>
    </svg>
  )
}

function HomePhoneIcon() {
  return (
    <svg width="20" height="21" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.0086 25.9965H17.8851C16.7885 25.9965 15.8968 25.0086 15.8968 23.7938V15.3179C15.8968 15.0666 15.7109 14.8606 15.484 14.8606H9.51286C9.28599 14.8606 9.10008 15.0666 9.10008 15.3179V23.7938C9.10008 25.0086 8.20835 25.9965 7.1118 25.9965H1.98828C0.891731 25.9965 0 25.0086 0 23.7938V12.3367C0 11.1847 0.453751 10.0956 1.2478 9.35204L10.2124 0.932062C11.5358 -0.310687 13.4579 -0.310687 14.7813 0.932062L23.7522 9.35553C24.5463 10.0991 25 11.1882 25 12.3437V23.7973C25 25.0121 24.1083 26 23.0117 26L23.0086 25.9965Z" fill="#FFF8EA"/>
    </svg>
  )
}

function WorkPhoneIcon() {
  return (
    <svg width="20" height="21" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.6021 18.9374L21.0527 17.0443C20.0467 16.2983 18.7017 16.2083 17.5478 16.8119C16.1487 17.5429 14.4648 17.2579 13.3541 16.1033L9.50669 12.1034C8.39969 10.9526 8.12563 9.19819 8.82518 7.74368C9.40572 6.54034 9.31918 5.14581 8.60161 4.09992L6.78423 1.45331C6.08108 0.429908 4.94164 -0.106167 3.73728 0.0175411C2.5293 0.141249 1.51243 0.905991 1.01481 2.05685C-0.961211 6.64155 0.00518268 12.1072 3.41996 15.661L9.93577 22.435C12.1714 24.7629 15.1932 26 18.251 26C19.87 26 21.4999 25.6551 23.0252 24.9391C24.1322 24.4218 24.8641 23.3609 24.9831 22.1051C25.1021 20.853 24.5865 19.6684 23.6021 18.9411V18.9374Z" fill="#FFF8EA"/>
    </svg>
  )
}

function BmBadge() {
  return <div className="md-bm-badge">BM</div>
}

function ChevronIcon({ open }) {
  return (
    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
      <path d="M1 1l6 6 6-6" stroke="rgba(255,248,234,0.5)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function MemberDetail() {
  const { state } = useLocation()
  const contact = state?.contact
  const [unitsExpanded, setUnitsExpanded] = useState(false)

  if (!contact) return null

  const addresses = Array.isArray(contact.address) ? contact.address : [contact.address]
  const VISIBLE = 3
  const extra = addresses.length - VISIBLE
  const shownAddresses = unitsExpanded ? addresses : addresses.slice(0, VISIBLE)
  const mailingIsSame = contact.mailingAddress === addresses[0]

  return (
    <div className="screen md-screen">
      {/* Hero */}
      <div className="md-hero">
        <img src={hoaBg} alt="" className="md-hero__blur-bg" aria-hidden="true" />
        <div className="md-hero__overlay" />
        <div className="md-hero__content">
          <div className="md-photo-wrap">
            {contact.photo ? (
              <img src={contact.photo} alt={contact.firstName} className="md-photo" />
            ) : (
              <div className="md-photo md-photo--initials">
                <span>{contact.firstName[0]}{contact.lastName[0]}</span>
              </div>
            )}
            {contact.role && <BmBadge />}
          </div>
          <p className="md-hero__name">{contact.firstName} {contact.lastName}</p>
          {contact.role && <p className="md-hero__role">Board {contact.role}</p>}
        </div>
      </div>

      {/* Cards */}
      <div className="md-cards">
        {/* Property Address */}
        {contact.address && (
          <div className="md-card md-card--units">
            <p className="md-card__label">Property Address</p>
            <div className="md-card__body">
              {shownAddresses.map((addr, i) => (
                <div key={i} className="md-unit-row">
                  <div className="md-unit-row__icon"><BuildingIcon /></div>
                  <p className="md-card__value">{addr}</p>
                </div>
              ))}
              {extra > 0 && (
                <button className="md-units-more" onClick={() => setUnitsExpanded(e => !e)}>
                  <span>{unitsExpanded ? 'Show less' : `${extra} more Unit${extra > 1 ? 's' : ''}`}</span>
                  <ChevronIcon open={unitsExpanded} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mailing Address — only show if different from property */}
        {contact.mailingAddress && !mailingIsSame && (
          <div className="md-card">
            <p className="md-card__label">Mailing Address</p>
            <div className="md-card__body md-card__body--inline">
              <div className="md-card__icon"><MailingIcon /></div>
              <p className="md-card__value">{contact.mailingAddress}</p>
            </div>
          </div>
        )}

        {/* Email */}
        {contact.email && (
          <div className="md-card">
            <div className="md-card__icon"><EmailIcon /></div>
            <div className="md-card__body">
              <a href={`mailto:${contact.email}`} className="md-card__value md-card__link">
                {contact.email}
              </a>
            </div>
          </div>
        )}

        {/* Phone */}
        {contact.phone && (() => {
          const entries = [
            contact.phone.mobile && { num: contact.phone.mobile, label: 'Mobile', icon: <PhoneIcon /> },
            contact.phone.home   && { num: contact.phone.home,   label: 'Home',   icon: <HomePhoneIcon /> },
            contact.phone.office && { num: contact.phone.office, label: 'Work',   icon: <WorkPhoneIcon /> },
          ].filter(Boolean)
          const multi = entries.length > 1
          return (
            <div className="md-card">
              {!multi && <div className="md-card__icon"><PhoneIcon /></div>}
              <div className="md-card__body">
                {entries.map(({ num, label, icon }) => (
                  <div key={label} className="md-phone-row">
                    {multi && <div className="md-phone-row__icon">{icon}</div>}
                    <div>
                      <a href={`tel:${num}`} className="md-card__link">+1 {num}</a>
                      <p className="md-phone-type">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })()}
      </div>
    </div>
  )
}
