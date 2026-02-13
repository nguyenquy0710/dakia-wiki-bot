# Lib Folder - Utility Libraries

## Purpose
This folder contains reusable utility functions, configurations, and helper modules used throughout the application.

## Folder Structure

```
lib/
├── auth/          # Authentication utilities (bcrypt, NextAuth config)
├── db/            # Database connection and utilities
├── markdown/      # Markdown processing (unified/remark/rehype)
└── constants.ts   # Shared constants (routes, validation rules)
```

## Coding Patterns

### File Naming
- Use **camelCase** for utility files (e.g., `authHelpers.ts`)
- Use **PascalCase** only for class-based utilities (rare)
- Group related utilities in subfolders

### Export Pattern
```typescript
// Named exports preferred
export function helperFunction() {}
export const CONSTANT_VALUE = 'value';

// Default export for main utility
export default mainUtility;
```

### Function Pattern
```typescript
// Pure functions with clear input/output
export function validateEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

// Async utilities with error handling
export async function processData(input: string): Promise<Result> {
  try {
    const result = await process(input);
    return result;
  } catch (error) {
    console.error('Processing error:', error);
    throw new Error('Failed to process data');
  }
}
```

## Constants Pattern

```typescript
// lib/constants.ts

// Use const for primitives
export const MIN_PASSWORD_LENGTH = 6;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Use 'as const' for objects to make readonly
export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  ADMIN_DASHBOARD: '/admin/dashboard',
} as const;

// Validation helpers
export function validateEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

export function validatePassword(password: string): boolean {
  return password.length >= MIN_PASSWORD_LENGTH;
}
```

## Subfolders

### lib/auth/
Authentication-related utilities:
- `auth.config.ts` - NextAuth.js configuration
- `password.ts` - bcrypt hashing/verification

### lib/db/
Database connection and utilities:
- `mongoose.ts` - MongoDB connection singleton

### lib/markdown/
Markdown processing:
- `converter.ts` - Markdown to HTML conversion with syntax highlighting

## DO's ✅

- Keep utilities pure and testable
- Use TypeScript for all utility files
- Export named functions for better tree-shaking
- Group related utilities in subfolders
- Document complex utilities with JSDoc
- Handle errors appropriately
- Use async/await instead of .then()/.catch()
- Store shared constants in `constants.ts`

## DON'Ts ❌

- Don't put business logic in utilities (keep it in API routes/components)
- Don't use `any` type
- Don't create circular dependencies
- Don't mix concerns (database logic shouldn't be in auth utilities)
- Don't export default for multiple utilities in one file
- Don't forget error handling in async functions

## Usage Examples

```typescript
// Import from utilities
import { validateEmail, ROUTES } from '@/lib/constants';
import { hashPassword } from '@/lib/auth/password';
import { connectDB } from '@/lib/db/mongoose';

// Use in components/API routes
if (!validateEmail(email)) {
  throw new Error('Invalid email');
}

router.push(ROUTES.LOGIN);

const hashed = await hashPassword(password);
await connectDB();
```

## Related Documentation

See `/docs/` folder for comprehensive guidelines:
- `/docs/coding-conventions/SKILL.md` - General coding patterns
- `/docs/authentication/SKILL.md` - Auth utilities
- `/docs/database/SKILL.md` - Database utilities
