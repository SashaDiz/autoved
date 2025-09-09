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
  const [originalData, setOriginalData] = useState<AdminData | null>(null);
  const [unsavedChanges, setUnsavedChanges] = useState<Record<Section, { header: boolean }>>({
    hero: { header: false },
    promo: { header: false },
    videos: { header: false },
    faq: { header: false },
    cards: { header: false }
  });
  const [saveStatus, setSaveStatus] = useState<Record<Section, { header: 'saved' | 'saving' | 'error' | null }>>({
    hero: { header: null },
    promo: { header: null },
    videos: { header: null },
    faq: { header: null },
    cards: { header: null }
  });

  useEffect(() => {
    const initAndLoadData = async () => {
      try {
        // Initialize database if needed
        await initializeDatabase();
        // Load data from database
        const adminData = await loadAdminData();
        setData(adminData);
        setOriginalData(adminData);
      } catch (error) {
        console.error('Failed to load admin data:', error);
      }
    };
    
    initAndLoadData();
  }, []);

  const handleDataChange = (section: keyof AdminData, newData: AdminData[keyof AdminData], changeType: 'header' | 'items' = 'items') => {
    if (!data) return;

    const updatedData = {
      ...data,
      [section]: newData
    };
    
    setData(updatedData);
    
    // Only track header changes for global state
    if (changeType === 'header') {
      const sectionKey = section === 'videoReviews' ? 'videos' : section as Section;
      setUnsavedChanges(prev => ({
        ...prev,
        [sectionKey]: {
          ...prev[sectionKey],
          header: true
        }
      }));
    }
  };

  const handleCancelChanges = (section: Section) => {
    if (!data || !originalData) return;

    const sectionKey = section === 'videos' ? 'videoReviews' : section;
    const originalSectionData = originalData[sectionKey as keyof AdminData];
    
    // Reset data to original
    setData(prev => prev ? {
      ...prev,
      [sectionKey]: originalSectionData
    } : null);
    
    // Clear unsaved changes
    setUnsavedChanges(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        header: false
      }
    }));
  };

  const handleSaveHeader = async (section: Section) => {
    if (!data || !originalData) return;

    const sectionKey = section === 'videos' ? 'videoReviews' : section;
    const sectionData = data[sectionKey as keyof AdminData];
    
    setSaveStatus(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        header: 'saving'
      }
    }));

    try {
      await saveAdminSection(sectionKey as keyof AdminData, sectionData);
      
      // Update original data to reflect saved state
      setOriginalData(prev => prev ? {
        ...prev,
        [sectionKey]: sectionData
      } : null);
      
      setUnsavedChanges(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          header: false
        }
      }));
      
      setSaveStatus(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          header: 'saved'
        }
      }));
      
      setTimeout(() => {
        setSaveStatus(prev => ({
          ...prev,
          [section]: {
            ...prev[section],
            header: null
          }
        }));
      }, 2000);
    } catch (error) {
      console.error('Save error:', error);
      setSaveStatus(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          header: 'error'
        }
      }));
      setTimeout(() => {
        setSaveStatus(prev => ({
          ...prev,
          [section]: {
            ...prev[section],
            header: null
          }
        }));
      }, 3000);
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
              {saveStatus[activeSection].header && (
                <div className={`flex items-center gap-2 text-sm ${
                  saveStatus[activeSection].header === 'saved' ? 'text-green-600' :
                  saveStatus[activeSection].header === 'saving' ? 'text-blue-600' :
                  'text-red-600'
                }`}>
                  {saveStatus[activeSection].header === 'saving' && (
                    <div className="w-3 h-3 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
                  )}
                  {saveStatus[activeSection].header === 'saved' && '✓'}
                  {saveStatus[activeSection].header === 'error' && '✗'}
                  <span className="text-xs">Заголовок сохранен</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
              <a 
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
              >
                Посмотреть сайт
              </a>
              <button
                onClick={onLogout}
                className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2 cursor-pointer"
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
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-3 cursor-pointer ${
                      activeSection === section.id
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-lg">{section.icon}</span>
                    <span className="flex-1">{section.name}</span>
                    {unsavedChanges[section.id].header && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full" title="Несохраненные изменения заголовка"></div>
                    )}
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
                  originalData={originalData?.hero}
                  onChange={(newData, changeType) => handleDataChange('hero', newData, changeType)}
                  onSaveHeader={() => handleSaveHeader('hero')}
                  onCancelChanges={() => handleCancelChanges('hero')}
                  unsavedChanges={unsavedChanges.hero}
                  saveStatus={saveStatus.hero}
                />
              )}
              {activeSection === 'cards' && (
                <AdminCardsSection
                  data={data.cards}
                  originalData={originalData?.cards}
                  onChange={(newData, changeType) => handleDataChange('cards', newData, changeType)}
                  onSaveHeader={() => handleSaveHeader('cards')}
                  onCancelChanges={() => handleCancelChanges('cards')}
                  unsavedChanges={unsavedChanges.cards}
                  saveStatus={saveStatus.cards}
                />
              )}
              {activeSection === 'promo' && (
                <AdminPromoSection
                  data={data.promo}
                  originalData={originalData?.promo}
                  onChange={(newData, changeType) => handleDataChange('promo', newData, changeType)}
                  onSaveHeader={() => handleSaveHeader('promo')}
                  onCancelChanges={() => handleCancelChanges('promo')}
                  unsavedChanges={unsavedChanges.promo}
                  saveStatus={saveStatus.promo}
                />
              )}
              {activeSection === 'videos' && (
                <AdminVideoSection
                  data={data.videoReviews}
                  originalData={originalData?.videoReviews}
                  onChange={(newData, changeType) => handleDataChange('videoReviews', newData, changeType)}
                  onSaveHeader={() => handleSaveHeader('videos')}
                  unsavedChanges={unsavedChanges.videos}
                  saveStatus={saveStatus.videos}
                />
              )}
              {activeSection === 'faq' && (
                <AdminFAQSection
                  data={data.faq}
                  originalData={originalData?.faq}
                  onChange={(newData, changeType) => handleDataChange('faq', newData, changeType)}
                  onSaveHeader={() => handleSaveHeader('faq')}
                  unsavedChanges={unsavedChanges.faq}
                  saveStatus={saveStatus.faq}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}