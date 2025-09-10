'use client';

import Image from 'next/image';
import { useState } from 'react';
import HeroSlider from '@/components/HeroSlider';
import Navigation from '@/components/Navigation';
import BrandLogos from '@/components/BrandLogos';
import CardsSection from '@/components/CardsSection';
import CountriesSection from '@/components/CountriesSection';
import PromoSection from '@/components/PromoSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import ProcessSection from '@/components/ProcessSection';
import PricingSection from '@/components/PricingSection';
import VideoReviewsSection from '@/components/VideoReviewsSection';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import ContactFormSection from '@/components/ContactFormSection';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';
import StructuredData from '@/components/StructuredData';

export default function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Структурированные данные для главной страницы
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AutoVed",
    "url": "https://auto-ved.ru",
    "description": "Помогаем с покупкой новых и б/у автомобилей напрямую от надёжных поставщиков из Китая, Японии, Южной Кореи и Германии, и доставкой в любой регион России уже больше пяти лет.",
    "inLanguage": "ru",
    "publisher": {
      "@type": "Organization",
      "name": "AutoVed",
      "url": "https://auto-ved.ru"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://auto-ved.ru/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const serviceStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Покупка и доставка автомобилей из-за границы",
    "description": "Помогаем с покупкой новых и б/у автомобилей напрямую от надёжных поставщиков из Китая, Японии, Южной Кореи и Германии, и доставкой в любой регион России уже больше пяти лет.",
    "provider": {
      "@type": "Organization",
      "name": "AutoVed",
      "url": "https://auto-ved.ru"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Russia"
    },
    "serviceType": "Автомобильные услуги",
    "category": "Импорт автомобилей"
  };

  return (
    <main id="main-content" className="min-h-screen">
      {/* Структурированные данные */}
      <StructuredData data={websiteStructuredData} />
      <StructuredData data={serviceStructuredData} />
        {/* Navigation */}
        <Navigation />

        {/* Hero Slider */}
        <HeroSlider />

        {/* Brands Section */}
        <section className="max-w-[1920px] w-full mx-auto relative bg-white py-10 sm:py-16 px-4 sm:px-6 xl:px-20">
            {/* Text Content */}
            <div className="text-center mb-20">
                <div className="relative h-30 mx-auto flex items-center justify-center overflow-visible">
                  <Image 
                    src="/assets/logo-wheel.svg" 
                    alt="AutoVed Logo" 
                    width={40} 
                    height={40}
                    className="w-16 h-16"
                  />
                  <div className="bg-white/50 w-40 h-14 absolute bottom-0 center backdrop-blur-md"></div>
                </div>
              <p className="text-gray-700 text-lg leading-relaxed max-w-4xl mx-auto">
              Мы&nbsp;помогаем с&nbsp;покупкой новых и&nbsp;б/у автомобилей напрямую от&nbsp;надёжных поставщиков из&nbsp;Китая, Японии, Южной Кореи и&nbsp;Германии, и&nbsp;доставкой в&nbsp;любой регион России уже больше пяти лет.
              </p>
            </div>

            {/* Brand Logos Scrolling Line */}
            <BrandLogos />
        </section>

        {/* Cards Section */}
        <section id="services">
          <CardsSection />
        </section>

        {/* Promotional Section */}
        <PromoSection />

        {/* Why Choose Us Section */}
        <section id="about">
          <WhyChooseUs />
        </section>

        {/* Countries Section */}
        <CountriesSection />

        {/* Process Section */}
        <section id="process">
          <ProcessSection />
        </section>

        {/* Pricing Section */}
        <PricingSection />

        {/* Video Reviews Section */}
        <section id="reviews">
          <VideoReviewsSection />
        </section>

        {/* FAQ Section */}
        <FAQSection />

        {/* Contact Section */}
        <section id="contacts">
          <ContactSection />
        </section>

        {/* Contact Form Section */}
        <ContactFormSection />

        {/* Footer */}
        <Footer />

        <section className="max-w-[1920px] w-full mx-auto relative">

        {/* Fixed Bottom Right Button */}
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 xl:bottom-14 xl:right-10 z-50 max-w-[350px]">
          <button 
            onClick={() => setIsContactModalOpen(true)}
            className="cursor-pointer bg-white hover:bg-gray-50 text-gray-900 px-3 p-3 sm:pl-6 rounded-full shadow-2xl flex items-center gap-2 sm:gap-3 transition-all duration-300 hover:scale-105 max-w-[280px] sm:max-w-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Открыть форму связи с нами"
          >
            <span className="text-xs sm:text-sm font-medium leading-tight hidden sm:block text-start">
            Есть вопросы? Свяжитесь с нами и&nbsp;мы&nbsp;поможем разобраться.
            </span>
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Image 
                src="/assets/paper-plane.svg" 
                alt="Send Message" 
                width={24} 
                height={24}
                className="w-6 h-6 text-white"
              />
            </div>
          </button>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title="Есть вопросы? Свяжитесь с нами"
      />
    </main>
  );
}