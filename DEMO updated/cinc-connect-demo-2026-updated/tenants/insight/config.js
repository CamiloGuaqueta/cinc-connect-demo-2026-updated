// Insight Association Management prospect demo → served at /insight
// Built by `vite build --mode insight` (see vite.config.js). Source code is never
// edited: every string below is swapped at build time in src/**/*.{js,jsx,css}.
// Logo + colors taken from insightam.com; swap the files in public/tenants/insight/
// if Diego sends official assets.

const INS_NAVY = '#3A4262'   // logo wordmark
const INS_BLUE = '#6B92D0'   // logo mark

export default {
  id: 'insight',
  title: 'Insight Association Management · Connect Demo',
  themeColor: '#F3F5F9',
  favicon: '/tenants/insight/icon.png',

  // Imported assets replaced by tenant files (path relative to project root)
  assets: {
    'src/images/splash-bg.jpg':  'public/tenants/insight/splash.jpg',
    'src/images/login-logo.svg': 'public/tenants/insight/logo.png',
  },

  // Ordered: specific strings before generic ones
  replace: [
    // Community + streets (North Texas fictional HOA — not one of Insight's real communities)
    ['Cardinal Hills Drive', 'Bluebonnet Hills Drive'],
    ['Cardinal Hills Dr',    'Bluebonnet Hills Dr'],
    ['Cardinal Point Road',  'Bluebonnet Point Road'],
    ['Cardinal Point Rd',    'Bluebonnet Point Rd'],
    ['Cardinal Way',         'Bluebonnet Way'],
    ['Cardinal Heights',     'Bluebonnet Heights'],
    ['Pinecrest Loop',       'Pecan Loop'],
    ['Hillcrest Loop',       'Mesquite Loop'],
    ['Ridgeline Pass',       'Trinity Bend Pass'],
    ['Cardinal Hills',       'Bluebonnet Hills'],
    ['Cardinal ',            'Bluebonnet '],
    ['cardinalhills',        'bluebonnethills'],
    ['cardinalrealty',       'bluebonnetrealty'],
    [/\bCH([:-])(\d)/g,      'BH$1$2'],

    // Management company
    ['East Management',      'Insight Association Management'],

    // Cities → North Texas
    ['Duluth, GA 30096',     'Frisco, TX 75034'],
    [/Miami, FL 331(\d\d)/g, 'Plano, TX 750$1'],
    ['Los Altos, CA 94023',  'McKinney, TX 75070'],
    ['Saratoga, CA 95070',   'Prosper, TX 75078'],
    ['Campbell, CA 95008',   'Allen, TX 75013'],
    ['Santa Clara, CA 95051','Celina, TX 75009'],
    ['San Jose, CA 95112',   'Dallas, TX 75201'],
    ['Los Gatos, CA 95032',  'Little Elm, TX 75068'],

    // HOA avatar
    ['/images/cinc-icon.png', '/tenants/insight/icon.png'],

    // CINC palette → Insight palette (theme presets, :root defaults, fixed surfaces)
    [/#006A52/gi, INS_NAVY],
    [/#00553F/gi, '#2C3350'],
    [/#002D28/gi, INS_NAVY],
    [/#171B19/gi, '#262B3D'],
    [/#E9EEEA/gi, '#F3F5F9'],
    [/#D9E9E3/gi, '#E3EBF7'],
    [/#CBCACD/gi, '#DDE3EC'],
    // CSS filter that tints <img> icons Evergreen → Insight navy
    ['brightness(0) saturate(100%) invert(27%) sepia(87%) saturate(1530%) hue-rotate(143deg) brightness(93%) contrast(101%)',
     'brightness(0) saturate(100%) invert(24%) sepia(18%) saturate(1200%) hue-rotate(196deg) brightness(92%) contrast(90%)'],
  ],

  // Appended to src/index.css
  css: `
/* ── Insight tenant overrides (prefixed for specificity over per-screen CSS) ── */
.phone-frame .resident-nav__bg,
.phone-frame .resident-nav-v2 { background: ${INS_BLUE}; }
.phone-frame .resident-nav__icon svg,
.phone-frame .resident-nav__label { color: #FFFFFF; }
.phone-frame .resident-nav__item--active .resident-nav__icon { background: #FFFFFF; }
.phone-frame .resident-nav__item--active .resident-nav__icon svg { color: ${INS_NAVY}; }
.phone-frame .resident-nav__item--active .resident-nav__label { color: #FFFFFF; }

.login-screen .login-logo-lockup { width: auto; height: auto; display: flex; flex-direction: column; align-items: center; }
.login-screen .login-logo { position: static; width: 230px; height: auto; object-position: center; }
.login-screen .login-connecplus { display: none; }
`,
}
