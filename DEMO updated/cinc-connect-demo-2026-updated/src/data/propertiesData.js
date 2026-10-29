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
    attachments: [{ name: 'sprinkler_leak.jpg', url: '/images/wo-irrigation.jpg', isImage: true }],
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
    attachments: [],
    log: [
      { date: '05/12/2026', text: 'Request submitted by homeowner.' },
      { date: '05/14/2026', text: 'Assigned to Westside Plumbing. Scheduled for 05/22.' },
    ],
  },
]

export function submitWorkOrder({ unitId, category, description, attachments = [] }) {
  const id = `wo-${WORK_ORDERS.length + 1}`
  const order = {
    id, unitId, category, description, attachments,
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
    attachments: [{ name: 'fence_site_plan.pdf', url: null, isImage: false }],
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
    attachments: [{ name: 'ACC Request Form - Exterior Paint.pdf', url: null, isImage: false }],
    log: [
      { date: '04/02/2026', text: 'Application submitted.' },
      { date: '04/16/2026', text: 'Approved by ACC committee.' },
    ],
  },
]

export function submitArchRequest({ unitId, projectType, description, attachments = [] }) {
  const id = `acr-${ARCH_REQUESTS.length + 1}`
  const request = {
    id, unitId, projectType, description, attachments,
    status: 'Under Review',
    submittedDate: TODAY,
    decisionDate: null,
    log: [{ date: TODAY, text: 'Application submitted.' }],
  }
  ARCH_REQUESTS.unshift(request)
  return request
}

// ─── Violations reported by the resident ────────────────────────────────────

export const REPORTED_VIOLATIONS = []

export function submitViolationReport({ address, violationType = 'Overgrown Lawn', ccrRef = 'CC&R § 7.2' }) {
  const id = `v-${REPORTED_VIOLATIONS.length + 1}`
  const report = {
    id, address, violationType, ccrRef,
    status: 'Pending Board Review',
    submittedDate: TODAY,
  }
  REPORTED_VIOLATIONS.unshift(report)
  return report
}

// ─── Violations against the resident's own units (owner view, like the live app) ──
// Unit 1's landscaping violation matches the $80 "Landscaping Violation Fine"
// (May 05, 2026) in financialData.js — keep both in sync.

export const MY_VIOLATIONS = [
  {
    id: 'mv-1',
    unitId: 1,
    type: 'Landscaping',
    date: '04/14/2026',
    level: '2nd Notice - Fine $80',
    status: 'Open',
    fineStarts: '05/05/2026',
    items: [
      { title: 'Overgrown Lawn', text: 'Front yard grass exceeds the 6-inch maximum height (CC&Rs Section 6.1).' },
      { title: 'Shrubs Over Sidewalk', text: 'Hedges along the sidewalk need trimming to keep the walkway clear.' },
    ],
    log: [
      { date: '04/14/2026', author: 'Management Company Note', text: '1st Notice - No Fine. Landscaping violation created after the April community inspection: front lawn over 6 in. and hedges over the sidewalk. Please correct within 14 days.' },
      { date: '04/28/2026', author: 'Management Company Note', text: '2nd Notice - Fine $80. Re-inspection found the items still open. A fine of $80 is applied on 05/05/2026. Reply here once the work is done so we can schedule a re-inspection.' },
    ],
    attachments: [{ name: 'inspection_photo_0414.jpg', url: '/images/violation-landscaping.jpg', isImage: true }],
  },
  {
    id: 'mv-2',
    unitId: 2,
    type: 'Trash / Bins',
    date: '05/12/2026',
    level: '1st Notice - No Fine',
    status: 'Open',
    fineStarts: null,
    items: [
      { title: 'Bins Visible From Street', text: 'Trash bins must be stored out of view from the street on non-collection days (CC&Rs Section 8.4).' },
    ],
    log: [
      { date: '05/12/2026', author: 'Management Company Note', text: '1st Notice - No Fine. Trash bins were visible from the street on a non-collection day. Please store them behind the gate or in the garage.' },
    ],
    attachments: [{ name: 'inspection_photo_0512.jpg', url: '/images/violation-trash.jpg', isImage: true }],
  },
  {
    id: 'mv-3',
    unitId: 3,
    type: 'Parking',
    date: '02/10/2026',
    level: 'Courtesy Notice - No Fine',
    status: 'Closed',
    fineStarts: null,
    items: [
      { title: 'Guest Space Overnight', text: 'Resident vehicle parked overnight in a guest-only space (CC&Rs Section 8.2).' },
    ],
    log: [
      { date: '02/10/2026', author: 'Management Company Note', text: 'Courtesy Notice - No Fine. A resident vehicle was parked overnight in a guest-only space.' },
      { date: '02/24/2026', author: 'Management Company Note', text: 'No further incidents observed. Violation closed. Thank you!' },
    ],
    attachments: [],
  },
]

export function addViolationNote(id, text) {
  const v = MY_VIOLATIONS.find(x => x.id === id)
  if (v) v.log.push({ date: TODAY, author: 'Homeowner Note', text })
}
