'use client';

import Image from 'next/image';

export default function ContactSection() {
  return (
    <section className="max-w-[1920px] w-full mx-auto relative py-16 sm:py-24 px-4 sm:px-6 xl:px-20">
      <div className="grid xl:grid-cols-2 gap-16">
        {/* Left Side - Title and Social */}
        <div className="flex flex-col h-full">
          <div className="flex-1 max-w-xl pb-10 xl:pb-0">
            <p className="text-gray-500 text-md font-normal tracking-wide mb-2 text-center sm:text-left"># Контакты</p>
            <h2 className="text-3xl xl:text-5xl font-normal text-gray-900 leading-tight text-center sm:text-left">
              <span className="font-semibold">AutoVed</span> – автомобили из&nbsp;Китая, Японии, Южной Кореи и&nbsp;Германии
            </h2>
          </div>

          {/* Social Media Buttons */}
          <div className="flex flex-col md:flex-row gap-4 mt-auto">
            <a 
              href="https://t.me/Auto_ved" 
              target="_blank"
              rel="noopener noreferrer"
              className="relative cursor-pointer flex overflow-hidden items-center gap-4 bg-black text-white px-6 py-6 rounded-2xl font-medium transition-all duration-300 hover:bg-gray-800 hover:scale-105 flex-1"
            >
              <Image 
                src="/assets/telegram.webp" 
                alt="Telegram" 
                width={192} 
                height={192}
                className="w-22 h-22 xl:w-22 xl:h-22 rounded-lg absolute -bottom-8 -right-3"
              />
              <div>
                <div className="text-lg font-semibold">Наш канал</div>
                <div className="text-sm opacity-80">в Телеграм</div>
              </div>
            </a>

            <a 
              href="https://vk.com/auto_ved" 
              target="_blank"
              rel="noopener noreferrer"
              className="relative cursor-pointer flex overflow-hidden items-center gap-4 bg-black text-white px-6 py-6 rounded-2xl font-medium transition-all duration-300 hover:bg-gray-800 hover:scale-105 flex-1"
            >
              <Image 
                src="/assets/vk.webp" 
                alt="VK" 
                width={192} 
                height={192}
                className="w-22 h-22 xl:w-22 xl:h-22 rounded-lg absolute -bottom-8 -right-3"
              />
              <div>
                <div className="text-lg font-semibold">Наша группа</div>
                <div className="text-sm opacity-80">в ВКонтакте</div>
              </div>
            </a>

            <a 
              href="https://www.instagram.com/auto_ved" 
              target="_blank"
              rel="noopener noreferrer"
              className="relative cursor-pointer flex overflow-hidden items-center gap-4 bg-black text-white px-6 py-6 rounded-2xl font-medium transition-all duration-300 hover:bg-gray-800 hover:scale-105 flex-1"
            >
              <Image 
                src="/assets/instagram.webp" 
                alt="VK" 
                width={192} 
                height={192}
                className="w-22 h-22 xl:w-22 xl:h-22 rounded-lg absolute -bottom-8 -right-3"
              />
              <div>
                <div className="text-lg font-semibold">Наша страница</div>
                <div className="text-sm opacity-80">в Instagram</div>
              </div>
            </a>
          </div>
        </div>

        {/* Right Side - Contact Info and Map */}
        <div className="space-y-8">
          {/* Contact Details */}
          <div className="space-y-4">
            {/* Phone */}
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 flex-shrink-0">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <a 
                  href="tel:+79165788898" 
                  className="text-lg font-semibold text-gray-900 hover:text-green-500 transition-colors duration-200 cursor-pointer"
                >
                  +7 (916) 578-88-98
                </a>
                <span className="text-gray-500 ml-2">(офис)</span>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 flex-shrink-0">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <a 
                  href="mailto:info@vedtime.ru" 
                  className="text-lg font-semibold text-gray-900 hover:text-green-500 transition-colors duration-200 cursor-pointer"
                >
                  info@vedtime.ru
                </a>
                <span className="text-gray-500 ml-2">(офис)</span>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 flex-shrink-0 mt-1">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <a 
                  href="https://yandex.ru/maps/?text=г. Москва, м. Сокол, Ленинградский Проспект, д. 63, Офис 514"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-gray-900 hover:text-green-500 transition-colors duration-200 cursor-pointer"
                >
                  г. Москва, м. Сокол, Ленинградский Проспект, д. 63, Офис 514
                </a>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">О нас</h3>
            <p className="text-gray-700 leading-relaxed">
            Мы&nbsp;более 5&nbsp;лет занимаемся поставкой автомобилей из&nbsp;Китая, Японии, Южной Кореи и&nbsp;Германии. 
За&nbsp;это время мы&nbsp;выстроили стабильные связи с&nbsp;проверенными поставщиками и&nbsp;аукционами, что позволяет 
нам гарантировать надёжность на&nbsp;каждом этапе. В&nbsp;нашей команде работают опытные специалисты в&nbsp;области 
логистики, таможенного оформления и&nbsp;автоэкспертизы.
            </p>
          </div>

          {/* Map */}
          <div className="bg-gray-200 rounded-2xl overflow-hidden h-[500px] sm:h-64 xl:h-80 relative">
            <iframe
              src="https://yandex.com/map-widget/v1/?um=constructor%3A5f60597d3dcb98e58401ed40032d21da6654ceaa6afa70ce03837f555aeed561&amp;source=constructor"
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}