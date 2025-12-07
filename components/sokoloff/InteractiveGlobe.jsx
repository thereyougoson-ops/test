'use client';

import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import * as BABYLON from '@babylonjs/core';

const locations = [
  { id: 1, name: "Petrodvorets", lat: 59.8861, lng: 29.9051, period: "1891-1942", description: "Birthplace", paintings: ["Early works"], museums: ["Museum 1"], color: new BABYLON.Color3(0.13, 0.77, 0.37) },
  { id: 2, name: "St. Petersburg", lat: 59.9343, lng: 30.3351, period: "1910s-1920s", description: "Academy of Arts", paintings: ["Academic works"], museums: [], color: new BABYLON.Color3(0.13, 0.77, 0.37) },
  { id: 3, name: "Gatchina", lat: 59.5665, lng: 30.1286, period: "1914-1915", description: "Aviation School", paintings: ["Military sketches"], museums: [], color: new BABYLON.Color3(0.13, 0.77, 0.37) },
  { id: 4, name: "Simferopol", lat: 44.9521, lng: 34.1024, period: "1937-1942", description: "GULAG Release", paintings: ["Perekop"], museums: [], color: new BABYLON.Color3(0.24, 0.51, 0.96) },
  { id: 5, name: "Khabarovsk", lat: 48.4802, lng: 135.0719, period: "Collection", description: "Far East Museum", paintings: ["Homeland Study"], museums: ["Khabarovsk Museum"], color: new BABYLON.Color3(0.24, 0.51, 0.96) },
  { id: 6, name: "Vaduz", lat: 47.1410, lng: 9.5215, period: "1942-1948", description: "WWII Escape", paintings: ["Princess Portrait"], museums: ["Liechtenstein"], color: new BABYLON.Color3(0.55, 0.36, 0.96) },
  { id: 7, name: "Innsbruck", lat: 47.2692, lng: 11.4041, period: "1947-1948", description: "Exhibition", paintings: ["Wilhelm Tell"], museums: [], color: new BABYLON.Color3(0.96, 0.62, 0.06) },
  { id: 8, name: "Buenos Aires", lat: -34.6037, lng: -58.3816, period: "1948-1962", description: "Gold Medal", paintings: ["San Martin"], museums: ["Argentina Museum"], color: new BABYLON.Color3(0.92, 0.29, 0.60) },
  { id: 9, name: "San Francisco", lat: 37.7749, lng: -122.4194, period: "1962-1971", description: "Final Years", paintings: ["Bunker Hill"], museums: ["Oakland Museum"], color: new BABYLON.Color3(0.94, 0.27, 0.27) },
  { id: 10, name: "Moscow", lat: 55.7558, lng: 37.6173, period: "Collection", description: "Tretyakov Gallery", paintings: ["Capture of Ismail"], museums: ["Tretyakov"], color: new BABYLON.Color3(0.24, 0.51, 0.96) }
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

export default forwardRef(function InteractiveGlobe({ onLocationSelect, selectedLocation }, ref) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const [initError, setInitError] = useState(null);
  const cameraRef = useRef(null);
  const sceneRef = useRef(null);
  const journeyPlayingRef = useRef(false);

  // Helper function to animate camera to a location
  const animateCameraToLocation = (lat, lng, zoom = 3.5, duration = 1500) => {
    if (!cameraRef.current) return;
    
    const camera = cameraRef.current;
    const targetAlpha = lng * (Math.PI / 180);
    const targetBeta = (Math.PI / 2) - (lat * (Math.PI / 180));
    const startAlpha = camera.alpha;
    const startBeta = camera.beta;
    const startRadius = camera.radius;
    const targetRadius = zoom;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth easing (ease-in-out cubic)
      const easeProgress = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      camera.alpha = startAlpha + (targetAlpha - startAlpha) * easeProgress;
      camera.beta = startBeta + (targetBeta - startBeta) * easeProgress;
      camera.radius = startRadius + (targetRadius - startRadius) * easeProgress;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    animate();
  };

  // Helper function to play journey animation through locations
  const playJourney = async () => {
    if (journeyPlayingRef.current) return;
    journeyPlayingRef.current = true;

    const journey = [0, 1, 2, 3, 5, 6, 7, 8]; // indices into locations array
    const delayBetween = 2500; // ms between each location

    for (const idx of journey) {
      const loc = locations[idx];
      animateCameraToLocation(loc.lat, loc.lng, 3.5, 1500);
      await new Promise(resolve => setTimeout(resolve, delayBetween));
    }

    journeyPlayingRef.current = false;
  };

  // Expose camera and journey functions to parent
  useImperativeHandle(ref, () => ({
    animateCameraToLocation,
    playJourney,
  }), []);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    let engine = null;
    let resizeHandler = null;

      const initScene = () => {
      try {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        if (width === 0 || height === 0) {
          setTimeout(initScene, 50);
          return;
        }

        canvasRef.current.width = width;
        canvasRef.current.height = height;

        engine = new BABYLON.Engine(canvasRef.current, true, { antialias: true });
        const scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);
        engineRef.current = engine;

        const camera = new BABYLON.ArcRotateCamera('arcCamera', -Math.PI / 2, Math.PI / 2.6, 4, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(canvasRef.current, true);
        camera.lowerRadiusLimit = 2;
        camera.upperRadiusLimit = 8;
        camera.wheelPrecision = 200;
        camera.minZ = 0.1;
        
        // Enhanced touch and mouse controls
        camera.inertia = 0.85; // Smooth momentum scrolling
        camera.angularSensibility = 500; // Adjust rotation speed (lower = faster)
        camera.panningSensibility = 10; // Pan control sensitivity
        camera.useNaturalPinchZoom = true; // Native pinch-to-zoom on mobile
        camera.pinchToPanMaxDistance = 20; // Limit pan distance
        
        cameraRef.current = camera;
        sceneRef.current = scene;

        new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene).intensity = 0.9;
        const pLight = new BABYLON.PointLight('pointLight', new BABYLON.Vector3(2, 3, 2), scene);
        pLight.intensity = 1.5;

        const starfield = BABYLON.MeshBuilder.CreateBox('starfield', { size: 500 }, scene);
        const starMat = new BABYLON.StandardMaterial('starMat', scene);
        const starTex = new BABYLON.DynamicTexture('starTexture', 1024, scene);
        const starCtx = starTex.getContext();
        starCtx.fillStyle = '#000000';
        starCtx.fillRect(0, 0, 1024, 1024);
        starCtx.fillStyle = '#ffffff';
        for (let i = 0; i < 500; i++) {
          starCtx.fillRect(Math.random() * 1024, Math.random() * 1024, Math.random() * 1.5, Math.random() * 1.5);
        }
        starTex.update();
        starMat.emissiveTexture = starTex;
        // show starfield from inside the box
        starMat.backFaceCulling = false;
        starfield.material = starMat;

        // Create a realistic earth using PBR material and external textures (CDN)
        const earth = BABYLON.MeshBuilder.CreateSphere('earth', { diameter: 2, segments: 64 }, scene);

        // Textures (CDN-hosted; can be swapped to local /public/textures/ later)
        const dayTex = new BABYLON.Texture('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/land_ocean_ice_cloud_2048.jpg', scene);
        const normalTex = new BABYLON.Texture('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg', scene);
        const specTex = new BABYLON.Texture('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg', scene);
        const nightTex = new BABYLON.Texture('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_lights_2048.png', scene);

        const pbr = new BABYLON.PBRMaterial('earthPBR', scene);
        pbr.albedoTexture = dayTex;
        pbr.bumpTexture = normalTex;
        pbr.useAmbientOcclusionFromMetallicTextureRed = false;
        pbr.metallic = 0.0;
        pbr.roughness = 1.0;
        pbr.specularTexture = specTex;
        pbr.emissiveTexture = nightTex;
        pbr.emissiveColor = new BABYLON.Color3(1, 1, 1);
        earth.material = pbr;

        // Clouds layer (slightly larger transparent sphere)
        const clouds = BABYLON.MeshBuilder.CreateSphere('clouds', { diameter: 2.02, segments: 64 }, scene);
        const cloudMat = new BABYLON.StandardMaterial('cloudMat', scene);
        cloudMat.diffuseTexture = new BABYLON.Texture('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png', scene);
        cloudMat.diffuseTexture.hasAlpha = true;
        cloudMat.useAlphaFromDiffuseTexture = true;
        cloudMat.backFaceCulling = false;
        cloudMat.disableLighting = true;
        clouds.material = cloudMat;
        clouds.parent = earth;

        // Atmosphere glow via a slightly larger sphere and GlowLayer tweak
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

        scene.registerBeforeRender(() => {
          earth.rotation.y += 0.0006;
          // slow cloud rotation
          if (clouds) {
            clouds.rotation.y += 0.0009;
          }
        });

        const markers = [];
        locations.forEach((loc, idx) => {
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

          marker.metadata = { locationId: loc.id, location: loc };
          markers.push(marker);

          new BABYLON.GlowLayer('glow_' + idx, scene).addIncludedOnlyMesh(marker);
        });


        journeyConnections.forEach((conn, idx) => {
          const from = locations[conn.from];
          const to = locations[conn.to];

          const fromLat = (from.lat * Math.PI) / 180;
          const fromLng = (from.lng * Math.PI) / 180;
          const fromX = Math.cos(fromLat) * Math.cos(fromLng);
          const fromY = Math.sin(fromLat);
          const fromZ = Math.cos(fromLat) * Math.sin(fromLng);

          const toLat = (to.lat * Math.PI) / 180;
          const toLng = (to.lng * Math.PI) / 180;
          const toX = Math.cos(toLat) * Math.cos(toLng);
          const toY = Math.sin(toLat);
          const toZ = Math.cos(toLat) * Math.sin(toLng);

          const line = BABYLON.MeshBuilder.CreateTube('journey_' + idx, {
            path: [
              new BABYLON.Vector3(fromX * 1.06, fromY * 1.06, fromZ * 1.06),
              new BABYLON.Vector3(toX * 1.06, toY * 1.06, toZ * 1.06)
            ],
            radius: 0.015
          }, scene);

          const lineMat = new BABYLON.StandardMaterial('lineMat_' + idx, scene);
          const colors = [
            new BABYLON.Color3(0.13, 0.77, 0.37),
            new BABYLON.Color3(0.13, 0.77, 0.37),
            new BABYLON.Color3(0.24, 0.51, 0.96),
            new BABYLON.Color3(0.55, 0.36, 0.96),
            new BABYLON.Color3(0.96, 0.62, 0.06),
            new BABYLON.Color3(0.92, 0.29, 0.60),
            new BABYLON.Color3(0.94, 0.27, 0.27)
          ];
          lineMat.emissiveColor = colors[idx];
          line.material = lineMat;
        });

        scene.onPointerObservable.add((pointerInfo) => {
          if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERMOVE) {
            const hit = scene.pick(scene.pointerX, scene.pointerY);
            if (hit && hit.hit && hit.pickedMesh?.metadata?.locationId) {
              hit.pickedMesh.scaling = new BABYLON.Vector3(1.4, 1.4, 1.4);
            }
            markers.forEach(m => {
              if (!hit || !hit.hit || hit.pickedMesh !== m) {
                m.scaling = new BABYLON.Vector3(1, 1, 1);
              }
            });
          } else if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERDOWN) {
            const hit = scene.pick(scene.pointerX, scene.pointerY);
            if (hit?.hit?.metadata?.location) {
              const loc = hit.pickedMesh.metadata.location;
              onLocationSelect(loc);
              // Animate camera to this location
              animateCameraToLocation(loc.lat, loc.lng, 3.5, 1500);
            }
          }
        });

        engine.runRenderLoop(() => scene.render());

        resizeHandler = () => {
          const w = containerRef.current?.clientWidth || width;
          const h = containerRef.current?.clientHeight || height;
          canvasRef.current.width = w;
          canvasRef.current.height = h;
          engine.resize();
        };
        window.addEventListener('resize', resizeHandler);
      } catch (error) {
        console.error('Babylon.js Error:', error);
        setInitError(error?.message || String(error));
      }
    };

    initScene();

    return () => {
      if (resizeHandler) window.removeEventListener('resize', resizeHandler);
      if (engine) engine.dispose();
    };
  }, [onLocationSelect]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />

      {initError && (
        <div style={{ position: 'absolute', left: 12, top: 12, zIndex: 60, pointerEvents: 'auto' }}>
          <div className="bg-zinc-900/95 border border-zinc-800 rounded-md p-3 text-center max-w-md">
            <p className="text-red-400 font-semibold mb-1">Interactive globe failed to initialize</p>
            <p className="text-gray-300 text-sm">{initError}</p>
          </div>
        </div>
      )}
    </div>
  );
});
