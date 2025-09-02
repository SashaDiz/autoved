# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AutoVed is a Russian car dealership website built with Next.js 15, focusing on importing vehicles from China, Japan, South Korea, and Germany. The site features an animated hero slider, brand logos carousel, and country-specific car import information.

## Development Commands

- `pnpm dev` - Start development server with Turbopack on port 3000
- `pnpm build` - Build for production with static export
- `pnpm export` - Build and export static files (creates `/out` directory)
- `pnpm start` - Start production server on port 3000
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues automatically  
- `pnpm type-check` - Run TypeScript type checking

## Architecture

### Tech Stack
- **Next.js 15** with App Router and static export configuration
- **TypeScript** with strict mode enabled
- **Tailwind CSS v4** with custom fonts and animations
- **GSAP** for complex animations (hero slider, brand logos)
- **Zod** for validation
- **Custom TikTok Sans font** loaded via font-face declarations

### Project Structure
```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main homepage with all sections
│   └── globals.css         # Global styles, fonts, and custom animations
└── components/             # Reusable React components
    ├── Navigation.tsx      # Header with responsive mobile menu
    ├── HeroSlider.tsx      # Animated hero slider with GSAP
    ├── BrandLogos.tsx      # Infinite scrolling brand carousel
    ├── CountriesSection.tsx # Country cards with import info
    └── [Other components]  # Various page sections
```

### Key Architectural Patterns

**Static Export Configuration**: Project uses `output: 'export'` in next.config.ts for static site generation, with unoptimized images and trailing slashes enabled.

**GSAP Animation System**: Complex animations are centralized in components using GSAP timelines:
- Hero content entrance animations in `HeroSlider.tsx:188-278`
- Infinite brand logo scrolling in `BrandLogos.tsx:40-81`

**Component Architecture**: Each page section is a separate component imported into the main page (`src/app/page.tsx`). Components use TypeScript interfaces and follow a consistent pattern.

**Responsive Design**: Uses custom breakpoint at 748px (`nav-md` utility) and extensive responsive classes throughout.

**Asset Management**: Static assets in `/public/assets/` with organized subdirectories for brands, flags, and other images.

## Development Notes

**Font System**: Uses TikTok Sans font family loaded via CSS font-face declarations with proper font-display: swap for performance.

**Animation Performance**: GSAP animations are properly cleaned up in useEffect cleanup functions to prevent memory leaks.

**Mobile Responsiveness**: Navigation component includes full mobile menu with backdrop blur and proper touch interactions.

**Custom CSS**: Global styles include custom animation keyframes, z-index utilities, and responsive utilities specific to the design requirements.