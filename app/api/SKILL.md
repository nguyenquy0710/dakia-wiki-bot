# App/API Folder - API Route Handlers

## Purpose
RESTful API endpoints using Next.js App Router route handlers.

## Pattern

Every API route must follow this structure:

```typescript
// app/api/[resource]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import Model from '@/models/Model';

export async function GET(request: NextRequest) {
  try {
    // 1. Connect to database
    await connectDB();
    
    // 2. Parse query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    // 3. Query database
    const data = await Model.find()
      .skip((page - 1) * limit)
      .limit(limit);
    
    // 4. Return response
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Validate input
    if (!body.name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }
    
    // Create document
    const doc = await Model.create(body);
    
    return NextResponse.json(
      { message: 'Created successfully', data: doc },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  // Update logic
}

export async function DELETE(request: NextRequest) {
  // Delete logic
}
```

## HTTP Methods

- `GET` - Retrieve data
- `POST` - Create new resource
- `PUT/PATCH` - Update resource
- `DELETE` - Delete resource

## Response Format

### Success Response
```typescript
return NextResponse.json({
  data: result,
  message: 'Success message',
}, { status: 200 });
```

### Error Response
```typescript
return NextResponse.json({
  error: 'Vietnamese error message for user',
}, { status: 400 });
```

## Status Codes

- `200` - OK (GET, PUT)
- `201` - Created (POST)
- `204` - No Content (DELETE)
- `400` - Bad Request (validation error)
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## DO's ✅

- Always call `connectDB()` first
- Validate all input
- Handle errors with try/catch
- Return appropriate status codes
- Use Vietnamese for error messages
- Log errors server-side only
- Parse request body/params properly

## DON'Ts ❌

- Don't skip database connection
- Don't expose internal errors to users
- Don't skip validation
- Don't use English error messages
- Don't forget to handle edge cases
