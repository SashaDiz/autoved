'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const target = event.target as Element;
      if (isMenuOpen && !target.closest('.mobile-menu') && !target.closest('.burger-button')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="max-w-[1920px] w-full mx-auto absolute top-0 left-0 right-0 z-20 px-4 sm:px-6 xl:px-20 py-4 sm:py-6">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4 z-30">
          <Image 
            src="/assets/logo.svg" 
            alt="AutoVed Logo" 
            width={120} 
            height={40}
            className="h-8 sm:h-10 w-auto"
          />
          {/* Admin link - hidden */}
          <a 
            href="/admin" 
            className="opacity-0 hover:opacity-20 transition-opacity text-white text-xs"
            title="Admin Panel"
          >
            •
          </a>
        </div>
        
        {/* Desktop Navigation Links - Hidden below 748px */}
        <nav className="hidden nav-md:flex">
          <ul className="flex items-center space-x-6 xl:space-x-8">
            <li>
              <a href="#services" className="text-white hover:text-gray-200 transition-colors font-medium text-sm xl:text-base">
                Каталог
              </a>
            </li>
            <li>
              <a href="#about" className="text-white hover:text-gray-200 transition-colors font-medium text-sm xl:text-base">
                О нас
              </a>
            </li>
            <li>
              <a href="#process" className="text-white hover:text-gray-200 transition-colors font-medium text-sm xl:text-base">
                Процесс
              </a>
            </li>
            <li>
              <a href="#reviews" className="text-white hover:text-gray-200 transition-colors font-medium text-sm xl:text-base">
                Отзывы
              </a>
            </li>
            <li>
              <a href="#contacts" className="text-white hover:text-gray-200 transition-colors font-medium text-sm xl:text-base">
                Контакты
              </a>
            </li>
            <li>
              <a href="#contacts" className="text-gray-900 bg-white px-4 xl:px-6 py-3 xl:py-4 rounded-full transition-colors font-medium text-sm xl:text-base hover:bg-gray-100">
                Связаться с нами
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile Burger Button - Visible below 748px */}
        <button 
          onClick={toggleMenu}
          className="burger-button nav-md:hidden z-30 flex flex-col justify-center items-center w-8 h-8 space-y-1.5 group transition-transform duration-300 hover:scale-110"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            isMenuOpen ? 'rotate-45 translate-y-2' : ''
          }`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            isMenuOpen ? 'opacity-0' : ''
          }`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            isMenuOpen ? '-rotate-45 -translate-y-2' : ''
          }`}></span>
        </button>

        {/* Mobile Menu Overlay - Shows below 748px */}
        <div className={`mobile-menu fixed inset-0 bg-black/90 backdrop-blur-lg z-20 nav-md:hidden transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}>
          <div className="flex flex-col justify-center items-center h-full space-y-8">
            <nav>
              <ul className="flex flex-col items-center space-y-6">
                <li>
                  <a 
                    href="#services" 
                    className="text-white hover:text-gray-200 transition-colors font-medium text-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Услуги
                  </a>
                </li>
                <li>
                  <a 
                    href="#about" 
                    className="text-white hover:text-gray-200 transition-colors font-medium text-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    О нас
                  </a>
                </li>
                <li>
                  <a 
                    href="#process" 
                    className="text-white hover:text-gray-200 transition-colors font-medium text-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Процесс
                  </a>
                </li>
                <li>
                  <a 
                    href="#reviews" 
                    className="text-white hover:text-gray-200 transition-colors font-medium text-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Отзывы
                  </a>
                </li>
                <li className="pt-4">
                  <a 
                    href="#contacts" 
                    className="text-gray-900 bg-white px-8 py-4 rounded-full transition-colors font-medium text-lg hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Контакты
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
