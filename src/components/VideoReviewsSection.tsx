'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const videoReviews = [
  {
    id: 'review-1',
    customerName: 'Юрий М.',
    location: 'Волгоград',
    carModel: 'BMW 6-SERIES',
    coverImage: '/assets/bmw-6.jpg',
    vkEmbedUrl: 'https://vk.com/video_ext.php?oid=-65024227&id=456239220&hd=2&autoplay=1',
    action: 'Смотреть'
  },
  {
    id: 'review-2',
    customerName: 'Евгений А.',
    location: 'Москва',
    carModel: 'Honda CR-V',
    coverImage: '/assets/mercedes-eclass.jpg',
    vkEmbedUrl: 'https://vk.com/video_ext.php?oid=-65024227&id=456239289&hd=2&autoplay=1',
    action: 'Смотреть'
  },
  {
    id: 'review-3',
    customerName: 'Павел С.',
    location: 'Москва',
    carModel: 'Volkswagen Golf',
    coverImage: '/assets/mercedes-glc.jpg',
    vkEmbedUrl: 'https://vk.com/video_ext.php?oid=-65024227&id=456239289&hd=2&autoplay=1',
    action: 'Смотреть'
  },
  {
    id: 'review-4',
    customerName: 'Марина С.',
    location: 'Санкт-Петербург',
    carModel: 'JEEP Wrangler',
    coverImage: '/assets/mercedes-vito.jpg',
    vkEmbedUrl: 'https://vk.com/video_ext.php?oid=-65024227&id=456239289&hd=2&autoplay=1',
    action: 'Смотреть'
  },
  {
    id: 'review-5',
    customerName: 'Александр К.',
    location: 'Екатеринбург',
    carModel: 'Toyota Camry',
    coverImage: '/assets/haval.jpg',
    vkEmbedUrl: 'https://vk.com/video_ext.php?oid=-65024227&id=456239289&hd=2&autoplay=1',
    action: 'Смотреть'
  },
  {
    id: 'review-6',
    customerName: 'Анна В.',
    location: 'Новосибирск',
    carModel: 'Hyundai Tucson',
    coverImage: '/assets/hyunday.jpg',
    vkEmbedUrl: 'https://vk.com/video_ext.php?oid=-65024227&id=456239289&hd=2&autoplay=1',
    action: 'Смотреть'
  }
];

export default function VideoReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVideo, setModalVideo] = useState<string | null>(null);
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);
  const [cardsPerView, setCardsPerView] = useState(5);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const reviewCardsRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Calculate cards per view based on screen size
  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width < 480) setCardsPerView(1); // small mobile
      else if (width < 640) setCardsPerView(2); // large mobile
      else if (width < 768) setCardsPerView(2); // small tablet
      else if (width < 1024) setCardsPerView(3); // iPad Air/Pro portrait
      else if (width < 1280) setCardsPerView(4); // iPad Pro landscape / small desktop
      else setCardsPerView(5); // desktop and larger (max 5 cards)
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const scrollToNext = () => {
    if (currentIndex < videoReviews.length - cardsPerView) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const scrollToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const openModal = (reviewId: string) => {
    setModalVideo(reviewId);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setModalVideo(null);
          document.body.style.overflow = 'unset';
        }
      });
    }
  };

  // Animate modal entrance
  useEffect(() => {
    if (modalVideo && modalRef.current) {
      gsap.fromTo(modalRef.current, 
        { 
          opacity: 0, 
          scale: 0.8 
        },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.4, 
          ease: "back.out(1.7)" 
        }
      );
    }
  }, [modalVideo]);

  // Animate review cards on mount
  useEffect(() => {
    if (reviewCardsRef.current) {
      const cards = reviewCardsRef.current.querySelectorAll('.review-card');
      
      gsap.fromTo(cards, 
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
          rotationY: 15
        },
        {
          opacity: (index: number) => index < cardsPerView ? 1 : 0.5, // Respect visibility logic
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.4)",
          delay: 0.2
        }
      );
    }
  }, []);


  return (
    <section className="max-w-[1920px] w-full bg-white mx-auto relative py-16 px-4 sm:px-6 lg:px-20">
      {/* Section Header */}
      <div className="text-center mb-12">
        <p className="text-gray-500 text-md font-normal tracking-wide mb-2"># Отзывы</p>
        <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
          Отзывы наших клиентов
        </h2>
      </div>

      {/* Video Reviews Container */}
      <div className="relative">
        {/* Navigation Buttons */}
        {currentIndex > 0 && (
          <button
            onClick={scrollToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl cursor-pointer"
          >
            <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {currentIndex < videoReviews.length - cardsPerView && (
          <button
            onClick={scrollToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl cursor-pointer"
          >
            <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Videos Container */}
        <div>
          <div 
            ref={reviewCardsRef}
            className="flex transition-transform duration-500 ease-in-out gap-3 sm:gap-4 lg:gap-6"
            style={{ 
              transform: `translateX(-${currentIndex * (cardsPerView === 1 ? 290 : cardsPerView === 2 ? 176 : cardsPerView === 3 ? 196 : cardsPerView === 4 ? 216 : 304)}px)` // Responsive card spacing
            }}
          >
            {videoReviews.map((review, index) => {
              const isVisible = index >= currentIndex && index < currentIndex + cardsPerView;
              
              return (
                <div
                  key={review.id}
                  className="review-card flex-shrink-0 w-[280px] sm:w-[160px] md:w-[180px] lg:w-[280px] transition-opacity duration-300"
                  style={{ 
                    opacity: isVisible ? 1 : 0.5
                  }}
                >
                  <div
                    className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-2 hover:scale-105 transition-all duration-300 cursor-pointer group"
                    style={{ aspectRatio: '9/16' }}
                    onClick={() => openModal(review.id)}
                    onMouseEnter={() => setHoveredVideo(review.id)}
                    onMouseLeave={() => setHoveredVideo(null)}
                  >
                    {/* Cover Image */}
                    <div className="relative w-full h-full">
                      <Image
                        src={review.coverImage}
                        alt={`${review.customerName} review`}
                        fill
                        className="object-cover"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      
                      {/* Play Button - Show on Hover */}
                      {hoveredVideo === review.id && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300">
                            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>
                      )}


                      {/* Customer Info */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-semibold text-lg mb-1">
                          {review.customerName} <span className="text-sm font-normal">({review.location})</span>
                        </h3>
                        <p className="text-white/90 text-sm mb-3">{review.carModel}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-white text-sm">{review.action}</span>
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {modalVideo && (
        <div 
          ref={modalRef}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="relative bg-black rounded-2xl overflow-hidden shadow-2xl w-full max-w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl"
            style={{ aspectRatio: '9/16' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* VK Video Iframe */}
            <iframe
              src={videoReviews.find(v => v.id === modalVideo)?.vkEmbedUrl}
              className="w-full h-full"
              style={{ backgroundColor: '#000' }}
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Bottom Link */}
      <div className="text-center mt-12">
        <button className="text-gray-500 border border-gray-300 px-8 py-3 rounded-full hover:border-gray-400 hover:text-gray-600 transition-colors font-medium">
          Посмотреть отзывы
        </button>
        <p className="text-gray-400 text-sm mt-4">
          Больше отзывов на нашей странице в ВКонтакте
        </p>
      </div>
    </section>
  );
}