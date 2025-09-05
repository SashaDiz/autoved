# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AutoVed is a Russian car dealership website built with Next.js 15, focusing on importing vehicles from China, Japan, South Korea, and Germany. The site features an animated hero slider, brand logos carousel, and country-specific car import information.

## Development Commands

- `pnpm dev` - Start development server with Turbopack on port 3000
- `pnpm build` - Build for production
- `pnpm start` - Start production server on port 3000
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues automatically  
- `pnpm type-check` - Run TypeScript type checking

Note: The project now includes API routes for database integration and admin panel functionality.

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
- **ESLint 9** with Next.js configuration for code quality
- **Custom TikTok Sans font** loaded via font-face declarations

### Project Structure
```
src/
├── app/
│   ├── api/
│   │   └── admin/
│   │       ├── data/       # API endpoints for admin data CRUD
│   │       └── init/       # Database initialization endpoint
│   ├── admin/
│   │   └── page.tsx        # Admin panel interface
│   ├── layout.tsx          # Root layout with metadata and TikTok Sans font
│   ├── page.tsx            # Main homepage with all sections
│   ├── globals.css         # Global styles, TikTok Sans fonts, Tailwind CSS
│   └── favicon.ico         # Site favicon
├── lib/
│   └── db.ts              # Database connection and configuration
├── utils/
│   └── adminData.ts       # Admin data types and API utilities
└── components/             # Reusable React components
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

**Database Integration**: Project uses MySQL database for dynamic content management through API routes. Admin panel allows real-time content updates that are instantly visible to all visitors worldwide.

**GSAP Animation System**: Complex animations are centralized in components using GSAP timelines for smooth, performant animations throughout the site.

**Component Architecture**: Each page section is a separate component imported into the main page (`src/app/page.tsx`). All 14 components are properly organized and follow consistent TypeScript patterns.

**Single Page Architecture**: The entire site is built as a single-page application with all sections rendered on the homepage, including navigation, hero, brands, services, countries, process, pricing, testimonials, FAQ, contact, and footer sections.

**Responsive Design**: Extensive use of Tailwind CSS responsive utilities with mobile-first approach. Includes responsive navigation, layouts, and typography.

**Asset Management**: Static assets in `/public/assets/` with organized subdirectories:
- `/brands/` - Car brand logos organized by manufacturer
- `/flags/` - Country flags (CN, DE, JP, KR) for import regions  
- Various car images and UI icons

## Development Notes

**Font System**: Uses TikTok Sans font family with multiple weights (Regular 400, Medium 500, SemiBold 600, Bold 700) loaded via CSS font-face declarations in `globals.css`. Proper font-display: swap ensures optimal loading performance.

**Styling Architecture**: 
- Tailwind CSS v4 with PostCSS integration
- Custom CSS variables for theming (`--background`, `--foreground`)
- TikTok Sans set as the default font family throughout the application
- Global styles and font definitions in `src/app/globals.css`

**TypeScript Configuration**: Strict mode enabled with path mapping (`@/*` -> `./src/*`) for clean imports. Target ES2017 with Next.js plugin integration.

**Build & Deployment**: Server-side rendering with API routes for database connectivity. Environment variables securely manage database credentials.

**Code Quality**: ESLint 9 configuration extends Next.js core web vitals and TypeScript rules. Ignores build directories and generated files.

**Package Management**: Uses pnpm for dependency management with lockfile for consistent installations across environments.