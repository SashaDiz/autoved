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

  return (
    <section className="max-w-[1920px] w-full mx-auto relative py-16 px-4 sm:px-6 lg:px-20 bg-gray-900 text-white">
      <div className="grid lg:grid-cols-2 gap-16">
        {/* Left Side - Title */}
        <div>
          <p className="text-gray-400 text-md font-normal tracking-wide mb-2"># Связаться с нами</p>
          <h2 className="text-4xl lg:text-5xl font-semibold leading-tight">
            Получите подборку<br />
            авто под ваш бюджет
          </h2>
        </div>

        {/* Right Side - Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  ФИО
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Иван"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Телефон
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+7 (000) 000-000"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Страна интереса
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors appearance-none"
                >
                  <option value="Любая">Любая</option>
                  <option value="Китай">Китай</option>
                  <option value="Япония">Япония</option>
                  <option value="Южная Корея">Южная Корея</option>
                  <option value="Германия">Германия</option>
                </select>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Бюджет
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors appearance-none"
                >
                  <option value="до 2 млн руб">до 2 млн руб</option>
                  <option value="2-3 млн руб">2-3 млн руб</option>
                  <option value="3-5 млн руб">3-5 млн руб</option>
                  <option value="5-10 млн руб">5-10 млн руб</option>
                  <option value="свыше 10 млн руб">свыше 10 млн руб</option>
                </select>
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
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors resize-none"
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
                  className="mt-1 w-4 h-4 text-green-500 bg-gray-800 border-gray-600 rounded focus:ring-green-500 focus:ring-2"
                />
                <label className="text-sm text-gray-300 leading-relaxed">
                  Я прочитал{' '}
                  <a href="#" className="text-white underline hover:text-green-400 transition-colors">
                    Политику конфиденциальности
                  </a>
                  {' '}и согласился с условиями пользования сервисом
                </label>
              </div>

              <button
                type="submit"
                disabled={!formData.privacyAccepted}
                className="w-full sm:w-auto px-8 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
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