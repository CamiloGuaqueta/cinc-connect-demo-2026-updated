// Vaughan Group prospect demo → served at /vaughan
// Built by `vite build --mode vaughan` (see vite.config.js). Source code is never
// edited: every string below is swapped at build time in src/**/*.{js,jsx,css}.
// No Diego pack: logo + colors taken from the prospect's site (20/11/2026).

const PRIMARY    = '#144994'   // titles, icons, buttons
const CARD       = '#144994'   // payment card
const NAV_BAR    = '#FFFFFF'
const NAV_ICON   = '#313131'
const NAV_ACTIVE = '#144994'

export default {
  id: 'vaughan',
  title: 'Vaughan Group · Connect Demo',
  themeColor: '#FFFFFF',
  favicon: '/tenants/vaughan/icon.png',

  assets: {
    'src/images/splash-bg.jpg':  'public/tenants/vaughan/splash.jpg',
    'src/images/login-logo.svg': 'public/tenants/vaughan/logo.png',
  },

  // Ordered: specific strings before generic ones
  replace: [
    // Community + streets (fictional HOA — not one of the prospect's real communities)
    ['Cardinal Hills Drive', 'Olentangy Glen Drive'],
    ['Cardinal Hills Dr',    'Olentangy Glen Dr'],
    ['Cardinal Point Road',  'Olentangy Point Road'],
    ['Cardinal Point Rd',    'Olentangy Point Rd'],
    ['Cardinal Way',         'Olentangy Way'],
    ['Cardinal Heights',     'Olentangy Heights'],
    ['Pinecrest Loop',       'Buckeye Loop'],
    ['Hillcrest Loop',       'Hackberry Loop'],
    ['Ridgeline Pass',       'Scioto River View Pass'],
    ['Cardinal Hills',       'Olentangy Glen'],
    ['Cardinal ',            'Olentangy '],
    ['cardinalhills',        'olentangyglen'],
    ['cardinalrealty',       'olentangyrealty'],
    [/\bCH([:-])(\d)/g,      'OG$1$2'],

    // Management company
    ['East Management',      'Vaughan Group'],

    // Cities
    ['Miami, FL 33130',      'Dublin, OH 43017'],
    ['Miami FL 33130',       'Dublin OH 43017'],
    [/Miami, FL 331(\d\d)/g, 'Dublin, OH 430$1'],
    ['Los Altos, CA 94023',  'Powell, OH 43065'],
    ['Saratoga, CA 95070',   'Hilliard, OH 43026'],
    ['Campbell, CA 95008',   'Worthington, OH 43085'],
    ['Santa Clara, CA 95051','Westerville, OH 43081'],
    ['San Jose, CA 95112',   'Upper Arlington, OH 43221'],
    ['Los Gatos, CA 95032',  'Plain City, OH 43064'],
    // Blog / Market Index location (source canon: Miami-Dade, South Florida, 305)
    ['Miami-Dade County',    'Franklin County'],
    ['South Florida continues', 'Central Ohio continues'],
    ['South Florida',        'Central Ohio'],
    ['(305) 555-0192',       '(614) 555-0192'],

    // HOA avatar
    ['/images/cinc-icon.png', '/tenants/vaughan/icon.png'],

    // CINC palette → Vaughan Group palette (theme presets, :root defaults, fixed surfaces)
    [/#006A52/gi, PRIMARY],
    [/#00553F/gi, '#0F3873'],
    [/#002D28/gi, PRIMARY],
    [/#171B19/gi, '#313131'],
    [/#E9EEEA/gi, '#FFFFFF'],
    [/#D9E9E3/gi, '#E3EAF5'],
    [/#CBCACD/gi, '#E2E2E2'],
    // Cards: soft blue-gray tint of the primary
    ["'--res-bg2':    '#FFFFFF'", "'--res-bg2':    '#EEF2F7'"],
    ['--res-bg2:    #FFFFFF;', '--res-bg2:    #EEF2F7;'],
    // CSS filter that tints <img> icons Evergreen → primary
    ['brightness(0) saturate(100%) invert(27%) sepia(87%) saturate(1530%) hue-rotate(143deg) brightness(93%) contrast(101%)',
     'brightness(0) saturate(100%) invert(17%) sepia(73%) saturate(2238%) hue-rotate(204deg) brightness(98%) contrast(90%)'],
  ],

  // Appended to src/index.css
  css: `
/* ── vaughan tenant overrides (prefixed for specificity over per-screen CSS) ── */
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
