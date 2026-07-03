export const PROTOTYPE_VERSION = 'PV. 2.0.38'

export const THEMES = {
  dark: {
    id: 'dark',
    label: 'Dark',
    '--res-bg1':    '#313131',
    '--res-bg2':    '#1D1D1D',
    '--res-text':   '#D1D1D1',
    '--res-accent': '#B0DB61',
  },
  light: {
    id: 'light',
    label: 'Light',
    '--res-bg1':    '#FFF8EA',
    '--res-bg2':    '#F1EADC',
    '--res-text':   '#1D1D1D',
    '--res-accent': '#235237',
  },
  cincGreen: {
    id: 'cincGreen',
    label: 'CINC Green',
    '--res-bg1':    '#112719',
    '--res-bg2':    '#235237',
    '--res-text':   '#FFF8EA',
    '--res-accent': '#B2DE61',
  },
  eastPurple: {
    id: 'eastPurple',
    label: 'East Purple',
    '--res-bg1':    '#20113c',
    '--res-bg2':    '#0c0819',
    '--res-text':   '#e6e8ff',
    '--res-accent': '#ccafff',
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
    if (!raw) return 'dark'
    return JSON.parse(raw).id
  } catch { return 'dark' }
}

export function getSavedCustomColors() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const { id, customColors } = JSON.parse(raw)
    return id === 'custom' ? customColors : null
  } catch { return null }
}
