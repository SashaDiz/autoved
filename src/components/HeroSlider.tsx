'use client';

import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { loadAdminData, loadAdminDataSync, HeroData, HeroSlide } from '@/utils/adminData';
import ContactModal from './ContactModal';

// Slider configuration
const SLIDER_CONFIG = {
  autoplayDelay: 5000,
  transitionDuration: 1200
};

// Hero Slider Component
const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressStartTimeRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Refs for GSAP animation
  const heroContentRef = useRef<HTMLDivElement>(null);
  const socialButtonsRef = useRef<HTMLDivElement>(null);
  const carInfoRef = useRef<HTMLDivElement>(null);
  const progressDotsRef = useRef<HTMLDivElement>(null);

  // Load dynamic data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadAdminData();
        setHeroData(data.hero);
      } catch (error) {
        console.error('Failed to load hero data:', error);
        // Fallback to default data
        const fallbackData = loadAdminDataSync();
        setHeroData(fallbackData.hero);
      }
    };
    
    fetchData();
  }, []);

  const slides = heroData?.slides || [];

  // Progress animation
  const startProgress = useCallback(() => {
    setProgress(0);
    progressStartTimeRef.current = Date.now();
    
    const updateProgress = () => {
      const elapsed = Date.now() - progressStartTimeRef.current;
      const newProgress = Math.min(elapsed / SLIDER_CONFIG.autoplayDelay, 1);
      setProgress(newProgress);
      
      if (newProgress < 1) {
        progressTimerRef.current = setTimeout(updateProgress, 50);
      }
    };
    
    updateProgress();
  }, []);

  const stopProgress = useCallback(() => {
    if (progressTimerRef.current) {
      clearTimeout(progressTimerRef.current);
      progressTimerRef.current = null;
    }
  }, []);

  // Autoplay functions
  const startAutoplay = useCallback(() => {
    if (slides.length <= 1) return;
    
    stopProgress();
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }
    
    autoplayTimerRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, SLIDER_CONFIG.autoplayDelay);
    
    startProgress();
  }, [slides.length, startProgress, stopProgress]);

  const stopAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
    stopProgress();
  }, [stopProgress]);

  // Go to specific slide
  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentSlide) return;
    
    setIsTransitioning(true);
    stopAutoplay();
    setCurrentSlide(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
      setTimeout(() => {
        startAutoplay();
      }, 300);
    }, SLIDER_CONFIG.transitionDuration);
  }, [currentSlide, isTransitioning, startAutoplay, stopAutoplay]);

  // Initialize autoplay
  useEffect(() => {
    startAutoplay();
    return () => {
      stopAutoplay();
    };
  }, [startAutoplay, stopAutoplay]);

  // Reset progress when slide changes
  useEffect(() => {
    if (!isTransitioning) {
      startProgress();
    }
  }, [currentSlide, isTransitioning, startProgress]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
      } else if (e.key === 'ArrowRight') {
        goToSlide((currentSlide + 1) % slides.length);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, goToSlide, slides.length]);

  // Touch navigation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let touchStartX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          goToSlide((currentSlide + 1) % slides.length);
        } else {
          goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
        }
      }
    };

    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSlide, goToSlide, slides.length]);

  // GSAP Hero Animation on component mount
  useEffect(() => {
    const heroContent = heroContentRef.current;
    const socialButtons = socialButtonsRef.current;
    const carInfo = carInfoRef.current;
    const progressDots = progressDotsRef.current;

    if (!heroContent || !socialButtons || !carInfo || !progressDots) return;

    // Get all animatable elements with null checks
    const heroTitle = heroContent.querySelector('h1');
    const heroDescription = heroContent.querySelector('p');
    const heroButton = heroContent.querySelector('button');
    const socialButtonsElements = socialButtons.querySelectorAll('button, span');
    const carInfoElements = carInfo.querySelectorAll('h3, p');
    const progressDotsElements = progressDots.querySelectorAll('button');

    // Check if elements exist before animating
    const heroElements = [heroTitle, heroDescription, heroButton].filter(Boolean);
    const socialElements = Array.from(socialButtonsElements).filter(Boolean);
    const carElements = Array.from(carInfoElements).filter(Boolean);
    const dotsElements = Array.from(progressDotsElements).filter(Boolean);

    if (heroElements.length === 0 && socialElements.length === 0 && carElements.length === 0 && dotsElements.length === 0) {
      console.warn('No GSAP animation elements found');
      return;
    }

    // Set initial states only for existing elements
    if (heroElements.length > 0) {
      gsap.set(heroElements, {
        opacity: 0,
        y: 60,
        scale: 0.9,
        rotationX: 15
      });
    }

    if (socialElements.length > 0) {
      gsap.set(socialElements, {
        opacity: 0,
        x: -40,
        scale: 0.8,
        rotation: -10
      });
    }

    if (carElements.length > 0) {
      gsap.set(carElements, {
        opacity: 0,
        x: 40,
        scale: 0.8,
        rotation: 10
      });
    }

    if (dotsElements.length > 0) {
      gsap.set(dotsElements, {
        opacity: 0,
        y: 30,
        scale: 0.6
      });
    }

    // Create timeline for hero animation
    const tl = gsap.timeline({ delay: 0.2 });

    // Animate hero content with stagger (only if elements exist)
    if (heroElements.length > 0) {
      tl.to(heroElements, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "back.out(1.4)"
      });
    }

    // Animate social buttons (only if elements exist)
    if (socialElements.length > 0) {
      tl.to(socialElements, {
        opacity: 1,
        x: 0,
        scale: 1,
        rotation: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: "back.out(1.7)"
      }, "-=0.4");
    }

    // Animate car info (only if elements exist)
    if (carElements.length > 0) {
      tl.to(carElements, {
        opacity: 1,
        x: 0,
        scale: 1,
        rotation: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: "back.out(1.7)"
      }, "-=0.3");
    }

    // Animate progress dots (only if elements exist)
    if (dotsElements.length > 0) {
      tl.to(dotsElements, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        stagger: 0.05,
        ease: "back.out(2)"
      }, "-=0.2");
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen max-h-[1200px] min-h-[600px] sm:min-h-[700px] overflow-hidden">
      {/* Background Images */}
      {slides.map((slide: HeroSlide, index: number) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1200 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-2' : 'opacity-0 z-1'
          }`}
        >
          <Image
            src={slide.backgroundImage}
            alt={`Car Background ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      ))}

      {/* Main Container for all content */}
      <div className="max-w-[1920px] w-full mx-auto relative z-10 h-full">
        {/* Static Content */}
        <div className="relative h-full flex items-end px-4 pb-16 sm:px-6 sm:pb-20 xl:px-20">
          <div className="max-w-lg w-full pb-24 sm:pb-0">
            {/* Main Content Card */}
            <div ref={heroContentRef} className="bg-white/70 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 xl:p-10 mb-8 sm:mb-12 xl:mb-20">
              <h1 className="text-4xl xl:text-5xl font-semibold text-gray-900 mb-3 sm:mb-4 leading-tight">
                {heroData?.title || "Авто из Китая, Японии, Южной Кореи и Германии."}
              </h1>
              <p className="text-sm sm:text-base xl:text-lg text-gray-900 mb-6 sm:mb-8 leading-relaxed">
                {heroData?.subtitle || "Доставка от 30 дней, полное сопровождение, таможенное оформление и страхование на каждом этапе."}
              </p>
              <button 
                onClick={() => setIsContactModalOpen(true)}
                className="cursor-pointer bg-white border-2 border-gray-200 shadow-inner text-gray-900 p-2 pl-6 rounded-full text-sm sm:text-base xl:text-lg font-semibold transition-colors flex items-center gap-4 w-full xl:w-auto justify-between group hover:bg-gray-50"
              >
                Бесплатная консультация
                <div className='bg-green-500 rounded-full p-5 border-1 border-black/5 shadow-md transition-transform duration-300 group-hover:scale-110'>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:scale-110" fill="white" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                </div>
              </button>
            </div>

            {/* Social Media Buttons */}
            <div ref={socialButtonsRef} className="flex items-center gap-3 xl:gap-4">
              <a 
                href="https://vk.com/auto_ved" 
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer w-10 h-10 sm:w-12 sm:h-12 border-1 border-white rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110"
              >
                <Image 
                  src="/assets/vk-brands.svg" 
                  alt="VK" 
                  width={20} 
                  height={20}
                  className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 hover:scale-110"
                />
              </a>
              <a 
                href="https://t.me/Auto_ved" 
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer w-10 h-10 sm:w-12 sm:h-12 border-1 border-white rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110"
              >
                <Image 
                  src="/assets/telegram-brands.svg" 
                  alt="Telegram" 
                  width={20} 
                  height={20}
                  className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 hover:scale-110"
                />
              </a>
              <a 
                href="https://www.instagram.com/auto_ved" 
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer w-10 h-10 sm:w-12 sm:h-12 border-1 border-white rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110"
              >
                <Image 
                  src="/assets/instagram-brands.svg" 
                  alt="Instagram" 
                  width={20} 
                  height={20}
                  className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 hover:scale-110"
                />
              </a>
              <span className="text-white text-md ml-2 hidden sm:block">Подпишитесь на&nbsp;наши соцсети</span>
              <span className="text-white text-md ml-1 sm:hidden">Соцсети</span>
            </div>
          </div>
        </div>

        {/* Sliding Car Info - Bottom Right */}
        <div ref={carInfoRef} className="absolute bottom-32 sm:bottom-36 xl:bottom-40 right-4 sm:right-8 xl:right-20">
          {slides[currentSlide] && (
            <div 
              key={currentSlide}
              className="text-right text-white animate-fade-in"
            >
              <h3 className="text-xl sm:text-2xl xl:text-4xl font-bold mb-1 xl:mb-2">{slides[currentSlide].carInfo.name}</h3>
              <p className="text-sm sm:text-base xl:text-lg opacity-90">{slides[currentSlide].carInfo.specs}</p>
              <p className="text-sm sm:text-base xl:text-lg opacity-90">{slides[currentSlide].carInfo.year}</p>
            </div>
          )}
        </div>

        {/* Progress Dots */}
        <div className="absolute bottom-12 sm:bottom-16 xl:bottom-20 left-1/2 transform -translate-x-1/2">
        <div ref={progressDotsRef} className="flex space-x-3 sm:space-x-4 xl:space-x-5">
          {slides.map((_: HeroSlide, index: number) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`cursor-pointer relative w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 hover:scale-125 ${
                index === currentSlide 
                  ? 'bg-white scale-110' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              disabled={isTransitioning}
            >
              {/* Progress Ring */}
              {index === currentSlide && (
                <>
                  {/* Mobile Progress Ring */}
                  <div 
                    className="absolute -inset-1.5 rounded-full sm:hidden"
                    style={{
                      background: `conic-gradient(from -90deg, white 0deg, white ${progress * 360}deg, transparent ${progress * 360}deg, transparent 360deg)`,
                      mask: 'radial-gradient(circle, transparent 8.5px, black 9.5px)',
                      WebkitMask: 'radial-gradient(circle, transparent 8.5px, black 9.5px)'
                    }}
                  />
                  {/* Desktop Progress Ring */}
                  <div 
                    className="absolute -inset-2 rounded-full hidden sm:block"
                    style={{
                      background: `conic-gradient(from -90deg, white 0deg, white ${progress * 360}deg, transparent ${progress * 360}deg, transparent 360deg)`,
                      mask: 'radial-gradient(circle, transparent 12.5px, black 13.5px)',
                      WebkitMask: 'radial-gradient(circle, transparent 12.5px, black 13.5px)'
                    }}
                  />
                </>
              )}
              {/* Outer Ring */}
              {index === currentSlide && (
                <div className="absolute -inset-1.5 sm:-inset-2 rounded-full border border-white/15" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>

    {/* Contact Modal */}
    <ContactModal 
      isOpen={isContactModalOpen}
      onClose={() => setIsContactModalOpen(false)}
      title="Свяжитесь с нами"
    />
    </section>
  );
};

export default HeroSlider;
