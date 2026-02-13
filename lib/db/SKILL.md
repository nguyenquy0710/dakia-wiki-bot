# Lib/DB Folder - Database Utilities

## Purpose
MongoDB connection management using Mongoose.

## Pattern - Connection Singleton

```typescript
// lib/db/mongoose.ts
import mongoose from 'mongoose';

let isConnected = false;

export async function connectDB(): Promise<void> {
  if (isConnected) {
    return;  // Already connected, reuse connection
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

## Usage in API Routes

**ALWAYS call connectDB() before any database operation:**

```typescript
// app/api/users/route.ts
import { connectDB } from '@/lib/db/mongoose';
import User from '@/models/User';

export async function GET() {
  try {
    await connectDB();  // ← CRITICAL: Connect first
    
    const users = await User.find();
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: 'Error' }, { status: 500 });
  }
}
```

## Connection Pattern Explained

### Why Singleton?
- **Prevents multiple connections** in serverless/Next.js
- **Reuses existing connection** for performance
- **Thread-safe** with boolean flag

### Environment Variable
```bash
MONGODB_URI=mongodb://localhost:27017/dakia-wiki-bot
```

## DO's ✅

- Call `connectDB()` in every API route
- Check connection before operations
- Use singleton pattern (isConnected flag)
- Handle connection errors
- Log connection status
- Validate MONGODB_URI exists
- Use async/await

## DON'Ts ❌

- Don't skip `connectDB()` call
- Don't create multiple connections
- Don't hardcode connection string
- Don't expose connection errors to users
- Don't use callbacks (use async/await)
- Don't forget error handling
