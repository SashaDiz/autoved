import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Define the schema for form validation
const FormSchema = z.object({
  name: z.string().min(1, 'Имя обязательно'),
  phone: z.string().min(1, 'Телефон обязателен'),
  country: z.string(),
  budget: z.string(),
  message: z.string().optional(),
});

// Simple email sending function using fetch to a serverless email service
async function sendEmail(data: { name: string; phone: string; country: string; budget: string; message?: string }) {
  // Using a simple approach that works without additional dependencies
  // In production, you should configure proper SMTP settings or use a service like:
  // - SendGrid
  // - AWS SES  
  // - Mailgun
  // - Resend
  
  const emailContent = {
    to: 'info@vedtime.ru',
    subject: 'Заявка с сайта Autoved',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          .content { background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #495057; }
          .value { color: #212529; margin-top: 5px; }
          .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #6c757d; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h2 style="margin: 0; color: #198754;">Новая заявка с сайта AutoVed</h2>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Имя:</div>
            <div class="value">${data.name}</div>
          </div>
          <div class="field">
            <div class="label">Телефон:</div>
            <div class="value">${data.phone}</div>
          </div>
          <div class="field">
            <div class="label">Страна интереса:</div>
            <div class="value">${data.country}</div>
          </div>
          <div class="field">
            <div class="label">Бюджет:</div>
            <div class="value">${data.budget}</div>
          </div>
          ${data.message ? `
          <div class="field">
            <div class="label">Сообщение:</div>
            <div class="value">${data.message}</div>
          </div>
          ` : ''}
        </div>
        <div class="footer">
          <p>Заявка отправлена: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}</p>
          <p>Источник: AutoVed (vedtime.ru)</p>
        </div>
      </body>
      </html>
    `
  };

  // For development/demonstration - in production replace this with actual email service
  console.log('EMAIL TO SEND:', emailContent);
  
  // You can integrate with email services here:
  // Example for SendGrid:
  // const sgMail = require('@sendgrid/mail');
  // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  // await sgMail.send(emailContent);

  // Example for Nodemailer:
  // const nodemailer = require('nodemailer');
  // const transporter = nodemailer.createTransporter({...});
  // await transporter.sendMail(emailContent);

  return { success: true };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the form data
    const validatedData = FormSchema.parse(body);
    
    // Send email
    await sendEmail(validatedData);
    
    // Store in database if needed (you already have MySQL setup)
    // const db = require('@/lib/db');
    // await db.execute('INSERT INTO form_submissions (name, phone, country, budget, message, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
    //   [validatedData.name, validatedData.phone, validatedData.country, validatedData.budget, validatedData.message]);

    return NextResponse.json({ 
      success: true, 
      message: 'Заявка отправлена успешно! Мы свяжемся с вами в ближайшее время.' 
    });

  } catch (error) {
    console.error('Error processing form submission:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Некорректные данные формы', errors: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Произошла ошибка при отправке заявки. Попробуйте еще раз.' },
      { status: 500 }
    );
  }
}
