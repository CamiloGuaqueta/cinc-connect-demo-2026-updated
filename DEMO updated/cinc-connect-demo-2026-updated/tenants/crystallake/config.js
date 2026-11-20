// Crystal Lake Community Management prospect demo → served at /crystallake
// Built by `vite build --mode crystallake` (see vite.config.js). Source code is never
// edited: every string below is swapped at build time in src/**/*.{js,jsx,css}.
// Logo + colors from Diego's pack (Custom Connect Demos 03, 20/11/2026); brand site: crystallakecm.com (Bend, OR).
// DARK theme (Diego): page #333333, cards #474747, text #FFFFFF, accent sage #6C9E8F. Same dark
// template as /cummings: theme variables are swapped one by one so fixed surfaces keep working.

const PRIMARY    = '#6C9E8F'   // titles, icons, buttons (sage)
const CARD       = '#4F7D70'   // payment card
const NAV_BAR    = '#2A2A2A'
const NAV_ICON   = '#FFFFFF'
const NAV_ACTIVE = '#6C9E8F'

export default {
  id: 'crystallake',
  title: 'Crystal Lake Community Management · Connect Demo',
  themeColor: '#333333',
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
    ['Pinecrest Blvd',       'Ponderosa Blvd'],
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

    // CINC palette → Crystal Lake DARK palette
    // Theme variables (index.css :root defaults + theme.js light preset)
    ['--res-bg1:    #E9EEEA;', '--res-bg1:    #333333;'],
    ['--res-bg2:    #FFFFFF;', '--res-bg2:    #474747;'],
    ['--res-text:   #171B19;', '--res-text:   #FFFFFF;'],
    ['--res-accent: #006A52;', '--res-accent: #6C9E8F;'],
    ['--res-border: #CBCACD;', '--res-border: rgba(255,255,255,0.18);'],
    // Global text color (login and anything rendered outside .resident-mode)
    ['--text:         #171B19;', '--text:         #FFFFFF;'],
    ["'--res-bg1':    '#E9EEEA'", "'--res-bg1':    '#333333'"],
    ["'--res-bg2':    '#FFFFFF'", "'--res-bg2':    '#474747'"],
    ["'--res-text':   '#171B19'", "'--res-text':   '#FFFFFF'"],
    ["'--res-accent': '#006A52'", "'--res-accent': '#6C9E8F'"],
    ["'--res-border': '#CBCACD'", "'--res-border': 'rgba(255,255,255,0.18)'"],
    // Remaining hard-coded CINC colors: page bg → charcoal, fixed brand surfaces (PDF headers,
    // illustrated cards) → deep sage, mint tints → soft sage, deep green logo color → charcoal
    [/#E9EEEA/gi, '#333333'],
    [/#006A52/gi, '#4F7D70'],
    [/#00553F/gi, '#3E6458'],
    [/#002D28/gi, '#333333'],
    [/#D9E9E3/gi, '#E2EEEA'],
    [/#CBCACD/gi, '#5A5A5A'],
    // Dark theme contrast: secondary text is white at 30-60% → 75% (on #474747 cards
    // 45% white is too faint); alert reds → light pink so they read on charcoal
    [/color-mix\(in srgb, var\(--text\) (3\d|4\d|5\d|60)%, transparent\)/g, 'color-mix(in srgb, var(--text) 75%, transparent)'],
    [/#E05C5C/gi, '#FFB4B4'],
    [/#FF6B62/gi, '#FFB4B4'],
    // CSS filter that tints <img> icons Evergreen → sage accent
    ['brightness(0) saturate(100%) invert(27%) sepia(87%) saturate(1530%) hue-rotate(143deg) brightness(93%) contrast(101%)',
     'brightness(0) saturate(100%) invert(58%) sepia(22%) saturate(463%) hue-rotate(111deg) brightness(96%) contrast(86%)'],
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
.phone-frame .resident-nav__item--active .resident-nav__label { color: #FFFFFF; }

/* Payment card */
.phone-frame .acct-card { background: ${CARD}; }

body .layout-toggle { color: #FFFFFF; border-color: ${PRIMARY}; background: #1E1E1E; }
body .layout-toggle:hover { border-color: ${PRIMARY}; }

.login-screen .login-logo-lockup { width: auto; height: auto; display: flex; flex-direction: column; align-items: center; }
.login-screen .login-logo { position: static; width: 250px; height: auto; object-position: center; }
.login-screen .login-connecplus { display: none; }
/* Dark theme: <img> icons drawn in CINC Ink → white */
.login-screen .login-faceid { filter: brightness(0) invert(1); opacity: 0.85; }
`,
}
