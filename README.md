# AutoVed - Покупка автомобилей из-за границы

Современное веб-приложение для покупки и доставки автомобилей из Китая, Японии, Южной Кореи и Германии в Россию. Построено на Next.js 15 с TypeScript, Tailwind CSS v4 и MySQL базой данных.

## 🚗 О проекте

AutoVed - это платформа, которая помогает с покупкой новых и б/у автомобилей напрямую от надёжных поставщиков из Китая, Японии, Южной Кореи и Германии, и доставкой в любой регион России уже больше пяти лет.

### Основные возможности:
- 🚙 Каталог автомобилей с фильтрацией по странам и брендам
- 📱 Адаптивный дизайн для всех устройств
- 🎥 Видео-обзоры автомобилей
- ❓ FAQ секция с ответами на частые вопросы
- 📞 Контактная форма с отправкой email
- 🔧 Админ-панель для управления контентом
- 📊 SEO оптимизация и структурированные данные

## 🚀 Быстрый старт

### Предварительные требования
- Node.js 18.17 или новее
- pnpm (рекомендуемый менеджер пакетов)
- MySQL база данных
- AWS S3 аккаунт (для загрузки файлов)

### Установка

1. Клонируйте репозиторий:
```bash
git clone <repository-url>
cd autoved
```

2. Установите зависимости:
```bash
pnpm install
```

3. Настройте переменные окружения:
```bash
cp .env.example .env.local
```

Заполните следующие переменные в `.env.local`:
```env
# Database
DB_HOST=your_mysql_host
DB_PORT=3306
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=autoved

# AWS S3
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
AWS_S3_BUCKET=your_s3_bucket_name

# Email (для контактной формы)
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_email_password
```

4. Инициализируйте базу данных:
```bash
# Запустите приложение и перейдите на /api/admin/init
# или выполните SQL скрипт из src/lib/init-db.sql
```

5. Запустите сервер разработки:
```bash
pnpm dev
```

6. Откройте [http://localhost:3000](http://localhost:3000) в браузере

## 📁 Структура проекта

```
src/
├── app/                    # Next.js App Router страницы
│   ├── admin/             # Админ-панель
│   │   └── page.tsx       # Главная страница админки
│   ├── api/               # API маршруты
│   │   ├── admin/         # Админ API
│   │   ├── send-email/    # Отправка email
│   │   └── upload/        # Загрузка файлов
│   ├── politika/          # Страница политики конфиденциальности
│   ├── globals.css        # Глобальные стили с TikTok Sans шрифтом
│   ├── layout.tsx         # Корневой layout с SEO метаданными
│   └── page.tsx           # Главная страница
├── components/            # React компоненты
│   ├── Admin*.tsx         # Компоненты админ-панели
│   ├── BaseModal.tsx      # Базовый модальный компонент
│   ├── Contact*.tsx       # Компоненты контактов
│   ├── HeroSlider.tsx     # Слайдер на главной странице
│   ├── CardsSection.tsx   # Секция с карточками автомобилей
│   ├── CountriesSection.tsx # Секция стран
│   ├── FAQSection.tsx     # Секция FAQ
│   ├── VideoReviewsSection.tsx # Секция видео-обзоров
│   └── [Section].tsx      # Другие секции страницы
├── lib/                   # Утилиты и конфигурации
│   ├── db.ts              # Подключение к MySQL
│   ├── s3.ts              # AWS S3 утилиты
│   └── init-db.sql        # SQL схема базы данных
└── utils/                 # Вспомогательные функции
    ├── adminData.ts       # Управление данными админки
    └── altTextGenerator.ts # Генерация alt текста для изображений
```

## 🔧 Доступные скрипты

- `pnpm dev` - Запуск сервера разработки на порту 3000
- `pnpm build` - Сборка для продакшена
- `pnpm export` - Статический экспорт (для деплоя на статические хостинги)
- `pnpm start` - Запуск продакшен сервера на порту 3000
- `pnpm lint` - Запуск ESLint
- `pnpm lint:fix` - Автоматическое исправление ошибок ESLint
- `pnpm type-check` - Проверка типов TypeScript

## 🌐 API Маршруты

### Админ API: `/api/admin/data`
- **GET** - Получение всех данных для админ-панели
- **POST** - Сохранение изменений в секциях

### Инициализация: `/api/admin/init`
- **POST** - Инициализация базы данных

### Отправка email: `/api/send-email`
- **POST** - Отправка контактной формы

### Загрузка файлов: `/api/upload`
- **POST** - Загрузка изображений в AWS S3

## 🛠 Технологический стек

- **Framework**: [Next.js 15](https://nextjs.org/) с App Router
- **Язык**: [TypeScript](https://www.typescriptlang.org/)
- **Стилизация**: [Tailwind CSS v4](https://tailwindcss.com/)
- **База данных**: [MySQL2](https://github.com/sindresorhus/mysql2) с пулом соединений
- **Хранилище**: [AWS S3](https://aws.amazon.com/s3/) для файлов
- **Анимации**: [GSAP](https://greensock.com/gsap/)
- **Валидация**: [Zod](https://zod.dev/)
- **Шрифт**: TikTok Sans (кастомный)
- **Линтинг**: [ESLint](https://eslint.org/)
- **Менеджер пакетов**: [pnpm](https://pnpm.io/)

## 🎨 Дизайн и UI

- **Шрифт**: TikTok Sans (24pt, 28pt варианты)
- **Цветовая схема**: Зелёный (#10b981) для CTA, синий (#3b82f6) для фокуса
- **Адаптивность**: Mobile-first подход с breakpoints sm/md/lg/xl
- **Анимации**: Плавные переходы с GSAP
- **Доступность**: ARIA атрибуты, поддержка клавиатуры

## 🔍 SEO и метаданные

- Полная SEO оптимизация с метатегами
- Open Graph и Twitter Card поддержка
- Структурированные данные (JSON-LD)
- Sitemap.xml и robots.txt
- Локализация для России (ru_RU)

## 🚀 Деплой

Проект готов к деплою на различных платформах:

### Статический экспорт (рекомендуется)
```bash
pnpm export
# Файлы будут в папке out/
```

### Vercel (рекомендуется для Next.js)
```bash
npx vercel
```

### Docker
```bash
docker build -t autoved .
docker run -p 3000:3000 autoved
```

## 🔐 Админ-панель

Доступ к админ-панели: `/admin`

Возможности:
- Управление слайдами главной страницы
- Редактирование карточек автомобилей
- Управление видео-обзорами
- Редактирование FAQ
- Загрузка изображений
- Просмотр статистики

## 📱 Особенности

- ✅ **Полностью адаптивный дизайн**
- ✅ **SEO оптимизация**
- ✅ **Быстрая загрузка** (оптимизация изображений)
- ✅ **Безопасность** (валидация данных, CORS)
- ✅ **Масштабируемость** (пул соединений БД)
- ✅ **Удобная админка** для управления контентом

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции
3. Внесите изменения
4. Запустите `pnpm lint` и `pnpm type-check`
5. Создайте Pull Request

## 📄 Лицензия

Этот проект лицензирован под MIT License.

## 📞 Контакты

- **Телефон**: +7-916-578-8898
- **VK**: [vk.com/autoved](https://vk.com/autoved)
- **Telegram**: [@Auto_ved](https://t.me/Auto_ved)
- **Сайт**: [auto-ved.ru](https://auto-ved.ru)