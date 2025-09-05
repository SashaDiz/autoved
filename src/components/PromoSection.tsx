'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { loadAdminData } from '@/utils/adminData';

export default function PromoSection() {
    const phoneRef = useRef<HTMLDivElement>(null);
    const [promoData, setPromoData] = useState<{title: string; subtitle: string} | null>(null);

    useEffect(() => {
        setPromoData(loadAdminData().promo);
    }, []);

    useEffect(() => {
        if (phoneRef.current) {
            // Create a gentle floating animation focused on up and down movement
            gsap.to(phoneRef.current, {
                y: -12, // Increased vertical movement to 12 pixels
                duration: 3.5, // Smooth duration for wave-like motion
                ease: "sine.inOut", // Very smooth sine easing
                yoyo: true, // Reverse the animation
                repeat: -1, // Infinite repeat
            });
        }
    }, []);

    return (
        <section className="max-w-[1200px] w-full mx-auto relative py-10 pb-20 sm:py-16 sm:pb-30 px-4 sm:px-6 xl:px-20">
            <div className="bg-gray-900 rounded-3xl relative overflow-hidden">
                {/* Content Container */}
                <div className="relative z-10 flex flex-col xl:flex-row items-start justify-between h-full">
                    {/* Left Side - Text Content */}
                    <div className="flex-1 p-6 xl:p-12 xl:pr-8 max-w-[450px] lg:max-w-[600px] xl:max-w-none">
                        <h2 className="text-4xl font-semibold text-white mb-2 leading-tight">
                            {promoData?.title || "Горячие предложения авто на сегодня"}
                        </h2>
                        <p className="text-gray-300 text-md xl:text-lg leading-relaxed mb-6 max-w-lg">
                            {promoData?.subtitle || "Подпишитесь на наш канала получайте подборку актуальных предложений и новостей из мира авто"}
                        </p>

                        {/* Telegram Button */}
                        <button className="cursor-pointer bg-white border-2 border-gray-200 shadow-inner text-gray-900 p-2 pl-6 rounded-full text-sm sm:text-base xl:text-lg font-semibold transition-colors flex items-center gap-2 w-full sm:w-auto justify-between group min-w-2xs">
                            Перейти в&nbsp;группу
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
                    <div className="flex-1 flex items-center justify-center xl:justify-end p-0 xl:p-8">
                        <div ref={phoneRef} className="absolute -top-10 -right-20 rotate-15 hidden md:block">
                            <Image
                                src="/assets/phone_img.webp"
                                alt="Phone with AutoVed app"
                                width={1610}
                                height={1610}
                                className="w-120 xl:w-200 h-auto"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
