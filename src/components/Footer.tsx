'use client';

import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="max-w-[1920px] flex flex-col justify-between w-full mx-auto relative bg-gray-900 border-t border-gray-800 text-white px-4 sm:px-6 xl:px-20 py-12 min-h-80">
      {/* Main Footer Content */}
      <div className="flex flex-col xl:flex-row justify-between items-start gap-6 mb-10 xl:mb-auto">
        {/* Left Side - Logo */}
        <div>
          <Image
            src="/assets/logo-white.svg"
            alt="AutoVed Logo"
            width={120}
            height={40}
            className="w-auto h-10"
          />
        </div>
        <div className="flex flex-wrap justify-between items-center gap-12 w-full xl:w-auto">
          {/* Center - Navigation Links */}
          <nav className="w-full lg:w-auto" role="navigation" aria-label="Навигация в футере">
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap lg:justify-start lg:gap-8 gap-4 text-sm">
              <li role="none">
                <a 
                  href="#services" 
                  className="text-white hover:text-gray-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded-md px-2 py-1"
                  role="menuitem"
                >
                  Каталог
                </a>
              </li>
              <li role="none">
                <a 
                  href="#about" 
                  className="text-white hover:text-gray-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded-md px-2 py-1"
                  role="menuitem"
                >
                  О нас
                </a>
              </li>
              <li role="none">
                <a 
                  href="#process" 
                  className="text-white hover:text-gray-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded-md px-2 py-1"
                  role="menuitem"
                >
                  Процесс
                </a>
              </li>
              <li role="none">
                <a 
                  href="#reviews" 
                  className="text-white hover:text-gray-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded-md px-2 py-1"
                  role="menuitem"
                >
                  Отзывы
                </a>
              </li>
              <li role="none">
                <a 
                  href="#contacts" 
                  className="text-white hover:text-gray-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded-md px-2 py-1"
                  role="menuitem"
                >
                  Контакты
                </a>
              </li>
            </ul>
          </nav>

          {/* Right Side - Social Icons */}
          <div className="flex items-center gap-3 xl:gap-4">
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
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-4 text-sm text-gray-400">
        <div className='max-w-[300px]'>
          <p>2025 © Все права защищены.</p>
          <p>Данный сайт носит исключительно информационный характер и&nbsp;не&nbsp;является публичной офертой</p>
        </div>

        <div className="flex gap-6">
          <a href="/politika" className="text-gray-600 hover:text-gray-400 transition-colors text-md">
            Политика конфиденциальности
          </a>
          <a href="/admin" className="text-gray-600 hover:text-gray-400 transition-colors text-md">
            Админ
          </a>
        </div>
        <div className="flex gap-6">
        </div>
      </div>
    </footer>
  );
}