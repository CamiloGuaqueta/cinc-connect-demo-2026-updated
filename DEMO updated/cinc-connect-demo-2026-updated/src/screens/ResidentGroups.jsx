import { useState } from 'react'
import { useMode } from '../ModeContext'
import { GROUPS, joinGroup } from '../data/messagesData'
import './ResidentGroups.css'

export default function ResidentGroups() {
  const { openMessagesThread } = useMode()
  const [, bump] = useState(0)
  const rerender = () => bump(x => x + 1)

  function handleJoin(id) {
    joinGroup(id)
    rerender()
  }

  return (
    <div className="screen res-groups">
      <h1 className="res-groups__title">Groups</h1>
      <div className="res-groups__list">
        {GROUPS.map(g => (
          <div key={g.id} className="res-groups__card">
            <span className="res-groups__icon"><GroupIcon /></span>
            <div className="res-groups__body">
              <span className="res-groups__name">{g.name}</span>
              <p className="res-groups__desc">{g.description}</p>
              <span className="res-groups__members">{g.memberCount} members</span>
            </div>
            {g.joined ? (
              <button className="res-groups__action res-groups__action--message" onClick={() => openMessagesThread(g.id)}>
                Message
              </button>
            ) : (
              <button className="res-groups__action res-groups__action--join" onClick={() => handleJoin(g.id)}>
                Join
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function GroupIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  )
}
