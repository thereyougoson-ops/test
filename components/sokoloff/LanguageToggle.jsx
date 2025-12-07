import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.button
      onClick={toggleLanguage}
      className="fixed top-4 left-4 md:top-6 md:left-6 z-50 flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 bg-black/80 backdrop-blur-sm border border-zinc-700 rounded-full hover:border-red-500 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
    >
      <span className={`text-xs md:text-sm font-medium transition-colors ${language === 'en' ? 'text-white' : 'text-gray-500'}`}>
        EN
      </span>
      <div className="w-8 md:w-10 h-4 md:h-5 bg-zinc-800 rounded-full relative">
        <motion.div
          className="absolute top-0.5 w-3 md:w-4 h-3 md:h-4 bg-red-500 rounded-full"
          animate={{ left: language === 'en' ? '2px' : window.innerWidth >= 768 ? '22px' : '18px' }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </div>
      <span className={`text-xs md:text-sm font-medium transition-colors ${language === 'ru' ? 'text-white' : 'text-gray-500'}`}>
        RU
      </span>
    </motion.button>
  );
}
