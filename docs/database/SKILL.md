# Database Patterns & Conventions

## Purpose
This document defines MongoDB and Mongoose patterns, best practices, and conventions for DAKIA Wiki Bot.

## Technology Stack

- **MongoDB** - NoSQL database
- **Mongoose 9+** - ODM (Object Document Mapper)
- **Connection**: Single connection with connection pooling

## Database Connection

### Connection Pattern
```typescript
// lib/db/mongoose.ts
import mongoose from 'mongoose';

let isConnected = false;

export async function connectDB(): Promise<void> {
  if (isConnected) {
    return;
  }

  try {
    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    await mongoose.connect(mongoUri);
    isConnected = true;
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to database');
  }
}

export async function disconnectDB(): Promise<void> {
  if (!isConnected) {
    return;
  }

  try {
    await mongoose.disconnect();
    isConnected = false;
    console.log('MongoDB disconnected successfully');
  } catch (error) {
    console.error('MongoDB disconnection error:', error);
    throw new Error('Failed to disconnect from database');
  }
}
```

### Usage in API Routes
```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import User from '@/models/User';

export async function GET(request: NextRequest) {
  try {
    // Always connect before database operations
    await connectDB();
    
    const users = await User.find();
    
    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi lấy danh sách người dùng' },
      { status: 500 }
    );
  }
}
```

## Mongoose Model Pattern

### Prevent Model Recompilation
**Critical for Next.js hot reload:**

```typescript
// models/User.ts
import mongoose, { Schema, Model } from 'mongoose';
import { IUser } from '@/types/models';

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
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
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Create indexes
UserSchema.index({ email: 1 });

// ⚠️ IMPORTANT: Prevent model recompilation
const User: Model<IUser> = 
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
```

### Why This Pattern?
```typescript
// ❌ BAD - Will cause errors in Next.js hot reload
const User = mongoose.model<IUser>('User', UserSchema);

// ✅ GOOD - Checks if model exists first
const User: Model<IUser> = 
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
```

## Model Type Definitions

### Interface Pattern
```typescript
// types/models.ts
import { ObjectId } from 'mongoose';

// Prefix with 'I' for model interfaces
export interface IUser {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  department?: string;
  position?: string;
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
  categoryId: ObjectId;
  author: string;
  tags: string[];
  version: number;
  views: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IWikiCategory {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  color?: string;
  parentId?: ObjectId;
  order: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## Schema Definitions

### Field Types
```typescript
const schema = new Schema({
  // String
  name: { 
    type: String, 
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100,
  },
  
  // String with enum
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  
  // Number
  age: {
    type: Number,
    min: 0,
    max: 150,
  },
  
  // Boolean
  isActive: {
    type: Boolean,
    default: true,
  },
  
  // Date
  publishedAt: {
    type: Date,
  },
  
  // ObjectId (reference)
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  
  // Array of strings
  tags: [{
    type: String,
  }],
  
  // Array of objects
  versions: [{
    version: Number,
    content: String,
    updatedAt: Date,
  }],
  
  // Mixed/Any
  metadata: {
    type: Schema.Types.Mixed,
  },
});
```

### Schema Options
```typescript
const schema = new Schema(
  {
    // Fields
  },
  {
    timestamps: true,        // Add createdAt, updatedAt
    collection: 'users',     // Collection name (optional)
    versionKey: false,       // Disable __v (optional)
  }
);
```

## Indexes

### Creating Indexes
```typescript
// Simple index
UserSchema.index({ email: 1 });

// Compound index
ArticleSchema.index({ categoryId: 1, isPublished: 1 });

// Text index for search
ArticleSchema.index({ title: 'text', content: 'text' });

// Unique index (also in field definition)
UserSchema.index({ email: 1 }, { unique: true });
```

### When to Create Indexes
✅ **Index these fields:**
- Frequently queried fields
- Fields used in sort operations
- Fields used in unique constraints
- Foreign keys (references)

❌ **Don't over-index:**
- Rarely queried fields
- Fields with low cardinality
- Too many indexes slow down writes

## CRUD Operations

### Create (Insert)
```typescript
// Single document
const user = await User.create({
  name: 'John Doe',
  email: 'john@example.com',
  password: hashedPassword,
  role: 'user',
});

// Multiple documents
const users = await User.insertMany([
  { name: 'User 1', email: 'user1@example.com' },
  { name: 'User 2', email: 'user2@example.com' },
]);
```

### Read (Find)
```typescript
// Find all
const users = await User.find();

// Find with filter
const admins = await User.find({ role: 'admin' });

// Find one
const user = await User.findOne({ email: 'john@example.com' });

// Find by ID
const user = await User.findById(userId);

// Find with select (projection)
const users = await User.find().select('name email -_id');

// Find with sort
const users = await User.find().sort({ createdAt: -1 });

// Find with limit and skip (pagination)
const users = await User.find()
  .skip(page * limit)
  .limit(limit);

// Find with populate (join)
const articles = await Article.find()
  .populate('categoryId', 'name slug');
```

### Update
```typescript
// Update one
const result = await User.updateOne(
  { email: 'john@example.com' },
  { $set: { name: 'John Updated' } }
);

// Update many
const result = await User.updateMany(
  { role: 'user' },
  { $set: { isActive: true } }
);

// Find and update
const user = await User.findOneAndUpdate(
  { email: 'john@example.com' },
  { $set: { name: 'John Updated' } },
  { new: true } // Return updated document
);

// Find by ID and update
const user = await User.findByIdAndUpdate(
  userId,
  { $set: { name: 'John Updated' } },
  { new: true }
);
```

### Delete
```typescript
// Delete one
await User.deleteOne({ email: 'john@example.com' });

// Delete many
await User.deleteMany({ isActive: false });

// Find and delete
const user = await User.findOneAndDelete({ 
  email: 'john@example.com' 
});

// Find by ID and delete
const user = await User.findByIdAndDelete(userId);
```

## Query Operators

### Comparison
```typescript
// Equal
{ age: 25 }

// Not equal
{ age: { $ne: 25 } }

// Greater than
{ age: { $gt: 25 } }

// Greater than or equal
{ age: { $gte: 25 } }

// Less than
{ age: { $lt: 25 } }

// Less than or equal
{ age: { $lte: 25 } }

// In array
{ role: { $in: ['admin', 'editor'] } }

// Not in array
{ role: { $nin: ['guest'] } }
```

### Logical
```typescript
// AND (implicit)
{ role: 'admin', isActive: true }

// OR
{ $or: [{ role: 'admin' }, { role: 'editor' }] }

// NOT
{ age: { $not: { $lt: 18 } } }

// NOR
{ $nor: [{ role: 'admin' }, { isActive: false }] }
```

### Element
```typescript
// Field exists
{ department: { $exists: true } }

// Field type
{ age: { $type: 'number' } }
```

### Array
```typescript
// Array contains value
{ tags: 'javascript' }

// Array contains all values
{ tags: { $all: ['javascript', 'typescript'] } }

// Array size
{ tags: { $size: 3 } }
```

### Text Search
```typescript
// Requires text index
const results = await Article.find({ 
  $text: { $search: 'mongodb tutorial' } 
});
```

## Validation

### Schema Validation
```typescript
const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(v: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Invalid email format'
    }
  },
  age: {
    type: Number,
    min: [0, 'Age must be positive'],
    max: [150, 'Age must be realistic'],
  },
});
```

### Custom Validation
```typescript
UserSchema.path('password').validate(function(v: string) {
  return v.length >= 6;
}, 'Password must be at least 6 characters');
```

## Middleware (Hooks)

### Pre Hooks
```typescript
// Before save
UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    // Hash password before saving
    this.password = await hashPassword(this.password);
  }
  next();
});

// Before remove
UserSchema.pre('remove', async function(next) {
  // Cleanup related documents
  await Article.deleteMany({ authorId: this._id });
  next();
});
```

### Post Hooks
```typescript
// After save
UserSchema.post('save', function(doc) {
  console.log('User saved:', doc._id);
});

// After find
ArticleSchema.post('find', function(docs) {
  console.log(`Found ${docs.length} articles`);
});
```

## Virtuals

```typescript
// Virtual property (not stored in DB)
UserSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual populate
ArticleSchema.virtual('category', {
  ref: 'Category',
  localField: 'categoryId',
  foreignField: '_id',
  justOne: true,
});

// Include virtuals in JSON
const user = await User.findById(userId);
console.log(user.toJSON({ virtuals: true }));
```

## Population (Joins)

```typescript
// Basic populate
const articles = await Article.find()
  .populate('categoryId');

// Populate with select
const articles = await Article.find()
  .populate('categoryId', 'name slug');

// Multiple populates
const articles = await Article.find()
  .populate('categoryId')
  .populate('authorId', 'name email');

// Nested populate
const articles = await Article.find()
  .populate({
    path: 'categoryId',
    populate: {
      path: 'parentId',
      select: 'name'
    }
  });
```

## Aggregation

```typescript
// Count by category
const stats = await Article.aggregate([
  { $group: {
    _id: '$categoryId',
    count: { $sum: 1 },
    avgViews: { $avg: '$views' }
  }},
  { $sort: { count: -1 } },
  { $limit: 10 }
]);

// Lookup (join)
const articles = await Article.aggregate([
  {
    $lookup: {
      from: 'categories',
      localField: 'categoryId',
      foreignField: '_id',
      as: 'category'
    }
  },
  { $unwind: '$category' },
  { $project: {
    title: 1,
    'category.name': 1,
    views: 1
  }}
]);
```

## Pagination Pattern

```typescript
// API route with pagination
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    const [articles, total] = await Promise.all([
      Article.find()
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Article.countDocuments()
    ]);
    
    return NextResponse.json({
      articles,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Error' }, { status: 500 });
  }
}
```

## Error Handling

```typescript
try {
  await connectDB();
  const user = await User.create({ email, password });
  return NextResponse.json({ user });
} catch (error) {
  // Duplicate key error
  if (error.code === 11000) {
    return NextResponse.json(
      { error: 'Email đã được sử dụng' },
      { status: 400 }
    );
  }
  
  // Validation error
  if (error.name === 'ValidationError') {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
  
  // Generic error
  console.error('Database error:', error);
  return NextResponse.json(
    { error: 'Có lỗi xảy ra' },
    { status: 500 }
  );
}
```

## Best Practices

### DO:
✅ Use `connectDB()` before every database operation
✅ Use the model recompilation pattern
✅ Create indexes for frequently queried fields
✅ Use pagination for large datasets
✅ Handle duplicate key errors (11000)
✅ Validate data before saving
✅ Use transactions for related operations
✅ Close connections in serverless (if needed)
✅ Use lean() for read-only operations
✅ Log database errors server-side

### DON'T:
❌ Skip connection before operations
❌ Recompile models on every request
❌ Fetch all documents without limit
❌ Store sensitive data unencrypted
❌ Use raw MongoDB driver (use Mongoose)
❌ Forget to handle connection errors
❌ Over-use populate (N+1 problem)
❌ Create indexes without thinking
❌ Store binary files in MongoDB (use GridFS or cloud storage)
❌ Expose raw database errors to users

## AI Agent Guidelines

When working with database:
1. Always call `connectDB()` first
2. Use the model pattern: `mongoose.models.X || mongoose.model()`
3. Define interfaces in `types/models.ts` with 'I' prefix
4. Create indexes for email, slug, and frequently queried fields
5. Handle duplicate key errors (code 11000)
6. Use pagination for lists
7. Validate input before database operations
8. Return Vietnamese error messages to users
9. Log detailed errors server-side only
10. Use async/await, not callbacks
