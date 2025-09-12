// Telegram message parser for car data extraction

export interface ParsedCarData {
  title: string;
  engine: string;
  drive: string;
  modification: string;
  distance: string;
  price: string;
  year: string;
  location: string;
  date: string;
  imageUrl?: string;
  isNew: boolean;
  externalLink?: string;
  telegramLink?: string;
}

export interface TelegramMessage {
  text?: string;
  photo?: Array<{
    file_id: string;
    file_unique_id: string;
    width: number;
    height: number;
    file_size?: number;
  }>;
  caption?: string;
  date: number;
  message_id: number;
  chat?: {
    id: string | number;
    type: string;
    title?: string;
    username?: string;
  };
}

// Country mapping for location codes
const COUNTRY_MAPPING: Record<string, string> = {
  'Южная Корея': 'KR',
  'Китай': 'CN', 
  'Япония': 'JP',
  'Германия': 'DE'
};

// Drive type mapping
const DRIVE_MAPPING: Record<string, string> = {
  '4WD': '4WD',
  'AWD': '4WD',
  'FWD': '2WD',
  'RWD': 'RWD',
  '2WD': '2WD',
  'Передний': '2WD',
  'Задний': 'RWD',
  'Полный': '4WD'
};

/**
 * Parse car data from Telegram message text
 */
export function parseCarData(message: TelegramMessage): ParsedCarData | null {
  if (!message.text && !message.caption) {
    return null;
  }

  const text = message.text || message.caption || '';
  
  // Check if message contains car-related hashtags or keywords
  if (!isCarRelatedMessage(text)) {
    return null;
  }

  try {
    // Extract model name - look for text after 🔥 emoji and before country flag
    const modelMatch = text.match(/🔥\s*([A-ZА-Я\s]+(?:[A-ZА-Я]+[A-ZА-Я\s]*)*)\s*🇰🇷|🇨🇳|🇯🇵|🇩🇪/) || 
                      text.match(/(?:Модель:\s*)?([A-ZА-Я\s]+(?:[A-ZА-Я]+[A-ZА-Я\s]*)*)/);
    const title = modelMatch ? modelMatch[1].trim() : '';

    // Extract trim/configuration - look for 🟢Комплектация: or Комплектация:
    const trimMatch = text.match(/🟢Комплектация:\s*([^\n]+)|(?:Комплектация:\s*|Trim:\s*)?([A-Za-zА-Яа-я0-9\s\-\.]+)(?:\s*\n|$)/);
    const modification = trimMatch ? (trimMatch[1] || trimMatch[2]).trim() : '';

    // Extract registration date (year/month format)
    const yearMatch = text.match(/(\d{4})\s*год\s*\/\s*(\d{1,2})\s*месяц/);
    const year = yearMatch ? `${yearMatch[1]} год / ${yearMatch[2]} месяц (дата регистрации)` : '';

    // Extract engine info - look for 🟢Двигатель: or Двигатель:
    const engineMatch = text.match(/🟢Двигатель:\s*(\d+(?:\.\d+)?)\s*л\.\s*,\s*(\d+)\s*л\.с\s*\(([^)]+)\)|(\d+(?:\.\d+)?)\s*л\.\s*,\s*(\d+)\s*л\.с\.?\s*(?:\(([^)]+)\))?/i);
    const engine = engineMatch ? 
      (engineMatch[1] ? `${engineMatch[1]} л., ${engineMatch[2]} л.с. (${engineMatch[3]})` : 
       `${engineMatch[4]} л., ${engineMatch[5]} л.с.${engineMatch[6] ? ` (${engineMatch[6]})` : ''}`) : '';

    // Extract drive type - look for 🟢Привод: or Привод:
    const driveMatch = text.match(/🟢Привод:\s*(4WD|AWD|FWD|RWD|2WD|Передний|Задний|Полный)|(4WD|AWD|FWD|RWD|2WD|Передний|Задний|Полный)/i);
    const drive = driveMatch ? DRIVE_MAPPING[(driveMatch[1] || driveMatch[2]).toUpperCase()] || (driveMatch[1] || driveMatch[2]) : '';

    // Extract mileage - look for 🟢Пробег: or Пробег:
    const mileageMatch = text.match(/🟢Пробег:\s*(\d+(?:\.\d+)*)\s*км\.?|(\d+(?:\s*\d+)*)\s*км\.?/);
    const mileageValue = mileageMatch ? (mileageMatch[1] || mileageMatch[2]) : '';
    const distance = mileageValue ? 
      `${parseInt(mileageValue.replace(/\./g, '').replace(/\s/g, '')).toLocaleString('ru-RU')} км.` : '';

    // Determine if car is new based on mileage (0 км = new)
    const isNew = distance.includes('0 км') || distance === '0 км.';

    // Extract export country - look for 🟢Страна экспорта: or Страна экспорта:
    const countryMatch = text.match(/🟢Страна\s*экспорта:\s*([^🇰🇷🇨🇳🇯🇵🇩🇪]+)[🇰🇷🇨🇳🇯🇵🇩🇪]|Страна\s*экспорта:\s*([^\n]+)/);
    const countryName = countryMatch ? (countryMatch[1] || countryMatch[2]).trim() : '';
    const location = countryName ? COUNTRY_MAPPING[countryName] || 'CN' : 'CN';

    // Extract price - look for "Цена под ключ до Москвы" or "Цена (под ключ в Москве)"
    const priceMatch = text.match(/Цена под ключ до Москвы[^0-9]*(\d+(?:\.\d+)*)|(?:Цена\s*\(под\s*ключ\s*в\s*Москве\):\s*)?(\d+(?:\s*\d+)*)\s*₽/);
    const priceValue = priceMatch ? (priceMatch[1] || priceMatch[2]) : '';
    const price = priceValue ? 
      `${parseInt(priceValue.replace(/\./g, '').replace(/\s/g, '')).toLocaleString('ru-RU')} ₽` : '';

    // Extract publication date
    const dateMatch = text.match(/по\s*курсу\s*(\d{1,2})\s*сентября|(\d{1,2})\s*сентября/);
    const date = dateMatch ? `${dateMatch[1] || dateMatch[2]} сентября` : '';

    // Check if all required fields are present
    if (!title || !engine || !price) {
      return null;
    }

    return {
      title,
      engine,
      drive,
      modification,
      distance,
      price,
      year,
      location,
      date,
      isNew,
      imageUrl: undefined, // Will be set separately
      externalLink: undefined // Will be set separately
    };

  } catch (error) {
    console.error('Error parsing car data:', error);
    return null;
  }
}

/**
 * Check if message is related to cars and should be parsed
 */
function isCarRelatedMessage(text: string): boolean {
  const carKeywords = [
    '#автоизяпонии',
    '#автоизкореи', 
    '#автоизкитая',
    '#автоизгермании',
    '#автоподзаказ',
    'Модель:',
    'Комплектация:',
    'Двигатель:',
    'Привод:',
    'Пробег:',
    'Цена',
    '₽',
    '🔥', // Fire emoji used in your format
    '🟢Комплектация:', // Green circle with text
    '🟢Двигатель:',
    '🟢Привод:',
    '🟢Пробег:',
    '🟢Страна экспорта:',
    'Цена под ключ до Москвы'
  ];

  return carKeywords.some(keyword => text.includes(keyword));
}

/**
 * Extract image file ID from Telegram message
 */
export function extractImageFileId(message: TelegramMessage): string | null {
  if (message.photo && message.photo.length > 0) {
    // Get the highest quality photo (usually the last one in the array)
    return message.photo[message.photo.length - 1].file_id;
  }
  return null;
}

/**
 * Generate Telegram message link
 */
export function generateTelegramLink(chatId: string | number, messageId: number): string {
  // Handle different chat ID formats
  const chatIdStr = chatId.toString();
  
  // For public channels/groups, use the username format
  if (chatIdStr.startsWith('@')) {
    return `https://t.me/${chatIdStr.substring(1)}/${messageId}`;
  }
  
  // For private groups/channels, use the chat ID format
  // Remove the -100 prefix for supergroups if present
  const cleanChatId = chatIdStr.replace(/^-100/, '');
  return `https://t.me/c/${cleanChatId}/${messageId}`;
}

/**
 * Generate unique ID for car card
 */
export function generateCarId(): string {
  return `car-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

/**
 * Validate parsed car data
 */
export function validateCarData(data: ParsedCarData): boolean {
  const requiredFields = ['title', 'engine', 'price'];
  return requiredFields.every(field => {
    const value = data[field as keyof ParsedCarData];
    return value && value.toString().trim() !== '';
  });
}

/**
 * Format car data for database insertion
 */
export function formatCarDataForDB(data: ParsedCarData, imageUrl: string, externalLink?: string, telegramLink?: string): Record<string, unknown> {
  return {
    id: generateCarId(),
    title: data.title,
    engine: data.engine,
    drive: data.drive || '2WD',
    modification: data.modification || 'Base',
    distance: data.distance || '0 км.',
    imageUrl,
    externalLink: telegramLink || externalLink || '#',
    price: data.price,
    year: data.year || 'Не указан',
    location: data.location || 'CN',
    isNew: data.isNew,
    date: data.date || new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
  };
}
