'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ProcessSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const stepsRef = useRef<HTMLDivElement[]>([]);
    const ctaRef = useRef<HTMLDivElement>(null);

    const steps = [
        {
            title: 'Бесплатная консультация',
            description: 'Наши менеджеры подробно расскажут вам о всех нюансах покупки авто в Азии и Европе, и сориентируют по вариантам авто и стоимости.'
        },
        {
            title: 'Заключение договора',
            description: 'После консультации мы заключаем договор, в котором прописываются все условия и гарантии, чтобы сделать процесс покупки авто комфортным и прозрачным для вас.'
        },
        {
            title: 'Подбор авто под ваш бюджет',
            description: 'Дальше наши специалисты подберут варианты авто, в соответствии с вашими пожеланиями по марке, модели и комплектации под ваш бюджет.'
        },
        {
            title: 'Проверка и выкуп авто',
            description: 'Выбранный вариант наша команда проверяет на соответствие заявленному состоянию, наличие необходимых документов.'
        },
        {
            title: 'Доставка и страхование',
            description: 'После выкупа наши специалисты по логистике организуют доставку авто из Китая, Южной Кореи, Японии и Германии в Россию. На каждом этапе пути авто страхуется от повреждений.'
        },
        {
            title: 'Таможенное оформление',
            description: 'Наши юристы берут на себя всё юридическое сопровождение сделки и таможенное оформление транспортного средства, чтобы вы получили ваше авто гарантированно и в срок.'
        },
        {
            title: 'Выдача авто или доставка по РФ',
            description: 'После того, как авто пересечёт границу РФ мы организуем доставку авто в ваш регион и поможем с переоформлением всех необходимых документов.'
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Random rotation angles for each step
            const rotationAngles = [-3, 2, -4, 3, -2, 4, -5, 3];

            // Create scroll trigger when section enters the screen
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top 20%", // Trigger when section is 80% into viewport
                once: true, // Only trigger once per page load
                onEnter: () => {

                    // Create the main timeline
                    const tl = gsap.timeline();

                    // Animate each step one by one - simple float, scale, rotate
                    stepsRef.current.forEach((step, index) => {
                        if (step) {
                            const delay = index * 0.4 + 0.3; // Faster delay between cards
                            const rotation = rotationAngles[index] || 0;

                            // Each card's complete animation cycle
                            tl
                                // Float up and scale with rotation
                                .to(step, {
                                    y: -15,
                                    rotation: rotation * 0.5, // Less rotation
                                    scale: 1.05, // Smaller scale
                                    duration: 0.3, // Faster
                                    ease: "power2.out"
                                }, delay)
                                // Return to original position
                                .to(step, {
                                    y: 0,
                                    scale: 1,
                                    rotation: 0,
                                    duration: 0.3, // Faster
                                    ease: "power2.inOut"
                                }, delay + 0.3);
                        }
                    });

                    // Animate CTA card with special effect - same simplified pattern
                    if (ctaRef.current) {
                        const ctaDelay = stepsRef.current.length * 0.4 + 0.5; // Match the new faster timing

                        tl
                            // Float up and scale with rotation
                            .to(ctaRef.current, {
                                y: -20,
                                rotation: -2, // Less rotation
                                scale: 1.08, // Smaller scale
                                duration: 0.4, // Faster
                                ease: "power2.out"
                            }, ctaDelay)
                            // Return to original position
                            .to(ctaRef.current, {
                                y: 0,
                                scale: 1,
                                rotation: 0,
                                duration: 0.4, // Faster
                                ease: "power2.inOut"
                            }, ctaDelay + 0.4);
                    }
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Helper function to add refs to steps
    const addToStepsRef = (el: HTMLDivElement | null, index: number) => {
        if (el) {
            stepsRef.current[index] = el;
        }
    };

    return (
        <section ref={sectionRef} className="max-w-[1920px] w-full mx-auto relative bg-gray-900 text-white py-16 xl:py-24 px-6 xl:px-20">
            {/* Header */}
            <div ref={headerRef} className="text-center sm:text-left mb-10 xl:mb-12 max-w-lg">
                <p className="text-gray-500 text-md font-normal tracking-wide mb-2 block">
                    # Как проходит процесс
                </p>
                <h2 className="text-4xl xl:text-5xl font-semibold leading-tight">
                Весь путь&nbsp;&mdash; под нашим контролем
                </h2>
            </div>

            {/* Main Content Layout - 4 columns x 2 rows */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {/* First Row - Steps 1-4 */}
                {steps.slice(0, 4).map((step, index) => (
                    <div
                        key={index}
                        ref={(el) => addToStepsRef(el, index)}
                        className="bg-gray-900 border border-white rounded-xl p-6"
                    >
                        <div className="mb-4 flex items-center gap-4">
                            <div className="w-12 h-12 xl:w-14 xl:h-14 flex-shrink-0">
                                <Image
                                    src={`/assets/${index + 1}.svg`}
                                    alt={`Step ${index + 1}`}
                                    width={56}
                                    height={56}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <h3 className="text-xl xl:text-[26px] font-semibold text-white leading-tight">
                                {step.title}
                            </h3>
                        </div>

                        <p className="text-white text-sm xl:text-base leading-relaxed">
                            {step.description}
                        </p>
                    </div>
                ))}

                {/* Second Row - Steps 5-7 + CTA */}
                {steps.slice(4, 7).map((step, index) => (
                    <div
                        key={index + 4}
                        ref={(el) => addToStepsRef(el, index + 4)}
                        className="bg-gray-900 border border-white rounded-xl p-6"
                    >
                        <div className="mb-4 flex items-center gap-4">
                            <div className="w-12 h-12 xl:w-14 xl:h-14 flex-shrink-0">
                                <Image
                                    src={`/assets/${index + 5}.svg`}
                                    alt={`Step ${index + 5}`}
                                    width={56}
                                    height={56}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <h3 className="text-xl xl:text-[26px] font-semibold text-white leading-tight">
                                {step.title}
                            </h3>
                        </div>
                        <p className="text-white text-sm xl:text-base leading-relaxed">
                            {step.description}
                        </p>
                    </div>
                ))}

                {/* Call to Action Card - 4th position in second row */}
                <div ref={ctaRef} className="bg-green-500 rounded-2xl p-6 xl:p-8 flex flex-col justify-center">
                    <h3 className="text-xl xl:text-2xl font-semibold text-white mb-6 leading-tight">
                        Запишитесь на бесплатную<br />
                        консультацию сейчас
                    </h3>
                    <button className="cursor-pointer bg-white border-2 border-gray-200 shadow-inner text-gray-900 p-2 pl-6 rounded-full text-sm sm:text-base xl:text-lg font-semibold transition-colors flex items-center gap-2 w-full sm:w-auto justify-between group">
                        Оставить заявку
                        <div className='bg-green-500 rounded-full p-5 border-1 border-black/5 shadow-md transition-transform duration-300 group-hover:scale-110'>
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:scale-110" fill="white" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
        </section>
    );
}
