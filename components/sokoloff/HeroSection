import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Play } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export default function HeroSection({ onScrollToTimeline }) {
  const { t, language } = useLanguage();
  const [yearCount, setYearCount] = useState(1891);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setYearCount(prev => {
        if (prev >= 1971) {
          clearInterval(interval);
          return 1971;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated Grid Lines */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute h-full w-px bg-gradient-to-b from-transparent via-white to-transparent"
            style={{ left: `${(i + 1) * 5}%` }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 0.3, scaleY: 1 }}
            transition={{ delay: i * 0.05, duration: 1 }}
          />
        ))}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-white to-transparent"
            style={{ top: `${(i + 1) * 10}%` }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 0.3, scaleX: 1 }}
            transition={{ delay: i * 0.08, duration: 1 }}
          />
        ))}
      </div>

      {/* Glowing Orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,0,0,0.15) 0%, transparent 70%)',
          top: '10%',
          right: '10%',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-64 h-64 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          bottom: '20%',
          left: '5%',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />

      {/* Main Content */}
      <motion.div 
        className="relative z-10 text-center px-4"
        style={{ y: titleY, opacity: titleOpacity, scale }}
      >
        {/* Corner Accents */}
        <motion.div
          className="absolute -top-20 -left-20 w-40 h-40 border-l-2 border-t-2 border-red-600"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-40 h-40 border-r-2 border-b-2 border-red-600"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        />

        <motion.p
          className="text-gray-500 tracking-[0.5em] uppercase text-xs md:text-sm mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {t('heroSubtitle')}
        </motion.p>

        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight text-white mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {language === 'ru' ? 'АНАТОЛИЙ' : 'ANATOLY'}
          <br />
          <span className="font-bold">{language === 'ru' ? 'СОКОЛОВ' : 'SOKOLOFF'}</span>
        </motion.h1>

        {/* Animated Year Counter */}
        <motion.div
          className="flex items-center justify-center gap-4 md:gap-8 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="text-center">
            <motion.span
              className="text-5xl md:text-7xl lg:text-8xl font-thin text-white"
              key={yearCount}
            >
              {yearCount === 1971 ? '1891' : yearCount}
            </motion.span>
            <p className="text-gray-500 text-xs uppercase tracking-widest mt-2">{language === 'ru' ? 'Родился' : 'Born'}</p>
          </div>
          
          <motion.div
            className="h-px w-16 md:w-32 bg-red-600"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          />
          
          <div className="text-center">
            <motion.span
              className="text-5xl md:text-7xl lg:text-8xl font-thin text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: yearCount >= 1971 ? 1 : 0.3 }}
            >
              1971
            </motion.span>
            <p className="text-gray-500 text-xs uppercase tracking-widest mt-2">{language === 'ru' ? 'Умер' : 'Passed'}</p>
          </div>
        </motion.div>

        <motion.p
          className="text-gray-400 max-w-xl mx-auto mt-12 text-sm md:text-base leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          {t('heroDescription')}
        </motion.p>

        {/* Scroll Indicator */}
        <motion.button
          onClick={onScrollToTimeline}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <span className="text-gray-500 text-xs uppercase tracking-widest group-hover:text-red-500 transition-colors">
            {t('exploreTimeline')}
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-red-500" />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* 3D Floating Elements responding to mouse */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-20 h-20 border border-red-500/20 rounded-lg pointer-events-none"
        style={{
          x: mousePos.x * 40 - 20,
          y: mousePos.y * 40 - 20,
          rotateX: mousePos.y * 20 - 10,
          rotateY: mousePos.x * 20 - 10,
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-16 h-16 border border-white/10 rounded-full pointer-events-none"
        style={{
          x: mousePos.x * -30 + 15,
          y: mousePos.y * -30 + 15,
        }}
      />
    </section>
  );
}
