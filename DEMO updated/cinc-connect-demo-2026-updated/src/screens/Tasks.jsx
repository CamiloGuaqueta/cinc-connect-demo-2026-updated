import { useState, useRef, useEffect } from 'react'
import { useMode } from '../ModeContext'
import './Tasks.css'
import VendorSvg    from '../ICONS/Vendor.svg'
import AttachSvg    from '../ICONS/Attachment.svg'
import ThumbsUpSvg  from '../ICONS/Thumbs-up.svg'
import BankSvg      from '../ICONS/Bank.svg'
import WoSvg        from '../ICONS/wo.svg'
import LogSvg       from '../ICONS/log.svg'
import ChecklistSvg from '../ICONS/checklist.svg'
import ChatSvg      from '../ICONS/Chat.svg'
import { ViolationCardBody, ViolOwnerPanel, ViolItemsPanel, ViolLogPanel, ViolAttachmentPanel } from '../components/ViolationCard'
const TYPE_ILLUSTRATIONS = {
  Invoice:   { src: '/images/card-invoice.jpg'   },
  WorkOrder: { src: '/images/card-workorder.jpg' },
  Violation: { src: '/images/card-violation.jpg' },
  ACC:       { src: '/images/card-acc.jpg'       },
  Task:      { src: '/images/card-task.jpg'      },
}

const TASKS = [
  {
    id: 1,
    type: 'Invoice',
    title: 'Green Valley Landscaping',
    invoiceNum: 'GVL_042026',
    invoicedDate: '04/01/2026',
    dueDate: '04/15/2026',
    glAccount: '50-2100-00',
    glDescription: 'Landscaping — Monthly Contract',
    amount: '$6,200.00',
    approversCount: 1,
    due: 'Due today',
    urgency: 'urgent',
    actionLabel: 'Approve',
    vendorInfo: { contact: 'Michael Reed', email: 'info@greenvalley.com', phone: '305.555.0142', website: 'www.greenvalleylandscaping.com', address: '245 Green Way, Miami, FL 33131', type: 'Landscaping', recentPayments: 8, currentWOs: 2, woAll: 29, woOpen: 1, woInProgress: 3, woCompleted: 25, totalInvoices: 23, totalAmount: '$25,568.00' },
    approvers: [{ name: 'Darren Wilson', role: 'President', initials: 'DW', vote: 'approve', votedAt: 'Apr 2, 2026 · 9:14 AM' }],
  },
  {
    id: 2,
    type: 'Invoice',
    title: 'Pacific Pool Services',
    invoiceNum: 'PPS_042026',
    invoicedDate: '04/01/2026',
    dueDate: '04/15/2026',
    glAccount: '50-2300-00',
    glDescription: 'Pool Maintenance — April 2026',
    amount: '$3,800.00',
    approversCount: 2,
    due: 'Due today',
    urgency: 'urgent',
    actionLabel: 'Approve',
    vendorInfo: { contact: 'Sandra Kim', email: 'contact@pacificpool.com', phone: '305.555.0187', website: 'www.pacificpoolsvc.com', address: '78 Blue Wave Dr, Miami, FL 33139', type: 'Pool Maintenance', recentPayments: 6, currentWOs: 1, woAll: 14, woOpen: 1, woInProgress: 1, woCompleted: 12, totalInvoices: 11, totalAmount: '$18,320.00' },
    approvers: [{ name: 'Darren Wilson', role: 'President', initials: 'DW', vote: 'approve', votedAt: 'Apr 2, 2026 · 9:14 AM' }, { name: 'Marcus Chen', role: 'Vice President', initials: 'MC', vote: 'approve', votedAt: 'Apr 3, 2026 · 2:41 PM' }],
  },
  {
    id: 3,
    type: 'ACC',
    address: '214 Cardinal Way',
    accType: 'Deck Installation',
    formReceived: '',
    toCommittee: '04/10/2026',
    response: '05/25/2026',
    autoApproval: '06/20/2026',
    autoApprovalUrgent: false,
    status: 'Open',
    logCount: 2,
    attachment: 'acc_deck_214.pdf',
    due: 'Decision due Apr 21',
    urgency: 'normal',
    actionLabel: 'Approve',
  },
  {
    id: 4,
    type: 'Invoice',
    title: 'Westside Plumbing',
    invoiceNum: 'WSP_041026',
    invoicedDate: '04/10/2026',
    dueDate: '04/22/2026',
    glAccount: '50-3100-00',
    glDescription: 'Emergency Repair — Clubhouse',
    amount: '$2,140.00',
    approversCount: 0,
    due: 'Due Apr 22',
    urgency: 'normal',
    actionLabel: 'Approve',
    vendorInfo: { contact: 'Tom Ramirez', email: 'support@westsideplumbing.com', phone: '305.555.0219', website: 'www.westsideplumbing.com', address: '315 West End Blvd, Miami, FL 33142', type: 'Plumbing', recentPayments: 3, currentWOs: 0, woAll: 5, woOpen: 0, woInProgress: 1, woCompleted: 4, totalInvoices: 3, totalAmount: '$4,890.00' },
    approvers: [],
  },
  {
    id: 5,
    type: 'ACC',
    address: '88 Cardinal Heights',
    accType: 'Solar Panel Installation',
    formReceived: '03/15/2026',
    toCommittee: '03/20/2026',
    response: '05/05/2026',
    autoApproval: '04/29/2026',
    autoApprovalUrgent: true,
    status: 'Open',
    logCount: 3,
    attachment: 'acc_solar_88.pdf',
    due: 'Decision due Apr 24',
    urgency: 'urgent',
    actionLabel: 'Approve',
  },
  {
    id: 6,
    type: 'Violation',
    violationType: 'Landscaping',
    acct: '2024-1588',
    address: '204 Cardinal Hills Dr',
    date: '04/02/2026',
    level: '3rd Notice - Fine Pending',
    fineStarts: '05/08/2026',
    description: 'Overgrown vegetation blocking sidewalk access and violating CC&R Section 4.2. Owner notified Feb 14, Mar 12, Apr 1 with no corrective action.',
    ownerName: 'Dalton Thomson',
    ownerPhoto: '/images/personas/dalton-thomson.png',
    ownerEmail: 'dalton.thomson@email.com',
    ownerPhone: '(555) 421-0889',
    violationCount: 2,
    logCount: 4,
    attachment: 'img_204.png',
    due: 'Hearing May 8',
    urgency: 'urgent',
    actionLabel: 'Add Note',
  },
  {
    id: 7,
    type: 'WorkOrder',
    woNumber: '#4821',
    vendor: 'Green Valley Landscaping',
    created: '04/01/2026',
    printed: '04/01/2026',
    dueDate: '04/18/2026',
    urgency: 'urgent',
    status: 'New Work Order',
    location: 'Pool area — Cardinal Hills Clubhouse, near east gate',
    description: 'Repair irrigation system leak causing flooding on pool deck. Water pooling near east fence line — needs immediate assessment and fix.',
    logCount: 3,
    attachmentCount: 4,
    due: 'Due today',
    actionLabel: 'Mark Done',
    vendorInfo: { contact: 'Michael Reed', email: 'info@greenvalley.com', phone: '305.555.0142', website: 'www.greenvalleylandscaping.com', address: '245 Green Way, Miami, FL 33131', type: 'Landscaping', recentPayments: 8, currentWOs: 2, woAll: 29, woOpen: 1, woInProgress: 3, woCompleted: 25, totalInvoices: 23, totalAmount: '$25,568.00' },
  },
  {
    id: 14,
    type: 'WorkOrder',
    woNumber: '#4822',
    vendor: 'Pacific Pool Services',
    created: '04/18/2026',
    printed: '04/18/2026',
    dueDate: '05/02/2026',
    urgency: 'normal',
    status: 'New Work Order',
    location: 'Main amenity center — pool equipment room',
    description: 'Pool pump replacement. Existing pump failing intermittently; estimated cost $3,850. Review and approve before the contractor can be scheduled.',
    logCount: 2,
    attachmentCount: 2,
    due: 'Due May 2',
    actionLabel: 'Mark Done',
    vendorInfo: { contact: 'Sandra Kim', email: 'contact@pacificpool.com', phone: '305.555.0187', website: 'www.pacificpoolsvc.com', address: '78 Blue Wave Dr, Miami, FL 33139', type: 'Pool Maintenance', recentPayments: 6, currentWOs: 1, woAll: 14, woOpen: 1, woInProgress: 1, woCompleted: 12, totalInvoices: 11, totalAmount: '$18,320.00' },
  },
  {
    id: 8,
    type: 'Task',
    title: 'Approve Unit Ownership Record Change',
    dueDate: '04/24/2026',
    category: 'Collections',
    taskStatus: null,
    description: 'Review a submitted ownership record update. No sale has occurred, however, ownership is now held under a new LLC, and supporting documentation has been provided. Please review and advise.',
    attachment: 'Violations 2025-2026',
    acctInfo: 'Acct: 2024-3096  |  150 Cardinal Point Rd',
    acctDetail: {
      address: '150 Cardinal Point Rd',
      acct: '2024-3096',
      ownerName: 'James Roberts',
      ownerPhoto: '/images/personas/james-roberts.png',
      status: 'Tenant Occupied',
      balance: '$1,195.00',
      collections: '60 Days Notice',
    },
    logCount: 2,
    due: 'Due Apr 24',
    urgency: 'urgent',
    actionLabel: 'Complete',
  },
  {
    id: 9,
    type: 'Task',
    title: 'Review Violation Trend Analysis',
    dueDate: '04/24/2026',
    category: 'Collections',
    taskStatus: 'Not Started',
    description: 'Please review the attached report, which outlines recent patterns and recurring issues within the community. Please evaluate the findings and provide guidance on any actions, policy adjustments, or enforcement measures.',
    attachment: 'Violation analysis',
    acctInfo: null,
    logCount: 2,
    due: 'Due Apr 24',
    urgency: 'urgent',
    actionLabel: 'Complete',
  },
  {
    id: 10,
    type: 'ACC',
    address: '132 Cardinal Way',
    accType: 'Fence Installation',
    formReceived: '04/05/2026',
    toCommittee: '04/08/2026',
    response: '05/20/2026',
    autoApproval: '05/08/2026',
    autoApprovalUrgent: false,
    status: 'Open',
    logCount: 2,
    attachment: 'acc_fence_132.pdf',
    due: 'Decision due May 2',
    urgency: 'normal',
    actionLabel: 'Approve',
  },
  {
    id: 11,
    type: 'ACC',
    address: '347 Cardinal Heights',
    accType: 'Exterior Paint Change',
    formReceived: '04/12/2026',
    toCommittee: '04/15/2026',
    response: '05/30/2026',
    autoApproval: '05/15/2026',
    autoApprovalUrgent: false,
    status: 'Open',
    logCount: 1,
    attachment: 'acc_paint_347.pdf',
    due: 'Decision due May 9',
    urgency: 'normal',
    actionLabel: 'Approve',
  },
  {
    id: 12,
    type: 'Task',
    title: 'Review Annual Budget Draft 2027',
    dueDate: '05/01/2026',
    category: 'Financial',
    taskStatus: 'Not Started',
    description: 'Management has submitted the first draft of the 2027 operating budget. Maintenance is projected 76% over the current-year budget and requires board direction before the draft can move to the May meeting.',
    attachment: 'Budget Draft 2027',
    acctInfo: null,
    logCount: 2,
    due: 'Due May 1',
    urgency: 'normal',
    actionLabel: 'Complete',
  },
  {
    id: 13,
    type: 'Task',
    title: 'Approve Pool Renovation Change Order',
    dueDate: '04/28/2026',
    category: 'Capital Projects',
    taskStatus: null,
    description: 'AC&M Construction Services submitted Change Order #2 for the pool renovation: additional plaster repair discovered after draining, adding $4,800 to the contract. Board approval required to keep the August 15 completion date.',
    attachment: 'Change Order #2 — AC&M',
    acctInfo: null,
    logCount: 3,
    due: 'Due Apr 28',
    urgency: 'normal',
    actionLabel: 'Complete',
  },
]

const TYPE_META = {
  Invoice:   { color: '#64a0ff', bg: 'rgba(100,160,255,0.18)', label: 'Invoice'      },
  ACC:       { color: '#ffb74d', bg: 'rgba(255,183,77,0.18)',  label: 'ACC Request'  },
  Violation: { color: '#e05c5c', bg: 'rgba(224,92,92,0.18)',   label: 'Violation'    },
  WorkOrder: { color: '#a78bfa', bg: 'rgba(167,139,250,0.18)', label: 'Work Order'   },
  Task:      { color: '#34d399', bg: 'rgba(52,211,153,0.18)',  label: 'Task'         },
}

const SWIPE_THRESHOLD = 80

// `types` (array) limits the deck to those card types and `title` overrides the
// header — used by Board Room category rows. Without props it's the full
// Board Action Items deck.
export default function Tasks({ types, title }) {
  const POOL = types ? TASKS.filter(t => types.includes(t.type)) : TASKS
  const [queue,      setQueue]      = useState(POOL.map(t => t.id))
  const [doneIds,    setDoneIds]    = useState(new Set())
  const [isDragging, setIsDragging] = useState(false)
  const [dragX,      setDragX]      = useState(0)
  const [flyOff,     setFlyOff]     = useState(null)
  const [viewMode,   setViewMode]   = useState('card')   // 'card' | 'list'
  const [filterTypes, setFilterTypes] = useState(new Set())
  const [filterOpen,  setFilterOpen]  = useState(false)
  const [draftFilter, setDraftFilter] = useState(new Set())
  const [panel,       setPanel]       = useState(null)   // { type, task }

  const startXRef  = useRef(0)
  const dragXRef   = useRef(0)
  const cardRef    = useRef(null)
  const rafRef     = useRef(null)

  const filteredQueue = filterTypes.size > 0
    ? queue.filter(id => filterTypes.has(TASKS.find(t => t.id === id)?.type))
    : queue

  const queueCounts = queue.reduce((acc, id) => {
    const type = TASKS.find(t => t.id === id)?.type
    if (type) acc[type] = (acc[type] || 0) + 1
    return acc
  }, {})

  const pendingTasks = filteredQueue.map(id => TASKS.find(t => t.id === id)).filter(Boolean)
  const topTask      = pendingTasks[0]

  const { setActiveTask, setCephAIPulseCount } = useMode()

  // Signal CephAI whenever the top card changes
  useEffect(() => {
    if (topTask) {
      setActiveTask(topTask)
      setCephAIPulseCount(c => c + 1)
    }
  }, [topTask?.id])

  const approveOpacity = Math.max(0, Math.min(1, (dragX  - 30) / 60))
  const skipOpacity    = Math.max(0, Math.min(1, (-dragX - 30) / 60))

  function handlePointerDown(e) {
    startXRef.current = e.clientX
    dragXRef.current  = 0
    setIsDragging(true)
    cardRef.current?.setPointerCapture(e.pointerId)
  }

  function handlePointerMove(e) {
    if (!isDragging) return
    if (rafRef.current) return
    const cx = e.clientX
    rafRef.current = requestAnimationFrame(() => {
      const dx = cx - startXRef.current
      dragXRef.current = dx
      setDragX(dx)
      rafRef.current = null
    })
  }

  function handlePointerUp() {
    setIsDragging(false)
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null }
    const dx = dragXRef.current
    if (Math.abs(dx) >= SWIPE_THRESHOLD) {
      flyCard(dx > 0 ? 'right' : 'left')
    } else {
      setDragX(0)
      dragXRef.current = 0
    }
  }

  function flyCard(dir) {
    setDragX(0)
    dragXRef.current = 0
    setFlyOff({ dir })
  }

  function handleTransitionEnd(e) {
    if (!flyOff || e.propertyName !== 'transform') return
    const [topId, ...rest] = queue
    if (flyOff.dir === 'right') {
      setDoneIds(prev => new Set([...prev, topId]))
      setQueue(rest)
    } else {
      setQueue([...rest, topId])
    }
    setFlyOff(null)
  }

  function getCardStyle(stackIdx) {
    const isTop = stackIdx === 0
    if (isTop) {
      if (flyOff) {
        const tx  = flyOff.dir === 'right' ? '150%' : '-150%'
        const rot = flyOff.dir === 'right' ? 22 : -22
        return { transform: `translateX(${tx}) rotate(${rot}deg)`, transition: 'transform 0.35s ease-in', zIndex: 10 }
      }
      return {
        transform:  `translateX(${dragX}px) rotate(${dragX * 0.05}deg)`,
        transition: isDragging ? 'none' : 'transform 0.3s ease-out',
        zIndex: 10,
      }
    }
    const scale  = 1 - stackIdx * 0.04
    const yShift = stackIdx * 6
    return {
      transform:  `scale(${scale}) translateY(${yShift}px)`,
      transition: 'transform 0.25s ease',
      zIndex:     10 - stackIdx,
    }
  }

  const skipLabel = topTask?.type === 'Invoice' ? 'Deny' : topTask?.type === 'Task' ? 'In Progress' : 'Skip'

  function openPanel(type, task) { setPanel({ type, task }) }
  function closePanel() { setPanel(null) }

  return (
    <div className="screen tasks-screen">
      <div className="tasks-layout">

        {/* Header */}
        <div className="tasks-header">
          <div>
            <h1 className="tasks-title">{title || 'Board Action Items'}</h1>
            <p className="tasks-sub">
              {pendingTasks.length > 0
                ? `${pendingTasks.length} pending · ${doneIds.size} completed`
                : `All ${doneIds.size} tasks completed`}
            </p>
          </div>
          {!types && (
            <div className="tasks-header-actions">
              <button
                className={`engage-filter-btn${filterTypes.size > 0 ? ' engage-filter-btn--active' : ''}`}
                onClick={() => { setDraftFilter(new Set(filterTypes)); setFilterOpen(true) }}
              >
                <SlidersIcon />
              </button>
            </div>
          )}
        </div>

        {/* Card stack or list view or empty state */}
        {viewMode === 'list' ? (
          <TaskListView tasks={pendingTasks} doneIds={doneIds} />
        ) : pendingTasks.length > 0 ? (
          <div className="swipe-stack">
            {pendingTasks.slice(0, 3).map((task, stackIdx) => (
              <div
                key={task.id}
                ref={stackIdx === 0 ? cardRef : null}
                className="swipe-card"
                style={getCardStyle(stackIdx)}
                onPointerDown={stackIdx === 0 ? handlePointerDown : undefined}
                onPointerMove={stackIdx === 0 ? handlePointerMove : undefined}
                onPointerUp={stackIdx === 0 ? handlePointerUp   : undefined}
                onPointerCancel={stackIdx === 0 ? handlePointerUp : undefined}
                onTransitionEnd={stackIdx === 0 ? handleTransitionEnd : undefined}
              >
                {stackIdx === 0 && (
                  <>
                    <div className="swipe-label swipe-label--approve" style={{ opacity: approveOpacity }}>
                      <ApproveIcon /> {topTask?.actionLabel ?? 'Approve'}
                    </div>
                    <div className="swipe-label swipe-label--skip" style={{ opacity: skipOpacity }}>
                      {skipLabel} <SkipIcon />
                    </div>
                  </>
                )}
                {/* Type pill — top right corner */}
                {(() => {
                  const m = TYPE_META[task.type]
                  return m ? (
                    <span className="card-type-pill" style={{ color: '#111', background: m.color }}>
                      {m.label}
                    </span>
                  ) : null
                })()}
                <CardContent task={task} flyCard={stackIdx === 0 ? flyCard : null} flyOff={flyOff} onOpenPanel={openPanel} />
              </div>
            ))}
          </div>
        ) : (
          <div className="tasks-empty-state">
            <div className="tasks-empty-state__check"><CheckBigIcon /></div>
            <p className="tasks-empty-state__title">All caught up</p>
            <p className="tasks-empty-state__sub">You've reviewed all {doneIds.size} tasks</p>
          </div>
        )}

        {/* Position dots — card view only */}
        {viewMode === 'card' && pendingTasks.length > 0 && (
          <div className="tasks-progress">
            {(filterTypes.size > 0 ? POOL.filter(t => filterTypes.has(t.type)) : POOL).map(t => {
              const isCurrent = t.id === topTask?.id
              const isDone    = doneIds.has(t.id)
              return (
                <div
                  key={t.id}
                  className={`tasks-progress__dot${isCurrent ? ' tasks-progress__dot--current' : isDone ? ' tasks-progress__dot--done' : ''}`}
                />
              )
            })}
          </div>
        )}

      </div>
      {panel?.type === 'vendor'         && <VendorInfoPanel    task={panel.task} onClose={closePanel} />}
      {panel?.type === 'invoice'        && <InvoicePDFPanel    task={panel.task} onClose={closePanel} />}
      {panel?.type === 'approvers'      && <ApproversPanel     task={panel.task} onClose={closePanel} />}
      {panel?.type === 'bank'           && <BankBalancePanel                     onClose={closePanel} />}
      {panel?.type === 'acc-log'        && <AccLogPanel        task={panel.task} onClose={closePanel} />}
      {panel?.type === 'acc-committee'  && <AccCommitteePanel  task={panel.task} onClose={closePanel} />}
      {panel?.type === 'acc-attachment' && <AccAttachmentPanel task={panel.task} onClose={closePanel} />}
      {panel?.type === 'acc-decision'   && <AccDecisionPanel   task={panel.task} onClose={closePanel} />}
      {panel?.type === 'wo-vendor'      && <VendorInfoPanel task={{ ...panel.task, title: panel.task.vendor }} onClose={closePanel} />}
      {panel?.type === 'wo-log'         && <WoLogPanel        task={panel.task} onClose={closePanel} />}
      {panel?.type === 'wo-attachments' && <WoAttachmentsPanel task={panel.task} onClose={closePanel} />}
      {panel?.type === 'task-attachment' && <TaskAttachmentPanel task={panel.task} onClose={closePanel} />}
      {panel?.type === 'task-acct'      && <TaskAcctPanel      task={panel.task} onClose={closePanel} />}
      {panel?.type === 'task-log'       && <TaskLogPanel       task={panel.task} onClose={closePanel} />}
      {panel?.type === 'viol-owner'      && <ViolOwnerPanel      violation={panel.task} onClose={closePanel} />}
      {panel?.type === 'viol-items'      && <ViolItemsPanel      violation={panel.task} onClose={closePanel} />}
      {panel?.type === 'viol-log'        && <ViolLogPanel        violation={panel.task} onClose={closePanel} />}
      {panel?.type === 'viol-attachment' && <ViolAttachmentPanel violation={panel.task} onClose={closePanel} />}
      {filterOpen && <TasksFilter
        selected={draftFilter}
        onToggle={type => setDraftFilter(d => {
          const s = new Set(d)
          s.has(type) ? s.delete(type) : s.add(type)
          return s
        })}
        onApply={() => { setFilterTypes(draftFilter); setFilterOpen(false) }}
        onClear={() => { setDraftFilter(new Set()); setFilterTypes(new Set()); setFilterOpen(false) }}
        onClose={() => setFilterOpen(false)}
        queueCounts={queueCounts}
      />}
    </div>
  )
}

/* ── Filter sheet ─────────────────────────────────────── */
function TasksFilter({ selected, onToggle, onApply, onClear, onClose, queueCounts }) {
  return (
    <div className="filter-sheet-wrap">
      <div className="filter-scrim" onClick={onClose} />
      <div className="filter-sheet">
        <div className="filter-sheet__handle" />
        <div className="filter-sheet__header">
          <span className="filter-sheet__title">Filter</span>
          <button className="filter-sheet__close" onClick={onClose}><TasksCloseIcon /></button>
        </div>
        <div className="filter-section">
          <p className="filter-section__label">Card Type</p>
          <div className="filter-chips">
            {Object.entries(TYPE_META).map(([type, meta]) => (
              <button
                key={type}
                className={`filter-chip${selected.has(type) ? ' filter-chip--active' : ''}`}
                onClick={() => onToggle(type)}
              >
                {meta.label}
                {queueCounts[type] > 0 && (
                  <span style={{ opacity: 0.6, fontSize: 11, marginLeft: 4 }}>({queueCounts[type]})</span>
                )}
              </button>
            ))}
          </div>
        </div>
        <button className="filter-apply" onClick={onApply}>Apply Filters</button>
        <button className="filter-clear" onClick={onClear}>Clear All</button>
      </div>
    </div>
  )
}

/* ── Task list view ───────────────────────────────────── */
function TaskListView({ tasks }) {
  if (tasks.length === 0) {
    return (
      <div className="tasks-empty-state">
        <div className="tasks-empty-state__check"><CheckBigIcon /></div>
        <p className="tasks-empty-state__title">No tasks</p>
        <p className="tasks-empty-state__sub">Nothing matches the current filter</p>
      </div>
    )
  }

  return (
    <div className="task-list">
      {tasks.map(task => {
        const meta = TYPE_META[task.type]
        const isUrgent = task.urgency === 'urgent'
        let title = ''
        let subtitle = ''
        if (task.type === 'Invoice')   { title = task.title;         subtitle = `${task.invoiceNum} · ${task.amount}` }
        if (task.type === 'ACC')       { title = task.address;       subtitle = task.accType }
        if (task.type === 'Violation') { title = task.violationType; subtitle = task.address }
        if (task.type === 'WorkOrder') { title = task.woNumber;      subtitle = task.vendor }

        return (
          <div key={task.id} className="task-list-row">
            <span
              className="task-list-row__pill"
              style={{ color: meta.color, background: meta.bg }}
            >
              {meta.label}
            </span>
            <div className="task-list-row__info">
              <span className="task-list-row__title">{title}</span>
              {subtitle && <span className="task-list-row__sub">{subtitle}</span>}
            </div>
            <span className={`task-list-row__due${isUrgent ? ' task-list-row__due--urgent' : ''}`}>
              {task.due}
            </span>
            <ChevronRowIcon />
          </div>
        )
      })}
    </div>
  )
}

/* ── Card hero image ──────────────────────────────────── */
function CardHero({ type }) {
  const illus = TYPE_ILLUSTRATIONS[type]
  if (!illus) return null
  return (
    <div className="card-hero">
      <img src={illus.src} className="card-hero__img" alt="" />
    </div>
  )
}

/* ── Card dispatcher ──────────────────────────────────── */
function CardContent({ task, flyCard, flyOff, onOpenPanel }) {
  if (task.type === 'Invoice')   return <InvoiceCardContent   task={task} flyCard={flyCard} flyOff={flyOff} onOpenPanel={onOpenPanel} />
  if (task.type === 'WorkOrder') return <WorkOrderCardContent task={task} flyCard={flyCard} flyOff={flyOff} onOpenPanel={onOpenPanel} />
  if (task.type === 'Violation') return <ViolationCardContent task={task} onOpenPanel={onOpenPanel} />
  if (task.type === 'ACC')       return <ACCCardContent       task={task} onOpenPanel={onOpenPanel} />
  if (task.type === 'Task')      return <TaskCardContent      task={task} flyCard={flyCard} flyOff={flyOff} onOpenPanel={onOpenPanel} />
  return null
}

/* ── Invoice card ─────────────────────────────────────── */
function InvoiceCardContent({ task, flyCard, flyOff, onOpenPanel }) {
  function stopDrag(e) { e.stopPropagation() }

  return (
    <div className="card-body invoice-body">
      <div className="inv-scroll">
        <CardHero type="Invoice" />

        {/* Vendor header */}
        <div className="inv-vendor">
          <img src={VendorSvg} className="inv-vendor__icon" alt="" />
          <span className="inv-vendor__name">{task.title}</span>
        </div>

        {/* Key-value fields */}
        <div className="inv-fields">
          <div className="inv-field">
            <span className="inv-field__label">Invoice #:</span>
            <span className="inv-field__value">{task.invoiceNum}</span>
          </div>
          <div className="inv-field">
            <span className="inv-field__label">Invoiced:</span>
            <span className="inv-field__value">{task.invoicedDate}</span>
          </div>
          <div className="inv-field">
            <span className="inv-field__label">Due:</span>
            <span className={`inv-field__value${task.urgency === 'urgent' ? ' inv-field__value--urgent' : ''}`}>
              {task.dueDate}
            </span>
          </div>
          <div className="inv-field">
            <span className="inv-field__label">GL Account:</span>
            <span className="inv-field__value">{task.glAccount}</span>
          </div>
          <div className="inv-field">
            <span className="inv-field__label">Description:</span>
            <span className="inv-field__value">{task.glDescription}</span>
          </div>
        </div>

        {/* Info rows */}
        <div className="inv-rows">
          <button className="inv-row" onPointerDown={stopDrag} onClick={() => onOpenPanel?.('vendor', task)}>
            <span className="inv-row__icon"><img src={VendorSvg} className="inv-row__svg" alt="" /></span>
            <span className="inv-row__content">
              <span className="inv-row__title">{task.title}</span>
              <span className="inv-row__sub">Vendor Info</span>
            </span>
            <ChevronRowIcon />
          </button>

          <button className="inv-row" onPointerDown={stopDrag} onClick={() => onOpenPanel?.('invoice', task)}>
            <span className="inv-row__icon"><img src={AttachSvg} className="inv-row__svg" alt="" /></span>
            <span className="inv-row__content">
              <span className="inv-row__title">Invoice</span>
            </span>
            <ChevronRowIcon />
          </button>

          <button className="inv-row" onPointerDown={stopDrag} onClick={() => onOpenPanel?.('approvers', task)}>
            <span className="inv-row__icon"><img src={ThumbsUpSvg} className="inv-row__svg" alt="" /></span>
            <span className="inv-row__content">
              <span className="inv-row__title">Previous Approvers</span>
            </span>
            {task.approversCount > 0 && (
              <span className="inv-row__badge">{task.approversCount}</span>
            )}
            <ChevronRowIcon />
          </button>

          <button className="inv-row inv-row--last" onPointerDown={stopDrag} onClick={() => onOpenPanel?.('bank', task)}>
            <span className="inv-row__icon"><img src={BankSvg} className="inv-row__svg" alt="" /></span>
            <span className="inv-row__content">
              <span className="inv-row__title">Bank Balance</span>
            </span>
            <ChevronRowIcon />
          </button>
        </div>

      </div>

      {/* Amount — pinned above buttons */}
      <div className="inv-amount-row">
        <span className="inv-amount-label">Invoice Amount</span>
        <span className="inv-amount">{task.amount}</span>
      </div>

      {/* Decision buttons — pinned at bottom */}
      <div className="inv-actions" onPointerDown={stopDrag}>
        <button
          className="inv-btn inv-btn--deny"
          onClick={() => flyCard && !flyOff && flyCard('left')}
        >
          <SkipIcon />
          <span>Deny</span>
        </button>
        <button
          className="inv-btn inv-btn--approve"
          onClick={() => flyCard && !flyOff && flyCard('right')}
        >
          <span>Approve</span>
          <ApproveIcon />
        </button>
      </div>
    </div>
  )
}

/* ── Work Order card ──────────────────────────────────── */
function WorkOrderCardContent({ task, flyCard, flyOff, onOpenPanel }) {
  function stopDrag(e) { e.stopPropagation() }

  return (
    <div className="card-body invoice-body">
      <div className="inv-scroll">
        <CardHero type="WorkOrder" />

        {/* WO header */}
        <div className="inv-vendor">
          <img src={WoSvg} className="inv-vendor__icon" alt="" />
          <span className="inv-vendor__name">{task.woNumber}</span>
        </div>

        {/* Key-value fields */}
        <div className="inv-fields">
          <div className="inv-field">
            <span className="inv-field__label">Created:</span>
            <span className="inv-field__value">{task.created}</span>
          </div>
          <div className="inv-field">
            <span className="inv-field__label">Printed / Emailed:</span>
            <span className="inv-field__value">{task.printed}</span>
          </div>
          <div className="inv-field">
            <span className="inv-field__label">Due:</span>
            <span className={`inv-field__value${task.urgency === 'urgent' ? ' inv-field__value--urgent' : ''}`}>
              {task.dueDate}
            </span>
          </div>
          <div className="inv-field">
            <span className="inv-field__label">Status:</span>
            <span className="inv-field__value">{task.status}</span>
          </div>
          <div className="inv-field">
            <span className="inv-field__label">Location:</span>
            <span className="inv-field__value">{task.location}</span>
          </div>
          <div className="inv-field wo-description">
            {task.description}
          </div>
        </div>

        {/* Info rows */}
        <div className="inv-rows">
          <button className="inv-row" onPointerDown={stopDrag} onClick={() => onOpenPanel?.('wo-vendor', task)}>
            <span className="inv-row__icon"><img src={VendorSvg} className="inv-row__svg" alt="" /></span>
            <span className="inv-row__content">
              <span className="inv-row__title">{task.vendor}</span>
              <span className="inv-row__sub">Vendor</span>
            </span>
            <ChevronRowIcon />
          </button>

          <button className="inv-row" onPointerDown={stopDrag} onClick={() => onOpenPanel?.('wo-log', task)}>
            <span className="inv-row__icon"><img src={LogSvg} className="inv-row__svg" alt="" /></span>
            <span className="inv-row__content">
              <span className="inv-row__title">Log &amp; Notes</span>
            </span>
            {task.logCount > 0 && (
              <span className="inv-row__badge">{task.logCount}</span>
            )}
            <ChevronRowIcon />
          </button>

          <button className="inv-row inv-row--last" onPointerDown={stopDrag} onClick={() => onOpenPanel?.('wo-attachments', task)}>
            <span className="inv-row__icon"><img src={AttachSvg} className="inv-row__svg" alt="" /></span>
            <span className="inv-row__content">
              <span className="inv-row__title">Attachments ({task.attachmentCount})</span>
            </span>
            <ChevronRowIcon />
          </button>
        </div>

      </div>

      {/* Action button — pinned at bottom */}
      <div className="wo-actions" onPointerDown={stopDrag}>
        <button className="wo-btn">Add Note</button>
      </div>
    </div>
  )
}

/* ── Violation card ───────────────────────────────────── */
function ViolationCardContent({ task, onOpenPanel }) {
  function stopDrag(e) { e.stopPropagation() }
  const status = task.level?.includes('3rd') || task.level?.includes('Fine') ? 'Escalated' : 'Open'
  const violation = {
    type:           task.violationType,
    address:        task.address,
    ownerName:      task.ownerName,
    ownerPhoto:     task.ownerPhoto,
    ownerEmail:     task.ownerEmail,
    ownerPhone:     task.ownerPhone,
    acct:           task.acct,
    date:           task.date,
    level:          task.level,
    fineStarts:     task.fineStarts,
    description:    task.description,
    violationCount: task.violationCount,
    logCount:       task.logCount,
    attachment:     task.attachment,
    status,
  }
  return (
    <div className="card-body invoice-body">
      <ViolationCardBody
        violation={violation}
        stopDrag={stopDrag}
        onOpenPanel={type => onOpenPanel?.(`viol-${type}`, violation)}
      />
    </div>
  )
}

/* ── ACC Request card ─────────────────────────────────── */
function ACCCardContent({ task, onOpenPanel }) {
  function stopDrag(e) { e.stopPropagation() }

  return (
    <div className="card-body invoice-body">
      <div className="inv-scroll">
        <CardHero type="ACC" />

        {/* Address header */}
        <div className="inv-vendor">
          <span className="inv-vendor__name acc-address">{task.address}</span>
        </div>

        {/* Key-value fields */}
        <div className="inv-fields">
          <div className="inv-field">
            <span className="inv-field__label">Type:</span>
            <span className="inv-field__value">{task.accType}</span>
          </div>
          <div className="inv-field">
            <span className="inv-field__label">Form Received:</span>
            <span className="inv-field__value">{task.formReceived || '—'}</span>
          </div>
          <div className="inv-field">
            <span className="inv-field__label">To Committee:</span>
            <span className="inv-field__value">{task.toCommittee}</span>
          </div>
          <div className="inv-field">
            <span className="inv-field__label">Response:</span>
            <span className="inv-field__value">{task.response}</span>
          </div>
          <div className="inv-field">
            <span className="inv-field__label">Auto Approval:</span>
            <span className={`inv-field__value${task.autoApprovalUrgent ? ' inv-field__value--urgent' : ''}`}>
              {task.autoApproval}
            </span>
          </div>
          <div className="inv-field">
            <span className="inv-field__label">Status:</span>
            <span className="inv-field__value">{task.status}</span>
          </div>
        </div>

        {/* Info rows */}
        <div className="inv-rows">
          <button className="inv-row" onPointerDown={stopDrag} onClick={() => onOpenPanel?.('acc-log', task)}>
            <span className="inv-row__icon"><img src={LogSvg} className="inv-row__svg" alt="" /></span>
            <span className="inv-row__content">
              <span className="inv-row__title">Log &amp; Notes</span>
            </span>
            {task.logCount > 0 && <span className="inv-row__badge">{task.logCount}</span>}
            <ChevronRowIcon />
          </button>

          <button className="inv-row" onPointerDown={stopDrag} onClick={() => onOpenPanel?.('acc-committee', task)}>
            <span className="inv-row__icon"><img src={ChatSvg} className="inv-row__svg" alt="" /></span>
            <span className="inv-row__content">
              <span className="inv-row__title">Committee</span>
            </span>
            <ChevronRowIcon />
          </button>

          <button className="inv-row inv-row--last" onPointerDown={stopDrag} onClick={() => onOpenPanel?.('acc-attachment', task)}>
            <span className="inv-row__icon"><img src={AttachSvg} className="inv-row__svg" alt="" /></span>
            <span className="inv-row__content">
              <span className="inv-row__title">{task.attachment}</span>
            </span>
            <ChevronRowIcon />
          </button>
        </div>

      </div>

      {/* Action buttons — pinned at bottom */}
      <div className="acc-actions" onPointerDown={stopDrag}>
        <button className="acc-btn acc-btn--decision" onClick={() => onOpenPanel?.('acc-decision', task)}>Add Decision</button>
      </div>
    </div>
  )
}

/* ── Task card ────────────────────────────────────────── */
function TaskCardContent({ task, flyCard, flyOff, onOpenPanel }) {
  function stopDrag(e) { e.stopPropagation() }

  return (
    <div className="card-body invoice-body">
      <div className="inv-scroll">
        <CardHero type="Task" />

        {/* Meta fields */}
        <div className="task-meta">
          <div className="task-meta__row">
            <span className="task-meta__label">Due Date:</span>
            <span className={`task-meta__value${task.urgency === 'urgent' ? ' task-meta__value--urgent' : ''}`}>{task.dueDate}</span>
          </div>
          <div className="task-meta__row">
            <span className="task-meta__label">Category:</span>
            <span className="task-meta__value">{task.category}</span>
          </div>
          {task.taskStatus && (
            <div className="task-meta__row">
              <span className="task-meta__label">Status:</span>
              <span className="task-meta__value">{task.taskStatus}</span>
            </div>
          )}
        </div>

        {/* Title */}
        <p className="task-card__title">{task.title}</p>

        {/* Description */}
        <p className="task-card__desc">{task.description}</p>

        {/* Info rows */}
        <div className="inv-rows">
          {task.attachment && (
            <button className="inv-row" onPointerDown={stopDrag} onClick={() => onOpenPanel?.('task-attachment', task)}>
              <span className="inv-row__icon"><img src={AttachSvg} className="inv-row__svg" alt="" /></span>
              <span className="inv-row__content">
                <span className="inv-row__title">{task.attachment}</span>
              </span>
              <ChevronRowIcon />
            </button>
          )}
          {task.acctInfo && (
            <button className="inv-row" onPointerDown={stopDrag} onClick={() => onOpenPanel?.('task-acct', task)}>
              <span className="inv-row__icon"><img src={BankSvg} className="inv-row__svg" alt="" /></span>
              <span className="inv-row__content">
                <span className="inv-row__title">Account Info</span>
                <span className="inv-row__sub task-acct-info">{task.acctInfo}</span>
              </span>
              <ChevronRowIcon />
            </button>
          )}
          <button className="inv-row inv-row--last" onPointerDown={stopDrag} onClick={() => onOpenPanel?.('task-log', task)}>
            <span className="inv-row__icon"><img src={LogSvg} className="inv-row__svg" alt="" /></span>
            <span className="inv-row__content">
              <span className="inv-row__title">Log &amp; Messages</span>
            </span>
            {task.logCount > 0 && <span className="inv-row__badge">{task.logCount}</span>}
            <ChevronRowIcon />
          </button>
        </div>

      </div>

      {/* Action buttons */}
      <div className="task-actions" onPointerDown={stopDrag}>
        <button
          className="task-btn task-btn--progress"
          onClick={() => flyCard && !flyOff && flyCard('left')}
        >
          In Progress
        </button>
        <button
          className="task-btn task-btn--complete"
          onClick={() => flyCard && !flyOff && flyCard('right')}
        >
          Completed
        </button>
      </div>
    </div>
  )
}

/* ── Shared panel header ──────────────────────────────── */
function PanelHeader({ title, hideTitle, onClose }) {
  return (
    <header className="app-header inv-panel__appheader">
      <div className="app-header__inner">
        <div className="app-header__left">
          <button className="app-header__back" onClick={onClose} aria-label="Back">
            <PanelBackIcon />
          </button>
          {!hideTitle && (
            <div className="app-header__hoa">
              <span className="app-header__hoa-name">{title}</span>
            </div>
          )}
        </div>
        <div className="app-header__right">
          <button className="notif-btn" aria-label="Notifications">
            <PanelBellIcon />
            <span className="notif-btn__badge">5</span>
          </button>
        </div>
      </div>
      <div className="app-header__divider" />
    </header>
  )
}

/* ── Vendor Info panel ────────────────────────────────── */
function VendorInfoPanel({ task, onClose }) {
  const v = task.vendorInfo || {}
  return (
    <div className="inv-panel">
      <PanelHeader title="Vendor Info" hideTitle onClose={onClose} />
      <div className="inv-panel__body">
        <h2 className="inv-panel__page-title">Vendor Info</h2>

        {/* Vendor card */}
        <div className="vend-card">
          <div className="vend-name-row">
            <img src={VendorSvg} className="vend-name-row__icon" alt="" />
            <span className="vend-name-row__name">{task.title}</span>
          </div>
          <div className="vend-fields">
            {[
              ['Contact Name', v.contact],
              ['Email',        v.email],
              ['Phone Number', v.phone],
              ['Website',      v.website],
              ['Address',      v.address],
              ['Type',         v.type],
            ].map(([label, value]) => (
              <div key={label} className="vend-field">
                <span className="vend-field__label">{label}:</span>
                <span className="vend-field__value">{value}</span>
              </div>
            ))}
          </div>
          <div className="vend-card__divider" />
          <div className="vend-links">
            <button className="vend-link">
              <span className="vend-link__icon"><img src={AttachSvg} className="inv-row__svg" alt="" /></span>
              <span>Recent Vendor Payments</span>
              <ChevronRowIcon />
            </button>
            <button className="vend-link vend-link--last">
              <span className="vend-link__icon"><img src={WoSvg} className="inv-row__svg" alt="" /></span>
              <span>Current Work Orders ({v.currentWOs ?? 0})</span>
              <ChevronRowIcon />
            </button>
          </div>
        </div>

        {/* Work Orders Summary */}
        <p className="vend-section-title">Work Orders Summary</p>
        <div className="vend-wo-grid">
          {[
            { label: 'All',         value: v.woAll,         icon: <WoAllIcon /> },
            { label: 'Open',        value: v.woOpen,        icon: <WoOpenIcon /> },
            { label: 'In Progress', value: v.woInProgress,  icon: <WoProgressIcon /> },
            { label: 'Completed',   value: v.woCompleted,   icon: <WoCompletedIcon /> },
          ].map(({ label, value, icon }) => (
            <div key={label} className="vend-wo-cell">
              <div className="vend-wo-cell__top">
                <span className="vend-wo-cell__icon">{icon}</span>
                <span className="vend-wo-cell__count">{value}</span>
              </div>
              <span className="vend-wo-cell__label">{label}</span>
            </div>
          ))}
        </div>

        {/* Total Paid Invoices */}
        <p className="vend-section-title">Total Paid Invoices</p>
        <div className="vend-invoice-card">
          <div className="vend-invoice-card__top">
            <img src={AttachSvg} className="vend-invoice-card__icon" alt="" />
            <span className="vend-invoice-card__count">{v.totalInvoices}</span>
          </div>
          <div className="vend-invoice-card__bottom">
            <span className="vend-invoice-card__label">Last 6 Months</span>
            <span className="vend-invoice-card__amount">{v.totalAmount}</span>
          </div>
        </div>

      </div>
    </div>
  )
}

/* ── Invoice PDF panel ────────────────────────────────── */
function InvoicePDFPanel({ task, onClose }) {
  const v = task.vendorInfo || {}
  return (
    <div className="inv-panel">
      <PanelHeader title="Invoice" hideTitle onClose={onClose} />
      <div className="inv-panel__body inv-panel__body--pdf">
        <h2 className="inv-panel__page-title">Invoice</h2>
        <div className="pdf-doc">
          <div className="pdf-header">
            <div>
              <p className="pdf-from">{task.title}</p>
              {v.address && <p className="pdf-address">{v.address}</p>}
              {v.contact && <p className="pdf-contact">{v.contact}</p>}
              {v.email   && <p className="pdf-email">{v.email}</p>}
            </div>
            <div className="pdf-badge">INVOICE</div>
          </div>
          <div className="pdf-divider" />
          <div className="pdf-meta">
            <div><span className="pdf-meta__label">Invoice #</span><span className="pdf-meta__val">{task.invoiceNum}</span></div>
            <div><span className="pdf-meta__label">Date</span><span className="pdf-meta__val">{task.invoicedDate}</span></div>
            <div><span className="pdf-meta__label">Due Date</span><span className="pdf-meta__val">{task.dueDate}</span></div>
          </div>
          <div className="pdf-divider" />
          <div className="pdf-bill-to">
            <p className="pdf-bill-to__label">BILL TO</p>
            <p className="pdf-bill-to__name">Cardinal Hills HOA</p>
            <p className="pdf-bill-to__addr">1200 Cardinal Dr, Miami, FL 33130</p>
          </div>
          <div className="pdf-divider" />
          <div className="pdf-table">
            <div className="pdf-table__head"><span>Description</span><span>Amount</span></div>
            <div className="pdf-table__row"><span>{task.glDescription}</span><span>{task.amount}</span></div>
            <div className="pdf-table__row"><span className="pdf-table__gl">GL: {task.glAccount}</span><span /></div>
          </div>
          <div className="pdf-divider" />
          <div className="pdf-total">
            <span>TOTAL DUE</span>
            <span className="pdf-total__amount">{task.amount}</span>
          </div>
          <div className="pdf-footer">
            <p>Thank you for your business.</p>
            {v.website && <p>{v.website}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Approvers panel ──────────────────────────────────── */
const ALL_BOARD_MEMBERS = [
  { name: 'Darren Wilson', role: 'President',      initials: 'DW' },
  { name: 'Marcus Chen',   role: 'Vice President', initials: 'MC' },
  { name: 'Lisa Thompson',  role: 'Treasurer',      initials: 'LT' },
  { name: 'John Parker',    role: 'Secretary',      initials: 'JP' },
  { name: 'Maria Garcia',   role: 'Director',       initials: 'MG' },
]

function ApproversPanel({ task, onClose }) {
  const approvedMap = Object.fromEntries((task.approvers || []).map(a => [a.name, a]))
  const members = ALL_BOARD_MEMBERS.map(m => ({ ...m, ...(approvedMap[m.name] ?? { vote: 'pending' }) }))
  return (
    <div className="inv-panel">
      <PanelHeader title="Previous Approvers" hideTitle onClose={onClose} />
      <div className="inv-panel__body">
        <h2 className="inv-panel__page-title">Previous Approvers</h2>
        <p className="approvers-sub">{task.approversCount} of {ALL_BOARD_MEMBERS.length} board members voted</p>
        <div className="approvers-list">
          {members.map(m => (
            <div key={m.name} className="approver-row">
              <div className="approver-avatar">{m.initials}</div>
              <div className="approver-info">
                <span className="approver-name">{m.name}</span>
                <span className="approver-role">{m.role}</span>
                {m.votedAt && <span className="approver-date">{m.votedAt}</span>}
              </div>
              <div className={`approver-vote approver-vote--${m.vote}`}>
                {m.vote === 'approve' ? <ThumbsUpVoteIcon /> : m.vote === 'deny' ? <ThumbsDownVoteIcon /> : <PendingVoteIcon />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Bank Balance panel ───────────────────────────────── */
const PANEL_BANK_ACCOUNTS = [
  { name: 'Depository Account', balance: 284620, registered: 261480 },
  { name: 'Reserves Account',   balance: 512340, registered: 512340 },
]
const PANEL_RESERVE = { funded: 512340, target: 607000, pct: 84, qoqDelta: 2.4 }
function fmtBank(n) { return '$' + Math.abs(n).toLocaleString() }

function BankBalancePanel({ onClose }) {
  const [bankTab, setBankTab] = useState('balance')
  return (
    <div className="inv-panel">
      <PanelHeader title="Bank Balance" hideTitle onClose={onClose} />
      <div className="inv-panel__body">
        <h2 className="inv-panel__page-title">Bank Balance</h2>
        <div className="viol-tabs" style={{ marginBottom: 16 }}>
          {[['balance', 'Balance'], ['reserve', 'Reserve Fund']].map(([key, label]) => (
            <button key={key} className={`viol-tab${bankTab === key ? ' viol-tab--active' : ''}`} onClick={() => setBankTab(key)}>{label}</button>
          ))}
        </div>
        {bankTab === 'balance' && <>
          <div className="bank-card__header"><span className="bank-card__all-label">All Accounts</span></div>
          <p className="bank-card__total">{fmtBank(PANEL_BANK_ACCOUNTS.reduce((s, a) => s + a.balance, 0))}</p>
          <div className="bank-accounts">
            {PANEL_BANK_ACCOUNTS.map((acct, i) => {
              const hasPending = acct.registered !== acct.balance
              const diff = acct.registered - acct.balance
              return (
                <div key={acct.name} className={`bank-account${i < PANEL_BANK_ACCOUNTS.length - 1 ? ' bank-account--border' : ''}`}>
                  <div className="bank-account__left">
                    <span className="bank-account__name">{acct.name}</span>
                    {hasPending && <span className={`bank-account__pending ${diff < 0 ? 'bank-account__pending--debit' : 'bank-account__pending--credit'}`}>{diff < 0 ? '↓' : '↑'} {fmtBank(Math.abs(diff))} pending</span>}
                  </div>
                  <div className="bank-account__right">
                    <span className="bank-account__balance">{fmtBank(acct.balance)}</span>
                    <span className="bank-account__reg-row"><span className="bank-account__reg-label">Registered</span><span className="bank-account__reg-val">{fmtBank(acct.registered)}</span></span>
                  </div>
                </div>
              )
            })}
          </div>
        </>}
        {bankTab === 'reserve' && (
          <div className="reserve-body" style={{ height: 'auto' }}>
            <div className="reserve-hero">
              <p className="reserve-pct"><span className="reserve-pct__num">{PANEL_RESERVE.pct}</span><span className="reserve-pct__unit">%</span></p>
              <span className="reserve-qoq">↗ +{PANEL_RESERVE.qoqDelta}pp QoQ</span>
            </div>
            <div className="reserve-bottom" style={{ marginTop: 24 }}>
              <div className="reserve-bar">
                <div className="reserve-bar__fill" style={{ width: `${PANEL_RESERVE.pct}%` }} />
                <div className="reserve-bar__tick" style={{ left: '33%' }} />
                <div className="reserve-bar__tick" style={{ left: '66%' }} />
              </div>
              <div className="reserve-labels">
                <span className="reserve-labels__funded">{fmtBank(PANEL_RESERVE.funded)}<span className="reserve-labels__word"> funded</span></span>
                <span className="reserve-labels__target">target <strong>{fmtBank(PANEL_RESERVE.target)}</strong></span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── ACC Log & Notes panel ────────────────────────────── */
const ACC_LOG_MESSAGES = {
  3: [
    { id: 1, from: 'homeowner', name: 'Alex Rivera',  avatar: '/images/avatar-1.jpg', time: 'Mar 28 \u00b7 10:02 AM', text: "Hi, I've submitted my deck installation application along with the site plan and material specs. Please let me know if anything else is needed." },
    { id: 2, from: 'committee', name: 'Committee',    avatar: '/images/cinc-icon.png', time: 'Apr 2 \u00b7 9:18 AM',   text: "Thank you for your submission! We've received all documents. Your request has been forwarded to the full committee and will be reviewed at the April 10th meeting." },
    { id: 3, from: 'homeowner', name: 'Alex Rivera',  avatar: '/images/avatar-1.jpg', time: 'Apr 12 \u00b7 3:45 PM',  text: 'Just checking in \u2014 any update after the April 10th meeting?' },
    { id: 4, from: 'committee', name: 'Committee',    avatar: '/images/cinc-icon.png', time: 'Apr 14 \u00b7 11:30 AM', text: "The committee reviewed your application. We'd like clarification on the composite decking material. Could you provide the manufacturer's spec sheet and color sample?" },
  ],
  5: [
    { id: 1, from: 'homeowner', name: 'Jordan Kim',   avatar: '/images/avatar-3.jpg', time: 'Mar 15 \u00b7 2:10 PM',  text: "I've submitted the solar panel application with the full engineering drawings and HOA assessment report as requested. All panels will be flush-mounted, not visible from the street." },
    { id: 2, from: 'committee', name: 'Committee',    avatar: '/images/cinc-icon.png', time: 'Mar 20 \u00b7 10:05 AM', text: "Thank you Jordan. Application received and forwarded to the committee. We'll confirm within the standard 45-day review window." },
    { id: 3, from: 'homeowner', name: 'Jordan Kim',   avatar: '/images/avatar-3.jpg', time: 'Apr 5 \u00b7 8:55 AM',   text: 'The installer is ready to schedule. Is there an estimated decision date?' },
    { id: 4, from: 'committee', name: 'Committee',    avatar: '/images/cinc-icon.png', time: 'Apr 8 \u00b7 4:00 PM',  text: "We're targeting a decision by April 24. The main question is roof penetration \u2014 please have your contractor confirm the waterproofing method in writing." },
    { id: 5, from: 'homeowner', name: 'Jordan Kim',   avatar: '/images/avatar-3.jpg', time: 'Apr 10 \u00b7 9:22 AM', text: "Attached the contractor's waterproofing statement. Let me know if you need anything else." },
  ],
  10: [
    { id: 1, from: 'homeowner', name: 'Carol Green',  avatar: '/images/personas/carol-green.png', time: 'Apr 5 \u00b7 11:20 AM', text: "Submitted my fence application with the site plan. It's a 6 ft wood fence along the rear property line, stopping at the front building line per the guidelines." },
    { id: 2, from: 'committee', name: 'Committee',    avatar: '/images/cinc-icon.png', time: 'Apr 8 \u00b7 9:40 AM',  text: 'Thank you Carol \u2014 application received and forwarded to the committee. Review is scheduled within the standard window; decision expected by May 2.' },
  ],
  11: [
    { id: 1, from: 'homeowner', name: 'Ethan Young',  avatar: '/images/personas/ethan-young.png', time: 'Apr 12 \u00b7 4:15 PM', text: "Requesting approval to repaint the exterior in Sage Green with Warm White trim \u2014 both from the approved palette. Color samples attached." },
  ],
}

const ACC_COMMITTEE_MESSAGES = {
  3: [
    { id: 1, name: 'Darren Wilson',   role: 'President',      avatar: '/images/avatar-1.jpg',      time: 'Apr 10 \u00b7 6:05 PM', text: 'I reviewed the site plan. Deck footprint is well within setback limits. Structure looks solid.' },
    { id: 2, name: 'Marcus Chen',     role: 'Vice President', avatar: '/images/avatar-3.jpg',      time: 'Apr 10 \u00b7 6:22 PM', text: "Agreed on setbacks. My concern is the material \u2014 the color swatch in the application is hard to read. I'd like a proper spec sheet before we vote." },
    { id: 3, name: 'Thomas Lowes',    role: 'Treasurer',      avatar: '/images/avatar-linkedin.jpg', time: 'Apr 11 \u00b7 8:40 AM', text: "Concur with Marcus. Let's hold approval pending the spec sheet. We can vote at the next meeting once we have it." },
    { id: 4, name: 'Lisa Thomas',     role: 'Secretary',      avatar: '/images/avatar-2.jpg',      time: 'Apr 11 \u00b7 9:15 AM', text: "Makes sense. I'll draft the clarification request to the homeowner today." },
  ],
  5: [
    { id: 1, name: 'Rachel Park',     role: 'Member at Large', avatar: '/images/avatar-4.jpg',     time: 'Mar 21 \u00b7 3:10 PM', text: 'Solar application looks comprehensive. Engineering drawings are well done. Flush-mounted so street visibility is a non-issue.' },
    { id: 2, name: 'Darren Wilson',   role: 'President',      avatar: '/images/avatar-1.jpg',      time: 'Mar 21 \u00b7 3:45 PM', text: "Agree. My only flag is the roof penetration method \u2014 we've had leaks in this HOA before. Need contractor waterproofing confirmation before we approve." },
    { id: 3, name: 'Marcus Chen',     role: 'Vice President', avatar: '/images/avatar-3.jpg',      time: 'Mar 22 \u00b7 10:00 AM', text: "That's fair. Auto-approval deadline is Apr 29 so we have time. Let's request it." },
    { id: 4, name: 'Thomas Lowes',    role: 'Treasurer',      avatar: '/images/avatar-linkedin.jpg', time: 'Apr 10 \u00b7 2:15 PM', text: "Waterproofing statement just came in \u2014 looks good. TPO membrane, fully bonded. I'm comfortable approving once Lisa confirms the doc is complete." },
    { id: 5, name: 'Lisa Thomas',     role: 'Secretary',      avatar: '/images/avatar-2.jpg',      time: 'Apr 10 \u00b7 4:30 PM', text: 'Reviewed. Doc is complete and meets our standards. Ready to vote.' },
  ],
  10: [
    { id: 1, name: 'Darren Wilson',   role: 'President',      avatar: '/images/avatar-1.jpg',      time: 'Apr 14 \u00b7 5:40 PM', text: 'Fence spec is wood, 6 ft, rear property line \u2014 within \u00a75.2 limits. No issues from my side.' },
    { id: 2, name: 'Lisa Thomas',     role: 'Secretary',      avatar: '/images/avatar-2.jpg',      time: 'Apr 15 \u00b7 9:05 AM', text: "Site plan shows it stops at the front building line, which is correct. Ready to vote whenever it's agendized." },
  ],
  11: [
    { id: 1, name: 'Marcus Chen',     role: 'Vice President', avatar: '/images/avatar-3.jpg',      time: 'Apr 18 \u00b7 7:20 PM', text: 'Requested color is Sage Green \u2014 already on the approved palette. This one should be quick.' },
  ],
}

function AccLogPanel({ task, onClose }) {
  const messages = ACC_LOG_MESSAGES[task.id] || []
  const [draft, setDraft] = useState('')
  return (
    <div className="inv-panel">
      <PanelHeader title="Log & Notes" hideTitle onClose={onClose} />
      <div className="inv-panel__body acc-chat-body">
        <h2 className="inv-panel__page-title">Log &amp; Notes</h2>
        <p className="acc-chat-meta">{task.address} · {task.accType}</p>
        <div className="acc-chat-log">
          {messages.map(msg => (
            <div key={msg.id} className={`acc-bubble-row acc-bubble-row--${msg.from}`}>
              {msg.from !== 'homeowner' && (
                <img className="acc-bubble-avatar" src={msg.avatar} alt={msg.name} />
              )}
              <div className="acc-bubble-wrap">
                <span className="acc-bubble-name">{msg.name} · {msg.time}</span>
                <div className={`acc-bubble acc-bubble--${msg.from}`}>{msg.text}</div>
              </div>
              {msg.from === 'homeowner' && (
                <img className="acc-bubble-avatar" src={msg.avatar} alt={msg.name} />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="acc-chat-input">
        <input
          className="acc-chat-input__field"
          placeholder="Add a note…"
          value={draft}
          onChange={e => setDraft(e.target.value)}
        />
        <button className="acc-chat-input__send" disabled={!draft.trim()} aria-label="Send">
          <SendIcon />
        </button>
      </div>
    </div>
  )
}

/* ── ACC Committee panel ──────────────────────────────── */
function AccCommitteePanel({ task, onClose }) {
  const messages = ACC_COMMITTEE_MESSAGES[task.id] || []
  const [draft, setDraft] = useState('')
  return (
    <div className="inv-panel">
      <PanelHeader title="Committee" hideTitle onClose={onClose} />
      <div className="inv-panel__body acc-chat-body">
        <h2 className="inv-panel__page-title">Committee</h2>
        <div className="acc-committee-badge">
          <LockIcon />
          <span>Private — not visible to homeowner</span>
        </div>
        <p className="acc-chat-meta">{task.address} · {task.accType}</p>
        <div className="acc-chat-log">
          {messages.map(msg => (
            <div key={msg.id} className="acc-bubble-row acc-bubble-row--committee">
              <img className="acc-bubble-avatar" src={msg.avatar} alt={msg.name} />
              <div className="acc-bubble-wrap">
                <span className="acc-bubble-name">{msg.name} · <span className="acc-bubble-role">{msg.role}</span> · {msg.time}</span>
                <div className="acc-bubble acc-bubble--committee">{msg.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="acc-chat-input">
        <input
          className="acc-chat-input__field"
          placeholder="Add a comment…"
          value={draft}
          onChange={e => setDraft(e.target.value)}
        />
        <button className="acc-chat-input__send" disabled={!draft.trim()} aria-label="Send">
          <SendIcon />
        </button>
      </div>
    </div>
  )
}

/* ── ACC Attachment panel ─────────────────────────────── */
// Application details per ACC request type — used by the attachment PDF view
const ACC_PDF = {
  'Deck Installation': {
    owner: 'Alex Rivera', phone: '305.555.0198', email: 'a.rivera@email.com',
    start: 'May 10, 2026', complete: 'Jun 14, 2026', contractor: 'Sunrise Deck Co.',
    desc: 'Proposed installation of a 12×16 ft composite deck off the rear sliding door, pressure-treated frame, Trex Transcend composite boards in Tiki Torch color. Footings per local code.',
    materials: [['Decking', 'Trex Transcend — Tiki Torch'], ['Frame', 'Pressure-treated lumber'], ['Railing', 'Aluminum — Charcoal Black']],
    sketch: <>Deck<br/>12×16</>,
    sketchClass: 'acc-sketch-deck',
  },
  'Solar Panel Installation': {
    owner: 'Jordan Kim', phone: '305.555.0234', email: 'j.kim@email.com',
    start: 'May 5, 2026', complete: 'Jun 1, 2026', contractor: 'SolarBright LLC',
    desc: 'Roof-mounted photovoltaic system, 18 panels (400W each), flush-mounted on rear south-facing slope. Fully permitted. TPO waterproofing membrane, no street visibility.',
    materials: [['Panels', 'SunPower M-Series 400W'], ['Mounting', 'IronRidge flush rail'], ['Waterproof', 'TPO membrane, fully bonded']],
    sketch: <>Solar Panels<br/>(Rear Roof)</>,
    sketchClass: 'acc-sketch-solar',
  },
  'Fence Installation': {
    owner: 'Carol Green', phone: '305.555.0271', email: 'carol.green@email.com',
    start: 'May 15, 2026', complete: 'May 29, 2026', contractor: 'Cardinal Fence & Gate',
    desc: '6 ft cedar privacy fence along the rear property line, stopping at the front building line per CC&R §5.2. Posts set in concrete, stained to match home exterior.',
    materials: [['Fencing', 'Cedar — natural stain'], ['Posts', '4×4 cedar, concrete set'], ['Hardware', 'Galvanized black']],
    sketch: <>Fence<br/>(Rear Line)</>,
    sketchClass: 'acc-sketch-deck',
  },
  'Exterior Paint Change': {
    owner: 'Ethan Young', phone: '305.555.0312', email: 'ethan.young@email.com',
    start: 'May 20, 2026', complete: 'Jun 5, 2026', contractor: 'ProCoat Painting',
    desc: 'Full exterior repaint. Body: Sage Green; trim: Warm White; front door: Forest Green — all colors from the community-approved palette.',
    materials: [['Body', 'Sage Green — approved palette'], ['Trim', 'Warm White'], ['Door', 'Forest Green']],
    sketch: <>Paint<br/>(Full Exterior)</>,
    sketchClass: 'acc-sketch-solar',
  },
}

function AccAttachmentPanel({ task, onClose }) {
  const pdf = ACC_PDF[task.accType] ?? ACC_PDF['Deck Installation']
  return (
    <div className="inv-panel">
      <PanelHeader title="Attachment" hideTitle onClose={onClose} />
      <div className="inv-panel__body inv-panel__body--pdf">
        <h2 className="inv-panel__page-title">Attachment</h2>

        {/* Page 1 — Application */}
        <div className="pdf-doc acc-pdf-doc">
          <div className="acc-pdf-header">
            <div className="acc-pdf-logo">Cardinal Hills HOA</div>
            <div className="acc-pdf-title">Architectural Change Request</div>
            <div className="acc-pdf-sub">Application Form · {task.attachment}</div>
          </div>
          <div className="pdf-divider" />
          <div className="acc-pdf-section">
            <p className="acc-pdf-label">HOMEOWNER INFORMATION</p>
            <div className="acc-pdf-row"><span>Owner</span><span>{pdf.owner}</span></div>
            <div className="acc-pdf-row"><span>Property</span><span>{task.address}, Miami, FL 33130</span></div>
            <div className="acc-pdf-row"><span>Phone</span><span>{pdf.phone}</span></div>
            <div className="acc-pdf-row"><span>Email</span><span>{pdf.email}</span></div>
          </div>
          <div className="pdf-divider" />
          <div className="acc-pdf-section">
            <p className="acc-pdf-label">PROJECT DESCRIPTION</p>
            <div className="acc-pdf-row"><span>Type</span><span>{task.accType}</span></div>
            <div className="acc-pdf-row"><span>Est. Start</span><span>{pdf.start}</span></div>
            <div className="acc-pdf-row"><span>Est. Complete</span><span>{pdf.complete}</span></div>
            <div className="acc-pdf-row"><span>Contractor</span><span>{pdf.contractor}</span></div>
            <p className="acc-pdf-desc">{pdf.desc}</p>
          </div>
          <div className="pdf-divider" />
          <div className="acc-pdf-section">
            <p className="acc-pdf-label">MATERIALS &amp; FINISHES</p>
            {pdf.materials.map(([label, value]) => (
              <div className="acc-pdf-row" key={label}><span>{label}</span><span>{value}</span></div>
            ))}
          </div>
        </div>

        {/* Page 2 — Site Plan */}
        <div className="pdf-doc acc-pdf-doc acc-pdf-doc--page2">
          <p className="acc-pdf-label" style={{marginBottom:12}}>SITE PLAN / SKETCH</p>
          <div className="acc-pdf-sketch">
            <div className="acc-sketch-house">
              <div className="acc-sketch-label">House</div>
              <div className={pdf.sketchClass}>{pdf.sketch}</div>
            </div>
            <div className="acc-sketch-yard">Rear Yard</div>
          </div>
          <p className="acc-pdf-note">Not to scale. For illustrative purposes only. Full engineering drawings attached separately.</p>
        </div>

        {/* Page 3 — Signatures */}
        <div className="pdf-doc acc-pdf-doc acc-pdf-doc--page3">
          <p className="acc-pdf-label" style={{marginBottom:12}}>CERTIFICATION &amp; SIGNATURE</p>
          <p className="acc-pdf-cert">I certify that the information provided is accurate and that all work will be performed in accordance with applicable codes, the CC&amp;Rs, and the Cardinal Hills HOA Architectural Guidelines.</p>
          <div className="acc-pdf-sig-row">
            <div className="acc-pdf-sig-block">
              <div className="acc-pdf-sig-line" />
              <span>Homeowner Signature</span>
            </div>
            <div className="acc-pdf-sig-block">
              <div className="acc-pdf-sig-line" />
              <span>Date</span>
            </div>
          </div>
          <div className="pdf-divider" style={{margin:'20px 0'}} />
          <p className="acc-pdf-label" style={{marginBottom:12}}>FOR COMMITTEE USE ONLY</p>
          <div className="acc-pdf-row"><span>Received</span><span>{task.formReceived || '—'}</span></div>
          <div className="acc-pdf-row"><span>To Committee</span><span>{task.toCommittee}</span></div>
          <div className="acc-pdf-row"><span>Response Due</span><span>{task.response}</span></div>
          <div className="acc-pdf-row"><span>Auto Approval</span><span>{task.autoApproval}</span></div>
          <div className="acc-pdf-row"><span>Status</span><span>{task.status}</span></div>
          <div className="acc-pdf-sig-row" style={{marginTop:24}}>
            <div className="acc-pdf-sig-block">
              <div className="acc-pdf-sig-line" />
              <span>Committee Chair</span>
            </div>
            <div className="acc-pdf-sig-block">
              <div className="acc-pdf-sig-line" />
              <span>Decision Date</span>
            </div>
          </div>
          <p className="pdf-footer" style={{marginTop:16}}>Cardinal Hills HOA · Architectural Review Committee · 1200 Cardinal Dr, Miami FL 33130</p>
        </div>

      </div>
    </div>
  )
}

/* ── Work Order panels ────────────────────────────────── */
const WO_LOG_MESSAGES = {
  7: [
    { id: 1, from: 'committee', name: 'Community Manager', avatar: '/images/cinc-icon.png', time: 'Apr 1 · 8:40 AM',  text: 'Work order created from resident report — standing water on the pool deck near the east gate. Green Valley notified and asked to assess this week.' },
    { id: 2, from: 'homeowner', name: 'Green Valley Landscaping', avatar: '/images/avatar-3.jpg', time: 'Apr 2 · 2:15 PM', text: 'Crew inspected today. Confirmed a cracked lateral line on zone 4. We can repair Thursday; deck area will be cordoned off for ~4 hours.' },
    { id: 3, from: 'committee', name: 'Community Manager', avatar: '/images/cinc-icon.png', time: 'Apr 3 · 9:05 AM',  text: 'Approved to proceed Thursday. Please photograph the line before and after repair for the file.' },
  ],
  14: [
    { id: 1, from: 'committee', name: 'Community Manager', avatar: '/images/cinc-icon.png', time: 'Apr 18 · 10:12 AM', text: 'Pump tripping intermittently since Monday. Pacific Pool quoted $3,850 for a like-for-like replacement, 2-year warranty. Board approval needed before scheduling.' },
    { id: 2, from: 'homeowner', name: 'Pacific Pool Services', avatar: '/images/avatar-3.jpg', time: 'Apr 18 · 3:40 PM', text: 'Quote attached. Unit is in stock — we can install within 3 business days of approval. Pool would be closed one morning only.' },
  ],
}

const WO_ATTACHMENT_IMAGES = [
  '/images/card-workorder.jpg',
  '/images/card-violation.jpg',
  '/images/card-task.jpg',
  '/images/card-acc.jpg',
]

function WoLogPanel({ task, onClose }) {
  const messages = WO_LOG_MESSAGES[task.id] || []
  const [draft, setDraft] = useState('')
  return (
    <div className="inv-panel">
      <PanelHeader title="Log & Notes" hideTitle onClose={onClose} />
      <div className="inv-panel__body acc-chat-body">
        <h2 className="inv-panel__page-title">Log &amp; Notes</h2>
        <p className="acc-chat-meta">{task.woNumber} · {task.vendor}</p>
        <div className="acc-chat-log">
          {messages.map(msg => (
            <div key={msg.id} className={`acc-bubble-row acc-bubble-row--${msg.from}`}>
              {msg.from !== 'homeowner' && (
                <img className="acc-bubble-avatar" src={msg.avatar} alt={msg.name} />
              )}
              <div className="acc-bubble-wrap">
                <span className="acc-bubble-name">{msg.name} · {msg.time}</span>
                <div className={`acc-bubble acc-bubble--${msg.from}`}>{msg.text}</div>
              </div>
              {msg.from === 'homeowner' && (
                <img className="acc-bubble-avatar" src={msg.avatar} alt={msg.name} />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="acc-chat-input">
        <input
          className="acc-chat-input__field"
          placeholder="Add a note…"
          value={draft}
          onChange={e => setDraft(e.target.value)}
        />
        <button className="acc-chat-input__send" disabled={!draft.trim()} aria-label="Send">
          <SendIcon />
        </button>
      </div>
    </div>
  )
}

function WoAttachmentsPanel({ task, onClose }) {
  const files = Array.from({ length: task.attachmentCount }, (_, i) =>
    `${task.woNumber.replace('#', 'wo_')}_photo_${i + 1}.jpg`)
  return (
    <div className="inv-panel">
      <PanelHeader title="Attachments" hideTitle onClose={onClose} />
      <div className="inv-panel__body inv-panel__body--pdf">
        <h2 className="inv-panel__page-title">Attachments ({files.length})</h2>
        <div className="viol-attachments-list">
          {files.map((filename, i) => (
            <div key={filename} className="viol-attachment-item">
              <p className="viol-attach-filename">{filename}</p>
              <img src={WO_ATTACHMENT_IMAGES[i % WO_ATTACHMENT_IMAGES.length]} className="viol-evidence-img" alt={`Attachment ${i + 1}`} />
              <p className="viol-evidence-caption">Site photo {i + 1} of {files.length} · {task.created}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Board Task panels ────────────────────────────────── */
const TASK_LOG_MESSAGES = {
  8: [
    { id: 1, from: 'committee', name: 'Community Manager', avatar: '/images/cinc-icon.png', time: 'Apr 18 · 9:30 AM', text: 'Ownership record update submitted for 150 Cardinal Point Rd — title moved to Roberts Family Holdings LLC. No sale occurred; supporting documentation attached. Board review requested.' },
    { id: 2, from: 'committee', name: 'Thomas Lowes · Treasurer', avatar: '/images/avatar-linkedin.jpg', time: 'Apr 20 · 6:45 PM', text: 'Note: this account carries a $1,195 delinquent balance at 60 Days Notice. Confirm with counsel that the LLC transfer does not affect the collection track before we approve the record change.' },
  ],
  9: [
    { id: 1, from: 'committee', name: 'Community Manager', avatar: '/images/cinc-icon.png', time: 'Apr 15 · 11:00 AM', text: 'Violation trend report for Jan–Apr attached. Cure rate is up to 73% but landscaping cases doubled with spring inspections. Recommendations included for board review.' },
    { id: 2, from: 'committee', name: 'Darren Wilson · President', avatar: '/images/avatar-1.jpg', time: 'Apr 17 · 8:20 PM', text: "Let's discuss the direct-letter protocol at the May meeting — the cure-rate lift looks worth expanding to home exterior cases." },
  ],
  12: [
    { id: 1, from: 'committee', name: 'Community Manager', avatar: '/images/cinc-icon.png', time: 'Apr 22 · 10:15 AM', text: '2027 budget draft uploaded. Key decision: Maintenance line — current run rate projects $127K vs $72K budgeted this year. Draft proposes $96K plus a reserve-funded deferred repairs plan.' },
    { id: 2, from: 'committee', name: 'Thomas Lowes · Treasurer', avatar: '/images/avatar-linkedin.jpg', time: 'Apr 23 · 7:50 PM', text: 'I support the split approach. Flagging that the insurance renewal quotes (due May 31) could move the total ±3% — we should hold final adoption until those land.' },
  ],
  13: [
    { id: 1, from: 'committee', name: 'Community Manager', avatar: '/images/cinc-icon.png', time: 'Apr 21 · 9:00 AM', text: 'AC&M submitted Change Order #2: additional plaster repair found after draining, +$4,800. Without approval this week, the plaster crew moves to another job and completion slips ~3 weeks.' },
    { id: 2, from: 'committee', name: 'Marcus Chen · Vice President', avatar: '/images/avatar-3.jpg', time: 'Apr 21 · 6:30 PM', text: 'Scope looks legitimate — the photos show real delamination. Reserve fund has capacity per the 2026 study.' },
    { id: 3, from: 'committee', name: 'Darren Wilson · President', avatar: '/images/avatar-1.jpg', time: 'Apr 22 · 8:10 AM', text: 'Agreed. Adding to this week’s agenda for a vote so we protect the August 15 completion date.' },
  ],
}

// Attachment documents for board tasks — rendered as a simple report PDF
const TASK_REPORTS = {
  8: {
    title: 'Violation History — 150 Cardinal Point Rd',
    sub: 'Violations 2025-2026 · Acct 2024-3096',
    sections: [
      { label: 'OPEN ITEMS', rows: [['None', '—']] },
      { label: 'HISTORY', rows: [
        ['Trash / bins — 1st notice', 'Sep 2025 · Cured'],
        ['Parking — 1st notice', 'Jan 2026 · Cured'],
      ]},
      { label: 'ACCOUNT STATUS', rows: [
        ['Balance', '$1,195.00'],
        ['Collections', '60 Days Notice'],
        ['Occupancy', 'Tenant Occupied'],
      ]},
    ],
    note: 'Compiled by management for the ownership record review. Violation history follows the property, not the owner of record.',
  },
  9: {
    title: 'Violation Trend Analysis',
    sub: 'January – April 2026 · Cardinal Hills HOA',
    sections: [
      { label: 'SUMMARY', rows: [
        ['Total violations YTD', '97'],
        ['April total', '15 (−21% vs March)'],
        ['Cure rate (April)', '73%'],
        ['Cure rate (YTD avg)', '65%'],
      ]},
      { label: 'TOP TYPES YTD', rows: [
        ['Landscaping', '38 (39%)'],
        ['Parking', '24 (25%)'],
        ['Home Exterior', '19 (20%)'],
        ['Architectural', '11 (11%)'],
      ]},
    ],
    note: 'Direct owner letters correlate with a 31% higher cure rate. Recommendation: expand the protocol to home exterior cases and send a spring landscaping broadcast.',
  },
  12: {
    title: 'Budget Draft 2027',
    sub: 'First draft · Prepared by management, April 2026',
    sections: [
      { label: 'KEY LINES (ANNUAL)', rows: [
        ['Maintenance', '$96,000 (was $72,000)'],
        ['Landscaping', '$148,000'],
        ['Insurance', '$162,000 (pending quotes)'],
        ['Total operating', '$588,400 (+7.1%)'],
      ]},
      { label: 'ASSESSMENT IMPACT', rows: [
        ['Monthly increase per unit', '+$14'],
        ['Reserve contribution', '+$18 (per 2026 study)'],
      ]},
    ],
    note: 'Deferred pool-era repairs move to the reserve fund per the 2026 Reserve Study recommendation. Final adoption targeted for the June meeting.',
  },
  13: {
    title: 'Change Order #2 — AC&M Construction',
    sub: 'Pool Renovation · Contract CH-2026-011',
    sections: [
      { label: 'CHANGE ORDER', rows: [
        ['Scope', 'Additional plaster repair — 340 sq ft'],
        ['Amount', '+$4,800.00'],
        ['Revised contract total', '$41,520.00'],
        ['Schedule impact', 'None if approved by Apr 28'],
      ]},
      { label: 'FUNDING', rows: [
        ['Source', 'Reserve fund — pool resurfacing line'],
        ['Reserve balance', '$1,245,360.00'],
      ]},
    ],
    note: 'Delamination discovered after draining, documented with photos on file. Approval this week preserves the August 15 completion date.',
  },
}

function TaskAttachmentPanel({ task, onClose }) {
  const report = TASK_REPORTS[task.id]
  if (!report) return null
  return (
    <div className="inv-panel">
      <PanelHeader title="Attachment" hideTitle onClose={onClose} />
      <div className="inv-panel__body inv-panel__body--pdf">
        <h2 className="inv-panel__page-title">{task.attachment}</h2>
        <div className="pdf-doc acc-pdf-doc">
          <div className="acc-pdf-header">
            <div className="acc-pdf-logo">Cardinal Hills HOA</div>
            <div className="acc-pdf-title">{report.title}</div>
            <div className="acc-pdf-sub">{report.sub}</div>
          </div>
          {report.sections.map(section => (
            <div key={section.label}>
              <div className="pdf-divider" />
              <div className="acc-pdf-section">
                <p className="acc-pdf-label">{section.label}</p>
                {section.rows.map(([label, value]) => (
                  <div className="acc-pdf-row" key={label}><span>{label}</span><span>{value}</span></div>
                ))}
              </div>
            </div>
          ))}
          <div className="pdf-divider" />
          <div className="acc-pdf-section">
            <p className="acc-pdf-desc">{report.note}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function TaskAcctPanel({ task, onClose }) {
  const d = task.acctDetail
  if (!d) return null
  return (
    <div className="inv-panel">
      <PanelHeader title="Account Info" hideTitle onClose={onClose} />
      <div className="inv-panel__body">
        <h2 className="inv-panel__page-title">Account Info</h2>
        <div className="viol-contact-card">
          <div className="viol-contact-avatar">
            <img src={d.ownerPhoto} alt={d.ownerName} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
          </div>
          <div className="viol-contact-name">{d.ownerName}</div>
          <div className="viol-contact-role">Owner of Record</div>
        </div>
        <div className="vend-card" style={{ marginTop: 16 }}>
          <div className="vend-fields">
            <div className="vend-field"><span className="vend-field__label">Address:</span><span className="vend-field__value">{d.address}</span></div>
            <div className="vend-field"><span className="vend-field__label">Account #:</span><span className="vend-field__value">{d.acct}</span></div>
            <div className="vend-field"><span className="vend-field__label">Occupancy:</span><span className="vend-field__value">{d.status}</span></div>
            <div className="vend-field"><span className="vend-field__label">Balance:</span><span className="vend-field__value">{d.balance}</span></div>
            <div className="vend-field"><span className="vend-field__label">Collections:</span><span className="vend-field__value">{d.collections}</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TaskLogPanel({ task, onClose }) {
  const messages = TASK_LOG_MESSAGES[task.id] || []
  const [draft, setDraft] = useState('')
  return (
    <div className="inv-panel">
      <PanelHeader title="Log & Messages" hideTitle onClose={onClose} />
      <div className="inv-panel__body acc-chat-body">
        <h2 className="inv-panel__page-title">Log &amp; Messages</h2>
        <p className="acc-chat-meta">{task.title}</p>
        <div className="acc-chat-log">
          {messages.map(msg => (
            <div key={msg.id} className="acc-bubble-row acc-bubble-row--committee">
              <img className="acc-bubble-avatar" src={msg.avatar} alt={msg.name} />
              <div className="acc-bubble-wrap">
                <span className="acc-bubble-name">{msg.name} · {msg.time}</span>
                <div className="acc-bubble acc-bubble--committee">{msg.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="acc-chat-input">
        <input
          className="acc-chat-input__field"
          placeholder="Add a message…"
          value={draft}
          onChange={e => setDraft(e.target.value)}
        />
        <button className="acc-chat-input__send" disabled={!draft.trim()} aria-label="Send">
          <SendIcon />
        </button>
      </div>
    </div>
  )
}

/* ── ACC Decision panel ───────────────────────────────── */
const DECISION_OPTIONS = [
  {
    key: 'approve',
    label: 'Approve',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    color: '#6bcb77',
    bg: 'rgba(107,203,119,0.10)',
    border: 'rgba(107,203,119,0.30)',
  },
  {
    key: 'stipulations',
    label: 'Approve With Stipulations',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
    color: '#ffb74d',
    bg: 'rgba(255,183,77,0.10)',
    border: 'rgba(255,183,77,0.30)',
  },
  {
    key: 'deny',
    label: 'Deny',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    color: '#e05c5c',
    bg: 'rgba(224,92,92,0.10)',
    border: 'rgba(224,92,92,0.30)',
  },
]

function AccDecisionPanel({ task, onClose }) {
  const [selected, setSelected] = useState(null)
  const [comment, setComment] = useState('')
  const canSubmit = selected !== null

  return (
    <div className="inv-panel">
      <PanelHeader title="Add Decision" hideTitle onClose={onClose} />
      <div className="inv-panel__body acc-decision-body">
        <h2 className="inv-panel__page-title">Add Decision</h2>
        <p className="acc-decision-meta">{task.address} · {task.accType}</p>

        <p className="acc-decision-label">Your Decision</p>
        <div className="acc-decision-options">
          {DECISION_OPTIONS.map(opt => (
            <button
              key={opt.key}
              className={`acc-decision-opt${selected === opt.key ? ' acc-decision-opt--selected' : ''}`}
              style={{
                '--opt-color': opt.color,
                '--opt-bg': opt.bg,
                '--opt-border': opt.border,
              }}
              onClick={() => setSelected(opt.key)}
            >
              <span className="acc-decision-opt__icon">{opt.icon}</span>
              <span className="acc-decision-opt__label">{opt.label}</span>
              {selected === opt.key && (
                <span className="acc-decision-opt__check">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
              )}
            </button>
          ))}
        </div>

        <p className="acc-decision-label" style={{marginTop: 20}}>Comment <span className="acc-decision-optional">(optional)</span></p>
        <textarea
          className="acc-decision-textarea"
          placeholder="Add a note about your decision…"
          rows={4}
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
      </div>

      <div className="acc-decision-footer">
        <button
          className={`acc-decision-submit${canSubmit ? ' acc-decision-submit--active' : ''}`}
          disabled={!canSubmit}
          onClick={onClose}
        >
          Submit Decision
        </button>
      </div>
    </div>
  )
}

/* ── Icons ────────────────────────────────────────────── */
function SlidersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="4" y1="6" x2="20" y2="6"/><circle cx="8" cy="6" r="2" fill="currentColor" stroke="none"/>
      <line x1="4" y1="12" x2="20" y2="12"/><circle cx="16" cy="12" r="2" fill="currentColor" stroke="none"/>
      <line x1="4" y1="18" x2="20" y2="18"/><circle cx="10" cy="18" r="2" fill="currentColor" stroke="none"/>
    </svg>
  )
}
function TasksCloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )
}
function ListViewIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6"/>
      <line x1="8" y1="12" x2="21" y2="12"/>
      <line x1="8" y1="18" x2="21" y2="18"/>
      <line x1="3" y1="6" x2="3.01" y2="6"/>
      <line x1="3" y1="12" x2="3.01" y2="12"/>
      <line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
  )
}
function CardViewIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="9" height="9" rx="1"/>
      <rect x="13" y="3" width="9" height="9" rx="1"/>
      <rect x="2" y="13" width="9" height="9" rx="1"/>
      <rect x="13" y="13" width="9" height="9" rx="1"/>
    </svg>
  )
}
function ApproveIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}
function SkipIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6L6 18M6 6l12 12"/>
    </svg>
  )
}
function CheckBigIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}
function AlertIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#e05c5c', flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  )
}
function ChevronRowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFF8EA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.75 }}>
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  )
}
function WoAllIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
}
function WoOpenIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
}
function WoProgressIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
}
function WoCompletedIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>
}
function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  )
}
function LockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  )
}
function PanelBellIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  )
}
function PanelBackIcon() {
  return (
    <svg width="43" height="43" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  )
}
function ThumbsUpVoteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/>
      <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
    </svg>
  )
}
function ThumbsDownVoteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z"/>
      <path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
    </svg>
  )
}
function PendingVoteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  )
}
