'use client';

import { useState, useEffect } from 'react';
import { AdminData, loadAdminData, saveAdminSection, initializeDatabase } from '@/utils/adminData';
import AdminHeroSection from '@/components/AdminHeroSection';
import AdminPromoSection from '@/components/AdminPromoSection';
import AdminVideoSection from '@/components/AdminVideoSection';
import AdminFAQSection from '@/components/AdminFAQSection';
import AdminCardsSection from '@/components/AdminCardsSection';

interface AdminDashboardProps {
  onLogout: () => void;
}

type Section = 'hero' | 'promo' | 'videos' | 'faq' | 'cards';

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState<Section>('hero');
  const [data, setData] = useState<AdminData | null>(null);
  const [, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error' | null>(null);

  useEffect(() => {
    const initAndLoadData = async () => {
      try {
        // Initialize database if needed
        await initializeDatabase();
        // Load data from database
        const adminData = await loadAdminData();
        setData(adminData);
      } catch (error) {
        console.error('Failed to load admin data:', error);
      }
    };
    
    initAndLoadData();
  }, []);

  const handleDataChange = (section: keyof AdminData, newData: AdminData[keyof AdminData]) => {
    if (!data) return;

    const updatedData = {
      ...data,
      [section]: newData
    };
    
    setData(updatedData);
    handleSave(section, newData);
  };

  const handleSave = async (section: keyof AdminData, sectionData: AdminData[keyof AdminData]) => {
    setIsSaving(true);
    setSaveStatus('saving');

    try {
      await saveAdminSection(section, sectionData);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(null), 2000);
    } catch (error) {
      console.error('Save error:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  const sections = [
    { id: 'hero' as Section, name: 'Главный экран', icon: '🎯' },
    { id: 'cards' as Section, name: 'Каталог авто', icon: '🚗' },
    { id: 'promo' as Section, name: 'Промо секция', icon: '📱' },
    { id: 'videos' as Section, name: 'Видео отзывы', icon: '🎥' },
    { id: 'faq' as Section, name: 'Вопросы и ответы', icon: '❓' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-gray-900">
                Админ панель AutoVed
              </h1>
              {saveStatus && (
                <div className={`flex items-center gap-2 text-sm ${
                  saveStatus === 'saved' ? 'text-green-600' :
                  saveStatus === 'saving' ? 'text-blue-600' :
                  'text-red-600'
                }`}>
                  {saveStatus === 'saving' && (
                    <div className="w-3 h-3 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
                  )}
                  {saveStatus === 'saved' && '✓'}
                  {saveStatus === 'error' && '✗'}
                  {saveStatus === 'saved' && 'Сохранено'}
                  {saveStatus === 'saving' && 'Сохранение...'}
                  {saveStatus === 'error' && 'Ошибка сохранения'}
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
              <a 
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Посмотреть сайт
              </a>
              <button
                onClick={onLogout}
                className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Выйти
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-8 lg:mb-0">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Разделы</h2>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-3 ${
                      activeSection === section.id
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-lg">{section.icon}</span>
                    {section.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {activeSection === 'hero' && (
                <AdminHeroSection
                  data={data.hero}
                  onChange={(newData) => handleDataChange('hero', newData)}
                />
              )}
              {activeSection === 'cards' && (
                <AdminCardsSection
                  data={data.cards}
                  onChange={(newData) => handleDataChange('cards', newData)}
                />
              )}
              {activeSection === 'promo' && (
                <AdminPromoSection
                  data={data.promo}
                  onChange={(newData) => handleDataChange('promo', newData)}
                />
              )}
              {activeSection === 'videos' && (
                <AdminVideoSection
                  data={data.videoReviews}
                  onChange={(newData) => handleDataChange('videoReviews', newData)}
                />
              )}
              {activeSection === 'faq' && (
                <AdminFAQSection
                  data={data.faq}
                  onChange={(newData) => handleDataChange('faq', newData)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}