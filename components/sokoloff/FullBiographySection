import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useLanguage } from './LanguageContext';

export default function FullBiographySection() {
  const { t, language } = useLanguage();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.85, 1], [1, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.8, 1], [1, 1, 1, 0.92]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, -8]);
  
  const springScale = useSpring(scale, { stiffness: 80, damping: 25 });
  const springRotate = useSpring(rotateX, { stiffness: 80, damping: 25 });

  // Bilingual content
  const content = {
    en: {
      earlyYearsTitle: "Early Years & Military Training",
      earlyYearsPara1: "Anatoly Sokoloff was born in 1891 in Petrodvorets (Peterhof), into the family of a courtier in charge of the tsar's hunting. The Sokoloffs, like many other courtiers, lived in Znamenka, the estate of Grand Duke Nicholas. A military career had been a family tradition cherished through generations—his mother grew up with her 12 brothers, all of whom served in the tsar's army.",
      earlyYearsPara2: "Yet from the age of five, young Anatoly never parted with crayons, paints and paper. One of his two brothers was an accomplished musician, while the other liked to draw. Anatoly successfully graduated from the elite Nikolayevsky Cadet Corps and was enrolled in the Tver Cavalry School, where he continued to hone his artistic talent alongside military studies.",
      academyTitle: "Academy of Arts & The Great War",
      academyPara1: "The road to Saint Petersburg from Vyborg passed by Penaty, the estate of the great Russian painter Ilya Repin. Anatoly became a frequent guest there, along with virtually all the young artists from St. Petersburg. These visits left an indelible mark on his work.",
      academyPara2: "Anatoly was enrolled into a military aviation school at Gatchina where he found himself rubbing shoulders with the Russian flying elite – Sikorsky, the Seversky brothers, Sergeyevsky. In 1915, he became a flight instructor. Many of his sketches served as the basis for journalistic reports filed by the famous Russian novelist Alexander Kuprin.",
      revolutionTitle: "Revolution, Loss & The GULAG",
      revolutionPara1: "The Bolshevik revolution found Anatoly Sokoloff in Finland. While in Vyborg, he learned about his father's brutal death—Alexander Sokoloff, who had served the tsar all his life, was shot in his home at Peterhof. His brothers, officers in the tsar's army, followed the call of duty to fight the bolsheviks. One was killed at the outset of the civil war, while all traces of the other vanished.",
      revolutionPara2: "By 1926 life seemed to have come back to normal. Anatoly married Alexandra Ivanovna Matyukhina, and soon their son Igor was born. The happy interlude did not last long. In 1932 Anatoly was arrested. The son and brother of tsarist officers, he spent nine months in solitary confinement. Condemned to ten years of hard labor in the GULAG, Sokoloff nevertheless continued to draw, were it only to preserve an element of sanity.",
      crimeaTitle: "Crimea & Escape to the West",
      crimeaPara1: "Following a friend's advice, the Sokoloffs moved to Simferopol in the Crimea. And yet again Anatoly found salvation in painting. At the All-Crimean Exhibition, paintings including \"The Taking of the Perekop\", \"Petitioners Visiting Lenin\", and \"Khaitarma\" were well received by critics. In 1938, he was elected to a leadership position in the Crimean Artists' Union, of which he was one of the founders.",
      crimeaPara2: "In 1942, fearing for his family and the deportation of his son to Germany as a forced laborer, Anatoly decided to escape. Disguised as a wounded Romanian soldier, hiding little Igor among his belongings, accompanied by his wife dressed in a nurse's uniform, he managed to cross Russia, reach Romania and continue their westward trek. Seven months later, the family found themselves in Switzerland.",
      europeTitle: "European Period: Switzerland & Liechtenstein",
      europePara1: "The farther Sokoloff found himself from Mother Russia, the stronger was her pull on his work. During this period, the artist conceived a vast canvas dedicated to Field Marshal Alexander Suvorov. He visited all the places in Switzerland associated with the famous Russian military commander, delved into historical sources, executed hundreds of tempera and watercolor sketches before committing himself to paint.",
      europePara2: "The master spent more than three years on the painting \"Suvorov Captures the Turkish Fortress Ismail\". In Liechtenstein, the artist painted the Princess of Liechtenstein, a good friend of his father. He exhibited at many venues in Europe— Tyrol, Innsbruck, Feldkirchen. Works such as \"Last Steps in the Motherland\", \"At the Cross\" and \"Wilhelm Tell\" were highly acclaimed by critics, earning honorary prizes.",
      argentinaTitle: "Argentina: Gold Medal & National Recognition",
      argentinaPara1: "In 1950, the Sokoloffs immigrated to Argentina. Inspired by Argentina's heroic saga, Sokoloff embarked on \"Liberator General San Martin Crosses the Andes.\" The painting was not only accepted into the national competition but was awarded the gold medal. It was purchased by the General San Martin National Museum.",
      argentinaPara2: "In 1953, the National Congress of Argentina commissioned Sokoloff to paint \"General Jose San Martin, the Liberator\" for its main chamber. His paintings were exhibited in Argentina, Chile, Bolivia and Paraguay. The artist spent more than a year in the north of the country studying the lifestyle and habits of Argentine cowboys—gauchos.",
      usaTitle: "Final Years: The United States",
      usaPara1: "One day, Anatoly Sokoloff found a letter from California—a letter from his long-lost brother who had been reported missing in action during the civil war. Without delay, Anatoly went to the United States; in 1962 he was joined by his wife Alexandra and son Igor.",
      usaPara2: "During the last ten years of his life in the United States, Sokoloff produced 19 monumental paintings, all stemming from long days spent in libraries studying the history of his new homeland. Of particular interest are \"Lexington\", \"General George Washington's Winter March\", and \"Emissaries of Lord Cornwallis at General Washington's Headquarters\".",
      usaPara3: "In 1962, he completed \"Russian Merchants at Fort Ross\", depicting trade between Indians and Russian colonists at the only Russian outpost in California, founded in 1812. The artist, a consummate draftsman, a master of battle paintings vibrant, powerful and alive with movement, deserves to be put on a par with such famous Russian painters as Karl Bryullov and Nikolai Klodt.",
      died: "Sokoloff died in 1971."
    },
    ru: {
      earlyYearsTitle: "Ранние годы и военная подготовка",
      earlyYearsPara1: "Анатолий Соколов родился в 1891 году в Петродворце (Петергофе), в семье придворного, ведавшего царской охотой. Соколовы, как и многие другие придворные, жили в Знаменке, имении великого князя Николая. Военная карьера была семейной традицией, хранимой из поколения в поколение — мать выросла с 12 братьями, все они служили в царской армии.",
      earlyYearsPara2: "Однако с пяти лет юный Анатолий не расставался с карандашами, красками и бумагой. Один из его двух братьев был талантливым музыкантом, а другой любил рисовать. Анатолий успешно окончил элитный Николаевский кадетский корпус и поступил в Тверское кавалерийское училище, где продолжал совершенствовать художественный талант наряду с военной подготовкой.",
      academyTitle: "Академия художеств и Великая война",
      academyPara1: "Дорога в Санкт-Петербург из Выборга проходила мимо Пенат — имения великого русского художника Ильи Репина. Анатолий стал там частым гостем, как и почти все молодые художники Петербурга. Эти визиты оставили неизгладимый след в его творчестве.",
      academyPara2: "Анатолий поступил в военную авиационную школу в Гатчине, где оказался рядом с российской авиационной элитой — Сикорским, братьями Северскими, Сергиевским. В 1915 году он стал лётным инструктором. Многие его зарисовки послужили основой для журналистских репортажей знаменитого русского писателя Александра Куприна.",
      revolutionTitle: "Революция, потери и ГУЛАГ",
      revolutionPara1: "Большевистская революция застала Анатолия Соколова в Финляндии. В Выборге он узнал о жестокой гибели отца — Александр Соколов, всю жизнь служивший царю, был расстрелян в своём доме в Петергофе. Его братья, офицеры царской армии, последовали долгу воевать с большевиками. Один погиб в начале гражданской войны, следы другого исчезли бесследно.",
      revolutionPara2: "К 1926 году жизнь, казалось, вернулась в нормальное русло. Анатолий женился на Александре Ивановне Матюхиной, и вскоре родился сын Игорь. Счастливый период длился недолго. В 1932 году Анатолий был арестован. Сын и брат царских офицеров, он провёл девять месяцев в одиночной камере. Осуждённый на десять лет каторжных работ в ГУЛАГе, Соколов тем не менее продолжал рисовать, хотя бы чтобы сохранить рассудок.",
      crimeaTitle: "Крым и побег на Запад",
      crimeaPara1: "По совету друга Соколовы переехали в Симферополь в Крыму. И снова Анатолий нашёл спасение в живописи. На Всекрымской выставке картины «Взятие Перекопа», «Ходоки у Ленина» и «Хайтарма» были хорошо приняты критиками. В 1938 году он был избран на руководящую должность в Союзе художников Крыма, одним из основателей которого являлся.",
      crimeaPara2: "В 1942 году, опасаясь за семью и угона сына в Германию на принудительные работы, Анатолий решил бежать. Переодевшись раненым румынским солдатом, спрятав маленького Игоря среди вещей, в сопровождении жены в форме медсестры, он сумел пересечь Россию, добраться до Румынии и продолжить путь на запад. Семь месяцев спустя семья оказалась в Швейцарии.",
      europeTitle: "Европейский период: Швейцария и Лихтенштейн",
      europePara1: "Чем дальше Соколов оказывался от России-матушки, тем сильнее было её влияние на его творчество. В этот период художник задумал грандиозное полотно, посвящённое фельдмаршалу Александру Суворову. Он посетил все места в Швейцарии, связанные со знаменитым русским полководцем, изучал исторические источники, выполнил сотни темперных и акварельных эскизов.",
      europePara2: "Мастер потратил более трёх лет на картину «Суворов берёт турецкую крепость Измаил». В Лихтенштейне художник написал портрет княгини Лихтенштейнской, близкой подруги его отца. Он выставлялся во многих местах Европы — в Тироле, Инсбруке, Фельдкирхене. Работы «Последние шаги на родине», «У креста» и «Вильгельм Телль» получили высокую оценку критиков и почётные награды.",
      argentinaTitle: "Аргентина: золотая медаль и национальное признание",
      argentinaPara1: "В 1950 году Соколовы эмигрировали в Аргентину. Вдохновлённый героической сагой Аргентины, Соколов начал работу над картиной «Освободитель генерал Сан-Мартин переходит Анды». Картина была не только допущена к национальному конкурсу, но и удостоена золотой медали. Её приобрёл Национальный музей генерала Сан-Мартина.",
      argentinaPara2: "В 1953 году Национальный конгресс Аргентины заказал Соколову картину «Генерал Хосе де Сан-Мартин, Освободитель» для главного зала. Его картины выставлялись в Аргентине, Чили, Боливии и Парагвае. Художник провёл более года на севере страны, изучая образ жизни и привычки аргентинских ковбоев — гаучо.",
      usaTitle: "Последние годы: США",
      usaPara1: "Однажды Анатолий Соколов получил письмо из Калифорнии — от давно потерянного брата, считавшегося пропавшим без вести в годы гражданской войны. Не медля, Анатолий отправился в США; в 1962 году к нему присоединились жена Александра и сын Игорь.",
      usaPara2: "За последние десять лет жизни в США Соколов создал 19 монументальных полотен, все — результат долгих дней в библиотеках за изучением истории своей новой родины. Особый интерес представляют «Лексингтон», «Зимний марш генерала Джорджа Вашингтона» и «Эмиссары лорда Корнуоллиса в штаб-квартире генерала Вашингтона».",
      usaPara3: "В 1962 году он завершил картину «Русские купцы в Форт-Россе», изображающую торговлю между индейцами и русскими колонистами в единственном русском форпосте в Калифорнии, основанном в 1812 году. Художник, непревзойдённый рисовальщик, мастер батальной живописи — яркой, мощной и полной движения, заслуживает быть поставленным в один ряд с такими знаменитыми русскими художниками, как Карл Брюллов и Николай Клодт.",
      died: "Соколов умер в 1971 году."
    }
  };

  const c = language === 'ru' ? content.ru : content.en;

  return (
    <section 
      ref={sectionRef}
      id="biography"
      className="relative bg-black py-16 md:py-24 lg:py-32 overflow-hidden"
      style={{ perspective: '1500px' }}
    >
      {/* Animated 3D Background */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-10 right-10 w-32 md:w-40 h-32 md:h-40 border border-red-500/5 rounded-full" />
        <div className="absolute top-1/3 left-5 w-20 md:w-24 h-20 md:h-24 border border-zinc-800/30 rotate-12" />
        <div className="absolute bottom-1/4 right-1/4 w-24 md:w-32 h-24 md:h-32 bg-red-500/3 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/3 w-40 md:w-56 h-40 md:h-56 bg-zinc-900/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-16 md:w-20 h-16 md:h-20 border border-zinc-700/20 rotate-45" />
      </motion.div>

      <motion.div 
        className="max-w-5xl mx-auto px-4 md:px-8"
        style={{ 
          opacity, 
          scale: springScale, 
          rotateX: springRotate,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <p className="text-red-500 text-xs md:text-sm tracking-widest uppercase mb-3 md:mb-4">{t('biographyLabel')}</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-white mb-4 md:mb-6">
            {t('extraordinaryLife')} <span className="font-bold">{t('lifeBold')}</span>
          </h2>
          <div className="w-16 md:w-24 h-0.5 bg-red-500 mx-auto" />
        </motion.div>

        {/* Opening Quote */}
        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-l-4 border-red-500 pl-4 md:pl-6 py-3 md:py-4 mb-8 md:mb-12 bg-zinc-950/50 rounded-r-lg"
        >
          <p className="text-base md:text-lg lg:text-xl text-white italic font-light leading-relaxed">
            {t('biographyQuote')}
          </p>
        </motion.blockquote>

        {/* Biography Content with Images */}
        <div className="space-y-10 md:space-y-12">
          {/* Early Life */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 md:gap-8 items-start"
          >
            <div className="md:col-span-2 space-y-3 md:space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-white">{c.earlyYearsTitle}</h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                {c.earlyYearsPara1}
              </p>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                {c.earlyYearsPara2}
              </p>
            </div>
            <div className="relative order-first md:order-last">
              <img
                src="https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Alex1.png?fit=194%2C349&ssl=1"
                alt="Young Anatoly Sokoloff"
                className="rounded-lg w-full max-w-[200px] mx-auto md:max-w-none object-cover"
              />
              <div className="absolute inset-0 border border-red-500/30 rounded-lg pointer-events-none" />
            </div>
          </motion.div>

          {/* Academy & Aviation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 md:gap-8 items-start"
          >
            <div className="relative">
              <img
                src="https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Nurse1.png?resize=196%2C255&ssl=1"
                alt="Sokoloff family"
                className="rounded-lg w-full max-w-[200px] mx-auto md:max-w-none object-cover"
              />
              <div className="absolute inset-0 border border-red-500/30 rounded-lg pointer-events-none" />
            </div>
            <div className="md:col-span-2 space-y-3 md:space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-white">{c.academyTitle}</h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                {c.academyPara1}
              </p>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                {c.academyPara2}
              </p>
            </div>
          </motion.div>

          {/* Revolution & GULAG */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-3 md:space-y-4"
          >
            <h3 className="text-xl md:text-2xl font-bold text-white">{c.revolutionTitle}</h3>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              {c.revolutionPara1}
            </p>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              {c.revolutionPara2}
            </p>
          </motion.div>

          {/* Crimea & WWII */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 md:gap-8 items-start"
          >
            <div className="md:col-span-2 space-y-3 md:space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-white">{c.crimeaTitle}</h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                {c.crimeaPara1}
              </p>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                {c.crimeaPara2}
              </p>
            </div>
            <div className="relative order-first md:order-last">
              <img
                src="https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Bothe1.png?resize=202%2C241&ssl=1"
                alt="Sokoloff at work"
                className="rounded-lg w-full max-w-[200px] mx-auto md:max-w-none object-cover"
              />
              <div className="absolute inset-0 border border-red-500/30 rounded-lg pointer-events-none" />
            </div>
          </motion.div>

          {/* Europe */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-3 md:space-y-4"
          >
            <h3 className="text-xl md:text-2xl font-bold text-white">{c.europeTitle}</h3>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              {c.europePara1}
            </p>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              {c.europePara2}
            </p>
          </motion.div>

          {/* Argentina */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 md:gap-8 items-start"
          >
            <div className="relative">
              <img
                src="https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/siti.png?resize=300%2C202&ssl=1"
                alt="Argentina period"
                className="rounded-lg w-full max-w-[250px] mx-auto md:max-w-none object-cover"
              />
              <div className="absolute inset-0 border border-red-500/30 rounded-lg pointer-events-none" />
            </div>
            <div className="md:col-span-2 space-y-3 md:space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-white">{c.argentinaTitle}</h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                {c.argentinaPara1}
              </p>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                {c.argentinaPara2}
              </p>
            </div>
          </motion.div>

          {/* United States */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-3 md:space-y-4"
          >
            <h3 className="text-xl md:text-2xl font-bold text-white">{c.usaTitle}</h3>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              {c.usaPara1}
            </p>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              {c.usaPara2}
            </p>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              {c.usaPara3}
            </p>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-medium">
              {c.died}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
