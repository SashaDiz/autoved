'use client';

import { PromoData } from '@/utils/adminData';

interface AdminPromoSectionProps {
  data: PromoData;
  onChange: (data: PromoData) => void;
}

export default function AdminPromoSection({ data, onChange }: AdminPromoSectionProps) {
  const updateTitle = (title: string) => {
    onChange({ ...data, title });
  };

  const updateSubtitle = (subtitle: string) => {
    onChange({ ...data, subtitle });
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-semibold text-gray-900">Промо секция</h2>
        <p className="text-gray-600 mt-2">Управление заголовком и подзаголовком промо секции</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Заголовок
          </label>
          <textarea
            value={data.title}
            onChange={(e) => updateTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
            rows={3}
            placeholder="Описание промо секции"
          />
        </div>
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