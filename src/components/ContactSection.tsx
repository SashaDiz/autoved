'use client';

import Image from 'next/image';

export default function ContactSection() {
  return (
    <section className="max-w-[1920px] w-full mx-auto relative py-16 px-4 sm:px-6 lg:px-20">
      <div className="grid lg:grid-cols-2 gap-16">
        {/* Left Side - Title and Social */}
        <div className="flex flex-col h-full">
          <div className="flex-1">
            <p className="text-gray-500 text-md font-normal tracking-wide mb-2"># Контакты</p>
            <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight">
              AutoVed – автомобили из<br />
              Китая, Японии, Южной<br />
              Кореи и Германии
            </h2>
          </div>

          {/* Social Media Buttons */}
          <div className="flex gap-4 mt-auto">
            <a 
              href="#" 
              className="cursor-pointer flex items-center gap-4 bg-black text-white px-6 py-6 rounded-2xl font-medium transition-all duration-300 hover:bg-gray-800 hover:scale-105 flex-1"
            >
              <Image 
                src="/assets/telegram.webp" 
                alt="Telegram" 
                width={40} 
                height={40}
                className="w-10 h-10 rounded-lg"
              />
              <div>
                <div className="text-sm font-semibold">Наш канал</div>
                <div className="text-sm opacity-80">в Телеграм</div>
              </div>
            </a>

            <a 
              href="#" 
              className="cursor-pointer flex items-center gap-4 bg-black text-white px-6 py-6 rounded-2xl font-medium transition-all duration-300 hover:bg-gray-800 hover:scale-105 flex-1"
            >
              <Image 
                src="/assets/vk.webp" 
                alt="VK" 
                width={40} 
                height={40}
                className="w-10 h-10 rounded-lg"
              />
              <div>
                <div className="text-sm font-semibold">Наша группа</div>
                <div className="text-sm opacity-80">в ВКонтакте</div>
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
                <span className="text-lg font-semibold text-gray-900">+7 (495) 000-000</span>
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
                <span className="text-lg font-semibold text-gray-900">help@autoved.ru</span>
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
                <span className="text-lg font-semibold text-gray-900">г. Москва, ул. Тверская, 15 офис 301, 3 этаж</span>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">О нас</h3>
            <p className="text-gray-700 leading-relaxed">
              Мы более 5 лет занимаемся поставкой автомобилей из Китая, Японии, Южной Кореи и Германии. 
              За это время мы выстроили стабильные связи с проверенными поставщиками и аукционами, что позволяет 
              нам гарантировать надёжность на каждом этапе. В нашей команде работают опытные специалисты в области 
              логистики, таможенного оформления и автоэкспертизы.
            </p>
          </div>

          {/* Map */}
          <div className="bg-gray-200 rounded-2xl overflow-hidden h-64 lg:h-80 relative">
            {/* Placeholder for map - replace with actual map integration */}
            <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-gray-600 font-medium">Карта офиса в Москве</p>
                <p className="text-gray-500 text-sm mt-1">ул. Тверская, 15 офис 301</p>
              </div>
            </div>
            
            {/* You can replace the placeholder above with actual map integration like: */}
            {/* 
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A..."
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
            />
            */}
          </div>
        </div>
      </div>
    </section>
  );
}