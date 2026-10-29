# CINC Connect Demo 2026 — Guía del proyecto

Demo interactivo de CINC Connect (app de residentes/board members de una HOA) para el equipo de ventas de CINC. Reemplaza al demo HTML viejo (`CINC/DEMOS/cinc-connect-demo/*.html`, aún live en democonnect.cincsystems.com hasta el swap de dominio). Base original: repo de Nico Turbay (`nicoturbay/cinc-bod-experience`).

**Regla de oro: cambiar lo mínimo posible del demo nuevo.** Reutilizar componentes/patrones existentes antes de crear nada. Toda data nueva debe respetar el canon (abajo).

---

## Workflow (IMPORTANTE)

- **Al iniciar sesión: `git pull` SIEMPRE.** Camilo también trabaja desde un Mac; llegan commits externos.
- Repo: `CamiloGuaqueta/cinc-connect-demo-2026-updated`, rama `main`.
- **Deploy**: Vercel sirve la carpeta `dist` pre-compilada (`vercel.json` con `buildCommand: "echo done"`). Por eso, antes de cada push:
  ```
  npm run build && git add -A && git commit && git push
  ```
  Si no se recompila `dist`, el deploy no refleja los cambios de `src`.
- Dev server local: `npm run dev -- --port 5175` (React 19 + Vite 8).
- Line endings normalizados con `.gitattributes` (LF). Ignorar warnings CRLF de git en Windows.
- Si el navegador muestra código viejo con el server corriendo: reiniciar Vite y hard-reload (el watcher de Windows a veces pierde cambios).

## Arquitectura de navegación

- `src/App.jsx` es el router manual del lado residente (el único activo):
  - `RESIDENT_TAB_SCREENS`: mapa tab → componente (Feed, My Community, Financial Hub, **Board Room**, My Properties, More).
  - `renderResidentSubScreen(view)`: switch por string para sub-pantallas. Para agregar una: `import` + una línea `if (view.screen === 'x') return <X />`.
  - Navegación: `pushResidentView('screen-key', data)` / `popResidentView()` desde `useMode()` (ModeContext).
  - Fallback: si una key no está registrada, se muestra el tab actual (no pantalla en blanco).
- **Modo BOD viejo eliminado**: `isBoard` siempre false. `BoardContent` (rutas `/tasks`, `/pulse`, etc.) es código muerto pero presente. No agregar toggles de modo.
- Sheets/paneles se portalan a `document.querySelector('.phone-frame')`.

## Usuario fijo y canon de datos

Fuente única: `src/data/userData.js` → `CURRENT_USER`.

- **Usuario**: Thomas Bravo, Board Member at Large, Cardinal Hills HOA. 4 units (319 Cardinal Hills Dr CH:6523, 47 Pinecrest Loop CH:7841, 200 Cardinal Hills Dr U3 CH:9902, 400 Cardinal Point Rd U2 CH:4417). Sin login personalizado.
- **Calles canon**: Cardinal Hills Dr, Cardinal Point Rd, Cardinal Way, Cardinal Heights, Pinecrest Loop, Hillcrest Loop, Ridgeline Pass (pool completo en `ResidentMyUnits.jsx`). Nada de calles genéricas (Maple, Oak, Sierra Madre...).
- **Cuentas**: formato `2024-XXXX` (morosos) o `CH:XXXX` (units de Thomas).
- **BOD oficial** (directorio `src/data/directoryData.js`): Darren Wilson (President, avatar-1), Marcus Chen (VP, avatar-3), Lisa Thomas (Secretary, avatar-2), Thomas Lowes (Treasurer, avatar-linkedin), Rachel Park (Member at Large, avatar-4). Cualquier approver/committee/firma usa estos nombres.
- **Morosos** (misma data en Board Aging, Accounts Receivable y la violación de Tasks):
  - Dalton Thomson · 204 Cardinal Hills Dr · 2024-1588 · $3,596.00 · At Attorney · (555) 421-0889 · dalton.thomson@email.com · foto `/images/personas/dalton-thomson.png`
  - Emma Hughes · 76 Pinecrest Loop · 2024-2341 · $960.00 · 30 Days Notice
  - James Roberts · 150 Cardinal Point Rd · 2024-3096 · $1,195.00 · 60 Days Notice · Tenant Occupied (su unit está en proceso de pasar a una LLC — task de Action Items)
- **Vendors**: Green Valley Landscaping, Pacific Pool Services, Westside Plumbing (con invoices pendientes en Tasks), AC&M Construction (pool renovation), Pipes And Flows, 1-800-GOT-JUNK?, EverGreen Property Care.
- **"Hoy" del demo**: ~05/19/2026 (fecha "As of" de Bank Summary y `NOW` en VendorPaymentHistory).
- **Historias cruzadas que deben mantenerse coherentes**: la violación de landscaping es de Dalton (mismos datos en 3 pantallas); el WO #4822 (bomba de piscina $3,850, Pacific Pool) es la misma historia que la notificación de la campana; el change order del pool renovation amarra con el tile "Pool Renovation Update" de More; Reserve Study = 59.4% funded, +$18/mes desde ene 2027 (Financial Hub y notificación); "Sarah Mitchell" es SOLO la agente inmobiliaria del Feed/blog (NO es board member).
- Fotos de personas: `public/images/personas/` (17 personas del demo viejo). Avatares BOD: `/images/avatar-*.jpg`.

## Board Room (tab principal BOD) — COMPLETO 10/10

Hub: `src/screens/BoardRoom.jsx` (filas con `screen` key → `pushResidentView`). Badges = conteos reales de data.

| Fila | Pantalla | Notas |
|---|---|---|
| Accounts Receivable (3) | `AccountsReceivable.jsx` | Cards de los 3 morosos + sub-vistas Ledger/Collections (slide-over interno) + sheet Home Owner. Ledger suma exacto al balance. |
| Board Action Items Review (4) | `Tasks types={['Task']}` | Paneles: attachment (reporte PDF-style, data en `TASK_REPORTS`), Account Info (`acctDetail`), Log & Messages (`TASK_LOG_MESSAGES`) |
| Board ACC Review (4) | `Tasks types={['ACC']}` | Paneles: Log, Committee, Attachment (PDF data-driven por tipo en `ACC_PDF`), Add Decision |
| Board Violations Review (1) | `Tasks types={['Violation']}` | Cards/paneles en `components/ViolationCard.jsx`; owner = Dalton con foto/email/tel (overrides `ownerPhoto/ownerEmail/ownerPhone`) |
| Board Work Order Review (2) | `Tasks types={['WorkOrder']}` | Paneles: Vendor (reusa VendorInfoPanel), Log & Notes (`WO_LOG_MESSAGES`), Attachments |
| Invoice Approval (3) | `Tasks types={['Invoice']}` | Vendor Info, Invoice PDF, Approvers (Darren/Marcus), Bank Balance |
| Bank Summary (3) | `BankSummary.jsx` | 3 cuentas Bank of America |
| Vendor Payment History (7) | `VendorPaymentHistory.jsx` | Search + filtro vendor/fecha |
| Board Aging (3) | `BoardAging.jsx` | Morosos con desglose 30/60/90 + sheet Home Owner |
| Homeowner List | `ResidentMembersList` (`'members-list'`) | 67 miembros, search A–Z, export CSV → contact detail |

**Patrón clave**: `Tasks.jsx` acepta props `types` (array) y `title`. Sin props = deck completo "Board Action Items". Con props = deck filtrado de una categoría, sin botón de filtro. Toda la data de cards vive en el array `TASKS` de `Tasks.jsx`; los logs/reportes en constantes al final del archivo (`ACC_LOG_MESSAGES`, `ACC_COMMITTEE_MESSAGES`, `ACC_PDF`, `WO_LOG_MESSAGES`, `TASK_LOG_MESSAGES`, `TASK_REPORTS`).

Ojo: `ViolationCardContent` en Tasks.jsx mapea campos del task al objeto `violation` a mano — si agregas un campo nuevo al task de violación, hay que agregarlo también a ese mapeo.

## Hecho (referencia)

- **HubSpot lead capture**: integrado en `LoginScreen.jsx` (campo Name + texto legal + POST silencioso a HubSpot Forms API, una vez por navegador) + beacon a Google Sheet (Apps Script) en cada login.
- **Swap de dominio (26 oct 2026)**: `democonnect.cincsystems.com` ya apunta al proyecto Vercel `cinc-connect-demo-2026-updated`. Vercel team slug `cinc-systems`. El proyecto viejo `cinc-connect-demo` ya no tiene el dominio. **Ojo: cada push a `main` ahora va directo al dominio público.**
- Canon de direcciones corregido (Rachel Park → 27 Cardinal Way, directorio con calles canon, Market Index/Home Value con units reales).
- Imágenes reales en Calendar, Violations, ACC, Work Orders y Clubhouse (spec en `image-requests.md`; originales en `src/images/IMAGENES GPT/`, NO se suben al repo — usar `git add -A -- ':!src/images/IMAGENES GPT'`).

## Paleta de colores (migración a colores actuales de CINC — HECHA 10/2026)

**Paleta** (extraída por Camilo de la app real "CINC2Connect", manda sobre la guía de marca para UI de producto). Tema por defecto: `light` en `theme.js`.
- Fondo de página `#E9EEEA` → `--res-bg1` (`--bg-page`, header, nav)
- Cards `#FFFFFF` → `--res-bg2` (`--bg-card`), borde `#CBCACD` → `--res-border` (`--border`)
- Títulos y botones `#006A52` (Evergreen) → `--res-accent` (= `--lime` dentro de `.resident-mode`; el nombre `--lime` es legacy)
- Texto `#171B19` (CINC Ink) → `--res-text` (`--text`). Texto sobre botón accent → `--text-dark`
- Superficies de color FIJO que no siguen el tema (cards ilustradas, PDFs): `--brand-evergreen` `#006A52`, `--brand-mint` `#D9E9E3` (en `:root` de `index.css`)
- **Deep Green `#002D28` SOLO en el logo** del splash y del login. No usarlo en ningún otro lado de la app (también existe en el preset opcional `cincGreen` de Customize Demo).
- Prohibidos (regla de Camilo): lime/"electric green" viejo (`#B2DE61`, `#B0DB61`, `rgba(178,222,97,…)`), crema (`#FFF8EA`, `#FBFAF7`, `#F1EADC`), verdes oscuros viejos (`#112719`, `#235237`, `#0e1e11`, `#1e3a22`…), gris de texto del tema oscuro (`rgba(209,209,209,…)`). Barrido completo hecho: 0 ocurrencias (salvo `Pulse`/`MeetingAgenda`, inalcanzables).
- Íconos `src/ICONS/*.svg`: los importados con `?raw` usan `fill="currentColor"`; los usados con `<img>` usan `#171B19`. Para recolorear un `<img>` a Evergreen se usa el filtro `brightness(0) saturate(100%) invert(27%) sepia(87%) saturate(1530%) hue-rotate(143deg) brightness(93%) contrast(101%)`.
- Splash: `src/images/splash-bg.jpg` (foto en gris claro + logo `#002D28`), generado desde el splash viejo. Login: `login-logo.svg` y `connecplus-wordmark.svg` recoloreados a `#002D28`.
- Card de pagos del Feed (`.acct-card`): fondo CINC Ink `#171B19`, texto blanco, botón blanco con texto Evergreen.
- Sliders/carruseles: solo puntos (dots) + swipe/drag, **sin flechas**.
- Tintes sutiles (divisores, inputs, hovers) usan `color-mix(in srgb, var(--text) X%, transparent)` — no `rgba(255,255,255,…)` (era del tema oscuro).
- Al probar el login en el navegador NO enviar el form real (manda lead a HubSpot + Google Sheet): stubbear `fetch`/`Image` o setear `localStorage.hubspotLeadCaptured='true'` antes.

## Mejoras inspiradas en las animaciones del sitio (cincsystems.com/boards-residents) — 27/10/2026

- **Cephai cita fuentes**: en `getAIResponse` (CephAIChat.jsx) una línea `[[source: Label | docType#i,j]]` se renderiza como chip clickeable que abre `ResidentPDFViewer` con los párrafos i,j resaltados (mapa `CITED_DOCS`); `[[live: …]]` = dato en vivo de la cuenta. Docs citables (contenido en `CONTENT` de `ResidentPDFViewer.jsx`, también listados en Documents): `ccrs`, `arch` (Architectural Review Guidelines), `pool`, `meetings` (Board Meeting Calendar), `bylaws`. Preguntas sugeridas del residente: fence/ACC (CC&Rs §4.2), "What do I owe" (CH:6523 = $650.41, igual que `financialData.js`), pool, meetings, board duties.
- **Cephai sin IA real**: `getSmallTalk` (saludo/gracias/adiós/quién eres) se evalúa primero; `NAV_ANSWERS` responde "dónde encuentro X" con rutas reales de la app; cualquier otra pregunta cae en un fallback honesto ("This demo version doesn't include real AI answers…"). Si agregas pantallas, actualiza `NAV_ANSWERS`.
- **Aprobar factura → sheet con chequeo de presupuesto** (`InvoiceApproveSheet` en Tasks.jsx, data `budget` en cada task Invoice): Green Valley y Pacific Pool "Within budget", Westside Plumbing "Over budget" (Repairs & Maintenance, coherente con el sobrecosto de Maintenance que menciona Cephai).
- **Microanimaciones**: `components/CountUp.jsx` (saldos que cuentan desde $0: card de cuenta del Feed y Total Balance del Financial Hub), like con pop en posts, "Processing…" con spinner al pagar + confirmación animada. El "escribiendo…" de Cephai ya existía (`.cephai-thinking`).
- Pendientes de esa lista (no hechos): búsqueda dentro de Documents con párrafo resaltado, aprobación de cobranza, agenda + board packet, digest diario de Cephai, Community Pulse con long-press, selector BOD/Personal.

## Demos por prospecto (tenants) — `/krj`

- Cada prospecto tiene su versión en `democonnect.cincsystems.com/<id>`, generada en el build **sin tocar el código del demo**: `tenants/<id>/config.js` define reemplazos de texto (HOA, calles, ciudades, administradora, prefijo de cuentas), colores (swap de hex de la paleta CINC), assets importados (splash, logo de login, wordmark) y CSS extra.
- `npm run build` = build del demo CINC en `dist/` + `vite build --mode krj` en `dist/krj/` (plugin `tenantPlugin` en `vite.config.js`). `vercel.json` reescribe `/krj/*` → `/krj/index.html`.
- Dev local del tenant: `npm run dev:krj` (puerto 5176, servido en `/`). Cambios en `tenants/*/config.js` requieren reiniciar el server.
- localStorage separado por tenant (shim que antepone `krj:` a las keys) para que no se mezcle el estado con el demo CINC.
- Assets del tenant en `public/tenants/<id>/` (logo.png transparente, icon.png cuadrado para header/favicon, splash.jpg, connecplus.svg).
- **KRJ Cares** (Houston, prospecto grande — reunión 28/10/2026): comunidad ficticia **Bayou Oaks HOA** (no usar comunidades reales de KRJ como Ravenna/Westchase/Friendswood: el demo tiene morosos y violaciones). Calles: Bayou Oaks Dr, Bayou Point Rd, Bayou Way, Bayou Heights, Magnolia Loop, Live Oak Loop, Cypress Bend Pass. Cuentas `BO:`. Paleta: botones/títulos `#313131`, nav `#84BCCE`, fondo `#F2F2F2`, bordes `#E2E2E2` (como las animaciones de Diego; el azul no sirve de color de botón por contraste).
- **Insight Association Management** (North Texas, reunión de Ryan Davis 29/10/2026) → `/insight`: comunidad ficticia **Bluebonnet Hills HOA** (no usar sus comunidades reales: Mustang Lakes, Light Farms, Villas at Legacy West, Lantana, Phillips Creek Ranch, Walsh). Calles: Bluebonnet Hills Dr, Bluebonnet Point Rd, Bluebonnet Way, Bluebonnet Heights, Pecan Loop, Mesquite Loop, Trinity Bend Pass. Cuentas `BH:`. Ciudades: Frisco, Plano, McKinney, Prosper, Allen, Celina, Dallas. Paleta según el Figma de Diego (28/10): azul cielo `#4A95CF` (títulos, íconos, botones, estados activos), slate `#4F5875` (card de pagos y horarios de amenities), nav blanca con íconos oscuros y activo en círculo azul cielo, fondo `#F3F5F9`. Logo/colores sacados de insightam.com — reemplazar archivos en `public/tenants/insight/` si Diego manda los oficiales. Dev: `npm run dev:insight` (puerto 5177).
- Para un prospecto nuevo: copiar `tenants/krj/`, ajustar config + assets, agregar `&& vite build --mode <id>` al script `build` y las rewrites en `vercel.json`.

## Pendientes (baja prioridad)

1. *(Opcional, solo si se revive el modo BOD)*: pase de consistencia en pantallas inalcanzables: `Pulse.jsx`, `PulseViolations.jsx`, `MeetingAgenda.jsx` y contextos `kpi:*`/`v1-v15`/`delinquencies` de `CephAIChat.jsx` — aún usan Thompson/Davis/Wilson, calles genéricas y a Sarah Mitchell/David Chen como board.
2. White-label self-service (pedido de Jessica): hay una v1 ligera en More → Customize Demo (logo + nombre + tema, en localStorage). La versión completa no está planeada.

## Preferencias de Camilo

- Comunicación en español; código y contenido del demo en inglés.
- Verificar visualmente en el navegador antes de dar algo por terminado; badges y números deben reflejar la data real.
- Cuando note una inconsistencia de datos, quiere que se corrija en TODAS las superficies alcanzables (la consistencia del canon es prioridad).
- Prefiere reutilizar flujos existentes a duplicar pantallas.

## Cómo trabajar barato (tokens)

- Este archivo es la fuente de contexto: **no re-explorar el repo** para entender la estructura.
- Para ubicar algo puntual: `Grep` dirigido (los nombres de clases CSS siguen el patrón `prefijo-` por pantalla: `br-`, `ba-`, `arx-`/`ar-`, `bs-`, `vph-`, `inv-`, `acc-`, `viol-`, `ml-`, `md-`).
- Archivos grandes: `Tasks.jsx` (~2000 líneas) y `CephAIChat.jsx` — leer solo el rango necesario, nunca completos.
- Verificación mínima suficiente: build (`npm run build`) + un screenshot del flujo tocado; no re-probar flujos no afectados.
