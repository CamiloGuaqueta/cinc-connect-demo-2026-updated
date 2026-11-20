// Vertex Capital Asset Group prospect demo → served at /vertex
// Built by `vite build --mode vertex` (see vite.config.js). Source code is never
// edited: every string below is swapped at build time in src/**/*.{js,jsx,css}.
// Logo + colors from Diego's pack (Custom Connect Demos 1, 11/2026; 17/11/2026 build); brand site: vertexcapitalassetgroup.com (Florida; no city listed, so the demo uses Tampa Bay).

const PRIMARY    = '#051B3B'   // titles, icons, buttons
const CARD       = '#051B3B'   // payment card
const NAV_BAR    = '#FFFFFF'
const NAV_ICON   = '#313131'
const NAV_ACTIVE = '#051B3B'

export default {
  id: 'vertex',
  title: 'Vertex Capital Asset Group · Connect Demo',
  themeColor: '#F3F4F7',
  favicon: '/tenants/vertex/icon.png',

  assets: {
    'src/images/splash-bg.jpg':  'public/tenants/vertex/splash.jpg',
    'src/images/login-logo.svg': 'public/tenants/vertex/logo.png',
  },

  // Ordered: specific strings before generic ones
  replace: [
    // Community + streets (fictional HOA — not one of the prospect's real communities)
    ['Cardinal Hills Drive', 'Osprey Bay Drive'],
    ['Cardinal Hills Dr',    'Osprey Bay Dr'],
    ['Cardinal Point Road',  'Osprey Point Road'],
    ['Cardinal Point Rd',    'Osprey Point Rd'],
    ['Cardinal Way',         'Osprey Way'],
    ['Cardinal Heights',     'Osprey Heights'],
    ['Pinecrest Loop',       'Mangrove Loop'],
    ['Hillcrest Loop',       'Sabal Palm Loop'],
    ['Ridgeline Pass',       'Bayshore View Pass'],
    ['Cardinal Hills',       'Osprey Bay'],
    ['Cardinal ',            'Osprey '],
    ['cardinalhills',        'ospreybay'],
    ['cardinalrealty',       'ospreyrealty'],
    [/\bCH([:-])(\d)/g,      'OB$1$2'],

    // Management company
    ['East Management',      'Vertex Capital Asset Group'],

    // Cities
    ['Miami, FL 33130', 'Tampa, FL 33602'],
    ['Miami FL 33130',  'Tampa FL 33602'],
    [/Miami, FL 331(\d\d)/g, 'Tampa, FL 336$1'],
    ['Los Altos, CA 94023', 'Brandon, FL 33511'],
    ['Saratoga, CA 95070', 'Riverview, FL 33578'],
    ['Campbell, CA 95008', 'Wesley Chapel, FL 33544'],
    ['Santa Clara, CA 95051', 'Clearwater, FL 33755'],
    ['San Jose, CA 95112', 'St. Petersburg, FL 33701'],
    ['Los Gatos, CA 95032', 'Lutz, FL 33548'],
    // Blog / Market Index location (source canon: Miami-Dade, South Florida, 305)
    ['Miami-Dade County',    'Hillsborough County'],
    ['South Florida continues', 'Tampa Bay continues'],
    ['South Florida',        'Tampa Bay'],
    ['(305) 555-0192',       '(813) 555-0192'],

    // HOA avatar
    ['/images/cinc-icon.png', '/tenants/vertex/icon.png'],

    // CINC palette → AvantStay palette (theme presets, :root defaults, fixed surfaces)
    [/#006A52/gi, PRIMARY],
    [/#00553F/gi, '#03122A'],
    [/#002D28/gi, PRIMARY],
    [/#171B19/gi, '#313131'],
    [/#E9EEEA/gi, '#F3F4F7'],
    [/#D9E9E3/gi, '#E1E6EE'],
    [/#CBCACD/gi, '#E2E2E2'],
    // CSS filter that tints <img> icons Evergreen → primary
    ['brightness(0) saturate(100%) invert(27%) sepia(87%) saturate(1530%) hue-rotate(143deg) brightness(93%) contrast(101%)',
     'brightness(0) saturate(100%) invert(9%) sepia(21%) saturate(5210%) hue-rotate(199deg) brightness(92%) contrast(101%)'],
  ],

  // Appended to src/index.css
  css: `
/* ── vertex tenant overrides (prefixed for specificity over per-screen CSS) ── */
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
.login-screen .login-logo { position: static; width: 150px; height: auto; object-position: center; }
.login-screen .login-connecplus { display: none; }
`,
}
