# Architecture & Project Structure

## Purpose
This document defines the architecture patterns, project structure, and organizational principles for DAKIA Wiki Bot.

## Technology Stack

### Core Technologies
```
- Next.js 16 (App Router)
- React 19
- TypeScript 5
- MongoDB with Mongoose
- NextAuth.js 4
- Bootstrap 5
```

### Additional Libraries
```
- bcrypt - Password hashing
- unified/remark/rehype - Markdown processing
- zod - Validation (if needed)
```

## Project Structure

```
dakia-wiki-bot/
├── .github/                    # GitHub configuration
│   ├── copilot-instructions.md # Copilot AI instructions
│   └── workflows/              # GitHub Actions
├── app/                        # Next.js App Router
│   ├── (client)/              # Public client routes
│   │   ├── page.tsx           # Homepage
│   │   ├── layout.tsx         # Client layout
│   │   ├── categories/        # Categories page
│   │   └── wiki/              # Wiki articles page
│   ├── admin/                 # Admin routes (protected)
│   │   ├── layout.tsx         # Admin layout (server component)
│   │   ├── components/        # Admin-specific components
│   │   │   └── AdminSidebar.tsx
│   │   ├── dashboard/         # Admin dashboard
│   │   ├── articles/          # Article management
│   │   ├── categories/        # Category management
│   │   └── users/             # User management
│   ├── auth/                  # Authentication pages
│   │   ├── layout.tsx         # Auth layout
│   │   ├── login/             # Login page
│   │   └── register/          # Registration page
│   ├── api/                   # API routes
│   │   ├── auth/              # Authentication APIs
│   │   │   ├── [...nextauth]/ # NextAuth.js handler
│   │   │   └── register/      # User registration
│   │   ├── users/             # User CRUD
│   │   ├── articles/          # Article CRUD
│   │   └── categories/        # Category CRUD
│   ├── layout.tsx             # Root layout
│   ├── providers.tsx          # Client providers (SessionProvider)
│   └── globals.css            # Global styles
├── lib/                       # Utility libraries
│   ├── auth/                  # Authentication utilities
│   │   ├── auth.config.ts     # NextAuth configuration
│   │   └── password.ts        # Password hashing/verification
│   ├── db/                    # Database utilities
│   │   └── mongoose.ts        # MongoDB connection
│   ├── markdown/              # Markdown processing
│   │   └── converter.ts       # Markdown to HTML
│   └── constants.ts           # Shared constants
├── models/                    # Mongoose models
│   ├── User.ts
│   ├── WikiArticle.ts
│   └── WikiCategory.ts
├── types/                     # TypeScript type definitions
│   ├── models.ts              # Model interfaces
│   └── next-auth.d.ts         # NextAuth type augmentation
├── docs/                      # Documentation (SKILL.md files)
│   ├── theme/
│   ├── styling/
│   ├── coding-conventions/
│   ├── architecture/
│   ├── authentication/
│   └── database/
├── middleware.ts              # Next.js middleware (route protection)
└── [config files]             # next.config.ts, tsconfig.json, etc.
```

## Next.js App Router Patterns

### Route Groups
```
(client)/     - Public routes, client-facing pages
admin/        - Protected admin routes
auth/         - Authentication pages
api/          - API endpoints
```

### File Conventions
```
page.tsx      - Route page component
layout.tsx    - Layout wrapper for routes
route.ts      - API route handler
loading.tsx   - Loading UI (optional)
error.tsx     - Error UI (optional)
not-found.tsx - 404 page (optional)
```

### Layout Hierarchy
```
app/layout.tsx (Root)
  ├─ app/(client)/layout.tsx (Client)
  │   └─ app/(client)/page.tsx (Homepage)
  │   └─ app/(client)/wiki/page.tsx
  ├─ app/admin/layout.tsx (Admin)
  │   └─ app/admin/dashboard/page.tsx
  └─ app/auth/layout.tsx (Auth)
      └─ app/auth/login/page.tsx
```

## Server vs Client Components

### Server Components (Default)
**Use when:**
- Fetching data from database
- Rendering static content
- No interactivity needed
- SEO important

**Examples:**
```typescript
// app/admin/layout.tsx
import { FC, ReactNode } from 'react';
import AdminSidebar from './components/AdminSidebar';

const AdminLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="d-flex">
      <AdminSidebar />  {/* Client component */}
      <main>{children}</main>
    </div>
  );
};

export default AdminLayout;
```

### Client Components
**Use when:**
- Need useState, useEffect, or other hooks
- Browser APIs (localStorage, window)
- Event handlers (onClick, onChange)
- Third-party libraries that use hooks

**Mark with:** `'use client'` at top of file

**Examples:**
```typescript
'use client';

import { FC, useState } from 'react';

const Counter: FC = () => {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
};
```

## Authentication Architecture

### Flow
```
1. User visits /admin/*
2. Middleware checks session (middleware.ts)
3. No session → Redirect to /auth/login
4. User submits credentials
5. NextAuth validates (lib/auth/auth.config.ts)
6. Password verified (bcrypt)
7. JWT session created
8. Redirect to /admin/dashboard
```

### Components
```typescript
// Middleware protection
// middleware.ts
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: { signIn: '/auth/login' },
});

export const config = {
  matcher: ['/admin/:path*'],
};
```

```typescript
// NextAuth configuration
// lib/auth/auth.config.ts
export const authOptions: NextAuthOptions = {
  providers: [CredentialsProvider({ /* ... */ })],
  callbacks: { jwt, session },
  pages: { signIn: '/auth/login' },
  session: { strategy: 'jwt' },
};
```

## Database Architecture

### Connection Pattern
```typescript
// lib/db/mongoose.ts
import mongoose from 'mongoose';

let isConnected = false;

export async function connectDB(): Promise<void> {
  if (isConnected) return;
  
  await mongoose.connect(process.env.MONGODB_URI!);
  isConnected = true;
}
```

### Model Pattern
```typescript
// models/User.ts
import mongoose, { Schema, Model } from 'mongoose';
import { IUser } from '@/types/models';

const UserSchema = new Schema<IUser>({ /* ... */ });

// Prevent model recompilation in Next.js hot reload
const User: Model<IUser> = 
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
```

### API Route Database Pattern
```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import User from '@/models/User';

export async function GET(request: NextRequest) {
  try {
    await connectDB();  // Connect first
    const users = await User.find();
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: 'Error' }, { status: 500 });
  }
}
```

## Data Models

### User Model
```typescript
interface IUser {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;  // Hashed with bcrypt
  role: 'admin' | 'user';
  department?: string;
  position?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### WikiArticle Model
```typescript
interface IWikiArticle {
  _id: ObjectId;
  title: string;
  slug: string;
  summary: string;
  content: string;        // Markdown
  htmlContent: string;    // Converted HTML
  categoryId: ObjectId;
  author: string;
  tags: string[];
  version: number;
  views: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### WikiCategory Model
```typescript
interface IWikiCategory {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  color?: string;
  parentId?: ObjectId;  // For hierarchical categories
  order: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## API Route Patterns

### RESTful Conventions
```
GET    /api/users           - List all users
GET    /api/users/[id]      - Get user by ID
POST   /api/users           - Create user
PUT    /api/users/[id]      - Update user
DELETE /api/users/[id]      - Delete user
```

### Response Format
```typescript
// Success response
return NextResponse.json({
  message: 'Success message',
  data: result
}, { status: 200 });

// Error response
return NextResponse.json({
  error: 'Error message in Vietnamese'
}, { status: 400 });
```

## Constants & Configuration

### Shared Constants Pattern
```typescript
// lib/constants.ts
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MIN_PASSWORD_LENGTH = 6;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  ADMIN_DASHBOARD: '/admin/dashboard',
} as const;

export function validateEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}
```

**Usage:**
```typescript
import { ROUTES, validateEmail } from '@/lib/constants';

router.push(ROUTES.LOGIN);
if (!validateEmail(email)) { /* ... */ }
```

## Environment Variables

### Required Variables
```bash
# .env.local
MONGODB_URI=mongodb://localhost:27017/dakia-wiki-bot
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

### Usage
```typescript
const mongoUri = process.env.MONGODB_URI;
const secret = process.env.NEXTAUTH_SECRET;
```

## Markdown Processing

### Pipeline
```typescript
// lib/markdown/converter.ts
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(markdown);
    
  return result.toString();
}
```

## Type Safety

### Module Augmentation
```typescript
// types/next-auth.d.ts
import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    role: 'admin' | 'user';
  }
  
  interface Session {
    user: User & { /* ... */ };
  }
}
```

## Build & Development

### Scripts
```bash
npm run dev    # Development server (port 3000)
npm run build  # Production build
npm run start  # Production server
npm run lint   # ESLint
```

### Build Output
```
Route (app)
├ ○ /                    # Static (SSG)
├ ○ /auth/login          # Static
├ ○ /admin/dashboard     # Static (protected by middleware)
├ ƒ /api/users           # Dynamic (API)
└ ƒ Proxy (Middleware)   # Middleware
```

## AI Agent Architecture Guidelines

### DO:
✅ Keep server components as default
✅ Extract client-only logic to separate components
✅ Use middleware for route protection
✅ Store shared constants in lib/constants.ts
✅ Connect to DB in each API route
✅ Use Mongoose model pattern to prevent recompilation
✅ Follow folder structure conventions
✅ Use NextAuth.js for authentication
✅ Hash passwords with bcrypt
✅ Use unified/remark/rehype for Markdown

### DON'T:
❌ Make entire layouts client components
❌ Create global state management (use server components)
❌ Duplicate constants across files
❌ Create new authentication methods
❌ Store passwords in plain text
❌ Create custom Markdown parsers
❌ Violate Next.js App Router conventions

## Performance Optimization

### Static Generation
- Pre-render public pages at build time
- Use `generateStaticParams` for dynamic routes
- Revalidate with ISR when needed

### Code Splitting
- Automatic with Next.js
- Dynamic imports for large components
- Lazy load admin components

### Database Optimization
- Index frequently queried fields
- Use lean() for read-only queries
- Implement pagination
- Cache frequent queries

## Security Best Practices

1. **Authentication**: NextAuth.js with JWT
2. **Password**: Bcrypt with 10+ salt rounds
3. **Validation**: Server-side validation always
4. **Environment**: Never commit secrets
5. **CORS**: Properly configured
6. **XSS**: Sanitize user input
7. **CSRF**: NextAuth CSRF protection
