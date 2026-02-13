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

### Basic API Route (Next.js 16)
```typescript
// app/api/[resource]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const search = searchParams.get('search') || '';
    
    // Logic here
    const data = await fetchData({ page, search });
    
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Không thể tải dữ liệu' },  // Vietnamese error message
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Validate required fields
    if (!body.name) {
      return NextResponse.json(
        { error: 'Tên không được để trống' },
        { status: 400 }
      );
    }
    
    // Process request
    const result = await Model.create(body);
    
    return NextResponse.json(
      { message: 'Tạo thành công', data: result },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Không thể tạo dữ liệu' },
      { status: 500 }
    );
  }
}
```

### Dynamic API Route (Next.js 16 - IMPORTANT!)

**⚠️ In Next.js 16, params are now async!**

```typescript
// app/api/[resource]/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import { isValidObjectId } from 'mongoose';

// ✅ Correct: params is Promise in Next.js 16
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    // ✅ Must await params!
    const { id } = await params;
    
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: 'ID không hợp lệ' },
        { status: 400 }
      );
    }
    
    const item = await Model.findById(id).lean();
    
    if (!item) {
      return NextResponse.json(
        { error: 'Không tìm thấy dữ liệu' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ data: item });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Không thể tải dữ liệu' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const { id } = await params;  // ✅ Await params
    const body = await request.json();
    
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: 'ID không hợp lệ' },
        { status: 400 }
      );
    }
    
    const updated = await Model.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!updated) {
      return NextResponse.json(
        { error: 'Không tìm thấy dữ liệu' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      message: 'Cập nhật thành công',
      data: updated,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Không thể cập nhật' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const { id } = await params;  // ✅ Await params
    
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: 'ID không hợp lệ' },
        { status: 400 }
      );
    }
    
    const deleted = await Model.findByIdAndDelete(id);
    
    if (!deleted) {
      return NextResponse.json(
        { error: 'Không tìm thấy dữ liệu' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      message: 'Xóa thành công',
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Không thể xóa' },
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

## CRUD Page Pattern (Admin)

### Complete CRUD Component Structure
```typescript
'use client';

import { FC, useState, useEffect, useCallback } from 'react';
import { IModel } from '@/types/models';

interface FormData {
  name: string;
  // ... other fields
}

const AdminCRUDPage: FC = () => {
  // 1. State Management
  const [items, setItems] = useState<IModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
  });

  // 2. Data Fetching with useCallback
  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/items?search=${searchQuery}`);
      const data = await response.json();
      
      if (response.ok) {
        setItems(data.data || []);
        setError('');
      } else {
        setError(data.error || 'Không thể tải dữ liệu');
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // 3. Form Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreate = () => {
    setEditingId(null);
    setFormData({ name: '' });
    setShowModal(true);
  };

  const handleEdit = (item: IModel) => {
    setEditingId(item._id.toString());
    setFormData({ name: item.name });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingId ? `/api/items/${editingId}` : '/api/items';
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setShowModal(false);
        fetchItems();
        alert(data.message || 'Thành công');
      } else {
        alert(data.error || 'Có lỗi xảy ra');
      }
    } catch (err) {
      alert('Có lỗi xảy ra khi lưu');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Bạn có chắc muốn xóa "${name}"?`)) {
      return;
    }
    
    try {
      const response = await fetch(`/api/items/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (response.ok) {
        fetchItems();
        alert(data.message || 'Xóa thành công');
      } else {
        alert(data.error || 'Không thể xóa');
      }
    } catch (err) {
      alert('Có lỗi xảy ra khi xóa');
    }
  };

  // 4. Render
  return (
    <div>
      {/* Header with Create Button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Quản lý</h1>
        <button className="btn btn-primary" onClick={handleCreate}>
          ➕ Tạo mới
        </button>
      </div>

      {/* Search */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Tìm kiếm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="alert alert-danger">{error}</div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" />
        </div>
      )}

      {/* Empty State */}
      {!loading && items.length === 0 && (
        <div className="text-center py-5 text-muted">
          <h4>Chưa có dữ liệu</h4>
        </div>
      )}

      {/* Items Grid */}
      {!loading && items.length > 0 && (
        <div className="row g-4">
          {items.map((item) => (
            <div key={item._id.toString()} className="col-md-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h5>{item.name}</h5>
                  <div className="btn-group btn-group-sm">
                    <button 
                      className="btn btn-outline-primary"
                      onClick={() => handleEdit(item)}
                    >
                      Sửa
                    </button>
                    <button 
                      className="btn btn-outline-danger"
                      onClick={() => handleDelete(item._id.toString(), item.name)}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">
                    {editingId ? 'Chỉnh sửa' : 'Tạo mới'}
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  />
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Tên *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Hủy
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingId ? 'Cập nhật' : 'Tạo mới'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCRUDPage;
```

## Vietnamese Slug Generation

**⚠️ IMPORTANT: Replace đ/Đ BEFORE normalizing!**

```typescript
/**
 * Generate URL-friendly slug from Vietnamese text
 * @param name - Vietnamese text to convert
 * @returns URL-friendly slug
 */
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/đ/g, 'd')      // ✅ Replace đ FIRST
    .replace(/Đ/g, 'd')      // ✅ Replace Đ FIRST
    .normalize('NFD')        // Then normalize
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '')    // Remove special chars
    .replace(/\s+/g, '-')            // Spaces to hyphens
    .replace(/-+/g, '-')             // Multiple hyphens to one
    .trim();
}

// Examples:
// "Công nghệ" → "cong-nghe"
// "Lập trình" → "lap-trinh"
// "Đào tạo" → "dao-tao"
```

## Performance Optimization Patterns

### useCallback for Functions in Dependencies

```typescript
// ✅ Good - Wrap fetch function in useCallback
const fetchData = useCallback(async () => {
  try {
    setLoading(true);
    const response = await fetch(`/api/data?search=${searchQuery}`);
    const data = await response.json();
    setData(data);
  } catch (err) {
    setError('Error');
  } finally {
    setLoading(false);
  }
}, [searchQuery]);  // ✅ Dependencies array

useEffect(() => {
  fetchData();
}, [fetchData]);  // ✅ Now fetchData is stable

// ❌ Bad - Function recreated on every render
const fetchData = async () => {
  // ... fetch logic
};

useEffect(() => {
  fetchData();  // ❌ This will cause infinite loop
}, [fetchData]);  // ❌ fetchData changes every render
```

### Debounced Search Pattern

```typescript
const [searchQuery, setSearchQuery] = useState('');
const [debouncedQuery, setDebouncedQuery] = useState('');

// Debounce search input
useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedQuery(searchQuery);
  }, 500);  // 500ms delay
  
  return () => clearTimeout(timer);
}, [searchQuery]);

// Fetch only when debounced query changes
useEffect(() => {
  fetchData(debouncedQuery);
}, [debouncedQuery]);
```
