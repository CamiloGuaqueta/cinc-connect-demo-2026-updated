// Vintage Group prospect demo → served at /vintage
// Built by `vite build --mode vintage` (see vite.config.js). Source code is never
// edited: every string below is swapped at build time in src/**/*.{js,jsx,css}.
// Logo + colors from Diego's pack (Custom Connect Demos 02, 11/2026); brand site: vintagegroupre.com (Rancho Santa Margarita, CA).

const PRIMARY    = '#D92D37'   // titles, icons, buttons
const CARD       = '#313131'   // payment card
const NAV_BAR    = '#FFFFFF'
const NAV_ICON   = '#313131'
const NAV_ACTIVE = '#D92D37'

export default {
  id: 'vintage',
  title: 'Vintage Group · Connect Demo',
  themeColor: '#FFFFFF',
  favicon: '/tenants/vintage/icon.png',

  assets: {
    'src/images/splash-bg.jpg':  'public/tenants/vintage/splash.jpg',
    'src/images/login-logo.svg': 'public/tenants/vintage/logo.png',
  },

  // Ordered: specific strings before generic ones
  replace: [
    // Community + streets (fictional HOA — not one of the prospect's real communities)
    ['Cardinal Hills Drive', 'Saddleback Ridge Drive'],
    ['Cardinal Hills Dr',    'Saddleback Ridge Dr'],
    ['Cardinal Point Road',  'Saddleback Point Road'],
    ['Cardinal Point Rd',    'Saddleback Point Rd'],
    ['Cardinal Way',         'Saddleback Way'],
    ['Cardinal Heights',     'Saddleback Heights'],
    ['Pinecrest Loop',       'Sycamore Loop'],
    ['Hillcrest Loop',       'Toyon Loop'],
    ['Ridgeline Pass',       'Trabuco Canyon View Pass'],
    ['Cardinal Hills',       'Saddleback Ridge'],
    ['Cardinal ',            'Saddleback '],
    ['cardinalhills',        'saddlebackridge'],
    ['cardinalrealty',       'saddlebackrealty'],
    [/\bCH([:-])(\d)/g,      'SR$1$2'],

    // Management company
    ['East Management',      'Vintage Group'],

    // Cities
    ['Miami, FL 33130',      'Rancho Santa Margarita, CA 92688'],
    ['Miami FL 33130',       'Rancho Santa Margarita CA 92688'],
    [/Miami, FL 331(\d\d)/g, 'Rancho Santa Margarita, CA 926$1'],
    ['Los Altos, CA 94023',  'Mission Viejo, CA 92691'],
    ['Saratoga, CA 95070',   'Ladera Ranch, CA 92694'],
    ['Campbell, CA 95008',   'Lake Forest, CA 92630'],
    ['Santa Clara, CA 95051','Irvine, CA 92618'],
    ['San Jose, CA 95112',   'Laguna Niguel, CA 92677'],
    ['Los Gatos, CA 95032',  'San Clemente, CA 92672'],
    // Blog / Market Index location (source canon: Miami-Dade, South Florida, 305)
    ['Miami-Dade County',    'Orange County'],
    ['South Florida continues', 'Southern California continues'],
    ['South Florida',        'Southern California'],
    ['(305) 555-0192',       '(949) 555-0192'],
    ['305.555.',            '949.555.'],   // ACC/WO/vendor phones in Tasks.jsx

    // HOA avatar
    ['/images/cinc-icon.png', '/tenants/vintage/icon.png'],

    // CINC palette → Vintage Group palette (theme presets, :root defaults, fixed surfaces)
    [/#006A52/gi, PRIMARY],
    [/#00553F/gi, '#B3222B'],
    [/#002D28/gi, PRIMARY],
    [/#171B19/gi, '#313131'],
    [/#E9EEEA/gi, '#FFFFFF'],
    [/#D9E9E3/gi, '#FBE3E5'],
    [/#CBCACD/gi, '#E2E2E2'],
    // Cards ("element" color) on a white page
    ["'--res-bg2':    '#FFFFFF'", "'--res-bg2':    '#F2F2F2'"],
    ['--res-bg2:    #FFFFFF;', '--res-bg2:    #F2F2F2;'],
    // CSS filter that tints <img> icons Evergreen → primary
    ['brightness(0) saturate(100%) invert(27%) sepia(87%) saturate(1530%) hue-rotate(143deg) brightness(93%) contrast(101%)',
     'brightness(0) saturate(100%) invert(25%) sepia(61%) saturate(5706%) hue-rotate(345deg) brightness(91%) contrast(86%)'],
  ],

  // Appended to src/index.css
  css: `
/* ── vintage tenant overrides (prefixed for specificity over per-screen CSS) ── */
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
.login-screen .login-logo { position: static; width: 240px; height: auto; object-position: center; }
.login-screen .login-connecplus { display: none; }
`,
}
