import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Building2, DollarSign } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export default function ArtworkCard({ artwork, index }) {
  const { language, t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const title = language === 'ru' && artwork.titleRu ? artwork.titleRu : artwork.title;
  const description = language === 'ru' && artwork.descriptionRu ? artwork.descriptionRu : artwork.description;
  const auctionHouse = language === 'ru' && artwork.auctionHouseRu ? artwork.auctionHouseRu : artwork.auctionHouse;
  const price = language === 'ru' && artwork.priceRu ? artwork.priceRu : artwork.price;

  return (
    <motion.div
      className="relative flex-shrink-0 w-[80vw] md:w-[450px] lg:w-[550px] h-[60vh] md:h-[70vh] lg:h-[75vh] mx-3 md:mx-6 lg:mx-8"
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Year Badge */}
      <motion.div
        className="absolute -top-4 md:-top-6 left-0 z-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 + 0.3 }}
      >
        <span className="text-5xl md:text-7xl lg:text-9xl font-bold text-white/5">{artwork.year}</span>
      </motion.div>

      {/* Card Container */}
      <div className="relative h-full bg-zinc-950 rounded-lg overflow-hidden border border-zinc-800/50 group">
        {/* Image Container */}
        <div className="relative h-3/5 overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-zinc-900 animate-pulse" />
          )}
          <motion.img
            src={artwork.image}
            alt={title}
            className="w-full h-full object-cover"
            style={{ opacity: imageLoaded ? 1 : 0 }}
            onLoad={() => setImageLoaded(true)}
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
          
          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 bg-red-600/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Corner Accents */}
          <motion.div
            className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-red-500"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-red-500"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Content */}
        <div className="relative p-4 md:p-6 h-2/5 flex flex-col justify-between">
          <div>
            <motion.div
              className="w-8 md:w-12 h-0.5 bg-red-500 mb-3 md:mb-4"
              animate={{ width: isHovered ? 48 : 24 }}
              transition={{ duration: 0.3 }}
            />
            
            <h3 className="text-lg md:text-xl lg:text-2xl font-light text-white mb-1 md:mb-2 line-clamp-2">
              {title}
            </h3>
            
            <p className="text-gray-500 text-xs md:text-sm line-clamp-2">
              {description}
            </p>
          </div>

          {/* Meta Info */}
          <div className="space-y-2 md:space-y-3">
            <div className="flex flex-wrap gap-2 md:gap-4 text-xs md:text-sm">
              <div className="flex items-center gap-1.5 md:gap-2 text-gray-400">
                <Calendar className="w-3 h-3 md:w-4 md:h-4 text-red-500" />
                <span>{artwork.year}</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 text-gray-400">
                <Building2 className="w-3 h-3 md:w-4 md:h-4 text-red-500" />
                <span className="truncate max-w-[100px] md:max-w-[150px]">{auctionHouse}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 md:gap-2">
                <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
                <span className="text-white text-sm md:text-lg font-medium">{price}</span>
              </div>
              
              <motion.button
                className="flex items-center gap-1.5 md:gap-2 text-gray-400 hover:text-red-500 transition-colors"
                whileHover={{ x: 5 }}
              >
                <span className="text-xs md:text-sm">{language === 'ru' ? 'Подробнее' : 'View Details'}</span>
                <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
              </motion.button>
            </div>
          </div>

          {/* Bottom Glow Effect */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              scaleX: isHovered ? 1 : 0 
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
