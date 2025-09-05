'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Card from './Card';

// Sample car data - replace with real data from your API/database
const carData = [
  {
    title: "Hyundai Tucson",
    engine: "Двигатель 2.0 л., 186 л.с. (дизель)",
    drive: "2WD",
    modification: "Premium",
    distance: "68 500 км.",
    imageUrl: "/assets/hyunday.jpg",
    externalLink: "https://auto.ru/cars/hyundai/tucson/",
    price: "2 670 000 ₽",
    year: "2022 год / 05 месяц (дата регистрации)",
    location: "KR",
    isNew: false,
    date: "27 июля"
  },
  {
    title: "Jeep Wrangler",
    engine: "2.0T л., 266 л.с.",
    drive: "4WD",
    modification: "Sahara",
    distance: "8 000 км.",
    imageUrl: "/assets/jeep.jpg",
    externalLink: "https://auto.ru/cars/jeep/wrangler/",
    price: "4 500 000 ₽",
    year: "2021 год / 08 месяц (дата регистрации)",
    location: "CN",
    isNew: false,
    date: "27 июля"
  },
  {
    title: "Mercedes-Benz GLC",
    engine: "2.0T л., 258 л.с.",
    drive: "4WD",
    modification: "GLC300L 4MATIC Dynamic Edition",
    distance: "47 000 км.",
    imageUrl: "/assets/mercedes-glc.jpg",
    externalLink: "https://auto.ru/cars/mercedes/glc_class/",
    price: "4 190 000 ₽",
    year: "2022 год / 06 месяц (дата регистрации)",
    location: "CN",
    isNew: false,
    date: "27 июля"
  },
  {
    title: "BMW X1",
    engine: "2.0T л., 204 л.с.",
    drive: "2WD",
    modification: "sDrive25Li",
    distance: "32 000 км.",
    imageUrl: "/assets/bmw-x1.jpg",
    externalLink: "https://auto.ru/cars/bmw/x1/",
    price: "3 350 000 ₽",
    year: "2022 год / 09 месяц (дата регистрации)",
    location: "CN",
    isNew: false,
    date: "27 июля"
  },
  {
    title: "Mercedes-Benz E-Class",
    engine: "2.0T л., 197 л.с.",
    drive: "2WD",
    modification: "E260L",
    distance: "0 км.",
    imageUrl: "/assets/mercedes-eclass.jpg",
    externalLink: "https://auto.ru/cars/mercedes/e_class/",
    price: "3 490 000 ₽",
    year: "2025 год",
    location: "CN",
    isNew: true,
    date: "27 июля"
  },
  {
    title: "Mercedes-Benz Vito",
    engine: "2.0T л., 211 л.с.",
    drive: "2WD",
    modification: "Elite Edition 7-seats",
    distance: "40 000 км.",
    imageUrl: "/assets/mercedes-vito.jpg",
    externalLink: "https://auto.ru/cars/mercedes/vito/",
    price: "3 790 000 ₽",
    year: "2021 год / 12 месяц (дата регистрации)",
    location: "CN",
    isNew: false,
    date: "27 июля"
  },
  {
    title: "BMW 6-SERIES",
    engine: "2.0T л., 258 л.с.",
    drive: "RWD",
    modification: "GT 630i M Sport Touring",
    distance: "44 000 км.",
    imageUrl: "/assets/bmw-6.jpg",
    externalLink: "https://auto.ru/cars/bmw/6er_gt/",
    price: "3 950 000 ₽",
    year: "2022 год / 01 месяц",
    location: "DE",
    isNew: false,
    date: "27 июля"
  },
  {
    title: "Haval Dargo",
    engine: "1.5T л., 167 л.с. (гибрид)",
    drive: "4WD",
    modification: "PHEV Hi4 5-Pro",
    distance: "14 000 км.",
    imageUrl: "/assets/haval.jpg",
    externalLink: "https://auto.ru/cars/haval/dargo/",
    price: "3 100 000 ₽",
    year: "2025 год",
    location: "CN",
    isNew: true,
    date: "27 июля"
  },
  {
    title: "Toyota Camry",
    engine: "2.5 л., 181 л.с.",
    drive: "FWD",
    modification: "Comfort",
    distance: "25 000 км.",
    imageUrl: "/assets/hyunday.jpg",
    externalLink: "https://auto.ru/cars/toyota/camry/",
    price: "2 890 000 ₽",
    year: "2023 год / 03 месяц (дата регистрации)",
    location: "JP",
    isNew: false,
    date: "28 июля"
  },
  {
    title: "Volkswagen Tiguan",
    engine: "2.0T л., 190 л.с.",
    drive: "4WD",
    modification: "Highline",
    distance: "18 500 км.",
    imageUrl: "/assets/jeep.jpg",
    externalLink: "https://auto.ru/cars/volkswagen/tiguan/",
    price: "3 650 000 ₽",
    year: "2022 год / 11 месяц (дата регистрации)",
    location: "DE",
    isNew: false,
    date: "28 июля"
  },
  {
    title: "Audi Q5",
    engine: "2.0T л., 249 л.с.",
    drive: "4WD",
    modification: "45 TFSI quattro Sport",
    distance: "22 000 км.",
    imageUrl: "/assets/mercedes-glc.jpg",
    externalLink: "https://auto.ru/cars/audi/q5/",
    price: "4 850 000 ₽",
    year: "2023 год / 02 месяц (дата регистрации)",
    location: "DE",
    isNew: false,
    date: "28 июля"
  },
  {
    title: "Honda CR-V",
    engine: "1.5T л., 193 л.с.",
    drive: "4WD",
    modification: "Prestige",
    distance: "31 000 км.",
    imageUrl: "/assets/bmw-x1.jpg",
    externalLink: "https://auto.ru/cars/honda/cr-v/",
    price: "3 250 000 ₽",
    year: "2022 год / 07 месяц (дата регистрации)",
    location: "JP",
    isNew: false,
    date: "28 июля"
  },
  {
    title: "Porsche Macan",
    engine: "2.0T л., 245 л.с.",
    drive: "4WD",
    modification: "Base",
    distance: "15 000 км.",
    imageUrl: "/assets/mercedes-eclass.jpg",
    externalLink: "https://auto.ru/cars/porsche/macan/",
    price: "5 890 000 ₽",
    year: "2023 год / 01 месяц (дата регистрации)",
    location: "DE",
    isNew: false,
    date: "29 июля"
  },
  {
    title: "Genesis GV70",
    engine: "2.5T л., 304 л.с.",
    drive: "4WD",
    modification: "Luxury AWD",
    distance: "8 500 км.",
    imageUrl: "/assets/mercedes-vito.jpg",
    externalLink: "https://auto.ru/cars/genesis/gv70/",
    price: "4 950 000 ₽",
    year: "2024 год / 01 месяц (дата регистрации)",
    location: "KR",
    isNew: false,
    date: "29 июля"
  },
  {
    title: "Lexus NX",
    engine: "2.4T л., 275 л.с.",
    drive: "4WD",
    modification: "350 AWD F Sport",
    distance: "12 000 км.",
    imageUrl: "/assets/bmw-6.jpg",
    externalLink: "https://auto.ru/cars/lexus/nx/",
    price: "5 450 000 ₽",
    year: "2023 год / 05 месяц (дата регистрации)",
    location: "JP",
    isNew: false,
    date: "29 июля"
  },
  {
    title: "BYD Tang",
    engine: "Электро + 2.0T (гибрид)",
    drive: "4WD",
    modification: "DM-i 4WD Premium",
    distance: "5 200 км.",
    imageUrl: "/assets/haval.jpg",
    externalLink: "https://auto.ru/cars/byd/tang/",
    price: "4 200 000 ₽",
    year: "2024 год",
    location: "CN",
    isNew: true,
    date: "29 июля"
  },
  {
    title: "Chery Tiggo 8",
    engine: "2.0T л., 254 л.с.",
    drive: "4WD",
    modification: "Pro Max AWD",
    distance: "19 000 км.",
    imageUrl: "/assets/hyunday.jpg",
    externalLink: "https://auto.ru/cars/chery/tiggo_8/",
    price: "2 750 000 ₽",
    year: "2023 год / 04 месяц (дата регистрации)",
    location: "CN",
    isNew: false,
    date: "30 июля"
  },
  {
    title: "Ford Explorer",
    engine: "2.3T л., 276 л.с.",
    drive: "4WD",
    modification: "Limited AWD",
    distance: "28 000 км.",
    imageUrl: "/assets/jeep.jpg",
    externalLink: "https://auto.ru/cars/ford/explorer/",
    price: "4 650 000 ₽",
    year: "2022 год / 09 месяц (дата регистрации)",
    location: "CN",
    isNew: false,
    date: "30 июля"
  },
  {
    title: "Infiniti QX60",
    engine: "2.5 л., 249 л.с.",
    drive: "4WD",
    modification: "Luxe AWD",
    distance: "16 500 км.",
    imageUrl: "/assets/mercedes-glc.jpg",
    externalLink: "https://auto.ru/cars/infiniti/qx60/",
    price: "4 350 000 ₽",
    year: "2023 год / 03 месяц (дата регистрации)",
    location: "JP",
    isNew: false,
    date: "30 июля"
  },
  {
    title: "Mazda CX-5",
    engine: "2.5 л., 194 л.с.",
    drive: "4WD",
    modification: "Supreme AWD",
    distance: "23 500 км.",
    imageUrl: "/assets/bmw-x1.jpg",
    externalLink: "https://auto.ru/cars/mazda/cx-5/",
    price: "3 150 000 ₽",
    year: "2022 год / 12 месяц (дата регистрации)",
    location: "JP",
    isNew: false,
    date: "30 июля"
  },
  {
    title: "Volvo XC60",
    engine: "2.0T л., 250 л.с.",
    drive: "4WD",
    modification: "B5 AWD Momentum",
    distance: "20 000 км.",
    imageUrl: "/assets/mercedes-eclass.jpg",
    externalLink: "https://auto.ru/cars/volvo/xc60/",
    price: "4 750 000 ₽",
    year: "2023 год / 02 месяц (дата регистрации)",
    location: "DE",
    isNew: false,
    date: "31 июля"
  },
  {
    title: "Geely Coolray",
    engine: "1.5T л., 177 л.с.",
    drive: "FWD",
    modification: "Flag",
    distance: "11 000 км.",
    imageUrl: "/assets/mercedes-vito.jpg",
    externalLink: "https://auto.ru/cars/geely/coolray/",
    price: "2 450 000 ₽",
    year: "2023 год / 06 месяц (дата регистрации)",
    location: "CN",
    isNew: false,
    date: "31 июля"
  },
  {
    title: "Land Rover Discovery Sport",
    engine: "2.0T л., 249 л.с.",
    drive: "4WD",
    modification: "SE AWD",
    distance: "35 000 км.",
    imageUrl: "/assets/bmw-6.jpg",
    externalLink: "https://auto.ru/cars/land_rover/discovery_sport/",
    price: "5 250 000 ₽",
    year: "2022 год / 05 месяц (дата регистрации)",
    location: "DE",
    isNew: false,
    date: "31 июля"
  },
  {
    title: "Kia Sportage",
    engine: "2.0 л., 150 л.с.",
    drive: "4WD",
    modification: "Premium AWD",
    distance: "17 500 км.",
    imageUrl: "/assets/haval.jpg",
    externalLink: "https://auto.ru/cars/kia/sportage/",
    price: "3 350 000 ₽",
    year: "2023 год / 01 месяц (дата регистрации)",
    location: "KR",
    isNew: false,
    date: "1 августа"
  },
  {
    title: "Mitsubishi Outlander",
    engine: "2.4 л., 167 л.с.",
    drive: "4WD",
    modification: "Instyle AWD",
    distance: "26 000 км.",
    imageUrl: "/assets/hyunday.jpg",
    externalLink: "https://auto.ru/cars/mitsubishi/outlander/",
    price: "2 950 000 ₽",
    year: "2022 год / 08 месяц (дата регистрации)",
    location: "JP",
    isNew: false,
    date: "1 августа"
  },
  {
    title: "Subaru Forester",
    engine: "2.5 л., 185 л.с.",
    drive: "4WD",
    modification: "2.5i-S EyeSight",
    distance: "21 000 км.",
    imageUrl: "/assets/jeep.jpg",
    externalLink: "https://auto.ru/cars/subaru/forester/",
    price: "3 450 000 ₽",
    year: "2023 год / 03 месяц (дата регистрации)",
    location: "JP",
    isNew: false,
    date: "1 августа"
  },
  {
    title: "Great Wall Haval H6",
    engine: "2.0T л., 224 л.с.",
    drive: "4WD",
    modification: "Supreme AWD",
    distance: "13 500 км.",
    imageUrl: "/assets/mercedes-glc.jpg",
    externalLink: "https://auto.ru/cars/great_wall/haval_h6/",
    price: "2 850 000 ₽",
    year: "2023 год / 05 месяц (дата регистрации)",
    location: "CN",
    isNew: false,
    date: "2 августа"
  },
  {
    title: "Nissan X-Trail",
    engine: "2.5 л., 181 л.с.",
    drive: "4WD",
    modification: "LE Premium AWD",
    distance: "29 000 км.",
    imageUrl: "/assets/bmw-x1.jpg",
    externalLink: "https://auto.ru/cars/nissan/x-trail/",
    price: "3 550 000 ₽",
    year: "2022 год / 10 месяц (дата регистрации)",
    location: "JP",
    isNew: false,
    date: "2 августа"
  },
  {
    title: "Citroen C5 Aircross",
    engine: "1.6T л., 181 л.с.",
    drive: "FWD",
    modification: "Shine",
    distance: "24 000 км.",
    imageUrl: "/assets/mercedes-eclass.jpg",
    externalLink: "https://auto.ru/cars/citroen/c5_aircross/",
    price: "2 650 000 ₽",
    year: "2022 год / 06 месяц (дата регистрации)",
    location: "DE",
    isNew: false,
    date: "2 августа"
  },
  {
    title: "Renault Koleos",
    engine: "2.5 л., 171 л.с.",
    drive: "4WD",
    modification: "Intense CVT AWD",
    distance: "32 000 км.",
    imageUrl: "/assets/mercedes-vito.jpg",
    externalLink: "https://auto.ru/cars/renault/koleos/",
    price: "2 750 000 ₽",
    year: "2022 год / 04 месяц (дата регистрации)",
    location: "KR",
    isNew: false,
    date: "3 августа"
  },
  {
    title: "NIO ES8",
    engine: "Электро (двойной мотор)",
    drive: "4WD",
    modification: "75kWh AWD",
    distance: "7 500 км.",
    imageUrl: "/assets/bmw-6.jpg",
    externalLink: "https://auto.ru/cars/nio/es8/",
    price: "6 200 000 ₽",
    year: "2024 год",
    location: "CN",
    isNew: true,
    date: "3 августа"
  },
  {
    title: "Li Xiang ONE",
    engine: "1.2T + Электро (гибрид)",
    drive: "4WD",
    modification: "EREV AWD",
    distance: "9 000 км.",
    imageUrl: "/assets/haval.jpg",
    externalLink: "https://auto.ru/cars/li_xiang/one/",
    price: "4 850 000 ₽",
    year: "2024 год",
    location: "CN",
    isNew: true,
    date: "3 августа"
  }
];

export default function CardsSection() {
  // State to track how many cards to show
  const [visibleCards, setVisibleCards] = useState(8);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [previousVisibleCount, setPreviousVisibleCount] = useState(8);

  // Function to load more cards
  const loadMoreCards = () => {
    setPreviousVisibleCount(visibleCards);
    setVisibleCards(prev => prev + 16);
  };

  // Get the cards to display
  const cardsToShow = carData.slice(0, visibleCards);
  const hasMoreCards = visibleCards < carData.length;

  // GSAP animation for new cards
  useEffect(() => {
    if (visibleCards > previousVisibleCount) {
      // Animate only the newly added cards
      const newCards = cardsRef.current.slice(previousVisibleCount, visibleCards);
      
      // Set initial state for new cards with skew and rotation
      gsap.set(newCards, {
        opacity: 0,
        y: 80,
        scale: 0.7,
        rotation: () => gsap.utils.random(-15, 15),
        skewX: () => gsap.utils.random(-10, 10),
        skewY: () => gsap.utils.random(-5, 5),
        transformOrigin: "center center"
      });

      // Animate new cards with stagger and skew/rotation recovery
      gsap.to(newCards, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        skewX: 0,
        skewY: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "back.out(1.4)"
      });
    }
  }, [visibleCards, previousVisibleCount]);

  // Initial animation for first 8 cards
  useEffect(() => {
    const initialCards = cardsRef.current.slice(0, 8);
    
    gsap.set(initialCards, {
      opacity: 0,
      y: 80,
      scale: 0.7,
      rotation: () => gsap.utils.random(-15, 15),
      skewX: () => gsap.utils.random(-10, 10),
      skewY: () => gsap.utils.random(-5, 5),
      transformOrigin: "center center"
    });

    gsap.to(initialCards, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotation: 0,
      skewX: 0,
      skewY: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "back.out(1.4)",
      delay: 0.3
    });
  }, []);

  return (
    <section className="max-w-[1920px] w-full mx-auto relative py-10 sm:py-16 px-4 sm:px-6 xl:px-20">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl xl:text-5xl font-semibold text-gray-900 mb-6">
          Каталог авто
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed max-w-4xl mx-auto">
          Здесь представлена лишь небольшая часть автомобилей доступных для заказа 
          из Китая, Японии, Южной Кореи или Германии. Наличие уточняйте у менеджера.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 xl:grid-cols-4 gap-6 mb-16 auto-rows-fr">
        {cardsToShow.map((car, index) => (
          <div
            key={index}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
          >
            <Card
              title={car.title}
              engine={car.engine}
              drive={car.drive}
              modification={car.modification}
              distance={car.distance}
              imageUrl={car.imageUrl}
              externalLink={car.externalLink}
              price={car.price}
              year={car.year}
              location={car.location}
              isNew={car.isNew}
              date={car.date}
            />
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMoreCards && (
        <div className="text-center">
          <button 
            onClick={loadMoreCards}
            className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium px-8 py-3 rounded-full transition-all duration-300"
          >
            Загрузить больше
          </button>
        </div>
      )}
    </section>
  );
}
