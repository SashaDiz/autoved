'use client';

import Image from 'next/image';

export default function PromoSection() {
    return (
        <section className="max-w-[1200px] w-full mx-auto relative pt-16 pb-30 px-4 sm:px-6 lg:px-20">
            <div className="bg-gray-900 rounded-3xl relative overflow-hidden">
                {/* Content Container */}
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between h-full">
                    {/* Left Side - Text Content */}
                    <div className="flex-1 p-6 lg:p-12 lg:pr-8">
                        <h2 className="text-3xl lg:text-4xl xl:text-[40px] font-semibold text-white mb-2 leading-tight">
                            Горячие предложения авто на сегодня
                        </h2>
                        <p className="text-gray-300 text-md lg:text-lg leading-relaxed mb-6 max-w-lg">
                            Подпишитесь на наш канала получайте подборку актуальных предложений и новостей из мира авто
                        </p>

                        {/* Telegram Button */}
                        <button className="cursor-pointer bg-white border-2 border-gray-200 shadow-inner text-gray-900 p-2 pl-6 rounded-full text-sm sm:text-base lg:text-lg font-semibold transition-colors flex items-center gap-2 w-full sm:w-auto justify-between group min-w-2xs">
                            Перейти в группу
                            <div className='bg-green-500 rounded-full p-5 border-1 border-black/5 shadow-md transition-transform duration-300 group-hover:scale-110'>
                                <Image
                                    src="/assets/paper-plane.svg"
                                    alt="Telegram"
                                    width={20}
                                    height={20}
                                    className="w-5 h-5 text-white"
                                />
                            </div>
                        </button>
                    </div>

                    {/* Right Side - Phone Image */}
                    <div className="flex-1 flex items-center justify-center lg:justify-end p-8 lg:p-16 lg:pl-8">
                        <div className="absolute -top-10 -right-20 rotate-15">
                            <Image
                                src="/assets/phone_img.webp"
                                alt="Phone with AutoVed app"
                                width={1610}
                                height={1610}
                                className="w-120 lg:w-200 h-auto"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Background decorative elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gray-700/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-gray-900 to-transparent"></div>
            </div>
        </section>
    );
}
