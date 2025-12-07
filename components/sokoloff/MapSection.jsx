import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import GlobeLegend from './GlobeLegend';

// Dynamically import globe component to avoid SSR issues
const InteractiveGlobe = dynamic(() => import('./InteractiveGlobe'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-zinc-900/50">
      <p className="text-gray-400">Loading interactive globe...</p>
    </div>
  )
});

const locations = [
  {
    id: 1,
    name: "Petrodvorets (Peterhof), Russia",
    coords: [59.8861, 29.9051],
    lat: 59.8861,
    lng: 29.9051,
    period: "1891-1942",
    description: "Birthplace. Born into the family of a courtier in charge of Tsar's hunting. Lived in Znamenka, estate of Grand Duke Nicholas.",
    paintings: ["Early works", "Russian landscapes", "Troika paintings"],
    museums: ["State Historical Museum of Moscow", "State Tretyakov Gallery"],
    color: '#22c55e'
  },
  {
    id: 2,
    name: "St. Petersburg, Russia",
    coords: [59.9343, 30.3351],
    lat: 59.9343,
    lng: 30.3351,
    period: "1910s-1920s",
    description: "Attended Academy of Arts. Mentored by Dmitry Kardovsky, Boris Kustodiev, and Alexander Savinov. Visited Ilya Repin at Penaty estate.",
    paintings: ["Mother's Portrait (1928)", "Academic works"],
    museums: [],
    color: '#22c55e'
  },
  {
    id: 3,
    name: "Gatchina, Russia",
    coords: [59.5665, 30.1286],
    lat: 59.5665,
    lng: 30.1286,
    period: "1914-1915",
    description: "Military Aviation School. Rubbed shoulders with Russian flying elite - Sikorsky, the Seversky brothers, Sergeyevsky. Became flight instructor.",
    paintings: ["Military sketches for Alexander Kuprin"],
    museums: [],
    color: '#22c55e'
  },
  {
    id: 4,
    name: "Simferopol, Crimea",
    coords: [44.9521, 34.1024],
    lat: 44.9521,
    lng: 34.1024,
    period: "1937-1942",
    description: "After GULAG release. Elected to leadership in Crimean Artists' Union (founder). Commissioner of Fine Art in Crimea.",
    paintings: ["The Taking of the Perekop", "Petitioners Visiting Lenin", "Khaitarma", "The Leader"],
    museums: [],
    color: '#3b82f6'
  },
  {
    id: 5,
    name: "Khabarovsk, Russia",
    coords: [48.4802, 135.0719],
    lat: 48.4802,
    lng: 135.0719,
    period: "Permanent Collection",
    description: "Far East Museum holds permanent collection including study of 'Last Steps in the Homeland'.",
    paintings: ["Last Steps in the Homeland (study)", "Russian Motives", "The American Period"],
    museums: ["Khabarovsk Far East Museum"],
    color: '#3b82f6'
  },
  {
    id: 6,
    name: "Vaduz, Liechtenstein",
    coords: [47.1410, 9.5215],
    lat: 47.1410,
    lng: 9.5215,
    period: "1942-1948",
    description: "Escaped WWII to Switzerland, then Liechtenstein. Painted Princess of Liechtenstein, a friend of his father.",
    paintings: ["Portrait of Princess Von Liechtenstein", "Suvorov Captures the Turkish Fortress Ismail"],
    museums: ["Princess Von Liechtenstein Collection"],
    color: '#8b5cf6'
  },
  {
    id: 7,
    name: "Innsbruck, Austria",
    coords: [47.2692, 11.4041],
    lat: 47.2692,
    lng: 11.4041,
    period: "1947-1948",
    description: "Exhibited in Tyrol region. 'Last Steps in the Homeland' awarded First Prize.",
    paintings: ["Last Steps in the Homeland", "Wilhelm Tell", "At the Cross"],
    museums: [],
    color: '#f59e0b'
  },
  {
    id: 8,
    name: "Buenos Aires, Argentina",
    coords: [-34.6037, -58.3816],
    lat: -34.6037,
    lng: -58.3816,
    period: "1948-1962",
    description: "Gold Medal for 'San Martin Crosses the Andes'. Commissioned by National Congress. Painted for Gallery Rivadavia (4 paintings, 45x10 feet each).",
    paintings: ["Liberator General San Martin Crosses the Andes", "The Liberator Jose de San Martin", "Crossing of Rio Parana by General Belgrano"],
    museums: ["Instituto Nacional Sanmartiniano", "National Congress Hall", "Gallery Rivadavia"],
    color: '#ec4899'
  },
  {
    id: 9,
    name: "San Francisco, California",
    coords: [37.7749, -122.4194],
    lat: 37.7749,
    lng: -122.4194,
    period: "1962-1971",
    description: "Final years. Produced 19 monumental American history paintings. Sketch presented to President Gorbachev in 1990.",
    paintings: ["The Battle of Bunker Hill", "General Washington's Winter March", "Lexington", "Emissaries of Lord Cornwallis", "Russian Merchants at Fort Ross"],
    museums: ["Russian Cultural Museum", "Oakland Museum"],
    color: '#ef4444'
  },
  {
    id: 10,
    name: "Moscow, Russia",
    coords: [55.7558, 37.6173],
    lat: 55.7558,
    lng: 37.6173,
    period: "Museum Collection",
    description: "State Tretyakov Gallery received 'The Capture of Ismail by Fieldmarshal A. Suvorov' in 1987.",
    paintings: ["The Capture of Ismail by Fieldmarshal A. Suvorov"],
    museums: ["State Tretyakov Gallery", "State Historical Museum"],
    color: '#3b82f6'
  },
];

export default function MapSection() {
  const { t } = useLanguage();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showJourney, setShowJourney] = useState(true);
  const globeRef = useRef(null);

  const handleLocationCardClick = (loc) => {
    setSelectedLocation(loc);
    // Animate globe to this location
    if (globeRef.current?.animateCameraToLocation) {
      globeRef.current.animateCameraToLocation(loc.lat, loc.lng, 3.5, 1500);
    }
  };

  const handlePlayJourney = () => {
    if (globeRef.current?.playJourney) {
      globeRef.current.playJourney();
    }
  };

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

        {/* Interactive Globe Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900/50"
          style={{ height: '500px', minHeight: '500px' }}
        >
          <InteractiveGlobe
            ref={globeRef}
            onLocationSelect={setSelectedLocation}
            selectedLocation={selectedLocation}
          />
          
          {/* Overlay Legend and Controls */}
          <GlobeLegend
            showJourney={showJourney}
            onToggleJourney={() => setShowJourney(!showJourney)}
            selectedLocation={selectedLocation}
            onPlayJourney={handlePlayJourney}
          />
        </motion.div>

        {/* Location Details Panel */}
        <AnimatePresence>
          {selectedLocation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl p-8 backdrop-blur-sm"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">{selectedLocation.name}</h3>
                  <p className="text-red-500 font-medium">{selectedLocation.period}</p>
                </div>
                <button
                  onClick={() => setSelectedLocation(null)}
                  className="text-gray-500 hover:text-white transition-colors text-2xl p-2"
                >
                  ✕
                </button>
              </div>
              
              <p className="text-gray-400 mb-6 leading-relaxed text-base">{selectedLocation.description}</p>
              
              <div className="grid md:grid-cols-2 gap-8">
                {selectedLocation.paintings && selectedLocation.paintings.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                      {t('notableWorks')}
                    </h4>
                    <ul className="space-y-2">
                      {selectedLocation.paintings.map((painting, i) => (
                        <li key={i} className="text-gray-400 flex items-start gap-3">
                          <span className="w-1.5 h-1.5 bg-red-500/60 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{painting}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedLocation.museums && selectedLocation.museums.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                      {t('museumsCollections')}
                    </h4>
                    <ul className="space-y-2">
                      {selectedLocation.museums.map((museum, i) => (
                        <li key={i} className="text-gray-400 flex items-start gap-3">
                          <span className="w-1.5 h-1.5 bg-yellow-500/60 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{museum}</span>
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-8 md:mt-12"
        >
          {locations.map((loc) => (
            <motion.button
              key={loc.id}
              onClick={() => handleLocationCardClick(loc)}
              className={`relative p-4 rounded-lg border transition-all group overflow-hidden ${
                selectedLocation?.id === loc.id
                  ? 'bg-red-600/20 border-red-500 shadow-lg shadow-red-500/20'
                  : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/50'
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="absolute top-0 left-0 w-1 h-1 rounded-full flex-shrink-0 transition-transform"
                style={{ backgroundColor: loc.color }} />
              <div className="text-left">
                <p className="text-white text-sm font-medium truncate group-hover:text-red-400 transition-colors">
                  {loc.name.split(',')[0]}
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
