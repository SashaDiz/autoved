'use client';

import Image from 'next/image';
import { useState } from 'react';

const faqData = [
  {
    id: 'faq-1',
    question: 'Какие сроки доставки авто из Азии?',
    answer: 'Сроки доставки автомобилей зависят от ряда факторов, включая страну приобретения.\n\n• Из Китая — доставка занимает от 30 до 60 дней.\n• Из Японии — сроки зависят от объема двигателя:\n  • автомобили с объемом до 1.9 литра доставляются за 30–45 дней;\n  • автомобили с объемом от 1.9 литра и выше — за 45–90 дней.\n• Из Южной Кореи — доставка составляет от 30 до 45 дней.\n• Из Германии — доставка составляет от 30 до 45 дней.\n\nСроки могут изменяться из-за форс-мажорных обстоятельств. Все условия, включая сроки и порядок действий в подобных ситуациях, подробно прописаны в договоре.'
  },
  {
    id: 'faq-2',
    question: 'Где страхуется авто?',
    answer: 'Автомобиль страхуется на всех этапах доставки: от момента покупки до получения вами. Мы работаем с надежными страховыми компаниями и обеспечиваем полное покрытие рисков во время транспортировки.'
  },
  {
    id: 'faq-3',
    question: 'Могу ли я сам выбрать авто?',
    answer: 'Да, конечно! Вы можете самостоятельно выбрать автомобиль из каталогов наших партнеров или предложить свой вариант. Наши специалисты помогут с проверкой технического состояния, документов и организуют покупку выбранного вами автомобиля.'
  },
  {
    id: 'faq-4',
    question: 'Что делать, если авто не проходит таможенное оформление?',
    answer: 'В случае возникновения проблем с таможенным оформлением, мы берем на себя все вопросы по их решению. Наша команда имеет большой опыт работы с таможенными органами и знает все нюансы процедур. Все риски покрываются страховкой.'
  }
];

export default function FAQSection() {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>('faq-1');

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  return (
    <section className="max-w-[1920px] w-full mx-auto relative py-20 sm:py-30 px-4 sm:px-6 xl:px-20 bg-gray-50">
      <div className="xl:flex xl:gap-16">
        {/* Left Side - Static Content */}
        <div className="flex-1 flex flex-col justify-between items-center sm:items-start mb-10 xl:mb-0">
          <div className="mb-auto max-w-xl">
            <p className="text-gray-500 text-md font-normal tracking-wide mb-2 text-center sm:text-left"># Вопросы и ответы</p>
            <h2 className="text-4xl xl:text-5xl font-semibold text-gray-900 mb-8 leading-tight text-center sm:text-left">
              Часто задаваемые вопросы
            </h2>
            </div>

            {/* Contact Button */}
              <button className="cursor-pointer text-lg bg-gray-900 text-white px-2 pr-6 py-2 rounded-full font-semibold transition-all duration-300 hover:bg-gray-800 flex items-center gap-3 group">
                <div className='bg-green-500 rounded-full p-4 border-1 border-black/5 shadow-md transition-transform duration-300 group-hover:scale-110'>
                  <Image
                    src="/assets/paper-plane.svg"
                    alt="Send Message"
                    width={20}
                    height={20}
                    className="w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                Задать вопрос менеджеру
              </button>
              <p className="text-gray-500 text-sm mt-4 pl-4 leading-relaxed max-w-[300px]">
              Напишите нам и&nbsp;мы&nbsp;ответим на&nbsp;все ваши вопросы по&nbsp;покупке и&nbsp;доставке авто
              </p>
        </div>

        {/* Right Side - FAQ Items */}
        <div className="xl:w-1/2">
          <div className="space-y-4">
            {faqData.map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full cursor-pointer px-6 py-6 text-left flex items-center justify-between"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <div className={`flex-shrink-0 transition-transform duration-300 ${
                    expandedFAQ === faq.id ? 'rotate-45' : ''
                  }`}>
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                </button>
                
                {/* Expandable Answer */}
                <div className={`overflow-hidden transition-all duration-300 ${
                  expandedFAQ === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}