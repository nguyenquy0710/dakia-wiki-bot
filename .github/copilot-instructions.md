# GitHub Copilot Instructions for DAKIA Wiki Bot

## 📋 Tổng quan Dự án

DAKIA Wiki Bot là nền tảng quản lý và tra cứu wiki thông minh cho DAKIA Tech, được thiết kế đặc biệt để lưu trữ, tổ chức và chia sẻ kiến thức nội bộ một cách hiệu quả.

### Kiến trúc Hệ thống

Hệ thống được chia thành 2 phần chính:

1. **Web Client**: Trang tra cứu wiki công khai với nội dung HTML tĩnh
2. **Web Admin**: Trang quản trị nội dung wiki kết nối MongoDB

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 16 (App Router with SSG)
- **Language**: TypeScript
- **Styling**: Bootstrap 5 + Inline Styles
- **UI Components**: React Functional Components
- **Markdown Processing**: unified, remark, rehype

### Backend
- **Runtime**: Node.js
- **Framework**: Next.js 16 API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js with Credentials Provider
- **Password Encryption**: bcrypt

### Tools & Libraries
- **Markdown to HTML**: unified, remark, rehype
- **Form Validation**: Built-in HTML5 + TypeScript
- **State Management**: React Hooks (useState, useCallback, useEffect)
- **API Client**: fetch API

## 📁 Cấu trúc Thư mục

```
dakia-wiki-bot/
├── .github/
│   ├── copilot-instructions.md    # File này
│   ├── agents/                    # Custom agents
│   └── workflows/                 # GitHub Actions
├── .claude/
│   ├── mcp.json                   # MCP server config
│   ├── settings.json              # Claude settings
│   └── skills/                    # Custom skills
├── app/                           # Next.js App Router
│   ├── (client)/                  # Web Client routes
│   │   ├── page.tsx              # Homepage
│   │   ├── articles/             # Wiki articles pages
│   │   ├── categories/           # Categories pages
│   │   └── layout.tsx            # Client layout
│   ├── admin/                    # Web Admin routes
│   │   ├── dashboard/            # Admin dashboard
│   │   ├── users/                # User management
│   │   ├── articles/             # Article management
│   │   └── layout.tsx            # Admin layout
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication
│   │   ├── users/                # User CRUD
│   │   ├── articles/             # Article CRUD
│   │   └── categories/           # Category CRUD
│   └── globals.css               # Global styles
├── lib/                          # Utility functions
│   ├── db/                       # Database utilities
│   ├── markdown/                 # Markdown processing
│   └── auth/                     # Authentication utilities
├── models/                       # MongoDB models
│   ├── User.ts
│   ├── WikiArticle.ts
│   └── WikiCategory.ts
├── types/                        # TypeScript types
├── public/                       # Static assets
├── .env.example                  # Example environment variables
├── next.config.ts                # Next.js configuration
├── package.json
└── tsconfig.json
```

## 💾 Database Schema

### Collections

#### 1. Users Collection
```typescript
interface IUser {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;              // Hashed with bcrypt
  role: 'admin' | 'user';
  department?: string;
  position?: string;
  createdAt: Date;
  updatedAt: Date;
  
  // Activity tracking
  lastLoginAt?: Date;
  articlesCreated: number;
  articlesEdited: number;
}
```

#### 2. WikiArticles Collection
```typescript
interface IWikiArticle {
  _id: ObjectId;
  title: string;
  slug: string;                  // URL-friendly identifier
  description: string;
  content: string;               // Markdown content
  htmlContent: string;           // Converted HTML
  
  // Categorization
  categoryId: ObjectId;          // Reference to WikiCategory
  tags: string[];
  
  // SEO
  metaTitle?: string;
  metaDescription?: string;
  
  // Author & Version
  authorId: ObjectId;            // Reference to User
  versions: {
    version: number;
    content: string;
    editedBy: ObjectId;
    editedAt: Date;
    changeNote?: string;
  }[];
  
  // Statistics
  viewCount: number;
  
  // Status
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

#### 3. WikiCategories Collection
```typescript
interface IWikiCategory {
  _id: ObjectId;
  name: string;
  slug: string;                  // URL-friendly identifier
  description?: string;
  parentId?: ObjectId;           // For hierarchical categories
  
  // Metadata
  articleCount: number;
  order: number;                 // Display order
  
  createdAt: Date;
  updatedAt: Date;
}
```

## 🎯 Coding Conventions

### General Principles
1. **Viết code bằng tiếng Anh** cho variables, functions, comments
2. **UI text và content bằng tiếng Việt** (có thể hỗ trợ tiếng Anh)
3. **Sử dụng TypeScript** cho type safety
4. **Functional components** với React Hooks
5. **Server components** ưu tiên cho Next.js App Router

### Naming Conventions
- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Functions**: camelCase (e.g., `getUserById`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_FILE_SIZE`)
- **Files**: kebab-case hoặc PascalCase tùy loại
- **API routes**: kebab-case (e.g., `/api/users/[id]`)

### Component Structure
```typescript
// Preferred component structure
import { FC } from 'react';

interface ComponentProps {
  // Props definition
}

export const ComponentName: FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Hooks
  // Event handlers
  // Render logic
  
  return (
    // JSX
  );
};
```

### API Routes Pattern

#### Basic API Route
```typescript
// app/api/[resource]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    
    // Logic
    const data = await fetchData({ search });
    
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Không thể tải dữ liệu' },  // Vietnamese error
      { status: 500 }
    );
  }
}
```

#### Dynamic API Route (Next.js 16 - CRITICAL!)

**⚠️ BREAKING CHANGE: In Next.js 16, params are now async!**

```typescript
// app/api/[resource]/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongoose';
import { isValidObjectId } from 'mongoose';

// ✅ Correct: params is Promise<{ id: string }>
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    // ✅ MUST await params!
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
    
    // Validation and update logic
    const updated = await Model.findByIdAndUpdate(id, body, { new: true });
    
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
```

### Vietnamese Slug Generation

```typescript
/**
 * Generate URL-friendly slug from Vietnamese text
 * ⚠️ IMPORTANT: Replace đ/Đ BEFORE normalizing!
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
// "Đào tạo" → "dao-tao"
```

### CRUD Page Pattern

```typescript
'use client';

import { FC, useState, useCallback, useEffect } from 'react';

const AdminCRUDPage: FC = () => {
  // State
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // ✅ Use useCallback for fetch functions
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
      setError('Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Render with loading/error/empty states
  return (
    <div>
      {/* Header + Search + Items Grid + Modal */}
    </div>
  );
};
```

## 🔐 Security Requirements

### Authentication
1. **Password hashing**: Luôn sử dụng bcrypt với salt rounds >= 10
2. **Session management**: Sử dụng JWT hoặc NextAuth.js sessions
3. **Protected routes**: Middleware kiểm tra authentication
4. **Role-based access**: Phân quyền admin vs user

### Example Password Hashing
```typescript
import bcrypt from 'bcrypt';

// Hash password
const hashedPassword = await bcrypt.hash(password, 10);

// Verify password
const isValid = await bcrypt.compare(password, hashedPassword);
```

### API Security
- Validate tất cả input từ client
- Sanitize data trước khi lưu vào database
- Rate limiting cho API endpoints
- CORS configuration phù hợp
- Environment variables cho sensitive data

### Environment Variables
```bash
# .env.local (DO NOT commit this file)
MONGODB_URI=mongodb://...
JWT_SECRET=your-secret-key
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
```

## 📝 Markdown to HTML Conversion

### Processing Pipeline
1. **Parse Markdown**: Sử dụng remark
2. **Transform**: Thêm syntax highlighting, custom components
3. **Convert to HTML**: Sử dụng rehype
4. **Sanitize**: Làm sạch HTML output

### Example Implementation
```typescript
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(markdown);
    
  return result.toString();
}
```

### Static Generation
- Pre-render tất cả course pages tại build time
- Sử dụng `generateStaticParams` cho dynamic routes
- Revalidate khi có update từ admin

## 🎨 Admin Theme (NextAdmin Approach)

### Color Palette
```typescript
// Primary Colors
const PRIMARY = '#2563EB';      // Blue 600 - Main brand
const PRIMARY_LIGHT = '#06B6D4'; // Cyan 500 - Accent
const SECONDARY = '#64748b';     // Gray 500
const SUCCESS = '#10b981';       // Green 500
const DANGER = '#ef4444';        // Red 500
```

### Admin Card Grid Pattern
```tsx
// Card-based layout for admin CRUD pages
<div className="row g-4">
  <div className="col-md-6 col-lg-4">
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body">
        {/* Icon + Title */}
        <div className="d-flex align-items-center mb-3">
          <div 
            className="me-3 d-flex align-items-center justify-content-center"
            style={{ 
              fontSize: '2rem',
              width: '60px',
              height: '60px',
              borderRadius: '12px',
              backgroundColor: '#2563EB15',  // Primary with 15% opacity
            }}
          >
            📁
          </div>
          <div className="flex-grow-1">
            <h5 className="mb-0">Title</h5>
            <small className="text-muted">subtitle</small>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-muted mb-3">Description</p>
        
        {/* Actions */}
        <div className="btn-group btn-group-sm">
          <button className="btn btn-outline-primary">Sửa</button>
          <button className="btn btn-outline-danger">Xóa</button>
        </div>
      </div>
    </div>
  </div>
</div>
```

### Modal Component Pattern
```tsx
{/* Full-screen overlay modal */}
<div 
  className="modal show d-block" 
  style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
  onClick={closeModal}
>
  <div 
    className="modal-dialog modal-dialog-centered"
    onClick={(e) => e.stopPropagation()}
  >
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Title</h5>
        <button 
          type="button" 
          className="btn-close"
          onClick={closeModal}
        />
      </div>
      <div className="modal-body">
        {/* Form fields */}
      </div>
      <div className="modal-footer">
        <button className="btn btn-secondary">Hủy</button>
        <button className="btn btn-primary">Lưu</button>
      </div>
    </div>
  </div>
</div>
```

### State Patterns (Loading, Error, Empty)
```tsx
{/* Loading State */}
{loading && (
  <div className="text-center py-5">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Đang tải...</span>
    </div>
  </div>
)}

{/* Error State */}
{error && (
  <div className="alert alert-danger" role="alert">
    {error}
  </div>
)}

{/* Empty State */}
{!loading && items.length === 0 && (
  <div className="text-center py-5 text-muted">
    <h4>Chưa có dữ liệu</h4>
    <p>Nhấn "Tạo mới" để bắt đầu</p>
  </div>
)}
```

### Search Bar Pattern
```tsx
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
```

## 🎨 UI/UX Guidelines

### Responsive Design
- **Mobile-first approach**
- Breakpoints: mobile (< 768px), tablet (768-1024px), desktop (> 1024px)
- Test trên nhiều thiết bị

### Accessibility
- Semantic HTML
- ARIA labels khi cần
- Keyboard navigation
- Screen reader support
- Color contrast ratio >= 4.5:1

### Components Best Practices
- Reusable và composable
- Props validation với TypeScript
- Loading states
- Error states
- Empty states

## 🔍 SEO Optimization

### Page Metadata
```typescript
// app/courses/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const course = await getCourse(params.slug);
  
  return {
    title: course.metaTitle || course.title,
    description: course.metaDescription || course.description,
    openGraph: {
      title: course.title,
      description: course.description,
      images: [course.thumbnail],
    },
  };
}
```

### SEO Checklist
- [ ] Proper heading hierarchy (H1, H2, H3...)
- [ ] Meta descriptions cho tất cả pages
- [ ] Open Graph tags
- [ ] Semantic HTML structure
- [ ] Alt text cho images
- [ ] XML sitemap
- [ ] robots.txt
- [ ] Canonical URLs

## 🧪 Testing Guidelines

### Unit Tests
- Test utilities và helper functions
- Test components với React Testing Library
- Mock external dependencies

### Integration Tests
- Test API routes
- Test database operations
- Test authentication flow

### E2E Tests
- Critical user flows
- Admin workflows
- Course enrollment và completion

## 📊 Performance Optimization

### Next.js Optimizations
- Image optimization với `next/image`
- Font optimization với `next/font`
- Code splitting tự động
- Static generation cho public pages
- ISR (Incremental Static Regeneration) cho dynamic content

### Database Optimization
- Index các fields thường query (email, slug, courseId)
- Pagination cho large datasets
- Aggregate pipelines cho complex queries
- Connection pooling

### Caching Strategy
- Static pages: Cache vĩnh viễn
- API responses: Cache với revalidation
- User-specific data: No cache hoặc private cache

## 🚀 Deployment

### Build Process
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm start
```

### Environment Setup
1. Set up MongoDB database
2. Configure environment variables
3. Set up CDN cho static assets (nếu cần)
4. Configure domain và SSL

## 📚 Feature Implementation Priorities

### Phase 1: MVP (Minimum Viable Product)
1. User authentication (đăng nhập/đăng ký)
2. Basic article listing và viewing
3. Article detail pages với Markdown content
4. Basic admin panel (user và article management)
5. Database setup với MongoDB

### Phase 2: Core Features
1. Full-text search functionality
2. Category management và filtering
3. Rich Markdown support (images, code blocks, tables)
4. Version control cho articles
5. User contribution tracking

### Phase 3: Advanced Features
1. AI-powered search và recommendations
2. Chatbot support cho tra cứu
3. Real-time collaboration
4. Advanced analytics và reporting
5. API documentation integration

## 🤖 AI Features Implementation

### Article Recommendations
```typescript
// Example recommendation logic
async function getRelatedArticles(articleId: string) {
  const article = await WikiArticle.findById(articleId);
  
  // Find articles with similar tags or same category
  const related = await WikiArticle.find({
    _id: { $ne: articleId },
    $or: [
      { categoryId: article.categoryId },
      { tags: { $in: article.tags } }
    ],
    isPublished: true
  }).limit(5).sort({ viewCount: -1 });
  
  return related;
}
```

### Search Enhancement
- Full-text search với MongoDB text indexes
- AI-powered search suggestions
- Search history và personalization
- Chatbot hỗ trợ tra cứu

## 📖 Documentation Standards

### Code Comments
- Comment cho complex logic
- JSDoc cho public functions
- TODO comments cho future improvements

### API Documentation
- Endpoint description
- Request/Response examples
- Error codes

### README Updates
- Keep README.md updated với setup instructions
- Document environment variables
- Include troubleshooting section

## 🔄 Git Workflow

### Branch Naming
- `feature/[feature-name]` - New features
- `fix/[bug-name]` - Bug fixes
- `docs/[doc-name]` - Documentation
- `refactor/[refactor-name]` - Code refactoring

### Commit Messages
```
type(scope): subject

- feat: new feature
- fix: bug fix
- docs: documentation
- style: formatting
- refactor: code restructuring
- test: adding tests
- chore: maintenance
```

### Example
```
feat(courses): add markdown to HTML conversion

- Implement unified pipeline for markdown processing
- Add syntax highlighting support
- Include tests for conversion function
```

## 📚 Wiki Content Examples

### 1. Technical Documentation
```markdown
# API Integration Guide

## Overview
How to integrate with DAKIA Tech APIs

## Prerequisites
- API key from admin panel
- Understanding of REST APIs
- Node.js or Python environment

## Step-by-Step Guide
1. Obtain API credentials
2. Install required packages
3. Initialize connection
4. Make API calls

## Code Examples
...
```

### 2. Internal Processes
```markdown
# Employee Onboarding Process

## Day 1: Welcome
- Receive company equipment
- Setup accounts
- Meet the team

## Week 1: Training
- Complete orientation
- Review company policies
- Shadow team member

## Month 1: Integration
- Start on projects
- First 1-on-1 with manager
- Feedback session
```

## 🛡️ Error Handling

### Client-Side
```typescript
try {
  const response = await fetch('/api/courses');
  if (!response.ok) throw new Error('Failed to fetch');
  const data = await response.json();
} catch (error) {
  console.error('Error:', error);
  // Show user-friendly error message
}
```

### Server-Side
```typescript
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const courses = await Course.find();
    return NextResponse.json({ courses });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Database Connection Error
```typescript
import mongoose from 'mongoose';

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;
  
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to database');
  }
}
```

## 📱 Mobile Considerations

### Responsive Components
- Use relative units (rem, em, %)
- Flexible layouts với Flexbox/Grid
- Touch-friendly buttons (min 44x44px)
- Readable font sizes (min 16px)

### Mobile-Specific Features
- Pull-to-refresh
- Offline support (Service Workers)
- Progressive Web App (PWA) capabilities
- Mobile navigation patterns

## 🌐 Internationalization (i18n)

### Setup for Vietnamese/English
```typescript
// lib/i18n.ts
export const translations = {
  vi: {
    'course.title': 'Khóa học',
    'course.enroll': 'Đăng ký',
  },
  en: {
    'course.title': 'Course',
    'course.enroll': 'Enroll',
  }
};
```

### Language Switching
- Detect browser language
- Allow manual language selection
- Persist preference in localStorage/cookies

## 🎯 Key Success Metrics

### User Engagement
- Daily/Weekly/Monthly Active Users
- Articles viewed per session
- Average time spent on platform
- Search queries per user

### Content Quality
- Article view count
- User contributions
- Content freshness
- Version history activity

### System Performance
- Page load time < 3s
- Search response time < 500ms
- Uptime >= 99.9%
- Error rate < 1%

## ⚠️ Common Pitfalls to Avoid

1. **Bỏ qua mã hóa passwords** - Luôn hash passwords với bcrypt
2. **Hardcode credentials** - Dùng environment variables
3. **Bỏ qua validate input** - Validate mọi user input
4. **Ignore error handling** - Proper error handling ở mọi nơi
5. **Poor database indexing** - Index các fields thường query
6. **No loading states** - Luôn hiển thị loading states
7. **Accessibility issues** - Test với screen readers
8. **SEO neglect** - Proper meta tags và semantic HTML

## 📞 Support & Resources

### Documentation
- Next.js: https://nextjs.org/docs
- MongoDB: https://docs.mongodb.com/
- React: https://react.dev/

### Internal Resources
- README.md: Project overview
- FEATURES.md: Complete feature specifications
- API Documentation: (to be created)

## 🎉 Conclusion

Khi làm việc với DAKIA Wiki Bot, hãy luôn nhớ:

1. **User Experience First**: Thiết kế cho người dùng cuối
2. **Security by Default**: Bảo mật từ đầu, không phải sau này
3. **Performance Matters**: Tối ưu hóa từ đầu
4. **Code Quality**: Clean code, maintainable, documented
5. **Knowledge First**: Platform này quản lý kiến thức, nên cấu trúc và tổ chức phải rõ ràng

**Happy Coding! 🚀**
