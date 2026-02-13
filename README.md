# DAKIA Wiki Bot

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-9.2-green?logo=mongodb)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/Build-In_Development-orange)]()

> 🚀 **Nền tảng quản lý và tra cứu wiki thông minh cho DAKIA Tech**

DAKIA Wiki Bot là giải pháp quản lý kiến thức nội bộ, được xây dựng với Next.js 16, MongoDB, và TypeScript. Dự án đang trong giai đoạn phát triển với ~**40% hoàn thành**.

📋 **[Chi tiết tính năng](FEATURES.md)** • 🚀 **[Hướng dẫn cài đặt](SETUP.md)** • 📚 **[Tài liệu kỹ thuật](docs/README.md)**

---

## 🎯 Tổng quan

DAKIA Wiki Bot cung cấp nền tảng quản lý kiến thức với:

- ✅ **Authentication hoàn chỉnh**: NextAuth.js với JWT, bcrypt password hashing
- ✅ **Quản lý danh mục đầy đủ**: CRUD operations, hierarchical categories, search & pagination
- 🔄 **Quản lý bài viết**: Database schema sẵn sàng, đang phát triển UI và API
- 📊 **Dashboard**: UI cơ bản, đang tích hợp dữ liệu thực

## ✨ Tính năng

### 🔐 Authentication & Authorization (✅ 100% hoàn thành)
- ✅ **User Registration**: Email, password với validation
- ✅ **Login/Logout**: NextAuth.js Credentials Provider
- ✅ **Password Security**: bcrypt hashing (salt rounds: 10)
- ✅ **JWT Sessions**: Secure token-based authentication
- ✅ **Role-based Access**: Admin/User roles
- ✅ **Protected Routes**: Middleware bảo vệ `/admin/*` routes

### 📂 Quản lý Danh mục (✅ 100% hoàn thành)
- ✅ **CRUD Operations**: Create, Read, Update, Delete categories
- ✅ **Hierarchical Structure**: Parent-child categories
- ✅ **Search & Pagination**: Tìm kiếm theo tên, phân trang
- ✅ **Slug Auto-generation**: SEO-friendly URLs
- ✅ **Custom Styling**: Icon và màu sắc tùy chỉnh
- ✅ **Validation**: Form validation với error handling
- ✅ **Admin UI**: Modal forms, data tables, loading states

**API Endpoints:**
- `GET /api/categories` - List với pagination & search
- `POST /api/categories` - Create với duplicate check
- `GET /api/categories/[id]` - Chi tiết
- `PUT /api/categories/[id]` - Update
- `DELETE /api/categories/[id]` - Delete với cascade check

### 📝 Quản lý Bài viết (🔄 20% hoàn thành)
**Database Schema:** ✅ Hoàn chỉnh
- Version control system (lưu lịch sử chỉnh sửa)
- Markdown content + HTML rendering
- Tags, metadata, SEO fields
- View count, like count tracking

**Status:** 🚧 API endpoints chưa implement, UI là placeholder

### 👥 Quản lý Người dùng (⚠️ 40% hoàn thành)
- ✅ **User Schema**: Name, email, role, department, position
- ✅ **Registration**: Đăng ký tài khoản mới
- 🔴 **Admin User Management**: Chưa có UI/API

### 🎨 User Interface
**Client Pages (Public):**
- ✅ Homepage với hero section, stats, features showcase
- 🟡 Wiki listing page (UI only, chưa fetch data)
- 🟡 Categories page (UI only, hardcoded data)
- ✅ Responsive Bootstrap 5 design

**Admin Pages (Protected):**
- ✅ Dashboard (UI với mock data)
- ✅ Categories management (fully functional)
- 🟡 Articles management (UI only)
- ✅ Admin sidebar với session info

### 🔍 Tìm kiếm & Lọc (🔴 Chưa implement)
- 🔴 Full-text search
- 🔴 Advanced filters
- 🔴 Sort options
- 🟡 Search UI đã có (chưa hoạt động)

### 📊 Dashboard & Analytics (🟡 30% hoàn thành)
- 🟡 Stats cards (hardcoded data)
- 🟡 Recent activity (mock data)
- 🔴 Real-time analytics chưa có

## 🚀 Quick Start

### Yêu cầu hệ thống
- **Node.js** 18.0 trở lên
- **npm** hoặc **yarn**
- **MongoDB** (local hoặc MongoDB Atlas)

### Cài đặt

```bash
# 1. Clone repository
git clone https://github.com/nguyenquy0710/dakia-wiki-bot.git
cd dakia-wiki-bot

# 2. Cài đặt dependencies
npm install

# 3. Cấu hình môi trường
cp .env.example .env.local

# 4. Chỉnh sửa .env.local với thông tin của bạn
# MONGODB_URI=mongodb://localhost:27017/dakia-wiki-bot
# NEXTAUTH_SECRET=your-secret-key-here
# NEXTAUTH_URL=http://localhost:3000
# JWT_SECRET=your-jwt-secret-here

# 5. Chạy development server
npm run dev
```

Mở trình duyệt tại **http://localhost:3000**

### Scripts

```bash
npm run dev        # Development server (port 3000)
npm run build      # Build cho production
npm start          # Production server
npm run lint       # ESLint check
npm run type-check # TypeScript check
```

### Test Authentication

1. Đăng ký tài khoản: http://localhost:3000/auth/register
2. Đăng nhập: http://localhost:3000/auth/login
3. Truy cập Admin: http://localhost:3000/admin/dashboard
4. Quản lý Categories: http://localhost:3000/admin/categories ✅ (Fully functional!)

## 🐛 Troubleshooting

Gặp lỗi khi chạy dự án? Xem hướng dẫn khắc phục:

| Lỗi | Tài liệu |
|-----|----------|
| `Cannot find module '@tailwindcss/postcss'` | **[docs/troubleshooting/tailwindcss-postcss-error.md](docs/troubleshooting/tailwindcss-postcss-error.md)** |
| Build errors, dependency issues | **[SETUP.md](SETUP.md)** - Phần Troubleshooting |

**Giải pháp nhanh**: Nếu gặp lỗi module not found sau khi clone hoặc pull code mới:
```bash
npm install  # Cài đặt lại dependencies
rm -rf .next && npm run build  # Xóa cache và rebuild
```

## 📖 Tài liệu

| Tài liệu | Mô tả |
|----------|-------|
| **[SETUP.md](SETUP.md)** | Hướng dẫn cài đặt chi tiết, troubleshooting |
| **[FEATURES.md](FEATURES.md)** | Danh sách đầy đủ tính năng |
| **[docs/](docs/README.md)** | Tài liệu kỹ thuật, architecture, coding conventions |
| **[docs/troubleshooting/](docs/troubleshooting/)** | Hướng dẫn khắc phục lỗi thường gặp |

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 16.1.6](https://nextjs.org/) - App Router
- **Language**: [TypeScript 5.9](https://www.typescriptlang.org/)
- **UI Library**: [React 19.2](https://react.dev/)
- **Styling**: [Bootstrap 5.3](https://getbootstrap.com/) + [React Bootstrap 2.10](https://react-bootstrap.github.io/)
- **Markdown**: [unified](https://unifiedjs.com/), [remark](https://remark.js.org/), [rehype](https://github.com/rehypejs/rehype)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) 18+
- **Database**: [MongoDB](https://www.mongodb.com/) + [Mongoose 9.2](https://mongoosejs.com/)
- **Authentication**: [NextAuth.js 4.24](https://next-auth.js.org/)
- **Password**: [bcrypt 6.0](https://www.npmjs.com/package/bcrypt)
- **Validation**: [Zod 4.3](https://zod.dev/)

## 📁 Cấu trúc Project

```
dakia-wiki-bot/
├── app/                      # Next.js App Router
│   ├── (client)/            # 🌐 Public Pages
│   │   ├── page.tsx         #   ├─ ✅ Homepage
│   │   ├── wiki/            #   ├─ 🟡 Wiki listing (UI only)
│   │   └── categories/      #   └─ 🟡 Categories (UI only)
│   ├── admin/               # 🔐 Admin Pages (Protected)
│   │   ├── dashboard/       #   ├─ 🟡 Dashboard (mock data)
│   │   ├── categories/      #   ├─ ✅ Categories CRUD (FULL)
│   │   ├── articles/        #   ├─ 🟡 Articles (UI only)
│   │   └── components/      #   └─ ✅ AdminSidebar
│   ├── auth/                # 🔑 Authentication
│   │   ├── login/           #   ├─ ✅ Login page
│   │   └── register/        #   └─ ✅ Register page
│   ├── api/                 # 🔌 API Routes
│   │   ├── auth/            #   ├─ ✅ Register, NextAuth
│   │   ├── categories/      #   ├─ ✅ CRUD endpoints (FULL)
│   │   ├── articles/        #   ├─ 🔴 TODO
│   │   ├── users/           #   ├─ 🔴 TODO
│   │   └── health/          #   └─ ✅ Health check
│   ├── layout.tsx           # ✅ Root layout
│   ├── providers.tsx        # ✅ Client providers
│   └── globals.css          # ✅ Global styles
├── lib/                     # 🛠️ Utilities
│   ├── auth/                # ✅ Auth config, password utils
│   ├── db/                  # ✅ Mongoose connection
│   ├── markdown/            # 🟡 MD converter (defined, unused)
│   └── constants.ts         # ✅ App constants
├── models/                  # 📊 Database Models
│   ├── User.ts              # ✅ User schema
│   ├── WikiArticle.ts       # ✅ Article schema (API todo)
│   └── WikiCategory.ts      # ✅ Category schema
├── types/                   # 📝 TypeScript Types
│   ├── models.ts            # ✅ Model interfaces
│   └── next-auth.d.ts       # ✅ NextAuth augmentation
├── middleware.ts            # ✅ Auth middleware
└── docs/                    # 📚 Documentation

Legend: ✅ Implemented | 🟡 Partial | 🔴 Not started
```

## 🗂️ Database Schema

### Collections

#### 👤 Users
```typescript
{
  name: string;              // Required
  email: string;             // Required, unique, lowercase
  password: string;          // bcrypt hashed
  role: 'admin' | 'user';    // Default: 'user'
  department?: string;
  position?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

#### 📂 WikiCategories
```typescript
{
  name: string;              // Required
  slug: string;              // Required, unique, SEO-friendly
  description: string;       // Required
  icon?: string;             // Icon class
  color?: string;            // Hex color
  parentId?: ObjectId;       // Hierarchical support
  order: number;             // Display order (default: 0)
  isPublished: boolean;      // Default: true
  createdAt: Date;
  updatedAt: Date;
}
```
**Indexes:** `slug` (unique), `parentId`

#### 📝 WikiArticles (Schema ready, API pending)
```typescript
{
  title: string;             // Required
  slug: string;              // Required, unique
  summary: string;           // Required
  content: string;           // Markdown content
  htmlContent: string;       // Rendered HTML
  categoryId: ObjectId;      // Ref: WikiCategory
  author: string;            // Required
  tags: string[];
  
  // SEO
  metaTitle?: string;
  metaDescription?: string;
  
  // Version Control
  version: number;           // Default: 1
  previousVersions: [{
    version: number;
    content: string;
    updatedBy: string;
    updatedAt: Date;
  }];
  
  // Statistics
  views: number;             // Default: 0
  likes: number;             // Default: 0
  
  // Status
  isPublished: boolean;      // Default: false
  isFeatured: boolean;       // Default: false
  
  createdAt: Date;
  updatedAt: Date;
}
```
**Indexes:** `slug` (unique), `categoryId`, `isPublished`

## 🌐 API Endpoints

### ✅ Implemented

#### Authentication
- `POST /api/auth/register` - Đăng ký user mới
  - Validates: email format, password length
  - Checks: duplicate email
  - Returns: user object (without password)

#### Categories (FULLY FUNCTIONAL)
- `GET /api/categories` - List categories
  - Query params: `page`, `limit`, `search`, `sort`
  - Returns: categories array + pagination info
- `POST /api/categories` - Create category
  - Validates: name, slug, description
  - Checks: duplicate slug
  - Auto-generates: slug if not provided
- `GET /api/categories/[id]` - Get category
- `PUT /api/categories/[id]` - Update category
- `DELETE /api/categories/[id]` - Delete category
  - Prevents: deletion if has articles

#### System
- `GET /api/health` - Health check
  - Returns: `{ status: 'ok', timestamp }`

### 🔴 Not Implemented (Placeholder)

- `GET /api/articles` - Returns empty array
- `GET /api/users` - Returns empty array

## 📊 Trạng thái Dự án

### Overall Progress: ~40% Complete

```
AUTHENTICATION & SECURITY          ████████████████████ 100%
├─ ✅ User registration
├─ ✅ Login/Logout (NextAuth)
├─ ✅ Password hashing (bcrypt)
├─ ✅ JWT + Sessions
├─ ✅ Role-based access
└─ ✅ Protected routes (middleware)

CATEGORIES MANAGEMENT              ████████████████████ 100%
├─ ✅ Category CRUD (full)
├─ ✅ Hierarchical structure
├─ ✅ Search & pagination
├─ ✅ Admin UI (complete)
└─ ✅ API endpoints (all working)

ARTICLES MANAGEMENT                ████░░░░░░░░░░░░░░░░  20%
├─ ✅ WikiArticle schema
├─ ✅ Version control schema
├─ 🟡 Admin UI (placeholder)
├─ 🔴 Create article API
├─ 🔴 Edit article API
├─ 🔴 Fetch articles API
└─ 🔴 Markdown editor

USERS MANAGEMENT                   ████████░░░░░░░░░░░░  40%
├─ ✅ User schema
├─ ✅ User registration
├─ 🔴 List users API
├─ 🔴 Update user API
└─ 🔴 Admin users page

CLIENT PAGES                       ██████░░░░░░░░░░░░░░  30%
├─ ✅ Homepage (complete)
├─ 🟡 Wiki listing (UI only)
├─ 🟡 Categories page (UI only)
└─ 🔴 Article detail page

SEARCH & ANALYTICS                 ░░░░░░░░░░░░░░░░░░░░   0%
├─ 🔴 Full-text search
├─ 🔴 Advanced filters
├─ 🔴 Real-time analytics
└─ 🔴 Dashboard charts
```

### ✅ Phase 1 - Foundation (HOÀN THÀNH)
- [x] Project structure với Next.js 16 App Router
- [x] MongoDB + Mongoose integration
- [x] NextAuth.js authentication
- [x] User & Category & Article schemas
- [x] Basic UI cho Client & Admin
- [x] Categories CRUD (fully functional)
- [x] Role-based middleware
- [x] TypeScript strict mode

### 🔄 Phase 2 - Core Features (ĐANG PHÁT TRIỂN)
**Priority 1 (Critical):**
- [ ] Implement `/api/articles` CRUD endpoints
- [ ] Connect client Wiki page to Articles API
- [ ] Markdown editor component
- [ ] Article detail page
- [ ] Image upload & management

**Priority 2 (Important):**
- [ ] `/api/users` admin endpoints
- [ ] Admin users management page
- [ ] Replace dashboard mock data with real analytics
- [ ] Full-text search implementation
- [ ] Advanced filters & sorting

**Priority 3 (Enhancement):**
- [ ] Comment system
- [ ] Email notifications
- [ ] Version comparison UI
- [ ] Activity logging

### 🔮 Phase 3 - Advanced Features (TƯƠNG LAI)
- [ ] AI-powered search & recommendations
- [ ] Chatbot support (RAG with wiki content)
- [ ] Real-time collaboration
- [ ] Analytics dashboard với charts
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Export to PDF/Word
- [ ] Slack/Teams integration

## 🤝 Contributing

Dự án đang trong giai đoạn phát triển tích cực. Contributions, issues và feature requests đều được chào đón!

### Cách đóng góp

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Areas needing help
- 🔴 **Critical**: Implement Articles CRUD API
- 🟡 **Important**: Users management admin page
- 🟢 **Enhancement**: Search functionality, Markdown editor

## 📝 License

Dự án này được phân phối dưới giấy phép **MIT License**. Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## 👨‍💻 Author & Maintainer

**DAKIA Tech Team**
- GitHub: [@nguyenquy0710](https://github.com/nguyenquy0710)
- Repository: [dakia-wiki-bot](https://github.com/nguyenquy0710/dakia-wiki-bot)
- Issues: [Report Bug / Request Feature](https://github.com/nguyenquy0710/dakia-wiki-bot/issues)

## 🙏 Acknowledgments

Xin cảm ơn các công nghệ mã nguồn mở tuyệt vời:

- [Next.js](https://nextjs.org/) - The React Framework for Production
- [MongoDB](https://www.mongodb.com/) - NoSQL Database
- [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js
- [Bootstrap](https://getbootstrap.com/) - CSS Framework
- [unified](https://unifiedjs.com/) - Content Processing
- [Mongoose](https://mongoosejs.com/) - MongoDB ODM
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with Types

## 📈 Project Stats

![GitHub last commit](https://img.shields.io/github/last-commit/nguyenquy0710/dakia-wiki-bot)
![GitHub issues](https://img.shields.io/github/issues/nguyenquy0710/dakia-wiki-bot)
![GitHub pull requests](https://img.shields.io/github/issues-pr/nguyenquy0710/dakia-wiki-bot)
![GitHub stars](https://img.shields.io/github/stars/nguyenquy0710/dakia-wiki-bot?style=social)

---

<div align="center">

**DAKIA Wiki Bot** - *Quản lý Kiến thức Nội bộ Thông minh*

Made with ❤️ by DAKIA Tech | Progress: 40% Complete

[🏠 Home](https://github.com/nguyenquy0710/dakia-wiki-bot) • [📖 Docs](docs/README.md) • [🐛 Report Bug](https://github.com/nguyenquy0710/dakia-wiki-bot/issues) • [✨ Request Feature](https://github.com/nguyenquy0710/dakia-wiki-bot/issues)

</div>
