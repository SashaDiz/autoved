'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Card from './Card';
import { loadAdminData, loadAdminDataSync, CarCard } from '@/utils/adminData';

export default function CardsSection() {
  // State to track how many cards to show
  const [visibleCards, setVisibleCards] = useState(8);
  const [cardsData, setCardsData] = useState<{title: string; subtitle: string; cards: CarCard[]} | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [previousVisibleCount, setPreviousVisibleCount] = useState(8);

  // Load dynamic data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadAdminData();
        setCardsData(data.cards);
      } catch (error) {
        console.error('Failed to load cards data:', error);
        // Fallback to default data
        const fallbackData = loadAdminDataSync();
        setCardsData(fallbackData.cards);
      }
    };
    
    fetchData();
  }, []);

  const carData = cardsData?.cards || [];

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

  if (!cardsData) {
    return (
      <div className="max-w-[1920px] w-full mx-auto relative py-10 sm:py-16 px-4 sm:px-6 xl:px-20">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-[1920px] w-full mx-auto relative py-10 sm:py-16 px-4 sm:px-6 xl:px-20">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl xl:text-5xl font-semibold text-gray-900 mb-6">
          {cardsData.title}
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed max-w-4xl mx-auto">
          {cardsData.subtitle}
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16 auto-rows-fr">
        {cardsToShow.map((car, index) => (
          <div
            key={car.id}
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