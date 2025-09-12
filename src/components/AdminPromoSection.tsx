'use client';

import { PromoData } from '@/utils/adminData';

interface AdminPromoSectionProps {
  data: PromoData;
  originalData?: PromoData;
  onChange: (data: PromoData, changeType: 'header' | 'items') => void;
  onSaveHeader: () => void;
  onCancelChanges: () => void;
  unsavedChanges: { header: boolean };
  saveStatus: { header: 'saved' | 'saving' | 'error' | null };
}

export default function AdminPromoSection({ data, onChange, onSaveHeader, onCancelChanges, unsavedChanges, saveStatus }: AdminPromoSectionProps) {
  const updateTitle = (title: string) => {
    onChange({ ...data, title }, 'header');
  };

  const updateSubtitle = (subtitle: string) => {
    onChange({ ...data, subtitle }, 'header');
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-gray-200 pb-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Промо секция</h2>
          <p className="text-gray-600 mt-2">Управление заголовком и подзаголовком промо секции</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Заголовок
          </label>
          <textarea
            value={data.title}
            onChange={(e) => updateTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:border-transparent resize-none"
            rows={2}
            placeholder="Заголовок промо секции"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Подзаголовок
          </label>
          <textarea
            value={data.subtitle}
            onChange={(e) => updateSubtitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:border-transparent resize-none"
            rows={3}
            placeholder="Описание промо секции"
          />
        </div>

        {/* Header Save/Cancel Buttons - Only show when there are unsaved changes */}
        {unsavedChanges.header && (
          <div className="flex justify-end gap-3">
            <button
              onClick={onCancelChanges}
              className="px-4 py-2 rounded-lg font-medium transition-colors border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              Отменить
            </button>
            <button
              onClick={onSaveHeader}
              disabled={saveStatus.header === 'saving'}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 cursor-pointer ${
                saveStatus.header !== 'saving'
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {saveStatus.header === 'saving' && (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              )}
              {saveStatus.header === 'saved' && '✓'}
              {saveStatus.header === 'error' && '✗'}
              {saveStatus.header === 'saving' ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
        )}
      </div>

      {/* Preview */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-medium text-gray-900 mb-4">Предварительный просмотр</h4>
        <div className="bg-gray-900 rounded-lg p-6 text-white">
          <h2 className="text-2xl font-semibold mb-2 leading-tight">
            {data.title}
          </h2>
          <p className="text-gray-300 leading-relaxed">
            {data.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}