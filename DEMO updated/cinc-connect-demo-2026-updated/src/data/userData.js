// Logged-in user — single source of truth for the demo persona
export const CURRENT_USER = {
  firstName:      'Thomas',
  lastName:       'Bravo',
  fullName:       'Thomas Bravo',
  initials:       'TB',
  primaryEmail:   'thomas.bravo@cardinalhills.com',
  secondaryEmail: '',
  useSecondaryEmail: false,
  mobile:         '(555) 345-0567',
  home:           '',
  photo:          '/images/personas/thomas-bravo.png',
  role:           'Board Member at Large',
  community:      'Cardinal Hills HOA',

  // Units owned — single source of truth for all unit dropdowns and lists
  units: [
    { id: 1, address: '319 Cardinal Hills Dr',        account: 'Acc# CH-319', acct: 'CH:6523', optedIn: true, relationship: 'Homeowner', status: 'active' },
    { id: 2, address: '47 Pinecrest Loop',             account: 'Acc# CH-047', acct: 'CH:7841', optedIn: true, relationship: 'Homeowner', status: 'active' },
    { id: 3, address: '200 Cardinal Hills Dr, Unit 3', account: 'Acc# CH-203', acct: 'CH:9902', optedIn: true, relationship: 'Tenant',    status: 'active' },
    { id: 4, address: '400 Cardinal Point Rd, Unit 2', account: 'Acc# CH-402', acct: 'CH:4417', optedIn: true, relationship: 'Resident',  status: 'active' },
  ],
}
