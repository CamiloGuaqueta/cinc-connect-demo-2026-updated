// Wright Property Management prospect demo → served at /wright
// Built by `vite build --mode wright` (see vite.config.js). Source code is never
// edited: every string below is swapped at build time in src/**/*.{js,jsx,css}.
// Logo + colors taken from wrightpm.com (Memphis, TN); swap the files in
// public/tenants/wright/ if official assets arrive.

const PRIMARY    = '#003F87'   // titles, icons, buttons
const CARD       = '#002A5C'   // payment card
const NAV_BAR    = '#FFFFFF'
const NAV_ICON   = '#003F87'
const NAV_ACTIVE = '#13A300'

export default {
  id: 'wright',
  title: 'Wright Property Management · Connect Demo',
  themeColor: '#EFF3F8',
  favicon: '/tenants/wright/icon.png',

  assets: {
    'src/images/splash-bg.jpg':  'public/tenants/wright/splash.jpg',
    'src/images/login-logo.svg': 'public/tenants/wright/logo.png',
  },

  // Ordered: specific strings before generic ones
  replace: [
    // Community + streets (fictional HOA — not one of the prospect's real communities)
    ['Cardinal Hills Drive', 'Shelby Oaks Drive'],
    ['Cardinal Hills Dr',    'Shelby Oaks Dr'],
    ['Cardinal Point Road',  'Shelby Point Road'],
    ['Cardinal Point Rd',    'Shelby Point Rd'],
    ['Cardinal Way',         'Shelby Way'],
    ['Cardinal Heights',     'Shelby Heights'],
    ['Pinecrest Loop',       'Hickory Loop'],
    ['Hillcrest Loop',       'Cypress Loop'],
    ['Ridgeline Pass',       'Wolf River View Pass'],
    ['Cardinal Hills',       'Shelby Oaks'],
    ['Cardinal ',            'Shelby '],
    ['cardinalhills',        'shelbyoaks'],
    ['cardinalrealty',       'shelbyrealty'],
    [/\bCH([:-])(\d)/g,      'SO$1$2'],

    // Management company
    ['East Management',      'Wright Property Management'],

    // Cities
    ['Miami, FL 33130',      'Memphis, TN 38103'],
    [/Miami, FL 331(\d\d)/g, 'Memphis, TN 381$1'],
    ['Los Altos, CA 94023',  'Germantown, TN 38138'],
    ['Saratoga, CA 95070',   'Collierville, TN 38017'],
    ['Campbell, CA 95008',   'Cordova, TN 38016'],
    ['Santa Clara, CA 95051','Bartlett, TN 38133'],
    ['San Jose, CA 95112',   'Lakeland, TN 38002'],
    ['Los Gatos, CA 95032',  'Arlington, TN 38002'],
    // Blog / Market Index location (source canon: Miami-Dade, South Florida, 305)
    ['Miami-Dade County',    'Shelby County'],
    ['South Florida continues', 'Greater Memphis continues'],
    ['South Florida',        'Greater Memphis'],
    ['(305) 555-0192',       '(901) 555-0192'],

    // HOA avatar
    ['/images/cinc-icon.png', '/tenants/wright/icon.png'],

    // CINC palette → Wright Property Management palette (theme presets, :root defaults, fixed surfaces)
    [/#006A52/gi, PRIMARY],
    [/#00553F/gi, '#002A5C'],
    [/#002D28/gi, PRIMARY],
    [/#171B19/gi, '#18202B'],
    [/#E9EEEA/gi, '#EFF3F8'],
    [/#D9E9E3/gi, '#DEE8F4'],
    [/#CBCACD/gi, '#D3DCE7'],
    // CSS filter that tints <img> icons Evergreen → primary
    ['brightness(0) saturate(100%) invert(27%) sepia(87%) saturate(1530%) hue-rotate(143deg) brightness(93%) contrast(101%)',
     'brightness(0) saturate(100%) invert(13%) sepia(62%) saturate(5228%) hue-rotate(202deg) brightness(83%) contrast(102%)'],
  ],

  // Appended to src/index.css
  css: `
/* ── wright tenant overrides (prefixed for specificity over per-screen CSS) ── */
.phone-frame .resident-nav__bg,
.phone-frame .resident-nav-v2 { background: ${NAV_BAR}; }
.phone-frame .resident-nav__icon svg,
.phone-frame .resident-nav__label { color: ${NAV_ICON}; }
.phone-frame .resident-nav__item--active .resident-nav__icon { background: ${NAV_ACTIVE}; }
.phone-frame .resident-nav__item--active .resident-nav__icon svg { color: #FFFFFF; }
.phone-frame .resident-nav__item--active .resident-nav__label { color: #003F87; }

/* Payment card */
.phone-frame .acct-card { background: ${CARD}; }

body .layout-toggle { color: #FFFFFF; border-color: ${PRIMARY}; background: #1E1E1E; }
body .layout-toggle:hover { border-color: ${PRIMARY}; }

.login-screen .login-logo-lockup { width: auto; height: auto; display: flex; flex-direction: column; align-items: center; }
.login-screen .login-logo { position: static; width: 220px; height: auto; object-position: center; }
.login-screen .login-connecplus { display: none; }
`,
}
