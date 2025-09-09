'use client';

import { useState } from 'react';
import { CardsData, CarCard } from '@/utils/adminData';
import ImageUpload from '@/components/ImageUpload';
import AddCarModal from '@/components/AddCarModal';

interface AdminCardsSectionProps {
  data: CardsData;
  onChange: (data: CardsData) => void;
}

export default function AdminCardsSection({ data, onChange }: AdminCardsSectionProps) {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const updateTitle = (title: string) => {
    onChange({ ...data, title });
  };

  const updateSubtitle = (subtitle: string) => {
    onChange({ ...data, subtitle });
  };

  const updateCard = (index: number, card: CarCard) => {
    const newCards = [...data.cards];
    newCards[index] = card;
    onChange({ ...data, cards: newCards });
  };

  const handleAddCard = (newCard: CarCard) => {
    onChange({ ...data, cards: [...data.cards, newCard] });
  };

  const removeCard = (index: number) => {
    const newCards = data.cards.filter((_, i) => i !== index);
    onChange({ ...data, cards: newCards });
    if (expandedCard === index) {
      setExpandedCard(null);
    } else if (expandedCard !== null && expandedCard > index) {
      setExpandedCard(expandedCard - 1);
    }
  };

  const toggleCardDetails = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const moveCard = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= data.cards.length) return;
    
    const newCards = [...data.cards];
    const [movedCard] = newCards.splice(fromIndex, 1);
    newCards.splice(toIndex, 0, movedCard);
    onChange({ ...data, cards: newCards });

    // Update expanded card index if needed
    if (expandedCard === fromIndex) {
      setExpandedCard(toIndex);
    } else if (expandedCard !== null) {
      if (fromIndex < expandedCard && toIndex >= expandedCard) {
        setExpandedCard(expandedCard - 1);
      } else if (fromIndex > expandedCard && toIndex <= expandedCard) {
        setExpandedCard(expandedCard + 1);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-semibold text-gray-900">Каталог автомобилей</h2>
        <p className="text-gray-600 mt-2">Управление заголовком секции и карточками автомобилей</p>
      </div>

      {/* Section Content */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Заголовок секции
          </label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => updateTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            placeholder="Каталог авто"
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
            placeholder="Описание каталога"
          />
        </div>
      </div>

      {/* Cards Management */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Автомобили ({data.cards.length})</h3>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Добавить автомобиль
          </button>
        </div>

        {/* Cards List */}
        <div className="space-y-4">
          {data.cards.map((card, index) => (
            <div key={card.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => moveCard(index, index - 1)}
                      disabled={index === 0}
                      className="text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                      </svg>
                    </button>
                    <button
                      onClick={() => moveCard(index, index + 1)}
                      disabled={index === data.cards.length - 1}
                      className="text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                      </svg>
                    </button>
                    <span className="text-sm text-gray-500 font-mono">#{index + 1}</span>
                  </div>
                  <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={card.imageUrl}
                      alt={card.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/hyunday.jpg';
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{card.title}</h4>
                    <p className="text-sm text-gray-600">{card.price} • {card.year}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleCardDetails(index)}
                    className="text-gray-600 hover:text-gray-900 transition-colors px-3 py-1 border border-gray-300 rounded-lg text-sm cursor-pointer"
                  >
                    {expandedCard === index ? 'Свернуть' : 'Редактировать'}
                  </button>
                  <button
                    onClick={() => removeCard(index)}
                    className="text-red-600 hover:text-red-700 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Expanded Card Editor */}
              {expandedCard === index && (
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-6">
                  {/* Image Upload */}
                  <div>
                    <ImageUpload
                      currentImage={card.imageUrl}
                      onImageChange={(imageUrl) => updateCard(index, {
                        ...card,
                        imageUrl
                      })}
                      label="Изображение автомобиля"
                    />
                  </div>

                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Название автомобиля
                      </label>
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) => updateCard(index, { ...card, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="BMW X5"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Цена
                      </label>
                      <input
                        type="text"
                        value={card.price}
                        onChange={(e) => updateCard(index, { ...card, price: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="3 000 000 ₽"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Двигатель
                      </label>
                      <input
                        type="text"
                        value={card.engine}
                        onChange={(e) => updateCard(index, { ...card, engine: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="2.0T л., 258 л.с."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Привод
                      </label>
                      <select
                        value={card.drive}
                        onChange={(e) => updateCard(index, { ...card, drive: e.target.value })}
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
                        value={card.modification}
                        onChange={(e) => updateCard(index, { ...card, modification: e.target.value })}
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
                        value={card.distance}
                        onChange={(e) => updateCard(index, { ...card, distance: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="50 000 км."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Год выпуска
                      </label>
                      <input
                        type="text"
                        value={card.year}
                        onChange={(e) => updateCard(index, { ...card, year: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="2024 год"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Страна
                      </label>
                      <select
                        value={card.location}
                        onChange={(e) => updateCard(index, { ...card, location: e.target.value })}
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
                        value={card.date}
                        onChange={(e) => updateCard(index, { ...card, date: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="27 июля"
                      />
                    </div>

                    <div className="flex items-center">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={card.isNew}
                          onChange={(e) => updateCard(index, { ...card, isNew: e.target.checked })}
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
                        value={card.externalLink}
                        onChange={(e) => updateCard(index, { ...card, externalLink: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="https://auto.ru/cars/bmw/x5/"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {data.cards.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p>Нет автомобилей</p>
            <p className="text-sm">Нажмите &ldquo;Добавить автомобиль&rdquo; чтобы создать первую карточку</p>
          </div>
        )}
      </div>

      {/* Preview */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-medium text-gray-900 mb-4">Предварительный просмотр</h4>
        <div className="bg-white rounded-lg p-6 border-2 border-dashed border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {data.title}
          </h2>
          <p className="text-gray-600 mb-4">
            {data.subtitle}
          </p>
          <div className="text-sm text-gray-500">
            Показывается {data.cards.length} автомобилей
          </div>
        </div>
      </div>

      {/* Add Car Modal */}
      <AddCarModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddCard}
      />
    </div>
  );
}