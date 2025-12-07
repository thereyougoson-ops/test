import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Palette, Award, Globe } from 'lucide-react';
import { useLanguage } from './LanguageContext';



export default function BiographySection() {
  const { t } = useLanguage();
  
  const milestones = [
    {
      year: "1891",
      title: t('birthPetrodvorets'),
      description: t('birthDescription'),
      icon: MapPin
    },
    {
      year: "1920s",
      title: t('russiaPeriod'),
      description: t('russiaPeriodDescription'),
      icon: Palette
    },
    {
      year: "1940s",
      title: t('europeanExile'),
      description: t('europeanExileDescription'),
      icon: Award
    },
    {
      year: "1950s",
      title: t('argentinaAmericas'),
      description: t('argentinaAmericasDescription'),
      icon: Globe
    }
  ];
  
  return (
    <section className="relative bg-black py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-red-500 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-white blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16 lg:mb-24"
        >
          <p className="text-red-500 text-xs md:text-sm tracking-widest uppercase mb-3 md:mb-4">{t('biographySectionLabel')}</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-white mb-4 md:mb-6">
            {t('lifeIn')} <span className="font-bold">{t('artBold')}</span>
          </h2>
          <div className="w-16 md:w-24 h-0.5 bg-red-500 mx-auto" />
        </motion.div>

        {/* Main Bio Content */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 md:space-y-6"
          >
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              <span className="text-4xl md:text-5xl font-bold text-red-500 float-left mr-3 md:mr-4 leading-none">A</span>
              {t('bioParagraph1')}
            </p>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              {t('bioParagraph2')}
            </p>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              {t('bioParagraph3')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
              <img
                src="https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/RUC-17-PERSUASION.jpg?fit=1024%2C809&ssl=1"
                alt="Persuasion by Anatoly Sokoloff"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              
              {/* Decorative Frame */}
              <div className="absolute inset-4 border border-white/20 rounded pointer-events-none" />
              <div className="absolute top-0 left-8 w-px h-16 bg-red-500" />
              <div className="absolute bottom-0 right-8 w-px h-16 bg-red-500" />
            </div>

            {/* Floating Stats */}
            <motion.div
              className="absolute -bottom-6 -left-6 bg-zinc-900 p-6 rounded-lg border border-zinc-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-4xl font-bold text-red-500">300+</p>
              <p className="text-gray-500 text-sm">{t('troikaPaintings')}</p>
            </motion.div>

            <motion.div
              className="absolute -top-6 -right-6 bg-zinc-900 p-6 rounded-lg border border-zinc-800"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-4xl font-bold text-white">6</p>
              <p className="text-gray-500 text-sm">{t('continentsCollected')}</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Milestones */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 md:p-6 h-full hover:border-red-500/50 transition-colors">
                <milestone.icon className="w-6 h-6 md:w-8 md:h-8 text-red-500 mb-2 md:mb-4" />
                <p className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">{milestone.year}</p>
                <h3 className="text-sm md:text-lg font-medium text-white mb-1 md:mb-2">{milestone.title}</h3>
                <p className="text-gray-500 text-xs md:text-sm">{milestone.description}</p>
                
                {/* Hover Effect */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-red-500 rounded-b-lg"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
