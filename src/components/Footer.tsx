'use client';

import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="max-w-[1920px] flex flex-col justify-between w-full mx-auto relative bg-gray-900 border-t border-gray-800 text-white px-4 sm:px-6 lg:px-20 py-12 min-h-60">
      {/* Main Footer Content */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-auto">
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
        <div className="flex justify-between items-center gap-12">
          {/* Center - Navigation Links */}
          <div className="flex gap-8 text-sm">
            <a href="#" className="text-white hover:text-gray-300 transition-colors">
              Условия
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">
              Гарантии
            </a>
            <a href="#" className="text-white hover:text-gray-300 transition-colors">
              Контакты
            </a>
          </div>

          {/* Right Side - Social Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button className="cursor-pointer w-10 h-10 sm:w-12 sm:h-12 border-1 border-white rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110">
              <Image
                src="/assets/vk-brands.svg"
                alt="VK"
                width={20}
                height={20}
                className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 hover:scale-110"
              />
            </button>
            <button className="cursor-pointer w-10 h-10 sm:w-12 sm:h-12 border-1 border-white rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110">
              <Image
                src="/assets/telegram-brands.svg"
                alt="Telegram"
                width={20}
                height={20}
                className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 hover:scale-110"
              />
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 text-xs text-gray-400">
        <div className='max-w-[300px]'>
          <p>2025 © Все права защищены.</p>
          <p>Данный сайт носит исключительно информационный характер и не является публичной офертой</p>
        </div>

        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">
            Политика конфиденциальности
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Оферта
          </a>
        </div>
      </div>
    </footer>
  );
}