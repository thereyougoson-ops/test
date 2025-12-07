import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Award, MapPin, Palette, X } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const timelineEvents = [
  { year: "1891", eventEn: "Born in St. Petersburg, Russia", eventRu: "Родился в Санкт-Петербурге, Россия", category: "life", image: null },
  { year: "1914", eventEn: "Flight instructor in Military Aviation School Gatchina", eventRu: "Лётный инструктор в Военной авиационной школе в Гатчине", category: "military", image: null },
  { year: "1915", eventEn: "Sketches serve as basis for journalistic reports from Alexander Kuprin and press corps", eventRu: "Эскизы служат основой для журналистских репортажей Александра Куприна и прессы", category: "art", image: null },
  { year: "1923", eventEn: "Attends the Academy of Art, mentored by Dimitry Kardovsky and Boris Kustodiev", eventRu: "Учится в Академии художеств под руководством Дмитрия Кардовского и Бориса Кустодиева", category: "education", image: null },
  { year: "1926", eventEn: "Married Alexandra Ivanova Matyukhina", eventRu: "Женился на Александре Ивановне Матюхиной", category: "life", image: null },
  { year: "1927", eventEn: "Appointed State Art Professor", eventRu: "Назначен государственным профессором искусств", category: "career", image: null },
  { year: "1928", eventEn: "Leningrad exhibition. \"Mother's Portrait\" and other Sokoloff's paintings received awards", eventRu: "Выставка в Ленинграде. «Портрет матери» и другие картины Соколова получили награды", category: "exhibition", image: "https://anatoliosokoloff.com/wp-content/uploads/2023/09/1928.jpg" },
  { year: "1928", eventEn: "Post Graduate Study under Professor Alexander Savinov", eventRu: "Аспирантура под руководством профессора Александра Савинова", category: "education", image: null },
  { year: "1932", eventEn: "Arrested and condemned to ten years of hard labor in the GULAG", eventRu: "Арестован и осуждён на десять лет каторжных работ в ГУЛАГе", category: "life", image: null },
  { year: "1936", eventEn: "Released from serving sentence in Svirsky Gulag", eventRu: "Освобождён из Свирского лагеря", category: "life", image: null },
  { year: "1937", eventEn: "All Crimea Exposition in Simferopol. His paintings \"The Taking of the Perekop\", \"Petitioners Visiting Lenin\" and \"Khaitarma\" were received with honorable mention", eventRu: "Всекрымская выставка в Симферополе. Картины «Взятие Перекопа», «Ходоки у Ленина» и «Хайтарма» получили почётные отзывы", category: "exhibition", image: null },
  { year: "1938", eventEn: "He becomes the Commissioner of Fine Art in the Crimea", eventRu: "Становится комиссаром изобразительного искусства в Крыму", category: "career", image: null },
  { year: "1939", eventEn: "His painting \"The Leader\" was acquired by the Black Sea Fleet for battleship \"Black Ukraine\"", eventRu: "Картина «Вождь» приобретена Черноморским флотом для линкора «Чёрная Украина»", category: "art", image: null },
  { year: "1939", eventEn: "All Crimean exhibition in Simferopol", eventRu: "Всекрымская выставка в Симферополе", category: "exhibition", image: "https://anatoliosokoloff.com/wp-content/uploads/2023/09/1939.jpg" },
  { year: "1940", eventEn: "Director of Art for the Crimean Agricultural Exposition", eventRu: "Художественный руководитель Крымской сельскохозяйственной выставки", category: "career", image: null },
  { year: "1941", eventEn: "Art Presentation at the All Soviet Exposition in Moscow", eventRu: "Художественная презентация на Всесоюзной выставке в Москве", category: "exhibition", image: null },
  { year: "1942", eventEn: "Leaves Russia for Switzerland", eventRu: "Покидает Россию и уезжает в Швейцарию", category: "life", image: null },
  { year: "1946", eventEn: "Sokoloff commissioned to paint portrait of Her Highness, Fürstin Von Liechtenstein", eventRu: "Соколов получает заказ на портрет Её Высочества княгини Лихтенштейнской", category: "art", image: "https://anatoliosokoloff.com/wp-content/uploads/2023/09/1946.jpg" },
  { year: "1947", eventEn: "Exhibit in Feldkirchen, Austria. \"Wilhelm Tell\" awarded First prize", eventRu: "Выставка в Фельдкирхене, Австрия. «Вильгельм Телль» получил первую премию", category: "exhibition", image: null },
  { year: "1948", eventEn: "Exhibit in Innsbruck, Austria. \"Last Steps in the Homeland\" was awarded First prize", eventRu: "Выставка в Инсбруке, Австрия. «Последние шаги на родине» удостоена первой премии", category: "exhibition", image: null },
  { year: "1948", eventEn: "Immigrates to Argentina", eventRu: "Эмигрирует в Аргентину", category: "life", image: null },
  { year: "1950", eventEn: "National competition for the centenary of General San Martin, Buenos Aires. \"Crossing the Andes\" Wins First prize and a Gold medal", eventRu: "Национальный конкурс к столетию генерала Сан-Мартина, Буэнос-Айрес. «Переход через Анды» получает первую премию и золотую медаль", category: "award", image: null },
  { year: "1952", eventEn: "Competition organized by the Congress of Argentina. Sokoloff's sketch \"The Liberator Jose de San Martin\" Wins First place", eventRu: "Конкурс Конгресса Аргентины. Эскиз Соколова «Освободитель Хосе де Сан-Мартин» занимает первое место", category: "award", image: null },
  { year: "1954", eventEn: "Sokoloff commissioned by Instituto Nacional Sanmartiniano for \"Iconography de San Martin\"", eventRu: "Соколов получает заказ от Национального института Сан-Мартина на «Иконографию Сан-Мартина»", category: "art", image: null },
  { year: "1955", eventEn: "Sokoloff commissioned by Gallery Rivadavia four fundamental paintings of Argentinean History", eventRu: "Галерея Ривадавия заказывает Соколову четыре фундаментальных полотна по истории Аргентины", category: "art", image: null },
  { year: "1955", eventEn: "Started work on preliminary sketches for Eva Peron memorial", eventRu: "Начал работу над эскизами мемориала Евы Перон", category: "art", image: null },
  { year: "1960", eventEn: "Sokoloff commissioned to create Historical painting when General Manuel Belgrano created the National Flag", eventRu: "Соколов получает заказ на историческую картину о создании национального флага генералом Мануэлем Бельграно", category: "art", image: "https://anatoliosokoloff.com/wp-content/uploads/2023/09/1960.jpg" },
  { year: "1962", eventEn: "Moves to the United States, joined by wife Alexandra and son Igor", eventRu: "Переезжает в США, к нему присоединяются жена Александра и сын Игорь", category: "life", image: null },
  { year: "1967", eventEn: "Exhibit \"Celebration of Folk Art\" USA Oakland, California", eventRu: "Выставка «Празднование народного искусства» в Окленде, Калифорния", category: "exhibition", image: null },
  { year: "1969", eventEn: "Exhibit organized by the ARAS Russian-American Artist Union, San Francisco", eventRu: "Выставка, организованная Русско-американским союзом художников АРАС, Сан-Франциско", category: "exhibition", image: null },
  { year: "1971", eventEn: "Exhibit in the Russian Cultural Museum, San Francisco. Sokoloff died this year", eventRu: "Выставка в Русском культурном музее, Сан-Франциско. Соколов умер в этом году", category: "life", image: null },
  { year: "1972", eventEn: "Exhibit at Stanford University's International Center", eventRu: "Выставка в Международном центре Стэнфордского университета", category: "exhibition", image: null },
  { year: "1974", eventEn: "Exhibit \"Fort Ross\", Oakland Museum", eventRu: "Выставка «Форт-Росс», Музей Окленда", category: "exhibition", image: null },
  { year: "1987", eventEn: "Transfer of \"The Capture of Ismail by Fieldmarshal A.Suvorov\" to The State Tretyakov Gallery", eventRu: "Передача картины «Взятие Измаила фельдмаршалом А.Суворовым» в Государственную Третьяковскую галерею", category: "museum", image: null },
  { year: "1988", eventEn: "Igor Sokoloff received medal \"Benefactor\" from Instituto Nacional Sanmartiniano", eventRu: "Игорь Соколов награждён медалью «Благодетель» от Национального института Сан-Мартина", category: "award", image: null },
  { year: "1990", eventEn: "Sketch of \"Russian Merchants Trading at Fort Ross\" presented to President M. Gorbachev", eventRu: "Эскиз «Русские купцы торгуют в Форт-Россе» вручён президенту М. Горбачёву", category: "award", image: null },
  { year: "1990", eventEn: "Exhibit of A. Sokoloff's works in the Benoit Family Museum, Peterhof, Russia", eventRu: "Выставка работ А. Соколова в Музее семьи Бенуа, Петергоф, Россия", category: "exhibition", image: null },
  { year: "1992", eventEn: "The exhibit organized by The Forest Hill Art Association in cooperation with the Consulate General of the Russian Federation", eventRu: "Выставка, организованная Художественной ассоциацией Форест-Хилл совместно с Генеральным консульством РФ", category: "exhibition", image: null },
  { year: "1994", eventEn: "Exhibit in the Khabarovsk Far East Museum, \"Russian Motives\"", eventRu: "Выставка в Дальневосточном музее Хабаровска «Русские мотивы»", category: "exhibition", image: null },
  { year: "1997", eventEn: "Solo Exhibit in the Khabarovsk Far East Museum, \"The American Period\"", eventRu: "Персональная выставка в Дальневосточном музее Хабаровска «Американский период»", category: "exhibition", image: null },
  { year: "2001", eventEn: "The ceremony of transferring portrait \"Conchita Arguello\" to the Russian Historical Museum", eventRu: "Церемония передачи портрета «Кончита Аргуэльо» в Российский исторический музей", category: "museum", image: null },
  { year: "2004", eventEn: "The ceremony in honor of Conchita Arguello and Nikolai Rezanov in The Benicia Historical Museum", eventRu: "Церемония в честь Кончиты Аргуэльо и Николая Резанова в Историческом музее Бениции", category: "exhibition", image: null },
  { year: "2004", eventEn: "During centennial of State Memorial Suvorov Museum, \"The Capture of Ismail\" transferred to the Museum on Permanent exhibit", eventRu: "К столетию Государственного мемориального музея Суворова картина «Взятие Измаила» передана на постоянную экспозицию", category: "museum", image: null },
];

const categoryIcons = {
  life: MapPin,
  military: Award,
  art: Palette,
  education: Calendar,
  career: Award,
  exhibition: Palette,
  award: Award,
  museum: Palette,
};

const categoryColors = {
  life: "bg-blue-500",
  military: "bg-orange-500",
  art: "bg-red-500",
  education: "bg-green-500",
  career: "bg-purple-500",
  exhibition: "bg-yellow-500",
  award: "bg-pink-500",
  museum: "bg-cyan-500",
};

const categoryTranslations = {
  en: {
    all: "All",
    life: "Life",
    art: "Art",
    exhibition: "Exhibition",
    award: "Award",
    museum: "Museum"
  },
  ru: {
    all: "Все",
    life: "Жизнь",
    art: "Искусство",
    exhibition: "Выставки",
    award: "Награды",
    museum: "Музеи"
  }
};

export default function ChronologySection() {
  const { t, language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');

  const filteredEvents = filter === 'all' 
    ? timelineEvents 
    : timelineEvents.filter(e => e.category === filter);

  const categories = ['all', 'life', 'art', 'exhibition', 'award', 'museum'];
  const catLabels = language === 'ru' ? categoryTranslations.ru : categoryTranslations.en;

  return (
    <section className="relative bg-black py-16 md:py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <p className="text-red-500 text-xs md:text-sm tracking-widest uppercase mb-3 md:mb-4">{t('chronologyLabel')}</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-white mb-3 md:mb-4">
            {t('biographical')} <span className="font-bold">{t('timelineBold')}</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base">{t('chronologySubtitle')}</p>
          <div className="w-16 md:w-24 h-0.5 bg-red-500 mx-auto mt-4 md:mt-6" />
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 md:mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
                filter === cat
                  ? 'bg-red-600 text-white'
                  : 'bg-zinc-900 text-gray-400 hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              {catLabels[cat]}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-zinc-800 transform md:-translate-x-1/2" />

          <div className="space-y-4 md:space-y-6">
            {filteredEvents.map((item, index) => {
              const Icon = categoryIcons[item.category] || Calendar;
              const isLeft = index % 2 === 0;
              const eventText = language === 'ru' ? item.eventRu : item.eventEn;

              return (
                <motion.div
                  key={`${item.year}-${index}`}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.02 }}
                  className={`relative flex items-start gap-4 md:gap-8 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ml-10 md:ml-0 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                    <div className={`inline-block bg-zinc-900 border border-zinc-800 rounded-lg p-3 md:p-4 lg:p-6 hover:border-red-500/50 transition-colors max-w-xl ${
                      item.image ? 'cursor-pointer' : ''
                    }`}
                    onClick={() => item.image && setSelectedImage(item.image)}
                    >
                      <div className={`flex items-center gap-2 md:gap-3 mb-2 ${isLeft ? 'md:justify-end' : ''}`}>
                        <span className={`w-2 h-2 rounded-full ${categoryColors[item.category]}`} />
                        <span className="text-red-500 font-bold text-base md:text-lg">{item.year}</span>
                      </div>
                      <p className="text-gray-300 text-xs md:text-sm lg:text-base">{eventText}</p>
                      {item.image && (
                        <p className="text-red-500 text-xs mt-2 italic">{t('clickToViewImage')}</p>
                      )}
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-3 md:w-4 h-3 md:h-4 rounded-full bg-red-500 border-2 md:border-4 border-black z-10" />

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Image Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white/80 hover:text-white"
              >
                <X className="w-6 h-6 md:w-8 md:h-8" />
              </button>
              <motion.img
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                src={selectedImage}
                alt="Timeline event"
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
