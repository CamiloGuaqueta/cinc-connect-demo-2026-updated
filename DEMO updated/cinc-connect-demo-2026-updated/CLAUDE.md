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

## TRABAJO EN CURSO: migración a colores actuales de CINC

**Estado: cambios SIN commitear en `src/theme.js` y `src/index.css`. No hacer push hasta terminar** — el login hoy se ve roto (placeholders/legal invisibles) por los hardcodes viejos.

**Paleta objetivo** (extraída por Camilo de la app real en App Store "CINC2Connect", manda sobre la guía de marca para UI de producto):
- Fondo de página `#E9EEEA` → `--res-bg1` (también header/nav/`--bg-page`)
- Cards `#FFFFFF` → `--res-bg2` (`--bg-card`)
- Títulos y botones `#006A52` (Evergreen) → `--res-accent`
- Texto `#171B19` (CINC Ink) → `--res-text`
- Borde de cards blancas `#CBCACD` → nuevo token `--res-border` (`--border` ahora lo usa). También `#E9E9E9` para bordes/divisores suaves.
- NO usar el "sand"/crema (`#FBFAF7`, `#FFF8EA`, `#F1EADC`) — la app real no lo usa.
- Regla de Camilo: **en ningún lado deben aparecer los colores viejos** ("electric green" / lime).

**Ya hecho en el WIP:** preset `light` en `theme.js` con esa paleta (+ `--res-border` en todos los presets), `:root` de `index.css` con esos defaults, `--bg-page` ahora mapea a `--res-bg1` (antes bg2), default de tema cambiado de `dark` a `light`. Preset `cincGreen` actualizado a Deep Green `#002D28` / Evergreen `#006A52` / Lime `#B6E75A`.

**Falta:**
1. **Barrido de hardcodes viejos**: 581 ocurrencias en 126 archivos de `#B2DE61`, `#B0DB61`, `#FFF8EA`, `rgba(255,248,234,…)`, `#235237`, `#112719` (y variantes). Reemplazar por variables de tema (`var(--res-accent)`, `var(--res-text)`, `color-mix(in srgb, var(--res-text) X%, transparent)`, etc.) según contexto — ojo que `#112719` a veces es fondo y a veces texto sobre botón lime. Los peores: `ResidentAmenityDetail.jsx/.css`, `Feed.jsx/.css`, `NeighborhoodMarketIndex.css`, `ResidentAmenities.*`, `ResidentMailingAddressDetail.css`, `MembersList.*`, `LoginScreen.*`. ~60 íconos en `src/ICONS/*.svg` con fill fijo → pasar a `currentColor` si se inyectan como raw, o a `#006A52` si se usan con `<img>`.
2. **Logo del login** (`src/images/login-logo.svg`, todo en `#B2DE61`): reemplazar por logo oficial del kit de marca (skill `cinc-brand-guidelines`, `assets/logos/cinc/png-rgb/` — sobre fondo claro usar colorway `green` o `forest`; escalar SOLO proporcional). Pendiente decisión de Camilo: (a) el wordmark "CONNEC+" (`connecplus-wordmark.svg`) no existe en el kit — ¿recolorear a Evergreen o hay lockup oficial?; (b) la app real usa un ícono de casa con dos puntos en el login — ¿usar ese? (necesitaría el archivo).
3. **Splash** (`SplashScreen.jsx` → `src/images/splash-bg.png`): imagen única con foto + overlay + logo lime quemados, no se puede recolorear. Pendiente decisión: (a) foto aérea limpia + overlay CSS Deep Green + logo blanco oficial (`cinc-icon-white.png`), (b) fondo sólido + logo blanco, o (c) replicar el splash real de la app si Camilo manda captura.
4. Verificar en navegador (login, Feed, Financial Hub, My Community, Board Room, More/Customize Demo) y recién ahí build + commit + push.

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
