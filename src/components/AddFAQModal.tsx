'use client';

import { useState } from 'react';
import { FAQItem } from '@/utils/adminData';
import BaseModal from './BaseModal';
import RichTextEditor from './RichTextEditor';

interface AddFAQModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (faq: FAQItem) => void;
}

export default function AddFAQModal({ isOpen, onClose, onSave }: AddFAQModalProps) {
  const [faq, setFaq] = useState<Omit<FAQItem, 'id'>>({
    question: '',
    answer: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error' | null>(null);

  const handleSave = async () => {
    if (!faq.question || !faq.answer) {
      return; // Basic validation
    }

    setIsLoading(true);
    setSaveStatus('saving');
    try {
      // Generate ID and save
      const newFAQ: FAQItem = {
        ...faq,
        id: `faq-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`
      };
      await onSave(newFAQ);
      setSaveStatus('saved');
      
      // Show success status for 2 seconds, then close modal
      setTimeout(() => {
        onClose();
        // Reset form
        setFaq({
          question: '',
          answer: ''
        });
        setSaveStatus(null);
      }, 2000);
    } catch (error) {
      setSaveStatus('error');
      console.error('Failed to save FAQ:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFAQ = (field: keyof Omit<FAQItem, 'id'>, value: string) => {
    setFaq(prev => ({ ...prev, [field]: value }));
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Добавить новый вопрос"
      onSave={handleSave}
      isLoading={isLoading}
      saveStatus={saveStatus}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Вопрос *
          </label>
          <textarea
            value={faq.question}
            onChange={(e) => updateFAQ('question', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
            rows={3}
            placeholder="Введите вопрос..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ответ *
          </label>
          <RichTextEditor
            value={faq.answer}
            onChange={(value) => updateFAQ('answer', value)}
            placeholder="Введите ответ... (поддерживается форматирование, ссылки, списки)"
            className="w-full"
          />
          {/* Preview of the formatted answer */}
          {faq.answer && (
            <div className="mt-2 p-3 bg-gray-50 rounded-lg border">
              <p className="text-xs text-gray-500 mb-2">Предварительный просмотр:</p>
              <div 
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              />
            </div>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Поддерживается форматирование текста, ссылки, списки. Используйте Ctrl+B для жирного текста, Ctrl+I для курсива, Ctrl+K для ссылок.
          </p>
        </div>
      </div>
    </BaseModal>
  );
}
