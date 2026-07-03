import { createContext, useContext, useState, useEffect } from 'react'

const ModeContext = createContext()

const INITIAL_RESIDENT_PROFILE = {
  firstName:         'John',
  lastName:          'Doe',
  primaryEmail:      'john.doe@cardinalHills.com',
  secondaryEmail:    '',
  useSecondaryEmail: false,
  mobile:            '(512) 555-0123',
  home:              '',
}

export function ModeProvider({ children }) {
  const [isBoard,           setIsBoard]           = useState(false)
  const [isWeb,             setIsWeb]             = useState(() => localStorage.getItem('layoutMode') === 'web')
  const [navStyle,          setNavStyleState]     = useState(() => localStorage.getItem('navStyle') || 'v1')
  const [showBoardRoom,     setShowBoardRoomState] = useState(() => localStorage.getItem('showBoardRoom') === 'true')
  const [chatOpen,          setChatOpen]          = useState(false)
  const [activeTask,        setActiveTask]        = useState(null)
  const [cephAIPulseCount,  setCephAIPulseCount]  = useState(0)
  const [broadcastDraft,    setBroadcastDraft]    = useState(null)
  const [cephAICardContext, setCephAICardContext] = useState(null)
  const [residentTab,       setResidentTab]       = useState('Feed')
  const [residentViewStack, setResidentViewStack] = useState([])
  const [residentProfile,   setResidentProfile]   = useState(INITIAL_RESIDENT_PROFILE)
  const [navGuard,          setNavGuardState]     = useState(null)

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
    }}>
      {children}
    </ModeContext.Provider>
  )
}

export function useMode() {
  return useContext(ModeContext)
}
