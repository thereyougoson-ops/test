'use client';

import React, { useEffect, useRef } from 'react';
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

export default function InteractiveGlobe({ onLocationSelect, selectedLocation }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    try {
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      if (width === 0 || height === 0) return;

      canvasRef.current.width = width;
      canvasRef.current.height = height;

      const engine = new BABYLON.Engine(canvasRef.current, true, { antialias: true });
      const scene = new BABYLON.Scene(engine);
      scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);

      engineRef.current = engine;

      // Camera
      const camera = new BABYLON.UniversalCamera('camera', new BABYLON.Vector3(0, 0, 2.8));
      camera.attachControl(canvasRef.current, true);

      // Lights
      new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene).intensity = 0.9;
      const pLight = new BABYLON.PointLight('pointLight', new BABYLON.Vector3(2, 3, 2), scene);
      pLight.intensity = 0.8;

      // Starfield
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
      starfield.material = starMat;

      // Earth
      const earth = BABYLON.MeshBuilder.CreateSphere('earth', { diameter: 2, segments: 128 }, scene);
      const earthMat = new BABYLON.StandardMaterial('earthMaterial', scene);
      
      const earthTex = new BABYLON.DynamicTexture('earthTexture', 2048, scene);
      const earthCtx = earthTex.getContext();
      
      const grad = earthCtx.createLinearGradient(0, 0, 2048, 1024);
      grad.addColorStop(0, '#0a1f2e');
      grad.addColorStop(0.5, '#1e5f7a');
      grad.addColorStop(1, '#0a1f2e');
      earthCtx.fillStyle = grad;
      earthCtx.fillRect(0, 0, 2048, 1024);
      
      earthCtx.fillStyle = '#2d5d3f';
      earthCtx.fillRect(200, 300, 280, 200);
      earthCtx.fillRect(350, 500, 150, 200);
      earthCtx.fillRect(900, 200, 200, 150);
      earthCtx.fillRect(950, 450, 250, 250);
      earthCtx.fillRect(1200, 250, 450, 300);
      earthCtx.fillRect(1700, 550, 150, 120);
      
      earthTex.update();
      earthMat.emissiveTexture = earthTex;
      earth.material = earthMat;

      // Auto-rotate
      scene.registerBeforeRender(() => {
        earth.rotation.y += 0.0005;
      });

      // Markers
      const markers = [];
      locations.forEach((loc, idx) => {
        const lat = (loc.lat * Math.PI) / 180;
        const lng = (loc.lng * Math.PI) / 180;
        const x = Math.cos(lat) * Math.cos(lng);
        const y = Math.sin(lat);
        const z = Math.cos(lat) * Math.sin(lng);

        const marker = BABYLON.MeshBuilder.CreateSphere('marker_' + idx, { diameter: 0.12, segments: 16 }, scene);
        marker.position = new BABYLON.Vector3(x * 1.08, y * 1.08, z * 1.08);

        const mat = new BABYLON.StandardMaterial('markerMat_' + idx, scene);
        mat.emissiveColor = loc.color;
        marker.material = mat;

        marker.metadata = { locationId: loc.id, location: loc };
        markers.push(marker);

        new BABYLON.GlowLayer('glow_' + idx, scene).addIncludedOnlyMesh(marker);
      });

      // Journey lines
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

      // Interactions
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
            onLocationSelect(hit.pickedMesh.metadata.location);
          }
        }
      });

      // Render
      engine.runRenderLoop(() => scene.render());

      // Resize
      const handleResize = () => {
        const w = containerRef.current?.clientWidth || width;
        const h = containerRef.current?.clientHeight || height;
        canvasRef.current.width = w;
        canvasRef.current.height = h;
        engine.resize();
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        engine.dispose();
      };
    } catch (error) {
      console.error('Babylon.js Error:', error);
    }
  }, [onLocationSelect]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
}