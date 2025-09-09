'use client';

import { useState } from 'react';
import { HeroData, HeroSlide } from '@/utils/adminData';
import ImageUpload from '@/components/ImageUpload';
import AddSlideModal from '@/components/AddSlideModal';

interface AdminHeroSectionProps {
  data: HeroData;
  onChange: (data: HeroData) => void;
}

export default function AdminHeroSection({ data, onChange }: AdminHeroSectionProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const updateTitle = (title: string) => {
    onChange({ ...data, title });
  };

  const updateSubtitle = (subtitle: string) => {
    onChange({ ...data, subtitle });
  };

  const updateSlide = (index: number, slide: HeroSlide) => {
    const newSlides = [...data.slides];
    newSlides[index] = slide;
    onChange({ ...data, slides: newSlides });
  };

  const handleAddSlide = (newSlide: HeroSlide) => {
    onChange({ ...data, slides: [...data.slides, newSlide] });
  };

  const removeSlide = (index: number) => {
    if (data.slides.length <= 1) return; // Don't allow removing the last slide
    const newSlides = data.slides.filter((_, i) => i !== index);
    onChange({ ...data, slides: newSlides });
    if (activeSlide >= newSlides.length) {
      setActiveSlide(Math.max(0, newSlides.length - 1));
    }
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-semibold text-gray-900">Главный экран (Hero)</h2>
        <p className="text-gray-600 mt-2">Управление заголовком, подзаголовком и слайдами</p>
      </div>

      {/* Main Text Content */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Главный заголовок
          </label>
          <textarea
            value={data.title}
            onChange={(e) => updateTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
            rows={2}
            placeholder="Заголовок главного экрана"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Подзаголовок
          </label>
          <textarea
            value={data.subtitle}
            onChange={(e) => updateSubtitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
            rows={3}
            placeholder="Описание под заголовком"
          />
        </div>
      </div>

      {/* Slides Management */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Слайды ({data.slides.length})</h3>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Добавить слайд
          </button>
        </div>

        {/* Slide Tabs */}
        <div className="flex flex-wrap gap-2">
          {data.slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setActiveSlide(index)}
              className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                activeSlide === index
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Слайд {index + 1}
            </button>
          ))}
        </div>

        {/* Active Slide Editor */}
        {data.slides[activeSlide] && (
          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900">
                Редактирование слайда {activeSlide + 1}
              </h4>
              {data.slides.length > 1 && (
                <button
                  onClick={() => removeSlide(activeSlide)}
                  className="text-red-600 hover:text-red-700 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Удалить слайд
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="md:col-span-2">
                <ImageUpload
                  currentImage={data.slides[activeSlide].backgroundImage}
                  onImageChange={(imageUrl) => updateSlide(activeSlide, {
                    ...data.slides[activeSlide],
                    backgroundImage: imageUrl
                  })}
                  label="Фоновое изображение слайда"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Название автомобиля
                </label>
                <input
                  type="text"
                  value={data.slides[activeSlide].carInfo.name}
                  onChange={(e) => updateSlide(activeSlide, {
                    ...data.slides[activeSlide],
                    carInfo: {
                      ...data.slides[activeSlide].carInfo,
                      name: e.target.value
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="Toyota Camry"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Характеристики
                </label>
                <input
                  type="text"
                  value={data.slides[activeSlide].carInfo.specs}
                  onChange={(e) => updateSlide(activeSlide, {
                    ...data.slides[activeSlide],
                    carInfo: {
                      ...data.slides[activeSlide].carInfo,
                      specs: e.target.value
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="2.5L, 203 л.с."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Год выпуска
                </label>
                <input
                  type="text"
                  value={data.slides[activeSlide].carInfo.year}
                  onChange={(e) => updateSlide(activeSlide, {
                    ...data.slides[activeSlide],
                    carInfo: {
                      ...data.slides[activeSlide].carInfo,
                      year: e.target.value
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="2024 год"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Preview */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-medium text-gray-900 mb-4">Предварительный просмотр</h4>
        <div className="bg-white rounded-lg p-6 border-2 border-dashed border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2 leading-tight">
            {data.title}
          </h1>
          <p className="text-gray-600 mb-4 leading-relaxed">
            {data.subtitle}
          </p>
          <div className="text-sm text-gray-500">
            Текущий слайд: <strong>{data.slides[activeSlide]?.carInfo.name}</strong> - {data.slides[activeSlide]?.carInfo.specs}, {data.slides[activeSlide]?.carInfo.year}
          </div>
        </div>
      </div>

      {/* Add Slide Modal */}
      <AddSlideModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddSlide}
      />
    </div>
  );
}