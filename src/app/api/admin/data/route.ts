import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { AdminData, getDefaultData } from '@/utils/adminData';

// Remove force-static for server-side functionality
// export const dynamic = 'force-static';

export async function GET() {
  try {
    const connection = await db.getConnection();

    // Get hero settings
    const [heroSettings] = await connection.execute('SELECT * FROM hero_settings WHERE id = 1');
    const heroSetting = (heroSettings as Record<string, unknown>[])[0] as { title: string; subtitle: string } || { title: '', subtitle: '' };

    // Get hero slides
    const [heroSlides] = await connection.execute('SELECT * FROM hero_slides ORDER BY sort_order');
    const slides = (heroSlides as Record<string, unknown>[]).map(slide => ({
      id: slide.id as string,
      backgroundImage: slide.background_image as string,
      carInfo: {
        name: slide.car_name as string,
        specs: slide.car_specs as string,
        year: slide.car_year as string
      }
    }));

    // Get promo settings
    const [promoSettings] = await connection.execute('SELECT * FROM promo_settings WHERE id = 1');
    const promoSetting = (promoSettings as Record<string, unknown>[])[0] as { title: string; subtitle: string } || { title: '', subtitle: '' };

    // Get video reviews
    const [videoReviews] = await connection.execute('SELECT * FROM video_reviews ORDER BY sort_order');
    const reviews = (videoReviews as Record<string, unknown>[]).map(review => ({
      id: review.id as string,
      customerName: review.customer_name as string,
      location: review.location as string,
      carModel: review.car_model as string,
      coverImage: review.cover_image as string,
      vkEmbedUrl: review.vk_embed_url as string,
      action: review.action as string
    }));

    // Get FAQ items
    const [faqItems] = await connection.execute('SELECT * FROM faq_items ORDER BY sort_order');
    const faqs = (faqItems as Record<string, unknown>[]).map(faq => ({
      id: faq.id as string,
      question: faq.question as string,
      answer: faq.answer as string
    }));

    // Get cars settings
    const [carsSettings] = await connection.execute('SELECT * FROM cars_settings WHERE id = 1');
    const carsSetting = (carsSettings as Record<string, unknown>[])[0] as { title: string; subtitle: string } || { title: '', subtitle: '' };

    // Get car cards
    const [carCards] = await connection.execute('SELECT * FROM car_cards ORDER BY sort_order');
    const cars = (carCards as Record<string, unknown>[]).map(car => ({
      id: car.id as string,
      title: car.title as string,
      engine: car.engine as string,
      drive: car.drive as string,
      modification: car.modification as string,
      distance: car.distance as string,
      imageUrl: car.image_url as string,
      externalLink: car.external_link as string,
      price: car.price as string,
      year: car.year as string,
      location: car.location as string,
      isNew: Boolean(car.is_new),
      date: car.date as string
    }));

    connection.release();

    const adminData: AdminData = {
      hero: {
        title: heroSetting.title,
        subtitle: heroSetting.subtitle,
        slides
      },
      promo: {
        title: promoSetting.title,
        subtitle: promoSetting.subtitle
      },
      videoReviews: reviews,
      faq: faqs,
      cards: {
        title: carsSetting.title,
        subtitle: carsSetting.subtitle,
        cards: cars
      }
    };

    return NextResponse.json(adminData);
  } catch (error) {
    console.error('Failed to get admin data from database:', error);
    // For development: return default data. For production: return error details
    if (process.env.NODE_ENV === 'development') {
      console.log('Development mode: returning default data as fallback');
      const defaultData = getDefaultData();
      return NextResponse.json(defaultData);
    } else {
      return NextResponse.json({ 
        error: 'Database connection failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, { status: 500 });
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { section, data } = await request.json();
    const connection = await db.getConnection();

    await connection.beginTransaction();

    try {
      if (section === 'hero') {
        // Update hero settings
        await connection.execute(
          'INSERT INTO hero_settings (id, title, subtitle) VALUES (1, ?, ?) ON DUPLICATE KEY UPDATE title = VALUES(title), subtitle = VALUES(subtitle)',
          [data.title, data.subtitle]
        );

        // Delete existing slides and insert new ones
        await connection.execute('DELETE FROM hero_slides');
        for (let i = 0; i < data.slides.length; i++) {
          const slide = data.slides[i];
          await connection.execute(
            'INSERT INTO hero_slides (id, background_image, car_name, car_specs, car_year, sort_order) VALUES (?, ?, ?, ?, ?, ?)',
            [slide.id, slide.backgroundImage, slide.carInfo.name, slide.carInfo.specs, slide.carInfo.year, i]
          );
        }
      } else if (section === 'promo') {
        await connection.execute(
          'INSERT INTO promo_settings (id, title, subtitle) VALUES (1, ?, ?) ON DUPLICATE KEY UPDATE title = VALUES(title), subtitle = VALUES(subtitle)',
          [data.title, data.subtitle]
        );
      } else if (section === 'videoReviews') {
        // Delete existing reviews and insert new ones
        await connection.execute('DELETE FROM video_reviews');
        for (let i = 0; i < data.length; i++) {
          const review = data[i];
          await connection.execute(
            'INSERT INTO video_reviews (id, customer_name, location, car_model, cover_image, vk_embed_url, action, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [review.id, review.customerName, review.location, review.carModel, review.coverImage, review.vkEmbedUrl, review.action, i]
          );
        }
      } else if (section === 'faq') {
        // Delete existing FAQ and insert new ones
        await connection.execute('DELETE FROM faq_items');
        for (let i = 0; i < data.length; i++) {
          const faq = data[i];
          await connection.execute(
            'INSERT INTO faq_items (id, question, answer, sort_order) VALUES (?, ?, ?, ?)',
            [faq.id, faq.question, faq.answer, i]
          );
        }
      } else if (section === 'cards') {
        // Update cars settings
        await connection.execute(
          'INSERT INTO cars_settings (id, title, subtitle) VALUES (1, ?, ?) ON DUPLICATE KEY UPDATE title = VALUES(title), subtitle = VALUES(subtitle)',
          [data.title, data.subtitle]
        );

        // Delete existing cars and insert new ones
        await connection.execute('DELETE FROM car_cards');
        for (let i = 0; i < data.cards.length; i++) {
          const car = data.cards[i];
          await connection.execute(
            'INSERT INTO car_cards (id, title, engine, drive, modification, distance, image_url, external_link, price, year, location, is_new, date, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [car.id, car.title, car.engine, car.drive, car.modification, car.distance, car.imageUrl, car.externalLink, car.price, car.year, car.location, car.isNew, car.date, i]
          );
        }
      }

      await connection.commit();
      connection.release();

      return NextResponse.json({ success: true });
    } catch (error) {
      await connection.rollback();
      connection.release();
      throw error;
    }
  } catch (error) {
    console.error('Failed to update admin data:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to update admin data',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}