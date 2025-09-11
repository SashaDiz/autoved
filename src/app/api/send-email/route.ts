import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendTelegramMessage, formatFormMessage, testTelegramConnection } from '@/lib/telegram';

// Define the schema for form validation
const FormSchema = z.object({
  name: z.string().min(1, 'Имя обязательно'),
  phone: z.string().min(1, 'Телефон обязателен'),
  country: z.string(),
  budget: z.string(),
  message: z.string().optional(),
});

// Telegram notification function
async function sendTelegramNotification(data: { name: string; phone: string; country: string; budget: string; message?: string }) {
  try {
    // Format the message for Telegram
    const message = formatFormMessage(data);
    
    // Send to Telegram
    const result = await sendTelegramMessage(message);
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to send Telegram message');
    }
    
    console.log('Telegram notification sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
    throw new Error(`Failed to send Telegram notification: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the form data
    const validatedData = FormSchema.parse(body);
    
    // Check if Telegram configuration is available
    if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
      console.error('Telegram configuration missing. Please set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID environment variables.');
      return NextResponse.json(
        { success: false, message: 'Telegram service not configured. Please contact administrator.' },
        { status: 500 }
      );
    }
    
    // Test Telegram connection first
    const connectionTest = await testTelegramConnection();
    if (!connectionTest.success) {
      console.error('Telegram connection test failed:', connectionTest.error);
      return NextResponse.json(
        { success: false, message: 'Telegram service unavailable. Please try again later.' },
        { status: 500 }
      );
    }
    
    // Send Telegram notification
    const telegramResult = await sendTelegramNotification(validatedData);
    
    // Store in database if needed (you already have MySQL setup)
    // const db = require('@/lib/db');
    // await db.execute('INSERT INTO form_submissions (name, phone, country, budget, message, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
    //   [validatedData.name, validatedData.phone, validatedData.country, validatedData.budget, validatedData.message]);

    return NextResponse.json({ 
      success: true, 
      message: 'Заявка отправлена успешно! Мы свяжемся с вами в ближайшее время.',
      messageId: telegramResult.messageId
    });

  } catch (error) {
    console.error('Error processing form submission:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Некорректные данные формы', errors: error.issues },
        { status: 400 }
      );
    }

    // Handle Telegram sending errors specifically
    if (error instanceof Error && error.message.includes('Failed to send Telegram notification')) {
      return NextResponse.json(
        { success: false, message: 'Ошибка отправки уведомления. Попробуйте еще раз или свяжитесь с нами напрямую.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Произошла ошибка при отправке заявки. Попробуйте еще раз.' },
      { status: 500 }
    );
  }
}
