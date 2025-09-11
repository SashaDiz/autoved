import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Check environment variables (without exposing sensitive data)
    const envCheck = {
      TELEGRAM_BOT_TOKEN: !!process.env.TELEGRAM_BOT_TOKEN,
      TELEGRAM_CHAT_ID: !!process.env.TELEGRAM_CHAT_ID,
      NODE_ENV: process.env.NODE_ENV,
      botTokenLength: process.env.TELEGRAM_BOT_TOKEN?.length || 0,
      chatIdLength: process.env.TELEGRAM_CHAT_ID?.length || 0,
    };

    console.log('Environment check:', envCheck);

    return NextResponse.json({
      success: true,
      environment: envCheck,
      message: 'Environment variables check completed'
    });

  } catch (error) {
    console.error('Error checking environment:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
