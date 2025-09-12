'use client';

import { useState } from 'react';
import Image from 'next/image';
import { VideoReview } from '@/utils/adminData';
import ImageUpload from '@/components/ImageUpload';
import AddVideoModal from '@/components/AddVideoModal';
import ConfirmationModal from '@/components/ConfirmationModal';

interface AdminVideoSectionProps {
  data: VideoReview[];
  originalData?: VideoReview[];
  onChange: (data: VideoReview[], changeType: 'header' | 'items') => void;
  onSaveHeader: () => void;
  unsavedChanges: { header: boolean };
  saveStatus: { header: 'saved' | 'saving' | 'error' | null };
}

export default function AdminVideoSection({ data, originalData, onChange }: AdminVideoSectionProps) {
  const [activeReview, setActiveReview] = useState(0);
  const [expandedReview, setExpandedReview] = useState<number | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // State for tracking changes in each review
  const [reviewChanges, setReviewChanges] = useState<Record<number, VideoReview>>({});
  const [reviewSaveStatus, setReviewSaveStatus] = useState<Record<number, 'saved' | 'saving' | 'error' | null>>({});

  const updateReview = (index: number, review: VideoReview) => {
    const newReviews = [...data];
    newReviews[index] = review;
    onChange(newReviews, 'items');
    
    // Track changes for this review
    setReviewChanges(prev => ({
      ...prev,
      [index]: review
    }));
  };

  const saveReview = async (index: number) => {
    if (!reviewChanges[index]) return;
    
    setReviewSaveStatus(prev => ({ ...prev, [index]: 'saving' }));
    
    try {
      // Save the updated reviews to the database
      const updatedReviews = [...data];
      updatedReviews[index] = reviewChanges[index];
      
      const response = await fetch('/api/admin/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          section: 'videoReviews', 
          data: updatedReviews 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save video reviews');
      }
      
      // Clear the changes for this review
      setReviewChanges(prev => {
        const newChanges = { ...prev };
        delete newChanges[index];
        return newChanges;
      });
      
      setReviewSaveStatus(prev => ({ ...prev, [index]: 'saved' }));
      
      // Clear saved status after 2 seconds
      setTimeout(() => {
        setReviewSaveStatus(prev => ({ ...prev, [index]: null }));
      }, 2000);
    } catch (error) {
      console.error('Error saving video review:', error);
      setReviewSaveStatus(prev => ({ ...prev, [index]: 'error' }));
    }
  };

  const cancelReviewChanges = (index: number) => {
    // Restore original review data
    if (originalData && originalData[index]) {
      const originalReview = originalData[index];
      const newReviews = [...data];
      newReviews[index] = originalReview;
      onChange(newReviews, 'items');
    }
    
    // Clear changes for this review
    setReviewChanges(prev => {
      const newChanges = { ...prev };
      delete newChanges[index];
      return newChanges;
    });
    
    // Clear save status
    setReviewSaveStatus(prev => ({ ...prev, [index]: null }));
  };

  const handleAddReview = async (newReview: VideoReview) => {
    try {
      // Add the new review to the current data
      const updatedReviews = [...data, newReview];
      
      // Save to database
      const response = await fetch('/api/admin/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          section: 'videoReviews', 
          data: updatedReviews 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save new video review');
      }
      
      // Update local state
      onChange(updatedReviews, 'items');
    } catch (error) {
      console.error('Error adding video review:', error);
      // Still update local state for immediate feedback
      onChange([...data, newReview], 'items');
    }
  };

  const handleDeleteClick = (index: number) => {
    setReviewToDelete(index);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteReview = async () => {
    if (reviewToDelete === null) return;
    
    setIsDeleting(true);
    try {
      const newReviews = data.filter((_, i) => i !== reviewToDelete);
      
      // Save to database
      const response = await fetch('/api/admin/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          section: 'videoReviews', 
          data: newReviews 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete video review');
      }
      
      // Update local state
      onChange(newReviews, 'items');
      if (activeReview >= newReviews.length) {
        setActiveReview(Math.max(0, newReviews.length - 1));
      }
      
      // Close modal
      setIsDeleteModalOpen(false);
      setReviewToDelete(null);
    } catch (error) {
      console.error('Error deleting video review:', error);
      // Still update local state for immediate feedback
      const newReviews = data.filter((_, i) => i !== reviewToDelete);
      onChange(newReviews, 'items');
      if (activeReview >= newReviews.length) {
        setActiveReview(Math.max(0, newReviews.length - 1));
      }
      
      // Close modal
      setIsDeleteModalOpen(false);
      setReviewToDelete(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDeleteReview = () => {
    setIsDeleteModalOpen(false);
    setReviewToDelete(null);
  };

  const toggleReviewDetails = (index: number) => {
    setExpandedReview(expandedReview === index ? null : index);
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-gray-200 pb-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Видео отзывы</h2>
          <p className="text-gray-600 mt-2">Управление видео отзывами клиентов</p>
        </div>
      </div>

      {/* Add Review Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Отзывы ({data.length})</h3>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Добавить отзыв
        </button>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {data.map((review, index) => (
          <div key={review.id} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden relative">
                  <Image
                    src={review.coverImage}
                    alt={review.customerName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    {review.customerName} ({review.location})
                  </h4>
                  <p className="text-sm text-gray-600">{review.carModel}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleReviewDetails(index)}
                  className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                >
                  {expandedReview === index ? 'Свернуть' : 'Редактировать'}
                </button>
                <button
                  onClick={() => handleDeleteClick(index)}
                  className="text-red-600 hover:text-red-700 transition-colors ml-2 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Expanded Review Editor */}
            {expandedReview === index && (
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Имя клиента
                  </label>
                  <input
                    type="text"
                    value={review.customerName}
                    onChange={(e) => updateReview(index, {
                      ...review,
                      customerName: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="Имя клиента"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Город
                  </label>
                  <input
                    type="text"
                    value={review.location}
                    onChange={(e) => updateReview(index, {
                      ...review,
                      location: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="Город"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Модель автомобиля
                  </label>
                  <input
                    type="text"
                    value={review.carModel}
                    onChange={(e) => updateReview(index, {
                      ...review,
                      carModel: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="BMW X5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Текст кнопки
                  </label>
                  <input
                    type="text"
                    value={review.action}
                    onChange={(e) => updateReview(index, {
                      ...review,
                      action: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="Смотреть"
                  />
                </div>

                <div className="md:col-span-2">
                  <ImageUpload
                    currentImage={review.coverImage}
                    onImageChange={(imageUrl) => updateReview(index, {
                      ...review,
                      coverImage: imageUrl
                    })}
                    label="Обложка видео"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    VK Embed URL
                  </label>
                  <input
                    type="text"
                    value={review.vkEmbedUrl}
                    onChange={(e) => updateReview(index, {
                      ...review,
                      vkEmbedUrl: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="https://vk.com/video_ext.php?..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Получите embed URL из ВКонтакте для интеграции видео
                  </p>
                </div>
                </div>

                {/* Review Save/Cancel Buttons - Only show when there are unsaved changes */}
                {reviewChanges[index] && (
                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => cancelReviewChanges(index)}
                      className="px-4 py-2 rounded-lg font-medium transition-colors border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
                    >
                      Отменить
                    </button>
                    <button
                      onClick={() => saveReview(index)}
                      disabled={reviewSaveStatus[index] === 'saving'}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 cursor-pointer ${
                        reviewSaveStatus[index] !== 'saving'
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {reviewSaveStatus[index] === 'saving' && (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      )}
                      {reviewSaveStatus[index] === 'saved' && '✓'}
                      {reviewSaveStatus[index] === 'error' && '✗'}
                      {reviewSaveStatus[index] === 'saving' ? 'Сохранение...' : 'Сохранить'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {data.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <p>Нет видео отзывов</p>
          <p className="text-sm">Нажмите &ldquo;Добавить отзыв&rdquo; чтобы создать первый</p>
        </div>
      )}

      {/* Add Video Modal */}
      <AddVideoModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddReview}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={cancelDeleteReview}
        onConfirm={confirmDeleteReview}
        title="Удалить видео-отзыв"
        message={reviewToDelete !== null ? `Вы уверены, что хотите удалить видео-отзыв от "${data[reviewToDelete]?.customerName}"? Это действие нельзя отменить.` : ''}
        confirmText="Удалить"
        cancelText="Отмена"
        isLoading={isDeleting}
        variant="danger"
      />
    </div>
  );
}