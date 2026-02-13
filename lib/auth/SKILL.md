# Lib/Auth Folder - Authentication Utilities

## Purpose
Authentication-related utilities for password hashing, verification, and NextAuth.js configuration.

## Files

### password.ts - Password Security
```typescript
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

### auth.config.ts - NextAuth Configuration
```typescript
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectDB } from '@/lib/db/mongoose';
import User from '@/models/User';
import { verifyPassword } from './password';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Vui lòng nhập email và mật khẩu');
        }

        await connectDB();
        const user = await User.findOne({ email: credentials.email.toLowerCase() });

        if (!user || !(await verifyPassword(credentials.password, user.password))) {
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
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
```

## Security Rules

### Password Hashing
- **Always** use bcrypt with 10+ salt rounds
- **Never** store plain text passwords
- **Always** use async/await (not sync methods)

### Error Messages
- Use generic messages: "Email hoặc mật khẩu không đúng"
- Don't reveal if email exists
- Don't expose technical details

## DO's ✅

- Hash passwords before storing
- Verify with bcrypt.compare()
- Use 10+ salt rounds
- Return generic error messages
- Connect to DB before queries
- Use async/await
- Type augment NextAuth (types/next-auth.d.ts)

## DON'Ts ❌

- Don't use plain text passwords
- Don't use sync bcrypt methods
- Don't reveal if user exists
- Don't expose error details
- Don't skip validation
- Don't hardcode secrets
