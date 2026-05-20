/* ============================================
   CINC Connect Demo — Calendar Page Logic
   Handles List / Month / Year views.
   ============================================ */

(function () {
  'use strict';
  if (!document.querySelector('.calendar')) return; // only run on calendar page

  const D = window.CalendarData;

  // ----- State -----
  const state = {
    view: 'list',
    monthCursor: new Date(2026, 4, 1), // start at May 2026 (today's month)
    yearCursor: 2026,
    selectedDate: new Date()
  };

  // ----- Tabs -----
  const tabs = document.querySelectorAll('[data-view]');
  const panes = document.querySelectorAll('[data-view-pane]');
  const listOnlyEls = document.querySelectorAll('[data-list-only]');

  function setView(v) {
    state.view = v;
    tabs.forEach((t) => t.classList.toggle('cal-tabs__item--active', t.getAttribute('data-view') === v));
    panes.forEach((p) => { p.hidden = p.getAttribute('data-view-pane') !== v; });
    listOnlyEls.forEach((el) => { el.style.visibility = (v === 'list') ? '' : 'hidden'; });
    if (v === 'list') renderListAll();
    if (v === 'month') renderMonth();
    if (v === 'year') renderYear();
  }
  tabs.forEach((t) => t.addEventListener('click', () => setView(t.getAttribute('data-view'))));

  // ----- LIST VIEW -----
  const searchInput = document.querySelector('[data-calendar-search]');
  const listEmpty   = document.querySelector('[data-list-empty]');
  const listResults = document.querySelector('[data-list-results]');

  function renderListAll(filter) {
    filter = (filter || '').trim().toLowerCase();

    // Sort all events by start date
    let sorted = D.EVENTS.slice().sort((a, b) =>
      a.startDate < b.startDate ? -1 : a.startDate > b.startDate ? 1 : 0
    );

    // Apply search filter if present
    if (filter) {
      sorted = sorted.filter((e) =>
        e.title.toLowerCase().includes(filter) ||
        e.description.toLowerCase().includes(filter)
      );
    }

    if (!sorted.length) {
      listEmpty.hidden = false;
      listResults.hidden = true;
      listResults.innerHTML = '';
      return;
    }

    // Group events by start date
    const groups = {};
    const dateOrder = [];
    sorted.forEach((e) => {
      if (!groups[e.startDate]) {
        groups[e.startDate] = [];
        dateOrder.push(e.startDate);
      }
      groups[e.startDate].push(e);
    });

    // Build HTML — one section per date
    let html = '';
    dateOrder.forEach((dateISO) => {
      const d = D.isoToDate(dateISO);
      html += `<div class="cal-list-group">`;
      html += `<h3 class="cal-month__selected-title">${D.formatDateLong(d)}</h3>`;
      html += `<ul class="cal-month__events">`;
      groups[dateISO].forEach((e) => {
        const personalClass = e.category === 'personal' ? ' cal-month__event--personal' : '';
        html += `<li>
          <a class="cal-month__event${personalClass}" href="event.html?id=${encodeURIComponent(e.id)}">
            <div class="cal-month__event-time">
              <span>${escapeHtml(e.startTime)}</span>
              <span>${escapeHtml(e.endTime)}</span>
            </div>
            <div class="cal-month__event-bar" aria-hidden="true"></div>
            <div class="cal-month__event-body">
              <div class="cal-month__event-title">${escapeHtml(e.title)}</div>
              ${e.category === 'personal' ? '<div class="cal-month__event-tag">Personal</div>' : ''}
              <div class="cal-month__event-desc">${escapeHtml(e.description.substring(0, 90))}…</div>
            </div>
          </a>
        </li>`;
      });
      html += `</ul></div>`;
    });

    listResults.innerHTML = html;
    listEmpty.hidden = true;
    listResults.hidden = false;
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => renderListAll(e.target.value));
  }

  // ----- MONTH VIEW -----
  const monthGrid     = document.querySelector('[data-month-grid]');
  const monthTitle    = document.querySelector('[data-month-title]');
  const selectedTitle  = document.querySelector('[data-selected-day-title]');
  const selectedEvents = document.querySelector('[data-selected-day-events]');

  function renderMonth() {
    const cur = state.monthCursor;
    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    monthTitle.textContent = `${monthNames[cur.getMonth()]} ${cur.getFullYear()}`;

    const today = new Date();
    const sel = state.selectedDate;
    const firstOfMonth = new Date(cur.getFullYear(), cur.getMonth(), 1);
    const lastOfMonth  = new Date(cur.getFullYear(), cur.getMonth() + 1, 0);
    const startWeekday = firstOfMonth.getDay();
    const totalDays    = lastOfMonth.getDate();

    const cells = [];
    for (let i = 0; i < startWeekday; i++) cells.push('<span class="cal-day cal-day--empty"></span>');

    for (let day = 1; day <= totalDays; day++) {
      const d = new Date(cur.getFullYear(), cur.getMonth(), day);
      const classes = ['cal-day'];
      if (D.isSameDay(d, sel)) classes.push('cal-day--selected');
      const events = D.eventsOnDate(d);
      if (events.length) classes.push('cal-day--has-event');

      cells.push(`<button type="button" class="${classes.join(' ')}" data-day="${day}">
        <span class="cal-day__num">${day}</span>
        ${events.length ? '<span class="cal-day__dot" aria-hidden="true"></span>' : ''}
      </button>`);
    }

    monthGrid.innerHTML = cells.join('');

    monthGrid.querySelectorAll('[data-day]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const day = Number(btn.getAttribute('data-day'));
        state.selectedDate = new Date(cur.getFullYear(), cur.getMonth(), day);
        renderMonth();
        renderSelectedDayInfo();
      });
    });

    renderSelectedDayInfo();
  }

  function renderSelectedDayInfo() {
    selectedTitle.textContent = D.formatDateLong(state.selectedDate);
    const events = D.eventsOnDate(state.selectedDate);
    if (!events.length) {
      selectedEvents.innerHTML = '<li class="cal-month__no-events">No events on this date</li>';
      return;
    }
    selectedEvents.innerHTML = events.map((e) => {
      const personalClass = e.category === 'personal' ? ' cal-month__event--personal' : '';
      return `<li>
        <a class="cal-month__event${personalClass}" href="event.html?id=${encodeURIComponent(e.id)}">
          <div class="cal-month__event-time">
            <span>${e.startTime}</span>
            <span>${e.endTime}</span>
          </div>
          <div class="cal-month__event-bar" aria-hidden="true"></div>
          <div class="cal-month__event-body">
            <div class="cal-month__event-title">${escapeHtml(e.title)}</div>
            ${e.category === 'personal' ? '<div class="cal-month__event-tag">Personal</div>' : ''}
            <div class="cal-month__event-meta">Ending date: ${formatShort(e.endDate)}</div>
            <div class="cal-month__event-desc">${escapeHtml(e.description.substring(0, 80))}…</div>
          </div>
        </a>
      </li>`;
    }).join('');
  }

  document.querySelector('[data-month-prev]')?.addEventListener('click', () => {
    state.monthCursor = new Date(state.monthCursor.getFullYear(), state.monthCursor.getMonth() - 1, 1);
    renderMonth();
  });
  document.querySelector('[data-month-next]')?.addEventListener('click', () => {
    state.monthCursor = new Date(state.monthCursor.getFullYear(), state.monthCursor.getMonth() + 1, 1);
    renderMonth();
  });

  // ----- YEAR VIEW -----
  const yearGrid      = document.querySelector('[data-year-grid]');
  const yearLabel     = document.querySelector('[data-year-label]');
  const yearSelectBtn = document.querySelector('[data-year-select]');
  const yearPicker    = document.querySelector('[data-year-picker]');

  function renderYear() {
    yearLabel.textContent = state.yearCursor;
    const monthShortNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const sel = state.selectedDate;

    const blocks = [];
    for (let m = 0; m < 12; m++) {
      const firstOfMonth = new Date(state.yearCursor, m, 1);
      const lastOfMonth  = new Date(state.yearCursor, m + 1, 0);
      const startWeekday = firstOfMonth.getDay();
      const totalDays    = lastOfMonth.getDate();
      const cells = [];
      for (let i = 0; i < startWeekday; i++) cells.push('<span class="cal-yd cal-yd--empty"></span>');
      for (let day = 1; day <= totalDays; day++) {
        const d = new Date(state.yearCursor, m, day);
        const classes = ['cal-yd'];
        if (D.isSameDay(d, sel)) classes.push('cal-yd--selected');
        const events = D.eventsOnDate(d);
        if (events.length) classes.push('cal-yd--has-event');
        cells.push(`<button type="button" class="${classes.join(' ')}" data-year-day="${state.yearCursor}-${m}-${day}">${day}</button>`);
      }
      blocks.push(`
        <div class="cal-year__month" data-year-month="${m}">
          <h4 class="cal-year__month-name">${monthShortNames[m]}</h4>
          <div class="cal-year__month-grid">${cells.join('')}</div>
        </div>`);
    }
    yearGrid.innerHTML = blocks.join('');

    yearGrid.querySelectorAll('[data-year-day]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const [y, m, day] = btn.getAttribute('data-year-day').split('-').map(Number);
        state.selectedDate = new Date(y, m, day);
        state.monthCursor  = new Date(y, m, 1);
        renderYear();
      });
    });

    yearGrid.querySelectorAll('.cal-year__month-name').forEach((h, m) => {
      h.style.cursor = 'pointer';
      h.addEventListener('click', () => {
        state.monthCursor = new Date(state.yearCursor, m, 1);
        setView('month');
      });
    });
  }

  function openYearPicker() {
    yearPicker.hidden = false;
    requestAnimationFrame(() => yearPicker.classList.add('is-open'));
  }
  function closeYearPicker() {
    yearPicker.classList.remove('is-open');
    setTimeout(() => { yearPicker.hidden = true; }, 200);
  }

  yearSelectBtn?.addEventListener('click', openYearPicker);
  document.querySelector('[data-year-picker-close]')?.addEventListener('click', closeYearPicker);
  yearPicker?.querySelectorAll('[data-year]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.yearCursor = Number(btn.getAttribute('data-year'));
      closeYearPicker();
      renderYear();
    });
  });
  yearPicker?.addEventListener('click', (e) => {
    if (e.target === yearPicker) closeYearPicker();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && yearPicker && !yearPicker.hidden) closeYearPicker();
  });

  // ----- Helpers -----
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }
  function formatShort(iso) {
    const [y, m, d] = iso.split('-');
    return `${m}/${d}/${y}`;
  }

  // Initial render
  setView('list');
})();
