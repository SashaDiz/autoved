import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AutoVed - Покупка автомобилей из Китая, Японии, Кореи и Германии",
    template: "%s | AutoVed"
  },
  description: "Помогаем с покупкой новых и б/у автомобилей напрямую от надёжных поставщиков из Китая, Японии, Южной Кореи и Германии, и доставкой в любой регион России уже больше пяти лет.",
  keywords: [
    "автомобили из китая",
    "автомобили из японии", 
    "автомобили из кореи",
    "автомобили из германии",
    "импорт автомобилей",
    "доставка автомобилей",
    "покупка авто",
    "авто из-за границы",
    "AutoVed"
  ],
  authors: [{ name: "AutoVed" }],
  creator: "AutoVed",
  publisher: "AutoVed",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://auto-ved.ru'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://auto-ved.ru',
    siteName: 'AutoVed',
    title: 'AutoVed - Покупка автомобилей из Китая, Японии, Кореи и Германии',
    description: 'Помогаем с покупкой новых и б/у автомобилей напрямую от надёжных поставщиков из Китая, Японии, Южной Кореи и Германии, и доставкой в любой регион России уже больше пяти лет.',
    images: [
      {
        url: '/assets/logo.svg',
        width: 1200,
        height: 630,
        alt: 'AutoVed - Покупка автомобилей из-за границы',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AutoVed - Покупка автомобилей из Китая, Японии, Кореи и Германии',
    description: 'Помогаем с покупкой новых и б/у автомобилей напрямую от надёжных поставщиков из Китая, Японии, Южной Кореи и Германии, и доставкой в любой регион России уже больше пяти лет.',
    images: ['/assets/logo.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Замените на реальный код
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://vk.com" />
        <link rel="dns-prefetch" href="https://vk.com" />
        <link rel="icon" href="/assets/favicon.ico" />
        <link rel="apple-touch-icon" href="/assets/favicon.ico" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "AutoVed",
              "alternateName": "ООО ВЭДТАЙМ",
              "url": "https://auto-ved.ru",
              "logo": "https://auto-ved.ru/assets/logo.svg",
              "description": "Помогаем с покупкой новых и б/у автомобилей напрямую от надёжных поставщиков из Китая, Японии, Южной Кореи и Германии, и доставкой в любой регион России уже больше пяти лет.",
              "foundingDate": "2019",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "RU"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+7-916-578-8898",
                "contactType": "customer service",
                "availableLanguage": "Russian"
              },
              "sameAs": [
                "https://vk.com/autoved",
                "https://t.me/Auto_ved"
              ],
              "serviceArea": {
                "@type": "Country",
                "name": "Russia"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Автомобили из-за границы",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Product",
                      "name": "Автомобили из Китая"
                    }
                  },
                  {
                    "@type": "Offer", 
                    "itemOffered": {
                      "@type": "Product",
                      "name": "Автомобили из Японии"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Product", 
                      "name": "Автомобили из Южной Кореи"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Product",
                      "name": "Автомобили из Германии"
                    }
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body className="font-sans antialiased bg-white" suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
