# CINC Connect — Demo App

PWA demo for CINC Connect built for CAI Annual 2026 (June 3–5).

## Project structure

```
cinc-connect-demo/
├── index.html              ← Splash + Login (entry point)
├── feed.html               ← Main feed
├── styles/
│   ├── tokens.css          ← Design tokens (colors, fonts, spacing)
│   ├── components.css      ← Buttons, inputs, cards, nav
│   └── screens.css         ← Per-screen layout styles
├── scripts/
│   └── app.js              ← App logic, navigation, local state
└── assets/
    ├── icons/              ← SVG icons (export from Figma)
    ├── images/             ← Feed photos (Unsplash / Figma)
    └── personas/           ← Wanda, Kevin, Betty, Jim avatars
```

## Local preview

Open `index.html` directly in a browser, or run a local server:

```bash
# Python 3
python -m http.server 3000

# Or Node.js
npx serve
```

Then open http://localhost:3000

## Stack

- Vanilla HTML / CSS / JavaScript — no framework
- CSS custom properties (variables) for design tokens
- Mobile-first design, optimized for 430px width (iPhone Pro Max)

## Status

🟡 In progress — initial scaffolding only. Visual fidelity will be matched
to Figma screens via MCP extraction.

## Next steps

1. Extract Splash, Login, and Feed screens from Figma via MCP
2. Replace placeholder logos and icons with real SVGs from Figma
3. Add Unsplash images for posts
4. Build persona content (Wanda, Kevin, Betty, Jim)
5. Add daily activation flows (vote, amenity, pet registration)
6. Email + access code gate
7. Deploy to Vercel + connect to `democonnect.cincsystems.com`
