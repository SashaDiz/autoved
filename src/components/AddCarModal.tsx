'use client';

import { useState } from 'react';
import { CarCard } from '@/utils/adminData';
import BaseModal from './BaseModal';
import ImageUpload from './ImageUpload';

// Utility functions for formatting
const formatNumber = (value: string): string => {
  // Remove all non-digit characters
  const numbers = value.replace(/\D/g, '');
  if (!numbers) return '';
  
  // Add spaces every 3 digits from the right
  return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

const parseNumber = (value: string): string => {
  // Remove all non-digit characters
  return value.replace(/\D/g, '');
};

const formatPrice = (value: string): string => {
  const formatted = formatNumber(value);
  return formatted ? `${formatted} ₽` : '';
};

const formatDistance = (value: string): string => {
  const formatted = formatNumber(value);
  return formatted ? `${formatted} км` : '';
};

interface AddCarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (car: CarCard) => void;
}

export default function AddCarModal({ isOpen, onClose, onSave }: AddCarModalProps) {
  const [car, setCar] = useState<Omit<CarCard, 'id'>>({
    title: '',
    engine: '',
    drive: '4WD',
    modification: '',
    distance: '',
    imageUrl: '/assets/hyunday.jpg',
    externalLink: '',
    price: '',
    year: '',
    location: 'CN',
    isNew: false, // Don't mark as new by default
    date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
  });

  // Separate state for formatted display values
  const [formattedPrice, setFormattedPrice] = useState('');
  const [formattedDistance, setFormattedDistance] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!car.title || !car.price || !car.engine) {
      return; // Basic validation
    }

    setIsLoading(true);
    try {
      // Generate ID and save with formatted values
      const newCar: CarCard = {
        ...car,
        price: formatPrice(car.price),
        distance: formatDistance(car.distance),
        id: `car-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`
      };
      await onSave(newCar);
      onClose();
      // Reset form
      setCar({
        title: '',
        engine: '',
        drive: '4WD',
        modification: '',
        distance: '',
        imageUrl: '/assets/hyunday.jpg',
        externalLink: '',
        price: '',
        year: '',
        location: 'CN',
        isNew: false,
        date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
      });
      setFormattedPrice('');
      setFormattedDistance('');
    } finally {
      setIsLoading(false);
    }
  };

  const updateCar = (field: keyof Omit<CarCard, 'id'>, value: string | boolean) => {
    setCar(prev => ({ ...prev, [field]: value }));
  };

  const handlePriceChange = (value: string) => {
    const parsed = parseNumber(value);
    setCar(prev => ({ ...prev, price: parsed }));
    setFormattedPrice(formatPrice(parsed));
  };

  const handleDistanceChange = (value: string) => {
    const parsed = parseNumber(value);
    setCar(prev => ({ ...prev, distance: parsed }));
    setFormattedDistance(formatDistance(parsed));
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Добавить новый автомобиль"
      onSave={handleSave}
      isLoading={isLoading}
    >
      <div className="space-y-6">
        {/* Image Upload */}
        <div>
          <ImageUpload
            currentImage={car.imageUrl}
            onImageChange={(imageUrl) => updateCar('imageUrl', imageUrl)}
            label="Изображение автомобиля"
          />
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Название автомобиля *
            </label>
            <input
              type="text"
              value={car.title}
              onChange={(e) => updateCar('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="BMW X5"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Цена *
            </label>
            <input
              type="text"
              value={formattedPrice}
              onChange={(e) => handlePriceChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="3 000 000 ₽"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Двигатель *
            </label>
            <input
              type="text"
              value={car.engine}
              onChange={(e) => updateCar('engine', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="2.0T л., 258 л.с."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Привод
            </label>
            <select
              value={car.drive}
              onChange={(e) => updateCar('drive', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            >
              <option value="4WD">4WD</option>
              <option value="2WD">2WD</option>
              <option value="FWD">FWD</option>
              <option value="RWD">RWD</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Модификация
            </label>
            <input
              type="text"
              value={car.modification}
              onChange={(e) => updateCar('modification', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="Premium"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Пробег
            </label>
            <input
              type="text"
              value={formattedDistance}
              onChange={(e) => handleDistanceChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="50 000 км"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Год выпуска
            </label>
            <input
              type="text"
              value={car.year}
              onChange={(e) => updateCar('year', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="2024 год"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Страна
            </label>
            <select
              value={car.location}
              onChange={(e) => updateCar('location', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            >
              <option value="CN">Китай (CN)</option>
              <option value="JP">Япония (JP)</option>
              <option value="KR">Южная Корея (KR)</option>
              <option value="DE">Германия (DE)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Дата добавления
            </label>
            <input
              type="text"
              value={car.date}
              onChange={(e) => updateCar('date', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="27 июля"
            />
          </div>

          <div className="flex items-center">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={car.isNew}
                onChange={(e) => updateCar('isNew', e.target.checked)}
                className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
              />
              <span className="text-sm font-medium text-gray-700">Новый автомобиль</span>
            </label>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Внешняя ссылка
            </label>
            <input
              type="url"
              value={car.externalLink}
              onChange={(e) => updateCar('externalLink', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="https://auto.ru/cars/bmw/x5/"
            />
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
