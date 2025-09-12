// Telegram Bot for parsing car messages - simplified version
import { parseCarData, TelegramMessage } from '@/utils/telegramParser';

// Configuration
const BOT_TOKEN = process.env.PARSER_TELEGRAM_BOT_TOKEN;
const WEBHOOK_SECRET = process.env.PARSER_TELEGRAM_WEBHOOK_SECRET;
const TARGET_CHAT_ID = process.env.PARSER_TELEGRAM_TARGET_CHAT_ID;

// Car-related hashtags to monitor
const CAR_HASHTAGS = [
  '#автоизяпонии',
  '#автоизкореи', 
  '#автоизкитая',
  '#автоизгермании',
  '#автоподзаказ'
];

/**
 * Check if message contains car-related hashtags
 */
function containsCarHashtag(text: string): boolean {
  return CAR_HASHTAGS.some(hashtag => text.toLowerCase().includes(hashtag.toLowerCase()));
}

/**
 * Process incoming message from Telegram
 */
export async function processMessage(message: any): Promise<boolean> {
  try {
    // Check if message is from target chat
    if (TARGET_CHAT_ID && message.chat.id.toString() !== TARGET_CHAT_ID) {
      return false;
    }

    // Check if message contains car-related content
    const text = message.text || message.caption || '';
    if (!containsCarHashtag(text)) {
      return false;
    }

    // Check if message has photo (required for car cards)
    if (!message.photo || message.photo.length === 0) {
      console.log('Message has no photo, skipping');
      return false;
    }

    // Parse car data
    const parsedData = parseCarData(message);
    if (!parsedData) {
      console.log('Failed to parse car data from message');
      return false;
    }

    console.log('Parsed car data:', parsedData);

    // Send to our API for processing
    const success = await sendToAPI(message);
    
    if (success) {
      console.log('Successfully processed car message:', message.message_id);
    } else {
      console.log('Failed to process car message:', message.message_id);
    }

    return success;

  } catch (error) {
    console.error('Error processing message:', error);
    return false;
  }
}

/**
 * Send message to our API for processing
 */
async function sendToAPI(message: TelegramMessage): Promise<boolean> {
  try {
    // Use absolute URL for internal API calls
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/telegram/parse-message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        webhook_secret: WEBHOOK_SECRET
      }),
    });

    const result = await response.json();
    return result.success === true;

  } catch (error) {
    console.error('Error sending to API:', error);
    return false;
  }
}
