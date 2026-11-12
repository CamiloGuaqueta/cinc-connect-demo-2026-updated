// Clagett Enterprises prospect demo → served at /clagett
// Built by `vite build --mode clagett` (see vite.config.js). Source code is never
// edited: every string below is swapped at build time in src/**/*.{js,jsx,css}.
// Logo + colors from Diego's pack (Custom Connect Demos 1, 11/2026); brand site: clagett.com (Frederick, MD).

const PRIMARY    = '#CB2122'   // titles, icons, buttons
const CARD       = '#231F20'   // payment card
const NAV_BAR    = '#FFFFFF'
const NAV_ICON   = '#231F20'
const NAV_ACTIVE = '#CB2122'

export default {
  id: 'clagett',
  title: 'Clagett Enterprises · Connect Demo',
  themeColor: '#FFFFFF',
  favicon: '/tenants/clagett/icon.png',

  assets: {
    'src/images/splash-bg.jpg':  'public/tenants/clagett/splash.jpg',
    'src/images/login-logo.svg': 'public/tenants/clagett/logo.png',
  },

  // Ordered: specific strings before generic ones
  replace: [
    // Community + streets (fictional HOA — not one of the prospect's real communities)
    ['Cardinal Hills Drive', 'Catoctin Ridge Drive'],
    ['Cardinal Hills Dr',    'Catoctin Ridge Dr'],
    ['Cardinal Point Road',  'Catoctin Point Road'],
    ['Cardinal Point Rd',    'Catoctin Point Rd'],
    ['Cardinal Way',         'Catoctin Way'],
    ['Cardinal Heights',     'Catoctin Heights'],
    ['Pinecrest Loop',       'Monocacy Loop'],
    ['Hillcrest Loop',       'Sugarloaf Loop'],
    ['Ridgeline Pass',       'Blue Ridge View Pass'],
    ['Cardinal Hills',       'Catoctin Ridge'],
    ['Cardinal ',            'Catoctin '],
    ['cardinalhills',        'catoctinridge'],
    ['cardinalrealty',       'catoctinrealty'],
    [/\bCH([:-])(\d)/g,      'CA$1$2'],

    // Management company
    ['East Management',      'Clagett Enterprises'],

    // Cities
    ['Miami, FL 33130',      'Frederick, MD 21701'],
    [/Miami, FL 331(\d\d)/g, 'Frederick, MD 217$1'],
    ['Los Altos, CA 94023',  'Hagerstown, MD 21740'],
    ['Saratoga, CA 95070',   'Urbana, MD 21704'],
    ['Campbell, CA 95008',   'Middletown, MD 21769'],
    ['Santa Clara, CA 95051','Walkersville, MD 21793'],
    ['San Jose, CA 95112',   'Thurmont, MD 21788'],
    ['Los Gatos, CA 95032',  'Mount Airy, MD 21771'],

    // HOA avatar
    ['/images/cinc-icon.png', '/tenants/clagett/icon.png'],

    // CINC palette → Clagett Enterprises palette (theme presets, :root defaults, fixed surfaces)
    [/#006A52/gi, PRIMARY],
    [/#00553F/gi, '#A3191A'],
    [/#002D28/gi, PRIMARY],
    [/#171B19/gi, '#231F20'],
    [/#E9EEEA/gi, '#FFFFFF'],
    [/#D9E9E3/gi, '#F9E1E1'],
    [/#CBCACD/gi, '#E2E2E2'],
    // Cards ("element" color) on a white page
    ["'--res-bg2':    '#FFFFFF'", "'--res-bg2':    '#F2F2F2'"],
    ['--res-bg2:    #FFFFFF;', '--res-bg2:    #F2F2F2;'],
    // CSS filter that tints <img> icons Evergreen → primary
    ['brightness(0) saturate(100%) invert(27%) sepia(87%) saturate(1530%) hue-rotate(143deg) brightness(93%) contrast(101%)',
     'brightness(0) saturate(100%) invert(22%) sepia(97%) saturate(2597%) hue-rotate(345deg) brightness(79%) contrast(99%)'],
  ],

  // Appended to src/index.css
  css: `
/* ── clagett tenant overrides (prefixed for specificity over per-screen CSS) ── */
.phone-frame .resident-nav__bg,
.phone-frame .resident-nav-v2 { background: ${NAV_BAR}; }
.phone-frame .resident-nav__icon svg,
.phone-frame .resident-nav__label { color: ${NAV_ICON}; }
.phone-frame .resident-nav__item--active .resident-nav__icon { background: ${NAV_ACTIVE}; }
.phone-frame .resident-nav__item--active .resident-nav__icon svg { color: #FFFFFF; }
.phone-frame .resident-nav__item--active .resident-nav__label { color: #231F20; }

/* Payment card */
.phone-frame .acct-card { background: ${CARD}; }

body .layout-toggle { color: #FFFFFF; border-color: ${PRIMARY}; background: #1E1E1E; }
body .layout-toggle:hover { border-color: ${PRIMARY}; }

.login-screen .login-logo-lockup { width: auto; height: auto; display: flex; flex-direction: column; align-items: center; }
.login-screen .login-logo { position: static; width: 240px; height: auto; object-position: center; }
.login-screen .login-connecplus { display: none; }
`,
}
