import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useLanguage } from './LanguageContext';

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom red marker
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const locations = [
  {
    id: 1,
    name: "Petrodvorets (Peterhof), Russia",
    coords: [59.8861, 29.9051],
    period: "1891-1942",
    description: "Birthplace. Born into the family of a courtier in charge of Tsar's hunting. Lived in Znamenka, estate of Grand Duke Nicholas.",
    paintings: ["Early works", "Russian landscapes", "Troika paintings"],
    museums: ["State Historical Museum of Moscow", "State Tretyakov Gallery"]
  },
  {
    id: 2,
    name: "St. Petersburg, Russia",
    coords: [59.9343, 30.3351],
    period: "1910s-1920s",
    description: "Attended Academy of Arts. Mentored by Dmitry Kardovsky, Boris Kustodiev, and Alexander Savinov. Visited Ilya Repin at Penaty estate.",
    paintings: ["Mother's Portrait (1928)", "Academic works"],
    museums: []
  },
  {
    id: 3,
    name: "Gatchina, Russia",
    coords: [59.5665, 30.1286],
    period: "1914-1915",
    description: "Military Aviation School. Rubbed shoulders with Russian flying elite - Sikorsky, the Seversky brothers, Sergeyevsky. Became flight instructor.",
    paintings: ["Military sketches for Alexander Kuprin"],
    museums: []
  },
  {
    id: 4,
    name: "Simferopol, Crimea",
    coords: [44.9521, 34.1024],
    period: "1937-1942",
    description: "After GULAG release. Elected to leadership in Crimean Artists' Union (founder). Commissioner of Fine Art in Crimea.",
    paintings: ["The Taking of the Perekop", "Petitioners Visiting Lenin", "Khaitarma", "The Leader"],
    museums: []
  },
  {
    id: 5,
    name: "Khabarovsk, Russia",
    coords: [48.4802, 135.0719],
    period: "Permanent Collection",
    description: "Far East Museum holds permanent collection including study of 'Last Steps in the Homeland'.",
    paintings: ["Last Steps in the Homeland (study)", "Russian Motives", "The American Period"],
    museums: ["Khabarovsk Far East Museum"]
  },
  {
    id: 6,
    name: "Vaduz, Liechtenstein",
    coords: [47.1410, 9.5215],
    period: "1942-1948",
    description: "Escaped WWII to Switzerland, then Liechtenstein. Painted Princess of Liechtenstein, a friend of his father.",
    paintings: ["Portrait of Princess Von Liechtenstein", "Suvorov Captures the Turkish Fortress Ismail"],
    museums: ["Princess Von Liechtenstein Collection"]
  },
  {
    id: 7,
    name: "Innsbruck, Austria",
    coords: [47.2692, 11.4041],
    period: "1947-1948",
    description: "Exhibited in Tyrol region. 'Last Steps in the Homeland' awarded First Prize.",
    paintings: ["Last Steps in the Homeland", "Wilhelm Tell", "At the Cross"],
    museums: []
  },
  {
    id: 8,
    name: "Buenos Aires, Argentina",
    coords: [-34.6037, -58.3816],
    period: "1948-1962",
    description: "Gold Medal for 'San Martin Crosses the Andes'. Commissioned by National Congress. Painted for Gallery Rivadavia (4 paintings, 45x10 feet each).",
    paintings: ["Liberator General San Martin Crosses the Andes", "The Liberator Jose de San Martin", "Crossing of Rio Parana by General Belgrano"],
    museums: ["Instituto Nacional Sanmartiniano", "National Congress Hall", "Gallery Rivadavia"]
  },
  {
    id: 9,
    name: "San Francisco, California",
    coords: [37.7749, -122.4194],
    period: "1962-1971",
    description: "Final years. Produced 19 monumental American history paintings. Sketch presented to President Gorbachev in 1990.",
    paintings: ["The Battle of Bunker Hill", "General Washington's Winter March", "Lexington", "Emissaries of Lord Cornwallis", "Russian Merchants at Fort Ross"],
    museums: ["Russian Cultural Museum", "Oakland Museum"]
  },
  {
    id: 10,
    name: "Moscow, Russia",
    coords: [55.7558, 37.6173],
    period: "Museum Collection",
    description: "State Tretyakov Gallery received 'The Capture of Ismail by Fieldmarshal A. Suvorov' in 1987.",
    paintings: ["The Capture of Ismail by Fieldmarshal A. Suvorov"],
    museums: ["State Tretyakov Gallery", "State Historical Museum"]
  },
];

// Journey path connecting locations in chronological order with gradient colors
const journeySegments = [
  { from: [59.8861, 29.9051], to: [59.9343, 30.3351], color: '#22c55e', label: 'Russia Early' }, // Peterhof to St. Petersburg (green - start)
  { from: [59.9343, 30.3351], to: [59.5665, 30.1286], color: '#22c55e', label: 'Russia' }, // St. Petersburg to Gatchina
  { from: [59.5665, 30.1286], to: [44.9521, 34.1024], color: '#3b82f6', label: 'Russia Late' }, // Gatchina to Simferopol (blue)
  { from: [44.9521, 34.1024], to: [47.1410, 9.5215], color: '#8b5cf6', label: 'Escape West' }, // Simferopol to Liechtenstein (purple)
  { from: [47.1410, 9.5215], to: [47.2692, 11.4041], color: '#f59e0b', label: 'Europe' }, // Liechtenstein to Innsbruck (amber)
  { from: [47.2692, 11.4041], to: [-34.6037, -58.3816], color: '#ec4899', label: 'To Americas' }, // Innsbruck to Buenos Aires (pink)
  { from: [-34.6037, -58.3816], to: [37.7749, -122.4194], color: '#ef4444', label: 'Final Journey' }, // Buenos Aires to San Francisco (red - end)
];

export default function MapSection() {
  const { t } = useLanguage();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showJourney, setShowJourney] = useState(true);

  return (
    <section className="relative bg-zinc-950 py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8 md:mb-12"
            >
              <p className="text-red-500 text-xs md:text-sm tracking-widest uppercase mb-3 md:mb-4">{t('journeyLabel')}</p>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-white mb-3 md:mb-4">
                {t('lifeAcross')} <span className="font-bold">{t('continentsBold')}</span>
              </h2>
              <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto px-4">
                {t('journeyDescription')}
              </p>
              <div className="w-16 md:w-24 h-0.5 bg-red-500 mx-auto mt-4 md:mt-6" />
            </motion.div>

        {/* Controls */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setShowJourney(!showJourney)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              showJourney
                ? 'bg-red-600 text-white'
                : 'bg-zinc-900 text-gray-400 border border-zinc-800'
            }`}
          >
            {showJourney ? t('hideJourneyPath') : t('showJourneyPath')}
          </button>
        </div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-xl overflow-hidden border border-zinc-800"
          style={{ height: '400px' }}
        >
          <MapContainer
            center={[30, 0]}
            zoom={2}
            style={{ height: '100%', width: '100%' }}
            className="z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            
            {/* Journey Path with Color Gradient */}
            {showJourney && journeySegments.map((segment, index) => (
              <Polyline
                key={index}
                positions={[segment.from, segment.to]}
                color={segment.color}
                weight={3}
                opacity={0.8}
              />
            ))}

            {/* Location Markers */}
            {locations.map((location) => (
              <Marker
                key={location.id}
                position={location.coords}
                icon={redIcon}
                eventHandlers={{
                  click: () => setSelectedLocation(location),
                }}
              >
                <Popup className="custom-popup">
                  <div className="text-black">
                    <h3 className="font-bold text-lg">{location.name}</h3>
                    <p className="text-sm text-gray-600">{location.period}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Compact Legend */}
          <div className="absolute bottom-2 left-2 bg-black/90 backdrop-blur-sm rounded-lg p-2 z-[1000] max-w-[140px]">
            <div className="flex items-center gap-1.5 text-[10px] text-gray-400 mb-1">
              <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />
              <span className="truncate">{t('locationWithPaintings')}</span>
            </div>
            {showJourney && (
              <div className="flex flex-wrap gap-x-2 gap-y-0.5 pt-1 border-t border-zinc-700/50">
                <div className="flex items-center gap-1 text-[9px]">
                  <div className="w-2 h-0.5 bg-green-500 rounded" />
                  <span className="text-green-400">Start</span>
                </div>
                <div className="flex items-center gap-1 text-[9px]">
                  <div className="w-2 h-0.5 bg-red-500 rounded" />
                  <span className="text-red-400">End</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Location Details Panel */}
        <AnimatePresence>
          {selectedLocation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-6 bg-zinc-900 border border-zinc-800 rounded-xl p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedLocation.name}</h3>
                  <p className="text-red-500">{selectedLocation.period}</p>
                </div>
                <button
                  onClick={() => setSelectedLocation(null)}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <p className="text-gray-400 mb-4">{selectedLocation.description}</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                {selectedLocation.paintings.length > 0 && (
                  <div>
                    <h4 className="text-white font-medium mb-2">{t('notableWorks')}</h4>
                    <ul className="space-y-1">
                      {selectedLocation.paintings.map((painting, i) => (
                        <li key={i} className="text-gray-400 text-sm flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                          {painting}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedLocation.museums.length > 0 && (
                  <div>
                    <h4 className="text-white font-medium mb-2">{t('museumsCollections')}</h4>
                    <ul className="space-y-1">
                      {selectedLocation.museums.map((museum, i) => (
                        <li key={i} className="text-gray-400 text-sm flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                          {museum}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Location Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-3 mt-6 md:mt-8">
          {locations.slice(0, 10).map((loc) => (
            <motion.button
              key={loc.id}
              onClick={() => setSelectedLocation(loc)}
              className={`p-3 rounded-lg border text-left transition-all ${
                selectedLocation?.id === loc.id
                  ? 'bg-red-600/20 border-red-500'
                  : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <p className="text-white text-sm font-medium truncate">{loc.name.split(',')[0]}</p>
              <p className="text-gray-500 text-xs">{loc.period}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
