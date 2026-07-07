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

  // Units owned — used in MembershipOptInModal, ResidentMyUnits, etc.
  units: [
    { id: 1, address: '319 Cardinal Hills Dr', account: 'Acc# CH-319', optedIn: true },
    { id: 2, address: '47 Pinecrest Loop',      account: 'Acc# CH-047', optedIn: true },
  ],
}
