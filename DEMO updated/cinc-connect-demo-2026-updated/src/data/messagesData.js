// ─── Notifications ──────────────────────────────────────────────────────────

export const NOTIFICATIONS = [
  {
    id: 1,
    title: 'New Invoice Pending Approval',
    body: 'Green Valley Landscaping submitted Invoice #GVL_042026 for $6,200.00 — Landscaping Monthly Contract. Due April 15. Your approval is required before payment can be processed.',
    time: '10 min ago',
    read: false,
  },
  {
    id: 2,
    title: 'Violation Hearing Decision Required',
    body: '9 violation hearings are scheduled for tonight\'s board meeting at 5:30 PM. Cases include Tang, Chen, Ahluwalia and 6 others. Fine amounts and decisions need board vote.',
    time: '45 min ago',
    read: false,
  },
  {
    id: 3,
    title: 'ACC Request — Auto Approval Approaching',
    body: '88 Cardinal Heights solar panel installation request will auto-approve on April 29 if no board decision is made. Please review the application and submit your decision.',
    time: '2 hrs ago',
    read: false,
  },
  {
    id: 4,
    title: 'Delinquency Threshold Exceeded',
    body: 'Total community delinquency has reached $84,210 — up $19,400 from last month. 4 accounts are now eligible for lien or foreclosure proceedings per CC&R Section 12.4.',
    time: '3 hrs ago',
    read: false,
  },
  {
    id: 5,
    title: 'New Work Order Submitted',
    body: 'A new work order has been submitted for pool pump replacement at the main amenity center. Estimated cost is $3,850. Review and approve before the contractor can be scheduled.',
    time: '5 hrs ago',
    read: false,
  },
  {
    id: 6,
    title: 'Board Meeting Tonight — Zoom Link Ready',
    body: 'Your April 19 board meeting begins at 5:30 PM via Zoom. The board packet has been uploaded. Executive session starts at 6:30 PM. Quorum requires 3 of 5 members.',
    time: 'Yesterday',
    read: true,
  },
  {
    id: 7,
    title: 'Reserve Study Update Available',
    body: 'The 2026 Reserve Study has been completed and is ready for board review. Key findings include a 59.4% funded status and a recommended $18 monthly increase per unit starting January 2027.',
    time: '2 days ago',
    read: true,
  },
  {
    id: 8,
    title: 'Homeowner Appeal Filed',
    body: 'Resident at 61 Cardinal Way has filed a formal appeal against the $250 fine issued for unauthorized fence modification. The appeal hearing must be scheduled within 30 days per CC&Rs.',
    time: '3 days ago',
    read: true,
  },
  {
    id: 9,
    title: 'Insurance Renewal Due',
    body: 'The community\'s general liability and D&O insurance policies are up for renewal on May 31. Three quotes have been received. Board approval required before binding coverage.',
    time: '4 days ago',
    read: true,
  },
  {
    id: 10,
    title: 'Contractor Bid Received — Parking Lot',
    body: 'All three bids for the parking lot resurfacing project have been received. Bids range from $41,000 to $67,500. Full comparison document has been uploaded to the board portal.',
    time: '1 week ago',
    read: true,
  },
]

export function markNotificationRead(id) {
  const n = NOTIFICATIONS.find(n => n.id === id)
  if (n) n.read = true
}

// ─── Messages ────────────────────────────────────────────────────────────────

export const CONVERSATIONS = [
  {
    id: 'darren',
    name: 'Darren Wilson',
    role: 'President',
    photo: '/images/personas/darren-wilson.jpg',
    read: false,
    messages: [
      { fromMe: false, text: "Hey Thomas — can you take a look at the Green Valley invoice before Thursday's meeting? Wanted your sign-off ahead of time.", time: '9:14 AM' },
      { fromMe: true, text: 'Yep, pulling it up now. The landscaping one for $6,200?', time: '9:20 AM' },
      { fromMe: false, text: "That's the one. Also — Pacific Pool sent over the quote for the pump replacement, WO #4822. I'll forward it after the meeting.", time: '9:22 AM' },
    ],
  },
  {
    id: 'lisa',
    name: 'Lisa Thomas',
    role: 'Secretary',
    photo: '/images/avatar-2.jpg',
    read: true,
    messages: [
      { fromMe: false, text: "Minutes from last week's meeting are ready for your review before we file them with the county.", time: 'Yesterday' },
      { fromMe: true, text: 'Looks good on my end, thanks for turning those around so fast.', time: 'Yesterday' },
    ],
  },
  {
    id: 'thomaslowes',
    name: 'Thomas Lowes',
    role: 'Treasurer',
    photo: '/images/avatar-linkedin.jpg',
    read: true,
    messages: [
      { fromMe: false, text: "Wanted to flag — the Reserve Study came back at 59.4% funded. I'll present the $18/month increase proposal at the July annual meeting.", time: '2 days ago' },
      { fromMe: true, text: "Makes sense, let's make sure that's clearly explained in the notice.", time: '2 days ago' },
    ],
  },
  {
    id: 'pickleball',
    name: 'Pickleball Group',
    isGroup: true,
    read: false,
    messages: [
      { fromMe: false, from: 'Sophia Diaz', text: 'Anyone free for open play Saturday morning?', time: '3 days ago' },
      { fromMe: false, from: 'Ethan Young', text: "I'm in! 9am?", time: '3 days ago' },
      { fromMe: true, text: 'Count me in too.', time: '3 days ago' },
    ],
  },
  {
    id: 'william',
    name: 'William Walker',
    photo: '/images/personas/william-walker.png',
    read: true,
    messages: [
      { fromMe: false, text: 'Thanks for the intro at the meet-and-greet — appreciate you making time to chat about the board seat.', time: '4 days ago' },
      { fromMe: true, text: 'Of course, good luck with the campaign!', time: '4 days ago' },
    ],
  },
  {
    id: 'sophia',
    name: 'Sophia Diaz',
    photo: '/images/personas/sophia-diaz.png',
    read: true,
    messages: [
      { fromMe: false, text: 'Hi Thomas! Do you know when Green Valley is coming back out to finish the trimming near our block?', time: '5 days ago' },
      { fromMe: true, text: "I believe they're scheduled for next week — I'll confirm and let you know.", time: '5 days ago' },
    ],
  },
]

export function markConversationRead(id) {
  const c = CONVERSATIONS.find(c => c.id === id)
  if (c) c.read = true
}

export function sendMessage(id, text) {
  const c = CONVERSATIONS.find(c => c.id === id)
  if (!c) return
  c.messages.push({ fromMe: true, text, time: 'Just now' })
}

export function lastMessage(convo) {
  return convo.messages[convo.messages.length - 1]
}
