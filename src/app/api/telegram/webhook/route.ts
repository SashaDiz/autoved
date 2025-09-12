import { NextRequest, NextResponse } from 'next/server';
import { processMessage } from '@/lib/telegramBot';

/**
 * Telegram webhook endpoint
 * Receives messages from Telegram and processes them automatically
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Verify webhook secret
    const secretToken = request.headers.get('x-telegram-bot-api-secret-token');
    const expectedSecret = process.env.PARSER_TELEGRAM_WEBHOOK_SECRET;
    
    if (expectedSecret && secretToken !== expectedSecret) {
      console.log('Invalid webhook secret');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Handle different types of updates
    if (body.message) {
      const success = await processMessage(body.message);
      
      return NextResponse.json({ 
        success,
        message: success ? 'Message processed successfully' : 'Message processing failed'
      });
    }

    // Handle other update types (edited messages, etc.)
    if (body.edited_message) {
      console.log('Received edited message, ignoring');
      return NextResponse.json({ success: true, message: 'Edited message ignored' });
    }

    // Handle callback queries (button presses)
    if (body.callback_query) {
      console.log('Received callback query, ignoring');
      return NextResponse.json({ success: true, message: 'Callback query ignored' });
    }

    // Unknown update type
    console.log('Received unknown update type:', Object.keys(body));
    return NextResponse.json({ success: true, message: 'Unknown update type ignored' });

  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

/**
 * Handle GET requests (for webhook verification)
 */
export async function GET() {
  return NextResponse.json({
    message: 'Telegram bot webhook endpoint',
    status: 'ok',
    timestamp: new Date().toISOString()
  });
}
