# Types Folder - TypeScript Type Definitions

## Purpose
This folder contains TypeScript type definitions, interfaces, and type augmentations used throughout the application.

## Folder Structure

```
types/
├── models.ts        # Database model interfaces (IUser, IWikiArticle, etc.)
└── next-auth.d.ts   # NextAuth.js type augmentation
```

## Naming Conventions

### Model Interfaces
Prefix with `I` for database model interfaces:

```typescript
// types/models.ts
import { ObjectId } from 'mongoose';

export interface IUser {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  department?: string;  // Optional field
  position?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IWikiArticle {
  _id: ObjectId;
  title: string;
  slug: string;
  content: string;
  // ... other fields
}
```

### Component Props
No prefix for component props interfaces:

```typescript
// In component files
interface ComponentProps {
  title: string;
  onSubmit: () => void;
}

interface AdminLayoutProps {
  children: ReactNode;
}
```

## Type vs Interface

### Use Interface
For object shapes, especially models:

```typescript
export interface IUser {
  name: string;
  email: string;
}

export interface ComponentProps {
  title: string;
}
```

### Use Type
For unions, primitives, or complex types:

```typescript
export type Role = 'admin' | 'user';
export type Status = 'pending' | 'approved' | 'rejected';
export type ID = string | number;

// Complex type
export type ApiResponse<T> = {
  data: T;
  error?: string;
};
```

## Module Augmentation

### NextAuth Type Augmentation
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

## Model Interface Pattern

### Complete Example
```typescript
// types/models.ts
import { ObjectId } from 'mongoose';

export interface IUser {
  // MongoDB fields
  _id: ObjectId;
  
  // Required fields
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  
  // Optional fields
  department?: string;
  position?: string;
  
  // Timestamps (added by Mongoose)
  createdAt: Date;
  updatedAt: Date;
}

export interface IWikiArticle {
  _id: ObjectId;
  title: string;
  slug: string;
  summary: string;
  content: string;
  htmlContent: string;
  
  // References
  categoryId: ObjectId;
  
  // Metadata
  author: string;
  tags: string[];
  version: number;
  views: number;
  likes: number;
  
  // Status
  isPublished: boolean;
  isFeatured: boolean;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

export interface IWikiCategory {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  
  // Optional fields
  icon?: string;
  color?: string;
  parentId?: ObjectId;  // For hierarchical categories
  
  // Metadata
  order: number;
  isPublished: boolean;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}
```

## Utility Types

```typescript
// Common utility types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type ID = string | number;

// API response type
export type ApiResponse<T = any> = {
  data?: T;
  error?: string;
  message?: string;
};

// Pagination type
export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
};
```

## DO's ✅

- Use `interface` for object shapes
- Use `type` for unions and primitives
- Prefix model interfaces with `I` (IUser, IWikiArticle)
- No prefix for component props
- Include `_id: ObjectId` for all model interfaces
- Include `createdAt` and `updatedAt` for timestamped models
- Use optional `?` for optional fields
- Use union types for enums (`'admin' | 'user'`)
- Export all types for reuse
- Group related types together

## DON'Ts ❌

- Don't use `any` type (use `unknown` if necessary)
- Don't duplicate type definitions
- Don't forget to export types
- Don't mix naming conventions
- Don't create overly complex generic types
- Don't use `interface` for primitive unions

## Import and Usage

```typescript
// In Mongoose models
import { IUser } from '@/types/models';
const UserSchema = new Schema<IUser>({ /* ... */ });

// In components
import type { IUser, IWikiArticle } from '@/types/models';

const user: IUser = await User.findById(id);
const articles: IWikiArticle[] = await Article.find();

// In API routes
import type { ApiResponse } from '@/types';

return NextResponse.json<ApiResponse<IUser>>({
  data: user,
  message: 'Success'
});
```

## Related Documentation

See `/docs/` folder for comprehensive guidelines:
- `/docs/coding-conventions/SKILL.md` - TypeScript patterns
- `/docs/database/SKILL.md` - Model interfaces
- `/docs/architecture/SKILL.md` - Type architecture
