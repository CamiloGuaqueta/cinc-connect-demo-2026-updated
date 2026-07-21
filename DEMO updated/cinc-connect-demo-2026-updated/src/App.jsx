import { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ModeProvider, useMode } from './ModeContext'
import SplashScreen from './screens/SplashScreen'
import LoginScreen from './screens/LoginScreen'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import WelcomeModal from './components/WelcomeModal'
import CephAIChat from './components/CephAIChat'
import Feed from './screens/Feed'
import Pulse from './screens/Pulse'
import Tasks from './screens/Tasks'
import More from './screens/More'
import MeetingAgenda from './screens/MeetingAgenda'
import BroadcastNotification from './screens/BroadcastNotification'
import BroadcastCompose from './screens/BroadcastCompose'
import PulseViolations from './screens/PulseViolations'
import ResidentPinboard from './screens/ResidentPinboard'
import ResidentConcierge from './screens/ResidentConcierge'
import ResidentCommunity from './screens/ResidentCommunity'
import ResidentFinancialHub from './screens/ResidentFinancialHub'
import ResidentMore from './screens/ResidentMore'
import ResidentAmenities from './screens/ResidentAmenities'
import ResidentAmenityDetail from './screens/ResidentAmenityDetail'
import { AllPastReservations } from './screens/ResidentAmenities'
import { ResidentCalendar, ResidentEventDetail, ResidentDayList } from './screens/ResidentCalendar'
import ResidentNotificationPrefs from './screens/ResidentNotificationPrefs'
import ResidentMailingAddressDetail from './screens/ResidentMailingAddressDetail'
import ResidentDirectories from './screens/ResidentDirectories'
import ResidentDirectoryList from './screens/ResidentDirectoryList'
import ResidentMembersList from './screens/ResidentMembersList'
import ResidentContactDetail from './screens/ResidentContactDetail'
import NeighborhoodMarketIndex from './screens/NeighborhoodMarketIndex'
import ResidentBlogPost from './screens/ResidentBlogPost'
import ResidentProfile from './screens/ResidentProfile'
import ResidentMyUnits from './screens/ResidentMyUnits'
import ResidentBillingInfo from './screens/ResidentBillingInfo'
import ResidentPrototypeTheme from './screens/ResidentPrototypeTheme'
import ResidentParticipation from './screens/ResidentParticipation'
import ResidentBallots from './screens/ResidentBallots'
import ResidentSurveys from './screens/ResidentSurveys'
import ResidentRatings from './screens/ResidentRatings'
import ResidentConsents from './screens/ResidentConsents'
import ResidentAnimals, { ResidentAnimalPolicy, AnimalsStandaloneFlow } from './screens/ResidentAnimals'
import ResidentMembershipOptIn from './screens/ResidentMembershipOptIn'
import BoardRoom from './screens/BoardRoom'
import BankSummary from './screens/BankSummary'
import BoardAging from './screens/BoardAging'
import VendorPaymentHistory from './screens/VendorPaymentHistory'
import MembersList from './screens/MembersList'
import MemberDetail from './screens/MemberDetail'
import MembershipOptInModal from './components/MembershipOptInModal'
import WebShell from './components/WebShell'

const RESIDENT_TAB_SCREENS = {
  'My Community':  ResidentCommunity,
  'My Properties': ResidentParticipation,
  'Financial Hub': ResidentFinancialHub,
  'Board Room':    BoardRoom,
  More:            ResidentMore,
}

function renderResidentSubScreen(view) {
  if (view.screen === 'calendar')            return <ResidentCalendar />
  if (view.screen === 'event-detail')        return <ResidentEventDetail event={view.data} />
  if (view.screen === 'day-list')            return <ResidentDayList date={view.data.date} events={view.data.events} />
  if (view.screen === 'notification-prefs') return <ResidentNotificationPrefs />
  if (view.screen === 'mailing-address-detail') return <ResidentMailingAddressDetail unitAddress={view.data.unitAddress} account={view.data.account} />
  if (view.screen === 'directories')        return <ResidentDirectories />
  if (view.screen === 'members-list')       return <ResidentMembersList />
  if (view.screen === 'bank-summary')       return <BankSummary />
  if (view.screen === 'board-invoices')     return <Tasks types={['Invoice']} title="Invoice Approval" />
  if (view.screen === 'board-aging')        return <BoardAging />
  if (view.screen === 'vendor-payment')     return <VendorPaymentHistory />
  if (view.screen === 'directory-list')    return <ResidentDirectoryList dirId={view.data.dirId} title={view.data.title} />
  if (view.screen === 'contact-detail')   return <ResidentContactDetail contact={view.data.contact} dirId={view.data.dirId} />
  if (view.screen === 'market-index')     return <NeighborhoodMarketIndex />
  if (view.screen === 'blog-post')        return <ResidentBlogPost post={view.data} />
  if (view.screen === 'amenities')        return <ResidentAmenities />
  if (view.screen === 'amenity-detail')        return <ResidentAmenityDetail amenity={view.data} />
  if (view.screen === 'all-past-reservations') return <AllPastReservations />
  if (view.screen === 'my-profile')       return <ResidentProfile />
  if (view.screen === 'my-units')         return <ResidentMyUnits />
  if (view.screen === 'my-billing')       return <ResidentBillingInfo />
  if (view.screen === 'prototype-theme') return <ResidentPrototypeTheme />
  if (view.screen === 'ballot-votes')        return <ResidentBallots />
  if (view.screen === 'surveys')             return <ResidentSurveys />
  if (view.screen === 'ratings')             return <ResidentRatings />
  if (view.screen === 'signatures-consents') return <ResidentConsents />
  if (view.screen === 'animals')             return <ResidentAnimals />
  if (view.screen === 'animal-policy')       return <ResidentAnimalPolicy />
  if (view.screen === 'membership-opt-in')   return <ResidentMembershipOptIn />
  return null
}

function ResidentContent({ popResidentView }) {
  const { residentTab, residentViewStack } = useMode()
  const topView = residentViewStack[residentViewStack.length - 1]
  const TabScreen = RESIDENT_TAB_SCREENS[residentTab]

  if (topView?.screen === 'amenity-detail') {
    return (
      <>
        {(() => {
          const under = residentViewStack[residentViewStack.length - 2]
          return under ? renderResidentSubScreen(under) : TabScreen ? <TabScreen /> : <Feed />
        })()}
        <div className="amenity-detail-backdrop" onClick={popResidentView}>
          <div className="amenity-detail-sheet" onClick={e => e.stopPropagation()}>
            <ResidentAmenityDetail amenity={topView.data} />
          </div>
        </div>
      </>
    )
  }
  if (topView) {
    const sub = renderResidentSubScreen(topView)
    if (sub) return sub
  }
  if (TabScreen) return <TabScreen />
  return <Feed />
}

function BoardContent() {
  return (
    <Routes>
      <Route path="/"       element={<Feed />} />
      <Route path="/pulse"  element={<Pulse />} />
      <Route path="/tasks"  element={<Tasks />} />
      <Route path="/more"    element={<More />} />
      <Route path="/meeting"   element={<MeetingAgenda />} />
      <Route path="/broadcast"          element={<BroadcastCompose />} />
      <Route path="/broadcast/audience" element={<BroadcastNotification />} />
      <Route path="/pulse/violations"   element={<PulseViolations />} />
      <Route path="/members-list"       element={<MembersList />} />
      <Route path="/member-detail"      element={<MemberDetail />} />
      <Route path="*"          element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function LayoutToggle() {
  const { isWeb, setIsWeb } = useMode()
  return (
    <button className="layout-toggle" onClick={() => setIsWeb(v => !v)} title="Switch layout">
      <span className="layout-toggle__icon">
        {isWeb ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2"/>
            <line x1="12" y1="18" x2="12.01" y2="18"/>
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2"/>
            <polyline points="8,21 12,17 16,21"/>
          </svg>
        )}
      </span>
      {isWeb ? 'Mobile' : 'Web'}
    </button>
  )
}

function AppShell({ showMembershipOptIn, onMembershipContinue }) {
  const { isBoard, isWeb, residentTab, residentViewStack, popResidentView, navStyle } = useMode()
  const [showWelcome, setShowWelcome] = useState(false)
  const prevIsBoard = useRef(false)
  const frameRef = useRef(null)

  useEffect(() => {
    if (isBoard && !prevIsBoard.current) {
      const dismissed = localStorage.getItem('boardWelcomeDismissed') === 'true'
      if (!dismissed) setShowWelcome(true)
    }
    prevIsBoard.current = isBoard
  }, [isBoard])

  useEffect(() => {
    if (frameRef.current) frameRef.current.scrollTop = 0
  }, [residentTab, residentViewStack.length])

  if (isWeb) {
    return (
      <>
        <WebShell showMembershipOptIn={showMembershipOptIn} onMembershipContinue={onMembershipContinue}>
          {isBoard ? <BoardContent /> : <ResidentContent popResidentView={popResidentView} />}
        </WebShell>
        {showWelcome && <WelcomeModal onClose={() => setShowWelcome(false)} />}
      </>
    )
  }

  return (
    <>
      <div ref={frameRef} className={`phone-frame${isBoard ? '' : ' resident-mode'}${navStyle === 'v2' ? ' nav-v2' : ''}`}>
        <Header />
        {isBoard ? <BoardContent /> : <ResidentContent popResidentView={popResidentView} />}
        <BottomNav />
        <CephAIChat />
        {showWelcome && <WelcomeModal onClose={() => setShowWelcome(false)} />}
        {showMembershipOptIn && <MembershipOptInModal onContinue={onMembershipContinue} />}
      </div>
      <LayoutToggle />
    </>
  )
}

import { useParams } from 'react-router-dom'

const STANDALONE_SCREENS = {
  ballots:  ResidentBallots,
  consents: ResidentConsents,
  surveys:  ResidentSurveys,
  ratings:  ResidentRatings,
  animals:  AnimalsStandaloneFlow,
  nmi:      NeighborhoodMarketIndex,
}

function StandaloneFlow() {
  const { flow } = useParams()
  const Screen = STANDALONE_SCREENS[flow]
  if (!Screen) return <div style={{ color: '#fff', padding: 32 }}>Flow "{flow}" not found.</div>
  return (
    <ModeProvider>
      <div className="standalone-view resident-mode">
        <Screen />
      </div>
    </ModeProvider>
  )
}

import { loadSavedTheme } from './theme'
loadSavedTheme()

function MainApp() {
  const [phase, setPhase] = useState('splash')
  const [showMembershipOptIn, setShowMembershipOptIn] = useState(false)

  useEffect(() => {
    const handleLogout = () => {
      setShowMembershipOptIn(false)
      setPhase('splash')
    }
    window.addEventListener('app-logout', handleLogout)
    return () => window.removeEventListener('app-logout', handleLogout)
  }, [])

  if (phase === 'splash') {
    return (
      <div className="phone-frame">
        <SplashScreen onDone={() => setPhase('login')} />
      </div>
    )
  }

  if (phase === 'login') {
    return (
      <div className="phone-frame">
        <LoginScreen onLogin={() => {
          const seen = localStorage.getItem('membershipOptInSeen') === 'true'
          setShowMembershipOptIn(!seen)
          setPhase('app')
        }} />
      </div>
    )
  }

  return (
    <ModeProvider>
      <AppShell
        showMembershipOptIn={showMembershipOptIn}
        onMembershipContinue={() => {
          localStorage.setItem('membershipOptInSeen', 'true')
          setShowMembershipOptIn(false)
        }}
      />
    </ModeProvider>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/standalone/:flow" element={<StandaloneFlow />} />
        <Route path="*" element={<MainApp />} />
      </Routes>
    </BrowserRouter>
  )
}
