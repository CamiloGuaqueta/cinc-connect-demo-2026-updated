// Around the Clock prospect demo → served at /atc
// Built by `vite build --mode atc` (see vite.config.js). Source code is never
// edited: every string below is swapped at build time in src/**/*.{js,jsx,css}.
// Logo + colors from Diego's pack (Custom Connect Demos 02, 11/2026); brand site: aroundtheclockinc.com (Kent, WA).

const PRIMARY    = '#303030'   // titles, icons, buttons
const CARD       = '#303030'   // payment card
const NAV_BAR    = '#FFFFFF'
const NAV_ICON   = '#313131'
const NAV_ACTIVE = '#303030'

export default {
  id: 'atc',
  title: 'Around the Clock · Connect Demo',
  themeColor: '#F1F1F1',
  favicon: '/tenants/atc/icon.png',

  assets: {
    'src/images/splash-bg.jpg':  'public/tenants/atc/splash.jpg',
    'src/images/login-logo.svg': 'public/tenants/atc/logo.png',
  },

  // Ordered: specific strings before generic ones
  replace: [
    // Community + streets (fictional HOA — not one of the prospect's real communities)
    ['Cardinal Hills Drive', 'Kestrel Ridge Drive'],
    ['Cardinal Hills Dr',    'Kestrel Ridge Dr'],
    ['Cardinal Point Road',  'Kestrel Point Road'],
    ['Cardinal Point Rd',    'Kestrel Point Rd'],
    ['Cardinal Way',         'Kestrel Way'],
    ['Cardinal Heights',     'Kestrel Heights'],
    ['Pinecrest Loop',       'Fir Loop'],
    ['Hillcrest Loop',       'Alder Loop'],
    ['Ridgeline Pass',       'Green River View Pass'],
    ['Cardinal Hills',       'Kestrel Ridge'],
    ['Cardinal ',            'Kestrel '],
    ['cardinalhills',        'kestrelridge'],
    ['cardinalrealty',       'kestrelrealty'],
    [/\bCH([:-])(\d)/g,      'KR$1$2'],

    // Management company
    ['East Management',      'Around the Clock'],

    // Cities
    ['Miami, FL 33130',      'Kent, WA 98030'],
    ['Miami FL 33130',       'Kent WA 98030'],
    [/Miami, FL 331(\d\d)/g, 'Kent, WA 980$1'],
    ['Los Altos, CA 94023',  'Auburn, WA 98002'],
    ['Saratoga, CA 95070',   'Renton, WA 98055'],
    ['Campbell, CA 95008',   'Covington, WA 98042'],
    ['Santa Clara, CA 95051','Maple Valley, WA 98038'],
    ['San Jose, CA 95112',   'Federal Way, WA 98003'],
    ['Los Gatos, CA 95032',  'Tukwila, WA 98188'],
    // Blog / Market Index location (source canon: Miami-Dade, South Florida, 305)
    ['Miami-Dade County',    'King County'],
    ['South Florida continues', 'South King County continues'],
    ['South Florida',        'South King County'],
    ['(305) 555-0192',       '(253) 555-0192'],

    // HOA avatar
    ['/images/cinc-icon.png', '/tenants/atc/icon.png'],

    // CINC palette → Around the Clock palette (theme presets, :root defaults, fixed surfaces)
    [/#006A52/gi, PRIMARY],
    [/#00553F/gi, '#1C1C1C'],
    [/#002D28/gi, PRIMARY],
    [/#171B19/gi, '#313131'],
    [/#E9EEEA/gi, '#F1F1F1'],
    [/#D9E9E3/gi, '#E4E4E4'],
    [/#CBCACD/gi, '#E2E2E2'],
    // Cards ("element" color)
    ["'--res-bg2':    '#FFFFFF'", "'--res-bg2':    '#FAFAFA'"],
    ['--res-bg2:    #FFFFFF;', '--res-bg2:    #FAFAFA;'],
    // CSS filter that tints <img> icons Evergreen → primary
    ['brightness(0) saturate(100%) invert(27%) sepia(87%) saturate(1530%) hue-rotate(143deg) brightness(93%) contrast(101%)',
     'brightness(0) saturate(100%) invert(16%) sepia(0%) saturate(0%) hue-rotate(261deg) brightness(98%) contrast(91%)'],
  ],

  // Appended to src/index.css
  css: `
/* ── atc tenant overrides (prefixed for specificity over per-screen CSS) ── */
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
.login-screen .login-logo { position: static; width: 130px; height: auto; object-position: center; margin-top: 16px; }  /* square clock logo */
.login-screen .login-connecplus { display: none; }
`,
}
