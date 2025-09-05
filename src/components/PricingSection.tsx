'use client';

import Image from 'next/image';

export default function PricingSection() {
    return (
        <section className="max-w-[1920px] w-full mx-auto relative py-24 px-4 sm:px-6 lg:px-24">
            {/* Main Content Container */}
            <div className="text-center mb-16 max-w-3xl mx-auto">
                <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight mb-4">
                    Из чего складывается конечная стоимость автомобиля
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed max-w-lg mx-auto">
                    Прозрачная цена без скрытых платежей
                </p>
            </div>

            {/* Car and Pricing Elements Container */}
            <div className="relative">
                {/* Desktop Layout - Car with overlaid elements */}
                <div className="hidden lg:flex lg:items-center lg:justify-center lg:min-h-[700px] lg:relative">
                    {/* Main Car Image - Bigger */}
                    <div className="relative z-10">
                        <Image
                            src="/assets/mers_1.webp"
                            alt="Mercedes sedan"
                            width={1800}
                            height={600}
                            className="w-full min-w-[900px] max-w-[1400px] h-auto"
                            priority
                        />
                    </div>

                    {/* Price Element 1 - Top Left */}
                    <div className="absolute top-4 left-24 p-4 max-w-[240px]">
                        <div className="flex items-start gap-3">
                            <div className="p-0.5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#fff"><path d="M6 12H12M18 12H12M12 12V6M12 12V18" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-normal text-gray-900 leading-tight">
                                    Цена автомобиля на&nbsp;площадке
                                </h3>
                            </div>
                        </div>
                    </div>

                    {/* Price Element 2 - Top Right */}
                    <div className="absolute top-2 right-8 p-4 max-w-[260px]">
                        <div className="flex items-start gap-2">
                            <div className="p-0.5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#fff"><path d="M6 12H12M18 12H12M12 12V6M12 12V18" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-normal text-gray-900 leading-tight">
                                    Доставка (морским, железнодорожным и&nbsp;автомобильным транспортом)
                                </h3>
                            </div>
                        </div>
                    </div>

                    {/* Price Element 3 - Bottom Left */}
                    <div className="absolute bottom-8 left-8 p-4 max-w-[260px]">
                        <div className="flex items-start gap-2">
                            <div className="p-0.5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#fff"><path d="M6 12H12M18 12H12M12 12V6M12 12V18" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-normal text-gray-900 leading-tight">
                                Таможенный и&nbsp;утилизационный сборы
                                </h3>
                            </div>
                        </div>
                    </div>

                    {/* Price Element 4 - Center */}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 p-4 max-w-[260px]">
                        <div className="flex items-start gap-2">
                            <div className="p-0.5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#fff"><path d="M6 12H12M18 12H12M12 12V6M12 12V18" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-normal text-gray-900 leading-tight">
                                    Страхование на&nbsp;каждом этапе
                                </h3>
                            </div>
                        </div>
                    </div>

                    {/* Price Element 5 - Bottom Right */}
                    <div className="absolute bottom-12 right-16 p-4 max-w-[260px]">
                        <div className="flex items-start gap-2">
                            <div className="p-0.5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#fff"><path d="M6 12H12M18 12H12M12 12V6M12 12V18" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-normal text-gray-900 leading-tight">
                                    Комиссия компании за&nbsp;сопровождение
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile/Tablet Layout - Stacked elements */}
                <div className="lg:hidden">
                    {/* Car Image */}
                    <div className="relative mb-8">
                        <Image
                            src="/assets/mers_1.webp"
                            alt="Mercedes sedan"
                            width={1800}
                            height={600}
                            className="w-full h-auto"
                            priority
                        />
                    </div>

                    {/* Stacked Price Elements */}
                    <div className="space-y-6">
                        {/* Price Element 1 */}
                        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
                            <div className="flex items-center gap-3">
                                <div className="p-0.5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#fff"><path d="M6 12H12M18 12H12M12 12V6M12 12V18" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                </div>
                                <div>
                                    <h3 className="text-md md:text-lg font-normal text-gray-900 leading-tight">
                                        Цена автомобиля на&nbsp;площадке
                                    </h3>
                                </div>
                            </div>
                        </div>

                        {/* Price Element 2 */}
                        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
                            <div className="flex items-center gap-3">
                                <div className="p-0.5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#fff"><path d="M6 12H12M18 12H12M12 12V6M12 12V18" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                </div>
                                <div>
                                    <h3 className="text-md md:text-lg font-normal text-gray-900 leading-tight">
                                        Доставка (морским, железнодорожным и&nbsp;автомобильным транспортом)
                                    </h3>
                                </div>
                            </div>
                        </div>

                        {/* Price Element 3 */}
                        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
                            <div className="flex items-center gap-3">
                                <div className="p-0.5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#fff"><path d="M6 12H12M18 12H12M12 12V6M12 12V18" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                </div>
                                <div>
                                    <h3 className="text-md md:text-lg font-normal text-gray-900 leading-tight">
                                    Таможенный и&nbsp;утилизационный сборы
                                    </h3>
                                </div>
                            </div>
                        </div>

                        {/* Price Element 4 */}
                        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
                            <div className="flex items-center gap-3">
                                <div className="p-0.5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#fff"><path d="M6 12H12M18 12H12M12 12V6M12 12V18" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                </div>
                                <div>
                                    <h3 className="text-md md:text-lg font-normal text-gray-900 leading-tight">
                                        Страхование на&nbsp;каждом этапе
                                    </h3>
                                </div>
                            </div>
                        </div>

                        {/* Price Element 5 */}
                        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
                            <div className="flex items-center gap-3">
                                <div className="p-0.5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#fff"><path d="M6 12H12M18 12H12M12 12V6M12 12V18" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                </div>
                                <div>
                                    <h3 className="text-md md:text-lg font-normal text-gray-900 leading-tight">
                                        Комиссия компании за&nbsp;сопровождение
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Button */}
            <div className="text-center mt-16">
                <button className="cursor-pointer text-lg bg-gray-900 text-white px-2 pr-6 py-2 rounded-full font-semibold transition-all duration-300 hover:bg-gray-800 flex items-center gap-3 group mx-auto">
                    <div className='bg-green-500 rounded-full p-4 border-1 border-black/5 shadow-md transition-transform duration-300 group-hover:scale-110'>
                        <Image
                            src="/assets/paper-plane.svg"
                            alt="Send Message"
                            width={20}
                            height={20}
                            className="w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110"
                        />
                    </div>
                    Узнать стоимость авто
                </button>
                <p className="text-gray-500 text-sm mt-4 max-w-md mx-auto">
                    Напишите нам и мы посчитаем для вас<br />
                    конечную стоимость вашего авто
                </p>
            </div>
        </section>
    );
}
