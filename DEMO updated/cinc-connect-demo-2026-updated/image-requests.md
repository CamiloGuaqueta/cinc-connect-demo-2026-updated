# Image requests — Board Room, Calendar, Amenities

Generated from a full audit of every image used in these flows. None are technically broken (no 404s), but many are generic stock photos reused across unrelated content, or (Calendar) fully random placeholder photos that don't match the event at all.

**How to use this:** generate/source each image below, save it with the **exact filename** shown, and drop it into the folder listed. Once the files are there, tell me and I'll wire them into the code (swap the current placeholder paths for the new files) and rebuild.

General guidance: landscape orientation, at least 1200px wide. Exact aspect ratio doesn't matter much — everything is cropped with `object-fit: cover`.

---

## Tier 1 — Calendar events (most visible issue)

All 13 events currently use `picsum.photos` random stock photos (a vulture, a turntable, an ocean rock — literally nothing related). Drop these into **`public/images/calendar/`**:

| Filename | Used for | Should show |
|---|---|---|
| `board-meeting.jpg` | May & June Board Of Directors Meeting | Board members at a meeting/conference table, clubhouse setting |
| `pool-party.jpg` | Pool Party | Residents socializing at a community pool, daytime |
| `trash-day.jpg` | Trash Day (recurring) | Trash/recycling bins lined up curbside, residential street |
| `spring-mixer.jpg` | Spring Mixer | Indoor clubhouse social — neighbors chatting with drinks/appetizers |
| `tennis-club.jpg` | Tennis Club | People playing tennis on an outdoor court |
| `committee-meeting.jpg` | May Committee Meeting (landscaping/maintenance) | Small group around a table reviewing plans/documents |
| `movie-night.jpg` | Movie Night | Clubhouse set up for a movie screening (screen, chairs, popcorn) |
| `memorial-day-bbq.jpg` | Memorial Day BBQ | Poolside BBQ/grill cookout, casual daytime |
| `summer-kickoff.jpg` | Summer Kick-off Party | Poolside party with more energy — DJ, food truck |

## Tier 2 — Violation type photos

Right now every violation type reuses the 5 generic Board Room card icons (a pool photo for "Parking", tax paperwork for "Noise", a meeting for "Trash"...). These are shown both in the resident "Report a Violation" type picker and in Board Room violation cards/evidence. Drop into **`public/images/`**:

| Filename | Violation type | Should show |
|---|---|---|
| `violation-parking.jpg` | Parking | A car parked incorrectly — blocking a fire lane or in a restricted zone |
| `violation-landscaping.jpg` | Landscaping | Overgrown grass/bushes blocking a sidewalk (this is Dalton Thomson's actual violation — matches "overgrown vegetation blocking sidewalk access") |
| `violation-architectural.jpg` | Architectural | An unapproved exterior change — e.g. a mismatched fence or paint color |
| `violation-noise.jpg` | Noise / nuisance | Hard to photograph literally — a suburban house exterior at dusk/night works fine |
| `violation-trash.jpg` | Trash / bins | Trash cans left out past pickup day / overflowing bins |

## Tier 3 — ACC (architectural request) type photos

Every ACC request currently shows the same solar-panel-field photo, even for deck/fence/paint requests. Solar already looks correct — only these 3 are needed, into **`public/images/`**:

| Filename | ACC type | Should show |
|---|---|---|
| `acc-deck.jpg` | Deck Installation | A backyard deck installation or rendering |
| `acc-fence.jpg` | Fence Installation | A residential fence installation |
| `acc-paint.jpg` | Exterior Paint Change | A house exterior paint swatch or freshly painted facade |

## Tier 4 — Brand mismatch fix

| Filename | Location | Issue |
|---|---|---|
| `Clubhouse.jpg` | `src/images/Amenities/Clubhouse.jpg` (replace in place) | Current photo has **"LOVERA PREMIER" signage baked into the image** — a different property's branding, shown across Amenities, Feed, More, and content sheets while all copy says "Cardinal Hills." Needs a clubhouse exterior with no competing signage. |

## Tier 5 — Optional / lower priority

Both current Work Orders happen to be pool-related, so the existing generic images read "close enough" — but if you want full accuracy, drop these into **`public/images/`**:

| Filename | Used for | Should show |
|---|---|---|
| `wo-irrigation.jpg` | WO #4821 — irrigation leak on pool deck | A wet pool deck / irrigation line repair |
| `wo-pool-pump.jpg` | WO #4822 — pool pump replacement | A pool equipment room / pool pump |

---

**Priority order if generating in batches:** Tier 1 (Calendar) → Tier 4 (Clubhouse brand fix) → Tier 2 (Violations) → Tier 3 (ACC) → Tier 5 (optional).
