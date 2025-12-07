import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    // Navigation
    hero: "Hero",
    about: "About",
    chronology: "Chronology",
    timeline: "Timeline",
    gallery: "Gallery",
    journey: "Journey",
    biography: "Biography",
    
    // Hero Section
    heroSubtitle: "Master of Historical Realism",
    heroYears: "1891 — 1971",
    heroDescription: "A journey through the life and art of one of the most remarkable Russian painters of the 20th century",
    exploreTimeline: "Explore Timeline",
    viewGallery: "View Gallery",
    
    // About Section
    aboutLabel: "About",
    aboutName: "Anatolio",
    aboutNameBold: "Sokoloff",
    aboutBirth: "(Russian born, 22 July 1891 – 1971)",
    aboutIntro: "natolio Sokoloff was born in Petrodvorets (Peterhof), into the family of a courtier in charge of Tsar's hunting. The Sokoloff's like many other courtiers, lived in Znamenka, the estate of Grand Duke Nicholas. The future artist's mother, nee Olshanskaya, grew up in a general's family along with her 12 brothers, all of whom served in the tsar's army.",
    aboutPara1: "Anatoly successfully graduated from the elite Nikolayevsky Cadet Corps and was enrolled in the Tver Cavalry School. Later, when Sokoloff became known for his battle pieces, viewers were always amazed at the mastery with which he executed mounted figures.",
    aboutPara2: "While at the School, Anatoly continued to pursue his military studies and hone his artistic talent. His work started to attract the attention it was legitimately due and the young artist was granted permission from the highest quarters to attend the Academy of Arts. The road to Saint Petersburg from Vyborg passed by Penaty, the estate of the great Russian painter Ilya Repin. Anatoly became a frequent guest there, and these visits left an indelible mark on his work.",
    aboutPara3: "Anatoly was enrolled into a military aviation school at Gatchina where he found himself rubbing shoulders with the Russian flying elite – Sikorsky, the Seversky brothers, Sergeyevsky. In 1915, he became a flight instructor at the school. But even the war could not stop Anatoly from drawing. Many of his sketches wound up in the regimental museum, while others served as the basis for journalistic reports filed by the famous Russian novelist Alexander Kuprin.",
    aboutPara4: "He enrolled in and graduated from the Academy of Arts, tutored by the likes of Dmitry Kardovsky and Boris Kustodiev. His favorite mentor was Alexander Savinov - an expert draftsman and skilled teacher. It is during those years that Sokoloff mastered the key principles of Russian classical painting at their best.",
    marriageFamily: "Marriage & Family",
    marriageFamilyText: "By 1926 life seemed to have come back to normal. Anatoly Sokoloff married Alexandra Ivanovna Matyukhina, soon their son Igor was born.",
    yearsOfHardship: "Years of Hardship",
    yearsOfHardshipText: "In 1932 Anatoly was arrested. Condemned to ten years of hard labor in the GULAG, Sokoloff nevertheless continued to draw, were it only to preserve an element of sanity.",
    artisticLeadership: "Artistic Leadership",
    artisticLeadershipText: "In 1938, Anatoly Sokoloff was elected to a leadership position in the Crimean Artists' Union of which he was one of the founders.",
    aboutEurope: "Sokoloff visited all the places in Switzerland associated with the famous Russian military commander, Alexander Suvorov, delved into historical sources, executed hundreds of tempera and watercolor sketches before committing himself to paint. The master spent more than three years on the painting \"Suvorov Captures the Turkish Fortress Ismail\". In Liechtenstein, where the family eventually moved, the artist painted the Princess of Liechtenstein and other prominent personalities.",
    aboutArgentina: "In 1950, the Sokoloff's immigrated to Argentina. The painting \"Liberator General San Martin Crosses the Andes\" was awarded the gold medal. Later, the painting was purchased by the General San Martin National Museum and in 1953 the National Congress of Argentina commissioned Sokoloff to paint \"General Jose San Martin, the Liberator\" for its main chamber.",
    aboutUSA: "During the last ten years of his life in the United States, Sokoloff produced 19 monumental paintings. Of particular interest are \"Lexington\", \"General George Washington's Winter March\", and \"Emissaries of Lord Cornwallis at General Washington's Headquarters\". The artist, a consummate draftsman, a master of battle paintings vibrant, powerful and alive with movement, deserves to be put on a par with such famous Russian painters as Karl Bryullov and Nikolai Klodt.",
    aboutQuote: "\"The artist, a consummate draftsman, a master of battle paintings vibrant, powerful and alive with the movement of rearing and plunging horses, marked by the vividly expressive figures and faces of both victors and vanquished.\"",
    
    // Gallery Section
    collectionLabel: "Collection",
    theGalleria: "The",
    galleriaBold: "Galleria",
    grid: "Grid",
    carousel: "Carousel",
    showingArtworks: "Showing",
    artworksIn: "artworks in",
    
    // Gallery Categories
    unitedStates: "United States",
    troikas: "Troikas",
    europe: "Europe",
    argentina: "Argentina",
    russia: "Russia",
    portraits: "Portraits",
    
    // Map Section
    journeyLabel: "Journey",
    lifeAcross: "A Life Across",
    continentsBold: "Continents",
    journeyDescription: "From Imperial Russia to Argentina and California - trace the extraordinary journey of Anatoly Sokoloff and discover where his masterpieces reside today",
    hideJourneyPath: "Hide Journey Path",
    showJourneyPath: "Show Journey Path",
    legend: "Legend",
    locationWithPaintings: "Location with paintings/museums",
    lifeJourneyPath: "Life journey path",
    startPoint: "Start (1891)",
    endPoint: "End (1971)",
    notableWorks: "Notable Works",
    museumsCollections: "Museums & Collections",
    
    // Biography Section
    biographyLabel: "Biography",
    extraordinaryLife: "An Extraordinary",
    lifeBold: "Life",
    biographyQuote: "\"Anatoly Alexandrovich Sokoloff was an artist of extraordinary talent and a most unusual fate. The best of his paintings depict epochal events and heroes spanning three continents and two centuries seen through the prism of his romantic vision of the world. At the same time, his own life was molded by the cataclysms and woes of 20th century to such an extent that his biography reads like the history of our times.\"",
    earlyYears: "Early Years & Military Training",
    academyWar: "Academy of Arts & The Great War",
    revolutionGulag: "Revolution, Loss & The GULAG",
    crimeaEscape: "Crimea & Escape to the West",
    europeanPeriod: "European Period: Switzerland & Liechtenstein",
    argentinaGold: "Argentina: Gold Medal & National Recognition",
    finalYears: "Final Years: The United States",
    sokoloffDied: "Sokoloff died in 1971.",
    
    // Chronology
    chronologyLabel: "Chronology",
    biographical: "Biographical",
    timelineBold: "Timeline",
    chronologySubtitle: "A life spanning three continents and eight decades of art",
    all: "All",
    life: "Life",
    art: "Art",
    exhibition: "Exhibition",
    award: "Award",
    museum: "Museum",
    clickToViewImage: "Click to view image",
    
    // Footer
    contact: "Contact",
    archiveCollection: "Archive & Collection",
    
    // Timeline Section
    timelineLabel: "Timeline",
    selected: "Selected",
    worksBold: "Works",
    timelineDescription: "Explore Sokoloff's masterpieces spanning his prolific career from Russia to America",
    swipeToExplore: "Swipe to explore",
    
    // Biography Section (short version)
    biographySectionLabel: "Biography",
    lifeIn: "A Life in",
    artBold: "Art",
    bioParagraph1: "natoly Sokoloff (1891-1971) was a distinguished Russian-American artist. Growing up in a family of traditional animal lovers, he spent hours as a boy watching the graceful beauty of the tsar's retinue, and as a young cavalryman acquired firsthand knowledge of horses.",
    bioParagraph2: "He painted more than three hundred (300) paintings of the powerful moving horses, known as \"Troikas\". He is considered by many art experts as one of the best Masters to paint horses in motion. His works can be seen in the State Historical Museum of Moscow, The State Tretyakov Gallery, and Khabarovsk Far East Museum.",
    bioParagraph3: "The artist was a consummate draftsman, master of battle paintings—vibrant, powerful and alive with movement of rearing and plunging horses, marked by vividly expressive figures and faces of both victors and vanquished. He produced monumental canvases including \"The Battle of Bunker Hill\", \"General George Washington's Winter March\", and \"Lexington\" relating to American History.",
    troikaPaintings: "Troika Paintings",
    continentsCollected: "Continents Collected",
    birthPetrodvorets: "Birth in Petrodvorets",
    birthDescription: "Born into the family of a courtier in Peterhof, near Saint Petersburg, Russia",
    russiaPeriod: "Russia Period",
    russiaPeriodDescription: "Developed his unique style as a historical realist. Created genre scenes, landscapes, and portraits",
    europeanExile: "European Exile",
    europeanExileDescription: "Exhibited in Tyrol, Innsbruck, Feldkirchen. Painted Princess of Liechtenstein. Won honorary prizes",
    argentinaAmericas: "Argentina & Americas",
    argentinaAmericasDescription: "Awarded Gold Medal for 'San Martin Crosses the Andes'. Painted for Argentine National Congress"
  },
  ru: {
    // Navigation
    hero: "Главная",
    about: "О художнике",
    chronology: "Хронология",
    timeline: "Лента времени",
    gallery: "Галерея",
    journey: "Путешествие",
    biography: "Биография",
    
    // Hero Section
    heroSubtitle: "Мастер исторического реализма",
    heroYears: "1891 — 1971",
    heroDescription: "Путешествие по жизни и творчеству одного из самых выдающихся русских художников XX века",
    exploreTimeline: "Хронология",
    viewGallery: "Галерея",
    
    // About Section
    aboutLabel: "О художнике",
    aboutName: "Анатолий",
    aboutNameBold: "Соколов",
    aboutBirth: "(Россия, 22 июля 1891 – 1971)",
    aboutIntro: "натолий Соколов родился в Петродворце (Петергофе), в семье придворного, ведавшего царской охотой. Соколовы, как и многие другие придворные, жили в Знаменке, имении великого князя Николая. Мать будущего художника, урождённая Ольшанская, выросла в генеральской семье вместе с 12 братьями, которые все служили в царской армии.",
    aboutPara1: "Анатолий успешно окончил элитный Николаевский кадетский корпус и поступил в Тверское кавалерийское училище. Позже, когда Соколов стал известен своими батальными полотнами, зрители всегда поражались мастерству, с которым он изображал конные фигуры.",
    aboutPara2: "В училище Анатолий продолжал военное обучение и совершенствовал художественный талант. Его работы начали привлекать заслуженное внимание, и молодому художнику было дано высочайшее разрешение посещать Академию художеств. Дорога в Санкт-Петербург из Выборга проходила мимо Пенат — имения великого русского художника Ильи Репина. Анатолий стал там частым гостем, и эти визиты оставили неизгладимый след в его творчестве.",
    aboutPara3: "Анатолий поступил в военную авиационную школу в Гатчине, где оказался рядом с российской авиационной элитой — Сикорским, братьями Северскими, Сергиевским. В 1915 году он стал лётным инструктором. Но даже война не могла остановить Анатолия от рисования. Многие его зарисовки попали в полковой музей, а другие послужили основой для журналистских репортажей знаменитого русского писателя Александра Куприна.",
    aboutPara4: "Он поступил и окончил Академию художеств под руководством таких мастеров, как Дмитрий Кардовский и Борис Кустодиев. Его любимым наставником был Александр Савинов — превосходный рисовальщик и искусный педагог. Именно в те годы Соколов овладел ключевыми принципами русской классической живописи в их лучшем проявлении.",
    marriageFamily: "Семья и брак",
    marriageFamilyText: "К 1926 году жизнь, казалось, вернулась в нормальное русло. Анатолий Соколов женился на Александре Ивановне Матюхиной, вскоре родился их сын Игорь.",
    yearsOfHardship: "Годы испытаний",
    yearsOfHardshipText: "В 1932 году Анатолий был арестован. Осуждённый на десять лет каторжных работ в ГУЛАГе, Соколов тем не менее продолжал рисовать, хотя бы для того, чтобы сохранить рассудок.",
    artisticLeadership: "Художественное руководство",
    artisticLeadershipText: "В 1938 году Анатолий Соколов был избран на руководящую должность в Союзе художников Крыма, одним из основателей которого он являлся.",
    aboutEurope: "Соколов посетил все места в Швейцарии, связанные со знаменитым русским полководцем Александром Суворовым, изучал исторические источники, выполнил сотни темперных и акварельных эскизов, прежде чем приступить к написанию картины. Мастер потратил более трёх лет на картину «Суворов берёт турецкую крепость Измаил». В Лихтенштейне, куда семья в конце концов переехала, художник написал портрет княгини Лихтенштейнской и других видных личностей.",
    aboutArgentina: "В 1950 году семья Соколовых эмигрировала в Аргентину. Картина «Освободитель генерал Сан-Мартин переходит Анды» была удостоена золотой медали. Позже картина была приобретена Национальным музеем генерала Сан-Мартина, а в 1953 году Национальный конгресс Аргентины заказал Соколову картину «Генерал Хосе де Сан-Мартин, Освободитель» для главного зала.",
    aboutUSA: "За последние десять лет жизни в США Соколов создал 19 монументальных полотен. Особый интерес представляют «Лексингтон», «Зимний марш генерала Джорджа Вашингтона» и «Эмиссары лорда Корнуоллиса в штаб-квартире генерала Вашингтона». Художник, непревзойдённый рисовальщик, мастер батальной живописи — яркой, мощной и полной движения, заслуживает быть поставленным в один ряд с такими знаменитыми русскими художниками, как Карл Брюллов и Николай Клодт.",
    aboutQuote: "«Художник, непревзойдённый рисовальщик, мастер батальной живописи — яркой, мощной и полной движения вздыбленных и падающих лошадей, отмеченной живо выразительными фигурами и лицами как победителей, так и побеждённых.»",
    
    // Gallery Section
    collectionLabel: "Коллекция",
    theGalleria: "Художественная",
    galleriaBold: "Галерея",
    grid: "Сетка",
    carousel: "Карусель",
    showingArtworks: "Показано",
    artworksIn: "работ в разделе",
    
    // Gallery Categories
    unitedStates: "США",
    troikas: "Тройки",
    europe: "Европа",
    argentina: "Аргентина",
    russia: "Россия",
    portraits: "Портреты",
    
    // Map Section
    journeyLabel: "Путешествие",
    lifeAcross: "Жизнь на",
    continentsBold: "континентах",
    journeyDescription: "От Императорской России до Аргентины и Калифорнии — проследите необыкновенный путь Анатолия Соколова и узнайте, где сегодня хранятся его шедевры",
    hideJourneyPath: "Скрыть маршрут",
    showJourneyPath: "Показать маршрут",
    legend: "Легенда",
    locationWithPaintings: "Место с картинами/музеями",
    lifeJourneyPath: "Жизненный путь",
    startPoint: "Начало (1891)",
    endPoint: "Конец (1971)",
    notableWorks: "Известные работы",
    museumsCollections: "Музеи и коллекции",
    
    // Biography Section
    biographyLabel: "Биография",
    extraordinaryLife: "Необыкновенная",
    lifeBold: "жизнь",
    biographyQuote: "«Анатолий Александрович Соколов был художником необыкновенного таланта и необычайной судьбы. Лучшие из его картин изображают эпохальные события и героев трёх континентов и двух столетий, увиденных сквозь призму его романтического видения мира. В то же время его собственная жизнь была сформирована катаклизмами и бедами XX века настолько, что его биография читается как история нашего времени.»",
    earlyYears: "Ранние годы и военная подготовка",
    academyWar: "Академия художеств и Великая война",
    revolutionGulag: "Революция, потери и ГУЛАГ",
    crimeaEscape: "Крым и побег на Запад",
    europeanPeriod: "Европейский период: Швейцария и Лихтенштейн",
    argentinaGold: "Аргентина: золотая медаль и национальное признание",
    finalYears: "Последние годы: США",
    sokoloffDied: "Соколов умер в 1971 году.",
    
    // Chronology
    chronologyLabel: "Хронология",
    biographical: "Биографическая",
    timelineBold: "хроника",
    chronologySubtitle: "Жизнь, охватившая три континента и восемь десятилетий искусства",
    all: "Все",
    life: "Жизнь",
    art: "Искусство",
    exhibition: "Выставки",
    award: "Награды",
    museum: "Музеи",
    clickToViewImage: "Нажмите для просмотра",
    
    // Footer
    contact: "Контакты",
    archiveCollection: "Архив и коллекция",
    
    // Timeline Section
    timelineLabel: "Лента времени",
    selected: "Избранные",
    worksBold: "работы",
    timelineDescription: "Откройте для себя шедевры Соколова, созданные на протяжении его богатой карьеры от России до Америки",
    swipeToExplore: "Листайте для просмотра",
    
    // Biography Section (short version)
    biographySectionLabel: "Биография",
    lifeIn: "Жизнь в",
    artBold: "искусстве",
    bioParagraph1: "натолий Соколов (1891-1971) был выдающимся русско-американским художником. Выросший в семье любителей животных, он часами наблюдал за грациозной красотой царского кортежа, а молодым кавалеристом приобрёл глубокие знания о лошадях.",
    bioParagraph2: "Он написал более трёхсот (300) картин с изображением мощных движущихся лошадей, известных как «Тройки». Многие искусствоведы считают его одним из лучших мастеров изображения лошадей в движении. Его работы можно увидеть в Государственном историческом музее Москвы, Государственной Третьяковской галерее и Дальневосточном музее Хабаровска.",
    bioParagraph3: "Художник был непревзойдённым рисовальщиком, мастером батальной живописи — яркой, мощной и полной движения вздыбленных лошадей, отмеченной выразительными фигурами и лицами победителей и побеждённых. Он создал монументальные полотна, включая «Битву при Банкер-Хилле», «Зимний марш генерала Джорджа Вашингтона» и «Лексингтон», связанные с американской историей.",
    troikaPaintings: "Картин с тройками",
    continentsCollected: "Континентов в коллекциях",
    birthPetrodvorets: "Рождение в Петродворце",
    birthDescription: "Родился в семье придворного в Петергофе, близ Санкт-Петербурга, Россия",
    russiaPeriod: "Российский период",
    russiaPeriodDescription: "Развил свой уникальный стиль исторического реалиста. Создавал жанровые сцены, пейзажи и портреты",
    europeanExile: "Европейская эмиграция",
    europeanExileDescription: "Выставлялся в Тироле, Инсбруке, Фельдкирхене. Написал портрет княгини Лихтенштейнской. Получил почётные награды",
    argentinaAmericas: "Аргентина и Америка",
    argentinaAmericasDescription: "Награждён золотой медалью за «Сан-Мартин переходит Анды». Писал для Национального конгресса Аргентины"
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ru' : 'en');
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
