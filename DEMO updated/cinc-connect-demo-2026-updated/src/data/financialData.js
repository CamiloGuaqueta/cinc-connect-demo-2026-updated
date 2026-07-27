// Financial Hub canon data — Cardinal Hills HOA, Thomas Bravo's 4 units.
// "Today" of the demo is ~05/19/2026 (matches Bank Summary's "As of" date).

export function fmt(n) {
  return '$' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const PAYMENT_METHODS = [
  {
    id: 'bank1',
    label: 'Bank Account 1 - 5695',
    sub: 'Checking BOA',
    type: 'bank',
    editable: false,
  },
  {
    id: 'bank2',
    label: 'Bank Account 2 - 8698',
    sub: 'Joint Bank Account Checking',
    type: 'bank',
    editable: false,
  },
  {
    id: 'visa1',
    label: 'Visa - 2564',
    sub: 'Credit Card Business',
    type: 'card',
    editable: true,
    nickname: 'Personal CC Chase',
    number: '**** ****** *2564',
    expiry: '02/28',
    cvc: '356',
    address: '180 Crandon Blvd',
    state: 'FL',
    zip: '33138',
  },
  {
    id: 'applepay',
    label: 'Apple Pay',
    sub: 'Amex, Discover, Mastercard, Visa',
    type: 'wallet',
    editable: false,
  },
  {
    id: 'googlepay',
    label: 'Google Pay',
    sub: 'Amex, Discover, Mastercard, Visa',
    type: 'wallet',
    editable: false,
  },
]

export const UNITS = [
  {
    id: 1,
    label: '319 Cardinal Hills Dr',
    account: 'CH:6523',
    balance: 750.41,
    futureBalance: 2368.00,
    lineItems: [
      {
        label: 'Regular Charges',
        autopay: false,
        amount: 500.00,
        ledger: [
          { date: 'May 15, 2026', items: [
            { label: 'Monthly Assessment — May', sub: 'Recurrent Charge', amount: '$500.00' },
          ] },
          { date: 'Apr 15, 2026', items: [
            { label: 'Online Payment', sub: 'Thank you', amount: '-$500.00' },
            { label: 'Monthly Assessment — April', sub: 'Recurrent Charge', amount: '$500.00' },
          ] },
          { date: 'Mar 15, 2026', items: [
            { label: 'Online Payment', sub: 'Thank you', amount: '-$500.00' },
            { label: 'Monthly Assessment — March', sub: 'Recurrent Charge', amount: '$500.00' },
          ] },
        ],
      },
      {
        label: 'Special Assessment',
        autopay: true,
        amount: 70.41,
        ledger: [
          { date: 'May 01, 2026', items: [
            { label: '2026 Special Assessment 5/12', sub: 'AutoPay', amount: '$70.41' },
          ] },
          { date: 'Apr 01, 2026', items: [
            { label: 'AutoPay Payment', sub: 'Thank you', amount: '-$70.41' },
            { label: '2026 Special Assessment 4/12', sub: 'Recurrent Charge', amount: '$70.41' },
          ] },
        ],
      },
      {
        label: 'Violations',
        autopay: false,
        amount: 80.00,
        ledger: [
          { date: 'May 05, 2026', items: [
            { label: 'Landscaping Violation Fine', sub: 'Violation Charge', amount: '$80.00' },
          ] },
        ],
      },
    ],
  },
  {
    id: 2,
    label: '47 Pinecrest Loop',
    account: 'CH:7841',
    balance: 320.00,
    futureBalance: 960.00,
    lineItems: [
      {
        label: 'Regular Charges',
        autopay: false,
        amount: 320.00,
        ledger: [
          { date: 'May 15, 2026', items: [
            { label: 'Monthly Assessment — May', sub: 'Recurrent Charge', amount: '$320.00' },
          ] },
          { date: 'Apr 15, 2026', items: [
            { label: 'Online Payment', sub: 'Thank you', amount: '-$320.00' },
            { label: 'Monthly Assessment — April', sub: 'Recurrent Charge', amount: '$320.00' },
          ] },
        ],
      },
      { label: 'Special Assessment', autopay: false, amount: 0.00, ledger: [] },
      { label: 'Violations',         autopay: false, amount: 0.00, ledger: [] },
    ],
  },
  {
    id: 3,
    label: '200 Cardinal Hills Dr, Unit 3',
    account: 'CH:9902',
    balance: 0.00,
    futureBalance: 500.00,
    lineItems: [
      {
        label: 'Regular Charges',
        autopay: true,
        amount: 0.00,
        ledger: [
          { date: 'May 01, 2026', items: [
            { label: 'AutoPay Payment', sub: 'Thank you', amount: '-$400.00' },
            { label: 'Monthly Assessment — May', sub: 'Recurrent Charge', amount: '$400.00' },
          ] },
          { date: 'Apr 01, 2026', items: [
            { label: 'AutoPay Payment', sub: 'Thank you', amount: '-$400.00' },
            { label: 'Monthly Assessment — April', sub: 'Recurrent Charge', amount: '$400.00' },
          ] },
        ],
      },
      { label: 'Special Assessment', autopay: false, amount: 0.00, ledger: [] },
      { label: 'Violations',         autopay: false, amount: 0.00, ledger: [] },
    ],
  },
  {
    id: 4,
    label: '400 Cardinal Point Rd, Unit 2',
    account: 'CH:4417',
    balance: 125.50,
    futureBalance: 750.00,
    lineItems: [
      {
        label: 'Regular Charges',
        autopay: false,
        amount: 125.50,
        ledger: [
          { date: 'May 15, 2026', items: [
            { label: 'Monthly Assessment — May', sub: 'Recurrent Charge', amount: '$125.50' },
          ] },
          { date: 'Apr 15, 2026', items: [
            { label: 'Online Payment', sub: 'Thank you', amount: '-$125.50' },
            { label: 'Monthly Assessment — April', sub: 'Recurrent Charge', amount: '$125.50' },
          ] },
        ],
      },
      { label: 'Special Assessment', autopay: false, amount: 0.00, ledger: [] },
      { label: 'Violations',         autopay: false, amount: 0.00, ledger: [] },
    ],
  },
]

// Monthly statements per unit, Jan–May 2026.
export const STATEMENTS = {
  1: [
    { month: 'May 2026', date: '05/15/2026', amount: 650.41, filename: 'Statement_2026-05.pdf' },
    { month: 'Apr 2026', date: '04/15/2026', amount: 570.41, filename: 'Statement_2026-04.pdf' },
    { month: 'Mar 2026', date: '03/15/2026', amount: 500.00, filename: 'Statement_2026-03.pdf' },
    { month: 'Feb 2026', date: '02/15/2026', amount: 500.00, filename: 'Statement_2026-02.pdf' },
    { month: 'Jan 2026', date: '01/15/2026', amount: 500.00, filename: 'Statement_2026-01.pdf' },
  ],
  2: [
    { month: 'May 2026', date: '05/15/2026', amount: 320.00, filename: 'Statement_2026-05.pdf' },
    { month: 'Apr 2026', date: '04/15/2026', amount: 320.00, filename: 'Statement_2026-04.pdf' },
    { month: 'Mar 2026', date: '03/15/2026', amount: 320.00, filename: 'Statement_2026-03.pdf' },
    { month: 'Feb 2026', date: '02/15/2026', amount: 320.00, filename: 'Statement_2026-02.pdf' },
    { month: 'Jan 2026', date: '01/15/2026', amount: 320.00, filename: 'Statement_2026-01.pdf' },
  ],
  3: [
    { month: 'May 2026', date: '05/01/2026', amount: 400.00, filename: 'Statement_2026-05.pdf' },
    { month: 'Apr 2026', date: '04/01/2026', amount: 400.00, filename: 'Statement_2026-04.pdf' },
    { month: 'Mar 2026', date: '03/01/2026', amount: 400.00, filename: 'Statement_2026-03.pdf' },
    { month: 'Feb 2026', date: '02/01/2026', amount: 400.00, filename: 'Statement_2026-02.pdf' },
    { month: 'Jan 2026', date: '01/01/2026', amount: 400.00, filename: 'Statement_2026-01.pdf' },
  ],
  4: [
    { month: 'May 2026', date: '05/15/2026', amount: 125.50, filename: 'Statement_2026-05.pdf' },
    { month: 'Apr 2026', date: '04/15/2026', amount: 125.50, filename: 'Statement_2026-04.pdf' },
    { month: 'Mar 2026', date: '03/15/2026', amount: 125.50, filename: 'Statement_2026-03.pdf' },
    { month: 'Feb 2026', date: '02/15/2026', amount: 125.50, filename: 'Statement_2026-02.pdf' },
    { month: 'Jan 2026', date: '01/15/2026', amount: 125.50, filename: 'Statement_2026-01.pdf' },
  ],
}

// Derives a flat, date-grouped payment history (all "-" ledger entries) for a unit,
// tagging each payment with which line item it paid.
export function getPaymentHistory(unit) {
  const flat = unit.lineItems.flatMap(li =>
    li.ledger.flatMap(group =>
      group.items
        .filter(item => item.amount.startsWith('-'))
        .map(item => ({
          date: group.date,
          label: item.label,
          sub: li.label,
          amount: item.amount.slice(1),
        }))
    )
  )

  const byDate = new Map()
  for (const entry of flat) {
    if (!byDate.has(entry.date)) byDate.set(entry.date, [])
    byDate.get(entry.date).push(entry)
  }

  return [...byDate.entries()].map(([date, items]) => ({ date, items }))
}
