'use client';

import Image from 'next/image';

export default function CountriesSection() {
    const countries = [
        {
            id: 'china',
            name: 'Китай',
            image: '/assets/china.webp',
            flag: '/assets/flags/CN.svg',
            features: [
                'Новый и б/у транспорт напрямую от дилеров',
                'Сроки: от 30 до 60 дней',
                'Большой выбор электрокаров'
            ]
        },
        {
            id: 'japan',
            name: 'Япония',
            image: '/assets/japan.webp',
            flag: '/assets/flags/JP.svg',
            features: [
                'Аукционы и площадки',
                'До 1.9 л — от 30 до 45 дней',
                'От 1.9 л — от 45 до 90 дней'
            ]
        },
        {
            id: 'south-korea',
            name: 'Южная Корея',
            image: '/assets/south-korea.webp',
            flag: '/assets/flags/KR.svg',
            features: [
                'Корейские автомобили и премиальные автомобили из Европы и США',
                'Сроки: от 30 до 45 дней'
            ]
        },
        {
            id: 'germany',
            name: 'Германия',
            image: '/assets/germany.webp',
            flag: '/assets/flags/DE.svg',
            features: [
                'Европейские и американские новые и б/у автомобили',
                'Сроки: от 30 до 45 дней'
            ]
        }
    ];

    return (
        <section className="max-w-[1920px] w-full mx-auto relative py-10 px-4 sm:px-6 lg:px-20">
            <div className="lg:flex lg:min-h-screen gap-16">
                {/* Left Side - Sticky Content */}
                <div className="lg:w-1/2 sticky-left-content py-6 lg:py-12 xl:py-20">
                    <div className="flex-1 lg:flex lg:flex-col lg:justify-between">
                        <div className="mb-6 lg:mb-0">
                            <p className="text-gray-500 text-md font-normal tracking-wide mb-2 block"># Откуда мы доставляем</p>
                            <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight">
                                Автомобили под заказ<br />
                                из Азии и Европы
                            </h2>
                        </div>
                    </div>

                    {/* Consultation Button - Sticky to bottom */}
                    <div className="mt-8 lg:mt-0">
                        <button className="cursor-pointer text-lg bg-gray-900 text-white px-2 pr-6 py-2 rounded-full font-semibold transition-all duration-300 hover:bg-gray-800 flex items-center gap-3 group">
                        <div className='bg-green-500 rounded-full p-4 border-1 border-black/5 shadow-md transition-transform duration-300 group-hover:scale-110'>
                            <Image
                                src="/assets/paper-plane.svg"
                                alt="Send Message"
                                width={20}
                                height={20}
                                className="w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110"
                            />
                        </div>
                        Бесплатная консультация
                    </button>
                        <p className="text-gray-500 text-sm mt-4 max-w-sm">
                            Свяжитесь с нами и мы возьмём на себя выкуп, таможенное и доставку авто.
                        </p>
                    </div>
                </div>

                {/* Right Side - Scrollable Content */}
                <div className="lg:w-1/2 lg:overflow-y-auto countries-scroll-content py-6 lg:py-12 xl:py-20">
                    <div className="space-y-6">
                        {countries.map((country, index) => (
                            <div 
                                key={country.id}
                                className="bg-white rounded-xl border-1 border-gray-200 overflow-hidden flex"
                            >
                                {/* Left Side - Image */}
                                <div className="relative w-64 h-auto">
                                    <Image
                                        src={country.image}
                                        alt={country.name}
                                        fill
                                        className="object-cover"
                                        priority={index === 0}
                                    />
                                    {/* Flag in bottom left corner */}
                                    <div className="absolute bottom-4 left-4">
                                        <Image
                                            src={country.flag}
                                            alt={`${country.name} flag`}
                                            width={24}
                                            height={24}
                                            className="w-auto h-8 rounded-md"
                                        />
                                    </div>
                                </div>

                                {/* Right Side - Content */}
                                <div className="w-1/2 p-10 lg:p-12 flex flex-col justify-center">
                                    <h3 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-6">
                                        {country.name}
                                    </h3>

                                    <div className="space-y-3">
                                        {country.features.map((feature, featureIndex) => (
                                            <div key={featureIndex} className="flex items-start gap-3">
                                                <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                                                <p className="text-gray-900 text-sm lg:text-base leading-relaxed">
                                                    {feature}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
