'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface CardProps {
  title: string;
  engine: string;
  drive: string;
  modification: string;
  distance: string;
  imageUrl: string;
  externalLink: string;
  price?: string;
  year?: string;
  location?: string;
  isNew?: boolean;
  date?: string;
}

export default function Card({
  title,
  engine,
  drive,
  modification,
  distance,
  imageUrl,
  externalLink,
  price,
  year,
  location,
  isNew = false,
  date
}: CardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;

    // Create timeline for hover animations
    tl.current = gsap.timeline({ paused: true });
    
    // Set initial state
    gsap.set(card, {
      transformPerspective: 1000,
      transformOrigin: 'center center',
    });

    // Create hover animation timeline
    tl.current
      .to(card, {
        y: -20,
        z: 50,
        scale: 1.02,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        duration: 0.4,
        ease: 'power2.out',
      });

    // Mouse enter event
    const handleMouseEnter = () => {
      tl.current?.play();
    };

    // Mouse leave event
    const handleMouseLeave = () => {
      tl.current?.reverse();
      // Reset rotation on leave
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    // Mouse move event for rotation
    const handleMouseMove = (e: MouseEvent) => {
      if (!card) return;
      
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      
      // Calculate rotation based on mouse position
      const rotationY = (deltaX / rect.width) * 20; // Max 20 degrees
      const rotationX = -(deltaY / rect.height) * 15; // Max 15 degrees
      
      gsap.to(card, {
        rotationX,
        rotationY,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mousemove', handleMouseMove);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('mousemove', handleMouseMove);
      tl.current?.kill();
    };
  }, []);
  return (
    <Link
      ref={cardRef}
      href={externalLink}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col h-full bg-white rounded-xl border-1 border-gray-200 hover:border-gray-300 overflow-hidden cursor-pointer"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Card Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {isNew && (
            <span className="bg-green-500 text-white text-xs font-medium px-3 py-1 rounded-lg">
              Новый
            </span>
          )}
        </div>

        <div className='absolute bottom-4 right-4'>

          {location && (
            <div>
              <Image
                src={`/assets/flags/${location}.svg`}
                alt={location}
                width={16}
                height={12}
                className="w-auto h-8 rounded-sm"
                onError={(e) => {
                  // Fallback to text if flag image doesn't exist
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>

      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex flex-col flex-grow">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {title}
          </h3>

          {year && (
            <p className="text-sm text-gray-500">{year}</p>
          )}

          <div className="w-full h-px bg-gray-200 my-3"></div>

          <div className='flex flex-col gap-4 items-start flex-grow'>
            <div className='flex items-start gap-4 justify-between w-full'>
              <span className='text-gray-500 text-sm'>Двигатель</span>
              <p className="text-md text-gray-900 text-end">{engine}</p>
            </div>

            <div className='flex items-start gap-4 justify-between w-full'>
              <span className='text-gray-500 text-sm'>Привод</span>
              <p className="text-md text-gray-900 text-end">{drive}</p>
            </div>


            <div className='flex items-start gap-4 justify-between w-full'>
              <span className='text-gray-500 text-sm'>Комплектация</span>
              <p className="text-md text-gray-900 text-end">{modification}</p>
            </div>

            <div className='flex items-start gap-4 justify-between w-full'>
              <span className='text-gray-500 text-sm'>Пробег</span>
              <p className="text-md text-gray-900 text-end">{distance}</p>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-gray-200 my-3"></div>

        {/* Call to action */}
        <div className="flex items-center justify-between flex-wrap gap-4 mt-auto">
          <div className='flex flex-col items-start flex-shrink-0'>
            <p className="text-2xl font-semibold text-gray-900">{price}</p>
            <p className="text-xs text-gray-500">По курсу на {date}</p>
          </div>
          <div className='flex items-center flex-shrink-0 gap-2'>
            <span className="text-gray-900 font-medium text-sm text-end leading-none group-hover:text-green-600 transition-colors">
              Уточнить
              <br />наличие
            </span>
            <svg width="32" height="32" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className='stroke-gray-900 transition-all duration-300 group-hover:stroke-green-600 group-hover:-translate-y-1 group-hover:translate-x-1'>
              <path d="M22.9558 7.04541H14.1174M22.9558 7.04541L22.9553 15.8842M22.9558 7.04541L7.0459 22.9553" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
