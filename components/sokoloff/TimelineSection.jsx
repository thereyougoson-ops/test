import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ArtworkCard from './ArtworkCard';
import { useLanguage } from './LanguageContext';

const artworks = [
  {
    id: 1,
    title: "The Battle of Bunker Hill",
    titleRu: "Битва при Банкер-Хилле",
    description: "Monumental battle painting depicting the famous Revolutionary War battle. Oil on canvas.",
    descriptionRu: "Монументальная батальная картина, изображающая знаменитое сражение Войны за независимость. Холст, масло.",
    year: "c.1960",
    image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/SP1-BANKER-HILL-scaled.jpg?fit=1024%2C747&ssl=1",
    auctionHouse: "Shapiro Auctions",
    price: "Est. $15,000 - $25,000"
  },
  {
    id: 2,
    title: "General San Martin Crosses the Andes",
    titleRu: "Генерал Сан-Мартин переходит Анды",
    description: "Gold Medal winning painting for the Argentine Minister of Education. Oil on canvas.",
    descriptionRu: "Картина, удостоенная золотой медали от министра образования Аргентины. Холст, масло.",
    year: "c.1950",
    image: "https://anatoliosokoloff.com/wp-content/uploads/2023/09/San-Martin.jpg",
    auctionHouse: "National Congress of Argentina",
    auctionHouseRu: "Национальный конгресс Аргентины",
    price: "Museum Collection",
    priceRu: "Музейная коллекция"
  },
  {
    id: 3,
    title: "Northern Spring - Troika",
    titleRu: "Северная весна — Тройка",
    description: "Masterful troika scene showing horses in motion through spring landscape. Oil on canvas.",
    descriptionRu: "Мастерская сцена с тройкой, изображающая лошадей в движении по весеннему пейзажу. Холст, масло.",
    year: "c.1940",
    image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/RUT-1-Northern-Spring.jpg?fit=1024%2C699&ssl=1",
    auctionHouse: "MacDougall's",
    price: "£3,000 - £5,000"
  },
  {
    id: 4,
    title: "18th Century Europe",
    titleRu: "Европа XVIII века",
    description: "Aristocratic scene depicting European nobility. Rich detail and vibrant colors.",
    descriptionRu: "Аристократическая сцена, изображающая европейскую знать. Богатая детализация и яркие цвета.",
    year: "c.1948",
    image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/EU1-18th-CENTURY-EUROPE.jpg?fit=1024%2C717&ssl=1",
    auctionHouse: "Sotheby's",
    price: "Est. $6,000 - $8,000"
  },
  {
    id: 5,
    title: "Wedding in Old Russia",
    titleRu: "Свадьба в старой России",
    description: "Joyous village wedding scene depicting traditional Russian celebration. Oil on canvas.",
    descriptionRu: "Радостная деревенская свадьба, изображающая традиционное русское торжество. Холст, масло.",
    year: "c.1930",
    image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/ORU-14-WEDDING-in-OLD-RUSSIA.jpg?fit=1024%2C712&ssl=1",
    auctionHouse: "Hermitage Fine Art",
    price: "€17,000 - €20,000"
  },
  {
    id: 6,
    title: "Celebrating Cossacks",
    titleRu: "Празднующие казаки",
    description: "Large colorful depiction of Cossack dancers in celebration. Oil on canvas.",
    descriptionRu: "Большое красочное изображение танцующих казаков на празднике. Холст, масло.",
    year: "c.1935",
    image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/ORU-8-WEB-Celebrating-Kosaks.jpg?fit=1024%2C777&ssl=1",
    auctionHouse: "Quinn's Auction Galleries",
    price: "$500 - $700"
  },
  {
    id: 7,
    title: "The Russian Women - Troika",
    titleRu: "Русские женщины — Тройка",
    description: "Russian women in traditional dress riding through snow. One of 300+ troika paintings.",
    descriptionRu: "Русские женщины в традиционных нарядах едут по снегу. Одна из более чем 300 картин с тройками.",
    year: "c.1942",
    image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/RUT-5-The-Russian-Women.jpg?fit=1024%2C689&ssl=1",
    auctionHouse: "Nye & Company",
    price: "$1,000 - $2,000"
  },
  {
    id: 8,
    title: "Wilhelm Tell",
    titleRu: "Вильгельм Телль",
    description: "Historical European scene highly acclaimed by critics. Oil on canvas.",
    descriptionRu: "Историческая европейская сцена, высоко оценённая критиками. Холст, масло.",
    year: "c.1946",
    image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/EU2-Wilgelm-Tell.jpg?fit=1024%2C708&ssl=1",
    auctionHouse: "Shapiro Auctions",
    price: "$4,000 - $6,000"
  },
  {
    id: 9,
    title: "Carnival in Buenos Aires",
    titleRu: "Карнавал в Буэнос-Айресе",
    description: "Vibrant scene capturing the spirit of Argentine carnival. Oil on canvas.",
    descriptionRu: "Яркая сцена, передающая дух аргентинского карнавала. Холст, масло.",
    year: "1952",
    image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Carnival.jpg?fit=698%2C1024&ssl=1",
    auctionHouse: "Art Brokerage",
    price: "$2,700"
  },
  {
    id: 10,
    title: "Princess of Liechtenstein",
    titleRu: "Княгиня Лихтенштейнская",
    description: "Portrait of the Princess of Liechtenstein, a good friend of his father. Oil on canvas.",
    descriptionRu: "Портрет княгини Лихтенштейнской, близкой подруги его отца. Холст, масло.",
    year: "c.1946",
    image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Pricess-of-Liechtenstein.jpg?fit=712%2C1000&ssl=1",
    auctionHouse: "Private Collection",
    auctionHouseRu: "Частная коллекция",
    price: "Not for Sale",
    priceRu: "Не продаётся"
  },
  {
    id: 11,
    title: "Emissaries of Lord Cornwallis",
    titleRu: "Эмиссары лорда Корнуоллиса",
    description: "American Revolutionary War scene at General Washington's Headquarters. Oil on canvas.",
    descriptionRu: "Сцена Американской войны за независимость в штаб-квартире генерала Вашингтона. Холст, масло.",
    year: "c.1958",
    image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/SP2-EMISSARIES-of-LORD-scaled.jpg?fit=1024%2C633&ssl=1",
    auctionHouse: "Clars Auctions",
    price: "$8,000 - $12,000"
  },
  {
    id: 12,
    title: "Gypsy Camp Songs",
    titleRu: "Песни цыганского табора",
    description: "Atmospheric scene of Russian gypsy camp with music and dance. Oil on canvas.",
    descriptionRu: "Атмосферная сцена русского цыганского табора с музыкой и танцами. Холст, масло.",
    year: "c.1928",
    image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/ORU-1-Gipsy-Camp-Songs.jpg?fit=1024%2C689&ssl=1",
    auctionHouse: "State Tretyakov Gallery",
    auctionHouseRu: "Государственная Третьяковская галерея",
    price: "Museum Collection",
    priceRu: "Музейная коллекция"
  },
];

export default function TimelineSection({ scrollRef }) {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleScroll = (e) => {
    const container = e.target;
    const scrollLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const progress = scrollLeft / maxScroll;
    setScrollProgress(progress);
    
    const cardWidth = isMobile ? window.innerWidth * 0.85 + 32 : 600 + 64;
    const newIndex = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(newIndex, artworks.length - 1));
  };

  const scrollToCard = (index) => {
    if (containerRef.current) {
      const cardWidth = isMobile ? window.innerWidth * 0.85 + 32 : 600 + 64;
      containerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section ref={scrollRef} className="relative min-h-screen bg-black py-12 md:py-16 lg:py-20">
      {/* Section Header */}
      <div className="px-4 md:px-8 lg:px-12 mb-6 md:mb-8 lg:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-4"
        >
          <div>
            <p className="text-red-500 text-xs md:text-sm tracking-widest uppercase mb-2">{t('timelineLabel')}</p>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-white">
              {t('selected')} <span className="font-bold">{t('worksBold')}</span>
            </h2>
          </div>
          <p className="text-gray-500 text-xs md:text-sm lg:text-base max-w-md">
            {t('timelineDescription')}
          </p>
        </motion.div>
      </div>

      {/* Timeline Markers */}
      <div className="hidden md:flex items-center justify-between px-8 lg:px-12 mb-6 lg:mb-8">
        <div className="flex items-center gap-2">
          <span className="text-gray-600 text-sm">1891</span>
          <div className="w-16 h-px bg-gray-800" />
        </div>
        <div className="flex-1 relative h-px bg-gray-800 mx-4">
          {/* Milestone Markers */}
          {[1920, 1935, 1950, 1965].map((year, i) => (
            <motion.div
              key={year}
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: `${(i + 1) * 20}%` }}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: i * 0.2 }}
            >
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <motion.div
                  className="absolute inset-0 w-3 h-3 rounded-full bg-red-500"
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="absolute top-6 left-1/2 -translate-x-1/2 text-gray-600 text-xs">
                  {year}
                </span>
              </div>
            </motion.div>
          ))}
          
          {/* Progress Indicator */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-red-600 to-red-500 rounded-full"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-16 h-px bg-gray-800" />
          <span className="text-gray-600 text-sm">1971</span>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto scrollbar-hide py-4 md:py-6 lg:py-8 px-4 md:px-8"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {/* Left Padding */}
        <div className="flex-shrink-0 w-4 md:w-16" />
        
        {artworks.map((artwork, index) => (
          <div
            key={artwork.id}
            style={{ scrollSnapAlign: 'center' }}
          >
            <ArtworkCard artwork={artwork} index={index} />
          </div>
        ))}
        
        {/* Right Padding */}
        <div className="flex-shrink-0 w-4 md:w-16" />
      </div>

      {/* Mobile Swipe Hint */}
      <motion.div
        className="md:hidden flex items-center justify-center gap-2 text-gray-500 text-xs mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.span
          animate={{ x: [-5, 5, -5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ←
        </motion.span>
        <span>{t('swipeToExplore')}</span>
        <motion.span
          animate={{ x: [5, -5, 5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          →
        </motion.span>
      </motion.div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-1.5 mt-4 md:hidden">
        {artworks.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToCard(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex 
                ? 'w-8 bg-red-500' 
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          />
        ))}
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex justify-center gap-3 lg:gap-4 mt-8 lg:mt-12">
        {artworks.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToCard(index)}
            className="group relative"
          >
            <div className={`w-12 h-1 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'bg-red-500' : 'bg-gray-800 group-hover:bg-gray-700'
            }`} />
            {index === activeIndex && (
              <motion.div
                className="absolute inset-0 w-12 h-1 bg-red-500 rounded-full"
                layoutId="activeIndicator"
              />
            )}
          </button>
        ))}
      </div>

      {/* Glowing Progress Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-zinc-900 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-red-600 via-red-500 to-red-600"
          style={{ width: `${scrollProgress * 100}%` }}
        />
        <motion.div
          className="absolute top-0 h-full w-32 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          style={{ left: `${scrollProgress * 100 - 5}%` }}
        />
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
