# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AutoVed is a comprehensive Russian car dealership website built with Next.js 15, specializing in importing vehicles from China, Japan, South Korea, and Germany. The site features a modern single-page application with dynamic content management, animated hero slider, brand logos carousel, and comprehensive admin panel for real-time content updates.

## Development Commands

- `pnpm dev` - Start development server with Turbopack on port 3000
- `pnpm build` - Build for production
- `pnpm export` - Build and export static files
- `pnpm start` - Start production server on port 3000
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues automatically  
- `pnpm type-check` - Run TypeScript type checking

## Architecture

### Tech Stack
- **Next.js 15.5.0** with App Router and API routes for database integration
- **React 19.1.0** with React DOM 19.1.0
- **TypeScript 5** with strict mode enabled
- **Tailwind CSS v4** with PostCSS integration and custom fonts
- **GSAP 3.13.0** for complex animations (hero slider, brand logos)
- **Zod 4.1.3** for validation
- **MySQL2 3.14.4** for database connectivity
- **CORS 2.8.5** for API configuration
- **AWS SDK v3** for S3 file uploads
- **Multer 2.0.2** for file upload handling
- **ESLint 9** with Next.js configuration for code quality
- **Custom TikTok Sans font** loaded via font-face declarations

### Project Structure
```
src/
├── app/
│   ├── api/
│   │   ├── admin/
│   │   │   ├── data/       # API endpoints for admin data CRUD
│   │   │   └── init/       # Database initialization endpoint
│   │   ├── send-email/     # Email sending functionality
│   │   └── upload/         # File upload to S3
│   ├── admin/
│   │   └── page.tsx        # Admin panel interface with authentication
│   ├── politika/
│   │   └── page.tsx        # Privacy policy page
│   ├── layout.tsx          # Root layout with metadata and structured data
│   ├── page.tsx            # Main homepage with all sections
│   ├── globals.css         # Global styles, TikTok Sans fonts, Tailwind CSS
│   └── favicon.ico         # Site favicon
├── lib/
│   ├── db.ts              # MySQL database connection and configuration
│   ├── init-db.sql        # Database schema initialization
│   └── s3.ts              # AWS S3 configuration for file uploads
├── utils/
│   ├── adminData.ts       # Admin data types and API utilities
│   └── altTextGenerator.ts # Utility for generating alt text for car images
└── components/             # Reusable React components
    ├── AdminAuth.tsx       # Admin authentication component
    ├── AdminDashboard.tsx  # Main admin dashboard with section management
    ├── AdminHeroSection.tsx # Hero section admin interface
    ├── AdminPromoSection.tsx # Promo section admin interface
    ├── AdminVideoSection.tsx # Video reviews admin interface
    ├── AdminFAQSection.tsx # FAQ admin interface
    ├── AdminCardsSection.tsx # Car cards admin interface
    ├── AddCarModal.tsx     # Modal for adding new car cards
    ├── AddFAQModal.tsx     # Modal for adding new FAQ items
    ├── AddSlideModal.tsx   # Modal for adding hero slides
    ├── AddVideoModal.tsx   # Modal for adding video reviews
    ├── BaseModal.tsx       # Base modal component
    ├── ContactModal.tsx    # Contact options modal with social links
    ├── ImageUpload.tsx     # Image upload component with S3 integration
    ├── RichTextEditor.tsx  # Rich text editor for content management
    ├── StructuredData.tsx  # Component for JSON-LD structured data
    ├── Navigation.tsx      # Header with responsive mobile menu
    ├── HeroSlider.tsx      # Animated hero slider with GSAP
    ├── BrandLogos.tsx      # Infinite scrolling brand carousel
    ├── CountriesSection.tsx # Country cards with import info
    ├── CardsSection.tsx    # Service cards section
    ├── PromoSection.tsx    # Promotional content section
    ├── WhyChooseUs.tsx     # Benefits and features section
    ├── ProcessSection.tsx  # Import process explanation
    ├── PricingSection.tsx  # Pricing information
    ├── VideoReviewsSection.tsx # Customer video testimonials
    ├── FAQSection.tsx      # Frequently asked questions
    ├── ContactSection.tsx  # Contact information
    ├── ContactFormSection.tsx # Contact form
    ├── Footer.tsx          # Site footer
    └── Card.tsx           # Reusable card component
```

### Key Architectural Patterns

**Database Integration**: Project uses MySQL database for dynamic content management through API routes. Admin panel allows real-time content updates that are instantly visible to all visitors worldwide. Database schema includes tables for hero slides, settings, video reviews, FAQ items, and car cards.

**Admin Panel System**: Comprehensive admin interface with section-based management:
- Hero section management (slides, titles, subtitles)
- Car catalog management with image uploads
- Promo section content management
- Video reviews management with VK embed integration
- FAQ management with rich text editing
- Real-time save status indicators and change tracking

**GSAP Animation System**: Complex animations are centralized in components using GSAP timelines for smooth, performant animations throughout the site.

**Component Architecture**: Each page section is a separate component imported into the main page (`src/app/page.tsx`). All components are properly organized and follow consistent TypeScript patterns.

**Single Page Architecture**: The entire site is built as a single-page application with all sections rendered on the homepage, including navigation, hero, brands, services, countries, process, pricing, testimonials, FAQ, contact, and footer sections.

**Responsive Design**: Extensive use of Tailwind CSS responsive utilities with mobile-first approach. Includes responsive navigation, layouts, and typography.

**SEO Optimization**: 
- Comprehensive metadata configuration
- JSON-LD structured data for organization, website, and services
- Privacy policy page with proper meta tags
- Sitemap and robots.txt generation

**Asset Management**: Static assets in `/public/assets/` with organized subdirectories:
- `/brands/` - Car brand logos organized by manufacturer
- `/flags/` - Country flags (CN, DE, JP, KR) for import regions  
- Various car images and UI icons

**File Upload System**: AWS S3 integration for image uploads with presigned URLs and proper error handling.

## Database Schema

The project uses MySQL with the following main tables:

- **hero_slides** - Hero slider content with background images and car information
- **hero_settings** - Hero section titles and subtitles
- **promo_settings** - Promotional section content
- **video_reviews** - Customer video testimonials with VK embed URLs
- **faq_items** - Frequently asked questions and answers
- **car_cards** - Car catalog with detailed specifications and images
- **cars_settings** - Car catalog section titles and subtitles

## Development Notes

**Font System**: Uses TikTok Sans font family with multiple weights (Regular 400, Medium 500, SemiBold 600, Bold 700) loaded via CSS font-face declarations in `globals.css`. Proper font-display: swap ensures optimal loading performance.

**Styling Architecture**: 
- Tailwind CSS v4 with PostCSS integration
- Custom CSS variables for theming (`--background`, `--foreground`)
- TikTok Sans set as the default font family throughout the application
- Global styles and font definitions in `src/app/globals.css`

**TypeScript Configuration**: Strict mode enabled with path mapping (`@/*` -> `./src/*`) for clean imports. Target ES2017 with Next.js plugin integration.

**Build & Deployment**: Server-side rendering with API routes for database connectivity. Environment variables securely manage database credentials and AWS S3 configuration.

**Code Quality**: ESLint 9 configuration extends Next.js core web vitals and TypeScript rules. Ignores build directories and generated files.

**Package Management**: Uses pnpm for dependency management with lockfile for consistent installations across environments.

**Accessibility**: Components include proper ARIA labels, keyboard navigation support, and semantic HTML structure.

**Contact Integration**: Multiple contact methods including phone, WhatsApp, Telegram, and Instagram with proper modal implementation and keyboard navigation.

**Content Management**: Rich text editor integration for FAQ answers and other content areas with proper sanitization.