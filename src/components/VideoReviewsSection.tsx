'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { loadAdminData, loadAdminDataSync } from '@/utils/adminData';

export default function VideoReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVideo, setModalVideo] = useState<string | null>(null);
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);
  const [cardsPerView, setCardsPerView] = useState(5);
  const [isIframeLoading, setIsIframeLoading] = useState(false);
  const [videoReviews, setVideoReviews] = useState<{id: string; customerName: string; location: string; carModel: string; coverImage: string; vkEmbedUrl: string; action: string}[]>([]);
  const reviewCardsRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Load dynamic data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadAdminData();
        setVideoReviews(data.videoReviews);
      } catch (error) {
        console.error('Failed to load video reviews data:', error);
        // Fallback to default data
        const fallbackData = loadAdminDataSync();
        setVideoReviews(fallbackData.videoReviews);
      }
    };
    
    fetchData();
  }, []);

  // Calculate cards per view based on screen size
  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width < 480) setCardsPerView(1); // small mobile
      else if (width < 640) setCardsPerView(1); // large mobile - keep single column
      else if (width < 768) setCardsPerView(2); // small tablet
      else if (width < 1024) setCardsPerView(2); // iPad Air/Pro portrait - reduce to 2
      else if (width < 1280) setCardsPerView(3); // iPad Pro landscape / small desktop
      else if (width < 1440) setCardsPerView(4); // medium desktop
      else setCardsPerView(5); // large desktop (max 5 cards)
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
    setIsIframeLoading(true);
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
          setIsIframeLoading(false);
          document.body.style.overflow = 'unset';
        }
      });
    }
  };

  const handleIframeLoad = () => {
    setIsIframeLoading(false);
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
  }, [cardsPerView]);


  return (
    <section className="max-w-[1920px] w-full bg-white mx-auto relative py-12 pb-20 sm:py-12 xl:py-16 px-4 sm:px-6 xl:px-20 overflow-x-hidden">
      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-20 xl:mb-24">
        <p className="text-gray-500 text-md font-normal tracking-wide mb-2"># Отзывы</p>
        <h2 className="text-4xl xl:text-5xl font-semibold text-gray-900 mb-4">
          Отзывы наших клиентов
        </h2>
      </div>

      {/* Video Reviews Container */}
      <div className="relative">
        {/* Navigation Buttons */}
        {currentIndex > 0 && (
          <button
            onClick={scrollToPrev}
            className="absolute left-0 sm:-left-2 xl:left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl cursor-pointer"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {currentIndex < videoReviews.length - cardsPerView && (
          <button
            onClick={scrollToNext}
            className="absolute right-0 sm:-right-2 xl:right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl cursor-pointer"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Videos Container */}
        <div className="relative">
          <div
            ref={reviewCardsRef}
            className="flex transition-transform duration-500 ease-in-out gap-2 sm:gap-3 md:gap-4 xl:gap-6"
            style={{
              transform: `translateX(${cardsPerView === 1 ? `calc(50vw - 50% - ${currentIndex * 220}px + 8px)` : `-${currentIndex * (cardsPerView === 2 ? 180 : cardsPerView === 3 ? 200 : cardsPerView === 4 ? 220 : 304)}px`})` // Responsive card spacing with mobile centering
            }}
          >
            {videoReviews.map((review, index) => {
              const isVisible = index >= currentIndex && index < currentIndex + cardsPerView;
              const isMobile = cardsPerView === 1;
              const isCurrentCard = isMobile && index === currentIndex;
              const isSideCard = isMobile && (index === currentIndex - 1 || index === currentIndex + 1);

              return (
                <div
                  key={review.id}
                  className="review-card flex-shrink-0 w-[220px] xl:w-[280px] transition-all duration-300"
                  style={{
                    opacity: isMobile ? (isCurrentCard ? 1 : isSideCard ? 0.4 : 0.1) : (isVisible ? 1 : 0.5),
                    transform: isMobile && isCurrentCard ? 'scale(1)' : isMobile && isSideCard ? 'scale(0.85)' : isMobile ? 'scale(0.7)' : 'scale(1)'
                  }}
                >
                  <div
                    className="relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 sm:hover:-translate-y-2 hover:scale-[1.02] sm:hover:scale-105 transition-all duration-300 cursor-pointer group"
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
                          <div className="w-12 h-12 sm:w-14 sm:h-14 xl:w-16 xl:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300">
                            <svg className="w-7 h-7 sm:w-8 sm:h-8 xl:w-10 xl:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      )}


                      {/* Customer Info */}
                      <div className="absolute bottom-2 sm:bottom-3 xl:bottom-4 left-2 sm:left-3 xl:left-4 right-2 sm:right-3 xl:right-4">
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
            className="relative bg-black rounded-2xl overflow-hidden shadow-2xl w-full max-w-[90vw] sm:max-w-md md:max-w-xl xl:max-w-xl"
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

            {/* Loading Spinner */}
            {isIframeLoading && (
              <div className="absolute inset-0 bg-black/95 flex items-center justify-center z-20">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4"></div>
                  <p className="text-white/80 text-sm">Загрузка видео...</p>
                </div>
              </div>
            )}

            {/* VK Video Iframe */}
            <iframe
              src={videoReviews.find(v => v.id === modalVideo)?.vkEmbedUrl}
              className="w-full h-full"
              style={{ backgroundColor: '#000', border: 'none' }}
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
              allowFullScreen
              onLoad={handleIframeLoad}
              loading="eager"
            />
          </div>
        </div>
      )}

      {/* Bottom Link */}
      <div className="text-center mt-8 sm:mt-10 xl:mt-12">
        <button className="text-gray-500 border border-gray-300 px-8 py-3 rounded-full hover:border-gray-400 hover:text-gray-600 transition-colors font-medium">
          Посмотреть отзывы
        </button>
        <p className="text-gray-400 text-sm mt-4 px-4">
          Больше отзывов на нашей странице в ВКонтакте
        </p>
      </div>
    </section>
  );
}