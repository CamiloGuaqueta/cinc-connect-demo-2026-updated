import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { CURRENT_USER } from './data/userData'

const ModeContext = createContext()

const BRAND_KEY = 'res_brand'

function loadSavedBrand() {
  try {
    const raw = localStorage.getItem(BRAND_KEY)
    if (!raw) return { name: '', logo: '' }
    return { name: '', logo: '', ...JSON.parse(raw) }
  } catch {
    return { name: '', logo: '' }
  }
}

const INITIAL_RESIDENT_PROFILE = {
  firstName:         CURRENT_USER.firstName,
  lastName:          CURRENT_USER.lastName,
  primaryEmail:      CURRENT_USER.primaryEmail,
  secondaryEmail:    CURRENT_USER.secondaryEmail,
  useSecondaryEmail: CURRENT_USER.useSecondaryEmail,
  mobile:            CURRENT_USER.mobile,
  home:              CURRENT_USER.home,
}

export function ModeProvider({ children }) {
  const [isBoard,           setIsBoard]           = useState(false)
  const [isWeb,             setIsWeb]             = useState(() => localStorage.getItem('layoutMode') === 'web')
  const [navStyle,          setNavStyleState]     = useState(() => localStorage.getItem('navStyle') || 'v1')
  const [showBoardRoom,     setShowBoardRoomState] = useState(() => localStorage.getItem('showBoardRoom') !== 'false')
  const [chatOpen,          setChatOpen]          = useState(false)
  const [activeTask,        setActiveTask]        = useState(null)
  const [cephAIPulseCount,  setCephAIPulseCount]  = useState(0)
  const [broadcastDraft,    setBroadcastDraft]    = useState(null)
  const [cephAICardContext, setCephAICardContext] = useState(null)
  const [residentTab,       setResidentTab]       = useState('Feed')
  const [residentViewStack, setResidentViewStack] = useState([])
  const [residentProfile,   setResidentProfile]   = useState(INITIAL_RESIDENT_PROFILE)
  const [navGuard,          setNavGuardState]     = useState(null)
  const [defaultPaymentMethodId, setDefaultPaymentMethodId] = useState('visa1')
  const [notifOpen,         setNotifOpen]         = useState(false)
  const [notifInitialChatId, setNotifInitialChatId] = useState(null)
  const [brand,             setBrandState]        = useState(loadSavedBrand)

  useEffect(() => {
    localStorage.setItem(BRAND_KEY, JSON.stringify(brand))
  }, [brand])

  useEffect(() => {
    localStorage.setItem('layoutMode', isWeb ? 'web' : 'mobile')
  }, [isWeb])

  useEffect(() => {
    localStorage.setItem('navStyle', navStyle)
  }, [navStyle])

  useEffect(() => {
    localStorage.setItem('showBoardRoom', showBoardRoom)
  }, [showBoardRoom])

  const setNavStyle = (style) => setNavStyleState(style)
  const setShowBoardRoom = (val) => setShowBoardRoomState(val)

  // Store a function as nav guard — wraps setter to avoid React's updater-fn pattern
  const setNavGuard = (fn) => setNavGuardState(fn ? () => fn : null)

  const pushResidentView = (screen, data = null) =>
    setResidentViewStack(prev => [...prev, { screen, data }])
  const pushResidentViews = (views) =>
    setResidentViewStack(prev => [...prev, ...views])
  const popResidentView = () =>
    setResidentViewStack(prev => prev.slice(0, -1))
  const updateResidentProfile = (updates) =>
    setResidentProfile(p => ({ ...p, ...updates }))

  // Web-layout navigation: set tab + replace view stack in one call
  const navigateResident = (tab, view = null, data = null) => {
    setResidentTab(tab)
    setResidentViewStack(view ? [{ screen: view, data }] : [])
  }

  // ── Phone/browser back button ─────────────────────────────────────────────
  // In-app navigation is state, not URLs, so the hardware back button used to
  // leave the demo. While anything is "open" (Cephai, notifications, a
  // sub-screen or a non-Feed tab) we keep one guard entry in browser history;
  // back consumes it and we close/step back one level instead of exiting.
  const backRef = useRef({})
  backRef.current = { chatOpen, notifOpen, stackLen: residentViewStack.length, residentTab }
  const inApp = chatOpen || notifOpen || residentViewStack.length > 0 || residentTab !== 'Feed'
  const guardRef = useRef(false)
  const ignorePopRef = useRef(false)

  useEffect(() => {
    if (inApp && !guardRef.current) {
      window.history.pushState({ cincBackGuard: true }, '')
      guardRef.current = true
    } else if (!inApp && guardRef.current) {
      // Back to the home Feed via in-app UI: drop the now-unneeded guard entry
      guardRef.current = false
      ignorePopRef.current = true
      window.history.back()
    }
  }, [inApp])

  useEffect(() => {
    const onPop = () => {
      guardRef.current = false
      if (ignorePopRef.current) { ignorePopRef.current = false; return }
      const s = backRef.current
      if (s.chatOpen)               setChatOpen(false)
      else if (s.notifOpen)         setNotifOpen(false)
      else if (s.stackLen > 0)      setResidentViewStack(prev => prev.slice(0, -1))
      else if (s.residentTab !== 'Feed') setResidentTab('Feed')
      // If something is still open after this step, the effect above re-arms the guard
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    // Still in-app after a back step → re-arm so the next back works too
    if (inApp && !guardRef.current) {
      window.history.pushState({ cincBackGuard: true }, '')
      guardRef.current = true
    }
  })

  const setBrand = (updates) => setBrandState(b => ({ ...b, ...updates }))

  const openMessagesThread = (chatId) => {
    setNotifInitialChatId(chatId)
    setNotifOpen(true)
  }
  const closeNotifCenter = () => {
    setNotifOpen(false)
    setNotifInitialChatId(null)
  }

  return (
    <ModeContext.Provider value={{
      isBoard,           setIsBoard,
      isWeb,             setIsWeb,
      chatOpen,          setChatOpen,
      activeTask,        setActiveTask,
      cephAIPulseCount,  setCephAIPulseCount,
      broadcastDraft,    setBroadcastDraft,
      cephAICardContext, setCephAICardContext,
      residentTab,       setResidentTab,
      residentViewStack, setResidentViewStack, pushResidentView, pushResidentViews, popResidentView,
      navigateResident,
      residentProfile,   updateResidentProfile,
      navGuard,          setNavGuard,
      navStyle,          setNavStyle,
      showBoardRoom,     setShowBoardRoom,
      defaultPaymentMethodId, setDefaultPaymentMethodId,
      notifOpen,         setNotifOpen,
      notifInitialChatId, openMessagesThread, closeNotifCenter,
      brand,             setBrand,
    }}>
      {children}
    </ModeContext.Provider>
  )
}

export function useMode() {
  return useContext(ModeContext)
}
