// Admin data management utilities

export interface HeroSlide {
  id: string;
  backgroundImage: string;
  carInfo: {
    name: string;
    specs: string;
    year: string;
  };
}

export interface HeroData {
  title: string;
  subtitle: string;
  slides: HeroSlide[];
}

export interface PromoData {
  title: string;
  subtitle: string;
}

export interface VideoReview {
  id: string;
  customerName: string;
  location: string;
  carModel: string;
  coverImage: string;
  vkEmbedUrl: string;
  action: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface AdminData {
  hero: HeroData;
  promo: PromoData;
  videoReviews: VideoReview[];
  faq: FAQItem[];
}

// Default data
export const getDefaultData = (): AdminData => ({
  hero: {
    title: "Авто из Китая, Японии, Южной Кореи и Германии.",
    subtitle: "Доставка от 30 дней, полное сопровождение, таможенное оформление и страхование на каждом этапе.",
    slides: [
      {
        id: 'slide-1',
        backgroundImage: '/assets/bg_img1.webp',
        carInfo: {
          name: 'Chery Tigo 8',
          specs: '2.0T л., 197 л.с.',
          year: '2021 год'
        }
      },
      {
        id: 'slide-2',
        backgroundImage: '/assets/bg_img1.webp',
        carInfo: {
          name: 'Toyota RAV4',
          specs: '2.5L, 203 л.с.',
          year: '2023 год'
        }
      },
      {
        id: 'slide-3',
        backgroundImage: '/assets/bg_img1.webp',
        carInfo: {
          name: 'BMW X5',
          specs: '3.0T, 340 л.с.',
          year: '2022 год'
        }
      }
    ]
  },
  promo: {
    title: "Горячие предложения авто на сегодня",
    subtitle: "Подпишитесь на наш канала получайте подборку актуальных предложений и новостей из мира авто"
  },
  videoReviews: [
    {
      id: 'review-1',
      customerName: 'Юрий М.',
      location: 'Волгоград',
      carModel: 'BMW 6-SERIES',
      coverImage: '/assets/bmw-6.jpg',
      vkEmbedUrl: 'https://vk.com/video_ext.php?oid=-65024227&id=456239220&hd=2&autoplay=1',
      action: 'Смотреть'
    },
    {
      id: 'review-2',
      customerName: 'Евгений А.',
      location: 'Москва',
      carModel: 'Honda CR-V',
      coverImage: '/assets/mercedes-eclass.jpg',
      vkEmbedUrl: 'https://vk.com/video_ext.php?oid=-65024227&id=456239289&hd=2&autoplay=1',
      action: 'Смотреть'
    },
    {
      id: 'review-3',
      customerName: 'Павел С.',
      location: 'Москва',
      carModel: 'Volkswagen Golf',
      coverImage: '/assets/mercedes-glc.jpg',
      vkEmbedUrl: 'https://vk.com/video_ext.php?oid=-65024227&id=456239289&hd=2&autoplay=1',
      action: 'Смотреть'
    },
    {
      id: 'review-4',
      customerName: 'Марина С.',
      location: 'Санкт-Петербург',
      carModel: 'JEEP Wrangler',
      coverImage: '/assets/mercedes-vito.jpg',
      vkEmbedUrl: 'https://vk.com/video_ext.php?oid=-65024227&id=456239289&hd=2&autoplay=1',
      action: 'Смотреть'
    },
    {
      id: 'review-5',
      customerName: 'Александр К.',
      location: 'Екатеринбург',
      carModel: 'Toyota Camry',
      coverImage: '/assets/haval.jpg',
      vkEmbedUrl: 'https://vk.com/video_ext.php?oid=-65024227&id=456239289&hd=2&autoplay=1',
      action: 'Смотреть'
    },
    {
      id: 'review-6',
      customerName: 'Анна В.',
      location: 'Новосибирск',
      carModel: 'Hyundai Tucson',
      coverImage: '/assets/hyunday.jpg',
      vkEmbedUrl: 'https://vk.com/video_ext.php?oid=-65024227&id=456239289&hd=2&autoplay=1',
      action: 'Смотреть'
    }
  ],
  faq: [
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
  ]
});

// Local storage keys
const STORAGE_KEYS = {
  ADMIN_DATA: 'autoved_admin_data'
};

// Save data to localStorage
export const saveAdminData = (data: AdminData): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.ADMIN_DATA, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save admin data:', error);
  }
};

// Load data from localStorage
export const loadAdminData = (): AdminData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.ADMIN_DATA);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load admin data:', error);
  }
  return getDefaultData();
};

// Generate unique ID
export const generateId = (prefix: string = 'item'): string => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
};