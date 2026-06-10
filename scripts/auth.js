/* ============================================
   CINC Connect Demo — Auth / Session
   Captures lead (name + email), persists in
   localStorage with namespace cinc:demo:*, auto-
   logs out after 15 minutes of inactivity.
   ============================================ */

(function () {
  'use strict';

  // ─── Brand Theme — apply immediately before any rendering ───────────────────
  try {
    if (localStorage.getItem('cinc:demo:brand') === 'custom') {
      document.documentElement.setAttribute('data-brand', 'custom');
    } else {
      document.documentElement.removeAttribute('data-brand');
    }
  } catch (_) {}

  // Swap app-header logo + name for custom brand
  try {
    if (localStorage.getItem('cinc:demo:brand') === 'custom') {
      document.querySelectorAll('.app-header__logo').forEach(function (el) {
        el.src = 'assets/icons/Your Community app logo.svg';
        el.alt = 'Lakewood Ridge HOA';
      });
      document.querySelectorAll('.app-header__name').forEach(function (el) {
        el.textContent = 'Lakewood Ridge HOA';
      });
    }
  } catch (_) {}
  // ────────────────────────────────────────────────────────────────────────────

  // ─── Demo Usage Tracking ────────────────────────────────────────────────────
  // Paste your Google Apps Script Web App URL here to log logins to a Sheet.
  // Leave empty ('') to disable tracking.
  const TRACKING_URL = 'https://script.google.com/macros/s/AKfycbyyOGsNFYJm8YEWEoFfBMuWaKmz1FV8XIW8RWGVL0PM5-8pGTTwSYQCOifHe-o-ilgBVA/exec';
  // ────────────────────────────────────────────────────────────────────────────

  const NS = 'cinc:demo:';
  const KEY_USER = NS + 'user';
  const KEY_LAST_ACTIVITY = NS + 'lastActivity';
  const IDLE_TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes

  const LOGIN_PAGE = 'index.html';
  const HOME_PAGE = 'feed.html';

  function now() { return Date.now(); }

  function getUser() {
    try { return JSON.parse(localStorage.getItem(KEY_USER) || 'null'); }
    catch (_) { return null; }
  }

  function setUser(user) {
    localStorage.setItem(KEY_USER, JSON.stringify(user));
    touch();
  }

  function isLoggedIn() {
    return !!getUser();
  }

  function touch() {
    localStorage.setItem(KEY_LAST_ACTIVITY, String(now()));
  }

  function isIdleExpired() {
    const last = parseInt(localStorage.getItem(KEY_LAST_ACTIVITY) || '0', 10);
    if (!last) return false;
    return now() - last > IDLE_TIMEOUT_MS;
  }

  function wipeDemoState() {
    // Remove every key under our namespace
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(NS)) keys.push(k);
    }
    keys.forEach((k) => localStorage.removeItem(k));
  }

  function logout(redirect) {
    wipeDemoState();
    if (redirect !== false) {
      window.location.href = LOGIN_PAGE;
    }
  }

  function trackLogin(user) {
    if (!TRACKING_URL) return;
    try {
      var url = TRACKING_URL
        + '?name='  + encodeURIComponent(user.name)
        + '&email=' + encodeURIComponent(user.email)
        + '&ts='    + encodeURIComponent(new Date().toISOString())
        + '&ua='    + encodeURIComponent((navigator.userAgent || '').substring(0, 120));
      new Image().src = url;
    } catch (_) {}
  }

  function login(name, email) {
    if (!name || !email) throw new Error('Name and email required');
    const user = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      createdAt: now()
    };
    setUser(user);
    trackLogin(user);
    return user;
  }

  // Pages call this on load. Returns:
  //  true  → user is good to go
  //  false → redirected to login (no user, or idle expired)
  function requireAuth() {
    if (isIdleExpired()) {
      logout(true);
      return false;
    }
    if (!isLoggedIn()) {
      window.location.href = LOGIN_PAGE;
      return false;
    }
    touch();
    wireActivityTracking();
    return true;
  }

  // The login page calls this. If already logged in + still valid, jump to home.
  function bootstrapLoginPage() {
    if (!isIdleExpired() && isLoggedIn()) {
      window.location.href = HOME_PAGE;
      return false;
    }
    // If idle expired, clean up before showing login
    if (isIdleExpired()) wipeDemoState();
    return true;
  }

  let activityTimer = null;
  function wireActivityTracking() {
    if (window.__cincActivityWired) return;
    window.__cincActivityWired = true;

    // Throttled touch on user interaction
    let pendingTouch = false;
    const schedule = () => {
      if (pendingTouch) return;
      pendingTouch = true;
      setTimeout(() => {
        touch();
        pendingTouch = false;
      }, 1000);
    };
    ['click', 'keydown', 'scroll', 'touchstart'].forEach((ev) => {
      window.addEventListener(ev, schedule, { passive: true });
    });

    // Periodic check (every 60s) — if idle expired, logout
    activityTimer = setInterval(() => {
      if (isIdleExpired()) {
        logout(true);
      }
    }, 60 * 1000);
  }

  // Helper for other scripts to read user
  function getUserName() { return (getUser() || {}).name || ''; }
  function getUserEmail() { return (getUser() || {}).email || ''; }
  function getUserInitials() {
    const n = getUserName();
    if (!n) return 'U';
    return n.split(/\s+/).slice(0, 2).map((p) => p[0] || '').join('').toUpperCase();
  }

  function getBrand() {
    try { return localStorage.getItem('cinc:demo:brand') || 'default'; } catch (_) { return 'default'; }
  }

  function setBrand(brand) {
    try {
      localStorage.setItem('cinc:demo:brand', brand || 'default');
      if (brand === 'custom') {
        document.documentElement.setAttribute('data-brand', 'custom');
      } else {
        document.documentElement.removeAttribute('data-brand');
      }
    } catch (_) {}
  }

  window.CincAuth = {
    NS,
    getUser,
    isLoggedIn,
    login,
    logout,
    requireAuth,
    bootstrapLoginPage,
    touch,
    getUserName,
    getUserEmail,
    getUserInitials,
    wipeDemoState,
    getBrand,
    setBrand
  };
})();
