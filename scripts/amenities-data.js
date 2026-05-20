/* ============================================
   CINC Connect Demo — Amenities Data
   Shared between amenities.html, amenity-detail.html,
   amenity-payment.html, reservation-confirm.html
   ============================================ */

(function () {
  'use strict';

  const DEFAULT_ADDRESS = '200 Palm Grove Lane, Weston, FL 33326';
  const DEFAULT_PHONE = '+1 (555) 256.256';
  const DEFAULT_HOURS = 'Mon – Fri: 9:00 AM – 9:00 PM\nSat – Sun: 10:00 AM – 10:00 PM';

  // Generic disclosure used by amenities that don't have a custom one
  const DEFAULT_RULES = `By reserving and using this amenity, I agree to follow all community rules and accept responsibility for the conduct of my guests during the reservation period. I understand that I am responsible for any damages, excessive cleaning, or violations associated with the event and that the amenity must be left clean and in good condition. I acknowledge that the association reserves the right to revoke amenity privileges for misuse or noncompliance with community policies.`;

  const DEFAULT_PDF_PARAGRAPHS = [
    'All residents must present their community ID card before accessing this amenity. Reservations are required and subject to availability.',
    'No outside food or beverages are permitted without prior written approval from the HOA management office. All guests must be accompanied by a registered resident at all times.',
    'The amenity must be left in the same condition it was found. Damage fees will be assessed and charged to the resident\'s account.',
    'Reservations may be cancelled up to 24 hours in advance without penalty. Late cancellations may forfeit the deposit.',
    'Maximum capacity and time limits must be strictly observed. The HOA reserves the right to terminate a reservation in the event of noise complaints or rule violations.'
  ];

  const AMENITIES = [
    {
      id: 'pickleball-court',
      name: 'Pickleball Court',
      image: 'assets/images/Pickleball1.jpg',
      address: DEFAULT_ADDRESS,
      phone: DEFAULT_PHONE,
      hours: DEFAULT_HOURS,
      pricePerHour: 0,
      deposit: 0,
      maxGuests: 4,
      maxHours: 2,
      slots: ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'],
      description: 'Outdoor pickleball court available for community members. Bring your own paddles or borrow from the concierge desk. Lights available for evening play.',
      rules: DEFAULT_RULES,
      pdfTitle: 'Pickleball-court-rules.pdf',
      pdfHeading: 'Pickleball Court',
      pdfParagraphs: DEFAULT_PDF_PARAGRAPHS
    },
    {
      id: 'media-room',
      name: 'Media Room',
      image: 'assets/images/MediaRoom.jpg',
      address: DEFAULT_ADDRESS,
      phone: DEFAULT_PHONE,
      hours: DEFAULT_HOURS,
      pricePerHour: 25,
      deposit: 50,
      maxGuests: 10,
      maxHours: 3,
      slots: ['3:00 PM', '6:00 PM', '9:00 PM'],
      description: 'Private theater-style media room with surround sound, 85" 4K display, and lounge seating for up to 10 guests. Perfect for movie nights, game days, or presentations.',
      rules: DEFAULT_RULES,
      pdfTitle: 'Media-room-rules.pdf',
      pdfHeading: 'Media Room',
      pdfParagraphs: DEFAULT_PDF_PARAGRAPHS
    },
    {
      id: 'pool-spa',
      name: 'Pool & Spa',
      image: 'assets/images/Pool-Spa.jpg',
      address: DEFAULT_ADDRESS,
      phone: DEFAULT_PHONE,
      hours: DEFAULT_HOURS,
      pricePerHour: 0,
      deposit: 0,
      maxGuests: 8,
      maxHours: 3,
      slots: ['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM'],
      description: 'Resort-style pool and heated spa with lounge chairs, umbrellas, and tropical landscaping. Pool deck available for casual use. Reservations required for large groups.',
      rules: DEFAULT_RULES,
      pdfTitle: 'Pool-spa-rules.pdf',
      pdfHeading: 'Pool & Spa',
      pdfParagraphs: DEFAULT_PDF_PARAGRAPHS
    },
    {
      id: 'tennis-court',
      name: 'Tennis Court',
      image: 'assets/images/Tennis-court.jpg',
      address: DEFAULT_ADDRESS,
      phone: DEFAULT_PHONE,
      hours: DEFAULT_HOURS,
      pricePerHour: 0,
      deposit: 0,
      maxGuests: 4,
      maxHours: 2,
      slots: ['9:00 AM', '10:00 AM', '11:00 AM', '4:00 PM', '6:00 PM'],
      description: 'Full-size tennis court with night lighting. Court conditioning is performed weekly. Please clean your shoes before entering.',
      rules: DEFAULT_RULES,
      pdfTitle: 'Tennis-court-rules.pdf',
      pdfHeading: 'Tennis Court',
      pdfParagraphs: DEFAULT_PDF_PARAGRAPHS
    },
    {
      id: 'clubhouse',
      name: 'Club House',
      image: 'assets/images/ClubHouse-2.png',
      address: DEFAULT_ADDRESS,
      phone: DEFAULT_PHONE,
      hours: DEFAULT_HOURS,
      pricePerHour: 150,
      flatFee: true,
      deposit: 200,
      maxGuests: 20,
      maxHours: 5,
      slots: ['10:00 AM', '1:00 PM', '5:00 PM', '7:00 PM'],
      description: 'The Magic Views Clubhouse is a welcoming community space available for private parties, celebrations, meetings, and special events. Includes a full kitchen, dining area, and lounge space with setup and cleanup.',
      rules: `By reserving and using the clubhouse, I agree to follow all community rules and accept responsibility for the conduct of my guests during the reservation period. I understand that I am responsible for any damages, excessive cleaning, or violations associated with the event and that the clubhouse must be left clean and in good condition. I acknowledge that the association reserves the right to revoke clubhouse privileges for misuse or noncompliance with community policies.`,
      pdfTitle: 'Clubhouse-rules-regulations.pdf',
      pdfHeading: 'Club House',
      pdfParagraphs: DEFAULT_PDF_PARAGRAPHS
    },
    {
      id: 'fitness-center',
      name: 'Fitness Center',
      image: 'assets/images/Fitness-Center.jpg',
      address: DEFAULT_ADDRESS,
      phone: DEFAULT_PHONE,
      hours: '24 / 7 access with key fob',
      pricePerHour: 0,
      deposit: 0,
      maxGuests: 1,
      maxHours: 2,
      slots: ['5:00 AM', '7:00 AM', '9:00 AM', '5:00 PM', '7:00 PM'],
      description: 'Fully equipped fitness center with cardio machines, free weights, and a stretching area. Open 24/7 with key fob access. Reservations help us avoid overcrowding.',
      rules: DEFAULT_RULES,
      pdfTitle: 'Fitness-center-rules.pdf',
      pdfHeading: 'Fitness Center',
      pdfParagraphs: DEFAULT_PDF_PARAGRAPHS
    },
    {
      id: 'bbq-pavilion',
      name: 'BBQ Pavilion',
      image: 'assets/images/BBQ-2.png',
      address: DEFAULT_ADDRESS,
      phone: DEFAULT_PHONE,
      hours: DEFAULT_HOURS,
      pricePerHour: 35,
      deposit: 75,
      maxGuests: 20,
      maxHours: 4,
      slots: ['12:00 PM', '3:00 PM', '6:00 PM'],
      description: 'Covered outdoor pavilion with two gas grills, prep counters, picnic tables, and string lights. Great for cookouts and weekend gatherings.',
      rules: DEFAULT_RULES,
      pdfTitle: 'BBQ-pavilion-rules.pdf',
      pdfHeading: 'BBQ Pavilion',
      pdfParagraphs: DEFAULT_PDF_PARAGRAPHS
    },
    {
      id: 'game-room',
      name: 'Game Room',
      image: 'assets/images/Game Room.png',
      address: DEFAULT_ADDRESS,
      phone: DEFAULT_PHONE,
      hours: DEFAULT_HOURS,
      pricePerHour: 20,
      deposit: 0,
      maxGuests: 8,
      maxHours: 3,
      slots: ['2:00 PM', '4:00 PM', '6:00 PM', '8:00 PM'],
      description: 'Indoor game room with pool table, ping pong, foosball, dartboard, and board games. Perfect for friendly tournaments and game nights with neighbors.',
      rules: DEFAULT_RULES,
      pdfTitle: 'Game-room-rules.pdf',
      pdfHeading: 'Game Room',
      pdfParagraphs: DEFAULT_PDF_PARAGRAPHS
    },
    {
      id: 'pickleball-court-2',
      name: 'Pickleball Court 2',
      image: 'assets/images/Pickleball2.jpg',
      address: DEFAULT_ADDRESS,
      phone: DEFAULT_PHONE,
      hours: DEFAULT_HOURS,
      pricePerHour: 0,
      deposit: 0,
      maxGuests: 4,
      maxHours: 2,
      slots: ['8:00 AM', '10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM'],
      description: 'Second outdoor pickleball court on the north side of the community. Includes shade structure and bench seating for spectators. Bring your own paddles or borrow from the concierge desk.',
      rules: DEFAULT_RULES,
      pdfTitle: 'Pickleball-court-2-rules.pdf',
      pdfHeading: 'Pickleball Court 2',
      pdfParagraphs: DEFAULT_PDF_PARAGRAPHS
    },
    {
      id: 'dog-park',
      name: 'Dog Park',
      image: 'assets/images/Dog-park-3.webp',
      address: DEFAULT_ADDRESS,
      phone: DEFAULT_PHONE,
      hours: 'Daily: 6:00 AM – 10:00 PM',
      pricePerHour: 0,
      deposit: 0,
      maxGuests: 3,
      maxHours: 1,
      slots: ['7:00 AM', '9:00 AM', '11:00 AM', '3:00 PM', '5:00 PM', '7:00 PM'],
      description: 'Fenced off-leash dog park with separate areas for small and large dogs. Includes water stations, agility equipment, and waste bag dispensers. Please clean up after your pet.',
      rules: DEFAULT_RULES,
      pdfTitle: 'Dog-park-rules.pdf',
      pdfHeading: 'Dog Park',
      pdfParagraphs: DEFAULT_PDF_PARAGRAPHS
    }
  ];

  // Section groupings — used by both the home carousels and the View All pages
  const SECTIONS = {
    favorite: ['pickleball-court', 'media-room', 'tennis-court'],
    recent:   ['pool-spa', 'bbq-pavilion'],
    popular:  ['clubhouse', 'pickleball-court-2', 'dog-park', 'fitness-center', 'game-room']
  };

  const SECTION_LABELS = {
    favorite: 'My Favorite',
    recent:   'Recently Reserved',
    popular:  'Popular Amenities'
  };

  function findById(id) {
    return AMENITIES.find((a) => a.id === id);
  }

  function getSection(key) {
    const ids = SECTIONS[key] || [];
    return ids.map(findById).filter(Boolean);
  }

  function priceLabel(a) {
    if (!a) return '';
    if (a.pricePerHour === 0) return 'Free';
    return a.flatFee ? `$${a.pricePerHour}` : `$${a.pricePerHour}/hr`;
  }

  function isPaid(a) {
    return a && a.pricePerHour > 0;
  }

  window.AmenitiesData = {
    AMENITIES, SECTIONS, SECTION_LABELS,
    findById, getSection, priceLabel, isPaid
  };
})();
