import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { parseCarData, validateCarData, formatCarDataForDB, extractImageFileId, generateTelegramLink, ParsedCarData } from '@/utils/telegramParser';
import { generateId } from '@/utils/adminData';

// Telegram Bot API configuration
const TELEGRAM_BOT_TOKEN = process.env.PARSER_TELEGRAM_BOT_TOKEN;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

/**
 * Download image from Telegram and upload to S3
 */
async function downloadAndUploadImage(fileId: string): Promise<string> {
  if (!TELEGRAM_BOT_TOKEN) {
    throw new Error('Telegram bot token not configured');
  }

  try {
    // Get file info from Telegram
    const fileInfoResponse = await fetch(`${TELEGRAM_API_URL}/getFile?file_id=${fileId}`);
    const fileInfo = await fileInfoResponse.json();

    if (!fileInfo.ok) {
      throw new Error('Failed to get file info from Telegram');
    }

    // Download file from Telegram
    const fileUrl = `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${fileInfo.result.file_path}`;
    const imageResponse = await fetch(fileUrl);
    
    if (!imageResponse.ok) {
      throw new Error('Failed to download image from Telegram');
    }

    const imageBuffer = await imageResponse.arrayBuffer();
    const imageArray = new Uint8Array(imageBuffer);

    // Upload to S3
    const { uploadFileToS3 } = await import('@/lib/s3');
    const fileName = `telegram-cars/${Date.now()}-${Math.random().toString(36).substring(2, 11)}.jpg`;
    
    const uploadedUrl = await uploadFileToS3(imageArray, fileName, 'image/jpeg');
    return uploadedUrl;

  } catch (error) {
    console.error('Error downloading/uploading image:', error);
    throw error;
  }
}

/**
 * Add new car card to database
 */
async function addCarCardToDatabase(carData: any): Promise<void> {
  const connection = await db.getConnection();
  
  try {
    await connection.beginTransaction();

    // Get current max sort order
    const [sortResult] = await connection.execute('SELECT MAX(sort_order) as max_sort FROM car_cards');
    const maxSort = (sortResult as any)[0]?.max_sort || 0;

    // Insert new car card
    await connection.execute(
      `INSERT INTO car_cards (
        id, title, engine, drive, modification, distance, 
        image_url, external_link, price, year, location, 
        is_new, date, sort_order, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        carData.id,
        carData.title,
        carData.engine,
        carData.drive,
        carData.modification,
        carData.distance,
        carData.imageUrl,
        carData.externalLink,
        carData.price,
        carData.year,
        carData.location,
        carData.isNew,
        carData.date,
        maxSort + 1
      ]
    );

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

/**
 * Process Telegram message and extract car data
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, webhook_secret } = body;

    // Verify webhook secret if provided
    if (process.env.PARSER_TELEGRAM_WEBHOOK_SECRET && webhook_secret !== process.env.PARSER_TELEGRAM_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!message) {
      return NextResponse.json({ error: 'No message provided' }, { status: 400 });
    }

    // Parse car data from message
    const parsedData = parseCarData(message);
    
    if (!parsedData) {
      return NextResponse.json({ 
        success: false, 
        message: 'Message does not contain car data or is not car-related' 
      });
    }

    // Validate parsed data
    if (!validateCarData(parsedData)) {
      return NextResponse.json({ 
        success: false, 
        message: 'Parsed data is incomplete or invalid' 
      });
    }

    let imageUrl = '/assets/default-car.jpg'; // Default image

    // Try to download and upload image if available
    const imageFileId = extractImageFileId(message);
    if (imageFileId) {
      try {
        imageUrl = await downloadAndUploadImage(imageFileId);
      } catch (error) {
        console.error('Failed to download image, using default:', error);
        // Continue with default image
      }
    }

    // Generate Telegram link
    const chatId = message.chat?.id || process.env.PARSER_TELEGRAM_TARGET_CHAT_ID;
    const messageId = message.message_id;
    const telegramLink = chatId && messageId ? generateTelegramLink(chatId, messageId) : undefined;

    // Format data for database
    const carData = formatCarDataForDB(parsedData, imageUrl, undefined, telegramLink);

    // Add to database
    await addCarCardToDatabase(carData);

    return NextResponse.json({ 
      success: true, 
      message: 'Car card added successfully',
      carData: {
        id: carData.id,
        title: carData.title,
        price: carData.price
      }
    });

  } catch (error) {
    console.error('Error processing Telegram message:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to process message',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

/**
 * Test endpoint to check if parser works correctly
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const testText = searchParams.get('text');

  if (!testText) {
    return NextResponse.json({ error: 'No test text provided' }, { status: 400 });
  }

  try {
    const testMessage = {
      text: testText,
      date: Date.now(),
      message_id: 12345
    };

    const parsedData = parseCarData(testMessage);
    
    return NextResponse.json({
      success: true,
      parsedData,
      isValid: parsedData ? validateCarData(parsedData) : false
    });

  } catch (error) {
    console.error('Error testing parser:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to test parser',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
