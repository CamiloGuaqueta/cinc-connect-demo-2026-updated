// Lago Vista POA prospect demo → served at /lagovista
// Built by `vite build --mode lagovista` (see vite.config.js). Source code is never
// edited: every string below is swapped at build time in src/**/*.{js,jsx,css}.
// Logo + colors from Diego's pack (Custom Connect Demos 1, 11/2026); brand site: lvpoa.org (Lago Vista, TX).
// LVPOA is itself an association (Lake Travis, TX); demo uses a fictional POA so delinquencies/violations are not tied to the real one.

const PRIMARY    = '#1980C9'   // titles, icons, buttons
const CARD       = '#12649E'   // payment card
const NAV_BAR    = '#FFFFFF'
const NAV_ICON   = '#313131'
const NAV_ACTIVE = '#1980C9'

export default {
  id: 'lagovista',
  title: 'Lago Vista POA · Connect Demo',
  themeColor: '#F7F9F8',
  favicon: '/tenants/lagovista/icon.png',

  assets: {
    'src/images/splash-bg.jpg':  'public/tenants/lagovista/splash.jpg',
    'src/images/login-logo.svg': 'public/tenants/lagovista/logo.png',
  },

  // Ordered: specific strings before generic ones
  replace: [
    // Community + streets (fictional HOA — not one of the prospect's real communities)
    ['Cardinal Hills HOA',   'Cedar Shores POA'],
    ['Cardinal Hills Drive', 'Cedar Shores Drive'],
    ['Cardinal Hills Dr',    'Cedar Shores Dr'],
    ['Cardinal Point Road',  'Cedar Point Road'],
    ['Cardinal Point Rd',    'Cedar Point Rd'],
    ['Cardinal Way',         'Cedar Way'],
    ['Cardinal Heights',     'Cedar Heights'],
    ['Pinecrest Loop',       'Juniper Loop'],
    ['Hillcrest Loop',       'Mockingbird Loop'],
    ['Ridgeline Pass',       'Hill Country Pass'],
    ['Cardinal Hills',       'Cedar Shores'],
    ['Cardinal ',            'Cedar '],
    ['cardinalhills',        'cedarshores'],
    ['cardinalrealty',       'cedarrealty'],
    [/\bCH([:-])(\d)/g,      'CS$1$2'],

    // Management company
    ['East Management',      'Cedar Shores POA Office'],

    // Cities
    ['Miami, FL 33130',      'Leander, TX 78641'],
    [/Miami, FL 331(\d\d)/g, 'Austin, TX 787$1'],
    ['Los Altos, CA 94023',  'Cedar Park, TX 78613'],
    ['Saratoga, CA 95070',   'Jonestown, TX 78645'],
    ['Campbell, CA 95008',   'Marble Falls, TX 78654'],
    ['Santa Clara, CA 95051','Round Rock, TX 78664'],
    ['San Jose, CA 95112',   'Georgetown, TX 78628'],
    ['Los Gatos, CA 95032',  'Spicewood, TX 78669'],
    // Blog / Market Index location (source canon: Miami-Dade, South Florida, 305)
    ['Miami-Dade County',    'Travis County'],
    ['South Florida continues', 'Central Texas continues'],
    ['South Florida',        'Central Texas'],
    ['(305) 555-0192',       '(512) 555-0192'],

    // HOA avatar
    ['/images/cinc-icon.png', '/tenants/lagovista/icon.png'],

    // CINC palette → Lago Vista POA palette (theme presets, :root defaults, fixed surfaces)
    [/#006A52/gi, PRIMARY],
    [/#00553F/gi, '#12649E'],
    [/#002D28/gi, PRIMARY],
    [/#171B19/gi, '#313131'],
    [/#E9EEEA/gi, '#F7F9F8'],
    [/#D9E9E3/gi, '#E1EEF8'],
    [/#CBCACD/gi, '#E2E2E2'],
    // CSS filter that tints <img> icons Evergreen → primary
    ['brightness(0) saturate(100%) invert(27%) sepia(87%) saturate(1530%) hue-rotate(143deg) brightness(93%) contrast(101%)',
     'brightness(0) saturate(100%) invert(45%) sepia(25%) saturate(1858%) hue-rotate(166deg) brightness(90%) contrast(97%)'],
  ],

  // Appended to src/index.css
  css: `
/* ── lagovista tenant overrides (prefixed for specificity over per-screen CSS) ── */
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
.login-screen .login-logo { position: static; width: 250px; height: auto; object-position: center; }
.login-screen .login-connecplus { display: none; }
`,
}
