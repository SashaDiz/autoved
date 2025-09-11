'use client';

import { useState } from 'react';
import { VideoReview } from '@/utils/adminData';
import BaseModal from './BaseModal';
import ImageUpload from './ImageUpload';

interface AddVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (review: VideoReview) => void;
}

export default function AddVideoModal({ isOpen, onClose, onSave }: AddVideoModalProps) {
  const [review, setReview] = useState<Omit<VideoReview, 'id'>>({
    customerName: '',
    location: '',
    carModel: '',
    coverImage: '/assets/bmw-6.jpg',
    vkEmbedUrl: '',
    action: 'Смотреть'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error' | null>(null);

  const handleSave = async () => {
    if (!review.customerName || !review.location || !review.carModel || !review.vkEmbedUrl) {
      return; // Basic validation
    }

    setIsLoading(true);
    setSaveStatus('saving');
    try {
      // Generate ID and save
      const newReview: VideoReview = {
        ...review,
        id: `review-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`
      };
      await onSave(newReview);
      setSaveStatus('saved');
      
      // Show success status for 2 seconds, then close modal
      setTimeout(() => {
        onClose();
        // Reset form
        setReview({
          customerName: '',
          location: '',
          carModel: '',
          coverImage: '/assets/bmw-6.jpg',
          vkEmbedUrl: '',
          action: 'Смотреть'
        });
        setSaveStatus(null);
      }, 2000);
    } catch (error) {
      setSaveStatus('error');
      console.error('Failed to save video review:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateReview = (field: keyof Omit<VideoReview, 'id'>, value: string) => {
    setReview(prev => ({ ...prev, [field]: value }));
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Добавить новый видео отзыв"
      onSave={handleSave}
      isLoading={isLoading}
      saveStatus={saveStatus}
    >
      <div className="space-y-6">
        {/* Image Upload */}
        <div>
          <ImageUpload
            currentImage={review.coverImage}
            onImageChange={(imageUrl) => updateReview('coverImage', imageUrl)}
            label="Обложка видео"
          />
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Имя клиента *
            </label>
            <input
              type="text"
              value={review.customerName}
              onChange={(e) => updateReview('customerName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="Имя клиента"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Город *
            </label>
            <input
              type="text"
              value={review.location}
              onChange={(e) => updateReview('location', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="Город"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Модель автомобиля *
            </label>
            <input
              type="text"
              value={review.carModel}
              onChange={(e) => updateReview('carModel', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="BMW X5"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Текст кнопки
            </label>
            <input
              type="text"
              value={review.action}
              onChange={(e) => updateReview('action', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="Смотреть"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              VK Embed URL *
            </label>
            <input
              type="text"
              value={review.vkEmbedUrl}
              onChange={(e) => updateReview('vkEmbedUrl', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="https://vk.com/video_ext.php?..."
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Получите embed URL из ВКонтакте для интеграции видео
            </p>
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
