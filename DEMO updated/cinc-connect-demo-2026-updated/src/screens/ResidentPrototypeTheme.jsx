import { useState, useRef, useEffect } from 'react'
import { HexColorPicker } from 'react-colorful'
import { useMode } from '../ModeContext'
import { THEMES, THEME_ORDER, applyTheme, saveTheme, getSavedThemeId, getSavedCustomColors } from '../theme'
import './ResidentPrototypeTheme.css'

function toHex(color) {
  if (!color) return '#000000'
  if (color.startsWith('#')) return color
  const ctx = document.createElement('canvas').getContext('2d')
  ctx.fillStyle = color
  return ctx.fillStyle
}

const DEFAULT_CUSTOM = {
  '--res-bg1':    '#112719',
  '--res-bg2':    '#235237',
  '--res-text':   '#FFF8EA',
  '--res-accent': '#B2DE61',
}

function Swatches({ colors }) {
  const keys = ['--res-bg1', '--res-bg2', '--res-text', '--res-accent']
  return (
    <div className="ptheme-swatches">
      {keys.map(k => (
        <span key={k} className="ptheme-swatch" style={{ background: colors[k] }} />
      ))}
    </div>
  )
}

export default function ResidentPrototypeTheme() {
  const { popResidentView } = useMode()
  const [activeId, setActiveId] = useState(getSavedThemeId)
  const [showCustomSheet, setShowCustomSheet] = useState(false)
  const [customColors, setCustomColors] = useState(
    () => getSavedCustomColors() || { ...DEFAULT_CUSTOM }
  )
  const [draftColors, setDraftColors] = useState({ ...DEFAULT_CUSTOM })
  const [openPicker, setOpenPicker] = useState(null)
  const pickerRef = useRef(null)

  useEffect(() => {
    if (!openPicker) return
    function handleClick(e) {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) setOpenPicker(null)
    }
    document.addEventListener('pointerdown', handleClick)
    return () => document.removeEventListener('pointerdown', handleClick)
  }, [openPicker])

  function selectTheme(id) {
    setActiveId(id)
    applyTheme(THEMES[id])
    saveTheme(id)
  }

  function openCustom() {
    setDraftColors(customColors)
    setShowCustomSheet(true)
  }

  function applyCustom() {
    setCustomColors(draftColors)
    setActiveId('custom')
    applyTheme(draftColors)
    saveTheme('custom', draftColors)
    setShowCustomSheet(false)
  }

  return (
    <div className="screen ptheme-screen">
      <div className="ptheme-header">
        <span className="ptheme-title">PROTOTYPE THEME</span>
      </div>

      <div className="ptheme-list">
        {THEME_ORDER.map((id, i) => {
          const theme = THEMES[id]
          const isActive = activeId === id
          return (
            <button key={id} className={`ptheme-row${isActive ? ' ptheme-row--active' : ''}`} onClick={() => selectTheme(id)}>
              <span className="ptheme-row__num">{i + 1}</span>
              <div className="ptheme-row__body">
                <span className="ptheme-row__label">{theme.label}</span>
                <Swatches colors={theme} />
              </div>
              {isActive && (
                <svg className="ptheme-check" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="9" fill="currentColor" opacity="0.15"/>
                  <path d="M5 9l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          )
        })}

        {/* Custom */}
        <button className={`ptheme-row${activeId === 'custom' ? ' ptheme-row--active' : ''}`} onClick={openCustom}>
          <span className="ptheme-row__num">5</span>
          <div className="ptheme-row__body">
            <span className="ptheme-row__label">Custom</span>
            {activeId === 'custom'
              ? <Swatches colors={customColors} />
              : <span className="ptheme-row__sub">Pick your own colors</span>
            }
          </div>
          {activeId === 'custom' && (
            <svg className="ptheme-check" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="9" fill="currentColor" opacity="0.15"/>
              <path d="M5 9l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </div>

      {/* Custom pull-up sheet */}
      {showCustomSheet && (
        <div className="ptheme-backdrop" onClick={() => setShowCustomSheet(false)}>
          <div className="ptheme-sheet" onClick={e => e.stopPropagation()}>
            <div className="ptheme-sheet__handle" />
            <p className="ptheme-sheet__title">CUSTOM THEME</p>
            {[
              { key: '--res-bg1',    label: 'BG1' },
              { key: '--res-bg2',    label: 'BG2' },
              { key: '--res-text',   label: 'Text' },
              { key: '--res-accent', label: 'Accent' },
            ].map(({ key, label }) => (
              <div key={key} className="ptheme-color-row">
                <span className="ptheme-color-row__label">{label}</span>
                <div className="ptheme-color-row__right">
                  <span className="ptheme-color-row__swatch" style={{ background: draftColors[key] }} />
                  <input
                    className="ptheme-color-row__input"
                    type="text"
                    value={draftColors[key]}
                    maxLength={7}
                    onChange={e => setDraftColors(prev => ({ ...prev, [key]: e.target.value }))}
                    onBlur={e => setDraftColors(prev => ({ ...prev, [key]: toHex(e.target.value) }))}
                    spellCheck={false}
                  />
                  <div className="ptheme-picker-wrap" ref={openPicker === key ? pickerRef : null}>
                    <button
                      className="ptheme-color-row__picker-btn"
                      style={{ background: draftColors[key] }}
                      onClick={() => setOpenPicker(openPicker === key ? null : key)}
                    />
                    {openPicker === key && (
                      <div className="ptheme-picker-popover">
                        <HexColorPicker
                          color={draftColors[key]}
                          onChange={hex => setDraftColors(prev => ({ ...prev, [key]: hex }))}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <button className="ptheme-sheet__apply" onClick={applyCustom}>APPLY THEME</button>
          </div>
        </div>
      )}
    </div>
  )
}
