#!/usr/bin/env node

// Simple script to get Chat ID for parser bot
// Usage: node test-parser-chat-id.js

const { Telegraf } = require('telegraf');
require('dotenv').config({ path: '.env.local' });

const BOT_TOKEN = process.env.PARSER_TELEGRAM_BOT_TOKEN;

if (!BOT_TOKEN) {
  console.error('❌ PARSER_TELEGRAM_BOT_TOKEN not found in .env.local file');
  process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);

console.log('🤖 Parser Bot - Get Chat ID');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📱 Bot Token:', BOT_TOKEN.substring(0, 10) + '...');
console.log('⏳ Waiting for messages...');
console.log('💡 Add bot to group and send any message');
console.log('🛑 Press Ctrl+C to stop');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

bot.on('message', (ctx) => {
  const chat = ctx.chat;
  const from = ctx.from;

  console.log('📨 Message received!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`💬 Chat ID: ${chat.id}`);
  console.log(`👤 User: ${from?.first_name || 'Unknown'}`);
  console.log(`🏷️  Type: ${chat.type}`);
  
  if (chat.type === 'group' || chat.type === 'supergroup') {
    console.log(`📝 Group: ${chat.title || 'Unknown'}`);
  }
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✅ Add this to your .env.local:`);
  console.log(`PARSER_TELEGRAM_TARGET_CHAT_ID=${chat.id}\n`);
});

bot.on('new_chat_members', (ctx) => {
  const chat = ctx.chat;
  console.log('👥 Bot added to group!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`💬 Chat ID: ${chat.id}`);
  console.log(`📝 Group: ${chat.title || 'Unknown'}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✅ Add this to your .env.local:`);
  console.log(`PARSER_TELEGRAM_TARGET_CHAT_ID=${chat.id}\n`);
});

bot.catch((err) => {
  console.error('❌ Error:', err);
});

bot.launch()
  .then(() => {
    console.log('🚀 Bot started! Send a message to get Chat ID\n');
  })
  .catch((error) => {
    console.error('❌ Failed to start:', error);
    process.exit(1);
  });

process.once('SIGINT', () => {
  console.log('\n🛑 Stopping...');
  bot.stop('SIGINT');
});

process.once('SIGTERM', () => {
  bot.stop('SIGTERM');
});
