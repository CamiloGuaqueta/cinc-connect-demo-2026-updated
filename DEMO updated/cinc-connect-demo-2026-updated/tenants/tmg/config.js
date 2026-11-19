// The Management Group prospect demo → served at /tmg
// Built by `vite build --mode tmg` (see vite.config.js). Source code is never
// edited: every string below is swapped at build time in src/**/*.{js,jsx,css}.
// Logo + colors from Diego's pack (Custom Connect Demos 02, 11/2026); brand site: themanagementgroups.com (St. George, UT).

const PRIMARY    = '#144282'   // titles, icons, buttons
const CARD       = '#144282'   // payment card
const NAV_BAR    = '#FFFFFF'
const NAV_ICON   = '#313131'
const NAV_ACTIVE = '#144282'

export default {
  id: 'tmg',
  title: 'The Management Group · Connect Demo',
  themeColor: '#F2F2F2',
  favicon: '/tenants/tmg/icon.png',

  assets: {
    'src/images/splash-bg.jpg':  'public/tenants/tmg/splash.jpg',
    'src/images/login-logo.svg': 'public/tenants/tmg/logo.png',
  },

  // Ordered: specific strings before generic ones
  replace: [
    // Community + streets (fictional HOA — not one of the prospect's real communities)
    ['Cardinal Hills Drive', 'Sandstone Ridge Drive'],
    ['Cardinal Hills Dr',    'Sandstone Ridge Dr'],
    ['Cardinal Point Road',  'Sandstone Point Road'],
    ['Cardinal Point Rd',    'Sandstone Point Rd'],
    ['Cardinal Way',         'Sandstone Way'],
    ['Cardinal Heights',     'Sandstone Heights'],
    ['Pinecrest Loop',       'Desert Willow Loop'],
    ['Hillcrest Loop',       'Sagebrush Loop'],
    ['Ridgeline Pass',       'Virgin River View Pass'],
    ['Cardinal Hills',       'Sandstone Ridge'],
    ['Cardinal ',            'Sandstone '],
    ['cardinalhills',        'sandstoneridge'],
    ['cardinalrealty',       'sandstonerealty'],
    [/\bCH([:-])(\d)/g,      'SS$1$2'],

    // Management company
    ['East Management',      'The Management Group'],

    // Cities
    ['Miami, FL 33130',      'St. George, UT 84790'],
    ['Miami FL 33130',       'St. George UT 84790'],
    [/Miami, FL 331(\d\d)/g, 'St. George, UT 847$1'],
    ['Los Altos, CA 94023',  'Washington, UT 84780'],
    ['Saratoga, CA 95070',   'Hurricane, UT 84737'],
    ['Campbell, CA 95008',   'Ivins, UT 84738'],
    ['Santa Clara, CA 95051','Santa Clara, UT 84765'],
    ['San Jose, CA 95112',   'Cedar City, UT 84720'],
    ['Los Gatos, CA 95032',  'Leeds, UT 84746'],
    // Blog / Market Index location (source canon: Miami-Dade, South Florida, 305)
    ['Miami-Dade County',    'Washington County'],
    ['South Florida continues', 'Southern Utah continues'],
    ['South Florida',        'Southern Utah'],
    ['(305) 555-0192',       '(435) 555-0192'],

    // HOA avatar
    ['/images/cinc-icon.png', '/tenants/tmg/icon.png'],

    // CINC palette → The Management Group palette (theme presets, :root defaults, fixed surfaces)
    [/#006A52/gi, PRIMARY],
    [/#00553F/gi, '#0F3466'],
    [/#002D28/gi, PRIMARY],
    [/#171B19/gi, '#313131'],
    [/#E9EEEA/gi, '#F2F2F2'],
    [/#D9E9E3/gi, '#E1E8F2'],
    [/#CBCACD/gi, '#E2E2E2'],
    // Cards ("element" color)
    ["'--res-bg2':    '#FFFFFF'", "'--res-bg2':    '#FFFFFF'"],
    ['--res-bg2:    #FFFFFF;', '--res-bg2:    #FFFFFF;'],
    // CSS filter that tints <img> icons Evergreen → primary
    ['brightness(0) saturate(100%) invert(27%) sepia(87%) saturate(1530%) hue-rotate(143deg) brightness(93%) contrast(101%)',
     'brightness(0) saturate(100%) invert(17%) sepia(30%) saturate(4665%) hue-rotate(203deg) brightness(95%) contrast(90%)'],
  ],

  // Appended to src/index.css
  css: `
/* ── tmg tenant overrides (prefixed for specificity over per-screen CSS) ── */
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
/* The login button uses the card color for its text; keep it white on the accent */
.login-screen .login-btn { color: #FFFFFF; }
`,
}
