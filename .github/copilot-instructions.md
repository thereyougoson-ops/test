# Copilot Instructions for Sokoloff Portfolio

## Project Overview
Next.js 14 portfolio for Anatolio Sokoloff (1891-1971), a Russian historical painter. The site showcases his life journey across 5 continents with interactive 3D globe, scroll-driven animations, bilingual content (EN/RU), and detailed artwork catalog.

**Tech Stack:** Next.js 14, React 18, Framer Motion, Babylon.js (3D), Tailwind CSS (responsive dark theme)

## Architecture

### Entry Point & Global Layout
- **`pages/index.jsx`** is the single root page; wraps everything in `<LanguageProvider>` context
- Contains refs for inter-section navigation (`timelineRef`), passes callbacks (e.g., `onScrollToTimeline`) to child sections
- Renders: `Interactive3DBackground` (fixed, z-0), `LanguageToggle`, `SectionNavigation`, then section components in order (Hero→About→Chronology→Timeline→Gallery→Biography→Footer)

### Three Layers of Content
1. **Fixed 3D Background** (`Interactive3DBackground`): Parallax geometric shapes, always fixed inset-0
2. **SSR-Safe Components**: Regular components render on server (Hero, About, Timeline, Gallery, etc.)
3. **Browser-Only** (dynamic, ssr: false): `Interactive3DBackground`, `InteractiveGlobe`, `MapSection`, `SectionNavigation`

### State Management: Language Context
- **Single source of truth:** `LanguageContext.jsx` exports `useLanguage()` hook returning `{ language, t, toggleLanguage }`
- `t` is translation function (object structure: `translations[language].sectionKey.fieldKey`)
- Bilingual content pattern: components conditionally use `artwork.titleRu` or `artwork.title` based on language
- Add languages: extend `translations` object and add to `languageOptions` array (currently EN/RU)

### Data Storage Patterns
- **Artwork catalog**: Hardcoded `artworks` array in `TimelineSection.jsx` (id, title, titleRu, description, descriptionRu, year, image URL, auctionHouse, price)
- **Map locations**: Two arrays in `InteractiveGlobe.jsx`: `locations` (id, name, lat, lng, period, description, paintings[], museums[], color) and `journeyConnections` (from/to indices)
- No external API; all data is static and baked into components

## Essential Patterns

### Component Props & Refs
- **Callback props**: `onScrollToTimeline`, `onLocationSelect` passed from parent to child for cross-component coordination
- **Ref forwarding**: `InteractiveGlobe` uses `forwardRef` + `useImperativeHandle` to expose `playJourney()` method and `animateCameraToLocation()` to parent `MapSection`
- **Children refs**: Components like `TimelineSection` receive `scrollRef` prop to link external scroll targets

### Animations: Framer Motion + Custom Scroll
- **Scroll-triggered**: Use `useScroll({ target: ref, offset: [...] })` → `useTransform()` to map scroll progress to CSS values
- **Spring physics**: Combine `useSpring()` with transforms for smooth velocity-based animations
- **Gesture animations**: `whileHover`, `whileTap`, `whileInView` for responsive feedback
- **Example**: `HeroSection` animates title opacity/scale as user scrolls; `ArtworkCard` scales image on hover

### Styling Rules
- **Tailwind only** (no CSS-in-JS); dark theme: always start with `bg-black` background
- **Transparency over color**: Use `text-white/70`, `border-zinc-800/50` for contrast layers
- **Responsive breakpoints**: `md:` and `lg:` for tablet/desktop; mobile defaults usually fine (check `ArtworkCard` for responsive dimensions: 80vw→450px→550px)
- **Z-index hierarchy**: 3D background (z-0), content (z-10), UI overlays (z-50)

### 3D & Canvas Specifics
- **Babylon.js initialization**: Must happen after canvas DOM attachment; store refs: `engineRef`, `sceneRef`, `cameraRef`, `canvasRef`
- **Camera animation**: Custom easing function (cubic ease-in-out) in `animateCameraToLocation()` for smooth transitions between locations
- **Sphere meshes**: Rendered at lat/lng with BABYLON.Color3 (0-1 RGB scale, not 0-255)
- **Journey playback**: `playJourney()` iterates through location indices with 2.5s delays, animates camera to each

## Development Workflows

### Build & Run
```bash
npm run dev    # http://localhost:3000, auto-reload on file changes
npm run build  # Production build; tests SSR
npm start      # Serve production build
```

### Adding Artwork
1. Open `TimelineSection.jsx`, find `artworks` array
2. Add object: `{ id, title, titleRu, description, descriptionRu, year, image, auctionHouse, auctionHouseRu, price, priceRu }`
3. Image URLs must be externally hosted (currently using anatoliosokoloff.com)
4. Year string displayed as huge faded background text

### Adding Map Location
1. Open `InteractiveGlobe.jsx`, add entry to `locations` array (id, name, lat, lng, period, description, paintings[], museums[], color)
2. Add journey segment to `journeyConnections` if part of life timeline (from/to are array indices)
3. Colors are BABYLON.Color3 RGB (0-1 range); green #22c55e ≈ (0.13, 0.77, 0.37)

### Updating Translations
1. Open `LanguageContext.jsx`, find `translations` object
2. Add/modify nested keys in both `en` and `ru` branches (e.g., `translations.en.heroSection.subtitle`)
3. In components, access via `t('heroSection.subtitle')` after destructuring `const { t } = useLanguage()`

## Critical Integration Points & Gotchas

| Issue | Solution |
|-------|----------|
| **3D/Canvas breaks build** | Must use `dynamic(..., { ssr: false })` on components using canvas, Babylon, or window APIs |
| **Camera animation stalls** | Verify `cameraRef.current` exists before calling `animateCameraToLocation()`; check engine/scene initialized |
| **Missing translation** | Always add both EN and RU; missing key renders undefined, breaks layout |
| **Mobile responsiveness untested** | Components use Tailwind but haven't been thoroughly tested on mobile; use `md:` breakpoints for safe design |
| **Ref chain breaks** | When nesting dynamic components, ensure refs forwarded properly (MapSection→InteractiveGlobe→canvasRef) |
| **Scroll listener leaks** | Always cleanup event listeners in useEffect return; HeroSection and 3D background track mouse/scroll |

## File Reference Guide
- `pages/index.jsx` — Root orchestrator, ref management
- `LanguageContext.jsx` — i18n provider, `useLanguage()` hook, full translation object
- `TimelineSection.jsx` — Artwork carousel, scroll-driven animations, hardcoded artworks data
- `InteractiveGlobe.jsx` — Babylon.js 3D globe, location meshes, camera animations, journey playback
- `MapSection.jsx` — Dynamic wrapper for InteractiveGlobe, location info panel, legend
- `HeroSection.jsx` — Scroll-triggered title animations, year counter, call-to-action
- `ArtworkCard.jsx` — Reusable card template for timeline carousel, hover zoom
- `LanguageToggle.jsx` — Fixed EN/RU switcher, animated toggle slider
- `Interactive3DBackground.jsx` — Fixed parallax geometric shapes, mouse-responsive
