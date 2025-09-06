'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  currentImage: string;
  onImageChange: (imageUrl: string) => void;
  label?: string;
  accept?: string;
}

export default function ImageUpload({ 
  currentImage, 
  onImageChange, 
  label = "Загрузить изображение",
  accept = "image/*"
}: ImageUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите изображение');
      return;
    }

    // Check file size (max 10MB for S3)
    if (file.size > 10 * 1024 * 1024) {
      alert('Размер файла не должен превышать 10MB');
      return;
    }

    setIsUploading(true);

    try {
      // Create form data for upload
      const formData = new FormData();
      formData.append('file', file);

      // Upload to S3 via our API
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setPreviewUrl(result.url);
        onImageChange(result.url);
      } else {
        alert(result.error || 'Ошибка загрузки изображения');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Ошибка загрузки изображения');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const displayImage = previewUrl || currentImage;

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      
      {/* Current Image Preview */}
      {displayImage && (
        <div className="relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={displayImage}
            alt="Preview"
            fill
            className="object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/bg_img1.webp';
            }}
          />
          {displayImage !== '/assets/bg_img1.webp' && (
            <button
              onClick={() => {
                setPreviewUrl(null);
                onImageChange('/assets/bg_img1.webp');
              }}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs transition-colors"
            >
              ×
            </button>
          )}
        </div>
      )}

      {/* Upload Area */}
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
          isDragOver
            ? 'border-gray-900 bg-gray-50'
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
        }`}
      >
        {isUploading ? (
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin mb-2"></div>
            <p className="text-sm text-gray-600">Загрузка...</p>
          </div>
        ) : (
          <>
            <svg className="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <p className="text-sm text-gray-600 mb-1">
              Нажмите или перетащите изображение сюда
            </p>
            <p className="text-xs text-gray-400">
              PNG, JPG, WebP до 10MB
            </p>
          </>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileInput}
        className="hidden"
      />

      {/* Manual URL Input */}
      <div>
        <label className="block text-xs text-gray-500 mb-1">
          Или введите URL изображения:
        </label>
        <input
          type="url"
          value={currentImage.startsWith('data:') || currentImage.includes('s3.twcstorage.ru') ? '' : currentImage}
          onChange={(e) => onImageChange(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          placeholder="https://example.com/image.jpg"
        />
      </div>
    </div>
  );
}