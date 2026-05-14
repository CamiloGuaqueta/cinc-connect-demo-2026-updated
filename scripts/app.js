/* ============================================
   CINC Connect Demo — App Logic
   Navigation injection, interactions, local state.
   ============================================ */

(function () {
  'use strict';

  // ----- State (kept in localStorage for session persistence) -----
  const STORAGE_KEY = 'cinc-connect-demo:v1';

  const state = {
    user: null,           // { firstName, lastName, email }
    accessCode: null,
    likes: {},            // { postId: true/false }
    completedActivities: {},
  };

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) Object.assign(state, JSON.parse(saved));
    } catch (e) {
      console.warn('Could not load state', e);
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Could not save state', e);
    }
  }

  // ----- Bottom Navigation Component -----
  // Items match the order from Figma NAV 1
  const NAV_ITEMS = [
    { id: 'feed',      icon: 'assets/icons/nav-1-feed.svg',      label: 'Feed',         href: 'feed.html' },
    { id: 'todos',     icon: 'assets/icons/nav-2-todos.svg',     label: 'My To-Dos',    href: 'todos.html', badge: 3 },
    { id: 'concierge', icon: 'assets/icons/nav-3-concierge.svg', label: 'Concierge',    href: 'concierge.html' },
    { id: 'pinboard',  icon: 'assets/icons/nav-4-pinboard.svg',  label: 'Pinboard',     href: '#' },
    { id: 'financial', icon: 'assets/icons/nav-5-financial.svg', label: 'Financial',    href: '#' },
    { id: 'messages',  icon: 'assets/icons/nav-6-messages.svg',  label: 'Messages',     href: '#' },
    { id: 'menu',      icon: 'assets/icons/nav-7-menu.svg',      label: 'Menu',         href: '#' },
  ];

  function renderNavHTML(activeId) {
    return `<nav class="bottom-nav" aria-label="Main navigation">${
      NAV_ITEMS.map((item) => {
        const isActive = item.id === activeId;
        const cls = 'bottom-nav__item' + (isActive ? ' bottom-nav__item--active' : '');
        const badge = item.badge
          ? `<span class="bottom-nav__nav-badge">${item.badge}</span>`
          : '';
        return `
<a class="${cls}" href="${item.href}" aria-label="${item.label}">
  <span class="bottom-nav__icon-wrap">
    <img src="${item.icon}" alt="" />
    ${badge}
  </span>
  <span class="bottom-nav__label">${item.label}</span>
</a>`;
      }).join('')
    }</nav>`;
  }

  function injectNav() {
    document.querySelectorAll('[data-nav]').forEach((mount) => {
      const activeId = mount.getAttribute('data-active') || 'feed';
      // Use document.write equivalent via outerHTML so it renders before paint
      mount.outerHTML = renderNavHTML(activeId);
    });
  }

  // Inject nav synchronously during script load if mount points exist
  // (this script is loaded at end of body so DOM is ready)
  function injectNavEarly() {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    // Synchronous injection at script execution time
    injectNav();
  }
  injectNavEarly();


  // ----- Bottom sheet (modal) -----
  // Triggered by elements with [data-open-sheet="<id>"] and closed by
  // [data-close-sheet], clicking the overlay, or pressing Escape.
  function wireSheets() {
    const openers = document.querySelectorAll('[data-open-sheet]');
    if (!openers.length) return;

    function openSheet(id) {
      const overlay = document.getElementById(id);
      if (!overlay) return;
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeSheet(overlay) {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    openers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        openSheet(trigger.getAttribute('data-open-sheet'));
      });
    });

    // Click on backdrop or close button
    document.querySelectorAll('[data-sheet-overlay]').forEach((overlay) => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeSheet(overlay);
      });
      overlay.querySelectorAll('[data-close-sheet]').forEach((btn) => {
        btn.addEventListener('click', () => closeSheet(overlay));
      });
    });

    // Escape closes any open sheet
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      document.querySelectorAll('.sheet-overlay.is-open').forEach(closeSheet);
    });

    // Unit list selection — updates property selector + balance card and closes sheet
    document.querySelectorAll('.unit-list__item').forEach((item) => {
      item.addEventListener('click', () => {
        const list = item.closest('.unit-list');
        if (list) {
          list.querySelectorAll('.unit-list__item').forEach((i) =>
            i.classList.toggle('is-selected', i === item)
          );
        }

        const name = item.getAttribute('data-unit-name');
        const acct = item.getAttribute('data-unit-acct');
        const current = item.getAttribute('data-unit-current');
        const future = item.getAttribute('data-unit-future');

        // Update property selector label
        const propLabel = document.querySelector('[data-property-name]');
        if (propLabel && name) propLabel.textContent = name;

        // Update balance card values
        const acctEl = document.querySelector('[data-balance-acct]');
        if (acctEl && acct) acctEl.textContent = acct;
        const addressEl = document.querySelector('[data-balance-address]');
        if (addressEl && name) addressEl.textContent = name;
        const currentEl = document.querySelector('[data-balance-current]');
        if (currentEl && current) currentEl.textContent = current;
        const futureEl = document.querySelector('[data-balance-future]');
        if (futureEl && future) futureEl.textContent = future;

        const overlay = item.closest('.sheet-overlay');
        if (overlay) closeSheet(overlay);
      });
    });
  }

  // ----- Chat search filter -----
  // Filters chat items by name (and preview text) as the user types.
  function wireChatSearch() {
    const input = document.querySelector('.messages__search-input');
    if (!input) return;

    const list = document.querySelector('.chat-list');
    if (!list) return;

    const items = Array.from(list.querySelectorAll('.chat-item'));

    // Pre-cache searchable text for each item (lowercase)
    const itemsWithText = items.map((item) => {
      const name = item.querySelector('.chat-item__name')?.textContent || '';
      const preview = item.querySelector('.chat-item__preview')?.textContent || '';
      return {
        el: item,
        searchText: (name + ' ' + preview).toLowerCase(),
      };
    });

    // Empty state element (created lazily)
    let emptyState = null;
    function ensureEmptyState() {
      if (emptyState) return emptyState;
      emptyState = document.createElement('li');
      emptyState.className = 'chat-list__empty';
      emptyState.textContent = 'No chats match your search.';
      emptyState.hidden = true;
      list.appendChild(emptyState);
      return emptyState;
    }

    function applyFilter() {
      const q = input.value.trim().toLowerCase();
      let matchCount = 0;
      itemsWithText.forEach(({ el, searchText }) => {
        const matches = q === '' || searchText.includes(q);
        el.hidden = !matches;
        if (matches) matchCount++;
      });
      const empty = ensureEmptyState();
      empty.hidden = matchCount > 0;
    }

    input.addEventListener('input', applyFilter);
  }

  // ----- Tabs (My To-Dos) -----
  function wireTabs() {
    const tabs = document.querySelectorAll('[data-todos-tab]');
    if (!tabs.length) return;

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-todos-tab');
        tabs.forEach((t) => t.classList.toggle('todos__tab--active', t === tab));
        document.querySelectorAll('[data-todos-pane]').forEach((pane) => {
          pane.hidden = pane.getAttribute('data-todos-pane') !== target;
        });
      });
    });
  }

  // ----- Login form (placeholder) -----
  function wireLoginForm() {
    const loginForm = document.querySelector('[data-login-form]');
    if (!loginForm) return;
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // TODO: validate access code, save user, navigate to feed
      window.location.href = 'feed.html';
    });
  }

  // ----- Preloader for nav transitions -----
  // Shows a spinner overlay during nav clicks so transitions feel smooth.
  function ensurePreloader() {
    let pre = document.querySelector('.preloader');
    if (!pre) {
      pre = document.createElement('div');
      pre.className = 'preloader is-hidden';
      pre.setAttribute('aria-hidden', 'true');
      pre.innerHTML = '<div class="preloader__spinner"></div>';
      document.body.appendChild(pre);
    }
    return pre;
  }

  function showPreloader() {
    const pre = ensurePreloader();
    pre.classList.remove('is-hidden');
  }

  function hidePreloader() {
    const pre = document.querySelector('.preloader');
    if (pre) pre.classList.add('is-hidden');
  }

  function wirePreloaderOnNav() {
    // Preloader removed across pages — bottom-nav now navigates instantly without spinner.
    // Kept this stub so other callers of wirePreloaderOnNav() (if any) still resolve.
  }

  function showPreloaderOnLoad() {
    // Hide the preloader once the page has loaded. The preloader element
    // is pre-rendered in the HTML so it's visible from the very first paint.
    if (!document.querySelector('.preloader')) return;
    const reveal = () => setTimeout(hidePreloader, 220);
    if (document.readyState === 'complete') {
      reveal();
    } else {
      window.addEventListener('load', reveal, { once: true });
    }
  }

  // ----- Todo badge sync -----
  // Reads the count stored by todos.html and updates every nav badge on the page.
  function syncTodoBadge() {
    const stored = localStorage.getItem('cinc-todos-count');
    if (stored === null) return;
    document.querySelectorAll('.bottom-nav__nav-badge').forEach((el) => {
      el.textContent = stored;
    });
  }

  // ----- Fullscreen button -----
  // Shows a small pill button at the bottom of the screen inviting the user
  // to go fullscreen. Hidden on desktop and in browsers that don't support
  // the Fullscreen API. Disappears once fullscreen is active.
  function wireFullscreenButton() {
    // Only show on touch devices (phones/tablets)
    if (!('ontouchstart' in window)) return;
    // Must support fullscreen API
    const docEl = document.documentElement;
    const requestFS = docEl.requestFullscreen || docEl.webkitRequestFullscreen || docEl.mozRequestFullScreen;
    if (!requestFS) return;

    // Create the button
    const btn = document.createElement('button');
    btn.id = 'fs-btn';
    btn.setAttribute('aria-label', 'Fullscreen');
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3h6M3 3v6M3 3l6 6M21 3h-6M21 3v6M21 3l-6 6M3 21h6M3 21v-6M3 21l6-6M21 21h-6M21 21v-6M21 21l-6-6" stroke="#112719" stroke-width="2" stroke-linecap="round"/>
    </svg><span>Full Screen</span>`;
    btn.style.cssText = [
      'position:fixed',
      'bottom:80px',
      'left:50%',
      'transform:translateX(-50%)',
      'z-index:9999',
      'background:#b2de61',
      'color:#112719',
      'border:none',
      'border-radius:999px',
      'padding:8px 18px 8px 14px',
      'font-family:Montserrat,sans-serif',
      'font-size:12px',
      'font-weight:700',
      'display:flex',
      'align-items:center',
      'gap:6px',
      'cursor:pointer',
      'box-shadow:0 2px 12px rgba(0,0,0,0.25)',
      'letter-spacing:0.3px',
      'text-transform:uppercase',
    ].join(';');

    document.body.appendChild(btn);

    btn.addEventListener('click', () => {
      requestFS.call(docEl);
    });

    // Hide the button when fullscreen is active
    const onFSChange = () => {
      const isFS = !!(document.fullscreenElement || document.webkitFullscreenElement);
      btn.style.display = isFS ? 'none' : 'flex';
    };
    document.addEventListener('fullscreenchange', onFSChange);
    document.addEventListener('webkitfullscreenchange', onFSChange);
  }

  // ----- Init -----
  function init() {
    loadState();
    wireTabs();
    wireLoginForm();
    wireChatSearch();
    wireSheets();
    wirePreloaderOnNav();
    showPreloaderOnLoad();
    syncTodoBadge();
    wireFullscreenButton();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
