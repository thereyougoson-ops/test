# JourneyMap Component - Quick Reference

## Component Hierarchy
```
JourneyMap (Main export)
├── Section Header (Title + Description)
├── JourneyGlobe (Babylon.js 3D scene)
│   ├── Starfield (background)
│   ├── Earth (PBR material with textures)
│   ├── Clouds (rotating, semi-transparent)
│   ├── Atmosphere (glow layer)
│   ├── Location Markers (10 glowing spheres)
│   ├── Journey Lines (8 red curved tubes)
│   ├── Camera (ArcRotate, orbits globe)
│   └── Lights (Hemispheric + Point)
├── Controls Overlay (Play/Pause + Legend)
├── Location Details Panel (Dynamic, when selected)
└── Location Grid (10 clickable buttons)
```

## Data Flow
```
Initial State: selectedLocation = JOURNEY_LOCATIONS[0] (Petrodvorets)

User clicks "Play Journey" button
    ↓
playJourney() called on globeRef
    ↓
For each location in JOURNEY_SEQUENCE:
    - setCurrentLocationIndex(i)
    - onLocationSelect(location)
    - animateCameraToLocation(lat, lng, zoom, duration)
    - Scale marker up (1 → 1.5)
    - Wait 3 seconds
    ↓
Journey completes, setIsPlaying(false)
```

## State Management
```javascript
// Parent (JourneyMap)
const [selectedLocation, setSelectedLocation] = useState(JOURNEY_LOCATIONS[0])
const [isPlaying, setIsPlaying] = useState(false)
const globeRef = useRef(null)  // Reference to child JourneyGlobe

// Child (JourneyGlobe)
const [currentLocationIndex, setCurrentLocationIndex] = useState(0)
const journeyPlayingRef = useRef(false)
const cameraRef = useRef(null)
const sceneRef = useRef(null)
const markersRef = useRef([])
const journeyLinesRef = useRef([])
```

## Key Methods

### playJourney()
```
1. Set journeyPlayingRef.current = true
2. Loop through JOURNEY_SEQUENCE indices
3. For each location:
   a. Update state (currentLocationIndex, selectedLocation)
   b. Call animateCameraToLocation() with 1500ms duration
   c. Scale marker to 1.5x
   d. Wait 3000ms (3 seconds)
4. Set journeyPlayingRef.current = false
```

### animateCameraToLocation(lat, lng, zoom, duration)
```
1. Convert lat/lng to camera spherical coordinates (alpha, beta)
2. Calculate start position (camera.alpha, camera.beta, camera.radius)
3. Calculate target position using conversion formulas
4. Use requestAnimationFrame to animate over duration:
   a. Calculate progress (0 to 1)
   b. Apply easeInOutCubic() function
   c. Interpolate camera properties using easing progress
5. Stop when progress === 1
```

### Babylon.js Scene Setup
```
1. Create engine from canvas
2. Create scene with black background
3. Create ArcRotateCamera (center at 0,0,0)
4. Add lights (Hemispheric + Point)
5. Create starfield box (500 units, 500 stars)
6. Create Earth sphere:
   - Load 4 textures (albedo, normal, specular, emissive)
   - Create PBR material
   - Assign to sphere
   - Register beforeRender to rotate (0.0006 rad/frame)
7. Create cloud sphere (2.02 diameter, rotates faster)
8. Create atmosphere sphere (glow effect)
9. Create 10 marker spheres at location coordinates
10. Create 8 journey tubes connecting locations
11. Attach pointer listeners to markers
12. Register render loop
13. Handle window resize
```

## Location Coordinates (lat, lng)

| # | Name | Country | Latitude | Longitude |
|---|------|---------|----------|-----------|
| 0 | Petrodvorets | Russia | 59.8861 | 29.9051 |
| 1 | St. Petersburg | Russia | 59.9343 | 30.3351 |
| 2 | Gatchina | Russia | 59.5665 | 30.1286 |
| 3 | Simferopol | Crimea | 44.9521 | 34.1024 |
| 4 | Khabarovsk | Russia | 48.4802 | 135.0719 |
| 5 | Vaduz | Liechtenstein | 47.1410 | 9.5215 |
| 6 | Innsbruck | Austria | 47.2692 | 11.4041 |
| 7 | Buenos Aires | Argentina | -34.6037 | -58.3816 |
| 8 | San Francisco | California | 37.7749 | -122.4194 |
| 9 | Moscow | Russia | 55.7558 | 37.6173 |

Journey playback: **[0, 1, 2, 3, 5, 6, 7, 8]** (indices)
Skipped in journey: **[4, 9]** (Khabarovsk & Moscow - museum collections only)

## Color Coding System

### Babylon.js Colors (0-1 RGB scale)
```javascript
GREEN (#22c55e)      [R:0.13, G:0.77, B:0.37] - Early Russia
BLUE (#3b82f6)       [R:0.24, G:0.51, B:0.96] - Soviet & Collections
PURPLE (#8b5cf6)     [R:0.55, G:0.36, B:0.96] - European Refuge
ORANGE (#f59e0b)     [R:0.96, G:0.62, B:0.06] - Austria Exhibition
PINK (#ec4899)       [R:0.92, G:0.29, B:0.60] - Argentina
RED (#ef4444)        [R:0.94, G:0.27, B:0.27] - Final USA Years
```

## Texture URLs (External CDN)
```
Earth Albedo:
https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/land_ocean_ice_cloud_2048.jpg

Earth Normal:
https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg

Earth Specular:
https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg

Earth Night:
https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_lights_2048.png

Clouds:
https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png
```

## Event Handlers

### JourneyGlobe Events
```javascript
// Pointer click on marker
pointerInfo.type === BABYLON.PointerEventTypes.POINTERDOWN
  → Check if pickedMesh matches any marker
  → Call onLocationSelect(location)
  → Animate camera to location

// Window resize
addEventListener('resize', () => engine.resize())

// Before each render
scene.registerBeforeRender(() => {
  earth.rotation.y += 0.0006
  clouds.rotation.y += 0.0009
})
```

### UI Event Handlers
```javascript
// Play Journey button
onClick → setIsPlaying(true) → globeRef.current.playJourney()

// Pause button
onClick → setIsPlaying(false) → globeRef.current.pauseJourney()

// Location button in grid
onClick → handleLocationClick(location)
  → setSelectedLocation(location)
  → animateCameraToLocation(...)
```

## Responsive Design

### Mobile Breakpoints
```css
/* Base (mobile) */
py-16                 /* Padding vertical */
text-4xl              /* Heading size */
gap-3                 /* Grid gap */
w-[80vw]              /* Element width */

/* md: (768px+) */
md:py-24              /* More padding */
md:text-5xl           /* Larger heading */
md:gap-4              /* Wider grid */
md:w-[450px]          /* Fixed width */

/* lg: (1024px+) */
lg:py-32              /* Maximum padding */
lg:text-6xl           /* Largest heading */
md:grid-cols-5        /* 5 column grid */
```

## Performance Optimization Tips

1. **Lazy Load Textures**: Add fallback colors while textures load
   ```javascript
   material.albedoColor = new BABYLON.Color3(0.5, 0.5, 0.5); // Fallback
   ```

2. **Reduce Star Count**: Change `500` to `100` in starfield loop

3. **Lower Segment Count**: Change sphere `segments: 64` to `32`

4. **Disable Glow on Low-End**: 
   ```javascript
   const glow = new BABYLON.GlowLayer('glow', scene);
   glow.intensity = 0.2; // Reduce from 0.4
   ```

5. **Throttle Resize Handler**:
   ```javascript
   let resizeTimeout;
   const resizeHandler = () => {
     clearTimeout(resizeTimeout);
     resizeTimeout = setTimeout(() => engine.resize(), 100);
   };
   ```

## Animation Timing Diagram

```
Journey Playback Timeline (per location)
│
├─ 0ms: animateCameraToLocation() called (1500ms duration)
│   ├─ 0ms: Start position
│   ├─ 750ms: 50% eased
│   └─ 1500ms: End at location
│
├─ 1500-3000ms: Stay at location (3000ms delay)
│
└─ 3000ms: Move to next location (repeat)

Total for 8 locations: 3000ms × 8 = 24 seconds
```

## Common CSS Classes

```css
/* Container */
relative bg-black py-16 md:py-24 lg:py-32

/* Header */
text-center text-red-500 uppercase

/* Globe Container */
rounded-xl border-zinc-800 bg-zinc-900/50 h-500px

/* Button Styles */
bg-red-600 hover:bg-red-700 text-white rounded-lg
bg-zinc-900 border-zinc-800 hover:border-zinc-700

/* Text Hierarchy */
text-white font-bold        /* Primary heading */
text-gray-400               /* Secondary text */
text-gray-500               /* Tertiary text */
text-red-500                /* Accent color */
```

## Dependencies & Imports

```javascript
import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import * as BABYLON from '@babylonjs/core';  // 3D graphics
import { motion } from 'framer-motion';       // Animations
import { Play, Pause, MapPin, Globe } from 'lucide-react';  // Icons
import { useLanguage } from './LanguageContext';  // i18n
```

## Next Steps

1. ✓ JourneyMap component created
2. ✓ Integrated into pages/index.jsx
3. ✓ Dev server running with live reload
4. **TODO**: Test all interactions
5. **TODO**: Add bilingual translations if needed
6. **TODO**: Customize colors/timing per requirements
7. **TODO**: Add painting image gallery (future enhancement)
