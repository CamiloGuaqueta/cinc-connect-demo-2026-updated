// McGill Management prospect demo → served at /mcgill
// Built by `vite build --mode mcgill` (see vite.config.js). Source code is never
// edited: every string below is swapped at build time in src/**/*.{js,jsx,css}.
// Logo + colors from Diego's pack (Custom Connect Demos 02, 11/2026); brand site: mcgillmanagement.com (Arlington Heights, IL).

const PRIMARY    = '#2E2E2E'   // titles, icons, buttons
const CARD       = '#2E2E2E'   // payment card
const NAV_BAR    = '#FFFFFF'
const NAV_ICON   = '#313131'
const NAV_ACTIVE = '#2E2E2E'

export default {
  id: 'mcgill',
  title: 'McGill Management · Connect Demo',
  themeColor: '#F0F0F0',
  favicon: '/tenants/mcgill/icon.png',

  assets: {
    'src/images/splash-bg.jpg':  'public/tenants/mcgill/splash.jpg',
    'src/images/login-logo.svg': 'public/tenants/mcgill/logo.png',
  },

  // Ordered: specific strings before generic ones
  replace: [
    // Community + streets (fictional HOA — not one of the prospect's real communities)
    ['Cardinal Hills Drive', 'Prairie Grove Drive'],
    ['Cardinal Hills Dr',    'Prairie Grove Dr'],
    ['Cardinal Point Road',  'Prairie Point Road'],
    ['Cardinal Point Rd',    'Prairie Point Rd'],
    ['Cardinal Way',         'Prairie Way'],
    ['Cardinal Heights',     'Prairie Heights'],
    ['Pinecrest Loop',       'Linden Loop'],
    ['Hillcrest Loop',       'Burr Oak Loop'],
    ['Ridgeline Pass',       'Des Plaines View Pass'],
    ['Cardinal Hills',       'Prairie Grove'],
    ['Cardinal ',            'Prairie '],
    ['cardinalhills',        'prairiegrove'],
    ['cardinalrealty',       'prairierealty'],
    [/\bCH([:-])(\d)/g,      'PG$1$2'],

    // Management company
    ['East Management',      'McGill Management'],

    // Cities
    ['Miami, FL 33130',      'Arlington Heights, IL 60004'],
    ['Miami FL 33130',       'Arlington Heights IL 60004'],
    [/Miami, FL 331(\d\d)/g, 'Arlington Heights, IL 600$1'],
    ['Los Altos, CA 94023',  'Schaumburg, IL 60173'],
    ['Saratoga, CA 95070',   'Palatine, IL 60067'],
    ['Campbell, CA 95008',   'Mount Prospect, IL 60056'],
    ['Santa Clara, CA 95051','Buffalo Grove, IL 60089'],
    ['San Jose, CA 95112',   'Des Plaines, IL 60016'],
    ['Los Gatos, CA 95032',  'Wheeling, IL 60090'],
    // Blog / Market Index location (source canon: Miami-Dade, South Florida, 305)
    ['Miami-Dade County',    'Cook County'],
    ['South Florida continues', 'Chicagoland continues'],
    ['South Florida',        'Chicagoland'],
    ['(305) 555-0192',       '(847) 555-0192'],
    ['305.555.',            '847.555.'],   // ACC/WO/vendor phones in Tasks.jsx

    // HOA avatar
    ['/images/cinc-icon.png', '/tenants/mcgill/icon.png'],

    // CINC palette → McGill Management palette (theme presets, :root defaults, fixed surfaces)
    [/#006A52/gi, PRIMARY],
    [/#00553F/gi, '#1A1A1A'],
    [/#002D28/gi, PRIMARY],
    [/#171B19/gi, '#313131'],
    [/#E9EEEA/gi, '#F0F0F0'],
    [/#D9E9E3/gi, '#E4E4E4'],
    [/#CBCACD/gi, '#E2E2E2'],
    // Cards ("element" color)
    ["'--res-bg2':    '#FFFFFF'", "'--res-bg2':    '#FAFAFA'"],
    ['--res-bg2:    #FFFFFF;', '--res-bg2:    #FAFAFA;'],
    // CSS filter that tints <img> icons Evergreen → primary
    ['brightness(0) saturate(100%) invert(27%) sepia(87%) saturate(1530%) hue-rotate(143deg) brightness(93%) contrast(101%)',
     'brightness(0) saturate(100%) invert(13%) sepia(0%) saturate(0%) hue-rotate(221deg) brightness(102%) contrast(86%)'],
  ],

  // Appended to src/index.css
  css: `
/* ── mcgill tenant overrides (prefixed for specificity over per-screen CSS) ── */
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
body .layout-toggle:hover { border-color: #FFFFFF; }

.login-screen .login-logo-lockup { width: auto; height: auto; display: flex; flex-direction: column; align-items: center; }
.login-screen .login-logo { position: static; width: 240px; height: auto; object-position: center; }
.login-screen .login-connecplus { display: none; }
`,
}
