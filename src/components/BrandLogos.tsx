'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const brands = [
  { name: 'BMW', path: 'bmw/bmw_1x.webp' },
  { name: 'Honda', path: 'honda/honda_1x.webp' },
  { name: 'Hyundai', path: 'hyundai/hyundai_1x.webp' },
  { name: 'Kia', path: 'kia/kia_1x.webp' },
  { name: 'Nissan', path: 'nissan/nissan_1x.webp' },
  { name: 'Mazda', path: 'mazda/mazda_1x.webp' },
  { name: 'Subaru', path: 'subaru/subaru_1x.webp' },
  { name: 'Mitsubishi', path: 'mitsubishi/mitsubishi_1x.webp' },
  { name: 'Infiniti', path: 'infiniti/infiniti_1x.webp' },
  { name: 'Lexus', path: 'lexus/lexus_1x.webp' },
  { name: 'Mercedes Benz', path: 'mercedes_benz/mercedes_benz_1x.webp' },
  { name: 'Audi', path: 'audi/audi_1x.webp' },
  { name: 'Volkswagen', path: 'volkswagen/volkswagen_1x.webp' },
  { name: 'Volvo', path: 'volvo/volvo_1x.webp' },
  { name: 'Ford', path: 'ford/ford_1x.webp' },
  { name: 'Chevrolet', path: 'chevrolet/chevrolet_1x.webp' },
  { name: 'Jeep', path: 'jeep/jeep_1x.webp' },
  { name: 'Land Rover', path: 'land_rover/land_rover_1x.webp' },
  { name: 'Renault', path: 'renault/renault_1x.webp' },
  { name: 'Citroen', path: 'citroen/citroen_1x.webp' },
  { name: 'BYD', path: 'byd/byd_1x.webp' },
  { name: 'Nio', path: 'nio/nio_1x.webp' },
  { name: 'Lixiang', path: 'lixiang/lixiang_1x.webp' },
  { name: 'Geely', path: 'geely/geely_1x.webp' },
  { name: 'Great Wall', path: 'great_wall/great_wall_1x.webp' },
  { name: 'Chery', path: 'chery/chery_1x.webp' }
];

export default function BrandLogos() {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let tween: gsap.core.Tween | null = null;

    const setupAnimation = () => {
      if (containerRef.current && firstSetRef.current) {
        const container = containerRef.current;
        const firstSet = firstSetRef.current;
        
        // Kill existing animation
        if (tween) tween.kill();
        
        // Check if elements have proper dimensions
        if (firstSet.offsetWidth === 0) {
          console.warn('BrandLogos: First set width is 0, skipping animation');
          return;
        }
        
        // Get the width of one complete set of brands including the gap
        const firstSetWidth = firstSet.offsetWidth + 24; // 24px = ml-6 gap
        
        // Create infinite scrolling animation
        gsap.set(container, { x: 0 });
        
        tween = gsap.to(container, {
          x: -firstSetWidth,
          duration: 100,
          ease: 'none',
          repeat: -1,
        });
      }
    };

    // Setup initial animation
    setupAnimation();

    // Handle window resize
    const handleResize = () => {
      setTimeout(setupAnimation, 100); // Small delay to ensure layout is complete
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      if (tween) tween.kill();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div ref={containerRef} className="flex">
        {/* First set of brands */}
        <div ref={firstSetRef} className="flex items-center gap-6 flex-shrink-0">
          {brands.map((brand) => (
            <Image 
              key={`first-${brand.name}`}
              src={`/assets/brands/${brand.path}`} 
              alt={brand.name} 
              width={100} 
              height={40} 
              className="h-10 w-auto object-contain filter grayscale opacity-50" 
            />
          ))}
        </div>

        {/* Duplicate set for seamless loop */}
        <div className="flex items-center gap-6 flex-shrink-0 ml-6">
          {brands.map((brand) => (
            <Image 
              key={`second-${brand.name}`}
              src={`/assets/brands/${brand.path}`} 
              alt={brand.name} 
              width={100} 
              height={40} 
              className="h-10 w-auto object-contain filter grayscale opacity-50" 
            />
          ))}
        </div>
      </div>
      
      {/* Left gradient overlay */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-120 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
      
      {/* Right gradient overlay */}
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-120 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
    </div>
  );
}
