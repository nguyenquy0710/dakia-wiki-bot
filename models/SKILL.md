# Models Folder - Mongoose Models

## Purpose
This folder contains Mongoose schema definitions and model exports for MongoDB collections.

## Folder Structure

```
models/
├── User.ts           # User model (authentication, profiles)
├── WikiArticle.ts    # Wiki article model
└── WikiCategory.ts   # Wiki category model
```

## Critical Pattern - Prevent Model Recompilation

**Always use this pattern to prevent Next.js hot reload errors:**

```typescript
import mongoose, { Schema, Model } from 'mongoose';
import { IUser } from '@/types/models';

const UserSchema = new Schema<IUser>({ /* ... */ });

// ⚠️ CRITICAL: Check if model exists before creating
const User: Model<IUser> = 
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
```

## Schema Definition Pattern

```typescript
import mongoose, { Schema, Model } from 'mongoose';
import { IUser } from '@/types/models';

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  {
    timestamps: true,  // Adds createdAt and updatedAt
  }
);

// Create indexes for frequently queried fields
UserSchema.index({ email: 1 });

// Prevent model recompilation
const User: Model<IUser> = 
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
```

## Type Safety

### Model Interface
Define interface in `/types/models.ts`:

```typescript
// types/models.ts
import { ObjectId } from 'mongoose';

export interface IUser {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
}
```

### Import and Use
```typescript
// models/User.ts
import { IUser } from '@/types/models';

const UserSchema = new Schema<IUser>({ /* ... */ });
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
```

## Schema Options

### Timestamps
```typescript
{
  timestamps: true  // Automatically adds createdAt and updatedAt
}
```

### Indexes
```typescript
// Simple index
UserSchema.index({ email: 1 });

// Compound index
ArticleSchema.index({ categoryId: 1, isPublished: 1 });

// Unique index
UserSchema.index({ email: 1 }, { unique: true });

// Text index for search
ArticleSchema.index({ title: 'text', content: 'text' });
```

## Field Types

```typescript
{
  // String
  name: { type: String, required: true, trim: true },
  
  // Number
  age: { type: Number, min: 0, max: 150 },
  
  // Boolean
  isActive: { type: Boolean, default: true },
  
  // Date
  publishedAt: { type: Date },
  
  // ObjectId (reference)
  categoryId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Category',
    required: true 
  },
  
  // Array of strings
  tags: [{ type: String }],
  
  // Enum
  role: { 
    type: String, 
    enum: ['admin', 'user'], 
    default: 'user' 
  },
}
```

## DO's ✅

- Always use the model recompilation prevention pattern
- Define interfaces in `/types/models.ts` with `I` prefix
- Use TypeScript generics: `Schema<IUser>`, `Model<IUser>`
- Add indexes for frequently queried fields
- Use timestamps option for automatic createdAt/updatedAt
- Validate data in schema (required, min, max, enum)
- Use references (ObjectId) for relationships
- Document complex schemas with comments

## DON'Ts ❌

- Don't forget the `mongoose.models.X ||` pattern (causes hot reload errors)
- Don't skip TypeScript types
- Don't over-index (too many indexes slow down writes)
- Don't store sensitive data unencrypted
- Don't use `any` type
- Don't create duplicate model definitions

## Usage in API Routes

```typescript
// app/api/users/route.ts
import { connectDB } from '@/lib/db/mongoose';
import User from '@/models/User';

export async function GET() {
  try {
    await connectDB();  // Always connect first
    
    const users = await User.find({ role: 'user' })
      .select('name email role')
      .limit(10);
      
    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Error' }, { status: 500 });
  }
}
```

## Related Documentation

See `/docs/` folder for comprehensive guidelines:
- `/docs/database/SKILL.md` - Complete database patterns
- `/docs/coding-conventions/SKILL.md` - TypeScript conventions
- `/docs/architecture/SKILL.md` - Model architecture
