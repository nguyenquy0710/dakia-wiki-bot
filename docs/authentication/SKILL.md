# Authentication & Security

## Purpose
This document defines authentication patterns, security best practices, and implementation details for DAKIA Wiki Bot.

## Authentication System

### Technology Stack
- **NextAuth.js 4.24+** - Authentication framework
- **Credentials Provider** - Email/password authentication
- **JWT Sessions** - Stateless session management
- **bcrypt** - Password hashing

## NextAuth.js Configuration

### Location
```
lib/auth/auth.config.ts - Main configuration
app/api/auth/[...nextauth]/route.ts - API route handler
types/next-auth.d.ts - TypeScript type augmentation
```

### Configuration Pattern
```typescript
// lib/auth/auth.config.ts
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectDB } from '@/lib/db/mongoose';
import User from '@/models/User';
import { verifyPassword } from '@/lib/auth/password';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Vui lòng nhập email và mật khẩu');
        }

        await connectDB();
        const user = await User.findOne({ 
          email: credentials.email.toLowerCase() 
        });

        if (!user) {
          throw new Error('Email hoặc mật khẩu không đúng');
        }

        const isValid = await verifyPassword(
          credentials.password, 
          user.password
        );

        if (!isValid) {
          throw new Error('Email hoặc mật khẩu không đúng');
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
```

### API Route Handler
```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth/auth.config';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```

## Type Safety

### Module Augmentation
```typescript
// types/next-auth.d.ts
import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    id: string;
    role: 'admin' | 'user';
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: 'admin' | 'user';
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: 'admin' | 'user';
  }
}
```

## Password Security

### Hashing with bcrypt
```typescript
// lib/auth/password.ts
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(
  password: string, 
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}
```

### Password Requirements
```typescript
// lib/constants.ts
export const MIN_PASSWORD_LENGTH = 6;

export function validatePassword(password: string): boolean {
  return password.length >= MIN_PASSWORD_LENGTH;
}
```

**Best Practices:**
- Minimum 6 characters (configurable)
- Hash before storing in database
- Never log or display passwords
- Use bcrypt with 10+ salt rounds
- Compare hashed passwords with bcrypt.compare()

## Route Protection

### Middleware Pattern
```typescript
// middleware.ts
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/auth/login',
  },
});

export const config = {
  matcher: ['/admin/:path*'],
};
```

**Protected Routes:**
- `/admin/*` - All admin pages
- Add more matchers as needed

**Public Routes:**
- `/` - Homepage
- `/auth/login` - Login page
- `/auth/register` - Registration page
- `/wiki/*` - Public wiki pages
- `/api/auth/*` - Auth API routes

## Session Management

### Server Component
```typescript
// Server components can use getServerSession
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth.config';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/auth/login');
  }
  
  return <div>Welcome {session.user.name}</div>;
}
```

### Client Component
```typescript
'use client';

import { useSession, signOut } from 'next-auth/react';

export default function Profile() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  
  if (!session) {
    return <div>Not authenticated</div>;
  }
  
  return (
    <div>
      <p>Email: {session.user.email}</p>
      <p>Role: {session.user.role}</p>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}
```

## Authentication Flow

### Login Flow
```
1. User visits /auth/login
2. User enters email and password
3. Form submits to signIn('credentials', {...})
4. NextAuth calls authorize() function
5. Connect to database
6. Find user by email
7. Verify password with bcrypt
8. Create JWT session
9. Redirect to /admin/dashboard
```

### Registration Flow
```
1. User visits /auth/register
2. User fills registration form
3. Form submits to /api/auth/register
4. Server validates input
5. Check if email already exists
6. Hash password with bcrypt
7. Create user in database
8. Redirect to /auth/login
9. User logs in with new credentials
```

### Logout Flow
```
1. User clicks logout button
2. Call signOut({ redirect: false })
3. Clear session
4. Redirect to /auth/login
```

## Registration API

### Endpoint Pattern
```typescript
// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import User from '@/models/User';
import { hashPassword } from '@/lib/auth/password';
import { validateEmail, MIN_PASSWORD_LENGTH } from '@/lib/constants';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // 1. Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Vui lòng điền đầy đủ thông tin' },
        { status: 400 }
      );
    }

    // 2. Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Email không hợp lệ' },
        { status: 400 }
      );
    }

    // 3. Validate password length
    if (password.length < MIN_PASSWORD_LENGTH) {
      return NextResponse.json(
        { error: `Mật khẩu phải có ít nhất ${MIN_PASSWORD_LENGTH} ký tự` },
        { status: 400 }
      );
    }

    await connectDB();

    // 4. Check if user exists
    const existingUser = await User.findOne({ 
      email: email.toLowerCase() 
    });
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email đã được sử dụng' },
        { status: 400 }
      );
    }

    // 5. Hash password
    const hashedPassword = await hashPassword(password);

    // 6. Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'user', // Default role
    });

    // 7. Return success (without password)
    return NextResponse.json(
      { 
        message: 'Đăng ký thành công',
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi đăng ký' },
      { status: 500 }
    );
  }
}
```

## Security Best Practices

### 1. Password Security
✅ **DO:**
- Hash with bcrypt (10+ salt rounds)
- Validate minimum length
- Never store plain text passwords
- Never log passwords
- Use async/await with bcrypt

❌ **DON'T:**
- Store passwords in plain text
- Use weak hashing algorithms (MD5, SHA1)
- Log password values
- Send passwords in URLs
- Display passwords in UI

### 2. Session Security
✅ **DO:**
- Use JWT with secure secret
- Set NEXTAUTH_SECRET environment variable
- Use httpOnly cookies (automatic with NextAuth)
- Implement session expiration
- Validate session on server side

❌ **DON'T:**
- Store sensitive data in localStorage
- Use predictable session IDs
- Share NEXTAUTH_SECRET
- Skip session validation

### 3. Input Validation
✅ **DO:**
- Validate on both client and server
- Sanitize user input
- Check email format
- Enforce password requirements
- Validate all form fields

❌ **DON'T:**
- Trust client-side validation only
- Skip server-side validation
- Accept any input without checking
- Use only regex for validation

### 4. Error Messages
✅ **DO:**
- Use generic error messages for auth
- "Email hoặc mật khẩu không đúng" (don't reveal which is wrong)
- Log detailed errors server-side
- Return user-friendly Vietnamese messages

❌ **DON'T:**
- Reveal if email exists
- Show detailed error stack traces to users
- Expose system information
- Use English for user-facing errors

### 5. API Security
✅ **DO:**
- Validate all request bodies
- Check authentication in API routes
- Use proper HTTP status codes
- Rate limit authentication endpoints
- Implement CSRF protection (NextAuth includes this)

❌ **DON'T:**
- Skip authentication checks
- Return sensitive data without auth
- Allow unlimited login attempts
- Expose internal errors

## Environment Variables

### Required
```bash
# .env.local
NEXTAUTH_SECRET=your-secret-key-min-32-chars
NEXTAUTH_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/dakia-wiki-bot
```

### Generate Secure Secret
```bash
# Use openssl
openssl rand -base64 32

# Or Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Common Authentication Patterns

### Check if User is Admin
```typescript
'use client';

import { useSession } from 'next-auth/react';

export function AdminOnlyComponent() {
  const { data: session } = useSession();
  
  if (session?.user?.role !== 'admin') {
    return <div>Access denied</div>;
  }
  
  return <div>Admin content</div>;
}
```

### Redirect if Not Authenticated
```typescript
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function ProtectedPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);
  
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  
  return <div>Protected content</div>;
}
```

## AI Agent Guidelines

### When Implementing Authentication:
✅ **DO:**
- Use NextAuth.js with Credentials Provider
- Hash passwords with bcrypt (10+ rounds)
- Validate on both client and server
- Use middleware for route protection
- Follow the patterns in lib/auth/auth.config.ts
- Store user roles in session
- Use TypeScript type augmentation
- Implement proper error handling
- Use Vietnamese for user-facing messages

❌ **DON'T:**
- Create custom authentication systems
- Store passwords in plain text
- Skip validation
- Use localStorage for sessions
- Expose sensitive error details
- Mix authentication methods
- Use weak password requirements
- Forget to connect to database before queries

### Security Checklist:
- [ ] Passwords hashed with bcrypt
- [ ] NEXTAUTH_SECRET set and secure
- [ ] Middleware protecting admin routes
- [ ] Session validation on server
- [ ] Input validation (client + server)
- [ ] Generic error messages for auth
- [ ] No passwords in logs
- [ ] HTTPS in production
- [ ] CORS properly configured
- [ ] Rate limiting considered
