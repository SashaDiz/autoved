# AutoVed - Next.js Serverless Project

A modern Next.js application with TypeScript, Tailwind CSS, and serverless API functions.

## 🚀 Quick Start

### Prerequisites
- Node.js 18.17 or later
- pnpm (preferred package manager)

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Start the development server:
```bash
pnpm dev
```

3. Open [http://localhost:8080](http://localhost:8080) in your browser

### Production

1. Build the project:
```bash
pnpm build
```

2. Start the production server:
```bash
pnpm start
```

The production server will run on [http://localhost:9000](http://localhost:9000)

## 📁 Project Structure

```
src/
├── app/
│   ├── api/              # Serverless API routes
│   │   └── hello/        # Example API endpoint
│   │       └── route.ts  # GET, POST, PUT, DELETE handlers
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # Reusable React components (create as needed)
└── lib/                  # Utility functions (create as needed)
```

## 🔧 Available Scripts

- `pnpm dev` - Start development server on port 8080
- `pnpm build` - Build for production
- `pnpm start` - Start production server on port 9000
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues automatically
- `pnpm type-check` - Run TypeScript type checking

## 🌐 API Routes (Serverless Functions)

### Example API: `/api/hello`

All HTTP methods are supported with proper TypeScript typing and validation:

#### GET Request
```bash
curl "http://localhost:8080/api/hello?name=John"
```

#### POST Request
```bash
curl -X POST "http://localhost:8080/api/hello" \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "message": "Hello from POST!"}'
```

#### PUT Request
```bash
curl -X PUT "http://localhost:8080/api/hello" \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "message": "Updated message"}'
```

#### DELETE Request
```bash
curl -X DELETE "http://localhost:8080/api/hello?name=John"
```

## 🛠 Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Validation**: [Zod](https://zod.dev/)
- **Linting**: [ESLint](https://eslint.org/)
- **Package Manager**: [pnpm](https://pnpm.io/)

## 📝 Creating New API Routes

1. Create a new directory in `src/app/api/`
2. Add a `route.ts` file with your handlers:

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'Hello from GET!' });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ message: 'Data received', data: body });
}
```

## 🔍 Key Features

- ✅ **Serverless Functions**: Each API route is automatically deployed as a serverless function
- ✅ **TypeScript**: Full type safety across the application
- ✅ **Data Validation**: Request/response validation with Zod
- ✅ **Modern UI**: Responsive design with Tailwind CSS
- ✅ **Development Experience**: Hot reload, ESLint, and type checking
- ✅ **Production Ready**: Optimized builds with Next.js

## 🚀 Deployment

This project is ready to be deployed on platforms like:

- [Vercel](https://vercel.com/) (recommended for Next.js)
- [Netlify](https://www.netlify.com/)
- [AWS](https://aws.amazon.com/)
- [Google Cloud](https://cloud.google.com/)

For Vercel deployment:
```bash
npx vercel
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `pnpm lint` and `pnpm type-check`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.