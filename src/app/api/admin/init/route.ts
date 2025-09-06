import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { getDefaultData } from '@/utils/adminData';

export const dynamic = 'force-static';

export async function POST() {
  try {
    const connection = await db.getConnection();
    
    // Create tables (using the SQL from init-db.sql)
    const createTablesSQL = `
      CREATE TABLE IF NOT EXISTS hero_slides (
        id VARCHAR(255) PRIMARY KEY,
        background_image TEXT NOT NULL,
        car_name VARCHAR(255) NOT NULL,
        car_specs VARCHAR(255) NOT NULL,
        car_year VARCHAR(255) NOT NULL,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS hero_settings (
        id INT PRIMARY KEY DEFAULT 1,
        title TEXT NOT NULL,
        subtitle TEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS promo_settings (
        id INT PRIMARY KEY DEFAULT 1,
        title TEXT NOT NULL,
        subtitle TEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS video_reviews (
        id VARCHAR(255) PRIMARY KEY,
        customer_name VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        car_model VARCHAR(255) NOT NULL,
        cover_image TEXT NOT NULL,
        vk_embed_url TEXT NOT NULL,
        action VARCHAR(255) DEFAULT 'Смотреть',
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS faq_items (
        id VARCHAR(255) PRIMARY KEY,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS car_cards (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        engine VARCHAR(255) NOT NULL,
        drive VARCHAR(50) NOT NULL,
        modification VARCHAR(255) NOT NULL,
        distance VARCHAR(255) NOT NULL,
        image_url TEXT NOT NULL,
        external_link TEXT NOT NULL,
        price VARCHAR(255) NOT NULL,
        year VARCHAR(255) NOT NULL,
        location VARCHAR(10) NOT NULL,
        is_new BOOLEAN DEFAULT FALSE,
        date VARCHAR(255) NOT NULL,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS cars_settings (
        id INT PRIMARY KEY DEFAULT 1,
        title TEXT NOT NULL,
        subtitle TEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `;

    // Execute table creation
    const statements = createTablesSQL.split(';').filter(stmt => stmt.trim());
    for (const statement of statements) {
      if (statement.trim()) {
        await connection.execute(statement);
      }
    }

    // Insert default data if tables are empty
    const defaultData = getDefaultData();

    // Check if hero_settings exists
    const [heroRows] = await connection.execute('SELECT COUNT(*) as count FROM hero_settings');
    if ((heroRows as Record<string, unknown>[])[0]?.count === 0) {
      // Insert hero settings
      await connection.execute(
        'INSERT INTO hero_settings (title, subtitle) VALUES (?, ?)',
        [defaultData.hero.title, defaultData.hero.subtitle]
      );

      // Insert hero slides
      for (let i = 0; i < defaultData.hero.slides.length; i++) {
        const slide = defaultData.hero.slides[i];
        await connection.execute(
          'INSERT INTO hero_slides (id, background_image, car_name, car_specs, car_year, sort_order) VALUES (?, ?, ?, ?, ?, ?)',
          [slide.id, slide.backgroundImage, slide.carInfo.name, slide.carInfo.specs, slide.carInfo.year, i]
        );
      }

      // Insert promo settings
      await connection.execute(
        'INSERT INTO promo_settings (title, subtitle) VALUES (?, ?)',
        [defaultData.promo.title, defaultData.promo.subtitle]
      );

      // Insert video reviews
      for (let i = 0; i < defaultData.videoReviews.length; i++) {
        const review = defaultData.videoReviews[i];
        await connection.execute(
          'INSERT INTO video_reviews (id, customer_name, location, car_model, cover_image, vk_embed_url, action, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [review.id, review.customerName, review.location, review.carModel, review.coverImage, review.vkEmbedUrl, review.action, i]
        );
      }

      // Insert FAQ items
      for (let i = 0; i < defaultData.faq.length; i++) {
        const faq = defaultData.faq[i];
        await connection.execute(
          'INSERT INTO faq_items (id, question, answer, sort_order) VALUES (?, ?, ?, ?)',
          [faq.id, faq.question, faq.answer, i]
        );
      }

      // Insert cars settings
      await connection.execute(
        'INSERT INTO cars_settings (title, subtitle) VALUES (?, ?)',
        [defaultData.cards.title, defaultData.cards.subtitle]
      );

      // Insert car cards
      for (let i = 0; i < defaultData.cards.cards.length; i++) {
        const car = defaultData.cards.cards[i];
        await connection.execute(
          'INSERT INTO car_cards (id, title, engine, drive, modification, distance, image_url, external_link, price, year, location, is_new, date, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [car.id, car.title, car.engine, car.drive, car.modification, car.distance, car.imageUrl, car.externalLink, car.price, car.year, car.location, car.isNew, car.date, i]
        );
      }
    }

    connection.release();

    return NextResponse.json({ success: true, message: 'Database initialized successfully' });
  } catch (error) {
    console.error('Database initialization error:', error);
    return NextResponse.json({ success: false, error: 'Failed to initialize database' }, { status: 500 });
  }
}