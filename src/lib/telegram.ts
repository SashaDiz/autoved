import { Telegraf } from 'telegraf';

// Telegram bot configuration
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN || '');

// Format form data into a nice Telegram message
export function formatFormMessage(data: {
  name: string;
  phone: string;
  country: string;
  budget: string;
  message?: string;
}): string {
  const timestamp = new Date().toLocaleString('ru-RU', { 
    timeZone: 'Europe/Moscow',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });

  return `🚗 *Новая заявка с сайта AutoVed*

👤 *Имя:* ${data.name}
📞 *Телефон:* ${data.phone}
🌍 *Страна интереса:* ${data.country}
💰 *Бюджет:* ${data.budget}
${data.message ? `💬 *Сообщение:*\n${data.message}\n` : ''}
⏰ *Время:* ${timestamp}
🌐 *Источник:* AutoVed (vedtime.ru)`;
}

// Send message to Telegram
export async function sendTelegramMessage(message: string): Promise<{ success: boolean; messageId?: number; error?: string }> {
  try {
    // Check if bot token is configured
    if (!process.env.TELEGRAM_BOT_TOKEN) {
      throw new Error('TELEGRAM_BOT_TOKEN is not configured');
    }

    // Check if chat ID is configured
    if (!process.env.TELEGRAM_CHAT_ID) {
      throw new Error('TELEGRAM_CHAT_ID is not configured');
    }

    // Send message to the configured chat
    const result = await bot.telegram.sendMessage(
      process.env.TELEGRAM_CHAT_ID,
      message,
      {
        parse_mode: 'Markdown',
        link_preview_options: { is_disabled: true },
      }
    );

    console.log('Telegram message sent successfully:', result.message_id);
    
    return {
      success: true,
      messageId: result.message_id
    };

  } catch (error) {
    console.error('Error sending Telegram message:', error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Test Telegram connection
export async function testTelegramConnection(): Promise<{ success: boolean; error?: string }> {
  try {
    if (!process.env.TELEGRAM_BOT_TOKEN) {
      throw new Error('TELEGRAM_BOT_TOKEN is not configured');
    }

    // Get bot info to test connection
    const botInfo = await bot.telegram.getMe();
    console.log('Telegram bot connected:', botInfo.username);
    
    return { success: true };
  } catch (error) {
    console.error('Telegram connection test failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Get chat ID helper (for initial setup)
export async function getChatId(): Promise<{ success: boolean; chatId?: number; error?: string }> {
  try {
    if (!process.env.TELEGRAM_BOT_TOKEN) {
      throw new Error('TELEGRAM_BOT_TOKEN is not configured');
    }

    // This is a helper function to get chat ID
    // You would need to send a message to the bot first
    console.log('To get your chat ID:');
    console.log('1. Start a conversation with your bot on Telegram');
    console.log('2. Send any message to the bot');
    console.log('3. Check the logs for the chat ID');
    
    return {
      success: false,
      error: 'Please send a message to your bot first, then check the logs for the chat ID'
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
