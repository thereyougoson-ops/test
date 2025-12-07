import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, Home, User, Clock, Image, Map, BookOpen, Award, ChevronUp } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const sectionIds = [
  { id: 'hero', labelKey: 'hero', icon: Home },
  { id: 'about', labelKey: 'about', icon: User },
  { id: 'chronology', labelKey: 'chronology', icon: Clock },
  { id: 'timeline', labelKey: 'timeline', icon: Award },
  { id: 'gallery', labelKey: 'gallery', icon: Image },
  { id: 'map', labelKey: 'journey', icon: Map },
  { id: 'biography', labelKey: 'biography', icon: BookOpen },
];

export default function SectionNavigation() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showMobileDots, setShowMobileDots] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setShowBackToTop(scrollTop > 500);
      setShowMobileDots(scrollTop > 300);

      // Detect active section
      sectionIds.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 20; // Small offset from top
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-zinc-900 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-red-600 via-red-500 to-orange-500 origin-left"
          style={{ scaleX }}
        />
      </div>

      {/* Floating Menu Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 md:top-6 md:right-6 z-50 w-10 h-10 md:w-12 md:h-12 bg-zinc-900/90 backdrop-blur-sm border border-zinc-700 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X className="w-4 h-4 md:w-5 md:h-5" /> : <Menu className="w-4 h-4 md:w-5 md:h-5" />}
      </motion.button>

      {/* Side Dots Navigation (Desktop) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
        {sectionIds.map((section) => (
          <motion.button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`group relative w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === section.id
                ? 'bg-red-500 scale-125'
                : 'bg-zinc-600 hover:bg-zinc-400'
            }`}
            whileHover={{ scale: 1.5 }}
          >
            <span className="absolute right-6 top-1/2 -translate-y-1/2 whitespace-nowrap bg-zinc-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {t(section.labelKey)}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Mobile Side Dots Navigation */}
      <AnimatePresence>
        {showMobileDots && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed right-2 top-1/2 -translate-y-1/2 z-40 flex md:hidden flex-col gap-2"
          >
            {sectionIds.map((section) => (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-red-500 scale-150'
                    : 'bg-zinc-600'
                }`}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md flex items-center justify-center"
            onClick={() => setIsOpen(false)}
          >
            <motion.nav
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 p-4 md:p-8 max-w-lg md:max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {sectionIds.map((section, index) => {
                const Icon = section.icon;
                return (
                  <motion.button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex flex-col items-center gap-2 md:gap-3 p-4 md:p-6 rounded-xl border transition-all ${
                      activeSection === section.id
                        ? 'bg-red-600/20 border-red-500 text-red-500'
                        : 'bg-zinc-900/50 border-zinc-800 text-gray-400 hover:border-zinc-600 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-6 h-6 md:w-8 md:h-8" />
                    <span className="text-xs md:text-sm font-medium">{t(section.labelKey)}</span>
                  </motion.button>
                );
              })}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 w-10 h-10 md:w-12 md:h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-red-600/30 hover:bg-red-500 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
        )}
      </AnimatePresence>


    </>
  );
}
