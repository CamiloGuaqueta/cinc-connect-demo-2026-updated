// Metro Group Management prospect demo → served at /metro
// Built by `vite build --mode metro` (see vite.config.js). Source code is never
// edited: every string below is swapped at build time in src/**/*.{js,jsx,css}.
// Logo + colors from Diego's pack (Custom Connect Demos 02, 11/2026); brand site: metrogroupmanagement.com (Keego Harbor, MI).

const PRIMARY    = '#406595'   // titles, icons, buttons
const CARD       = '#406595'   // payment card
const NAV_BAR    = '#FFFFFF'
const NAV_ICON   = '#313131'
const NAV_ACTIVE = '#406595'

export default {
  id: 'metro',
  title: 'Metro Group Management · Connect Demo',
  themeColor: '#FFFFFF',
  favicon: '/tenants/metro/icon.png',

  assets: {
    'src/images/splash-bg.jpg':  'public/tenants/metro/splash.jpg',
    'src/images/login-logo.svg': 'public/tenants/metro/logo.png',
  },

  // Ordered: specific strings before generic ones
  replace: [
    // Community + streets (fictional HOA — not one of the prospect's real communities)
    ['Cardinal Hills Drive', 'Walnut Ridge Drive'],
    ['Cardinal Hills Dr',    'Walnut Ridge Dr'],
    ['Cardinal Point Road',  'Walnut Point Road'],
    ['Cardinal Point Rd',    'Walnut Point Rd'],
    ['Cardinal Way',         'Walnut Way'],
    ['Cardinal Heights',     'Walnut Heights'],
    ['Pinecrest Loop',       'Birch Loop'],
    ['Hillcrest Loop',       'Aspen Loop'],
    ['Ridgeline Pass',       'Clinton River View Pass'],
    ['Cardinal Hills',       'Walnut Ridge'],
    ['Cardinal ',            'Walnut '],
    ['cardinalhills',        'walnutridge'],
    ['cardinalrealty',       'walnutrealty'],
    [/\bCH([:-])(\d)/g,      'WR$1$2'],

    // Management company
    ['East Management',      'Metro Group Management'],

    // Cities
    ['Miami, FL 33130',      'Keego Harbor, MI 48320'],
    ['Miami FL 33130',       'Keego Harbor MI 48320'],
    [/Miami, FL 331(\d\d)/g, 'Keego Harbor, MI 483$1'],
    ['Los Altos, CA 94023',  'West Bloomfield, MI 48322'],
    ['Saratoga, CA 95070',   'Bloomfield Hills, MI 48302'],
    ['Campbell, CA 95008',   'Troy, MI 48084'],
    ['Santa Clara, CA 95051','Rochester Hills, MI 48307'],
    ['San Jose, CA 95112',   'Novi, MI 48375'],
    ['Los Gatos, CA 95032',  'Farmington Hills, MI 48334'],
    // Blog / Market Index location (source canon: Miami-Dade, South Florida, 305)
    ['Miami-Dade County',    'Oakland County'],
    ['South Florida continues', 'Metro Detroit continues'],
    ['South Florida',        'Metro Detroit'],
    ['(305) 555-0192',       '(248) 555-0192'],

    // HOA avatar
    ['/images/cinc-icon.png', '/tenants/metro/icon.png'],

    // CINC palette → Metro Group Management palette (theme presets, :root defaults, fixed surfaces)
    [/#006A52/gi, PRIMARY],
    [/#00553F/gi, '#33517A'],
    [/#002D28/gi, PRIMARY],
    [/#171B19/gi, '#313131'],
    [/#E9EEEA/gi, '#FFFFFF'],
    [/#D9E9E3/gi, '#E3EAF3'],
    [/#CBCACD/gi, '#E2E2E2'],
    // Cards ("element" color)
    ["'--res-bg2':    '#FFFFFF'", "'--res-bg2':    '#E6E6CC'"],
    ['--res-bg2:    #FFFFFF;', '--res-bg2:    #E6E6CC;'],
    // CSS filter that tints <img> icons Evergreen → primary
    ['brightness(0) saturate(100%) invert(27%) sepia(87%) saturate(1530%) hue-rotate(143deg) brightness(93%) contrast(101%)',
     'brightness(0) saturate(100%) invert(39%) sepia(15%) saturate(1893%) hue-rotate(174deg) brightness(87%) contrast(81%)'],
  ],

  // Appended to src/index.css
  css: `
/* ── metro tenant overrides (prefixed for specificity over per-screen CSS) ── */
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
/* The login button uses the card color for its text; the beige cards need white text instead */
.login-screen .login-btn { color: #FFFFFF; }
`,
}
