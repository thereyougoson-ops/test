import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';

export default function FooterSection() {
  const { t } = useLanguage();
  
  return (
    <footer className="relative bg-black py-12 md:py-16 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          {/* Logo/Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h3 className="text-xl md:text-2xl font-light text-white">
              ANATOLY <span className="font-bold">SOKOLOFF</span>
            </h3>
            <p className="text-gray-500 text-xs md:text-sm mt-1">1891 — 1971</p>
          </motion.div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <p className="text-gray-400 text-xs md:text-sm mb-2">{t('contact')}</p>
            <a href="tel:+14152095825" className="text-white text-sm md:text-base hover:text-red-500 transition-colors">
              (415) 209-5825
            </a>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center md:text-right"
          >
            <p className="text-gray-600 text-xs md:text-sm">
              © {new Date().getFullYear()} Sokoloff Estate
            </p>
            <div className="flex items-center gap-3 md:gap-4 mt-2 justify-center md:justify-end">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-red-500" />
              <span className="text-gray-600 text-[10px] md:text-xs">{t('archiveCollection')}</span>
            </div>
          </motion.div>
        </div>

        {/* Decorative Line */}
        <motion.div
          className="mt-12 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-zinc-800" />
          <div className="w-2 h-2 rotate-45 border border-red-500" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-zinc-800" />
        </motion.div>
      </div>
    </footer>
  );
}
