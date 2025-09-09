'use client';

import { useState } from 'react';
import { HeroSlide } from '@/utils/adminData';
import BaseModal from './BaseModal';
import ImageUpload from './ImageUpload';

interface AddSlideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (slide: HeroSlide) => void;
}

export default function AddSlideModal({ isOpen, onClose, onSave }: AddSlideModalProps) {
  const [slide, setSlide] = useState<Omit<HeroSlide, 'id'>>({
    backgroundImage: '/assets/bg_img1.webp',
    carInfo: {
      name: '',
      specs: '',
      year: ''
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!slide.carInfo.name || !slide.carInfo.specs || !slide.carInfo.year) {
      return; // Basic validation
    }

    setIsLoading(true);
    try {
      // Generate ID and save
      const newSlide: HeroSlide = {
        ...slide,
        id: `slide-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`
      };
      await onSave(newSlide);
      onClose();
      // Reset form
      setSlide({
        backgroundImage: '/assets/bg_img1.webp',
        carInfo: {
          name: '',
          specs: '',
          year: ''
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateSlide = (field: keyof Omit<HeroSlide, 'id'>, value: string) => {
    setSlide(prev => ({ ...prev, [field]: value }));
  };

  const updateCarInfo = (field: keyof HeroSlide['carInfo'], value: string) => {
    setSlide(prev => ({
      ...prev,
      carInfo: {
        ...prev.carInfo,
        [field]: value
      }
    }));
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Добавить новый слайд"
      onSave={handleSave}
      isLoading={isLoading}
    >
      <div className="space-y-6">
        {/* Image Upload */}
        <div>
          <ImageUpload
            currentImage={slide.backgroundImage}
            onImageChange={(imageUrl) => updateSlide('backgroundImage', imageUrl)}
            label="Фоновое изображение слайда"
          />
        </div>

        {/* Car Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Название автомобиля *
            </label>
            <input
              type="text"
              value={slide.carInfo.name}
              onChange={(e) => updateCarInfo('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="Toyota Camry"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Характеристики *
            </label>
            <input
              type="text"
              value={slide.carInfo.specs}
              onChange={(e) => updateCarInfo('specs', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="2.5L, 203 л.с."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Год выпуска *
            </label>
            <input
              type="text"
              value={slide.carInfo.year}
              onChange={(e) => updateCarInfo('year', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="2024 год"
              required
            />
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
