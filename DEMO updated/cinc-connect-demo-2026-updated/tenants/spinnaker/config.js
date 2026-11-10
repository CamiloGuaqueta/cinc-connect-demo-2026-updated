// Spinnaker Management prospect demo → served at /spinnaker
// Built by `vite build --mode spinnaker` (see vite.config.js). Source code is never
// edited: every string below is swapped at build time in src/**/*.{js,jsx,css}.
// Logo + colors taken from spinnakerusa.com (Hudson Valley / Capital District, NY);
// swap the files in public/tenants/spinnaker/ if official assets arrive.

const SPN_INDIGO = '#444798'   // titles, icons, buttons (spinnakerusa.com purple)
const SPN_NAVY   = '#1B1D4B'   // payment card, nav (spinnakerusa.com navy)

export default {
  id: 'spinnaker',
  title: 'Spinnaker Management · Connect Demo',
  themeColor: '#F5F7FA',
  favicon: '/tenants/spinnaker/icon.png',

  assets: {
    'src/images/splash-bg.jpg':  'public/tenants/spinnaker/splash.jpg',
    'src/images/login-logo.svg': 'public/tenants/spinnaker/logo.png',
  },

  // Ordered: specific strings before generic ones
  replace: [
    // Community + streets (Hudson Valley fictional HOA — not one of Spinnaker's real communities)
    ['Cardinal Hills Drive', 'Hudson Ridge Drive'],
    ['Cardinal Hills Dr',    'Hudson Ridge Dr'],
    ['Cardinal Point Road',  'Hudson Point Road'],
    ['Cardinal Point Rd',    'Hudson Point Rd'],
    ['Cardinal Way',         'Hudson Way'],
    ['Cardinal Heights',     'Hudson Heights'],
    ['Pinecrest Loop',       'Birchwood Loop'],
    ['Hillcrest Loop',       'Maple Hollow Loop'],
    ['Ridgeline Pass',       'Catskill View Pass'],
    ['Cardinal Hills',       'Hudson Ridge'],
    ['Cardinal ',            'Hudson '],
    ['cardinalhills',        'hudsonridge'],
    ['cardinalrealty',       'hudsonrealty'],
    [/\bCH([:-])(\d)/g,      'HR$1$2'],

    // Management company
    ['East Management',      'Spinnaker Management'],

    // Cities → Hudson Valley / Capital District
    ['Duluth, GA 30096',     'Poughkeepsie, NY 12601'],
    [/Miami, FL 331(\d\d)/g, 'Albany, NY 122$1'],
    ['Los Altos, CA 94023',  'New Paltz, NY 12561'],
    ['Saratoga, CA 95070',   'Saratoga Springs, NY 12866'],
    ['Campbell, CA 95008',   'Newburgh, NY 12550'],
    ['Santa Clara, CA 95051','Kingston, NY 12401'],
    ['San Jose, CA 95112',   'Albany, NY 12207'],
    ['Los Gatos, CA 95032',  'Wallkill, NY 12589'],

    // HOA avatar
    ['/images/cinc-icon.png', '/tenants/spinnaker/icon.png'],

    // CINC palette → Spinnaker palette (theme presets, :root defaults, fixed surfaces)
    [/#006A52/gi, SPN_INDIGO],
    [/#00553F/gi, '#363979'],
    [/#002D28/gi, SPN_NAVY],
    [/#171B19/gi, '#1C1E33'],
    [/#E9EEEA/gi, '#F5F7FA'],
    [/#D9E9E3/gi, '#E6E7F4'],
    [/#CBCACD/gi, '#DDDFEA'],
    // CSS filter that tints <img> icons Evergreen → Spinnaker indigo
    ['brightness(0) saturate(100%) invert(27%) sepia(87%) saturate(1530%) hue-rotate(143deg) brightness(93%) contrast(101%)',
     'brightness(0) saturate(100%) invert(25%) sepia(36%) saturate(1716%) hue-rotate(218deg) brightness(91%) contrast(91%)'],
  ],

  // Appended to src/index.css
  css: `
/* ── Spinnaker tenant overrides (prefixed for specificity over per-screen CSS) ── */
/* Bottom nav: navy bar, white icons; active item = white circle with navy icon */
.phone-frame .resident-nav__bg,
.phone-frame .resident-nav-v2 { background: ${SPN_NAVY}; }
.phone-frame .resident-nav__icon svg,
.phone-frame .resident-nav__label { color: #FFFFFF; }
.phone-frame .resident-nav__item--active .resident-nav__icon { background: #FFFFFF; }
.phone-frame .resident-nav__item--active .resident-nav__icon svg { color: ${SPN_NAVY}; }
.phone-frame .resident-nav__item--active .resident-nav__label { color: #FFFFFF; }

/* Payment card in navy */
.phone-frame .acct-card { background: ${SPN_NAVY}; }

body .layout-toggle { color: #FFFFFF; border-color: ${SPN_INDIGO}; background: #1E1E1E; }
body .layout-toggle:hover { border-color: ${SPN_INDIGO}; }

.login-screen .login-logo-lockup { width: auto; height: auto; display: flex; flex-direction: column; align-items: center; }
.login-screen .login-logo { position: static; width: 240px; height: auto; object-position: center; }
.login-screen .login-connecplus { display: none; }
`,
}
