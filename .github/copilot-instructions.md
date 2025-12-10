# Copilot Instructions for Sokoloff Portfolio

## Project Overview
This is a Next.js portfolio website for Anatolio Sokoloff, a 20th-century Russian painter (1891-1971). The site features interactive visualizations, multi-language support (EN/RU), and immersive animations centered around his life journey and artwork.

**Tech Stack:** Next.js 14, React 18, Framer Motion (animations), Babylon.js (3D globe), Leaflet (maps), Tailwind CSS

## Architecture & Data Flow

### Component Structure
- **Layout Hub:** `pages/index.jsx` orchestrates all sections and provides `LanguageProvider` context
- **Component Pattern:** All components in `components/sokoloff/` follow named exports, accept props for callbacks/refs
- **Dynamic Imports:** Heavy use of `dynamic()` with `ssr: false` for browser-only components (3D, maps)
  - Example: `Interactive3DBackground`, `InteractiveGlobe`, `MapSection`, `SectionNavigation` must not render on server

### Global State Management
- **Language Context** (`LanguageContext.jsx`): Single source of truth for i18n
  - `useLanguage()` hook returns `{ t, language }` for accessing translations
  - Translations defined as nested object: `translations.en.sectionName.fieldName`
  - Currently supports EN and RU; add new languages by extending `translations` object and `languageOptions`

### Critical Integration Points
1. **3D Background** renders behind all content (`z-0`, `fixed inset-0`)
2. **Hero Section** accepts `onScrollToTimeline` callback and triggers smooth scroll to timeline ref
3. **Map Section** uses `InteractiveGlobe` which requires Babylon.js canvas initialization
4. **Timeline Section** displays artwork cards with bilingual metadata from hardcoded `artworks` array

## Development Patterns

### Animation Conventions
- **Framer Motion:** Use `useScroll()` for scroll-triggered animations, `useTransform()` for linked values
- **3D Transforms:** Combine `rotateX`, `rotateY` with mouse position state for parallax effects
- **Easing Functions:** Custom cubic easing (see `InteractiveGlobe.jsx:43-47`) for smooth camera transitions
- Avoid direct DOM manipulation; use motion.div and style props instead

### Styling Approach
- **Tailwind Only:** No CSS-in-JS; extend theme in `tailwind.config.js` if needed
- **Dark Theme:** All components assume `bg-black` background; use transparent overlays for contrast
- **Responsive:** Use Tailwind breakpoints; many components haven't been tested for mobile

### Naming Conventions
- React components are `.jsx` files (not `.js`)
- Components use named exports and are capitalized: `export default function ComponentName()`
- Props and state use camelCase; avoid single-letter variables

## Key Development Workflows

### Running & Building
```bash
npm run dev        # Start Next.js dev server (http://localhost:3000)
npm run build      # Production build
npm start          # Run production server
```

### Adding Content
- **Artwork:** Add to `artworks` array in `TimelineSection.jsx` (structure: id, title, titleRu, description, descriptionRu, year, image URL, etc.)
- **Map Locations:** Modify `locations` and `journeyConnections` arrays in `InteractiveGlobe.jsx`
- **Translations:** Update both `en` and `ru` branches in `translations` object in `LanguageContext.jsx`

### Debugging 3D Components
- Check browser console for Babylon.js initialization errors
- Verify canvas element exists: `canvasRef.current` must be attached to DOM before engine creation
- Camera animation stalls? Check `cameraRef.current` existence before calling `animateCameraToLocation()`

## Common Pitfalls
1. **SSR Issues:** Browser APIs (canvas, window) will fail on server; always use `dynamic(..., { ssr: false })`
2. **Missing Language Keys:** If translation undefined, component renders broken state; always add both EN and RU versions
3. **Performance:** 3D globe is computationally expensive; throttle scroll listeners and cleanup event listeners on unmount
4. **Ref Management:** Components like `InteractiveGlobe` expose refs via `forwardRef`; ensure parent stores and passes correctly
