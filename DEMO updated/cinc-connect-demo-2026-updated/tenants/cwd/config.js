// CWD Group prospect demo → served at /cwd
// Built by `vite build --mode cwd` (see vite.config.js). Source code is never
// edited: every string below is swapped at build time in src/**/*.{js,jsx,css}.
// Logo + colors taken from cwdgroup.com (Seattle, WA); swap the files in
// public/tenants/cwd/ if official assets arrive.

const CWD_RED   = '#B5121B'   // titles, icons, buttons (cwdgroup.com red, a touch deeper for contrast)
const CWD_SLATE = '#273840'   // payment card, text accents (cwdgroup.com footer slate)

export default {
  id: 'cwd',
  title: 'CWD Group · Connect Demo',
  themeColor: '#F4F4F5',
  favicon: '/tenants/cwd/icon.png',

  assets: {
    'src/images/splash-bg.jpg':  'public/tenants/cwd/splash.jpg',
    'src/images/login-logo.svg': 'public/tenants/cwd/logo.png',
  },

  // Ordered: specific strings before generic ones
  replace: [
    // Community + streets (Puget Sound fictional HOA — not one of CWD's real communities)
    ['Cardinal Hills Drive', 'Cascade Ridge Drive'],
    ['Cardinal Hills Dr',    'Cascade Ridge Dr'],
    ['Cardinal Point Road',  'Cascade Point Road'],
    ['Cardinal Point Rd',    'Cascade Point Rd'],
    ['Cardinal Way',         'Cascade Way'],
    ['Cardinal Heights',     'Cascade Heights'],
    ['Pinecrest Loop',       'Cedar Loop'],
    ['Hillcrest Loop',       'Madrona Loop'],
    ['Ridgeline Pass',       'Rainier View Pass'],
    ['Cardinal Hills',       'Cascade Ridge'],
    ['Cardinal ',            'Cascade '],
    ['cardinalhills',        'cascaderidge'],
    ['cardinalrealty',       'cascaderealty'],
    [/\bCH([:-])(\d)/g,      'CR$1$2'],

    // Management company
    ['East Management',      'CWD Group'],

    // Cities → Puget Sound
    ['Duluth, GA 30096',     'Bellevue, WA 98004'],
    [/Miami, FL 331(\d\d)/g, 'Seattle, WA 981$1'],
    ['Los Altos, CA 94023',  'Kirkland, WA 98033'],
    ['Saratoga, CA 95070',   'Redmond, WA 98052'],
    ['Campbell, CA 95008',   'Bothell, WA 98011'],
    ['Santa Clara, CA 95051','Issaquah, WA 98027'],
    ['San Jose, CA 95112',   'Seattle, WA 98101'],
    ['Los Gatos, CA 95032',  'Sammamish, WA 98074'],

    // HOA avatar
    ['/images/cinc-icon.png', '/tenants/cwd/icon.png'],

    // CINC palette → CWD palette (theme presets, :root defaults, fixed surfaces)
    [/#006A52/gi, CWD_RED],
    [/#00553F/gi, '#8F0E15'],
    [/#002D28/gi, CWD_RED],
    [/#171B19/gi, '#1F2629'],
    [/#E9EEEA/gi, '#F4F4F5'],
    [/#D9E9E3/gi, '#F6E3E4'],
    [/#CBCACD/gi, '#E1E1E4'],
    // CSS filter that tints <img> icons Evergreen → CWD red
    ['brightness(0) saturate(100%) invert(27%) sepia(87%) saturate(1530%) hue-rotate(143deg) brightness(93%) contrast(101%)',
     'brightness(0) saturate(100%) invert(12%) sepia(78%) saturate(5287%) hue-rotate(350deg) brightness(83%) contrast(98%)'],
  ],

  // Appended to src/index.css
  css: `
/* ── CWD tenant overrides (prefixed for specificity over per-screen CSS) ── */
/* Bottom nav: white bar, slate icons; active item = red circle with white icon */
.phone-frame .resident-nav__bg,
.phone-frame .resident-nav-v2 { background: #FFFFFF; }
.phone-frame .resident-nav__icon svg,
.phone-frame .resident-nav__label { color: ${CWD_SLATE}; }
.phone-frame .resident-nav__item--active .resident-nav__icon { background: ${CWD_RED}; }
.phone-frame .resident-nav__item--active .resident-nav__icon svg { color: #FFFFFF; }
.phone-frame .resident-nav__item--active .resident-nav__label { color: ${CWD_SLATE}; }

/* Payment card in slate */
.phone-frame .acct-card { background: ${CWD_SLATE}; }

body .layout-toggle { color: #FFFFFF; border-color: ${CWD_RED}; background: #1E1E1E; }
body .layout-toggle:hover { border-color: ${CWD_RED}; }

.login-screen .login-logo-lockup { width: auto; height: auto; display: flex; flex-direction: column; align-items: center; }
.login-screen .login-logo { position: static; width: 200px; height: auto; object-position: center; }
.login-screen .login-connecplus { display: none; }
`,
}
