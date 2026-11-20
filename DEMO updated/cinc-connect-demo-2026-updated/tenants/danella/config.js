// Danella Realty & Management prospect demo → served at /danella
// Built by `vite build --mode danella` (see vite.config.js). Source code is never
// edited: every string below is swapped at build time in src/**/*.{js,jsx,css}.
// Logo + colors from Diego's pack (Custom Connect Demos 03, 20/11/2026); brand site: danellarealty.com (Blue Bell, PA).

const PRIMARY    = '#25517F'   // titles, icons, buttons
const CARD       = '#25517F'   // payment card
const NAV_BAR    = '#FFFFFF'
const NAV_ICON   = '#313131'
const NAV_ACTIVE = '#25517F'

export default {
  id: 'danella',
  title: 'Danella Realty & Management · Connect Demo',
  themeColor: '#FFFFFF',
  favicon: '/tenants/danella/icon.png',

  assets: {
    'src/images/splash-bg.jpg':  'public/tenants/danella/splash.jpg',
    'src/images/login-logo.svg': 'public/tenants/danella/logo.png',
  },

  // Ordered: specific strings before generic ones
  replace: [
    // Community + streets (fictional HOA — not one of the prospect's real communities)
    ['Cardinal Hills Drive', 'Skippack Ridge Drive'],
    ['Cardinal Hills Dr',    'Skippack Ridge Dr'],
    ['Cardinal Point Road',  'Skippack Point Road'],
    ['Cardinal Point Rd',    'Skippack Point Rd'],
    ['Cardinal Way',         'Skippack Way'],
    ['Cardinal Heights',     'Skippack Heights'],
    ['Pinecrest Loop',       'Laurel Loop'],
    ['Hillcrest Loop',       'Hemlock Loop'],
    ['Ridgeline Pass',       'Perkiomen View Pass'],
    ['Cardinal Hills',       'Skippack Ridge'],
    ['Cardinal ',            'Skippack '],
    ['cardinalhills',        'skippackridge'],
    ['cardinalrealty',       'skippackrealty'],
    [/\bCH([:-])(\d)/g,      'SK$1$2'],

    // Management company
    ['East Management',      'Danella Realty & Management'],

    // Cities
    ['Miami, FL 33130',      'Blue Bell, PA 19422'],
    ['Miami FL 33130',       'Blue Bell PA 19422'],
    [/Miami, FL 331(\d\d)/g, 'Blue Bell, PA 194$1'],
    ['Los Altos, CA 94023',  'Plymouth Meeting, PA 19462'],
    ['Saratoga, CA 95070',   'Lansdale, PA 19446'],
    ['Campbell, CA 95008',   'Ambler, PA 19002'],
    ['Santa Clara, CA 95051','Norristown, PA 19401'],
    ['San Jose, CA 95112',   'King of Prussia, PA 19406'],
    ['Los Gatos, CA 95032',  'Conshohocken, PA 19428'],
    // Blog / Market Index location (source canon: Miami-Dade, South Florida, 305)
    ['Miami-Dade County',    'Montgomery County'],
    ['South Florida continues', 'Greater Philadelphia continues'],
    ['South Florida',        'Greater Philadelphia'],
    ['(305) 555-0192',       '(610) 555-0192'],
    ['305.555.',            '610.555.'],   // ACC/WO/vendor phones in Tasks.jsx

    // HOA avatar
    ['/images/cinc-icon.png', '/tenants/danella/icon.png'],

    // CINC palette → Danella palette (theme presets, :root defaults, fixed surfaces)
    [/#006A52/gi, PRIMARY],
    [/#00553F/gi, '#1C3F63'],
    [/#002D28/gi, PRIMARY],
    [/#171B19/gi, '#313131'],
    [/#E9EEEA/gi, '#FFFFFF'],
    [/#D9E9E3/gi, '#E1E9F2'],
    [/#CBCACD/gi, '#E2E2E2'],
    // Cards ("element" color)
    ["'--res-bg2':    '#FFFFFF'", "'--res-bg2':    '#FAFAFA'"],
    ['--res-bg2:    #FFFFFF;', '--res-bg2:    #FAFAFA;'],
    // CSS filter that tints <img> icons Evergreen → primary
    ['brightness(0) saturate(100%) invert(27%) sepia(87%) saturate(1530%) hue-rotate(143deg) brightness(93%) contrast(101%)',
     'brightness(0) saturate(100%) invert(22%) sepia(74%) saturate(942%) hue-rotate(180deg) brightness(94%) contrast(82%)'],
  ],

  // Appended to src/index.css
  css: `
/* ── danella tenant overrides (prefixed for specificity over per-screen CSS) ── */
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
.login-screen .login-logo { position: static; width: 200px; height: auto; object-position: center; margin-top: 18px; }
.login-screen .login-connecplus { display: none; }
/* The login button uses the card color for its text; the light cards need white text instead */
.login-screen .login-btn { color: #FFFFFF; }
`,
}
