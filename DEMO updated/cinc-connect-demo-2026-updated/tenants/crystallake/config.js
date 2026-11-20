// Crystal Lake Community Management prospect demo → served at /crystallake
// Built by `vite build --mode crystallake` (see vite.config.js). Source code is never
// edited: every string below is swapped at build time in src/**/*.{js,jsx,css}.
// No Diego pack: logo + colors taken from the prospect's site (20/11/2026).

const PRIMARY    = '#005339'   // titles, icons, buttons
const CARD       = '#005339'   // payment card
const NAV_BAR    = '#FFFFFF'
const NAV_ICON   = '#313131'
const NAV_ACTIVE = '#005339'

export default {
  id: 'crystallake',
  title: 'Crystal Lake Community Management · Connect Demo',
  themeColor: '#FFFFFF',
  favicon: '/tenants/crystallake/icon.png',

  assets: {
    'src/images/splash-bg.jpg':  'public/tenants/crystallake/splash.jpg',
    'src/images/login-logo.svg': 'public/tenants/crystallake/logo.png',
  },

  // Ordered: specific strings before generic ones
  replace: [
    // Community + streets (fictional HOA — not one of the prospect's real communities)
    ['Cardinal Hills Drive', 'Tumalo Ridge Drive'],
    ['Cardinal Hills Dr',    'Tumalo Ridge Dr'],
    ['Cardinal Point Road',  'Tumalo Point Road'],
    ['Cardinal Point Rd',    'Tumalo Point Rd'],
    ['Cardinal Way',         'Tumalo Way'],
    ['Cardinal Heights',     'Tumalo Heights'],
    ['Pinecrest Loop',       'Ponderosa Loop'],
    ['Hillcrest Loop',       'Manzanita Loop'],
    ['Ridgeline Pass',       'Deschutes River View Pass'],
    ['Cardinal Hills',       'Tumalo Ridge'],
    ['Cardinal ',            'Tumalo '],
    ['cardinalhills',        'tumaloridge'],
    ['cardinalrealty',       'tumalorealty'],
    [/\bCH([:-])(\d)/g,      'TR$1$2'],

    // Management company
    ['East Management',      'Crystal Lake Community Management'],

    // Cities
    ['Miami, FL 33130',      'Bend, OR 97701'],
    ['Miami FL 33130',       'Bend OR 97701'],
    [/Miami, FL 331(\d\d)/g, 'Bend, OR 977$1'],
    ['Los Altos, CA 94023',  'Redmond, OR 97756'],
    ['Saratoga, CA 95070',   'Sisters, OR 97759'],
    ['Campbell, CA 95008',   'Sunriver, OR 97707'],
    ['Santa Clara, CA 95051','La Pine, OR 97739'],
    ['San Jose, CA 95112',   'Prineville, OR 97754'],
    ['Los Gatos, CA 95032',  'Tumalo, OR 97703'],
    // Blog / Market Index location (source canon: Miami-Dade, South Florida, 305)
    ['Miami-Dade County',    'Deschutes County'],
    ['South Florida continues', 'Central Oregon continues'],
    ['South Florida',        'Central Oregon'],
    ['(305) 555-0192',       '(541) 555-0192'],
    ['305.555.',            '541.555.'],   // ACC/WO/vendor phones in Tasks.jsx

    // HOA avatar
    ['/images/cinc-icon.png', '/tenants/crystallake/icon.png'],

    // CINC palette → Crystal Lake Community Management palette (theme presets, :root defaults, fixed surfaces)
    [/#006A52/gi, PRIMARY],
    [/#00553F/gi, '#003F2B'],
    [/#002D28/gi, PRIMARY],
    [/#171B19/gi, '#313131'],
    [/#E9EEEA/gi, '#FFFFFF'],
    [/#D9E9E3/gi, '#DCEBE5'],
    [/#CBCACD/gi, '#E2E2E2'],
    // Cards: soft mint tint of the primary
    ["'--res-bg2':    '#FFFFFF'", "'--res-bg2':    '#F1F6F4'"],
    ['--res-bg2:    #FFFFFF;', '--res-bg2:    #F1F6F4;'],
    // CSS filter that tints <img> icons Evergreen → primary
    ['brightness(0) saturate(100%) invert(27%) sepia(87%) saturate(1530%) hue-rotate(143deg) brightness(93%) contrast(101%)',
     'brightness(0) saturate(100%) invert(23%) sepia(13%) saturate(4306%) hue-rotate(122deg) brightness(100%) contrast(104%)'],
  ],

  // Appended to src/index.css
  css: `
/* ── crystallake tenant overrides (prefixed for specificity over per-screen CSS) ── */
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
/* The login button uses the card color for its text; the light cards need white text instead */
.login-screen .login-btn { color: #FFFFFF; }
`,
}
