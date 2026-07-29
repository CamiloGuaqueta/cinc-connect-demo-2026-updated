import { CURRENT_USER } from './userData'

const TODAY = '05/19/2026'

export function unitById(id) {
  return CURRENT_USER.units.find(u => u.id === id)
}

// ─── Work Orders ─────────────────────────────────────────────────────────────

export const WORK_ORDER_CATEGORIES = [
  'Plumbing', 'Electrical', 'HVAC', 'Landscaping', 'Pest Control', 'General Maintenance', 'Other',
]

export const WORK_ORDERS = [
  {
    id: 'wo-2',
    unitId: 2,
    category: 'Landscaping',
    description: 'Sprinkler head broken near the front walkway, spraying onto the driveway.',
    status: 'Completed',
    submittedDate: '04/28/2026',
    vendor: 'Green Valley Landscaping',
    log: [
      { date: '04/28/2026', text: 'Request submitted by homeowner.' },
      { date: '04/30/2026', text: 'Green Valley Landscaping dispatched.' },
      { date: '05/02/2026', text: 'Sprinkler head replaced. Work order closed.' },
    ],
  },
  {
    id: 'wo-1',
    unitId: 1,
    category: 'Plumbing',
    description: 'Slow drain in the master bathroom sink.',
    status: 'Scheduled',
    submittedDate: '05/12/2026',
    vendor: 'Westside Plumbing',
    log: [
      { date: '05/12/2026', text: 'Request submitted by homeowner.' },
      { date: '05/14/2026', text: 'Assigned to Westside Plumbing. Scheduled for 05/22.' },
    ],
  },
]

export function submitWorkOrder({ unitId, category, description }) {
  const id = `wo-${WORK_ORDERS.length + 1}`
  const order = {
    id, unitId, category, description,
    status: 'Submitted',
    submittedDate: TODAY,
    vendor: null,
    log: [{ date: TODAY, text: 'Request submitted by homeowner.' }],
  }
  WORK_ORDERS.unshift(order)
  return order
}

// ─── Architectural Requests (ACC) ────────────────────────────────────────────

export const ARCH_PROJECT_TYPES = [
  'Exterior Paint', 'Fence Installation', 'Landscaping Change', 'Solar Panels', 'Deck/Patio', 'Roofing', 'Other',
]

export const ARCH_REQUESTS = [
  {
    id: 'acr-2',
    unitId: 4,
    projectType: 'Fence Installation',
    description: '6-ft cedar privacy fence along the rear property line.',
    status: 'Under Review',
    submittedDate: '05/10/2026',
    decisionDate: null,
    log: [
      { date: '05/10/2026', text: 'Application submitted.' },
      { date: '05/13/2026', text: 'Assigned to Architectural Review Committee for site review.' },
    ],
  },
  {
    id: 'acr-1',
    unitId: 1,
    projectType: 'Exterior Paint',
    description: 'Repaint exterior trim from white to Sage Green, matching the Committee-approved palette.',
    status: 'Approved',
    submittedDate: '04/02/2026',
    decisionDate: '04/16/2026',
    log: [
      { date: '04/02/2026', text: 'Application submitted.' },
      { date: '04/16/2026', text: 'Approved by ACC committee.' },
    ],
  },
]

export function submitArchRequest({ unitId, projectType, description }) {
  const id = `acr-${ARCH_REQUESTS.length + 1}`
  const request = {
    id, unitId, projectType, description,
    status: 'Under Review',
    submittedDate: TODAY,
    decisionDate: null,
    log: [{ date: TODAY, text: 'Application submitted.' }],
  }
  ARCH_REQUESTS.unshift(request)
  return request
}
