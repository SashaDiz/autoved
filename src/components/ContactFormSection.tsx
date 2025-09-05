'use client';

import { useState } from 'react';

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    country: 'Любая',
    budget: 'до 2 млн руб',
    message: '',
    privacyAccepted: false
  });

  const [dropdownOpen, setDropdownOpen] = useState({
    country: false,
    budget: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSelectFocus = (selectName: 'country' | 'budget') => {
    setDropdownOpen(prev => ({ ...prev, [selectName]: true }));
  };

  const handleSelectBlur = (selectName: 'country' | 'budget') => {
    setDropdownOpen(prev => ({ ...prev, [selectName]: false }));
  };

  return (
    <section className="max-w-[1920px] w-full mx-auto relative py-24 px-4 sm:px-6 lg:px-20 bg-gray-900 text-white">
      <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
        {/* Left Side - Title */}
        <div className='max-w-xl'>
          <p className="text-gray-400 text-sm sm:text-md font-normal tracking-wide mb-2"># Связаться с нами</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
            Получите подборку авто под ваш бюджет
          </h2>
        </div>

        {/* Right Side - Form */}
        <div className='p-4 sm:p-6 lg:p-8 bg-white/5 rounded-2xl'>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  ФИО *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Иван Иванов"
                  required
                  className="w-full px-4 py-3 border-b-1 border-gray-700 text-white placeholder-gray-500 hover:border-white focus:outline-none focus:border-green-500 transition-all duration-300"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Телефон *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+7 (000) 000-000"
                  required
                  className="w-full px-4 py-3 border-b-1 border-gray-700 text-white placeholder-gray-500 hover:border-white focus:outline-none focus:border-green-500 transition-all duration-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Страна интереса
                </label>
                <div className="relative">
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    onFocus={() => handleSelectFocus('country')}
                    onBlur={() => handleSelectBlur('country')}
                    className="w-full px-4 py-3 pr-10 border-b-1 border-gray-700 bg-transparent text-white hover:border-white focus:outline-none focus:border-green-500 transition-all duration-300 appearance-none cursor-pointer"
                    style={{
                      background: 'linear-gradient(to bottom, transparent 0%, transparent 100%)',
                      backgroundImage: 'none'
                    }}
                  >
                    <option value="Любая" className="bg-gray-800 text-white">Любая</option>
                    <option value="Китай" className="bg-gray-800 text-white">Китай</option>
                    <option value="Япония" className="bg-gray-800 text-white">Япония</option>
                    <option value="Южная Корея" className="bg-gray-800 text-white">Южная Корея</option>
                    <option value="Германия" className="bg-gray-800 text-white">Германия</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <svg
                      className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${dropdownOpen.country ? 'rotate-180' : 'rotate-0'
                        }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Бюджет
                </label>
                <div className="relative">
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    onFocus={() => handleSelectFocus('budget')}
                    onBlur={() => handleSelectBlur('budget')}
                    className="w-full px-4 py-3 pr-10 border-b-1 border-gray-700 bg-transparent text-white hover:border-white focus:outline-none focus:border-green-500 transition-all duration-300 appearance-none cursor-pointer"
                    style={{
                      background: 'linear-gradient(to bottom, transparent 0%, transparent 100%)',
                      backgroundImage: 'none'
                    }}
                  >
                    <option value="до 2 млн руб" className="bg-gray-800 text-white">до 2 млн руб</option>
                    <option value="2-3 млн руб" className="bg-gray-800 text-white">2-3 млн руб</option>
                    <option value="3-5 млн руб" className="bg-gray-800 text-white">3-5 млн руб</option>
                    <option value="5-10 млн руб" className="bg-gray-800 text-white">5-10 млн руб</option>
                    <option value="свыше 10 млн руб" className="bg-gray-800 text-white">свыше 10 млн руб</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <svg
                      className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${dropdownOpen.budget ? 'rotate-180' : 'rotate-0'
                        }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Сообщение
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                placeholder="Опишите подробнее ваши пожелания (марка, модель, комплектация и т.д.)"
                className="w-full px-4 py-3 border-b-1 border-gray-700 text-white placeholder-gray-500 hover:border-white focus:outline-none focus:border-green-500 transition-all duration-300 resize-none"
              />
            </div>

            {/* Privacy Checkbox and Submit */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="privacyAccepted"
                  checked={formData.privacyAccepted}
                  onChange={handleInputChange}
                  required
                  className="w-5 h-5 mt-0.5 cursor-pointer text-green-500 bg-gray-800 border-gray-600 rounded focus:ring-green-500 focus:ring-2"
                />
                <label className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Я прочитал{' '}
                  <a href="#" className="text-white underline hover:text-green-400 transition-colors">
                    Политику конфиденциальности
                  </a>
                  {' '}и&nbsp;согласился с&nbsp;условиями пользования сервисом
                </label>
              </div>

              <button
                type="submit"
                disabled={!formData.privacyAccepted}
                className="w-full px-8 sm:px-12 md:px-16 lg:px-20 py-4 lg:py-5 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
              >
                Отправить
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}