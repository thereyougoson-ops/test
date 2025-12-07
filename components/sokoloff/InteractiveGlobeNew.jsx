'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders/glTF';

const locations = [
  {
    id: 1,
    name: "Petrodvorets (Peterhof), Russia",
    lat: 59.8861,
    lng: 29.9051,
    period: "1891-1942",
    description: "Birthplace. Born into the family of a courtier in charge of Tsar's hunting.",
    paintings: ["Early works", "Russian landscapes", "Troika paintings"],
    museums: ["State Historical Museum of Moscow", "State Tretyakov Gallery"],
    color: new BABYLON.Color3(0.13, 0.77, 0.37)
  },
  {
    id: 2,
    name: "St. Petersburg, Russia",
    lat: 59.9343,
    lng: 30.3351,
    period: "1910s-1920s",
    description: "Attended Academy of Arts. Mentored by Dmitry Kardovsky, Boris Kustodiev.",
    paintings: ["Mother's Portrait (1928)", "Academic works"],
    museums: [],
    color: new BABYLON.Color3(0.13, 0.77, 0.37)
  },
  {
    id: 3,
    name: "Gatchina, Russia",
    lat: 59.5665,
    lng: 30.1286,
    period: "1914-1915",
    description: "Military Aviation School. Rubbed shoulders with Russian flying elite.",
    paintings: ["Military sketches for Alexander Kuprin"],
    museums: [],
    color: new BABYLON.Color3(0.13, 0.77, 0.37)
  },
  {
    id: 4,
    name: "Simferopol, Crimea",
    lat: 44.9521,
    lng: 34.1024,
    period: "1937-1942",
    description: "After GULAG release. Elected to leadership in Crimean Artists' Union.",
    paintings: ["The Taking of the Perekop", "Petitioners Visiting Lenin", "Khaitarma", "The Leader"],
    museums: [],
    color: new BABYLON.Color3(0.24, 0.51, 0.96)
  },
  {
    id: 5,
    name: "Khabarovsk, Russia",
    lat: 48.4802,
    lng: 135.0719,
    period: "Permanent Collection",
    description: "Far East Museum holds permanent collection.",
    paintings: ["Last Steps in the Homeland (study)", "Russian Motives", "The American Period"],
    museums: ["Khabarovsk Far East Museum"],
    color: new BABYLON.Color3(0.24, 0.51, 0.96)
  },
  {
    id: 6,
    name: "Vaduz, Liechtenstein",
    lat: 47.1410,
    lng: 9.5215,
    period: "1942-1948",
    description: "Escaped WWII to Switzerland, then Liechtenstein.",
    paintings: ["Portrait of Princess Von Liechtenstein", "Suvorov Captures the Turkish Fortress Ismail"],
    museums: ["Princess Von Liechtenstein Collection"],
    color: new BABYLON.Color3(0.55, 0.36, 0.96)
  },
  {
    id: 7,
    name: "Innsbruck, Austria",
    lat: 47.2692,
    lng: 11.4041,
    period: "1947-1948",
    description: "Exhibited in Tyrol region. 'Last Steps in the Homeland' awarded First Prize.",
    paintings: ["Last Steps in the Homeland", "Wilhelm Tell", "At the Cross"],
    museums: [],
    color: new BABYLON.Color3(0.96, 0.62, 0.06)
  },
  {
    id: 8,
    name: "Buenos Aires, Argentina",
    lat: -34.6037,
    lng: -58.3816,
    period: "1948-1962",
    description: "Gold Medal for 'San Martin Crosses the Andes'.",
    paintings: ["Liberator General San Martin Crosses the Andes", "The Liberator Jose de San Martin"],
    museums: ["Instituto Nacional Sanmartiniano", "National Congress Hall", "Gallery Rivadavia"],
    color: new BABYLON.Color3(0.92, 0.29, 0.60)
  },
  {
    id: 9,
    name: "San Francisco, California",
    lat: 37.7749,
    lng: -122.4194,
    period: "1962-1971",
    description: "Final years. Produced 19 monumental American history paintings.",
    paintings: ["The Battle of Bunker Hill", "General Washington's Winter March", "Lexington"],
    museums: ["Russian Cultural Museum", "Oakland Museum"],
    color: new BABYLON.Color3(0.94, 0.27, 0.27)
  },
  {
    id: 10,
    name: "Moscow, Russia",
    lat: 55.7558,
    lng: 37.6173,
    period: "Museum Collection",
    description: "State Tretyakov Gallery received 'The Capture of Ismail'.",
    paintings: ["The Capture of Ismail by Fieldmarshal A. Suvorov"],
    museums: ["State Tretyakov Gallery", "State Historical Museum"],
    color: new BABYLON.Color3(0.24, 0.51, 0.96)
  }
];

const journeyConnections = [
  { from: 0, to: 1 },
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 5 },
  { from: 5, to: 6 },
  { from: 6, to: 7 },
  { from: 7, to: 8 }
];

export default function InteractiveGlobe({ onLocationSelect, selectedLocation }) {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const autoRotateRef = useRef(true);
  const [hoveredLocation, setHoveredLocation] = useState(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Create Babylon.js scene
    const engine = new BABYLON.Engine(canvasRef.current, true, { 
      preserveDrawingBuffer: true,
      stencil: true 
    });
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);

    engineRef.current = engine;
    sceneRef.current = scene;

    // Create camera
    const camera = new BABYLON.UniversalCamera('camera', new BABYLON.Vector3(0, 0, 2.8));
    camera.attachControl(canvasRef.current, true);
    camera.inertia = 0.7;
    camera.angularSensibility = 1000;
    camera.wheelPrecision = 50;
    cameraRef.current = camera;

    // Lighting setup
    const ambientLight = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);
    ambientLight.intensity = 0.9;

    const pointLight = new BABYLON.PointLight('pointLight', new BABYLON.Vector3(2, 3, 2), scene);
    pointLight.intensity = 0.8;
    pointLight.range = 100;

    // Create stars background
    const starfield = BABYLON.MeshBuilder.CreateBox('starfield', { size: 500 }, scene);
    const starMaterial = new BABYLON.StandardMaterial('starMat', scene);
    const starTexture = new BABYLON.DynamicTexture('starTexture', 1024, scene);
    const starCtx = starTexture.getContext();
    
    starCtx.fillStyle = '#000000';
    starCtx.fillRect(0, 0, 1024, 1024);
    starCtx.fillStyle = '#ffffff';
    
    for (let i = 0; i < 500; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 1024;
      const size = Math.random() * 1.5;
      starCtx.fillRect(x, y, size, size);
    }
    
    starTexture.update();
    starMaterial.emissiveTexture = starTexture;
    starfield.material = starMaterial;

    // Create Earth sphere
    const earth = BABYLON.MeshBuilder.CreateSphere('earth', { diameter: 2, segments: 128 }, scene);

    // Create Earth material with texture
    const earthMaterial = new BABYLON.StandardMaterial('earthMaterial', scene);
    earthMaterial.specularColor = new BABYLON.Color3(0.2, 0.2, 0.2);

    // Create Earth texture
    const earthTexture = new BABYLON.DynamicTexture('earthTexture', 2048, scene);
    const earthCtx = earthTexture.getContext();

    // Ocean color - nice blue gradient
    const oceanGradient = earthCtx.createLinearGradient(0, 0, 2048, 1024);
    oceanGradient.addColorStop(0, '#0a1f2e');
    oceanGradient.addColorStop(0.3, '#16425b');
    oceanGradient.addColorStop(0.5, '#1e5f7a');
    oceanGradient.addColorStop(0.7, '#16425b');
    oceanGradient.addColorStop(1, '#0a1f2e');
    earthCtx.fillStyle = oceanGradient;
    earthCtx.fillRect(0, 0, 2048, 1024);

    // Continents
    earthCtx.fillStyle = '#2d5d3f';

    // North America
    earthCtx.beginPath();
    earthCtx.ellipse(280, 350, 150, 120, -0.2, 0, Math.PI * 2);
    earthCtx.fill();

    // South America
    earthCtx.beginPath();
    earthCtx.ellipse(380, 550, 80, 110, 0.3, 0, Math.PI * 2);
    earthCtx.fill();

    // Europe
    earthCtx.beginPath();
    earthCtx.ellipse(950, 280, 100, 80, 0, 0, Math.PI * 2);
    earthCtx.fill();

    // Africa
    earthCtx.beginPath();
    earthCtx.ellipse(1050, 500, 120, 150, 0, 0, Math.PI * 2);
    earthCtx.fill();

    // Asia
    earthCtx.fillRect(1200, 300, 500, 250);

    // Australia
    earthCtx.beginPath();
    earthCtx.ellipse(1750, 600, 80, 70, 0, 0, Math.PI * 2);
    earthCtx.fill();

    // Greenland
    earthCtx.beginPath();
    earthCtx.ellipse(750, 120, 60, 90, 0, 0, Math.PI * 2);
    earthCtx.fill();

    earthTexture.update();
    earthMaterial.emissiveTexture = earthTexture;
    earth.material = earthMaterial;

    // Auto-rotate
    scene.registerBeforeRender(() => {
      if (autoRotateRef.current) {
        earth.rotation.y += 0.0005;
      }
    });

    const markersArray = [];

    // Create location markers
    locations.forEach((location, idx) => {
      const lat = (location.lat * Math.PI) / 180;
      const lng = (location.lng * Math.PI) / 180;

      const x = Math.cos(lat) * Math.cos(lng);
      const y = Math.sin(lat);
      const z = Math.cos(lat) * Math.sin(lng);

      // Create marker sphere
      const marker = BABYLON.MeshBuilder.CreateSphere('marker_' + idx, { diameter: 0.12, segments: 24 }, scene);
      marker.position = new BABYLON.Vector3(x * 1.08, y * 1.08, z * 1.08);

      const markerMaterial = new BABYLON.StandardMaterial('markerMat_' + idx, scene);
      markerMaterial.emissiveColor = location.color;
      marker.material = markerMaterial;

      marker.metadata = { 
        locationId: location.id,
        location: location 
      };

      markersArray.push(marker);

      // Add glow effect for selected location
      const glow = new BABYLON.GlowLayer('glow_' + idx, scene);
      glow.addIncludedOnlyMesh(marker);
    });

    // Create journey lines
    journeyConnections.forEach((conn, idx) => {
      const fromLoc = locations[conn.from];
      const toLoc = locations[conn.to];

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

      const pathPoints = [
        new BABYLON.Vector3(fromX * 1.06, fromY * 1.06, fromZ * 1.06),
        new BABYLON.Vector3(toX * 1.06, toY * 1.06, toZ * 1.06)
      ];

      const line = BABYLON.MeshBuilder.CreateTube('journey_' + idx, {
        path: pathPoints,
        radius: 0.015,
        updatable: false
      }, scene);

      const lineMaterial = new BABYLON.StandardMaterial('lineMat_' + idx, scene);
      const colors = [
        new BABYLON.Color3(0.13, 0.77, 0.37),
        new BABYLON.Color3(0.13, 0.77, 0.37),
        new BABYLON.Color3(0.24, 0.51, 0.96),
        new BABYLON.Color3(0.55, 0.36, 0.96),
        new BABYLON.Color3(0.96, 0.62, 0.06),
        new BABYLON.Color3(0.92, 0.29, 0.60),
        new BABYLON.Color3(0.94, 0.27, 0.27)
      ];
      lineMaterial.emissiveColor = colors[idx];
      line.material = lineMaterial;
    });

    // Pointer observables for interaction
    scene.onPointerObservable.add((pointerInfo) => {
      if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERMOVE) {
        const hit = scene.pick(scene.pointerX, scene.pointerY);
        if (hit && hit.hit) {
          const pickedMesh = hit.pickedMesh;
          if (pickedMesh && pickedMesh.metadata && pickedMesh.metadata.locationId) {
            setHoveredLocation(pickedMesh.metadata.locationId);
            pickedMesh.scaling = new BABYLON.Vector3(1.4, 1.4, 1.4);
          }
        } else {
          markersArray.forEach(m => {
            m.scaling = new BABYLON.Vector3(1, 1, 1);
          });
          setHoveredLocation(null);
        }
      } else if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERDOWN) {
        const hit = scene.pick(scene.pointerX, scene.pointerY);
        if (hit && hit.hit) {
          const pickedMesh = hit.pickedMesh;
          if (pickedMesh && pickedMesh.metadata && pickedMesh.metadata.location) {
            onLocationSelect(pickedMesh.metadata.location);
            autoRotateRef.current = false;
          }
        }
      }
    });

    // Render loop
    engine.runRenderLoop(() => {
      scene.render();
    });

    // Handle window resize
    const resizeHandler = () => {
      engine.resize();
    };

    window.addEventListener('resize', resizeHandler);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeHandler);
      engine.dispose();
    };
  }, [onLocationSelect]);

  const cameraRef = useRef(null);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block'
      }}
    />
  );
}
