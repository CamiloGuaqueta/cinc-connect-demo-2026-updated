export const PROTOTYPE_VERSION = 'PV. 2.0.38'

export const THEMES = {
  dark: {
    id: 'dark',
    label: 'Dark',
    '--res-bg1':    '#313131',
    '--res-bg2':    '#1D1D1D',
    '--res-text':   '#D1D1D1',
    '--res-accent': '#B6E75A',
    '--res-border': 'rgba(255,255,255,0.10)',
  },
  light: {
    id: 'light',
    label: 'Light',
    '--res-bg1':    '#E9EEEA',
    '--res-bg2':    '#FFFFFF',
    '--res-text':   '#171B19',
    '--res-accent': '#006A52',
    '--res-border': '#CBCACD',
  },
  cincGreen: {
    id: 'cincGreen',
    label: 'CINC Green',
    '--res-bg1':    '#002D28',
    '--res-bg2':    '#006A52',
    '--res-text':   '#FBFAF7',
    '--res-accent': '#B6E75A',
    '--res-border': 'rgba(255,255,255,0.10)',
  },
  eastPurple: {
    id: 'eastPurple',
    label: 'East Purple',
    '--res-bg1':    '#20113c',
    '--res-bg2':    '#0c0819',
    '--res-text':   '#e6e8ff',
    '--res-accent': '#ccafff',
    '--res-border': 'rgba(255,255,255,0.10)',
  },
}

export const THEME_ORDER = ['dark', 'light', 'cincGreen', 'eastPurple']

const STORAGE_KEY = 'res_theme'

export function applyTheme(colors) {
  const root = document.documentElement
  Object.entries(colors).forEach(([k, v]) => {
    if (k.startsWith('--')) root.style.setProperty(k, v)
  })
}

export function saveTheme(id, customColors = null) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ id, customColors }))
}

export function loadSavedTheme() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return
    const { id, customColors } = JSON.parse(raw)
    if (id === 'custom' && customColors) { applyTheme(customColors); return }
    const theme = THEMES[id]
    if (theme) applyTheme(theme)
  } catch {}
}

export function getSavedThemeId() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return 'light'
    return JSON.parse(raw).id
  } catch { return 'light' }
}

export function getSavedCustomColors() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const { id, customColors } = JSON.parse(raw)
    return id === 'custom' ? customColors : null
  } catch { return null }
}
