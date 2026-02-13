# Coding Conventions

## Purpose
This document defines TypeScript, React, and general coding conventions for DAKIA Wiki Bot to ensure consistency and maintainability.

## General Principles

1. **Write code in English** - Variables, functions, comments
2. **UI text in Vietnamese** - User-facing text, error messages, labels
3. **Use TypeScript** - All files should be `.ts` or `.tsx`
4. **Functional components** - Use React Hooks, no class components
5. **Server components first** - Use Next.js server components unless client-side features needed

## File Naming Conventions

### Components
```
PascalCase for component files
Examples:
  ✅ AdminSidebar.tsx
  ✅ LoginPage.tsx
  ✅ UserProfile.tsx
```

### Utilities & Helpers
```
camelCase for utility files
Examples:
  ✅ authHelpers.ts
  ✅ dateFormatter.ts
  ✅ validateEmail.ts
```

### Constants
```
camelCase for constant files
Examples:
  ✅ constants.ts
  ✅ routes.ts
  ✅ config.ts
```

### API Routes
```
kebab-case for route folders (Next.js convention)
Examples:
  ✅ app/api/auth/[...nextauth]/route.ts
  ✅ app/api/users/route.ts
```

### Pages (Next.js App Router)
```
kebab-case for route folders, page.tsx for files
Examples:
  ✅ app/auth/login/page.tsx
  ✅ app/admin/dashboard/page.tsx
  ✅ app/(client)/wiki/page.tsx
```

## TypeScript Conventions

### Interface Naming
```typescript
// Prefix with 'I' for model interfaces
interface IUser {
  _id: ObjectId;
  name: string;
  email: string;
}

interface IWikiArticle {
  _id: ObjectId;
  title: string;
  content: string;
}

// Props interfaces without prefix
interface ComponentProps {
  title: string;
  onSubmit: () => void;
}

interface AdminLayoutProps {
  children: ReactNode;
}
```

### Type vs Interface
```typescript
// Use interface for object shapes
interface User {
  name: string;
  email: string;
}

// Use type for unions, intersections, or primitives
type Role = 'admin' | 'user';
type Status = 'pending' | 'approved' | 'rejected';

// Use 'as const' for constant objects
export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
} as const;
```

### Function Types
```typescript
// Arrow function type
type ValidationFunction = (value: string) => boolean;

// Function with named parameters
type SubmitHandler = (data: FormData) => Promise<void>;
```

## React Component Structure

### Functional Component Template
```typescript
import { FC } from 'react';

interface ComponentProps {
  // Props definition
  title: string;
  onAction?: () => void;
}

const ComponentName: FC<ComponentProps> = ({ title, onAction }) => {
  // 1. Hooks
  const [state, setState] = useState('');
  const router = useRouter();
  
  // 2. Event handlers
  const handleClick = () => {
    // Handler logic
  };
  
  // 3. Effects (if any)
  useEffect(() => {
    // Effect logic
  }, []);
  
  // 4. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

export default ComponentName;
```

### Client vs Server Components

#### Server Component (Default)
```typescript
// No 'use client' directive
import { FC } from 'react';

const ServerComponent: FC = () => {
  // Can fetch data directly
  // Cannot use hooks like useState, useEffect
  // Cannot use browser APIs
  
  return <div>Server rendered</div>;
};

export default ServerComponent;
```

#### Client Component
```typescript
'use client';  // Required at the top

import { FC, useState } from 'react';

const ClientComponent: FC = () => {
  const [count, setCount] = useState(0);
  
  // Can use hooks
  // Can use browser APIs
  // Interactive features
  
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
};

export default ClientComponent;
```

## Naming Conventions

### Variables
```typescript
// camelCase for variables and functions
const userName = 'John Doe';
const isAuthenticated = true;
const userCount = 100;

// Boolean variables - prefix with 'is', 'has', 'should', 'can'
const isLoading = false;
const hasPermission = true;
const shouldRedirect = false;
const canEdit = true;
```

### Functions
```typescript
// camelCase, verb-based names
function getUserById(id: string) { }
function validateEmail(email: string) { }
function handleSubmit() { }

// Event handlers - prefix with 'handle'
const handleClick = () => { };
const handleChange = (e: ChangeEvent) => { };
const handleSubmit = async (e: FormEvent) => { };
```

### Constants
```typescript
// UPPER_SNAKE_CASE for primitive constants
const MAX_FILE_SIZE = 1024 * 1024;
const API_BASE_URL = 'https://api.example.com';
const MIN_PASSWORD_LENGTH = 6;

// camelCase for object constants with 'as const'
export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
} as const;

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
```

### Component Props
```typescript
// Prefix boolean props with 'is', 'has', 'should'
interface ButtonProps {
  isLoading?: boolean;
  isDisabled?: boolean;
  hasIcon?: boolean;
}

// Event handler props - prefix with 'on'
interface FormProps {
  onSubmit: (data: FormData) => void;
  onChange?: (value: string) => void;
  onError?: (error: Error) => void;
}
```

## API Route Pattern

```typescript
// app/api/[resource]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    // Logic here
    const data = await fetchData();
    
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error message' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    // Validate body
    
    // Process request
    const result = await processData(body);
    
    return NextResponse.json(
      { message: 'Success', data: result },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error message' },
      { status: 500 }
    );
  }
}
```

## Error Handling

### Try-Catch Pattern
```typescript
// API Routes
try {
  await connectDB();
  const result = await operation();
  return NextResponse.json({ result });
} catch (error) {
  console.error('Operation failed:', error);
  return NextResponse.json(
    { error: 'Vietnamese error message for users' },
    { status: 500 }
  );
}

// Client Components
const handleSubmit = async () => {
  setError('');
  setIsLoading(true);
  
  try {
    const response = await fetch('/api/endpoint');
    if (!response.ok) throw new Error('Request failed');
    
    const data = await response.json();
    // Handle success
  } catch (err) {
    setError('Có lỗi xảy ra');
    console.error('Error:', err);
  } finally {
    setIsLoading(false);
  }
};
```

## Async/Await Pattern

```typescript
// ✅ Good - Always use async/await
async function fetchUser(id: string) {
  const user = await User.findById(id);
  return user;
}

// ✅ Good - Error handling
async function saveUser(data: UserData) {
  try {
    const user = await User.create(data);
    return user;
  } catch (error) {
    throw new Error('Failed to save user');
  }
}

// ❌ Bad - Don't use .then()/.catch()
function fetchUserBad(id: string) {
  return User.findById(id)
    .then(user => user)
    .catch(err => console.log(err));
}
```

## Import/Export Conventions

### Import Order
```typescript
// 1. React & Next.js imports
import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// 2. Third-party libraries
import { signIn, signOut } from 'next-auth/react';

// 3. Project imports - use @ alias
import { connectDB } from '@/lib/db/mongoose';
import User from '@/models/User';
import { ROUTES } from '@/lib/constants';

// 4. Types
import type { IUser } from '@/types/models';

// 5. Relative imports (if needed)
import { helper } from './helpers';
```

### Export Patterns
```typescript
// ✅ Default export for components
export default HomePage;

// ✅ Named exports for utilities
export function validateEmail(email: string) { }
export function formatDate(date: Date) { }

// ✅ Named export for constants
export const ROUTES = { } as const;
export const EMAIL_REGEX = /pattern/;
```

## State Management

### useState
```typescript
// ✅ Descriptive state names
const [email, setEmail] = useState('');
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState('');

// ✅ Object state when related
const [formData, setFormData] = useState({
  name: '',
  email: '',
  password: '',
});

// Update object state
setFormData({
  ...formData,
  email: newEmail,
});
```

### useEffect
```typescript
// ✅ Always include dependency array
useEffect(() => {
  fetchData();
}, []);  // Empty array = run once on mount

useEffect(() => {
  fetchUser(userId);
}, [userId]);  // Run when userId changes

// ✅ Cleanup function when needed
useEffect(() => {
  const timer = setTimeout(() => {}, 1000);
  
  return () => clearTimeout(timer);
}, []);
```

## Form Handling

### Controlled Components
```typescript
const [email, setEmail] = useState('');

<input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>
```

### Form Submission
```typescript
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setError('');
  setIsLoading(true);
  
  try {
    const response = await fetch('/api/endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error);
    }
    
    // Success handling
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Unknown error');
  } finally {
    setIsLoading(false);
  }
};
```

## Comments

### When to Comment
```typescript
// ✅ Complex logic explanation
// Calculate total with discount and tax
const total = basePrice * (1 - discount) * (1 + taxRate);

// ✅ Non-obvious decisions
// Use setTimeout instead of setInterval to avoid overlap
setTimeout(() => { }, 1000);

// ✅ TODO comments
// TODO: Add email validation
// FIXME: Handle edge case when user is null

// ❌ Don't comment obvious code
// Set email to empty string
const email = '';  // Bad comment
```

### JSDoc for Public APIs
```typescript
/**
 * Validates email format using regex
 * @param email - Email address to validate
 * @returns true if email is valid, false otherwise
 */
export function validateEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}
```

## AI Agent Guidelines

### DO:
✅ Use TypeScript for all files
✅ Use functional components with hooks
✅ Follow naming conventions (camelCase, PascalCase, UPPER_SNAKE_CASE)
✅ Prefix interfaces with 'I' for models only
✅ Use async/await instead of .then()/.catch()
✅ Include proper error handling with try/catch
✅ Use 'use client' directive only when necessary
✅ Import from '@/' alias for project files
✅ Add types for all function parameters and returns
✅ Use Vietnamese for user-facing text

### DON'T:
❌ Use class components
❌ Use 'any' type unless absolutely necessary
❌ Create new CSS files (use inline styles and Bootstrap)
❌ Use var (use const or let)
❌ Create files without proper TypeScript types
❌ Mix English and Vietnamese in UI text
❌ Use .then()/.catch() chains
❌ Forget to add loading and error states
❌ Create client components unnecessarily

## Code Quality Checklist

Before submitting code:
- [ ] All TypeScript errors resolved
- [ ] Proper types for all functions
- [ ] Error handling in place
- [ ] Loading states for async operations
- [ ] Vietnamese text for UI
- [ ] English for code and comments
- [ ] Follows naming conventions
- [ ] No unused imports or variables
- [ ] Consistent formatting
- [ ] No console.logs in production code (except error logging)
