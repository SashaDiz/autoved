#!/usr/bin/env node

/**
 * Скрипт для настройки Telegram webhook
 * Использование: node scripts/setup-telegram-webhook.js
 */

const https = require('https');

// Загружаем переменные окружения
require('dotenv').config({ path: '.env.local' });

const BOT_TOKEN = process.env.PARSER_TELEGRAM_BOT_TOKEN;
const WEBHOOK_URL = process.env.PARSER_TELEGRAM_WEBHOOK_URL;
const WEBHOOK_SECRET = process.env.PARSER_TELEGRAM_WEBHOOK_SECRET;

if (!BOT_TOKEN || !WEBHOOK_URL || !WEBHOOK_SECRET) {
  console.error('❌ Ошибка: Не все переменные окружения настроены');
  console.error('Необходимые переменные:');
  console.error('- PARSER_TELEGRAM_BOT_TOKEN');
  console.error('- PARSER_TELEGRAM_WEBHOOK_URL');
  console.error('- PARSER_TELEGRAM_WEBHOOK_SECRET');
  process.exit(1);
}

const webhookUrl = `${WEBHOOK_URL}/api/telegram/webhook`;

console.log('🤖 Настройка Telegram webhook...');
console.log(`📡 URL: ${webhookUrl}`);
console.log(`🔑 Secret: ${WEBHOOK_SECRET.substring(0, 8)}...`);

const postData = JSON.stringify({
  url: webhookUrl,
  secret_token: WEBHOOK_SECRET,
  drop_pending_updates: true
});

const options = {
  hostname: 'api.telegram.org',
  port: 443,
  path: `/bot${BOT_TOKEN}/setWebhook`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const result = JSON.parse(data);
      
      if (result.ok) {
        console.log('✅ Webhook успешно установлен!');
        console.log(`📋 Описание: ${result.description}`);
        
        // Проверяем webhook info
        checkWebhookInfo();
      } else {
        console.error('❌ Ошибка установки webhook:');
        console.error(`📋 Описание: ${result.description}`);
        process.exit(1);
      }
    } catch (error) {
      console.error('❌ Ошибка парсинга ответа:', error.message);
      console.error('📄 Ответ сервера:', data);
      process.exit(1);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Ошибка запроса:', error.message);
  process.exit(1);
});

req.write(postData);
req.end();

function checkWebhookInfo() {
  const options = {
    hostname: 'api.telegram.org',
    port: 443,
    path: `/bot${BOT_TOKEN}/getWebhookInfo`,
    method: 'GET'
  };

  const req = https.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      try {
        const result = JSON.parse(data);
        
        if (result.ok) {
          const info = result.result;
          console.log('\n📊 Информация о webhook:');
          console.log(`🔗 URL: ${info.url}`);
          console.log(`📅 Последняя ошибка: ${info.last_error_date || 'Нет'}`);
          console.log(`❌ Количество ошибок: ${info.pending_update_count || 0}`);
          console.log(`📈 Ожидающих обновлений: ${info.pending_update_count || 0}`);
          
          if (info.last_error_message) {
            console.log(`⚠️  Последнее сообщение об ошибке: ${info.last_error_message}`);
          }
        }
      } catch (error) {
        console.error('❌ Ошибка получения информации о webhook:', error.message);
      }
    });
  });

  req.on('error', (error) => {
    console.error('❌ Ошибка запроса информации о webhook:', error.message);
  });

  req.end();
}
