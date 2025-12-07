import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useLanguage } from './LanguageContext';

export default function AboutSection() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true });
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.92, 1, 1, 0.92]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -8]);
  
  const springScale = useSpring(scale, { stiffness: 80, damping: 25 });
  const springRotate = useSpring(rotateX, { stiffness: 80, damping: 25 });

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
    <section 
      ref={sectionRef}
      id="about"
      className="relative bg-zinc-950 py-16 md:py-24 lg:py-32 overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* Animated 3D Background Elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 border border-red-500/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          style={{
            x: mousePos.x * 20 - 10,
            y: mousePos.y * 20 - 10,
          }}
        />
        <motion.div 
          className="absolute top-40 right-20 w-24 h-24 border-2 border-zinc-700/30"
          animate={{ rotate: [0, 90, 180, 270, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{
            x: mousePos.x * -30 + 15,
            y: mousePos.y * -30 + 15,
          }}
        />
        <motion.div 
          className="absolute bottom-40 left-1/4 w-20 h-20 bg-red-500/10 rounded-full blur-xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/4 w-48 h-48 bg-zinc-800/30 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        {/* New 3D cube element */}
        <motion.div
          className="absolute bottom-1/4 right-10 w-16 h-16"
          style={{
            transformStyle: 'preserve-3d',
            rotateX: mousePos.y * 30,
            rotateY: mousePos.x * 30,
          }}
        >
          <div className="absolute inset-0 border border-white/10" style={{ transform: 'translateZ(8px)' }} />
          <div className="absolute inset-0 border border-red-500/10" style={{ transform: 'translateZ(-8px)' }} />
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      
      <motion.div 
        className="max-w-6xl mx-auto px-4 md:px-8"
        style={{ 
          opacity, 
          scale: springScale,
          rotateX: springRotate,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Section Header */}
        <motion.div
          ref={titleRef}
          className="text-center mb-10 md:mb-16"
        >
          <motion.p 
            className="text-red-500 text-xs md:text-sm tracking-widest uppercase mb-3 md:mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {t('aboutLabel')}
          </motion.p>
          <motion.h2 
            className="text-3xl md:text-5xl lg:text-6xl font-light text-white mb-4 md:mb-6 overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {t('aboutName')} <span className="font-bold">{t('aboutNameBold')}</span>
          </motion.h2>
          <motion.p 
            className="text-gray-500 text-sm md:text-lg"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t('aboutBirth')}
          </motion.p>
          <motion.div 
            className="w-16 md:w-24 h-0.5 bg-red-500 mx-auto mt-4 md:mt-6"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.div>

        {/* Main Content */}
        <div className="space-y-6 md:space-y-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-300 text-base md:text-lg leading-relaxed"
          >
            <span className="text-4xl md:text-5xl font-bold text-red-500 float-left mr-3 md:mr-4 leading-none">А</span>
            {t('aboutIntro')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="grid md:grid-cols-2 gap-6 md:gap-8"
          >
            <div className="space-y-4 md:space-y-6">
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">{t('aboutPara1')}</p>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">{t('aboutPara2')}</p>
            </div>
            <div className="space-y-4 md:space-y-6">
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">{t('aboutPara3')}</p>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">{t('aboutPara4')}</p>
            </div>
          </motion.div>

          {/* Life Events Grid with Enhanced Visual Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12"
          >
            <motion.div 
              className="relative bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-lg p-4 md:p-6 overflow-hidden group hover:border-red-500/50 transition-all"
              whileHover={{ y: -5 }}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/5 rounded-full blur-2xl group-hover:bg-red-500/10 transition-colors" />
              <div className="relative">
                <div className="w-8 h-0.5 bg-red-500 mb-3" />
                <h3 className="text-red-500 text-base md:text-lg font-medium mb-2 md:mb-3">{t('marriageFamily')}</h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{t('marriageFamilyText')}</p>
              </div>
            </motion.div>
            <motion.div 
              className="relative bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-lg p-4 md:p-6 overflow-hidden group hover:border-red-500/50 transition-all"
              whileHover={{ y: -5 }}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/5 rounded-full blur-2xl group-hover:bg-red-500/10 transition-colors" />
              <div className="relative">
                <div className="w-8 h-0.5 bg-red-500 mb-3" />
                <h3 className="text-red-500 text-base md:text-lg font-medium mb-2 md:mb-3">{t('yearsOfHardship')}</h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{t('yearsOfHardshipText')}</p>
              </div>
            </motion.div>
            <motion.div 
              className="relative bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-lg p-4 md:p-6 overflow-hidden group hover:border-red-500/50 transition-all sm:col-span-2 md:col-span-1"
              whileHover={{ y: -5 }}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/5 rounded-full blur-2xl group-hover:bg-red-500/10 transition-colors" />
              <div className="relative">
                <div className="w-8 h-0.5 bg-red-500 mb-3" />
                <h3 className="text-red-500 text-base md:text-lg font-medium mb-2 md:mb-3">{t('artisticLeadership')}</h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{t('artisticLeadershipText')}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Europe & Americas with Timeline Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 md:mt-12 space-y-6"
          >
            <div className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-red-500 before:via-red-500/50 before:to-transparent">
              <div className="absolute left-0 top-2 w-2 h-2 bg-red-500 rounded-full ring-4 ring-red-500/20" />
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-1">{t('aboutEurope')}</p>
            </div>
            <div className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-red-500/50 before:via-red-500/30 before:to-transparent">
              <div className="absolute left-0 top-2 w-2 h-2 bg-red-500 rounded-full ring-4 ring-red-500/20" />
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-1">{t('aboutArgentina')}</p>
            </div>
            <div className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-red-500/30 before:to-transparent">
              <div className="absolute left-0 top-2 w-2 h-2 bg-red-500 rounded-full ring-4 ring-red-500/20" />
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">{t('aboutUSA')}</p>
            </div>
          </motion.div>

          {/* Quote with Enhanced Styling */}
          <motion.blockquote
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative border-l-4 border-red-500 pl-6 md:pl-8 py-6 md:py-8 my-8 md:my-12 bg-gradient-to-r from-red-500/5 to-transparent rounded-r-lg"
          >
            <div className="absolute -left-3 top-4 w-6 h-6 bg-red-500 rounded-full opacity-20" />
            <div className="absolute -left-2 top-5 w-4 h-4 bg-red-500 rounded-full" />
            <svg className="absolute top-6 left-6 w-8 h-8 text-red-500/20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
            <p className="text-base md:text-xl lg:text-2xl text-white italic font-light leading-relaxed relative z-10">
              {t('aboutQuote')}
            </p>
          </motion.blockquote>
        </div>
      </motion.div>
    </section>
  );
}
