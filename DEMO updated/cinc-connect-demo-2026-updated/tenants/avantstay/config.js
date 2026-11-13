// AvantStay prospect demo → served at /avantstay
// Built by `vite build --mode avantstay` (see vite.config.js). Source code is never
// edited: every string below is swapped at build time in src/**/*.{js,jsx,css}.
// Logo + colors from Diego's pack (Custom Connect Demos 1, 11/2026); brand site: avantstay.com (Torrance, CA).
// AvantStay is a vacation-rental operator (not an HOA manager); demo uses a fictional South Bay HOA.

const PRIMARY    = '#102749'   // titles, icons, buttons
const CARD       = '#102749'   // payment card
const NAV_BAR    = '#FFFFFF'
const NAV_ICON   = '#313131'
const NAV_ACTIVE = '#102749'

export default {
  id: 'avantstay',
  title: 'AvantStay · Connect Demo',
  themeColor: '#F3F4F7',
  favicon: '/tenants/avantstay/icon.png',

  assets: {
    'src/images/splash-bg.jpg':  'public/tenants/avantstay/splash.jpg',
    'src/images/login-logo.svg': 'public/tenants/avantstay/logo.png',
  },

  // Ordered: specific strings before generic ones
  replace: [
    // Community + streets (fictional HOA — not one of the prospect's real communities)
    ['Cardinal Hills Drive', 'Pacific Shores Drive'],
    ['Cardinal Hills Dr',    'Pacific Shores Dr'],
    ['Cardinal Point Road',  'Pacific Point Road'],
    ['Cardinal Point Rd',    'Pacific Point Rd'],
    ['Cardinal Way',         'Pacific Way'],
    ['Cardinal Heights',     'Pacific Heights'],
    ['Pinecrest Loop',       'Seabreeze Loop'],
    ['Hillcrest Loop',       'Palm Loop'],
    ['Ridgeline Pass',       'Catalina View Pass'],
    ['Cardinal Hills',       'Pacific Shores'],
    ['Cardinal ',            'Pacific '],
    ['cardinalhills',        'pacificshores'],
    ['cardinalrealty',       'pacificrealty'],
    [/\bCH([:-])(\d)/g,      'PS$1$2'],

    // Management company
    ['East Management',      'AvantStay'],

    // Cities
    ['Miami, FL 33130',      'Torrance, CA 90503'],
    [/Miami, FL 331(\d\d)/g, 'Redondo Beach, CA 902$1'],
    ['Los Altos, CA 94023',  'Manhattan Beach, CA 90266'],
    ['Saratoga, CA 95070',   'Hermosa Beach, CA 90254'],
    ['Campbell, CA 95008',   'Palos Verdes Estates, CA 90274'],
    ['Santa Clara, CA 95051','Long Beach, CA 90803'],
    ['San Jose, CA 95112',   'Los Angeles, CA 90045'],
    ['Los Gatos, CA 95032',  'Rolling Hills, CA 90274'],
    // Blog / Market Index location (source canon: Miami-Dade, South Florida, 305)
    ['Miami-Dade County',    'Los Angeles County'],
    ['South Florida continues', 'The South Bay continues'],
    ['South Florida',        'the South Bay'],
    ['(305) 555-0192',       '(310) 555-0192'],

    // HOA avatar
    ['/images/cinc-icon.png', '/tenants/avantstay/icon.png'],

    // CINC palette → AvantStay palette (theme presets, :root defaults, fixed surfaces)
    [/#006A52/gi, PRIMARY],
    [/#00553F/gi, '#0A1A33'],
    [/#002D28/gi, PRIMARY],
    [/#171B19/gi, '#313131'],
    [/#E9EEEA/gi, '#F3F4F7'],
    [/#D9E9E3/gi, '#E3E7EE'],
    [/#CBCACD/gi, '#E2E2E2'],
    // CSS filter that tints <img> icons Evergreen → primary
    ['brightness(0) saturate(100%) invert(27%) sepia(87%) saturate(1530%) hue-rotate(143deg) brightness(93%) contrast(101%)',
     'brightness(0) saturate(100%) invert(10%) sepia(48%) saturate(2329%) hue-rotate(198deg) brightness(96%) contrast(93%)'],
  ],

  // Appended to src/index.css
  css: `
/* ── avantstay tenant overrides (prefixed for specificity over per-screen CSS) ── */
.phone-frame .resident-nav__bg,
.phone-frame .resident-nav-v2 { background: ${NAV_BAR}; }
.phone-frame .resident-nav__icon svg,
.phone-frame .resident-nav__label { color: ${NAV_ICON}; }
.phone-frame .resident-nav__item--active .resident-nav__icon { background: ${NAV_ACTIVE}; }
.phone-frame .resident-nav__item--active .resident-nav__icon svg { color: #FFFFFF; }
.phone-frame .resident-nav__item--active .resident-nav__label { color: #313131; }

/* Payment card */
.phone-frame .acct-card { background: ${CARD}; }

body .layout-toggle { color: #FFFFFF; border-color: ${PRIMARY}; background: #1E1E1E; }
body .layout-toggle:hover { border-color: ${PRIMARY}; }

.login-screen .login-logo-lockup { width: auto; height: auto; display: flex; flex-direction: column; align-items: center; }
.login-screen .login-logo { position: static; width: 170px; height: auto; object-position: center; }
.login-screen .login-connecplus { display: none; }
`,
}
