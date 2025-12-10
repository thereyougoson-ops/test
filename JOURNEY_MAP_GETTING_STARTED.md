# JourneyMap - Getting Started

## ✅ Quick Start (3 Steps)

### 1. Component is Already Live
The JourneyMap component has been automatically integrated into your site:
```
http://localhost:3000  → Scroll to "Journey Map" section
```

### 2. See it in Action
- **Play Journey**: Click the "Play Journey" button to watch the animated tour
- **Jump to Location**: Click any location marker on the globe or button in the grid
- **View Details**: Location panel shows paintings, museums, and historical info
- **Interact**: Drag to rotate globe, scroll to zoom, click to select locations

### 3. (Optional) Customize for Your Needs
See examples below

---

## Usage Examples

### Example 1: Basic Import & Use
```jsx
import JourneyMap from '@/components/sokoloff/JourneyMap';

export default function Page() {
  return <JourneyMap />;
}
```

### Example 2: With Ref for Advanced Control
```jsx
import { useRef } from 'react';
import JourneyMap from '@/components/sokoloff/JourneyMap';

export default function Page() {
  const globeRef = useRef(null);

  return (
    <>
      <button onClick={() => globeRef.current?.playJourney()}>
        Start Journey
      </button>
      <JourneyMap ref={globeRef} />
    </>
  );
}
```

### Example 3: Jump to Specific Location
```jsx
const globeRef = useRef(null);

// Jump to San Francisco (index 8)
const jumpToSanFrancisco = () => {
  const sanFrancisco = JOURNEY_LOCATIONS[8];
  globeRef.current?.animateCameraToLocation(37.7749, -122.4194, 3.5, 1500);
};

// Jump to start (Petrodvorets)
const backToStart = () => {
  globeRef.current?.animateCameraToLocation(59.8861, 29.9051, 3.5, 1500);
};
```

---

## Component API

### Methods Available via ref
```javascript
const globeRef = useRef(null);

// Start animated journey
await globeRef.current.playJourney()
// Returns: Promise that resolves when journey completes

// Stop journey animation
globeRef.current.pauseJourney()
// Returns: void

// Animate to specific location
globeRef.current.animateCameraToLocation(lat, lng, zoom = 3.5, duration = 1500)
// Parameters:
//   - lat: Number (-90 to 90)
//   - lng: Number (-180 to 180)
//   - zoom: Number (2 to 8, default 3.5)
//   - duration: Number in ms (default 1500)
// Returns: void

// Get current location
const location = globeRef.current.getCurrentLocation()
// Returns: Location object with all details
```

---

## Customization Recipes

### Recipe 1: Change Journey Speed
**File**: `/components/sokoloff/JourneyMap.jsx` (line ~290)

```javascript
// Current (3 seconds at each location)
const delayBetween = 3000;

// Change to 5 seconds
const delayBetween = 5000;

// Change to 2 seconds
const delayBetween = 2000;

// Also adjust camera transition:
const cameraDuration = 1500;  // 1.5 seconds
// Change to:
const cameraDuration = 2000;  // 2 seconds (slower transitions)
```

### Recipe 2: Add a New Location
**File**: `/components/sokoloff/JourneyMap.jsx` (line ~30, in JOURNEY_LOCATIONS array)

```javascript
const JOURNEY_LOCATIONS = [
  // ... existing locations ...
  
  // Add new location at the end:
  {
    id: 11,
    name: "Paris",
    country: "France",
    lat: 48.8566,
    lng: 2.3522,
    period: "1920s",
    description: "Visited Paris during European travels. Studied Impressionist techniques.",
    paintings: ["Parisian Street Scene", "The Louvre Study"],
    museums: ["Musée d'Orsay"],
    color: new BABYLON.Color3(1.0, 0.5, 0),  // Orange
    hexColor: '#ff8000'
  }
];

// Then add to journey sequence if desired:
// const JOURNEY_SEQUENCE = [0, 1, 2, 3, 5, 6, 7, 8, 10];  // Add index 10 (0-indexed)
```

### Recipe 3: Change Journey Sequence
**File**: `/components/sokoloff/JourneyMap.jsx` (line ~50)

```javascript
// Current: Skip Khabarovsk & Moscow (only main journey)
const JOURNEY_SEQUENCE = [0, 1, 2, 3, 5, 6, 7, 8];

// Option A: Include all locations
const JOURNEY_SEQUENCE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// Option B: Reverse order (final years → birth)
const JOURNEY_SEQUENCE = [8, 7, 6, 5, 3, 2, 1, 0];

// Option C: Custom path (select favorite locations)
const JOURNEY_SEQUENCE = [0, 1, 7, 8, 9];  // Russia → Buenos Aires → San Francisco → Moscow
```

### Recipe 4: Change Globe Colors
**File**: `/components/sokoloff/JourneyMap.jsx` (in JOURNEY_LOCATIONS, e.g., line ~32)

```javascript
// Change Petrodvorets color from green to red:
{
  ...
  color: new BABYLON.Color3(1, 0, 0),  // was (0.13, 0.77, 0.37)
  hexColor: '#ef4444'                   // was '#22c55e'
  ...
}

// Babylon.js uses 0-1 RGB scale (not 0-255):
// Red:   [1, 0, 0]
// Green: [0, 1, 0]
// Blue:  [0, 0, 1]
// White: [1, 1, 1]
// Black: [0, 0, 0]
// Orange: [1, 0.5, 0]
```

### Recipe 5: Auto-Play Journey on Page Load
**File**: `/components/sokoloff/JourneyMap.jsx` (line ~180, the JourneyGlobe component)

```javascript
// Current: autoPlay={false} (manual play button)
<JourneyGlobe ref={globeRef} onLocationSelect={setSelectedLocation} autoPlay={false} />

// Change to:
<JourneyGlobe ref={globeRef} onLocationSelect={setSelectedLocation} autoPlay={true} />

// Journey will start automatically 500ms after component mounts
```

### Recipe 6: Remove Play/Pause Buttons
**File**: `/components/sokoloff/JourneyMap.jsx` (line ~380, the Controls Overlay section)

```javascript
// Current (with buttons):
{!isPlaying ? (
  <button onClick={handlePlayJourney}>
    <Play size={16} /> Play Journey
  </button>
) : (
  <button onClick={handlePauseJourney}>
    <Pause size={16} /> Pause
  </button>
)}

// Replace with static controls (always visible):
<div className="flex gap-2">
  <button onClick={handlePlayJourney}> Play </button>
  <button onClick={handlePauseJourney}> Pause </button>
</div>
```

---

## Styling Examples

### Change Section Background
```jsx
// File: JourneyMap.jsx, line ~308
// Current:
<section className="relative bg-black py-16 md:py-24 lg:py-32">

// Change to gradient:
<section className="relative bg-gradient-to-b from-black to-zinc-900 py-16 md:py-24 lg:py-32">

// Or dark blue:
<section className="relative bg-slate-950 py-16 md:py-24 lg:py-32">
```

### Change Button Colors
```jsx
// File: JourneyMap.jsx, line ~395
// Current (red):
<button className="... bg-red-600 hover:bg-red-700 ...">

// Change to blue:
<button className="... bg-blue-600 hover:bg-blue-700 ...">

// Change to green:
<button className="... bg-emerald-600 hover:bg-emerald-700 ...">
```

### Change Header Color
```jsx
// File: JourneyMap.jsx, line ~313
// Current (red):
<p className="text-red-500 text-xs md:text-sm tracking-widest uppercase">

// Change to white:
<p className="text-white text-xs md:text-sm tracking-widest uppercase">

// Change to gold:
<p className="text-amber-500 text-xs md:text-sm tracking-widest uppercase">
```

---

## Data Structure Reference

### Location Object
```javascript
{
  id: Number,                 // Unique identifier (1-10)
  name: String,              // Location name
  country: String,           // Country name
  lat: Number,               // Latitude (-90 to 90)
  lng: Number,               // Longitude (-180 to 180)
  period: String,            // Historical period (e.g., "1891-1942")
  description: String,       // Full description text
  paintings: String[],       // Array of painting titles
  museums: String[],         // Array of museum names
  color: BABYLON.Color3,     // Babylon.js color (0-1 RGB)
  hexColor: String           // Hex color code (for UI)
}
```

### Example: Accessing Location Data
```javascript
// Get first location
const petrodvorets = JOURNEY_LOCATIONS[0];

// Access properties
console.log(petrodvorets.name);           // "Petrodvorets"
console.log(petrodvorets.period);         // "1891-1942"
console.log(petrodvorets.paintings[0]);   // "Early works"
console.log(petrodvorets.lat, petrodvorets.lng);  // 59.8861, 29.9051

// Update painting (example modification)
petrodvorets.paintings.push("New Work");
```

---

## Troubleshooting

### Globe doesn't show
**Problem**: Black screen where globe should be
**Solutions**:
1. Wait 3-5 seconds for textures to load from CDN
2. Check browser console for errors (F12)
3. Try refreshing page
4. Check internet connection (textures load from external CDN)

### Animation doesn't start
**Problem**: "Play Journey" button clicked but nothing happens
**Solutions**:
1. Wait for globe to finish loading first
2. Check browser console for JavaScript errors
3. Ensure globeRef is properly connected

### Markers don't appear
**Problem**: Globe renders but no location markers visible
**Solutions**:
1. Check JOURNEY_LOCATIONS array has data
2. Verify color values are valid BABYLON.Color3 objects
3. Ensure scene initialization completed

### Textures fail to load
**Problem**: Globe renders but appears grey/black (no Earth texture)
**Solutions**:
1. Check internet connection
2. CDN may be temporarily down - refresh page
3. (Alternative) Replace URLs with local texture files in `/public/textures/`

---

## Performance Tips

### For Slower Devices
1. Reduce star count in starfield (line ~220):
```javascript
for (let i = 0; i < 500; i++) {  // Change 500 to 100
```

2. Lower sphere segment resolution (line ~242):
```javascript
{ diameter: 2, segments: 64 }  // Change 64 to 32
```

3. Reduce glow intensity (line ~282):
```javascript
glow.intensity = 0.4;  // Change to 0.2
```

### For Better Performance
1. Keep all segments/stars as-is (optimized)
2. Textures are pre-optimized 2048px (good balance)
3. GlowLayer only applies to markers (not heavy)

---

## File Structure

```
/components/sokoloff/
  ├── JourneyMap.jsx           ← Main component
  ├── LanguageContext.jsx      ← Used for i18n
  
/pages/
  └── index.jsx               ← Imports JourneyMap with dynamic()

/docs/
  ├── JOURNEY_MAP_GUIDE.md              ← Full reference
  ├── JOURNEY_MAP_QUICK_REFERENCE.md    ← Quick lookup
  ├── JOURNEY_MAP_IMPLEMENTATION.md     ← Summary
  └── (this file)
```

---

## Next Steps

1. **Test the component**: Visit http://localhost:3000 and scroll to Journey Map
2. **Try interactions**: Play journey, click locations, explore details
3. **Customize if needed**: Use recipes above to modify colors, speed, etc.
4. **Deploy**: Component is production-ready, no additional setup needed

---

## Questions?

- **"How do I...?"** → Check recipes above
- **"What does this do?"** → See `JOURNEY_MAP_QUICK_REFERENCE.md`
- **"How do I integrate it?"** → Already done! Component in `/pages/index.jsx`
- **"Can I add X feature?"** → See future enhancements in `JOURNEY_MAP_GUIDE.md`

Enjoy your interactive journey map! 🌍✈️
