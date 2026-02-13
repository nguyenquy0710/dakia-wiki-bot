# GitHub Copilot Instructions for DAKIA Wiki Bot

## 📋 Tổng quan Dự án

DAKIA Wiki Bot là nền tảng quản lý và tra cứu wiki thông minh cho DAKIA Tech, được thiết kế đặc biệt để lưu trữ, tổ chức và chia sẻ kiến thức nội bộ một cách hiệu quả.

### Kiến trúc Hệ thống

Hệ thống được chia thành 2 phần chính:

1. **Web Client**: Trang tra cứu wiki công khai với nội dung HTML tĩnh
2. **Web Admin**: Trang quản trị nội dung wiki kết nối MongoDB

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js (với Static Site Generation - SSG)
- **Language**: TypeScript/JavaScript
- **Styling**: CSS Modules / Tailwind CSS / Styled Components
- **UI Components**: React components
- **Markdown Processing**: remark, rehype hoặc next-mdx-remote

### Backend
- **Runtime**: Node.js
- **Framework**: Next.js API Routes hoặc Express.js
- **Database**: MongoDB
- **Authentication**: NextAuth.js hoặc JWT
- **Password Encryption**: bcrypt

### Tools & Libraries
- **Markdown to HTML**: unified, remark, rehype
- **Form Validation**: zod, yup
- **State Management**: React Context API hoặc Zustand
- **API Client**: axios hoặc fetch

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
```typescript
// app/api/[resource]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    // Logic
    return NextResponse.json({ data: [] });
  } catch (error) {
    return NextResponse.json({ error: 'Error message' }, { status: 500 });
  }
}
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
