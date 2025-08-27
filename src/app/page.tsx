import Image from 'next/image';
import HeroSlider from '@/components/HeroSlider';
import Navigation from '@/components/Navigation';
import BrandLogos from '@/components/BrandLogos';
import CardsSection from '@/components/CardsSection';

export default function Home() {
  return (
    <main className="min-h-screen">
        {/* Navigation */}
        <Navigation />

        {/* Hero Slider */}
        <HeroSlider />

        {/* Brands Section */}
        <section className="max-w-[1920px] w-full mx-auto relative bg-white py-16 px-4 sm:px-6 lg:px-20">
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
                Мы помогаем с покупкой новых и б/у автомобилей напрямую от надёжных 
                поставщиков из Китая, Японии, Южной Кореи и Германии, и доставкой в любой 
                регион России уже больше пяти лет.
              </p>
            </div>

            {/* Brand Logos Scrolling Line */}
            <BrandLogos />
        </section>

        {/* Cards Section */}
        <CardsSection />

        <section className="max-w-[1920px] w-full mx-auto relative">

        {/* Fixed Bottom Right Button */}
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-14 lg:right-10 z-50">
          <button className="cursor-pointer bg-white hover:bg-gray-50 text-gray-900 px-3 p-3 pl-6 rounded-full shadow-2xl flex items-center gap-2 sm:gap-3 transition-all duration-300 hover:scale-105 max-w-[280px] sm:max-w-none">
            <span className="text-xs sm:text-sm font-medium leading-tight hidden sm:block">
              Есть вопросы? Напишите нам<br />
              и мы поможем разобраться.
            </span>
            <span className="text-xs font-medium leading-tight sm:hidden">
              Напишите нам
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
    </main>
  );
}