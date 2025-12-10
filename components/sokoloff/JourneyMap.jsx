import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import * as BABYLON from '@babylonjs/core';
import { motion } from 'framer-motion';
import { Play, Pause, MapPin, Globe } from 'lucide-react';
import { useLanguage } from './LanguageContext';

// Complete location data with full information
const JOURNEY_LOCATIONS = [
  {
    id: 1,
    name: "Petrodvorets (Peterhof)",
    country: "Russia",
    lat: 59.8861,
    lng: 29.9051,
    period: "1891-1942",
    description: "Birthplace. Born into the family of a courtier in charge of Tsar's hunting. Lived in Znamenka, estate of Grand Duke Nicholas.",
    paintings: ["Early works", "Russian landscapes", "Troika paintings"],
    museums: ["State Historical Museum of Moscow", "State Tretyakov Gallery"],
    color: new BABYLON.Color3(0.13, 0.77, 0.37),
    hexColor: '#22c55e'
  },
  {
    id: 2,
    name: "St. Petersburg",
    country: "Russia",
    lat: 59.9343,
    lng: 30.3351,
    period: "1910s-1920s",
    description: "Attended Academy of Arts. Mentored by Dmitry Kardovsky, Boris Kustodiev, and Alexander Savinov. Visited Ilya Repin at Penaty estate.",
    paintings: ["Mother's Portrait (1928)", "Academic works"],
    museums: ["Academy of Arts"],
    color: new BABYLON.Color3(0.13, 0.77, 0.37),
    hexColor: '#22c55e'
  },
  {
    id: 3,
    name: "Gatchina",
    country: "Russia",
    lat: 59.5665,
    lng: 30.1286,
    period: "1914-1915",
    description: "Military Aviation School. Rubbed shoulders with Russian flying elite - Sikorsky, the Seversky brothers, Sergeyevsky. Became flight instructor.",
    paintings: ["Military sketches for Alexander Kuprin"],
    museums: [],
    color: new BABYLON.Color3(0.13, 0.77, 0.37),
    hexColor: '#22c55e'
  },
  {
    id: 4,
    name: "Simferopol",
    country: "Crimea",
    lat: 44.9521,
    lng: 34.1024,
    period: "1937-1942",
    description: "After GULAG release. Elected to leadership in Crimean Artists' Union (founder). Commissioner of Fine Art in Crimea.",
    paintings: ["The Taking of the Perekop", "Petitioners Visiting Lenin", "Khaitarma", "The Leader"],
    museums: [],
    color: new BABYLON.Color3(0.24, 0.51, 0.96),
    hexColor: '#3b82f6'
  },
  {
    id: 5,
    name: "Khabarovsk",
    country: "Russia",
    lat: 48.4802,
    lng: 135.0719,
    period: "Collection",
    description: "Far East Museum holds permanent collection including study of 'Last Steps in the Homeland'.",
    paintings: ["Last Steps in the Homeland (study)", "Russian Motives", "The American Period"],
    museums: ["Khabarovsk Far East Museum"],
    color: new BABYLON.Color3(0.24, 0.51, 0.96),
    hexColor: '#3b82f6'
  },
  {
    id: 6,
    name: "Vaduz",
    country: "Liechtenstein",
    lat: 47.1410,
    lng: 9.5215,
    period: "1942-1948",
    description: "Escaped WWII to Switzerland, then Liechtenstein. Painted Princess of Liechtenstein, a friend of his father.",
    paintings: ["Portrait of Princess Von Liechtenstein", "Suvorov Captures the Turkish Fortress Ismail"],
    museums: ["Princess Von Liechtenstein Collection"],
    color: new BABYLON.Color3(0.55, 0.36, 0.96),
    hexColor: '#8b5cf6'
  },
  {
    id: 7,
    name: "Innsbruck",
    country: "Austria",
    lat: 47.2692,
    lng: 11.4041,
    period: "1947-1948",
    description: "Exhibited in Tyrol region. 'Last Steps in the Homeland' awarded First Prize.",
    paintings: ["Last Steps in the Homeland", "Wilhelm Tell", "At the Cross"],
    museums: [],
    color: new BABYLON.Color3(0.96, 0.62, 0.06),
    hexColor: '#f59e0b'
  },
  {
    id: 8,
    name: "Buenos Aires",
    country: "Argentina",
    lat: -34.6037,
    lng: -58.3816,
    period: "1948-1962",
    description: "Gold Medal for 'San Martin Crosses the Andes'. Commissioned by National Congress. Painted for Gallery Rivadavia (4 paintings, 45x10 feet each).",
    paintings: ["Liberator General San Martin Crosses the Andes", "The Liberator Jose de San Martin", "Crossing of Rio Parana by General Belgrano"],
    museums: ["Instituto Nacional Sanmartiniano", "National Congress Hall", "Gallery Rivadavia"],
    color: new BABYLON.Color3(0.92, 0.29, 0.60),
    hexColor: '#ec4899'
  },
  {
    id: 9,
    name: "San Francisco",
    country: "California",
    lat: 37.7749,
    lng: -122.4194,
    period: "1962-1971",
    description: "Final years. Produced 19 monumental American history paintings. Sketch presented to President Gorbachev in 1990.",
    paintings: ["The Battle of Bunker Hill", "General Washington's Winter March", "Lexington", "Emissaries of Lord Cornwallis", "Russian Merchants at Fort Ross"],
    museums: ["Russian Cultural Museum", "Oakland Museum"],
    color: new BABYLON.Color3(0.94, 0.27, 0.27),
    hexColor: '#ef4444'
  },
  {
    id: 10,
    name: "Moscow",
    country: "Russia",
    lat: 55.7558,
    lng: 37.6173,
    period: "Collection",
    description: "State Tretyakov Gallery received 'The Capture of Ismail by Fieldmarshal A. Suvorov' in 1987.",
    paintings: ["The Capture of Ismail by Fieldmarshal A. Suvorov"],
    museums: ["State Tretyakov Gallery", "State Historical Museum"],
    color: new BABYLON.Color3(0.24, 0.51, 0.96),
    hexColor: '#3b82f6'
  }
];

// Journey sequence following life timeline (1891-1971)
const JOURNEY_SEQUENCE = [0, 1, 2, 3, 5, 6, 7, 8]; // indices into JOURNEY_LOCATIONS

const JourneyGlobe = forwardRef(({ onLocationSelect, autoPlay = false }, ref) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const cameraRef = useRef(null);
  const sceneRef = useRef(null);
  const journeyPlayingRef = useRef(false);
  const journeyLinesRef = useRef([]);
  const markersRef = useRef([]);
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);

  // Camera animation with smooth easing
  const animateCameraToLocation = (lat, lng, zoom = 3.5, duration = 1500) => {
    if (!cameraRef.current) return;

    const camera = cameraRef.current;
    const targetAlpha = lng * (Math.PI / 180);
    const targetBeta = Math.PI / 2 - (lat * (Math.PI / 180));
    const startAlpha = camera.alpha;
    const startBeta = camera.beta;
    const startRadius = camera.radius;
    const targetRadius = zoom;
    const startTime = Date.now();

    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = easeInOutCubic(progress);

      camera.alpha = startAlpha + (targetAlpha - startAlpha) * easeProgress;
      camera.beta = startBeta + (targetBeta - startBeta) * easeProgress;
      camera.radius = startRadius + (targetRadius - startRadius) * easeProgress;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    animate();
  };

  // Play complete journey animation
  const playJourney = async () => {
    if (journeyPlayingRef.current) return;
    journeyPlayingRef.current = true;

    const delayBetween = 3000; // 3 seconds at each location
    const cameraDuration = 1500;

    for (let i = 0; i < JOURNEY_SEQUENCE.length; i++) {
      const locIdx = JOURNEY_SEQUENCE[i];
      const loc = JOURNEY_LOCATIONS[locIdx];

      setCurrentLocationIndex(i);
      onLocationSelect?.(loc);

      animateCameraToLocation(loc.lat, loc.lng, 3.5, cameraDuration);

      // Highlight current marker
      markersRef.current.forEach((marker, idx) => {
        if (idx === locIdx) {
          marker.scaling = new BABYLON.Vector3(1.5, 1.5, 1.5);
        } else {
          marker.scaling = new BABYLON.Vector3(1, 1, 1);
        }
      });

      await new Promise(resolve => setTimeout(resolve, delayBetween));
    }

    journeyPlayingRef.current = false;
  };

  // Pause journey
  const pauseJourney = () => {
    journeyPlayingRef.current = false;
  };

  // Expose methods to parent
  useImperativeHandle(ref, () => ({
    playJourney,
    pauseJourney,
    animateCameraToLocation,
    getCurrentLocation: () => JOURNEY_LOCATIONS[JOURNEY_SEQUENCE[currentLocationIndex]]
  }), [currentLocationIndex]);

  // Initialize Babylon.js scene
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    let engine = null;
    let resizeHandler = null;

    const initScene = () => {
      try {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        if (width === 0 || height === 0) {
          setTimeout(initScene, 100);
          return;
        }

        canvasRef.current.width = width;
        canvasRef.current.height = height;

        // Create engine and scene
        engine = new BABYLON.Engine(canvasRef.current, true, { antialias: true });
        const scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);
        engineRef.current = engine;
        sceneRef.current = scene;

        // Camera setup
        const camera = new BABYLON.ArcRotateCamera(
          'arcCamera',
          -Math.PI / 2,
          Math.PI / 2.6,
          4,
          BABYLON.Vector3.Zero(),
          scene
        );
        camera.attachControl(canvasRef.current, true);
        camera.lowerRadiusLimit = 2;
        camera.upperRadiusLimit = 8;
        camera.wheelPrecision = 100;
        camera.minZ = 0.1;
        camera.inertia = 0.8;
        camera.angularSensibility = 1000;
        camera.panningSensibility = 10;
        camera.useNaturalPinchZoom = true;
        cameraRef.current = camera;

        // Lighting
        new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene).intensity = 0.9;
        const pLight = new BABYLON.PointLight('pointLight', new BABYLON.Vector3(2, 3, 2), scene);
        pLight.intensity = 1.5;

        // Starfield background
        const starfield = BABYLON.MeshBuilder.CreateBox('starfield', { size: 500 }, scene);
        const starMat = new BABYLON.StandardMaterial('starMat', scene);
        const starTex = new BABYLON.DynamicTexture('starTexture', 1024, scene);
        const starCtx = starTex.getContext();
        starCtx.fillStyle = '#000000';
        starCtx.fillRect(0, 0, 1024, 1024);
        starCtx.fillStyle = '#ffffff';
        for (let i = 0; i < 500; i++) {
          starCtx.fillRect(
            Math.random() * 1024,
            Math.random() * 1024,
            Math.random() * 1.5,
            Math.random() * 1.5
          );
        }
        starTex.update();
        starMat.emissiveTexture = starTex;
        starMat.backFaceCulling = false;
        starfield.material = starMat;

        // Earth with textures
        const earth = BABYLON.MeshBuilder.CreateSphere('earth', { diameter: 2, segments: 64 }, scene);

        const dayTex = new BABYLON.Texture(
          'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/land_ocean_ice_cloud_2048.jpg',
          scene
        );
        const normalTex = new BABYLON.Texture(
          'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg',
          scene
        );
        const specTex = new BABYLON.Texture(
          'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg',
          scene
        );
        const nightTex = new BABYLON.Texture(
          'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_lights_2048.png',
          scene
        );

        const pbr = new BABYLON.PBRMaterial('earthPBR', scene);
        pbr.albedoTexture = dayTex;
        pbr.bumpTexture = normalTex;
        pbr.metallic = 0.0;
        pbr.roughness = 1.0;
        pbr.specularTexture = specTex;
        pbr.emissiveTexture = nightTex;
        pbr.emissiveColor = new BABYLON.Color3(1, 1, 1);
        earth.material = pbr;

        // Clouds
        const clouds = BABYLON.MeshBuilder.CreateSphere('clouds', { diameter: 2.02, segments: 64 }, scene);
        const cloudMat = new BABYLON.StandardMaterial('cloudMat', scene);
        cloudMat.diffuseTexture = new BABYLON.Texture(
          'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png',
          scene
        );
        cloudMat.diffuseTexture.hasAlpha = true;
        cloudMat.useAlphaFromDiffuseTexture = true;
        cloudMat.backFaceCulling = false;
        cloudMat.disableLighting = true;
        clouds.material = cloudMat;
        clouds.parent = earth;

        // Atmosphere glow
        const atmosphere = BABYLON.MeshBuilder.CreateSphere('atmos', { diameter: 2.08, segments: 32 }, scene);
        const atmMat = new BABYLON.StandardMaterial('atmMat', scene);
        atmMat.emissiveColor = new BABYLON.Color3(0.05, 0.12, 0.25);
        atmMat.alpha = 0.25;
        atmMat.backFaceCulling = false;
        atmMat.disableLighting = true;
        atmosphere.material = atmMat;
        atmosphere.parent = earth;

        const glow = new BABYLON.GlowLayer('glow', scene);
        glow.intensity = 0.4;

        // Rotate earth and clouds
        scene.registerBeforeRender(() => {
          earth.rotation.y += 0.0006;
          if (clouds) {
            clouds.rotation.y += 0.0009;
          }
        });

        // Create location markers
        JOURNEY_LOCATIONS.forEach((loc, idx) => {
          const lat = (loc.lat * Math.PI) / 180;
          const lng = (loc.lng * Math.PI) / 180;
          const x = Math.cos(lat) * Math.cos(lng);
          const y = Math.sin(lat);
          const z = Math.cos(lat) * Math.sin(lng);

          const marker = BABYLON.MeshBuilder.CreateSphere('marker_' + idx, { diameter: 0.14, segments: 16 }, scene);
          marker.position = new BABYLON.Vector3(x * 1.02, y * 1.02, z * 1.02);

          const mat = new BABYLON.StandardMaterial('markerMat_' + idx, scene);
          mat.emissiveColor = loc.color;
          marker.material = mat;

          marker.metadata = { locationId: loc.id, locationIndex: idx, location: loc };
          markersRef.current.push(marker);

          // Add glow to markers
          const markerGlow = new BABYLON.GlowLayer('glow_' + idx, scene);
          markerGlow.addIncludedOnlyMesh(marker);

          // Click to select location
          scene.onPointerObservable.add((pointerInfo) => {
            if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERDOWN) {
              if (pointerInfo.pickInfo?.hit && pointerInfo.pickInfo.pickedMesh === marker) {
                onLocationSelect?.(loc);
                animateCameraToLocation(loc.lat, loc.lng, 3.5, 1500);
              }
            }
          });
        });

        // Create journey connection lines
        for (let i = 0; i < JOURNEY_SEQUENCE.length - 1; i++) {
          const fromIdx = JOURNEY_SEQUENCE[i];
          const toIdx = JOURNEY_SEQUENCE[i + 1];

          const fromLoc = JOURNEY_LOCATIONS[fromIdx];
          const toLoc = JOURNEY_LOCATIONS[toIdx];

          const fromLat = (fromLoc.lat * Math.PI) / 180;
          const fromLng = (fromLoc.lng * Math.PI) / 180;
          const fromX = Math.cos(fromLat) * Math.cos(fromLng);
          const fromY = Math.sin(fromLat);
          const fromZ = Math.cos(fromLat) * Math.sin(fromLng);

          const toLat = (toLoc.lat * Math.PI) / 180;
          const toLng = (toLoc.lng * Math.PI) / 180;
          const toX = Math.cos(toLat) * Math.cos(toLng);
          const toY = Math.sin(toLat);
          const toZ = Math.cos(toLat) * Math.sin(toLng);

          // Create curved line between locations
          const numSegments = 20;
          const points = [];
          for (let j = 0; j <= numSegments; j++) {
            const t = j / numSegments;
            let x = (1 - t) * fromX + t * toX;
            let y = (1 - t) * fromY + t * toY;
            let z = (1 - t) * fromZ + t * toZ;

            // Arc the line outward slightly
            const dist = Math.sqrt(x * x + y * y + z * z);
            const scale = 1.15 + Math.sin(t * Math.PI) * 0.1;
            x = (x / dist) * scale;
            y = (y / dist) * scale;
            z = (z / dist) * scale;

            points.push(new BABYLON.Vector3(x, y, z));
          }

          const line = BABYLON.MeshBuilder.CreateTube('journey_' + i, {
            path: points,
            radius: 0.03,
            cap: BABYLON.Mesh.CAP_ALL,
          }, scene);

          const lineMat = new BABYLON.StandardMaterial('journeyMat_' + i, scene);
          lineMat.emissiveColor = new BABYLON.Color3(1, 0.2, 0.2);
          lineMat.alpha = 0.6;
          line.material = lineMat;
          journeyLinesRef.current.push(line);
        }

        // Handle window resize
        resizeHandler = () => {
          engine.resize();
        };
        window.addEventListener('resize', resizeHandler);

        // Start render loop
        engine.runRenderLoop(() => {
          scene.render();
        });

        // Auto-play on mount if enabled
        if (autoPlay) {
          setTimeout(() => playJourney(), 500);
        }
      } catch (error) {
        console.error('Error initializing scene:', error);
      }
    };

    initScene();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeHandler);
      if (engine) {
        engine.dispose();
      }
    };
  }, [autoPlay]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
});

JourneyGlobe.displayName = 'JourneyGlobe';

// Main Journey Map Component
export default function JourneyMap() {
  const { t } = useLanguage();
  const globeRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(JOURNEY_LOCATIONS[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayJourney = () => {
    setIsPlaying(true);
    globeRef.current?.playJourney();
  };

  const handlePauseJourney = () => {
    setIsPlaying(false);
    globeRef.current?.pauseJourney();
  };

  const handleLocationClick = (loc) => {
    setSelectedLocation(loc);
    globeRef.current?.animateCameraToLocation(loc.lat, loc.lng, 3.5, 1500);
  };

  return (
    <section className="relative bg-black py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-red-500 text-xs md:text-sm tracking-widest uppercase mb-4">Journey Map</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4">
            A Life Across <span className="font-bold">Continents</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            From Imperial Russia to Argentina and California - trace the extraordinary journey of Anatoly Sokoloff and discover where his masterpieces reside today
          </p>
          <div className="w-16 md:w-24 h-0.5 bg-red-500 mx-auto mt-6" />
        </motion.div>

        {/* Globe Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900/50 mb-8"
          style={{ height: '500px', minHeight: '500px' }}
        >
          <JourneyGlobe ref={globeRef} onLocationSelect={setSelectedLocation} autoPlay={false} />

          {/* Controls Overlay */}
          <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 flex justify-between items-center z-10">
            <div className="flex gap-2">
              {!isPlaying ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePlayJourney}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  <Play size={16} />
                  <span className="text-sm font-medium">Play Journey</span>
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePauseJourney}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  <Pause size={16} />
                  <span className="text-sm font-medium">Pause</span>
                </motion.button>
              )}
            </div>

            {/* Legend */}
            <div className="hidden md:flex items-center gap-4 bg-black/80 backdrop-blur px-4 py-2 rounded-lg border border-zinc-700">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-xs text-gray-400">Journey Path</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-red-500" />
                <span className="text-xs text-gray-400">Locations</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Location Details Panel */}
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-black border border-zinc-800 rounded-xl p-6 md:p-8 mb-8"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {selectedLocation.name}, <span className="text-gray-400">{selectedLocation.country}</span>
                </h3>
                <p className="text-red-500 font-medium text-sm md:text-base">{selectedLocation.period}</p>
              </div>
              <div
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: selectedLocation.hexColor }}
              />
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed text-sm md:text-base">
              {selectedLocation.description}
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {selectedLocation.paintings && selectedLocation.paintings.length > 0 && (
                <div>
                  <h4 className="text-white font-semibold text-base md:text-lg mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                    Notable Works
                  </h4>
                  <ul className="space-y-2">
                    {selectedLocation.paintings.map((painting, i) => (
                      <li key={i} className="text-gray-400 text-sm flex items-start gap-3">
                        <span className="w-1 h-1 bg-red-500/60 rounded-full mt-2 flex-shrink-0" />
                        <span>{painting}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedLocation.museums && selectedLocation.museums.length > 0 && (
                <div>
                  <h4 className="text-white font-semibold text-base md:text-lg mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                    Museums & Collections
                  </h4>
                  <ul className="space-y-2">
                    {selectedLocation.museums.map((museum, i) => (
                      <li key={i} className="text-gray-400 text-sm flex items-start gap-3">
                        <span className="w-1 h-1 bg-yellow-500/60 rounded-full mt-2 flex-shrink-0" />
                        <span>{museum}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Location Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3"
        >
          {JOURNEY_LOCATIONS.map((loc) => (
            <motion.button
              key={loc.id}
              onClick={() => handleLocationClick(loc)}
              className={`p-4 rounded-lg border transition-all group overflow-hidden ${
                selectedLocation?.id === loc.id
                  ? 'bg-red-600/20 border-red-500 shadow-lg shadow-red-500/20'
                  : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/50'
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div
                className="absolute top-0 left-0 w-1 h-1 rounded-full flex-shrink-0"
                style={{ backgroundColor: loc.hexColor }}
              />
              <div className="text-left">
                <p className="text-white text-xs md:text-sm font-medium truncate group-hover:text-red-400 transition-colors">
                  {loc.name}
                </p>
                <p className="text-gray-500 text-xs mt-1">{loc.period}</p>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
