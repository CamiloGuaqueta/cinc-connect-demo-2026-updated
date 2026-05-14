/* ============================================
   CINC Connect Demo — Voting State
   Seed ballots + user votes persisted in localStorage
   under cinc:demo:votes
   ============================================ */

(function () {
  'use strict';

  const KEY_VOTES = 'cinc:demo:votes';

  // ----- Seed Ballots -----
  const BALLOTS = [
    {
      id: 'board-election-2026',
      category: 'Electoral Ballot',
      categoryLetter: 'E',
      title: '2026 Board Of Directors of Magic Views HOA',
      description: 'It\'s election time at Magic Views HOA! The 2026 Board of Directors election determines who will represent the community for the next two years. Choose up to 3 candidates whose vision and experience you most trust to lead the association.',
      coverImage: 'assets/images/MediaRoom.jpg',
      documentName: 'Election-Document.pdf',
      pdfHeading: 'Magic Views HOA',
      pdfSubheading: '2026 Board Election Procedures',
      pdfParagraphs: [
        'This electoral ballot determines the three (3) Board members who will serve a two-year term beginning July 1, 2026. Each registered owner is entitled to cast one vote per unit on record.',
        'Voting opens on May 1, 2026 and closes on June 8, 2026 at 10:00 PM EST. Late submissions cannot be accepted under Florida statute. Votes are anonymous and stored encrypted.',
        'Candidates were nominated by the Nominating Committee in March 2026. All candidates have signed a code of conduct and acknowledged the fiduciary responsibilities of board service.',
        'Results will be published in the community newsletter and posted at the Clubhouse within 10 business days after the deadline. Questions may be directed to the management office.'
      ],
      closesAt: '2026-06-08T22:00:00',
      type: 'multi',
      maxSelections: 3,
      options: [
        {
          id: 'wanda-ashford',
          name: 'Wanda Ashford',
          subtitle: 'Owner',
          photo: 'assets/images/Wanda-1.png',
          bio: 'Magic Views resident since 2018. Background in nonprofit finance. Led the 2025 landscaping budget revision and the new amenity reservation policy. Brings financial expertise and a track record of follow-through.',
          documentName: 'Wanda_bio.pdf',
          pdfHeading: 'Wanda Ashford',
          pdfSubheading: 'Candidate Statement',
          pdfParagraphs: [
            'I\'ve called Magic Views home since 2018, and I\'ve had the privilege of serving as Board Treasurer for the past two years. In that time, I helped lead the 2025 landscaping budget revision and rolled out the amenity reservation policy that owners now use every day.',
            'My background is in nonprofit finance. I spent 15 years overseeing the books of two community-focused organizations and a regional foundation, so reading reserve studies and pressure-testing vendor bids is second nature to me.',
            'If re-elected, my priorities are: (1) finalize the pool deck renovation on time and on budget, (2) keep dues increases below inflation through smarter procurement, and (3) protect long-term reserves so we never face a special assessment.',
            'Thank you for considering my candidacy. I am happy to chat one-on-one with any owner — you\'ll find me at the Saturday farmer\'s market most weekends.'
          ]
        },
        {
          id: 'antonio-segura',
          name: 'Antonio Segura',
          subtitle: 'Owner',
          photo: 'assets/personas/chat-antonio.png',
          bio: 'Resident since 2021. 20 years in civil infrastructure. Will focus on long-term roof and pavement maintenance, plus a renewable-energy roadmap for shared common areas.',
          documentName: 'Antonio_bio.pdf',
          pdfHeading: 'Antonio Segura',
          pdfSubheading: 'Candidate Statement',
          pdfParagraphs: [
            'My wife and I moved to Magic Views in 2021 to be closer to family. As a civil engineer with 20 years in infrastructure, I see our community through the lens of long-term maintenance — and I think we can do a better job planning for it.',
            'The roofs on Buildings A and C are entering year 14 of an expected 20-year life. The parking-lot pavement was last sealed in 2019. These aren\'t emergencies, but if we wait until they are, the costs triple.',
            'I would push the Board to: (1) commission an independent reserve study refresh, (2) sequence the next 5 years of capital projects publicly so owners can see what\'s coming, and (3) explore a small solar pilot on the Clubhouse roof.',
            'I\'m new to HOA service but not to budgeting or community building. I bring fresh eyes, a long-term mindset, and a commitment to transparency.'
          ]
        },
        {
          id: 'clare-watson',
          name: 'Clare Watson',
          subtitle: 'Owner',
          photo: 'assets/personas/chat-clare.png',
          bio: 'Lifelong neighbor. Organized the spring block party for 3 years running. Priorities: pet-owner amenities, transparent budgeting, and an active social calendar that brings owners together.',
          documentName: 'Clare_bio.pdf',
          pdfHeading: 'Clare Watson',
          pdfSubheading: 'Candidate Statement',
          pdfParagraphs: [
            'I\'ve lived at Magic Views since the original phase opened. I love this community and have spent the last three years organizing our spring block party — the one that draws over 200 people every May.',
            'I\'m a realtor by profession and a connector by nature. My platform is simple: our community is at its best when neighbors know each other. I want to invest in the events, common-area improvements, and amenities that bring us together.',
            'Specific priorities: expand the Dog Park, add a quarterly potluck rotation, fully publish all vendor contracts so any owner can review them, and partner with the property manager on faster work-order turnaround.',
            'I\'ll bring energy, accessibility, and a passion for this place. My door is always open — literally, unit 2701 if you want to drop by.'
          ]
        },
        {
          id: 'anthony-lowes',
          name: 'Anthony Lowes',
          subtitle: 'Owner',
          photo: 'assets/personas/chat-anthony.png',
          bio: 'Resident since 2015. Former Treasurer of two HOAs. Will push for tighter expense controls, a 5-year reserve study refresh, and clearer monthly financial reporting to owners.',
          documentName: 'Anthony_bio.pdf',
          pdfHeading: 'Anthony Lowes',
          pdfSubheading: 'Candidate Statement',
          pdfParagraphs: [
            'I\'m a retired CPA with 30 years in public accounting, the last decade spent auditing residential communities. I\'ve served as Treasurer of two prior HOAs and I know what good — and bad — financial discipline looks like.',
            'Magic Views is well-run, but I see room to tighten. Vendor invoices should be competitively rebid every three years. Our monthly P&L should be published to owners, not just the Board. And our reserve study is due for an independent refresh.',
            'My priorities: (1) institute a vendor rebid cycle, (2) publish monthly financials by the 10th of each month, (3) commission a fresh reserve study by Q4 2026, and (4) keep dues increases at or below inflation.',
            'I\'m not flashy and I won\'t promise things I can\'t deliver. What I will promise is rigorous oversight of your dollars. Thanks for your consideration.'
          ]
        },
        {
          id: 'kelly-lopez',
          name: 'Kelly Lopez',
          subtitle: 'Owner',
          photo: 'assets/personas/chat-kelly.png',
          bio: 'Resident since 2020. Wants to bring a member app, online voting, and modern communication tools into every committee — making the HOA easier to participate in for working families.',
          documentName: 'Kelly_bio.pdf',
          pdfHeading: 'Kelly Lopez',
          pdfSubheading: 'Candidate Statement',
          pdfParagraphs: [
            'I\'m a Marketing Director at a tech company, mom of two, and resident since 2020. Like a lot of working families here, I rarely make it to in-person board meetings — but I still want to be involved.',
            'My focus is bringing the HOA into the modern era. We already use the CINC Connect app for reservations; let\'s extend that to online voting, real-time community polls, and async board communications so every owner can participate on their own schedule.',
            'Concrete actions I\'ll champion: live-stream every board meeting, publish recap notes within 48 hours, add anonymous owner surveys for major decisions, and create a dedicated channel for families with young kids.',
            'A more accessible HOA is a stronger HOA. I\'d be honored to represent the residents who too often feel left out of the conversation.'
          ]
        }
      ]
    },
    {
      id: 'pool-deck-design-2026',
      category: 'Special Ballot',
      categoryLetter: 'S',
      title: 'Pool Deck Renovation — Choose a Design',
      description: 'The board has narrowed the pool deck resurfacing to two finalist designs. Pick the one you prefer for the upcoming renovation. Each option includes warranty terms and a fully-quoted cost.',
      coverImage: 'assets/images/Pool-Spa.jpg',
      documentName: 'Pool-deck-proposals.pdf',
      pdfHeading: 'Pool Deck Renovation',
      pdfSubheading: 'Project Scope & Proposal Summary',
      pdfParagraphs: [
        'The current pool deck is 17 years old and shows significant wear: cracked tiles in the south corner, slip-hazard in the lounge area, and discoloration around the spa. A full resurfacing is scheduled for late summer 2026.',
        'The Board issued an RFP in February and received six proposals. After site visits and reference checks, two finalists were selected for an owner vote: Resort-style Travertine and Composite Wood Deck.',
        'Both finalists include demolition, surface prep, installation, drainage upgrades, and a 1-year settle-in inspection. Pool furniture will be temporarily relocated; the spa will remain accessible during phase 2.',
        'Funding comes from the existing reserve fund — no special assessment is required. Construction is scheduled to begin July 15 and finish before Labor Day weekend.'
      ],
      closesAt: '2026-06-12T17:00:00',
      type: 'single',
      maxSelections: 1,
      options: [
        {
          id: 'travertine',
          name: 'Resort-style Travertine',
          subtitle: 'Quote: $42,800 · 12-year warranty',
          photo: 'assets/images/Pool-Spa.jpg',
          bio: 'Light cream natural stone that stays cool underfoot. Classic resort look with the longest warranty in the bid. Estimated install: 4 weeks, with the pool closed for 10 of those days.',
          documentName: 'Travertine-quote.pdf',
          pdfHeading: 'Resort-style Travertine',
          pdfSubheading: 'Vendor: Coastal Stoneworks · Quote $42,800',
          pdfParagraphs: [
            'Light cream natural travertine stone in a Versailles pattern, sealed with a slip-resistant matte finish. The surface stays comfortable underfoot even in direct sun — a key consideration for our summer pool hours.',
            'Materials include sealed Turkish travertine (~4cm thick), polymeric joint sand, and a 10-year UV-stable sealer with annual maintenance touch-ups included in the quote. Total area covered: 3,400 sq ft.',
            'Estimated install: 4 weeks. Pool closure required for 10 days during the underlayment phase. Coastal Stoneworks has resurfaced 14 community pools in the region with positive references on file.',
            'Warranty: 12 years on materials, 5 years on installation. Annual inspection included for the first 3 years at no additional cost.'
          ]
        },
        {
          id: 'composite-wood',
          name: 'Composite Wood Deck',
          subtitle: 'Quote: $38,400 · 10-year warranty',
          photo: 'assets/images/Community-aerial.jpg',
          bio: 'Warm wood-look composite boards that mimic teak but resist UV, mold, and splintering. Estimated install: 3 weeks. Pool stays open for the first half of the project.',
          documentName: 'Composite-quote.pdf',
          pdfHeading: 'Composite Wood Deck',
          pdfSubheading: 'Vendor: Greenline Decking · Quote $38,400',
          pdfParagraphs: [
            'High-density composite boards engineered to mimic teak but with no splintering, fading, or mold growth. Boards are installed over the existing concrete sub-deck with a hidden-fastener system for a clean visual.',
            'Materials: 100% recycled composite (Greenline ECO line), aluminum joists, stainless hardware. The boards stay cooler than traditional wood and 30% cooler than dark concrete. Total area: 3,400 sq ft.',
            'Estimated install: 3 weeks. Pool stays open during the first 10 days; the spa area is closed for the final 5 days only. Greenline has installed 22 similar projects locally.',
            'Warranty: 10 years on boards (no fade, no mold), 3 years on installation. Optional power-wash service available for $400/year.'
          ]
        }
      ]
    }
  ];

  // ----- Historical (already voted) seed -----
  const HISTORY_SEED = [
    {
      id: 'annual-budget-2026',
      category: 'Special Ballot',
      title: '2026 Annual Operating Budget',
      description: 'Approve or reject the proposed 2026 annual operating budget of $1.42M.',
      type: 'single',
      decidedAt: '2026-03-15',
      result: 'Approved by majority',
      userChoice: ['approve'],
      options: [
        { id: 'approve', name: 'Approve the proposed budget' },
        { id: 'reject', name: 'Reject — request board to revise' }
      ]
    }
  ];

  // ----- Persistent user state -----
  function getUserVotes() {
    try { return JSON.parse(localStorage.getItem(KEY_VOTES) || '{}'); }
    catch (_) { return {}; }
  }

  function saveUserVotes(map) {
    localStorage.setItem(KEY_VOTES, JSON.stringify(map));
  }

  function hasVoted(ballotId) {
    const votes = getUserVotes();
    return !!votes[ballotId];
  }

  function getUserChoice(ballotId) {
    const votes = getUserVotes();
    return votes[ballotId] ? votes[ballotId].choices : null;
  }

  function castVote(ballotId, choices) {
    const votes = getUserVotes();
    votes[ballotId] = {
      choices: Array.isArray(choices) ? choices : [choices],
      castAt: Date.now()
    };
    saveUserVotes(votes);
  }

  function findBallot(id) {
    return BALLOTS.find((b) => b.id === id);
  }

  function getAllBallots() {
    return BALLOTS;
  }

  function getAvailableBallots() {
    return BALLOTS; // We show all and use status badges; never filter out so user can see receipt
  }

  function getUserCastBallots() {
    return BALLOTS
      .filter((b) => hasVoted(b.id))
      .map((b) => {
        const userVote = getUserVotes()[b.id];
        return {
          id: b.id,
          category: b.category,
          title: b.title,
          description: b.description,
          type: b.type,
          options: b.options,
          decidedAt: new Date(userVote.castAt).toISOString().slice(0, 10),
          result: 'Your vote has been recorded',
          userChoice: userVote.choices
        };
      });
  }

  function getVotingHistory() {
    return [...getUserCastBallots(), ...HISTORY_SEED];
  }

  // ----- Time helpers -----
  function timeRemaining(isoDateTime) {
    if (!isoDateTime) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    const target = new Date(isoDateTime);
    const now = new Date();
    let ms = target - now;
    if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    const days = Math.floor(ms / (24 * 3600 * 1000));
    ms -= days * 24 * 3600 * 1000;
    const hours = Math.floor(ms / (3600 * 1000));
    ms -= hours * 3600 * 1000;
    const minutes = Math.floor(ms / (60 * 1000));
    ms -= minutes * 60 * 1000;
    const seconds = Math.floor(ms / 1000);
    return { days, hours, minutes, seconds, expired: false };
  }

  function formatCloseDate(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    const day = d.getDate();
    const suffix = (n) => {
      if (n >= 11 && n <= 13) return 'th';
      const last = n % 10;
      return last === 1 ? 'st' : last === 2 ? 'nd' : last === 3 ? 'rd' : 'th';
    };
    const month = d.toLocaleDateString('en-US', { month: 'long' });
    const year = d.getFullYear();
    let hours = d.getHours();
    const minutes = d.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const time = minutes === 0
      ? `${hours}${ampm}`
      : `${hours}:${String(minutes).padStart(2, '0')}${ampm}`;
    return `VOTE CLOSES ${month} ${day}${suffix(day)} ${year}, ${time} (EST)`;
  }

  function formatDeadline(iso) {
    if (!iso) return '';
    const d = new Date(iso + (iso.length === 10 ? 'T00:00:00' : ''));
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  window.VotingState = {
    BALLOTS, HISTORY_SEED,
    findBallot, hasVoted, getUserChoice, castVote,
    getAllBallots, getAvailableBallots, getVotingHistory,
    timeRemaining, formatCloseDate, formatDeadline
  };
})();
