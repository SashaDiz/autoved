'use client';

import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import ContactModal from './ContactModal';

export default function WhyChooseUs() {
    const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    useEffect(() => {
        featureRefs.current.forEach((feature) => {
            if (feature) {
                const icon = feature.querySelector('.feature-icon');

                const handleMouseEnter = () => {
                    gsap.to(icon, {
                        rotationY: 360,
                        duration: 0.6,
                        ease: "power2.out"
                    });
                };

                const handleMouseLeave = () => {
                    gsap.to(icon, {
                        rotationY: 0,
                        duration: 0.6,
                        ease: "power2.out"
                    });
                };

                feature.addEventListener('mouseenter', handleMouseEnter);
                feature.addEventListener('mouseleave', handleMouseLeave);

                // Cleanup function
                return () => {
                    feature.removeEventListener('mouseenter', handleMouseEnter);
                    feature.removeEventListener('mouseleave', handleMouseLeave);
                };
            }
        });
    }, []);

    return (
        <section className="max-w-[1920px] w-full mx-auto relative py-20 sm:py-30 px-4 sm:px-6 xl:px-20 bg-gray-50">
            <div className="flex flex-col xl:flex-row gap-16">
                {/* Left Side - Text Content */}
                <div className="flex-1 flex flex-col justify-between items-center sm:items-start">
                    <div className="mb-auto max-w-xl text-center sm:text-left">
                        <p className="text-gray-500 text-md font-normal tracking-wide mb-2 block">
                            # Почему выбирают нас
                        </p>
                        <h2 className="text-4xl xl:text-5xl font-semibold text-gray-900 leading-tight">
                            Надёжность, проверенная временем
                        </h2>
                    </div>

                    {/* Contact Button */}
                    <button 
                        onClick={() => setIsContactModalOpen(true)}
                        className="cursor-pointer text-lg mt-8 xl:mt-0 bg-gray-900 text-white px-2 pr-6 py-2 rounded-full font-semibold transition-all duration-300 hover:bg-gray-800 flex items-center gap-3 group"
                    >
                        <div className='bg-green-500 rounded-full p-4 border-1 border-black/5 shadow-md transition-transform duration-300 group-hover:scale-110'>
                            <Image
                                src="/assets/paper-plane.svg"
                                alt="Send Message"
                                width={20}
                                height={20}
                                className="w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110"
                            />
                        </div>
                        Связаться с&nbsp;менеджером
                    </button>

                    <p className="text-center sm:text-left text-gray-500 text-sm mt-4 pl-4 leading-relaxed max-w-[300px]">
                    Напишите нам и&nbsp;мы&nbsp;поможем с&nbsp;подбором, выкупом и&nbsp;доставкой авто.
                    </p>
                </div>

                {/* Right Side - Features Grid */}
                <div className="flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-14">
                        {/* Speed */}
                        <div
                            ref={(el) => { featureRefs.current[0] = el; }}
                            className="space-y-4"
                        >
                            <div className="w-12 h-12 flex items-center justify-center">
                                <Image
                                    src="/assets/dashboard-speed 1.svg"
                                    alt="Speed"
                                    width={48}
                                    height={48}
                                    className="w-12 h-12 feature-icon"
                                />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Скорость</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Доставка авто из Китая, Японии, Южной Кореи и Германии — от 30 дней
                                </p>
                            </div>
                        </div>

                        {/* 24/7 Consultations */}
                        <div
                            ref={(el) => { featureRefs.current[1] = el; }}
                            className="space-y-4"
                        >
                            <div className="w-12 h-12 flex items-center justify-center">
                                <Image
                                    src="/assets/profile-circle 1.svg"
                                    alt="24/7 Support"
                                    width={48}
                                    height={48}
                                    className="w-12 h-12 feature-icon"
                                />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Консультации 24/7</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Наши менеджеры всегда на связи, чтобы ответить на ваши вопросы
                                </p>
                            </div>
                        </div>

                        {/* Simplicity */}
                        <div
                            ref={(el) => { featureRefs.current[2] = el; }}
                            className="space-y-4"
                        >
                            <div className="w-12 h-12 flex items-center justify-center">
                                <Image
                                    src="/assets/badge-check.svg"
                                    alt="Simplicity"
                                    width={48}
                                    height={48}
                                    className="w-12 h-12 feature-icon"
                                />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Простота</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Мы предоставляем полное юридическое сопровождение сделки, от вас - только подпись
                                </p>
                            </div>
                        </div>

                        {/* Security */}
                        <div
                            ref={(el) => { featureRefs.current[3] = el; }}
                            className="space-y-4"
                        >
                            <div className="w-12 h-12 flex items-center justify-center">
                                <Image
                                    src="/assets/shield-check.svg"
                                    alt="Security"
                                    width={48}
                                    height={48}
                                    className="w-12 h-12 feature-icon"
                                />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Безопасность</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Мы страхуем авто на всех этапах его транспортировки, чтобы защитить вас от рисков
                                </p>
                            </div>
                        </div>

                        {/* Experience */}
                        <div
                            ref={(el) => { featureRefs.current[4] = el; }}
                            className="space-y-4"
                        >
                            <div className="w-12 h-12 flex items-center justify-center">
                                <Image
                                    src="/assets/leaderboard-star.svg"
                                    alt="Experience"
                                    width={48}
                                    height={48}
                                    className="w-12 h-12 feature-icon"
                                />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Опыт</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Мы имеем более 5 лет опыта в подборе авто, логистике и таможенном оформлении
                                </p>
                            </div>
                        </div>

                        {/* Reliability */}
                        <div
                            ref={(el) => { featureRefs.current[5] = el; }}
                            className="space-y-4"
                        >
                            <div className="w-12 h-12 flex items-center justify-center">
                                <Image
                                    src="/assets/page-star.svg"
                                    alt="Reliability"
                                    width={48}
                                    height={48}
                                    className="w-12 h-12 feature-icon"
                                />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Надёжность</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    За время работы мы набрали базу надёжных партнёров и проверенных площадок в Азии и Европе
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Modal */}
            <ContactModal 
                isOpen={isContactModalOpen}
                onClose={() => setIsContactModalOpen(false)}
                title="Связаться с менеджером"
            />
        </section>
    );
}
