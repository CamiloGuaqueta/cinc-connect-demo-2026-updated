/* ============================================
   CINC Connect Demo — Calendar Data
   Shared events array used by calendar.html and event.html.
   ============================================ */

(function () {
  'use strict';

  // Events for the demo. Dates are ISO strings (YYYY-MM-DD).
  const EVENTS = [
    {
      id: 'board-meeting',
      title: 'Board Meeting',
      startDate: '2026-02-12',
      endDate: '2026-02-12',
      startTime: '7:00 PM',
      endTime: '9:00 PM',
      description: 'Monthly Board of Directors meeting. Topics include budget approval, new amenity proposals, and committee reports. Open to all homeowners.'
    },
    {
      id: 'cai-annual',
      title: 'CAI Annual',
      startDate: '2026-06-03',
      endDate: '2026-06-05',
      startTime: '8:00 AM',
      endTime: '6:00 PM',
      description: 'CINC at CAI Annual at The Diplomat Beach Resort, Hollywood, Florida. Three-day conference celebrating community association management with our Mi Casa, Su Casa welcome experience.'
    }
  ];

  // US Federal Holidays — used to mark days with red circle.
  // Add years as needed. Year string -> array of MM-DD strings.
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
    // Construct local date from YYYY-MM-DD without timezone shift
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
