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

export interface CarCard {
  id: string;
  title: string;
  engine: string;
  drive: string;
  modification: string;
  distance: string;
  imageUrl: string;
  externalLink: string;
  price: string;
  year: string;
  location: string;
  isNew: boolean;
  date: string;
}

export interface CardsData {
  title: string;
  subtitle: string;
  cards: CarCard[];
}

export interface AdminData {
  hero: HeroData;
  promo: PromoData;
  videoReviews: VideoReview[];
  faq: FAQItem[];
  cards: CardsData;
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
  ],
  cards: {
    title: "Каталог авто",
    subtitle: "Здесь представлена лишь небольшая часть автомобилей доступных для заказа из Китая, Японии, Южной Кореи или Германии. Наличие уточняйте у менеджера.",
    cards: [
      {
        id: 'car-1',
        title: "Hyundai Tucson",
        engine: "Двигатель 2.0 л., 186 л.с. (дизель)",
        drive: "2WD",
        modification: "Premium",
        distance: "68 500 км.",
        imageUrl: "/assets/hyunday.jpg",
        externalLink: "https://auto.ru/cars/hyundai/tucson/",
        price: "2 670 000 ₽",
        year: "2022 год / 05 месяц (дата регистрации)",
        location: "KR",
        isNew: false,
        date: "27 июля"
      },
      {
        id: 'car-2',
        title: "Jeep Wrangler",
        engine: "2.0T л., 266 л.с.",
        drive: "4WD",
        modification: "Sahara",
        distance: "8 000 км.",
        imageUrl: "/assets/jeep.jpg",
        externalLink: "https://auto.ru/cars/jeep/wrangler/",
        price: "4 500 000 ₽",
        year: "2021 год / 08 месяц (дата регистрации)",
        location: "CN",
        isNew: false,
        date: "27 июля"
      },
      {
        id: 'car-3',
        title: "Mercedes-Benz GLC",
        engine: "2.0T л., 258 л.с.",
        drive: "4WD",
        modification: "GLC300L 4MATIC Dynamic Edition",
        distance: "47 000 км.",
        imageUrl: "/assets/mercedes-glc.jpg",
        externalLink: "https://auto.ru/cars/mercedes/glc_class/",
        price: "4 190 000 ₽",
        year: "2022 год / 06 месяц (дата регистрации)",
        location: "CN",
        isNew: false,
        date: "27 июля"
      },
      {
        id: 'car-4',
        title: "BMW X1",
        engine: "2.0T л., 204 л.с.",
        drive: "2WD",
        modification: "sDrive25Li",
        distance: "32 000 км.",
        imageUrl: "/assets/bmw-x1.jpg",
        externalLink: "https://auto.ru/cars/bmw/x1/",
        price: "3 350 000 ₽",
        year: "2022 год / 09 месяц (дата регистрации)",
        location: "CN",
        isNew: false,
        date: "27 июля"
      },
      {
        id: 'car-5',
        title: "Mercedes-Benz E-Class",
        engine: "2.0T л., 197 л.с.",
        drive: "2WD",
        modification: "E260L",
        distance: "0 км.",
        imageUrl: "/assets/mercedes-eclass.jpg",
        externalLink: "https://auto.ru/cars/mercedes/e_class/",
        price: "3 490 000 ₽",
        year: "2025 год",
        location: "CN",
        isNew: true,
        date: "27 июля"
      },
      {
        id: 'car-6',
        title: "BMW 6-SERIES",
        engine: "2.0T л., 258 л.с.",
        drive: "RWD",
        modification: "GT 630i M Sport Touring",
        distance: "44 000 км.",
        imageUrl: "/assets/bmw-6.jpg",
        externalLink: "https://auto.ru/cars/bmw/6er_gt/",
        price: "3 950 000 ₽",
        year: "2022 год / 01 месяц",
        location: "DE",
        isNew: false,
        date: "27 июля"
      },
      {
        id: 'car-7',
        title: "Haval Dargo",
        engine: "1.5T л., 167 л.с. (гибрид)",
        drive: "4WD",
        modification: "PHEV Hi4 5-Pro",
        distance: "14 000 км.",
        imageUrl: "/assets/haval.jpg",
        externalLink: "https://auto.ru/cars/haval/dargo/",
        price: "3 100 000 ₽",
        year: "2025 год",
        location: "CN",
        isNew: true,
        date: "27 июля"
      },
      {
        id: 'car-8',
        title: "Toyota Camry",
        engine: "2.5 л., 181 л.с.",
        drive: "FWD",
        modification: "Comfort",
        distance: "25 000 км.",
        imageUrl: "/assets/hyunday.jpg",
        externalLink: "https://auto.ru/cars/toyota/camry/",
        price: "2 890 000 ₽",
        year: "2023 год / 03 месяц (дата регистрации)",
        location: "JP",
        isNew: false,
        date: "28 июля"
      }
    ]
  }
});


// API-based data management functions

// Save data to database via API
export const saveAdminData = async (data: AdminData): Promise<void> => {
  try {
    // Save each section separately
    const sections = [
      { section: 'hero', data: data.hero },
      { section: 'promo', data: data.promo },
      { section: 'videoReviews', data: data.videoReviews },
      { section: 'faq', data: data.faq },
      { section: 'cards', data: data.cards }
    ];

    for (const { section, data: sectionData } of sections) {
      const response = await fetch('/api/admin/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ section, data: sectionData }),
      });

      if (!response.ok) {
        throw new Error(`Failed to save ${section}`);
      }
    }
  } catch (error) {
    console.error('Failed to save admin data:', error);
    throw error;
  }
};

// Save single section to database via API
export const saveAdminSection = async (section: keyof AdminData, data: AdminData[keyof AdminData]): Promise<void> => {
  try {
    const response = await fetch('/api/admin/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ section, data }),
    });

    if (!response.ok) {
      throw new Error(`Failed to save ${section}`);
    }
  } catch (error) {
    console.error(`Failed to save ${section}:`, error);
    throw error;
  }
};

// Load data from database via API
export const loadAdminData = async (): Promise<AdminData> => {
  try {
    const response = await fetch('/api/admin/data');
    if (!response.ok) {
      throw new Error('Failed to load admin data');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to load admin data:', error);
    return getDefaultData();
  }
};

// Initialize database (call this once)
export const initializeDatabase = async (): Promise<boolean> => {
  try {
    const response = await fetch('/api/admin/init', {
      method: 'POST',
    });
    return response.ok;
  } catch (error) {
    console.error('Failed to initialize database:', error);
    return false;
  }
};

// Fallback functions for client-side compatibility
export const loadAdminDataSync = (): AdminData => {
  return getDefaultData();
};

// Generate unique ID
export const generateId = (prefix: string = 'item'): string => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
};