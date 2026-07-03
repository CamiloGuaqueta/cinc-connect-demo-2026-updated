import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useMode } from '../ModeContext'
function UsersIcon({ className }) {
  return (
    <svg className={className} width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.48299 14.6052C3.93805 14.6052 0.811286 17.1146 0.0482334 20.5718C-0.0839538 21.1714 0.0591969 21.7884 0.44135 22.2643C0.818177 22.7332 1.37919 23.0019 1.98092 23.0019H12.9854C13.5871 23.0019 14.1481 22.7332 14.5246 22.2646C14.9071 21.7884 15.0506 21.1717 14.9181 20.5718C14.1553 17.1146 11.0282 14.6052 7.48299 14.6052ZM7.48298 12.0338C9.69916 12.0338 11.5019 10.2308 11.5019 8.01496C11.5019 5.79879 9.69916 3.99609 7.48298 3.99609C5.26681 3.99609 3.46411 5.79879 3.46411 8.01496C3.46411 10.2308 5.26681 12.0338 7.48298 12.0338ZM24.9517 16.5762C24.1887 13.1189 21.0619 10.6093 17.5167 10.6093C15.4769 10.6093 13.5611 11.4052 12.1218 12.8508C11.8167 13.1575 11.8176 13.6533 12.1239 13.9584C12.4303 14.2635 12.9265 14.2623 13.2316 13.9562C14.3749 12.8082 15.8966 12.1755 17.5167 12.1755C20.3327 12.1755 22.8167 14.1683 23.4222 16.9135C23.4516 17.0473 23.4209 17.1839 23.3373 17.2878C23.2916 17.3449 23.1895 17.4404 23.0191 17.4404H17.2244C16.7918 17.4404 16.4413 17.7909 16.4413 18.2235C16.4413 18.6561 16.7918 19.0066 17.2244 19.0066H23.0191C23.6205 19.0066 24.1815 18.7375 24.5583 18.2689C24.9405 17.7931 25.0839 17.176 24.9517 16.5762ZM17.5167 8.03786C19.7328 8.03786 21.5356 6.23485 21.5356 4.01899C21.5356 1.80282 19.7328 0.00012207 17.5167 0.00012207C15.3005 0.00012207 13.4978 1.80282 13.4978 4.01899C13.4978 6.23485 15.3005 8.03786 17.5167 8.03786Z" fill="currentColor"/>
    </svg>
  )
}
function MoneyIcon({ className }) {
  return (
    <svg className={className} width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M37.5 0C16.8215 0 0 16.8215 0 37.5C0 58.1785 16.8215 75 37.5 75C58.1785 75 75 58.1785 75 37.5C75 16.8215 58.1785 0 37.5 0ZM37.5 69.7596C19.7142 69.7596 5.24036 55.2858 5.24036 37.5C5.24036 19.7142 19.7142 5.24036 37.5 5.24036C55.2858 5.24036 69.7596 19.7142 69.7596 37.5C69.7596 55.2858 55.2858 69.7596 37.5 69.7596Z" fill="currentColor"/>
      <path d="M39.1772 34.796C33.9054 32.9933 32.2599 31.6308 32.2599 29.2098C32.2599 26.7887 33.7167 25.1537 36.9972 25.1537C39.7431 25.1537 41.179 26.2227 41.8183 27.711C42.3004 28.8324 43.3275 29.6185 44.5538 29.6185C46.7337 29.6185 48.2744 27.2394 47.1635 25.3633C45.9372 23.2881 43.6 21.8523 39.806 21.3911V20.2383C39.806 18.8967 38.716 17.8067 37.3745 17.8067C36.0329 17.8067 34.9429 18.8967 34.9429 20.2383V21.3597C29.4825 21.999 25.9819 25.0803 25.9819 29.5871C25.9819 34.5968 29.0004 36.8607 36.2635 39.3341C41.1161 41.032 42.6568 42.4993 42.6568 45.2767C42.6568 48.2323 40.6969 49.7205 37.3745 49.7205C34.0521 49.7205 32.5953 48.4314 31.9245 46.5553C31.5157 45.4129 30.4153 44.6583 29.1995 44.6583H29.0318C26.8414 44.6583 25.3741 47.006 26.4116 48.9345C27.7532 51.4393 30.4258 53.1268 34.9534 53.5355V54.7513C34.9534 56.0928 36.0434 57.1828 37.3849 57.1828C38.7265 57.1828 39.8165 56.0928 39.8165 54.7513V53.4936C46.0735 52.7809 49.029 49.469 49.029 44.7212C49.029 39.9734 46.346 37.217 39.1876 34.796H39.1772Z" fill="currentColor"/>
    </svg>
  )
}
function DepositIcon({ className }) {
  return (
    <svg className={className} width="75" height="71" viewBox="0 0 75 71" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M35.1122 54.0594C36.3725 54.0594 37.3966 53.0291 37.3966 51.7611V50.5723C43.2749 49.8987 46.0516 46.7683 46.0516 42.2807C46.0516 37.793 43.5309 35.1876 36.8058 32.8993C31.8531 31.1954 30.3072 29.9075 30.3072 27.6191C30.3072 25.3308 31.6758 23.7853 34.7577 23.7853C37.3375 23.7853 38.6865 24.7958 39.2871 26.2025C39.74 27.2625 40.705 28.0055 41.857 28.0055C43.905 28.0055 45.3525 25.7567 44.3087 23.9835C43.1567 22.022 40.961 20.6648 37.3966 20.2289V19.1392C37.3966 17.8712 36.3725 16.8409 35.1122 16.8409C33.8519 16.8409 32.8278 17.8712 32.8278 19.1392V20.1992C27.6979 20.8035 24.4092 23.716 24.4092 27.9758C24.4092 32.711 27.2449 34.8508 34.0685 37.1887C38.6274 38.7936 40.0748 40.1805 40.0748 42.8057C40.0748 45.5993 38.2335 47.006 35.1122 47.006C31.9909 47.006 30.6223 45.7875 29.9921 44.0143C29.6081 42.9345 28.5742 42.2212 27.432 42.2212H27.2745C25.2166 42.2212 23.8381 44.4403 24.8129 46.263C26.0732 48.6307 28.584 50.2256 32.8377 50.612V51.7611C32.8377 53.0291 33.8617 54.0594 35.1221 54.0594H35.1122Z" fill="currentColor"/>
      <path d="M65.5278 35.7819C65.3407 52.4346 51.8314 65.937 35.2304 65.937C18.6294 65.937 4.9232 52.2563 4.9232 35.445C4.9232 18.6338 18.5211 4.95305 35.2304 4.95305C39.7794 4.95305 44.102 5.97341 47.9716 7.78629C48.08 7.65751 48.1784 7.52872 48.2966 7.40985C49.1138 6.63714 50.1871 6.22107 51.2997 6.22107C51.4179 6.22107 51.5262 6.22107 51.6443 6.23098C51.8511 6.25079 52.0677 6.25079 52.2844 6.25079C53.1705 6.25079 53.9582 6.1121 54.6672 5.89416C49.0941 2.16934 42.4084 -0.0100708 35.2206 -0.0100708C15.8035 -0.000164371 0 15.8997 0 35.445C0 54.9904 15.8035 70.8903 35.2304 70.8903C54.6573 70.8903 70.4608 54.9904 70.4608 35.445C70.4608 34.0284 70.3722 32.6217 70.2048 31.2447C68.8952 32.7703 67.3494 34.2761 65.5278 35.7819Z" fill="currentColor"/>
      <path d="M51.4968 8.21241C50.8174 8.16287 50.138 8.40063 49.6359 8.86623C49.1337 9.33183 48.8481 9.99556 48.8481 10.6791C48.8481 20.0407 50.778 27.3615 60.4078 34.94C60.8509 35.2867 61.3925 35.465 61.9242 35.465C62.4559 35.465 62.9974 35.2867 63.4405 34.94C73.0604 27.3714 75.0002 20.0407 75.0002 10.6791C75.0002 9.98566 74.7146 9.33183 74.2125 8.86623C73.7103 8.40063 73.0309 8.15297 72.3515 8.21241C67.064 8.60866 63.9919 4.95319 63.8344 4.76497C63.3716 4.1904 62.6725 3.85358 61.934 3.85358C61.2152 3.86348 60.4767 4.1904 60.0041 4.76497C59.8761 4.92347 56.7942 8.60866 51.487 8.21241H51.4968ZM61.9242 9.738C63.6079 11.0952 66.3452 12.7496 70.0179 13.126C69.7127 19.6048 67.9895 24.5283 61.9242 29.7985C55.8588 24.5382 54.1258 19.6147 53.8304 13.126C57.5031 12.7496 60.2503 11.0952 61.9242 9.738Z" fill="currentColor"/>
    </svg>
  )
}
import calendarCheckIcon from '../ICONS/calendar-check.svg'
import phoneIcon from '../ICONS/phone.svg'
import attachmentIcon from '../ICONS/Attachment.svg'
import invoiceIcon from '../ICONS/Invoice.svg'
import depositIcon from '../ICONS/deposit.svg'
import noteIcon from '../ICONS/note.svg'
import shareIcon from '../ICONS/share.svg'
import clubhouseImg from '../images/Amenities/Clubhouse.jpg'
import mediaRoomImg from '../images/Amenities/Media room.jpg'
import poolImg from '../images/Amenities/pool.jpg'
import tennisImg from '../images/Amenities/tennis.png'
import './ResidentAmenities.css'

export const AMENITIES_DATA = [
  {
    id: 'clubhouse',
    name: 'Club House',
    img: clubhouseImg,
    maxGuests: 20,
    maxHours: 5,
    hourlyRate: 150,
    deposit: 200,
    availableTimes: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '5:00 PM'],
    description: 'The Cardinal Hills Clubhouse is a welcoming community space available for private parties, celebrations, meetings, and special events. Featuring an open gathering area, kitchen access, and flexible seating arrangements.',
    address: '1056 NE, Cardinal Point Road, Duluth, GA 30096',
    phone: '+1 (555) 256.256',
    hours: 'Mon – Sun: 8:00 AM – 10:00 PM',
    dailyHours: [
      { day: 'Monday',    blocks: ['8:00 AM – 12:00 PM', '1:00 PM – 5:00 PM', '6:00 PM – 10:00 PM'] },
      { day: 'Tuesday',   blocks: ['8:00 AM – 10:00 PM'] },
      { day: 'Wednesday', blocks: ['9:00 AM – 1:00 PM', '3:00 PM – 8:00 PM'] },
      { day: 'Thursday',  blocks: ['8:00 AM – 10:00 PM'] },
      { day: 'Friday',    blocks: ['9:00 AM – 12:00 PM', '2:00 PM – 10:00 PM'] },
      { day: 'Saturday',  blocks: ['9:00 AM – 8:00 PM'] },
      { day: 'Sunday',    blocks: ['10:00 AM – 12:00 PM', '1:00 PM – 6:00 PM'] },
    ],
    rules: 'Clubhouse-rules-regulations.pdf',
    additionalDetailsPrompt: 'Please describe the nature of your event (e.g., birthday party, corporate meeting, family celebration). Include any special setup requirements, catering plans, entertainment, or accessibility needs you\'d like us to be aware of.',
    disclosureText: 'By reserving and using the clubhouse, I agree to follow all community rules and accept responsibility for the conduct of my guests during the reservation period. I understand that I am responsible for any damages, excessive cleaning, or violations associated with the event and that the clubhouse must be left clean and in good condition. I acknowledge that the association reserves the right to revoke clubhouse privileges for misuse or noncompliance with community policies.',
  },
  {
    id: 'media-room',
    name: 'Media Room',
    img: mediaRoomImg,
    maxGuests: 10,
    maxHours: 3,
    hourlyRate: null,
    deposit: 120,
    availableTimes: [],
    description: 'The Cardinal Hills Media Room features a large-format screen, surround sound system, and plush theater seating — perfect for private screenings, sports watch parties, or presentations.',
    address: '1056 NE, Cardinal Point Road, Duluth, GA 30096',
    phone: '+1 (555) 256.256',
    hours: 'Mon – Sun: 10:00 AM – 9:00 PM',
    dailyHours: [
      { day: 'Monday',    blocks: ['10:00 AM – 2:00 PM', '4:00 PM – 9:00 PM'] },
      { day: 'Tuesday',   blocks: ['10:00 AM – 9:00 PM'] },
      { day: 'Wednesday', blocks: ['10:00 AM – 1:00 PM', '3:00 PM – 7:00 PM', '8:00 PM – 9:00 PM'] },
      { day: 'Thursday',  blocks: ['10:00 AM – 9:00 PM'] },
      { day: 'Friday',    blocks: ['10:00 AM – 9:00 PM'] },
      { day: 'Saturday',  blocks: ['11:00 AM – 4:00 PM', '5:00 PM – 7:00 PM'] },
      { day: 'Sunday',    blocks: ['11:00 AM – 6:00 PM'] },
    ],
    rules: 'MediaRoom-rules-regulations.pdf',
  },
  {
    id: 'pool',
    name: 'Pool',
    img: poolImg,
    maxGuests: 4,
    maxHours: 4,
    hourlyRate: null,
    deposit: null,
    availableTimes: ['11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '3:00 PM', '4:30 PM'],
    description: 'The Cardinal Hills Pool is a resort-style outdoor swimming pool available for private reservations. Enjoy a relaxing private swim with up to 5 guests in a beautifully maintained setting.',
    address: '1056 NE, Cardinal Point Road, Duluth, GA 30096',
    phone: '+1 (555) 256.256',
    hours: 'Mon – Sun: 7:00 AM – 9:00 PM',
    dailyHours: [
      { day: 'Monday',    blocks: ['7:00 AM – 12:00 PM', '2:00 PM – 9:00 PM'] },
      { day: 'Tuesday',   blocks: ['7:00 AM – 9:00 PM'] },
      { day: 'Wednesday', blocks: ['7:00 AM – 9:00 PM'] },
      { day: 'Thursday',  blocks: ['7:00 AM – 11:00 AM', '1:00 PM – 5:00 PM', '6:00 PM – 9:00 PM'] },
      { day: 'Friday',    blocks: ['7:00 AM – 9:00 PM'] },
      { day: 'Saturday',  blocks: ['7:00 AM – 12:00 PM', '2:00 PM – 10:00 PM'] },
      { day: 'Sunday',    blocks: ['8:00 AM – 8:00 PM'] },
    ],
    rules: 'Pool-rules-regulations.pdf',
    disclosureText: 'By accessing and using the community pool, I acknowledge and agree to comply with all posted pool rules, safety guidelines, operating hours, and association policies. I understand that pool use is at my own risk and that swimming and recreational activities may involve inherent risks of injury, accident, or illness. I agree that the association, management company, board members, and affiliated parties shall not be held responsible for injuries, accidents, lost or stolen items, or damages resulting from use of the pool or surrounding amenities.\n\nI further agree to supervise all minors and guests accompanying me at all times and to ensure that all guests comply with community rules and respectful conduct standards. Running, unsafe behavior, glass containers, unauthorized access, and any activity that may endanger others or disrupt the community are strictly prohibited. I understand that failure to comply with pool rules or staff instructions may result in immediate suspension of pool privileges and additional enforcement actions in accordance with association policies.',
    disclosureRules: [
      'Pool access is limited to residents and authorized guests only.',
      'Pool hours must be strictly observed.',
      'Children under the required age must be supervised by an adult at all times.',
      'No lifeguard may be on duty. Swim at your own risk.',
      'Running, rough play, and diving are prohibited.',
      'Glass containers are not permitted in the pool area.',
      'No food or beverages are allowed in the pool water.',
      'Proper swim attire is required at all times.',
      'Loud music and disruptive behavior are prohibited.',
      'Smoking and vaping are not allowed in the pool area.',
      'Pets are not permitted in the pool enclosure, except service animals as required by law.',
      'Guests must be accompanied by a resident at all times.',
      'Residents are responsible for cleaning up after themselves and their guests.',
      'Pool gates and access doors must remain closed and secured.',
      'Failure to follow pool rules may result in suspension of pool privileges.',
    ],
  },
  {
    id: 'tennis',
    name: 'Tennis Courts',
    img: tennisImg,
    maxGuests: 4,
    maxHours: 2,
    hourlyRate: 30,
    deposit: null,
    availableTimes: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '5:00 PM'],
    courts: [
      { id: 'court-a', name: 'Court A' },
      { id: 'court-b', name: 'Court B' },
      { id: 'court-c', name: 'Court C' },
      { id: 'court-d', name: 'Court D' },
      { id: 'court-e', name: 'Court E' },
      { id: 'court-f', name: 'Court F' },
    ],
    description: 'The Cardinal Hills Tennis Courts offer two well-maintained hard courts available for private reservations. Reserve a court for a match or practice session with up to 5 guests.',
    address: '1056 NE, Cardinal Point Road, Duluth, GA 30096',
    phone: '+1 (555) 256.256',
    hours: 'Mon – Sun: 7:00 AM – 10:00 PM',
    dailyHours: [
      { day: 'Monday',    blocks: ['7:00 AM – 10:00 PM'] },
      { day: 'Tuesday',   blocks: ['7:00 AM – 12:00 PM', '2:00 PM – 10:00 PM'] },
      { day: 'Wednesday', blocks: ['7:00 AM – 10:00 PM'] },
      { day: 'Thursday',  blocks: ['7:00 AM – 10:00 PM'] },
      { day: 'Friday',    blocks: ['7:00 AM – 11:00 AM', '12:00 PM – 3:00 PM', '5:00 PM – 10:00 PM'] },
      { day: 'Saturday',  blocks: ['7:00 AM – 10:00 PM'] },
      { day: 'Sunday',    blocks: ['8:00 AM – 8:00 PM'] },
    ],
    rules: 'Tennis-rules-regulations.pdf',
    additionalDetailsPrompt: 'Let us know your equipment needs. Do you need rackets available for you or your guests? If so, how many? Please also mention your preferred court surface, skill level of your group, and any other preferences or accommodations.',
  },
]


function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 13 13" fill="none" className="amenity-stat__icon">
      <circle cx="6.5" cy="6.5" r="5.7" stroke="#fff8ea" strokeWidth="1.2" />
      <path d="M6.5 3.5v3l2 1.5" stroke="#fff8ea" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}



function HeartIcon({ active }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        fill={active ? '#FF3B30' : '#FFF8EA'}
      />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="8" cy="8" r="6" stroke="#fff8ea" strokeWidth="1.5" opacity="0.5" />
      <path d="M12.5 12.5l3.5 3.5" stroke="#fff8ea" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  )
}

function todayStr() {
  const d = new Date()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${mm}/${dd}/${d.getFullYear()}`
}

function AmenityCard({ amenity, onTap }) {
  const [favorited, setFavorited] = useState(false)

  return (
    <div className="amenity-list-card">
      <button className="amenity-list-card__photo-btn" onClick={() => onTap(amenity, null)} aria-label={amenity.name}>
        <img src={amenity.img} alt={amenity.name} className="amenity-list-card__photo" />
        <div className="amenity-list-card__gradient" />
        <span className="amenity-list-card__name">{amenity.name}</span>
        <span className="amenity-list-card__bookmark" onClick={e => { e.stopPropagation(); setFavorited(f => !f) }}>
          <HeartIcon active={favorited} />
        </span>
      </button>

      <div className="amenity-list-card__stats">
        <span className="amenity-stat"><UsersIcon className="amenity-stat__icon" /><span>Max {amenity.maxGuests}</span></span>
        <span className="amenity-stat"><ClockIcon /><span>Max: {amenity.maxHours} Hrs</span></span>
        {amenity.hourlyRate != null
          ? <span className="amenity-stat"><MoneyIcon className="amenity-stat__icon" /><span>${amenity.hourlyRate}.00</span></span>
          : amenity.deposit != null
            ? <span className="amenity-stat"><DepositIcon className="amenity-stat__icon" /><span>${amenity.deposit}.00</span></span>
            : <span className="amenity-stat" style={{ visibility: 'hidden' }}><MoneyIcon className="amenity-stat__icon" /><span>$0</span></span>
        }
        <span className="amenity-stat" style={amenity.hourlyRate == null || amenity.deposit == null ? { visibility: 'hidden' } : undefined}><DepositIcon className="amenity-stat__icon" /><span>${amenity.deposit}.00</span></span>
      </div>

      <p className="amenity-list-card__times-label">TODAY'S AVAILABLE START TIMES</p>
      <div className="amenity-list-card__times">
        {amenity.availableTimes.length === 0 ? (
          <span className="amenity-no-times">NO AVAILABLE TIMES</span>
        ) : amenity.availableTimes.map(t => (
          <button
            key={t}
            className="amenity-time-pill"
            onClick={() => onTap(amenity, { initialDate: todayStr(), initialStartTime: t })}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  )
}

const MY_RESERVATIONS_DATA = [
  {
    id: 'r1', amenityId: 'clubhouse', amenityName: 'Club House', img: clubhouseImg,
    date: '06/15/2026', startTime: '3:00 PM', endTime: '6:00 PM', guests: 10, status: 'upcoming',
    notes: [
      { id: 'n4', type: 'fee', title: 'Amenity Fee Waived', text: 'The $120 amenity fee has been waived and refunded as a one-time courtesy. No charges will appear on your account.', timestamp: '06/13/2026  11:00 AM', author: { name: 'Lisa Thomas', avatar: '/images/avatar-2.jpg' } },
      { id: 'n3', text: 'Reminder: please ensure all guests check in at the front desk before proceeding to the clubhouse. Parking is available in Lot B only.', timestamp: '06/14/2026  2:30 PM', author: { name: 'Lisa Thomas', avatar: '/images/avatar-2.jpg' } },
      { id: 'n2', text: 'Setup crew will need access 1 hour before the reservation starts. Please coordinate with building management at least 48 hours in advance.', timestamp: '06/12/2026  10:15 AM', author: { name: 'Lisa Thomas', avatar: '/images/avatar-2.jpg' } },
      { id: 'n1', text: 'Your reservation for the Club House has been approved. Please review the attached rules and regulations before your event. Deposit hold of $200 has been placed.', timestamp: '06/10/2026  9:00 AM', isApproval: true, author: { name: 'Dalton Thomson', avatar: '/images/avatar-1.jpg' } },
    ],
  },
  { id: 'r2', amenityId: 'media-room', amenityName: 'Media Room',  img: mediaRoomImg,  date: '06/20/2026', startTime: '10:00 AM', endTime: '1:00 PM',  guests: 6,  status: 'upcoming' },
  {
    id: 'r3', amenityId: 'clubhouse', amenityName: 'Club House', img: clubhouseImg,
    date: '05/10/2026', startTime: '2:00 PM', endTime: '5:00 PM', guests: 8, status: 'completed',
    notes: [
      { id: 'r3n2', text: 'Event went smoothly. All guests checked out by 5:15 PM. Facility left in good condition.', timestamp: '05/10/2026  5:20 PM', author: { name: 'Lisa Thomas', avatar: '/images/avatar-2.jpg' } },
      { id: 'r3n1', text: 'Your reservation for the Club House has been approved. Deposit hold of $200 has been placed on your account.', timestamp: '05/08/2026  10:00 AM', isApproval: true, author: { name: 'Dalton Thomson', avatar: '/images/avatar-1.jpg' } },
    ],
  },
  {
    id: 'r4', amenityId: 'media-room', amenityName: 'Media Room', img: mediaRoomImg,
    date: '04/28/2026', startTime: '6:00 PM', endTime: '9:00 PM', guests: 5, status: 'cancelled',
    notes: [
      { id: 'r4n2', text: 'Reservation has been cancelled per your request. Any deposit hold will be released within 3–5 business days.', timestamp: '04/25/2026  11:30 AM', author: { name: 'Lisa Thomas', avatar: '/images/avatar-2.jpg' } },
      { id: 'r4n1', text: 'Your reservation for the Media Room has been approved. Please arrive 10 minutes early for setup.', timestamp: '04/22/2026  9:00 AM', isApproval: true, author: { name: 'Dalton Thomson', avatar: '/images/avatar-1.jpg' } },
    ],
  },
  {
    id: 'r5', amenityId: 'pool', amenityName: 'Pool', img: poolImg,
    date: '03/22/2026', startTime: '11:00 AM', endTime: '3:00 PM', guests: 4, status: 'completed',
    notes: [
      { id: 'r5n1', text: 'Your pool reservation has been approved. Reminder: no glass containers allowed in the pool area. Towels available at the front desk.', timestamp: '03/20/2026  2:00 PM', isApproval: true, author: { name: 'Dalton Thomson', avatar: '/images/avatar-1.jpg' } },
    ],
  },
  {
    id: 'r6', amenityId: 'tennis', amenityName: 'Tennis Court', img: tennisImg,
    date: '03/05/2026', startTime: '9:00 AM', endTime: '11:00 AM', guests: 2, status: 'cancelled',
    notes: [
      { id: 'r6n1', text: 'Reservation cancelled due to court maintenance. We apologize for the inconvenience. Please rebook at your earliest convenience.', timestamp: '03/03/2026  4:45 PM', author: { name: 'Lisa Thomas', avatar: '/images/avatar-2.jpg' } },
    ],
  },
  {
    id: 'r7', amenityId: 'clubhouse', amenityName: 'Club House', img: clubhouseImg,
    date: '02/14/2026', startTime: '5:00 PM', endTime: '10:00 PM', guests: 15, status: 'completed',
    notes: [
      { id: 'r7n3', type: 'deposit', title: 'Security Deposit Partially Charged', text: 'During the post-event inspection a broken piece of furniture was found, prompting management to charge $25 from the security deposit. The remaining $175 will be released within 5 business days.', timestamp: '02/14/2026  10:45 PM', author: { name: 'Lisa Thomas', avatar: '/images/avatar-2.jpg' } },
      { id: 'r7n2', text: 'Reminder: maximum occupancy is 20 guests. Catering must be arranged through approved vendors only. See attached vendor list.', timestamp: '02/12/2026  1:00 PM', author: { name: 'Lisa Thomas', avatar: '/images/avatar-2.jpg' } },
      { id: 'r7n1', text: 'Your Valentine\'s Day reservation for the Club House has been approved. Deposit hold of $200 has been placed on your account.', timestamp: '02/10/2026  9:30 AM', isApproval: true, author: { name: 'Dalton Thomson', avatar: '/images/avatar-1.jpg' } },
    ],
  },
]

function ResLocationIcon() {
  return (
    <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
      <path d="M9 1C5.13 1 2 4.13 2 8c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#fff8ea" strokeWidth="1.4" />
      <circle cx="9" cy="8" r="2.5" stroke="#fff8ea" strokeWidth="1.3" />
    </svg>
  )
}

function FeeScreen({ img, icon, title, onBack, children, footer, hideSep }) {
  return (
    <div className="res-fee-screen" onClick={e => e.stopPropagation()}>
      <div className="amenity-confirm">
        <div className="amenity-confirm__photo-wrap">
          <img src={img} alt="" className="amenity-confirm__photo" />
          <div className="amenity-confirm__photo-gradient" />
          <button className="res-fee-screen__back" onClick={onBack}>
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
              <path d="M7 1L1 7l6 6" stroke="#fff8ea" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Back</span>
          </button>
          <button className="amenity-confirm__close" onClick={onBack}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="13" stroke="#fff8ea" strokeWidth="1.4" fill="rgba(0,0,0,0.35)" />
              <path d="M9.5 9.5l9 9M18.5 9.5l-9 9" stroke="#fff8ea" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
          <div className="amenity-confirm__icon-ring">
            <img src={icon} alt="" className="amenity-confirm__icon" />
          </div>
        </div>
        <div className="amenity-confirm__body">
          <div className="amenity-confirm__main-card">
            <h2 className="amenity-confirm__title">{title}</h2>
            {!hideSep && <div className="amenity-confirm__sep" />}
            {children}
          </div>
          {footer}
        </div>
      </div>
    </div>
  )
}

function ReservationDetailSheet({ reservation, amenity, onClose }) {
  const [showNotes, setShowNotes]                 = useState(false)
  const [showFeeReceipt, setShowFeeReceipt]       = useState(false)
  const [showDepositDetail, setShowDepositDetail] = useState(false)

  const hasAmenityFee = amenity?.hourlyRate != null
  const hasDeposit    = amenity?.deposit != null
  const amenityFee    = hasAmenityFee ? amenity.hourlyRate : 0
  const txFee         = amenityFee * 0.035
  const totalDue      = amenityFee + txFee
  const fmt           = n => '$' + n.toFixed(2)

  return (
    <div className="res-detail-backdrop" onClick={onClose}>
      <div className="res-detail-sheet" onClick={e => e.stopPropagation()}>
        <div className="amenity-confirm">
          <div className="amenity-confirm__photo-wrap">
            <img src={reservation.img} alt={reservation.amenityName} className="amenity-confirm__photo" />
            <div className="amenity-confirm__photo-gradient" />
            <button className="amenity-confirm__close" onClick={onClose}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="13" stroke="#fff8ea" strokeWidth="1.4" fill="rgba(0,0,0,0.35)" />
                <path d="M9.5 9.5l9 9M18.5 9.5l-9 9" stroke="#fff8ea" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
            <div className={`amenity-confirm__icon-ring${reservation.status === 'cancelled' ? ' amenity-confirm__icon-ring--cancelled' : ''}`}>
              {reservation.status === 'completed' ? (
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                  <path d="M18 36l13 13 23-23" stroke="#B2DE61" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : reservation.status === 'cancelled' ? (
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                  <path d="M22 22l28 28M50 22L22 50" stroke="#FF6B62" strokeWidth="5" strokeLinecap="round" />
                </svg>
              ) : (
                <img src={calendarCheckIcon} alt="" className="amenity-confirm__icon" />
              )}
            </div>
          </div>

          <div className="amenity-confirm__body">
            <div className="amenity-confirm__main-card">
              <button className="amenity-confirm__share-icon-btn" aria-label="Share">
                <img src={shareIcon} alt="" width="20" height="20" style={{ filter: 'brightness(0) saturate(100%) invert(82%) sepia(20%) saturate(700%) hue-rotate(47deg) brightness(104%) contrast(85%)' }} />
              </button>
              <h2 className={`amenity-confirm__title${reservation.status === 'cancelled' ? ' amenity-confirm__title--cancelled' : ''}`}>
                {reservation.status === 'completed' ? 'Reservation Completed' : reservation.status === 'cancelled' ? 'Reservation Cancelled' : 'Upcoming Reservation'}
              </h2>
              <p className="amenity-confirm__sub">
                {reservation.status === 'completed' ? 'This reservation has been completed.' : reservation.status === 'cancelled' ? 'This reservation was cancelled.' : 'Here are the details of your upcoming reservation.'}
              </p>
              <div className="amenity-confirm__sep" />
              <div className="amenity-confirm__amenity-name">{reservation.amenityName}</div>
              <div className="amenity-confirm__datetime">
                {reservation.date}&nbsp;&nbsp;{reservation.startTime} – {reservation.endTime}
              </div>
              <div className="amenity-confirm__guests">Guests: {reservation.guests}</div>
            </div>

            {reservation.notes?.length > 0 && (
              <button className="amenity-confirm__row-card" onClick={() => setShowNotes(true)}>
                <img src={noteIcon} alt="" className="amenity-confirm__row-icon" />
                <span className="amenity-confirm__row-text">Reservation Notes</span>
                <svg width="7" height="13" viewBox="0 0 7 13" fill="none" className="amenity-confirm__row-chevron">
                  <path d="M1 1l5 5.5L1 12" stroke="#fff8ea" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                </svg>
              </button>
            )}

            {hasAmenityFee && (
              <button className="amenity-confirm__row-card" onClick={() => setShowFeeReceipt(true)}>
                <img src={invoiceIcon} alt="" className="amenity-confirm__row-icon" />
                <span className="amenity-confirm__row-text">Reservation Fee Receipt</span>
                {reservation.notes?.some(n => n.type === 'fee') && (
                  <span className="amenity-confirm__row-alert">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="7.5" stroke="var(--lime)" strokeWidth="1.2" fill="rgba(178,222,97,0.12)" />
                      <rect x="7.25" y="4" width="1.5" height="5" rx="0.75" fill="var(--lime)" />
                      <rect x="7.25" y="10.5" width="1.5" height="1.5" rx="0.75" fill="var(--lime)" />
                    </svg>
                  </span>
                )}
                <svg width="7" height="13" viewBox="0 0 7 13" fill="none" className="amenity-confirm__row-chevron">
                  <path d="M1 1l5 5.5L1 12" stroke="#fff8ea" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                </svg>
              </button>
            )}
            {hasDeposit && (
              <button className="amenity-confirm__row-card" onClick={() => setShowDepositDetail(true)}>
                <img src={depositIcon} alt="" className="amenity-confirm__row-icon" />
                <span className="amenity-confirm__row-text">Security Deposit Hold</span>
                {reservation.notes?.some(n => n.type === 'deposit') && (
                  <span className="amenity-confirm__row-alert">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="7.5" stroke="#F5C842" strokeWidth="1.2" fill="rgba(245,200,66,0.12)" />
                      <rect x="7.25" y="4" width="1.5" height="5" rx="0.75" fill="#F5C842" />
                      <rect x="7.25" y="10.5" width="1.5" height="1.5" rx="0.75" fill="#F5C842" />
                    </svg>
                  </span>
                )}
                <svg width="7" height="13" viewBox="0 0 7 13" fill="none" className="amenity-confirm__row-chevron">
                  <path d="M1 1l5 5.5L1 12" stroke="#fff8ea" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                </svg>
              </button>
            )}

            {amenity && (
              <div className="amenity-confirm__contact-card">
                <div className="amenity-confirm__contact-row">
                  <ResLocationIcon />
                  <span className="amenity-confirm__contact-text">{amenity.address}</span>
                </div>
                <div className="amenity-confirm__divider" />
                <div className="amenity-confirm__contact-row">
                  <img src={phoneIcon} alt="" className="amenity-confirm__contact-icon" />
                  <span className="amenity-confirm__contact-text">{amenity.phone}</span>
                </div>
                <div className="amenity-confirm__divider" />
                <div className="amenity-confirm__contact-row">
                  <img src={attachmentIcon} alt="" className="amenity-confirm__contact-icon" />
                  <span className="amenity-confirm__contact-text">{amenity.rules}</span>
                </div>
              </div>
            )}

            {!reservation.status && <button className="amenity-confirm__cancel-btn">CANCEL RESERVATION</button>}
          </div>
        </div>
      </div>

      {showNotes && (
        <FeeScreen
          img={reservation.img} icon={noteIcon} title="Reservation Notes"
          onBack={() => setShowNotes(false)} hideSep
          footer={
            <div className="res-notes__list">
              {[...reservation.notes].map((note, i) => (
                <div key={note.id} className="res-note-item">
                  <div className={`res-note-card${note.isApproval ? ' res-note-card--approval' : ''}`}>
                    {note.author && (
                      <div className="res-note-card__header">
                        <div className="res-note-card__avatar-wrap">
                          <img src={note.author.avatar} alt={note.author.name} className="res-note-card__avatar" />
                        </div>
                        <div className="res-note-card__meta">
                          <span className="res-note-card__author-name">{note.author.name}</span>
                          <span className="res-note-card__time">{note.timestamp}</span>
                        </div>
                      </div>
                    )}
                    {note.isApproval && (
                      <div className="res-note-card__title">
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                          <circle cx="6.5" cy="6.5" r="6.5" fill="rgba(178,222,97,0.2)" />
                          <path d="M3.5 6.5l2 2 4-4" stroke="#B2DE61" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Reservation Approved</span>
                      </div>
                    )}
                    {note.type === 'fee' && (
                      <div className="res-note-card__title res-note-card__title--fee">
                        <img src={invoiceIcon} alt="" width="13" height="13" style={{ filter: 'brightness(0) saturate(100%) invert(82%) sepia(20%) saturate(700%) hue-rotate(47deg) brightness(104%) contrast(85%)' }} />
                        <span>{note.title}</span>
                      </div>
                    )}
                    {note.type === 'deposit' && (
                      <div className="res-note-card__title res-note-card__title--deposit">
                        <img src={depositIcon} alt="" width="13" height="13" style={{ filter: 'brightness(0) saturate(100%) invert(75%) sepia(60%) saturate(400%) hue-rotate(10deg) brightness(105%)' }} />
                        <span>{note.title}</span>
                      </div>
                    )}
                    <p className="res-note-card__text">{note.text}</p>
                  </div>
                </div>
              ))}
            </div>
          }
        >
          {null}
        </FeeScreen>
      )}

      {showFeeReceipt && (
        <FeeScreen
          img={reservation.img} icon={invoiceIcon} title="Booking Fee"
          onBack={() => setShowFeeReceipt(false)}
          footer={<button className="res-fee-screen__download-btn">DOWNLOAD RECEIPT</button>}
        >
          <div className="res-fee-screen__row">
            <span className="res-fee-screen__row-label">Amenity Fee</span>
            <span className="res-fee-screen__row-value">{fmt(amenityFee)}</span>
          </div>
          <div className="res-fee-screen__divider" />
          <div className="res-fee-screen__row">
            <div>
              <span className="res-fee-screen__row-label">Administrative Fee</span>
              <p className="res-fee-screen__row-sub">Credit Card 3.5%</p>
            </div>
            <span className="res-fee-screen__row-value">{fmt(txFee)}</span>
          </div>
          <div className="res-fee-screen__divider res-fee-screen__divider--strong" />
          <div className="res-fee-screen__total-row">
            <span className="res-fee-screen__total-label">Total</span>
            <span className="res-fee-screen__total-value">{fmt(totalDue)}</span>
          </div>
          {reservation.notes?.filter(n => n.type === 'fee').map(n => (
            <div key={n.id} className="res-fee-typed-note res-fee-typed-note--fee">
              <div className="res-fee-typed-note__header">
                <img src={invoiceIcon} alt="" width="13" height="13" style={{ filter: 'brightness(0) saturate(100%) invert(82%) sepia(20%) saturate(700%) hue-rotate(47deg) brightness(104%) contrast(85%)' }} />
                <span className="res-fee-typed-note__title">{n.title}</span>
              </div>
              <p className="res-fee-typed-note__text">{n.text}</p>
              <span className="res-fee-typed-note__time">{n.timestamp}</span>
            </div>
          ))}
        </FeeScreen>
      )}

      {showDepositDetail && (
        <FeeScreen
          img={reservation.img} icon={depositIcon} title="Security Deposit"
          onBack={() => setShowDepositDetail(false)}
          footer={<p className="res-fee-screen__deposit-note">Following your reservation, the condition of the amenity will be evaluated. Based on the results of this inspection, your security deposit may be released in full, partially charged, or charged in full.</p>}
        >
          <div className="res-fee-screen__row">
            <span className="res-fee-screen__row-label">Amenity Fee</span>
            <span className="res-fee-screen__row-value">{fmt(amenity.deposit)}</span>
          </div>
          <div className="res-fee-screen__divider" />
          <div className="res-fee-screen__row">
            <span className="res-fee-screen__row-label">Administrative Fee</span>
            <span className="res-fee-screen__row-value">{fmt(0)}</span>
          </div>
          <div className="res-fee-screen__divider res-fee-screen__divider--strong" />
          <div className="res-fee-screen__total-row">
            <span className="res-fee-screen__total-label">Total</span>
            <span className="res-fee-screen__total-value">{fmt(amenity.deposit)}</span>
          </div>
          {reservation.notes?.filter(n => n.type === 'deposit').map(n => (
            <div key={n.id} className="res-fee-typed-note res-fee-typed-note--deposit">
              <div className="res-fee-typed-note__header">
                <img src={depositIcon} alt="" width="13" height="13" style={{ filter: 'brightness(0) saturate(100%) invert(75%) sepia(60%) saturate(400%) hue-rotate(10deg) brightness(105%)' }} />
                <span className="res-fee-typed-note__title">{n.title}</span>
              </div>
              <p className="res-fee-typed-note__text">{n.text}</p>
              <span className="res-fee-typed-note__time">{n.timestamp}</span>
            </div>
          ))}
        </FeeScreen>
      )}
    </div>
  )
}

function ReservationCard({ reservation, past, onTap }) {
  return (
    <div
      className={`my-res__card${past ? ' my-res__card--past' : ''}`}
      onClick={onTap}
      style={onTap ? { cursor: 'pointer' } : undefined}
    >
      <img src={reservation.img} alt={reservation.amenityName} className="my-res__card-img" />
      <div className="my-res__card-gradient" />
      <div className="my-res__card-info">
        <p className="my-res__card-name">{reservation.amenityName}</p>
        <p className="my-res__card-details">
          {reservation.date}&nbsp;&nbsp;{reservation.startTime} – {reservation.endTime}<br />
          Guests: {reservation.guests}
        </p>
      </div>
    </div>
  )
}

export default function ResidentAmenities() {
  const { pushResidentView, setResidentViewStack, residentViewStack } = useMode()
  const [search, setSearch] = useState('')
  const initialTab = residentViewStack[0]?.data?.tab ?? 'reserve'
  const [activeTab, setActiveTab] = useState(initialTab)
  useEffect(() => {
    const t = residentViewStack[0]?.data?.tab
    if (t) setActiveTab(t)
  }, [residentViewStack[0]?.data?.tab])
  const [selectedReservation, setSelectedReservation] = useState(null)

  const filtered = AMENITIES_DATA.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase())
  )

  const upcomingRes = MY_RESERVATIONS_DATA.filter(r =>
    r.status === 'upcoming' && r.amenityName.toLowerCase().includes(search.toLowerCase())
  )
  const pastRes = MY_RESERVATIONS_DATA.filter(r =>
    (r.status === 'past' || r.status === 'completed' || r.status === 'cancelled') && r.amenityName.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="screen resident-amenities">
      <h1 className="resident-amenities__title">
        {activeTab === 'my-reservations' ? 'My Reservations' : 'Amenities & Common Areas'}
      </h1>

      <div className="amenities-tab-nav">
        <button
          className={`amenities-tab${activeTab === 'reserve' ? ' amenities-tab--active' : ''}`}
          onClick={() => setActiveTab('reserve')}
        >Reserve</button>
        <button
          className={`amenities-tab${activeTab === 'my-reservations' ? ' amenities-tab--active' : ''}`}
          onClick={() => setActiveTab('my-reservations')}
        >My Reservations</button>
      </div>

      <div className="amenities-search">
        <input
          className="amenities-search__input"
          placeholder="Search Amenity or Common Area"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <span className="amenities-search__icon"><SearchIcon /></span>
      </div>

      {activeTab === 'reserve' && (
        <div className="amenities-list">
          {filtered.map(amenity => (
            <AmenityCard
              key={amenity.id}
              amenity={amenity}
              onTap={(a, extra) => pushResidentView('amenity-detail', extra ? { ...a, ...extra } : a)}
            />
          ))}
        </div>
      )}

      {activeTab === 'my-reservations' && (
        <div className="my-res">
          <p className="my-res__section-label">UPCOMING RESERVATIONS</p>
          <div className="my-res__list">
            {upcomingRes.length === 0
              ? <p className="my-res__empty">No upcoming reservations.</p>
              : upcomingRes.map(r => (
                  <ReservationCard key={r.id} reservation={r} onTap={() => setSelectedReservation(r)} />
                ))
            }
          </div>
          <p className="my-res__section-label">PAST RESERVATIONS</p>
          <div className="my-res__list">
            {pastRes.length === 0
              ? <p className="my-res__empty">No past reservations.</p>
              : pastRes.map(r => (
                <div key={r.id} className="my-res__card-outer" onClick={() => setSelectedReservation(r)} style={{ cursor: 'pointer' }}>
                  <ReservationCard reservation={r} past />
                  {(r.status === 'completed' || r.status === 'cancelled') && (
                    <div className={`my-res__status-badge my-res__status-badge--${r.status}`}>
                      {r.status === 'completed' ? 'Completed' : 'Cancelled'}
                    </div>
                  )}
                </div>
              ))
            }
          </div>
          <button className="all-past-res-btn" onClick={() => setResidentViewStack(prev => {
  const updated = prev.map(v => v.screen === 'amenities' ? { ...v, data: { ...(v.data || {}), tab: 'my-reservations' } } : v)
  return [...updated, { screen: 'all-past-reservations', data: null }]
})}>
            ALL PAST RESERVATIONS
          </button>
        </div>
      )}

      {selectedReservation && createPortal(
        <ReservationDetailSheet
          reservation={selectedReservation}
          amenity={AMENITIES_DATA.find(a => a.id === selectedReservation.amenityId)}
          onClose={() => setSelectedReservation(null)}
        />,
        document.querySelector('.phone-frame') || document.body
      )}
    </div>
  )
}

const ALL_PAST = MY_RESERVATIONS_DATA.filter(r =>
  r.status === 'completed' || r.status === 'cancelled' || r.status === 'past'
).sort((a, b) => new Date(b.date) - new Date(a.date))

const AMENITY_OPTIONS = [...new Set(ALL_PAST.map(r => r.amenityName))]

const TIMEFRAME_OPTIONS = [
  { label: 'All Time', months: null },
  { label: 'Last Month', months: 1 },
  { label: 'Last 3 Months', months: 3 },
  { label: 'Last 6 Months', months: 6 },
  { label: 'This Year', months: 12 },
]

export function AllPastReservations() {
  const { popResidentView } = useMode()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [amenityFilter, setAmenityFilter] = useState('all')
  const [timeFilter, setTimeFilter] = useState(null)
  const [showAmenityDrop, setShowAmenityDrop] = useState(false)
  const [showTimeDrop, setShowTimeDrop] = useState(false)
  const [selectedReservation, setSelectedReservation] = useState(null)

  const filtered = ALL_PAST.filter(r => {
    if (search && !r.amenityName.toLowerCase().includes(search.toLowerCase())) return false
    if (statusFilter !== 'all' && r.status !== statusFilter) return false
    if (amenityFilter !== 'all' && r.amenityName !== amenityFilter) return false
    if (timeFilter) {
      const cutoff = new Date()
      cutoff.setMonth(cutoff.getMonth() - timeFilter)
      if (new Date(r.date) < cutoff) return false
    }
    return true
  })

  return (
    <div className="all-past-res">
      <div className="all-past-res__header">
        <h1 className="all-past-res__title">Past Reservations</h1>
      </div>

      <div className="all-past-res__search-wrap">
        <input
          className="all-past-res__search"
          placeholder="Search amenity..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <svg className="all-past-res__search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </div>

      <div className="all-past-res__filters">
        <div className="all-past-res__status-chips">
          {['all','completed','cancelled'].map(s => (
            <button
              key={s}
              className={`all-past-res__chip${statusFilter === s ? ' all-past-res__chip--active all-past-res__chip--' + s : ''}`}
              onClick={() => setStatusFilter(s)}
            >
              {s === 'all' ? 'All' : s === 'completed' ? 'Completed' : 'Cancelled'}
            </button>
          ))}
        </div>
        <div className="all-past-res__dropdowns">
          <div className="all-past-res__drop-wrap">
            <button className="all-past-res__drop-btn" onClick={() => { setShowAmenityDrop(v => !v); setShowTimeDrop(false) }}>
              {amenityFilter === 'all' ? 'Amenity' : amenityFilter}
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
            </button>
            {showAmenityDrop && (
              <div className="all-past-res__drop-menu">
                <button className={`all-past-res__drop-item${amenityFilter === 'all' ? ' active' : ''}`} onClick={() => { setAmenityFilter('all'); setShowAmenityDrop(false) }}>All Amenities</button>
                {AMENITY_OPTIONS.map(a => (
                  <button key={a} className={`all-past-res__drop-item${amenityFilter === a ? ' active' : ''}`} onClick={() => { setAmenityFilter(a); setShowAmenityDrop(false) }}>{a}</button>
                ))}
              </div>
            )}
          </div>
          <div className="all-past-res__drop-wrap">
            <button className="all-past-res__drop-btn" onClick={() => { setShowTimeDrop(v => !v); setShowAmenityDrop(false) }}>
              {TIMEFRAME_OPTIONS.find(t => t.months === timeFilter)?.label || 'Time Frame'}
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
            </button>
            {showTimeDrop && (
              <div className="all-past-res__drop-menu">
                {TIMEFRAME_OPTIONS.map(t => (
                  <button key={t.label} className={`all-past-res__drop-item${timeFilter === t.months ? ' active' : ''}`} onClick={() => { setTimeFilter(t.months); setShowTimeDrop(false) }}>{t.label}</button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="all-past-res__list" onClick={() => { setShowAmenityDrop(false); setShowTimeDrop(false) }}>
        {filtered.length === 0
          ? <p className="my-res__empty">No reservations match your filters.</p>
          : filtered.map(r => (
            <div key={r.id} className="my-res__card-outer" onClick={() => setSelectedReservation(r)}>
              <ReservationCard reservation={r} past />
              {(r.status === 'completed' || r.status === 'cancelled') && (
                <div className={`my-res__status-badge my-res__status-badge--${r.status}`}>
                  {r.status === 'completed' ? 'Completed' : 'Cancelled'}
                </div>
              )}
            </div>
          ))
        }
      </div>

      {selectedReservation && createPortal(
        <ReservationDetailSheet
          reservation={selectedReservation}
          amenity={AMENITIES_DATA.find(a => a.id === selectedReservation.amenityId)}
          onClose={() => setSelectedReservation(null)}
        />,
        document.querySelector('.phone-frame') || document.body
      )}
    </div>
  )
}
