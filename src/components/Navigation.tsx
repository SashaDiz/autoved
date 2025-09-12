'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null);

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

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Focus first menu item when menu opens
      setTimeout(() => {
        firstMenuItemRef.current?.focus();
      }, 100);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
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
    <>
      {/* Skip to main content link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        Перейти к основному содержимому
      </a>
      
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
        <nav className="hidden nav-md:flex" role="navigation" aria-label="Основная навигация">
          <ul className="flex items-center space-x-6 xl:space-x-8" role="menubar">
            <li role="none">
              <a 
                href="#services" 
                className="text-white hover:text-gray-200 transition-colors font-medium text-sm xl:text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-md px-2 py-1"
                role="menuitem"
              >
                Каталог
              </a>
            </li>
            <li role="none">
              <a 
                href="#about" 
                className="text-white hover:text-gray-200 transition-colors font-medium text-sm xl:text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-md px-2 py-1"
                role="menuitem"
              >
                О нас
              </a>
            </li>
            <li role="none">
              <a 
                href="#process" 
                className="text-white hover:text-gray-200 transition-colors font-medium text-sm xl:text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-md px-2 py-1"
                role="menuitem"
              >
                Процесс
              </a>
            </li>
            <li role="none">
              <a 
                href="#reviews" 
                className="text-white hover:text-gray-200 transition-colors font-medium text-sm xl:text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-md px-2 py-1"
                role="menuitem"
              >
                Отзывы
              </a>
            </li>
            <li role="none">
              <a 
                href="#contacts" 
                className="text-white hover:text-gray-200 transition-colors font-medium text-sm xl:text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-md px-2 py-1"
                role="menuitem"
              >
                Контакты
              </a>
            </li>
            <li role="none">
              <a 
                href="#contacts" 
                className="text-gray-900 bg-white px-4 xl:px-6 py-3 xl:py-4 rounded-full transition-colors font-medium text-sm xl:text-base hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                role="menuitem"
              >
                Связаться с нами
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile Burger Button - Visible below 748px */}
        <button 
          ref={menuButtonRef}
          onClick={toggleMenu}
          className="burger-button nav-md:hidden z-30 flex flex-col justify-center items-center w-8 h-8 space-y-1.5 group transition-transform duration-300 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-md"
          aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
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
        <div 
          ref={menuRef}
          id="mobile-menu"
          className={`mobile-menu fixed inset-0 bg-black/90 backdrop-blur-lg z-20 nav-md:hidden transition-all duration-300 ${
            isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
        >
          <div className="flex flex-col justify-center items-center h-full space-y-8">
            <nav role="navigation" aria-label="Основная навигация">
              <h2 id="mobile-menu-title" className="sr-only">Мобильное меню</h2>
              <ul className="flex flex-col items-center space-y-6" role="menubar">
                <li role="none">
                  <a 
                    ref={firstMenuItemRef}
                    href="#services" 
                    className="text-white hover:text-gray-200 transition-colors font-medium text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-md px-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                    role="menuitem"
                    tabIndex={isMenuOpen ? 0 : -1}
                  >
                    Каталог
                  </a>
                </li>
                <li role="none">
                  <a 
                    href="#about" 
                    className="text-white hover:text-gray-200 transition-colors font-medium text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-md px-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                    role="menuitem"
                    tabIndex={isMenuOpen ? 0 : -1}
                  >
                    О нас
                  </a>
                </li>
                <li role="none">
                  <a 
                    href="#process" 
                    className="text-white hover:text-gray-200 transition-colors font-medium text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-md px-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                    role="menuitem"
                    tabIndex={isMenuOpen ? 0 : -1}
                  >
                    Процесс
                  </a>
                </li>
                <li role="none">
                  <a 
                    href="#reviews" 
                    className="text-white hover:text-gray-200 transition-colors font-medium text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-md px-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                    role="menuitem"
                    tabIndex={isMenuOpen ? 0 : -1}
                  >
                    Отзывы
                  </a>
                </li>
                <li className="pt-4" role="none">
                  <a 
                    href="#contacts" 
                    className="text-gray-900 bg-white px-8 py-4 rounded-full transition-colors font-medium text-lg hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                    onClick={() => setIsMenuOpen(false)}
                    role="menuitem"
                    tabIndex={isMenuOpen ? 0 : -1}
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
    </>
  );
};

export default Navigation;
