/* ============================================
   CINC Connect Demo — Calendar Data
   Shared events array used by calendar.html and event.html.
   ============================================ */

(function () {
  'use strict';

  // Events for the demo. Dates are ISO strings (YYYY-MM-DD).
  const EVENTS = [

    // ── February 2026 ──────────────────────────────
    {
      id: 'board-meeting-feb',
      title: 'Board Meeting',
      startDate: '2026-02-12',
      endDate: '2026-02-12',
      startTime: '7:00 PM',
      endTime: '9:00 PM',
      description: 'Monthly Board of Directors meeting. Topics include budget approval, new amenity proposals, and committee reports. Open to all homeowners.'
    },

    // ── May 2026 ───────────────────────────────────
    {
      id: 'pool-opening',
      title: 'Pool Season Opening',
      startDate: '2026-05-02',
      endDate: '2026-05-02',
      startTime: '10:00 AM',
      endTime: '12:00 PM',
      description: 'Welcome the summer season! Join us at the community pool for the official pool opening. Light refreshments provided. All residents and guests welcome.'
    },
    {
      id: 'landscaping-committee',
      title: 'Landscaping Committee Meeting',
      startDate: '2026-05-14',
      endDate: '2026-05-14',
      startTime: '6:30 PM',
      endTime: '8:00 PM',
      description: 'Landscaping Committee meeting to review proposals for the summer planting schedule and common area beautification projects. Homeowner input welcome.'
    },
    {
      id: 'board-meeting-may',
      title: 'Board Meeting',
      startDate: '2026-05-28',
      endDate: '2026-05-28',
      startTime: '7:00 PM',
      endTime: '9:00 PM',
      description: 'Monthly Board of Directors meeting. Agenda includes pool season update, reserve fund review, and upcoming summer events. Open to all homeowners.'
    },

    // ── June 2026 ──────────────────────────────────
    {
      id: 'cai-national',
      title: 'CAI National',
      startDate: '2026-06-03',
      endDate: '2026-06-05',
      startTime: '8:00 AM',
      endTime: '6:00 PM',
      description: 'CINC at CAI National at The Diplomat Beach Resort, Hollywood, Florida. Three-day conference celebrating community association management with our Mi Casa, Su Casa welcome experience.'
    },
    {
      id: 'community-cleanup',
      title: 'Community Clean-Up Day',
      startDate: '2026-06-13',
      endDate: '2026-06-13',
      startTime: '8:00 AM',
      endTime: '12:00 PM',
      description: 'Grab your gloves and join your neighbors for our semi-annual Community Clean-Up Day. Supplies provided. Volunteers who complete 2+ hours receive a guest pool pass.'
    },
    {
      id: 'summer-social',
      title: 'Summer Social & BBQ',
      startDate: '2026-06-20',
      endDate: '2026-06-20',
      startTime: '5:00 PM',
      endTime: '9:00 PM',
      description: 'Annual summer kick-off celebration at the community pavilion. BBQ, lawn games, live music, and a raffle. Bring the whole family! RSVP through the app.'
    },
    {
      id: 'board-meeting-jun',
      title: 'Board Meeting',
      startDate: '2026-06-25',
      endDate: '2026-06-25',
      startTime: '7:00 PM',
      endTime: '9:00 PM',
      description: 'Monthly Board of Directors meeting. Topics include summer event recap, maintenance schedule review, and ACC request updates. Open to all homeowners.'
    },

    // ── July 2026 ──────────────────────────────────
    {
      id: 'arc-meeting',
      title: 'Architectural Review Committee',
      startDate: '2026-07-09',
      endDate: '2026-07-09',
      startTime: '6:00 PM',
      endTime: '7:30 PM',
      description: 'Architectural Review Committee meeting to evaluate pending ACC requests and discuss guidelines for exterior modifications. Applicants with pending requests are encouraged to attend.'
    },
    {
      id: 'annual-pool-party',
      title: 'Annual Pool Party',
      startDate: '2026-07-18',
      endDate: '2026-07-18',
      startTime: '2:00 PM',
      endTime: '6:00 PM',
      description: 'The biggest pool event of the year! Enjoy games, snacks, and a swim competition for all ages. Prizes for winners. Guests are welcome with a resident host.'
    },
    {
      id: 'board-meeting-jul',
      title: 'Board Meeting',
      startDate: '2026-07-23',
      endDate: '2026-07-23',
      startTime: '7:00 PM',
      endTime: '9:00 PM',
      description: 'Monthly Board of Directors meeting. Agenda includes mid-year financial review, Q3 maintenance priorities, and early budget planning discussion. Open to all homeowners.'
    },
    {
      id: 'budget-workshop',
      title: 'Budget Planning Workshop',
      startDate: '2026-07-30',
      endDate: '2026-07-30',
      startTime: '6:00 PM',
      endTime: '8:00 PM',
      description: 'Annual budget planning workshop open to all homeowners. Finance Committee will present a preliminary 2027 budget draft and collect community input before the formal approval process.'
    }

  ];

  // US Federal Holidays — used to mark days with red circle.
  const US_HOLIDAYS = {
    '2024': ['01-01', '01-15', '02-19', '05-27', '06-19', '07-04', '09-02', '10-14', '11-11', '11-28', '12-25'],
    '2025': ['01-01', '01-20', '02-17', '05-26', '06-19', '07-04', '09-01', '10-13', '11-11', '11-27', '12-25'],
    '2026': ['01-01', '01-19', '02-16', '05-25', '06-19', '07-03', '09-07', '10-12', '11-11', '11-26', '12-25']
  };

  // ----- Helpers -----
  function formatDateLong(d) {
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    return days[d.getDay()] + ' ' + months[d.getMonth()] + ' ' + d.getDate();
  }

  function formatRange(startISO, endISO, startTime, endTime) {
    const fmt = (iso) => {
      const [y, m, d] = iso.split('-');
      return `${m}/${d}/${y}`;
    };
    return `${fmt(startISO)} ${startTime} - ${fmt(endISO)} ${endTime}`;
  }

  function isSameDay(a, b) {
    return a.getFullYear() === b.getFullYear() &&
           a.getMonth() === b.getMonth() &&
           a.getDate() === b.getDate();
  }

  function dateInRange(date, startISO, endISO) {
    const d = date.getTime();
    return d >= isoToDate(startISO).getTime() && d <= isoToDate(endISO).getTime();
  }

  function isoToDate(iso) {
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(y, m - 1, d);
  }

  function eventsOnDate(date) {
    return EVENTS.filter((e) => dateInRange(date, e.startDate, e.endDate));
  }

  function isHoliday(date) {
    const y = String(date.getFullYear());
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return (US_HOLIDAYS[y] || []).includes(`${m}-${d}`);
  }

  function findEventById(id) {
    return EVENTS.find((e) => e.id === id);
  }

  // Expose
  window.CalendarData = {
    EVENTS,
    US_HOLIDAYS,
    formatDateLong,
    formatRange,
    isSameDay,
    dateInRange,
    isoToDate,
    eventsOnDate,
    isHoliday,
    findEventById
  };
})();
