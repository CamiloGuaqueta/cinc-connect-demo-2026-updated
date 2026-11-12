// NHE prospect demo → served at /nhe
// Built by `vite build --mode nhe` (see vite.config.js). Source code is never
// edited: every string below is swapped at build time in src/**/*.{js,jsx,css}.
// Logo + colors from Diego's pack (Custom Connect Demos 1, 11/2026); brand site: nhe-inc.com / nhehoa.com (Greenville, SC).

const PRIMARY    = '#027BBF'   // titles, icons, buttons
const CARD       = '#015E92'   // payment card
const NAV_BAR    = '#FFFFFF'
const NAV_ICON   = '#313131'
const NAV_ACTIVE = '#027BBF'

export default {
  id: 'nhe',
  title: 'NHE · Connect Demo',
  themeColor: '#FFFFFF',
  favicon: '/tenants/nhe/icon.png',

  assets: {
    'src/images/splash-bg.jpg':  'public/tenants/nhe/splash.jpg',
    'src/images/login-logo.svg': 'public/tenants/nhe/logo.png',
  },

  // Ordered: specific strings before generic ones
  replace: [
    // Community + streets (fictional HOA — not one of the prospect's real communities)
    ['Cardinal Hills Drive', 'Palmetto Ridge Drive'],
    ['Cardinal Hills Dr',    'Palmetto Ridge Dr'],
    ['Cardinal Point Road',  'Palmetto Point Road'],
    ['Cardinal Point Rd',    'Palmetto Point Rd'],
    ['Cardinal Way',         'Palmetto Way'],
    ['Cardinal Heights',     'Palmetto Heights'],
    ['Pinecrest Loop',       'Dogwood Loop'],
    ['Hillcrest Loop',       'Wren Loop'],
    ['Ridgeline Pass',       'Paris Mountain View Pass'],
    ['Cardinal Hills',       'Palmetto Ridge'],
    ['Cardinal ',            'Palmetto '],
    ['cardinalhills',        'palmettoridge'],
    ['cardinalrealty',       'palmettorealty'],
    [/\bCH([:-])(\d)/g,      'PR$1$2'],

    // Management company
    ['East Management',      'NHE'],

    // Cities
    ['Miami, FL 33130',      'Greenville, SC 29601'],
    [/Miami, FL 331(\d\d)/g, 'Columbia, SC 292$1'],
    ['Los Altos, CA 94023',  'Spartanburg, SC 29302'],
    ['Saratoga, CA 95070',   'Simpsonville, SC 29681'],
    ['Campbell, CA 95008',   'Greer, SC 29650'],
    ['Santa Clara, CA 95051','Mauldin, SC 29662'],
    ['San Jose, CA 95112',   'Charlotte, NC 28202'],
    ['Los Gatos, CA 95032',  'Easley, SC 29640'],

    // HOA avatar
    ['/images/cinc-icon.png', '/tenants/nhe/icon.png'],

    // CINC palette → NHE palette (theme presets, :root defaults, fixed surfaces)
    [/#006A52/gi, PRIMARY],
    [/#00553F/gi, '#015E92'],
    [/#002D28/gi, PRIMARY],
    [/#171B19/gi, '#313131'],
    [/#E9EEEA/gi, '#FFFFFF'],
    [/#D9E9E3/gi, '#DDEEF7'],
    [/#CBCACD/gi, '#E2E2E2'],
    // Cards ("element" color) on a white page
    ["'--res-bg2':    '#FFFFFF'", "'--res-bg2':    '#F5F5F5'"],
    ['--res-bg2:    #FFFFFF;', '--res-bg2:    #F5F5F5;'],
    // CSS filter that tints <img> icons Evergreen → primary
    ['brightness(0) saturate(100%) invert(27%) sepia(87%) saturate(1530%) hue-rotate(143deg) brightness(93%) contrast(101%)',
     'brightness(0) saturate(100%) invert(30%) sepia(69%) saturate(2129%) hue-rotate(180deg) brightness(91%) contrast(98%)'],
  ],

  // Appended to src/index.css
  css: `
/* ── nhe tenant overrides (prefixed for specificity over per-screen CSS) ── */
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
