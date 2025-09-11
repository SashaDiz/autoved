'use client';

import { useState } from 'react';
import { FAQItem } from '@/utils/adminData';
import AddFAQModal from '@/components/AddFAQModal';
import RichTextEditor from '@/components/RichTextEditor';

interface AdminFAQSectionProps {
  data: FAQItem[];
  originalData?: FAQItem[];
  onChange: (data: FAQItem[], changeType: 'header' | 'items') => void;
  onSaveHeader: () => void;
  unsavedChanges: { header: boolean };
  saveStatus: { header: 'saved' | 'saving' | 'error' | null };
}

export default function AdminFAQSection({ data, originalData, onChange }: AdminFAQSectionProps) {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // State for tracking changes in each FAQ
  const [faqChanges, setFaqChanges] = useState<Record<number, FAQItem>>({});
  const [faqSaveStatus, setFaqSaveStatus] = useState<Record<number, 'saved' | 'saving' | 'error' | null>>({});

  const updateFAQ = (index: number, faq: FAQItem) => {
    const newFAQs = [...data];
    newFAQs[index] = faq;
    onChange(newFAQs, 'items');
    
    // Track changes for this FAQ
    setFaqChanges(prev => ({
      ...prev,
      [index]: faq
    }));
  };

  const saveFAQ = async (index: number) => {
    if (!faqChanges[index]) return;
    
    setFaqSaveStatus(prev => ({ ...prev, [index]: 'saving' }));
    
    try {
      // Save the updated FAQs to the database
      const updatedFAQs = [...data];
      updatedFAQs[index] = faqChanges[index];
      
      const response = await fetch('/api/admin/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          section: 'faq', 
          data: updatedFAQs 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save FAQ');
      }
      
      // Clear the changes for this FAQ
      setFaqChanges(prev => {
        const newChanges = { ...prev };
        delete newChanges[index];
        return newChanges;
      });
      
      setFaqSaveStatus(prev => ({ ...prev, [index]: 'saved' }));
      
      // Clear saved status after 2 seconds
      setTimeout(() => {
        setFaqSaveStatus(prev => ({ ...prev, [index]: null }));
      }, 2000);
    } catch (error) {
      console.error('Error saving FAQ:', error);
      setFaqSaveStatus(prev => ({ ...prev, [index]: 'error' }));
    }
  };

  const cancelFAQChanges = (index: number) => {
    // Restore original FAQ data
    if (originalData && originalData[index]) {
      const originalFAQ = originalData[index];
      const newFAQs = [...data];
      newFAQs[index] = originalFAQ;
      onChange(newFAQs, 'items');
    }
    
    // Clear changes for this FAQ
    setFaqChanges(prev => {
      const newChanges = { ...prev };
      delete newChanges[index];
      return newChanges;
    });
    
    // Clear save status
    setFaqSaveStatus(prev => ({ ...prev, [index]: null }));
  };

  const handleAddFAQ = async (newFAQ: FAQItem) => {
    try {
      // Add the new FAQ to the current data
      const updatedFAQs = [...data, newFAQ];
      
      // Save to database
      const response = await fetch('/api/admin/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          section: 'faq', 
          data: updatedFAQs 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save new FAQ');
      }
      
      // Update local state
      onChange(updatedFAQs, 'items');
    } catch (error) {
      console.error('Error adding FAQ:', error);
      // Still update local state for immediate feedback
      onChange([...data, newFAQ], 'items');
    }
  };

  const removeFAQ = async (index: number) => {
    try {
      const newFAQs = data.filter((_, i) => i !== index);
      
      // Save to database
      const response = await fetch('/api/admin/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          section: 'faq', 
          data: newFAQs 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete FAQ');
      }
      
      // Update local state
      onChange(newFAQs, 'items');
      if (expandedFAQ === index) {
        setExpandedFAQ(null);
      } else if (expandedFAQ !== null && expandedFAQ > index) {
        setExpandedFAQ(expandedFAQ - 1);
      }
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      // Still update local state for immediate feedback
      const newFAQs = data.filter((_, i) => i !== index);
      onChange(newFAQs, 'items');
      if (expandedFAQ === index) {
        setExpandedFAQ(null);
      } else if (expandedFAQ !== null && expandedFAQ > index) {
        setExpandedFAQ(expandedFAQ - 1);
      }
    }
  };

  const toggleFAQDetails = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const moveFAQ = async (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= data.length) return;
    
    try {
      const newFAQs = [...data];
      const [movedFAQ] = newFAQs.splice(fromIndex, 1);
      newFAQs.splice(toIndex, 0, movedFAQ);
      
      // Save to database
      const response = await fetch('/api/admin/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          section: 'faq', 
          data: newFAQs 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to reorder FAQ');
      }
      
      // Update local state
      onChange(newFAQs, 'items');

      // Update expanded FAQ index if needed
      if (expandedFAQ === fromIndex) {
        setExpandedFAQ(toIndex);
      } else if (expandedFAQ !== null) {
        if (fromIndex < expandedFAQ && toIndex >= expandedFAQ) {
          setExpandedFAQ(expandedFAQ - 1);
        } else if (fromIndex > expandedFAQ && toIndex <= expandedFAQ) {
          setExpandedFAQ(expandedFAQ + 1);
        }
      }
    } catch (error) {
      console.error('Error reordering FAQ:', error);
      // Still update local state for immediate feedback
      const newFAQs = [...data];
      const [movedFAQ] = newFAQs.splice(fromIndex, 1);
      newFAQs.splice(toIndex, 0, movedFAQ);
      onChange(newFAQs, 'items');

      // Update expanded FAQ index if needed
      if (expandedFAQ === fromIndex) {
        setExpandedFAQ(toIndex);
      } else if (expandedFAQ !== null) {
        if (fromIndex < expandedFAQ && toIndex >= expandedFAQ) {
          setExpandedFAQ(expandedFAQ - 1);
        } else if (fromIndex > expandedFAQ && toIndex <= expandedFAQ) {
          setExpandedFAQ(expandedFAQ + 1);
        }
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-gray-200 pb-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Вопросы и ответы (FAQ)</h2>
          <p className="text-gray-600 mt-2">Управление часто задаваемыми вопросами</p>
        </div>
      </div>

      {/* Add FAQ Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Вопросы ({data.length})</h3>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Добавить вопрос
        </button>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {data.map((faq, index) => (
          <div key={faq.id} className="bg-white border border-gray-200 rounded-lg">
            <div className="p-4 flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => moveFAQ(index, index - 1)}
                      disabled={index === 0}
                      className="text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                      </svg>
                    </button>
                    <button
                      onClick={() => moveFAQ(index, index + 1)}
                      disabled={index === data.length - 1}
                      className="text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                      </svg>
                    </button>
                    <span className="text-sm text-gray-500 font-mono">#{index + 1}</span>
                  </div>
                </div>
                <h4 className="font-medium text-gray-900 mb-1">
                  {faq.question}
                </h4>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {faq.answer}
                </p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => toggleFAQDetails(index)}
                  className="text-gray-600 hover:text-gray-900 transition-colors px-3 py-1 border border-gray-300 rounded-lg text-sm cursor-pointer"
                >
                  {expandedFAQ === index ? 'Свернуть' : 'Редактировать'}
                </button>
                <button
                  onClick={() => removeFAQ(index)}
                  className="text-red-600 hover:text-red-700 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Expanded FAQ Editor */}
            {expandedFAQ === index && (
              <div className="border-t border-gray-200 p-4 bg-gray-50 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Вопрос
                  </label>
                  <textarea
                    value={faq.question}
                    onChange={(e) => updateFAQ(index, {
                      ...faq,
                      question: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                    rows={2}
                    placeholder="Введите вопрос..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ответ
                  </label>
                  <RichTextEditor
                    value={faq.answer}
                    onChange={(value) => updateFAQ(index, {
                      ...faq,
                      answer: value
                    })}
                    placeholder="Введите ответ... (поддерживается форматирование, ссылки, списки)"
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Поддерживается форматирование текста, ссылки, списки. Используйте Ctrl+B для жирного текста, Ctrl+I для курсива, Ctrl+K для ссылок.
                  </p>
                </div>

                {/* FAQ Save/Cancel Buttons - Only show when there are unsaved changes */}
                {faqChanges[index] && (
                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => cancelFAQChanges(index)}
                      className="px-4 py-2 rounded-lg font-medium transition-colors border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
                    >
                      Отменить
                    </button>
                    <button
                      onClick={() => saveFAQ(index)}
                      disabled={faqSaveStatus[index] === 'saving'}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 cursor-pointer ${
                        faqSaveStatus[index] !== 'saving'
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {faqSaveStatus[index] === 'saving' && (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      )}
                      {faqSaveStatus[index] === 'saved' && '✓'}
                      {faqSaveStatus[index] === 'error' && '✗'}
                      {faqSaveStatus[index] === 'saving' ? 'Сохранение...' : 'Сохранить'}
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>Нет вопросов</p>
          <p className="text-sm">Нажмите &ldquo;Добавить вопрос&rdquo; чтобы создать первый</p>
        </div>
      )}

      {/* Add FAQ Modal */}
      <AddFAQModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddFAQ}
      />
    </div>
  );
}