// Cedar Management prospect demo → served at /cedar
// Built by `vite build --mode cedar` (see vite.config.js). Source code is never
// edited: every string below is swapped at build time in src/**/*.{js,jsx,css}.
// Logo + colors from Diego's pack (Custom Connect Demos 02, 11/2026); brand site: cedarmanagement.com (Fridley, MN).

const PRIMARY    = '#195CA0'   // titles, icons, buttons
const CARD       = '#195CA0'   // payment card
const NAV_BAR    = '#FFFFFF'
const NAV_ICON   = '#313131'
const NAV_ACTIVE = '#195CA0'

export default {
  id: 'cedar',
  title: 'Cedar Management · Connect Demo',
  themeColor: '#FCF9EC',
  favicon: '/tenants/cedar/icon.png',

  assets: {
    'src/images/splash-bg.jpg':  'public/tenants/cedar/splash.jpg',
    'src/images/login-logo.svg': 'public/tenants/cedar/logo.png',
  },

  // Ordered: specific strings before generic ones
  replace: [
    // Community + streets (fictional HOA — not one of the prospect's real communities)
    ['Cardinal Hills Drive', 'Northwood Lakes Drive'],
    ['Cardinal Hills Dr',    'Northwood Lakes Dr'],
    ['Cardinal Point Road',  'Northwood Point Road'],
    ['Cardinal Point Rd',    'Northwood Point Rd'],
    ['Cardinal Way',         'Northwood Way'],
    ['Cardinal Heights',     'Northwood Heights'],
    ['Pinecrest Loop',       'Basswood Loop'],
    ['Hillcrest Loop',       'Spruce Loop'],
    ['Ridgeline Pass',       'Mississippi View Pass'],
    ['Cardinal Hills',       'Northwood Lakes'],
    ['Cardinal ',            'Northwood '],
    ['cardinalhills',        'northwoodlakes'],
    ['cardinalrealty',       'northwoodrealty'],
    [/\bCH([:-])(\d)/g,      'NL$1$2'],

    // Management company
    ['East Management',      'Cedar Management'],

    // Cities
    ['Miami, FL 33130',      'Fridley, MN 55432'],
    ['Miami FL 33130',       'Fridley MN 55432'],
    [/Miami, FL 331(\d\d)/g, 'Fridley, MN 554$1'],
    ['Los Altos, CA 94023',  'Blaine, MN 55434'],
    ['Saratoga, CA 95070',   'Coon Rapids, MN 55433'],
    ['Campbell, CA 95008',   'Columbia Heights, MN 55421'],
    ['Santa Clara, CA 95051','Roseville, MN 55113'],
    ['San Jose, CA 95112',   'Maple Grove, MN 55369'],
    ['Los Gatos, CA 95032',  'Minneapolis, MN 55401'],
    // Blog / Market Index location (source canon: Miami-Dade, South Florida, 305)
    ['Miami-Dade County',    'Anoka County'],
    ['South Florida continues', 'the Twin Cities continues'],
    ['South Florida',        'the Twin Cities'],
    ['(305) 555-0192',       '(763) 555-0192'],

    // HOA avatar
    ['/images/cinc-icon.png', '/tenants/cedar/icon.png'],

    // CINC palette → Cedar Management palette (theme presets, :root defaults, fixed surfaces)
    [/#006A52/gi, PRIMARY],
    [/#00553F/gi, '#144A80'],
    [/#002D28/gi, PRIMARY],
    [/#171B19/gi, '#313131'],
    [/#E9EEEA/gi, '#FCF9EC'],
    [/#D9E9E3/gi, '#E2EBF5'],
    [/#CBCACD/gi, '#E2E2E2'],
    // Cards ("element" color), cream per Diego
    ["'--res-bg2':    '#FFFFFF'", "'--res-bg2':    '#F4F0DD'"],
    ['--res-bg2:    #FFFFFF;', '--res-bg2:    #F4F0DD;'],
    // CSS filter that tints <img> icons Evergreen → primary
    ['brightness(0) saturate(100%) invert(27%) sepia(87%) saturate(1530%) hue-rotate(143deg) brightness(93%) contrast(101%)',
     'brightness(0) saturate(100%) invert(29%) sepia(91%) saturate(1146%) hue-rotate(188deg) brightness(78%) contrast(89%)'],
  ],

  // Appended to src/index.css
  css: `
/* ── cedar tenant overrides (prefixed for specificity over per-screen CSS) ── */
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
.login-screen .login-logo { position: static; width: 200px; height: auto; object-position: center; margin-top: 18px; }  /* taller logo */
.login-screen .login-connecplus { display: none; }
/* The login button uses the card color for its text; keep it white on the accent */
.login-screen .login-btn { color: #FFFFFF; }
`,
}
