import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const galleries = {
  unitedStates: {
    title: "United States",
    titleRu: "США",
    color: "#3B82F6",
    description: "The last part of his life and art work resides in the United States.",
    descriptionRu: "Последняя часть его жизни и творчества связана с США.",
    artworks: [
      { id: "us1", title: "The Battle of Bunker Hill", titleRu: "Битва при Банкер-Хилле", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/SP1-BANKER-HILL-scaled.jpg?fit=1024%2C747&ssl=1" },
      { id: "us2", title: "Emissaries of Lord Cornwallis", titleRu: "Эмиссары лорда Корнуоллиса", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/SP2-EMISSARIES-of-LORD-scaled.jpg?fit=1024%2C633&ssl=1" },
      { id: "us3", title: "Conchita Arguello", titleRu: "Кончита Аргуэльо", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/SP3-CONCHITA-ARGUELLO.jpg?fit=826%2C1024&ssl=1" },
      { id: "us4", title: "Struggle for Independence", titleRu: "Борьба за независимость", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/SP37-US1-Struggle-for.jpg?fit=1024%2C804&ssl=1" },
      { id: "us5", title: "Intruders", titleRu: "Незваные гости", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/SP37-US2-Intruders.jpg?fit=1024%2C758&ssl=1" },
      { id: "us6", title: "Through the Storm", titleRu: "Сквозь бурю", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/SP37-US3-Thru-the-Storm.jpg?fit=1024%2C759&ssl=1" },
      { id: "us7", title: "Indian Trail", titleRu: "Индейская тропа", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/SP37-US4-Indian-Trail.jpg?fit=1024%2C751&ssl=1" },
      { id: "us8", title: "The Indian Family", titleRu: "Индейская семья", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/SP37-US5-The-Indian-Family.jpg?fit=672%2C900&ssl=1" },
      { id: "us9", title: "The Cowboy Song", titleRu: "Песня ковбоя", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/SP37-US6-The-Cowboy-Song.jpg?fit=645%2C884&ssl=1" },
      { id: "us10", title: "At Water Hole", titleRu: "У водопоя", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/SP37-US7-At-Water-Hole.jpg?fit=1000%2C1015&ssl=1" },
      { id: "us11", title: "Bingo", titleRu: "Бинго", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/SP38-US8-Bingo.jpg?fit=1024%2C855&ssl=1" },
      { id: "us12", title: "Alla in New Mexico", titleRu: "Алла в Нью-Мексико", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/SP38-US9-Alla-in-New-Mexico.jpg?fit=1024%2C814&ssl=1" },
      { id: "us13", title: "Golden Gate Park", titleRu: "Парк Золотые Ворота", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/SP38-US10-Golden-Gate-Park.jpg?fit=885%2C670&ssl=1" },
      { id: "us14", title: "Immigrant's First Job", titleRu: "Первая работа иммигранта", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/SP38-US11-Immigrats-First-Job.jpg?fit=1024%2C832&ssl=1" },
      { id: "us15", title: "Escape from Alcatraz", titleRu: "Побег из Алькатраса", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/SP38-US12-Escape-from-Alcatras.jpg?fit=1024%2C706&ssl=1" },
      { id: "us16", title: "Nighttime in Hawaii", titleRu: "Ночь на Гавайях", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/SP38-US13-NIGHTTIME-in-HAWAI.jpg?fit=1024%2C785&ssl=1" },
      { id: "us17", title: "Minutemen's Ambush", titleRu: "Засада минитменов", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/SP39-US14-Minute-mens-Ambush.jpg?fit=1024%2C826&ssl=1" },
      { id: "us18", title: "General Washington's Patriots", titleRu: "Патриоты генерала Вашингтона", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/SP39-US15-Gen-Washington-Patriots.jpg?fit=1024%2C758&ssl=1" },
      { id: "us19", title: "Ghost Town New Mexico", titleRu: "Город-призрак Нью-Мексико", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/SP39-US16-Ghost-town-New-Mexico.jpg?fit=900%2C671&ssl=1" },
      { id: "us20", title: "The Bandit's Capture", titleRu: "Поимка бандита", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/SP39-US17-The-Bandits-Capture.jpg?fit=1024%2C866&ssl=1" },
      { id: "us21", title: "The Road to Far West", titleRu: "Дорога на Дальний Запад", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/SP39-US18-The-Road-to-Far-West.jpg?fit=762%2C1024&ssl=1" },
      { id: "us22", title: "The Grand Canyon", titleRu: "Большой Каньон", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/SP39-US19-The-Grand-Canyon.jpg?fit=779%2C1024&ssl=1" },
      { id: "us23", title: "Far West Pacific Ocean", titleRu: "Дальний Запад — Тихий океан", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/SP39-US20-Far-West-Pacific-Ocean.jpg?fit=1024%2C808&ssl=1" },
      { id: "us24", title: "Market Street at 5 PM", titleRu: "Маркет-стрит в 5 вечера", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/SP40-US21-Market-Street-AT-5-PM.jpg?fit=719%2C1024&ssl=1" },
      { id: "us25", title: "The Champion", titleRu: "Чемпион", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/SP40-US22-The-Champion.jpg?fit=693%2C1024&ssl=1" },
      { id: "us26", title: "The Date", titleRu: "Свидание", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/SP40-US23-The-Date.jpg?fit=667%2C1024&ssl=1" },
      { id: "us27", title: "The Catch", titleRu: "Улов", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/SP40-US24-The-Catch.jpg?fit=755%2C1024&ssl=1" },
    ]
  },
  troikas: {
    title: "Troikas",
    titleRu: "Тройки",
    color: "#F59E0B",
    description: "Over 300 paintings of powerful moving horses.",
    descriptionRu: "Более 300 картин с изображением мощных движущихся лошадей.",
    artworks: [
      { id: "tr1", title: "Troika 1960", titleRu: "Тройка 1960", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/1960-1.jpg?fit=1024%2C736&ssl=1" },
      { id: "tr2", title: "Northern Spring", titleRu: "Северная весна", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/RUT-1-Northern-Spring.jpg?fit=1024%2C699&ssl=1" },
      { id: "tr3", title: "Outskirts of Old Moscow", titleRu: "Окраины старой Москвы", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/RUT-2-OUTSKIRTS-of-Old-MOSC.jpg?fit=1024%2C770&ssl=1" },
      { id: "tr4", title: "Beginning of Summer", titleRu: "Начало лета", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/RUT-3-Beginning-of-Summer.jpg?fit=1024%2C704&ssl=1" },
      { id: "tr5", title: "The City Race", titleRu: "Городские гонки", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/RUT-4-THE-City-Race.jpg?fit=1024%2C714&ssl=1" },
      { id: "tr6", title: "The Russian Women", titleRu: "Русские женщины", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/RUT-5-The-Russian-Women.jpg?fit=1024%2C689&ssl=1" },
      { id: "tr7", title: "Through the Snow Drifts", titleRu: "Сквозь сугробы", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/RUT-6-Thru-the-Snow-Drifts.jpg?fit=1024%2C706&ssl=1" },
      { id: "tr8", title: "Snowball Fight", titleRu: "Игра в снежки", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/RUT-7-SNOWBALLS-FIGHT.jpg?fit=1024%2C695&ssl=1" },
      { id: "tr9", title: "Unequal Race", titleRu: "Неравная гонка", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/RUT-8-UNEQUAL-RACE.jpg?fit=1024%2C741&ssl=1" },
      { id: "tr10", title: "Avoiding Snow Storm", titleRu: "Избегая снежной бури", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/RUT-9-AVOIDING-SNOW-STORM.jpg?fit=1024%2C814&ssl=1" },
      { id: "tr11", title: "Festivities in the Square", titleRu: "Празднества на площади", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/RUT-11-Festivities-in-the-Sq.jpg?fit=1024%2C721&ssl=1" },
      { id: "tr12", title: "A Bustling Afternoon", titleRu: "Оживлённый полдень", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/RUT-12-A-Bustling-Afternoon.jpg?fit=1024%2C721&ssl=1" },
      { id: "tr13", title: "The Golden Ring", titleRu: "Золотое кольцо", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/RUT-13-The-Golden-Ring.jpg?fit=1024%2C817&ssl=1" },
      { id: "tr14", title: "Two Girls and the Man", titleRu: "Две девушки и мужчина", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/RUT-14-Two-Girls-and-the-Man.jpg?fit=1024%2C717&ssl=1" },
      { id: "tr15", title: "Only Two Horses", titleRu: "Только две лошади", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/RUT-15-Only-two-Hourses.jpg?fit=1024%2C708&ssl=1" },
      { id: "tr16", title: "Winter Snowball Game", titleRu: "Зимняя игра в снежки", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/RUT-17-Winter-Snowball-Game.jpg?fit=1024%2C740&ssl=1" },
      { id: "tr17", title: "Everybody Goes to Church", titleRu: "Все идут в церковь", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/RUT-18-Everybode-go-to-Church.jpg?fit=1024%2C711&ssl=1" },
    ]
  },
  europe: {
    title: "Europe",
    titleRu: "Европа",
    color: "#8B5CF6",
    description: "Works from his European period including Switzerland and Austria.",
    descriptionRu: "Работы европейского периода, включая Швейцарию и Австрию.",
    artworks: [
      { id: "eu1", title: "18th Century Europe", titleRu: "Европа XVIII века", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/EU1-18th-CENTURY-EUROPE.jpg?fit=1024%2C717&ssl=1" },
      { id: "eu2", title: "Wilhelm Tell", titleRu: "Вильгельм Телль", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/EU2-Wilgelm-Tell.jpg?fit=1024%2C708&ssl=1" },
      { id: "eu3", title: "Last Day of Charlotte", titleRu: "Последний день Шарлотты", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/EU3-Last-Day-of-Charlotte-1.jpg?fit=1024%2C751&ssl=1" },
      { id: "eu4", title: "The War Tales", titleRu: "Военные истории", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/EU4-The-War-Tales-of-the-I1.jpg?fit=1024%2C794&ssl=1" },
      { id: "eu5", title: "The Conspirators", titleRu: "Заговорщики", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/EU5-The-Conspirators1.jpg?fit=1024%2C763&ssl=1" },
      { id: "eu6", title: "Champagne for Two", titleRu: "Шампанское на двоих", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/EU6-Champaghe-for-Tow1.jpg?fit=1024%2C811&ssl=1" },
      { id: "eu7", title: "King Solomon", titleRu: "Царь Соломон", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/EU7-KING-SOLOMON1.jpg?fit=1024%2C488&ssl=1" },
      { id: "eu8", title: "Foggy Day in Austria 1946", titleRu: "Туманный день в Австрии 1946", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/EU8-FOGGY-DAY-in-AUSTRIA-19461.jpg?fit=1024%2C736&ssl=1" },
      { id: "eu9", title: "Last Steps on the Motherland", titleRu: "Последние шаги на родине", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/EU9-The-Last-Steps-on-the-Motherland1.jpg?fit=1024%2C805&ssl=1" },
      { id: "eu10", title: "The Engagement", titleRu: "Помолвка", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/EU10-The-Engagemant1.jpg?fit=1024%2C893&ssl=1" },
      { id: "eu11", title: "After the Bombing Raid", titleRu: "После бомбардировки", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/EU11-After-the-Bombing-Raid1.jpg?fit=744%2C1024&ssl=1" },
      { id: "eu12", title: "At the Table", titleRu: "За столом", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/EU12-At-the-Table1.jpg?fit=840%2C1024&ssl=1" },
      { id: "eu13", title: "Sharmanka Vienna", titleRu: "Шарманка в Вене", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/EU20-SHARMANKA-VIENA1.jpg?fit=1024%2C806&ssl=1" },
      { id: "eu14", title: "Russian Lunch", titleRu: "Русский обед", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/EU21-RUSSIAN-LUNCH1.jpg?fit=1024%2C803&ssl=1" },
      { id: "eu15", title: "Lunar See Austria", titleRu: "Лунное озеро в Австрии", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/EU22-LUNAR-SEE-AUSTRIA.jpg?fit=1024%2C821&ssl=1" },
      { id: "eu16", title: "Artist and Art Lover", titleRu: "Художник и ценитель искусства", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/EU23-ARTIST-and-ART-LOVER1.jpg?fit=939%2C1024&ssl=1" },
      { id: "eu17", title: "The Old Holland", titleRu: "Старая Голландия", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/EU24-THE-OLD-HOLLAND1.jpg?fit=903%2C1024&ssl=1" },
      { id: "eu18", title: "Art Lovers Vienna", titleRu: "Ценители искусства в Вене", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/EU25-ART-LOVERS-VIENA1.jpg?fit=1024%2C884&ssl=1" },
      { id: "eu19", title: "Dutch Town", titleRu: "Голландский городок", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/EU26-DUCH-TOWN1.jpg?fit=1024%2C895&ssl=1" },
      { id: "eu20", title: "Lake in Austria", titleRu: "Озеро в Австрии", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/EU27-LAKE-in-AUSTRIA1.jpg?fit=1024%2C759&ssl=1" },
      { id: "eu21", title: "New Acquisition", titleRu: "Новое приобретение", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/EU28-NEW-ACQUISITION1.jpg?fit=809%2C1024&ssl=1" },
      { id: "eu22", title: "Polish Jews", titleRu: "Польские евреи", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/EU29-POLISH-JEWS1.jpg?fit=662%2C1024&ssl=1" },
      { id: "eu23", title: "Flirtation", titleRu: "Флирт", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/EU30-FLIRTATION1.jpg?fit=861%2C1024&ssl=1" },
      { id: "eu24", title: "The Knights", titleRu: "Рыцари", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/EU31-THE-KNIGHTS1.jpg?fit=1024%2C909&ssl=1" },
    ]
  },
  argentina: {
    title: "Argentina",
    titleRu: "Аргентина",
    color: "#10B981",
    description: "Gold Medal winner for 'Liberator General San Martin Crosses the Andes.'",
    descriptionRu: "Золотая медаль за картину «Освободитель генерал Сан-Мартин переходит Анды».",
    artworks: [
      { id: "ar1", title: "Agua Dulce", titleRu: "Агуа Дульсе", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Agua-Dulce.jpg?fit=1024%2C850&ssl=1" },
      { id: "ar2", title: "Buenos Aires at Night", titleRu: "Буэнос-Айрес ночью", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Buenos-Aires-at-Night.jpg?fit=1024%2C691&ssl=1" },
      { id: "ar3", title: "Carnival", titleRu: "Карнавал", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Carnival.jpg?fit=698%2C1024&ssl=1" },
      { id: "ar4", title: "Gaucho Salta", titleRu: "Гаучо Сальта", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Cauch-Salta.jpg?fit=712%2C1024&ssl=1" },
      { id: "ar5", title: "Don Juan", titleRu: "Дон Хуан", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Don-Juan.jpg?fit=770%2C1024&ssl=1" },
      { id: "ar6", title: "Farmers Market", titleRu: "Крестьянский рынок", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Farmers-Market.jpg?fit=786%2C1024&ssl=1" },
      { id: "ar7", title: "Gaucho in Salta", titleRu: "Гаучо в Сальте", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Gaucho-in-Salta.jpg?fit=769%2C1024&ssl=1" },
      { id: "ar8", title: "Gaucho Tucuman", titleRu: "Гаучо Тукуман", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Gaucho-Tucuman.jpg?fit=622%2C1024&ssl=1" },
      { id: "ar9", title: "Gypsy in Buenos Aires", titleRu: "Цыгане в Буэнос-Айресе", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Gipsy-in-G-Buenos-Air.jpg?fit=1024%2C766&ssl=1" },
      { id: "ar10", title: "Hiring Farm Workers", titleRu: "Найм сельских рабочих", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Hiring-Farm-Workers-.jpg?fit=1024%2C855&ssl=1" },
      { id: "ar11", title: "Nuevo Julio", titleRu: "Нуэво Хулио", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Nuevo-Julio.jpg?fit=696%2C1024&ssl=1" },
      { id: "ar12", title: "Pampa Patagonia", titleRu: "Пампа Патагонии", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Pampa-Patagonia.jpg?fit=1024%2C701&ssl=1" },
      { id: "ar13", title: "Rioja Land of Wine", titleRu: "Риоха — край вина", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Rioja-Land-of-Wine.jpg?fit=1024%2C639&ssl=1" },
      { id: "ar14", title: "Road to Talla", titleRu: "Дорога в Талью", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Road-to-Talla.jpg?fit=1024%2C832&ssl=1" },
      { id: "ar15", title: "Salta", titleRu: "Сальта", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Salta.jpg?fit=1024%2C821&ssl=1" },
      { id: "ar16", title: "Serenade", titleRu: "Серенада", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Serenade.jpg?fit=852%2C1024&ssl=1" },
      { id: "ar17", title: "Tabaris Buenos Aires", titleRu: "Табарис Буэнос-Айрес", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Tabaris-Buenos-Aires.jpg?fit=1024%2C696&ssl=1" },
      { id: "ar18", title: "Tarantella", titleRu: "Тарантелла", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Tarantella.jpg?fit=1024%2C707&ssl=1" },
      { id: "ar19", title: "Tarantella 2", titleRu: "Тарантелла 2", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Tarantella-2.jpg?fit=1024%2C742&ssl=1" },
      { id: "ar20", title: "The Wild Bull", titleRu: "Дикий бык", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/The-Wild-Bull.jpg?fit=1024%2C733&ssl=1" },
      { id: "ar21", title: "Witch Doctor", titleRu: "Знахарь", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Witch-Doctor-Color.jpg?fit=1024%2C765&ssl=1" },
    ]
  },
  russia: {
    title: "Russia",
    titleRu: "Россия",
    color: "#EF4444",
    description: "Russian landscapes, portraits and dramatic movements in history.",
    descriptionRu: "Русские пейзажи, портреты и драматические исторические сцены.",
    artworks: [
      { id: "ru1", title: "1939", titleRu: "1939", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/1939-1.jpg?fit=1024%2C734&ssl=1" },
      { id: "ru2", title: "Gypsy Camp Songs", titleRu: "Песни цыганского табора", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/ORU-1-Gipsy-Camp-Songs.jpg?fit=1024%2C689&ssl=1" },
      { id: "ru3", title: "Moscow Cabaret", titleRu: "Московское кабаре", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/ORU-2-MOSCOW-CABARET-1.jpg?fit=1024%2C728&ssl=1" },
      { id: "ru4", title: "Stenka Razin and Princess", titleRu: "Стенька Разин и княжна", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/ORU-3-STENKA-RASIN-and-PRINCE-1.jpg?fit=1024%2C719&ssl=1" },
      { id: "ru5", title: "The Volga River", titleRu: "Река Волга", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/ORU-4-The-Volga-River-1.jpg?fit=1024%2C691&ssl=1" },
      { id: "ru6", title: "The Fountain of Bakhchisarai", titleRu: "Бахчисарайский фонтан", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/ORU-6-The-Fountain-of-Bakhche.jpg?fit=1024%2C716&ssl=1" },
      { id: "ru7", title: "Three Generations", titleRu: "Три поколения", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/ORU-7-Three-Generations-2.jpg?fit=1024%2C843&ssl=1" },
      { id: "ru8", title: "Celebrating Cossacks", titleRu: "Празднующие казаки", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/ORU-8-WEB-Celebrating-Kosaks.jpg?fit=1024%2C777&ssl=1" },
      { id: "ru9", title: "Northern Retreat", titleRu: "Северное отступление", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/ORU-9-Northern-Retreat.jpg?fit=1024%2C792&ssl=1" },
      { id: "ru10", title: "Summer Garden St. Petersburg", titleRu: "Летний сад Санкт-Петербурга", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/ORU-10-Sammer-Garden-St-Pet.jpg?fit=1024%2C781&ssl=1" },
      { id: "ru11", title: "Old St. Petersburg", titleRu: "Старый Петербург", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/ORU-11-Old-St-Peterburg-1.jpg?fit=1024%2C757&ssl=1" },
      { id: "ru12", title: "Sunday in the Village", titleRu: "Воскресенье в деревне", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/ORU-12-Sunday-in-the-Villag.jpg?fit=1024%2C707&ssl=1" },
      { id: "ru13", title: "Siberian Bear Hunt", titleRu: "Сибирская охота на медведя", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/ORU-13-Siberian-Bear-Hunt.jpg?fit=884%2C1024&ssl=1" },
      { id: "ru14", title: "Wedding in Old Russia", titleRu: "Свадьба в старой России", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/ORU-14-WEDDING-in-OLD-RUSSIA.jpg?fit=1024%2C712&ssl=1" },
      { id: "ru15", title: "Russian Dance", titleRu: "Русский танец", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/ORU-15-Russian-Dance.jpg?fit=797%2C1024&ssl=1" },
      { id: "ru16", title: "Peasant Women Archangel", titleRu: "Крестьянки Архангельска", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/ORU-16-Peasant-Women-Archange.jpg?fit=794%2C1024&ssl=1" },
      { id: "ru17", title: "At the River Msta", titleRu: "На реке Мста", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/ORU-17-At-the-Riover-Msta.jpg?fit=1024%2C702&ssl=1" },
      { id: "ru18", title: "Coachman's Enigma", titleRu: "Загадка кучера", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/ORU-18-Coachmans-Enigma.jpg?fit=812%2C1024&ssl=1" },
      { id: "ru19", title: "Youth's Struggle to Nature", titleRu: "Борьба молодости с природой", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/ORU-19-Youths-Struggle-to-Nat.jpg?fit=786%2C1024&ssl=1" },
      { id: "ru20", title: "Fishermen", titleRu: "Рыбаки", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/ORU-20-Fishermen.jpg?fit=1024%2C859&ssl=1" },
      { id: "ru21", title: "Lacquer Boxes Artists", titleRu: "Мастера лаковых шкатулок", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/ORU-21-LAQUER-BOXES-ARTISTS.jpg?fit=809%2C1024&ssl=1" },
      { id: "ru22", title: "Vania, Mania and Tania", titleRu: "Ваня, Маня и Таня", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/RUC-1-VANIA-MANIA-AND-TANI.jpg?fit=1024%2C722&ssl=1" },
      { id: "ru23", title: "Quadrille in Village", titleRu: "Кадриль в деревне", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/RUC-2-QUADRILLE-in-VILLAGE.jpg?fit=1024%2C752&ssl=1" },
      { id: "ru24", title: "First Steps", titleRu: "Первые шаги", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/RUC-3-FIRST-STEPS.jpg?fit=1024%2C703&ssl=1" },
      { id: "ru25", title: "Early Morning on River", titleRu: "Раннее утро на реке", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/RUC-5-EARLY-MORNING-on-RIV.jpg?fit=1024%2C734&ssl=1" },
      { id: "ru26", title: "Accordion Player Goes", titleRu: "Гармонист идёт", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/RUC-6-ACCORDION-PLAYER-GO.jpg?fit=1024%2C766&ssl=1" },
      { id: "ru27", title: "The Great Russian Spirit", titleRu: "Великий русский дух", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/RUC-7-THE-GREAT-RUSSIAN-SPIRI.jpg?fit=1024%2C698&ssl=1" },
      { id: "ru28", title: "Match Maker", titleRu: "Сваха", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/RUC-8-MATCH-MAKER.jpg?fit=1024%2C694&ssl=1" },
      { id: "ru29", title: "After a Field Work", titleRu: "После полевых работ", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/RUC-10-After-a-Field-Work.jpg?fit=1024%2C740&ssl=1" },
      { id: "ru30", title: "Early Winter", titleRu: "Ранняя зима", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/RUC-11-EARLY-WINTER.jpg?fit=1024%2C799&ssl=1" },
      { id: "ru31", title: "The Bridal Procession", titleRu: "Свадебная процессия", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/RUC-12-The-Bridal-Procession-.jpg?fit=1024%2C698&ssl=1" },
      { id: "ru32", title: "Russian Dance 2", titleRu: "Русский танец 2", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/RUC-13-Russian-Dance.jpg?fit=713%2C1024&ssl=1" },
      { id: "ru33", title: "Family Fight", titleRu: "Семейная ссора", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/RUC-14-FAMILY-FIGHT.jpg?fit=828%2C1024&ssl=1" },
      { id: "ru34", title: "Last View of Motherland", titleRu: "Последний взгляд на родину", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/RUC-15-LAST-VIEW-OF-MOTHERLAND.jpg?fit=789%2C1024&ssl=1" },
      { id: "ru35", title: "Persuasion", titleRu: "Уговоры", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/RUC-17-PERSUASION.jpg?fit=1024%2C809&ssl=1" },
      { id: "ru36", title: "Cossacks Festival", titleRu: "Казачий праздник", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/RUC-18-KOSAKS-FESTIVAL.jpg?fit=1024%2C700&ssl=1" },
    ]
  },
  portraits: {
    title: "Portraits",
    titleRu: "Портреты",
    color: "#EC4899",
    description: "Well-executed portraits showing the inner essence of the subject.",
    descriptionRu: "Мастерски выполненные портреты, раскрывающие внутреннюю сущность модели.",
    artworks: [
      { id: "pt1", title: "Wife of Dr. Hrenov", titleRu: "Жена доктора Хренова", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/21-Wife-of-Dr-Hrenov.jpg?fit=787%2C1000&ssl=1" },
      { id: "pt2", title: "1928 Portrait", titleRu: "Портрет 1928 года", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/1928-1.jpg?fit=1000%2C776&ssl=1" },
      { id: "pt3", title: "Alexandra Sokoloff", titleRu: "Александра Соколова", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Alexandra-Sokoloff-1.jpg?fit=699%2C1000&ssl=1" },
      { id: "pt4", title: "Alexandra Sokoloff II", titleRu: "Александра Соколова II", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Alexandra-Sokoloff.jpg?fit=699%2C1000&ssl=1" },
      { id: "pt5", title: "Ariana Casobian", titleRu: "Ариана Касобян", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Ariana-Casobian.jpg?fit=709%2C1000&ssl=1" },
      { id: "pt6", title: "Baron von Kristy", titleRu: "Барон фон Кристи", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/BARON-von-Kristy.jpg?fit=1000%2C620&ssl=1" },
      { id: "pt7", title: "Countess Zavodovsky", titleRu: "Графиня Заводовская", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Contess-Zavodovsky-Sokol.jpg?fit=819%2C1000&ssl=1" },
      { id: "pt8", title: "Granddaughter of Sava Mamontov", titleRu: "Внучка Саввы Мамонтова", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Drand-Daughter-of-Sava-Ma.jpg?fit=1000%2C839&ssl=1" },
      { id: "pt9", title: "Dr. Hrenov", titleRu: "Доктор Хренов", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Dr-Hrenov.jpg?fit=772%2C1000&ssl=1" },
      { id: "pt10", title: "Dr. Murahovsky", titleRu: "Доктор Мураховский", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Dr-Murahovsky.jpg?fit=837%2C1000&ssl=1" },
      { id: "pt11", title: "General San Martin", titleRu: "Генерал Сан-Мартин", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/General-San-Martin.jpg?fit=649%2C1000&ssl=1" },
      { id: "pt12", title: "Gromadsky Daughter", titleRu: "Дочь Громадского", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Gromadsky-Daughter.jpg?fit=665%2C1000&ssl=1" },
      { id: "pt13", title: "Gromadsky Junior", titleRu: "Громадский-младший", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Gromadsky-Junior.jpg?fit=689%2C1000&ssl=1" },
      { id: "pt14", title: "Mrs. Gromadsky", titleRu: "Госпожа Громадская", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Mrs-Gromadsky.jpg?fit=700%2C1000&ssl=1" },
      { id: "pt15", title: "Nicholay Rogoff", titleRu: "Николай Рогов", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Nicholay-Rogoff.jpg?fit=747%2C1000&ssl=1" },
      { id: "pt16", title: "The Last Love Night", titleRu: "Последняя ночь любви", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/ORU-5-The-last-love-night.jpg?fit=1024%2C723&ssl=1" },
      { id: "pt17", title: "President's Wife", titleRu: "Жена президента", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/President-Wife.jpg?fit=749%2C1000&ssl=1" },
      { id: "pt18", title: "Princess of Liechtenstein", titleRu: "Княгиня Лихтенштейнская", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Pricess-of-Liechtenstein.jpg?fit=712%2C1000&ssl=1" },
      { id: "pt19", title: "Princess Kochubey", titleRu: "Княжна Кочубей", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Princess-Kochubey.jpg?fit=823%2C1000&ssl=1" },
      { id: "pt20", title: "Soldier", titleRu: "Солдат", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Soldier.jpg?fit=741%2C1000&ssl=1" },
      { id: "pt21", title: "Sra. Casobian", titleRu: "Сеньора Касобян", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Sra-Casobian.jpg?fit=731%2C1000&ssl=1" },
      { id: "pt22", title: "Sra. Lezhnev", titleRu: "Сеньора Лежнева", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Sra-Lezhnev.jpg?fit=621%2C1000&ssl=1" },
      { id: "pt23", title: "Sra. Muchitarov", titleRu: "Сеньора Мучитарова", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Sra-Muchitarov.jpg?fit=741%2C1000&ssl=1" },
      { id: "pt24", title: "Sra. Novodny", titleRu: "Сеньора Новодная", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Sra-Novodny.jpg?fit=1000%2C837&ssl=1" },
      { id: "pt25", title: "Sra. Olga", titleRu: "Сеньора Ольга", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/Sra-Olga.jpg?fit=872%2C1000&ssl=1" },
      { id: "pt26", title: "Wife of Son Igor", titleRu: "Жена сына Игоря", image: "https://i0.wp.com/anatoliosokoloff.com/wp-content/uploads/2023/09/WIFE-of-SON-IGOR.jpg?fit=708%2C1000&ssl=1" },
    ]
  }
};

const categoryOrder = ['unitedStates', 'troikas', 'europe', 'argentina', 'russia', 'portraits'];

function GalleryCard({ gallery, categoryKey, onClick, index }) {
  const { language } = useLanguage();
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className="relative group cursor-pointer"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="relative h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden"
        style={{
          rotateX: isHovered ? (mousePos.y - 0.5) * -10 : 0,
          rotateY: isHovered ? (mousePos.x - 0.5) * 10 : 0,
          transformStyle: 'preserve-3d',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Background Image Stack */}
        <div className="absolute inset-0">
          {gallery.artworks.slice(0, 3).map((artwork, i) => (
            <motion.img
              key={artwork.id}
              src={artwork.image}
              alt={language === 'ru' ? artwork.titleRu : artwork.title}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                zIndex: 3 - i,
                transform: `translateZ(${(3 - i) * 10}px)`,
              }}
              animate={{
                scale: isHovered ? 1.1 : 1,
                x: isHovered ? (i * 5) : 0,
                y: isHovered ? (i * 5) : 0,
              }}
              transition={{ duration: 0.4 }}
            />
          ))}
        </div>

        {/* Dark Gradient Overlay for better text readability */}
        <div 
          className="absolute inset-0 z-10"
          style={{
            background: `linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.9) 100%)`
          }}
        />

        {/* Colored accent overlay */}
        <div 
          className="absolute inset-0 z-10 opacity-30"
          style={{
            background: `linear-gradient(135deg, ${gallery.color}40 0%, transparent 70%)`
          }}
        />

        {/* Shine Effect */}
        <motion.div
          className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255,255,255,0.2) 0%, transparent 50%)`
          }}
        />

        {/* Content */}
        <div className="absolute inset-0 z-30 p-4 md:p-6 flex flex-col justify-end">
          <motion.div
            animate={{ y: isHovered ? -10 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div 
              className="w-10 md:w-12 h-1 rounded-full mb-3 md:mb-4"
              style={{ backgroundColor: gallery.color }}
            />
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 md:mb-2 drop-shadow-lg">
              {language === 'ru' ? gallery.titleRu : gallery.title}
            </h3>
            <p className="text-white/90 text-xs md:text-sm mb-3 md:mb-4 line-clamp-2 drop-shadow-md bg-black/30 backdrop-blur-sm rounded px-2 py-1 inline-block">
              {language === 'ru' ? gallery.descriptionRu : gallery.description}
            </p>
            <div className="flex items-center gap-2 text-white/90">
              <span className="text-xs md:text-sm font-medium bg-black/40 backdrop-blur-sm rounded-full px-3 py-1">
                {gallery.artworks.length} {language === 'ru' ? 'работ' : 'artworks'}
              </span>
              <motion.div
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Border Glow */}
        <motion.div
          className="absolute inset-0 z-40 rounded-2xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ borderColor: gallery.color }}
        />
      </motion.div>
    </motion.div>
  );
}

function FullGalleryViewer({ gallery, categoryKey, onClose }) {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);

  const artworks = gallery.artworks;
  const currentArtwork = artworks[currentIndex];

  const goNext = () => setCurrentIndex((prev) => (prev + 1) % artworks.length);
  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + artworks.length) % artworks.length);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle touch swipe
  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-50 p-4 md:p-6 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
        <div>
          <h2 className="text-lg md:text-2xl font-bold text-white">
            {language === 'ru' ? gallery.titleRu : gallery.title}
          </h2>
          <p className="text-gray-400 text-xs md:text-sm">
            {currentIndex + 1} / {artworks.length}
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </button>
      </div>

      {/* Main Image */}
      <div className="absolute inset-0 flex items-center justify-center p-4 pt-16 pb-28 md:pt-20 md:pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentArtwork.id}
            initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            transition={{ duration: 0.4 }}
            className="relative max-w-full max-h-full"
            style={{ perspective: '1000px' }}
          >
            <img
              src={currentArtwork.image}
              alt={language === 'ru' ? currentArtwork.titleRu : currentArtwork.title}
              className="max-w-full max-h-[55vh] md:max-h-[65vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
              <h3 className="text-white text-base md:text-xl font-medium">
                {language === 'ru' ? currentArtwork.titleRu : currentArtwork.title}
              </h3>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goPrev}
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
      >
        <ChevronLeft className="w-5 h-5 md:w-8 md:h-8 text-white" />
      </button>
      <button
        onClick={goNext}
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
      >
        <ChevronRight className="w-5 h-5 md:w-8 md:h-8 text-white" />
      </button>

      {/* Thumbnail Strip */}
      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black to-transparent">
        <div className="flex gap-1.5 md:gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {artworks.map((artwork, index) => (
            <motion.button
              key={artwork.id}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 relative rounded-md md:rounded-lg overflow-hidden transition-all ${
                index === currentIndex ? 'ring-2 ring-white scale-105' : 'opacity-50 hover:opacity-80'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={artwork.image}
                alt={language === 'ru' ? artwork.titleRu : artwork.title}
                className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 object-cover"
              />
            </motion.button>
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </motion.div>
  );
}

export default function InteractiveGallery() {
  const { t, language } = useLanguage();
  const [selectedGallery, setSelectedGallery] = useState(null);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section 
      ref={sectionRef}
      id="gallery"
      className="relative bg-zinc-950 py-16 md:py-24 lg:py-32 overflow-hidden"
    >
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-1/4 left-10 w-64 md:w-96 h-64 md:h-96 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-48 md:w-64 h-48 md:h-64 bg-purple-500/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <p className="text-red-500 text-xs md:text-sm tracking-widest uppercase mb-3 md:mb-4">
            {t('collectionLabel')}
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-white mb-4 md:mb-6">
            {t('theGalleria')} <span className="font-bold">{t('galleriaBold')}</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto px-4">
            {language === 'ru' 
              ? 'Исследуйте обширную коллекцию произведений искусства из разных периодов жизни художника'
              : 'Explore the extensive collection of artworks from different periods of the artist\'s life'}
          </p>
          <div className="w-16 md:w-24 h-0.5 bg-red-500 mx-auto mt-4 md:mt-6" />
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {categoryOrder.map((key, index) => (
            <GalleryCard
              key={key}
              gallery={galleries[key]}
              categoryKey={key}
              index={index}
              onClick={() => setSelectedGallery(key)}
            />
          ))}
        </div>
      </div>

      {/* Full Gallery Viewer */}
      <AnimatePresence>
        {selectedGallery && (
          <FullGalleryViewer
            gallery={galleries[selectedGallery]}
            categoryKey={selectedGallery}
            onClose={() => setSelectedGallery(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
