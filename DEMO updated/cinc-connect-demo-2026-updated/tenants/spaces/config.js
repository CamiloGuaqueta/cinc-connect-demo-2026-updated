// Spaces Management prospect demo → served at /spaces
// Built by `vite build --mode spaces` (see vite.config.js). Source code is never
// edited: every string below is swapped at build time in src/**/*.{js,jsx,css}.
// Logo + colors taken from spacesmanagement.com (Tuscaloosa, AL); swap the files in
// public/tenants/spaces/ if official assets arrive.

const PRIMARY    = '#3C617A'   // titles, icons, buttons
const CARD       = '#233339'   // payment card
const NAV_BAR    = '#233339'
const NAV_ICON   = '#FFFFFF'
const NAV_ACTIVE = '#ECAE59'

export default {
  id: 'spaces',
  title: 'Spaces Management · Connect Demo',
  themeColor: '#EFF2F4',
  favicon: '/tenants/spaces/icon.png',

  assets: {
    'src/images/splash-bg.jpg':  'public/tenants/spaces/splash.jpg',
    'src/images/login-logo.svg': 'public/tenants/spaces/logo.png',
  },

  // Ordered: specific strings before generic ones
  replace: [
    // Community + streets (fictional HOA — not one of the prospect's real communities)
    ['Cardinal Hills Drive', 'Riverbend Drive'],
    ['Cardinal Hills Dr',    'Riverbend Dr'],
    ['Cardinal Point Road',  'Riverbend Point Road'],
    ['Cardinal Point Rd',    'Riverbend Point Rd'],
    ['Cardinal Way',         'Riverbend Way'],
    ['Cardinal Heights',     'Riverbend Heights'],
    ['Pinecrest Loop',       'Camellia Loop'],
    ['Hillcrest Loop',       'Yellowhammer Loop'],
    ['Ridgeline Pass',       'Black Warrior View Pass'],
    ['Cardinal Hills',       'Riverbend'],
    ['Cardinal ',            'Riverbend '],
    ['cardinalhills',        'riverbend'],
    ['cardinalrealty',       'riverbendrealty'],
    [/\bCH([:-])(\d)/g,      'RB$1$2'],

    // Management company
    ['East Management',      'Spaces Management'],

    // Cities
    ['Miami, FL 33130',      'Tuscaloosa, AL 35401'],
    [/Miami, FL 331(\d\d)/g, 'Birmingham, AL 352$1'],
    ['Los Altos, CA 94023',  'Northport, AL 35473'],
    ['Saratoga, CA 95070',   'Hoover, AL 35244'],
    ['Campbell, CA 95008',   'Cottondale, AL 35453'],
    ['Santa Clara, CA 95051','Vestavia Hills, AL 35216'],
    ['San Jose, CA 95112',   'Huntsville, AL 35801'],
    ['Los Gatos, CA 95032',  'Coker, AL 35452'],

    // HOA avatar
    ['/images/cinc-icon.png', '/tenants/spaces/icon.png'],

    // CINC palette → Spaces Management palette (theme presets, :root defaults, fixed surfaces)
    [/#006A52/gi, PRIMARY],
    [/#00553F/gi, '#25475F'],
    [/#002D28/gi, PRIMARY],
    [/#171B19/gi, '#1E2A30'],
    [/#E9EEEA/gi, '#EFF2F4'],
    [/#D9E9E3/gi, '#E1EAF0'],
    [/#CBCACD/gi, '#D5DDE2'],
    // CSS filter that tints <img> icons Evergreen → primary
    ['brightness(0) saturate(100%) invert(27%) sepia(87%) saturate(1530%) hue-rotate(143deg) brightness(93%) contrast(101%)',
     'brightness(0) saturate(100%) invert(33%) sepia(16%) saturate(1176%) hue-rotate(161deg) brightness(98%) contrast(88%)'],
  ],

  // Appended to src/index.css
  css: `
/* ── spaces tenant overrides (prefixed for specificity over per-screen CSS) ── */
.phone-frame .resident-nav__bg,
.phone-frame .resident-nav-v2 { background: ${NAV_BAR}; }
.phone-frame .resident-nav__icon svg,
.phone-frame .resident-nav__label { color: ${NAV_ICON}; }
.phone-frame .resident-nav__item--active .resident-nav__icon { background: ${NAV_ACTIVE}; }
.phone-frame .resident-nav__item--active .resident-nav__icon svg { color: #233339; }
.phone-frame .resident-nav__item--active .resident-nav__label { color: #FFFFFF; }

/* Payment card */
.phone-frame .acct-card { background: ${CARD}; }

body .layout-toggle { color: #FFFFFF; border-color: ${PRIMARY}; background: #1E1E1E; }
body .layout-toggle:hover { border-color: ${PRIMARY}; }

.login-screen .login-logo-lockup { width: auto; height: auto; display: flex; flex-direction: column; align-items: center; }
.login-screen .login-logo { position: static; width: 150px; height: auto; object-position: center; }
.login-screen .login-connecplus { display: none; }
`,
}
