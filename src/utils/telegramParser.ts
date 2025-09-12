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
    // Extract model name (usually in CAPS or after "Модель:")
    const modelMatch = text.match(/(?:Модель:\s*)?([A-ZА-Я\s]+(?:[A-ZА-Я]+[A-ZА-Я\s]*)*)/);
    const title = modelMatch ? modelMatch[1].trim() : '';

    // Extract trim/configuration (usually after model name or "Комплектация:")
    const trimMatch = text.match(/(?:Комплектация:\s*|Trim:\s*)?([A-Za-zА-Яа-я0-9\s\-\.]+)(?:\s*\n|$)/);
    const modification = trimMatch ? trimMatch[1].trim() : '';

    // Extract registration date (year/month format)
    const yearMatch = text.match(/(\d{4})\s*год\s*\/\s*(\d{1,2})\s*месяц/);
    const year = yearMatch ? `${yearMatch[1]} год / ${yearMatch[2]} месяц (дата регистрации)` : '';

    // Extract engine info
    const engineMatch = text.match(/(\d+(?:\.\d+)?)\s*л\.\s*,\s*(\d+)\s*л\.с\.?\s*(?:\(([^)]+)\))?/i);
    const engine = engineMatch ? `${engineMatch[1]} л., ${engineMatch[2]} л.с.${engineMatch[3] ? ` (${engineMatch[3]})` : ''}` : '';

    // Extract drive type
    const driveMatch = text.match(/(4WD|AWD|FWD|RWD|2WD|Передний|Задний|Полный)/i);
    const drive = driveMatch ? DRIVE_MAPPING[driveMatch[1].toUpperCase()] || driveMatch[1] : '';

    // Extract mileage
    const mileageMatch = text.match(/(\d+(?:\s*\d+)*)\s*км\.?/);
    const distance = mileageMatch ? `${parseInt(mileageMatch[1].replace(/\s/g, '')).toLocaleString('ru-RU')} км.` : '';

    // Determine if car is new based on mileage (0 км = new)
    const isNew = distance.includes('0 км') || distance === '0 км.';

    // Extract export country
    const countryMatch = text.match(/Страна\s*экспорта:\s*([^\n]+)/);
    const location = countryMatch ? COUNTRY_MAPPING[countryMatch[1].trim()] || 'CN' : 'CN';

    // Extract price (turnkey in Moscow)
    const priceMatch = text.match(/(?:Цена\s*\(под\s*ключ\s*в\s*Москве\):\s*)?(\d+(?:\s*\d+)*)\s*₽/);
    const price = priceMatch ? `${parseInt(priceMatch[1].replace(/\s/g, '')).toLocaleString('ru-RU')} ₽` : '';

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
    '₽'
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
export function formatCarDataForDB(data: ParsedCarData, imageUrl: string, externalLink?: string, telegramLink?: string): any {
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
