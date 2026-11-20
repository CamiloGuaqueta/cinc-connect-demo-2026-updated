// Cummings Property Management prospect demo → served at /cummings
// Built by `vite build --mode cummings` (see vite.config.js). Source code is never
// edited: every string below is swapped at build time in src/**/*.{js,jsx,css}.
// Logo + colors from Diego's pack (Custom Connect Demos 1, 11/2026; 17/11/2026 build); brand site: cummingsmanagement.com (Flint, MI).
// DARK theme (Diego): page #272361, cards #A41D4A, text #FFFFFF, accent #F3F4F7. The theme
// variables are swapped one by one (not a global #171B19/#FFFFFF swap) so fixed surfaces
// such as the payment card and PDFs keep working.

const PRIMARY    = '#F3F4F7'   // titles, icons, buttons (near-white on navy)
const CARD       = '#1A1747'   // payment card
const NAV_BAR    = '#272361'
const NAV_ICON   = '#FFFFFF'
const NAV_ACTIVE = '#A41D4A'

export default {
  id: 'cummings',
  title: 'Cummings Property Management · Connect Demo',
  themeColor: '#272361',
  favicon: '/tenants/cummings/icon.png',

  assets: {
    'src/images/splash-bg.jpg':  'public/tenants/cummings/splash.jpg',
    'src/images/login-logo.svg': 'public/tenants/cummings/logo.png',
  },

  // Ordered: specific strings before generic ones
  replace: [
    // Community + streets (fictional HOA — not one of the prospect's real communities)
    ['Cardinal Hills Drive', 'Huron Pines Drive'],
    ['Cardinal Hills Dr',    'Huron Pines Dr'],
    ['Cardinal Point Road',  'Huron Point Road'],
    ['Cardinal Point Rd',    'Huron Point Rd'],
    ['Cardinal Way',         'Huron Way'],
    ['Cardinal Heights',     'Huron Heights'],
    ['Pinecrest Blvd',       'Tamarack Blvd'],
    ['Pinecrest Loop',       'Tamarack Loop'],
    ['Hillcrest Loop',       'White Pine Loop'],
    ['Ridgeline Pass',       'Flint River View Pass'],
    ['Cardinal Hills',       'Huron Pines'],
    ['Cardinal ',            'Huron '],
    ['cardinalhills',        'huronpines'],
    ['cardinalrealty',       'huronrealty'],
    [/\bCH([:-])(\d)/g,      'HP$1$2'],

    // Management company
    ['East Management',      'Cummings Property Management'],

    // Cities
    ['Miami, FL 33130', 'Grand Blanc, MI 48439'],
    ['Miami FL 33130',  'Grand Blanc MI 48439'],
    [/Miami, FL 331(\d\d)/g, 'Flint, MI 485$1'],
    ['Los Altos, CA 94023', 'Fenton, MI 48430'],
    ['Saratoga, CA 95070', 'Burton, MI 48509'],
    ['Campbell, CA 95008', 'Flushing, MI 48433'],
    ['Santa Clara, CA 95051', 'Davison, MI 48423'],
    ['San Jose, CA 95112', 'Swartz Creek, MI 48473'],
    ['Los Gatos, CA 95032', 'Clio, MI 48420'],
    // Blog / Market Index location (source canon: Miami-Dade, South Florida, 305)
    ['Miami-Dade County',    'Genesee County'],
    ['South Florida continues', 'Mid-Michigan continues'],
    ['South Florida',        'Mid-Michigan'],
    ['(305) 555-0192',       '(810) 555-0192'],
    ['305.555.',            '810.555.'],   // ACC/WO/vendor phones in Tasks.jsx

    // HOA avatar
    ['/images/cinc-icon.png', '/tenants/cummings/icon.png'],

    // CINC palette → Cummings DARK palette
    // Theme variables (index.css :root defaults + theme.js light preset)
    ['--res-bg1:    #E9EEEA;', '--res-bg1:    #272361;'],
    ['--res-bg2:    #FFFFFF;', '--res-bg2:    #A41D4A;'],
    ['--res-text:   #171B19;', '--res-text:   #FFFFFF;'],
    ['--res-accent: #006A52;', '--res-accent: #F3F4F7;'],
    ['--res-border: #CBCACD;', '--res-border: rgba(255,255,255,0.18);'],
    // Global text color (login and anything rendered outside .resident-mode)
    ['--text:         #171B19;', '--text:         #FFFFFF;'],
    ["'--res-bg1':    '#E9EEEA'", "'--res-bg1':    '#272361'"],
    ["'--res-bg2':    '#FFFFFF'", "'--res-bg2':    '#A41D4A'"],
    ["'--res-text':   '#171B19'", "'--res-text':   '#FFFFFF'"],
    ["'--res-accent': '#006A52'", "'--res-accent': '#F3F4F7'"],
    ["'--res-border': '#CBCACD'", "'--res-border': 'rgba(255,255,255,0.18)'"],
    // Remaining hard-coded CINC colors: page bg → navy, fixed brand surfaces (PDF headers,
    // illustrated cards) → magenta, mint tints → soft pink, deep green logo color → navy
    [/#E9EEEA/gi, '#272361'],
    [/#006A52/gi, '#A41D4A'],
    [/#00553F/gi, '#8A1840'],
    [/#002D28/gi, '#272361'],
    [/#D9E9E3/gi, '#F6E1E8'],
    [/#CBCACD/gi, '#4A4680'],
    // Dark theme contrast: secondary text is white at 30-60% → 75% (on magenta cards
    // 45% white is ~2.5:1); alert reds → light pink so they read on navy/magenta
    [/color-mix\(in srgb, var\(--text\) (3\d|4\d|5\d|60)%, transparent\)/g, 'color-mix(in srgb, var(--text) 75%, transparent)'],
    [/#E05C5C/gi, '#FFB4B4'],
    [/#FF6B62/gi, '#FFB4B4'],
    // CSS filter that tints <img> icons Evergreen → near-white accent
    ['brightness(0) saturate(100%) invert(27%) sepia(87%) saturate(1530%) hue-rotate(143deg) brightness(93%) contrast(101%)',
     'brightness(0) saturate(100%) invert(99%) sepia(23%) saturate(430%) hue-rotate(178deg) brightness(99%) contrast(95%)'],
  ],

  // Appended to src/index.css
  css: `
/* ── cummings tenant overrides (prefixed for specificity over per-screen CSS) ── */
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
.login-screen .login-logo { position: static; width: 230px; height: auto; object-position: center; }
.login-screen .login-connecplus { display: none; }
/* Dark theme: <img> icons drawn in CINC Ink → white */
.login-screen .login-faceid { filter: brightness(0) invert(1); opacity: 0.85; }
`,
}
