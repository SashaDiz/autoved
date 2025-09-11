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
    console.log('Attempting to send Telegram message...');
    
    // Check if bot token is configured
    if (!process.env.TELEGRAM_BOT_TOKEN) {
      console.error('TELEGRAM_BOT_TOKEN is not configured');
      throw new Error('TELEGRAM_BOT_TOKEN is not configured');
    }

    // Check if chat ID is configured
    if (!process.env.TELEGRAM_CHAT_ID) {
      console.error('TELEGRAM_CHAT_ID is not configured');
      throw new Error('TELEGRAM_CHAT_ID is not configured');
    }

    console.log('Telegram configuration found:', {
      botTokenLength: process.env.TELEGRAM_BOT_TOKEN.length,
      chatId: process.env.TELEGRAM_CHAT_ID,
      messageLength: message.length
    });

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
    
    // More detailed error logging
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }
    
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
