import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';

const journeyPhases = [
  {
    phase: 1,
    label: "Early Russia",
    color: "#22c55e",
    description: "Birth and education in Russia",
    locations: ["Petrodvorets", "St. Petersburg", "Gatchina"],
    years: "1891-1915"
  },
  {
    phase: 2,
    label: "Soviet Period",
    color: "#3b82f6",
    description: "Later Soviet era and GULAG",
    locations: ["Khabarovsk", "Simferopol"],
    years: "1914-1942"
  },
  {
    phase: 3,
    label: "European Escape",
    color: "#8b5cf6",
    description: "WWII escape to Western Europe",
    locations: ["Vaduz, Liechtenstein"],
    years: "1942-1948"
  },
  {
    phase: 4,
    label: "European Exhibition",
    color: "#f59e0b",
    description: "Art exhibitions in Central Europe",
    locations: ["Innsbruck, Austria"],
    years: "1947-1948"
  },
  {
    phase: 5,
    label: "South America",
    color: "#ec4899",
    description: "Major commissions in Argentina",
    locations: ["Buenos Aires"],
    years: "1948-1962"
  },
  {
    phase: 6,
    label: "Final Years",
    color: "#ef4444",
    description: "San Francisco and legacy",
    locations: ["San Francisco"],
    years: "1962-1971"
  }
];

export default function GlobeLegend({ showJourney, onToggleJourney, selectedLocation, onPlayJourney }) {
  const { t } = useLanguage();
  const [expandedPhase, setExpandedPhase] = React.useState(null);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Top Right: Toggle Controls */}
      <div className="absolute top-4 right-4 pointer-events-auto z-50 space-y-3">
        <motion.button
          onClick={onPlayJourney}
          className="px-4 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-sm bg-blue-600/90 text-white border border-blue-500 hover:bg-blue-700/90"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ▶ Play Journey
        </motion.button>

        <motion.button
          onClick={onToggleJourney}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-sm ${
            showJourney
              ? 'bg-red-600/90 text-white border border-red-500'
              : 'bg-zinc-900/90 text-gray-400 border border-zinc-700'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showJourney ? '✓ Journey Path' : 'Journey Path'}
        </motion.button>

        {/* Info Panel */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-950/95 backdrop-blur-sm rounded-lg p-3 border border-zinc-800 max-w-xs text-xs"
        >
          <p className="text-gray-300 font-medium mb-2">✨ Interactive Globe</p>
          <p className="text-gray-400 text-[11px] leading-relaxed">
            Click on points or location cards to explore. Press "Play Journey" to see the artist's voyage.
          </p>
        </motion.div>
      </div>

      {/* Left Side: Journey Timeline Legend */}
      <div className="absolute bottom-4 left-4 pointer-events-auto max-h-96 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-2"
        >
          {journeyPhases.map((phase, idx) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group"
            >
              <button
                onClick={() => setExpandedPhase(expandedPhase === phase.phase ? null : phase.phase)}
                className={`w-full text-left px-3 py-2 rounded-lg border transition-all backdrop-blur-sm ${
                  expandedPhase === phase.phase
                    ? 'bg-zinc-800/90 border-zinc-600'
                    : 'bg-zinc-950/90 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0 transition-transform"
                    style={{ backgroundColor: phase.color }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-white truncate">{phase.label}</p>
                    <p className="text-[10px] text-gray-500">{phase.years}</p>
                  </div>
                  <span className="text-[10px] text-gray-600 flex-shrink-0">
                    {expandedPhase === phase.phase ? '−' : '+'}
                  </span>
                </div>
              </button>

              {/* Expanded Details */}
              {expandedPhase === phase.phase && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-zinc-900/80 backdrop-blur-sm rounded-b-lg border-x border-b border-zinc-800 p-3 mt-1 text-[10px] text-gray-400 space-y-2"
                >
                  <p className="text-gray-300 font-medium">{phase.description}</p>
                  <div>
                    <p className="text-gray-500 text-[9px] mb-1 uppercase tracking-wide">Locations:</p>
                    <ul className="space-y-1">
                      {phase.locations.map((loc, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="w-1 h-1 bg-gray-600 rounded-full mt-1 flex-shrink-0" />
                          <span className="text-gray-400">{loc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Right: Selected Location Info */}
      {selectedLocation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-4 right-4 bg-zinc-950/95 backdrop-blur-sm rounded-lg p-4 border border-zinc-800 max-w-sm pointer-events-auto"
        >
          <div className="space-y-2">
            <div>
              <h3 className="text-white font-semibold text-sm">{selectedLocation.name}</h3>
              <p className="text-red-500 text-xs">{selectedLocation.period}</p>
            </div>
            
            <p className="text-gray-400 text-xs leading-relaxed">
              {selectedLocation.description}
            </p>

            {selectedLocation.paintings && selectedLocation.paintings.length > 0 && (
              <div>
                <p className="text-gray-300 text-xs font-medium mb-1">Notable Works:</p>
                <ul className="space-y-1">
                  {selectedLocation.paintings.slice(0, 3).map((work, i) => (
                    <li key={i} className="text-gray-400 text-xs flex items-start gap-1.5">
                      <span className="w-1 h-1 bg-red-500 rounded-full mt-1 flex-shrink-0" />
                      <span>{work}</span>
                    </li>
                  ))}
                  {selectedLocation.paintings.length > 3 && (
                    <li className="text-gray-500 text-xs italic">
                      +{selectedLocation.paintings.length - 3} more works
                    </li>
                  )}
                </ul>
              </div>
            )}

            {selectedLocation.museums && selectedLocation.museums.length > 0 && (
              <div>
                <p className="text-gray-300 text-xs font-medium mb-1">Museums:</p>
                <ul className="space-y-1">
                  {selectedLocation.museums.slice(0, 2).map((museum, i) => (
                    <li key={i} className="text-gray-400 text-xs flex items-start gap-1.5">
                      <span className="w-1 h-1 bg-yellow-500 rounded-full mt-1 flex-shrink-0" />
                      <span>{museum}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
