// KRJ Cares prospect demo → served at /krj
// Built by `vite build --mode krj` (see vite.config.js). Source code is never
// edited: every string below is swapped at build time in src/**/*.{js,jsx,css}.

const KRJ_DARK = '#313131'
const KRJ_BLUE = '#84BCCE'

export default {
  id: 'krj',
  title: 'KRJ Cares · Connect Demo',
  themeColor: '#F2F2F2',
  favicon: '/tenants/krj/icon.png',

  // Imported assets replaced by tenant files (path relative to project root)
  assets: {
    'src/images/splash-bg.jpg':           'public/tenants/krj/splash.jpg',
    'src/images/login-logo.svg':          'public/tenants/krj/logo.png',
  },

  // Ordered: specific strings before generic ones
  replace: [
    // Community + streets (Houston-style fictional HOA)
    ['Cardinal Hills Drive', 'Bayou Oaks Drive'],
    ['Cardinal Hills Dr',    'Bayou Oaks Dr'],
    ['Cardinal Point Road',  'Bayou Point Road'],
    ['Cardinal Point Rd',    'Bayou Point Rd'],
    ['Cardinal Way',         'Bayou Way'],
    ['Cardinal Heights',     'Bayou Heights'],
    ['Pinecrest Loop',       'Magnolia Loop'],
    ['Hillcrest Loop',       'Live Oak Loop'],
    ['Ridgeline Pass',       'Cypress Bend Pass'],
    ['Cardinal Hills',       'Bayou Oaks'],
    ['Cardinal ',            'Bayou '],
    ['cardinalhills',        'bayouoaks'],
    ['cardinalrealty',       'bayourealty'],
    [/\bCH([:-])(\d)/g,      'BO$1$2'],

    // Management company
    ['East Management',      'KRJ Cares'],

    // Cities → greater Houston
    ['Duluth, GA 30096',     'Houston, TX 77096'],
    [/Miami, FL 331(\d\d)/g, 'Houston, TX 770$1'],
    ['Los Altos, CA 94023',  'Spring, TX 77373'],
    ['Saratoga, CA 95070',   'Sugar Land, TX 77479'],
    ['Campbell, CA 95008',   'Katy, TX 77494'],
    ['Santa Clara, CA 95051','Pearland, TX 77581'],
    ['San Jose, CA 95112',   'Houston, TX 77002'],
    ['Los Gatos, CA 95032',  'Cypress, TX 77429'],

    // HOA avatar
    ['/images/cinc-icon.png', '/tenants/krj/icon.png'],

    // CINC palette → KRJ palette (theme presets, :root defaults, fixed surfaces)
    [/#006A52/gi, KRJ_DARK],
    [/#00553F/gi, '#1F1F1F'],
    [/#002D28/gi, KRJ_DARK],
    [/#171B19/gi, KRJ_DARK],
    [/#E9EEEA/gi, '#F2F2F2'],
    [/#D9E9E3/gi, '#DCECF1'],
    [/#CBCACD/gi, '#E2E2E2'],
    // CSS filter that tints <img> icons Evergreen → KRJ dark
    ['brightness(0) saturate(100%) invert(27%) sepia(87%) saturate(1530%) hue-rotate(143deg) brightness(93%) contrast(101%)',
     'brightness(0) saturate(100%) invert(17%)'],
  ],

  // Appended to src/index.css
  css: `
/* ── KRJ tenant overrides (prefixed for specificity over per-screen CSS) ── */
.phone-frame .resident-nav__bg,
.phone-frame .resident-nav-v2 { background: ${KRJ_BLUE}; }
.phone-frame .resident-nav__icon svg,
.phone-frame .resident-nav__label { color: ${KRJ_DARK}; }
.phone-frame .resident-nav__item--active .resident-nav__icon { background: #FFFFFF; }
.phone-frame .resident-nav__item--active .resident-nav__icon svg { color: ${KRJ_DARK}; }

/* Web/Mobile toggle sits on the dark page outside the phone: use the brand blue */
body .layout-toggle { color: ${KRJ_BLUE}; border-color: ${KRJ_BLUE}; background: #1E1E1E; }
body .layout-toggle:hover { border-color: ${KRJ_BLUE}; }

.login-screen .login-logo-lockup { width: auto; height: auto; display: flex; flex-direction: column; align-items: center; }
.login-screen .login-logo { position: static; width: 220px; height: auto; object-position: center; }
.login-screen .login-connecplus { display: none; }
`,
}
