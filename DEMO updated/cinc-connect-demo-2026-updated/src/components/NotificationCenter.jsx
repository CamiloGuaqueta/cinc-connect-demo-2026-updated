import { useState, useEffect } from 'react'
import {
  NOTIFICATIONS, markNotificationRead,
  CONVERSATIONS, markConversationRead, sendMessage, lastMessage, startConversation,
} from '../data/messagesData'
import { CONTACTS } from '../data/directoryData'
import './NotificationCenter.css'

const CINC_ICON = '/images/cinc-icon.png'
const CEPHAI_ICON = '/images/cephai-logo.svg'

function initialsOf(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

export function unreadBadgeCount() {
  const notifs = NOTIFICATIONS.filter(n => !n.read).length
  const msgs = CONVERSATIONS.filter(c => !c.read).length
  return notifs + msgs
}

export default function NotificationCenter({ isBoard, initialChatId, onClose, onOpenCephai }) {
  const [view, setView] = useState(initialChatId ? 'chat-thread' : 'notif-list') // notif-list | notif-detail | msg-list | chat-thread | new-message
  const [selectedNotif, setSelectedNotif] = useState(null)
  const [activeChatId, setActiveChatId] = useState(initialChatId || null)
  const [query, setQuery] = useState('')
  const [unreadOnly, setUnreadOnly] = useState(false)
  const [draft, setDraft] = useState('')
  const [contactQuery, setContactQuery] = useState('')
  const [, bump] = useState(0)
  const rerender = () => bump(x => x + 1)

  useEffect(() => {
    if (initialChatId) markConversationRead(initialChatId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const unreadNotifCount = NOTIFICATIONS.filter(n => !n.read).length
  const unreadMsgCount = CONVERSATIONS.filter(c => !c.read).length

  const visibleNotifs = NOTIFICATIONS.filter(n => {
    if (unreadOnly && n.read) return false
    if (query && !n.title.toLowerCase().includes(query.toLowerCase()) &&
        !n.body.toLowerCase().includes(query.toLowerCase())) return false
    return true
  })

  const activeConvo = CONVERSATIONS.find(c => c.id === activeChatId) || null

  function openNotif(n) {
    markNotificationRead(n.id)
    setSelectedNotif(n)
    setView('notif-detail')
  }

  function openChat(c) {
    markConversationRead(c.id)
    setActiveChatId(c.id)
    setView('chat-thread')
  }

  function handleSelectContact(person) {
    const id = startConversation({
      id: person.id,
      name: `${person.firstName} ${person.lastName}`,
      role: person.role,
      photo: person.photo,
    })
    const convo = CONVERSATIONS.find(c => c.id === id)
    setContactQuery('')
    openChat(convo)
  }

  const visibleContacts = CONTACTS.members.filter(p => {
    if (!contactQuery) return true
    const name = `${p.firstName} ${p.lastName}`.toLowerCase()
    return name.includes(contactQuery.toLowerCase())
  })

  function handleSend() {
    const text = draft.trim()
    if (!text || !activeChatId) return
    sendMessage(activeChatId, text)
    setDraft('')
    rerender()
  }

  function handleBack() {
    if (view === 'notif-detail') { setView('notif-list'); setSelectedNotif(null); return }
    if (view === 'chat-thread') { setView('msg-list'); setActiveChatId(null); return }
    if (view === 'new-message') { setView('msg-list'); setContactQuery(''); return }
    onClose()
  }

  const isListView = view === 'notif-list' || view === 'msg-list'

  return (
    <div className="notif-center" data-mode={isBoard ? 'board' : 'resident'}>
      <div className="notif-center__header">
        <div className="notif-center__header-left">
          <button className="app-header__back" onClick={handleBack} aria-label="Back">
            <ChevronLeftIcon />
          </button>
          {view === 'chat-thread' && activeConvo && (
            <div className="chat-thread__peer">
              {activeConvo.isGroup ? (
                <span className="chat-thread__peer-avatar chat-thread__peer-avatar--group"><GroupIcon /></span>
              ) : activeConvo.photo ? (
                <img className="chat-thread__peer-avatar" src={activeConvo.photo} alt={activeConvo.name} />
              ) : (
                <span className="chat-thread__peer-avatar chat-thread__peer-avatar--initials">{initialsOf(activeConvo.name)}</span>
              )}
              <div className="chat-thread__peer-text">
                <span className="chat-thread__peer-name">{activeConvo.name}</span>
                {activeConvo.role && <span className="chat-thread__peer-role">{activeConvo.role}</span>}
              </div>
            </div>
          )}
          {view === 'new-message' && (
            <span className="notif-center__title">New Message</span>
          )}
        </div>
        <div className="notif-center__header-right">
          {view === 'msg-list' && (
            <button className="notif-btn" aria-label="New message" onClick={() => setView('new-message')}>
              <ComposeIcon />
            </button>
          )}
          <button className="notif-btn" aria-label="Notifications">
            <BellIcon />
            {(unreadNotifCount + unreadMsgCount) > 0 && <span className="notif-btn__badge">{unreadNotifCount + unreadMsgCount}</span>}
          </button>
        </div>
      </div>
      <div className="app-header__divider" />

      {isListView && (
        <div className="notif-tabs">
          <button
            className={`notif-tab${view === 'notif-list' ? ' notif-tab--active' : ''}`}
            onClick={() => setView('notif-list')}
          >
            Notifications
            {unreadNotifCount > 0 && <span className="notif-tab__count">{unreadNotifCount}</span>}
          </button>
          <button
            className={`notif-tab${view === 'msg-list' ? ' notif-tab--active' : ''}`}
            onClick={() => setView('msg-list')}
          >
            Messages
            {unreadMsgCount > 0 && <span className="notif-tab__count">{unreadMsgCount}</span>}
          </button>
        </div>
      )}

      {view === 'notif-detail' && selectedNotif && (
        <div className="notif-detail">
          <div className="notif-detail__icon"><img src={CINC_ICON} alt="CINC" /></div>
          <p className="notif-detail__time">{selectedNotif.time}</p>
          <h2 className="notif-detail__title">{selectedNotif.title}</h2>
          <p className="notif-detail__body">{selectedNotif.body}</p>
        </div>
      )}

      {view === 'notif-list' && (
        <>
          <div className="notif-toolbar">
            <div className="notif-search">
              <SearchIcon />
              <input
                className="notif-search__input"
                type="text"
                placeholder="Search notifications…"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              {query && (
                <button className="notif-search__clear" onClick={() => setQuery('')} aria-label="Clear">
                  <CloseIcon />
                </button>
              )}
            </div>
            <button
              className={`notif-filter${unreadOnly ? ' notif-filter--active' : ''}`}
              onClick={() => setUnreadOnly(v => !v)}
              aria-label={unreadOnly ? 'Show all' : 'Show unread only'}
            >
              <UnreadFilterIcon />
              {unreadNotifCount > 0 && <span className="notif-filter__count">{unreadNotifCount}</span>}
            </button>
          </div>
          <div className="notif-list">
            {visibleNotifs.length === 0 ? (
              <p className="notif-empty">No notifications found.</p>
            ) : visibleNotifs.map(n => (
              <button key={n.id} className="notif-item" onClick={() => openNotif(n)}>
                <img className="notif-item__icon" src={CINC_ICON} alt="CINC" />
                <div className="notif-item__body">
                  <span className="notif-item__title">{n.title}</span>
                  <p className="notif-item__preview">{n.body}</p>
                </div>
                {!n.read && <span className="notif-item__dot" />}
              </button>
            ))}
          </div>
        </>
      )}

      {view === 'msg-list' && (
        <div className="notif-list">
          <button className="notif-item notif-item--cephai" onClick={() => { onClose(); onOpenCephai() }}>
            <img className="notif-item__icon" src={CEPHAI_ICON} alt="CephAI" />
            <div className="notif-item__body">
              <span className="notif-item__title">Ask CephAI</span>
              <p className="notif-item__preview">Your HOA intelligence assistant — ask anything.</p>
            </div>
          </button>
          {CONVERSATIONS.map(c => {
            const last = lastMessage(c)
            return (
              <button key={c.id} className="notif-item" onClick={() => openChat(c)}>
                {c.isGroup ? (
                  <span className="notif-item__icon notif-item__icon--group"><GroupIcon /></span>
                ) : c.photo ? (
                  <img className="notif-item__icon" src={c.photo} alt={c.name} />
                ) : (
                  <span className="notif-item__icon notif-item__icon--group">{initialsOf(c.name)}</span>
                )}
                <div className="notif-item__body">
                  <span className="notif-item__title">{c.name}</span>
                  <p className="notif-item__preview">
                    {last ? <>{last.from ? `${last.from}: ` : ''}{last.text}</> : 'No messages yet'}
                  </p>
                </div>
                <div className="notif-item__meta">
                  <span className="notif-item__time">{last?.time || ''}</span>
                  {!c.read && <span className="notif-item__dot" />}
                </div>
              </button>
            )
          })}
        </div>
      )}

      {view === 'chat-thread' && activeConvo && (
        <>
          <div className="chat-thread__body">
            {activeConvo.messages.length === 0 && (
              <p className="chat-thread__empty">Say hello to {activeConvo.name.split(' ')[0]}!</p>
            )}
            {activeConvo.messages.map((m, i) => (
              <div key={i} className={`chat-bubble-row${m.fromMe ? ' chat-bubble-row--mine' : ''}`}>
                {m.from && <span className="chat-bubble__from">{m.from}</span>}
                <div className={`chat-bubble${m.fromMe ? ' chat-bubble--mine' : ''}`}>
                  {m.text}
                </div>
                <span className="chat-bubble__time">{m.time}</span>
              </div>
            ))}
          </div>
          <div className="chat-composer">
            <input
              className="chat-composer__input"
              type="text"
              placeholder="Type a message…"
              value={draft}
              onChange={e => setDraft(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSend() }}
            />
            <button className="chat-composer__send" onClick={handleSend} aria-label="Send" disabled={!draft.trim()}>
              <SendIcon />
            </button>
          </div>
        </>
      )}

      {view === 'new-message' && (
        <>
          <div className="notif-toolbar">
            <div className="notif-search">
              <SearchIcon />
              <input
                className="notif-search__input"
                type="text"
                placeholder="Search homeowners…"
                value={contactQuery}
                onChange={e => setContactQuery(e.target.value)}
                autoFocus
              />
              {contactQuery && (
                <button className="notif-search__clear" onClick={() => setContactQuery('')} aria-label="Clear">
                  <CloseIcon />
                </button>
              )}
            </div>
          </div>
          <div className="notif-list">
            {visibleContacts.length === 0 ? (
              <p className="notif-empty">No homeowners found.</p>
            ) : visibleContacts.map(p => (
              <button key={p.id} className="notif-item" onClick={() => handleSelectContact(p)}>
                {p.photo ? (
                  <img className="notif-item__icon" src={p.photo} alt={`${p.firstName} ${p.lastName}`} />
                ) : (
                  <span className="notif-item__icon notif-item__icon--group">{initialsOf(`${p.firstName} ${p.lastName}`)}</span>
                )}
                <div className="notif-item__body">
                  <span className="notif-item__title">{p.firstName} {p.lastName}</span>
                  <p className="notif-item__preview">{p.role || p.address}</p>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function ChevronLeftIcon() {
  return (
    <svg width="43" height="43" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  )
}

function UnreadFilterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="6"/>
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7"/>
      <line x1="16.5" y1="16.5" x2="22" y2="22"/>
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )
}

function BellIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  )
}

function GroupIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  )
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M2 21l21-9L2 3v7l15 2-15 2z"/>
    </svg>
  )
}

function ComposeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  )
}
